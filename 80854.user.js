// ==UserScript==
// @name           דוקטור צחוק מציג: איקרים גנרל אובר וויו
// @namespace      IkariamOverview
// @description    An Ikariam game script to gather information from player towns - גם בעברית
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/
// ==/UserScript==

/**
ABOUT:
» Ikariam General Overview v1.5
By: A. Maia F. (a.maia.ferreira[at]gmail.com)
Date: 3 June 08
Languages / working on servers:
	» (en) English (UK) (ikariam.org)
        » (il) Hebrew (il) (ikariam.co.il)
	» (us) English (US) (ikariam.com)
	» (pt) Portuguese (ikariam.com.pt)
	» (de) German (ikariam.de) [Thanks to t.b. - http://userscripts.org/users/29222]
	» (pl) Polish (ikariam.pl) [Thanks to sip3k - http://userscripts.org/users/53611]
	» (nl) Dutch (ikariam.nl) [Thanks to bogyi - http://userscripts.org/users/52238]
	» (dk) Danish (ikariam.dk) [Thanks to Trigger - http://userscripts.org/users/53662]
	» (es) Spanish (ikariam.es) [Thanks to Pyronhell - http://userscripts.org/users/52757]
	» (cz) Czech (ikariam.cz) [Thanks to who e-mailed me the language]
	» (it) Italiam (ikariam.it) [Thanks to Boydon]
	» (se) Swedish (ikariam.se) [Thanks to rEacT - http://userscripts.org/users/54856]
	
CHANGELOG:
	21/05/2008
	    * Version 1 released
	    * Minor bugfixes

	22/05/2008
	    * Added colors to full (and almost full) warehouses
	    * Added German language
	    * Added Polish language
	    * Added Dutch language
	    * Added Danish language

	23/05/2008
	    * Added Turkish language
	    * Minor bugfixes
		
	03/06/2008
	    * Bugfix: At Island view, towns were on top of the general overview window (Thanks to Pyronhell that submited the bugfix - http://userscripts.org/users/52757)	
	    * Bugfix: Production of island resources weren't working
	    * Added Spanish language
	    * Added Czech language		
	    * Added Italian language
	    * Added English (US) language		

	05/06/2008
	    * Added Swedish language	
		
WARNING:
	Using this script with the game is forbidden!
	I'm not responsible for banned accounts.
	
	Quoted from Ikariam Rules:
	
	"VII. Scripting

		* Using a program as interface between the player and his game is prohibited. Any other form of automatically generated information generated for a group of players advantage with malicious intentions is forbidden as well.

		This includes but is not limited to:
		* Bots
		* Macros
		* Automated island databases.

		Note: Only exceptions to this are programs that are expressly approved by GameForge."

FEATURES:
	- Multi-language (12 of 21 languages currently available)
	- Overview of all buildings for each town
	- Overview of all resources for each town
	- Resources maximum capacity for each town
	- Resources production for each island
	- Overview of all buildings under construction
	- Shortcuts to island resources on the left-side box
	- When storage is almost full for a resource, it changes it's color to bright red / when completely full, changes to red.
	
	Note: You need to open each city first, to gather the data to complete the table.			

KNOWN BUGS:
		- On servers other than ikariam.org, name shortcuts to some resources are not translated to the correct language (they appear in english).
		- When you open the Overview popup at the Island View, will not be visible.
	
TODO:
	1 - Finishing times for building constructions (or a time bar?)
	2 - Time bar until resource fulls a silo (to put in the table)
	3 - Time bar / clock on upgrading buildings
	
	- Finances table
	- Workshop research table
	- Research table
	- Military table
	?? - Loading everything together?
	
	DONE - Various shortcuts on the script left panel (to resources, to buildings, etc)
	DONE - Tooltips in capacity fields
	DONE - Colors when near the maximum capacity
**/

/** MAIN VARIABLES STARTUP **/
var scriptName = "Ikariam General Overview v1.5"
var allCities = getCities();
var keywords = getLang();
try {
	getBuildings(allCities, currentCity(allCities));
	getResources(allCities, currentCity(allCities));
	shortcuts = buildShortcuts(currentCity(allCities));
} catch(e) {
}

