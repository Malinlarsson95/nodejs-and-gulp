const {src, dest, watch, series, parallel} = require("gulp");
const concat = require("gulp-concat");
const uglifyEs = require("gulp-uglify-es").default;
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const htmlmin = require("gulp-htmlmin");

// Sökvägar till filerna
const files = {
    htmlPath: "src/**/*.html",
    jsPath: "src/**/*.js",
    cssPath: "src/**/*.css",
    imagePath: "src/images/*"
}

/*======Olika tasks=====*/

// Task: Kopierar html-filer till pub-mappen
function copyHTML() {
    return src(files.htmlPath)
        .pipe(htmlmin({ collapseWhitespace: true}))
        .pipe(dest("pub"));
}

// Task: Sammanslå js-filer och minifierar och lägger till i pub/js.
function jsTask() {
    return src(files.jsPath)
        .pipe(concat("main.js"))
        .pipe(uglifyEs())
        .pipe(dest("pub/js"));
}
// Task: Sammanslå css-filer och minifierar och lägger till i pub/css.
function cssTask() {
    return src(files.cssPath)
    .pipe(concat("main.css"))
    .pipe(cssnano())
    .pipe(dest("pub/css"));
}
// Task: Komprimerar alla filer från "image", ska då vara bildfiler, och sparar dessa i pub/images.
function imageTask() {
    return src(files.imagePath)
        .pipe(imagemin())
        .pipe(dest("pub/images"));
}

// task: watcher
function watchTask() {
    watch([files.htmlPath, files.jsPath, files.cssPath, files.imagePath],
        parallel(copyHTML, jsTask, cssTask, imageTask));
}

exports.default = series(
    parallel(copyHTML, jsTask, cssTask, imageTask),
    watchTask);