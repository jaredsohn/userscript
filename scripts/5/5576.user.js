// ==UserScript==
// @name          Tut.by cleaner
// @namespace     http://youngpup.net/userscripts
// @description   Cleans up nasty ads from tut.by.
// @author        Pavel Zhytko
// @date          2006-09-11
// @version       0.1
// @include       http://*tut.by*
// @include       https://*tut.by*
// ==/UserScript==

(function () {
   
   // Remove all objects (flash-movies)
   var objects = document.evaluate("//object", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   var t0 = new Date().getTime();
   for (var object = null, i = 0; (object = objects.snapshotItem(i)); ++i) {
      object.parentNode.removeChild(object);
   }
   
   // Something else?
   
   var t1 = new Date().getTime();
   //alert((t1 - t0) / 1000);
})();