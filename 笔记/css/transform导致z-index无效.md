# The stacking context
Stacking context is the three-dimensional conceptualization of HTML elements along an imaginary z-axis relative to the user who is assumed to be facing the viewport or the webpage. HTML elements occupy this space in priority order based on element attributes.

## transform
- Name:	transform
- Value:	none | <transform-list>
- Initial:	none
- Applies to:	transformable elements
- Inherited:	no
- Media:	visual
- Computed value:	As specified, but with relative lengths converted into absolute lengths.
- Percentages:	refer to the size of bounding box
- Animatable:	as transform

Any computed value other than none for the transform results in **the creation of both a stacking context and a containing block.** The object acts as a containing block for fixed positioned descendants.

> [ref]
https://segmentfault.com/q/1010000002480824
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
https://www.w3.org/TR/CSS22/visuren.html#z-index
https://www.w3.org/TR/CSS22/visuren.html#layers

