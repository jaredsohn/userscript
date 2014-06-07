// ==UserScript==
// @name           Ebay - show map for seller information
// @namespace      #avg
// @include        http://*ebay.tld/ws/eBayISAPI.dll*
// @description    A preliminary mapper for Ebay. Tested once.
// @version        0.1
// ==/UserScript==
var info=document.body.innerHTML.match(/(Business Seller|Rechtliche Informationen des Verkäufers).+/)[0].replace(/<\/?.+?>/g,"/").replace(/\/{1,}/g," ")
var z=document.createElement("iframe");
z.src="http://avindra.com/gapi.php?a="+/\d+.+/g.exec(info);
z.setAttribute("style","height:215px;width:370px;");
var g=document.getElementById("skypeSectionDiv");
g.parentNode.replaceChild(z,g);