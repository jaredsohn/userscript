// ==UserScript==
// @name           Hide iGoogle Left Menu 
// @namespace      http://d.hatena.ne.jp/aont/
// @description    Hide iGoogle Left Menu
// @include        http://*.google.*/ig*
// @version        0.4
// ==/UserScript==

(function(){
  function addStyleRule(selector, declaration) {
    var sheet = document.styleSheets[document.styleSheets.length - 1];
    sheet.insertRule(selector + '{' + declaration + '}', sheet.cssRules.length);
  }
  //addStyleRule(".G-CU", "display: none;");
  //addStyleRule(".G-KS", "display: none;");
  addStyleRule(".kdSidebarHolder", "display: none;");
})();