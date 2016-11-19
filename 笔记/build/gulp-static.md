
# gulp-static-demo

```javascript
var gulp = require('gulp');
var less = require('gulp-less');
var fileinclude = require('gulp-file-include');
var sourcemaps = require('gulp-sourcemaps');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });
var combiner = require('stream-combiner2');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;


var paths = {
    css: ["./css/**"],
    less: ["./less/*.*", "!less/base*", "!less/lesshat*", "!less/normalize*"],
    tpl: ["./tpl/*.*"],
    html: ["./*.html"],
    base: "./"
}


gulp.task('html', () => {
    var combined = combiner.obj([
        gulp.src(paths.tpl)
        , (fileinclude({
            prefix: '@@',
            basepath: '@file',
            indent: true,
        }))
        , (gulp.dest(paths.base))
    ]);
    combined.on('error', console.error.bind(console));
    return combined;

});

gulp.task('less', () => {
    var combined = combiner.obj([
        gulp.src(paths.less)
        , (sourcemaps.init())
        , (less({ plugins: [autoprefix] }))
        , (sourcemaps.write())
        , (gulp.dest(paths.base + 'css'))
    ]);
    combined.on('error', console.error.bind(console));

    return combined;
});

gulp.task('watch', () => {
    browserSync.init({
        server: {
            baseDir: paths.base,
            directory: true
        },
        open: false,
        //injectChanges: false,
    });
    gulp.watch("less/**", ['less']).on('end',reload)
    gulp.watch("css/**").on('change',reload)
    gulp.watch("tpl/**", ['html']).on('end',reload)
    gulp.watch("./*.html").on('change',reload)
});


gulp.task('build', ['less', 'html']);
gulp.task('default', ['watch', 'less', 'html']);


```



>[引用]
gulp-file-include
gulp-less
browser-sync
