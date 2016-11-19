## visual effects
https://www.w3.org/TR/CSS22/visufx.html

### overflow的原因

- A line cannot be broken, causing the line box to be wider than the block box.
- A block-level box is too wide for the containing block. This may happen when an element's 'width' property has a value that causes the generated block box to spill over sides of the containing block.
- An element's height exceeds an explicit height assigned to the containing block (i.e., the containing block's height is determined by the 'height' property, not by content height).
- A descendant box is positioned absolutely, partly outside the box. Such boxes are not always clipped by the overflow property on their ancestors; specifically, they are not clipped by the overflow of any ancestor between themselves and their containing block
- A descendant box has negative margins, causing it to be positioned partly outside the box.
- The 'text-indent' property causes an inline box to hang off either the left or right edge of the block box.

Whenever overflow occurs, the 'overflow' property specifies whether a box is clipped to its padding edge, and if so, whether a scrolling mechanism is provided to access any clipped out content.

### overflow:hidden
 It affects the clipping of all of the element's content **except any descendant elements (and their respective content and descendants)** whose containing block is the viewport or an ancestor of the element. Values have the following meanings:

## 例子
https://jsfiddle.net/030kas5w/


## 应用
淘宝C店模板全屏轮播


> [ref]
https://www.w3.org/TR/CSS22/visufx.html