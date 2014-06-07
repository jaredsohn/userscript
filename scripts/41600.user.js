// ==UserScript==
// @name           Free Rice Help
// @namespace      local
// @description    Show a definition for words in Facebook's free rice game.  Learn words, donate rice, help the world.
// @include        http://apps.facebook.com/donaterice/play
// ==/UserScript==

// Transitionary step in the script.  Not currently working per the description.  
// Older versions still work, but this one is broken until I can make it better.

// Define utility functions to retrieve external js and css files.

function getRemoteJS(url) {
  var GM_SCR = document.createElement('script');
	GM_SCR.src = url;
	GM_SCR.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(GM_SCR);
}

function getRemoteCSS(url) {
  var GM_SCR = document.createElement('link');
	GM_SCR.href = url;
	GM_SCR.type = 'text/css';
	GM_SCR.rel = 'stylesheet';
	document.getElementsByTagName('head')[0].appendChild(GM_SCR);
}

// Grab a couple remote scripts and stylesheets.
getRemoteJS('http://www.ghostdev.com/jslib/inline-console.js');
getRemoteJS('http://www.ghostdev.com/jslib/windows_js_1.3/javascripts/prototype.js');
getRemoteJS('http://www.ghostdev.com/jslib/windows_js_1.3/javascripts/window.js');
getRemoteCSS('http://www.ghostdev.com/jslib/windows_js_1.3/themes/default.css');
getRemoteCSS('http://www.ghostdev.com/jslib/windows_js_1.3/themes/mac_os_x.css');

// Wait for the scripts above to load so we can use them.
function showWinOnLoad() {
	try {
		myDiv = new Window({className: "default", title: "Google Answer", width:200, height:150, destroyOnClose: true, recenterAuto:false});
	} catch (err) {
		alert(err);
	}
}

showWinOnLoad();

/*/ Create a div to hold an iframe.  We'll use it later.
myDiv = new Window({className: "default", title: "Google Answer", width:200, height:150, destroyOnClose: true, recenterAuto:false});

// Create the Iframe.  Get the word on the screen.  Do a google define: query on the word using the iFrame's src attribute.
myIframe = document.createElement('iframe');
myIframe.style.height = '25em';
myIframe.style.width = '30em';

appHolder = document.getElementById('app6416885748_questions');
bTags = appHolder.getElementsByTagName('b');

myIframe.src = 'http://www.google.com/search?q=define%3A+' + bTags[0].firstChild.nodeValue;

// Add the iFrame to the div and the div to the document.
myDiv.getContent().update(myIframe);
myDiv.showCenter(); */