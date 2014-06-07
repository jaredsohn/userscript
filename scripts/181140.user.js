// ==UserScript==
// @name           CSS Replace for furulya.org
// @namespace      http://www.furulya.org
// @description    Replaces main CSS 
// @include        http://furulya.org/*
// @include        http://www.furulya.org/* 
// ==/UserScript==

function replaceStyleSheet(oldCSS, newCSS) {
    document.evaluate('//link[@rel="stylesheet" and @href="'+oldCSS+'"]', document, null, 
		      XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.href = newCSS;
}

replaceStyleSheet("http://www.furulya.org/skins/deep/template.css", "http://furulya.uw.hu/greytemplate.css");
replaceStyleSheet("http://www.furulya.org/skins/deep/core.css", "http://furulya.uw.hu/greycore.css");