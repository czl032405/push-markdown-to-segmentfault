# Validation
https://www.w3.org/wiki/HTML5_form_additions#Validation

## checkValidity方法
checkValidity方法表示执行原生的表单验证，如果验证通过返回true。如果验证失败，则会触发一个invalid事件。使用该方法以后，会设置validity对象的值。

## setCustomValidity方法
setCustomValidity方法用于自定义错误信息，该提示信息也反映在该输入框的validationMessage属性中。如果将setCustomValidity设为空字符串，则意味该项目验证通过。

## validity对象


每一个表单元素都有一个validity对象，它有以下属性。

* valid：如果该元素通过验证，则返回true。
* valueMissing：如果用户没填必填项，则返回true。
* typeMismatch：如果填入的格式不正确（比如Email地址），则返回true。
* patternMismatch：如果不匹配指定的正则表达式，则返回true。
* tooLong：如果超过最大长度，则返回true。
* tooShort：如果小于最短长度，则返回true。
* rangeUnderFlow：如果小于最小值，则返回true。
* rangeOverflow：如果大于最大值，则返回true。
* stepMismatch：如果不匹配步长（step），则返回true。
* badInput：如果不能转为值，则返回true。
* customError：如果该栏有自定义错误，则返回true。


