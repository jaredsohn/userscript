// ==UserScript==
// @name DS Ally Orders
// @description Version 7.3.0 | Befehle exportieren/importieren/darstellen
// @author Samrat, Fragmente uebernommen von: Hypix, The Real Otto, Heinzel,... (to be continued)
// @include http://de*.die-staemme.de/game.php*overview*
// @include http://de*.die-staemme.de/game.php*mail*
// @include http://de*.die-staemme.de/game.php*place*try*
// @include http://de*.die-staemme.de/game.php*info_village*
// @include http://de*.die-staemme.de/game.php*info_player*
// ==/UserScript==

//Versionhistory:
//0.0.1 Befehlsuebersicht exportieren, PN importieren; Dorf-Info ergaenzen
//0.0.2 Spieler-Info: Anzahl Angriffe je Dorf (ohne Aktualisierung alter Angriffe)
//7.0.0 Anpassung auf DS 7.0 und Feintuning (Layout, Performance Spielerinfo, Rueckkehr auf Heimatdorf)
//7.0.1 Ergaenzung Befehlsliste in Angriffsbestaetigung und Umbenennung von Befehlen. Fehlerbehebung.
//7.0.2 Austausch Rueckzug = Rueckkehr. Fehlerbehebung Nicht-Bogen-Welt. 
//      Begrenzung Anzahl Befehle (wegen 500 Klammerpaare in PN). Exportfenster dekoriert
//7.2.0 Anpassung an DS 7.2
//7.2.1 bug fix regex vID
//7.3.0 Anpassung an DS 7.3



/*Nur fuer "Die Staemme" Premium Acoount mit Firefox/Greasemonkey!
Getestet auf W51 (DS 7.3)

BEFEHLSUEBERSICHT

» Alle Befehle exportieren
Es geht eine neues Fenster auf mit den formatierten Befehlen. Den Inhalt kopieren und per PN an Freunde/Stamm senden. 
Die Markierung "[orders]" muss dabei erhalten bleibe. Nichts an den Befehlen aendern (wie dazwischen schreiben oder BB-Codes)! 
Wenn sich das Fenster nicht oeffnet, stoert ein anderes Skript (z.B. DS TroopSums, DSoverviewFilter oder DS Laufzeiten). 
Am besten GM Einstellung "Nicht auf diese Seiten anwenden:" dieser Skripte anpassen.

» Einzelbefehle exportieren
Wenn nicht alle Befehle exportieren werden sollen, sondern nur einzelne Befehle, koennen fuer diese die Schaltflaechen 
"umbenennen" geoeffnet werden. Es werden nur die Befehle mit sichtbarem Eingabefeld exportiert.

» Befehle umbenennen
Fuer alle Befehle, deren Eingabefeld sichtbar ist, kann das erste Wort ausgetauscht werden, also z.B. "Angriff" gegen "Off". 
Natuerlich muessen alle OK-Buttons manuell geklickt werden! Die neue Bezeichnung kann aber auch bereits exportiert werden, ohne 
OK zu druecken (also ohne eine tatsaechliche Umbenennung).

NACHRICHTEN
Beim Oeffnen einer PN mit "[orders] ... [/orders]" werden die Befehle automatisch im GM-Speicher abgelegt. 
Als Absender der Befehle wird der Autor der PN eingetragen.

DORFINFO
Dies ist der ganze Sinn des Skripts: Es werden alle exportierten/importierten Befehle auf das Dorf mit Ankunftszeit und 
Truppenstaerke dargestellt - Eure und die von anderen Spielern! (Voraussetzung: Mindestens einmal selbst exportiert.)

SPIELERINFO
Vor jedem Dorf steht die Anzahl der darauf laufenden Befehle. Die Zahlen koennen veraltet sein, da eine Aktualisierung 
aus Performancegruenden nur in der Dorfinfo vorgenommen wird. (siehe Befehle loeschen).

VERSAMMLUNGSPLATZ (Befehlsbestaetigung)

Es wird die gleiche Tabelle angezeigt wie in der Dorfinfo, so dass kontrolliert werden kann, ob schon ein Befehl auf das 
Dorf bekannt ist. Dies funktioniert nur, wenn DS Ally Orders vor DS Assisten in der GM-Liste steht!

BEFEHLE LOESCHEN geht nur in der Dorfinfo: Automatisch fuer das Dorf der Info, manuell fuer die abgelaufenen Befehler aller 
Doerfer oder auch komplett. (Bei Komplettloeschung muss einmal neu exportiert werden.)

Viel Spass mit der neuen Transparenz beim Offen und Deffen! ;-)*/




