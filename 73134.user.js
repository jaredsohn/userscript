// ==UserScript==
// @name           New York Times "More in" box remover
// @author         Philipp Weis <pweis@pweis.com>
// @namespace      http://userscripts.org/users/111324
// @description    Removes the "More in ..." box at nytimes.com.
// @include        http://*.nytimes.com/*
// @include        http://nytimes.com/*
// @include        https://*.nytimes.com/*
// @include        https://nytimes.com/*
// @version        0.1.1
// @license        Public Domain
// ==/UserScript==

window.addEventListener("DOMNodeInserted", nodeFilter, false);

function nodeFilter(event) {
    var node = event.target;
    if (node.id == "upNextWrapper") {
        node.parentNode.removeChild(node);
    }
}

