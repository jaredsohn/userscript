// ==UserScript==
// @id             fallenlondon.storynexus.com-4ccbd460-9ca2-4daa-91d5-8fb8aafa403c@scriptish
// @name           Fallen London / Echo Bazaar Storynexus Ad Remover
// @version        1.01
// @namespace      
// @author         Saharan
// @description    Removes the ad for other Storynexus games on the rightmost side of Fallen London. Untested in Chrome. If you appreciate this script, feel free to think of me the next time you need a delicious friend's assistance! Profile as homepage.
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

addStyle("a.fl_sidebar_ad,div.sidebarlink:nth-child(2) {display:none !important;}")
writeStyle(css);