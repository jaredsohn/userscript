// ==UserScript==
// @name           Fix HTML Code on WatThumMuangNa.com
// @namespace      http://userscripts.org/scripts/show/454529
// @description    Fix HTML Code on WatThumMuangNa.com
// @version        4
// @icon           http://s3.amazonaws.com/uso_ss/icon/454529/large.png?1396968538
// @include        /http://(www.)?watthummuangna.com/home/
// ==/UserScript==

var HTML = document.body.innerHTML;


HTML = HTML.replace(/type="application\/x-mplayer2"/ig,    'type="application/x-ms-wmp"');
HTML = HTML.replace(/uimode="mini"/ig,          '');
HTML = HTML.replace(/enablecontextmenu="-1"/ig, '');
HTML = HTML.replace(/fullscreen="1"/ig,         '');


document.body.innerHTML = HTML;


// Basic, general disabling
var doc = document.wrappedJSObject || document;
doc.onmouseup     = null;
doc.onmousedown   = null;
doc.oncontextmenu = null;
doc.onselectstart = null;

