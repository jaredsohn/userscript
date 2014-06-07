// ==UserScript==
// @name        HWzone.co.il No-Crap
// @namespace   HwZoneNoCrap
// @version     0.2
// @homepage    http://userscripts.org/scripts/show/175529
// @description Removes Call-of-Duty / Battlefield threads from "What's New?".
// @match       http://*.hwzone.co.il/community/news.php*page=1&tabid=71*
// @copyright   2013, Nir Azuelos (a.k.a. losnir) <nirazuelos@gmail.com>
// @updateURL   http://userscripts.org/scripts/source/175529.meta.js
// @downloadURL http://userscripts.org/scripts/source/175529.user.js
// ==/UserScript==

if (window.top != window.self) return;
(function HwZoneNoCrap() {

   function injectScript(s) {
      var scriptElement = document.createElement("script");
      scriptElement.appendChild(document.createTextNode("("+ s +")();"));
      (document.body || document.head || document.documentElement).appendChild(scriptElement);
   }

   var modifyResultsTimeout = null,
   _jQuery = (typeof jQuery != "undefined" && jQuery) || (function() {
      var _getJquery = function(e) { _jQuery = e.detail; };
      window.addEventListener("HwZoneNoCrap:getJquery", _getJquery);
      injectScript(function() {
         window.dispatchEvent(new CustomEvent("HwZoneNoCrap:getJquery", { detail: jQuery }));
      });
      window.removeEventListener("HwZoneNoCrap:getJquery", _getJquery);
      return _jQuery;
   }());

   _jQuery("#searchresults").bind("DOMSubtreeModified", function() {
      if(modifyResultsTimeout !== null) clearTimeout(modifyResultsTimeout);
      modifyResultsTimeout = setTimeout(function() {
         _jQuery("#searchresults li.threadbit span#postedforum a").each(function() {
            if(_jQuery(this).is(":contains(Call of Duty), :contains(Battlefield)")) {
               // You shall die.
               _jQuery(this).parents("li.threadbit").remove();
            }
         });
      }, 250);
   });

}());