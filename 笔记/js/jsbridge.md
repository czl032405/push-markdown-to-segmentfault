
# js - webview 交互

## 原理

### 安卓
  - 直接注入javascript对象进入window中
  - 通过地址栏直接执行**javascript:alert(233)**

### IOS
  - 拦截页面请求如iframe并解析,一般前端通过更改iframe的src,如appSchema://jsonStr来实现
  - 也能直接执行javascript代码



## 异步调用方案
 - [安卓](https://github.com/lzyzsd/JsBridge)
 - [IOS](https://github.com/marcuswestin/WebViewJavascriptBridge)
 - javascript
 ```javascript
 //app-api.js
 //require jquery
(function() {
    var AppApi = {
        showErr: true,
        bridge: null,
        taskQueue: [],
        registerTaskQueue: [],
        buildURLParam: function(paramObj) {
            var param = [];
            for (var i in paramObj) {
                param.push(i + "=" + paramObj[i]);
            }
            param = param.join("&");
            return param;
        },
        debug: function(type, methodName, param) {
            $.ajax({
                url: "/debug",
                data: {
                    userAgent: /iphone|ipad/i.test(navigator.userAgent)? 'ios' : 'andriod',
                    type: type,
                    methodName: methodName,
                    param: param
                },
                type: "GET",
                dataType: 'json',
                success: function() {
                    console.log('debug success');
                },
                error: function(err) {
                    console.log('debug err');
                }
            });
        },
        callHandler: function(name, param, dtd) {
            console.log(name + " " + (param ? JSON.stringify(param) : ""));
            var dtd = dtd || $.Deferred();
            if (this.bridge) {
                this.debug('callHandler', name, param);
                this.bridge.callHandler && this.bridge.callHandler(name, param, function responseCallback(responseData) {
                    console.info(responseData);
                    try {
                        responseData = JSON.parse(responseData);
                        dtd.resolve(responseData);
                    } catch (e) {
                        dtd.resolve(responseData);
                    }
                });
            } else {
                AppApi.taskQueue.push({
                    name: name,
                    param: param,
                    dtd: dtd
                });
            }
            return dtd;
        },
        registerHandler: function(name, callback) {
            console.log(name + " " + "registered");
            debug = this.debug;
            if (this.bridge) {
                this.bridge.registerHandler(name, function(param, responseCallback) {
                    console.log(name + " called");
                    debug('registerHandler', name, param);
                    callback(param, responseCallback);
                    responseCallback(name + " callback ed");
                });
            } else {
                AppApi.registerTaskQueue.push({
                    name: name,
                    callback: callback
                });
            }
        },
        setupWebViewJavascriptBridge: function(callback) {
            //for-test
            // if (/localhost|shabee.com/.test(location.href)) {
            //     return callback(testBridge);
            // }
            //
            if (window.WebViewJavascriptBridge) {
                return callback(WebViewJavascriptBridge);
            } else {
                document.addEventListener('WebViewJavascriptBridgeReady', function() {
                    callback(WebViewJavascriptBridge);
                }, false);
            }
            if (!/iphone|ipad/i.test(navigator.userAgent)) {
                return;
            }
            if (window.WVJBCallbacks) {
                return window.WVJBCallbacks.push(callback);
            }
            window.WVJBCallbacks = [callback];
            var WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function() {
                document.documentElement.removeChild(WVJBIframe);
            }, 0);
        },
        init: function(params) {
            this.setupWebViewJavascriptBridge(function(bridge) {
                AppApi.bridge = bridge;
                bridge.init && bridge.init(function(message, responseCallback) {
                    responseCallback("bridge init");
                });

                for (var t in AppApi.taskQueue) {
                    var hp = AppApi.taskQueue[t];
                    AppApi.callHandler(hp.name, hp.param, hp.dtd);
                }
                for (var t in AppApi.registerTaskQueue) {
                    var rt = AppApi.registerTaskQueue[t];
                    AppApi.registerHandler(rt.name, rt.callback);
                }
                AppApi.taskQueue = [];
                AppApi.registerTaskQueue = [];
            })
        }
    }

    AppApi = $.extend(AppApi, {
        //callHandler api
        bindStore: function(storeTel) {
            return AppApi.callHandler("nt_bindStore", {
                storeTel: storeTel,
            });
        },
        setTitle: function(title) {
            document.title = title;
            return AppApi.callHandler("nt_setTitle", {
                title: title
            });
        },

        //registerhandler api
        registerJSTestHandler: function(callback) {
            AppApi.registerHandler('js_test', function(param, responseCallback) {
                callback && callback(param, responseCallback)
            })
        },
        registerCalendarCoverPreviewHandler:function(callback) {
            AppApi.registerHandler('js_CalendarCoverPreview', function(param, responseCallback) {
                callback && callback(param, responseCallback)
            })
        },
    })
    AppApi.init();
    window.AppApi = AppApi;
})();

 ```

 ```javascript
 //test-bridge.js
 //用于模拟webview实现
var sha1 = require("sha1");
var STORETEL = "18501378265";
var LKEY = "233";
var SERVICE_URL = "./data/";
var SERVICE_SCHEMA = SERVICE_URL + "api.jsp";
var methodsMap = {
    "nt_bindStore": "api/org/storeInfo",
    "nt_getAreaList": "api/org/areaList",
    "nt_getAreaDetail": "api/org/areaDetail",
    
}
var callHandlers = {
    "nt_getCart": function (data, responseCallback) {
        responseCallback([]);
    },
    "nt_updateCart": function (data, responseCallback) {
        console.info(data);
        responseCallback(data);
    },
  
}
var handlers = {}
var getData = function (method, paramObj) {
    var url = method;
    if (!method) {
        return;
    }
    if (!/http/.test(method)) {
        url = SERVICE_URL + method;
    }
    return Vue.http.post(url, buildParam(paramObj), { emulateJSON: true });
}
var buildParam = function (paramObj) {
    paramObj = paramObj || {};
    var time = new Date().getTime().toString();
    var rTime = time.substring(0, time.length - 6);
    paramObj.rtime = rTime;
    var paramStrArr = [], paramStr = "";
    for (var i in paramObj) {
        //paramObj[i] = encodeURI(paramObj[i]);
        //typeof paramObj[i] == "string" && (paramObj[i] = paramObj[i].replace(/\s/g, ""));
        paramStrArr.push(i + "=" + paramObj[i]);
    }
    paramStr = paramStrArr.sort().join("&");
    var key = sha1(paramStr + LKEY);
    paramObj.lsign = key;
    paramObj.rtime = time;
    return paramObj;
}

module.exports = {
    callHandler: function (handlerName, data, responseCallback) {
        if (arguments.length == 2 && typeof data == 'function') {
            responseCallback = data;
            data = null;
        }
        if (handlerName == "nt_bindStore") {
            data.tel = STORETEL;
        }
        if (callHandlers[handlerName]) {
            callHandlers[handlerName](data, responseCallback);
        }
        else if(methodsMap[handlerName]) {
            getData(methodsMap[handlerName], data).then(function success(res) {
                responseCallback(res.data);
            }, function error(e) {
                responseCallback({ error: true, msg: e })
            })
        }

    },
    registerHandler: function (handlerName, handler) {
        handlers[handlerName] = handler;
    },
}

//test
// var runJsHandler = function (handlerName, param, callback) {
//     if (handlers[handlerName]) {
//         handlers[handlerName](param, function (callbackstr) {
//             callback && callback(callbackstr);
//         })
//     }
// }
// if (/localhost/.test(location.href)) {
//     setTimeout(function () {
//         runJsHandler("js_test", { paramA: 2333 }, function (d) {
//             console.info(d);
//         })
//     }, 3000);
// }

 ```

>参考资料
>https://github.com/lzyzsd/JsBridge  
>https://github.com/marcuswestin/WebViewJavascriptBridge
