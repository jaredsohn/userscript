// ==UserScript==
// @name           Tumblr select add to queue by default
// @namespace      http://userscripts.org/users/ztox
// @description    selects add to queue by default, instead of publish now. Made by http://ztox.tumblr.com
// @include        http://www.tumblr.com/*
// @version        0.1
// ==/UserScript==

var poststate = document.getElementById("post_state");
var regular = document.getElementById("regular_form_post_state");
var photo = document.getElementById("photo_form_post_state");
var quote = document.getElementById("quote_form_post_state");
var links = document.getElementById("link_form_post_state");
var chat = document.getElementById("chat_form_post_state");
var video = document.getElementById("video_form_post_state");
if (poststate.value != 2){poststate.value = 2;}
if (regular.value != 2){regular.value = 2;}
if (photo.value != 2){photo.value = 2;}
if (quote.value != 2){quote.value = 2;}
if (links.value != 2){links.value = 2;}
if (chat.value != 2){chat.value = 2;}
if (video.value != 2){video.value = 2;}