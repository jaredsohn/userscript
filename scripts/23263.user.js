// ==UserScript==
// @author wipeer
// @name Darkpirates Map
// @description - Zobrazí jména sektorů na mapě
// @include       http://s*.darkpirates.*
// @include       http://s*.darkpirates.cz/*
// @include       http://s*.ba.darkpirates.org/*
// ==/UserScript==
//
// --------------------------------------------------------------------
//

// Locale
/*
Space Singularity
Viking Anomaly
SandStorm Nebula
Atlanticans
Heero Ma Tahh
Carminians
Avalon Sector
Ancient Alien Remmants
Dwarf Sun
Rubine Nebula
Azure Star Cluster
Lotus Flairs
Gargantos Asteroid Field
Mammoth Nebula
Djem Al Dhir
Cobalt Rings
Crystalin Planet
Giant Crystals Djefhar
Limes Alter
Hades System
Ancient Battlefield
Tolgay Asteroid Fields
Terill Tkarr
Green Hell
	
Legenda:

Normální
Laboratoř
Obchod
Hlavní svět
	
Minerály

Megatan
Quarell
Florisar
Warium
	
Crysolit
Niciltar
Hypolium
Einsteinium

Železo
Helenium
Phosarit
Melanit
*/

// Hledani
var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;			// Constant that gives back the first element by XPath
var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;		// Constant that gives back a list of elements by XPath
var XPIter  = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;		// Constant that it gives back a iterator of elements by XPath

/**
 * It makes a search in the document using XPath
 * 
 * Params:
 *	xpath Expression of search
 *	xpres Type of search
 *
 * Returns:
 *	Reference to an element result of XPath
 */
function find(xpath, xpres){
	var ret = document.evaluate(xpath, document, null, xpres, null);
	return  xpres == XPFirst ? ret.singleNodeValue : ret;
}


// Adresa
var url = window.location.href;

// promene, cil a priprava

var target = find("//div[@id='logo']", XPFirst);

var map_caption = document.createElement("div");
var map_legend = document.createElement("div");
var map_minerals = document.createElement("div");
var map_nominerals = document.createElement("div");

att = document.createAttribute('style');
att.value = 'position: relative;';

map_caption.setAttributeNode(att.cloneNode(true));
map_legend.setAttributeNode(att.cloneNode(true));
map_minerals.setAttributeNode(att.cloneNode(true));
map_nominerals.setAttributeNode(att.cloneNode(true));

z = ' z-index: 3;';
pr = 'position: relative; ';
pa = 'position: absolute; ';

fbila = ' color: #8CA4AE;';
fmodra = ' color: #1B99DF;';
fzelena = ' color: #1BDF23;';
ffialova = ' color: #9E1BDF; font-weight: bold;';
fcervena = ' color: #AE0808;';

b = ' font-weight: bold;';

//poz = 'background-color: gray; ';
poz = 'background-color: transparent; ';

imga = ' width="16" heigth="16" border="0" align="top"';

