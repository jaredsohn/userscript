// ==UserScript==
// @name           Neopets: Visitas Diarias
// @namespace      macca8
// @description    En la barra lateral (debajo de neoamigos) encontraras los links de las visitas diarias, sin que tengas que entrarla a otra web.
// @include        http://neopets.com*

// @include        http://www.neopets.com*
// ==/UserScript==


var quicklinks = new Array(
	['The Movie Central','http://www.neopets.com/moviecentral/index.phtml'],
	['Tortilla gigante','http://www.neopets.com/prehistoric/omelette.phtml'],
	['Gelatina Gigante','http://www.neopets.com/jelly/jelly.phtml'],
	['.'],
        ['EPMDGADDLP','http://www.neopets.com/faerieland/tdmbgpop.phtml'],
	['El Santuario de Coltzan','http://www.neopets.com/desert/shrine.phtml'],
	['Maquina Expulsadora','http://ncmall.neopets.com/mall/shop.phtml?page=giveaway'],
	['Meteorito de Kreludor','http://www.neopets.com/moon/meteor.phtml'],
	['Pesca Submarina','http://www.neopets.com/water/fishing.phtml'],
	['Prueba tu fuerza','http://www.neopets.com/halloween/strtest/index.phtml'],
	['Shop Of Offers','http://www.neopets.com/shop_of_offers.phtml?slorg_payout=yes'],
	['Tesoro del Pawkeet negro','http://www.neopets.com/pirates/buriedtreasure/index.phtml'],
	['Tombola','http://www.neopets.com/island/tombola.phtml'],
	['Tumba abandonada','http://www.neopets.com/worlds/geraptiku/tomb.phtml'],
	['Weltrude ToyChest','http://www.neopets.com/petpetpark/daily.phtml'],
	['Playa Olvidada','http://www.neopets.com/pirates/forgottenshore.phtml'],
	['Manejo de anclas','http://www.neopets.com/pirates/anchormanagement.phtml'],
	['Las Cuevas de Hadas','http://www.neopets.com/faerieland/caverns/index.phtml'],
	['Pesca manzanas','http://www.neopets.com/halloween/applebobbing.phtml'],
	['Agujero misterioso de Symol','http://www.neopets.com/medieval/symolhole.phtml'],
	['Snowager','http://www.neopets.com/winter/snowager.phtml'],
	['Grumpy Old King','http://www.neopets.com/medieval/grumpyking.phtml'],
	['Wise Old King','http://www.neopets.com/medieval/wiseking.phtml'],
	['Templo de la Luna','http://www.neopets.com/shenkuu/lunar/'],
	['Turmaculus','http://www.neopets.com/medieval/turmaculus.phtml'],
	['Manantiales Curativos','http://www.neopets.com/faerieland/springs.phtml'],
        ['Camara del Consejo','http://www.neopets.com/altador/council.phtml'],
        ['Banco','http://www.neopets.com/bank.phtml'], 
        ['.'],
        ['El Laboratorio','http://www.neopets.com/lab.phtml'],
	['El Laboratorio de Petpets','http://www.neopets.com/petpetlab.phtml'],
	['.'],
        ['La Maquina de Fruta','http://www.neopets.com/desert/fruitmachine.phtml'],
	['La Rueda de la Emocion','http://www.neopets.com/faerieland/wheel.phtml'],
	['La Rueda de la Extravagancia','http://www.neopets.com/desert/extravagance.phtml'],
	['La Rueda de la Mediocridad','http://www.neopets.com/prehistoric/mediocrity.phtml'],
	['La Rueda de la Desgracia','http://www.neopets.com/halloween/wheel/index.phtml'],
	['La Rueda de la Sabiduria','http://www.neopets.com/medieval/knowledge.phtml'],
	['La Rueda de la Monotonia','http://www.neopets.com/prehistoric/monotony/monotony.phtml'],
        ['Wheel of Slime','http://www.neopets.com/games/play.phtml?game_id=983'],
        ['.'],
        ['Tarjetas Rasca y Gana del Parque de Atracciones Abandonado','http://www.neopets.com/halloween/scratch.phtml'],
	['Tarjetas Rasca y Gana de las Cuevas de Hielo','http://www.neopets.com/winter/kiosk.phtml'],
        ['Tarjetas Rasca y Gana del Desierto Perdido','http://www.neopets.com/desert/sc/kiosk.phtml'],
        ['.'],
	['El Arbol del Cerebro','http://www.neopets.com/halloween/braintree.phtml'],
	['Esophagor','http://www.neopets.com/halloween/esophagor.phtml'],
	['La Torre de la Bruja','http://www.neopets.com/halloween/witchtower.phtml'],
	['El Claro de Illusen','http://www.neopets.com/medieval/earthfaerie.phtml'],
	['El Acantilado de Jhudora','http://www.neopets.com/faerieland/darkfaerie.phtml'],
	['La Busqueda del Hada de la Nieve','http://www.neopets.com/winter/snowfaerie.phtml'],
        ['La Cocina de la Isla del Misterio','http://www.neopets.com/island/kitchen.phtml']
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
	headertd.appendChild(document.createTextNode('Visitas Diarias'));
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