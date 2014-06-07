// ==UserScript==
// @name           mb_DuellFormatierer
// @namespace      skeptic35_the_west
// @description    Duellformatierer fuer The West - deutsche, englische und portugiesische Versionen
// @include        http://*.the-west.de/game.php*
// @include        http://*.the-west.net/game.php*
// @include        http://*.the-west.com.br/game.php*
// @include        http://*.the-west.com.pt/game.php*
// @author         skeptic35
// ==/UserScript==
/*
	Bei Fragen oder Hinweisen zum Script wendet euch in The West an skeptic35 (W5.de, W6.de) oder Jayne Cobb (W4.de, W7.de)
	Questions concerning the englisch version should be directed towards Stitch Hessian (W9.net)
	Dank fuer Unterstuetzung bei Konzeption, Entwicklung und Bugtesting an Nailhead
	
	Version 1.1.3
*/
var mb_Formatter = {
	/*
		diverse Regulaere Ausdruecke zur Auffindung der Daten
		in Variblen ausgelagert um ggf. leichter auf andere Sprachen anpassen zu koennen
	*/
	getMatches: function(sLanguage) {
		switch(sLanguage) {
			case 'en':
				oReturn = {
					title_match: /[dD]uel: (.+) vs\. (.+)/,
					header_match: /^On (.+ at .+ [AP]M)/,
					header_today_match: /Today (at .+ [AP]M)/,
					values_match: /Duel location/,
					rounds_match: /Total health points/,
					rank_match: /Level (\d+)/,
					duel_rank_match: /Duelling level (\d+)/,
					no_hit_match: /No hit/,
					hit_replace: /^Strike: /,
					hit_match: /- (\d+) HP/,
					total_hit_match: /Total health points/,
					summary_match: /wins the duel/,
					hit_h: 'Head',
					hit_ls: 'Left shoulder',
					hit_rs: 'Right shoulder',
					hit_la: 'Left arm',
					hit_ra: 'Right arm'
				};
				break;
			case 'pt':
				oReturn = {
					title_match: /Duelo: (.+) vs\. (.+)/,
					header_match: /^A (.+ Ã s .+)/,
					header_today_match: /Hoje (Ã s .+)/,
					values_match: /Local do Duelo/,
					rounds_match: /Total de pontos/,
					rank_match: /NÃ­vel (\d+)/,
					duel_rank_match: /NÃ­vel de duelo (\d+)/,
					no_hit_match: /NÃ£o atingiu/,
					hit_replace: /^Disparar: /,
					hit_match: /- (\d+) HP/,
					total_hit_match: /Total de pontos de saÃºde/,
					summary_match: /ganhou o duelo/,
					hit_h: 'CabeÃ§a',
					hit_ls: 'Ombro esquerdo',
					hit_rs: 'Ombro direito',
					hit_la: 'BraÃ§o esquerdo',
					hit_ra: 'BraÃ§o direito'
				};
				break;
			case 'de':
			default:
				oReturn = {
					title_match: /Duell: (.+) vs\. (.+)/,
					header_match: /^am (.+ um .+ Uhr)/,
					header_today_match: /heute (um .+ Uhr)/,
					values_match: /Austragungsort/,
					rounds_match: /Treffer/,
					rank_match: /Stufe (\d+)/,
					duel_rank_match: /Duellstufe (\d+)/,
					no_hit_match: /Kein Treffer/,
					hit_replace: /^Treffer: /,
					hit_match: /- (\d+) LP/,
					total_hit_match: /Trefferpunkte gesamt/,
					summary_match: /gewinnt das Duell/,
					hit_h: 'Kopf',
					hit_ls: 'Linke Schulter',
					hit_rs: 'Rechte Schulter',
					hit_la: 'Linker Arm',
					hit_ra: 'Rechter Arm'
				};
				break;
		}
		return oReturn;
	},
	getText: function(sLanguage) {
		switch (sLanguage) {
			case 'en':
				oReturn = {
					sRank: 'Rank',
					sChallenger: 'C',
					sTotalHP: 'total HP',
					show_title: 'Formatted Report'
				};
				break;
			case 'pt':
				oReturn = {
					sRank: 'NÃ­vel',
					sChallenger: 'D',
					sTotalHP: 'Total HP',
					show_title: 'relatÃ³rio formatado'
				};
				break;
			case 'de':
			default:
				oReturn = {
					sRank: 'Stufe',
					sChallenger: 'H',
					sTotalHP: 'TP gesamt',
					show_title: 'Formatierter Bericht'
				};
				break;
		}
		return oReturn;
	},
	getLanguage: function() {
		var sReturn = 'de';
		var oTitle = document.getElementsByTagName('title')[0];
		if (oTitle.innerHTML.match(/The West - World \d/)) sReturn = 'en';
		if (oTitle.innerHTML.match(/The West - Mundo \d/)) sReturn = 'pt';
		return sReturn;
	},
	/* 
		Hauptroutine
		ruft die einzelnen Unterfunktionen auf
		no params - no return
	*/
	parse: function(myID) {
		var oData = new Object();
		oData.attacker = new Object(); oData.defender = new Object(); oData.total = new Object();
		oData.language = mbFormatter.getLanguage();
		var myReport = mbFormatter.findReport(myID);
		if (false !== myReport) {
			var oParts = mbFormatter.findParts(myReport,oData.language);
			if (false !== oParts.head) {
				oData = mbFormatter.parseHead(oData, oParts.head);
			}
			if (false !== oParts.values) {
				oData = mbFormatter.parseValues(oData, oParts.values);
			}
			if (false !== oParts.rounds) {
				oData = mbFormatter.parseRounds(oData, oParts.rounds);
			}
			if (false !== oParts.summary) {
				oData = mbFormatter.parseSummary(oData, oParts.summary);
			}
		}
		if ('left' == oData.attacker.side) {
			oData.left = oData.attacker;
			oData.right = oData.defender;
		} else if ('right' == oData.attacker.side) {
			oData.left = oData.defender;
			oData.right = oData.attacker;
		}
		//mbFormatter.display(oData,'');
		mbFormatter.format(oData);

	},
	/*
		Hilfsfunktion um Datenobjekt rekursiv auszugeben
		nur fuer Debugging geeignet
		@param (object) myData: hier die vom Parser ermittelten Daten
		@param (string) sPrefix: bei Initialaufruf leer (fuer Rekursion benoetigt)
		@return none - aber ne Menge alerts ;)
		TODO: evtl. auf Ausgabe in enem alert umstricken - wenn ich mal Zeit und Lust habe...
	*/
	display: function (myData, sPrefix) {
		if ('object' == typeof myData || 'array' == typeof myData) {
			for (value in myData) {
				if ('object' == typeof myData[value]) {
					var newPrefix = sPrefix+value+'.';
					mbFormatter.display(myData[value],newPrefix);
				} else if ('array' == typeof myData[value]) {
					for (var i=0; i < myData[value].length; i++) {
						if ('object' == typeof myData[value][i] || array == typeof myData[value][i]) {
							var newPrefix = sPrefix +'['+i+']';
							mbFormatter.display(myData[value][i], newPrefix);
						} else {
							alert(sPrefix+value+'['+i+']: '+myData[value][i]);
						}
					}
				} else if ('string' == typeof myData[value] || 'number' == typeof myData[value]) {
					alert (sPrefix+value+': '+myData[value]);
				}
			}
		}
	},
	/*
		Funktion zur Formatierung der gefundenen Daten
		@param (object) oData: Die vom Parser ermittelten Daten
		@return none - BB-Code wird in einem Alert ausgegeben
		TODO: BB-Code userfreundlicher ausgeben - evtl. schon markiert in einer Textarea oder so
	*/
	format: function (oData) {
		var aLines = new Array();
		var oText = mbFormatter.getText(oData.language);
		aLines[0] = '[b]'+oData.time+': [/b]';
		aLines[0] += '[player]'+oData.attacker.name+'[/player][b]';
		aLines[0] += ' ('+oText.sRank+' '+oData.attacker.rank+'/'+oData.attacker.duel_rank+' - [b]'+oText.sChallenger+'[/b]) vs. [/b]';
		if (true == oData.defender.npc) {
			aLines[0] += '[b]'+oData.defender.name;
		} else {
			aLines[0] += '[player]'+oData.defender.name+'[/player][b]';
		}
		aLines[0] += ' ('+oText.sRank+' '+oData.defender.rank+'/'+oData.defender.duel_rank+')[/b]';
		aLines[3] = '[b]'+oText.sTotalHP+': [color=red]'+oData.total.left+'[/color] : [color=blue]'+oData.total.right+'[/color][/b]';
		aLines[4] = oData.summary.replace(oData.left.name,'[color=red]'+oData.left.name+'[/color]').replace(oData.right.name,'[color=blue]'+oData.right.name+'[/color]');
		var imgString = '';
		var roundString = '';
		for (var i = 1; i <= oData.total_rounds; i++) {
			if ('undefined' == typeof oData.rounds[i]) break;
			var myRound = oData.rounds[i];
			var imgLeft = mbFormatter.getImage(myRound.left.zone, 'left', oData.language);
			var imgRight = mbFormatter.getImage(myRound.right.zone, 'right', oData.language);
			imgString += '[img]'+imgLeft+'[/img][img]'+imgRight+'[/img] ';
			var numLeft = mbFormatter.padNumber(myRound.left.points);
			var numRight = mbFormatter.padNumber(myRound.right.points);
			roundString += '[[b]'+i+'[/b]] [color=red]'+numLeft+'[/color] : [color=blue]'+numRight+'[/color] ';
		}
		aLines[1] = imgString;
		aLines[2] = '[size=12]'+roundString+'[/size]';
		var sText = aLines.join('\n');
		mbFormatter.showCode(sText, oData.language);
//		alert (sText);
		
	},
	/*
		Hilfsfunktion: fuellt eine Nummer auf drei Stellen mit Nullen auf (von Links)
		@param (integer) iNumer: z.B. 64
		@return (string) z.B. 064
	*/
	padNumber: function(iNumber,iLength) {
		if ('undefined' == typeof iLength) iLength = 3;
		sNumber = iNumber.toString();
		while (iLength > sNumber.length) {
			sNumber = '0'+sNumber;
		}
		return sNumber;
	},
	/*
		Liefert die Bilder zur Trefferzone
		Muss ggf. angepasst werden wenn sich der Imagehost aendert
		@param (string) sZone: Der Text der Trefferzone aus dem Duellbericht (z.B. "Linke Schulter")
		@param (string) sSide: Seite des Duellanten (left oder right)
		@return (string): URL zum zugehoerigen Bildchen
	*/
	getImage: function(sZone, sSide, myLanguage) {
		var image_base = 'http://images.foren-city.de/images/uploads';
		var image_sub = '267481';
		var oMatches = mbFormatter.getMatches(myLanguage);
		var oImages = {
			left: {
				no_hit: 'a_n_n_146',
				hit_h: 'a_k_n_171',
				hit_ls: 'a_ls_n_166',
				hit_rs: 'a_rs_n_389',
				hit_la: 'a_la_n_116',
				hit_ra: 'a_ra_n_109',
			},
			right: {
				no_hit: 'v_n_n_151',
				hit_h: 'v_k_n_860',
				hit_ls: 'v_ls_n_140',
				hit_rs: 'v_rs_n_193',
				hit_la: 'v_la_n_177',
				hit_ra: 'v_ra_n_178'
			}
		}
		sReturn = oImages[sSide].no_hit;
		for (var sKey in oImages[sSide]) {
			if (sZone === oMatches[sKey]) {
				sReturn = oImages[sSide][sKey];
				break;
			}			
		}
		sReturn = image_base+'/'+image_sub+'/'+sReturn+'.jpg';
		return sReturn;
	},
	/*
		Parser-Hilfsfunktion
		Zieht Daten aus dem Duell-Header
		@param (object) oData: Die ermittelten Daten aus dem Duellbericht
		@param (element) myPart: HTML-Element aus dem Daten gezogen werden
		@return (object) oData um neue Werte ergaenzt
	*/
	parseHead: function(oData, myPart) {
		var allStrongs = myPart.getElementsByTagName('strong');
		var oMatches = mbFormatter.getMatches(oData.language);
		for (var i = 0; i < allStrongs.length; i++) {
			var myStrong = allStrongs[i];
			if (myStrong.id.match(/^report_title/) && myStrong.innerHTML.match(oMatches.title_match)) {
				var tmp = oMatches.title_match.exec(myStrong.innerHTML);
				oData.attacker.name = tmp[1];
				oData.defender.name = tmp[2];
				break;
			}
		}
		var allHeads = myPart.getElementsByTagName('th');
		for (var i = 0; i < allHeads.length; i++) {
			var myHead = allHeads[i];
			if (myHead.innerHTML.match(oMatches.header_match)) {
				var tmp = oMatches.header_match.exec(myHead.innerHTML);
				oData.time = tmp[1];
			} else if (myHead.innerHTML.match(oMatches.header_today_match)) {
				var tmp = oMatches.header_today_match.exec(myHead.innerHTML);
				oData.time = tmp[1];
				var myDate = new Date();
				var myYear = parseInt(myDate.getYear())-100; // The West stellt das Jahr zweistellig dar - als haette es nie das Problem der Jahrhundertwenden gegeben. Nicht mein Bier...
				var myString = mbFormatter.padNumber(myDate.getDate(),2)+'.'+mbFormatter.padNumber(1 + myDate.getMonth(),2)+'.'+myYear;
				oData.time = myString+' '+oData.time;
			}			
		}
		return oData;
	},
	/*
		Parser-Hilfsfunktion
		Zieht Stufe, Duellstufe und so Zeuch
		@param (object) oData: Die ermittelten Daten aus dem Duellbericht
		@param (element) myPart: HTML-Element aus dem Daten gezogen werden
		@return (object) oData um neue Werte ergaenzt
	*/
	parseValues: function (oData, myPart) {
		var allCells = myPart.getElementsByTagName('td');
		var oMatches = mbFormatter.getMatches(oData.language);
		var currentSide = 'left';
		for (var i = 0; i < allCells.length; i++) {
			var myCell = allCells[i];
			if (myCell.innerHTML.match(oMatches.rank_match)) {
				// Stufen ausparsen
				var tmp = oMatches.rank_match.exec(myCell.innerHTML);
				var currentRank = tmp[1];
				var tmp = oMatches.duel_rank_match.exec(myCell.innerHTML);
				var currentDuelRank = tmp[1];
				// rausfinden ob Angreifer oder Verteidiger
				// der Spielername ist verlinkt also suchen wir nach dem Link
				var allLinks = myCell.getElementsByTagName('a');
				// bei NPCs sieht das ganze ein wenig anders aus
				if ('right' == currentSide && 0 == allLinks.length) {
					// dann steht der Name im ersten strong
					var allStrongs = myCell.getElementsByTagName('strong');
					if (allStrongs[0].innerHTML.match(oData.defender.name)) {
						oData.defender.rank = currentRank;
						oData.defender.duel_rank = currentDuelRank;
						oData.defender.side = 'right';
						oData.defender.npc = true;
					}
				}
				for (var ii = 0; ii < allLinks.length; ii++) {
					if (allLinks[ii].href.match(/profile/)) {
						var currentName = allLinks[ii].innerHTML;
						if (currentName == oData.attacker.name) {
							oData.attacker.rank = currentRank;
							oData.attacker.duel_rank = currentDuelRank;
							oData.attacker.side = currentSide;
						} else {
							oData.defender.rank = currentRank;
							oData.defender.duel_rank = currentDuelRank;
							oData.defender.side = currentSide;
						}
						currentSide = 'right';
						break;
					}
				}
			}
		}
		return oData;
	},
	/*
		Parser-Hilfsfunktion
		Zieht Daten aus den einzelnen Duellrunden
		@param (object) oData: Die ermittelten Daten aus dem Duellbericht
		@param (element) myPart: HTML-Element aus dem Daten gezogen werden
		@return (object) oData um neue Werte ergaenzt
	*/
	parseRounds: function(oData, myPart) {
		var allRows = myPart.getElementsByTagName('tr');
		var oMatches = mbFormatter.getMatches(oData.language);
		var currentRound = 1;
		oData.rounds = new Array();
		oData.total_rounds = allRows.length - 1;
		for (var i = 0; i < allRows.length; i++) {
			var currentSide = 'left';
			oData.rounds[currentRound] = new Object();
			// alle tds durchgehen
			var allCells = allRows[i].getElementsByTagName('td');
			for (var ii=0; ii < allCells.length; ii++) {
				var myCell = allCells[ii];
				if (myCell.innerHTML.match(oMatches.hit_match) || myCell.innerHTML.match(oMatches.no_hit_match) || myCell.innerHTML.match(oMatches.total_hit_match)) {
					var allSpans = myCell.getElementsByTagName('span');
					oData.rounds[currentRound][currentSide] = new Object();
					// Wenn hier "Trefferpunkte gesamt" steht oder wir schon ueber die letzte Runde raus sind, dann sind wir bei der Zusammenfassung
					if (allSpans[0].innerHTML.match(oMatches.total_hit_match) || oData.total_rounds < currentRound) {
						if (allSpans[0].innerHTML.match(oMatches.total_hit_match)) {
							var tmp = oMatches.hit_match.exec(allSpans[1].innerHTML);
							oData.total[currentSide] = parseInt(tmp[1]);
						} else if (allSpans[0].innerHTML.match(oMatches.no_hit_match)) {
							oData.total[currentSide] = 0;
						}
					// Kein Treffer
					} else if (allSpans[0].innerHTML.match(oMatches.no_hit_match)) {
						oData.rounds[currentRound][currentSide].zone = '';
						oData.rounds[currentRound][currentSide].points = 0;
						//oData.total_rounds = currentRound;
					// Treffer
					} else if (allSpans[0].innerHTML.match(oMatches.hit_replace)) {
						oData.rounds[currentRound][currentSide].zone = allSpans[0].innerHTML.replace(oMatches.hit_replace,'');
						var tmp = oMatches.hit_match.exec(allSpans[1].innerHTML);
						oData.rounds[currentRound][currentSide].points = parseInt(tmp[1]);
						//oData.total_rounds = currentRound;
					}
					currentSide = 'right';
				}
			}
			currentRound++;
		}
		return oData;
	},
	/*
		Parser-Hilfsfunktion
		Zieht Daten aus der Duellzusammenfassung (wer hat gewonnen?)
		@param (object) oData: Die ermittelten Daten aus dem Duellbericht
		@param (element) myPart: HTML-Element aus dem Daten gezogen werden
		@return (object) oData um neue Werte ergaenzt
	*/
	parseSummary: function(oData, myPart) {
		oData.summary = myPart.innerHTML;
		return oData;
	},
	/*
		Funktion um den Report zu finden
		Ist im momentanen Zustand der erste Duellbericht der geoeffnet wurde
		@return (element): HTML-Element des Duellberichts
	*/
	findReport: function(myID) {
		var oReturn = false;
		myID = parseInt(myID);
		if (myID) {
			oReturn = document.getElementById('window_reports_show_'+myID+'_content');
		} else {
			var windowsDiv = document.getElementById('windows');
			var allInnerDivs = windowsDiv.getElementsByTagName('div');
			for (var i = 0; i < allInnerDivs.length; i++) {
				var myDiv = allInnerDivs[i];
				if (myDiv.className == 'window_content' && myDiv.id.match(/^window_reports_show/)) {
					oReturn = myDiv;
					break;
				}
			}
		}
		return oReturn;		
	},
	/*
		Funktion zum Auffinden der einzelnen Informationsblocks im Duellbericht
		@param (element) myReport: HTML-Element des Duellberichts
		@return (object) Objekt mit den einzelnen Elementen
	*/
	findParts: function(myReport,myLanguage) {
		var oMatches = mbFormatter.getMatches(myLanguage);
		oParts = {head: false, values: false, rounds: false, summary: false};		
		var allTables = myReport.getElementsByTagName('table');
		for (var i = 0; i < allTables.length; i++) {
			var myTable = allTables[i];
			if ("report_head" == myTable.className) {
				oParts.head = myTable;
			}
			if ("table hborder" == myTable.className) {
				if (myTable.innerHTML.match(oMatches.duel_rank_match)) {
					oParts.values = myTable;
					/*
					var allCells = myTable.getElementsByTagName('td');
					for (var ii = 0; ii < allCells.length; ii++) {
						if (allCells[ii].innerHTML.match(oMatches.values_match)) {
							oParts.buttonCell = allCells[ii];
							break;
						}
					}
					*/
				} else if (myTable.innerHTML.match(oMatches.rounds_match)) {
					oParts.rounds = myTable;
				}
			}
		}
        var IDReg = /window_reports_show_(\d+)_content/;
        var tmp = IDReg.exec(myReport.id);
        var myID = tmp[1];
        if (0 < myID) {
            var ownWeaponID = 'own_weapon_'+myID;
            var ownWeaponDiv = document.getElementById(ownWeaponID);
            oParts.buttonCell = ownWeaponDiv.parentNode;
        }
		var allHeadings = myReport.getElementsByTagName('h4');
		for (var i = 0; i < allHeadings.length; i++) {
			if (allHeadings[i].innerHTML.match(oMatches.summary_match)) {
				oParts.summary = allHeadings[i];
				break;
			}
		}
		return oParts;
	},
	addReportButton: function(div) {
		var reportDiv = document.getElementById('windows');
		var allDivs = reportDiv.getElementsByTagName('div');
		var IDReg = /window_reports_show_(\d+)_content/;
		for (var i = 0; i < allDivs.length; i++) {
			var myDiv = allDivs[i];
			if (!myDiv.id.match(IDReg)) continue;
			var tmp = IDReg.exec(myDiv.id);
			var myID = tmp[1];
			if (0 < myID) {
				var sID = 'report_title_'+myID;
				var myTitle = document.getElementById(sID);
				if (myTitle.innerHTML.match(/[dD]uel/)) {
					var buttonID = 'mb_report_button_'+myID;
					if (!document.getElementById(buttonID)) {
						var myLink = document.createElement('a');
						myLink.setAttribute('href','#');
						myLink.setAttribute('id',buttonID);
					
						myLink.onclick = function() {
							mbFormatter.parse(myID);
						};
					
						var myImg = document.createElement('img');
						myImg.setAttribute('src','http://img690.imageshack.us/img690/2787/duelreportsm.png');
						myImg.setAttribute('style','margin-top: 23px');
						myLink.appendChild(myImg);
						oParts = mbFormatter.findParts(myDiv, mbFormatter.getLanguage());
						//oParts.buttonCell.appendChild(document.createElement('br'));
						oParts.buttonCell.appendChild(myLink);
					}
				}
			}
		}
	},
	showCode: function(sCode, sLanguage) {
		var oText = mbFormatter.getText(sLanguage);
		showMessage(["<div style=\"text-align: center;\">", "BBCode: ", "<textarea class=\"input_layout\" readonly=\"readonly\" style=\"text-align: center; width: 150px; height: 30px;\" name=\"mb_duelformmatter_bbcode\" onclick=\"this.select();\" />"+sCode+"</textarea>", "</div>"].join(""), oText.show_title, 360, 100, [["ok"]], true);
	}
}