/****	FUNCTIONS	****/
function getLang() { /** returns array with language keywords.

			TRANSLATIONS BELOW
			
			ALL WORDS ARE CASE-SENSITIVE!
			ALL BUILDING NAMES MUST MATCH THE SERVER BUILDING NAMES.
			
		keywords[0] Building names
		keywords[1] Resources names
		keywords[2] Various words used in the data tables
		
**/
	var keywords = new Array(2);
	var tHost = window.location.host;
	tHost = tHost.substring(tHost.indexOf('.')+1, tHost.length)
	switch (tHost) {
		case 'ikariam.org':
			keywords[0] = ["Town hall", "Shipyard", "Trading port", "Warehouse", "Trading post", "Barracks", "Palace", "Hideout", "Embassy", "Academy", "Workshop", "Tavern", "Museum", "Town wall", "Governor´s Residence"];	
			keywords[1] = ["Wood","Wine","Marble","Crystal","Sulphur"];
			keywords[2] = ["Level", "Close", "Click to open/close", "Buildings & resources overview", "* To update the data for each city go to the page of the correspondent city","Towns", "Buildings overview", "Resources overview", "Capacity","Under construction", "on", "under construction", "Building to level", "Production of", "City resources", "Maximum warehouse capacity", "for"];
			break;
                case 'ikariam.co.il':
keywords[0] = ["בניין העירייה", "מספנה", "נמל סחר", "מחסן", "תחנת סחר", "מגורי חיילים", "ארמון", "מקום מחבוא", "שגרירות", "אקדמיה", "בית-מלאכה", "טברנה", "מוזיאון", "בניין העירייה", "מגורי המושל"];
keywords[1] = ["חומר בנייה","יין","שיש","גבישי קריסטל","גופרית"];
keywords[2] = ["שלב", "סגור", "לחץ לפתיחה\סגירה", "מבט על בניינים\משאבים", "* בכדי לעדכן את המידע עבור כל עיר עבור לעמוד של העיר","ערים", "מבט על הבניינים", "מבט על המשאבים", "קיבולת","בבנייה", "דלוק", "בבנייה", "בניין עד שלב", "ייצור של", "City resources", "קיבלות מקסימלית של המחסן", "בשביל"];
                         break;
		case 'ikariam.com.pt':
			keywords[0] = ["Câmara Municipal", "Estaleiro", "Porto Mercantil", "Armazém", "Mercado", "Quartel", "Palácio", "Espionagem", "Embaixada", "Academia", "Oficina", "Taberna", "Museu", "Muralha da cidade", "Residência do Governador"];
			keywords[1] = ["Madeira","Vinho","Mármore","Cristal","Enxofre"];			
			keywords[2] = ["Nível", "Fechar", "Clique para abrir/fechar", "Vista geral de edifícios & recursos", "* Para actualizar os dados de uma cidade, abre a página da cidade correspondente", "Cidades", "Vista geral de edifícios", "Vista geral de recursos", "Capacidade", "Em construção", "em", "em construção", "A construir para o nível", "Produção de", "Recursos da cidade", "Capacidade máxima do armazém", "para"];
			break;		//	0			1				2								3																	4											5					6							7					8					9		10			11					12						13				14							15					16
		case 'ikariam.de':
			keywords[0] = ["Rathaus", "Schiffswerft", "Handelshafen", "Lagerhaus", "Kontor", "Kaserne", "Palast", "Versteck", "Botschaft", "Akademie", "Erfinderwerkstatt", "Taverne", "Museum", "Stadtmauer", "Stadthaltersitz"];	
			keywords[1] = ["Baumaterial","Wein","Marmor","Kristallglas","Schwefel"];
			keywords[2] = ["Stufe", "Schließen", "Hier klicken zum Öffnen/Schließen", "Gebäude- & Resourcenübersicht", "* Um die Daten der Städte zu aktualisieren, müssen die Seiten der jeweiligen Städte geladen werden.", "Städte", "Gebäudeübersicht", "Ressourcenübersicht", "Kapazität", "In Bearbeitung", "in", "in Bearbeitung", "Aufwerten auf Level", "Produktion von", "Stadtressourcen", "Maximale Lagerkapazität", "für"];
			break;
		case 'ikariam.pl':
			keywords[0] = ["Ratusz", "Stocznia", "Port handlowy", "Magazyn", "Bazar", "Koszary", "Pa\u0142ac", "Kryj\u00F3wka", "Ambasada", "Akademia", "Warsztat", "Tawerna", "Muzeum", "Mur miejski", "Rezydencja Gubernatora"];
			keywords[1] = ["Material budowlany","Wino","Marmur","Kryszta\u0142","Siarka"];
			keywords[2] = ["Poziom", "Zamknij", "Kliknij by otworzyc/zamknac", "Podsumowanie budynk\u00F3w i zasob\u00F3w", "* Aby pobrac dane przejdz przez wszystkie miasta", "Miasto", "Podsumowanie budynk\u00F3w", "Podsumowanie surowc\u00F3w", "Pojemnosc", "W trakcie rozbudowy", "w", "W trakcie rozbudowy", "Rozbudowa do levelu", "Wydobycie", "Zasoby miasta", "Pojemnosc magazynu", "dla"];
			break;
		case 'ikariam.nl':
			keywords[0] = ["Stadhuis", "Scheepswerf", "Handelspost", "Opslagplaats", "Handelspost", "Barakken", "Paleis", "Schuilplaats", "Ambassade", "Academie", "Werkplaats", "Taverne", "Museum", "Muur", "Gouveneurswoning"];
			keywords[1] = ["Hout","Wijn","Marmer","Kristal","Zwavel"];
			keywords[2] = ["Level", "Sluiten", "Klik om te opene/sluiten", "Gebouwen en Middelen overzicht", "* Om de data te updaten, ga apart naar elke stad","Steden", "Gebouwen overzicht", "Middelen overzicht", "Capiciteit","In aanbouw", "Aan", "In Aanbouw", "Aan het bouwen naar level", "Productie van", "Stad middelen", "Maximum opslagplaats capiciteit", "Voor"];
			break;
		case 'ikariam.dk':
			keywords[0] = ["Rådhus", "Skibsværft", "Handelshavn", "Lagerbygning", "Handelsstation", "Kaserne", "Palads", "Skjulested", "Ambassade", "Akademi", "Værksted", "Værtshus", "Museum", "Bymur", "Guvernørs Residens"];
			keywords[1] = ["Træ","Vin","Marmor","Krystal","Svovl"];
			keywords[2] = ["Level", "Luk", "Klik for at åbne/lukke", "Bygnings & ressource oversigt", "* For at opdatere data for hver by gå til siden med den relevante by","Byer", "Bygningsoversigt", "Ressourceoversigt", "Kapacitet","Under opførsel", "på", "under opførsel", "Bygnings næste level", "Produktion af", "By ressourcer", "Maximal lager kapacitet", "for"];
			break;
		case 'ikariam.net':
			keywords[0] = ["Belediye Binası", "Donanma Tersanesi", "Ticaret Limani", "Depo", "Ticaret Merkezi", "Kışla", "Saray", "İstihbarat Merkezi", "Büyük Elçilik", "Akademi", "Mucit Atölyesi", "Taverna", "Müze", "Sur", "Vali Konağı"];
			keywords[1] = ["Odun","Şarap","Mermer","Kristal Cam","Sülfür"];
			keywords[2] = ["Seviye", "Kapat", "Click to open/close", "Bina ve Kaynaklara Genel Bakış", "* Bilgiyi güncellemek için şehrin sayfasına gidin.","Şehir", "Bina Seviyeleri", "Kaynak Miktarları", "Kapasite","Yükseltiliyor", "on", "Yükseltiliyor", "Yükseltilen Seviye=", "Üretim=", "Şehir Kaynakları", "Maksimum depo kapasitesi", "için"];
			break;
		case 'ikariam.es':
			keywords[0] = ["Intendencia", "Astillero de guerra", "Puerto comercial", "Depósito", "Comercio", "Cuartel", "Palacio", "Escondite", "Embajada", "Academia", "Taller de invenciones", "Taberna", "Museo", "Muro de la ciudad", "Residencia del gobernador"];
			keywords[1] = ["Madera","Vino","Mármol","Cristal","Azufre"];
			keywords[2] = ["Nivel", "Cerrar", "Click para abrir/cerrar", "Resumen de la ciudad", "* Para actualizar los datos de cada ciudad abre la página de cada ciudad.","Ciudades", "Resumen de construcciones", "Resumen de recursos", "Capacidad","En construcción", "en", "en construcción", "Actualizando al nivel", "Producción de", "Recursos de la ciudad", "Capacidad máxima del depósito", "para"];
			break;
		case 'ikariam.cz':
			keywords[0] = ["Městská radnice", "Loděnice", "Obchodní přístav", "Sklad", "Tržiště", "Kasárna", "Palác", "Úkryt", "Ambasáda", "Akademie", "Dílna", "Hostinec", "Muzeum", "Městská zeď", "Guvernérova Rezidence"];	
			keywords[1] = ["Stavební materiál","Víno","Mramor","Krystalické sklo","Síra"];
			keywords[2] = ["Úroveň", "Zavřít", "Klikni pro otevření/zavření", "Přehled budov & zdrojů", "* Pro aktualizaci dat jednotlivých měst je potřeba tyto města navštívit","Města", "Přehled budov", "Přehled zdrojů", "Kapacita","Staví se", "v", "staví se", "Úroveň budovy", "Produkce ", "Zdroje města", "Kapacita skladu", "pro"];
			break;
		case 'ikariam.it':
			keywords[0] = ["Municipio", "Cantiere Navale", "Porto", "Magazzino", "Mercato", "Caserma", "Palazzo", "Nascondiglio", "Ambasciata", "Accademia", "Officina", "Taverna", "Museo", "Mura della città", "Residenza del Governatore"];	
			keywords[1] = ["Legno","Vino","Marmo","Cristallo","Zolfo"];
			keywords[2] = ["Livello", "Chiudi", "Fare click per aprire/chiudere", "Panoramica Edifici e Risorse", "* Per aggiornare i dati di una città, visitare la pagina rispettiva.","Città", "Panoramica edifici", "Panoramica risorse", "Capacità","In costruzione", "a", "in costruzione", "In espansione al livello", "Produzione di", "Risorse prodotte dalla città", "Capacità massima del magazzino", "a"];
			break;			
		case 'ikariam.com':
			keywords[0] = ["Town hall", "Shipyard", "Trading port", "Warehouse", "Trading post", "Barracks", "Palace", "Hideout", "Embassy", "Academy", "Workshop", "Tavern", "Museum", "Town wall", "Governor´s Residence"];	
			keywords[1] = ["Wood","Wine","Marble","Crystal","Sulphur"];
			keywords[2] = ["Level", "Close", "Click to open/close", "Buildings & resources overview", "* To update the data for each city go to the page of the correspondent city","Towns", "Buildings overview", "Resources overview", "Capacity","Under construction", "on", "under construction", "Building to level", "Production of", "City resources", "Maximum warehouse capacity", "for"];
			break;
		case 'ikariam.se':
			keywords[0] = ["Rådhus", "Skeppsvarv", "Handelshamn", "Lagerlokal", "Handelsstation", "Kasern", "Palats", "Gömställe", "Ambassad", "Akademi", "Verkstad", "Taverna", "Museum", "Stadsmur", "Guvernörsresidens"];
			keywords[1] = ["Trä","Vin","Marmor","Kristall","Svavel"];
			keywords[2] = ["Nivå", "Stäng", "Klicka för att öppna/stänga", "Byggnader & resurser översikt", "* För att uppdatera informationen för varje stad gå till sidan för respektive stad","Städer", "Byggnader översikt", "Resurser översikt", "Kapacitet","Under utbyggnad", "på", "under utbyggnad", "Byggnadens nästa nivå", "Produktion av", "Stadsresurser", "Maximal lagerkapacitet", "för"];
			break;			
	}
	return keywords;
}

