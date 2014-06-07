// ==UserScript==
// @name           Shop Quick-Links
// @namespace     daniel houtsma
// @include        http://www.neopets.com/*
// @include        http://neopets.com/*
// ==/UserScript==

var quicklinks = new Array(
	['Food Shop','http://www.neopets.com/objects.phtml?type=shop&obj_type=1'],
	['Kauvara's Magic Shop','http://www.neopets.com/objects.phtml?type=shop&obj_type=2'],
	['Unis Clothing Shop','http://www.neopets.com/objects.phtml?type=shop&obj_type=4'],
	['Magical Bookshop','http://www.neopets.com/objects.phtml?type=shop&obj_type=7'],
	['Booktastic Books','http://www.neopets.com/objects.phtml?type=shop&obj_type=70'],
	['Chocolate Factory','http://www.neopets.com/objects.phtml?type=shop&obj_type=14'],
	['Defence Magic','http://www.neopets.com/objects.phtml?type=shop&obj_type=10'],	
	['Faerieland Petpets','http://www.neopets.com/objects.phtml?type=shop&obj_type=40'],
	['Hubert's Hot Dogs','http://www.neopets.com/objects.phtml?type=shop&obj_type=46'],
	['Legendary Petpets','http://www.neopets.com/objects.phtml?type=shop&obj_type=97'],
	['Magical Marvels','http://www.neopets.com/objects.phtml?type=shop&obj_type=96'],
	['Merifoods','http://www.neopets.com/objects.phtml?type=shop&obj_type=56'],
	['The Neopian Petpet Shop','http://www.neopets.com/objects.phtml?type=shop&obj_type=25'],
	['Neopian Post Office','http://www.neopets.com/objects.phtml?type=shop&obj_type=58'],
	['Peopatra's Petpets','http://www.neopets.com/objects.phtml?type=shop&obj_type=50'],
	['Plushie Palace','http://www.neopets.com/objects.phtml?type=shop&obj_type=98'],
	['The Robo-Petpet Shop','http://www.neopets.com/objects.phtml?type=shop&obj_type=26'],
	['Spooky Food','http://www.neopets.com/objects.phtml?type=shop&obj_type=30'],
	['Super Happy Icy Fun Snow Shop','http://www.neopets.com/objects.phtml?type=shop&obj_type=37'],
	['The Bakery','http://www.neopets.com/objects.phtml?type=shop&obj_type=15'],
	['Neopian Pharmacy','http://www.neopets.com/objects.phtml?type=shop&obj_type=13'],
	['Tyrannian Petpets','http://www.neopets.com/objects.phtml?type=shop&obj_type=44'],
	['Usukiland','http://www.neopets.com/objects.phtml?type=shop&obj_type=48'],
	['Wintery Petpets','http://www.neopets.com/objects.phtml?type=shop&obj_type=61'],
	['Ye Olde Petpets','http://www.neopets.com/objects.phtml?type=shop&obj_type=57'],
);	

var nfbox = document.evaluate('//div[contains(@class,"sidebarModule") and descendant::a[contains(@href,"neofriends")]]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

if (nfbox) {
	var qlbox = document.createElement('div');
	qlbox.className = 'sidebarModule';
	var qlboxtable = document.createElement('table');
	qlboxtable.cellpadding = 2;
	qlboxtable.cellspacing = 0;
	qlboxtable.border = 0;
	qlboxtable.className = 'sidebarTable';
	qlboxtable.setAttribute('width',158);
	var headertr = document.createElement('tr');
	var headertd = document.createElement('td');
	headertd.className = 'sidebarHeader medText';
	headertd.appendChild(document.createTextNode('Quicklinks'));
	headertr.appendChild(headertd);
	qlboxtable.appendChild(headertr);
	var bodytr = document.createElement('tr');
	var bodytd = document.createElement('td');
	bodytd.className = 'activePet sf';
	for each (var qlink in quicklinks) {
		var linka = document.createElement('a');
		linka.setAttribute('style','font-weight: bold');
		linka.href = qlink[1];
		linka.appendChild(document.createTextNode(qlink[0]));
		bodytd.appendChild(linka);
		bodytd.appendChild(document.createElement('br'));
	}
	bodytr.appendChild(bodytd);
	qlboxtable.appendChild(bodytr);
	qlbox.appendChild(qlboxtable);
	
	nfbox.parentNode.insertBefore(qlbox,nfbox.nextSibling);


