// ==UserScript==
// @name		Clean9GAG
// @description	Deletes a few 9GAG Toolbars and Sidebars
// @namespace	http://beging.it
// @copyright	Andre Beging
// @version		0.1
// @match		http://9gag.com*
// @match		https://9gag.com*
// @match		http://www.9gag.com*
// @match		https://www.9gag.com*
// @homepageURL 
// @downloadURL 
// @updateURL   
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

addGlobalStyle('#main-wrap { margin-left:25%; }');

var Elem1 = document.getElementById('sidebar');
if (Elem1) {
    Elem1.parentNode.removeChild(Elem1);
}

var Elem2 = document.getElementByClass('section-nav');
if (Elem2) {
    Elem2.parentNode.removeChild(Elem2);
}