function getResourcesProduction(type) { /** returns array with all data related to resources produced on the current island
	tradeGood[0] How much resource is being produced (ie: "+120")
	tradeGood[1] Name of the resource
	tradeGood[2] HREF to resource production spot
**/
	var tradeGood = new Array(2);
	tradeGood[0] = document.getElementsByTagName('script')[document.getElementsByTagName('script').length-2].innerHTML;
	var islandID = document.getElementById('breadcrumbs').childNodes[3].href;
	islandID = islandID.substring(islandID.indexOf("id=")+3, islandID.length);
	switch (type) {
		case 'island':
			tradeGood[0] = tradeGood[0].substring(tradeGood[0].indexOf("startTradegoodDelta")+22, tradeGood[0].length);
				tradeGood[1] = tradeGood[0].substring(tradeGood[0].lastIndexOf("value_")+6, tradeGood[0].length);
			tradeGood[1] = tradeGood[1].substring(0, tradeGood[1].indexOf("'"));
			tradeGood[2] = "?view=tradegood&type=tradegood&id=" + islandID;
			break;
		case 'wood':
			tradeGood[0] = tradeGood[0].substring(tradeGood[0].indexOf("startResourcesDelta")+22, tradeGood[0].length);
			tradeGood[1] = "wood";
			tradeGood[2] = "?view=resource&type=resource&id=" + islandID;
			break;
	}
	tradeGood[0] = tradeGood[0].substring(0, tradeGood[0].indexOf(";"));
	tradeGood[0] = "+" + Math.round(tradeGood[0]*3600);
	return tradeGood;
}

