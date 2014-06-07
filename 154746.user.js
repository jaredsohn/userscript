// ==UserScript==
// @name        GW2Forum Direct URL
// @namespace   smk
// @description Removes that lame external linker from GW2 forums.
// @include     https://forum-en.guildwars2.com/*
// @version     1
// ==/UserScript==

$(function(){var b=["youtube.com","imgur.com"];var a=true;var c=false;if(a){$(".post-body").each(function(){var e=$(this).find("a");e.each(function(f){link=$(e[f]);if(link.attr("href").match(/^\/external/)&&d(link.attr("href"))||c){link.attr("href",decodeURIComponent(link.attr("href").replace("/external?l=","")))}})})}function d(e){for(i=0;i<b.length;i++){if(e.match(b[i])){return true}}}});