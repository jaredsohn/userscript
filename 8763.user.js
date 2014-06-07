// ==UserScript==
// @name           MHB-Colors
// @description    Change specific colors specified in CSS for OGame
// @include        http://*.gfsrv.net/game/*
// @namespace      http://www.cactuz.net/mhb
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
addStyle(".flight.ownattack {color: white;}");
addStyle(".return.ownattack {color: lime;}");

addStyle(".flight.owntransport {color: white;}");
addStyle(".return.owntransport {color: lime;}");

addStyle(".flight.ownespionage {color: white;}");
addStyle(".return.ownespionage {color: lime;}");

addStyle(".flight.ownharvest {color: white;}");
addStyle(".return.ownharvest {color: white;}");

addStyle("*.owndeploy {color: orange;}");
addStyle("*.owncolony {color: white;}");


writeStyle(css);