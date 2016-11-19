# rem
 
## 定义
rem（font size of the root element）是指相对于根元素的字体大小的单位。简单的说它就是一个相对单位。看到rem大家一定会想起em单位，em（font size of the element）是指相对于父元素的字体大小的单位。它们之间其实很相似，只不过一个计算的规则是依赖根元素一个是依赖父元素计算。

## 屏幕1/20配置

```css

@media screen and (min-width:320px) {
    html {
        font-size: 16px;
    }
}
@media screen and (min-width:360px) {
    html {
        font-size: 18px;
    }
}
@media screen and (min-width:375px) {
    html {
        font-size: 18.75px;
    }
}
@media screen and (min-width:384px) {
    html {
        font-size: 19.2px;
    }
}
@media screen and (min-width:414px) {
    html {
        font-size: 20.7px;
    }
}
@media screen and (min-width:425px) {
    html {
        font-size: 21.25px;
    }
}
@media screen and (min-width:500px) {
    html {
        font-size: 25px;
    }
}
@media screen and (min-width:600px) {
    html {
        font-size: 30px;
    }
}
@media screen and (min-width:640px)  and (orientation : portrait) {
    html {
        font-size: 32px;
    }
}

@media screen and (min-width:768px) and (orientation : portrait) {
    html {
        font-size: 38.4px;
    }
}
@media screen and (min-width:1024px) and (orientation : portrait) {
    html {
        font-size: 51.2px;
    }
}
@media screen and (min-width:1536px) and (orientation : portrait) {
    html {
        font-size: 76.8px;
    }
}

```


> [ref]
https://isux.tencent.com/web-app-rem.html
https://www.w3.org/WAI/tutorials/page-structure/styling/

