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
if (poststate.value != 4){poststate.value = 4;}
if (regular.value != 4){regular.value = 4;}
if (photo.value != 4){photo.value = 4;}
if (quote.value != 4){quote.value = 4;}
if (links.value != 4){links.value = 4;}
if (chat.value != 4){chat.value = 4;}
if (video.value != 4){video.value = 4;}