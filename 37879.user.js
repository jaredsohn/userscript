// ==UserScript==
// @name           Greasemungo Zombie Hunters
// @namespace      john.smoody@popmundotr.com
// @description    Zombi avlarinda kösedeki zombi resmine tiklayarak yilin en cok zombi vuran avcilarinin listesini gorebilirsiniz.
// @include        http://www*.popmundo.com/Common/*
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////////
//
//    Greasemungo Zombie Hunters
//
////////////////////////////////////////////////////////////////////////////////

var MAIN_MENU_PART2_XPATH = "//tr[@class='MainMenu']/td[2]";

var LINK_IMAGE_SRC = 'http://img239.imageshack.us/img239/1747/zombie2zi2.gif';
	
var LINK_IMAGE_TITLE = 'Zombie Hunters';

var LINK_URL = 'Charts.asp?action=TopZombieHunters';

function xpathNode(xpath) {
	return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

var targetNode = xpathNode(MAIN_MENU_PART2_XPATH);

if (targetNode) {
	var img1 = document.createElement('img');
	img1.src = LINK_IMAGE_SRC;
	img1.title = LINK_IMAGE_TITLE;
	img1.style.border = '0 none black';
	img1.style.padding = '0';

	var a1 = document.createElement('a');
	a1.appendChild(img1);
	a1.href = LINK_URL;
	
	targetNode.insertBefore(a1, targetNode.firstChild);	
}

// EOF