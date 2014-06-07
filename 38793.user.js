// ==UserScript==
// @name           RealPics.Net Forum Resizer
// @namespace      http://www.realpics.net
// @include        http://*.realpics.net/forums/*
// @include        http://realpics.net/forums/*
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
addStyle("#posts .body .text { width: 580px; margin-right: 0px; border: 0px}");
addStyle("#quick_reply textarea { width: 700px; }");

// Larger posted images
addStyle("#posts .body .text img.postedImg {width: 300px !important; height: auto !important; border: 1px solid #0E0D37; }");

// Writes CSS to the document
writeStyle(css);
