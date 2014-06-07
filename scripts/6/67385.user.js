// ==UserScript==
// @name           Neopets Sidebar Quicklinks
// @namespace      http://www.mathemaniac.org
// @include        http://www.neopets.com/*
// @include        http://neopets.com/*
// ==/UserScript==

// Thanks to PinkPT.com for the quicklinks. :)

var quicklinks = new Array(
	['Easy Neopoints','http://www.neopets.com/~pheophilusllicorne'],
	['Jogos Novos','http://www.neopets.com/~MY_first_Little_Pony'],
	['Guia NQ 2','http://www.neopets.com/~Migoblu'],
	['NQ 2','http://www.neopets.com/games/nq2/nq2.phtml'],
	['Mapas Neoquest','http://www.idnq-guide.com/index.php?page=maps'],
	['Guia Battledome','http://www.neopets.com/~bleu2529'],
	['Comida dos Kados','http://www.neopets.com/~Phil747'],
	['Guia de Avatares','http://www.freewebs.com/bluewingsoul/'],
	['Ajuda Busca de Fadas','http://www.neopets.com/~Faerie_Quests_Help'],
	['Reset Night Scores','http://www.neopets.com/~Reset_Night_Scores'],
	['Lista de Coconut','http://www.neopets.com/~Wicked4862'],
	['Lista de IQ','http://www.neopets.com/~Raciye'],
	['Neopia','http://neopia.com.br/index.php'],
	['Lista de Draik','http://www.neopets.com/~Moegby'],
	['Sponsors','http://neosponsors.blogspot.com/2009/10/1-click-1-grupo.html'],
	['Mystery Pic Answers','http://darkztar.com/forum/forumdisplay.php?155-Mystery-Pic-Answers'],
	['Lista Greasemonkey','http://www.hiddenbelow.com/topic.asp?TOPIC_ID=2057'],
	['Lista Greasemonkey 2','http://www.youisgamer.com/index.php?topic=43.0']
		
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