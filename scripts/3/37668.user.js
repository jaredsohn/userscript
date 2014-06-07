// ==UserScript==
// @name           Tard's KoL Scripts - Framework
// @namespace      http://groups.google.com/group/tards-kol-greasemonkey-scripts?hl=en
// @include        *kingdomofloathing.com/main_c.html*
// @include        *kingdomofloathing.com/main.html*
// @include        *kingdomofloathing.com/login.php*
// @include        *127.0.0.1:*/main_c.html*
// @include        *127.0.0.1:*/main.html*
// @exclude		   *forums.kingdomofloathing.com*
// ==/UserScript==

/**************************************
 Tard's KoL Scripts
 Copyright (c) 2008, Byung Kim
 Released under the GPL license
 http://www.gnu.org/copyleft/gpl.html
***************************************/

(function() {

	// Remove the default frameset UI
	if (window.location.pathname.match(/main/)) {
		var aFS = document.getElementsByTagName('frameset');
		if (aFS[0]) aFS[0].parentNode.removeChild(aFS[0]);
	}
	
	// Runtime Mode
	var runtimeMode = "prod";

	// Inject prototype & framework scripts
	var scriptHostProd = "http://tards-kol-greasemonkey-scripts.googlegroups.com/web/";
	var scriptHostDev = "http://NAS/KoL/";

	setTimeout('' +
		'window["tardFrameworkRuntimeMode"] = "' + runtimeMode + '";' +
		'window["tardFrameworkScriptHostDev"] = "' + scriptHostDev + '";' +
	'',10);

	
	var scripts = [
	    'prototype.js?gda=wbuC5EYAAACYqufSLjhnTPjKtBouIAp7xZ32bP2yYxdlxgRjIaopEuBxUyDR23P6cq0ld6Grmz-KBwaV14dCoxbgcmPURWAOE-Ea7GxYMt0t6nY0uV5FIQ&hl=en',
	    'framework.js?gda=cLCF9z4AAACYqufSLjhnTPjKtBouIAp7SMUm9jXF4zlsNarQXoOciFao3HN03VcMxdn34kK_A9jjsKXVs-X7bdXZc5buSfmx&hl=en'
	];
	for (i in scripts) {
	    var script = document.createElement('script');
	    script.src = (runtimeMode == "prod" ? scriptHostProd : scriptHostDev) + scripts[i];
	    document.getElementsByTagName('head')[0].appendChild(script);
	}
})();
