// ==UserScript==
// @id              
// @name           Fallen London / Echo Bazaar Deck Nex Prompt Remover
// @version        1.0
// @namespace      
// @author         Saharan
// @description    Removes the ad for other Storynexus games on the rightmost side of Fallen London. If you like this, feel free to send the next Boxed Cat you find to Saharan!
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

addStyle("#card_deck > form{display:none !important;}");
writeStyle(css);    