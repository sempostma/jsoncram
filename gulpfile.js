const gulp = require('gulp');
const compiler = require('google-closure-compiler').gulp();
const log = require('fancy-log');
const size = require('gulp-size');

gulp.task('default', ['compile', 'decompress-only']);

const compile = (files, output) => gulp.src(files, { base: './' })
    .pipe(compiler({
        compilationLevel: 'ADVANCED',
        warningLevel: 'QUIET',
        languageIn: 'ECMASCRIPT6_STRICT',
        languageOut: 'ECMASCRIPT3',
        outputWrapper: '(function(){%output%}).call(this);',
        process_common_js_modules: true,
        jsOutputFile: output,
        createSourceMap: true,
    }))
    .pipe(size())
    .pipe(size({ gzip: true }))
    .pipe(gulp.dest('./dist'));

gulp.task('compile', function () {
    return compile(['exports/window-default.js', 'lib/compress.js', 'lib/decompress.js', 'lib/index.js', 'lib/num-encode.js'], 'json-compress.min.js');
});

gulp.task('decompress-only', function () {
    return compile(['exports/window-decompress-only.js', 'lib/decompress.js', 'lib/num-encode.js'], 'json-decompress-only.min.js');
});

gulp.task('watch', function () {
    return gulp.watch('./lib/**/*', ['default']);
});



