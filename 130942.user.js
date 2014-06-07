// ==UserScript== 
// @name               Recenter Facebook Window
// @description        Recenters the main Facebook window for people using AdBlock
// @version	           1
// @run-at               document-start
// @include             *facebook.com*
// ==/UserScript== 

(function() {
  document.getElementById('globalContainer').style.paddingRight = '0';
})();