// ==UserScript==
// @author          Ibrahim Al-Rajhi, Andrew Kennedy, Marco Munizaga, Paulo Da Silva
// @name            GroovesharkSync
// @version         1.0
// @description     Sync Grooveshark queues across multiple users
// @namespace       GroovesharkSync
// @include         http://grooveshark.com/*
// ==/UserScript==

function injectScript(scriptUrl) {
    var script = document.createElement('script');
    script.src = scriptUrl;
    document.body.appendChild(script);
}

var SERVER_URL = 'http://sharktank.servebeer.com:8080';

// Make server url available for other scripts
var script = document.createElement('script');
script.textContent = 'var SERVER_URL = "' + SERVER_URL + '";';
document.body.appendChild(script);

// Load now.js clientside
injectScript(SERVER_URL + '/nowjs/now.js');

// Load GroovesharkSync script
injectScript(SERVER_URL + '/grooveshark_sync.js');
