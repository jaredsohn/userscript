// ==UserScript==
// @name           big chat boxes on facebook
// @namespace      http://userscripts.org/users/81883
// @description    make them group chats bigger
// @include        http://*.facebook.com/*
// @include        http://facebook.com/*
// @include        https://*.facebook.com/*
// @include        https://facebook.com/*
// @include        http://*.facebook.tld/*
// @include        http://facebook.tld/*
// @include        https://*.facebook.tld/*
// @include        https://facebook.tld/*
// ==/UserScript==

function update() {
 var chat = document.getElementsByClassName('fbNubFlyoutBody conversationContainer');
 for (var i in chat) {
  chat[i].setAttribute('style', 'height: 500px;');
 }
}

function timeMsg() {
 var t = setTimeout("update()",3000);
}


// document.addEventListener("DOMNodeInserted", update, true);