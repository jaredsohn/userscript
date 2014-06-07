// ==UserScript==
// @name        What.CD :: CSS Injector
// @author      Z4ppy
// @namespace   Z4ppy.What.CD
// @description Injects CSS
// @include     https://*what.cd/*
// @run-at      document-end
// @version     1.0.3
// @date        2013-01-13
// ==/UserScript==

function addcss(css) {
    var head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
	
	// Update window location hash so the browser jumps to the correct location again.
	// Only do that when there actually is a hash (spl.length > 1)
	// We need two location.replaces for that because otherwise the browser apparently won't do anything (because the location hash doesn't change).
	var oldhash = window.location.hash;
	var spl = ('' + window.location).split('#');
	if(spl.length > 1) {
		window.location.replace(spl[0] + '#');
		window.location.replace(spl[0] + oldhash);
	}
}

var css = GM_getValue('css', '');
window.addEventListener('load', addcss(css));

GM_registerMenuCommand('What.CD CSS Injector :: Change CSS', function() {
    var style = window.prompt('Enter CSS style (or blank to clear).\nPage will refresh afterwards.', css);
    if (style) {
        GM_setValue('css', style);
        location.reload();
    } else if (style == '') {
        GM_deleteValue('css');
        location.reload();
    }
}, 'C');