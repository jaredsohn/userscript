// ==UserScript==
// @name        userscripthighlighting
// @namespace   userscripthighlighting
// @include     http://userscripts.org/*
// @exclude     http://userscripts.org/scripts/review/*
// @version     1
// @description SyntaxHighLighting http://mihai.bazon.net/projects/javascript-syntax-highlighting-engine
// @grant		GM_getResourceText
// @grant		GM_log
// @require 	http://mihai.bazon.net/projects/javascript-syntax-highlighting-engine/hl-all.js
// @resource	DlHighlightCSS http://mihai.bazon.net/projects/javascript-syntax-highlighting-engine/style.css
// ==/UserScript==
var CSS = GM_getResourceText("DlHighlightCSS");	// get the @resource in var CSS
addCss(CSS);												// set in <HEAD> the CSS Style

// start if page load is finished
window.addEventListener("load", function(e) {
	GM_log("Start DlHighlight");
	var a = document.getElementsByTagName('pre'); // get all <pre> of document
     for (i = 0, l = a.length; i < l; i++) {
		a[i].setAttribute('name','code');			// set name=code
		a[i].setAttribute('class','js'); 			// set class=js see description on http://mihai.bazon.net/projects/javascript-syntax-highlighting-engine/
		}		
	DlHighlight.HELPERS.highlightByName("code", "pre");	// start Highlighting
	GM_log("End DlHighlight");
},false);

/*
 * based on http://www.tuxradar.com/content/greasemonkey-bbeginners
 */
function addCss(cssString) {
	var head = document.getElementsByTagName('head')[0];
	var newCss = document.createElement('style');
	newCss.type = "text/css";
	newCss.innerHTML = cssString;
	head.appendChild(newCss);
}
