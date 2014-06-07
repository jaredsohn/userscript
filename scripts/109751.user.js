// ==UserScript==
// @name           Neopets: Dailies Quicklinks [REVISED]
// @include        http://neopets.com*
// @include        http://www.neopets.com*
// ==/UserScript==


var quicklinks = new Array(
	['Shop Stock','http://www.neopets.com/market.phtml?type=your'],
	['Quick Stock','http://www.neopets.com/quickstock.phtml'],
	['Shop Till','http://www.neopets.com/market.phtml?type=till'],
	['Inventory','http://www.neopets.com/objects.phtml?type=inventory'],
	['Bank','http://www.neopets.com/bank.phtml'],
	['Shop Wizard','http://www.neopets.com/market.phtml?type=wizard'],
	['My Stockmarket','http://www.neopets.com/stockmarket.phtml?type=portfolio'],
	['·'],
	['Featured Game','http://www.neopets.com/games/featuredgame/index.phtml?type=1'],
	['Adver-Video','http://www.neopets.com/games/videofeed/game1.phtml'],
	['Crowd Patrol','http://www.neopets.com/games/play.phtml?game_id=1245'],
	['Peelout','http://www.neopets.com/games/play.phtml?game_id=1290'],
	['Arm Wrestle','http://www.neopets.com/games/play.phtml?game_id=1299'],
	['Fast Spy','http://www.neopets.com/games/play.phtml?game_id=1328'],
	['Surfing Safari','http://www.neopets.com/games/play.phtml?game_id=1300'],
	['Strange Symphony','http://www.neopets.com/games/play.phtml?game_id=1331'],
	['Wheel of Slime','http://www.neopets.com/games/play.phtml?game_id=1169'],
	['Wizard 101','http://www.neopets.com/sponsors/wizard101/index.phtml'],
	['·'],
	['Wheel of Excitement','http://www.neopets.com/faerieland/wheel.phtml'],
	['Healing Springs','http://www.neopets.com/faerieland/springs.phtml'],
	['Daily Puzzle','http://www.neopets.com/petcentral.phtml'],
	['Faerie Crossword','http://www.neopets.com/games/crossword/index.phtml'],
	['Fruit Machine','http://www.neopets.com/desert/fruitmachine.phtml'],
	['Tombola','http://www.neopets.com/island/tombola.phtml'],
	['Giant Jelly','http://www.neopets.com/jelly/jelly.phtml'],
	['Omelette','http://www.neopets.com/prehistoric/omelette.phtml'],
	['Grumpy Old King','http://www.neopets.com/medieval/grumpyking.phtml'],
	['Wise Old King','http://www.neopets.com/medieval/wiseking.phtml'],
	['Magical Grundo Plushie','http://www.neopets.com/faerieland/tdmbgpop.phtml'],
	['Symol Hole','http://www.neopets.com/medieval/symolhole.phtml'],
	['Turmaculus','http://neopets.com/medieval/turmaculus.phtml'],
	['Coltzans Shrine','http://www.neopets.com/desert/shrine.phtml'],
	['Deserted Tomb','http://www.neopets.com/worlds/geraptiku/tomb.phtml'],
	['Qasalan Expellibox','http://www.neopets.com/games/play.phtml?game_id=905'],
	['Lunar Temple','http://www.neopets.com/shenkuu/lunar/?show=puzzle'],
	['Meteor Crash Site','http://www.neopets.com/moon/meteor.phtml'],
	['Shop Of Offers','http://www.neopets.com/shop_of_offers.phtml?slorg_payout=yes'],
	['Toy Box','http://www.neopets.com/petpetpark/daily.phtml'],
	['Potato Counter','http://www.neopets.com/medieval/potatocounter.phtml']
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
	headertd.appendChild(document.createTextNode('My Quicklinks'));
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