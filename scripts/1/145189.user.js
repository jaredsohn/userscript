// ==UserScript==
// @name           FL Black
// @namespace      http://www.socialvitamin.com/apps
// @description    Replaces any given CSS in any website Example: <link rel="stylesheet" type="text/css" href="css/global.css"> to <link rel="stylesheet" type="text/css" href="css/global2.css"> you need to edit the script to your preferences.
// @include        http://filelist.ro/*
// ==/UserScript==

function replaceStyleSheet(oldCSS, newCSS) {
    document.evaluate('//link[@rel="stylesheet" and @href="'+oldCSS+'"]', document, null, 
		      XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.href = newCSS;
}

replaceStyleSheet("/styles/1.css", "https://dl.dropbox.com/u/103451168/css1.css");