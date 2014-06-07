/**
* @package: Playerscripts Stuff Remover
* @authors: crazydude
* @created: December 15, 2010
*/

// ==UserScript==
// @name           Playerscripts Stuff Remover
// @namespace      PSStuffRemover
// @description    Removes ads and other annoying stuff from PlayerScripts
// @include        http://www.playerscripts.com*
// @include        http://playerscripts.com*
// @version        1.1
// ==/UserScript==

(function() {
  function xpathFirst(p, c) {
    return document.evaluate(p, c || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
  }
  
  // Remove top ad
  var eltLogoTop = document.getElementById('gk-header');
  if (eltLogoTop)
    eltLogoTop.style.display = 'none';

  // Remove pointless announcement
  var eltAnnouncement = xpathFirst('.//div[@class="ag_outerwrap"]');
  if (eltAnnouncement)
    eltAnnouncement.style.display = 'none';
	
  // Remove banner1
  var eltBanner1 = document.getElementById('banner1');
  if (eltBanner1)
    eltBanner1.style.display = 'none';
	
  // Remove banner2
  var eltBanner2 = document.getElementById('banner2');
  if (eltBanner2)
    eltBanner2.style.display = 'none';
	
  // Remove banner3
  var eltBanner3 = xpathFirst('.//img[@src="http://psmainsite.tinhatsoftwarelt.netdna-cdn.com/images/ps/ps-we-need-your-log.jpg"]');
  if (eltBanner3)
    eltBanner3.style.display = 'none';
	
  // Remove footer
  var eltFooter = document.getElementById('gk-botsl1');
  if (eltFooter)
    eltFooter.style.display = 'none';
})();
