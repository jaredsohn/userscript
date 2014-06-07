// ==UserScript==
// @name           Fallen London / Echo Bazaar 5-Card Lodgings Fix
// @version        1.0
// @namespace      
// @author         Saharan
// @description    Fixes the layout of a 5-card hand so that all five cards show up on a single line.
// @include        *echobazaar.failbettergames.com/Gap/*
// @include        *fallenlondon.com/Gap/*
// @include        *fallenlondon.storynexus.com/Gap/*
// @run-at         document-end
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

addStyle("ul#cards.hand-size5 li {width: 84px !important}")
writeStyle(css);