// mapa
if(url.match('mod=map')) {
	caption = '<p style="'+poz+pa+'width: 100px; left: 189px; top: 400px;'+z+fbila+'">Space Singularity</p>';
	caption += '<p style="'+poz+pa+'width: 90px; left: 269px; top: 326px;'+z+fmodra+'">Viking Anomaly</p>';
	caption += '<p style="'+poz+pa+'width: 110px; left: 283px; top: 428px;'+z+fzelena+'">SandStorm Nebula</p>';
	caption += '<p style="'+poz+pa+'width: 70px; left: 167px; top: 290px;'+z+ffialova+'">Atlanticans</p>';
	caption += '<p style="'+poz+pa+'width: 90px; left: 233px; top: 216px;'+z+fbila+'">Heero Ma Tahh</p>';
	caption += '<p style="'+poz+pa+'width: 70px; left: 167px; top: 636px;'+z+ffialova+'">Carminians</p>';
	caption += '<p style="'+poz+pa+'width: 80px; left: 199px; top: 525px;'+z+fzelena+'">Avalon Sector</p>';
	caption += '<p style="'+poz+pa+'width: 140px; left: 63px; top: 363px;'+z+fbila+'">Ancient Alien Remmants</p>';
	caption += '<p style="'+poz+pa+'width: 60px; left: 103px; top: 562px;'+z+fbila+'">Dwarf Sun</p>';
	caption += '<p style="'+poz+pa+'width: 90px; left: 233px; top: 710px;'+z+fbila+'">Rubine Nebula</p>';
	caption += '<p style="'+poz+pa+'width: 110px; left: 261px; top: 599px;'+z+fbila+'">Azure Star Cluster</p>';
	caption += '<p style="'+poz+pa+'width: 70px; left: 305px; top: 497px;'+z+fmodra+'">Lotus Flairs</p>';
	caption += '<p style="'+poz+pa+'width: 140px; left: 445px; top: 215px;'+z+fbila+'">Gargantos Asteroid Field</p>';
	caption += '<p style="'+poz+pa+'width: 100px; left: 429px; top: 326px;'+z+fbila+'">Mammoth Nebula</p>';
	caption += '<p style="'+poz+pa+'width: 80px; left: 551px; top: 289px;'+z+ffialova+'">Djem Al Dhir</p>';
	caption += '<p style="'+poz+pa+'width: 80px; left: 623px; top: 364px;'+z+fbila+'">Cobalt Rings</p>';
	caption += '<p style="'+poz+pa+'width: 100px; left: 509px; top: 401px;'+z+fmodra+'">Crystalin Planet</p>';
	caption += '<p style="'+poz+pa+'width: 125px; left: 389px; top: 428px;'+z+fbila+'">Giant Crystals Djefhar</p>';
	caption += '<p style="'+poz+pa+'width: 70px; left: 419px; top: 497px;'+z+fzelena+'">Limes Alter</p>';
	caption += '<p style="'+poz+pa+'width: 90px; left: 511px; top: 526px;'+z+fbila+'">Hades System</p>';
	caption += '<p style="'+poz+pa+'width: 110px; left: 611px; top: 562px;'+z+fbila+'">Ancient Battlefield</p>';
	caption += '<p style="'+poz+pa+'width: 130px; left: 415px; top: 599px;'+z+fmodra+'">Tolgay Asteroid Fields</p>';
	caption += '<p style="'+poz+pa+'width: 70px; left: 557px; top: 637px;'+z+ffialova+'">Terill Tkarr</p>';
	caption += '<p style="'+poz+pa+'width: 70px; left: 483px; top: 710px;'+z+fbila+'">Green Hell</p>';
	
	legend = '<p style="'+poz+pa+'width: 100px; left: 360px; top: 700px;'+z+fbila+'">Legenda:</p>';
	legend += '<p style="'+poz+pa+'width: 100px; left: 365px; top: 715px;'+z+fbila+'">Normální</p>';
	legend += '<p style="'+poz+pa+'width: 100px; left: 365px; top: 730px;'+z+fmodra+'">Laboratoř</p>';
	legend += '<p style="'+poz+pa+'width: 100px; left: 365px; top: 745px;'+z+fzelena+'">Obchod</p>';
	legend += '<p style="'+poz+pa+'width: 100px; left: 365px; top: 760px;'+z+ffialova+'">Hlavní svět</p>';
	
	minerals = '<span style="'+poz+pa+'width: 70px; left: 35px; top: 460px;'+z+fbila+'">Minerály:</span>';
	minerals += '<span style="'+poz+pa+'width: 140px; left: 40px; top: 475px;'+z+'"><img src="img/item/6_8k.gif"'+imga+'><span style="'+pr+fmodra+b+'">Megatan</span> <span style="'+pr+fbila+' left: 37px;">4 995</span></span>';
	minerals += '<span style="'+poz+pa+'width: 140px; left: 40px; top: 490px;'+z+'"><img src="img/item/6_9k.gif"'+imga+'><span style="'+pr+fmodra+b+'">Quarell</span> <span style="'+pr+fbila+' left: 45px;">6 300</span></span>';
	minerals += '<span style="'+poz+pa+'width: 140px; left: 40px; top: 505px;'+z+'"><img src="img/item/6_10k.gif"'+imga+'><span style="'+pr+fmodra+b+'">Florisar</span> <span style="'+pr+fbila+' left: 43px;">8 167</span></span>';
	minerals += '<span style="'+poz+pa+'width: 140px; left: 40px; top: 520px;'+z+'"><img src="img/item/6_11k.gif"'+imga+'><span style="'+pr+fmodra+b+'">Warium</span> <span style="'+pr+fbila+' left: 41px;">3 132</span></span>';
	minerals += '<span style="'+poz+pa+'width: 70px; left: 605px; top: 460px;'+z+fbila+'">Minerály:</span>';
	minerals += '<span style="'+poz+pa+'width: 140px; left: 610px; top: 475px;'+z+'"><img src="img/item/6_12k.gif"'+imga+'><span style="'+pr+fmodra+b+'">Crysolit</span> <span style="'+pr+fbila+' left: 36px;">19 863</span></span>';
	minerals += '<span style="'+poz+pa+'width: 140px; left: 610px; top: 490px;'+z+'"><img src="img/item/6_13k.gif"'+imga+'><span style="'+pr+fmodra+b+'">Niciltar</span> <span style="'+pr+fbila+' left: 39px;">55 782</span></span>';
	minerals += '<span style="'+poz+pa+'width: 140px; left: 610px; top: 505px;'+z+'"><img src="img/item/6_14k.gif"'+imga+'><span style="'+pr+fmodra+b+'">Hypolium</span> <span style="'+pr+fbila+' left: 19px;">233 500</span></span>';
	minerals += '<span style="'+poz+pa+'width: 140px; left: 610px; top: 520px;'+z+'"><img src="img/item/6_15k.gif"'+imga+'><span style="'+pr+fmodra+b+'">Einsteinium</span> <span style="'+pr+fbila+' left: 6px;">650 000</span></span>';

	nominerals = '<span style="'+poz+pa+'width: 70px; left: 170px; top: 700px;'+z+'"><img src="img/item/6_1k.gif"'+imga+'><span style="'+pr+fcervena+'">Železo</span></span>';	
	nominerals += '<span style="'+poz+pa+'width: 70px; left: 555px; top: 700px;'+z+'"><img src="img/item/6_7k.gif"'+imga+'><span style="'+pr+fcervena+'">Helenium</span></span>';	
	nominerals += '<span style="'+poz+pa+'width: 70px; left: 170px; top: 353px;'+z+'"><img src="img/item/6_6k.gif"'+imga+'><span style="'+pr+fcervena+'">Phosarit</span></span>';	
	nominerals += '<span style="'+poz+pa+'width: 70px; left: 560px; top: 353px;'+z+'"><img src="img/item/6_5k.gif"'+imga+'><span style="'+pr+fcervena+'">Melanit</span></span>';	
	
	map_caption.innerHTML = caption;
	map_legend.innerHTML = legend;
	map_minerals.innerHTML = minerals;
	map_nominerals.innerHTML = nominerals;
	
	target.appendChild(map_caption);
	target.appendChild(map_legend);
	target.appendChild(map_minerals);
	target.appendChild(map_nominerals);
}