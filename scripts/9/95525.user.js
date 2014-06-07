// ==UserScript==
// @name           trolled
// @namespace      trolled-background
// @include        *
// ==/UserScript==
var tables=document.getElementsByTagName("table");
if(tables.length>1)
{
	var mid = Math.floor(tables.length/2);
	tables[mid].style.backgroundImage = "url(\"http://i.imgur.com/o36fT.png\")";
}
else if(tables.length==1)
{
	tables[1].style.backgroundImage = "url(\"http://i.imgur.com/o36fT.png\")";
}
else if(tables.length==0)
{
	var body = document.getElementByID("body");
	body.style.backgroundImage = "url(\"http://i.imgur.com/o36fT.png\")";
}