function getCities() { /** returns array with ata related to cities	
	cities[][0] City ID
	cities[][1] City name
	cities[][2] City HREF
	cities[][3] City update time
**/
	var tmp = document.getElementById('citySelect');
	var cities = new Array();
	for (i=0; i < tmp.childNodes.length; i++) {
		if (tmp.childNodes[i].innerHTML != undefined) {
			cities[cities.length] = new Array(3);
			cities[cities.length-1][0] = tmp.childNodes[i].getAttribute('value');
			cities[cities.length-1][1] = tmp.childNodes[i].innerHTML;
			cities[cities.length-1][2] = "?view=city&amp;id=" + tmp.childNodes[i].getAttribute('value');
		}
	}
	
	var name = document.getElementsByTagName('li')[0].innerHTML;
	name = name.substring(name.indexOf("</span>")+7, name.length);
	for (i=0; i < cities.length; i++) {
		if (cities[i][1] == name) {
			cities[i][3] = new Date();
		}
	}
	
	return cities;
}

function currentCity(cities) { /** return the selected city index **/
	var name = document.getElementsByTagName('li')[0].innerHTML;
	name = name.substring(name.indexOf("</span>")+7, name.length);
	for (i=0; i < cities.length; i++) {
		if (cities[i][1] == name) {
			return i;
		}
	}
}

