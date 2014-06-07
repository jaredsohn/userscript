// ==UserScript==
//
//Displayable Name of your script
// @name           jQuery Adding Script
//
// brief description
// @description    Adds jQuery 1.8.2 to all pages. 
//
//URI (preferably your own site, so browser can avert naming collisions
// @namespace      http://www.districtapplication.com/
//
//Version Number
// @version        1.1
//
// @history        1.0 First version.
// @history        1.1 Updated to 1.8.2 and added callback default.
//
// ==/UserScript==
startScript();
function startScript(callback) {
	if (typeof(callback) != 'function') {
		callback = function() { };
	}
	var script = document.createElement("script");
	script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}