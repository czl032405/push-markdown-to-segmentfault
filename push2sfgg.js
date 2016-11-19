var superagent = require('superagent');
var cheerio = require('cheerio');
var fs = require('fs');
var async = require("async");
var path = require('path');
var glob = require("glob")
var cookie = null;
var token = "";
var notes = {};
var localNotes = {};

//限制：
//需要带上gr_user_id：任意guid值
//需要以下header
//需要?_=值正确  和 phpsessid相关  = window.SF.token  在login的html里面
//login.js 和 login.min.js内容是不一样的
//1分钟内只能新增一个markdown
//本地md文件放置在同目录内

var user = "";//登录名
var pw = "";//登录密码

var getGuid = function () {
    var t;
    return t = (new Date).getTime(), "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
        var r, n;
        return r = (t + 16 * Math.random()) % 16 | 0, t = Math.floor(t / 16), n = "x" === e ? r : 3 & r | 8, n.toString(16)
    })
}


var getSFToken = function (html) {
    html = html.replace(/\/\*.*\*\//g, "")
    html = html.replace(/\/\/.*/g, "");
    html = html.replace(/\n/g, "");
    var script = html.match(/w.SF.token = ([\s\S]*;;)/)[1];
    var tokenFunc = new Function("return " + script);
    var token = tokenFunc();
    return token;

}

var index = function (callback) {
    console.info(`获取token cookie ...`);
    superagent.get('https://segmentfault.com/user/login')
        .end(function (err, res) {
            console.info(err)
            if (err) {

            }
            else {
                var sessionId = res.header["set-cookie"][0].split('; path')[0];
                token = getSFToken(res.text)
                cookie = sessionId + "; ";
                cookie += `gr_user_id=${getGuid()}; `
                console.info(`获取token cookie ...成功`);
                callback && callback();
            }
        })
}

var login = function (callback) {
    console.info(`登录..`);
    var _ = token;
    superagent.post(`https://segmentfault.com/api/user/login?_=${_}`)
        .type('form')
        .set('Host', 'segmentfault.com')
        .set('Origin', 'https://segmentfault.com')
        .set('Referer', 'https://segmentfault.com/user/login')
        .set('X-Requested-With', 'XMLHttpRequest')
        .set('Cookie', cookie)
        .send({
            mail: user.trim(),
            password: pw.trim(),
            remember: "1"
        })
        .end(function (err, res) {
            if (err || !res.ok) {
                console.log(err.status);
                console.info(`登录..失败`);
            } else {
                console.info(`登录..成功`);
                callback && callback();
                console.log(JSON.stringify(res.body));
            }
        });
}

var getNotes = function (callback) {
    console.info(`读取 sf.gg mds`);
    superagent.get("https://segmentfault.com/user/note")
        .set('Host', 'segmentfault.com')
        .set('Origin', 'https://segmentfault.com')
        .set('Referer', 'https://segmentfault.com/user/login')
        .set('Cookie', cookie)
        .end(function (err, res) {
            if (err) {
                console.log(err)
            }
            else {
                var $ = cheerio.load(res.text);
                $(".stream-list__item").each(function (idx, ele) {
                    var title = $(".title a", $(ele)).text();
                    var id = $(".title a", $(ele)).attr("href").match(/\/n\/(\d*)/)[1];
                    notes[title] = { title, id }
                })
                callback && callback()

            }
        })
}

var editNote = function (id, title, text, callback) {
    console.info(`更新${title}`);
    superagent.post(`https://segmentfault.com/api/note/${id}/edit?_=${token}`)
        .type('form')
        .set('Host', 'segmentfault.com')
        .set('Origin', 'https://segmentfault.com')
        .set('Referer', 'https://segmentfault.com/user/login')
        .set('X-Requested-With', 'XMLHttpRequest')
        .set('Cookie', cookie)
        .send({
            title,
            text,
            id,
            draftId: "",
            isPrivate: 0,
            language: "markdown"
        })
        .end(function (err, res) {
            if (err || !res.ok) {
                console.log(err.status);
                callback && callback("fail")
            } else {
                console.log(`${title} success`)
                callback && callback(null, "success");

            }
        });
}


var addNote = function (title, text, callback) {
    console.info(`提交${title}`);
    superagent.post(`https://segmentfault.com/api/notes/add?_=${token}`)
        .type('form')
        .set('Host', 'segmentfault.com')
        .set('Origin', 'https://segmentfault.com')
        .set('Referer', 'https://segmentfault.com/user/login')
        .set('X-Requested-With', 'XMLHttpRequest')
        .set('Cookie', cookie)
        .send({
            title,
            text,
            id: "",
            draftId: "",
            isPrivate: 0,
            language: "markdown"
        })
        .end(function (err, res) {
            if (err || !res.ok) {
                console.log(err.status);
                callback && callback("fail")
            } else {
                if (/record_note_fast/.test(res.text)) {
                    callback && callback("record_note_fast")
                }
                else {
                    console.log(`${title} success`)
                    setTimeout(function() {
                        
                    callback && callback(null, "success");
                    }, 61000);
                   
                }

            }
        });
}



var getLocalNotes = function () {
    console.info(`读取本地mds`);
    var mds = glob.sync("**/*.md", { ignore: "node_modules/**" })

    for (var i in mds) {
        if (/\.md/.test(mds[i])) {
            var content = fs.readFileSync(path.join(__dirname, mds[i]), 'utf8');
            localNotes[mds[i]] = { title: mds[i], content };
        }
    }



}


//执行推送任务
var action = function () {

    user = "471060995@qq.com";
    pw = "159357";

    index(function () {
        login(function () {
            getNotes(function () {
                getLocalNotes();
                async.mapLimit(localNotes, 1, function iteratee(item, callback) {
                    if (notes[item.title]) {
                        editNote(notes[item.title].id, item.title, item.content, callback);
                    }
                    else {
                        addNote(item.title, item.content, callback)
                    }
                }, function callback(err, results) {
                    if (err) {
                        console.error(err)
                    }
                    if (results) {
                        console.info("done");
                    }
                })



            })
        })
    });


}


action();
