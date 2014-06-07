// ==UserScript==
// @name           TBT Bildirim
// @namespace      snnyk
// @description    Son yazılan konulara girilen murid ten sonra başka bir muridin konuya yazıp yazmadığını kontrol eder.
// @include        http://www.tahribat.com/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js

// ==/UserScript==

$(document).ready(function()
{
	$("div#tbtnavbar").fadeOut();
	div = $('<div id="snnyk">').html('<iframe frameborder="0" height="80" width="1024" src="http://snnyk.com/tbtbildirim/tbt.php"></iframe>');
	$("body").prepend(div);
	
	$("#snnyk").css("position", "absolute");
	$("#snnyk").css("height", "80");
	$("#snnyk").css("width", "1020");
	
	
});






