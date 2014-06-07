// ==UserScript==
// @name           KLDP Old Comment Colorizer
// @namespace      purluno@gmail.com
// @include        http://kldp.org/node/*
// ==/UserScript==

////////////////////////////////////////////////////////////////////////////////
// KLDP Old Comment Colorizer
// by
// Purluno <purluno@gmail.com>
//
// This work is licensed under the Creative Commons Attribution 3.0 Unported
// License. To view a copy of this license, visit
// http://creativecommons.org/licenses/by/3.0/ or send a letter to Creative
// Commons, 171 Second Street, Suite 300, San Francisco, California, 94105, USA.
//

////////////////////////////////////////////////////////////////////////////////
// SETTINGS (REQUIRED)

var EXPIRE_DAY
var BORDER_COLOR
var BG_COLOR
var DATE_LINE_COLOR

EXPIRE_DAY = 100

////////////////////////////////////////////////////////////////////////////////
// SETTINGS (optional)

//BORDER_COLOR = '#f00'
BG_COLOR = '#fee'
DATE_LINE_COLOR = '#f00'

////////////////////////////////////////////////////////////////////////////////
// Initialization of global variables

var today_time
var expire_time

today_time = (function() { var d = new Date(); d.setHours(0, 0, 0, 0); return d.getTime(); })();
expire_time = today_time - (EXPIRE_DAY * 24 * 60 * 60 * 1000)

////////////////////////////////////////////////////////////////////////////////
// Functions

function findOneElement(parent, tagName, className) {
	var es = parent.getElementsByTagName(tagName);
	for (var i = 0; i < es.length; i++)
		if (es[i].className == className)
			return es[i];
	return null;
}

function work(e) {
	if (e.className != 'comment')
		return;
	var de = findOneElement(e, 'div', 'submitted');
	if (de == null)
		return;
	var text = de.textContent.match(/\d\d\d\d\/\d\d\/\d\d/);
	var t = Date.parse(text);
	if (t <= expire_time) {
		if (BORDER_COLOR)
			e.style.borderColor = BORDER_COLOR;
		if (BG_COLOR)
			e.style.backgroundColor = BG_COLOR;
		if (DATE_LINE_COLOR)
			de.style.color = DATE_LINE_COLOR;
	}
}

////////////////////////////////////////////////////////////////////////////////
// MAIN

var comments = document.getElementById('comments');
var es = comments.getElementsByTagName('div');
for (var i = 0; i < es.length; i++) {
	work(es[i]);
}
