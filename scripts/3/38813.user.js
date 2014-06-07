// ==UserScript==
// @name           RealPics.Net Site Resizer
// @namespace      http://www.realpics.net
// @description    RealPics.Net Site Resizer - Make it 790px again!
// @include        http://*.realpics.net/*
// @include        http://realpics.net/*
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

// Resize the whole thing back to normal
addStyle("div.contain { width: 790px; margin: 0 auto; text-align: left}");
addStyle("div.chtb { width: auto; }");
// Writes CSS to the document
writeStyle(css);
