# CSS性能

## 原理

### 匹配方式
The style system matches rules starting with the key selector, then moving to the left, looking for any ancestors in the rule’s selector. As long as the selector’s subtree continues to check out, the style system continues moving to the left until it either matches the rule, or abandons it because of a mismatch.

从右向左

```less
.nav ul.list li div{}
//会便利所有div 再找到li 再到ul.list 再到.nav
```

### 应用范围
If you specify a stylesheet as an XBL resource, the styles only apply to the bound elements and their anonymous content. 

### 前缀
There are always a few browser-specific or experimental tags and CSS properties which are prefixed with a term identifying the browser it works on (such as -webkit, -moz, -ms, -o, and so forth). Once a tag or property is standardized, the prefixes are removed. For example, until border-radius was standardized and implemented by all the major browsers, you had to use -webkit-border-radius, -moz-border-radius, etc.

### 表达式
 Css表达式的作用是动态设置css属性，表达式不只是有兼容性问题，还有性能问题，例如浏览器大小改动、窗口改动时，会使得浏览器频繁计算，性能消耗极大。同样的效果可以用javascript来实现。

### 代码量
减少无意义的代码

### @import阻塞
@import导入的新样式文件会阻止页面的并行下载，这样增加了文件的整体加载时间。

### css图片处理
- 如果图片原始尺寸和实际需求不同，在使用过程中就会存在性能问题，利用样式缩放会带来cpu的额外计算过程，增加了图片在浏览器的渲染时间，网络传输过程也会占更多带宽，增加下载时间。因此，最佳做法是，为需要的部分单独做一套图片，初始页面加载时就能更快展示。
- 合并加载



## 结论

- 避免使用通配符
- 避免使用标签选择器和单个属性选择器作为关键选择器
- 不要在id选择器前加标签名
- 尽量不要在选择符定义过多层级，层级越少，同时也降低了css和dom结构的耦合程度，提高样式的可维护性
- 仅添加必要的前缀
- 少用表达式
- 删除无用定义
- 不用@import
- 允许条件下不给图片设置尺寸
- 雪碧图


> [ref]
https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Writing_efficient_CSS
http://www.html-js.com/article/Front-end-home-best-practice-in-front-of-the-web-high-performance-CSS
