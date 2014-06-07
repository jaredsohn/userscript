// ==UserScript==
// @name           mythweavers
// @namespace      hampei.vanderveen.name
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @description    UI fixes
// @include        http://www.myth-weavers.com/showthread.php*
// ==/UserScript==

$("#headerContainer+div").attr("id", "main");
	
$("#headerInner").height(30);
$("#headerContainer").height(30);
$("#headerContainer").css({'position': 'fixed'});
$("#main").css("padding-top", 25);
$("#logo").remove();