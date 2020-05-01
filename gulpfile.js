const
  { series, src, dest } = require('gulp'),
  gulpSass   = require('gulp-sass'),
  gulpConcat = require('gulp-concat'),
  browserify = require('browserify'),
  source     = require('vinyl-source-stream'),
  bs         = require('browser-sync').create();

// Pathes
var
  pathSass = 'public/dev/sass/',
  pathJs   = 'public/dev/js/',
  pathDev  = 'public/dev/',
  pathDist = 'public/dist/',
  pathView = 'views/';

// Process Sass
function sass(){
  return src(pathSass+ 'main.sass')
    .pipe( gulpSass().on('error', gulpSass.logError) )
    .pipe( dest(pathDist+ 'css') )
    .pipe( bs.stream() );
}

// Process - Js
// -------
function js(){
  return browserify(pathJs+ 'main.js')
    .bundle().on('error', (e)=>{console.log(e)})
    .pipe( source('bundle.js') )
    .pipe( dest(pathDist+ 'js/') );
}

// Watcher
// -------
function watch()
{
  // Html
  watchHtml = bs.watch(pathView +'**/*.html');
  watchHtml.on('change', ()=>{
    console.log('Html changed!');

    bs.reload();
  })

  // Sass
  watchSass = bs.watch(pathSass+ '**/*.sass');
  watchSass.on('change', ()=>{
    console.log('Sass changed!');

    sass();
  })

  // Js
  watchJs   = bs.watch(pathJs+ '**/*.js');
  watchJs.on('change', ()=>{
    console.log('Js changed!');

    js().on('finish', ()=>{
      bs.reload();
    })
  })

  // Bs - Init
  var server = bs.init({
    server: {
      baseDir: './views',
      index: 'chat.html'
    },
    port: 8080,
    ui: {
      port: 8081
    },
    serveStatic: ['./public/dist', './public/img', './public/fnt']
  });
}

exports.sass    = sass;
exports.js      = js;
exports.default = watch;