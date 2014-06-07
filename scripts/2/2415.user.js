// ==UserScript==
// @name          About.com Ad Free
// @description   Remove ads from about.com, and make outgoing links direct.
// @include       *about.com*
// ==/UserScript==

// Much of this code has been copy and pasted with minor changes
// to make it specific to about.com. Much thanks to greasemonkey,
// diveintogreasemonkey, and userscripts.org.

// addGlobalStyle from diveintogreasemonkey
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// Set most (hopefully all) inline ads to not display with css
var userstyle
userstyle = '#adB {display: none;}\n'
	+ '#adL {display: none;}\n'
	+ '#adF {display: none;}\n'
	+ '#gB1 {display: none;}\n'
	+ '#gB2 {display: none;}\n'
	+ '#gB3 {display: none;}\n'
	+ '#gB4 {display: none;}\n'
	+ '#gB6 {display: none;}\n'
	+ '#adT {display: none;}\n'
	+ '#ip0 {display: none;}\n'
	+ '#lbp {display: none;}\n'
	+ '#bb {display: none;}\n'
	+ '#hpBmT {display: none;}\n'
	+ '#m9 {display: none;}\n'
	+ '#c4 * {border: 1px solid black; display: none;}\n'
	+ '#nl {display: none;}';
	
addGlobalStyle(userstyle);
	
// Remove ads from frames when links are clicked.
// This is a bit more tricky since they use frames.
// Instead of messing with the css, we just remove the element by id.
var framedads = document.getElementById('osT1');
if (framedads) {
    framedads.parentNode.removeChild(ads);
}

// Rewrites outgoing links in directory to not use frames with ads, replaces with a direct link
var linkx
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("zu=") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("zu=") + 3));
	}
}

// Same as above but for outgoing links in blogs
for (var i = 0; i < document.links.length; i++) {
	linkx = document.links[i];
	if (linkx.href.indexOf("offsite.htm?site=") != -1) {
		linkx.href = decodeURIComponent(linkx.href.substring(linkx.href.indexOf("offsite.htm?site=") + 17));
	}
}
