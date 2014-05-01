var gulp	= require("gulp");
var plugins	= require("gulp-load-plugins")();
var tinyLr	= require("tiny-lr");
var static	= require("node-static");
var http	= require("http");

var lrServer = tinyLr();

gulp.task("scripts", function () {
	gulp.src("app/**/*.js")
		.pipe(plugins.ngmin())
		.pipe(plugins.concat("app.js"))
		.pipe(gulp.dest("dist/"))
		.pipe(plugins.uglify())
		.pipe(plugins.rename("app.min.js"))
		.pipe(gulp.dest("dist/"))
		.pipe(plugins.livereload(lrServer));
});

gulp.task("vendorStyles", function () {
	var sources = [
		"bower_components/bootstrap-social/bootstrap-social.css"
	];
	gulp.src(sources)
		.pipe(plugins.concat("vendor.css"))
		.pipe(gulp.dest("dist/"))
		.pipe(plugins.minifyCss())
		.pipe(plugins.rename("vendor.min.css"))
		.pipe(gulp.dest("dist/"));
});

gulp.task("vendorScripts", function () {
	var sources = [
		"bower_components/q/q.js",
		"bower_components/ddp.js/ddp.js",
		"bower_components/asteroid/dist/asteroid.js"
	];
	gulp.src(sources)
		.pipe(plugins.concat("vendor.js"))
		.pipe(gulp.dest("dist/"))
		.pipe(plugins.uglify())
		.pipe(plugins.rename("vendor.min.js"))
		.pipe(gulp.dest("dist/"));
});

gulp.task("buildVendor", ["vendorStyles", "vendorScripts"]);

gulp.task("default", function () {
	lrServer.listen(35729);
	var dvServer =http.createServer(function (req, res) {
		var stServer = new static.Server("./", {cache: false});
		req.on("end", function () {
			stServer.serve(req, res);
		});
		req.resume();
	}).listen(8080);
	gulp.watch("app/**/*.js", ["scripts"]);
});
