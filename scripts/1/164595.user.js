// ==UserScript==
// @name       GTATurk Tema 2
// @namespace  http://gtaturk.com/
// @version    0.1
// @description  GTATürk Max Payne teması.
// @match      http://www.gtaturk.com/forum/*
// @copyright  Trollface
// ==/UserScript==

function replaceStyleSheet(oldCSS, newCSS) {
    document.evaluate('//link[@rel="stylesheet" and @href="'+oldCSS+'"]', document, null, 
		      XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.href = newCSS;
}

replaceStyleSheet("http://www.gtaturk.com/forum/Themes/darkbreak_20rc3/css/index.css?rc3", "http://www.gtaturk.com/forum/Themes/darkbreak_20rc3/css/indexmp.css?rc3");