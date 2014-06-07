// ==UserScript==
// @name		  OGame Moon Spy
// @namespace	 OGame Moon Spy
// @description   OGame - directly spy a moon.
// @include	   http://*/game/galaxy.php?session=*
// @exclude	   
// ==/UserScript==    

element = document.evaluate('/html/body/center/form/table/tbody/tr[1]/td[1]/table/tbody/tr[2]/td[2]/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
galaxy = element.value;

element = document.evaluate('/html/body/center/form/table/tbody/tr[1]/td[2]/table/tbody/tr[2]/td[2]/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
system = element.value;

element = document.evaluate('/html/body/center/form/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
session = element.value;

aa=4;
xx=2;
while (xx != 17){
	xx++;
	oggetto = '/html/body/center/table/tbody/tr[';
	oggetto += xx;
	oggetto += ']/th['
	oggetto += aa;
	oggetto += ']/a';
	element = document.evaluate(oggetto, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	if (element) {
		planet = xx - 2;
		link = "flotten1.php?session=" + session + "&galaxy=" + galaxy + "&system=" + system + "&planet=" + planet + "&planettype=3&target_mission=6";
		element.href = link;
	};
};


