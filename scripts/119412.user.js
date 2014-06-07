// ==UserScript==
// @name			Facebook The Independent App Fixer
// @description	Bypasses having to have The Independent Facebook app installed to view their articles. Replaces links with direct links to article.
// @author		Josh Thompson
// @include		*facebook.com/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version		1.0
// ==/UserScript==

$("a[data-appname=The Independent]").attr("target", "_blank").removeAttr("rel").removeAttr("data-appname").each(function(){
	href = $(this).attr("href").split("redirect_uri=");
	href = href[1].split("%3Ffb_action_ids");
	href = href[0].replace(/%2F/g, "/").replace(/%3A/g, ":").replace(/%3F/g, "?");
	$(this).attr("href", href);
});