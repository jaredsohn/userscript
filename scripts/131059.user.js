// ==UserScript== 
// @name           nCore Glow Style by TBQ 
// @namespace      Created By TBQ 
// @description    nCore Glow Style
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
replaceStyleSheet("/styles/default/stylev4.css", "http://adamswallpaper.diospc.hu/ncore.css");

