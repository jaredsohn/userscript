// ==UserScript==
// @name           Battle.net Realm Name
// @namespace      @us.battle.net
// @include        http://us.battle.net/wow/en/forum/topic/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(".context-link").each(function(i) {
	var realmName = $(this).attr("href").split("/");
	$(this).parent().append("<br/><span style='color: white; font-size: 1.2em;'>" + realmName[4] + "</span>");    		
});
