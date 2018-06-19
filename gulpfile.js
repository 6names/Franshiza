var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sortCSSmq = require('sort-css-media-queries'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    svgstore = require('gulp-svgstore'),
    mqpacker = require("css-mqpacker"),
    postcss = require('gulp-postcss'),
    plumber = require('gulp-plumber'),
    htmlmin = require('gulp-htmlmin'),
    svgmin = require('gulp-svgmin'),
    rename = require("gulp-rename"),
    run = require('run-sequence'),
    clean = require('gulp-clean'),
    csso = require('gulp-csso'),
    sass = require('gulp-sass'),
    image = require('gulp-image'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    path = require('path');

var paths = {
    dev: {
        css: {
            src: './src/css/style.scss',
            dist: './src/css/'
        },
        js: {
            src: [
                './src/js/components/browser-detect.js',
                './node_modules/tiny-slider/dist/tiny-slider.js',
                './src/js/components/modals.js',
                './src/js/components/validation.js',
                './src/js/index.js'
            ],
            dist: './src/js/'
        },
        html: {
            clean: './src/*.html',
            src: './src/*.html',
            dist: './src/'
        },
        svg: {
            src: './src/images/svg/*.svg',
            dist: './src/images/ui/'
        }
    },

    build: {
        dist: './dist/',
        clean: './dist/*',
        css: './dist/css/',
        js: './dist/js/',
        svg: './dist/images/ui/',
        images: {
            src: ['./src/images/**/*', '!./src/images/svg', '!./src/images/svg/**'],
            dist: './dist/images/'
        },
        fonts: {
            src: './src/fonts/*',
            dist: './dist/fonts/'
        },
        modals: {
            src: './src/modals/*',
            dist: './dist/modals/'
        }
    },

    watch: {
        css: './src/css/**/*.scss',
        js: ['./src/js/**/*.js', '!./src/js/main.js'],
        jsMain: './src/js/main.js',
        html: './src/**/*.html',
        svg: './src/images/svg/*.svg',
        images: './src/images/*'
    }
};

// ________________DEVELOPMENT______________

// Static Server + Watching on SCSS, HTML, JS, IMAGES
gulp.task('serve', function (fn) {
    run('sass', 'scripts', 'svg', fn);
    browserSync.init({
        server: "./src/",
        notify: false
    });
    
    gulp.watch(paths.watch.css, ['sass']).on('change', browserSync.reload);
    gulp.watch(paths.watch.js, ['scripts']);
    gulp.watch(paths.watch.jsMain).on('change', browserSync.reload);
    gulp.watch(paths.watch.html).on('change', browserSync.reload);
    gulp.watch(paths.watch.svg, ['svg']).on('change', browserSync.reload);
    gulp.watch(paths.watch.images).on('change', browserSync.reload);
});

// SVG
gulp.task('svg', function () {
    return gulp
        .src(paths.dev.svg.src, {base: 'src/svg'})
        .pipe(rename({prefix: 'icon-'}))
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(rename('ui-icons.svg'))
        .pipe(gulp.dest(paths.dev.svg.dist));
});

// SASS
gulp.task('sass', function () {
    return gulp.src(paths.dev.css.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([
            mqpacker({
                sort: sortCSSmq.desktopFirst
            })
        ]))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dev.css.dist));
});

// JS
gulp.task('scripts', function () {
    return gulp.src(paths.dev.js.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dev.js.dist));
});

// __________________BUILD___________________
// Build task
gulp.task('build', function (fn) {
    run('clean',
        'copy-fonts',
        'sass-build',
        'scripts-build',
        'html-build',
        'images-build',
        fn);
});

// Clear Dist folder
gulp.task('clean', function () {
    return gulp.src(paths.build.clean, {read: false})
        .pipe(clean());
});

// SASS
gulp.task('sass-build', function () {
    return gulp.src(paths.dev.css.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer({
                browsers: ['last 2 version']
            }),
            mqpacker({
                sort: sortCSSmq.desktopFirst
            })
        ]))
        .pipe(csso())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.build.css));
});

// JS
gulp.task('scripts-build', function () {
    return gulp.src(paths.dev.js.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(uglify({mangle: false}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.build.js));
});

// HTML
gulp.task('html-build', function () {
    return gulp.src(paths.dev.html.src)
        .pipe(plumber())
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest(paths.build.dist));
});

// Images
gulp.task('images-build', function () {
    return gulp.src(paths.build.images.src)
        .pipe(image({
            svgo: false,
            zopflipng: false
        }))
        .pipe(gulp.dest(paths.build.images.dist))
});

// Fonts
gulp.task('copy-fonts', function () {
    return gulp.src(paths.build.fonts.src).pipe(gulp.dest(paths.build.fonts.dist))
});

// Default
gulp.task('default', ['build']);