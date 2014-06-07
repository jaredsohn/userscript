// ==UserScript==
// @name           Scrolling Facebook Navigation bar
// @author         svenbit
// @namespace      http://www.svenbit.com
// @description    Make the Navigation Bar in Facebook scrollable
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

// Login Page Fix
addGlobalStyle('.loggedOut { z-index: -1 !important; }');
addGlobalStyle('#blueBar.nphLoggedOut { position: relative !important; }');
addGlobalStyle('#blueBarHolder.loggedOut { position:static !important; }');

addGlobalStyle('#globalContainer { padding-top: 40px ! important; }');
addGlobalStyle('#blueBarHolder { position: fixed !important; z-index: 97;width: 100%;}');
addGlobalStyle('.fbx #pageHead { z-index: 98 !important; width: 981px !important;background: #3B5998;}');

// Facebook Group Fix
addGlobalStyle('#blueBar.nph{z-index: 15 !important;}');

// Facebook Chat Sidebar Fix
addGlobalStyle('.fbChatSidebar { z-index: 99 !important; }');