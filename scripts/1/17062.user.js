// ==UserScript==
// @name         softWrapper
// @namespace    https://userscripts.org/people/5587
// @description  Changes textareas with wrap="off" to wrap="soft"
// @downloadURL  https://userscripts.org/scripts/source/17062.user.js
// @grant        none
// @include      *
// @updateURL    https://userscripts.org/scripts/source/17062.meta.js
// @version      1.0
// @date         2013-03-21
// @creator      Arne Dieckmann (aka "Mithrandir")
// ==/UserScript==

// Code by Malte Kraus

(function (){

var res = document.evaluate("//textarea[@wrap='off']", document, null,
                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE , null);
for(var i = 0; i < res.snapshotLength; i++) {
  var elem = res.snapshotItem(i);
  elem.setAttribute("wrap", "soft");
  var next = elem.nextSibling;
  var parent = elem.parentNode;
  parent.removeChild(elem);
  parent.insertBefore(elem, next);
}
}());