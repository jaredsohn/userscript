// myCss
// version 0.1
// Copyright (c) 2006, Mike Cao
//
// --------------------------------------------------------------------
// Usage:
// Create a new @include entry for each website you want to
// add your custom CSS to. If you want to use different CSS
// for multiple sites, just re-install this script using a
// different @name value for each CSS set you create.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           myCss
// @description    Allows you to insert your own custom CSS into any site.
// @include        http://nytimes.com/*
// @include        http://*.nytimes.com/*
// @namespace      http://www.mikecao.com/
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

// Define your CSS here
addStyle("body { font-family: Times New Roman; }");
addStyle("h1 { font-family: Times New Roman; }");
addStyle("h2 { font-family: Times New Roman; }");
addStyle("h3 { font-family: Times New Roman; }");
addStyle("h4 { font-family: Times New Roman; }");
addStyle("h5 { font-family: Times New Roman; }");
addStyle("a { font-family: Times New Roman; }");
addStyle(".story { font-family: Times New Roman; }");
addStyle(".summary { font-family: Times New Roman; }");
addStyle("p { font-family: Times New Roman; font-size: 12pt; }");

// Writes CSS to the document
writeStyle(css);
