// ==UserScript==
// @name Settlement Price
// @description Расчетная цена в магазине
// @author Prose
// @version 1.0
// @include http://virtonomica.*/*/main/unit/view/*/trading_hall
// @match http://virtonomica.*/*/main/unit/view/*/trading_hall
// ==/UserScript==

(function(window, undefined ) {

  var w;
  if (typeof unsafeWindow != undefined){
    w = unsafeWindow
  } else {
    w = window;  
  }
  if (w.self != w.top){
    return;
  }

  if (/http:\/\/virtonomica\..*\/.*\/main\/unit\/view\/.*\/trading_hall/.test(w.location.href)){
  
  
    alert("Userscripts приветствует вас навязчивым окном.");
  }
})(window);