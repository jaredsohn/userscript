// ==UserScript==
// @name         showMoreExtensions
// @namespace    http://userscripts.org/people/5587
// @description  Shows more extensions on AMO by default
// @source       http://userscripts.org/scripts/show/23710
// @identifier   http://userscripts.org/scripts/source/23710.user.js
// @version      1.04
// @date         2009-06-13
// @creator      Arne Dieckmann (aka "Mithrandir")
// @include      https://addons.mozilla.org*
// ==/UserScript==

(function (){

// left navigation:
 var res = document.evaluate("//ul[@id='categoriesdropdown']/li/ul/li/a", document, null,
                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null);
// var res = document.evaluate("//a[contains(@href,'cat:')]", document, null,
//                             XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null);
for(var i = 0; i < res.snapshotLength; i++) {
  var elem = res.snapshotItem(i);
  elem.href = elem.href +'?sort=name&show=100';
}


// search:
var res = document.evaluate("//form[@id='search-form']", document, null,
                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null);
for(i = 0; i < res.snapshotLength; i++) {
  var elem = res.snapshotItem(i);
  var inp = document.createElement("input");
  inp.setAttribute("type", "hidden");
  inp.setAttribute("name", "show");
  inp.setAttribute("value", "100");
  elem.appendChild(inp);
}


// advanced search:
var res = document.evaluate("//select[@id='pp']/option", document, null,
                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null);
for(i = 0; i < res.snapshotLength; i++) {
  var elem = res.snapshotItem(i);
  elem.removeAttribute("selected");
  if (i==4) {
    elem.setAttribute("selected", "selected");
  }
}
}());