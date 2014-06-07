// ==UserScript==
// @name			TES Wiki Tweaks
// @description		TES Tweaks
// @author			auzwang
// @include			http://elderscrolls.wikia.com*
// @include			https://elderscrolls.wikia.com/*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

function modifyStyle() {
	$(".WikiaArticle").css("color", "black").css("background", "white");
	$(".WikiaArticle td").css("color", "black").css("background", "white");
	$(".WikiaArticle th").css("color", "black").css("background", "white");
	$(".WikiaArticle figure").css("color", "black").css("background", "white");
	$(".WikiaArticle a").css("color", "#0033CC");
	$(".infobox").css("color", "black").css("background", "white");
}

modifyStyle();
