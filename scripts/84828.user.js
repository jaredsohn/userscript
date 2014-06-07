// ==UserScript==
// @name           Neopets Paddys Quicklinks
// @include        http://www.neopets.com/*
// @include        http://neopets.com/*
// ==/UserScript==


var  quicklinks = new Array(
	['Advents Kalender','http://neopets.com/winter/adventcalendar.phtml'],
	['Arbeitsamt des Feenlandes ','http://www.neopets.com/faerieland/employ/employment.phtml'],
	['Altador Plot Daily','http://www.neopets.com/altador/council.phtml'],
	['Bank ','http://www.neopets.com/bank.phtml'],
	['Das Blaue Grundo','http://www.neopets.com/faerieland/tdmbgpop.phtml'],
        ['Der  Gebrauchtladen','http://www.neopets.com/thriftshoppe/index.phtml'],
	['Der Marktplatz','http://www.neopets.com/market.phtml?type=till'],
        ['Freebies Für Dich! ','http://www.neopets.com/freebies/index.phtml'],
        ['Neopet-Zentrale   ','http://www.neopets.com/petcentral.phtml'],
	['Verlassene Grabmal','http://www.neopets.com/worlds/geraptiku/tomb.phtml'],
	['Faerie Crossword','http://www.neopets.com/games/crossword/index.phtml'],
	['Der Frucht-O-Mat','http://www.neopets.com/desert/fruitmachine.phtml'],
	['Riesen Wackelpudding','http://www.neopets.com/jelly/jelly.phtml'],
	['Kacheek-Suche','http://www.neopets.com/games/hidenseek.phtml'],
	['Heilquellen','http://www.neopets.com/faerieland/springs.phtml'],
	['Lunar Temple','http://www.neopets.com/shenkuu/lunar/?show=puzzle'],
	['Magmateich','http://www.neopets.com/magma/pool.phtml'],
	['Rate das Kürbisgewicht!','http://www.neopets.com/medieval/guessmarrow.phtml'],
	['Meteor-Absturzstelle 725-XZ','http://www.neopets.com/moon/meteor.phtml'],
	['Der Geldbaum','http://www.neopets.com/donations.phtml'],
	['Mysteriöse Symol-Loch','http://www.neopets.com/medieval/symolhole.phtml'],
	['Obsidianbruch','http://www.neopets.com/magma/quarry.phtml'],
	['Riesen-Omelette','http://www.neopets.com/prehistoric/omelette.phtml'],
	['Petpet Park','http://www.neopets.com/petpetpark/daily.phtml'],
	['Qasalanische Ausstoßkiste','http://www.neopets.com/games/play.phtml?game_id=905'],
	['Die Meridell Müllhalde','http://www.neopets.com/medieval/rubbishdump.phtml'],
	['Coltzans Schrein','http://www.neopets.com/desert/shrine.phtml'],
	['Der Snowager','http://www.neopets.com/winter/snowager.phtml'],
	['Die Suppenküche','http://www.neopets.com/soupkitchen.phtml'],
	['Tombola','http://www.neopets.com/island/tombola.phtml'],
	['Turmaculus','http://neopets.com/medieval/turmaculus.phtml'],
	['Rad der Spannung','http://www.neopets.com/faerieland/wheel.phtml'],
	['Rad der Weisheit','http://www.neopets.com/medieval/knowledge.phtml'],
	['Das Rad der Monotonie','http://www.neopets.com/prehistoric/monotony/monotony.phtml'],
	['Das Rad des Unglücks!','http://www.neopets.com/halloween/wheel/index.phtml?sc9ejf2=30378'],
	['Das Rad der Mittelmäßigkeit','http://www.neopets.com/prehistoric/mediocrity.phtml'],
	['Unterwasser Angeln','http://www.neopets.com/water/fishing.phtml'],
        ['Neoheim','http://www.neopets.com/neohome/main/']
        
);

var nfbox = document.evaluate('//div[contains(@class,"sidebarModule") and descendant::a[contains(@href,"neofriends")]]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

if (nfbox) {
	var qlbox = document.createElement('div');
	qlbox.className = 'sidebarModule';
        var qlboxtable = document.createElement('table');
        qlboxtable.cellpadding = 1;
	qlboxtable.cellspacing = 1;
	qlboxtable.border = 0;
	qlboxtable.className = 'sidebarTable';
	qlboxtable.setAttribute('width',165);
	var headertr = document.createElement('tr');
	var headertd = document.createElement('td');
	headertd.className = 'sidebarHeader medText';
	headertd.appendChild(document.createTextNode('Die Wichtigsten Links'));
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
