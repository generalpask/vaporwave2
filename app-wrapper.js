const app = require('./app');
const path = require('path');
const fs = require('fs');
const scss = require('./scss');

// Load SCSS
var scssfile = 'public/stylesheets/main.scss'

// Shutdown function
const Shutdown = function Shutdown() {
    process.stdout.write('\x1b[33m'+'Unwatching '+'\x1b[36m['+scssfile+']\x1b[33m'+'... ');
    fs.unwatchFile(scssfile);
    process.stdout.write('\x1b[32m'+'Done!\n'+'\x1b[0m');

    if (server) {
    	process.stdout.write('\x1b[33m'+'Closing server... ');
    	server.close();
    	process.stdout.write('\x1b[32m'+'Done!\n'+'\x1b[0m');
    }

    console.log('Shutdown complete');
    process.exit();
}

// Start the server + error wrapper
var server;
try {
	// Watch SCSS
	scss.WatchSCSS(scssfile);

	// Start the server
    server = app();
}
catch (err) {
    process.stdout.write('\x1b[31m'+'\nAn error was caught by the wrapper:\n'+'\x1b[0m');
    console.log(err);
	console.log('\x1b[35m'+'\nServer has crashed, shutting down safely...');
    Shutdown();
}

// Shutdown on Ctrl+C
process.on('SIGINT', function() {
	console.log('\x1b[34m'+'\nSIGINT received, shutting down...');
	Shutdown();
});

exports.Shutdown = Shutdown;