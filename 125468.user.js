// ==UserScript==
// @name           playEmbed
// @namespace      Vivre
// @author         Vivre
// @description    Autoplay all iframe-embed yt-links
// @copyright      2012+, Vivre
// @license        Free for personal and/or non-commercial use
// @version        0.1
// @include        http://*
// ==/UserScript==

/*************************************************************************

    This script is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY.

**************************************************************************/


function playEmbed() {
  var allLinks = document.getElementsByTagName('iframe');
  for (var i=0;i<allLinks.length;i++) {
    var currentLink = allLinks[i];
    if(currentLink.src.match("http*://www.youtube.com/embed/.*[^#]$")) {
      var orgLink = currentLink.src.match("http*://www.youtube.com/embed/.*[^#]$")
      var newLink = orgLink + "?hl=pl&autoplay=1&rel=0"
      currentLink.removeAttribute('src');
      currentLink.setAttribute("src", newLink);
    }
  }
}
playEmbed();

// End of script
