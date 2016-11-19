# webpack2 
https://webpack.js.org/

## config
https://webpack.js.org/configuration/

- Rule
A Rule can be separated into three parts: Conditions, Results and nested Rules.



## loaders  
http://webpack.github.io/docs/list-of-loaders.html

- https://github.com/babel/babel-loader  
```bash
npm install babel-loader babel-core babel-preset-env
```
- https://github.com/webpack/html-loader  

- https://github.com/webpack/json-loader

- https://github.com/webpack/url-loader  
The url loader works like the file loader, but can return a Data Url if the file is smaller than a byte limit.

- https://github.com/webpack/css-loader  
@import and url(...) are interpreted like require() and will be resolved by the css-loader. 

- https://github.com/webpack/less-loader  
The less-loader requires less as peer dependency. Thus you are able to specify the required version accurately.

- https://github.com/vuejs/vue-loader  
for vue，根据**额外的配置**使用特定的loader处理vue文件里的template script style  
默认是html-loader vue-style-loader!css-laoder bable-loader 
蜜汁默认行为略多。

```javascript
options:{
    loaders: {
        css: ExtractTextPlugin.extract("css"),
        less: ExtractTextPlugin.extract(['css', 'less'])

    },
    postcss: [
        cssnext({ browsers: ['last 3 versions', "Safari >= 8"], }),
    ]

}
```



## plugins
http://webpack.github.io/docs/list-of-plugins.html

- https://github.com/ampedandwired/html-webpack-plugin
This is a webpack plugin that simplifies creation of HTML files to serve your webpack bundles. This is especially useful for webpack bundles that include a hash in the filename which changes every compilation. You can either let the plugin generate an HTML file for you, supply your own template using lodash templates or use your own loader.

- https://github.com/webpack/extract-text-webpack-plugin
It moves every require("style.css") in entry chunks into a separate css output file. So your styles are no longer inlined into the javascript, but separate in a css bundle file (styles.css). 

- webpack.optimize.UglifyJsPlugin
Minimize all JavaScript output of chunks. Loaders are switched into minimizing mode.


## demo

