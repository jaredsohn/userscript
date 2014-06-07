// Mailto Alert v0.1
// Made By Timendum
// Last updated: 17/12/05 (dd/mm/yr)
//
// This script is made according to a request:
// Alert when clicking on a mailto: link
// Somehow based on Mailto Envelope made by Jason (aka GamingFox)
//
//
// ==UserScript==
// @name	  Mailto Alert
// @version 0.1
// @author  Timendum
// @description	  Ask confimation for mailto: link click
// @include	  *
// ==/UserScript==

(function () {
  var links = document.links;
  for (var i=0; i<links.length; i++) {
    if ( (links[i].href.substring(0, 7).toLowerCase() == "mailto:") && (links[i].text) )
     	links[i].setAttribute("onclick", 'javascript:return confirm("Are you sure you want to send an e-mail?")');
  }
})();
