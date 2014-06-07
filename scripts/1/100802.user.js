// ==UserScript==
// @name           Get rid of Facebook Chat!
// @author         svenbit
// @namespace      http://www.svenbit.com
// @description    Hide Facebook Chat from umm... Facebook?
// @icon           http://dl.dropbox.com/u/9016244/Greasemonkey/Get%20Rid%20of%20Facebook%20Chat/GetRidOfFacebookChat.png
// @include        https://www.facebook.com/
// @include        http://facebook.com/*
// @include        https://facebook.com/*
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.fbNub, .fbNubGroup, #chatFriendsOnline .typeahead, .uiFacepile { display: none ! important; }');