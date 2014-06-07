// ==UserScript==
// @name           Neopets Dailies v 1.0.1
// @description    Easy to use Neopets Sidebar for dailies!
// @include        http://neopets.com*
// @include        http://www.neopets.com*
// ==/UserScript==


var quicklinks = new Array(
	[' '],
	['<><><><><><><>'],
	['--Any Time--'],
	['<><><><><><><>'],
	[' '],
	['Bank','http://www.neopets.com/bank.phtml'],
	['Inventory','http://www.neopets.com/objects.phtml?type=inventory'],
	['Deposit Box','http://www.neopets.com/safetydeposit.phtml'],
	['Money Tree','http://www.neopets.com/donations.phtml'],
	['Shop Wizard','http://www.neopets.com/market.phtml?type=wizard'],
	['Battledome','http://www.neopets.com/dome/'],
	['Shop Till','http://www.neopets.com/market.phtml?type=till'],
	['Key Quest','http://www.neopets.com/keyquest/redeem.phtml'],
	['Igloo Garage Sale','http://www.neopets.com/winter/igloo.phtml'],
	['Trading Post','http://www.neopets.com/island/tradingpost.phtml'],
	['Auction','http://www.neopets.com/auctions.phtml'],
	['Stocks','http://www.neopets.com/stockmarket.phtml?type=list&bargain=true'],
	
	[' '],
	['<><><><><><><>'],
	['--12 Hr+--'],
	['<><><><><><><>'],
	[' '],
	['Snowager','http://www.neopets.com/winter/snowager.phtml'],
	['Kreludor Meteor','http://www.neopets.com/moon/meteor.phtml'],
	['Adver-Video','http://www.neopets.com/games/game.phtml?game_id=1270'],
	['Fishing','http://www.neopets.com/water/fishing.phtml'],
	['Hide/Seek','http://www.neopets.com/games/hidenseek.phtml'],
	['Qasalan Expellibox','http://www.neopets.com/games/giveaway/giveaway_game.phtml'],
	['Wise Old King','http://www.neopets.com/medieval/wiseking.phtml'],
	['Magical Grundo Plushie','http://www.neopets.com/faerieland/tdmbgpop.phtml'],
	['Symol Hole','http://www.neopets.com/medieval/symolhole.phtml'],
	['Turmaculus','http://neopets.com/medieval/turmaculus.phtml'],
	['Coltzans Shrine','http://www.neopets.com/desert/shrine.phtml'],
	['Deserted Tomb','http://www.neopets.com/worlds/geraptiku/tomb.phtml'],
    ['Qasalan Expellibox','http://www.neopets.com/games/play.phtml?game_id=905'],
    ['Healing Springs','http://www.neopets.com/faerieland/springs.phtml'],
	
	[' '],
	['<><><><><><><>'],
	['--Dailies--'],
	['<><><><><><><>'],
	[' '],
	['Giant Jelly','http://www.neopets.com/jelly/jelly.phtml'],
	['Giant Omelette','http://www.neopets.com/prehistoric/omelette.phtml'],
	['Bank Interest','http://www.neopets.com/bank.phtml'],
	['Altador Prizes','http://www.neopets.com/altador/council.phtml'],
	['Shop of Offers','http://www.neopets.com/shop_of_offers.phtml?slorg_payout=yes'],
	['Petpet Park','http://www.neopets.com/petpetpark/daily.phtml'],
	['Monthly Freebie','http://www.neopets.com/freebies/index.phtml'],
	['Movie Central','http://www.neopets.com/moviecentral/index.phtml'],
	['Obsidian Quarry','http://www.neopets.com/magma/quarry.phtml'],
	['Apple Bobbing','http://www.neopets.com/halloween/applebobbing.phtml?'],
	['Mysterious Negg Cave','http://www.neopets.com/pirates/anchormanagement.phtml'],
	['Anchor Management','http://www.neopets.com/pirates/anchormanagement.phtml'],
	['Tombola','http://www.neopets.com/island/tombola.phtml'],
	['Marrow Guess','http://www.neopets.com/medieval/guessmarrow.phtml'],
	['Wise King','http://www.neopets.com/medieval/wiseking.phtml'],
	['Grumpy King','http://www.neopets.com/medieval/grumpyking.phtml'],
	['Deserted Tomb','http://www.neopets.com/worlds/geraptiku/tomb.phtml'],
	['Fruit Machine','http://www.neopets.com/desert/fruitmachine.phtml'],
	['Deadly Dice','http://www.neopets.com/worlds/deadlydice.phtml'],
	['tdmbgpop','http://www.neopets.com/faerieland/tdmbgpop.phtml'],
	['Lunar Puzzle','http://www.neopets.com/shenkuu/lunar/'],
	['Potato Counter','http://www.neopets.com/medieval/potatocounter.phtml'],
	['Forgotten Shore','http://www.neopets.com/medieval/potatocounter.phtml'],
	['Lab Ray','http://www.neopets.com/lab2.phtml'],
	
	[' '],
	['<><><><><><><>'],
	['--Wheels--'],
	['<><><><><><><>'],
	[' '],
	['Mediocrity','http://www.neopets.com/prehistoric/mediocrity.phtml'],
	['Excitement','http://www.neopets.com/faerieland/wheel.phtml'],
	['Misfortune','http://www.neopets.com/halloween/wheel/index.phtml'],
	['Knowledge','http://www.neopets.com/medieval/knowledge.phtml'],
	['Monotony','http://www.neopets.com/prehistoric/monotony/monotony.phtml'],
	['Slime','http://www.neopets.com/games/game.phtml?game_id=983'],
	['Extravagance','http://www.neopets.com/desert/extravagance.phtml'],
	
	[' '],
	['<><><><><><><>'],
	['--Scratchcards--'],
	['<><><><><><><>'],
	[' '],
	['Winter Kiosk','http://www.neopets.com/winter/kiosk.phtml'],
	['Spooky Kiosk','http://www.neopets.com/halloween/scratch.phtml'],
	['Desert Kiosk','http://www.neopets.com/desert/sc/kiosk.phtml'],
	
	[' '],
	['<><><><><><><>'],
	['--Luck+Chance--'],
	['<><><><><><><>'],
	[' '],
	['Cliffhanger','http://www.neopets.com/games/cliffhanger/cliffhanger.phtml'],
	['Scorchy SLots','http://www.neopets.com/games/slots.phtml'],
	['Dice a Roo','http://www.neopets.com/games/dicearoo.phtml'],
	['Kiss the Mortog','http://www.neopets.com/medieval/kissthemortog.phtml'],
	['Double or Nothing','http://www.neopets.com/medieval/doubleornothing.phtml'],
	['Pyramids','http://www.neopets.com/games/pyramids/index.phtml'],
	
	[' '],
	['<><><><><><><>'],
	['--References--'],
	['<><><><><><><>'],
	[' '],
	['Equipment','http://battlepedia.thedailyneopets.com/'],
	['Prices','http://items.jellyneo.net/'],
	['Dailyneopets','http://www.thedailyneopets.com/dailies/'],
	['Jellyneo','http://www.jellyneo.net/'],
	['Sunnyneo','http://www.sunnyneo.com/'],
	[' ']
	
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
	headertd.appendChild(document.createTextNode('--------Dailies--------'));
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