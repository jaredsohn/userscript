// ==UserScript==
// @name			Ingame aanvalsplanner
// @namespace		Ingame aanvalsplanner voor TW.nl
// @description		Filtert dorpen met een bepaald aantal troepen, berekent aanvalsmogelijkheden en genereert links om deze uit te voeren. (Gebasseerd op DE-versie 4.2.4)
// @version        	NL0.1
// @include			http://*.tribalwars.*/game.php?*screen=overview_villages*
// @include			http://*.tribalwars.*/game.php?*screen=place*
// @include			http://*.tribalwars.*/game.php?*screen=info_player&id=*
// @include			http://*.tribalwars.*/game.php?*screen=info_village&id=*
// @include			http://*.tribalwars.*/game.php?village=*&screen=overview
// @exclude			http://*.tribalwars.*/game.php?*&screen=place&try=confirm
// @exclude			http://*.tribalwars.*/game.php?*&screen=map
// @grant           none
// ==/UserScript==


//***************************************************************************
//***                         truppenfilter.user.js
//**                       -------------------------
//**  author               : TM4rkuS
//**  copyright            : (C)  Markus Rohlof, Sascha Ulbrich
//**  based on		 	   : Sush, Heinzelmänchen 
//**  
//**                          TW.nl toegestane versie NL0.1 door Sakeb en Tuam
//**                       -> Dit script gaat erg ver.
//**                          Gebruik van een andere versie dan de gepubliceerde versie kan voor een ban zorgen.
//**                          Dit script is toegestaan, wanneer die toestemming ingetrokken wordt dan krijg je daar een melding van.
//***
//***************************************************************************/

