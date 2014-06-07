// ==UserScript==
// @name	Crabby
// @description	Add Crabby to Battle.net
// @include	http://*.battle.net/wow/*
// @exclude	http://*.battle.net/wow/*/game/dungeon-helper/*
//
// @license	http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @copyright   Brandon Peters
// @version	1.0.3
// ==/UserScript==
//
// Changelog:
// 1.0.3 Modified to work with Opera
// 1.0.2 Uncommented Code in GM_addScript()
// 1.0.1 Added Date Support
// 1.0.0 Initial Release

var GM_addCode = function(code) {
	var elmScript = document.createElement('script');
	elmScript.setAttribute('type', 'text/javascript');
	elmScript.textContent = code;

	document.body.appendChild(elmScript);
}

var GM_addScript = function(script) {
	var elmScript = document.createElement('script');
	elmScript.setAttribute('type', 'text/javascript');
	elmScript.setAttribute('src', script);

	document.body.appendChild(elmScript);
}

var GM_addStylesheet = function(stylesheet) {
	var elmLink = document.createElement('link');
	elmLink.rel = 'stylesheet';
	elmLink.type = 'text/css';
	elmLink.href = stylesheet;

	document.body.appendChild(elmLink);
}

/* Add SWFObject Dependency */
GM_addScript('/wow/static/local-common/js/third-party/swfobject.js');

/* Add Empty Crabby Variable */
GM_addCode('var Crabby = { init: function() {}, user: {} };');

/* Add Crabby JS Library */
GM_addScript('/wow/static/js/game/crabby.js');

/* Add Crabby Language File */
GM_addScript('/wow/static/js/game/crabby-en-us.js');

/* Add Crabby CSS File */
GM_addStylesheet('/wow/static/css/game/crabby/crabby.css');

/* Initialize Crabby */
GM_addCode('window.setTimeout(function() { Cookie.create("crabbySeen","oldpals",{path:Core.baseUrl, expires: 8760}); Crabby.DATE.weekday = new Date().getDay(); Crabby.user = {loggedIn: Core.loggedIn}; Crabby.init(); }, 3000);');
