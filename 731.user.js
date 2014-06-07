// plinker.user.js - Google History Permalinker
// Author: Sean B. Palmer, inamidst.com
// Documentation: http://miscoranda.com/142
// Requirement: http://greasemonkey.mozdev.org/
// Installation: Tools -> Install User Script
//
// ==UserScript==
// @name          Google History Permalinker
// @namespace     http://inamidst.com/code/
// @description   Add permalinks to Search History results on Google
// @include       http://www.google.*/search*
// ==/UserScript==

(function() {
  var GoogleHistoryPermalinker = {

    // Add permalinks next to search results
    plink: function() { 
      var ONST = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE; 
      var xpath = "//div[not(@class)]//a[@href][@onmousedown]"; 
      var links = document.evaluate(xpath, document, null, ONST, null); 

      var link, i;
      for(link = null, i = 0; (link = links.snapshotItem(i)); i++) { 
        var uri = link.getAttribute("href").replace(/.*(http:[^&]+).*/, '$1'); 
        var a = document.createElement("a"); 
        var style = "font-size:1.25em;color:#000;text-decoration:none"; 
        a.setAttribute("style", style); 
        a.setAttribute("href", unescape(uri)); 
        a.appendChild(document.createTextNode("\u261E")); 
        var space = document.createTextNode(" "); 

        link.parentNode.insertBefore(space, link); 
        link.parentNode.insertBefore(a, space); 
      }
    }

  }

  if (window.location.href.match(/^http:..www\.google\.[\w\.]+\/search/i)) { 
    GoogleHistoryPermalinker.plink(); 
  }
})();
