// ==UserScript==
// @name           Neopets Dailies Quicklinks
// @namespace      http://www.mathemaniac.org
// @include        http://www.neopets.com/*
// @include        http://neopets.com/*
// ==/UserScript==


var quicklinks = new Array(
	['Advent Calendar','http://neopets.com/winter/adventcalendar.phtml'],
	['Adver-Video','http://www.neopets.com/games/play.phtml?game_id=683'],
	['Altador Plot Daily','http://www.neopets.com/altador/council.phtml'],
	['Bank Interest','http://www.neopets.com/bank.phtml'],
	['Daily Puzzle','http://www.neopets.com/petcentral.phtml'],
	['Deserted Tomb','http://www.neopets.com/worlds/geraptiku/tomb.phtml'],
	['Faerie Crossword','http://www.neopets.com/games/crossword/index.phtml'],
	['Faerie Employment Agency','http://www.neopets.com/faerieland/employ/employment.phtml'],
	['Fruit Machine','http://www.neopets.com/desert/fruitmachine.phtml'],
	['Giant Jelly','http://www.neopets.com/jelly/jelly.phtml'],
	['Grumpy Old King','http://www.neopets.com/medieval/grumpyking.phtml'],
	['Hide N Seek','http://www.neopets.com/games/hidenseek.phtml'],
	['Healing Springs','http://www.neopets.com/faerieland/springs.phtml'],
	['Lunar Temple','http://www.neopets.com/shenkuu/lunar/?show=puzzle'],
	['Magical Grundo Plush','http://www.neopets.com/faerieland/tdmbgpop.phtml'],
	['Magma Pool','http://www.neopets.com/magma/pool.phtml'],
	['Marrow Guess','http://www.neopets.com/medieval/guessmarrow.phtml'],
	['Meteor Crash Site 725-XZ','http://www.neopets.com/moon/meteor.phtml'],
	['Money Tree','http://www.neopets.com/donations.phtml'],
	['Monthly Freebies','http://www.neopets.com/freebies/index.phtml'],
	['Movie Central','http://www.neopets.com/moviecentral/index.phtml'],
	['Mysterious Symol Hole','http://www.neopets.com/medieval/symolhole.phtml'],
	['Obsidian Quarry','http://www.neopets.com/magma/quarry.phtml'],
	['Omelette','http://www.neopets.com/prehistoric/omelette.phtml'],
	['Petpet Park','http://www.neopets.com/petpetpark/daily.phtml'],
	['Potato Counter','http://www.neopets.com/medieval/potatocounter.phtml'],
	['Qasalan Expellibox','http://www.neopets.com/games/play.phtml?game_id=905'],
	['Rubbish Dump','http://www.neopets.com/medieval/rubbishdump.phtml'],
	['Second-Hand Shoppe','http://www.neopets.com/thriftshoppe/index.phtml'],
	['Shop Of Offers','http://www.neopets.com/shop_of_offers.phtml?slorg_payout=yes'],
	['Shop Till','http://www.neopets.com/market.phtml?type=till'],
	['Shrine','http://www.neopets.com/desert/shrine.phtml'],
	['Six Flags','http://www.neopets.com/sponsors/sixflags/?sc9ejf2=54595'],
	['Snowager','http://www.neopets.com/winter/snowager.phtml'],
	['Soup Kitchen','http://www.neopets.com/soupkitchen.phtml'],
	['Tombola','http://www.neopets.com/island/tombola.phtml'],
	['Turmaculus','http://neopets.com/medieval/turmaculus.phtml'],
	['Wheel of Excitement','http://www.neopets.com/faerieland/wheel.phtml'],
	['Wheel of Knowledge','http://www.neopets.com/medieval/knowledge.phtml'],
	['Wheel of Slime','http://www.neopets.com/games/play.phtml?game_id=807'],
	['Wise Old King','http://www.neopets.com/medieval/wiseking.phtml'],
	['Underwater Fishing','http://www.neopets.com/water/fishing.phtml']
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
}