// ==UserScript==
// @name        YouTube Inbox Link
// @namespace   http://ssvx.de/
// @description Just adds a link to your inbox at YouTube
// @include     http*://*.youtube.com/*
// @require     http://code.jquery.com/jquery-latest.min.js
// @version     1
// ==/UserScript==
$("#yt-masthead-user").append('<button class="yt-uix-button yt-uix-button-default yt-uix-button-group yt-valign-container" onclick="document.location.href=\'/inbox\';"><span class="yt-uix-button-content">Inbox</span></button>');