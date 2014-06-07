// ==UserScript==
// @name           TOCMonkey
// @namespace      http://hackadelic.com
// @description    Adds a TOC to a viewed HTML page
// @version        1.0.2
// @author         Hackadelic
// @copyright      2010+, Hackadelic (http://hackadelic.com)
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @homepage       http://hackadelic.com/table-of-contents-anywhere-with-tocmonkey-firefox-and-greasemonkey
// @include        *
// @exclude        http://*.google.*
// @exclude        http://*.yahoo.*
// @exclude        http://*.wikipedia.*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @resource       css http://hackadelic.com/files/TOCMonkey/tocmonkey.css
// ==/UserScript==

/*
Change Log:

1.0.2: Fixed ul/ol mismatch

*/

function isGoodContext() {
	return true;
}

function getHeadings() {
	var headings;
	var m = 0, n, h;
	for each (var level in [2, 1, 3]) {
		headings = $('h' + level);
		n = headings.length;
		if (n >= 3) return headings;
		if (n > m) { m = n; h = headings; }
	}
	return h;
}

function addCSS() {
	var css = '@import url(' + GM_getResourceURL('css') + ');';
	//$('head').append('<style>'+css+'</style>');
	GM_addStyle(css);
}

function processHeadings(headings) {
	var xclass = headings.length <= 30 ? ' tocmonkey-floating tocmonkey-top-right' : '';
	var box = $('<ul class="tocmonkey'+xclass+'"></ul>');
	var rx = /^ +| +$/g;
	headings.each(function(i){
		var h = $(this);
		var s = htmlspecialchars(h.text().replace(rx, ''));
		if (!s) return true;
		var anchor = 'tocmonkey-'+(i+1);
		$('<a name="'+anchor+'"></a>').insertBefore(h);
		box.append('<li><a href="#'+anchor+'">'+ s +'</a></li>');
	});
	$('body').prepend(box);
}

function htmlspecialchars(s) {
	return s.replace(/&/g, "&amp;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
	return str;
}
 
function addMenuItems() {
	GM_registerMenuCommand('TOCMonkey: Toggle Display', function(){
		$('.tocmonkey').toggle();
	});
	GM_registerMenuCommand('TOCMonkey: Toggle Floating', function(){
		$('.tocmonkey').toggleClass('tocmonkey-floating');
	});
}

function run() {
	$('.tocmonkey').remove();
	var headings = getHeadings();
	if (!headings) {
		GM_log("Not enough heading on this page: " + location.href);
		return;
	}
	addCSS();
	processHeadings(headings);
	addMenuItems();
}

if (!isGoodContext()) return;
GM_registerMenuCommand('TOCMonkey: Add Table Of Contents', run);
//run();
