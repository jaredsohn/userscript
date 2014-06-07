// ==UserScript==
// @name           GC Row Count
// @namespace      delta68.rowcount
// @include        http://www.geocaching.com/seek/nearest.aspx*
// ==/UserScript==

var b = document.body.innerHTML
var s = new Array();
//s= b.split(' GC');
//s= b.split('/seek/cache_details.aspx');


if(document.title.length>0)
{
	s= b.split('http://www.geocaching.com/geocache');

	var msg = document.createElement('li');
		msg.innerHTML = (s.length -1) /2 + ' caches on this page';
	document.getElementById("UtilityNav").appendChild(msg)
}