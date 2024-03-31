import { init, reload } from 'browser-sync'
import gulp from 'gulp'
import autoprefixer from 'gulp-autoprefixer'
import concat from 'gulp-concat'
import cssmin from 'gulp-cssmin'
import rename from 'gulp-rename'
import gulpSass from 'gulp-sass'
import uglify from 'gulp-uglify'
import * as sassCompiler from 'sass'

const sass = gulpSass(sassCompiler)

gulp.task('sass', function () {
	return gulp
		.src('app/scss/**/*.scss')
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(rename({ suffix: '.min' }))
		.pipe(
			autoprefixer({
				overrideBrowserslist: ['last 8 versions'],
			})
		)
		.pipe(gulp.dest('app/css'))
		.pipe(reload({ stream: true }))
})

gulp.task('style', function () {
	return gulp
		.src([
			'node_modules/slick-carousel/slick/slick.css',
			'node_modules/magnific-popup/dist/magnific-popup.css',
			'node_modules/normalize.css/normalize.css',
		])
		.pipe(concat('libs.min.css'))
		.pipe(cssmin())
		.pipe(gulp.dest('app/css'))
})

gulp.task('script', function () {
	return gulp
		.src([
			'node_modules/slick-carousel/slick/slick.js',
			'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app.js'))
})

gulp.task('html', function () {
	return src('app/*.html').pipe(reload({ stream: true }))
})

gulp.task('js', function () {
	return src('app/js/*.js').pipe(reload({ stream: true }))
})

gulp.task('browser-sync', function () {
	init({
		server: {
			baseDir: 'app/',
		},
	})
})

gulp.task('watch', function () {
	gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'))
	gulp.watch('app/*.html', gulp.parallel('html'))
	gulp.watch('app/js/*.js', gulp.parallel('js'))
})

gulp.task(
	'default',
	gulp.parallel('style', 'script', 'sass', 'watch', 'browser-sync')
)
