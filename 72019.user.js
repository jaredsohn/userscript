// ==UserScript==
// @name           Odnoklassniki Hide Ads
// @namespace      http://userscripts.org/scripts/upload/72019
// @description    Odnoklassniki Hide Ads
// @include        http://*.odnoklassniki.ru/*
// @include        http://*.odnoklasniki.ru/*
// @version        1.01 11-06-2010
// ==/UserScript==

/* Written 2010 by Nikonor, elevengroup.ru
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
 
GM_addStyle("div#hook_Block_LeftColumnAdLinks{display:none;}");
GM_addStyle("div#hook_Block_LeftColumnBottomBaner{display:none;}");
GM_addStyle("div#hook_Block_MiddleColumnBanner{display:none;}");
GM_addStyle("div#hook_Block_UserMainAdsRB{display:none;}");
GM_addStyle("div#hook_Block_MiddleBannerContainer{display:none;}");
GM_addStyle("div#hook_Block_LeftColumnMiddleBaner{display:none;}");