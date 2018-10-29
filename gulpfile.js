var gulp = require('gulp'),
  less = require('gulp-less'),               //less
    historyApiFallback = require('connect-history-api-fallback'),
    browserSync = require('browser-sync').create();
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "app",
      middleware: [ historyApiFallback() ]
    }
  });
});

gulp.task('default', ['serve']);


// less 编译
gulp.task('lessToCss',function(){
	var lessSrc = './less/main/**/*',
		lessDst = './app/mobile/resource/css';
		
	gulp.src(lessSrc)
		.pipe(less())
		.pipe(gulp.dest(lessDst));
});

gulp.task('watch',function(){
	var lessSrc = './less/main/**/*';
//	gulp.watch(lessSrc,function(){
//		gulp.task('lessToCss');
//	});	
gulp.watch(lessSrc,['lessToCss']);	
});