(function(){
//	Alle Befehle verarbeiten (auch eigene): "" statt "X"
	var alleBefehleZeigen = "X";
//  Begrenzung Anzahl Befehle (wegen 500 []-Paare in PN)
	var orderLimit = 225;
	
	var gm = typeof(unsafeWindow) != "undefined" && navigator.userAgent.indexOf("Firefox")>-1;
	var params = parseParams(location.href);
	var columns = [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1 ]; // Spalten gefundener Einheiten
	var unitID = [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1 ];
	var firstColumn = -1;
	var countColumns = 0;

	var unitIcon = [
	                "graphic/unit/unit_spear.png?1",
	                "graphic/unit/unit_sword.png?1",
	                "graphic/unit/unit_axe.png?1",
	                "graphic/unit/unit_archer.png?1",
	                "graphic/unit/unit_spy.png?1",
	                "graphic/unit/unit_light.png?1",
	                "graphic/unit/unit_marcher.png?1",
	                "graphic/unit/unit_heavy.png?1",
	                "graphic/unit/unit_ram.png?1",
	                "graphic/unit/unit_catapult.png?1",
	                "graphic/unit/unit_knight.png?1",
	                "graphic/unit/unit_snob.png?1" 
	                ];


	var units = [
	             'Speertr\u00E4ger',
	             'Schwertk\u00E4mpfer',
	             'Axtk\u00E4mpfer',
	             'Bogensch\u00FCtze',
	             'Sp\u00E4her',
	             'Leichte Kavallerie',
	             'Berittener Bogensch\u00FCtze',
	             'Schwere Kavallerie',
	             'Rammbock',
	             'Katapult',
	             'Paladin',
	             'Adelsgeschlecht'
	             ];


	if (document.getElementById("commands_table")) {

		var tab = document.getElementById("commands_table");		
		var a = tab.parentNode.insertBefore(document.createTextNode(" "),tab); // Abstand zwischen Links
		var a = tab.parentNode.insertBefore(document.createElement("a"),tab);
		a.innerHTML = "&raquo; Alle Befehle exportieren";
		a.href = "javascript:;";
		a.addEventListener("click", function() {exportOrders(true);}, false );
		var a = tab.parentNode.insertBefore(document.createTextNode(" "),tab); // Abstand zwischen Links
		var a = tab.parentNode.insertBefore(document.createElement("a"),tab);
		a.innerHTML = "&raquo; Einzelbefehle exportieren";
		a.href = "javascript:;";
		a.addEventListener("click", function() {exportOrders(false);}, false );
		var a = tab.parentNode.insertBefore(document.createTextNode(" "),tab); // Abstand zwischen Links
		var a = tab.parentNode.insertBefore(document.createElement("a"),tab);
		a.innerHTML = "&raquo; Befehle umbenennen";
		a.href = "javascript:;";
		a.addEventListener("click", function() {renameOrders();}, false );
		var a = tab.parentNode.insertBefore(document.createTextNode(" "),tab); // Abstand zwischen Links
	}

	switch( params.screen )
	{
	case "mail":
		analyzeMail();
		break;
	case "info_village":
		updateVillageInfo("v" + params.id + "_");
		break;
	case "info_player":
		updatePlayerInfo();
		break;
	case "place":
		var target = parseParams(document.getElementById("content_value").getElementsByTagName("td")[1].childNodes[0].href).id;
		updateVillageInfo("v" + target + "_");
		break;
	default:
		break;
	}

	
	function renameOrders()
	{
		var tab = document.getElementById('commands_table');
		var orderName = prompt('Schluesselwort fuer Befehl eingeben (ohne " " und "_")'); 
		
		orderName = orderName.replace(/\_| /g,"");

		if(orderName.length > 0) {
			for(var i = 1; i < tab.rows.length; i++ ) {
				if(tab.rows[i].cells.length > countColumns) {
					var labelText = tab.rows[i].cells[0].childNodes[5].childNodes[0].childNodes[1];
					var input = tab.rows[i].cells[0].childNodes[7].childNodes[0];	
					var str = labelText.innerHTML;
					if (labelText.offsetLeft == 0) {
						input.value = orderName + str.substring(str.indexOf(' '));  
					} else {
						input.value = str;
					}
				} 
			}  
		}
	}
	
	
	function updatePlayerInfo()
	{
		var allyOrders = new Storage("AllyOrders",true);
		var villages = document.getElementById("content_value").getElementsByTagName("td");
		var params;
		var html = "";
		var village_count = 0;
		var vals = allyOrders.listValues();
		vals.sort;

		for ( var i = 0; i < villages.length; i++) {
			if (villages[i].hasChildNodes){
				if (villages[i].childNodes[0].href) {
					var params = parseParams(villages[i].childNodes[0].href);
					if (params.screen == "info_village") {
						village_count = 0;
						for ( var j = 0; j < vals.length; j++)
							if (vals[j].match("v"+params.id+"_")) {village_count++};
							if (village_count >0 ) {
								html = village_count + '<img src ="/graphic/command/attack.png" alt="&#160;&gt;&#160;">' + villages[i].childNodes[0].innerHTML;
								villages[i].childNodes[0].innerHTML = html;
							}
					}
				}
			}
		}
	}


	function updateVillageInfo(vID)
	{
		var game_data = getGameData();
		var allyOrders = new Storage("AllyOrders",true);
		var vals = allyOrders.listValues();
		var DSversion = game_data.version.match(/\d+ (\d+)\.(\d+)/)[1];
		
		if (params.screen == 'place') {
			var tab = document.getElementById("troop_confirm_go").parentNode;
		} else {		
			if ( DSversion < 7) {	
				var tab = document.getElementById("content_value").getElementsByTagName("table")[0].parentNode.parentNode;
			}	
			else {
				var tab = document.getElementById("content_value").getElementsByTagName("table")[0].rows[0].cells[1];

			}
		}
		var newTab =tab.appendChild(document.createElement("table"));

		var html_length = 0;
		var html = '<table class="vis"><h2>&nbsp;</h2>';
		var key;
		var datum = "";
		var msek = "";
		var content;
		var dateVal = new Date();
		var orders = new Array();

		var serverDate = "" + document.getElementById("serverDate").innerHTML;
		var serverTime = "" + document.getElementById("serverTime").innerHTML;
		if (serverTime.length == 7) serverTime = "0" + serverTime;

		var jetzt = new Date();
		jetzt = strToDate(serverDate + " " + serverTime);

		var heute = strToDate(serverDate + "00:00:00");
		var morgen = new Date();
		var milliSec = heute.getTime();
		var milliSecMorgen = milliSec + (24*60*60*1000);
		morgen.setTime(milliSecMorgen);

		var heuteStr = dateToStr(heute).match(/\d\d\.\d\d./);
		var morgenStr = dateToStr(morgen).match(/\d\d\.\d\d./);

		vals.sort();

		html += '<tr>';

		unitID = allyOrders.getString("units").split(" "); // Einheiten der Welt! Falls "undefined" muss ein neuer Export erfolgen!

		for (var j = 0; j < unitID.length; j++) {
			if (unitID[j] > -1 ) {
				html += '<th><img src="' + unitIcon[unitID[j]] + '"></th>';
			}
		}    

		html += '<th nowrap>Ankunft</th><th nowrap>Typ</th><th nowrap>Von</th></tr>';

		html_length = html.length;

		for(var i = 0; i < vals.length; i++ ) {
			if (vals[i].match(vID)) {
				key = vals[i].split("_");
				content = allyOrders.getString(vals[i]).split("_");
				dateVal.setTime(parseInt(key[1]),10);
				if ((dateVal > jetzt) && (game_data.player.name != alleBefehleZeigen + content[1])) {
					datum = dateToStr(dateVal).replace(/\d\d\d\d/," um");
					msek = datum.match(/\d\d\d/);
					datum = datum.replace(/:\d\d\d/,"");
					if (DSversion >= 7) {
						datum = datum + ':<span class="grey small">' + msek + '</span>';					
					};
					if (datum.match("^"+heuteStr)) {
						datum = datum.replace(heuteStr, "heute");
					} else if (datum.match("^"+morgenStr)) {
						datum = datum.replace(morgenStr, "morgen");
					} else {
						datum = "am " + datum;
					}

					html += '<tr>';
					var units = content[0].split(" ");
					for (var j = 0; j < units.length; j++) {
						if (units[j] == "0") {
							html += '<td><span class="grey">0</span></td>';
						}
						else {
							html += '<td>' + units[j] + '</td>';
						}
					}  
					html += '<td nowrap>' + datum + '</td>	<td> ' + content[3] + '</td>';
					html += '<td><a href = /game.php?screen=info_player&amp;id=' + content[2] + '>' + content[1] + '</td>';
					html += '</tr>';
				}
				else {
					allyOrders.clear(vals[i]);
				}
			}
		}
		
		var vals = allyOrders.listValues();  // Aktualisierung fuer korrekte Gesamtanzahl

		if (html.length > 0*html_length) {
			newTab.innerHTML = html + '</table>';
			newTab = newTab.parentNode.appendChild(document.createElement("table"));
			newTab.innerHTML = (vals.length - 1) + (vals.length == 2? ' Befehl':' Befehle') + ' gespeichert ';

			if (params.screen != 'place') {
				var a = newTab.appendChild(document.createElement("a"));
				a.href = "javascript:;";
				a.innerHTML = "&raquo;&nbsp;Alle&nbsp;l&ouml;schen ";
				a.addEventListener("click", function(){ clearStorage("alle"); }, false);	
				var a = newTab.appendChild(document.createElement("a"));
				a.href = "javascript:;";
				a.innerHTML = "&raquo;&nbsp;Abgelaufene&nbsp;l&ouml;schen";
				a.addEventListener("click", function(){ clearStorage("alte"); }, false);	
			}
		}
	}

	function analyzeMail()
	{
		var game_data = getGameData();
		var allyOrders = new Storage("AllyOrders",true);
		var mails;
		var authors;
		var authorName;
		var authorID;
		var key = "";
		var content = "";
		var typID = "";
		var commandID = "";
		var Ankunftszeit = new Date();
		var output = "";
		var serverDate = "" + document.getElementById("serverDate").innerHTML;
		var serverTime = "" + document.getElementById("serverTime").innerHTML;
		if (serverTime.length == 7) serverTime = "0" + serverTime;

		var jetzt = new Date();
		jetzt = strToDate(serverDate + " " + serverTime);

		if (params.mode!="view" || params.action=="answer") return;

		mails = document.getElementsByClassName("text");
		authors = document.getElementsByClassName("author");

		for(var i=0; i< mails.length; i++) {
			
			// Einen Eintrag erzeugen
			// key = vDORFID_TIMESTAMP_COMMANDID

			if (mails[i].className == "text") {
				authorName = authors[i].childNodes[0].innerHTML;
				authorID = parseParams(authors[i].childNodes[0].href).id;
				if ((mails[i].innerHTML.search(/\[orders\]/) > -1) && (game_data.player.name != alleBefehleZeigen + authorName)) {
					for (j=0; j<mails[i].childNodes.length;j++) {
						if (mails[i].childNodes[j].href) {
							// Dorf-ID aus Link
							var commandParam = parseParams(mails[i].childNodes[j].href);
							key = "v" + commandParam.id;
						}
						if (mails[i].childNodes[j].nodeType== 3 && mails[i].childNodes[j].nodeValue != "\n") {
							// Alle Textknoten ausser Zeilenumbruch
							content = mails[i].childNodes[j].nodeValue;		// Platzhalter fuer Befehlstyp bzw. Uhrzeit
							if(content.search(/Uhr/) == -1) {
								// Zeile mit Befehlstyp und Command-ID
								typID = "" + content.split(' ')[1];
								typID = typID.replace(/\_/,"");				// Loeschen von "_" in unbenannten Angriffen
								commandID = content.split(' ')[2];							
							}
							else {
								// Zeile mit Ankunftszeit und Truppen
								Ankunftszeit = strToDate(content.substring(1, content.indexOf("Uhr")-1)); 
								if (Ankunftszeit > jetzt) {
									key = key + "_" + Ankunftszeit.getTime() + "_" + commandID;
									key = key.replace(/ /g,"_");
									content = content.substring(content.indexOf("Uhr")+4, content.length);
									content = content.replace(/ $/,"");		// Loeschen des letzten Leerzeichens
									// SPEICHERN 
									if ((key.search(/v\d+\_\d+_\d+/) > -1) && (content.search(/\d+ \d+ \d+ \d+ \d+ \d+ \d+ \d+/)) > -1) 
									{
										allyOrders.setString(key, content + "_" + authorName + "_" + authorID + "_" + typID);
									}
								}
							}
						}
					}
				}
			}
		}
	}

	function exportOrders(exportAll)
	{   
		var allyOrders = new Storage("AllyOrders",true);
		var tab;
		var selected = 0;
		var target;
		var home;
		var orderID = "";
		var params;
		var orderText = "";
		var labelText;
		var inputValue;
		var typ = "";
		var AnkunftText ="";
		var headersArray;
		var begin = 0;
		var max = units.length;
		var output="[orders]\n";
		var troops = 0;
		var serverDate = "" + document.getElementById("serverDate").innerHTML;
		var heute = strToDate(serverDate + "00:00:00");
		var jahr = heute.getFullYear();
		var morgen = new Date();
		var milliSec = heute.getTime();
		var milliSecMorgen = milliSec + (24*60*60*1000);
		morgen.setTime(milliSecMorgen);

		var heuteStr = dateToStr(heute);
		var morgenStr = dateToStr(morgen); 

		tab = document.getElementById("commands_table");
		if(!tab) return;  

		headersArray = tab.getElementsByTagName("th");

		// Vorhandene Einheitentypen ermitteln
		for(var a = 0; a < units.length; a++) {
			for(var i = begin; i < headersArray.length; i++) {
				if(headersArray[i].innerHTML.search(units[a])!=-1) {
					if(columns[a] == -1) {
						if(firstColumn == -1) firstColumn = i;
						columns[a] = i;
						unitID[a] = a;
						countColumns++;
						begin = i+1;
						break;
					}
				}
			}
		}

		allyOrders.setString("units",unitID.join(" "));  // Einheiten der Welt! Falls "undefined" muss ein neuer Export erfolgen!

		if (tab.rows.length - 1 > orderLimit) {
			output = 'Zu viele Befehle wegen []-Beschränkung in Nachrichten.\n';
			output += 'Bitte "Befehle pro Seite" auf ' + orderLimit + ' reduzieren und seitenweise exportieren!';
		} else {
			for(var i = 1; i < tab.rows.length; i++ ) {

				if(tab.rows[i].cells.length > countColumns) {
					// Export nur, wenn "Alle" gewaehlt oder "umbenennen" gedrueckt (offSet labelText)
					// DOM: TD >> text|IMG|text|SPAN >> a >> text| SPAN liefert "labeltext[x]"
					// getElementById("labelText[" + orderID + "]") einfacher, aber scheinbar falsch sortiert in Hypix DS Assistent
					labelText = tab.rows[i].cells[0].childNodes[5].childNodes[0].childNodes[1];
					if (exportAll || labelText.offsetLeft == 0){
						// DOM: TD >> text|IMG|text|SPAN >> a          
						params = parseParams(labelText.parentNode.href);            
						orderID = params.id;
						// DOM: TD >> text|IMG|text|SPAN >> a >> text| SPAN >> text 
						orderText = tab.rows[i].cells[0].childNodes[7].childNodes[0].value;  	// Dies ist der inputValue!!
						target =  orderText.match("\\((\\d{1,3})\\|(\\d{1,3})\\) K(\\d+)$");
						typ = "" + orderText.match("\\S+");
						typ = typ.replace(/Zur\u00FCckgeschickt/,"R\u00FCckkehr");
						typ = typ.replace(/R\u00FCckzug/,"R\u00FCckkehr");
						home = tab.rows[i].cells[firstColumn-2].firstChild.innerHTML.match("\\((\\d{1,3})\\|(\\d{1,3})\\) K(\\d+)$");
						AnkunftText = "" + tab.rows[i].cells[firstColumn-1].innerHTML.match(".+Uhr");
						// Anpassung an DS 7.0: Millisekunden retten: Zuerst </span>, dann <span xxx> loeschen
						AnkunftText = AnkunftText.replace(/<\/.+>/, "").replace(/<.+>/, "");
						// heute und morgen kann einfach ersetzt werden, "am" entfaellt
						AnkunftText = AnkunftText.replace(/heute um/g, heuteStr.substr(0,10)).replace(/morgen um/g, morgenStr.substr(0,10)).replace(/am /g, "");
						// Ersetzung "um" bei Ankunft spaeter als "morgen". Sonderfall (else): heute = 30.12., Ankunft z.B. am 02.01.: Das Jahr muss um eins erhÃƒÂ¯Ã‚Â¿Ã‚Â½ht werden! 
						if (heute < strToDate(AnkunftText.replace(/ Uhr/, "").replace(/ um/g, morgen.getFullYear()))) {
							AnkunftText = AnkunftText.replace(/ um/g, morgen.getFullYear());
						} else {
							AnkunftText = AnkunftText.replace(/ um/g, morgen.getFullYear() + 1);
						}

						if (typ.search("ckkehr") == -1) {
							// Rueckkehrbefehle werden mit Heimatdorf gespeichert
							output = output + "[coord]" + target[1] + "|" + target[2] + "[/coord] " + typ + " " + orderID + "\n" + AnkunftText +" ";
						} else {
							output = output + "[coord]" + home[1] + "|" + home[2] + "[/coord] " + typ + " " + orderID + "\n" + AnkunftText +" ";
						}
						// Code zum Truppenzaehlen von The Real Otto angepasst
						for(var j = 0; j < columns.length; j++) {
							if(columns[j] != -1) {
								troops =parseInt(tab.rows[i].cells[columns[j]].innerHTML,10);
								output = output + troops + " ";	  
							}      
						}
						output = output + "\n\n";
					}
				}
			}
			output = output + "[/orders]"
		}

		if (output.length>20) {
			alertOrders(output);
		}
	}


	function clearStorage(typ)
	{
		var game_data = getGameData();
		var allyOrders = new Storage("AllyOrders",true);
		var vals = allyOrders.listValues();
		var serverDate = "" + document.getElementById("serverDate").innerHTML;
		var serverTime = "" + document.getElementById("serverTime").innerHTML;
		if (serverTime.length == 7) serverTime = "0" + serverTime;
		var dateVal = new Date();
		var jetzt = new Date();
		jetzt = strToDate(serverDate + " " + serverTime);
		var key;
		
		var storageContent = "";

		if (typ == "alle") {
			if (confirm("Wirklich ALLE gespeicherten Befehle l\u00F6schen?\nZur Initialisierung muss ein neuer Export erfolgen.")) {
				allyOrders.clear();
				for (var i = 0; i < vals.length; i++){
					if (vals[i].match("units") == undefined) {
						allyOrders.clear(vals[i]);
					}
					document.location.reload();
				}	
			}
		}
		else {
//			if (confirm("Alle abgelaufenen Befehle l\u00F6schen?")) 
				{
				for (var i = 0; i < vals.length; i++){
// DEBUG storageContent += (i + " " + vals[i] + "\n");
					if (vals[i].match("v")) {
						key = vals[i].split("_");
						dateVal.setTime(parseInt(key[1]),10);
						if ((dateVal <= jetzt)) {
							allyOrders.clear(vals[i]);
						}
						document.location.reload();
					}
				}					
			}
		}
// DEBUG alert(storageContent);
	}

//	Code fuer Window von Heinzel
	function alertOrders(output) {
		var newWindow = window.open('', 'newWindow', 'dependent=yes,height=430,resizable=yes,scrollbars=yes,width=695');
		newWindow.document.write('<html><head><title>Exportierte Befehle</title></head>');
		newWindow.document.write('<link rel="stylesheet" type="text/css" href="/style.php?type=game&amp;stamm_new_menu&amp;stamm&amp;overview&amp;1284369428" />');
		newWindow.document.write('<link rel="stylesheet" type="text/css" href="/merged/game.css?1295617350" />');

		newWindow.document.write('<body></body></html>');
		newWindow.focus;
		var doc = newWindow.document;

		var textarea = doc.createElement("textarea");
		textarea.cols = 80;
		textarea.rows = 24;
		textarea.style.textAlign = "left";
		textarea.style.marginTop = "10px";
		textarea.style.marginLeft = "10px";
		textarea.style.backgroundColor = "rgb(255,248,230)";
		textarea.value = output;
		doc.body.appendChild(textarea);
		if (output.search(/\[orders\]/) > - 1) {
			textarea.focus();
			textarea.select();
		}
		newWindow.document.close();
	}

	function dateToStr(datum){
		var tag = datum.getDate();
		var monat = datum.getMonth() + 1;
		var jahr = datum.getFullYear();
		var std = datum.getHours();
		var min = datum.getMinutes();
		var sek = datum.getSeconds();
		var msek = datum.getMilliseconds();
		var datestr = "";
		datestr = datestr + (tag<10? "0":"");
		datestr = datestr + tag + ".";
		datestr = datestr + (monat<10? "0":"");
		datestr = datestr + monat + ".";
		datestr = datestr + jahr + " ";
		datestr = datestr + (std<10? "0":"");
		datestr = datestr + std + ":";
		datestr = datestr + (min<10? "0":"");
		datestr = datestr + min + ":";
		datestr = datestr + (sek<10? "0":"");
		datestr = datestr + sek + ":";
		datestr = datestr + (msek<100? "0":"") + (msek<10? "0":"");
		datestr = datestr + msek;

		return datestr;
	}

	function strToDate(str){
		var datum = new Date();
		str = str.replace(/\W/g, "");
		datum.setDate(parseInt(str.substr(0,2),10));
		datum.setMonth(parseInt(str.substr(2,2),10)-1);
		datum.setFullYear(parseInt(str.substr(4,4),10));
		datum.setHours(parseInt(str.substr(8,2),10));
		datum.setMinutes(parseInt(str.substr(10,2),10));
		datum.setSeconds(parseInt(str.substr(12,2),10));
		if (str.length > 14) {
			datum.setMilliseconds(parseInt(str.substr(14,3),10));
		} else {
			datum.setMilliseconds(0);
		};
		return datum;
	}


//	Autor: Hypix
	function parseParams(url)
	{
		url = url.substring(url.indexOf("?")+1);
		url = url.replace( /&amp;/g, "&" );
		url = url.split("&");
		var params = { get: function(name,def) { if(typeof(this[name]) == "undefined") return def; else return this[name]; }, };
		for( var i = 0; i < url.length; i++ )
		{
			var param = url[i].split("=");
			params[param[0]] = param[1];
		}
		return params;
	}

//	Autor: Hypix
	function getGameData()
	{
		var game_data;
		if(gm) 
		{
			game_data = unsafeWindow.game_data;
		}
		else 
		{
			var script = document.createElement("script");
			script.type = "application/javascript";
			script.textContent = 	"var input=document.createElement('input');" + 
			"input.type='hidden';" + 
			"input.value=JSON.stringify(game_data);"  + 
			"input.id='game_data';" + 
			"document.body.appendChild(input);";
			document.body.appendChild(script);
			document.body.removeChild(script);

			eval("game_data=" + document.getElementById("game_data").value + ";");
		}
		game_data.link_base = game_data.link_base.replace(/&amp;/g,"&");
		return game_data;
	}

})();


