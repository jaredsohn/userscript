// ==UserScript==
// @name           GOMtv vod set selection fix
// @include        http://www.gomtv.net/*/vod/*
// @require		   http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==


$(window).load(function () {
	location.href="javascript:player.playerLoad();";
});