function getResources(cities, currentCity) { /** sets a GM script value with the resources in the current city
	
	resources[0] Wood
	resources[1] Wine
	resources[2] Marble
	resources[3] Crystal
	resources[4] Sulphur
	
	resources[5] How much wood is being produced (ie: "+120")
	resources[6] HREF to island saw mill
	resources[7] How much wine/marble/crystal/sulphur is being produced (ie: "+120")
	resources[8] Name of the specific island resource (possible values: wine/marble/crystal/sulpfur)
	resources[9] Specific island resource depot HREF
	
	resources[10] Wood storage
	resources[11] Wine storage
	resources[12] Marble storage
	resources[13] Crystal storage
	resources[14] Sulphur storage
	
	resources[15] Wood almost full? ----------------------
	resources[16] Wine almost full?                              |
	resources[17] Marble almost full?        (CSS style to use in the <td>)
	resources[18] Crystal almost full?                           |
	resources[19] Sulphur almost full? -------------------
	
**/
	var resources = new Array(19);
	var storage;
	resources[0] = document.getElementById('value_wood').innerHTML;
	resources[1] = document.getElementById('value_wine').innerHTML;
	resources[2] = document.getElementById('value_marble').innerHTML;
	resources[3] = document.getElementById('value_crystal').innerHTML;
	resources[4] = document.getElementById('value_sulfur').innerHTML;
	
	resources[5] = getResourcesProduction('wood')[0];
	resources[6] = getResourcesProduction('wood')[2];
	resources[7] = getResourcesProduction('island')[0];
	resources[8] = getResourcesProduction('island')[1].charAt(0).toUpperCase() + getResourcesProduction('island')[1].substr(1);;
	// var regTest = new RegExp(resources[8].substring(0,3), "i");
	// alert(keywords[1].join('\n'));
	// for (i=0; i < keywords[1].length; i++) {
		// if (regTest.test(keywords[1][i])) {
			// resources[8] = keywords[1][i];
		// }
	// }
	resources[9] = getResourcesProduction('island')[2];
	
	storage = document.getElementById('value_wood').parentNode.childNodes[5].textContent;
	storage = storage.substring(storage.indexOf(':')+2, storage.length);
	resources[10] = storage;
	storage = document.getElementById('value_wine').parentNode.childNodes[5].textContent;
	storage = storage.substring(storage.indexOf(':')+2, storage.length);
	resources[11] = storage;
	storage = document.getElementById('value_marble').parentNode.childNodes[5].textContent;
	storage = storage.substring(storage.indexOf(':')+2, storage.length);	
	resources[12] = storage;
	storage = document.getElementById('value_crystal').parentNode.childNodes[5].textContent;
	storage = storage.substring(storage.indexOf(':')+2, storage.length);		
	resources[13] = storage;
	storage = document.getElementById('value_sulfur').parentNode.childNodes[5].textContent;
	storage = storage.substring(storage.indexOf(':')+2, storage.length);		
	resources[14] = storage;
	for (i=15; i <= 19; i++) {
		var testStorage1 = resources[i-15].replace(/,/,"");
		testStorage1 = testStorage1.replace(/\./,""); //because dot cell dividers
		var testStorage2 = resources[i-5].replace(/,/,"");
		testStorage2 = testStorage2.replace(/\./,""); //because dot cell dividers
		if ((parseFloat(testStorage1) / parseFloat(testStorage2)) == 1) {
			resources[i] = "background-color: red; font-weight: bold;";
		} else if ((parseFloat(testStorage1) / parseFloat(testStorage2)) >= 0.75) {
			resources[i] = "background-color: #FF9B9A; border: 1px solid red;";
		} else {
			resources[i] = "";
		}
	}
	GM_setValue("resources_" + currentCity, resources.toSource());
}

