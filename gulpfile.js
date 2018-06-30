
var gulp = require('gulp'),
    cssimport = require('postcss-import'),
    cssvars = require('postcss-simple-vars'),
    autoprefixer = require('autoprefixer'),
    postcss = require('gulp-postcss'),
    cssnested = require('postcss-nested'),
    mixins = require('postcss-mixins'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    watch = require('gulp-watch');

gulp.task('styles', function(){
    return gulp.src('./app/assets/css/styles/main.css')
        .pipe(postcss([cssimport,mixins,cssvars,cssnested,autoprefixer()]))
        .on('error', function (errorInfo) {
            console.log(errorInfo.toString());
            this.emit('end');
        })
        .pipe(rename('style.css'))
        .pipe(gulp.dest('./app/assets/css'));
});

gulp.task('cssInject',['styles'],function(){
    return gulp.src('./app/assets/css/style.css')
        .pipe(browserSync.stream());
});

gulp.task('watch', function(){
    browserSync.init({
        server:{
            baseDir : "app"
        }
    });

    watch('./app/index.html', function(){
        browserSync.reload();
    });

    watch('./app/assets/css/styles/**/*.css', function(){
        gulp.start('cssInject');
    });
});
