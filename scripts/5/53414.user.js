// ==UserScript==
// @name           Allies and Friends Highlighter (v1.3/18-01-09)
// @namespace      http://script.betterday.co.uk
// @description    highlight allied players in island view (patched) (Xsinthis) ( updated 07-07-09 )
// @include        http://*.ikariam.*/index.php*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==

// author: Nick Sewell/CactiFantastico
// contact: script@betterday.co.uk

String.prototype.trim = function () { return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"); };

getElementsByClassName = function(oElement, sClassName, bFindIn) {
	var all = oElement.getElementsByTagName("*");
	var elements = [];
	for (var i=0; i<all.length; i++) {
		if (bFindIn == true) {
			if (all[i].className.indexOf(sClassName) > 0) {
				elements[elements.length] = all[i];
			}
		}
		else {
			if (all[i].className == sClassName) {
				elements[elements.length] = all[i];
			}
		}
	}
	return elements;
};

getArgument = function(sURL, sArgument) {
	var regexString = "[\\?&]"+sArgument+"=([^&#]*)";
	var regexObject = new RegExp(regexString);
	var regexResult = regexObject.exec(sURL);
	if (regexResult == null) {
		return "";
	}
	else {
		return regexResult[1];
	}
};

// game = world
game = document.location.hostname.split(".")[0].trim();

// view = game view OR false
view = (function() { if (!game) { return false; } else { return document.getElementsByTagName("body")[0].id; } })();

if (game != false) {
	if (view == "island") {

		var allianceGroup0 = GM_getValue(game+"_allianceGroup0", "");
		var allianceGroup1 = GM_getValue(game+"_allianceGroup1", "");
		var allianceGroup2 = GM_getValue(game+"_allianceGroup2", "");
		var allianceGroup3 = GM_getValue(game+"_allianceGroup3", "");
		
		var resourcePath = "http://ikariamlibrary.com/tools/images/alliesandfriendshighligher/";

// <css for alliance groups>
		if (!document.getElementById("alliedAlliancesStyle")) {
			var style = document.createElement("style");
			style.setAttribute("id", "alliedAlliancesStyle");
			// purple roof [group 0]
			style.appendChild(document.createTextNode("#island #mainview #cities .level1 div.allianceGroup0 { background:transparent url("+resourcePath+"city_1_purple.png) no-repeat scroll 13px 10px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level2 div.allianceGroup0, #island #mainview #cities .level3 div.allianceGroup0 { background:transparent url("+resourcePath+"city_2_purple.png) no-repeat scroll 13px 13px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level4 div.allianceGroup0, #island #mainview #cities .level5 div.allianceGroup0, #island #mainview #cities .level6 div.allianceGroup0 { background:transparent url("+resourcePath+"city_3_purple.png) no-repeat scroll 13px 13px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level7 div.allianceGroup0, #island #mainview #cities .level8 div.allianceGroup0, #island #mainview #cities .level9 div.allianceGroup0 { background:transparent url("+resourcePath+"city_4_purple.png) no-repeat scroll 11px 13px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level10 div.allianceGroup0, #island #mainview #cities .level11 div.allianceGroup0, #island #mainview #cities .level12 div.allianceGroup0 { background:transparent url("+resourcePath+"city_5_purple.png) no-repeat scroll 8px 13px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level13 div.allianceGroup0, #island #mainview #cities .level14 div.allianceGroup0, #island #mainview #cities .level15 div.allianceGroup0 { background:transparent url("+resourcePath+"city_6_purple.png) no-repeat scroll 4px 7px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level16 div.allianceGroup0, #island #mainview #cities .level17 div.allianceGroup0 { background:transparent url("+resourcePath+"city_7_purple.png) no-repeat scroll 4px 7px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level18 div.allianceGroup0, #island #mainview #cities .level19 div.allianceGroup0, #island #mainview #cities .level20 div.allianceGroup0, #island #mainview #cities .level21 div.allianceGroup0, #island #mainview #cities .level22 div.allianceGroup0, #island #mainview #cities .level23 div.allianceGroup0, #island #mainview #cities .level24 div.allianceGroup0 { background:transparent url("+resourcePath+"city_8_purple.png) no-repeat scroll 2px 4px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .city .allianceGroup0 { bottom: 0; display: block; height: 63px; width: 64px; left: 0; position: absolute; }"));
			// orange roof [group 1]
			style.appendChild(document.createTextNode("#island #mainview #cities .level1 div.allianceGroup1 { background:transparent url("+resourcePath+"city_1_orange.png) no-repeat scroll 13px 10px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level2 div.allianceGroup1, #island #mainview #cities .level3 div.allianceGroup1 { background:transparent url("+resourcePath+"city_2_orange.png) no-repeat scroll 13px 13px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level4 div.allianceGroup1, #island #mainview #cities .level5 div.allianceGroup1, #island #mainview #cities .level6 div.allianceGroup1 { background:transparent url("+resourcePath+"city_3_orange.png) no-repeat scroll 13px 13px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level7 div.allianceGroup1, #island #mainview #cities .level8 div.allianceGroup1, #island #mainview #cities .level9 div.allianceGroup1 { background:transparent url("+resourcePath+"city_4_orange.png) no-repeat scroll 11px 13px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level10 div.allianceGroup1, #island #mainview #cities .level11 div.allianceGroup1, #island #mainview #cities .level12 div.allianceGroup1 { background:transparent url("+resourcePath+"city_5_orange.png) no-repeat scroll 8px 13px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level13 div.allianceGroup1, #island #mainview #cities .level14 div.allianceGroup1, #island #mainview #cities .level15 div.allianceGroup1 { background:transparent url("+resourcePath+"city_6_orange.png) no-repeat scroll 4px 7px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level16 div.allianceGroup1, #island #mainview #cities .level17 div.allianceGroup1 { background:transparent url("+resourcePath+"city_7_orange.png) no-repeat scroll 4px 7px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level18 div.allianceGroup1, #island #mainview #cities .level19 div.allianceGroup1, #island #mainview #cities .level20 div.allianceGroup1, #island #mainview #cities .level21 div.allianceGroup1, #island #mainview #cities .level22 div.allianceGroup1, #island #mainview #cities .level23 div.allianceGroup1, #island #mainview #cities .level24 div.allianceGroup1 { background:transparent url("+resourcePath+"city_8_orange.png) no-repeat scroll 2px 4px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .city .allianceGroup1 { bottom: 0; display: block; height: 63px; width: 64px; left: 0; position: absolute; }"));
			// cyan roof [group 2]
			style.appendChild(document.createTextNode("#island #mainview #cities .level1 div.allianceGroup2 { background:transparent url("+resourcePath+"city_1_cyan.png) no-repeat scroll 13px 10px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level2 div.allianceGroup2, #island #mainview #cities .level3 div.allianceGroup2 { background:transparent url("+resourcePath+"city_2_cyan.png) no-repeat scroll 13px 13px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level4 div.allianceGroup2, #island #mainview #cities .level5 div.allianceGroup2, #island #mainview #cities .level6 div.allianceGroup2 { background:transparent url("+resourcePath+"city_3_cyan.png) no-repeat scroll 13px 13px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level7 div.allianceGroup2, #island #mainview #cities .level8 div.allianceGroup2, #island #mainview #cities .level9 div.allianceGroup2 { background:transparent url("+resourcePath+"city_4_cyan.png) no-repeat scroll 11px 13px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level10 div.allianceGroup2, #island #mainview #cities .level11 div.allianceGroup2, #island #mainview #cities .level12 div.allianceGroup2 { background:transparent url("+resourcePath+"city_5_cyan.png) no-repeat scroll 8px 13px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level13 div.allianceGroup2, #island #mainview #cities .level14 div.allianceGroup2, #island #mainview #cities .level15 div.allianceGroup2 { background:transparent url("+resourcePath+"city_6_cyan.png) no-repeat scroll 4px 7px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level16 div.allianceGroup2, #island #mainview #cities .level17 div.allianceGroup2 { background:transparent url("+resourcePath+"city_7_cyan.png) no-repeat scroll 4px 7px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .level18 div.allianceGroup2, #island #mainview #cities .level19 div.allianceGroup2, #island #mainview #cities .level20 div.allianceGroup2, #island #mainview #cities .level21 div.allianceGroup2, #island #mainview #cities .level22 div.allianceGroup2, #island #mainview #cities .level23 div.allianceGroup2, #island #mainview #cities .level24 div.allianceGroup2 { background:transparent url("+resourcePath+"city_8_cyan.png) no-repeat scroll 2px 4px; }"));
			style.appendChild(document.createTextNode("#island #mainview #cities .city .allianceGroup2 { bottom: 0; display: block; height: 63px; width: 64px; left: 0; position: absolute; }"));
			// align button
			style.appendChild(document.createTextNode("#information .ally .manageHighlight img { display: inline; vertical-align: middle; }"));
			// insert style
			document.getElementsByTagName("head")[0].appendChild(style);
		}
// </css for alliance groups>

// <localization>
		var languages = {
			'en': {
				'alt-text': 'Add/Remove Alliance Highlight',
				'remove-0-question': 'Remove Highlighting for [<%allyid%>] (Group 0/Purple)\r\n0 - Oxi, 1 - Nai',
				'remove-1-question': 'Remove Highlighting for [<%allyid%>] (Group 1/Orange)\r\n0 - Oxi, 1 - Nai',
				'remove-2-question': 'Remove Highlighting for [<%allyid%>] (Group 2/Cyan)\r\n0 - Oxi, 1 - Nai',
				'remove-3-question': 'Remove Highlighting for [<%allyid%>] (Group 3/Green)\r\n0 - Oxi, 1 - Nai',
				'remove-0-success': 'Alliance [<%allyid%>] Removed from Group 0 (Purple)',
				'remove-1-success': 'Alliance [<%allyid%>] Removed from Group 1 (Orange)',
				'remove-2-success': 'Alliance [<%allyid%>] Removed from Group 2 (Cyan)',
				'remove-3-success': 'Alliance [<%allyid%>] Removed from Group 3 (Green)',
				'remove-cancelled': 'Remove Command Cancelled',
				'add-question': 'Add Alliance [<%allyid%>] Se pio group?\r\n0 - Purple, 1 - Orange, 2 - Cyan, 3 - Green, 4 - Cancel',
				'add-0-success': 'Alliance [<%allyid%>] Added to Group 0 (Purple)',
				'add-1-success': 'Alliance [<%allyid%>] Added to Group 1 (Orange)',
				'add-2-success': 'Alliance [<%allyid%>] Added to Group 2 (Cyan)',
				'add-3-success': 'Alliance [<%allyid%>] Added to Group 3 (Green)',
				'add-error': 'Lathos epilogi, Diatagi diakopike',
				'add-cancelled': 'Akirosi',
				'manual-question': 'Vale to ID ths simaxias gia Add/Remove',
				'manual-error': 'Vale re mlk sosti metavliti',
				'language-question': 'Poia einai i glossa sour\nAvailable: ',
				'language-selected': 'Ellinka is the Language Selected',
				'language-error': 'Lathos glossa',
				'language-menu': 'AFH:Set Language'
			},
			'dk': {
			   'alt-text': 'TilfοΏ½j/fjern Alliance FremhοΏ½velse',
			   'remove-0-question': 'Fjern fremhοΏ½velse for [<%allyid%>] (Gruppe 0/Lilla)\r\n0 - Nej, 1 - Ja',
			   'remove-1-question': 'Fjern fremhοΏ½velse for [<%allyid%>] (Gruppe 1/Orange)\r\n0 - Nej, 1 - Ja',
			   'remove-2-question': 'Hjern fremhοΏ½velse for [<%allyid%>] (Gruppe 2/Tyrkis)\r\n0 - Nej, 1 - Ja',
			   'remove-3-question': 'Remove Highlighting for [<%allyid%>] (Gruppe 3/GrοΏ½n)\r\n0 - Nej, 1 - Ja',
			   'remove-0-success': 'Alliance [<%allyid%>] fjernet fra Gruppe 0 (Lilla)',
			   'remove-1-success': 'Alliance [<%allyid%>] fjernet fra Gruppe 1 (Orange)',
			   'remove-2-success': 'Alliance [<%allyid%>] fjernet fra Gruppe 2 (Tyrkis)',
			   'remove-3-success': 'Alliance [<%allyid%>] fjernet fra Gruppe 3 (GrοΏ½n)',
			   'remove-cancelled': 'Fjern kommando annulleret',
			   'add-question': 'TilfοΏ½j Alliance [<%allyid%>] til hvilken gruppe?\r\n0 - Lilla, 1 - Orange, 2 - Tyrkis, 3 - GrοΏ½n, 4 - Annuller',
			   'add-0-success': 'Alliance [<%allyid%>] tilfοΏ½jet til Gruppe 0 (Lilla)',
			   'add-1-success': 'Alliance [<%allyid%>] tilfοΏ½jet til Gruppe 1 (Orange)',
			   'add-2-success': 'Alliance [<%allyid%>] tilfοΏ½jet til Gruppe (Tyrkis)',
			   'add-3-success': 'Alliance [<%allyid%>] tilfοΏ½jet til Gruppe (GrοΏ½n)',
			   'add-error': 'Ugyldigt valg, kommando annulleret',
			   'add-cancelled': 'TilfοΏ½j kommando annulleret',
			   'manual-question': 'Indtast Alliance ID for at tilfοΏ½je/fjerne',
			   'manual-error': 'Ugyldig indtastning. Kommando annulleret',
			   'language-question': 'VοΏ½lg dit sprog\r\nTilgοΏ½ngelige: ',
			   'language-selected': 'Dansk (DK) er valgt',
			   'language-error': 'Ugyldigt valg af sprog',
			   'language-menu': 'AFH:SοΏ½t sprog'
			},
			'mx': {
				'alt-text': 'Aadir/Remover Marca de Alianza',
				'remove-0-question': 'Remover Marca de [<%allyid%>] (Grupo 0/Morado)\r\n0 - No, 1 - Si',
				'remove-1-question': 'Remover Marca de [<%allyid%>] (Grupo 1/Naranja)\r\n0 - No, 1 - Si',
				'remove-2-question': 'Remover Marca de [<%allyid%>] (Grupo 2/Cyan)\r\n0 - No, 1 - Si',
				'remove-3-question': 'Remover Marca de [<%allyid%>] (Grupo 3/Verde)\r\n0 - No, 1 - Yes',
				'remove-0-success': 'Alianza [<%allyid%>] Removida del Grupo 0 (Morado)',
				'remove-1-success': 'Alianza [<%allyid%>] Removida del Group 1 (Naranja)',
				'remove-2-success': 'Alianza [<%allyid%>] Removida del Group 2 (Cyan)',
				'remove-3-success': 'Alianza [<%allyid%>] Removida del Group 3 (Verde)',
				'remove-cancelled': 'Comando de remocion cancelado',
				'add-question': 'Aadir Alianza [<%allyid%>] a que Grupo?\r\n0 - Morado, 1 - Naranja, 2 - Cyan, 3 - Verde, 4 - Cancelar',
				'add-0-success': 'Alianza [<%allyid%>] Aadida al Grupo 0 (Morado)',
				'add-1-success': 'Alianza [<%allyid%>] Aadida al Grupo 1 (Naranja)',
				'add-2-success': 'Alianza [<%allyid%>] Aadida al Grupo 2 (Cyan)',
				'add-3-success': 'Alianza [<%allyid%>] Aadida al Grupo 3 (Verde)',
				'add-error': 'Seleccion Invalida, Comando Cancelado',
				'add-cancelled': 'Comando de Adicion Cancelado',
				'manual-question': 'Escribe el ID de la Alianza para Aadirla/Removerla',
				'manual-error': 'Entrada Invalida. Comando Cancelado',
				'language-question': 'Por favor selecciona tu Lenguaje\r\nDisponibles: ',
				'language-selected': 'Has seleccionado el lenguaje Espaol (MX)',
				'language-error': 'Seleccion de Lenguaje Invalida',
				'language-menu': 'AFH:Establecer Lenguaje'
			},
			'nl': {
				'alt-text': 'Voeg toe/verwijder alliantie markering',
				'remove-0-question': 'Verwijder markering voor [<%allyid%>] (Groep 0/Paars)\r\n0 - Nee, 1 - Ja',
				'remove-1-question': 'Verwijder markering voor [<%allyid%>] (Groep 1/Oranje)\r\n0 - Nee, 1 - Ja',
				'remove-2-question': 'Verwijder markering voor [<%allyid%>] (Groep 2/Cyaan)\r\n0 - Nee, 1 - Ja',
				'remove-3-question': 'Verwijder markering voor [<%allyid%>] (Groep 3/Groen)\r\n0 - Nee, 1 - Ja',
				'remove-0-success': 'Alliantie [<%allyid%>] verwijderd van groep 0 (Paars)',
				'remove-1-success': 'Alliantie [<%allyid%>] verwijderd van groep 1 (Orange)',
				'remove-1-success': 'Alliantie [<%allyid%>] verwijderd van groep 2 (Cyaan)',
				'remove-2-success': 'Alliantie [<%allyid%>] verwijderd van groep 3 (Groen)',
				'remove-cancelled': 'Verwijdering geannulleerd',
				'add-question': 'Aan welke groep moet alliantie [<%allyid%>] toegevoegd worden?\r\n0 - Paars, 1 - Oranje, 2 - Cyaan, 3 - Groen, 4 - Annuleer',
				'add-0-success': 'Alliantie [<%allyid%>] werd toegevoegd aan groep 0 (Paars)',
				'add-1-success': 'Alliantie [<%allyid%>] werd toegevoegd aan groep 1 (Oranje)',
				'add-2-success': 'Alliantie [<%allyid%>] werd toegevoegd aan groep 2 (Cyaan)',
				'add-3-success': 'Alliantie [<%allyid%>] werd toegevoegd aan groep 3 (Groen)',
				'add-error': 'Ongeldige selectie, taak geannulleerd',
				'add-cancelled': 'Toevoeging geannulleerd',
				'manual-question': 'Voer een alliantie ID in om toe te voegen/te verwijderen',
				'manual-error': 'Ongeldige invoer, taak geannulleerd',
				'language-question': 'Gelieve uw taal te selecteren\r\nBeschikbaar: ',
				'language-selected': 'Nederlandse (NL) taal geselecteerd',
				'language-error': 'Ongeldige taal selectie',
				'language-menu': 'AFH:Selecteer uw taal'
			},
		'fi': {
			'alt-text': 'LisοΏ½οΏ½/poista liittouma korostus',
			'remove-0-question': 'Poista korostus [<%allyid%>] (RyhmοΏ½ 0/Violetti)\r\n0 - Ei, 1 - KyllοΏ½',
			'remove-1-question': 'Poista korostus [<%allyid%>] (RyhmοΏ½ 1/Oranssi)\r\n0 - Ei, 1 - KyllοΏ½',
			'remove-2-question': 'Poista korostus [<%allyid%>] (RyhmοΏ½ 2/sinivihreοΏ½)\r\n0 - Ei, 1 - KyllοΏ½',
			'remove-3-question': 'Poista korostus [<%allyid%>] (RyhmοΏ½ 3/VihreοΏ½)\r\n0 - Ei, 1 - KyllοΏ½',
			'remove-0-success': 'Liittouma [<%allyid%>] Poistettiin ryhmοΏ½stοΏ½ 0 (Violetti)',
			'remove-1-success': 'Liittouma [<%allyid%>] Poistettiin ryhmοΏ½stοΏ½ 1 (Oranssi)',
			'remove-2-success': 'Liittouma [<%allyid%>] Poistettiin ryhmοΏ½stοΏ½ 2 (sinivihreοΏ½)',
			'remove-3-success': 'Liittouma [<%allyid%>] Poistettiin ryhmοΏ½stοΏ½ 3 (VihreοΏ½)',
			'remove-cancelled': 'Poisto komento peruutettu',
			'add-question': 'LisοΏ½οΏ½ liittouma [<%allyid%>] ryhmοΏ½οΏ½n?\r\n0 - Violetti, 1 - Oranssi, 2 - sinivihreοΏ½, 3 - VihreοΏ½, 4 - Peruuta',
			'add-0-success': 'Liittouma [<%allyid%>] LisοΏ½ttiin ryhmοΏ½οΏ½n 0 (Violetti)',
			'add-1-success': 'Liittouma [<%allyid%>] LisοΏ½ttiin ryhmοΏ½οΏ½n 1 (Oranssi)',
			'add-2-success': 'Liittouma [<%allyid%>] LisοΏ½ttiin ryhmοΏ½οΏ½n 2 (sinivihreοΏ½)',
			'add-3-success': 'Liittouma [<%allyid%>] LisοΏ½ttiin ryhmοΏ½οΏ½n 3 (VihreοΏ½)',
			'add-error': 'Virheellinen valinta, Komento peruutettu',
			'add-cancelled': 'LisοΏ½οΏ½ komento peruutettu',
			'manual-question': 'Anna liittouma ID lisοΏ½tοΏ½ksesi/poistaaksesi',
			'manual-error': 'Virheellinen syοΏ½te. Komento peruutettu',
			'language-question': 'Valitse kielesi\r\nValittavissa: ',
			'language-selected': 'Suomi (FI) Kieli valittu',
			'language-error': 'Virheellinen kieli valinta',
			'language-menu': 'AFH:Aseta Kieli'
		},
		'fr': {
			'alt-text': 'Ajouter/Enlever le surligneur d\'alliance ',
			'remove-0-question': 'Enlever le surligneur du [<%allyid%>] (Groupe 0/Violet)\r\n0 - Non, 1 - Oui',
			'remove-1-question': 'Enlever le surligneur du [<%allyid%>] (Groupe 1/Orange)\r\n0 - Non, 1 - Oui',
			'remove-2-question': 'Enlever le surligneur du [<%allyid%>] (Groupe 2/Cyan)\r\n0 - Non, 1 - Oui',
			'remove-3-question': 'Enlever le surligneur du [<%allyid%>] (Groupe 3/Vert)\r\n0 - Non, 1 - Oui',
			'remove-0-success': 'Alliance [<%allyid%>] Enlever du Groupe 0 (Violet)',
			'remove-1-success': 'Alliance [<%allyid%>] Enlever du Groupe 1 (Orange)',
			'remove-2-success': 'Alliance [<%allyid%>] Enlever du Groupe 2 (Cyan)',
			'remove-3-success': 'Alliance [<%allyid%>] Enlever du Groupe 3 (Vert)',
			'remove-cancelled': 'La demande d\'annulation a οΏ½tοΏ½ arrοΏ½tοΏ½e',
			'add-question': 'ajouter Alliance [<%allyid%>] dans quel Groupe?\r\n0 - Violet, 1 - Orange, 2 - Cyan, 3 - Vert, 4 - Annuler',
			'add-0-success': 'Alliance [<%allyid%>] Ajouter au Groupe 0 (Violet)',
			'add-1-success': 'Alliance [<%allyid%>] Ajouter au Groupe 1 (Orange)',
			'add-2-success': 'Alliance [<%allyid%>] Ajouter au Groupe 2 (Cyan)',
			'add-3-success': 'Alliance [<%allyid%>] Ajouter au Groupe 3 (Vert)',
			'add-error': 'SοΏ½lection Invalide, Demande AnnulοΏ½e',
			'add-cancelled': 'Ajout de commande annulοΏ½',
			'manual-question': 'EntrοΏ½ l\'ID de l\'Alliance  dans Ajouter/Enlever',
			'manual-error': 'EntrοΏ½e Invalide. Demande AnnulοΏ½',
			'language-question': 'S\'il vous plait SοΏ½lectionnez votre Langage\r\nDisponible: ',
			'language-selected': 'FranοΏ½ais (FR) Langage SοΏ½lectionnοΏ½',
			'language-error': 'Langage SοΏ½lectionnοΏ½ invalide',
			'language-menu': 'AFH:Set Language'
		}
		};
		
		var language = languages[GM_getValue("language", "en")];
		
		var aahLanguage = function() {
			var languagesAvailable = "";
			for (prop in languages) {
				languagesAvailable += prop+",";
			}
			languagesAvailable = languagesAvailable.substr(0, languagesAvailable.length-1);
			var selection = prompt(language['language-question']+languagesAvailable,"en");
			if (selection == "" || selection == null) {
				GM_setValue("language", "en");
			}
			else {
				if (languagesAvailable.indexOf(selection) > -1) {
					GM_setValue("language", selection);
					language = languages[GM_getValue("language", "en")];
					alert(language['language-selected']);
				}
				else {
					alert(language['language-error']);
				}
			}
		};
		
		GM_registerMenuCommand(language['language-menu'], aahLanguage);
// </localization>

// <search and modify and insert manager button>
		var locationIndex = 0;
		var locationCurrent;
		var searchEnd = false;

		while (searchEnd == false) {

			locationCurrent = document.getElementById("cityLocation"+locationIndex);

			if (locationCurrent == null) { searchEnd = true; break; }

			cityInformation = getElementsByClassName(locationCurrent, "cityinfo", false);

			if (cityInformation.length == 0) {
				locationIndex += 1;
				continue;
			} else {
				cityInformation = cityInformation[0];
			}

			allyIndex = getElementsByClassName(cityInformation, "ally", false)[0].getElementsByTagName("a");

			if (allyIndex.length == 0) {
				locationIndex += 1;
				continue;
			} else {
				allyIndex = getArgument(allyIndex[0].href, "allyId");
			}

			searchString = ":"+allyIndex+":";
			
			// insert button
			if ((getElementsByClassName(locationCurrent, "ownCityImg", false).length == 0) && (getElementsByClassName(locationCurrent, "allyCityImg", false).length == 0)) {
				// do not add buttons if it is your own town or a member of your own alliance
				var image = document.createElement("img");
				image.setAttribute("src", resourcePath+"highlight_button.png");
				image.setAttribute("alt", language['alt-text']);
				var button = document.createElement("a");
				button.setAttribute("class", "manageHighlight");
				button.setAttribute("onclick", "highlightEvent(this);");
				button.appendChild(image);
				getElementsByClassName(locationCurrent, "ally", false)[0].appendChild(button);
			}

			if (allianceGroup0.indexOf(searchString) > -1) {
				// alliance is in group 0;
				getElementsByClassName(locationCurrent, "cityimg")[0].className = "allianceGroup0";
			}
			else if (allianceGroup1.indexOf(searchString) > -1) {
				// alliance is in group 1;
				getElementsByClassName(locationCurrent, "cityimg")[0].className = "allianceGroup1";
			}
			else if (allianceGroup2.indexOf(searchString) > -1) {
				// alliance is in group 2;
				getElementsByClassName(locationCurrent, "cityimg")[0].className = "allianceGroup2";
			}
			else if (allianceGroup3.indexOf(searchString) > -1) {
				// alliance is in group 3;
				getElementsByClassName(locationCurrent, "cityimg")[0].className = "allyCityImg";
			}
			else {
				// alliance is not in a group;
			}
			locationIndex += 1;
		}
// </search and modify and insert manager button>

// <group management>
		// add/remove highlight. id = allyId
		unsafeWindow.manageHighlight = function(id) {
			allyId = id;
			searchString = ":"+allyId+":";
			if (allianceGroup0.indexOf(searchString) > -1) {
				// remove alliance from group 0;
				var removeGroup0 = parseInt(prompt(language['remove-0-question'].replace("<%allyid%>", allyId), "0"));
				if (removeGroup0 == 1) {
					allianceGroup0 = allianceGroup0.replace(searchString, "");
					window.setTimeout(GM_setValue, 0, game+"_allianceGroup0", allianceGroup0);
					alert(language['remove-0-success'].replace("<%allyid%>", allyId));
					return window.location.reload();
				}
				else {
					alert(language['remove-cancelled']);
				}
			}
			else if (allianceGroup1.indexOf(searchString) > -1) {
				// remove alliance from group 1;
				var removeGroup1 = parseInt(prompt(language['remove-1-question'].replace("<%allyid%>", allyId), "0"));
				if (removeGroup1 == 1) {
					allianceGroup1 = allianceGroup1.replace(searchString, "");
					window.setTimeout(GM_setValue, 0, game+"_allianceGroup1", allianceGroup1);
					alert(language['remove-1-success'].replace("<%allyid%>", allyId));
					return window.location.reload();
				}
				else {
					alert(language['remove-cancelled']);
				}
			}
			else if (allianceGroup2.indexOf(searchString) > -1) {
				// remove alliance from group 2;
				var removeGroup2 = parseInt(prompt(language['remove-2-question'].replace("<%allyid%>", allyId), "0"));
				if (removeGroup2 == 1) {
					allianceGroup2 = allianceGroup2.replace(searchString, "");
					window.setTimeout(GM_setValue, 0, game+"_allianceGroup2", allianceGroup2);
					alert(language['remove-2-success'].replace("<%allyid%>", allyId));
					return window.location.reload();
				}
				else {
					alert(language['remove-cancelled']);
				}
			}
			else if (allianceGroup3.indexOf(searchString) > -1) {
				// remove alliance from group 3;
				var removeGroup3 = parseInt(prompt(language['remove-3-question'].replace("<%allyid%>", allyId), "0"));
				if (removeGroup3 == 1) {
					allianceGroup3 = allianceGroup3.replace(searchString, "");
					window.setTimeout(GM_setValue, 0, game+"_allianceGroup3", allianceGroup3);
					alert(language['remove-3-success'].replace("<%allyid%>", allyId));
					return window.location.reload();
				}
				else {
					alert(language['remove-cancelled']);
				}
			}
			else {
				// add alliance to group
				var selectGroup = parseInt(prompt(language['add-question'].replace("<%allyid%>", allyId), "4"));

				if (selectGroup == 0) {
					allianceGroup0 += searchString;
					window.setTimeout(GM_setValue, 0, game+"_allianceGroup0", allianceGroup0);
					alert(language['add-0-success'].replace("<%allyid%>", allyId));
					return window.location.reload();
				} 
				else if (selectGroup == 1) {
					allianceGroup1 += searchString;
					window.setTimeout(GM_setValue, 0, game+"_allianceGroup1", allianceGroup1);
					alert(language['add-1-success'].replace("<%allyid%>", allyId));
					return window.location.reload();
				}
				else if (selectGroup == 2) {
					allianceGroup2 += searchString;
					window.setTimeout(GM_setValue, 0, game+"_allianceGroup2", allianceGroup2);
					alert(language['add-2-success'].replace("<%allyid%>", allyId));
					return window.location.reload();
				}
				else if (selectGroup == 3) {
					allianceGroup3 += searchString;
					window.setTimeout(GM_setValue, 0, game+"_allianceGroup3", allianceGroup3);
					alert(language['add-3-success'].replace("<%allyid%>", allyId));
					return window.location.reload();
				}
				else if (selectGroup == 4) {
					alert(language['add-cancelled']);
				}
				else if (selectGroup == "" || selectGroup == null) {
					alert(language['add-canceled']);
				}
				else {
					alert(language['add-error']);
				}
			}
		};
		// this is attatched to the button in island information. onclick="highlightEvent(this);"
		unsafeWindow.highlightEvent = function(e) {
			if (!e) {
				var action = prompt(language['manual-question'],"");
				if (action == "") {
					alert(language['manual-error']);
				}
				else {
					unsafeWindow.manageHighlight(action);
				}
			}
			else {
				unsafeWindow.manageHighlight(getArgument(e.parentNode.getElementsByTagName("a")[0].href, "allyId"));
			}
		};
// </group management>
	}
}