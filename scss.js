const fs = require('fs');
const sass = require('node-sass');

module.exports = {
	WatchSCSS(scssfile) {
		fs.watchFile(scssfile, {interval: 100}, function (curr, prev) {
		    process.stdout.write('\x1b[34m'+'SCSS: Change detected, recompiling... '+'\x1b[0m')
		    renderedcss = sass.renderSync({
		        file: scssfile,
		        outputStyle: "expanded",
		        indentType: "tab",
		        indentWidth: 1
		    });
		    fs.writeFileSync(__dirname + "/public/stylesheets/main.css", renderedcss.css.toString(), 'utf8');
		    process.stdout.write('\x1b[32m'+'Done!\n'+'\x1b[0m');
		    return;
		});
		console.log('Watching ' + scssfile);
	}
}