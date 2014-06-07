// ==UserScript==
// @name           Tumblr select add to drafts by default
// @namespace      http://userscripts.org/users/23o9
// @description    selects add to drafts by default, instead of publish now. Credits go to http://23o9.tumblr.com
// @include        http://www.tumblr.com/*
// @version        0.7
// ==/UserScript==

var poststate = document.getElementById("post_state");
var text = document.getElementById("regular_form_post_state");
var photo = document.getElementById("photo_form_post_state");
var quote = document.getElementById("quote_form_post_state");
var links = document.getElementById("link_form_post_state");
var chat = document.getElementById("chat_form_post_state");
var video = document.getElementById("video_form_post_state");

if (poststate.value != 1){poststate.value = 1;}
if (text.value != 1){regular.value = 1;}
if (photo.value != 1){photo.value = 1;}
if (quote.value != 1){quote.value = 1;}
if (links.value != 1){links.value = 1;}
if (chat.value != 1){chat.value = 1;}
if (video.value != 1){video.value = 1;}