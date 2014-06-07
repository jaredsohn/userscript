// Author: userscripts@roaldseth.net
// ==UserScript==
// @name           Fiks se.no
// @namespace      dagbladet.no
// @description    Fikser programguiden til db.no
// @include        http://www.dagbladet.no/tvprogram/
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

// Make sure the channel icons scrolls as well
document.getElementById('programs-container').addEventListener(
	'scroll',
	function() {
	    document.getElementById('channels').style.top = '-'+document.getElementById('programs-container').scrollTop+'px';
	},
	false
);

// Resize so we have horizontal scrollbar
function resizePrograms() {
    document.getElementById('programs-container').style.height = (document.body.clientHeight-86)+'px';
}
window.addEventListener('load', resizePrograms, false);
window.addEventListener('resize', resizePrograms, false);

// Remove useless JS-scrolling
addGlobalStyle('#footer-container {display:none!important; } #guide-container, .horizontal, .vertical { display:none !important; } #programs-container { overflow:scroll; }');