function getBuildings(cities, currentCity) { /** sets a GM script value with the buildings in the current city

		buildings[currentCity][buildID][0] currentCity;
		buildings[currentCity][buildID][1] Name
		buildings[currentCity][buildID][2] HREF
		buildings[currentCity][buildID][3] Under construction? (possible values: 0, 1)
	
**/
	var tmp, buildID;
	var buildings = new Array(cities.length-1);
	for (i=0; i < cities.length; i++) {
		buildings[i] = new Array(14);
	}
	for (i=0; i < 15; i++) {
		tmp = document.getElementById('position' + i).childNodes[3];
		for (j=0; j < cities.length; j++) {
			if (tmp.href.substring(tmp.href.lastIndexOf("id=")+3, tmp.href.lastIndexOf("&")) == cities[j][0]) {
				currentCity = j;
			}
		}
		
		var tempName = tmp.title.substring(0, tmp.title.lastIndexOf(keywords[2][0])-1);
		switch(tempName) {
			case keywords[0][0]: buildID = 0; break;
			case keywords[0][1]: buildID = 1; break;
			case keywords[0][2]: buildID = 2; break;
			case keywords[0][3]: buildID = 3; break;
			case keywords[0][4]: buildID = 4; break;
			case keywords[0][5]: buildID = 5; break;
			case keywords[0][6]: buildID = 6; break;
			case keywords[0][7]: buildID = 7; break;
			case keywords[0][8]: buildID = 8; break;
			case keywords[0][9]: buildID = 9; break;
			case keywords[0][10]: buildID = 10; break;
			case keywords[0][11]: buildID = 11; break;
			case keywords[0][12]: buildID = 12; break;
			case keywords[0][13]: buildID = 13; break;
			case keywords[0][14]: buildID = 6; break; //Governors residence = palace
			default: buildID = "error";
		}
		buildings[currentCity][buildID] = new Array(3);
		buildings[currentCity][buildID][0] = currentCity;

		buildings[currentCity][buildID][1] = tmp.title.substring(tmp.title.lastIndexOf(" ")+1, tmp.title.length);
		buildings[currentCity][buildID][2] = tmp.href;

		buildings[currentCity][buildID][3] = tmp.firstChild.innerHTML.search(keywords[2][9]);
		
		GM_setValue("city_" + currentCity, buildings[currentCity].toSource());
	}
}

function buildShortcuts(currCity) { /** returns an array with important data for box shortcut
	
	shortcuts[0] Wood production
	shortcuts[1] HREF to saw mill
	shortcuts[2] Island resource production
	shortcuts[3] Name of the island resource
	shortcuts[4] HREF to the island resource
	
**/
	var temp_resources = eval(GM_getValue("resources_" + currCity, undefined));
	var shortcuts = new Array(2);
	shortcuts[0] = temp_resources[5];
	shortcuts[1] = temp_resources[6];
	shortcuts[2] = temp_resources[7];
	shortcuts[3] = temp_resources[8];
	shortcuts[4] = temp_resources[9];
	return shortcuts;
}

//Add Javascript to the source code
function addJS(where, js) {
    var head, jscript;
    head = document.getElementsByTagName(where)[0];
    if (!head) { return; }
    jscript = document.createElement('script');
    jscript.type = 'text/javascript';
    jscript.innerHTML = js;
    head.appendChild(jscript);
}

//NEW INFOBOX
var newElement = document.createElement('div');
newElement.className = 'dynamic';
newElement.id = 'IkariamOverview';
newElement.innerHTML = '<h3 class="header">General Overview v1.5</h3>'
						+ '<div class="content">'
							+ '<p>» <a title="' + keywords[2][2] + '" href="#" onclick="showHide();">' + keywords[2][3] + '</a></p>';
							try {
							newElement.innerHTML += '<p><span style="padding-left: 15px"><b>' + keywords[2][14] + ':</b></span><br>'
								+ '<span style="padding-left: 30px">» <a href=' + shortcuts[1] + '>' + keywords[1][0] + '</a> (' + shortcuts[0] + ')</a></span><br>'
								+ '<span style="padding-left: 30px">» <a href=' + shortcuts[4] + '>' + shortcuts[3] + '</a> (' + shortcuts[2] + ')</a></span></p><br>';
							} catch(e) {
							}
newElement.innerHTML += '</div>'
					 + '<div class="footer"></div>';

infoBox = document.getElementById('mainview');
if (infoBox) {
   infoBox.parentNode.insertBefore(newElement, infoBox);
}

//Create the function to show/hide the CSS popup
addJS('head', 'function showHide() {'
		+ 'var overviewPopup;'
		+ 'overviewPopup = document.getElementById("overviewPopup");'
		+ 'if (overviewPopup.style.display != "block") {'
			+ 'overviewPopup.style.display = "block";'
		+ '} else {'
			+ 'overviewPopup.style.display = "none";'
		+ '}'
	+'}'
)

