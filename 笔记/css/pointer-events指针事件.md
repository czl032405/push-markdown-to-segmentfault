# pointer-events

## 用途
CSS鼠标指针事件pointer-events属性非常的有趣，它的功效非常像JavaScript，当你把这个属性设置为none时，它能有效的阻止禁止这个元素，你也许会说“这又如何？”，但事实上，它是禁止了这个元素上的任何JavaScript事件或回调函数！
.disabled { pointer-events: none; }
点击这个元素，你会发现任何你放置在这个元素上的监听器都不会触发任何事件。一个神奇的功能，真的——你不在需要为了防止某个事件会被触发而去检查某个css类是否存在。


