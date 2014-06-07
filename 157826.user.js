// ==UserScript==
// @name        tefoonboek xl
// @namespace   tefoonboek xl
// @include     http://http://intranet/Telefoonboek/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @version     0.0.1
// ==/UserScript==

var link="";

$("img").each(function() {
	if($(this).attr('class')=="imgButton"){
		link=$(this).attr('onmouseover');
		link=link.toString().replace("Tooltip_StartImage('","");
		link=link.toString().replace("&mode=thumb') ;","");
		link=link.toString().replace("}","");
		link=link.toString().replace("function onmouseover(event)","");
		link=link.toString().replace("{","");
		$(this).after("<a href='"+link+"'>XL</a>");
	}
});