//BUILDING LEVELS - Create the data table inside the popup
var table_buildsLvl = '<table style="border-style: dotted; font-size: 12px; margin-left: 6px; margin-top: 5px;" border="1" width="940px">';
table_buildsLvl += '<tr><td style="background-color: #DEAB5C; font-weight: bold; text-align: center;" colspan="' + keywords[0].length + '">' + keywords[2][6] + '</td></tr>';
table_buildsLvl += '<tr style="background-color: #DEAB5C; text-align: center;">';
table_buildsLvl += '<td width="110px">' + keywords[2][5] + '</td>';
for (i=0; i < (keywords[0].length-1); i++) {
	table_buildsLvl += '<td>' + keywords[0][i] + '</td>';
}
table_buildsLvl += '</tr>';
for (i=0; i < allCities.length; i++) {
	table_buildsLvl += '<tr style="text-align: center;"><td><a href="' + allCities[i][2] + '">' + allCities[i][1] + '</td>';
	try {
		var temp_builds = eval(GM_getValue("city_" + i, "undefined"));
	} catch (e) {
	}
	for (j=0; j < (keywords[0].length-1); j++) {
		try {
			if (temp_builds[j][1] != "Ground") {
				if (temp_builds[j][3] == -1) {
					table_buildsLvl += '<td title="' + keywords[0][j] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '"><a href="' + temp_builds[j][2] + '">'  + temp_builds[j][1] + '</a></td>';
				} else {
					var elevated = parseInt(temp_builds[j][1])+1;
					table_buildsLvl += '<td title="' + keywords[0][j] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '  ' + keywords[2][11] + '. ' + '(' + keywords[2][12] + ' ' + elevated + ')" style="background-color: #FFFF99;"><a href="' + temp_builds[j][2] + '">'  + temp_builds[j][1] + '</a></td>';
				}
			} else {
				table_buildsLvl += '<td>-</td>';
			}
		} catch (e) {
			table_buildsLvl += '<td> - </td>';
		}
	}
	table_buildsLvl += '</tr>';
}
table_buildsLvl += '</table>';

