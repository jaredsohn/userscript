// ==UserScript==
// @name          BuddyRadio Loader
// @namespace     http://github.com/neothemachine/
// @version       0.2
// @description   Extends Grooveshark and lets you see and hear what your Last.fm friends listen to.
// @author        Maik Riechert
// @include       http://grooveshark.com/*
// @include       http://preview.grooveshark.com/*
// ==/UserScript==

/*
Copyright (c) 2011 Maik Riechert
Licensed under the GNU General Public License v3
License available at http://www.gnu.org/licenses/gpl-3.0.html
*/

var loader = function () {
	if (window.top != window.self)  // don't run on iframes
		return;

	var s = document.createElement("script");
	s.type = "text/javascript";
	s.src = "http://code.onilabs.com/apollo/0.13/oni-apollo.js";
	s.addEventListener("load", loadBuddyRadioModuleOnDelay, false);
	document.body.appendChild(s);

	function loadBuddyRadioModuleOnDelay() {
		setTimeout(loadBuddyRadioModule, 666);
	}

	function loadBuddyRadioModule() {
		window.require("github:neothemachine/buddyradio/master/dist/buddyradio", {callback: loadBuddyRadio});
	}

	function loadBuddyRadio(err, module) {
		if (err) throw ('error: ' + err);
		module.start();
	}
};

var script = document.createElement('script');
script.textContent = '(' + loader + ')();';
document.body.appendChild(script);