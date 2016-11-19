- IIFE（Imdiately Invoked Function Expression 立即执行的函数表达式）

```javascript
function(){
    alert('IIFE');
}
//Uncaught SyntaxError: Unexpected token (

```

```javascript
!function(){
    alert('IIFE');
}
//false
```

其实在匿名函数前面加上这些符号后，就把一个函数声明语句变成了一个函数表达式，是表达式就会在script标签中自动执行。

```javascript
!function(){alert('iifksp')}()        // true
+function(){alert('iifksp')}()        // NaN
-function(){alert('iifksp')}()        // NaN
~function(){alert('iifksp')}()        // -1
```

用 ! 可能更多的是一个习惯问题，不同的运算符，性能是不同的。

> [ref]
http://www.cnblogs.com/yichengbo/p/3794515.html