(function()
{
// Legal check for TW.nl
var version = "NL0.1",
name = 'ingame_aanvalsplanner',
twNL_legal = false,
time = new Date().getTime();

function legal_check(){
	var url = 'http://legal.twscripts.nl/check.php?script='+name+'&versie='+version+'&?callback=legal',
	tw_legal = {};
	$.ajax({
		url: url,
		dataType: 'jsonp',
		timeout: 2000,
		success: function (data) {
			tw_legal.time = time;
			tw_legal.version = version;
			tw_legal.legal = data.legal;
			localStorage.twNL_legal_IA = JSON.stringify(tw_legal);
			if (data.legal == 'true'){
				alert('Het is op dit moment toegestaan de ingame aanvalsplanner te gebruiken.\nOver een week wordt er opnieuw gecontroleerd.\nLaad de pagina opnieuw als je de tool nu wil gebruiken.\n\nGroeten,\nhet TW.nl team');
			}
			else if (data.legal == 'oud'){
				alert('De versie van de ingame aanvalsplanner die jij gebruikt is verouderd en niet meer toegestaan.\nCheck voor een update op twscripts.nl.\nDe tool is nu uitgeschakeld.\n\nGroeten,\nhet TW.nl team');
			}
			else {
				alert('De ingame aanvalsplanner is niet langer toegestaan en daarom uitgeschakeld.\nVerwijder het uit je scripts.\n\nGroeten,\nhet TW.nl team')
			}	
		},
		error: function(xhr, status, err) {
			alert('Storing in de twscripts-legal-check.\n' + 'status: ' + status + '\nerror: ' + err + '\ntekst: ' + xhr.responseText);
		}
	})
}
if (localStorage.twNL_legal_IA) {
	var legal_info = JSON.parse(localStorage.twNL_legal_IA);
	if ((legal_info.time+60*60*24*7*1000) < time || legal_info.legal != 'true'){
		var tbody = $('a[href$="mode=ticket&screen=settings"]').closest('tbody');
		$('<tr><td class="menu-column-item"><a id="legal_taf" href="#">Ingame aanvalsplanner activeren</a></td></tr>').prependTo(tbody);
		$('#legal_taf')[0].addEventListener("click", legal_check, false);
	}
	else if (legal_info.legal == 'true') {
		twNL_legal = true;
	}
}
else {
	legal_check();	
}
// End of legal check for TW.nl


function get_world_config(param,Welt){/*Credits: Jano1*/
		var xmlhttp=new XMLHttpRequest();
		if(Welt.match(/de/))
		var url = 'http://'+Welt+'.die-staemme.de/interface.php?func='+param;
		if(Welt.match(/nl/))
		var url = 'http://'+Welt+'.tribalwars.nl/interface.php?func='+param;
		xmlhttp.open("GET",url,false);xmlhttp.send();
		var xmlDoc=xmlhttp.responseXML;	
		
		if(param == 'get_building_info'){
			var data_stand ={main:0,barracks:0,stable:0,garage:0,smith:0,place:0,statue:0,market:0,wood:0,stone:0,iron:0,farm:0,storage:0,hide:0,wall:0,snob:0,church:0,church_f:0};
			var inData_stand = {'max_level':0,'min_level':0,'wood':0,'stone':0,'iron':0,'pop':0,'wood_factor':0,'stone_factor':0,'iron_factor':0,'pop_factor':0,'build_time':0,'build_time_factor':0};
		}
		if(param == 'get_unit_info'){
			var data_stand ={spear:0,sword:0,axe:0,archer:0,spy:0,light:0,marcher:0,heavy:0,ram:0,catapult:0,knight:0,snob:0,miliz:0};
			var inData_stand = {'wood':0,'stone':0,'iron':0,'pop':0,'attack':0,'defense':0,'defense_kav':0,'defense_arch':0,'speed':0,'carry':0,'build_time':0};
		}
		
		var buildings, building, info, name, name_2; var count = 0; 
		var data = data_stand;
		buildings = xmlDoc.firstChild.childNodes;
		
		for (var i = 0; i < buildings.length; i++){
			building = buildings[i].childNodes;
			name = buildings[i].tagName;
			if(name != undefined){	
				if(param == 'get_building_info'){
					var inData = {'max_level':0,'min_level':0,'wood':0,'stone':0,'iron':0,'pop':0,'wood_factor':0,'stone_factor':0,'iron_factor':0,'pop_factor':0,'build_time':0,'build_time_factor':0};
				}
				if(param == 'get_unit_info'){
					var inData = {'wood':0,'stone':0,'iron':0,'pop':0,'attack':0,'defense':0,'defense_kav':0,'defense_arch':0,'speed':0,'carry':0,'build_time':0};
				}
				for (var ii = 0; ii < building.length; ii++){
					name_2 = building[ii].tagName;
					if(name_2 != undefined){
						inData[name_2] = building[ii].firstChild.nodeValue;
					}
				}
				data[name] = inData;
				count++;
			}
		}
		return data;
	}
	
	var texts = 
	{
		language: 
		{
			de:
			{
				buttons: 
				{
					start: "von ... Uhr",
					end: "bis ... Uhr",
					day: "Tag",
					date: "Monat",
					runtime: "LZ <img title=\"Nur Truppen mit entsprechender Laufzeit werden automatisch eingefügt!\" src=\"http://lippfux.bplaced.net/filemanager/fragezeichen.png\"/>",
					target: 'Ziel <img title="Liste der letzten 6 Ziele anzeigen" src="http://die-staemme.de/graphic/arrow_down.png?1"/>',
					attack: '<img src="http://de60.die-staemme.de/graphic/unit/att.png?1"/><img src="http://lippfux.bplaced.net/filemanager/fragezeichen.png" title="Die eingestellten Truppen werden genau so im Versammlungsplatz eingegeben. Bereits benutzte Dörfer werden gespeichert und angezeigt."/>',
					homepage: '<a href="http://www.DownloadCounter.de/counter.pl?file=http://lippfux.bplaced.net/&user=lippfux" target="_blank"><img title="Zur Homepage" src="http://lippfux.bplaced.net/filemanager/Update/update_from_4.2.4.gif"/></a>',
					settings: '<img style="cursor: pointer" title="Performance-Einstellungen" src="http://lippfux.bplaced.net/pics/settings.png"/>',
					deleteFav: "Löschen",
					save: "Speichern",
					filter: "Filtern",
					createLinks: "Angriffe berechnen",
					spear: "<img src= \"http://die-staemme.de/graphic/unit/unit_spear.png?1\">",
					sword: "<img src= \"http://die-staemme.de/graphic/unit/unit_sword.png?1\">",
					axe: "<img src= \"http://die-staemme.de/graphic/unit/unit_axe.png?1\">",
					archer: "<img src= \"http://die-staemme.de/graphic/unit/unit_archer.png?1\">",
					spy: "<img src= \"http://die-staemme.de/graphic/unit/unit_spy.png?1\">",
					light: "<img src= \"http://die-staemme.de/graphic/unit/unit_light.png?1\">",
					heavy: "<img src= \"http://die-staemme.de/graphic/unit/unit_heavy.png?1\">",
					marcher: "<img src= \"http://die-staemme.de/graphic/unit/unit_marcher.png?1\">",
					ram: "<img src= \"http://die-staemme.de/graphic/unit/unit_ram.png?1\">",
					catapult: "<img src= \"http://die-staemme.de/graphic/unit/unit_catapult.png?1\">",
					knight: "<img src= \"http://die-staemme.de/graphic/unit/unit_knight.png?1\">",
					snob: "<img src= \"http://die-staemme.de/graphic/unit/unit_snob.png?1\">",
					setGroups: "Gruppen setzen",
				},
				messages: 
				{
					allDataRemoved: "Alle bisher eventuell gespeicherten Daten des Truppenfilters mit Ankunftszeiten wurden entfernt, da Änderungen an den Einstellungen vorgenommen wurden.",
					addFavFilter: "Filtereinstellung zu den Favoriten hinzufügen. Favoriten können durch einen Klick die Einstellung der Truppen ändern. Du kannst maximal 3 Favoriten speichern.",
					favSuccesfulAdded: function(favName) { return ("Filter \"" + favName + "\" erfolgreich hinzugefügt");},
					addTargetlistName: "Name für Liste der Ziele eingeben: ",
					confirmDeleteTargetList: function(prop) { return ("Willst du deine Ziel-Liste \"" + prop + "\" wirklich unwiderruflich löschen?");},
					confirmResetStandardTargetList: "Die Standard-Liste kann nicht gelöscht werden. Willst Du diese stattdessen auf 0 zurücksetzen?",
					favFilterName: "Name für favorisierten Filter eingeben: ",
					confirmDeleteFavorite: function(prop) { return ("Willst du deinen Filter-Favoriten \"" + prop + "\" wirklich unwiderruflich löschen?");},
					remove_used_villages: "Liste bereits benutzter Dörfer unwiderruflich löschen.",
					last_targets: "Die letzten 6 Ziele",
					homepage: "Zur Homepage",
					settings: "Einstellungen",
					runtime: "Laufzeit = ",
					day_s: " Tag(e) ",
					center: "Auf der Karte Zentrieren",
					multipleAttacksFinished: "Es wurden bereits alle geplanten, bzw. möglichen Angriffe ausgeführt. Du kannst die Anzahl der Angriffe pro Dorf in den \"Einstellungen\" im Reiter \"Multiple Attacks\" unter \" Angriffe pro Dorf\" ändern.",
					multipleSettings: "Einstellungen für Multiple Attacks",
					execMultipleAttacks: "Multiple Attacks",
					planAttack: "» Angriffe planen",
					resetAttack: "» Neue Angriffe planen",
					noCoordsInserted: 'Keine oder fehlerhafte Koordinaten eingefügt. In jeder Zeile darf und muss exakt Koordinatenpaar der Form "xxx|yyy" stehen!',
					troopsDirected: function(count, start, end, runtime, target)
					{
						return ("Alle Dörfer (" + count + "), die im Zeitraum von " + start + " bis " + end + " Uhr (Laufzeit von " + runtime + "  Min/Feld) in " + target + " ankommen gefiltert!");
					},
					troopsDirectedMinimal: function(count) 
					{
						return ("Alle Dörfer (" + count + ") mit minimaler Truppenstärke gefiltert.");
					},
					favFilterAddSucces: "Filter-Favorit erfolgreich hinzugefügt.",
					asureAddfavFilter: "Du hast bereits 3 Favoriten gespeichert. Wenn du einen weiteren Favoriten hinzufügst, wird der älteste (unterste) gelöscht. Trotzdem fortfahren?",
					noFittingVillage: "Keines Deiner Dörfer erfüllt die Anforderungen für die Anzahl der Truppen. Die Berechnung wurde abgebrochen.",
					readVillagesDeleted: "Dörferpool nach 24 Stunden automatisch gelöscht",
				},
				anything:
				{
					watchTutorial: "Da dies Ihre erste Installation des neuen Truppenfilters mit Ankunftszeiten zu sein scheint, möchte ich Ihnen ein Videotutorial anbieten, dass die wichtigsten Funktionen des Scriptes erklärt. Jetzt anschauen? (Das Tutorial kann später noch über das \"Einstellungen\"-Symbol auf der rechten Seite und dann im Reiter \"Youtube-Tutorial\" angeschaut werden)",
					tutorialSingleFilter: "» Tutorial zum Einzelfilter",
					tutorialMultipleFilter1: "» Tutorial zu Multiple Attacks 1/2",
					tutorialMultipleFilter2: "» Tutorial zu Multiple Attacks 2/2",
					wannaDonate: "Dir gefällt meine Arbeit? Du möchtest mich unterstützen? Tu dies, indem du anderen von diesem Script erzählst, meine <a href=\"http://userscripts.org/users/378462/scripts\" target=\"_blank\">anderen Scripte</a> benutzt oder mir etwas <b>spendest</b>. Wie?",
					viaPaypal: "Wenn du Geld spenden möchtest, gehe einfach auf meine <a href=http://lippfux.bplaced.net>Website</a> und dort auf den Menüpunkt \"Spende via Paypal\"",
					viaPremium: "Auch <a href=\""+location.href.split("game.php?")[0]+"game.php?screen=premium&mode=transfer&player=lippfux\">Premiumpunkte</a> an den Account \"lippfux\" würden mich sehr freuen.",
					settings: "» Einstellungen",
					allVillages: "alle",
					close: "Schließen",
					village: "Dorf",
					place: "Versammlungsplatz",
					coordinates: "Koordinaten:",
					sendtroups: "» Truppen schicken",
					addToList: "Zur Angriffsliste hinzufügen",
					deleteFromList: "Aus Angriffsliste löschen",
					filterActiveGroup: "» Aus aktiver Gruppe filtern  ",
					myFavorites: "Meine Favoriten",
					myTargetLists: "Meine Ziel-Listen",
					addNewTargetList: "Neue Ziel-Liste hinzufügen",
					changeTargetList: "Ziele: ",
					addNewFavorite: "» Neuen Favoriten hinzufügen",
					addFavorite: "» Aktuelle Einstellungen zu Favoriten hinzufügen",
					chooseFavorite: "| auswählen: ",
					openFavFilter: "» Favoriten bearbeiten ",
					setActivateMultipleAttacks: "Multiple Attacks ein-/ausblenden: ",
					setAttacksPerVillage: "Angriffe pro Dorf (Hotkey: \"T\" / 0 = unendlich): ",
					hintAttacksPerVillage: "Nach Aktivieren der Multiple Attacks Funktion durch Klicken auf \"Multiple Attacks\" wird die Liste der Ziele durch mehrmaliges Drücken der Taste \"T\" abgearbeitet. Je Ziel wird pro Durchlauf der Liste ein Angriff vorbereitet. Die hier angegebene Wert legt fest, wie oft die Liste durchlaufen wird. Er legt also fest, wie viele Angriffe pro gegnerischem Dorf (falls die eigenen Truppen dies erlauben) laufen sollen (0 = unendlich).",
					setActivateStatsOverview: "Statistiken-Übersicht in den Multiple Attacks aktivieren.",
					hintStatsOverview: "Die Statistiken-Übersicht zeigt dir ständig an, wie viele deiner Dörfer noch den Anforderungen entsprechen, wie viele Ziele du insgesamt hast und aus wie vielen Dörfern insgesamt gefiltert wurde. Wenn nur wenige Ziele vorhanden sind, kann ein Abschalten dieser Funktion eine erhebliche Performance-Steigerung hervorrufen! Bei vergleichsweise vielen Zielen ist der Unterschied im Rechenaufwand ohne Statistiken im Gegensatz zum Aufwand mit Statistiken gering. Dort wird empfohlen die Statistiken eingeschaltet zu lassen, um eine Übersicht über die eigenen Truppen zu gewährleisten.",
					setStatsOverviewMinVillages: "Aktivieren bei Mindestanzahl an Zielen von: ",
					setActivateFilterOnTheFly: "\"On-the-Fly\" Filtern aktivieren: ",
					hintFilterOnTheFly: "Während der Eingabe zeitgleich berechnen lassen, wie viele Dörfer den Anforderungen entsprechen.",
					setFilterOnTheFlySingleDuration: "Maximale Dauer pro Einzelfilter-Berechnung (ms): ",
					setFilterOnTheFlyMultipleDuration: "Maximale Dauer pro Multiple Attack Berechnung (ms): ",
					yourRecentSingleDuration: "Gilt für das allgemeine Filtern mit nur einem Ziel. Liegt die Berechnungszeit über dem hier angegebenen Wert, so wird die \"On-The-Fly\" Filterung erst nach (und nicht während) der Eingabe in ein Feld durchgeführt.\n Der letzte Filterdurchgang benötigte folgende Rechenzeit: ",
					yourRecentMultipleDuration: "Gilt für das Multiple Attacks Filtern von beliebig vielen Zielen. Liegt die Berechnungszeit über dem hier angegebenen Wert, so wird die \"On-The-Fly\" Filterung erst nach (und nicht während) der Eingabe in ein Feld durchgeführt.\n Der letzte Filterdurchgang benötigte folgende Rechenzeit: ",
					noRegisteredMultipleDuration: "Noch keine Multiple Attacks Filterung durchgeführt. Führen sie eine Multiple Attacks Filterung durch, um aussagekräftige Werte zu erhalten. Achtung: Bei mehr Zielen wird die Rechenzeit natürlich zunehmen!",
					setGroup: "Gruppe/n, aus der/denen gefiltert wird: ",
					setArrivalPriority: "Priorität bei Ankunftszeiten: ",
					random: "Zufälliger Eintreffzeitpunkt",
					slowestFirst: 
					{
						text: "» Langsamste Truppen zuerst",
						value: "slowest",
					},
					randomFirst: 
					{
						text: "» Zufällige Reihenfolge",
						value: "random",
					},
					fastestFirst: 
					{
						text: "» Schnellste Truppen zuerst",
						value: "fastest",
					}
				}
			},
			nl:
			{
				buttons:
				{
					start: "van ... Uur",
					end: "tot ... Uur",
					day: "Dag",
					date: "Maand",
					runtime: "Looptijd <img title=\"Voeg automatisch de troepen met eenzelfde, of een snellere, looptijd in.\" src=\"http://de60.die-staemme.de/graphic/unit/att.png?1\"/>",
					target: 'Doel <img title="Laat lijst laatste 6 doelwitten zien" src="http://die-staemme.de/graphic/arrow_down.png?1"/>',
					attack: '<img src="http://de60.die-staemme.de/graphic/unit/att.png?1" title="De ingegeven troepen zullen op de verzamelplaats ingegeven worden. Gebruikte dorpen zullen opgeslagen en weergegeven worden."/>',
					homepage: '<a href="http://www.DownloadCounter.de/counter.pl?file=http://lippfux.bplaced.net/&user=lippfux" target="_blank"><img title="Zur Homepage" src="http://lippfux.bplaced.net/filemanager/Update/update_from_4.2.4.gif"/></a>',
					settings: '<img style="cursor: pointer" title="Performance-Instellingen" src="http://de60.die-staemme.de/graphic/unit/att.png?1"/>',
					deleteFav: "Verwijderen",
					save: "Opslaan",
					filter: "Filteren",
					createLinks: "Bereken aanslagen",
					readIn: "» Eigen dorpen het laatst opgeslagen op: ",
					middleTime: "Centrum",
					spear: "<img src= \"http://die-staemme.de/graphic/unit/unit_spear.png?1\">",
					sword: "<img src= \"http://die-staemme.de/graphic/unit/unit_sword.png?1\">",
					axe: "<img src= \"http://die-staemme.de/graphic/unit/unit_axe.png?1\">",
					archer: "<img src= \"http://die-staemme.de/graphic/unit/unit_archer.png?1\">",
					spy: "<img src= \"http://die-staemme.de/graphic/unit/unit_spy.png?1\">",
					light: "<img src= \"http://die-staemme.de/graphic/unit/unit_light.png?1\">",
					heavy: "<img src= \"http://die-staemme.de/graphic/unit/unit_heavy.png?1\">",
					marcher: "<img src= \"http://die-staemme.de/graphic/unit/unit_marcher.png?1\">",
					ram: "<img src= \"http://die-staemme.de/graphic/unit/unit_ram.png?1\">",
					catapult: "<img src= \"http://die-staemme.de/graphic/unit/unit_catapult.png?1\">",
					knight: "<img src= \"http://die-staemme.de/graphic/unit/unit_knight.png?1\">",
					snob: "<img src= \"http://die-staemme.de/graphic/unit/unit_snob.png?1\">",
					setGroups: "Groep opslaan",
				},
				messages:
				{
					allDataRemoved: "Alle data wordt verwijderd, ook de opgeslagen voorkeuren.",
					addFavFilter: "Filterinstellingen als favoriet opslaan. Favorieten kunnen met een klik opnieuw ingeladen worden. Er kunnen maximaal  favoriete filterinstellingen opgeslagen worden.",
					favSuccesfulAdded: function(favName) { return ("Filter \"" + favName + "\" erfolgreich hinzugefügt");},
					addTargetlistName: "Naam voor doelwittenlijst ingeven: ",
					confirmDeleteTargetList: function(prop) { return ("Wil je de targetlijst \"" + prop + "\" echt verwijderen?");},
					confirmResetStandardTargetList: "Die Standard-Liste kann nicht gelöscht werden. Willst Du diese stattdessen auf 0 zurücksetzen?",
					favFilterName: "Naam voor favoriete filterinstellingen ingeven: ",
					confirmDeleteFavorite: function(prop) { return ("Wil je deze favoriet \"" + prop + "\" echt verwijderen?");},
					attack_help: "De ingegeven troepen zullen op de verzamelplaats ingegeven worden. Gebruikte dorpen zullen opgeslagen en weergegeven worden.",
					remove_used_villages: "Verwijderd de lijst van reeds gebruikte dorpen.",
					last_targets: "De laatste 6 doelwitten:",
					homepage: "Homepage",
					settings: "Instellingen",
					runtime: "Looptijd = ",
					day_s: " Dag(en) ",
					center: "Midden op kaart",
					multipleAttacksFinished: "Alle geplande/mogelijke aanvallen met de huidige instellingen voor de multiple attack modus zijn geopend. Je kunt de instellingen van de multiple attack modus veranderen, of het script een 2e maal gebruiken, om je aanvallen op een andere manier te verzenden, of om extra aanvallen te sturen.",
					multipleSettings: "Instellingen voor Multiple Attacks",
					execMultipleAttacks: "Multiple Attacks",
					planAttack: "» Aanval Uitvoeren",
					resetAttack: "» Nieuwe Aanval Uitvoeren",
					noCoordsInserted: "Geen, of foutieve, coordinaten ingegeven. Bij ieder doel moet een exact coordinatenpaar met de vorm \"xxx|yyy\" staan, anders functioneerd het script niet.",
					troopsDirected: function(count, start, end, runtime, target)
					{
						return ("Alle dorpen (" + count + ") met een aankomst tussen " + start + " en " + end + " uur (met een looptijd van " + runtime + " minuten per veld) met als doel " + target + " zijn gefilterd!");
					},
					troopsDirectedMinimal: function(count) 
					{
						return ("Alle dorpen (" + count + ") met de minimale troepensterkte zijn gefilterd!");
					},
					favFilterAddSucces: "Favoriete filter instellingen opgeslagen",
					asureAddfavFilter: "U heeft 3 favoriete troepenfilters opgeslagen. Als U er nog eentje toevoegd, zal de onderste verwijderd worden",
					noFittingVillage: "Geen van de dorpen voldoet aan de ingegeven vereisten van de filter. De berekening is nu ten einde.",
					readVillagesDeleted: "De dorpenlijst wordt na 24 uur automatisch verwijderd.",
					},
				anything:
				{
					watchTutorial: "Dit is je eerste installatie van het troepen aankomstfilter, daarom wordt je gewezen op de videouitleg. Wil je die direct bekijken?",
					tutorialSingleFilter: "» Uitleg eenvoudig filter",
					tutorialMultipleFilter1: "» Uitleg Multiple Attacks 1/2",
					tutorialMultipleFilter2: "» Uitleg Multiple Attacks 2/2",
					wannaDonate: "Doneren niet mogelijk in NL",
					settings: "» Instellingen",
					allVillages: "alle",
					close: "Sluiten", 
					village: "Dorp",
					place: "Verzamelplaats",
					coordinates: "Coördinaten:",
					sendtroups: "» Troepen sturen",
					addToList: "Aan de aanvalslijst toevoegen",
					deleteFromList: "Uit de aanvalslijst verwijderen",
					myFavorites: "Mijn favorieten",
					myTargetLists: "Opgeslagen lijsten",
					addNewTargetList: "Nieuwe lijst toevoegen",
					changeTargetList: "Doelen: ",
					addNewFavorite: "» Nieuwe favorieten toevoegen",
					addFavorite: "» Huidige instellingen als een favoriet bewaren",
					chooseFavorite: "| laden: ",
					openFavFilter: "» Favorieten bewerken ",
					setActivateMultipleAttacks: "Multiple Attacks venster weergeven: ",
					setAttacksPerVillage: "Aanvallen per dorp (Hotkey: \"T\" / 0 = oneindig): ",
					hintAttacksPerVillage: "Na het activeren van de Multipe Attack Modus door op  \"Aanval uitvoeren\" te drukken worden de aanvallen in nieuwe tabs geopend door op \"T\" te drukken. Per aanslag wordt een aanval op een van de doelwitten geopend in een nieuwe tab. Ieder dorp krijgt, indien mogelijk, het aantal aanvallen dat hier gespecificeerd is (0 = oneindig).",
					setActivateStatsOverview: "Statistiekenvenster bij de Multiple Attack mode activeren.",
					hintStatsOverview: "Met deze optie geactiveerd geeft het script in de multiple attack mode een kader met statistieken weer. In dit kader kun je onder andere het aantal doelen, het aantal dorpen met het geschikte aantal troepen, het aantal dorpen waaruit gefilterd is, en informatie over de snelheid van het script vinden. Activatie ervan maakt het venster waarin je werkt wel breder, maar heeft verder geen invloed op de snelheid van het script. ",
					setStatsOverviewMinVillages: "Aktivieren bei Mindestanzahl an Zielen von: ",
					setActivateFilterOnTheFly: "\"On-the-Fly\" Filteren activeren: ",
					hintFilterOnTheFly: "Bij verandering van de instellingen meteen berekenen hoeveel dorpen aan de nieuwe filterinstellingen voldoen.",
					setFilterOnTheFlySingleDuration: "Maximale duur per filterberekening (ms): ",
					setFilterOnTheFlyMultipleDuration: "Maximale duur per Multiple Attack berekening (ms): ",
					yourRecentSingleDuration: "Geldt voor de algemene filter met een enkel doel. Als de tijd nodig voor het berekenen van de nieuwe looptijden onder dit aantal ligt, dan wordt het 'on the fly' filteren uitgevoerd. Duurt het echter langer als dit aantal milliseconden, dan zal er niet 'on the fly' gefilterd worden. ",
					yourRecentMultipleDuration: "Geldt enkel voor de Multiple Attack modus met meerdere doelen. Als de tijd nodig voor het berekenen van de nieuwe looptijden onder dit aantal ligt, dan wordt het 'on the fly' filteren uitgevoerd. Duurt het echter langer als dit aantal milliseconden, dan zal er niet 'on the fly' gefilterd worden.  ",
					noRegisteredMultipleDuration: "Nog geen Multiple Attacks filtering uitgevoerd. Voer een Multiple Attack filtering door om zinvolle uitkomsten te verkrijgen. Let op: hoe meer doelen, hoe langer de tijd nodig voor de berekeningen!",
					setGroup: "Uit deze groepen worden de aanvallen gefilterd: ",
					setArrivalPriority: "Prioriteit bij selectie aankomsttijden: ",
					random: "Willekeurige aankomsttijden ",
					slowestFirst: 
					{
						text: "» Traagste aanvallen eerst",
						value: "slowest",
					},
					randomFirst: 
					{
						text: "» Willekeurige volgorde",
						value: "random",
					},
					fastestFirst: 
					{
						text: "» Snelste aanvallen eerst",
						value: "fastest",
					}
				}
			}
		}

	}

var server_id;
var server_location;
getServerLang();		
var main_adress;
getServerMainAdress();
if (server_location == 'nl')
{
	var lang = texts.language.nl;
}	
if ((server_location == 'de') || (server_location == 'ch'))
{
	var lang = texts.language.de;
}	
	
var UViHTML = document.URL;
if(UViHTML.match(/[&?](t=\d+)/)) 
{
	var uv = ("&" + RegExp.$1);
}
else
{
	var uv = "";
}
	
function getServerLang() {
	server_id = location.host.split(".")[0];
	server_location = server_id.match(/\D+/);
}

function getServerMainAdress() {
main_adress = location.host.split(".")[1];
}

//Settings abrufen
if (checkExistence(localStorage["tm4rkus_settings"]))
{
	var settings = JSON.parse(localStorage.getItem("tm4rkus_settings"));
	/*if (settings.version != version)
	{
		localStorage.removeItem("tm4rkus_settings");
		localStorage.removeItem("settings_TM4rkuS");
		localStorage.removeItem("tm4rkus_read_villages"+uv);
		localStorage.removeItem("read_villages");
		localStorage.removeItem("read_villages_temp");
		localStorage.removeItem("tm4rkus_multiple_attacks_targets");
		localStorage.removeItem("tm4rkus_recent_villages");
		localStorage.removeItem("tm4rkus_inputs");
		alert(lang.messages.allDataRemoved);
		location.reload();
	}*/
}

//Wenn keine Settings gespeichert sind oder alte gelöscht wurden, neue erstellen
if (!(checkExistence(localStorage["tm4rkus_settings"])))
{
	var settings =
	{
		dragIt: false,
		firstExec: false,
		filterFastestFirst: "fastest",
		filterFromGroup: ["alle"],
		activateMultipleAttacks: true,
		activateStatsOverview: true,
		activateFilterOnTheFly: true,
		activatedFilter: "",
		activatedTargetList: "Standard",
		attacksCount: 
		{
			attacksPerVillage: "3",
		},
		StatsOverview:
		{
			minVillages: "1",
		},
		FilterOnTheFly: 
		{
			singleDuration: "200",
			multipleDuration: "200",
		},
		version: version,
		favFilters: 
		{
		},
		duration: 
		{ 
			build_up: "",
			singleFilter: "",
			multipleFilter: "100",
			total: "",
		},
		singleAttack: 
		{
			settings: {},
			units: {}
		},
		server_runtimes: getServerRuntimes(),
	}	
	localStorage.setItem("tm4rkus_settings",JSON.stringify(settings));
}

var session_settings = 
	{	
		links_added: 0
	};
	
//Eingelesene Dörfer abrufen	
if (checkExistence(localStorage["tm4rkus_read_villages"+uv]))
{
	var read_villages = JSON.parse(localStorage.getItem("tm4rkus_read_villages"+uv));
}
//Wenn keine eingelesenen Dörfer gespeichert sind, neues Objekt erstellen
else
{
	var read_villages = 
	{
		"date": (new Date().getTime()),
	};
	read_villages[lang.anything.allVillages] = {"id": [], "troups": [], "coords":[]};
	localStorage.setItem("tm4rkus_read_villages"+uv, JSON.stringify(read_villages));
}

//Abfragen, ob eingelesene Dörfer länger als 24 Stunden gespeichert sind
if ((read_villages.date + 60*60*24*1000) < new Date().getTime())
{
	localStorage.removeItem("tm4rkus_read_villages");
	read_villages = {};
	localStorage.setItem("tm4rkus_read_villages_deleted", "true");
}
	var read_villages_frac = {};

//Abfragen, ob Ziel-Listen gespeichert sind
if (checkExistence(localStorage["tm4rkus_multiple_attacks_targets"]))
	{
		var multiple_attacks_target_lists = JSON.parse(localStorage.getItem("tm4rkus_multiple_attacks_targets"));
		
		if(!checkExistence(multiple_attacks_target_lists[settings.activatedTargetList]))
		{
			multiple_attacks_target_lists[settings.activatedTargetList] = [];
			localStorage.setItem("tm4rkus_multiple_attacks_targets", JSON.stringify(multiple_attacks_target_lists));
		}
			
	}
//Wenn keine Ziel-Listen gespeichert sind, neue Ziel-Listen anlegen, mit leerem Eintrag für die aktivierte Ziel-Liste
else
	{
		var multiple_attacks_target_lists = {};
		multiple_attacks_target_lists[settings.activatedTargetList] = [];
		localStorage.setItem("tm4rkus_multiple_attacks_targets", JSON.stringify(multiple_attacks_target_lists));
	}

function propCount(obj) {

	var count = 0;
	for (var prop in obj)
	{
		count++;
	}
	return count;
}

function checkExistence(object) {
	if (navigator.userAgent.indexOf("Opera") != -1)
	{
		if ((typeof(object) != "undefined") && (typeof(object) != undefined))
		{
			return true;
		}
		else 
			return false;
	}
	else if (navigator.userAgent.indexOf("Firefox") != -1)
	{
		if (object != null)
			return true;
		else
			return false;
	}
}

var set_listener_groupsTable = false;
var set_listener_setGroups = false;


//functions 

//other functions
function initiateDragDrop(e) {
	{
		var evt = e || window.event;
		
		obj = document.getElementById("TM4rkuS_Settings");
		startX = parseInt(evt.clientX);
		startY = parseInt(evt.clientY); 
		rect = obj.getElementsByTagName("div")[0].getBoundingClientRect();
		relTop = ((rect.top) - startY + window.pageYOffset);
		relLeft = ((rect.left) - startX + window.pageXOffset);
		settings.dragIt = true;
		
		//obj.style.top = parseInt(startY) + 'px';
		//obj.style.left = parseInt(startX) + 'px'; 
	   
		return false;            
	}
}

function dragDrop(e) {

	var body = document.getElementsByTagName("body")[0];
	obj = document.getElementById("TM4rkuS_Settings");
	obj.getElementsByTagName("div")[0].style.cursor = "pointer";
    // only drag when the mouse is down
	if (settings.dragIt == true)
	{
	//if(window.gecko){this.lab.setStyle("MozUserSelect","none");}
	var evt = e || window.event;
    obj.style.top = (relTop + parseInt(evt.clientY)) + 'px';
    obj.style.left = (relLeft + parseInt(evt.clientX)) + 'px';
	}
}

function endDragDrop(e){
    settings.dragIt = false;
}

//Option zu einer Dropdown-Liste hinzufügen
function addDropdownOption(dropdown, name, addinnerHTML, select)
{
	var field = document.createElement("option");
	field.innerHTML = name + addinnerHTML;
	field.value = name;
	dropdown.appendChild(field);
	field.selected = select;
}

function selectTargetList(element) {
	var time1 = new Date().getTime();
	settings.activatedTargetList = element.options[element.selectedIndex].value;
	var targetList = settings.activatedTargetList;
	var coordlist = document.getElementById("TM4rkuS_coordlist");
	if (multiple_attacks_target_lists[targetList].length > 0)
	{
		var list =  multiple_attacks_target_lists[targetList][0];
		for (var i = 1; i <  multiple_attacks_target_lists[targetList].length; i++)
		{
			list += "\r\n" +  multiple_attacks_target_lists[targetList][i];
		}
		coordlist.value = list;
	}
	else
	{
		coordlist.value = "";
	}
	localStorage.setItem("tm4rkus_settings",JSON.stringify(settings));
	
	if(document.getElementById("exec_Multiple_Attacks").style.display == "none")
	{	
		document.getElementById("reset_Multiple_Attacks").click();
		document.getElementById("exec_Multiple_Attacks").click();
	}
}

function selectFavorite(element) {
	settings.activatedFilter = element.options[element.selectedIndex].value;
	var favorite = settings.activatedFilter;
	for (var prop in settings.favFilters[favorite])
		{
			if (prop == "target")
			{
				continue;
			}
			var inputfield = document.getElementById(prop);
			inputfield.value = settings.favFilters[favorite][prop];
		}
	
	localStorage.setItem("tm4rkus_settings",JSON.stringify(settings));
	save();
	filter();
}

function selectGroup(obj) {

	if(!obj || obj.id == undefined)
	obj = this;
	
	var cell = obj.parentNode;
	settings.filterFromGroup = [];
	for (var i = 0; i < cell.getElementsByTagName("select").length; i++)
	{
	var dropdown = cell.getElementsByTagName("select")[i];
	settings.filterFromGroup.push(dropdown.options[dropdown.selectedIndex].value);
	}
	localStorage.setItem("tm4rkus_settings",JSON.stringify(settings));
	if(document.getElementById("exec_Multiple_Attacks").style.display == "none")
	{
		read_villages_frac = {"id":[], "coords":[], "troups":[]};
		for (var x = 0; x < settings.filterFromGroup.length; x++)
		{
			for (var i = 0; i < read_villages[settings.filterFromGroup[x]].id.length; i++)
			{
				if (!contains(read_villages_frac.id, read_villages[settings.filterFromGroup[x]].id[i]))
				{
					read_villages_frac.id.push(read_villages[settings.filterFromGroup[x]].id[i]);
					read_villages_frac.coords.push(read_villages[settings.filterFromGroup[x]].coords[i]);
					read_villages_frac.troups.push(read_villages[settings.filterFromGroup[x]].troups[i]);
				}
			}
		}
		multipleAttacks(obj);
	}
}

function addAddButton(element, coords) {
	if (!coords)
	{
		coords = element.textContent;
	}
	
	var add_to_list = element.appendChild(document.createElement("img"));
	add_to_list.src = "http://lippfux.bplaced.net/filemanager/Beta/add_to_list3.png";
	add_to_list.addEventListener('click', function () 
		{
			multiple_attacks_target_lists[settings.activatedTargetList].push(coords);
			localStorage.setItem("tm4rkus_multiple_attacks_targets",JSON.stringify( multiple_attacks_target_lists));
			addDeleteButton(this.parentNode, coords)
			this.parentNode.removeChild(this);
		}, false);
}

function addDeleteButton(element, coords) {
		if (!coords)
	{
		coords = element.textContent;
	}
	
	var delete_from_list = element.appendChild(document.createElement("img"));
	delete_from_list.src = "http://lippfux.bplaced.net/filemanager/Beta/delete_from_list2.png";
	delete_from_list.addEventListener('click', function () 
		{
			multiple_attacks_target_lists = JSON.parse(localStorage.getItem("tm4rkus_multiple_attacks_targets"));
			settings = JSON.parse(localStorage.getItem("tm4rkus_settings"));
			multiple_attacks_target_lists[settings.activatedTargetList].splice(contains( multiple_attacks_target_lists[settings.activatedTargetList], coords)-1,1);
			localStorage.setItem("tm4rkus_multiple_attacks_targets",JSON.stringify( multiple_attacks_target_lists));
			addAddButton(this.parentNode, coords)
			this.parentNode.removeChild(this);
		}, false);

}

		
function contains(array, obj) {

	if (checkExistence(array))
	{
		var i = array.length;
		while (i--) 
		{
			if (array[i] == obj) {
				return (i+1);
			}
		}
	}
	return false;
}


//create Settings
function createSettings(param) {
	
	var body = document.getElementsByTagName("body")[0];

	//Div-Container erstellen um Hintergrund zu verdunkeln
	var div_Dark_Background = document.createElement("div");
	var ddb = div_Dark_Background;
	ddb.id = "TM4rkuS_divDarkBackground";
	ddb.style.position = "absolute";
	ddb.style.left = "0px";
	ddb.style.top = "0px";
	
	var height = document.body.offsetHeight;
	if (window.outerHeight > height)
	{
		height = window.outerHeight;
	}
	var width = document.body.offsetWidth;
	if (window.outerWidth > width)
	{
		weight = window.outerWidth;
	}
	
	ddb.style.width = Math.round(width) + "px";
	ddb.style.height = Math.round(height) + "px";
	ddb.style.backgroundImage = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sHBwwyN8cNqv8AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAAHUlEQVQ4y2NkYGDIZqAAMDFQCEYNGDVg1IDBYgAA9iMAiyvdyIYAAAAASUVORK5CYII=")';
	ddb.style.display = "none";
	body.appendChild(ddb);
	
	//Div-Container für Settings erstellen	
	var div_Settings = document.createElement("div");
	div_Settings.id = "TM4rkuS_Settings";
	div_Settings.style.position = "absolute";
	div_Settings.style.backgroundColor = "#f4e4bc";
	div_Settings.style.border = "1px solid #804000";
	div_Settings.style.textAlign = "left";
	div_Settings.style.fontWeight = "400";
	div_Settings.style.left = Math.round(window.outerWidth/2 - 250) + "px";
	div_Settings.style.top = Math.round(window.outerHeight/2) + "px";
	div_Settings.style.display = "none";
	
	
	//Schließen-Zeile erstellen
	var div_Settings_Close = document.createElement("div");
	var dsc = div_Settings_Close;
	dsc.style.height = "16px";
	dsc.style.backgroundImage = 'url("http://de60.die-staemme.de/graphic/screen/tableheader_bg3.png")';
	dsc.style.textAlign = "right";


	//Drag and Drop
	dsc.addEventListener("mousedown", initiateDragDrop, false);
	document.addEventListener("mousemove", dragDrop, false);
	document.addEventListener("mouseup", endDragDrop, false);


	//Schließen-Link erstellen
	var close = document.createElement("a");
	close.text = lang.anything.close
	close.addEventListener("click", function() 
		{
		this.parentNode.parentNode.style.display = "none"; 
		document.getElementById("TM4rkuS_divDarkBackground").style.display = "none";
		settingTabs.MultipleAttacks();
		}, false);
	dsc.appendChild(close);
	div_Settings.appendChild(dsc);

	
	
	


	var tabs = div_Settings.appendChild(document.createElement("table"));
	
	///// Feststellen, ob Gruppe aus der gefiltert werden soll noch existiert \\\\\
	
	// Namen der eingelesenen Gruppen auslesen
	var groups = new Array();
	for(var prop in read_villages)
	{
		if (prop == "date" || prop == lang.anything.allVillages) //Datenfeld "date" und lang.anything.allVillages ausklammern
		continue; // sofort neuer Durchlauf der Schleife
		groups.push(prop);
	}
	
	var tab_multiple_Attacks = tabs.appendChild(document.createElement("th"));
	var tma = tab_multiple_Attacks;
	tma.innerHTML = "Multiple Attacks ";
	tma.style.cursor = "pointer";
	tma.addEventListener("click", settingTabs.MultipleAttacks, false);
	
	var tab_performance = tabs.appendChild(document.createElement("th"));
	var tp = tab_performance;
	tp.innerHTML = "Performance ";
	tp.style.cursor = "pointer";
	tp.addEventListener("click", settingTabs.Performance, false);

	var tab_favorites = tabs.appendChild(document.createElement("th"));
	var tf = tab_favorites;
	tf.innerHTML = "Favorites ";
	tf.style.cursor = "pointer";
	tf.addEventListener("click", settingTabs.Favorites, false);
	
	var tab_youtube = tabs.appendChild(document.createElement("th"));
	var ty = tab_youtube;
	ty.innerHTML = "Youtube Tutorial";
	ty.style.cursor = "pointer";
	ty.addEventListener("click", settingTabs.Youtube, false);
	
	body.appendChild(div_Settings);

	
	
	//*************** Inhalt erstellen ************//
	//*********************************************//
	param;
}

var settingTabs = 
	{	
		SettingsToNewSize: function()
		{
			var div_Settings = document.getElementById("TM4rkuS_Settings");
			var rect = div_Settings.getBoundingClientRect();
			
			if(document.getElementById("TM4rkuS_donate"))
			document.getElementById("TM4rkuS_donate").parentNode.removeChild(document.getElementById("TM4rkuS_donate"))
			
			/* Doneermogelijkheden uitgeschakeld. De originele maker kan contact opnemen om gegevens te controleren.
			var donate = document.createElement("table");
			donate.style.width = (rect.right-rect.left-2)+"px";
			donate.style.marginTop = "20px";
			donate.id = "TM4rkuS_donate";
			var row = donate.appendChild(document.createElement("td"));
			var thead = row.appendChild(document.createElement("td"));
			thead.innerHTML = lang.anything.wannaDonate;
			var row = donate.appendChild(document.createElement("tr"));
			var tbody = row.appendChild(document.createElement("td"));
			var cell = tbody.appendChild(document.createElement("td"));
			cell.style.border = "1px solid #804000";
			cell.innerHTML = lang.anything.viaPaypal;
			var cell = tbody.appendChild(document.createElement("td"));
			cell.style.border = "1px solid #804000";
			cell.innerHTML = lang.anything.viaPremium;*/
			var donate = document.createElement("div");
			donate.innerHTML = "<br/><br/>";
			div_Settings.appendChild(donate);
			
			
			div_Settings.style.left = Math.round(window.outerWidth/2 - (rect.right-rect.left)/2) + "px";
			div_Settings.style.top = Math.round(window.outerHeight/2 - (rect.bottom-rect.top)/2) + "px";
		},
		Youtube: function()
		{
			//Vorherige Tabelle löschen
			if (document.getElementById("settingsTable"))
			document.getElementById("settingsTable").parentNode.removeChild(document.getElementById("settingsTable"));
			if(document.getElementById("TM4rkuS_donate"))
			document.getElementById("TM4rkuS_donate").parentNode.removeChild(document.getElementById("TM4rkuS_donate"))
			//Tabelle
			var settingsTable = document.createElement("table");
			settingsTable.id = "settingsTable";
			
			var videos = settingsTable.appendChild(document.createElement("td"));
			var link1 = videos.appendChild(document.createElement("a"));
			link1.text = lang.anything.tutorialSingleFilter;
			link1.style.cursor = "pointer";
			link1.addEventListener("click", function() 
			{ 
			document.getElementById("TM4rkuS_Youtube").getElementsByTagName("iframe")[0].src = "http://www.youtube.com/embed/xQYnTcKBRFg?rel=0&amp;hd=1";
			}, false);
			videos.appendChild(document.createElement("tr"));
			var link2 = videos.appendChild(document.createElement("a"));
			link2.text = lang.anything.tutorialMultipleFilter1;
			link2.style.cursor = "pointer";
			link2.addEventListener("click", function() 
			{ 
			document.getElementById("TM4rkuS_Youtube").getElementsByTagName("iframe")[0].src = "http://www.youtube.com/embed/Hys_cMrhJiQ?rel=0&amp;hd=1";
			}, false);
			videos.appendChild(document.createElement("tr"));
			var link3 = videos.appendChild(document.createElement("a"));
			link3.text = lang.anything.tutorialMultipleFilter2;
			link3.style.cursor = "pointer";
			link3.addEventListener("click", function() 
			{ 
			document.getElementById("TM4rkuS_Youtube").getElementsByTagName("iframe")[0].src = "http://www.youtube.com/embed/q8zY1kPlYH0?rel=0&amp;hd=1";
			}, false);
			settingsTable.appendChild(document.createElement("tr"));
			var youtube = settingsTable.appendChild(document.createElement("td"));
			youtube.id = "TM4rkuS_Youtube";
			youtube.innerHTML = '<iframe width="640" height="510" src="http://www.youtube.com/embed/xQYnTcKBRFg?rel=0&amp;hd=1" frameborder="0" allowfullscreen></iframe>';
			
			//Settings anzeigen
			var div_Settings = document.getElementById("TM4rkuS_Settings");
			div_Settings.appendChild(settingsTable);
			
			settingTabs.SettingsToNewSize();
		},
		MultipleAttacks: function()
		{
			//Vorherige Tabelle löschen
			if (document.getElementById("settingsTable"))
			document.getElementById("settingsTable").parentNode.removeChild(document.getElementById("settingsTable"));
			//Tabelle
			var settingsTable = document.createElement("table");
			settingsTable.id = "settingsTable";
			
			//Multiple Attacks aktivieren?
			var activateMultipleAttacks = document.createElement("input");
			var ama = activateMultipleAttacks;
			ama.type = "checkbox";
			ama.checked = settings.activateMultipleAttacks;
			ama.addEventListener('click', function() 
				{ 	
					settings.activateMultipleAttacks = this.checked;
					for (var i = 0; i < settings.filterFromGroup.length; i++)
					{
					document.getElementById("TM4rkuS_dropdown_Groups#"+i).disabled = (!this.checked);
					}
					document.getElementById("TM4rkuS_dropdown_fastestOrSlowest").disabled = (!this.checked);
					
					if (this.checked) 
					document.getElementById("TM4rkuS_multiple_Attacks").style.display = "";
					else 
					document.getElementById("TM4rkuS_multiple_Attacks").style.display = "none"; 

					localStorage.setItem("tm4rkus_settings",JSON.stringify(settings));
				}, false);

			var row = document.createElement("tr");
			var cell = row.appendChild(document.createElement("td"));
			cell.style.fontWeight = "700";
			cell.innerHTML = lang.anything.setActivateMultipleAttacks;
			var cell = row.appendChild(document.createElement("td"));
			cell.appendChild(ama);
			settingsTable.appendChild(row);
			var row = document.createElement("tr");
			var cell = row.appendChild(document.createElement("td"));
			cell.innerHTML = lang.anything.setGroup;
			cell.style.paddingTop = "5px";
			cell.style.paddingBottom = "5px";
			var cell = row.appendChild(document.createElement("td"));
			cell.style.paddingBottom = "5px";
			cell.style.paddingTop = "5px";

			
			// Dropdownfeld für die Gruppen erstellen
			for (var i = 0; i < settings.filterFromGroup.length; i++)
			{
				var dropdownGroups = document.createElement("select");
				dropdownGroups.disabled = (!settings.activateMultipleAttacks);
				dropdownGroups.id = "TM4rkuS_dropdown_Groups#"+i;
				dropdownGroups.addEventListener('change', selectGroup, false);
				var groups = new Array();
				
				
				// Namen der eingelesenen Gruppen auslesen
				for(var prop in read_villages)
				{
					if (prop == "date" || prop == lang.anything.allVillages) //Datenfeld "date" und lang.anything.allVillages ausklammern
					continue; // sofort neuer Durchlauf der Schleife
					groups.push(prop);
				} 
				
				// Gruppen in alphabetischer Reihenfolge sortieren
				groups.sort();
				
				// Dropdown-Inputfelder erstellen.
				for (var x = 0; x <= groups.length-1; x++)
				{
					addDropdownOption(dropdownGroups, groups[x], " (" + (read_villages[groups[x]].id.length) + ")", false);
				}
				
				// Gruppe lang.anything.allVillages ans Ende setzen
				addDropdownOption(dropdownGroups, lang.anything.allVillages, " (" + (read_villages[lang.anything.allVillages].id.length) + ")", false);
				
				dropdownGroups.value = settings.filterFromGroup[i];
				cell.appendChild(dropdownGroups);
				
				if (i == 0)
				{
				var addDropdownGroups = document.createElement("img");
				addDropdownGroups.src = "http://www.gpsvisualizer.com/google_maps/icons/cross/green.png";
				addDropdownGroups.style.paddingLeft = "3px";
				addDropdownGroups.style.verticalAlign = "middle";
				addDropdownGroups.addEventListener("click", function()
					{
						var cell = this.parentNode;
						var groups = new Array();
						// Namen der eingelesenen Gruppen auslesen
						for(var prop in read_villages)
						{
							if (prop == "date" || prop == lang.anything.allVillages) //Datenfeld "date" und lang.anything.allVillages ausklammern
							continue; // sofort neuer Durchlauf der Schleife
							groups.push(prop);
						} 
						
						var i = cell.getElementsByTagName("select").length;
						if (i <= groups.length)
						{
							cell.appendChild(document.createElement("tr"));
							var dropdownGroups = cell.appendChild(document.createElement("select"));
							dropdownGroups.id = "TM4rkuS_dropdown_Groups#"+i;
							dropdownGroups.addEventListener('change', selectGroup, false);
							
							// Gruppen in alphabetischer Reihenfolge sortieren
							groups.sort();
							
							// Dropdown-Inputfelder erstellen.
							for (var x = 0; x <= groups.length-1; x++)
							{
								addDropdownOption(dropdownGroups, groups[x], " (" + (read_villages[groups[x]].id.length) + ")", false);
							}
							
							// Gruppe lang.anything.allVillages ans Ende setzen
							addDropdownOption(dropdownGroups, lang.anything.allVillages, " (" + (read_villages[lang.anything.allVillages].id.length) + ")", false);
							settings.filterFromGroup.push(dropdownGroups.value);
							localStorage.setItem("tm4rkus_settings", JSON.stringify(settings));
							
							var deleteDropdownGroups = document.createElement("img");
							deleteDropdownGroups.src = "http://lippfux.bplaced.net/pics/delete_target_list.png";
							deleteDropdownGroups.style.paddingLeft = "3px";
							deleteDropdownGroups.style.verticalAlign = "middle";
							deleteDropdownGroups.addEventListener("click", function()
							{
								var dropdown = this.previousSibling;
								settings.filterFromGroup.splice((contain(settings.filterFromGroup, dropdown.value)-1),1);
								localStorage.setItem("tm4rkus_settings", JSON.stringify(settings));
								this.parentNode.removeChild(this.previousSibling); //dropdown
								selectGroup(this);
								this.parentNode.removeChild(this.previousSibling);
								this.parentNode.removeChild(this);
								
							}, false);
							cell.appendChild(deleteDropdownGroups);
						}
					}, false);
					
					cell.appendChild(addDropdownGroups);
				}
				else
				{
					var deleteDropdownGroups = document.createElement("img");
					deleteDropdownGroups.src = "http://lippfux.bplaced.net/pics/delete_target_list.png";
					deleteDropdownGroups.style.paddingLeft = "3px";
					deleteDropdownGroups.style.verticalAlign = "middle";
					deleteDropdownGroups.addEventListener("click", function()
					{
						var dropdown = this.previousSibling;
						settings.filterFromGroup.splice((contain(settings.filterFromGroup, dropdown.value)-1),1);
						localStorage.setItem("tm4rkus_settings", JSON.stringify(settings));
						this.parentNode.removeChild(this.previousSibling); //dropdown
						selectGroup(this);
						this.parentNode.removeChild(this.previousSibling);
						this.parentNode.removeChild(this);
								
					}, false);
					cell.appendChild(deleteDropdownGroups);
				}
				
				if(i != settings.filterFromGroup.length-1)
				{
					cell.appendChild(document.createElement("tr"));
				}
			}
			
			settingsTable.appendChild(row);
			

			//Priorität bei Ankunftszeiten setzen
			var fastestOrSlowest = document.createElement("select");
			fastestOrSlowest.id = "TM4rkuS_dropdown_fastestOrSlowest";
			fastestOrSlowest.disabled = (!settings.activateMultipleAttacks);
			fastestOrSlowest.addEventListener('change', function() 
				{
					settings.filterFastestFirst = this.value; 
					localStorage.setItem("tm4rkus_settings", JSON.stringify(settings)); 
					if(document.getElementById("exec_Multiple_Attacks").style.display == "none")
					{
						multipleAttacks(this);
					}
				}, false);

			var titles = [lang.anything.fastestFirst, lang.anything.randomFirst, lang.anything.slowestFirst];
			
			for (var i = 0; i <= titles.length-1; i++)
			{
			var option = document.createElement("option");
			option.innerHTML = titles[i].text;
			option.value = titles[i].value;
			if (titles[i].value == settings.filterFastestFirst)
			option.selected = true;
			fastestOrSlowest.appendChild(option);
			}
			var row = document.createElement("tr");
			var cell = row.appendChild(document.createElement("td"));
			cell.innerHTML = lang.anything.setArrivalPriority;
			var cell = row.appendChild(document.createElement("td"));
			cell.appendChild(fastestOrSlowest);
			settingsTable.appendChild(row);
			
			//Zielgruppen auswählen/bearbeiten		
			var myTargets_table = document.createElement("table");
			var mtt = myTargets_table;
			mtt.id = "TM4rkuS_My_Targets";
			
			//Zeilen für bisher gespeicherte Favoriten erstellen
			for (var prop in multiple_attacks_target_lists)
			{
				var row = mtt.appendChild(document.createElement("tr"));
				var name = row.appendChild(document.createElement("td"));
				name.style.border = "1px solid #804000";
				name.style.textAlign = "center";
				name.text = prop;
			}			
			
			var multipleAttacksAttacksCount = document.createElement("input");
			var maac = multipleAttacksAttacksCount;
			maac.id = "TM4rkuS_Multiple_Attacks_Attacks_Count";
			maac.size = 3;
			maac.value = settings.attacksCount.attacksPerVillage;
			maac.disabled = !settings.activateStatsOverview;
			maac.addEventListener("blur", function() 
				{
				settings.attacksCount.attacksPerVillage = this.value;
				localStorage.setItem("tm4rkus_settings",JSON.stringify(settings));
				}, false);
				
			var row = document.createElement("tr");
			var cell = row.appendChild(document.createElement("td"));
			cell.innerHTML = lang.anything.setAttacksPerVillage;
			cell.title = lang.anything.hintAttacksPerVillage;
			var cell = row.appendChild(document.createElement("td"));
			cell.appendChild(maac);
			settingsTable.appendChild(row);
			
			settingsTable.appendChild(document.createElement("hr"));
			
			var myTargetLists = document.createElement("h3");
			var mtl = myTargetLists;
			mtl.id = "TM4rkuS_My_Favorites";
			mtl.href = "javascript:;";
			mtl.innerHTML = lang.anything.myTargetLists;
			
			settingsTable.appendChild(mtl);
			
			var myTargetListTable_div = document.createElement("div");
			var mtltd = myTargetListTable_div;
			mtltd.style.overflow = "auto";
			var myTargetListTable = myTargetListTable_div.appendChild(document.createElement("table"));
			var mtlt = myTargetListTable;
			mtlt.id = "TM4rkuS_My_TargetLists";
			if (JSON.stringify(multiple_attacks_target_lists) == "{}")
			{
				multiple_attacks_target_lists["Standard"] = [];
				localStorage.setItem("tm4rkus_multiple_attacks_targets", JSON.stringify(multiple_attacks_target_lists));
				addDropdownOption(document.getElementById("TM4rkuS_change_target_list_dropdown"),"Standard","",true);
			}

			
			//Zeilen für bisher gespeicherte Ziel-Listen erstellen
			for (var prop in multiple_attacks_target_lists)
			{
				var row = mtlt.appendChild(document.createElement("tr"));
				var name = row.appendChild(document.createElement("td"));
				name.style.border = "1px solid #804000";
				name.style.textAlign = "center";
				name.style.verticalAlign = "center";
				
				var activateTargetList = name.appendChild(document.createElement("a"));
				activateTargetList.text = "» " + prop + " (" + multiple_attacks_target_lists[prop].length + ")";
				activateTargetList.style.margin = "2px";
				activateTargetList.style.verticalAlign = "center";
				activateTargetList.id = "TM4rkuS_TargetList:"+prop;
				activateTargetList.addEventListener("click", function() 
				{
					settings.activatedTargetList = this.id.split("TM4rkuS_TargetList:")[1];
					
					document.getElementById("TM4rkuS_change_target_list_dropdown").value = settings.activatedTargetList;					
					var coordlist = "";
					if (multiple_attacks_target_lists[settings.activatedTargetList].length > 0)
						{
							coordlist = multiple_attacks_target_lists[settings.activatedTargetList][0]
							for (var i = 1; i < multiple_attacks_target_lists[settings.activatedTargetList].length; i++)
							{
								coordlist += "\r\n" + multiple_attacks_target_lists[settings.activatedTargetList][i];
							}
						}
					document.getElementById("TM4rkuS_coordlist").value = coordlist;
					document.getElementById("TM4rkuS_Settings").style.display = "none";
					document.getElementById("TM4rkuS_divDarkBackground").style.display = "none";
				}, false);				
				var targetList_cell = row.appendChild(document.createElement("td"));
				var targetList = targetList_cell.appendChild(document.createElement("textarea"));
				targetList.style.width = "90px";
				targetList.style.height = "48px";
				targetList.id = "TM4rkuS_TargetListTextarea:"+prop;
				if (multiple_attacks_target_lists[prop].length > 0)
				{
					var list = multiple_attacks_target_lists[prop][0];
				
					for (var i = 1; i < multiple_attacks_target_lists[prop].length; i++)
					{
						list += "\r\n" + multiple_attacks_target_lists[prop][i];
					}
				targetList.value = list;
				}
				
				
				//Speicher-Button erstellen um Ziel-Listen im Nachhinein zu ändern
				var save_delete = row.appendChild(document.createElement("td"));
				save_delete.style.border = "1px solid #804000";
				
				var saveButton = save_delete.appendChild(document.createElement("input"));
				saveButton.type = "button";
				saveButton.style.marginTop = "2px";
				saveButton.style.marginLeft = "2px";
				saveButton.style.marginRight = "2px";
				saveButton.id = "save_edited_"+prop;
				saveButton.value = lang.buttons.save;
				saveButton.addEventListener('click', function() 
				{
					//Geänderte Ziel-Liste speichern
					var list_name = this.id.split("save_edited_")[1];
					multiple_attacks_target_lists[list_name] = document.getElementById("TM4rkuS_TargetListTextarea:"+list_name).value.replace(/\r/g, "").replace(" ", "").split(/\n/);
					
					if (multiple_attacks_target_lists[list_name] == "")
					{
						multiple_attacks_target_lists[list_name] = [];
					}
					localStorage.setItem("tm4rkus_multiple_attacks_targets",JSON.stringify(multiple_attacks_target_lists));
					document.getElementById("TM4rkuS_TargetList:"+list_name).text =  "» " + list_name + " (" + multiple_attacks_target_lists[list_name].length + ")"
					//settingTabs.MultipleAttacks();
				}, false);
				
				//Löschen-Button erstellen um Favoriten zu löschen
				save_delete.appendChild(document.createElement("tr"));
				var deleteButton = save_delete.appendChild(document.createElement("input"));
				deleteButton.type = "button";
				deleteButton.style.marginBottom = "2px";
				deleteButton.style.marginLeft = "2px";
				deleteButton.style.marginRight = "2px";
				deleteButton.id = "delete_"+prop;
				deleteButton.value = lang.buttons.deleteFav;
				deleteButton.addEventListener("click", function()
				{
					var prop = this.id.split("delete_")[1];
					
					if (confirm(lang.messages.confirmDeleteTargetList(prop)))
						{
							delete(multiple_attacks_target_lists[prop]);
							if (settings.activatedTargetList == prop)
							{
								settings.activatedTargetList = "Standard";
								localStorage.setItem("tm4rkus_settings", JSON.stringify(settings));
							}
							var options = document.getElementById("TM4rkuS_change_target_list_dropdown").getElementsByTagName("option");
							for (var i = 0; i < options.length; i++)
							{
								if (options[i].value == prop)
								{
									document.getElementById("TM4rkuS_change_target_list_dropdown").removeChild(options[i]);
								}
							}
							localStorage.setItem("tm4rkus_multiple_attacks_targets", JSON.stringify(multiple_attacks_target_lists));
							settingTabs.MultipleAttacks();
						}
				}, false);
				
			}
				
			mtltd.style.maxHeight = "800px";
			settingsTable.appendChild(mtltd);
			
			var addNewTargetList = document.createElement("a");
			var antl = addNewTargetList;
			antl.text = "» " + lang.anything.addNewTargetList;
			antl.addEventListener("click", function() 
			{
				var name = prompt(lang.messages.addTargetlistName, "");
				if(name)
				{
				multiple_attacks_target_lists[name] = [];
				localStorage.setItem("tm4rkus_multiple_attacks_targets", JSON.stringify(multiple_attacks_target_lists));
				addDropdownOption(document.getElementById("TM4rkuS_change_target_list_dropdown"), name, "", false);
				settingTabs.MultipleAttacks();
				};
			}, false);
			
			settingsTable.appendChild(antl);
		
			
			
			
			
			
			//Settings anzeigen
			var div_Settings = document.getElementById("TM4rkuS_Settings");
			div_Settings.appendChild(settingsTable);
			settingTabs.SettingsToNewSize();
		},
		Performance: function()
		{
			//Vorherige Tabelle löschen
			if (document.getElementById("settingsTable"))
			document.getElementById("settingsTable").parentNode.removeChild(document.getElementById("settingsTable"));
			//Tabelle
			var settingsTable = document.createElement("table");
			settingsTable.id = "settingsTable";
			
			//On-The-Fly Filter aktivieren?
			var activateFilterOnTheFly = document.createElement("input");
			var afotf = activateFilterOnTheFly;
			afotf.type = "checkbox";
			afotf.checked = settings.activateFilterOnTheFly;
			afotf.addEventListener('click', function() 
				{ 
					settings.activateFilterOnTheFly = this.checked;
					document.getElementById("TM4rkuS_Filter_On_The_Fly_Duration").disabled = (!this.checked);
					if (this.checked) 
					{
					settings.FilterOnTheFly.singleDuration = document.getElementById("TM4rkuS_Filter_On_The_Fly_Duration").value;
					}
					else 
					{
					document.getElementById("filterButton").text = lang.buttons.filter;
					}

					localStorage.setItem("tm4rkus_settings",JSON.stringify(settings));
				}, false);
				
			//Single Attack Filter
			var row = document.createElement("tr");
			var cell = row.appendChild(document.createElement("td"));
			cell.style.fontWeight = "700";
			cell.innerHTML = lang.anything.setActivateFilterOnTheFly;
			cell.title = lang.anything.hintFilterOnTheFly;
			var cell = row.appendChild(document.createElement("td"));
			cell.appendChild(afotf);
			settingsTable.appendChild(row);
			
			var onTheFlySingleDuration = document.createElement("input");
			var otfsd = onTheFlySingleDuration;
			otfsd.id = "TM4rkuS_Filter_On_The_Fly_Single_Duration";
			otfsd.size = 3;
			otfsd.value = settings.FilterOnTheFly.singleDuration;
			otfsd.disabled = (!settings.activateFilterOnTheFly);
			otfsd.addEventListener("blur", function() 
				{
				settings.FilterOnTheFly.singleDuration = this.value;
				localStorage.setItem("tm4rkus_settings",JSON.stringify(settings));
				}, false);
			
			
			var row = document.createElement("tr");
			var cell = row.appendChild(document.createElement("td"));
			cell.innerHTML = lang.anything.setFilterOnTheFlySingleDuration;
			cell.title = lang.anything.yourRecentSingleDuration + settings.duration.singleFilter + "ms";
			var cell = row.appendChild(document.createElement("td"));
			cell.appendChild(otfsd);
			settingsTable.appendChild(row);
			
			//Multiple Attack Filter
			var onTheFlyMultipleDuration = document.createElement("input");
			var otfmd = onTheFlyMultipleDuration;
			otfmd.id = "TM4rkuS_Filter_On_The_Fly_Multiple_Duration";
			otfmd.size = 3;
			otfmd.value = settings.FilterOnTheFly.multipleDuration;
			otfmd.disabled = (!settings.activateFilterOnTheFly);
			otfmd.addEventListener("blur", function() 
				{
				settings.FilterOnTheFly.multipleDuration = this.value;
				localStorage.setItem("tm4rkus_settings",JSON.stringify(settings));
				}, false);
			
			var row = document.createElement("tr");
			var cell = row.appendChild(document.createElement("td"));
			cell.innerHTML = lang.anything.setFilterOnTheFlyMultipleDuration;
			cell.title = lang.anything.yourRecentMultipleDuration + settings.duration.multipleFilter + "ms";
			
			var cell = row.appendChild(document.createElement("td"));
			cell.appendChild(otfmd);
			settingsTable.appendChild(row);
			
			settingsTable.appendChild(document.createElement("hr"));

			//Stats-Anzeige aktivieren?
			var activateStatsOverview = document.createElement("input");
			var aso = activateStatsOverview;
			aso.type = "checkbox";
			aso.checked = settings.activateStatsOverview;
			aso.addEventListener('click', function() 
				{
					settings.activateStatsOverview = this.checked;
					document.getElementById("tm4rkus_multiple_attacks_targets_Count").disabled = !this.checked;
					localStorage.setItem("tm4rkus_settings",JSON.stringify(settings));
				}, false);
				
			var row = document.createElement("tr");
			var cell = row.appendChild(document.createElement("td"));
			cell.style.fontWeight = "700";
			cell.innerHTML = lang.anything.setActivateStatsOverview;
			cell.title = lang.anything.hintStatsOverview;
			var cell = row.appendChild(document.createElement("td"));
			cell.appendChild(aso);
			settingsTable.appendChild(row);
			
			var multipleAttacksTargetsCount = document.createElement("input");
			var matc = multipleAttacksTargetsCount;
			matc.id = "tm4rkus_multiple_attacks_targets_Count";
			matc.size = 3;
			matc.value = settings.StatsOverview.minVillages;
			matc.disabled = !settings.activateStatsOverview;
			matc.addEventListener("blur", function() 
				{
				settings.StatsOverview.minVillages = this.value;
				localStorage.setItem("tm4rkus_settings",JSON.stringify(settings));
				}, false);
				
			var row = document.createElement("tr");
			var cell = row.appendChild(document.createElement("td"));
			cell.innerHTML = lang.anything.setStatsOverviewMinVillages;
			var cell = row.appendChild(document.createElement("td"));
			cell.appendChild(matc);
			settingsTable.appendChild(row);
			
			
			var div_Settings = document.getElementById("TM4rkuS_Settings");
			div_Settings.appendChild(settingsTable);					
			settingTabs.SettingsToNewSize();	
			
		},
		Favorites: function()
		{
		
			//Vorherige Tabelle löschen
			if (document.getElementById("settingsTable"))
			document.getElementById("settingsTable").parentNode.removeChild(document.getElementById("settingsTable"));
			//Tabelle
			var settingsTable = document.createElement("table");
			settingsTable.id = "settingsTable";
			
			//Meine Favoriten
			var myFavorites = document.createElement("h3");
			var mf = myFavorites;
			mf.id = "TM4rkuS_My_Favorites";
			mf.href = "javascript:;";
			mf.innerHTML = lang.anything.myFavorites;
			
			var row = document.createElement("tr");
			var cell = row.appendChild(document.createElement("td"));
			cell.appendChild(mf);
			settingsTable.appendChild(row);
			
			var myFavorites_table_div = document.createElement("div");
			var mftd = myFavorites_table_div;
			mftd.style.maxHeight = "307px";
			mftd.style.overflow = "auto";
			var myFavorites_table = mftd.appendChild(document.createElement("table"));
			var mft = myFavorites_table;
			mft.id = "TM4rkuS_My_Favorites";
			mft.style.maxHeight = "307px";
			mft.style.overflow = "auto";
			
			//Zeilen für bisher gespeicherte Favoriten erstellen
			for (var prop in settings.favFilters)
			{
				var row = mft.appendChild(document.createElement("tr"));
				var name = row.appendChild(document.createElement("td"));
				name.style.border = "1px solid #804000";
				name.style.textAlign = "center";
				
				var activateFilter = name.appendChild(document.createElement("a"));
				activateFilter.text = "» " + prop + ":";
				activateFilter.style.margin = "2px";
				activateFilter.id = "TM4rkuS_Favorite:"+prop;
				
				//Favoriten einfügen
				activateFilter.addEventListener("click", function() 
				{	
					var favorite = (this.id).split("TM4rkuS_Favorite:")[1];
					document.getElementById("save_edited_"+favorite).click();
					document.getElementById("TM4rkuS_dropdown_Favorite").value = favorite;
					selectFavorite(document.getElementById("TM4rkuS_dropdown_Favorite"));
					document.getElementById("TM4rkuS_Settings").style.display = "none";
					document.getElementById("TM4rkuS_divDarkBackground").style.display = "none";
					filter();
				}, false);
				
				var properties = "";
				
				var favorite_Settings = document.createElement("td");
				favorite_Settings.style.border = "1px solid #804000";
				var propnames = favorite_Settings.appendChild(document.createElement("tr"));
				var propvalues = favorite_Settings.appendChild(document.createElement("tr"));
				
				for (var prop2 in settings.favFilters[prop])
				{
					var propname = propnames.appendChild(document.createElement("td"));
					propname.innerHTML = "<b>"+lang.buttons[prop2]+"</b>";
					propname.style.textAlign = "center";
					propname.style.width = "40px";
					propname.style.backgroundImage = 'url("http://de60.die-staemme.de/graphic/screen/tableheader_bg3.png")';
					propname.style.paddingRight = "3px";
					propname.style.whiteSpace = "nowrap";
					
					var propvalue = propvalues.appendChild(document.createElement("td"));
					propvalue.style.textAlign = "center";
					var input = propvalue.appendChild(document.createElement("input"));
					input.value = settings.favFilters[prop][prop2];
					input.id = "edit_"+prop+"_"+prop2;
					input.type = "text";
					if(prop2 == "target")
					{
						input.size = 6;
						input.addEventListener('blur', function() 
						{
							if(!this.value.match(/\d+\|\d+/)) 
							{
								this.value = "xxx|yyy";
								}
						}, false);
					}
					else
					{
					input.size = 3;
					input.addEventListener('blur', function()
					{
						if(isNaN(this.value) || this.value == "") 
						{
							this.value = 0;
						}
					}, false);
					}
					input.style.textAlign = "center";		
				}
				
			
				row.appendChild(favorite_Settings);
				
				//Speicher-Button erstellen um Favoriten im Nachhinein zu ändern
				var save_delete = row.appendChild(document.createElement("td"));
				save_delete.style.border = "1px solid #804000";
				
				var saveButton = save_delete.appendChild(document.createElement("input"));
				saveButton.type = "button";
				saveButton.style.marginTop = "2px";
				saveButton.style.marginLeft = "2px";
				saveButton.style.marginRight = "2px";
				saveButton.id = "save_edited_"+prop;
				saveButton.value = lang.buttons.save;
				saveButton.addEventListener('click', function() 
				{
					//Geänderten Favoriten speichern
					var fav_name = this.id.split("save_edited_")[1];
					var target = 	doc.getElementById("edit_"+fav_name+"_"+"target").value;
					var runtime = 	doc.getElementById("edit_"+fav_name+"_"+"runtime").value;
					var start = 	doc.getElementById("edit_"+fav_name+"_"+"start").value;
					var end = 		doc.getElementById("edit_"+fav_name+"_"+"end").value;
					var day = 		doc.getElementById("edit_"+fav_name+"_"+"day").value;
					var date = 		doc.getElementById("edit_"+fav_name+"_"+"date").value;
			
				
					var myUnits = getUnits("edit_"+fav_name+"_");
					var inserted_units = myUnits[0];
					var units = myUnits[1];
					settings.favFilters[fav_name] = {};
					
					var names = ["start", "end", "day", "date", "runtime", "target"];
					var values = [start, end, day, date, runtime, target];
					for (var i = 0; i < names.length; i++)
					{
						settings.favFilters[fav_name][names[i]] = values[i];
					}
					for (var i = 0; i < inserted_units.length; i++)
					{
						settings.favFilters[fav_name][units[i]] = inserted_units[i];
					}
					localStorage.setItem("tm4rkus_settings",JSON.stringify(settings));
				}, false);
				
				//Löschen-Button erstellen um Favoriten zu löschen
				save_delete.appendChild(document.createElement("tr"));
				var deleteButton = save_delete.appendChild(document.createElement("input"));
				deleteButton.type = "button";
				deleteButton.style.marginBottom = "2px";
				deleteButton.style.marginLeft = "2px";
				deleteButton.style.marginRight = "2px";
				deleteButton.id = "delete_"+prop;
				deleteButton.value = lang.buttons.deleteFav;
				deleteButton.addEventListener("click", function()
				{
					var prop = this.id.split("delete_")[1];
					if (confirm(lang.messages.confirmDeleteFavorite(prop)))
					{
						delete(settings.favFilters[prop]);
						var options = document.getElementById("TM4rkuS_dropdown_Favorite").getElementsByTagName("option");
						for (var i = 0; i < options.length; i++)
						{
							if (options[i].value == prop)
							{
								document.getElementById("TM4rkuS_dropdown_Favorite").removeChild(options[i]);
							}
						}
						localStorage.setItem("tm4rkus_settings", JSON.stringify(settings));
						settingTabs.Favorites();
					}
				}, false);
			}
			
			
			var row = document.createElement("tr");
			var cell = row.appendChild(document.createElement("td"));
			cell.appendChild(mftd);
			settingsTable.appendChild(row);
			
			var addNewFavorite = document.createElement("a");
			var anf = addNewFavorite;
			anf.id = "TM4rkuS_Add_New_Favorite";
			anf.text = lang.anything.addNewFavorite;
			anf.addEventListener("click", function()
			{
				var fav_name = prompt(lang.messages.favFilterName, "");
				if(fav_name)
				{					
					var myUnits = getUnits();
					var units = myUnits[1];
					settings.favFilters[fav_name] = {};
					var names = ["start", "end", "day", "date", "runtime", "target"];
					var values = [0, 0, 0, 0, 30, "xxx|yyy"];
					for (var i = 0; i < names.length; i++)
					{
						settings.favFilters[fav_name][names[i]] = values[i];
					}
					for (var i = 0; i < units.length; i++)
					{
						settings.favFilters[fav_name][units[i]] = 0;
					}
					localStorage.setItem("tm4rkus_settings",JSON.stringify(settings));
					settingTabs.Favorites();
					addDropdownOption(document.getElementById("TM4rkuS_dropdown_Favorite"), fav_name, "", false);
				}
				
				
			}, false);
			
			settingsTable.appendChild(anf);
			
			
			var div_Settings = document.getElementById("TM4rkuS_Settings");
			div_Settings.appendChild(settingsTable);	
			
			settingTabs.SettingsToNewSize();
		}

	}

function village_overview(obj, groups) {

	if(!obj)
	obj = this;
	if(!groups)
	var groups = [];
	
	if(obj.id != "submit")
	{
		var win = window.opera?window:unsafeWindow; 
		var fn = win.Callback.handle_village_to_group_assigment;
		win.Callback.handle_village_to_group_assigment = function(data, target, form_id) 
		{
			fn(data, target, form_id);
			for (var i = 0; i < tables.length; i++)
			if (tables[i].innerHTML.match("Gruppenzugehörigkeit"))
			{
				var groups_table = tables[i];
			}
			var groups_of_village = groups_table.getElementsByTagName("tr");
			
			groups = []
			for (var i = 1; i < groups_of_village.length; i++)
			{
				groups_of_village[i].getElementsByTagName("input")[0].addEventListener("click", function() 
				{
					if(this.checked)
					groups.push(this.id.split("checkbox_")[1]);
					else
					groups.splice(contains(groups, this.id.split("checkbox_")[1])-1, 1);
				}, false);
				if(groups_of_village[i].getElementsByTagName("input")[0].checked)
				groups.push(groups_of_village[i].getElementsByTagName("input")[0].id.split("checkbox_")[1]);
			}
			var inputs = document.getElementById("reassign_village_to_groups_form_group_assigment").getElementsByTagName("input");
			var submit = inputs[inputs.length-1];
			submit.id = "submit";
			submit.addEventListener("click", function() { groups.push("alle");village_overview(submit, groups) }, false);
			// Und hier dann deinen Kram machen
		}
	}

	//Stellen der Einheiten/Gruppen ermitteln
	var tables = document.getElementsByTagName("table");

	for (var i = 0; i < tables.length; i++)
	{
		//Einheiten
		if (tables[i].innerHTML.match("Einheiten"))
		{
			var units_table = tables[i];
		}
		//Gruppen
		if (tables[i].innerHTML.match("Gruppenzugehörigkeit"))
		{
			var groups_table = tables[i];
		}
	}

	//Einheiten im Dorf ermitteln
	if (checkExistence(settings.singleAttack.units["spear"]))
	{	
		var units_in_village = units_table.getElementsByTagName("img");
		var units = [];
		for (var prop in settings.singleAttack.units)
		{
		var value = 0;
			for (var i = 0; i < units_in_village.length; i++)
			{
				if (units_in_village[i].src.match(prop))
				value = parseInt(units_in_village[i].parentNode.getElementsByTagName("strong")[0].textContent);
			}
		units.push(value);
		}
	}
	
	
	if (obj.id != "submit")
	{
		//Gruppen des Dorfes ermitteln
		var groups_of_village = groups_table.getElementsByTagName("tr");
		//i = 1 weil das erste "tr"-Element die Überschrift ist
		for (var i = 1; i < groups_of_village.length; i++)
		{
			groups.push(groups_of_village[i].textContent);
		}
		groups.push(lang.anything.allVillages); //Gruppe "alle" hinzufügen
	}
	
	//ID des Dorfes ermitteln
	var id = location.href.match(/(\d+)&screen=overview$/)[1];
	
	//Coords des Dorfers ermitteln
	var coords = document.getElementById("menu_row2").innerHTML.match(/\d+\|\d+/)[0];
	
	var saved_groups = [];
	for (var prop in read_villages)
	{
		if (prop == "date")
			continue
		
		saved_groups.push(prop)
	}

	for (var i = 0; i < groups.length; i++)
	{
		var group_in_saved_groups = contains(saved_groups, groups[i]);

		
		if (group_in_saved_groups)
		{	
			
			var id_in_read_villages_prop = contains(read_villages[groups[i]].id, id);
			if (id_in_read_villages_prop)
			{
				read_villages[groups[i]].troups[id_in_read_villages_prop-1] = units;
			}
			else
			{
				read_villages[groups[i]].id.push(id);
				read_villages[groups[i]].troups.push(units);
				read_villages[groups[i]].coords.push(coords);
			}
			saved_groups.splice(group_in_saved_groups-1, 1);
		}
		else
		{
			read_villages[groups[i]] = {"id":[], "troups":[], "coords":[]};
			read_villages[groups[i]].id.push(id);
			read_villages[groups[i]].troups.push(units);
			read_villages[groups[i]].coords.push(coords);
		}
	}
	for (var i = 0; i < saved_groups.length; i++)
	{
		var id_in_read_villages_prop = contains(read_villages[saved_groups[i]].id, id);
		
		if (id_in_read_villages_prop)
			{
				read_villages[saved_groups[i]].id.splice(id_in_read_villages_prop-1,1);
				read_villages[saved_groups[i]].troups.splice(id_in_read_villages_prop-1,1);
				read_villages[saved_groups[i]].coords.splice(id_in_read_villages_prop-1,1);
			}
	}
	localStorage.setItem("tm4rkus_read_villages", JSON.stringify(read_villages));
}


function update_troups(link) {
var id = getID(link);
var coords = getCoordsAtPlace();
			
			
		var l, i = 0; 
		var neighbor = 0;
		var troups = new Array();
	while (l = document.links[i++]) 
		{	
		if (l.href.match("mode=neighbor")) 
		neighbor = 1;
		if ((neighbor == 1) && (l.href.match("javascript:insertUnit")))
		{
		//for (r = 0; r < server_runtimes.length; r++)

			//var infos = server_runtimes;
			for (var prop in server_runtimes)
			{
				var unit = prop;
				var troop_runtime = server_runtimes[prop];
				
				if (l.href.match("_"+unit))
				{
				troups.push(l.href.replace(/(%20)|(\D)/g, ""));
				}
			}
		
		}
		if (l.href.match("unit_input_snob"))
		neighbor = 0;
		}
		
		for (var prop in read_villages)
			{
			if (prop == "date")
			continue;
			var contain = contains(read_villages[prop].id, id);
			if (contain !== false)
				{
				read_villages[prop].troups[contain] = troups; 
				}
			}
			localStorage.setItem("tm4rkus_read_villages"+uv,JSON.stringify(read_villages));
		
}

function _evaluate(path, context) {
	if(!context) {
		var context = document;
	}
	
	var XPath = document.evaluate(path, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var nodes = [];
	for(var x = 0; x < XPath.snapshotLength; x++) {
		nodes.push(XPath.snapshotItem(x));
	}
	
	return nodes;
}

function __trim(string) {
	return string.replace(/^\s+|\s+$/, "");
}

function aKeyWasPressed(e) {
	
    var key = e.keyCode;
    var thechar = String.fromCharCode(key);
		if (key == 13)
		{    
			if (getMode() == "combined")
				document.getElementById('filterButton').onClick = filter();
		}
		if (key == 84)
		{
			var targets = document.getElementById("TM4rkuS_div_list").getElementsByTagName("div");
			
			var sent = false;
			if (!checkExistence(attacked_villages["exec"]) || (attacked_villages["exec"] >= targets.length))
			{
				attacked_villages["exec"] = 0;
			}
			
			for (var i = 0; i < (targets.length); i++)
			{
				if (i < attacked_villages["exec"])
				{
					continue;
				}
				
				if (sent != true)
				{
					var target = targets[i];
					var AttackCombined = document.getElementById("AttackCombined"+i);
					
					if ((!(checkExistence(attacked_villages[target.textContent])) || (parseInt(attacked_villages[target.textContent]) < settings.attacksCount.attacksPerVillage) || (settings.attacksCount.attacksPerVillage == 0)) && (AttackCombined.style.display != "none"))
					{	
							already_used_villages(AttackCombined, e);
							attacked_villages["exec"] = i+1;
							var sent = true;
					}
				}
			}
		
			if (sent == false)
			{
				alert(lang.messages.multipleAttacksFinished);
			};
		}
}

//get-functions
function getSlowestUnit() {

var units = {};
var runtime = 0;
for (var prop in server_runtimes)
{
runtime = (parseInt(document.getElementById(prop).value) > 0 && server_runtimes[prop] > runtime) ? server_runtimes[prop]:runtime;
}
if (runtime > 0)
document.getElementById("runtime").value = runtime;

}

function getUnitsInfos()
{
if (!checkExistence(settings.singleAttack.settings["start"]))
{
	settings.singleAttack.settings = {"start":8, "end":0, "day":0, "date":0, "runtime":30, "target":"xxx|yyy", "attackWithUnits":false};
}

	if(document.getElementById("combined_table").innerHTML.match(/unit_knight\.png/)) 
		{
			if (document.getElementById("combined_table").innerHTML.match(/marcher\.png/))
			{
				type = "knight";
				if (!checkExistence(settings.singleAttack.units["spear"]))
				{
				settings.singleAttack.units = {"spear":0, "sword":0, "axe":1, "archer":0, "spy":0, "light":0, "marcher":0, "heavy":0, "ram":1, "catapult":0, "knight":0, "snob":0};
				}
			}
			if (!document.getElementById("combined_table").innerHTML.match(/marcher\.png/))
			{
				type = "knight!=marcher";
				if (!checkExistence(settings.singleAttack.units["spear"]))
				{
				settings.singleAttack.units = {"spear":0, "sword":0, "axe":1, "spy":0, "light":0, "heavy":0, "ram":1, "catapult":0, "knight":0, "snob":0};
				}
			}
		} 
		else if (document.getElementById("combined_table").innerHTML.match(/marcher\.png/))
		{
			type = "extended";
			if (!checkExistence(settings.singleAttack.units["spear"]))
			{
			settings.singleAttack.units = {"spear":0, "sword":0, "axe":1, "archer":0, "spy":0, "light":0, "marcher":0, "heavy":0, "ram":1, "catapult":0, "snob":0};
			}
		} 
		else 
		{
			type = "basic";
			if (!checkExistence(settings.singleAttack.units["spear"]))
			{
			settings.singleAttack.units = {"spear":0, "sword":0, "axe":1, "spy":0, "light":0, "heavy":0, "ram":1, "catapult":0, "snob":0};
			}
	}
}

function getUnits(prefix) {
	
	if (!prefix)
		prefix = "";

	var spear 	 = parseInt(doc.getElementById(prefix+"spear").value);
	var sword  	 = parseInt(doc.getElementById(prefix+"sword").value);
	var axe 	 = parseInt(doc.getElementById(prefix+"axe").value);
	var spy 	 = parseInt(doc.getElementById(prefix+"spy").value);
	var light 	 = parseInt(doc.getElementById(prefix+"light").value);
	var snob 	 = parseInt(doc.getElementById(prefix+"snob").value);
	var heavy 	 = parseInt(doc.getElementById(prefix+"heavy").value);
	var ram 	 = parseInt(doc.getElementById(prefix+"ram").value);
	var catapult = parseInt(doc.getElementById(prefix+"catapult").value);
	
	switch(read_villages[active_group].troups[0].length)  
		{
		case 13:
		var knight = parseInt(doc.getElementById(prefix+"knight").value);
		var archer 	= parseInt(doc.getElementById(prefix+"archer").value);
		var marcher = parseInt(doc.getElementById(prefix+"marcher").value);
		var units = ["spear", "sword", "axe", "archer", "spy", "light", "marcher", "heavy", "ram", "catapult", "knight", "snob"];
		var inserted_units = [spear, sword, axe, archer, spy, light, marcher, heavy, ram, catapult, knight, snob];
		break;
		case 12:
		var archer 	= parseInt(doc.getElementById(prefix+"archer").value);
		var marcher = parseInt(doc.getElementById(prefix+"marcher").value);
		var units = ["spear", "sword", "axe", "archer", "spy", "light", "marcher", "heavy", "ram", "catapult", "snob"];
		var inserted_units = [spear, sword, axe, archer, spy, light, marcher, heavy, ram, catapult, snob];
		break;
		case 10:
		var units = ["spear", "sword", "axe", "spy", "light", "heavy", "ram", "catapult", "snob"];
		var inserted_units = [spear, sword, axe, spy, light, heavy, ram, catapult, snob];
		break;
		}
	return [inserted_units, units];
}

function getCoordsAtPlace() {
var row = document.getElementById("menu_row2");
var target = row.getElementsByTagName("td")[4];
return target.textContent.match(/\d+\|\d+/);
}

function getID(link) {
var id_start = (link.search(/village=/)+("village=".length));
var id = link.substr(id_start, 5);
return id;
}

function getMiddleTime(villages, start, end) {
var next_time = 60*60*60*1000-(start + ((24 - (start - end)) /2))  * 60 * 60 * 1000;
if (!isNaN(document.getElementById("middleTime").value))
{
var middle = document.getElementById("middleTime").value * 60 * 60 * 1000;
if (villages.length != 0)
{
for (x = 0; x < villages.length; x++)
	{
	var runtime = new Date(parseInt(villages[x].split(":")[0]));
	var id = villages[x].split(":")[1];
	
	if (start != end)
	{
	
	
	var hour = runtime.getHours() * 60 * 60 * 1000;
	var minute = runtime.getMinutes() * 60 * 1000;
	var second = runtime.getSeconds() * 1000;
	time = hour + minute + second;
	
	diff_times = time - middle;
	if (Math.abs(diff_times) < Math.abs(next_time))
		{
		next_time = Math.abs(diff_times);
		var village = villages[x];
		}

	}
	else village = villages[0];

}
return village;
}
else
return false;
}
else return villages[0];
	}

function getDoc() {
	var doc = document;
	if(top.frames.length > 1){
		if(top.frames[1].document.URL.match('game.php') =='game.php') {
			var doc = top.frames[1].document;
		} else {
			top.frames[0].document;
		}
	}
	
	return doc;
}

function getMode() {
	try {
		var mode = doc.getElementById("overview").value;
	} catch(e) {
		if(location.href.match(/info_player\&id=/))
		var mode = "info";
		else if(location.href.match(/screen=info_village\&id=/))
		var mode = "info_village";
		else
		mode = false;
	}
	
	return mode;
}

function getRows() {
		var table = doc.getElementById("mainTable"); 
		var row = table.getElementsByTagName("tr");
	var i = 0;
	while ( i < row.length )
	{
		if (row[i].innerHTML.match("label_"))
		{
		return i;
		i = row.length + 1;
		}
		i = i + 1;
		
	}
	if (i == row.length) return false
}

function getTroopsCell(unit) {
var cells = document.getElementById("combined_table").getElementsByTagName("th");
var i = 0;
while ( i < cells.length)
	{
	if (cells[i].innerHTML.match(unit))
		{
		return i;
		i = cells.length+1;
		}
	else
		i = i + 1;
	}
	if (i == cells.length) return false;

}
function getServerRuntimes() {
	
	var server_infos = (get_world_config("get_unit_info",server_id));
	var serverRuntimes = {}
	for (var prop in server_infos)
	{
	if (server_infos[prop].speed != undefined)
	serverRuntimes[prop] = Math.round(server_infos[prop].speed);
	}
	return serverRuntimes;	
}

//recent Villages/Filter
{

function setToFirst(coords, recent) {
var check;
check = false;
recent = recent.split(",");
var new_recent = new Array();
for (var i = 0; i < recent.length; i++)
{

 if ((coords != recent[i]) && (check == false))
 new_recent.push(recent[i]);
 
 if (coords == recent[i])
 {
 new_recent.unshift(recent[i]);
 check = true;
 }
 
 if ((coords != recent[i]) && (check == true))
 new_recent.push(recent[i]);
}
return new_recent;

}

function contain(coords, recent) {
var check;
check = false;
recent = recent.split(",");
for (var i = 0; i < recent.length; i++)
{
 if (coords == recent[i])
 check = true;
}
return check;

}

function setRecentVillages () {
	var coords = doc.getElementById("target").value;
	recent_villages = localStorage.getItem("tm4rkus_recent_villages");
	if (recent_villages == null)
	{
	recent_villages = (coords);
	localStorage.setItem("tm4rkus_recent_villages", coords);
	}
	else if (!contain(coords, recent_villages))
	{
	recent_villages = recent_villages.split(",");
	while (recent_villages.length > 5)
	{
	recent_villages.pop();
	}
	recent_villages.unshift(coords);
	localStorage.setItem("tm4rkus_recent_villages", recent_villages);
	}
	else
	{
	recent_villages = setToFirst(coords, recent_villages);
	localStorage.setItem("tm4rkus_recent_villages", recent_villages);
	}
}

function getCss(active_window){
var cssLocation = "http://die-staemme.de/merged/game.css?1298980492";
  // CSS für IEs nachladen
  if(active_window.document.createStyleSheet) active_window.document.createStyleSheet(cssLocation);
    // CSS für Mozilla, Netscape, Opera nachladen
  else{
    var objStyle = active_window.document.createElement("style");
    var objText = active_window.document.createTextNode("@import url("+cssLocation+") screen;");
    objStyle.appendChild(objText);
    active_window.document.getElementsByTagName("body")[0].appendChild(objStyle);
  }
}

function createpopup() {
	var w = 185;
	var h = 135;
	var site = '';
        x = screen.availWidth/2-w/2;
        y = screen.availHeight/2-h/2;
        var popupWindow = window.open(
            '','','width='+w+',height='+h+',left='+x+',top='+y+',screenX='+x+',screenY='+y);
		popupWindow.document.title = lang.messages.last_targets;
		popupWindow.stylesheet=getCss(popupWindow);
		recent_villages = localStorage.getItem("tm4rkus_recent_villages");
		recent_villages = recent_villages.split(",");
		var row = doc.createElement("tr");
		row.id = "row_a";
		var cell = doc.createElement("a");
		cell.id = "cell_a";
		cell.style.textAlign = "center";
		popupWindow.document.getElementsByTagName("body")[0].appendChild(row);
		popupWindow.document.getElementsByTagName("tr")[0].appendChild(cell);
		var row = doc.createElement("tr");
		row.id = "row_b";
		popupWindow.document.getElementsByTagName("tr")[0].parentNode.appendChild(row);
		for (i = 0; i < recent_villages.length; i++)
		{
		var cell = doc.createElement("a");
			cell.id = "cell"+recent_villages[i];
			cell.innerHTML = recent_villages[i];
			cell.style.textAlign = "center";
			cell.addEventListener("click", function() 
			{
			localStorage.setItem("target", this.innerHTML);
			document.getElementById("target").value = this.innerHTML; 
			popupWindow.window.close();
			}, false);
			var row = doc.createElement("tr");
			row.id = "row"+(i);
			var img_center = doc.createElement("img");
			img_center.setAttribute("src","http://de60.die-staemme.de/graphic/unit/att.png?1");
			var link = document.createElement("a");
			
			var IDiHTML = document.URL;
			
			if(IDiHTML.match(/[&?](village=\d+)/)) 
				var id = (RegExp.$1);
			 
			else
			var id = "";
			
			link.addEventListener('Click', function() {
			location.href = ("http://" + location.host.split(".")[0] + "."+ main_adress	+ "." + server_location + "/game.php?" + id + uv + "&screen=map&x=" + this.parentNode.getElementsByTagName("a")[0].innerHTML.split("|")[0] + "&y=" + this.parentNode.getElementsByTagName("a")[0].innerHTML.split("|")[1]);
			popupWindow.window.close();
			}, false);
			link.title = lang.messages.center;
			link.appendChild(img_center);
			popupWindow.document.getElementsByTagName("tr")[i+1].parentNode.appendChild(row);
			popupWindow.document.getElementsByTagName("tr")[i+1].appendChild(cell);		
			popupWindow.document.getElementsByTagName("tr")[i+1].appendChild(link);
			
		}
	}

	
function ad_cross(element) {
			var done_img = document.createElement("img");
			done_img.src = "http://forumandersreisen.de/images/kreuz_rot.gif";
			done_img.alt = " x";
			done_img.title = " x";
			done_img.id = "done_img";
			element.parentNode.appendChild(done_img);
}

function already_used_villages(obj, e) {
	
	if (!obj)
	obj = this;
	
	if ((mode == "combined") && (!obj.id.match("AttackCombined")))
	{
		if (e.which == "2")
		{
			ad_cross(obj);
		}
		if (((e.which == "2" ) || (e.which == "1")) && (document.getElementById("attackWithUnits").checked))
		{
			var vill_name = obj.parentNode.parentNode.parentNode.getElementsByTagName("a")[0].getElementsByTagName("span")[0];
			var id = vill_name.id.substring(11); 
			var date = new Date();
			date = new Date(date.getTime()+1000*60*60*24*365);
			var used_villages = localStorage.getItem("tm4rkus_used_villages");
			if ((used_villages != null) && (!used_villages.match(id)))
			used_villages += "," + id;
			else if (used_villages == null)
			used_villages = id;
			localStorage.setItem("tm4rkus_used_villages", used_villages);
		}
	}
		
	else if ((mode == "info") || (obj.id.match("AttackCombined")))
	{
	
		if (((e.which == "2") || (e.which == "84")) && (obj.id.match("AttackCombined")))
		{
			multipleAttacks(obj);
		}
		if ((e.which == "2" ) || (e.which == "1") || (e.which == "84"))
		{
			var already_attacked_villages = attacked_villages;
			if (checkExistence(already_attacked_villages[obj.parentNode.textContent]))
			{
				already_attacked_villages[obj.parentNode.textContent]++;
			}
			else 
			{
				already_attacked_villages[obj.parentNode.textContent] = 1;
			}
			var id = obj.href.match(/(village=\d+)/);
			id = RegExp.$1.split("=")[1];
			for (var x = 0; x <= read_villages_frac.id.length; x++)
			{
				if (read_villages_frac.id[x] == id)
				{
						read_villages_frac.id.splice(x,1);
						read_villages_frac.coords.splice(x,1);
						read_villages_frac.troups.splice(x,1);	
				}
			}
		}
		if (e.which == "84")
		{
			win2=open(obj.href);
			win2.blur();
			window.focus();
		}
		return read_villages;
	}
}

}

function checkInsertedCoords(array) {
for (var i = 0; i < array.length; i++)
	{
	if (!array[i].match(/\d+\|\d+/) || array[i].length > 7)
		{
		if (array[i] != "")
			return false;
		else
			{
			array.splice(i, 1);
			i--;
			}
		}
	}
if (array.length > 0)
return array;
else
return false;

}

//multiple attacks (Kombiniert-Übersicht)
function multipleAttacks(obj) {

var start_time = new Date().getTime();
if (!obj)
	obj = this;
	
if (((obj.id === "exec_Multiple_Attacks") && (checkInsertedCoords(document.getElementById("TM4rkuS_coordlist").value.replace(/\r/g, "").replace(" ", "").split(/\n/)))) || (obj.id !== "exec_Multiple_Attacks"))
{
	var div = document.getElementById("TM4rkuS_coordlist_div");
	var stats = document.getElementById("TM4rkuS_coordlist_stats");

	if (obj.id == "exec_Multiple_Attacks")
	{	
		multiple_attacks_target_lists[settings.activatedTargetList] = document.getElementById("TM4rkuS_coordlist").value.replace(/\r/g, "").replace(" ", "").split(/\n/);
		localStorage.setItem("tm4rkus_multiple_attacks_targets", JSON.stringify(multiple_attacks_target_lists));
		document.addEventListener("keyup", function(evt)
		{
			var evt = (evt) ? evt : ((window.event) ? event : null);
			aKeyWasPressed(evt);
		}, false);
		multiple_attacks_target_lists[settings.activatedTargetList] = checkInsertedCoords(multiple_attacks_target_lists[settings.activatedTargetList]);
		div.style.width = "90px";
		div.style.overflow = "auto";
		var inputs = JSON.parse(localStorage.getItem("tm4rkus_inputs")).units;
		
		for (var i = 0; i < inputs.length; i++)
		{
			document.getElementById(inputs[i]).addEventListener('blur', function() 
			{
				if ((!isNaN(this.value)) && (settings.activateFilterOnTheFly != false))
				{
					if (parseInt(settings.duration.multipleFilter) > parseInt(settings.FilterOnTheFly.multipleDuration))
					{
					multipleAttacks(this);
					}
				}
			}, false);
			document.getElementById(inputs[i]).addEventListener('keyup', function()
			{
				if ((!isNaN(this.value)) && (settings.activateFilterOnTheFly != false))
				{
					if (parseInt(settings.duration.multipleFilter) <= parseInt(settings.FilterOnTheFly.multipleDuration))
					{
					multipleAttacks(this);
					}
				}
			}, false);
		}
		for(var prop in settings.singleAttack.settings)
		{
			document.getElementById(prop).addEventListener('blur', function() 
			{
				if ((!isNaN(this.value)) && (settings.activateFilterOnTheFly != false))
				{
					if (parseInt(settings.duration.multipleFilter) > parseInt(settings.FilterOnTheFly.multipleDuration))
					{
					multipleAttacks(this);
					}
				}
			}, false);
			document.getElementById(prop).addEventListener('keyup', function()
			{
				if ((!isNaN(this.value)) && (settings.activateFilterOnTheFly != false))
				{
					if (parseInt(settings.duration.multipleFilter) <= parseInt(settings.FilterOnTheFly.multipleDuration))
					{
					multipleAttacks(this);
					}
				}
			}, false);
		}
		read_villages_frac = {"id":[], "coords":[], "troups":[]};
		for (var x = 0; x < settings.filterFromGroup.length; x++)
		{
			for (var i = 0; i < read_villages[settings.filterFromGroup[x]].id.length; i++)
			{
				if (!contains(read_villages_frac.id, read_villages[settings.filterFromGroup[x]].id[i]))
				{
					read_villages_frac.id.push(read_villages[settings.filterFromGroup[x]].id[i]);
					read_villages_frac.coords.push(read_villages[settings.filterFromGroup[x]].coords[i]);
					read_villages_frac.troups.push(read_villages[settings.filterFromGroup[x]].troups[i]);
				}
			}
		}
	}
	else
		var inputs = JSON.parse(localStorage.getItem("tm4rkus_inputs")).units;
	var runtime  = parseInt(doc.getElementById("runtime").value);
	var start 	 = parseInt (doc.getElementById("start").value);
	var end 	 = parseInt (doc.getElementById("end").value);
	var day 	 = parseInt(doc.getElementById("day").value);
	var date 	 = parseInt(doc.getElementById("date").value);
	var link_counter = 0;
	
	var myUnits = getUnits();
	var inserted_units = myUnits[0];
	var units = myUnits[1];
	
	var loeschen = 0;
	var fitting_villages = 
		{
		id: [],
		troups: [],
		coords: [],
		}
	
	for (var i = 0; i < read_villages_frac.coords.length; i++)
	{
		//Truppen überprüfen -> neues Array mit Dörfern mit genug Truppen füllen
		for (var x = 0; x < inserted_units.length; x++)
		{
			if (inserted_units[x] > read_villages_frac.troups[i][x])
			{
			loeschen = 1;
			}
		}
		
		if (loeschen == 0)
		{
			fitting_villages.id.push(read_villages_frac.id[i]);
			fitting_villages.troups.push(read_villages_frac.troups[i]);
			fitting_villages.coords.push(read_villages_frac.coords[i]);
		}
		loeschen = 0;
	}

	if (contains(units, obj.id) || obj.id.match("TM4rkuS_dropdown_Groups") || obj.id == "TM4rkuS_dropdown_fastestOrSlowest")
				var blurInc = 1;
				else
				var blurInc = 0;
	
	if (fitting_villages.id.length > 0 || blurInc)
	{	
		 
		if (obj.id == "exec_Multiple_Attacks") 
		{
		document.getElementById("TM4rkuS_coordlist").style.display = "none";		
		obj.style.display = "none";
		var reset = document.getElementById("reset_Multiple_Attacks");
		reset.style.display = "";
		
		var div_list = div.appendChild(document.createElement("div"));
		div_list.id = "TM4rkuS_div_list";
		
		}
		for (var l = 0; l < multiple_attacks_target_lists[settings.activatedTargetList].length; l++)
		{
			if (obj.id == "exec_Multiple_Attacks")
			{
				coords_div = div_list.appendChild(document.createElement("div"));
				coords_div.textContent = multiple_attacks_target_lists[settings.activatedTargetList][l];
				coords_div.addEventListener('click', function() 
				{
					if (this.style.textDecoration == "underline")
					{						
						for (var i = 0; i <= multiple_attacks_target_lists[settings.activatedTargetList].length; i++)
						{
							if (multiple_attacks_target_lists[settings.activatedTargetList][i] == this.textContent)
							{
								multiple_attacks_target_lists[settings.activatedTargetList].splice(i,1);
								for (var l = i+1; l <= multiple_attacks_target_lists[settings.activatedTargetList].length; l++)
								{
									document.getElementById("AttackCombined"+ l).id = "AttackCombined"+(l-1);
									document.getElementById("AttackCombinedImg"+ l).id = "AttackCombinedImg"+(l-1);
								}
								this.parentNode.removeChild(this);
							}
						}
							localStorage.setItem("tm4rkus_multiple_attacks_targets",JSON.stringify(multiple_attacks_target_lists));
						multipleAttacks();
					}
				}, false);
				coords_div.addEventListener('click', function() 
				{ 
					this.style.textDecoration = "underline"; 
					this.style.color = "red"; 
				}, false);
			}
			else
			{
				var div_list = document.getElementById("TM4rkuS_div_list");
				coords_div = div_list.getElementsByTagName("div")[l];
			}

			var target = multiple_attacks_target_lists[settings.activatedTargetList][l];
			var targetX = target.split("|")[0];
			targetX =("00" + targetX).substr(-3); 
			var targetY = target.split("|")[1];
			targetY =("00" + targetY).substr(-3);
			var sortierung = new Array();
			
			for (var i = 0; i < fitting_villages.coords.length; i++)
			{
				var coords = fitting_villages.coords[i];
				var x = coords.split("|")[0];
				var x = ("00" + x).substr(-3);  
				var y = coords.split("|")[1];
				var y = ("00" + y).substr(-3);
				var diffX = targetX - x;
				var diffY = targetY - y;
				var range = Math.sqrt((diffX*diffX)+(diffY*diffY));
				
				var time_akt = Number(new Date());
				var time_an = parseInt(time_akt)+parseInt(Math.round(range*runtime*60*1000));
				var arrival = new Date(time_an);

				if(end != start) 
				{
					var arrival_hours = arrival.getHours();
					if(end < start) 
					{
						if(arrival_hours >= end && arrival_hours < start) 
						{
							var loeschen = 2;
						}
					} 
					else 
					{
						if(arrival_hours >= end || arrival_hours < start) 
						{
							var loeschen = 3;
						}
					}
				}
						
				if(!isNaN(day) && day != 0) 
				{
					if(day != arrival.getDate()) 
					{
						var loeschen = 4;
					}
				}
						
				if(!isNaN(date) && date != 0) 
				{
					if(date != (arrival.getMonth()+1)) 
					{
						var loeschen = 5;
					}
				}
						
				if (loeschen == 0)
				{
					var seconds = ("0" + Math.round((range*runtime*60)% 60)).substr(-2);
					var minutes = ("0" + Math.floor((range*runtime)% 60)).substr(-2);
					var hours = Math.floor(range*runtime/60);  
					
					var runtimeStr = lang.messages.runtime + "= ";
					if(hours > 23)
					{
						runtimeStr = lang.messages.runtime + Math.floor(hours/24) + lang.messages.day_s;
						hours = hours% 24;
					}
					runtimeStr += hours + ":" + minutes + ":" + seconds;
					
					hours = ("0" + arrival.getHours()).substr(-2);
					minutes = ("0" + arrival.getMinutes()).substr(-2);  
					seconds = ("0" + arrival.getSeconds()).substr(-2); 
					sortierung.push(time_an+":"+fitting_villages.id[i]);
				}
				loeschen = 0;
				
			}
			sortierung.sort(function(a,b) 
			{
				return parseInt(a.split(":")[0]) - parseInt(b.split(":")[0]);
			});				
			
			var attacking_village = sortierung[0];
				
			if (obj.id == "exec_Multiple_Attacks" || sortierung.length <= 1)
				var first_calculation = 1;
				else
				var first_calculation = 0;

			//Angriffslink erstellen
			if ((attacking_village != "undefined") && (sortierung.length > 0))
			{
				
				var img_attack = document.createElement("img");
				if (settings.filterFastestFirst == "slowest")
				{
					attacking_village = sortierung[sortierung.length-1];
					var time = (new Date(parseInt(sortierung[sortierung.length-(2-first_calculation)].split(":")[0]))).toLocaleString();
				}
				else if (settings.filterFastestFirst == "random")
				{	
					attacking_village = sortierung[Math.floor(Math.random()*sortierung.length)];
					var time = lang.anything.random;
				}
				else if (settings.filterFastestFirst == "fastest")
				{
					attacking_village = sortierung[0];
					var time = (new Date(parseInt(sortierung[1-first_calculation].split(":")[0]))).toLocaleString();
				}
				img_attack.title = time + " (" + (sortierung.length-1+first_calculation+blurInc) +")";
				img_attack.id = "AttackCombinedImg"+l;
				img_attack.setAttribute("src","http://cdn2.tribalwars.net/graphic/command/attack.png?901ab");
				if (document.getElementById("AttackCombined"+l)) 
				{
					if (contains(units, obj.id))
					{
						document.getElementById("AttackCombined"+l).style.display = "";
					}
					document.getElementById("AttackCombined"+ l).href = "http://" + location.host.split(".")[0] + "." + main_adress + "." +server_location + "/game.php?village=" + attacking_village.split(":")[1] + uv + "&screen=place&filter="+targetX+"|"+targetY;
					document.getElementById("AttackCombinedImg"+l).title = time + " (" + (sortierung.length-1+blurInc) +")";
					document.getElementById("AttackCombinedImg"+l).src = "http://cdn2.tribalwars.net/graphic/unit/unit_axe.png?51d94";
				}
				else if (obj.id == "exec_Multiple_Attacks")
				{
					var link = document.createElement("a");
					link.id = "AttackCombined"+ l; 
					link.addEventListener('mousedown', function(evt) 
						{
					var evt = (evt) ? evt : ((window.event) ? event : null);
					already_used_villages(this, evt);
						}, false);
					link.href = "http://" + location.host.split(".")[0] + "." + main_adress + "." + server_location + "/game.php?village=" + attacking_village.split(":")[1] + uv + "&screen=place&filter="+targetX+"|"+targetY;
					link.appendChild(img_attack);
					coords_div.appendChild(link);
				}
								
				link_counter++;
				
			}				
			if (sortierung.length <= 1)
			{
				if (obj.id != "exec_Multiple_Attacks" && (document.getElementById("AttackCombinedImg"+l)))
				{
					document.getElementById("AttackCombinedImg"+l).src = ("http://lippfux.bplaced.net/filemanager/unsichtbar.png"); 
					document.getElementById("AttackCombined"+l).style.display = "none";
				}
				else
				{
					var link = document.createElement("a");
					link.id = "AttackCombined"+l;
					var img_attack = document.createElement("img");
					img_attack.id = "AttackCombinedImg"+l;
					img_attack.src = ("http://lippfux.bplaced.net/filemanager/unsichtbar.png");
					link.appendChild(img_attack);
					coords_div.appendChild(link);
					link.href = "";
					link.disabled = true;
				}
			}
				
		}
		if ( (settings.activateStatsOverview) && (multiple_attacks_target_lists[settings.activatedTargetList].length >= settings.StatsOverview.minVillages) && (multiple_attacks_target_lists[settings.activatedTargetList].length*16 < 140))
		{
		div.style.height = 140+"px";
		}
		else if (multiple_attacks_target_lists[settings.activatedTargetList].length*16 < 200)
		div.style.height = multiple_attacks_target_lists[settings.activatedTargetList].length*16+"px";
		else
		div.style.height = 200+"px";
		
		
		//Anzahl Dörfer die passen: 20
		 //Anzahl Gesamt-Dörfer: 200
		 //Prozentangabe: (20/200)*100 = 10 (%)
		 //Höhe: 50 (px)
		 //1% von Höhe: (50/100)=0,5 (px)
		 //Anzahl Striche: Prozentangabe * 1% von Höhe = 10*0,5 = 5
		 
		if ( settings.activateStatsOverview && (multiple_attacks_target_lists[settings.activatedTargetList].length >= settings.StatsOverview.minVillages) )
			{
			var start_stats_time = new Date().getTime();
			var part         = document.getElementById("village_infos_part");
			var targets      = document.getElementById("village_infos_targets");
			var entire_group = document.getElementById("village_infos_entire_group");
			var calc_time	 = document.getElementById("village_infos_calc_time");
			var stripes      = document.getElementById("stripes");
			var stats_table  = document.getElementById("stats_table");
			var stats        = document.getElementById("TM4rkuS_coordlist_stats");
			
			var img_count = stripes.getElementsByTagName("img").length;
			for (var i = 0; i < img_count; i++)
			{
				stripes.removeChild(stripes.getElementsByTagName("img")[0]);
				stripes.removeChild(stripes.getElementsByTagName("br")[0]);
			}
			
			var village_count = read_villages_frac.id.length;
			//if (this.id == "exec_Multiple_Attacks")
			//	var fitting_villages_count = fitting_villages.id.length;
			//else
				var fitting_villages_count = fitting_villages.id.length - 1;
				
			if (blurInc || obj.id == "exec_Multiple_Attacks")
				fitting_villages_count++;
			 
			if (obj.id == "exec_Multiple_Attacks")
				stats_table.appendChild(document.createElement("br")); // Unbedingt benötigt, da sonst der FF vollkommen rumspinnt
			 
			part.textContent = "Dorpen met de benodigde troepen: " + (fitting_villages_count);
			targets.textContent = "Doelen: " + multiple_attacks_target_lists[settings.activatedTargetList].length;
			entire_group.textContent = "Gesamtanzahl beachteter Dörfer: " + village_count; 
			document.getElementById("village_infos_calc_time").innerHTML = "Gesamt:  x ms <br/>Ziele: y ms <br/>Statsdarstellung: z ms";
			stats_table.style.height = div.style.height;
			var height = stats_table.style.height.match(/\d+/);
			
			var stripe_count = (((fitting_villages_count) / village_count) * 10) * (height / 200);
			for (var i = 0; i < (height-stripe_count); i++)
			{
				var img = stripes.appendChild(document.createElement("img"));
				img.src = "http://oi47.tinypic.com/2z3rkzt.jpg";
				stripes.appendChild(document.createElement("br"));
			} 
			
			for (var i = 1; i < stripe_count; i++)
			{
				var img = stripes.appendChild(document.createElement("img"));
				img.src = "http://oi46.tinypic.com/34rj03o.jpg";
				stripes.appendChild(document.createElement("br"));
			}
			if (obj.id == "exec_Multiple_Attacks")
			{
				stats.style.display = "";
			}
		}
		
	}
	else
		window.alert(lang.messages.noFittingVillage);
	}
	else
		window.alert(lang.messages.noCoordsInserted);
	
	var end_time = new Date().getTime();
	document.getElementById("village_infos_calc_time").innerHTML = "Gesamt: " + (end_time - start_time) + "ms <br/>Ziele: " + (start_stats_time - start_time) + "ms <br/>Statsdarstellung: " + (end_time - start_stats_time) + "ms";
	settings.duration.multipleFilter = (end_time - start_time);
}

//create menu (Kombiniert)
{
function createMenu() {
	var server = location.host.split(".")[0];
	if (checkExistence(localStorage["tm4rkus_settings"]))
		
	var row = doc.createElement("tr");
	mainTable.insertBefore(row, mainTable.firstChild.nextSibling); 
	
	var tableCell = doc.createElement("td");
		tableCell.setAttribute("colspan",getTroopsCell("spear"));
	
	row.appendChild(tableCell);
	
		var input_array =  {
		units: []
		};
	
		var unitsTableCell = doc.createElement("td");
		unitsTableCell.setAttribute("colspan", propCount(settings.singleAttack.units));
		
	
		for(var prop in server_runtimes) {	
		
		var cell = doc.createElement("td");
		cell.style.overflow = "visible";
		cell.style.maxWidth = "32px";
		cell.style.textAlign = "center";
		row.appendChild(cell);		
				
		var input = doc.createElement("input");
		input.type = "text";
		input.size = 3;
		input.value = settings.singleAttack.units[prop];
		input.id = prop;
		input.style.textAlign = "center";
		input.addEventListener('keyup', function(evt) {aKeyWasPressed(evt);}, false);
		input.addEventListener('blur', function() 
			{
				if (settings.activateFilterOnTheFly != false)
				{
					if (parseInt(settings.duration.singleFilter) > parseInt(settings.FilterOnTheFly.singleDuration))
					filter();
				}
			}, false);
		input.addEventListener('keyup', function() 
			{
				if (settings.activateFilterOnTheFly != false)
				{
					if (parseInt(settings.duration.singleFilter) <= parseInt(settings.FilterOnTheFly.singleDuration))
					getSlowestUnit();
					filter();
				}
			}, false);
		input.addEventListener('blur', function() 
			{
				if(isNaN(this.value) || this.value == "") 
				{
					this.value = 0;
				}
			}, false);
			
		if(prop == "spear")
		{
		var get_favorite = cell.appendChild(document.createElement("div"));
		input.style.marginTop = "5px";
		}
		cell.appendChild(input);
		if(prop == "spear")
		{
		cell.appendChild(document.createElement("br"));
		input.style.marginBottom = "11px";
		var addFavorite = cell.appendChild(document.createElement("a"));
		}
		cell.appendChild(document.createElement("tr"));
		input_array.units.push(prop)
		
	}
	
	localStorage.setItem("tm4rkus_inputs", JSON.stringify(input_array));
	
	//Favoriten hinzufügen
	//var addFavorite = document.getElementById("spear").parentNode.appendChild(document.createElement("a"));
	var af = addFavorite;
	af.id = "TM4rkuS_Add_Favorite";
	af.style.cursor = "pointer";
	//af.style.position = "absolute";
	af.href = "javascript:;";
	af.text = lang.anything.addFavorite;
	af.tabIndex = 1;
	af.addEventListener("click", function() 
	{
		var fav_name = prompt(lang.messages.favFilterName, "");
		if(fav_name)
		{
			//var target = 	doc.getElementById("target").value;
			var runtime = 	doc.getElementById("runtime").value;
			var start = 	doc.getElementById("start").value;
			var end = 		doc.getElementById("end").value;
			var day = 		doc.getElementById("day").value;
			var date = 		doc.getElementById("date").value;
		
			
			var myUnits = getUnits();
			var inserted_units = myUnits[0];
			var units = myUnits[1];
			settings.favFilters[fav_name] = {};
			
			var names = ["start", "end", "day", "date", "runtime", "target"];
			var values = [start, end, day, date, runtime, "xxx|yyy"];
			for (var i = 0; i < names.length; i++)
			{
				settings.favFilters[fav_name][names[i]] = values[i];
			}
			for (var i = 0; i < inserted_units.length; i++)
			{
				settings.favFilters[fav_name][units[i]] = inserted_units[i];
			}
			localStorage.setItem("tm4rkus_settings",JSON.stringify(settings));
			save();
			addDropdownOption(document.getElementById("TM4rkuS_dropdown_Favorite"),fav_name, "", true);
			alert(lang.messages.favSuccesfulAdded(fav_name));
			
		}
	}, false);
	
	af.appendChild(document.createElement("tr"));
	
	//Favoriten abrufen
	//var get_favorite = document.getElementById("spear").parentNode.appendChild(document.createElement("div"));
	get_favorite.id = "TM4rkuS_get_Favorite";
	//get_favorite.style.position = "absolute";
	
	var link_favorite = get_favorite.appendChild(document.createElement("a"));
	link_favorite.style.cursor = "pointer";
	link_favorite.addEventListener("click", function()
	{	
		document.getElementById("TM4rkuS_Settings").style.display = "";
		settingTabs.Favorites();
		document.getElementById("TM4rkuS_divDarkBackground").style.display = "";
	}, false);
	link_favorite.text = lang.anything.openFavFilter;
	
	var choose_favorite =  get_favorite.appendChild(document.createElement("a"));
	choose_favorite.style.cursor = "pointer";
	choose_favorite.text = lang.anything.chooseFavorite;
	choose_favorite.addEventListener("click", function()
	{
	selectFavorite(document.getElementById("TM4rkuS_dropdown_Favorite"));
	}, false);
	
	var dropdown_favorite = get_favorite.appendChild(document.createElement("select"));
	dropdown_favorite.tabIndex = 1;
	dropdown_favorite.id = "TM4rkuS_dropdown_Favorite";
	dropdown_favorite.addEventListener('change', function(){selectFavorite(this);}, false);
	
	var groups = new Array();
	// Namen der Favoriten auslesen
		for(var prop in settings.favFilters)
		{
			if (prop == "activatedFilter")
			continue; // sofort neuer Durchlauf der Schleife
			groups.push(prop);
		} 
		
		// Gruppen in alphabetischer Reihenfolge sortieren
		groups.sort();
	  
		// Dropdown-Inputfelder erstellen.
		for (var x = 0; x <= groups.length-1; x++)
		{
		addDropdownOption(dropdown_favorite, groups[x], "", (groups[x]==settings.activatedFilter));
		}
	
	var cell = doc.createElement("td"); 
	cell.style.textAlign = "center";
	row.appendChild(cell);	
	
	var button = doc.createElement("input");
	button.type = "button";
	button.value = lang.buttons.save;
	button.addEventListener('click', function() {save();}, false);
	cell.appendChild(button);
	
	var rowInCell = doc.createElement("tr"); 
	cell.appendChild(rowInCell);
	
	var button = doc.createElement("input");	
	button.type = "button";
	button.value = lang.buttons.filter;
	button.id = "filterButton";
	button.title = "Script by TM4rkuS. Thanks for using it.";
	button.addEventListener('click', filter, false);
	cell.appendChild(button);
	
	var absatz = doc.createElement("tr");
	if (localStorage.getItem("tm4rkus_read_villages_deleted") == "true")
	{
		absatz.textContent = lang.messages.readVillagesDeleted;
		settings.filterFromGroup = [lang.anything.allVillages];
		localStorage.setItem("tm4rkus_settings",JSON.stringify(settings));
		localStorage.setItem("tm4rkus_read_villages_deleted", "false");
	}
	absatz.style.whiteSpace = "normal";
	cell.appendChild(absatz);
	
	var cell = doc.createElement("td"); 
	cell.style.textAlign = "center";
	cell.id = "TM4rkuS_multiple_Attacks";
	if (!settings.activateMultipleAttacks)
	cell.style.display = "none";
	row.appendChild(cell);		
	
	var change_target_list = cell.appendChild(document.createElement("a"));
	change_target_list.text = lang.anything.changeTargetList;
	
	var change_target_list_dropdown = cell.appendChild(document.createElement("select"));
	change_target_list_dropdown.id = "TM4rkuS_change_target_list_dropdown";
	change_target_list_dropdown.addEventListener("change", function() {selectTargetList(this);}, false);
		
	var div_table = cell.appendChild(document.createElement("table"));
	var div_cell = div_table.appendChild(document.createElement("td"));
	div_cell.style.height = "500px";
	div_cell.id = "TM4rkuS_coordlist_div_cell";
	div_cell.style.border = "1px solid #804000";
	var div = div_cell.appendChild(document.createElement("div"));
    div.id = "TM4rkuS_coordlist_div";
    div.style.width = "125px";
     
    var input = div.appendChild(document.createElement("textarea"));
	
	var list = "";
	if (multiple_attacks_target_lists[settings.activatedTargetList].length > 0)
		{
			var list = multiple_attacks_target_lists[settings.activatedTargetList][0];
			for (var i = 1; i < multiple_attacks_target_lists[settings.activatedTargetList].length; i++)
			{
				list += "\r\n"+multiple_attacks_target_lists[settings.activatedTargetList][i];
			}
		}
	input.value = list;
	
	for (var prop in multiple_attacks_target_lists)
		{
			addDropdownOption(change_target_list_dropdown, prop, "", (settings.activatedTargetList == prop));
		}
			  
	input.style.height = "500px";
	div.height = input.style.height;
	input.id = "TM4rkuS_coordlist";
	input.style.width = "120px";
	input.style.fontSize = "small";
	input.style.border = "0"; 
	 
	var stats = div_table.appendChild(document.createElement("th"));
	stats.style.width = "auto";
	stats.id = "TM4rkuS_coordlist_stats";
	stats.style.padding = "0px";
	stats.style.display = "none";
	stats.style.border = "1px solid #804000";

	var table = stats.appendChild(document.createElement("table"));
	table.id = "stats_table";
	var stripes = table.appendChild(document.createElement("td"));
	stripes.id = "stripes";
	stripes.style.backgroundColor = "transparent";
	stripes.style.textAlign = "left"; 
	stripes.style.verticalAlign = "bottom";

	var village_infos = table.appendChild(document.createElement("td"));
	village_infos.style.paddingBottom = "0px";
	village_infos.style.paddingLeft = "0px";
	village_infos.style.paddingRight = "0px";
	village_infos.style.paddingTop = "0px";
	village_infos.id = "village_infos";
	village_infos.style.overflowY = "auto";
	village_infos.style.width = "120px";
	village_infos.style.maxWidth = "150px";
	village_infos.style.whiteSpace = "normal";
	village_infos.style.cssFloat="left";
	village_infos.style.backgroundColor = "transparent";
	village_infos.style.textAlign = "left";

	var part = village_infos.appendChild(document.createElement("tr"));
	part.id = "village_infos_part";
	part.style.color = "#2a6f1c";
	var targets = village_infos.appendChild(document.createElement("tr"));
	targets.id = "village_infos_targets";
	var entire_group = village_infos.appendChild(document.createElement("tr"));
	entire_group.id = "village_infos_entire_group";
	entire_group.style.color = "#b1b09e";
	var calc_time = village_infos.appendChild(document.createElement("tr"));
	calc_time.id = "village_infos_calc_time";
	calc_time.style.fontSize = "7pt";
	calc_time.style.fontWeight = "700";
	calc_time.style.color = "#514d41";
	
	var edit_bar = div_table.appendChild(document.createElement("td"));
	edit_bar.style.height = "auto";
	edit_bar.style.verticalAlign = "top";
	edit_bar.style.width = "14px";
	var add_targetlist = edit_bar.appendChild(document.createElement("img"));
	add_targetlist.style.verticalAlign = "top";
	add_targetlist.style.cssFloat = "right";
	add_targetlist.src = "http://de60.die-staemme.de/graphic/unit/att.png?1";
	add_targetlist.style.cursor = "pointer";
	add_targetlist.id = "TM4rkuS_Add_Targetlist";
	add_targetlist.style.cursor = "pointer";
	add_targetlist.title = lang.anything.addNewTargetList;
	add_targetlist.addEventListener("click", function() 
	{
		var name = prompt(lang.messages.addTargetlistName, "");
		if(name)
		{
			multiple_attacks_target_lists[name] = []
			settings.activatedTargetList = name;
			
			localStorage.setItem("tm4rkus_settings", JSON.stringify(settings));
			localStorage.setItem("tm4rkus_multiple_attacks_targets", JSON.stringify(multiple_attacks_target_lists));
			addDropdownOption(change_target_list_dropdown, name, "", true);
			document.getElementById("TM4rkuS_coordlist").value = [];
		};
	},false);
	
	
	var change_targetlist = edit_bar.appendChild(document.createElement("img"));
	change_targetlist.style.verticalAlign = "top";
	change_targetlist.style.marginTop = "5px";
	change_targetlist.style.marginBottom = "3px";
	change_targetlist.style.cssFloat = "right";
	change_targetlist.src = "http://de60.die-staemme.de/graphic/unit/att.png?1";
	change_targetlist.id = "TM4rkuS_Change_Targetlist";
	change_targetlist.style.cursor = "pointer";
	change_targetlist.title = lang.messages.multipleSettings;
	change_targetlist.addEventListener('click', function() 
										{
										document.getElementById("TM4rkuS_Settings").style.display = "";
										settingTabs.MultipleAttacks();
										document.getElementById("TM4rkuS_divDarkBackground").style.display = "";
										}, false);

	var execMultipleAttacks = cell.appendChild(document.createElement("a"));
	var ema = execMultipleAttacks;
	ema.id = "exec_Multiple_Attacks";
	ema.style.cursor = "pointer";
	ema.text = lang.messages.planAttack;
	ema.addEventListener('click', function() {multipleAttacks(this);}, false);
	  
	var resetMultipleAttacks = cell.appendChild(document.createElement("a"));
	var rma = resetMultipleAttacks;
	rma.id = "reset_Multiple_Attacks";
	rma.style.display = "none";
	rma.text = lang.messages.resetAttack;
	rma.addEventListener('click', function() 
	{
		this.style.display = "none"; 
		document.getElementById("TM4rkuS_coordlist_stats").style.display = "none";
		document.getElementById("TM4rkuS_div_list").parentNode.removeChild(document.getElementById("TM4rkuS_div_list"));
		document.getElementById("TM4rkuS_coordlist_div").style.height = "39px";
		document.getElementById("TM4rkuS_coordlist").style.display = "";
		document.getElementById("exec_Multiple_Attacks").style.display = "";
	}, false);
	
	var table = doc.createElement("table");
	tableCell.appendChild(table);
	
	var row = doc.createElement("tr"); 
	table.appendChild(row);
	
	
	var titles = [lang.buttons.start, lang.buttons.end, lang.buttons.day, lang.buttons.date, lang.buttons.runtime, lang.buttons.target, lang.buttons.attack, lang.buttons.settings/*, lang.buttons.homepage*/];
	
	for(var x = 0; x < titles.length; x++) 
	{
			var cell = doc.createElement("th");
			cell.style.textAlign = "center"; 
			cell.innerHTML = titles[x];

			if (titles[x] == lang.buttons.target)
			{
				cell.getElementsByTagName("img")[0].addEventListener('click', createpopup, false);
			}		
			if (titles[x] == lang.buttons.settings)
			{
				cell.getElementsByTagName("img")[0].addEventListener('click', function() 
					{
					document.getElementById("TM4rkuS_Settings").style.display = "";
					settingTabs.Performance();
					document.getElementById("TM4rkuS_divDarkBackground").style.display = "";
					}, false);
			}		
		row.appendChild(cell);
	}
	
	//Erweiterte Settings
	createSettings();
	
	var row = doc.createElement("tr");
	table.appendChild(row);	
	for(var prop in settings.singleAttack.settings)
	{
		if (prop == "attackWithUnits")
		{
			continue;
		}
		var cell = doc.createElement("td"); 
		cell.style.textAlign = "center";
		row.appendChild(cell);
		var input = doc.createElement("input");
		input.type = "text";
		if (prop == "target")
		{
			input.size = "6";
			input.addEventListener('blur', function() 
				{
					if(!this.value.match(/\d+\|\d+/)) 
					{
						this.value = "xxx|yyy";
					}
				}, false);
		}
		
		else
		{
			input.size = "2";
			input.addEventListener('blur', function() 
				{
					if(isNaN(this.value) || this.value == "") 
					{
						this.value = 0;
					}
				}, false);
		}
		
		input.style.textAlign = "center";
		input.value = settings.singleAttack.settings[prop];
		input.id = prop;
		input.addEventListener('keyup', filter, false);
		input.addEventListener('keyup', aKeyWasPressed, false);
		
		cell.appendChild(input);
	}
	
	var cell = doc.createElement("td");
	row.appendChild(cell);
	
	var checkbox = doc.createElement("input");
	checkbox.type = "checkbox";
	checkbox.name = "attack";
	checkbox.id = "attackWithUnits";
	checkbox.defaultChecked = false;
	checkbox.addEventListener('click', function() {
	save();
	}, false);
	cell.appendChild(checkbox);
	checkbox.checked = settings.singleAttack.settings["attackWithUnits"];
	if (localStorage.getItem("tm4rkus_used_villages") != null)
	{
	var done_img = document.createElement("img");
	done_img.src = "http://forumandersreisen.de/images/kreuz_rot.gif";
	done_img.alt = " x";
	done_img.title = lang.messages.remove_used_villages;
	done_img.addEventListener('click', function()
	{
		localStorage.removeItem("tm4rkus_used_villages");
		save();
		this.parentNode.removeChild(this);
		var crosses = document.getElementsByTagName("img");
		for (var i = 0; i < crosses.length; i++)
		{
			if (crosses[i].id == "done_img")
			{
				crosses[i].parentNode.removeChild(crosses[i]);
			}
		}
	}, false);
	cell.appendChild(done_img);
	}
	
	
	var cell = doc.createElement("td");
	row.appendChild(cell);
	
	//Favoriten-Links richtig positionieren
	//af.style.top = (document.getElementById("spear").getBoundingClientRect().bottom + 5) + "px";	
	//get_favorite.style.top = (document.getElementById("spear").getBoundingClientRect().top - (document.getElementById("spear").getBoundingClientRect().bottom - document.getElementById("spear").getBoundingClientRect().top +3)) + "px";
	
}

}

//filter
{function filter() {

	var start_time = (new Date()).getTime();
	var self = this.id;
	var village_count = 0;
	var used_villages = localStorage.getItem("tm4rkus_used_villages");
	var mainTable = _evaluate('//tr[contains(@class, "row_")]/parent::tbody')[0];
	mainTable.id = "mainTable";
	var runtime  = parseInt(doc.getElementById("runtime").value);
	var start 	 = parseInt (doc.getElementById("start").value);
	var end 	 = parseInt (doc.getElementById("end").value);
	var spear 	 = parseInt(doc.getElementById("spear").value);
	var sword  	 = parseInt(doc.getElementById("sword").value);
	var axe 	 = parseInt(doc.getElementById("axe").value);
	var spy 	 = parseInt(doc.getElementById("spy").value);
	var light 	 = parseInt(doc.getElementById("light").value);
	var snob 	 = parseInt(doc.getElementById("snob").value);
	var coords	 = doc.getElementById("target").value;
	var heavy 	 = parseInt(doc.getElementById("heavy").value);
	var ram 	 = parseInt(doc.getElementById("ram").value);
	var catapult = parseInt(doc.getElementById("catapult").value);
	var day 	 = parseInt(doc.getElementById("day").value);
	var date 	 = parseInt(doc.getElementById("date").value);
	var units = ["spear", "sword", "axe", "spy", "light", "heavy", "ram", "catapult", "snob"];
	var inserted_units = [spear, sword, axe, spy, light, heavy, ram, catapult, snob];

		if (type == "knight!=marcher")
			{
			var knight = parseInt(doc.getElementById("knight").value);
				var inserted_units = [spear, sword, axe, spy, light, heavy, ram, catapult, knight, snob];
				var units = ["spear", "sword", "axe", "spy", "light", "heavy", "ram", "catapult", "knight", "snob"];
			}
		
		if (type == "knight")
			{
			var archer 	= parseInt(doc.getElementById("archer").value);
			var marcher = parseInt(doc.getElementById("marcher").value);
			var knight = parseInt(doc.getElementById("knight").value);
				var inserted_units = [spear, sword, axe, archer, spy, light, marcher, heavy, ram, catapult, knight, snob];
				var units = ["spear", "sword", "axe", "archer", "spy", "light", "marcher", "heavy", "ram", "catapult", "knight", "snob"];
			}
		
		if (type == "extended")
			{
			var archer 	= parseInt(doc.getElementById("archer").value);
			var marcher = parseInt(doc.getElementById("marcher").value);
			var units = ["spear", "sword", "axe", "archer", "spy", "light", "marcher", "heavy", "ram", "catapult", "snob"];
			var inserted_units = [spear, sword, axe, archer, spy, light, marcher, heavy, ram, catapult, snob];
			}
			
			var attack = doc.getElementById("attackWithUnits").checked;
	
	var time_akt = Number(new Date());
	
	if(isNaN(start) || isNaN(end) || isNaN(runtime) || runtime == 0) {
		start = -1;
	}

	var UViHTML = document.URL;
		if(UViHTML.match(/[&?](t=\d+)/)) {
		var uv = ("&"+RegExp.$1);
		} else {
			var uv = "";
		} 
		
	if (coords.match(/\|/) && coords != "xxx|yyy" && start != -1) {
		var targetX = coords.split("|")[0];
		targetX =("00" + targetX).substr(-3);  
		var targetY = coords.split("|")[1];
		targetY =("00" + targetY).substr(-3);
		var sortierung = new Array();    
	} else {
		coords = false;
	}

	var server = location.host.split(".")[0];
	var rows = _evaluate('//tr[contains(@class, "row_")]');

	var	zaehler = 0;
	var cell_indexes = new Array();
	for (var units_count = 0; units_count < inserted_units.length;units_count++)
	{
	cell_indexes.push(getTroopsCell(units[units_count]));
	}
	
	var now = new Date();
	now = now.getTime();
	
	var titles = [active_group, lang.anything.allVillages];
	for (var i = 0; i <= titles.length-1; i++)
	{
		if (!checkExistence(read_villages[titles[i]]))
		{
			read_villages[titles[i]] = 
			{ 
			id: [], 
			troups: [],
			coords: [],
			};
		}
	}
	
	var times = []
	
	var all_villages_troup_count = new Array();
	for(var i = 0; i < (rows.length); i++) 
	{
		var cells = rows[i].getElementsByTagName("td");
		var vill_name = cells[getTroopsCell(lang.anything.village)].getElementsByTagName("a")[0].getElementsByTagName("span")[0];
	
	
		if(coords !== false) 
		{
		if ((vill_name.innerHTML.match(/\((\d+)\|(\d+)\)/))) {
				var x = ("00" + RegExp.$1).substr(-3);        
				var y = ("00" + RegExp.$2).substr(-3);
				var diffX = targetX - x;
				var diffY = targetY - y;
				var range = Math.sqrt((diffX*diffX)+(diffY*diffY));
				var time_an = parseInt(time_akt)+parseInt(Math.round(range*runtime*60*1000));
				var arrival = new Date(time_an);
			}
		}
	
		
		var loeschen = 0;
		
		var single_village_troup_count = new Array();
		
		//Überprüfung auf Truppen-Stärken
		for (var units_count = 0; units_count < inserted_units.length;units_count++)
		{	
		if (parseInt(cells[cell_indexes[units_count]].textContent) < parseInt(inserted_units[units_count]))
		var loeschen = 1;
		single_village_troup_count.push(parseInt(cells[cell_indexes[units_count]].textContent));
		}
		
		
		var id = vill_name.id.substring(11);
				
		//Speichern der Dörfer
		if ((vill_name.innerHTML.match(/\((\d+)\|(\d+)\)/))) 
			{
				var x = ("00" + RegExp.$1).substr(-3);        
				var y = ("00" + RegExp.$2).substr(-3);
			}
		
		
		if (self == undefined)
		{
			for (var prop in read_villages)
			{
				if (prop == "date")
				continue;
				
				if (checkExistence(read_villages[prop]))
				{
					var contain = contains(read_villages[prop].id, id);
					if (contain != false)
					{
						read_villages[prop].troups[contain-1] = single_village_troup_count;
					}
				}
				else
					var contain = false;
				
				if ((contain == false) && (prop == active_group) || (contain == false) && (prop == lang.anything.allVillages))
				{
					read_villages[prop].id.push(id);
					read_villages[prop].coords.push(x+"|"+y);
					read_villages[prop].troups.push(single_village_troup_count);
				}
			}
		}
		
		delete single_village_troup_count;
		
		if(coords !== false) {
			if(end != start) {
			var arrival_hours = arrival.getHours();
				if(end < start) {
					if(arrival_hours >= end && arrival_hours < start) {
						var loeschen = 2;
					}
				} else {
					if(arrival_hours >= end || arrival_hours < start) {
						var loeschen = 3;
					}
				}
			}
			
			if(!isNaN(day) && day != 0) {
				if(day != arrival.getDate()) {
					var loeschen = 4;
				}
			}
			
			if(!isNaN(date) && date != 0) {
				if(date != (arrival.getMonth()+1)) {
					var loeschen = 5;
				}
			}
		}
		if (loeschen == 0)
		village_count++;
		if (self == "filterButton")
		{
		if(loeschen > 0) 
		{
			rows[i].parentNode.removeChild(rows[i]);
		}
		else if(coords !== false) 
		{
			loeschen = 0;
			var seconds = ("0" + Math.round((range*runtime*60)% 60)).substr(-2);
			var minutes = ("0" + Math.floor((range*runtime)% 60)).substr(-2);
			var hours = Math.floor(range*runtime/60);  
			
			var runtimeStr = lang.messages.runtime + "= ";
			if(hours > 23) 
			{
				runtimeStr = lang.messages.runtime + Math.floor(hours/24) + lang.messages.day_s;
				hours = hours% 24;
			}
			
			runtimeStr += hours + ":" + minutes + ":" + seconds;
			
			hours = ("0" + arrival.getHours()).substr(-2);
			minutes = ("0" + arrival.getMinutes()).substr(-2);  
			seconds = ("0" + arrival.getSeconds()).substr(-2); 
			 
			link = document.createElement("a");
			link.id = "link"+[i];
			link.name = "link"+[i];
			link.href = "http://" + server + "." + main_adress + "." + server_location + "/game.php?" + "village=" + id + uv + "&screen=place&filter=" + targetX + "|" + targetY; 
			
			link.title = runtimeStr;
			
			var place_img = document.createElement("img");
			place_img.src = "/graphic/buildings/place.png";
			place_img.alt = lang.anything.place;
			place_img.title = lang.anything.place;
			
			var cell = doc.createElement("span");
			cell.id = "cell"+[i];
			cell.appendChild(link);
			cells[getTroopsCell(lang.anything.village)].appendChild(cell);			
			link.appendChild(place_img);   
			link.addEventListener('mousedown', function(evt) 
			{
				already_used_villages(this,evt);
			}, false);
			
			if (document.getElementById("attackWithUnits").checked == true)
			{
			if ((used_villages != null)	&& (used_villages.match(id)))
			ad_cross(link);
			}
		
			var time = document.createElement("span");
			time.id = "time"+[i];
			time.innerHTML = "(" + arrival.getDate() + "." + (parseInt(arrival.getMonth())+1) + "." + " " + hours + ":" + minutes + ":" + seconds +")";
			times.push(time);
			link.appendChild(time);
			
			rows[i].id = time_an + x + y;
			sortierung.push(time_an + x + y);
		} else {
			zaehler++;
		}
		}
		}
		var end_time = (new Date()).getTime();
		if ((settings.activateFilterOnTheFly != false) || (self == "filterButton"))
	{
		document.getElementById("filterButton").value = lang.buttons.filter + " (" + village_count + "/" + rows.length + ")";
	}
	if (self == "filterButton")
	{
		save();
		setRecentVillages();
		var img_correct = document.createElement("img");
		img_correct.src = ("http://www.buildingregister.com/graphics/sysimages/Tick_Transparent.gif")
		document.getElementById("filterButton").parentNode.appendChild(img_correct);
		//setInterval(function() {for (var i = 0; i < times.length; i++) { times[i].innerHTML += "a" } }, 1000);
		if(coords !== false) 
		{
			sortierung.sort(function(a,b) 
			{
				return a - b;
			});
			
			sortierung.reverse();
			var table = doc.getElementById("mainTable"); 
			var row = table.getElementsByTagName('tr');
			for(var i = 0; i < sortierung.length; i++) 
			{
				table.insertBefore(doc.getElementById(sortierung[i]),row[getRows()]);
			}
			end_time = (new Date()).getTime();
			window.alert(lang.messages.troopsDirected(sortierung.length, start, end, runtime, targetX+"|"+targetY));
		
		} 
		else 
		{
			window.alert(lang.messages.troopsDirectedMinimal(zaehler));
		}
	}
	localStorage.setItem("tm4rkus_read_villages"+uv, JSON.stringify(read_villages));
	settings.duration.singleFilter = (end_time - start_time);
	document.getElementById("filterButton").title = "Script by TM4rkuS. Thanks for using it. (" + settings.duration.singleFilter + "ms)";
	localStorage.setItem("tm4rkus_settings", JSON.stringify(settings));
	}

}

//create Add Links
{
function createAddLinks(site) {
	
	if (document.URL.match(/\info_player\&id=/))
	{
		multiple_attacks_target_lists = JSON.parse(localStorage.getItem("tm4rkus_multiple_attacks_targets"));
		settings = JSON.parse(localStorage.getItem("tm4rkus_settings"));
		var village_table = doc.getElementById("villages_list");
		var nodes = village_table.getElementsByTagName("a");
		for(var i = 0; i < nodes.length-1; i++) 
		{
			if ((nodes[i].href.match(/village=\d+&screen=info_village&id=\d+$/)) && (!contains(multiple_attacks_target_lists[settings.activatedTargetList], nodes[i].parentNode.parentNode.getElementsByTagName("td")[1].textContent))) 
			{
				addAddButton(nodes[i].parentNode.parentNode.getElementsByTagName("td")[1]);
			}
			else if ((/village=\d+&screen=info_village&id=\d+$/.test(nodes[i].href)) && (contains(multiple_attacks_target_lists[settings.activatedTargetList], nodes[i].parentNode.parentNode.getElementsByTagName("td")[1].textContent)))
			{
				addDeleteButton(nodes[i].parentNode.parentNode.getElementsByTagName("td")[1]);
			}
		}	
		
		window.addEventListener("focus", function() 
		{
			multiple_attacks_target_lists = JSON.parse(localStorage.getItem("tm4rkus_multiple_attacks_targets"));
			settings = JSON.parse(localStorage.getItem("tm4rkus_settings"));
			var village_table = doc.getElementById("content_value").getElementsByTagName("TABLE")[2];
			var nodes = village_table.getElementsByTagName("a");
			for(var i = 0; i < nodes.length-1; i++) 
			{
				
				if ((nodes[i].href.match(/village=\d+&screen=info_village&id=\d+$/)) && (!contains(multiple_attacks_target_lists[settings.activatedTargetList], nodes[i].parentNode.parentNode.getElementsByTagName("td")[1].textContent))) 
				{
					var img = nodes[i].parentNode.parentNode.getElementsByTagName("td")[1].getElementsByTagName("img")[0];
					img.parentNode.removeChild(img);
					addAddButton(nodes[i].parentNode.parentNode.getElementsByTagName("td")[1]);
				}
				else if ((/village=\d+&screen=info_village&id=\d+$/.test(nodes[i].href)) && (contains(multiple_attacks_target_lists[settings.activatedTargetList], nodes[i].parentNode.parentNode.getElementsByTagName("td")[1].textContent)))
				{
					var img = nodes[i].parentNode.parentNode.getElementsByTagName("td")[1].getElementsByTagName("img")[0];
					img.parentNode.removeChild(img);
					addDeleteButton(nodes[i].parentNode.parentNode.getElementsByTagName("td")[1]);
				}
			}
		}, false);
		var rows = village_table.getElementsByTagName("tr");
		var link = rows[rows.length-1].getElementsByTagName("a")[0];
		link.addEventListener("click", function() { session_settings.links_added = 1 }, false)
		var remaining = parseInt(link.textContent.match(/\d+/));
		village_table.addEventListener("DOMNodeRemoved", function() 
		{
			if (session_settings.links_added == 1)
			{
				var village_table = this;
				var rows = village_table.getElementsByTagName("tr");
				//alert(i + " == " + (remaining+100));
				var nodes = village_table.getElementsByTagName("a");
				for(var i = 0; i < nodes.length; i++) 
				{
					if ((nodes[i].href.match(/village=\d+&screen=info_village&id=\d+$/)) && (!contains(multiple_attacks_target_lists[settings.activatedTargetList], nodes[i].parentNode.parentNode.getElementsByTagName("td")[1].textContent))) 
					{
						var img = nodes[i].parentNode.parentNode.getElementsByTagName("td")[1].getElementsByTagName("img")[0];
						if(!img)						
						addAddButton(nodes[i].parentNode.parentNode.getElementsByTagName("td")[1]);
					}
					else if ((/village=\d+&screen=info_village&id=\d+$/.test(nodes[i].href)) && (contains(multiple_attacks_target_lists[settings.activatedTargetList], nodes[i].parentNode.parentNode.getElementsByTagName("td")[1].textContent)))
					{
						var img = nodes[i].parentNode.parentNode.getElementsByTagName("td")[1].getElementsByTagName("img")[0];
						if(!img)						
						addDeleteButton(nodes[i].parentNode.parentNode.getElementsByTagName("td")[1]);
					}
				}
				session_settings.links_added = 0;
			}
		}, false);
	}
	
	if (document.URL.match(/\info_village\&id=/))
	{
			multiple_attacks_target_lists = JSON.parse(localStorage.getItem("tm4rkus_multiple_attacks_targets"));
			settings = JSON.parse(localStorage.getItem("tm4rkus_settings"));
			var td = document.getElementById("content_value").getElementsByTagName("td");
			for (var i = 0; i < td.length-1; i++)
			{
				if (td[i].innerHTML == lang.anything.coordinates)
				{
					var coords = td[i+1].textContent;
				}	
				if (td[i].innerHTML.match(lang.anything.sendtroups))
				{
					var sendtroups = td[i];
				}	
			}
			if (!contains(multiple_attacks_target_lists[settings.activatedTargetList], coords))
			{
				addAddButton(sendtroups, coords);
			}
			if (contains(multiple_attacks_target_lists[settings.activatedTargetList], coords))
			{
				addDeleteButton(sendtroups, coords);
			}
		window.addEventListener("focus", function() 
		{
			multiple_attacks_target_lists = JSON.parse(localStorage.getItem("tm4rkus_multiple_attacks_targets"));
			settings = JSON.parse(localStorage.getItem("tm4rkus_settings"));
			multiple_attacks_target_lists = multiple_attacks_target_lists_temp;
			settings = settings_temp;
			var td = document.getElementById("content_value").getElementsByTagName("td");
			for (var i = 0; i < td.length-1; i++)
			{
				if (td[i].innerHTML == lang.anything.coordinates)
				{
					var coords = td[i+1].textContent;
				}	
				if (td[i].innerHTML.match(lang.anything.sendtroups))
				{
					var sendtroups = td[i];
				}	
			}
			var img = sendtroups.getElementsByTagName("img")[0];
			img.parentNode.removeChild(img);
			if (!contains(multiple_attacks_target_lists[settings.activatedTargetList], coords))
			{
				addAddButton(sendtroups, coords);
			}
			if (contains(multiple_attacks_target_lists[settings.activatedTargetList], coords))
			{
				addDeleteButton(sendtroups, coords);
			}
		}, false);
	}
}

}

//save	
function save() {

	if (document.getElementById("TM4rkuS_coordlist")) 
	{	
		if (document.getElementById("TM4rkuS_coordlist").value == "")
		{
			multiple_attacks_target_lists[settings.activatedTargetList] = [];
		}
		else
		{
			multiple_attacks_target_lists[settings.activatedTargetList] = document.getElementById("TM4rkuS_coordlist").value.replace(/\r/g, "").replace(" ", "").split(/\n/);
			if (multiple_attacks_target_lists[settings.activatedTargetList] == "")
			{
				multiple_attacks_target_lists[settings.activatedTargetList] == [];
			}
		}
		localStorage.setItem("tm4rkus_multiple_attacks_targets", JSON.stringify(multiple_attacks_target_lists));
	}
	
	var start = 	doc.getElementById("start").value;
	var end = 		doc.getElementById("end").value;
	var day = 		doc.getElementById("day").value;
	var date = 		doc.getElementById("date").value;
	var runtime = 	doc.getElementById("runtime").value;
	var target = 	doc.getElementById("target").value;
	var attackWithUnits =	doc.getElementById("attackWithUnits").checked;
	
	var myUnits = getUnits();
	var inserted_units = myUnits[0];
	var units = myUnits[1];
	settings.singleAttack["units"] = {};
	settings.singleAttack["settings"] = {};
	
	var names = ["start", "end", "day", "date", "runtime", "target", "attackWithUnits"];
	var values = [start, end, day, date, runtime, target, attackWithUnits];
	for (var i = 0; i < names.length; i++)
	{
		settings.singleAttack["settings"][names[i]] = values[i];
	}
	for (var i = 0; i < inserted_units.length; i++)
	{
		settings.singleAttack["units"][units[i]] = inserted_units[i];
	}
		localStorage.setItem("tm4rkus_settings",JSON.stringify(settings));
	
		
}

//options
//(variables, main) 
	var start_time = (new Date()).getTime();
	var doc = getDoc();
	var mode = getMode();
	if (!settings.server_runtimes)
	{
		var server_runtimes = getServerRuntimes();
		settings["server_runtimes"] = server_runtimes;
		localStorage.setItem("tm4rkus_settings", JSON.stringify(settings));
	}
	else
	{
		var server_runtimes = settings.server_runtimes;
	}
	var attacked_villages = {};

	//Links zum Hinzufügen zur Ziel-Liste auf Spieler-, Dorf-Übersicht erstellen
	createAddLinks();

	//Kombiniert-Übersicht
	if (twNL_legal != true){
		/*do nothing*/
	}
	else if(mode == "combined")
	{
		var mainTable = _evaluate('//tr[contains(@class, "row_")]/parent::tbody')[0];
		mainTable.id = "mainTable";
			
		//Stelle der Gruppen ermitteln
		var cell = document.getElementsByClassName("vis_item")[0];
			
		//Aktivierte Gruppe auslesen
		var active_group = cell.getElementsByTagName("strong")[0].innerHTML.replace(/\ &gt; |^&gt;|&lt; /g, "");
		
		var type;
		getUnitsInfos();
		
		var buildUpStartTime = new Date().getTime();
		createMenu();
		settings.duration.buildUp = (new Date().getTime() - buildUpStartTime);
		filter();
		if (settings.firstExec == false)
		{
			if (confirm(lang.anything.watchTutorial))
			{
				document.getElementById("TM4rkuS_Settings").style.display = "";
				settingTabs.Youtube();
				document.getElementById("TM4rkuS_divDarkBackground").style.display = "";
			}
			settings.firstExec = true;
			localStorage.setItem("tm4rkus_settings", JSON.stringify(settings));
		}
	}
	else if(location.href.match(/\d+\&screen=overview$/))
	{
		village_overview();
	}
	//Versammlungsplatz-Übersicht	
	else if(location.href.match(/screen=place/)) 
	{
		update_troups(location.href);
		if (location.href.match(/\&filter=/)) 
		{
			// Koordinaten einfuegen
			var coords = location.href.split("filter=")[1].split("|");
			doc.getElementById("inputx").value = coords[0];
			doc.getElementById("inputy").value = coords[1];
			
			if (settings.singleAttack.settings["attackWithUnits"] == false) 
			{
				var runtime = settings.singleAttack.settings["runtime"];
				
				var l, i = 0; 
				var neighbor = 0;
				
				while (l = document.links[i++]) 
				{	
					if (l.href.match("mode=neighbor")) 
					neighbor = 1;
					
					if ((neighbor == 1) && (l.href.match("javascript:insertUnit")))
					{
						for (var prop in server_runtimes)
						{
							var unit = prop;
							var troop_runtime = server_runtimes[prop];
							
							if ((parseInt(runtime) >= parseInt(troop_runtime)) && (l.href.match("_"+unit)))
							{
							location.href = l.href;	
							}
						}
					
					}
					
					if (l.href.match("unit_input_snob"))
					neighbor = 0;
				}
			}
			else
			{
				for (var prop in settings.singleAttack.units)
				{
					location.href = "javascript:insertUnit($('#unit_input_"+prop+"'), "+settings.singleAttack.units[prop]+")";
				}
			}
		}
	}
	else if (location.href.match(/screen=premium&mode=transfer&player=lippfux/))
	{
	document.getElementById("content_value").getElementsByTagName("input")[0].value = "lippfux";
	}
	var end_time = (new Date()).getTime();
	settings.duration.total = (end_time - start_time);
	localStorage.setItem("tm4rkus_settings",JSON.stringify(settings));
	var span = document.createElement("span");
	span.innerHTML = " <b>|</b> Truppenfilter by TM4rkuS: " + settings.duration.total + "ms ";
	document.getElementById("serverDate").parentNode.appendChild(span);

})();