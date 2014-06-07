// therichcash auto success
// version 0.1
// 9-1-2008
// copyright xZel
//
// ==UserScript==
// @name          therichcash auto success
// @include       *therichcash.com/surf.php
// ==/UserScript==

function GSB(source, first, last)
{
	return source.substring(source.indexOf(first) + first.length, source.indexOf(last, source.indexOf(first)));
}

var x = GSB(document.body.innerHTML, "view.php?ad=", "\"");

window.open("/success.php?ad=" + x, "adWindow");

