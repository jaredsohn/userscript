// ==UserScript==
// @name           Oniroboobz
// @description    Pour plus de boobz sur Oniro
// @include        http://www.rpg-maker.fr/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

var ids = [19207, 17031];
var messages = [
"<br/><br/><img src=http://img76.xooimage.com/files/4/9/6/boobshake2-344d8ac.gif></img>"
];
$("table.tableposts").each(function() {
	if($(this).find("td.postshaut > div.margecinqc > a").attr("href").match(/(\d+)$/) && $.inArray(parseInt(RegExp.$1), ids) != -1) {
		$(this).find("td.postsmilieu > p:last-child").append(messages[Math.floor(Math.random() * messages.length)]);
	}
});