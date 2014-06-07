// ==UserScript==
// @name            Facebook Chat Online Status Recolorer
// @namespace       rowen.atkinson.com.au
// @include         *.facebook.com/*
// @exclude         www.facebook.com/home.php
// @exclude         www.facebook.com/
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

function scttw_init() {
color_chat_icons();
}; 
window.addEventListener("load", function() { scttw_init() }, false);

function runColorChat() {
  $('.chatOnline .chatStatus').css({'background': '#F00'});
  $('.chatIdle .chatStatus').css({'background': '#FF0'});
}

function color_chat_icons(doc, node) {
  runColorChat();
  $('.fbFriendsOnlineFacepile').bind("DOMNodeInserted", function(evt) {
    runColorChat();
}, false);
};
//.user.js