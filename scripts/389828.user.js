// ==UserScript==
// @name       Wider Community Playstation Forum
// @version    0.3

// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @description  Script makes Playstation Community Board wider, better to read.
// @match      http://community.eu.playstation.com/*
// @copyright  2014+, Anubis
// ==/UserScript==

$(".lia-quilt-row").css("width", "100%");
$(".lia-quilt-row-forum-message-main").css("width", "100%");
$(".lia-quilt-row-forum-message-main").css("margin-left", "0");
$(".lia-quilt-column-17").css("width", "70%");
$(".lia-content").css("margin", "0 auto");
$(".linear-message-lis").css("width", "0 auto");
$(".lia-quilt-column-left").css("width","200px");
$(".lia-decoration-border-content").css("padding-left","30px");
$(".lia-quilt-column-right").css("float","right");
$(".lia-quilt-column-quickreply-right").css("float","left");
$(".lia-quilt-column-quickreply-right").css("min-width","50px");

$(".pdc6-message-author-details-hidden").css("height","300px");
$(".pdc6-message-author-details-hidden").each(function() {
    var userName = $(this).prev("div.pdc6-message-author-details").find("div.username > a").text();
	$(this).append("<img border='0' src='http://card.psnprofiles.com/1/" + userName + ".png' style='margin-top: 10px;'>");
});