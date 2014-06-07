// ==UserScript==
// @name           Xingrao AD Remover
// @namespace      http://userscripts.org/users/zbcjackson
// @description    To remove ads on xingrao.com video page
// @include        http://comic.xingrao.com/video/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$("script").remove();
$("#PA").remove();
if (console){
	console.log("AD remove successfully");
}
