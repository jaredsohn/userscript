// ==UserScript==
// @name		  OGame Recicle
// @namespace	 OGame Recicle
// @description   UserScript for send the recycler from "Galaxy". Various of the Commander's function, with which the recycler come sended automatically. (tested in http://www.ogame.it/ and tested also with the reduced galaxy option of FoxGame Extension - not tested with commander)
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
	oggetto += ']/th[2]/a/img';
	element = document.evaluate(oggetto, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	if (element) {
		aa=5;
		xx=17;
	};
};

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
		link = "flotten1.php?session=" + session + "&galaxy=" + galaxy + "&system=" + system + "&planet=" + planet + "&planettype=2&target_mission=8";
		element.href = link;
	};
};

//ogamerecicle.user.js

