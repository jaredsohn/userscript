// Facebook News Ticker and Online Friends Hider
// version 0.3
// Copyright (c) 2010, DeathfireD
//
// --------------------------------------------------------------------
// Usage:
// This program will hide your online friends. They will still be able
// to see you but you will no longer see their avatars show up on the lower left.
//
// V0.1 - released hider
// V0.2 - updated to hide new userlist
// V0.3 - updated to hide both the news ticker and the online friends list
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Facebook News Ticker and Online Friends Hider
// @description    Hides News Ticker and Online Friends List
// @include        http://facebook.com/
// @include        http://facebook.com/*
// @include        http://*facebook.com/*
// @include        http://www.facebook.com/*
// @namespace      http://www.facebook.com/
// ==/UserScript==

var css = new Array();

function writeStyle(css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    if (document.getElementsByTagName) {
        document.getElementsByTagName('head')[0].appendChild(style);
        if (style.sheet && style.sheet.insertRule) {
            for (var i = 0; i < css.length; i++) {
                style.sheet.insertRule(css[i], 0);
            }
        }
    }
}

function addStyle(style) {
    css[css.length] = style;
}

// Clean chat sidebar away
addStyle("#pagelet_sidebar { display: none; }");
addStyle(".fbChatSidebar { display: none; }");

// Writes CSS to the document
writeStyle(css);