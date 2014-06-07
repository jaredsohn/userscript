// ==UserScript==
// @name          OGame Recycler, Planet and Moon Spy
// @description   OGame - Directly send recycler, spy a planet or moon from galaxy. You can set # of ships.
// @include       http://*/game/galaxy.php?session=*
// @exclude	   
// ==/UserScript==    


// Planet Spy
element = document.evaluate('/html/body/center/form/table/tbody/tr[1]/td[1]/table/tbody/tr[2]/td[2]/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
galaxy = element.value;

element = document.evaluate('/html/body/center/form/table/tbody/tr[1]/td[2]/table/tbody/tr[2]/td[2]/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
system = element.value;

element = document.evaluate('/html/body/center/form/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
session = element.value;

xx=2;
aa=2;
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
		link = "flotten1.php?session=" + session + "&galaxy=" + galaxy + "&system=" + system + "&planet=" + planet + "&planettype=1&target_mission=6";
		element.href = link;
	};
	
};

// Moon Spy
aamoon=4;
xxmoon=2;
while (xxmoon != 17){
	xxmoon++;
	oggetto = '/html/body/center/table/tbody/tr[';
	oggetto += xxmoon;
	oggetto += ']/th['
	oggetto += aamoon;
	oggetto += ']/a';
	element = document.evaluate(oggetto, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	if (element) {
		planet = xxmoon - 2;
		link = "flotten1.php?session=" + session + "&galaxy=" + galaxy + "&system=" + system + "&planet=" + planet + "&planettype=3&target_mission=6";
		element.href = link;
	};
};


// Recycler
aarecycler=4;
xxrecycler=2;
while (xxrecycler != 17){
	xxrecycler++;
	oggetto = '/html/body/center/table/tbody/tr[';
	oggetto += xxrecycler;
	oggetto += ']/th[2]/a/img';
	element = document.evaluate(oggetto, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	if (element) {
		aarecycler=5;
		xxrecycler=17;
	};
};

xxrecycler=2;
while (xxrecycler != 17){
	xxrecycler++;
	oggetto = '/html/body/center/table/tbody/tr[';
	oggetto += xxrecycler;
	oggetto += ']/th['
	oggetto += aarecycler;
	oggetto += ']/a';
	element = document.evaluate(oggetto, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	if (element) {
		planet = xxrecycler - 2;
		link = "flotten1.php?session=" + session + "&galaxy=" + galaxy + "&system=" + system + "&planet=" + planet + "&planettype=2&target_mission=8";
		element.href = link;
	};
};


