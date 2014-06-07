// ==UserScript==
// @name        ixquick
// @namespace   ixquick
// @include     *ixquick.com/*
// @grant unsafeWindow
// @version     1.6.7
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.js
// ==/UserScript==

$(function(){

        $("#head_left, #category").append('&nbsp;|&nbsp;&nbsp;<a target="_blank" href="http://www.mapquest.com/">Cartes</a>');
	$("#content p img").attr("src","http://avatar3.status.net/i/identica/186604-96-20110701121116.png");
	$("#content p img").attr("width","96px");
 	$("#caption, #light, #lang, #links, #sponsored, #news_message, #tip, #ix_promo_box").hide();
});

