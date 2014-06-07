// ==UserScript==
// @name          Uptobox Adblocker-Blocker Blocker
// @namespace     fr.kergoz-panik.watilin
// @version       1.5
// @description   Blocks the Adblock Blocking feature ;)
//                
// @match         http://uptobox.com/*
//                
// @author        Watilin
// @copyright     2013+, Watilin
// @license       Creative Commons by-nc-sa
//                
// @run-at        document-start
// @grant         GM_addStyle
// ==/UserScript==

/* v1.5
 * An optimisation for Gecko-based browsers (Firefox) users.
 * The `beforescriptexecute` event, part of HTML5 specification, is
 * currently only supported by these browsers.
 * It's a powerful feature that allows to prevent execution of any
 * inline script in the page. Mwahaha.
 */

window.addEventListener("beforescriptexecute", function( e ){
   if (e.target.textContent.search(/adblock/i) >= 0) {
      e.preventDefault();
   }
}, false);

/* v1.4
 * Fallback for other browsers.
 */

var match = location.pathname.match(/\w{12}/);
if (match) {
   GM_addStyle("#" + match[0] +
      "{ height: 12px !important; margin-top: -12px !important; }");
   
   window.addEventListener("beforeunload", function( ){
      var $container = document.getElementById("container-page");
      var contents = $container.innerHTML.
         replace(/<script[^>]*>(?:.|\n)*?<\/script>/g, "");
      localStorage.setItem("savedPage", JSON.stringify({
         fileId: match[0],
         contents: contents
      }));
   }, false);
   
} else if ("/pages/adblock.html" == location.pathname) {
   var savedPage = localStorage.getItem("savedPage");
   if (savedPage) {
      localStorage.removeItem(savedPage);
      var json = JSON.parse(savedPage);

      // just cosmetics
      history.pushState &&
         history.pushState(null, "", json.fileId);
      
      var contents = json.contents;
      document.addEventListener("DOMContentLoaded", function( ){
         document.getElementById("container-page").innerHTML = contents;
      }, false);
   }
}
