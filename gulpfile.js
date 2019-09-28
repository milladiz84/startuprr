const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const rigger = require("gulp-rigger");
const uglify = require("gulp-uglify");
const plumber = require("gulp-plumber");
const browserSync = require('browser-sync').create();



/*gulp.task('mytask', async function(){
	//console.log('привет, я таск!');
	return gulp.src('source-files')
	.pipe(plugin())
	.pipe(gulp.dest('folder'))
});
*/

var onError = function(err) {
        notify.onError({message: "Failed\n<%= error.message %>", sound: true})(err);
        this.emit('end');
}

gulp.task('js', async function() {
	return gulp.src('js/*.js')
//		.pipe(plumber({errorHandler: onError}))
		.pipe(rigger())
        .pipe(gulp.dest('app/js/'))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min",
            extname: ".js"
        }))
        .pipe(gulp.dest('app/js/'))
        .pipe(browserSync.stream());
    });


gulp.task('sass', async function() {
	//return gulp.src('app/sass/**/*.sass')
	//return gulp.src('app/sass/*.sass')
	//return gulp.src('!app/sass/main.sass') "!" - исключает этот файл, не будет обрабатыватьсыся//
	//return gulp.src('[!app/sass/main.sass', 'app/sass/**/*.sass']) все файлы будут обрабатываться, кроме main.sass//
	//return gulp.src('app/sass/*.+(sccs|sass)') выбираем все scss и sass файлы только в директории sass//
	//return gulp.src('app/sass/**/*.+(sccs|sass)') выбираем все scss и sass файлы во всех поддиректориях//
	return gulp.src('app/sass/**/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('app/css/'))
	.pipe(browserSync.stream());
	});

gulp.task('watch', gulp.series('sass', function() {
 
    browserSync.init({
        server: "app/"
    });
 
    gulp.watch("app/sass/*.scss", gulp.series('sass'));
    gulp.watch("bootstrap/scss/**/*.scss", gulp.series('sass'));
    gulp.watch('app/css/*.css').on('change', browserSync.reload);
    gulp.watch("js/*.js").on('change', gulp.series('js'));
    gulp.watch("app/*.html").on('change', browserSync.reload);
}));
