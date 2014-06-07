// ==UserScript==
// @name           warez-bb.fixedwidth
// @namespace      http://www.warez-bb.org/
// @include        *warez-bb.org/viewforum.php*
// @include        *warez-bb.org/index.php*
// @description    Fix warez-bb forums to 1024 pixels, useful for widescreen resolutions
// ==/UserScript==

var tables = document.getElementsByTagName("table");
for ( var i = 0; i < tables.length; i++ )
{
	if ( tables[i].getAttribute("class") == "bodyline" )
	{
		tables[i].setAttribute("width", "1024px");
		tables[i].setAttribute("align", "center");
		break;
	}
}