//RESOURCES - Create the data table inside the popup
var table_resources = '<table style="border-style: dotted; font-size: 13px; margin-left: 6px; margin-top: 5px;" border="1" width="610px">';
table_resources += '<tr><td style="background-color: #DEAB5C; font-weight: bold; text-align: center;" colspan="6">' + keywords[2][7] + '</td></tr>';
table_resources += '<tr style="background-color: #DEAB5C; text-align: center;">';
table_resources += '<td width="110px">' + keywords[2][5] + '</td><td width="100px">' + keywords[1][0] + '</td><td width="100px">' + keywords[1][1] + '</td><td width="100px">' + keywords[1][2] + '</td><td width="100px">' + keywords[1][3] + '</td><td width="100px">' + keywords[1][4] + '</td></tr>';
for (i=0; i < allCities.length; i++) {
	try {
		var temp_resources = eval(GM_getValue("resources_" + i, "-"));
	} catch (e) {
		var temp_resources = new Array(15)
		for (j=0; j < temp_resources.length; j++) {
			temp_resources[j] = "-";
		}
	}
	table_resources += '<tr style="text-align: center;"><td><a href="' + allCities[i][2] + '">' + allCities[i][1] + '</td>';
	switch (temp_resources[8]) {
		case 'Wine':
			table_resources += '<td style="' + temp_resources[15] + '" title="' + keywords[1][0] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[0] + ' (<a title="'+ keywords[2][13] + ' ' + keywords[1][0] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '" href="' + temp_resources[6] + '">' + temp_resources[5] + '</a>)</td><td style="' + temp_resources[16] + '" title="' + keywords[1][1] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[1] +  ' (<a  title="'+ keywords[2][13] + ' ' + keywords[1][1] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '" href="' + temp_resources[9] + '">' + temp_resources[7] + '</a>)</td><td style="' + temp_resources[17] + '" title="' + keywords[1][2] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[2] + '</td><td style="' + temp_resources[18] + '" title="' + keywords[1][3] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[3] + '</td><td style="' + temp_resources[19] + '" title="' + keywords[1][4] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[4] + '</td>';
			break;
		case 'Marble':
			table_resources += '<td style="' + temp_resources[15] + '" title="' + keywords[1][0] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[0] + ' (<a title="'+ keywords[2][13] + ' ' + keywords[1][0] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '" href="' + temp_resources[6] + '">' + temp_resources[5] + '</a>)</td><td style="' + temp_resources[16] + '" title="' + keywords[1][1] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[1] +  '</td><td style="' + temp_resources[17] + '" title="' + keywords[1][2] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[2] + ' (<a title="'+ keywords[2][13] + ' ' + keywords[1][2] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '" href="' + temp_resources[9] + '">' + temp_resources[7] + '</a>)</td><td style="' + temp_resources[18] + '" title="' + keywords[1][3] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[3] + '</td><td style="' + temp_resources[19] + '" title="' + keywords[1][4] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[4] + '</td>';
			break;
		case 'Crystal':
			table_resources += '<td style="' + temp_resources[15] + '" title="' + keywords[1][0] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[0] + ' (<a title="'+ keywords[2][13] + ' ' + keywords[1][0] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '" href="' + temp_resources[6] + '">' + temp_resources[5] + '</a>)</td><td style="' + temp_resources[16] + '" title="' + keywords[1][1] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[1] + '</td><td style="' + temp_resources[17] + '" title="' + keywords[1][2] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[2] + '</td><td style="' + temp_resources[18] + '" title="' + keywords[1][3] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[3] + ' (<a  title="'+ keywords[2][13] + ' ' + keywords[1][3] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '" href="' + temp_resources[9] + '">' + temp_resources[7] + '</a>)</td><td style="' + temp_resources[19] + '" title="' + keywords[1][4] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[4] + '</td>';
			break;
		case 'Sulfur':
			table_resources += '<td style="' + temp_resources[15] + '" title="' + keywords[1][0] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[0] + ' (<a title="'+ keywords[2][13] + ' ' + keywords[1][0] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '" href="' + temp_resources[6] + '">' + temp_resources[5] + '</a>)</td><td style="' + temp_resources[16] + '" title="' + keywords[1][1] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[1] + '</td><td style="' + temp_resources[17] + '" title="' + keywords[1][2] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[2] + '</td><td style="' + temp_resources[18] + '" title="' + keywords[1][3] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[3] + '</td><td style="' + temp_resources[19] + '" title="' + keywords[1][4] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[4] + ' (<a  title="'+ keywords[2][13] + ' ' + keywords[1][4] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '" href="' + temp_resources[9] + '">' + temp_resources[7] + '</a>)</td>';
			break;
		default:
			table_resources += '<td style="' + temp_resources[15] + '" title="' + keywords[1][0] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[0] + ' (<a title="'+ keywords[2][13] + ' ' + keywords[1][0] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '" href="' + temp_resources[6] + '">' + temp_resources[5] + '</a>)</td><td style="' + temp_resources[16] + '" title="' + keywords[1][1] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[1] + '</td><td style="' + temp_resources[17] + '" title="' + keywords[1][2] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[2] + '</td><td style="' + temp_resources[18] + '" title="' + keywords[1][3] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[3] + '</td><td style="' + temp_resources[19] + '" title="' + keywords[1][4] + ' ' + keywords[2][10] + ' ' + allCities[i][1] + '">' + temp_resources[4] + '</td>';
	}
	table_resources += '</tr>';
	table_resources += '<tr title="' + keywords[2][15] + ' ' + keywords[2][16] + ' ' + allCities[i][1] + '" style="text-align: center; font-size: 10px;"><td style="text-align: right; padding-right: 3px;">' + keywords[2][8] + '</td><td style="' + temp_resources[15] + '">' + temp_resources[10] + '</td><td style="' + temp_resources[16] + '">' + temp_resources[11] + '</td><td style="' + temp_resources[17] + '">' + temp_resources[12] + '</td><td style="' + temp_resources[18] + '">' + temp_resources[13] + '</td><td style="' + temp_resources[19] + '">' + temp_resources[14] + '</td></tr>';
}
table_resources += '</table>';

//Create the CSS popup window
addJS('body', 'overviewPopup = document.createElement("div");'
+ 'overviewPopup.id = "overviewPopup";'
+ 'overviewPopup.style.display = "none";'
+ 'overviewPopup.style.position = "absolute";'
+ 'overviewPopup.style.left = "-230px";'
+ 'overviewPopup.style.top = "30px";'
+ 'overviewPopup.style.height = "400px";'
+ 'overviewPopup.style.width = "950px";'
+ 'overviewPopup.style.border = "thick double #D2AC77";'
+ 'overviewPopup.style.backgroundColor = "#F6EBBC";'
+ 'overviewPopup.style.zIndex = 9999;'
+ 'overviewPopup.innerHTML = \'<h3 style="border-bottom:thick double #F2E4B5; height:20px; padding-top:2px; font-weight:bold; text-align: center; background-color: #DEAB5C"><table border="0" width="100%"><tr><td>Ikariam General Overview v1.5    (by <a href="mailto:a.maia.ferreira[at]gmail.com">Maia</a>)</td><td><a href="#" onclick="showHide();">' + keywords[2][1] + '</a></td></tr></table></h3>'
							+ table_buildsLvl
							+ table_resources
							+ '<p>' + keywords[2][4] + '</p>'
							+ '\';'												
+ 'textBox = document.getElementById("mainview");'
+ 'textBox.appendChild(overviewPopup);');