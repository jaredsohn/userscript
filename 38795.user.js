// ==UserScript==
// @name           RealPics.Net Ad Remover
// @namespace      http://www.realpics.net
// @description    Exactly what the title suggests.
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

// Strip ads
addStyle(".adText, .adHeadline { display:none }");
addStyle("#topad, #sitewide_ad { display: none }");


// Writes CSS to the document
writeStyle(css);
