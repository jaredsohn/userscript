// ==UserScript==
// @name           CSS Replace
// @namespace      http://www.socialvitamin.com/apps
// @description    Replaces any given CSS in any website Example: <link rel="stylesheet" type="text/css" href="css/global.css"> to <link rel="stylesheet" type="text/css" href="css/global2.css"> you need to edit the script to your preferences.
// @include        http://www.example.com/
// ==/UserScript==

function replaceStyleSheet(oldCSS, newCSS) {
    document.evaluate('//link[@rel="stylesheet" and @href="'+oldCSS+'"]', document, null, 
		      XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.href = newCSS;
}

replaceStyleSheet("http://www.example.com/style1.css", "http://www.example.com/style2.css");