## 获取方法名
```javascript
Function.prototype.getName = function(){
    return this.name || this.toString().match(/function\s*([^(]*)\(/)[1]
}
```

```javascript
 var getFnName = function(callee){
      var _callee = callee.toString().replace(/[\s\?]*/g,""),
      comb = _callee.length >= 50 ? 50 :_callee.length;
      _callee = _callee.substring(0,comb);
      var name = _callee.match(/^function([^\(]+?)\(/);
      if(name && name[1]){
        return name[1];
      }
      var caller = callee.caller,
      _caller = caller.toString().replace(/[\s\?]*/g,"");
      var last = _caller.indexOf(_callee),
      str = _caller.substring(last-30,last);
      name = str.match(/var([^\=]+?)\=/);
      if(name && name[1]){
        return name[1];
      }
      return "anonymous"
    };


      function  ee(){
      //+++++++++++++++++++++++++++++++++
      var fnname =getFnName(arguments.callee)
      //+++++++++++++++++++++++++++++++++
      alert(fnname)
    };
    ee();
```


