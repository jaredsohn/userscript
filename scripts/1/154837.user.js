// ==UserScript==
// @id             fragbitecleanup
// @name           Fragbite Cleanup
// @version        0.2.1
// @author         dvr
// @description    Removes ad box in header and adjusts design accordingly.
// @include        http://www.fragbite.*
// @run-at         document-end
// @updateURL      http://userscripts.org/scripts/source/154837.user.js
// ==/UserScript==

var node1 = document.evaluate('//*[@id="adblock_info"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
  , node2 = document.evaluate('//td[@class="header"]/div[3]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

node1.style.display='none';
node2.style.display='none';

var logo = document.getElementsByClassName("header")[0]
  , forum = document.getElementsByTagName("td")[6];
	
logo.style.height = "135px";	
forum.style.height = "auto";
forum.style.width = "204px";