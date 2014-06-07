// ==UserScript==
// @name           epw coords viewer
// @author         vortex
// @description    get coords of various people
// @namespace      http://userscripts.org/users/vortekx
// @include        http://*.exoplanetwar.com/show_report.php?*
// @require        http://code.jquery.com/jquery-latest.pack.js
// ==/UserScript==


var head = document.getElementsByTagName('head')[0];

function addGlobalStyle(
	css
){
    var style;
	
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
	
    head.appendChild(style);
}

addGlobalStyle('div.ui-dialog{z-index:11111 !important;}');