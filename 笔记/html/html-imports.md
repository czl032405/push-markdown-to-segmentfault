https://www.w3.org/TR/html-imports/


```
 <link rel="import" href="/imports/heart.html">

```

```javascript
 var link = document.querySelector('link[rel=import]');
 var heart = link.import;
 var pulse = heart.querySelector('div.pulse');
```

