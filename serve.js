import { createRequire } from 'module';

import browserSync from "browser-sync";
import chokidar from 'chokidar';

// Alternative for __require from CommonJS:
const require = createRequire(import.meta.url);

// Importing blazingly fast JS bundler and builder on commonJS manner:
const esbuild = require('esbuild');

// Web-server instance:
const bs = browserSync.create();

// Run web-server:
bs.init({
    files: ['web*/'],
    watch: true,
    server: {
        baseDir: 'web',
        index: 'index.html'
    },
    port: 3000,
    online: false,  // don't use Internet (usefull for site testing on several devices)
    notify: false,  // don't notify about site updates
    open: true, // open default browser automatically
    ui: false    // turn off web ui to rule browser-sync
});

// function to build and bundle JS:
function buildJS(){
    try{
        esbuild.build({
            entryPoints: ['web/scripts/script.js',],
            bundle: true,
            minify: true,
            sourcemap: true,
            target: 'es6',
            charset: 'utf8',
            outfile: 'web/script.js'
        })
    } catch(err){
        console.error(err);
    }
}

// Build and bundle JS on running this script:
buildJS();

// Watch for changes of JS files and rebuild and rebundle them automatically:
const watcher = chokidar.watch('web/scripts/script.js');

watcher.on('change', function(){
    buildJS()
})
