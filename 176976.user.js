// ==UserScript==
// @name        Inbox link on frontpage for Youtube
// @namespace   http://lambdaweb.awardspace.com/
// @description Brings the inbox link back to the front page
// @include     *.youtube.com/*
// @version     1.02
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==


$(document).ready(function(){
$("#history-guide-item").after("<li id='inbox-guide-item' class='vve-check guide-channel' style='margin-bottom:-5px; margin-top:2px'><a class='guide-item yt-uix-sessionlink yt-align spf-nolink' href='/inbox' title='Inbox'><span class='yt-valign-container'><span class='display-name no-count'><span>&nbsp;Inbox</span></span></span></a></li>");
});