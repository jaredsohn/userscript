// ==UserScript==
// @name           Quick AMP Link
// @author         BadassZetta
// @description    Adds a link to your AMP on the platform nav
// @include        http://www.gamefaqs.com/*
// ==/UserScript==

//If this shows up in an odd location for you, try removing the "//" from the next line and the last line. If it still doesn't work, let me know.
window.addEventListener("load", function(e) {

var platnav = document.evaluate('//div[@id="platformlist"]/div[@class="mh_wrap"]/div[@id="sys"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (platnav != null) { 
	var platnavchildren = platnav.childNodes;
	var amplink = document.createElement("a");
	amplink.setAttribute('href', 'http://www.gamefaqs.com/boards/myposts.php');
	amplink.setAttribute('style', 'margin-right: 10px;');
	amplink.textContent = 'Active Messages';
	
	platnav.insertBefore(amplink,platnavchildren[0]);
}

// If the space up there looks kinda cramped, use either this css:
//
//#platformlist div.jumper {width:auto!important;}
//
//Or you can remove the "/*" from before the next line of code.

/*var head = document.evaluate('//head', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var cssrule = document.createElement("style");
cssrule.setAttribute('type', 'text/css');
cssrule.textContent = '#platformlist div.jumper {width:auto!important;}';
head.appendChild(cssrule); // */

}, false);
