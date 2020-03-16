const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const del = require('del');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');

const sassFiles = [
    './node_modules/@glidejs/glide/src/assets/sass/glide.core.scss',
    './node_modules/@glidejs/glide/src/assets/sass/glide.theme.scss',
    './src/scss/main.scss',
    './src/scss/media.scss'
]

const jsFiles = [
    './node_modules/@glidejs/glide/dist/glide.min.js',
    './src/js/googleMaps.js',
    './node_modules/jquery/dist/jquery.min.js',
    './src/js/slider.js',
    './src/js/const.js',
    './src/js/main.js'
]

function styles(){
    return gulp.src(sassFiles)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: false }))
    .pipe(cleanCSS({level:2}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
}

function scripts(){
    return gulp.src(jsFiles)
	.pipe(concat('index.js'))
    .pipe(uglify({toplevel:true}))
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
}

function imagies(){
    return gulp.src('./src/img/*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(gulp.dest('./build/img'))
}

function clean(){
    return del(['build/*'])
}

function watch(){
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/scss/**/*.scss', styles)
    gulp.watch('./src/js/**/*.js', scripts)
    gulp.watch('./src/img/**', imagies)
    gulp.watch("./*.html").on('change', browserSync.reload);
}

gulp.task('watch', watch)
gulp.task('build', gulp.series(clean,  gulp.parallel(styles, scripts, imagies)))
gulp.task('dev', gulp.series('build', 'watch'))