// ==UserScript== http://wiki.greasespot.net/Metadata_block
// @name            YYeTs ad frame remover
// @namespace       http://userscripts.org/users/whoisnull
// @description     Remove the annoying full-size div on top of the page.
// @match           http://www.yyets.com/*
// @run-at          document-end
// @updateURL       http://userscripts.org/scripts/source/180144.meta.js
// @downloadURL     http://userscripts.org/scripts/source/180144.user.js
// @version         1.2
// ==/UserScript==

var elements = document.querySelectorAll('body > a');
for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    if (element.href.indexOf('http://cs.twcczhu.com/p/redirect.php') >= 0) {
        document.body.removeChild(element);
    }
}