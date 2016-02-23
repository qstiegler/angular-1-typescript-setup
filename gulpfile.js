var gulp = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var symlink = require('gulp-symlink');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var mincss = require('gulp-minify-css');
var ngAnnotate = require('gulp-ng-annotate');

var tsProject = ts.createProject('tsconfig.json');

var onError = function(err) {
    notify.onError({
                title: "Gulp",
                subtitle: "Failure!",
                message: "Error: <%= error.message %>",
                sound: "Beep"
            })(err);

    this.emit('end');
};

var srcFiles = {
    ts: ['./src/app/**/*.ts'],
    vendor: ['./node_modules/angular/angular.min.js', './node_modules/angular-route/angular-route.min.js'],
    template: './src/index.html',
    sass: ['./src/assets/sass/style.scss'],
    sassAll: ['./src/assets/sass/**/*.scss']
};

var targetPaths = {
    js: './dist/js',
    css: './dist/css',
    vendor: './dist/vendor',
    views: './dist/views',
    tepmlate: './dist'

};

gulp.task('clean-scripts', function() {
    return del([targetPaths.js]);
});

gulp.task('clean-css', function() {
    return del([targetPaths.css]);
});

gulp.task('clean-vendor', function() {
    return del([targetPaths.vendor]);
});

gulp.task('clean-views', function() {
    return del([targetPaths.views]);
});

gulp.task('clean-template', function() {
    return del([targetPaths.tepmlate + '/index.html']);
});

gulp.task('css', ['clean-css'], function() {
    return gulp.src(srcFiles.sass)
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sass())
        .pipe(mincss())
        .pipe(gulp.dest(targetPaths.css))
        .pipe(notify({
            title: 'Gulp',
            subtitle: 'Success',
            message: 'CSS files created',
            sound: "Pop"
        }));
});

gulp.task('scripts', ['clean-scripts'], function() {
    return tsProject.src()
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .pipe(concat('app.min.js'))
        .pipe(ngAnnotate({ add: true }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(targetPaths.js))
        .pipe(notify({
            title: 'Gulp',
            subtitle: 'Success',
            message: 'JavaScript files created',
            sound: "Pop"
        }));
});

gulp.task('vendor', ['clean-vendor'], function() {
    return gulp.src(srcFiles.vendor)
        .pipe(plumber({ errorHandler: onError }))
        .pipe(gulp.dest(targetPaths.vendor))
        .pipe(notify({
            title: 'Gulp',
            subtitle: 'Success',
            message: 'Vendor files moved',
            sound: "Pop"
        }));
});

gulp.task('views', ['clean-views'], function() {
    return gulp.src('src/app/views')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(symlink(targetPaths.views))
        .pipe(notify({
            title: 'Gulp',
            subtitle: 'Success',
            message: 'View files moved',
            sound: "Pop"
        }));
});

gulp.task('template', ['clean-template'], function() {
    return gulp.src(srcFiles.template)
        .pipe(plumber({ errorHandler: onError }))
        .pipe(gulp.dest(targetPaths.tepmlate))
        .pipe(notify({
            title: 'Gulp',
            subtitle: 'Success',
            message: 'Template moved',
            sound: "Pop"
        }));
});

gulp.task('watch-ts', function() {
    gulp.watch(srcFiles.ts, ['scripts']);
});

gulp.task('watch-sass', function() {
    gulp.watch(srcFiles.sassAll, ['css']);
});

gulp.task('default', ['scripts', 'css', 'vendor', 'views', 'template']);