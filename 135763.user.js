// ==UserScript==
// @name dadsngrads eliminator
// @description Eliminate all references to "dads and grads". I do it out of bitterness. You do it for whatever reason you want.
// ==/UserScript==

var els = document.getElementsByTagName("*");
for(var i = 0, l = els.length; i < l; i++) {
  var el = els[i];
  el.innerHTML = el.innerHTML.replace(/Dads and Grads/gi, 'bar');
  el.innerHTML = el.innerHTML.replace(/Dads &amp; Grads/gi, 'bar');
  el.innerHTML = el.innerHTML.replace(/dads and grads/gi, 'bar');
  el.innerHTML = el.innerHTML.replace(/dads &amp; grads/gi, 'bar');
  el.innerHTML = el.innerHTML.replace(/dads And grads/gi, 'bar');
  el.innerHTML = el.innerHTML.replace(/Dads & Grads/gi, 'bar');
  el.innerHTML = el.innerHTML.replace(/dads & grads/gi, 'bar');
}