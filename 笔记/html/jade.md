# jade 笔记

- Rename from "Jade"  => "pug"

![doge](https://camo.githubusercontent.com/be9ed9b1e0a28a074109fc994da6d00c1d8cd6e6/68747470733a2f2f63646e2e7261776769742e636f6d2f7075676a732f7075672d6c6f676f2f336561326433613836633632323730323064643562323037343361356161343538383038636134652f5356472f5f5f7075672d6c6f676f2d636f6c6f75722d776964652e737667)

<!--more-->

```jade
doctype html
html(lang="en")
  head
    title= pageTitle
    script(type='text/javascript').
      if (foo) bar(1 + 5)
  body
    h1 Pug - node template engine
    #container.col
      if youAreUsingPug
        p You are amazing
      else
        p Get on it!
      p.
        Pug is a terse and simple templating language with a
        strong focus on performance and powerful features.
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Pug</title>
    <script type="text/javascript">
      if (foo) bar(1 + 5)
    </script>
  </head>
  <body>
    <h1>Pug - node template engine</h1>
    <div id="container" class="col">
      <p>You are amazing</p>
      <p>Pug is a terse and simple templating language with a strong focus on performance and powerful features.</p>
    </div>
  </body>
</html>
```


>[参考资料]
https://github.com/pugjs/pug
http://jade-lang.com/