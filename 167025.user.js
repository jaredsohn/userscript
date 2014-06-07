// ==UserScript==
// @namespace	http://pardustestmap.mhwva.net/
// @name		Nhyujm's Pardus Mapper version 3
// @description	3rd Generation Mapping Script by Nhyujm loads only map data
// @include		http*://*.pardus.at/main.php
// @include		http*://*.pardus.at/msgframe.php
// @match		http://*.pardus.at/main.php
// @match		https://*.pardus.at/main.php
// @updateURL	http://http://userscripts.org/scripts/show/167025.users.js
// @downloadURL	http://pardustestmap.mhwva.net/script/NhyujmsPM.user.js
// @author		Nhyujm.Orion@gmail.com / CptZaq.Artemis@gmail.com
// @version		1.1.0
// ==/UserScript==

// == Notes ==
/*
	Version 1.1.0 - May 29, 2013 - Reoverd jQuery from script.
	Version 1.0.3 - May 28, 2013 - Removed all unsafeWindow commands as possible since they aren't really needed
	Version 1.0.2 - May 24, 2013 - Added @downloadURL and @updateURL to hopefully automatically update script
	Version 1.0.1 - May 24, 2013 - Updated Code to work with Chrome and Tampermonkey
				To get this to work you need to install the script through Tampermonkey
				Change 'UnsafeWindow retrieval method' to Proxy
				Goto url chrome://flags and scroll down to 'Enabel Experimental Javascript'
	Version 1.0.0 - May 8, 2013 - Stripped out all coding except Navigation Screen Ready for Release
	Version 0.0.1 - September 14, 2012 - Started Coding Script
*/
// == End Notes ==

// == User Options ==
// use this section to turn portions of the mapper on and off by changing the values between 'true' and 'false'
//
// == End User Options ==

var doc = document;
var loc = doc.location.href;
var dataStore = window.sessionStorage;
	
// Determine Universe
if (loc.match(/orion/)) { dataStore.universe = 'Orion'; }
else if (loc.match(/artemis/)) { dataStore.universe = 'Artemis'; }
else if (loc.match(/pegasus/)) { dataStore.universe = 'Pegasus'; }
else { dataStore.universe = 'Error'; }

// Set Starting value of Script Version and Server
if (!dataStore.navversion) { dataStore.navversion = '0.0.0'; }
if (!dataStore.server) { dataStore.server = "http://pardustestmap.mhwva.net/"; }

// Custom xhr function for POST commands
function myXHR (url, params, callback) {
	var http = new XMLHttpRequest();
	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.setRequestHeader("Content-length", params.length);
	http.setRequestHeader("Connection", "close");
	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200) {
			callback(http.responseText.split('~'));
		}
	};
	http.send(params);
}
function UpdateScript () {
	// If 1st Load, or New Version get new script information
	if (!dataStore.navupdate ||  dataStore.navupdate == 'True') {
		// Get New Nav Script from Web Site.
		myXHR(dataStore.server + "include/getUserScript.php","request=nav",userScriptResponse);
		// All Done Collection New information Turn updates off
		dataStore.navupdate = 'False';
	}
};
// Function Stores userScript Responses in appropriate variables
function userScriptResponse (data) {
	// data[0] will be 1 on valid execution of called PHP file
	if (data[0]) {
		switch(data[1]) {
			case 'navversion' :
				// Checking if Version supplied by web site is the same as current
				cv = dataStore.navversion.split('.');
				wv = data[2].split('.');
				if (wv[0] > cv[0] || wv[1] > cv[1] || wv[2] > cv[2]) {
					// Web site had newer version, update version and set script to download new information.
					dataStore.navversion = data[2];
					dataStore.navupdate = 'True';			
				}
				break;
			case 'nav' :
				// Storing new nav script
				dataStore.nav = escape(data[2]);
				break;
		}
	} else { alert(data[1]); }
};
	
function navUpdate() {
	var tempFunction = new Function(unescape(window.sessionStorage.nav));
	tempFunction();
	if (window.sessionStorage.navData) {
		var url = window.sessionStorage.server + 'include/newSaveMapInfo.php';
		var params = 'data=' + window.sessionStorage.navData;
		var http = new XMLHttpRequest();
		http.open("POST", url, true);
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http.setRequestHeader("Content-length", params.length);
		http.setRequestHeader("Connection", "close");
		http.onreadystatechange = function() {
			if(http.readyState == 4 && http.status == 200) {
				var info = http.responseText.split('~');
				if (info[0] == '0') { alert(http.responseText); }
				window.sessionStorage.removeItem('navData');
			}
		};
		http.send(params);
	}
};
if (loc.match(/msgframe.php/)) { 
	myXHR(dataStore.server + "include/getUserScript.php","request=navversion",userScriptResponse);
	UpdateScript(); 
} else if (loc.match(/main.php/)) {
	var scripts = document.getElementsByTagName('script');
	for (var i = 0; i < scripts.length; i++) {
		var script = scripts[i];
		var m = /^\s*var fieldsTotal = (\d+);/m.exec(script.textContent);
		if (m) { 
			dataStore.middle = (m[1] - 1) / 2;
			break;
		}
	}
	navUpdate();
	var script = doc.createElement('script');
	script.setAttribute("type","text/javascript");
	script.textContent = 'addUserFunction(' + navUpdate + ');';
	doc.body.appendChild(script);
	doc.body.removeChild(script);
}