// ==UserScript==
// @name           Text Field Fixer (Tabs, Double spaces, New lines, etc)
// @namespace      http://userscripts.org/users/23652
// @description    Fixes things like double spaces, newlines, and tabs (even though you can't see newlines, it messes up fields when you try to login)
// @include        http://*
// @include        https://*
// @include        file:///*
// @copyright      JoeSimmons
// @version        1.0.1
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

function strip(e) {
e.value = e.value.replace(/[\n\t]*/g,"").replace(/  /g," ");
}

var boxes = document.evaluate("//input[@type='text' or @type='password']",document,null,6,null);

for(var i=boxes.snapshotLength-1; (item=boxes.snapshotItem(i)); i--) {
	item.addEventListener('keydown', function(e){strip(e.currentTarget);}, false);
	item.addEventListener('change', function(e){strip(e.currentTarget);}, false);
	item.addEventListener('click', function(e){strip(e.currentTarget);}, false);
}