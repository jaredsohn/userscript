// ==UserScript== 
// @name           nCore Dark Style by TBQ 
// @namespace      Created By TBQ 
// @description    nCore Dark Style
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
replaceStyleSheet("/styles/dark/stylev4.css", "http://adamswallpaper.diospc.hu/dark/ncore.css");

