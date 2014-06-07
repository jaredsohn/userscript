// ==UserScript==
// @id             fallenlondon.storynexus.com-3e7529bb-7199-4819-bc80-6a2710960e0e@scriptish
// @name           Fallen London / Echo Bazaar Orange Bar Remover
// @version        1.1
// @namespace      https://userscripts.org/scripts/show/149076
// @author         Saharan
// @description    Removes the unsightly orange bar from the top of Fallen London. If you like this, feel free to send the next Boxed Cat you find to Saharan!
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

addStyle("#navbar.pageblock {display:none !important;}");
writeStyle(css);