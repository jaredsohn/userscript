// ==UserScript==
// @name Acu no-Lose
// @description Disable Lose1 theme 
// @include http://acu.epita.fr/
// @include https://acu.epita.fr/
// @include http://acu.epita.fr/projects
// @include https://acu.epita.fr/projects
// @include http://acu.epita.fr/*
// @include http://*.acu.epita.fr/*
// @include https://acu.epita.fr/*
// @include https://*.acu.epita.fr/*
// @version 0.1
// ==/UserScript==

function replaceStyleSheet(oldCSS, newCSS) {
    document.evaluate('//link[@rel="stylesheet" and @href="'+oldCSS+'"]', document, null, 
		      XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.href = newCSS;
}

function replaceJavaScript(oldJS, newJS) {
    document.evaluate('//script[@type="text/javascript" and @href="'+oldJS+'"]', document, null, 
		      XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.href = newJS;
}

replaceJavaScript("/theme/Lose1/js/theme.js", "/js/theme.js");
replaceStyleSheet("/theme/Lose1/css/main.css", "/css/main.css");