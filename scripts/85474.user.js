// ==UserScript==
// @name           Fragment Inspector
// @namespace      http://shinkirou.org/projects
// @description    A script that locates document fragments and generates links to fragements.
// @include        http://*
// @include        https://*
// ==/UserScript==

(function() {

window.addEventListener('load', main, false);

var enabled = false;

function xpath(expr) {
  return document.evaluate(expr, document,
    null, XPathResult.ANY_TYPE, null);
}

function eachNode(ns, f) {
  for (var i = 0; i < ns.snapshotLength; i ++) {
    f(ns.snapshotItem(i));
  }
}

function handler(e) {
  // console.log(e);
  var box = document.createElement('span');
  box.setAttribute('style', 'font-weight: bold !important;\
    color: red !important;\
    background: rgba(255, 200, 200, 0.5) !important;\
    border-radius: 1em !important;\
    -moz-border-radius: 1em !important;');
  box.innerHTML = "<a class='fraginsp-link' href='#"
    + (e.id || e.name) + "'>#" + (e.id || e.name) + "</a>";
  e.appendChild(box);
}

function remover(e) {
  e.parentNode.removeChild(e);
}

function enable() {
  eachNode(xpath('//*[@id]'), handler);
  eachNode(xpath('//a[@name]'), handler);
}

function disable() {
  eachNode(xpath('//a[@class="fraginsp-link"]'), remover);
}

function toggle(e) {
  if (e.which == 220 && e.altKey) {
    if (enabled) disable();
    else enable();
    enabled = !enabled;
  }
}

function main() {
  window.addEventListener('keydown', toggle, false);
}

})();
