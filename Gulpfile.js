var gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    concatCss = require('gulp-concat-css'),
    surge = require('gulp-surge'),
    concat = require('gulp-concat-util'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass');

gulp.task('css', function () {
    gulp.src('./themes/ceevee/assets/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./themes/ceevee/static/css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./themes/ceevee/static/css'));
});

gulp.task('js', function () {
    gulp.src([
        './themes/ceevee/assets/js/jquery-migrate-1.2.1.min.js',
        './themes/ceevee/assets/js/jquery.flexslider.js',
        './themes/ceevee/assets/js/waypoints.js',
        './themes/ceevee/assets/js/jquery.fittext.js',
        './themes/ceevee/assets/js/init.js'
    ])
        .pipe(concat('dist.js'))
        .pipe(concat.header('// file: <%= file.path %>\n'))
        .pipe(concat.footer('\n// end\n'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./themes/ceevee/static/js'));
});

gulp.task('deploy', [], function () {
    return surge({
        project: './public',         // Path to your static build directory
        domain: 'https://resume.julienliabeuf.com'  // Your domain or Surge subdomain
    })
});

gulp.task('assets', ['css', 'js']);