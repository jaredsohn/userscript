// ==UserScript==
// @id             alternativeto minimize ui
// @name           alternative to minimize ui
// @version        1.0
// @namespace      
// @author         daemonicky
// @description    
// @include        http://alternativeto.net/*
// @run-at         document-end
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


$("div[id=logotype]").remove();
$("div[class=divLeaderboardHeaderLove]").remove();
$("ul[id=startpage-right]").remove();
//$("div[id=userheader]")
$("div[id=startpage-left]").remove();
$("div[class=commonNotifier2]").remove();