//Storage-Klasse
//Autor: Hypix
//Zur freien Verwendung
function Storage(prefix,forceGM)
{
	var gm = typeof(unsafeWindow) != "undefined" && navigator.userAgent.indexOf("Firefox")>-1
	var win = gm ? unsafeWindow : window;
	var ls = false;
	var intGetValue;
	var intSetValue;
	var prefix = prefix;
	try {ls = typeof(win.localStorage) != "undefined";} catch(e) {}
	if( !ls && !gm )
		throw("Keine geeignete SpeichermÃƒÂ¯Ã‚Â¿Ã‚Â½glichgkeit gefunden");
	if( forceGM && gm || !ls)
	{
		if( gm )
		{
			prefix = prefix + "_" + document.location.host.split('.')[0];
			intSetValue = function(key,value) 
			{
				GM_setValue(prefix+"_"+key,value);
			};
			intGetValue = function(key,defaultValue)
			{
				return GM_getValue(prefix+"_" + key, defaultValue);
			}
			this.deleteValue = function(key)
			{
				GM_deleteValue(prefix+"_"+key);
			}
			this.listValues = function(re)
			{
				var allkeys = GM_listValues();
				var serverKeys = [];
				var rePrefix = new RegExp("^"+prefix+"_(.*)$");
				if( typeof(re) != "undefined" )
					var reKey = new RegExp(re);
				for( var i = 0; i < allkeys.length; i++ )
				{
					var res = allkeys[i].match(rePrefix);
					if( res )
					{
						if( reKey ) 
						{
							res = res[1].match(reKey);
							if( res )
								serverKeys.push(res);
						}
						else
							serverKeys.push(res[1]);
					}
				}
				return serverKeys;
			}
		}
	}
	else if( ls )
	{
		intSetValue = function(key,value) 
		{
			localStorage.setItem(prefix+"_"+key, value );
		};    
		intGetValue = function(key,defaultValue)
		{
			var value = localStorage.getItem(prefix+"_"+key);
			if( value )
				return value;
			else
				return defaultValue;
		};
		this.deleteValue = function(key)
		{
			localStorage.removeItem(prefix+"_"+key);
		}
		this.listValues = function(re)
		{
			var keys = [];
			var rePrefix = new RegExp("^"+prefix+"_(.*)$");
			if( typeof(re) != "undefined")
				var reKey = new RegExp(re);
			for( var i = 0; i < win.localStorage.length; i++ )
			{
				var res = localStorage.key(i).match(rePrefix);
				if( res )
				{
					if( reKey ) 
					{
						res = res[1].match(reKey);
						if( res )
							keys.push(res);
					}
					else
						keys.push(res[1]);
				}
			}
			return keys;
		}
	}
	this.clear = function(re)
	{
		var keys = this.listValues(re);
		for( var i = 0; i < keys.length; i++ )
			this.deleteValue(keys[i]);
	}
	this.setValue = function(key,value)
	{
		switch( typeof(value) )
		{
		case "object":
		case "function":
			intSetValue(key,"j"+JSON.stringify(value));
			break;
		case "number":
			intSetValue(key,"n"+value);
			break;
		case "boolean":
			intSetValue(key,"b" + (value ? 1 : 0));
			break;
		case "string":
			intSetValue(key,"s" + value );
			break;
		case "undefined":
			intSetValue(key,"u");
			break;
		}
	}  
	this.getValue = function(key,defaultValue)
	{
		var str = intGetValue(key);
		if( typeof(str) != "undefined" )
		{
			switch( str[0] )
			{
			case "j":
				return JSON.parse(str.substring(1));
			case "n":
				return parseFloat(str.substring(1));
			case "b":
				return str[1] == "1";
			case "s":
				return str.substring(1);
			default:
				this.deleteValue(key);
			}
		}
		return defaultValue;
	}
	this.getString = function(key)
	{
		return intGetValue(key);
	}
	this.setString = function(key,value)
	{
		intSetValue(key,value);
	}
}