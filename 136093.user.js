// ==UserScript== 
// @name           nCore Future
// @namespace      Created By Krisztian92 
// @description    nCore Future
// @include        http://*.ncore.cc/*
// @include        http://*.ncore.nu/*
// @include        http://ncore.cc/*
// @include        http://ncore.nu/*
// @include        https://*.ncore.cc/*
// @include        https://*.ncore.nu/*
// @include        https://ncore.cc/*
// @include        https://ncore.nu/*
// ==/UserScript== 

function replaceStyleSheet(oldCSS, newCSS) {
    document.evaluate('//link[@rel="stylesheet" and @href="'+oldCSS+'"]', document, null, 
		      XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.href = newCSS;
}
replaceStyleSheet("/styles/grunge/stylev4.css", "http://ncorefuture.atw.hu/ncore.css");

