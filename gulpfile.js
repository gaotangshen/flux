// var gulp = require('gulp');
// var browserify = require('browserify');
// var reactify = require('reactify');
// var source = require('vinyl-source-stream');

// var path = {
//   HTML: 'src/index.html',
//   ALL: ['src/js/*.js', 'src/js/**/*.js', 'src/index.html'],
//   JS: ['src/js/*.js', 'src/js/**/*.js'],
//   MINIFIED_OUT: 'build.min.js',
//   DEST_SRC: 'dist/src',
//   DEST_BUILD: 'dist/build',
//   DEST: 'dist'
// };

// gulp.task('browserify',function(){
// 	browserify('./src/js/main.js')
// 		.transform('reactify')
// 		.bundle()
// 		.pipe(source('main.js'))
// 		.pipe(gulp.dest('dist/js'));
// });

// gulp.task('copy',function(){
// 	gulp.src(path.HTML)
// 		.pipe(gulp.dest(path.DEST));
// 	gulp.src('src/assets/**/*.*')
// 		.pipe(gulp.dest('dist/assets'));
// });

// gulp.task('default',['browserify','copy'],function(){
// 	return gulp.watch('src/**/*.*',['browserify','copy']);
// });
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');

var path = {
	HTML: 'src/index.html',
	MINIFIED_OUT: 'build.min.js',
	OUT: 'build.js',
	DEST: 'dist',
	DEST_BUILD: 'dist/build',
	DEST_SRC: 'dist/src',
	ENTRY_POINT: './src/js/main.js'
};

gulp.task('copy', function(){
	gulp.src(path.HTML)
	.pipe(gulp.dest(path.DEST));
});

gulp.task('watch', function() {
	gulp.watch(path.HTML, ['copy']);

	var watcher  = watchify(browserify({
		entries: [path.ENTRY_POINT],
		transform: [reactify],
		debug: true,
		cache: {}, packageCache: {}, fullPaths: true
	}));
	return watcher.on('update', function () {
		watcher.bundle()
		.pipe(source(path.OUT))
		.pipe(gulp.dest(path.DEST_SRC))
		console.log('Updated');
	})
	.bundle()
	.pipe(source(path.OUT))
	.pipe(gulp.dest(path.DEST_SRC));
});


gulp.task('build', function(){
	browserify({
		entries: [path.ENTRY_POINT],
		transform: [reactify]
	})
	.bundle()
	.pipe(source(path.MINIFIED_OUT))
	.pipe(streamify(uglify()))
	.pipe(gulp.dest(path.DEST_BUILD));
});
gulp.task('replaceHTML', function(){
	gulp.src(path.HTML)
	.pipe(htmlreplace({
		'js': 'build/' + path.MINIFIED_OUT
	}))
	.pipe(gulp.dest(path.DEST));
});
gulp.task('production', ['replaceHTML', 'build']);
gulp.task('default', ['watch']);