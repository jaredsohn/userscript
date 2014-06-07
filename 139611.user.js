// ==UserScript==
// @name           Go Away!
// @author         Myles
// @namespace      http://google.com
// @description    Confirm Solved Sucks
// @version        1.0
// @copyright      2012 © Myles
// ==/UserScript==

var els = document.getElementsByTagName("*");
for(var i = 0, l = els.length; i < l; i++) {
  var el = els[i];
  el.innerHTML = el.innerHTML.replace(/Confirm Solved/gi, 'Go Away');
}
