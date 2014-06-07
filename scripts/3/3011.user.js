/******************************************************************************
 * Requirements:
 *  - Firefox
 *  - Greasemonkey http://greasemonkey.mozdev.org/
 *
 * To Install:
 *  - like any greasemonkey script: install greasemonkey, restart FF, open
 *    this script in a browser window, go to Tools/Install User Script
 *
 * To Uninstall:
 *  - like any greasemonkey script: Tools/Manage User Scripts, select Castefootball Link Fixer, click the Uninstall button
 */

// ==UserScript==
// @name          Castefootball Link Fixer
// @namespace     http://infiniti-hax.com
// @description   Fixes the nav and main links.
// @include       http://castefootball.us/*
// ==/UserScript==


function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

addGlobalStyle(
".menu, .menu a, .menu a:link, .menu a:hover, .menu a:visited {font-family: Arial, Helvetica, sans-serif; font-size: 11px; font-weight: normal; color: #FFFFFF; text-decoration:none;}"
);

(function()
{
	if(document.createElement){ 
		var el = document.createElement("DIV"); 
		el.id = "myDiv";     
		with(el.style){ 
			width = 100 + "%";
			color = "#FFFFFF"; 
			textAlign = "center";
			fontFamily = "Arial";
			fontSize = 10 + "px";
			marginBottom = "7px";
			fontWeight = "bold";
			position ="absolute";
			top = "0"
		} 
		el.innerHTML = "Castefootball.us Link Fixer is injected. Created by Nick." 
		document.body.appendChild(el); 
	}
}
)();