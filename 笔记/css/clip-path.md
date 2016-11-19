# CSS Masking Module
CSS Masking provides two means for partially or fully hiding portions of visual elements: masking and clipping.

Masking describes how to use another graphical element or image as a luminance or alpha mask. Typically, rendering an element via CSS or SVG can conceptually described as if the element, including its children, are drawn into a buffer and then that buffer is composited into the element’s parent. Luminance and alpha masks influence the transparency of this buffer before the compositing stage.

Clipping describes the visible region of visual elements. The region can be described by using certain SVG graphics elements or basic shapes. Anything outside of this region is not rendered. CSS is a language for describing the rendering of structured documents (such as HTML and XML) on screen, on paper, in speech, etc.

## clip-path
- Name:	clip-path
- Value:	<clip-source> | [ <basic-shape> || <geometry-box> ] | none
- Initial:	none
- Applies to:	All elements. In SVG, it applies to container elements without the <defs> element and all graphics elements
- Inherited:	no
- Media:	visual
- Computed value:	as specified, but with <url> values made absolute
- Percentages:	as specified
- Animatable:	See shape-outside [CSS-SHAPES]

## mask-image
- Name:	mask-image
- Value:	<mask-reference>
- Initial:	none
- Applies to:	All elements. In SVG, it applies to container elements without the <defs> element and all graphics elements
- Inherited:	no
- Media:	visual
- Computed value:	as specified, but with URIs made absolute
- Percentages:	n/a
- Animatable:	no

> [ref]
https://www.w3.org/TR/2014/WD-css-masking-1-20140213/
http://www.species-in-pieces.com/#
http://www.tuicool.com/articles/yaYvqu
http://cssplant.com/clip-path-generator