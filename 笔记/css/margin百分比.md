# 定义
The percentage is calculated with respect to the width of the generated box's containing block. Note that this is true for 'margin-top' and 'margin-bottom' as well. If the containing block's width depends on this element, then the resulting layout is undefined in CSS 2.2.

规范中注明 margin 的百分比值参照其包含块的宽度进行计算。

这只发生在默认的 writing-mode: horizontal-tb; 和 direction: ltr; 的情况下。


> [ref]
https://www.w3.org/TR/CSS22/visudet.html#Computing_widths_and_margins
