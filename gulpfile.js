const gulp = require('gulp');
const compiler = require('google-closure-compiler').gulp();
const log = require('fancy-log');
const size = require('gulp-size');

gulp.task('default', function () {
    return gulp.src(['./compress.js', './decompress.js', './index.js', './num-encode.js'], { base: './' })
        .pipe(compiler({
            compilationLevel: 'ADVANCED',
            warningLevel: 'QUIET',
            languageIn: 'ECMASCRIPT6_STRICT',
            languageOut: 'ECMASCRIPT3',
            outputWrapper: '(function(){%output%}).call(this);',
            process_common_js_modules: true,
            jsOutputFile: 'compress.min.js',
            createSourceMap: true,
        }))
        // .on('error', console.error)
        .pipe(size())
        .pipe(size({ gzip: true }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
    return gulp.watch('./src/**/*', ['default']);
});



