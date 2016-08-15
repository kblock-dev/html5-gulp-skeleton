var path = {
  root: './wwwroot/',
  bower: './bower_components/',
  layout: './wwwroot/index.html',
  excluded: {
    js: ['./wwwroot/js/modernizer*.js']
  },
  output: {
    css: './wwwroot/css/',
    js: './wwwroot/js/',
    lib: './wwwroot/lib/',
    jquery: './wwwroot/lib/jquery/',
    bootstrap: {
      css: './wwwroot/lib/bootstrap/css/',
      js: './wwwroot/lib/bootstrap/scripts/',
      fonts: './wwwroot/fonts/',
      images: './wwwroot/lib/bootstrap/images/'
    },
    fontAwesome: {
      css: './wwwroot/lib/font-awesome/css/',
      fonts: './wwwroot/lib/font-awesome/fonts/'
    },
    src: {
      bootstrap: './src/bootstrap/src'
    }
  }
}

module.exports = {
  "path": path,
  "source": {
    sass: ['./src/**/*.scss', 'src/**/*.scss'],
    js: ['./src/**/*.js', 'src/**/*.js', path.excluded.js.map(function(val){ return "!" + val; }).join(',')],
    jquery: path.bower + 'jquery/dist/**/*.js',
    bootstrap:{
      scss: path.bower + 'bootstrap-sass/assets/stylesheets/**/*.scss',
      js: path.bower + 'bootstrap-sass/assets/javascripts/*.js',
      fonts: path.bower + 'bootstrap-sass/assets/fonts/**/*.*',
      images: path.bower + 'bootstrap-sass/assets/images/**/*.*'
    },
    fontAwesome:{
      css: path.bower + 'font-awesome/css/**/*.css',
      fonts: path.bower + 'font-awesome/fonts/**/*.*',
      scss: path.bower + 'font-awesome/scss/font-awesome.scss'
    }
  },
  "output": path.output,
  "site": {
    css: './wwwroot/css/site*.css',
    js: './wwwroot/js/site*.js'
  },
  "bundles": {
    css: path.output.css + "**/*-*.min.css",
    js: [path.output.js + '**/*-*.min.js'],
    modernizer: path.output.js + 'modernizr-*.js'
  }
}
