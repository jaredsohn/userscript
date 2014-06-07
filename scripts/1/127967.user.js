// ==UserScript==
// @name           Tapuz Communa View Fix
// @namespace      Tapuz
// @version        1.1
// @description    Hides the left and the right panels in Tapuz cummonas, so more space is available for posts
// @include        http://www.tapuz.co.il/communa/userCommunaMsges.asp?*
// ==/UserScript==

document.getElementsByClassName("communaPagePartners")[0].parentNode.style.display = "none";
document.getElementsByTagName("table")[6].childNodes[1].childNodes[2].childNodes[3].style.display = "none";