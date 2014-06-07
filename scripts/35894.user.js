// ==UserScript==
// @name           customizeGoogleResults
// @namespace      hanns
// @include        http://www.google.*/search?*
// @date           2008-10-23
// @version        0.0.2
// ==/UserScript==

var picLoc = " "; // --- Insert the path to your logo 150x105px --- //
var pic=document.getElementsByTagName("img");
pic[0].src = picLoc;

