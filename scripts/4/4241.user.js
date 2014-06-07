// ==UserScript==

// @name           Runescape Remove Ad
// @namespace      http://www.resolutionwebdesign.com
// @description    Remove the annoying ad from the top of the Runescape play page
// @include        *runescape.com*

// ==/UserScript==
var theIframe = parent.frames[0].window.document.getElementsByTagName("IFRAME").item(0);
if (theIframe) {
     theIframe.style.display = "none";
}