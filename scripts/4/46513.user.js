// ==UserScript==
// @name           Pound_Release Pets
// @namespace      http://www.mathemaniac.org
// @include        http://www.neopets.com/*
// @include        http://neopets.com/*
// ==/UserScript==

// Thanks to PinkPT.com for the quicklinks. :)

var quicklinks = new Array(

	['DONATION SHOP','http://www.neopets.com/browseshop.phtml?owner=holylwdis'],
	['JetGirl156','http://www.neopets.com/pound/adopt.phtml?search=JetGirl156'],
	['Aryila','http://www.neopets.com/pound/adopt.phtml?search=Aryila'],
	['trelmenia','http://www.neopets.com/pound/adopt.phtml?search=trelmenia'],
	['Muhammah','http://www.neopets.com/pound/adopt.phtml?search=Muhammah'],
	['Raphs','http://www.neopets.com/pound/adopt.phtml?search=Raphs'],
	['Myinalei','http://www.neopets.com/pound/adopt.phtml?search=Myinalei'],
	['__Princy__','http://www.neopets.com/pound/adopt.phtml?search=__Princy__'],
	['Zanichia','http://www.neopets.com/pound/adopt.phtml?search=Zanichia'],
	['reindling','http://www.neopets.com/pound/adopt.phtml?search=reindling'],
	['Cynal','http://www.neopets.com/pound/adopt.phtml?search=Cynal'],
	['nellecutie','http://www.neopets.com/pound/adopt.phtml?search=nellecutie'],
	['Andy4372','http://www.neopets.com/pound/adopt.phtml?search=Andy4372'],
	['Tallyannae','http://www.neopets.com/pound/adopt.phtml?search=Tallyannae'],
	['Sarefiniah','http://www.neopets.com/pound/adopt.phtml?search=Sarefiniah'],
	['Siyuaa','http://www.neopets.com/pound/adopt.phtml?search=Siyuaa'],
	['Prissy_Baby_Princess','http://www.neopets.com/pound/adopt.phtml?search=Prissy_Baby_Princess'],
	['shriny550','http://www.neopets.com/pound/adopt.phtml?search=shriny550'],


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
}