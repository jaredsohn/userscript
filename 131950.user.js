// ==UserScript== 
// @name           Bithardy
// @namespace      Created By Bubo
// @description    Bithardy style
// @include        http://*.bithardy.eu/*
// @include        http://*.bithardy.nu/*
// @include        http://bithardy.eu/*
// @include        http://bithardy.nu/*
// @include        https://*.bithardy.eu/*
// @include        https://*.bithardy.nu/*
// @include        https://bithardy.eu/*
// @include        https://bithardy.nu/*
// ==/UserScript== 

function replaceStyleSheet(oldCSS, newCSS) {
    document.evaluate('//link[@rel="stylesheet" and @href="'+oldCSS+'"]', document, null, 
		      XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.href = newCSS;
}
replaceStyleSheet("http://bithardy.eu/templates/9/9.css", "http://castieldesign.atw.hu/bit/9.css");

