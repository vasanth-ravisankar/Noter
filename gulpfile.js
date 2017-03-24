//gulp.js

var gulp = require("gulp");
var browserify = require("browserify");
var reactify = require("reactify");
var source = require("vinyl-source-stream");

gulp.task("bundle", function () {
    return browserify({
        entries: "./app/main.jsx",
        debug: true
    }).transform(reactify)
        .bundle()
        .pipe(source("main.js"))
        .pipe(gulp.dest("server/public"))
});

gulp.task("copy", ["bundle"], function () {
    return gulp.src(["app/index.html", "app/style.css"])
        .pipe(gulp.dest("server/public"));
});

// gulp.task("copy", function () {
//     return gulp.src(["bower_components/materialize/dist/**/*"])
//         .pipe(gulp.dest("server/public/materialize"));
// });
// gulp.task("copy", function () {
//     return gulp.src(["bower_components/jquery/dist/jquery.min.js"])
//         .pipe(gulp.dest("server/public/jquery/"));
// });

gulp.task("default",["copy"],function(){
   console.log("Gulp completed...");
});
