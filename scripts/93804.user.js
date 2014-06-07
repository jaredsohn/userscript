// ==UserScript==
// @name           Better Google translate in Tunisia
// @namespace      Shichemt Alen
// @description    the Google Translate's CSS file was censored in Tunisia.
// @include        http://translate.google.com/
// ==/UserScript==

function replaceStyleSheet(oldCSS, newCSS) {
    document.evaluate('//link[@rel="stylesheet" and @href="'+oldCSS+'"]', document, null, 
		      XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.href = newCSS;
}

replaceStyleSheet("/translate/static/msE8_Q6dkPs/css/desktop_ltr.css", "http://www.mtanunua.com/wp-includes/desktop_ltr.css");