const {src, dest, watch, series, parallel} = require("gulp");
const concat = require("gulp-concat");
const uglifyEs = require("gulp-uglify-es").default;
const imagemin = require('gulp-imagemin');
const htmlmin = require("gulp-htmlmin");
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass'); 
sass.compiler = require('node-sass');
const sourcemaps = require("gulp-sourcemaps");
const gulp = require("gulp");
const babel = require("gulp-babel");

// Sökvägar till filerna
const files = {
    htmlPath: "src/**/*.html",
    jsPath: "src/**/*.js",
    cssPath: "src/**/*.css",
    imagePath: "src/images/*",
    sassPath: "src/sass/*.scss"
}

/*======Olika tasks=====*/

// Task: Kopierar html-filer till pub-mappen
function copyHTML() {
    return src(files.htmlPath)
        .pipe(htmlmin({ collapseWhitespace: true}))
        .pipe(dest("pub"))
        .pipe(browserSync.stream());
}

// Task: Sammanslå js-filer och minifierar och lägger till i pub/js. Js-filerna görs även om till ES5.
function jsTask() {
    return src(files.jsPath)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat("main.js"))
        .pipe(sourcemaps.write("."))
        .pipe(dest("pub/js"))
        .pipe(browserSync.stream());
}
// Task: Sammanslå css-filer och minifierar och lägger till i pub/css.
function cssTask() {
    return src(files.cssPath)
        .pipe(concat("main.css"))
        .pipe(dest("pub/css"))
        .pipe(browserSync.stream());
}
// Task: SASS
function sassTask() {
    return src(files.sassPath)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on("error", sass.logError))
        .pipe(dest("pub/css"))
        .pipe(browserSync.stream());
}
// Task: Komprimerar alla filer från "image", ska då vara bildfiler, och sparar dessa i pub/images.
function imageTask() {
    return src(files.imagePath)
        .pipe(imagemin())
        .pipe(dest("pub/images"))
        .pipe(browserSync.stream());
}

// task: watcher
function watchTask() {
    browserSync.init({
        server: {
            baseDir: 'pub/'
        }
    });
    //Kollar om någon fil i sökvägarna ändrats, kör då funktioner för att kopiera och sammanslå filerna.
    watch([files.htmlPath, files.jsPath, files.cssPath, files.sassPath, files.imagePath],
        parallel(copyHTML, jsTask, cssTask, sassTask, imageTask)).on("change", browserSync.reload);
}

// Gör gulp
exports.default = series(
    parallel(copyHTML, jsTask, cssTask, sassTask, imageTask),
    watchTask);