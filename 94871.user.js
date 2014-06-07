// ==UserScript==
// @name 4chan /b/lack remover
// @namespace sup
// @description Replaces CSS
// @version 1.0
// @include http://boards.4chan.org/*
// @include http://sys.4chan.org/*
// ==/UserScript==


function replaceStyleSheet(oldCSS, newCSS) {
document.evaluate('//link[@rel="stylesheet" and @href="'+oldCSS+'"]', document, null, 
XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.href = newCSS;
}

replaceStyleSheet("http://images.4chan.org/b/junk/css/single.css";, "http://static.4chan.org/css/yotsuba.9.css";);