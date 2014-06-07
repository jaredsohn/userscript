// Facebook News Ticker Hider
// version 0.1
// Copyright (c) 2011, DeathfireD
//
// --------------------------------------------------------------------
// Usage:
// This program will hide that annoying news feed that shows above your friends list. Your online friends list will still show exactly like it used to.
//
// V0.1 - released hider
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Facebook News Ticker Hider
// @description    Hides the annoying news ticker
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

// hide news ticker
addStyle("#pagelet_ticker { display: none; }");
//hide gripper
addStyle(".fbSidebarGripper { display: none; }");

// Writes CSS to the document
writeStyle(css);