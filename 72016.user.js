// ==UserScript==
// @name           Odnoklassniki Hide Activity List
// @namespace      http://userscripts.org/scripts/show/72016
// @description    Odnoklassniki Hide Activity List.
// @include        http://*.odnoklassniki.ru/*
// @include        http://*.odnoklasniki.ru/*
// @version        1.00 2010-03-03
// ==/UserScript==

/* Written 2008 by Nikonor, elevengroup.ru
 * This script is Public Domain.
 */
 if (typeof GM_addStyle == 'undefined') {
  function GM_addStyle(css) {
    var head = document.getElementsByTagName('head')[0];
    if (head) {
      var style = document.createElement("style");
      style.type = "text/css";
      style.appendChild(document.createTextNode(css));
      head.appendChild(style);
    }
  }
}
 
GM_addStyle("div#hook_Block_UserMainFeedNewsFeedsRB{display:none;}");