/*
	Uebertragen des Formatierers ins Hauptfenster
	Falls es jemand nicht weiss: Das Script da oben ist in Greasemonkey in einer Sandbox, koennte also nicht von The-West aus aufgerufen werden
	Darum muss man es "zu Fuss" in The-West uebertragen
*/
var formatterScript = document.createElement('script');
formatterScript.type = 'text/javascript';
formatterScript.text = 'window.mbFormatter = new Object();\n';
formatterScript.text += 'window.mbFormatter.getMatches= '+mb_Formatter.getMatches.toString()+';\n';
formatterScript.text += 'window.mbFormatter.getText= '+mb_Formatter.getText.toString()+';\n';
formatterScript.text += 'window.mbFormatter.getLanguage = '+mb_Formatter.getLanguage.toString()+';\n';
formatterScript.text += 'window.mbFormatter.format = '+mb_Formatter.format.toString()+';\n';
formatterScript.text += 'window.mbFormatter.padNumber = '+mb_Formatter.padNumber.toString()+';\n';
formatterScript.text += 'window.mbFormatter.getImage = '+mb_Formatter.getImage.toString()+';\n';
formatterScript.text += 'window.mbFormatter.display = '+mb_Formatter.display.toString()+';\n';
formatterScript.text += 'window.mbFormatter.parse = '+mb_Formatter.parse.toString()+';\n';
formatterScript.text += 'window.mbFormatter.parseHead = '+mb_Formatter.parseHead.toString()+';\n';
formatterScript.text += 'window.mbFormatter.parseValues = '+mb_Formatter.parseValues.toString()+';\n';
formatterScript.text += 'window.mbFormatter.parseRounds = '+mb_Formatter.parseRounds.toString()+';\n';
formatterScript.text += 'window.mbFormatter.parseSummary = '+mb_Formatter.parseSummary.toString()+';\n';
formatterScript.text += 'window.mbFormatter.findReport = '+mb_Formatter.findReport.toString()+';\n';
formatterScript.text += 'window.mbFormatter.findParts = '+mb_Formatter.findParts.toString()+';\n';
formatterScript.text += 'window.mbFormatter.addReportButton = '+mb_Formatter.addReportButton.toString()+';\n';
formatterScript.text += 'window.mbFormatter.showCode = '+mb_Formatter.showCode.toString()+';\n';

document.body.appendChild(formatterScript);
var oSet = unsafeWindow.AjaxWindow.setJSHTML;
var myFunc = function(div, content) {
	if (!div) return;
	var ret = oSet(div, content);
	unsafeWindow.mbFormatter.addReportButton(div);
	return(ret);
};
for (var myObject in oSet) {
	myFunc[myObject] = oSet[myObject];
}
unsafeWindow.AjaxWindow.setJSHTML = myFunc;