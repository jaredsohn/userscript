// ==UserScript==
// @name           RealPics.Net Custom Forum CSS
// @namespace      http://www.realpics.net
// @description    Custom Forum CSS for RealPics.Net
// @include        http://realpics.net/forums/*
// @include        http://*.realpics.net/forums/*
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

// Color changes
addStyle("span.post_count  { color: #FFFFFF; }");
addStyle("span.join_date  { color: #FFFFFF; }");
addStyle("span.post_count  { color: #FFFFFF; }");
addStyle(".online span { border-bottom: 1px dotted #00FF00; }");
addStyle("#posts .body div.rank { ;border: 1px dotted rgb(68,68,68) }");

// Writes CSS to the document
writeStyle(css);
