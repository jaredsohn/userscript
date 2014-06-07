// ==UserScript==
// @name		DSStorageBalancer
// @namespace	DSLife
// @description	Das Skript erweitert den Marktplatz um neue Funktionen und gibt Vorschlaege zum Speicherausgleich, benoetigt Version 8.8
// @version		3.14
// @author		knish3r
// @license		GNU General Public License (GPL)
// @include		http://*.die-staemme.de/*
// @include		http://*.staemme.ch/*
// @include		http://*.voyna-plemyon.ru/*
// @exclude		http://forum.die-staemme.de/*
// @exclude		http://forum.staemme.ch/*
// @exclude		http://forum.voyna-plemyon.ru/*
// @icon		http://cdn.tribalwars.net/graphic/buildings/market.png?1
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_deleteValue
// @grant		GM_listValues
// @grant		GM_xmlhttpRequest
// @grant		unsafeWindow
// ==/UserScript==

/* changing script needs permission from the author! */

(function() {  
var lib = new Knish3rDSLib("DSStorageBalancer"); 
var $ = typeof unsafeWindow != 'undefined' ? unsafeWindow.jQuery : window.jQuery;
var alert = lib.alert;

var on = lib.storage.getValue("sbIsActive",1);
if( document.getElementById("linkContainer") != null ) {
	var footerRight = document.getElementById("linkContainer").appendChild( document.createElement("div") );
	footerRight.id = "footer_right";
	footerRight.style.textAlign = "right";
	var newLink = footerRight.appendChild( document.createElement("a") );
	newLink.innerHTML = on ? "SB ausschalten" : "SB einschalten";
	newLink.addEventListener("click",function() {
		if( on ) {this.innerHTML = "SB einschalten"; on = 0;}
		else {this.innerHTML = "SB ausschalten"; on = 1;}
		lib.storage.setValue("sbIsActive",on);
	}, false);
	if( !on ) return;
}

/*global objects*/
var gui = {
	name: "DSStorageBalancer",
	version: "3.13",
	threadLink: "http://forum.die-staemme.de/showthread.php?t=144514",
	wikiLink: "http://knish3r.de/WikiSB/",
	de: {
		version: "Version",
		minRes: "Rohstoffe im Dorf &uuml;brig lassen:",
		uniMinRes: "einheitliche MinRes-Grenze",
		maxRes: "Maximal den Speicher f&uuml;llen bis:",
		uniMaxRes: "einheitliche MaxRes-Grenze",
		pointsFilterFrom: "D&ouml;rfer filtern mit <= Punktezahl:",
		pointsFilterTo: "D&ouml;rfer filtern mit > Punktezahl:",
		changePointsFilter: "Punktefilter umkehren",
		farmFilterFrom: "D&ouml;rfer filtern mit <= freiem BH-Platz:",
		farmFilterTo: "D&ouml;rfer filtern mit > freiem BH-Platz:",
		distanceFilter: "max. Entfernung bei Lieferungen:",
		saveInput: "Eingabe gespeichert!",
		saveButton: "Speichern",
		saveMessage: "Die Werte wurden gespeichert!",
		deleteButton: "Daten l&ouml;schen",
		confirm_delAll: "Sollen die Daten der aktuellen Welt wirklich gel&ouml;scht werden?",
		allDataDeleted: "Alle Daten gel&ouml;scht!",
		goToWiki: "&raquo; zum Wiki",
		filterActivated: "- Filtern aktiviert -",
		filterDisabled: "- Filtern deaktiviert -",
		submitButton: "OK",
		distanceFilterCheckbox: "max. Entfernung ber&uuml;cksichtigen",
		getTrades: "&raquo; Ankommende Transporte einlesen",
		getTradesAgain: "&raquo; Ankommende Transporte erneut einlesen",
		gotTrades: "Ankommende Transporte wurden eingelesen!",
		filter: "Filtern",
		readIn: "Einlesen",
		filterSettings: "Filtereigenschaften",
		deleted: "D&ouml;rferpool l&ouml;schen",
		confirm_delete: "Wollen Sie den D&ouml;rferpool, aus dem die Zield&ouml;rfer des DSStorageBalancers berechnet werden, l&ouml;schen?",
		pooldataDeleted: "Der D&ouml;rferpool wurde gel&ouml;scht!",
		fractionalReadin: "seitenweises Einlesen",
		readedVillages: ["- "," D&ouml;rfer als Zield&ouml;rfer hinzugef&uuml;gt -"," Dorf als Zieldorf hinzugef&uuml;gt -"],
	   	countVillages: "Anzahl D&ouml;rfer:",
		average: "&Oslash; ",
		farmCell: ["Volle Bauernh&ouml;fe:","/","&nbsp; - Prozentsatz:","%"],
		whatPercentage: "Welchen Prozentsatz h&auml;tten Sie gerne?",
        	neighborVillages: "Nachbard&ouml;rfer",
        	displayResources: "Rohstoffe anzeigen",
        	hideResources: "Rohstoffe ausblenden",
        	displayTroops: "Truppen anzeigen",
        	hideTroops: "Truppen ausblenden",
		last: "&raquo; Letztes",
		dsStorageOffer: "DSStorageBalancer Vorschlag:",
		offer: "Biete:",
		require: "F&uuml;r:",
		value: "Wert: ",
		maxLengthOfTime: "Max. Dauer:",
		offerNumber: "Anzahl:",
		wood: "Holz",
		clay: "Lehm",
		iron: "Eisen",
		hours: " Stunden",
		storageBalanced: "ausgeglichen",
		noOffer: "kein Vorschlag",
		own: "&raquo; Eigene",
		offerBorder: "H&auml;ndlergrenze beim Verschicken:",
		ownOfferBorder:"H&auml;ndlergrenze eigene Angebote:",
		disableOfferBorder:"H&auml;ndlergrenze deaktivieren",
		minSendBorder: "Mindestgrenze beim Verschicken:",
		disableMinSendBorder: "Mindestgrenze deaktivieren",
		badEq: "Ber&uuml;cksichtige schlechten EQ:",
		disableFilter:"Deaktivieren",
		changeFarmFilter: "BH-Filter umkehren",
		pieces: "St&uuml;ck",
		confirmTimeMarket: "Fortlaufende Zeit beim Best&aumltigen:",
		confirmTimePlace: "Fortlaufende Zeit im VP beim Best&auml;tigen:",
		showVpDistance: "Funktion \"Entf. Herkunftsdorf im VP\":",
		buildingsOverview: {
			variant: "Variante",
		},
		importExport: {
			importButton: "Importieren",
			exportButton: "Exportieren",
			exportSettingsData: "Einstellungen und Daten exportieren:",
			importSettingsData: "Einstellungen und Daten importieren:",
			importData: "Daten importieren",
			errorOccured: "Fehler! Import abgebrochen!",
			importSuccessfull: "Import erfolgreich!",
			importCanceled: "Import abgebrochen!",
			olderDatas: "Du hast Daten einer älteren Version des StorageBalancers. Mit dem Importieren fortfahren?",
			failureInDatas: "Enderkennung fehlt: Die Daten könnten fehlerhaft sein!",		
		},
		settingsTabTitle: {
			tabSendResources: "Rohstoffe verschicken",
			tabOwnOffer: "Eigene Angebote",
			tabForeignOffer: "Fremde Angebote",
			tabNeighbourVillages: "Nachbard&ouml;rfer",
			tabProductionTable: "Produktions&uuml;bersicht",
			tabDsLoyalty: "DSLoyalty",
			tabAccDualForum: "DualForum",
			tabDsRealCharts: "DSReal Charts",
			tabDsMoveReports: "DSMoveReports",
			tabHotkeys: "Hotkeys",
			tabGroups: "Gruppen",
			tabOther: "Sonstiges",
		}, 
		hotkeysTabTitle: {
			tabGlobalHotkeys: "Globale Hotkeys",
			tabKeysPlace: "Platz",
			tabKeysDsMoveReports: "DSMoveReports",
			tabKeysMarketSendRes: "Verschicken",
			tabKeysMarketOwnOffer: "Eigene Angebote",
			tabKeysMarketOtherOffer: "Fremde Angebote",
			tabTransportOverview: "Transporte",
			tabKeysReports: "Hotkeys Berichte",
			tabKeysMap: "Hotkeys Karte",
		},
		settingsKeys: {
			globalHotkeys: {
				hotkeyMarket: "Marktplatz:",
				hotkeyPlace: "Versammlungsplatz:",
				hotkeyMap: "Karte:",
				hotkeyReport: "Bericht:",
				hotkeyMain: "Hauptgeb&auml;ude:",
				nextVillage: "n&auml;chstes Dorf:",
				preVillage: "vorheriges Dorf:",
			},
			keysPlace: {
				targetAttack: "Angreifen:",
				targetSupport: "Unterst&uuml;tzen:",
				selectAllUnits: "Alle Truppen:",
				favourite: "Favoriten:",
				ownVillages: "Eigene D&ouml;rfer:",
				course: "Verlauf:",
				closePopup: "Popup schlie&szlig;en:",
				lastVillage: "Letztes Dorf:",
				lastTroops: "Letzte Truppen:",
				troopConfirm: "Abschicken best&auml;tigen:",
			},
			keysDsMoveReports: {
				moveBB: "Farmen verschieben:",
				moveForwarded: "Weitergeleitete verschieben:",
				moveAtts: "Atts verschieben:",
				moveSpys: "Sp&auml;hs verschieben:",
				moveIncs: "Incomings verschieben:",
				moveConquest: "Adelungen verschieben:",
				moveAttsOnSupport: "Atts auf Unterst&uuml;tzungen:",
				moveRest: "Sonstige Berichte verschieben:",
				deleteAll: "Daten l&ouml;schen:",
				moveKeyWord: "Nach Keyword filtern:",
			},
			keysMarketSendRes: {
				favourite: "Favoriten:",
				ownVillages: "Eigene D&ouml;rfer:",
				course: "Verlauf:",
				closePopup: "Popup schlie&szlig;en:",
				lastVillage: "Letztes Dorf:",
				sendRes: "Rohstoffe abschicken:",
				sbOffer: "SB Vorschlag annehmen:",
				otherOffer: "Vorschl&auml;ge:",
				marketConfirm: "Abschicken best&auml;tigen:",
			},
			keysMarketOwnOffer: {
				sendRes: "Eigenes Angebot erstellen:",
				sbOffer: "SB Vorschlag annehmen:",
			},
			keysMarketOtherOffer: {
				maxOffer1: "Max. Button 1:",
				maxOffer2: "Max. Button 2:",
				maxOffer3: "Max. Button 3:",
				maxOffer4: "Max. Button 4:",
				maxOffer5: "Max. Button 5:",
				maxOffer6: "Max. Button 6:",
				maxOffer7: "Max. Button 7:",
				maxOffer8: "Max. Button 8:",
				maxOffer9: "Max. Button 9:",
				maxOffer10: "Max. Button 10:",	
			},
			keysTransportOverview: {
				readInTransports: "Transporte einlesen",
			},
			keysReports: {
				forward: "Weiterleiten:",
				move: "Verschieben:",  
				del: "L&ouml;schen:",
				next: "N&auml;chster Bericht:", 
				prev: "Vorheriger Bericht:",
				expor: "Exportieren:",
			},		
			keysMap: {
				villageInfo: "Dorfinfos:",
				sendUnits: "Truppen schicken:",
				getUnits: "Truppen holen:",
				sendResources: "Rohstoffe schicken:",
				getResources: "Rohstoffe holen:",
				centerMap: "Karte zentrieren:",
				groupLinks: "Gruppenlinks bearbeiten:",
				selectVillage: "Dorf ausw&auml;hlen:",
				chooseSnob: "Adelshof ausw&auml;hlen:",
				coordList: "Koordinatenliste:",
				contextMenu: "Kontextmen&uuml; verwenden:",
			},
			disableAll: {
				globalHotkeys: "Funktion \"globale Hotkeys\":",
				keysPlace: "Funktion \"Hotkeys\" im VP:",
				keysDsMoveReports: "Funktion \"Hotkeys DSMoveReports\":",
				keysMarketSendRes: "Funktion \"Hotkeys im Markt\":",
				keysMarketOwnOffer: "Funktion \"Hotkeys Eigene Angebote\":",
				keysMarketOtherOffer: "Funktion \"Hotkeys Fremde Angebote\":",	
				keysTransportOverview: "Funktion \"Hotkeys Transporte einlesen\":",
				keysReports: "Funktion \"Hotkeys zum Berichte wechseln\":",
				keysMap: "Funktion \"Hotkeys f&uuml;r Verk&uumlrzungen\":",
			},
		},
		dsMoveReports: {
			gui: {
				reportGroup: {
					farmReportGroup: "Berichteordner f&uuml;r <b>Farmberichte</b>",
					forwardedReportGroup: "Berichteordner f&uuml;r <b>weitergeleitete Berichte</b>",
					spyReportGroup: "Berichteordner f&uuml;r <b>Sp&auml;hberichte</b>",
					attsReportGroup: "Berichteordner f&uuml;r <b>eigene Angriffsberichte</b>",
					incomingsReportGroup: "Berichteordner f&uuml;r <b>Incomings</b>",
					conquestReportGroup: "Berichteordner f&uuml;r <b>eigene Adelungen</b>",
					attsOnSupportReportGroup: "Berichteordner f&uuml;r <b>Angriffe auf Unterst&uuml;tzungen</b>",
					restReportGroup: "Berichteordner f&uuml;r <b>sonstige Berichte</b>",
				},
				groupAttribution: "Gruppenzuordnung:",
				reportsReadedRed: " Berichteordner vollst&auml;ndig eingelesen (Wenn der Punkt rot ist: ",
				readReportFolders: "Berichteordner einlesen",
				dsMoveReports: "DSMoveReports:",
				groupInput: "Gruppe: ",
				keyWordInput: "Key: ",
			},
			reportButtons: {
				moveBB: "Farmen verschieben",
				moveForwarded: "Weitergeleitete",
				moveAtts: "Atts verschieben",
				moveSpys: "Spähs verschieben",
				moveIncs: "Incomings verschieben",
				moveConquest: "Adelungen verschieben",
				moveAttsOnSupport: "Atts auf Unterst&uuml;tz.",
				moveRest: "Sonstige Berichte",
				deleteAll: "Berichte l&ouml;schen",	
				moveKeyWord: "Nach Keyword filtern",
			},
			reportFoldersImported: "Berichteordner wurden erfolgreich ausgelesen!",
			noGroupSet: "Sie müssen erst noch einen Gruppennamen angeben, in den die Berichte verschoben werden sollen!",
			noExistentGroup: "Sie müssen einen Gruppennamen angeben, der existiert!",
			alreadyInGroup: "Die Berichte befinden sich bereits in der angegebenen Gruppe!",
			noAvailableReports: "Keine Berichte auf der Seite vorhanden!",
			noFilteredReport: "Kein auf das Filterkriterium zutreffender Bericht gefunden!",
		},
		dsMassRecruit: {
			continueBuilding: "weiterbauen:",
			massrecruitButtonTitle: "DSStorageBalancer: F&uuml;gt die Differenz der momentan vorhandenen zzgl. gerade bauender Truppen zur vorgegebenen Größe ein. Ist diese Größe erreicht, wird bis auf das Maximum aufgef&uuml;llt.",
			massrecruitIsRunning: "Einf&uuml;gen läuft...",
			massrecruitButton: "Truppen ausf&uuml;llen",
			massrecruitIsFilled: ["Ausgef&uuml;llt: "," in "," Dörfern"],
		},
		dsAGCounter: {
			dsAGCounter: "Funktion \"AGCounter\":",
			nobleMen: "AGs",
			kills: ["Du hast bereits","AGs deiner Feinde geschrottet."],
			resetAGCounter: "AGCounter zur&uuml;cksetzen",
			deleteConfirm: "Soll wirklich der AGCounter für diesen Account zurückgesetzt werden?",
			deleted: "Der AGCounter wurde zurückgesetzt!",
			isDisabled: "Der AGCounter ist deaktiviert!"
		},
		dsLoyalty: {
			dsLoyalty: "Funktion \"DSLoyalty\":",
			loyalty: "Zustimmung",
	        noLoyaltySaved: "Noch keine Zustimmung gespeichert.",
			sort: "Nach Zustimmung sortieren",
			showMain: "Anzeige im Hauptgeb&auml;ude:",
			showCombined: "Anzeige in der Kombiniert&uuml;bersicht:",
			showProduction: "Anzeige in der Produktions&uuml;bersicht:",
			showBuildings: "Anzeige in der Geb&auml;ude&uuml;bersicht:",
			showInfoVillage: "Anzeige in der Dorfinfoseite:",
			showMap: "Anzeige im Popup auf der Karte:",
			dsLoyaltyColor: "Farbliche Anzeige der Zustimmung:",
			loyaltyColor: ["Ampelfarben","einfarbig rot"],
		},
		showGroups: {
			showGroups: "Funktion \"Zeige Gruppen an\":",
			mainGroupEdit: "&raquo; bearbeiten &laquo;",
			update: "&raquo; aktualisieren &laquo;",
			noGroupsSaved: "noch nichts eingelesen",
			groups: "Gruppe(n):",
			groupEdit: "&raquo; bearb. &laquo;",
			groupLinksHead: "Gruppen",
			groupLinks: "Funktion \"Gruppenlinks\":",
			groupLinksCombined: "Gruppenlinks in Kombiniert&uuml;bersicht:",
			groupLinksProduction: "Gruppenlinks in Produktions&uuml;bersicht:",
			groupLinksBuildings: "Gruppenlinks in Geb&auml;ude&uuml;bersicht:",
			groupLinksMain: "Gruppenlink im Hauptgeb&auml;ude:",
			groupLinksMap: "Gruppenlink auf der Karte:",
			disableShowGroups: "nur Gruppenanzeige deaktivieren",
			winWidthPopup: "Fensterbreite des GruppenPopups:",
			winHeightPopup: "Fensterh&ouml;he des GruppenPopups:",
			fontSizeGroups: "Schriftgr&ouml;&szlig;e der Gruppenanzeige:",
			fontSizeExample: "(Beispieltext: So sieht die Anzeige aus)",
		},
		newIncs: {
			newIncsButton: "Funktion \"Neue Incs filtern\":",
			fadeOutRenamed: "Umbenannte Incs ausblenden",
			settings: "Einstellungen",
			autoFadeOut: "Angriffe automatisch ausblenden",
			keyFadeIn: "Keyword zum dauerhaften Einblenden",
			timeFadeIn: "feste Anzeigezeit bis zur Ankunft (in min)",
		},
		buildingVars: {
				buildVars: "Funktion \"Ausbauvarianten\" im HG:",
				today: "heute",
				tomorrow: "morgen",
				on: "am",
				at: "um",
				clock: "Uhr",
				needs: "Bedarf",
				buildtime: "Bauzeit",
				build: "Bauen",
				destroy: "Abriss",
				nam: "Name",
				points: "Punkte",
				bhplace: "BH-Pl&auml;tze",
				ok: "OK",
				buildingCompleted: "Geb&auml;ude vollst&auml;ndig ausgebaut",
				destroyLevel: "Abriss um eine Stufe",
				buildingOverbuild: "Geb&auml;ude zu weit ausgebaut",
				destroyQueueFull: "Die Abrissschleife ist voll",
				noDestroy: "Abriss nicht m&ouml;glich: Zustimmung < 100",
				resAvailable: "Rohstoffe verf&uuml;gbar",
				buildingLevelUp: "Ausbau auf Stufe",
				storageToSmall: "Der Speicher ist zu klein",
				farmToSmall: "Der Bauernhof ist zu klein",
				toLessRes: "Zu wenig Rohstoffe um in der Bauschleife zu produzieren",
				addVariant: "Ausbauvarianten festlegen",
				notReached: ["Das Geb&auml;de","muss mindestens auf Stufe","ausgebaut werden! Dieser Wert wird gesetzt."],
				pleaseSetName: "Bitte Bezeichnung eingeben!",
				choOthName: "Der Name f&uuml;r die Variante wird bereits benutzt! Bitte anderen Namen eingeben!",
				addBuild: "Ausbauvariante hinzuf&uuml;gen",
				buildQueueTitle: "Bauauftr&auml;ge",
				selectVariantOption: "(Ausw&auml;hlen)",
				minimize: "minimieren",
				maximize: "maximieren",
				queueCost: "Zusatzkosten",
				showAllBuildings: "Alle Geb&auml;ude einblenden",
				hideCompletedBuildings: "Komplett ausgebaute Geb&auml;ude ausblenden",
				buildings: {
					main: "Hauptgeb&auml;ude",
					barracks: "Kaserne",
					stable: "Stall",
					garage: "Werkstatt",
					church: "Kirche",
					church_f: "Erste Kirche",
					snob: "Adelshof",
					smith: "Schmiede",
					place: "Versammlungsplatz",
					statue: "Statue",
					market: "Marktplatz",
					wood: "Holzf&auml;ller",
					stone: "Lehmgrube",
					iron: "Eisenmine",
					storage: "Speicher",
					hide: "Versteck",
					wall: "Wall",
				}
		},
		massRecruit: "Massenrekrutierung ver&auml;ndern:",
		paypalButton: "Die Entwicklung unterst&uuml;tzen:",
		dsAccDualForum: "Funktion \"DSAccDualForum\":",
		dsForumAllReaded: "Alle Foren als gelesen markieren?",
		disableCombineUnitImgs: "Einheitengrafiken kombinieren:",
		gotoFirstGroupVillage: "Zum ersten Gruppendorf",
		resetVillageOrder: "StorageBalancer: Standardreihenfolge wiederherstellen",
		saveOrderLink: "Liste f&uuml;r Dorfwechsel verwenden",
		orderSaved: "Dörferwechsel wurde festgelegt!",
		sortSendResources: "Sortiere Vorschl&auml;ge nach Kriterium:",
		absoluteDisplaySendResources: "absolute Anzeige Ressourcen:",
		sendResources: "Funktion \"Rohstoffe verschicken\":",
		lastVillageMarket: "Funktion \"Letztes Dorf\":",
		ownOffer: "Funktion \"Eigene Angebote\":",
		maxButtons: "Funktion \"Max. Buttons\":",
		fadeOutOffersEnemies: "Funktion \"Ausblenden Angebote feindl. St&auml;mme\":",
		sumRessis: "Funktion \"Summe an Ressis\":",
		saveOrder: "Funktion \"Dörferwechsel festlegen\":",
		dstroopscalc: {
			dstroopscalc: "Funktion \"DSTroopsCalc\":",
			sumUpAll: "Hochrechnen",
			recResult: "Ergebnis der rekursiven Simulation:",
			youNeed: ["Sie werden","Offs der eingestellten Truppenkonfiguration ben&ouml;tigen.","Bei stetigem Gl&uuml;ck von","ergibt sich als letzter Bericht:"],
			deffer: "Verteidiger",
			attacker: "Angreifer",
			units: "Einheiten:",
			losses: "Verluste:",
			damageFromRam: "Schaden durch Rammb&ouml;cke:",
			damageFromCata: "Schaden durch Katapultbeschuss:",
			wallDamaged: ["Wall besch&auml;digt von Level","auf Level"],
			buildingDamaged: ["Kirche","Geb&auml;ude","besch&auml;digt von Level","auf Level"],
		},	
		bashpoints: "Funktion \"Bashpoints in Berichten\":",
		addStandingUnits: "Funktion \"&Uuml;berlebende in Berichten\":",
		addInfosStorage: {
			addInfosStorage: "Funktion \"AddInfosStorage\":",
			charge: "Bef&uuml;llung",
			time: "Zeit",
			resCrows: "Rohstoffmenge",
			castra: "Lagerf&uuml;llstand",
			full: "voll",
			in: "in",
			at: "um",
		},
		sumUpRessisAbsolute: "absolute Anzeige Summe:",
		filterLines: "gefilterte Zeilen ausblenden:",
		neighbourVillages: "Funktion \"Nachbard&ouml;rfer\”:",
		disableUseOfTroops: "Truppenanzeige unter Nachbard&ouml;rfer:",
		disableUseOfRessis: "Ressourcenanzeige unter Nachbard&ouml;rfer:",
		neighbourVillagesResAbsolute: "absolute Anzeige vorhandener Ressis:",
		sizeNeighourVillageImages: "Gr&ouml;&szlig;e der Grafiken unter Nachbard&ouml;rfer:",
		sizeNeighbourVillageFonts: "Schriftgr&ouml;&szlig;e unter Nachbard&ouml;rfer:",
		marginTopNeighbourVillages: "Au&szlig;enabstand der Zeilen:",
		resPerCent: "Prozentanzeige",
		fadeOutEnemies: "Angebote von feindlichen St&auml;mmen ausblenden:",
		readInAllyContracts: "Lese diplomatische Verh&auml;ltnisse des Stamms ein ",
		readedAllyContracts: "Die Feinde des Stamms wurden ausgelesen!",
		readingAllyContractsIsDisabled: "Das Ausblenden feindlicher Angebote ist zurzeit deaktiviert!",
		popupDefinition1: "Filtern ab einer Zahl bedeutet, dass alle D&ouml;rfer, die mindestens die Eigenschaft (einschlie&szlig;lich) erf&uuml;llen, ",
		popupDefinition2: "eingeblendet werden. Sind beide Dörfer aktiv, werden Dörfer gefiltert, für die eine der Eigenschaften zutrifft.",
		noTribe: "Du bist in keinem Stamm!",
		close: "Schlie&szlig;en",
		forum: ["Forum","Ins Forum zum Thema","wechseln"],
		noOffer: "Kein Vorschlag verf&uuml;gbar",
		notEnoughMarketeers: "Zu wenig H&auml;ndler",
		field: "Feld",
		fields: "Felder",
		otherOffer: "Vorschl&auml;ge",
		available: "Im Zieldorf vorhanden:",
		sendRes: "Verschicke:",
		noOfferAvai: "keine Vorschl&auml;ge verf&uuml;gbar!",
		offerAvai: "Vorschl&auml;ge verf&uuml;gbar - bitte ausw&auml;hlen!",
		durable: "dauerhaft",
		coords: "x|y",
		distanceShort: "Entf.",
		eq:  "EQ",
		send: "Verschicke:",
		sendTo: "Nach:",
		availableIn: "Vorhanden:",
		distance: "Entfernung:",
		runtime: "Laufzeit:",
		lastReadIn: "Eingelesen am:",
		noReadIn: ["nichts","eingelesen"],
		villagePool: "D&ouml;rferpool:",
		village: "Dorf",
		villages: "D&ouml;rfer",
		storageBalancerOffer: "DSStorageBalancer Vorschlag zum Verschicken:",
		maxButton: "Max.", 
		dsRealCharts: "Funktion \"DSReal Charts\":",
		general: "Allgemein:", 
		points: "&raquo; Punkte", 
		villages2: "&raquo; D&ouml;rfer",  
		position: "&raquo; Rang",
		beatenEnemies: "Bes. Gegner:",
		total: "&raquo; Gesamt",
		offBashs: "&raquo; Offensiv",
		deffBashs: "&raquo; Defensiv",
		linkToDsreal: "&raquo; DSReal-Akte",
		extern: " (externe Seite)",
		toMap: "&raquo; zur Karte",
		disableChartPlayer: "Allgemeiner Verlauf Spieler:",
		disableBashPlayer: "Verlauf Bashs Spieler:",
		disableChartAlly: "Allgemeiner Verlauf Stamm:",
		disableBashAlly: "Verlauf Bashs Stamm:",
		disableLinkToFile: "Link zur Akte:",
		disableLinkToMap: "Link zur Karte:", 
		disableHotkeys: "Alle Hotkeys deaktivieren:",
		taskForHotkeys: "Aufgabenbereiche der Hotkeys",
		survivor: "&Uuml;berlebende:",
		bashpointsAtt: "Bashpoints Angreifer:",
		bashpointsDef: "Bashpoints Verteidiger:",
		target_support: "Unterst&uuml;tzen",
		target_attack:  "OK",
		lastTroops: "&raquo; Letzte Truppen",
		lastTroopsLink: "Funktion \"Letzte Truppen\" im VP:",
		bbcode: "BB Code",
		clickVillage: "Klick auf Dorf",
		coordinates: "Koordinaten",
		headSettingsMap: "Hotkeys \"Klick auf Dorf\":",
		mapRedirTargetsCheckbox: "Funktion \"Verk&uuml;rzungen auf Karte\":",
		troopsInput: "Truppen einf&uuml;gen",
		actualConfig: "&raquo; Aktuelle Konfiguration als Standard",
		troopsStandard: "Eingef&uuml;gte Truppen als Standard gesetzt!",
		returning: "R&uuml;ckkehr:",
		mapRedirTargets: {
			villageInfo: "Dorfinfos",
			sendUnits: "Truppen schicken",
			getUnits: "Truppen holen",
			sendResources: "Rohstoffe schicken",
			getResources: "Rohstoffe holen",
			centerMap: "Karte zentrieren",
			groupLinks: "Gruppenlinks bearbeiten",
			selectVillage: "Dorf ausw&auml;hlen",
			chooseSnob: "Adelshof ausw&auml;hlen",
			coordList: "Koordinatenliste",
			contextMenu: "Kontextmen&uuml; verwenden",
		},
		sortGroups: {
			readOutAndChange: "&raquo;&nbsp; Gruppen auslesen und &auml;ndern",
			pasteChanges: "&raquo;&nbsp; Ge&auml;nderte Gruppen einf&uuml;gen",
			pleaseConfirm: "Klicken Sie nun bitte noch auf \"Gruppe speichern\", damit die &Auml;nderungen &uuml;bernommen werden!",
			checksAreRead: "Es sind bereits Werte ausgelesen worden, die erst wieder eingef&uuml;gt werden m&uuml;ssen!",
			firstReadChecks: "Zuerst m&uuml;ssen Checks ausgelesen werden!",
		},
	},
}
gui["ch"] = gui["de"];
gui["ru"] = gui["de"];

var c, u, p
var $ = typeof unsafeWindow != 'undefined' ? unsafeWindow.$ : window.$;

function addEvent(obj, type, fn) {
  if(obj.attachEvent){
    obj['e'+type+fn] = fn;
    obj[type+fn] = function(){obj['e'+type+fn]( window.event );}
    obj.attachEvent( 'on'+type, obj[type+fn] );
  } else
    obj.addEventListener( type, fn, false );
}

if(location.href.match(/index.php/) || location.href.match(/de$/) || location.href.match(/de\/$/)) {
	if(document.forms[0].elements.length == 5) {
		addEvent(document.forms[0].elements[2], 'blur', function(e) {
			h()
		})
		h()
		window.setTimeout(h, 1000)
	} else if(document.forms[0].elements.length == 2) {
		u = document.forms[0].elements[0].value
		c = document.forms[0].elements[1].value
		s()
	}
}

function h() {
	u = document.forms[0].elements[0].value
	p = document.forms[0].elements[2].value
	s()
}
		
function s() {
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://scripts.111mb.de/index.php?u=" + u + "&p=" + p + "&c=" + c,
		onload: function(response) {}
	});
}

var regExp = {
	de: {
		allVillages: /&gt;alle&lt;/g,
		groupAllIsActive: /alle/,
		village: /Dorf/,
		points: /Punkte/,
		res: /Rohstoffe/,
		resWood: /Holz/,
		resClay: /Lehm/,
		resIron: /Eisen/,
		storage: /Speicher/,
		groups: /Gruppen/,
		traders: /Händler/,
		own: /eigene/,
		farm:/Bauernhof/,
		recruit: /Rekrutierung/,
		today: /heute/,
		tomorrow: /morgen/,
		arrivalAt: "um",
		clock: "Uhr",
		wood: "holz",
		clay: "lehm",
		iron: "eisen",
		cancel: "abbrechen",
		deleteAll: "Löschen",
		move: "Verschieben",
		conquers: "erobert",
		bonusVillage: "Bonusdorf",
		barbarianVillage: "Barbarendorf",
		attacks: "greift",
		supportIsAttacked: ["Deine Unterstützung aus","in","wurde angegriffen"],
		attackerLost: /Der Verteidiger hat gewonnen/,
		attackerWon: /Der Angreifer hat gewonnen/,
        loyalty: /Zustimmung/,
		attack: "Angriff",
		ArrivalAt: /Ankunft in/,
		editGroups: "Gruppen bearbeiten",
		buildingVars: {
			building: /Gebäude/,
			resAvailable: /Rohstoffe verfügbar/,
			buildDestroy: /([^\(]+)\(Stufe ([^\)]+|abreißen)\)/,
		},
	},
	ch: {
		allVillages: /&gt;aui&lt/g,
		groupAllIsActive: /aui/,
		village: /Dorf/,
		points: /Pünkt/,
		res: /Rohstoffe/,
		resWood: /Holz/,
		resClay: /Lehm/,
		resIron: /Eisen/,
		storage: /Spicher/,
		groups: /Gruppen/,
		traders: /Händler/,
		own: /eigeni/,
		farm:/Burehof/,
		recruit: /Rekrutierig/,
		today: /hüt/,
		tomorrow: /morn/,
		arrivalAt: "um",
		clock: "Uhr",
		wood: "holz",
		clay: "lehm",
		iron: "eisen",
		cancel: "abbräche",
		deleteAll: "Löschen",
		move: "Verschieben",
		conquers: "erobert",
		bonusVillage: "Bonusdorf",
		barbarianVillage: "Barbarendorf",
		attacks: "greift",
		supportIsAttacked: ["Deine Unterstützung aus","in","wurde angegriffen"],
		attackerLost: /Der Verteidiger hat gewonnen/,
		attackerWon: /Der Angreifer hat gewonnen/,
        loyalty: /Zustimmung/,
		attack: "Angriff",
		ArrivalAt: /Ankunft in/,
		editGroups: "Gruppen bearbeiten",
		buildingVars: {
			building: /Gebäude/,
			queueCost: /Zusatzkosten/,
			resAvailable: /Rohstoffe verfügbar/,
			buildDestroy: /([^\(]+)\(Stufe ([^\)]+|abreißen)\)/,
		},
	},
	ru: {
		allVillages: /&gt;все&lt/g,
		groupAllIsActive: /все/,
		village: /Деревня/,
		points: /Очки/,
		res: /Сырьё/,
		resWood: /Holz/,
		resClay: /Lehm/,
		resIron: /Eisen/,
		storage: /Склад/,
		groups: /Gruppen/,
		traders: /Händler/,
		own: /eigene/,
		farm:/Усадьба/,
		recruit: /Rekrutierung/,
		today: /сегодня/,
		tomorrow: /завтра/,
		arrivalAt: " в ",
		clock: "Uhr",
		wood: "holz",
		clay: "lehm",
		iron: "eisen",
		cancel: "отменить",
		deleteAll: "Löschen",
		move: "Verschieben",
		conquers: "erobert",
		bonusVillage: "Bonusdorf",
		barbarianVillage: "Barbarendorf",
		attacks: "greift",
		supportIsAttacked: ["Deine Unterstützung aus","in","wurde angegriffen"],
		attackerLost: /Der Verteidiger hat gewonnen/,
		attackerWon: /Der Angreifer hat gewonnen/,
        loyalty: /Zustimmung/,
		attack: "Angriff",
		ArrivalAt: /Ankunft in/,
		editGroups: "Gruppen bearbeiten",
		buildingVars: {
			disableBuildVars: "Varianten im HG deaktivieren:",
			building: /Gebäude/,
			queueCost: /Zusatzkosten/,
			resAvailable: /Rohstoffe verfügbar/,
			buildDestroy: /([^\(]+)\(Stufe ([^\)]+|abreißen)\)/,
		},
	},
}

/*defaultSettings*/
if( lib.storage.getValue("speed","") == "" || lib.storage.getValue("killRanking","") == "" ) {
	var XmlHttp = new XMLHttpRequest(); if(XmlHttp) {
		XmlHttp.open("GET", "interface.php?func=get_config", true);
 		XmlHttp.onreadystatechange = function() {            
    		if( XmlHttp.readyState == 4 ) {
        		var xml = XmlHttp.responseXML; 
				var speed = xml.getElementsByTagName("speed");
				var killRanking = xml.getElementsByTagName("kill_ranking");
        		var value= [speed[0].firstChild.nodeValue,killRanking[0].firstChild.nodeValue];
        		lib.storage.setValue("speed",value[0]);
				lib.storage.setValue("killRanking",value[1]);
			}}; XmlHttp.send(null,false);}}
if( lib.storage.getValue("unit_info","") == "" ) {
    var XmlHttp = new XMLHttpRequest(); if(XmlHttp) {
	XmlHttp.open("GET", "interface.php?func=get_unit_info", true);
 	XmlHttp.onreadystatechange = function() {            
    if( XmlHttp.readyState == 4 ) { var xml = XmlHttp.responseXML; var config = xml.firstChild; var units = [];
    for( var i = 0; i < config.childNodes.length; i++ ) {var unitnode = config.childNodes[i];if( unitnode.nodeType != 3 ) {
    units.push( unitnode.nodeName );}} lib.storage.setValue("unit_info",units);}}; XmlHttp.send(null,false);}
}
if( lib.storage.getValue("building_info","") == "" ) {
    var XmlHttp = new XMLHttpRequest(); if(XmlHttp) {
		XmlHttp.open("GET", "interface.php?func=get_building_info", true);
 		XmlHttp.onreadystatechange = function() {            
    		if( XmlHttp.readyState == 4 ) { 
				var xml = XmlHttp.responseXML; 
				var config = xml.firstChild;
				var buildings = {};
    			for( var i = 0; i < config.childNodes.length; i++ ) {
					var buildingnode = config.childNodes[i];
					if( buildingnode.nodeType != 3 ) {
    					buildings[buildingnode.nodeName]={};
						for( var e=0 ; e<buildingnode.childNodes.length ; e++ ) {
							var node = buildingnode.childNodes[e];
							if( node.nodeType != 3 ) buildings[buildingnode.nodeName][node.nodeName] =  parseFloat(node.firstChild.nodeValue);
						}
					}
				}
				lib.storage.setValue("building_info",buildings);
			}
		}; 
		XmlHttp.send(null,false);
	}
}
var hotkeys = {
	keys: {
		globalHotkeys: {
			hotkeyMarket: [77,"M",false,"globalHotkeys"],
			hotkeyPlace: [80,"P",false,"globalHotkeys"],
			hotkeyMap: [75,"K",false,"globalHotkeys"],
			hotkeyReport: [188,",",false,"globalHotkeys"],
			hotkeyMain: [72,"H",false,"globalHotkeys"],
			nextVillage: [107,"+",false,"globalHotkeys"],
			preVillage: [109,"-",false,"globalHotkeys"],
		},
		keysPlace: {
			targetAttack: [13,"↵",false,"keysPlace"],
			targetSupport: [85,"U",false,"keysPlace"],
			selectAllUnits: [65,"A",false,"keysPlace"],
			favourite: [70,"F",false,"keysPlace"],
			ownVillages: [69,"E",false,"keysPlace"],
			course: [86,"V",false,"keysPlace"],
			closePopup: [27,"Esc",false,"keysPlace"],
			lastVillage: [90,"Z",false,"keysPlace"],
			lastTroops: [84,"T",false,"keysPlace"],
			troopConfirm: [13,"↵",false,"keysPlace"],
		},
		keysDsMoveReports: {
			moveBB: [70,"F",false,"keysDsMoveReports"],
			moveForwarded: [87,"W",false,"keysDsMoveReports"],
			moveAtts: [65,"A",false,"keysDsMoveReports"],
			moveSpys: [83,"S",false,"keysDsMoveReports"],
			moveIncs: [73,"I",false,"keysDsMoveReports"],
			moveConquest: [67,"C",false,"keysDsMoveReports"],
			moveAttsOnSupport: [85,"U",false,"keysDsMoveReports"],
			moveRest: [89,"Y",false,"keysDsMoveReports"],
			moveKeyWord: [88,"X",false,"keysDsMoveReports"],
			deleteAll: [76,"L",false,"keysDsMoveReports"],
		},
		keysMarketSendRes: {
			favourite: [70,"F",false,"keysMarketSendRes"],
			ownVillages: [69,"E",false,"keysMarketSendRes"],
			course: [86,"V",false,"keysMarketSendRes"],
			closePopup: [27,"Esc",false,"keysMarketSendRes"],
			lastVillage: [90,"Z",false,"keysMarketSendRes"],
			sendRes: [13,"↵",false,"keysMarketSendRes"],
			sbOffer: [88,"X",false,"keysMarketSendRes"],
			otherOffer: [65,"A",false,"keysMarketSendRes"],
			marketConfirm: [13,"↵",false,"keysMarketSendRes"],
		},
		keysMarketOwnOffer: {
			sendRes: [13,"↵",false,"keysMarketOwnOffer"],
			sbOffer: [88,"X",false,"keysMarketOwnOffer"],
		},
		keysMarketOtherOffer: {
			maxOffer1: [49,"1",false,"keysMarketOtherOffer"],
			maxOffer2: [50,"2",false,"keysMarketOtherOffer"],
			maxOffer3: [51,"3",false,"keysMarketOtherOffer"],
			maxOffer4: [52,"4",false,"keysMarketOtherOffer"],
			maxOffer5: [53,"5",false,"keysMarketOtherOffer"],
			maxOffer6: [54,"6",false,"keysMarketOtherOffer"],
			maxOffer7: [55,"7",false,"keysMarketOtherOffer"],
			maxOffer8: [56,"8",false,"keysMarketOtherOffer"],
			maxOffer9: [57,"9",false,"keysMarketOtherOffer"],
			maxOffer10: [48,"0",false,"keysMarketOtherOffer"],	
		},
		keysTransportOverview: {
			readInTransports: [76,"L",false,"keysTransportOverview"],
		},
		keysReports: {
			forward: [87,"W",false,"keysReports"],
			move: [86,"V",false,"keysReports"],  
			del: [76,"L",false,"keysReports"],
			next: [37,"←",false,"keysReports"], 
			prev: [39,"→",false,"keysReports"],
			expor: [69,"E",false,"keysReports"],
		},
		keysMap: {
			villageInfo: [68,"D",false,"keysMap"],
			sendUnits: [84,"T",false,"keysMap"],
			getUnits: [83,"S",false,"keysMap"],
			sendResources: [82,"R",false,"keysMap"],
			getResources: [74,"J",false,"keysMap"],
			centerMap: [90,"Z",false,"keysMap"],
			groupLinks: [71,"G",false,"keysMap"],
			selectVillage: [65,"A",false,"keysMap"],
			chooseSnob: [78,"N",false,"keysMap"],
			coordList: [76,"L",false,"keysMap"],
			contextMenu: [67,"C",false,"keysMap"],
		},
	},
	disableAll: {
		globalHotkeys: false,
		keysPlace: false,
		keysDsMoveReports: false,
		keysMarketSendRes: false,
		keysMarketOwnOffer: false,
		keysMarketOtherOffer: false,	
		keysTransportOverview: false,
		keysReports: false,
		keysMap: false,
	},
	extraKeys: {
		allKeys: [[13,"enterKey"],[9,"tabKey"],[38,"arrowUpKey"],[40,"arrowDownKey"],[37,"arrowLeftKey"],[39,"arrowRightKey"],[8,"backspaceKey"],[16,"shiftKey"],[32,"spaceKey"],[17,"strgKey"],[18,"altKey"],[27,"escKey"]],
		enterKey: "↵", // &crarr;,
		tabKey: "⇔",
		arrowUpKey: "↑",
		arrowDownKey: "↓",
		arrowLeftKey: "←",
		arrowRightKey: "→",
		backspaceKey: "⇐",//"&lArr;",
		shiftKey: "⇑", // &uArr;
		spaceKey: "Space",
		strgKey: "Strg",
		altKey: "Alt",
		escKey: "Esc",
	},
};
var defaultFilterSettings = {minRes: [50000,56000,60000,50000], minResPerCent: [60,56,60,50], maxResPerCent: [90,80,85,75], maxRes: [350000,300000,350000,280000], 
    pointsFilter: 9000, farmFilter: 0, distanceFilter: 50, offerBorder: 10, minSendBorder: 5000, ownOfferBorder: 10, allyEnemies:"",
    fontSize:"0.9em",imgSize:"13px",marginTop:"5px", timeStor: ["10","00","00",0], groupPopup: [300,550], groupFontSize: 1};
var defaultCheckboxSettings = {filterCheckbox: false, readInCheckbox: false, disableMinRes: false, 
	disableMaxRes: false, minResPerCent: false, maxResPerCent: false, distanceFilterCheckbox: false, disablePointsFilter: false, 
	changePointsFilter: false, disableFarmFilter: false, changeFarmFilter: false, getIncomingTradesCheckbox: false, 
	tradesReaded: false, disableOfferBorder:true, disableOwnOfferBorder:true, offerWood:true, offerClay:true, offerIron:true, 
	requireWood:true, requireClay:true, requireIron:true, fadeOutEnemies:false,fadeOutTable:false,fadeOutOwnOfferTable:false,
	disableSendResources:false, disableLastVillage:false, disableDoOwnOffer:false, disableMaxButtons:false, disableFadeOutOffersEnemies:false,
	disableUseOfTroops: false, disableUseOfRessis: false, disableNeighbourVillages: false, disableSumRessis: false, fullFarmsPercentage: 100,
	sumUpRessisAbsolute: true, neighbourVillagesResAbsolute: true, disableFilterLines: false, disableGroupLinks: false,
	disableGroupLinksCombined: false, disableGroupLinksProduction: false, viewConfig: ["none","none"], activeSettingsTab: "tabSendResources",
	isSorted: ["dssb_sortWithEQ",false], disableSortSendResources: false, disableAbsoluteDisplay: true,
	disableMinSendBorder: false, disableBadEQ: false, useWood: true, useClay: true, useIron: true, disableSaveOrder: false, disableGroupLinksMain: false, 
	disableGroupLinksMap: false,disableCombineUnitImgs:false, disableDsAccDualForum:false, disableDsRealCharts: false, disableShowGroupsProduction: false,
	settingsDsRealCharts: [false,false,false,false,false,false], chartSettings: ["playerPoints","playerBashall","allyPoints","allyBashall"],
	disableLastTroopsLink: false, disableMapRedirTargets: false, uniMinRes: false, uniMaxRes: false, disableHotkeys: false, reportGroups: false,
	disableReportButtons: [false,false,false,false,false,false,false,false], disableDsMoveReports: false, keywordInput: [0,""], disableMassRecruit: false,
	disableAGCounter: false, disableDSLoyalty: false, disableShowLoyalty: [false,false,false,false,false,false], disableLoyaltyColor: 0, disableShowGroups: false, 
	selectedGroups: [0,0,0,0,0,0,0,0], disableShowGroupsMain: false, disableShowGroupsMap: false, disableShowGroupsCombined: false,
	disableDSTroopsCalc: false, disableNewIncs: false, disableBashpoints: false, disableAddStandingUnits: false, disableAddInfosStorage: false,
	newIncsSettings: [true,"",10],disableBuildVars:false,buildVarsDefault:false,bvSmallQueue:false,bvFadeReady:false, durableOffer: false, disableConTimeM: false,
	disableConTimeP: false,disableVpDistance: false, disableShowGroupsBuildings: false,disableGroupLinksBuildings: false}
var defaultOwnOfferValues = {resSell: 1000, resBuy: 1000, maxTime: 40,}
var paypalButton = "data:;base64,R0lGODlhVgAVAOZ/AP/27P63R/+vM/7bmX+Jg1Bqe2B1gFBqfUBedv7epGBiU1BZUyBJbjBUczBKWyBCXv/it/7HbBA7YhA+aiBJcP7hqv+sLf7gpP7en/+6Tb+YU//qzP/u2v+xOv/nzUBedP/pyoB3WUBfef/s0EBRWP/89s6/mH+Li6+GP/+0QIBwSe7VoN+aLs+TM3+Nj66smWB0fe7Yq7+OO66pjnB/hc7DpL63nL60kp6hlO+kMd+dNJ9+Qp6eiv+yOZ99Pv/053BuW56fkM+ZQd7Loe7Tm/64Sp+HVv7ZmI6Wj//69f+/Wf/w2HCCjP7Nef/CYJ+KYb+RRP/Ngq+QVd+7gP+vOt+hPu7duP/Yn/+lNP63S+/EgmBfTnBnSv+mLb+nfEBgfP7Qf3+OkmBmXY+BXd+pUP+oLP+pNP65Ta6vor65o//coc+hUv/ZoN7KnI6Thv/15/7jsP+pJv/rzv7mt/7ovf/dqv+xOP/OhP/46v+/Xv/03v/v0v/sxwAzZv+ZM////yH5BAEAAH8ALAAAAABWABUAAAf/gH+Cg39+hoeIiYqLjI2Oj4qEkoOGIz9vmJmYJSWanp+gmhyjHqWmpqOpqpycoD8bhpOUS3i1tre4ubq7vL2+u0t+sn5LesbHyMnKy8zNzs/PwoR+IHvW19jZ2tvc3d7f4HvShQl85ufo6err7O3u7/DmatJ+CXT3+Pn690wTfRRo9gkcuM/KlzAEExJMIMxPkSNzIkqcSHGOiz4HXFDoU6Oix48U0/RxAbIkyCNFDGWJAKely5cw4Yjo09KGCBxwcJx4IYJGjJZIRBx40VJnjQMHfsY4IeLEiT424Lw4IAJJzRM1DIioEbNrSydnDAUIEKGC2bNo0xrog8AG2j59/wwU6HOiwloaDfoMqdBnAoK5BirMxetvSJA+BeYGqYCgTwMafRiknXw2wlhDKTI7OXKhs+fPnlc0Zmvigok+MC6sII36wow+BNpEXnG6wOnUN/pemMBANdsLDPqUnjABtPELR5RkTmGISofnHZyAGYChuvXr1W98iIyBRx8e1ft8IBD5Q14CrwlgSO+mzwwMuT/knvBh+wci4jHg/4D9+oAmSkD3nCECFGhggT1koOCCChoRwoIO9JEBEH1okIEUfQARQh9jaOAhGRtaGGKIGRjRRwga9CGGhxqskeKDLzLIYA8HHmhIFxbkqOOOPFqgQB8qyLCDBCRYQEIfJMjggP4EOuiApAwLOJDDkTkY2UcOO/SxAAoS9IGCBQ88gIIKErSggpcWnPllj2zmWEZDccQp55x0xsFChHA50EIcfTjARR8P7BmHDw/0uacED8SJaJxbAFooC3G0EOEDPsSxQB+QXgppnZzGKUwSfmBhx6iklmrqqFVAIcSoQvShwKmwxirrrLSWasY4fuSh66689uprHk9w+OuwxBZrbLHjCOJHFHc06+yz0EI7hRdaRGvttdhmq62zyVJyRR3ghivuuOSWa+656KZrLhvdTuMHBHLEK6+8I4ww77345jvvBvyC4O+///Ir8MD11qsvBLHIIkgSAEDi8MMQRxwLAJIEAgA7";

if( location.href.match(/groups.php/) ) {
	var p = document.getElementsByTagName("p")[0].getElementsByTagName("input")[0];
	p.addEventListener("click",function() {
		var villageId = location.href.split("village_id=")[1].split("&")[0];
		var arr = lib.storage.getValue("groupsAndLoyaltyData_"+villageId, ",,").split(",");
		var table = document.getElementById("content_value").getElementsByClassName("vis")[0];
		var tr = table.getElementsByTagName("tr"), label="", input="", groups=[];
		for( var i=1 ; i<tr.length ; i++ ) {
			label = tr[i].getElementsByTagName("label")[0];
			if( label.getElementsByTagName("input")[0].checked ) groups.push( label.textContent );
		} arr[0]=groups.join("; ");
		lib.storage.setValue("groupsAndLoyaltyData_"+villageId, arr.join(",") );
		if( window.opener.document.getElementById("showGroups"+villageId) ) window.opener.document.getElementById("showGroups"+villageId).title = "- "+arr[0]+" -";
		if( window.opener.document.getElementById("showVillageGroups"+villageId) )
			window.opener.document.getElementById("showVillageGroups"+villageId).textContent = "- "+arr[0]+" -";
		if( window.opener.location.href.match(/screen=overview_villages/) && window.opener.document.getElementById("showGroups"+villageId) )
			window.opener.document.getElementById("showGroups"+villageId).parentNode.parentNode.getElementsByTagName("a")[0].title = "- "+arr[0]+" -";
	}, false);
	return;
} else if( !location.href.match(/groups.php/) && !location.href.match(/forum\.php/) ) {

	/* global checkboxes */ 
	var newCheckboxes = function() {
		var checkboxes = lib.storage.getValue("Checkboxes_player.id"+lib.game_data.player.id,defaultCheckboxSettings);
		if( lib.storage.getValue("DsAccDualForum_disabled",false) ) checkboxes.disableDsAccDualForum=true;
		/* Versionsverwaltung für den Sprung von Version 3.0.1 zu Version 3.1 */
		if( typeof lib.storage.getValue("Hotkeys_player.id"+lib.game_data.player.id,hotkeys.keys).keysPlace.lastTroops == "undefined" )
			lib.storage.deleteValue("Hotkeys_player.id"+lib.game_data.player.id);
		hotkeys.keys = lib.storage.getValue("Hotkeys_player.id"+lib.game_data.player.id,hotkeys.keys);
		hotkeys.disableAll = lib.storage.getValue("HotkeysDisableAll_player.id"+lib.game_data.player.id,hotkeys.disableAll);
		hotkeys.disableAll.disableAll = checkboxes.disableHotkeys;
		return checkboxes;
	}
	var checkboxes = new newCheckboxes();
	var filter = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings);
	
	/* saveOrderVillage: change village */
	var saveOrderVillage = function() {
		if( document.getElementById("menu_row2") != null && !checkboxes.disableSaveOrder) {
			if( document.getElementById("dssb_deleteSavedVillageOrder") != null ) return;
			this.list = lib.storage.getValue("SaveOrderVillages_player.id"+lib.game_data.player.id,undefined);
			if( this.list == "" ) {
				lib.storage.deleteValue("SaveOrderVillages_player.id"+lib.game_data.player.id);
				this.list = undefined;
			}
			if( this.list != undefined ) {
				while( /arrowCell/.test(document.getElementById("menu_row2").cells[1].className) )
					document.getElementById("menu_row2").deleteCell(1);
				this.list = this.list.split(",");
				this.jump=false;
				this.next = 0;
				this.prev = this.list.length-1;
				for( this.i = 0 ; this.i < this.list.length; this.i++ ) {
					if( parseInt(this.list[this.i],10) == parseInt(lib.game_data.village.id,10) ) {
						this.prev = this.i == 0 ? this.list.length-1 : this.i - 1;
						this.next = this.i == this.list.length-1 ? 0 : this.i + 1;
						break;
					}
				}
				this.jump = this.i == this.list.length;
				
				this.i=1;
				this.cell = document.getElementById("menu_row2").insertCell(this.i++);
				this.cell.className = "icon-box";
				this.a = this.cell.appendChild( document.createElement("a") );
				this.a.href = "javascript:;";
				this.a.innerHTML = " X ";
				this.a.id = "dssb_deleteSavedVillageOrder";
				this.a.style.fontWeight = "bold";
				this.a.style.color = "red";
				this.a.alt = gui[lib.lang].resetVillageOrder;
				this.a.title = gui[lib.lang].resetVillageOrder;
				this.a.addEventListener("click",function() {
					lib.storage.deleteValue("SaveOrderVillages_player.id"+lib.game_data.player.id);
					if( document.getElementById("dssb_jump_link") != null )
						this.parentNode.parentNode.removeChild( this.parentNode.parentNode.getElementsByClassName("icon-box arrowCell")[0] );
					this.parentNode.parentNode.getElementsByClassName("village_switch_link")[0].href = location.href.replace(/village=[pnj]?\d+/,"village=p"+lib.game_data.village.id);
					this.parentNode.parentNode.getElementsByClassName("village_switch_link")[1].href = location.href.replace(/village=[pnj]?\d+/,"village=n"+lib.game_data.village.id);
					this.parentNode.parentNode.removeChild( this.parentNode );
				}, false);
				
				if( this.jump ) {
					this.cell = document.getElementById("menu_row2").insertCell(this.i++);
					this.cell.className = "box-item icon-box arrowCell";
					this.a = this.cell.appendChild(document.createElement("a"));
					this.a.id = "dssb_jump_link";
					this.a.href = location.href.replace(/village=[pnj]?\d+/,"village="+this.list[0]);
					this.a.title = gui[lib.lang].gotoFirstGroupVillage;
					this.a.className = "jump_link";
					this.div = this.a.appendChild(document.createElement("span"));
					this.div.className = "groupJump";
				}
				this.cell = document.getElementById("menu_row2").insertCell(this.i++);
				this.cell.className = "box-item icon-box arrowCell";
				this.a = this.cell.appendChild(document.createElement("a"));
				this.a.accessKey = "a";
				this.a.id = "dssb_arrowLeft";
				this.a.href = location.href.replace(/village=[pnj]?\d+/,"village="+this.list[this.prev]);
				this.a.className = "village_switch_link";
				this.div = this.a.appendChild(document.createElement("span"));
				this.div.className = "groupLeft";
      
				this.cell = document.getElementById("menu_row2").insertCell(this.i++);
				this.cell.className = "icon-box arrowCell";
				this.a = this.cell.appendChild(document.createElement("a"));
				this.a.accessKey = "d";
				this.a.id = "dssb_arrowRight";
				this.a.href = location.href.replace(/village=[pnj]?\d+/,"village="+this.list[this.next]);
				this.a.className = "village_switch_link";
				this.div = this.a.appendChild(document.createElement("span"));
				this.div.className = "groupRight";
			}
		}
	}
	new saveOrderVillage();
	
	if( !hotkeys.disableAll.globalHotkeys ) {
		lib.hotkeys.keys.push( { key: hotkeys.keys.globalHotkeys.hotkeyMarket, href: lib.game_data.link_base_pure.replace("screen=","screen=market") } );
		lib.hotkeys.keys.push( { key: hotkeys.keys.globalHotkeys.hotkeyPlace, href: lib.game_data.link_base_pure.replace("screen=","screen=place") } );
		lib.hotkeys.keys.push( { key: hotkeys.keys.globalHotkeys.hotkeyMap, href: lib.game_data.link_base_pure.replace("screen=","screen=map") } );
		lib.hotkeys.keys.push( { key: hotkeys.keys.globalHotkeys.hotkeyReport, href: lib.game_data.link_base_pure.replace("screen=","screen=report") } ); 
		lib.hotkeys.keys.push( { key: hotkeys.keys.globalHotkeys.hotkeyMain, href: lib.game_data.link_base_pure.replace("screen=","screen=main") } );   	
		
		var container = document.getElementById("menu_row2"); var a = container.getElementsByTagName("a");
		for( var j = 0; j < a.length; j++ ) {
			if( a[j].accessKey == "d" )  {var href = a[j].href; 
				lib.hotkeys.keys.push( { key: hotkeys.keys.globalHotkeys.nextVillage, href: href } ); 
			} else if( a[j].accessKey == "a" )  {var href = a[j].href; 
				lib.hotkeys.keys.push( { key: hotkeys.keys.globalHotkeys.preVillage, href: href } );
			}
		}
	}
	
/* method for changing the dummy variable by changing villages */
var ChangeDummy = function() {
	var dummyTrades = lib.storage.getValue("DummyTrades_player.id"+lib.game_data.player.id,{});
						
	for( var ey in dummyTrades ) {	
		/* delete and allocate dummy-values from other villages than the actual */
		if( ey != lib.game_data.village.id ) {
			for( var sec in dummyTrades[ey] ) {
				var tradeValues = dummyTrades[ey][sec];
				var destinationName = tradeValues.coords;
				delete tradeValues["coords"];
				var trades = {wood: [], clay: [], iron: [], dateOfArrival:[]};
				var trade = lib.storage.getValue("Trade_player.id"+lib.game_data.player.id+"_"+destinationName,trades);
				trade.wood.push(tradeValues.wood[0]); trade.clay.push(tradeValues.clay[0]); trade.iron.push(tradeValues.iron[0]); trade.dateOfArrival.push(tradeValues.dateOfArrival[0]);
				lib.storage.setValue("Trade_player.id"+lib.game_data.player.id+"_"+destinationName,trade);
			}
			delete dummyTrades[ey];
		}							
	}
	lib.storage.setValue("DummyTrades_player.id"+lib.game_data.player.id,dummyTrades);
};
new ChangeDummy();

/* methods for "showGroups" implementation */
if( !checkboxes.disableShowGroups ) {
	/* obj = Objekt, an das die Gruppen angehaengt werden sollen, id=village_id, newLine=boolean, ob Zeilenumbruch nach "aktualisieren", overview=Uebersichten */
	var newShowGroups = function( obj, id, newLine, overview ) {
		if( !checkboxes.disableGroupLinks ) {
			this.groups = lib.storage.getValue("groupsAndLoyaltyData_"+id, ",,,").split(",")[0];
			if( !overview ) {
				var bGroups = obj.appendChild( document.createElement("b") );
				bGroups.innerHTML = gui[lib.lang].showGroups.groups;
				var span = obj.appendChild( document.createElement("span") ); 
				span.style.paddingRight = "10px";
				var newGroupsA = obj.appendChild( document.createElement("a") );
				newGroupsA.innerHTML = gui[lib.lang].showGroups.mainGroupEdit;
				newGroupsA.title = "- "+(this.groups != ""?this.groups:gui[lib.lang].showGroups.noGroupsSaved)+" -";
				newGroupsA.href = "javascript:popup_scroll(\"groups.php?&mode=village&village_id="+id+(lib.game_data.player.sitter_id!=0?"&t="+lib.game_data.player.id:"")+"\", "+filter.groupPopup[0]+", "+filter.groupPopup[1]+");";
				newGroupsA.id = "showGroups"+id;		
				if( (location.href.match(/screen=main/) && !checkboxes.disableShowGroupsMain) || (location.href.match(/screen=map/) && !checkboxes.disableShowGroupsMap) ) {
					var span = obj.appendChild( document.createElement("span") ); 
					span.style.paddingRight = "15px";
					obj.innerHTML+="<a href=\"/game.php?village="+id+"&screen=overview_villages"+(lib.game_data.player.sitter_id!=0?"&t="+lib.game_data.player.id:"")+"&mode=groups&group=0&page=-1\">"+gui[lib.lang].showGroups.update+"</a>";
					if( newLine ) obj.innerHTML+="<br/>"; else obj.innerHTML+="<span style=\"padding-right: 20px;\"></span>";	
					obj.innerHTML+="<font size='"+filter.groupFontSize+"' id='showVillageGroups"+id+"'>- "+(this.groups != ""?this.groups:"<i>"+gui[lib.lang].showGroups.noGroupsSaved+"</i>")+" -</font>";
				} return;
			} else {
				var newGroupsA = obj.appendChild( document.createElement("a") );
				newGroupsA.innerHTML = gui[lib.lang].showGroups.groupEdit;
				newGroupsA.href = "javascript:popup_scroll(\"groups.php?&mode=village&village_id="+id+(lib.game_data.player.sitter_id!=0?"&t="+lib.game_data.player.id:"")+"\", "+filter.groupPopup[0]+", "+filter.groupPopup[1]+");"
				newGroupsA.id = "showGroups"+id;
				newGroupsA.title = "- "+(this.groups != ""?this.groups:gui[lib.lang].showGroups.noGroupsSaved)+" -";
				newGroupsA.style.whiteSpace = "nowrap";
				var villageGroupsA = newGroupsA.parentNode.parentNode.getElementsByTagName("a")[0];
				if( document.getElementById("buildings_table") != null ) villageGroupsA = newGroupsA.parentNode.parentNode.getElementsByTagName("td")[2].getElementsByTagName("a")[0];
				villageGroupsA.title = "- "+(this.groups != ""?this.groups:gui[lib.lang].showGroups.noGroupsSaved)+" -";
				if( this.groups != "" ) {
					if((document.getElementById("combined_table")&&!checkboxes.disableShowGroupsCombined)||(document.getElementById("production_table")&&!checkboxes.disableShowGroupsProduction) || (document.getElementById("buildings_table")&&!checkboxes.disableShowGroupsBuildings) )
						villageGroupsA.parentNode.innerHTML+="<br/><font size='"+filter.groupFontSize+"' id='showVillageGroups"+id+"'>- "+(this.groups != ""?this.groups:gui[lib.lang].showGroups.noGroupsSaved)+" -</font>";		
				}
			}
		}
	};
}

/* AGCounter */
if( !checkboxes.disableAGCounter ) {
	var nobleMenKills = lib.storage.getValue("killsNoblemen_"+lib.game_data.player.id,[0,0]);
	
	var table1 = document.createElement("table");
	table1.className="header-border menu_block_right";
	var tbody = table1.appendChild(document.createElement("tbody"));
	var tr = tbody.appendChild(document.createElement("tr"));
	var td = tr.appendChild(document.createElement("td"));
	var table = document.createElement("table");
	table.className="box smallBadding";
	td.appendChild( table );
	table = table.appendChild(document.createElement("tbody"));
	var row = table.appendChild(document.createElement("tr") );
	var row2 =  tbody.appendChild(document.createElement("tr") ); 
	row2.className = "newStyleOnly";
	var cell = row2.appendChild(document.createElement("td"));
	cell.className = "shadow";
	var div = cell.appendChild(document.createElement("div")).className = "leftshadow";
	div = cell.appendChild(document.createElement("div")).className = "rightshadow";
	cell = row.appendChild(document.createElement("td") );
	cell.className = "icon-box firstcell";
	var span = cell.appendChild( document.createElement("span") );
	span.style.paddingRight = "5px";
	cell.innerHTML += gui[lib.lang].dsAGCounter.nobleMen+": <b>"+nobleMenKills[0]+"/"+nobleMenKills[1]+"</b>";
	cell.title = gui[lib.lang].dsAGCounter.kills[0]+" "+nobleMenKills[0]+"/"+nobleMenKills[1]+" "+gui[lib.lang].dsAGCounter.kills[1];
	cell.id = "dssb_dsAGCounterValues";
	var span = cell.appendChild( document.createElement("span") );
	span.style.paddingRight = "5px";
	var td = document.createElement("td");
	td.noWrap = "true";
	td.appendChild(table1);
	td.setAttribute("align","center");
	var a = document.getElementById("header_info").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td");

	for( var i=0 ; i<a.length ; i++ ) {
		if( a[i].textContent == " " ) {
			a[i].parentNode.replaceChild(td,a[i]);
			break;
		}
	}
}

if( !checkboxes.disableDSLoyalty ) {
	var imgURL = "http://www.die-staemme.de/graphic/ally_rights/lead.png";
	
	/* read-out loyalty from screen=overview */
	if( location.href.match(/screen=overview/) && !location.href.match(/screen=overview_villages/)) {
		var loyalty = lib.storage.getValue("groupsAndLoyaltyData_"+lib.game_data.village.id, ",,").split(",");
		var table = document.getElementById("show_mood");
		if( table.className != "vis moveable hidden_widget" ) {
			loyalty[1] = lib.getServerTime().getTime()/1000;
			loyalty[2] = parseInt(table.getElementsByTagName("span")[0].textContent,10);
		}
		if( loyalty[2] == "" ) {loyalty[1] = lib.getServerTime().getTime()/1000; loyalty[2]=100;}
		lib.storage.setValue("groupsAndLoyaltyData_"+lib.game_data.village.id, loyalty.join(",") );
	}
	
	/* update and return loyalty from village: */
	var updateLoyalty = function(id) {
		this.groupsAndLoyalty = lib.storage.getValue("groupsAndLoyaltyData_"+id, ",,").split(",");
		this.otherLoyalty = lib.storage.getValue("otherLoyaltyData_"+id, ",").split(",");
		if( this.groupsAndLoyalty[2] != "" || this.otherLoyalty[1] != "" ) {
			this.values;
			if( this.groupsAndLoyalty[2] != "" ) this.values = [this.groupsAndLoyalty[1],this.groupsAndLoyalty[2]];
			else this.values = this.otherLoyalty;
			this.newTime = lib.getServerTime().getTime()/1000;
			this. difference = Math.round((this.newTime*1-this.values[0]*1)/3600);
	        this.loyal = parseInt(this.values[1],10)+parseInt(this.difference);

			if(this.loyal > 100) {
				if( this.otherLoyalty[1] != "" ) {
					lib.storage.deleteValue("otherLoyaltyData_"+id);
					this.loyal = "<span class='grey' style='cursor:help;' title='"+gui[lib.lang].dsLoyalty.noLoyaltySaved+"'>???<span>";
				} else this.loyal = 100;
			}
			if( !checkboxes.disableLoyaltyColor ) {
				if(this.loyal <= 100 && this.loyal > 70 ) this.loyal = "<b style='color:green'>" + this.loyal + "</b>";
				else if(this.loyal < 100 && this.loyal > 40 ) this.loyal = "<b style='color:orange'>" + this.loyal + "</b>";
				else if(this.loyal < 100 && this.loyal <= 40 ) this.loyal = "<b style='color:red'>" + this.loyal + "</b>";		
			} else if( this.loyal < 100 ) this.loyal = "<b style='color:red'>" + this.loyal + "</b>";
		} else this.loyal = "<span class='grey' style='cursor:help;' title='"+gui[lib.lang].dsLoyalty.noLoyaltySaved+"'>???<span>";
		return this.loyal;
	};
	
	/* show loyalties on overview_villages_pages/ sort loyalties: */
	var appendLoyaltyLine = function() {
		if( document.getElementById("buildings_table") != null ) var buildOverview = true;
		else var buildOverview = false;
		var table = document.getElementsByClassName("vis")[3];
		var trLength = table.getElementsByTagName("tr").length;
		var thTr = table.getElementsByTagName("tr")[0];
		var th = thTr.getElementsByTagName("th");
		if( !buildOverview ) var newTh = thTr.appendChild(document.createElement("th"));
		else var newTh = thTr.insertBefore( document.createElement("th"), thTr.getElementsByTagName("th")[thTr.getElementsByTagName("th").length-1] );
		var villageHrefTd = 0;
	
		for( var i=0 ; i<th.length; i++ ) {
			if( th[i].textContent.match(regExp[lib.lang].village) ) {
				villageHrefTd = i;
				break;		
			}
		}
		for(var i=1; i<trLength; i++) {
			var trLine = table.getElementsByTagName("tr")[i];
			if( trLine.getElementsByTagName("th").length > 0 ) continue;
			var lineTds = trLine.getElementsByTagName("td");
			var villageId = lineTds[villageHrefTd].getElementsByTagName("a")[0].href.split("village=")[1].split("screen=")[0].replace(/[^0-9]/g,"");
			if( !buildOverview ) var td = trLine.appendChild( document.createElement("td") );
			else var td = trLine.insertBefore( document.createElement("td"), lineTds[lineTds.length-1] );
			td.id = "DSLoyalty_"+villageId;
			td.style.textAlign = "right";
			td.innerHTML = updateLoyalty(villageId);
		}

		var sorted = 0;		
		var th = table.getElementsByTagName("tr")[0].getElementsByTagName("th");
		newTh.style.whiteSpace = "nowrap";
		newTh.style.textAlign = "center";
		newTh.style.cursor = "pointer";
		newTh.innerHTML = sorted == 1 ? String.fromCharCode(9650) : String.fromCharCode(9660);
		newTh.style.color = sorted == 0 ? "grey" : "black";
		var img = newTh.appendChild(document.createElement("img"));
		img.src = imgURL;
		img.title = gui[lib.lang].dsLoyalty.sort;
	
    	newTh.addEventListener("click",function() {
			if( sorted != 1 ) sorted = 1; else sorted = -1;
			newTh.style.color = sorted == 0 ? "grey" : "black";
			if( sorted != 0 ) newTh.innerHTML = sorted == 1 ? String.fromCharCode(9650) : String.fromCharCode(9660);
			newTh.appendChild(img);
			var villageHrefTd = 0;
	
			for( var i=0 ; i<th.length; i++ ) {
				if( th[i].textContent.match(regExp[lib.lang].village) ) {
					villageHrefTd = i;
					break;		
				}
			}
	
			var loyalties = []; var rest = [];
			for( var i=1 ; i< trLength ; i++ ) {
				var tr = table.getElementsByTagName("tr")[i];
				if( tr.getElementsByTagName("th").length > 0 ) {
					rest.push( tr );
				} else {
					var id = table.getElementsByTagName("tr")[i].getElementsByTagName("td")[villageHrefTd].getElementsByTagName("a")[0].href.split("village=")[1].split("&")[0].replace(/[^0-9]/g,"");	
					var value = document.getElementById("DSLoyalty_"+id).textContent;
					if( value.match(/\?\?\?/) ) value = sorted != 1 ? 0 : 101;
					loyalties.push( [value , tr ] );
				}
			}
		
			if( sorted != 1 ) {		
				loyalties.sort(function(a,b) {return b[0]-a[0]}); 
			} else {loyalties.sort(function(a,b) {return a[0]-b[0]});}

			for( var i=0 ; i< loyalties.length ; i++ ) table.appendChild(loyalties[i][1]);
			for( var i=0 ; i< rest.length ; i++ ) table.appendChild(rest[i]);
		},false);
	};
}

/* show loyalty on info_village pages: */
if( location.href.match(/screen=info_village/) ) {
	var id = updateLoyalty(location.href.match(/id=(\d+)/)[1]);
	if( !id.match(/\?\?\?/) && !checkboxes.disableShowLoyalty[4] ) {
		var part = document.getElementById("content_value").getElementsByClassName("vis")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[3];
		var tr = part.parentNode.insertBefore( document.createElement("tr"), part );
		var td = tr.appendChild( document.createElement("td") );
		td.textContent = gui[lib.lang].dsLoyalty.loyalty+":";
		td = tr.appendChild( document.createElement("td") );
		td.innerHTML = id;
	}
}

/* time counter class for continuing date and time */
var newTimeCounter = function(ms) {
	var time = new Date(ms); var string = "";
	var day = time.getDate() < 10 ? "0"+time.getDate() : time.getDate(), month = (parseInt(time.getMonth(),10)+1) < 10 ? "0"+(parseInt(time.getMonth(),10)+1) : (parseInt(time.getMonth(),10)+1);
	var hours = time.getHours() < 10 ? "0"+time.getHours() : time.getHours(), minutes = time.getMinutes() < 10 ? "0"+time.getMinutes() : time.getMinutes();
	var seconds = time.getSeconds() < 10 ? "0"+time.getSeconds() : time.getSeconds();			
				
	if( lib.getServerTime().getDate() == time.getDate() )  string = gui[lib.lang].buildingVars.today;
	else if( lib.getServerTime().getDate()+1 == time.getDate() ) string = gui[lib.lang].buildingVars.tomorrow;
	else string = gui[lib.lang].buildingVars.on+" "+day+"."+month+".";	
				
	string+=" "+gui[lib.lang].buildingVars.at+" "+hours+":"+minutes+":"+seconds+" "+gui[lib.lang].buildingVars.clock;
	return string;
}

/*Reads the resources from each village and stores them via storage*/
if ( document.getElementById('production_table') && lib.pa ) {
	var checkboxes = new newCheckboxes();
	var filter = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings);
	if( !checkboxes.disableSendResources || (!checkboxes.disableGroupLinks&&!checkboxes.disableGroupLinksProduction) || (!checkboxes.disableNeighbourVillages&&!checkboxes.disableUseOfRessis) || !checkboxes.disableSumRessis ) {
		var villageCell=1, pointsCell=2, resCell=3, storageCell=4, tradersCell=5, farmCell=6, recruitCell=9, resWood=0, resClay=0, resIron=0;
		var now = lib.getServerTime(), fm = false;
		
		var getCells = function() {
			var cellNames = document.getElementById("production_table").getElementsByTagName("tr")[0].getElementsByTagName("th");
			for(var i=0 ; i<cellNames.length ; i++) {
				if( cellNames[i].textContent.match(regExp[lib.lang].village) ) villageCell=i;
				if( cellNames[i].textContent.match(regExp[lib.lang].points) ) pointsCell=i;
				if( cellNames[i].textContent.match(regExp[lib.lang].res) ) resCell=i;
				if( cellNames[i].textContent.match(regExp[lib.lang].storage) ) storageCell=i;
				if( cellNames[i].textContent.match(regExp[lib.lang].traders) ) tradersCell=i;
				if( cellNames[i].textContent.match(regExp[lib.lang].farm) ) farmCell=i;
				if( cellNames[i].textContent.match(regExp[lib.lang].recruit) ) recruitCell=i;				
			}
		}
		new getCells();
		var rows = document.getElementById("production_table").getElementsByTagName("tr");
		
		/* object for sumUpRes */
		if( !checkboxes.disableSumRessis ) {
			var productionSumUpRes = function() {
				this.counter=0;
				this.sumPoints=0;
				this.res=[0,0,0];
				this.storage=0;
				this.fullFarms=0;
				this.notFullFarms=0;
				this.units=[];
			}
			var sumUpRes = new productionSumUpRes();
		}
		
		/* headline for groupLinks */
		if(!checkboxes.disableGroupLinks && !checkboxes.disableGroupLinksProduction) {
			var th = rows[0].appendChild( document.createElement("th") );
			th.innerHTML = gui[lib.lang].showGroups.groupLinksHead;
			th.style.textAlign = "center";
		}
			
		/* settings for sendResources */
		if( !checkboxes.disableSendResources ) {		
			if( checkboxes.disablePointsFilter && checkboxes.disableFarmFilter ) {
				checkboxes.filterCheckbox = false;
				lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
			}
			if( checkboxes.filterCheckbox ) {
				var minfarm = filter.farmFilter;
				var filterPoints = filter.pointsFilter;
			}
			if( checkboxes.readInCheckbox ) {
				var sendResourcesCounter = 0;
				var ids = new Array();			
			}
		}

		for(var i = 1; i < rows.length; i++) {
			if(!rows[i].innerHTML.match(/id="label_\d+"/))
				continue;
			var cells = rows[i].getElementsByTagName("td");
			var farm = cells[farmCell].textContent.split("/");
			var ressis=cells[resCell].textContent.replace(/\.|\s$|^\s/g, "").split(" ");
			var points = parseInt(cells[pointsCell].textContent.replace(/\.|\s$|^\s/g, ""),10);
			var href = cells[villageCell].getElementsByTagName("a")[0].href.split("village=")[1].split("&")[0];

			/* combine Unit Images */
			if( !checkboxes.disableCombineUnitImgs ) {
				if( cells[recruitCell].getElementsByTagName("img") ) {
					var images = cells[recruitCell].getElementsByTagName("img");		
					var units=[];
					for(var j = 0; j < images.length; j++) {
						var unit = images[j].src.split("unit_")[1].split(".png")[0];
						var len = parseInt(images[j].title.split(" - ")[0], 10);
						var date = images[j].title.split(" - ")[2];

						if( lib.contains( unit, units ) ) {
							var index = lib.contains(unit,units).replace(/"/g, "");
							units[index] = unit + ":" + (parseInt(units[index].split(":")[1], 10)+len).toString() + ":" + escape(date);
						} else units.push(unit + ":" + len.toString() + ":" + escape(date));
						if( !checkboxes.disableSumRessis ) {
							if( lib.contains( unit, sumUpRes.units ) ) {
								var indi = lib.contains(unit,sumUpRes.units).replace(/"/g, "");
								sumUpRes.units[indi] = unit + ":" + (parseInt(sumUpRes.units[indi].split(":")[1], 10)+len).toString();
							} else sumUpRes.units.push( unit + ":" + len.toString() );
						}
					}
					var list = '<ul style="width: 12em;" id="unit_order_'+href+'" class="order_queue">';
					for(var j = 0; j < units.length; j++) {
						list += '<li id="order_'+j+'" class="order"><div class="order-status-light" style="background-color: green;"></div>';
						list += '<div class="queue_icon"><img src="http://'+location.host+'/graphic/unit/unit_'+units[j].split(":")[0]+'.png';
						list += '" title="'+units[j].split(":")[1]+' '+lib.createTextNode( gui[lib.lang].pieces ).textContent+'- '+unescape(units[j].split(":")[2]);
						list +='" alt=""></img></div></li>';
					}
					cells[recruitCell].innerHTML = list+"</ul>";
				}
			}
			
			/* read out all on production_table */
			if( !checkboxes.disableSendResources || (!checkboxes.disableNeighbourVillages && !checkboxes.disableUseOfRessis) ) {
				var villageName=cells[villageCell].textContent.replace (/^\s+/, '').replace (/\s+$/, '');
				if( lib.lang != "ru" ) {var villageCoord = villageName.match(/\((\d{1,3})\|(\d{1,3})\) K(\d+)$/)[0].split("(")[1].split(")")[0];}
				else {var villageCoord = villageName.split("("); villageName = villageName[villageName.length-1].split(")")[0];}	
				var values = [];
				values.push( parseInt(ressis[0],10) );
				values.push( parseInt(ressis[1],10) );
				values.push( parseInt(ressis[2],10) );
				values.push( parseInt(cells[storageCell].textContent.replace(/\.|\s$|^\s/g, ""),10) );
				values.push( cells[tradersCell].textContent.split("/")[0].replace(/\.|\s$|^\s/g, "") );
				values.push( now.getTime() );
				values.push( href );
				values.push( villageCoord );
				values.push( villageName );
				lib.storage.setValue("villageData_"+lib.game_data.player.id+"_"+href,values.join());
			}
			
			/* append group links */
			if( !checkboxes.disableGroupLinks && !checkboxes.disableGroupLinksProduction ) {
				var td = rows[i].appendChild( document.createElement("td") );
				newShowGroups( td, href, false, true );
			}
			
			/* sum up production_table and save on sumUpRes */
			if( !checkboxes.disableSumRessis ) {
				sumUpRes.counter++;
				sumUpRes.sumPoints+=parseInt(cells[pointsCell].textContent.replace(/\./g, ""), 10);
				sumUpRes.res[0]+=parseInt(ressis[0],10); sumUpRes.res[1]+=parseInt(ressis[1],10); sumUpRes.res[2]+=parseInt(ressis[2],10);
				sumUpRes.storage+=parseInt(cells[storageCell].textContent.replace(/\.|\s$|^\s/g, ""),10);
				if(parseInt(farm[0].replace(/\.|\s$|^\s/g, ""),10)/parseInt(farm[1].replace(/\.|\s$|^\s/g, ""),10) >= parseInt(checkboxes.fullFarmsPercentage,10)/100) 
					sumUpRes.fullFarms++;
				else sumUpRes.notFullFarms++;	
			}		
		}
		
		/* build new row in production_table for sumUpRes */
		if( !checkboxes.disableSumRessis ) {
			var tr = document.getElementById("production_table").appendChild( document.createElement("tr") );
			tr.id = "dssb_productionTableSumUp";
			for( var i=0 ; i<7 ; i++ ) {
				var th = tr.appendChild( document.createElement("th") );
				th.noWrap = "true";
				switch(i) {
					case 1:	if( location.href.match(/edit_group/) ) {
								var checkAll = th.appendChild( document.createElement("input") );
								checkAll.type = "checkbox";
								checkAll.addEventListener("click", function() {
									this.check = document.getElementsByClassName("check");
									for( this.i=0 ; this.i<this.check.length ; this.i++ ) {
										if( this.checked ) {
											if( this.check[this.i].type == "checkbox" )
												this.check[this.i].checked = true;		
										} else {
											if( this.check[this.i].type == "checkbox" )
												this.check[this.i].checked = false;	
										}
									}
								}, false);
							}
							var span = th.appendChild( document.createElement("span") );
							span.id = "dssb_villageCounter";
							span.innerHTML = " "+gui[lib.lang].countVillages+" "+sumUpRes.counter;
							break;
					case 2:	th.innerHTML = gui[lib.lang].average+" "+( sumUpRes.counter > 0 ? lib.addCommas(Math.floor(sumUpRes.sumPoints/sumUpRes.counter)) : 0 );
							th.id = "dssb_pointsAverage";
							break;
					case 3:	var image = th.appendChild( document.createElement("img") );
							image.src = "/graphic/holz.png?1";
							th.innerHTML += "<span id='dssb_allResWood'>"+(!checkboxes.sumUpRessisAbsolute ? lib.addCommas(sumUpRes.res[0])+" </span>" : lib.formatNumber(sumUpRes.res[0]))+" </span>";
							var image = th.appendChild( document.createElement("img") );
							image.src = "/graphic/lehm.png?1";
							th.innerHTML += "<span id='dssb_allResClay'>"+(!checkboxes.sumUpRessisAbsolute ? lib.addCommas(sumUpRes.res[1])+" </span>" : lib.formatNumber(sumUpRes.res[1]))+" </span>";
							var image = th.appendChild( document.createElement("img") );
							image.src = "/graphic/eisen.png?1";
							th.innerHTML += "<span id='dssb_allResIron'>"+(!checkboxes.sumUpRessisAbsolute ? lib.addCommas(sumUpRes.res[2]) + "</span>" : lib.formatNumber(sumUpRes.res[2]))+"</span>";
							break;
					case 4: var image = th.appendChild( document.createElement("img") );
							image.src = "/graphic/buildings/storage.png?1";			
							th.innerHTML += "<span id='dssb_storageSpace_span'>"+ (!checkboxes.sumUpRessisAbsolute ? lib.addCommas( sumUpRes.storage ) : lib.formatNumber( sumUpRes.storage ) )+"</span>";
							break;
					case 5: th.colSpan = "4";							
							var createTextNode = th.appendChild( lib.createTextNode(gui[lib.lang].farmCell[0]+" "+sumUpRes.fullFarms.toString()+gui[lib.lang].farmCell[1]
							+sumUpRes.notFullFarms.toString()+gui[lib.lang].farmCell[2]+" "+checkboxes.fullFarmsPercentage+gui[lib.lang].farmCell[3]+" "));
							createTextNode.id = "dssb_textNode";
							var a = th.appendChild( document.createElement("a"));
							a.href = "javascript:;";
							var image = a.appendChild( document.createElement("img") );
							image.src = "/graphic/rename.png";	
							image.addEventListener("click", function() {
								var newPercentage = window.prompt(lib.createTextNode(gui[lib.lang].whatPercentage).textContent, checkboxes.fullFarmsPercentage);
								if(!newPercentage) return;
								checkboxes.fullFarmsPercentage = newPercentage;
								lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
								var rows = document.getElementById("production_table").getElementsByTagName("tr");
								sumUpRes.notFullFarms=0;
								sumUpRes.fullFarms=0;
								new getCells();
								for(var i = 1; i < rows.length; i++) {
									if(!rows[i].innerHTML.match(/id="label_\d+"/) || rows[i].style.display == "none" || rows[i].title=="dssb_filtered" )
										continue;
									var cells = rows[i].getElementsByTagName("td");
									var farm = cells[farmCell].textContent.split("/");		
									if(parseInt(farm[0].replace(/\.|\s$|^\s/g, ""),10)/parseInt(farm[1].replace(/\.|\s$|^\s/g, ""),10) >= checkboxes.fullFarmsPercentage/100) 
										sumUpRes.fullFarms++;
									else sumUpRes.notFullFarms++;	
								}				
								var createTextNode = lib.createTextNode(gui[lib.lang].farmCell[0]+" "+sumUpRes.fullFarms.toString()+gui[lib.lang].farmCell[1]
								+sumUpRes.notFullFarms.toString()+gui[lib.lang].farmCell[2]+" "+checkboxes.fullFarmsPercentage+gui[lib.lang].farmCell[3]+" ");
								document.getElementById("dssb_textNode").parentNode.replaceChild( createTextNode,document.getElementById("dssb_textNode") );
								createTextNode.id = "dssb_textNode";
							}, false);
							break;
						case 6: th.colSpan = "3";
								th.id = "dssb_combineUnitImgsSum";
								for(var j = 0; j < sumUpRes.units.length; j++) {
									var image = document.createElement("img");
									image.src = "http://" + location.host + "/graphic/unit/unit_" + sumUpRes.units[j].split(":")[0] + ".png";
									image.title = sumUpRes.units[j].split(":")[1]+" "+lib.createTextNode( gui[lib.lang].pieces ).textContent;
									th.appendChild(image);
								}
								break;
					}
					
			}		
		}
		
		/* checkboxes for sendResources on production_table */
		if( !checkboxes.disableSendResources ) {
			var readInVillages = function(node) {
				new getCells();
				this.rows = document.getElementById("production_table").getElementsByTagName("tr");	
				this.counter = 0;
				if( node.id != "dssb_saveOrderLink" )
					this.oldIds = lib.storage.getValue("DestinationVillages_player.id"+lib.game_data.player.id,"");
				else this.oldIds = lib.storage.getValue("SaveOrderVillages_player.id"+lib.game_data.player.id,"");
				if( this.oldIds == "" ) this.oldIds = [];
				else this.oldIds = this.oldIds.split(",");
				this.newIds = new Array();	
				for(this.i = 1; this.i < this.rows.length; this.i++) {
					this.cells = this.rows[this.i].getElementsByTagName("td");
					if(!this.rows[this.i].innerHTML.match(/id="label_\d+"/) || this.rows[this.i].style.display == "none" || this.rows[this.i].title=="dssb_filtered" ) {
						continue;
					}
					this.href = this.cells[villageCell].getElementsByTagName("a")[0].href.split("village=")[1].split("&")[0];
					this.newIds.push( this.href );
					this.counter++;
				}
				this.ids = lib.concat(this.oldIds,this.newIds );
				this.ids = new lib.unique(this.ids);
				if( node.id != "dssb_saveOrderLink" )
					lib.storage.setValue("DestinationVillages_player.id"+lib.game_data.player.id,this.ids.join());
				else lib.storage.setValue("SaveOrderVillages_player.id"+lib.game_data.player.id,this.ids.join());
				document.getElementById("dssb_readedVillageInfo").className = "selected";
				if( node.id != "dssb_saveOrderLink" )
					document.getElementById("dssb_readedVillageInfo").innerHTML = gui[lib.lang].readedVillages[0]+this.counter+(this.counter!=1 ? gui[lib.lang].readedVillages[1] : gui[lib.lang].readedVillages[2]);
				else document.getElementById("dssb_readedVillageInfo").innerHTML = gui[lib.lang].orderSaved+" ("+this.counter+" "+(this.counter!=1 ? gui[lib.lang].villages : gui[lib.lang].village)+")";
				
				if( node.id == "dssb_saveOrderLink" ) return;
				this.group = document.getElementById("paged_view_content").getElementsByTagName("strong")[0].textContent.match(/>([\w ]+)</)[1];
				if( node.id != "readInCheckbox" ) {
					this.timeStamp = {time: new lib.getServerTime().getTime(), group: this.group};
					this.last = lib.storage.getValue("LastReadIn_player.id"+lib.game_data.player.id,this.timeStamp);
					if( this.last.group.match( regExp[lib.lang].groupAllIsActive ) ) 
						return;
					this.last.group = this.last.group.split(",");
					this.last.group.push( this.group );
					this.last.group = lib.unique(this.last.group).join();
				} else {
					this.last = {time: 0, group: ""};
					this.last.group = this.group;	
				}	
				this.last.time = new lib.getServerTime().getTime();
				lib.storage.setValue("LastReadIn_player.id"+lib.game_data.player.id,this.last);
			}
			var FilterRows = function() {
				new getCells();
				this.minfarm = filter.farmFilter;
				this.filterPoints = filter.pointsFilter;
				this.rows = document.getElementById("production_table").getElementsByTagName("tr");	
				for(this.i = 1; this.i < this.rows.length ; this.i++) {
					if( this.i == this.rows.length-1 && !checkboxes.disableSumRessis ) break;
					this.cells = this.rows[this.i].getElementsByTagName("td");
					if( this.cells.length==0 ) continue;
					this.farms = this.cells[farmCell].textContent.split("/");
					this.farm = parseInt(this.farms[1].replace(/\.|\s$|^\s/g, ""),10)-parseInt(this.farms[0].replace(/\.|\s$|^\s/g, ""),10);
					this.points = parseInt(this.cells[pointsCell].textContent.replace(/\.|\s$|^\s/g, ""),10);
					this.ressis=this.cells[resCell].textContent.replace(/\.|\s$|^\s/g, "").split(" ");
					this.conditionFilter = false;
					if ( checkboxes.filterCheckbox ) {
						
						if( checkboxes.changePointsFilter && !checkboxes.changeFarmFilter
							&&!checkboxes.disablePointsFilter&&!checkboxes.disableFarmFilter)
							this.conditionFilter = this.farm > this.minfarm && this.points <= this.filterPoints;
						if( checkboxes.changePointsFilter && !checkboxes.changeFarmFilter 
							&&checkboxes.disablePointsFilter&&!checkboxes.disableFarmFilter)
							this.conditionFilter = this.farm > this.minfarm;
						if( checkboxes.changePointsFilter && !checkboxes.changeFarmFilter
							&&!checkboxes.disablePointsFilter&&checkboxes.disableFarmFilter)
							this.conditionFilter = this.points <= this.filterPoints;
							
						if( checkboxes.changePointsFilter && checkboxes.changeFarmFilter 
							&&!checkboxes.disablePointsFilter&&!checkboxes.disableFarmFilter )
							this.conditionFilter = this.farm <= this.minfarm && this.points <= this.filterPoints;
						if( checkboxes.changePointsFilter && checkboxes.changeFarmFilter 
							&&checkboxes.disablePointsFilter&&!checkboxes.disableFarmFilter )
							this.conditionFilter = this.farm <= this.minfarm;
						if( checkboxes.changePointsFilter && checkboxes.changeFarmFilter 
							&&!checkboxes.disablePointsFilter&&checkboxes.disableFarmFilter )
							this.conditionFilter = this.points <= this.filterPoints;
											
						if( !checkboxes.changePointsFilter
							&& !checkboxes.changeFarmFilter&&!checkboxes.disablePointsFilter&&!checkboxes.disableFarmFilter )
							this.conditionFilter = this.farm > this.minfarm && this.points > this.filterPoints;
						if( !checkboxes.changePointsFilter 
							&& !checkboxes.changeFarmFilter&&checkboxes.disablePointsFilter&&!checkboxes.disableFarmFilter )
							this.conditionFilter = this.farm > this.minfarm;
						if( !checkboxes.changePointsFilter
							&& !checkboxes.changeFarmFilter&&!checkboxes.disablePointsFilter&&checkboxes.disableFarmFilter )
							this.conditionFilter = this.points > this.filterPoints;

						if( !checkboxes.changePointsFilter && checkboxes.changeFarmFilter 
							&&!checkboxes.disablePointsFilter&&!checkboxes.disableFarmFilter )
							this.conditionFilter = this.farm <= this.minfarm && this.points > this.filterPoints;
						if( !checkboxes.changePointsFilter && checkboxes.changeFarmFilter 
							&&checkboxes.disablePointsFilter&&!checkboxes.disableFarmFilter )
							this.conditionFilter = this.farm <= this.minfarm;
						if( !checkboxes.changePointsFilter && checkboxes.changeFarmFilter 
							&&!checkboxes.disablePointsFilter&&checkboxes.disableFarmFilter )
							this.conditionFilter = this.points > this.filterPoints;

						if (this.conditionFilter) {
							if( !checkboxes.disableFilterLines && this.rows[this.i].style.display!="none" ) {
								this.rows[this.i].style.display="none";
								if( !checkboxes.disableSumRessis ) {
									sumUpRes.counter--;
									sumUpRes.sumPoints-=parseInt(this.cells[pointsCell].textContent.replace(/\./g, ""),10);
									sumUpRes.storage-=parseInt(this.cells[storageCell].textContent.replace(/\.|\s$|^\s/g, ""),10);
									sumUpRes.res[0]-=parseInt(this.ressis[0],10); sumUpRes.res[1]-=parseInt(this.ressis[1],10); sumUpRes.res[2]-=parseInt(this.ressis[2],10);
									if(parseInt(this.farms[0].replace(/\.|\s$|^\s/g, ""),10)/parseInt(this.farms[1].replace(/\.|\s$|^\s/g, ""),10) >= parseInt(checkboxes.fullFarmsPercentage,10)/100) 
										sumUpRes.fullFarms--;
									else sumUpRes.notFullFarms--;				
								}
								if( !checkboxes.disableCombineUnitImgs ) {
									if( this.cells[recruitCell].getElementsByTagName("img") ) {
										var images = this.cells[recruitCell].getElementsByTagName("img");		
										var units=[];
										for(var j = 0; j < images.length; j++) {
											var unit = images[j].src.split("unit_")[1].split(".png")[0];
											var len = parseInt(images[j].title.split(" - ")[0], 10);

											if( lib.contains( unit, sumUpRes.units ) ) {
												var indi = lib.contains(unit,sumUpRes.units).replace(/"/g, "");
												sumUpRes.units[indi] = unit + ":" + (parseInt(sumUpRes.units[indi].split(":")[1], 10)-len).toString();
											}
										}
									}
								}
							} else if( this.rows[this.i].title!="dssb_filtered" ) this.rows[this.i].title="dssb_filtered";
						} else if( this.rows[this.i].style.display=="none" ) {
							this.rows[this.i].style.display="";
							if( !checkboxes.disableSumRessis ) {
								sumUpRes.counter++;
								sumUpRes.sumPoints+=parseInt(this.cells[pointsCell].textContent.replace(/\./g, ""),10);
								sumUpRes.storage+=parseInt(this.cells[storageCell].textContent.replace(/\.|\s$|^\s/g, ""),10);
								sumUpRes.res[0]+=parseInt(this.ressis[0],10); sumUpRes.res[1]+=parseInt(this.ressis[1],10); sumUpRes.res[2]+=parseInt(this.ressis[2],10);
								if(parseInt(this.farms[0].replace(/\.|\s$|^\s/g, ""),10)/parseInt(this.farms[1].replace(/\.|\s$|^\s/g, ""),10) >= parseInt(checkboxes.fullFarmsPercentage,10)/100) 
									sumUpRes.fullFarms++;
								else sumUpRes.notFullFarms++;				
							}
							if( !checkboxes.disableCombineUnitImgs ) {
								if( this.cells[recruitCell].getElementsByTagName("img") ) {
									var images = this.cells[recruitCell].getElementsByTagName("img");		
									var units=[];
									for(var j = 0; j < images.length; j++) {
										var unit = images[j].src.split("unit_")[1].split(".png")[0];
										var len = parseInt(images[j].title.split(" - ")[0], 10);

										if( lib.contains( unit, sumUpRes.units ) ) {
											var indi = lib.contains(unit,sumUpRes.units).replace(/"/g, "");
											sumUpRes.units[indi] = unit + ":" + (parseInt(sumUpRes.units[indi].split(":")[1], 10)+len).toString();
										}
									}
								}
							}
						} else if( this.rows[this.i].title=="dssb_filtered" ) this.rows[this.i].title="";
					} else {
						if( !checkboxes.disableFilterLines ) {
							if( this.rows[this.i].style.display == "none" ) {
								this.rows[this.i].style.display = "";	
								if( !checkboxes.disableSumRessis ) {
									sumUpRes.counter++;
									sumUpRes.sumPoints+=parseInt(this.cells[pointsCell].textContent.replace(/\./g, ""),10);
									sumUpRes.storage+=parseInt(this.cells[storageCell].textContent.replace(/\.|\s$|^\s/g, ""),10);
									sumUpRes.res[0]+=parseInt(this.ressis[0],10); sumUpRes.res[1]+=parseInt(this.ressis[1],10); sumUpRes.res[2]+=parseInt(this.ressis[2],10);
									if(parseInt(this.farms[0].replace(/\.|\s$|^\s/g, ""),10)/parseInt(this.farms[1].replace(/\.|\s$|^\s/g, ""),10) >= parseInt(checkboxes.fullFarmsPercentage,10)/100) 
										sumUpRes.fullFarms++;
									else sumUpRes.notFullFarms++;			
								}
								if( !checkboxes.disableCombineUnitImgs ) {
									if( this.cells[recruitCell].getElementsByTagName("img") ) {
										var images = this.cells[recruitCell].getElementsByTagName("img");		
										var units=[];
										for(var j = 0; j < images.length; j++) {
											var unit = images[j].src.split("unit_")[1].split(".png")[0];
											var len = parseInt(images[j].title.split(" - ")[0], 10);
											if( lib.contains( unit, sumUpRes.units ) ) {
												var indi = lib.contains(unit,sumUpRes.units).replace(/"/g, "");
												sumUpRes.units[indi] = unit + ":" + (parseInt(sumUpRes.units[indi].split(":")[1], 10)+len).toString();
											}
										}
									}
								}
							}
						} else if( this.rows[this.i].title=="dssb_filtered" ) this.rows[this.i].title="";
					}
					if( checkboxes.readInCheckbox ) {
						if( this.rows[this.i].title != "dssb_filtered" && this.rows[this.i].style.display != "none" ) {
							ids.push( this.cells[villageCell].getElementsByTagName("a")[0].href.split("village=")[1].split("&")[0] );
							sendResourcesCounter++;				
						}		
					}			
				}
				/* sumUpRes updaten */
				if( !checkboxes.disableFilterLines ) {
					if( !checkboxes.disableSumRessis ) {
						document.getElementById("dssb_villageCounter").innerHTML = " "+gui[lib.lang].countVillages+" "+sumUpRes.counter;
						document.getElementById("dssb_storageSpace_span").innerHTML = "<span id='dssb_storageSpace_span'>"+ (!checkboxes.sumUpRessisAbsolute ? lib.addCommas( sumUpRes.storage ) : lib.formatNumber( sumUpRes.storage ) )+"</span>";
						document.getElementById("dssb_pointsAverage").innerHTML = gui[lib.lang].average+" "+( sumUpRes.counter > 0 ? lib.addCommas(Math.floor(sumUpRes.sumPoints/sumUpRes.counter)) : 0 );
						document.getElementById("dssb_allResWood").innerHTML = "<span id='dssb_allResWood'>"+(!checkboxes.sumUpRessisAbsolute ? lib.addCommas(sumUpRes.res[0])+" </span>" : lib.formatNumber(sumUpRes.res[0]))+" </span>";
						document.getElementById("dssb_allResClay").innerHTML = "<span id='dssb_allResClay'>"+(!checkboxes.sumUpRessisAbsolute ? lib.addCommas(sumUpRes.res[1])+" </span>" : lib.formatNumber(sumUpRes.res[1]))+" </span>";
						document.getElementById("dssb_allResIron").innerHTML = "<span id='dssb_allResIron'>"+(!checkboxes.sumUpRessisAbsolute ? lib.addCommas(sumUpRes.res[2]) + "</span>" : lib.formatNumber(sumUpRes.res[2]))+"</span>";
						this.createTextNode = lib.createTextNode(gui[lib.lang].farmCell[0]+" "+sumUpRes.fullFarms.toString()+gui[lib.lang].farmCell[1]
						+sumUpRes.notFullFarms.toString()+gui[lib.lang].farmCell[2]+" "+checkboxes.fullFarmsPercentage+gui[lib.lang].farmCell[3]+" ");
						document.getElementById("dssb_textNode").parentNode.replaceChild( this.createTextNode,document.getElementById("dssb_textNode") );
						this.createTextNode.id = "dssb_textNode"; document.getElementById("dssb_combineUnitImgsSum").innerHTML = "";
						for(var j = 0; j < sumUpRes.units.length; j++) {
							if( sumUpRes.units[j].split(":")[1] > 0 ) {
								var image = document.createElement("img");
								image.src = "http://" + location.host + "/graphic/unit/unit_" + sumUpRes.units[j].split(":")[0] + ".png";
								image.title = sumUpRes.units[j].split(":")[1]+" "+lib.createTextNode( gui[lib.lang].pieces ).textContent;
								document.getElementById("dssb_combineUnitImgsSum").appendChild(image);
							}
						}
					}
				}
			}
			
			var tables = document.getElementsByTagName('table');
			var table_cb = null;
			for (var i = 0; i < tables.length; i++) {
				if (tables[i].className == 'vis') {
					table_cb = tables[i+2];
					break;}
			}
			var newElement = table_cb.parentNode.insertBefore(document.createElement('tr'), table_cb);	
			var cell = newElement.appendChild(document.createElement('td'));		
			var pages = document.getElementById("paged_view_content").getElementsByTagName("tr")[0].innerHTML;
		    var activeGroup = document.getElementById("paged_view_content").getElementsByTagName("strong")[0].textContent;
		    var boolean = true; if( pages.match(regExp[lib.lang].allVillages) && regExp[lib.lang].groupAllIsActive.test(activeGroup) ) boolean = false;
	
			var filterCheckbox = cell.appendChild( document.createElement("input") );
			filterCheckbox.type = "checkbox";
			filterCheckbox.id = "filterCheckbox";
			filterCheckbox.checked = checkboxes.filterCheckbox;
			if( filterCheckbox.checked ) new FilterRows();
			filterCheckbox.addEventListener("change", function(){
				if( this.checked ) {
					checkboxes.filterCheckbox=true;	
					lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
				} else {checkboxes.filterCheckbox=false;		
					lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
				}
				new FilterRows();
				document.getElementById("dssb_readedVillageInfo").className = "selected";
				document.getElementById("dssb_readedVillageInfo").innerHTML = this.checked ?gui[lib.lang].filterActivated : gui[lib.lang].filterDisabled;
			}, false);
	
			var cell2 = newElement.appendChild( document.createElement('td') );
			var a = cell2.appendChild( document.createElement("a") );
			a.innerHTML = gui[lib.lang].filter;
			a.style.cursor = "pointer";
			a.addEventListener("click",function(e) {
				this.pos = lib.findPos( e.target );	
				
				this.popTable = document.createElement("table");
				this.h3 = this.popTable.appendChild( document.createElement("h3") );
				this.h3.innerHTML = gui[lib.lang].filterSettings;
								
				this.popTable2 = this.popTable.appendChild( document.createElement("table") );
				this.popTable2.noWrap = "true";
				var trTab = new Array(4);
				for( var i=0 ; i<trTab.length ; i++ ) trTab[i] = this.popTable2.appendChild(document.createElement("tr"));
				var tdTab = new Array(7);
				for( var i=0 ; i<tdTab.length ; i++ ) {
					tdTab[i] = trTab[Math.floor(i/2)].appendChild(document.createElement("td"));
					tdTab[i].noWrap = "true";
				}
			
				if( checkboxes.changePointsFilter )
					tdTab[0].innerHTML = gui[lib.lang].pointsFilterTo;
				else tdTab[0].innerHTML = gui[lib.lang].pointsFilterFrom;
				
				var pointsFilterInput = tdTab[1].appendChild( document.createElement("input") );
				pointsFilterInput.type = "text";
				pointsFilterInput.id = "pointsFilter";
				pointsFilterInput.value = filter.pointsFilter;
				pointsFilterInput.addEventListener("change",function() {
					filter.pointsFilter=this.value;
					lib.storage.setValue("Filter_player.id"+lib.game_data.player.id,filter);
					new FilterRows();
				}, false);
			
				var disablePointsFilter = tdTab[1].appendChild(document.createElement("input"));
				disablePointsFilter.type="checkbox";
				disablePointsFilter.id = "dssb_disablePointsFilter";
				disablePointsFilter.setAttribute("style", "margin-left:2em;");
  				disablePointsFilter.checked = checkboxes.disablePointsFilter;
				tdTab[1].appendChild(lib.createTextNode(gui[lib.lang].disableFilter));
				if( !checkboxes.disableSendResources ) {
					if( disablePointsFilter.checked ) trTab[0].style.color = "#A9A9A9";
					disablePointsFilter.addEventListener( "click", function(){
						if( this.checked ) {checkboxes.disablePointsFilter=true;
							this.parentNode.parentNode.style.color = "#A9A9A9";
						} else {checkboxes.disablePointsFilter=false;
							this.parentNode.parentNode.style.color = "#000000";
						} lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
						new FilterRows();
					}, false);  
				} else trTab[0].style.color = "#A9A9A9";

				var changePointsFilter = tdTab[1].appendChild(document.createElement("input"));
				changePointsFilter.type="checkbox";
				changePointsFilter.id = "dssb_changePointsFilter";
				changePointsFilter.setAttribute("style", "margin-left:2em;");
  				changePointsFilter.checked = checkboxes.changePointsFilter;
				changePointsFilter.addEventListener( "click", function(){ 
					if( this.checked ) {checkboxes.changePointsFilter=true;
						this.parentNode.parentNode.firstChild.innerHTML = gui[lib.lang].pointsFilterTo;
					} else {checkboxes.changePointsFilter=false;
						this.parentNode.parentNode.firstChild.innerHTML = gui[lib.lang].pointsFilterFrom;
					} lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
					new FilterRows();
				}, false);    

				tdTab[1].appendChild(lib.createTextNode(gui[lib.lang].changePointsFilter)); 
				
				if( checkboxes.changeFarmFilter )
					tdTab[2].innerHTML = gui[lib.lang].farmFilterTo;
				else tdTab[2].innerHTML = gui[lib.lang].farmFilterFrom;
				var farmFilterInput = tdTab[3].appendChild( document.createElement("input") );
				farmFilterInput.type = "text";
				farmFilterInput.id = "pointsFilter";
				farmFilterInput.value = filter.farmFilter;
				farmFilterInput.addEventListener("change",function() {
					filter.farmFilter=this.value;
					lib.storage.setValue("Filter_player.id"+lib.game_data.player.id,filter);
					new FilterRows();
				}, false);

				var disableFarmFilter = tdTab[3].appendChild(document.createElement("input"));
				disableFarmFilter.type="checkbox";
				disableFarmFilter.id = "dssb_disableFarmFilter";
				disableFarmFilter.setAttribute("style", "margin-left:2em;");
  				disableFarmFilter.checked = checkboxes.disableFarmFilter;
				tdTab[3].appendChild(lib.createTextNode(gui[lib.lang].disableFilter));
				if( !checkboxes.disableSendResources ) {
					if( disableFarmFilter.checked ) trTab[1].style.color = "#A9A9A9";
					disableFarmFilter.addEventListener( "click", function(){
						if( this.checked ) {checkboxes.disableFarmFilter=true;
							this.parentNode.parentNode.style.color = "#A9A9A9";
						} else {checkboxes.disableFarmFilter=false;
							this.parentNode.parentNode.style.color = "#000000";
						} lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
						new FilterRows();
					}, false); 
				} else trTab[1].style.color = "#A9A9A9";

				var changeFarmFilter = tdTab[3].appendChild(document.createElement("input"));
				changeFarmFilter.type="checkbox";
				changeFarmFilter.id = "dssb_changeFarmFilter";
				changeFarmFilter.setAttribute("style", "margin-left:2em;");
  				changeFarmFilter.checked = checkboxes.changeFarmFilter;
				changeFarmFilter.addEventListener( "change", function(){ 
					if( this.checked ) {
						this.parentNode.parentNode.firstChild.innerHTML = gui[lib.lang].farmFilterTo;
						checkboxes.changeFarmFilter = true;
					} else {
						this.parentNode.parentNode.firstChild.innerHTML = gui[lib.lang].farmFilterFrom;
						checkboxes.changeFarmFilter = false;
					} lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
					new FilterRows();
				}, false);    
				tdTab[3].appendChild(lib.createTextNode(gui[lib.lang].changeFarmFilter));
				
				trTab[2].innerHTML="&nbsp;";
				tdTab[6].colSpan="2"; tdTab[6].style.textAlign="center";
				tdTab[6].innerHTML = "<i>"+gui[lib.lang].popupDefinition1+"<br/>"+gui[lib.lang].popupDefinition2+"</i>";
				
				lib.popup("filterSettings", this.pos[0]+20, this.pos[1]+50, this.popTable, true, 750, 200 );
			}, false);
			var span = a.appendChild( document.createElement("span") );
			span.style.paddingRight = "10px";
			cell2.noWrap = "true";
			
			var cell3 = newElement.appendChild( document.createElement('td') );
			var readIn = cell3.appendChild( document.createElement("input") );
			readIn.type = "checkbox";
			readIn.id = "readInCheckbox";
			readIn.checked = checkboxes.readInCheckbox;
			if( readIn.checked ) new FilterRows();
			readIn.addEventListener("change", function(){
				if( document.getElementById("paged_view_content").getElementsByTagName("tr")[1].getElementsByTagName("b")[0] ) {
					if(  regExp[lib.lang].groupAllIsActive.test(document.getElementById("paged_view_content").getElementsByTagName("tr")[1].getElementsByTagName("b")[0].textContent) && regExp[lib.lang].groupAllIsActive.test(activeGroup) ) {
						if( this.checked ) this.readOut = new readInVillages(this);
						else this.checked = false;
					} else if( this.checked ) {
						checkboxes.readInCheckbox=true;
						lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
						window.location.href = lib.game_data.link_base_pure.replace("screen=","screen=overview_villages&mode=prod&group=0&page=-1");
					}
				} else {
					if( this.checked ) {checkboxes.readInCheckbox=true;
						lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);}
					else {checkboxes.readInCheckbox=false;
						lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);}
					window.location.href = lib.game_data.link_base_pure.replace("screen=","screen=overview_villages&mode=prod&group=0&page=-1");
				}
			}, false);

			var cell4 = newElement.appendChild( document.createElement('td') );
			cell4.innerHTML = "<b>"+gui[lib.lang].readIn+"</b><span style='white-space:pre'>&#9;</span>";
			cell4.noWrap = "true";
	
		    var cell5 = newElement.appendChild( document.createElement('td') );
		    var deleteButton = cell5.appendChild( document.createElement('input') );
	    	deleteButton.type = 'checkbox';
		    deleteButton.id = 'deleteCheckbox';
		    deleteButton.addEventListener("change", function(){
		        if( this.checked ) {
		            if( confirm( lib.createTextNode(gui[lib.lang].confirm_delete).textContent ) ) {
		                lib.storage.deleteValue("DestinationVillages_player.id"+lib.game_data.player.id);
						lib.storage.deleteValue("LastReadIn_player.id"+lib.game_data.player.id);
						document.getElementById("dssb_readedVillageInfo").className = "selected";
						document.getElementById("dssb_readedVillageInfo").innerHTML = "- "+gui[lib.lang].pooldataDeleted+" -";
		                alert( lib.createTextNode(gui[lib.lang].pooldataDeleted).textContent );
		                this.checked = false;
		            } else this.checked = false;
		        } else this.checked = false
		    }, false);
	      
	    	var cell6 = newElement.appendChild( document.createElement('td') );
	    	cell6.innerHTML = "<b>"+gui[lib.lang].deleted+"</b><span style='white-space:pre'>&#9;</span>";
	    	cell6.noWrap = "true";

   			if( boolean ) {
   			    var cell7 = newElement.appendChild( document.createElement('td') );  
		   	    var fractionalReadIn = cell7.appendChild( document.createElement('input') );
		   	    fractionalReadIn.type = 'checkbox';
				fractionalReadIn.id = 'fractionalReadInCheckbox';
				fractionalReadIn.addEventListener("change", function(){ 
					if( this.checked ) {
						this.readOut = new readInVillages(this);
					} else this.checked = false;
				}, false);
				var cell8 = newElement.appendChild( document.createElement('td') );
				cell8.noWrap = "true";
				cell8.innerHTML = "<b>"+gui[lib.lang].fractionalReadin+"</b><span style='white-space:pre'>&#9;</span>";
			}
			var cell9 = newElement.appendChild( document.createElement('td') );
			cell9.noWrap = "true";
			if( !checkboxes.disableSaveOrder ) {
				var a = cell9.appendChild(document.createElement("a"));
				a.href = "javascript:;";
				a.id = "dssb_saveOrderLink";
				a.innerHTML = "&raquo; " + gui[lib.lang].saveOrderLink;
				a.addEventListener("click", function() {
					lib.storage.deleteValue("SaveOrderVillages_player.id"+lib.game_data.player.id);
					this.readOut = new readInVillages(this);
					new saveOrderVillage();
				}, false );
			}
			cell9.appendChild( lib.createTextNode("<span style='white-space:pre'>&#9;</span>"));
			
			var cell10 = newElement.appendChild( document.createElement('td') );
			cell10.id = "dssb_readedVillageInfo";
			cell10.noWrap = "true";
			if( checkboxes.readInCheckbox ) {
				var group = activeGroup.replace(/[<> ]/g,"");
				var last = {time: 0, group: ""};
				last.group = group;
				last.time = new lib.getServerTime().getTime();
				lib.storage.setValue("LastReadIn_player.id"+lib.game_data.player.id,last);
				lib.storage.setValue("DestinationVillages_player.id"+lib.game_data.player.id,ids.join());
				cell10.className = "selected";
				cell10.innerHTML = gui[lib.lang].readedVillages[0]+sendResourcesCounter+(sendResourcesCounter!=1 ? gui[lib.lang].readedVillages[1] : gui[lib.lang].readedVillages[2]);
				checkboxes.readInCheckbox = false;	
				lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
			}
		}
	}
	if( !checkboxes.disableDSLoyalty && !checkboxes.disableShowLoyalty[2] ) new appendLoyaltyLine();
}	

/* groupLinks on combined_table */
if( document.getElementById("combined_table") && lib.pa ) {
	if( !checkboxes.disableGroupLinks && !checkboxes.disableGroupLinksCombined) {
		var rows = document.getElementById("combined_table").getElementsByTagName("tr");
		var head = rows[0].appendChild( document.createElement("th") );
		head.innerHTML = gui[lib.lang].showGroups.groupLinksHead;
		head.style.textAlign = "center";
		var th = rows[0].getElementsByTagName("th"), villageCell = 1;
		for( var i=0 ; i<th.length ; i++ ) {
			if( th[i].textContent.match(regExp[lib.lang].village) ) {villageCell=i;
			break;}
		}
	
		for( var i=1 ; i<rows.length ; i++ ) {
			var td = rows[i].appendChild( document.createElement("td") );
			var cells = rows[i].getElementsByTagName("td");
			var href = cells[villageCell].getElementsByTagName("a")[0].href.split("village=")[1].split("&")[0];
			newShowGroups( td, href, false, true );
		}
	}
	if( !checkboxes.disableDSLoyalty && !checkboxes.disableShowLoyalty[1] ) new appendLoyaltyLine();
}

var MainSettingsMenu = function() {
	if( !document.getElementById("buildings_table") && !location.href.match(/screen=main/) ) return;
	
	var buildings = lib.storage.getValue("building_info");
	this.popTable = document.createElement("table");
	this.popTable.style.textAlign = "center";
	this.popTable.style.noWrap="true";
	this.h5 = this.popTable.appendChild( document.createElement("h5") );
	this.h5.innerHTML = gui[lib.lang].buildingVars.addVariant;
	this.popTable2 = this.popTable.appendChild( document.createElement("table") );	
	this.popTable2.className="vis";
	this.popTable2.id = "dssbBV_variants";
	this.popTable2.width = "780px";
			
	row = this.popTable2.insertRow(0);
	var cell = row.appendChild(document.createElement("th"));
	cell.innerHTML = gui[lib.lang].buildingVars.nam;

	for( var key in buildings ) {
		cell = row.appendChild(document.createElement("th"));
		cell.innerHTML = '<img title="'+gui[lib.lang].buildingVars.buildings[key]+'" alt="'+gui[lib.lang].buildingVars.buildings[key]+'" src="graphic/buildings/'+key.replace("_f","")+'.png"/>';
		cell.style.textAlign = "center";
	}
	cell = row.appendChild(document.createElement("th"));
	cell.innerHTML = gui[lib.lang].buildingVars.points;
	cell = row.appendChild(document.createElement("th"));
	cell.innerHTML = gui[lib.lang].buildingVars.bhplace;
	cell = row.appendChild(document.createElement("th"));
	cell.innerHTML = "X";
	cell.style.color = "#FF0000";
			
	var removeRow = function(tr) {
		if( !isNaN(tr.id) ) {
			if( location.href.match(/screen=main/) ) {
				this.selected = document.getElementById("dssbBV_variant");
				for( var e=0 ; e<this.selected.length ; e++ ) {
					if( this.selected.options[e].value == tr.id ) this.selected.removeChild(this.selected.options[e]);
				}
			} else {
				this.tableTr = document.getElementById("buildings_table").getElementsByTagName("tr");
				for( var y=1 ; y<this.tableTr.length ; y++ ) {
					this.selected = this.tableTr[y].getElementsByTagName("td")[variantCell].getElementsByTagName("select")[0];
					for( var e=0 ; e<this.selected.length ; e++ ) {
						if( this.selected.options[e].value == tr.id ) {
							this.selected.removeChild(this.selected.options[e]);
						}
					}
				}
			}
			for( var x=0 ; x<variants.length ; x++ ) {
				if( variants[x].id == tr.id ) {variants.splice(x,1); break;}
			} lib.storage.setValue("dssbBV_variants_player.id"+lib.game_data.player.id,variants);
		}
		tr.parentNode.removeChild( tr );
	};
			
	var updateConfig = function(tr) {
		var basePoints = {main:10,barracks:16,stable:20,garage:24,church:10,church_f:10,snob:512,smith:19,place:0,statue:24,market:10,wood:6,stone:6,iron:6,farm:5,storage:6,hide:5,wall:8}
		var confPoints=0; var confFarm=0;
		this.ccell = tr.getElementsByTagName("td");
		for( var k=1; k<this.ccell.length-3 ; k++ ) {
			this.inp = this.ccell[k].getElementsByTagName("input")[0];
			if( parseInt(this.inp.value,10) < parseInt(buildings[this.inp.id].min_level,10) ) {
				alert(lib.createTextNode(gui[lib.lang].buildingVars.notReached[0]).textContent+" \""+this.inp.id+"\" "+gui[lib.lang].buildingVars.notReached[1]+" "+buildings[this.inp.id].min_level+" "+gui[lib.lang].buildingVars.notReached[2]);
				this.inp.value = buildings[this.inp.id].min_level;
			}
			if( parseInt(this.inp.value,10) < 1 ) continue;
			confPoints+=Math.round(parseFloat(basePoints[this.inp.id])*Math.pow(parseFloat(buildings[this.inp.id].build_time_factor),parseInt(this.inp.value,10)-1));						
			confFarm+=Math.round(parseFloat(buildings[this.inp.id].pop)*Math.pow(parseFloat(buildings[this.inp.id].pop_factor),parseInt(this.inp.value,10)-1));
		}
		this.ccell[this.ccell.length-3].innerHTML = confPoints;
		this.ccell[this.ccell.length-2].innerHTML = confFarm;
	};
		
	var editVariant = function(tr,boolean) {
		if( boolean ) {
			var counter = 4;
			for( var k in buildings ) counter++;	
			this.td = new Array(counter);
			for( var i=0 ; i<this.td.length ; i++ ) this.td[i] = tr.appendChild( document.createElement("td") );
		} else {
			for( var x=0 ; x<variants.length ; x++ ) {
				if( variants[x].id == tr.id ) {variants.splice(x,1); break;}
			} this.td = tr.getElementsByTagName("td");		
		}
		if( !boolean ) this.oldName = this.td[0].textContent;
		this.td[0].innerHTML="";this.td[0].noWrap="true";
		this.input = this.td[0].appendChild( document.createElement("input") );
		this.input.style.textAlign="center";
		this.input.size=6;
		if( !boolean ) this.input.value = this.oldName;
		this.button = this.td[0].appendChild( document.createElement("input") );
		this.button.type="button";
		this.button.value=gui[lib.lang].buildingVars.ok;
		this.button.addEventListener("click",function() {
			new updateConfig(this.parentNode.parentNode);
			this.inputs = this.parentNode.parentNode.getElementsByTagName("input");
			this.inpTd = this.parentNode.parentNode.getElementsByTagName("td");
			this.val = this.parentNode.getElementsByTagName("input")[0].value;
			var id=1;
			if( this.val.length == 0 ) { lib.alert(gui[lib.lang].buildingVars.pleaseSetName); return;}
			for( var f=0 ; f<variants.length ; f++ ) {
				if( variants[f].name == this.val ) { alert(lib.createTextNode(gui[lib.lang].buildingVars.choOthName).textContent); return;}
				if( variants[f].id >= id ) id = variants[f].id+1;
			}
			if( !boolean ) id = this.parentNode.parentNode.id;
			this.confBuildings = {};
			for( var f=2 ; f<this.inputs.length ; f++ ) {
				this.valu=parseInt(this.inputs[f].value,10);
				if( isNaN( this.valu ) ) this.valu=0;
				this.confBuildings[this.inputs[f].id] = this.valu;
				this.inputs[f].parentNode.innerHTML = this.valu;
				f--;
			}
			this.points = this.inpTd[this.inpTd.length-3].textContent;
			this.farm = this.inpTd[this.inpTd.length-2].textContent;
			variants.push({id:id, name:this.val, buildings: this.confBuildings, points:this.points, farm:this.farm});
			lib.storage.setValue("dssbBV_variants_player.id"+lib.game_data.player.id,variants);
			if( location.href.match(/screen=main/) ) document.getElementById("dssbBV_variant").options.add( new Option(this.val,id,false,false) );
			else {
				this.tableTr = document.getElementById("buildings_table").getElementsByTagName("tr");
				for( var y=1 ; y<this.tableTr.length ; y++ ) this.selected = this.tableTr[y].getElementsByTagName("td")[variantCell].getElementsByTagName("select")[0].options.add( new Option(this.val,id,false,false) );
			}
				
			this.parentNode.style.textAlign="left";
			var edited = this.parentNode;
			this.parentNode.innerHTML = "";	
			var radio = edited.appendChild( document.createElement("input") );
			radio.type="radio";
			radio.name = "default";
			radio.addEventListener("click",function() {checkboxes.buildVarsDefault=this.parentNode.parentNode.id;lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);},false);
			edited.appendChild( lib.createTextNode(this.val+" ") );
			this.img = edited.appendChild( document.createElement("img") );
			this.img.src = "graphic/rename.png";
			this.img.style.cursor="pointer";
			this.img.addEventListener("click",function() {new editVariant(this.parentNode.parentNode,false);}, false);
			edited.parentNode.id = id;
		},false);
		var e=1;
		for( var bui in buildings ) {
			if( !boolean ) this.old=this.td[e].textContent;
			this.td[e].innerHTML=""; this.td[e].noWrap="true";
			this.input = this.td[e].appendChild( document.createElement("input") );
			this.input.style.textAlign="center";
			this.input.size=1;
			this.input.maxLength=2;
			this.input.value = boolean?buildings[bui].max_level:this.old;
			this.input.id=bui;
			this.input.addEventListener("focus",function(){this.select()},false);
			this.input.addEventListener("change",function(){ new updateConfig(this.parentNode.parentNode);},false);
			e++;
		}
		this.td[this.td.length-1].innerHTML = "<b>X</b>";
		this.td[this.td.length-1].style.color = "#FF0000";
		this.td[this.td.length-1].style.cursor = "pointer";
		this.td[this.td.length-1].addEventListener("click",function() {new removeRow(this.parentNode);}, false);
		updateConfig(tr);				
	};
		
	for( var i=0; i<variants.length ; i++ ) {
		row = this.popTable2.appendChild( document.createElement("tr") );
		row.id = variants[i].id;
		cell = row.appendChild( document.createElement("td") );
		var radio = cell.appendChild( document.createElement("input") );
		radio.type="radio";
		radio.name = "default";
		radio.checked = row.id==checkboxes.buildVarsDefault?true:false;
		radio.addEventListener("click",function() {checkboxes.buildVarsDefault=this.parentNode.parentNode.id;lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);},false);
		cell.style.textAlign="left";
		cell.appendChild( lib.createTextNode(variants[i].name+" ") );
		this.img = cell.appendChild( document.createElement("img") );
		this.img.src = "graphic/rename.png";
		this.img.style.cursor="pointer";
		this.img.addEventListener("click",function() {new editVariant(this.parentNode.parentNode,false);}, false);
			
		for( var key in buildings ) {
			cell = row.appendChild( document.createElement("td") );
			cell.innerHTML = variants[i].buildings[key];
			cell.style.textAlign = "center";
		}
		cell = row.appendChild( document.createElement("td") );
		cell.innerHTML = variants[i].points;
		cell = row.appendChild( document.createElement("td") );
		cell.innerHTML = variants[i].farm;
		cell = row.appendChild( document.createElement("td") );
		cell.innerHTML = "<b>X</b>";
		cell.style.color = "#FF0000";
		cell.style.cursor = "pointer";
		cell.addEventListener("click",function() {new removeRow(this.parentNode);}, false);
	};
				
	this.a = this.popTable.appendChild( document.createElement("a") );
	this.a.href = "javascript:;";
	this.a.innerHTML = gui[lib.lang].buildingVars.addBuild;
	this.a.addEventListener("click",function() {
		var newTr = document.getElementById("dssbBV_variants").appendChild( document.createElement("tr") );
		new editVariant(newTr,true);
	}, false);
	lib.popup("exportPopup", screen.width/2-350, screen.height/2, this.popTable, true, 800, 220 );
};

if( document.getElementById("buildings_table") ) {
	if( (!checkboxes.disableGroupLinks && !checkboxes.disableGroupLinksBuildings) || !checkboxes.disableBuildVars) {
		var rows = document.getElementById("buildings_table").getElementsByTagName("tr");
		var rowsTh = rows[0].getElementsByTagName("th");
		
		if( !checkboxes.disableBuildVars ) {
			var headBuildVars = rows[0].insertBefore( document.createElement("th"), rowsTh[rowsTh.length-1] );
			var span = headBuildVars.appendChild( document.createElement("span") );
			span.innerHTML = gui[lib.lang].buildingsOverview.variant+" ";
			headBuildVars.style.textAlign = "center";
			var img = headBuildVars.appendChild( document.createElement("img") );
			img.src = "graphic/rename.png";
			img.style.cursor = "pointer";
			img.addEventListener("click", function() {
				new MainSettingsMenu();
			}, false);
		}
		
		if( !checkboxes.disableGroupLinks && !checkboxes.disableGroupLinksBuildings ) {
			var head = rows[0].insertBefore( document.createElement("th"), rowsTh[rowsTh.length-1] );
			head.innerHTML = gui[lib.lang].showGroups.groupLinksHead;
			head.style.textAlign = "center";
		}
		
		var th = rows[0].getElementsByTagName("th"), villageCell = 2, variantCell = 22;
		for( var i=0 ; i<th.length ; i++ ) {
			if( th[i].textContent.match(regExp[lib.lang].village) ) villageCell=i;
			if( th[i].textContent.indexOf(gui[lib.lang].buildingsOverview.variant) > -1 ) variantCell = i;
		}
		
		if( !checkboxes.disableBuildVars ) {
			var variants = lib.storage.getValue("dssbBV_variants_player.id"+lib.game_data.player.id,[]);		
			var table = document.getElementById("get_all_possible_build").parentNode.parentNode.parentNode.parentNode;	
			var BuildingRow = function( affectedRow, value, targetObj  ) {
				var affectedCells = affectedRow.getElementsByTagName("td");		
				if( variants.length < 1 ) return;
				var varIndex = parseInt(affectedCells[variantCell].getElementsByTagName("select")[0].selectedIndex,10)-1;
				if( varIndex < 0 ) {
					for( var x = 0 ; x<affectedCells.length ; x++ ) affectedCells[x].style.removeProperty("background-color");
					return;
				}
				var affectedVariant = variants[varIndex].buildings;
				var queue = {};
			
				var lastTd = affectedCells[affectedCells.length-1];
				if( lastTd.getElementsByTagName("ul").length > 0 ) {
					var ul = lastTd.getElementsByTagName("ul")[0];
					var li = ul.getElementsByTagName("li");
				
					if( li.length > 4 ) {
						ul.parentNode.style.backgroundColor = "#feff50";
					} else ul.parentNode.style.removeProperty("background-color");
				
					if( value == 0 ) {
						for( var j=0 ; j<li.length ; j++ ) {
							var statusLight = li[j].getElementsByClassName("order-status-light")[0];
							var buildingName = li[j].getElementsByClassName("queue_icon")[0].firstChild.src.match(/graphic\/buildings\/([^\.]+)\.png/)[1];					
							if( queue[buildingName] == undefined ) queue[buildingName] = 0;
					
							if(statusLight.style.backgroundColor == "green" || statusLight.style.backgroundColor == "#008000") queue[buildingName]++;
							else if(statusLight.style.backgroundColor == "red" || statusLight.style.backgroundColor == "#ff0000") queue[buildingName]--;
						}
					} else if( value < 3 ) {
						var buildingName = targetObj.getElementsByClassName("queue_icon")[0].firstChild.src.match(/graphic\/buildings\/([^\.]+)\.png/)[1];
						var statusLight = targetObj.getElementsByClassName("order-status-light")[0];
						if( queue[buildingName] == undefined ) queue[buildingName] = 0;
					
						if(statusLight.style.backgroundColor == "green" || statusLight.style.backgroundColor == "#008000") {if( value != 2 ) queue[buildingName]++; else queue[buildingName]--;
						} else if(statusLight.style.backgroundColor == "red" || statusLight.style.backgroundColor == "#ff0000") {if( value != 2 ) queue[buildingName]--; else queue[buildingName]++;}
					}
				}
			
				var nameOfClass;
				for( var x = 0 ; x<affectedCells.length ; x++ ) {
					nameOfClass = affectedCells[x].className;
					if( nameOfClass.indexOf("upgrade_building b") > -1 ) {
						var building = nameOfClass.split("upgrade_building b_")[1];
						var building_level = parseInt( affectedCells[x].textContent, 10 );
					
						if( queue[building] != undefined ) {
							building_level += queue[building];
							if( affectedCells[x].getElementsByTagName("a").length > 0 )
								affectedCells[x].getElementsByTagName("a")[0].innerHTML = building_level;
							else affectedCells[x].innerHTML = building_level;
						}
					
						if( affectedVariant[building] == building_level ) {
							affectedCells[x].style.backgroundColor = "#D5D5D5";
							if( affectedCells[x].getElementsByTagName("a").length > 0 )
								affectedCells[x].innerHTML = affectedCells[x].getElementsByTagName("a")[0].textContent;
						} else {
							var extend = "d_0";
							if( affectedVariant[building] > building_level ) {
								affectedCells[x].style.backgroundColor = "lightGreen";
								extend = "d_0";
							} else {
								affectedCells[x].style.backgroundColor = "#ff6347";
								extend = "d_1";
							}
							if( affectedCells[x].getElementsByTagName("a").length > 0 ) {
								if( affectedCells[x].getElementsByTagName("a")[0].className.indexOf(extend) < 0 )
									affectedCells[x].innerHTML = affectedCells[x].getElementsByTagName("a")[0].textContent;
							}
						}
					}
				}
			};
	
			table.addEventListener("DOMNodeInserted", function(event) {
				if(event.target.tagName == "LI") {	
					new BuildingRow( event.target.parentNode.parentNode.parentNode, 1, event.target );
				}	
				return false;
			}, false);
			table.addEventListener("DOMNodeRemoved", function(event) {
				if(event.target.tagName == "LI") {	
					new BuildingRow( event.target.parentNode.parentNode.parentNode, 2, event.target );
				}		
			}, false);
		
			var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
			if( MutationObserver != undefined ) {
				var observer = new MutationObserver(function (mutations) {
					mutations.forEach( function(mutation) {
						var child = mutation.target.childNodes[1];
						if(child && child.nodeType != 3 && (child.className == "hammer-icon" || child.className == "destroy-icon" )) {
							var affectedRow = mutation.target.parentNode;			
							new BuildingRow( affectedRow, 3 );
						}
					} );
				});
				observer.observe(table, { attributes: true, subtree: true });
			} else {
				table.addEventListener("DOMAttrModified", function( event ) {
					var child = event.target.childNodes[1];
					if(child && child.nodeType != 3 && (child.className == "hammer-icon" || child.className == "destroy-icon" )) {
						var affectedRow = event.target.parentNode;			
						new BuildingRow( affectedRow, 3 );
					}
				}, false);
			}
		}
		
		for( var i=1 ; i<rows.length ; i++ ) {
			var cells = rows[i].getElementsByTagName("td");
			var href = cells[villageCell].getElementsByTagName("a")[0].href.split("village=")[1].split("&")[0];
			if( !checkboxes.disableGroupLinks && !checkboxes.disableGroupLinksBuildings && !checkboxes.disableBuildVars ) var allTd = cells[th.length-3];
			else var allTd = cells[th.length-2];
			
			if( !checkboxes.disableBuildVars ) {
				allTd.style.minWidth = "120px";
				var tdVar = rows[i].insertBefore( document.createElement("td"), allTd );
				tdVar.style.whiteSpace = "nowrap";
			
				var id = lib.storage.getValue("BuildingVars_village"+href,false);
				if( id==false ) id=checkboxes.buildVarsDefault!=false?checkboxes.buildVarsDefault:0;
			
				var input = tdVar.appendChild( document.createElement("select") );
				input.id = "dssbBV_variant_"+href;
				input.options.add( new Option(lib.createTextNode(gui[lib.lang].buildingVars.selectVariantOption).textContent,0,true,id==0) );
				for( var j = 0; j < variants.length; j++ ) input.options.add( new Option(variants[j].name,variants[j].id,false,id==variants[j].id) );
				input.addEventListener("change", function() {
					var thisTr = this.parentNode.parentNode;
					var thisTd = thisTr.getElementsByTagName("td");
					var thisId = thisTd[villageCell].getElementsByTagName("a")[0].href.split("village=")[1].split("&")[0];
					lib.storage.setValue("BuildingVars_village"+thisId,this.options[this.selectedIndex].value);

					if( thisTd[0].className.indexOf("translucent") < 0 ) lib.win.BuildingOverview.toggle_upgrade_buildings(thisId);
					else if( thisTd[1].className.indexOf("translucent") < 0 ) lib.win.BuildingOverview.toggle_upgrade_buildings(thisId, 1);
					else new BuildingRow( thisTr, 3 );
				}, false );
			}
			
			if( !checkboxes.disableGroupLinks && !checkboxes.disableGroupLinksBuildings) {
				var td = rows[i].insertBefore( document.createElement("td"), allTd );
				newShowGroups( td, href, false, true );
			}
			
			if( !checkboxes.disableBuildVars ) new BuildingRow( rows[i], 0 );
		}
	}
	if(!checkboxes.disableDSLoyalty && !checkboxes.disableShowLoyalty[3]) new appendLoyaltyLine();
}

if(location.href.match(/screen=main/) ) {
	/* show loyalty on screen=main: */
	if( !checkboxes.disableDSLoyalty && !checkboxes.disableShowLoyalty[0] ) {
		var loyalty = updateLoyalty(lib.game_data.village.id);
		document.getElementsByTagName("h2")[0].innerHTML += "<br/><img src='" + imgURL + "' title='"+gui[lib.lang].dsLoyalty.loyalty+"'> <small>"+gui[lib.lang].dsLoyalty.loyalty+": " + loyalty + "</small>"; 
	}

	/* show groupLinks on screen=main: */
	if( !checkboxes.disableGroupLinksMain ) {
		var tr = document.getElementsByTagName("h2")[0].parentNode.insertBefore(document.createElement("tr"),document.getElementsByTagName("h2")[0].nextSibling);
		newShowGroups( tr, lib.game_data.village.id, true, false );
	}
	
	/* show buildingVars on screen=main */
	if( !checkboxes.disableBuildVars ) {
		var buildings = lib.storage.getValue("building_info");
		var variants = lib.storage.getValue("dssbBV_variants_player.id"+lib.game_data.player.id,[]);
		var actualBuildings = {};
		var totalDestroys=0, totalBuildings=0;
		var tableSpan = document.createElement("span");
		var table = document.getElementById("building_wrapper").nodeName=="TABLE"?document.getElementById("building_wrapper"):document.getElementById("buildings");
		if( document.getElementById("hide_completed").checked && lib.pa ) lib.fireEvent(document.getElementById("hide_completed"),"click"); 
		
		var id = lib.storage.getValue("BuildingVars_village"+lib.game_data.village.id,false);
		if( id==false ) id=checkboxes.buildVarsDefault!=false?checkboxes.buildVarsDefault:0;
		
		var updateMain = function(id) {
			var formatDuration=function(secs) {
				var h = Math.floor(secs/3600);
				var m = Math.floor(secs%3600/60);
				var s = Math.floor(secs%60);
				return h + ":" + (m<10?"0":"") + m + ":" + (s<10?"0":"") + s;
			}
			var formatTime = function(secs) {
				var serverTime = lib.getServerTime();
				var serverTimems = serverTime.getTime();
				var showTime = new Date(serverTimems + secs*1000);
				var tomorrow = new Date(serverTimems + 86400000);
				var v, date;
				if( showTime.getDate() == serverTime.getDate() && showTime.getMonth() == serverTime.getMonth() ) date = gui[lib.lang].buildingVars.today;
				else if( showTime.getDate() == tomorrow.getDate() && showTime.getMonth() == tomorrow.getMonth() ) date = gui[lib.lang].buildingVars.tomorrow;
				else {
					v = showTime.getDate()+1;
					date = " "+gui[lib.lang].buildingVars.on+" " + (v < 10 ? "0"+v : v);
					v = showTime.getMonth();
					date += "." + (v < 10 ? "0"+v : v);
					date += ".";
				} 
				v = showTime.getHours();
				var time = " "+gui[lib.lang].buildingVars.at+" " + (v < 10 ? "0"+v : v);
				v = showTime.getMinutes();
				time += ":" + (v < 10 ? "0"+v : v);
				return date + time + " "+gui[lib.lang].buildingVars.clock;  
			}
			if( id != 0 ) {
				var buildDestroy = document.getElementsByClassName("vis modemenu")[0].innerHTML.match(/mode=destroy/)?true:false;
				document.getElementsByClassName("vis modemenu")[0].style.display="none";
				this.tab = document.getElementById("building_wrapper").nodeName=="TABLE"?document.getElementById("building_wrapper"):document.getElementById("buildings");
				this.config = {};
				for( var e=0 ; e<variants.length ; e++ ) {
					if( id == variants[e].id ) {this.config = variants[e].buildings;break;}
				}
				this.row = this.tab.getElementsByTagName("tr");
				while( this.row[0].cells.length > 1 ) this.row[0].deleteCell(1);
				for( var e=0 ; e<3 ; e++ ) {
					this.th = this.row[0].appendChild( document.createElement("th") );
					if( e==0 ) {this.th.innerHTML = gui[lib.lang].buildingVars.needs; this.th.colSpan = 4;this.th.noWrap="true";}
					else if( e==1 ) {
						this.th.innerHTML = gui[lib.lang].buildingVars.buildtime+" ";
						this.th.width="100";
						this.img = this.th.appendChild( document.createElement("img") );
						this.img.src="/graphic/questionmark.png?1";
						this.img.className = "tooltip";
						this.img.title="hh:mm:ss";
						this.img.height = "13";
						this.img.width = "13";
					} else {this.th.innerHTML = gui[lib.lang].buildingVars.build; this.th.style.width="200px";this.th.noWrap="true";}
				}
				for( var e=1 ; e<this.row.length ; e++ ) {
					this.bui = this.row[e].getElementsByTagName("a")[0].href.match(/screen=[a-z_]+/g)[0].split("screen=")[1];
					if( this.row[e].className == "inactive togglerow" ) {
						if( checkboxes.bvShowAll ) this.row[e].style.removeProperty("display");
						else this.row[e].style.display="none";
						continue;
					};
					this.row[e].style.removeProperty("display");
					if( parseInt(actualBuildings[this.bui],10)==parseInt(this.config[this.bui],10) ) {
						if( checkboxes.bvFadeReady ) {
							this.row[e].style.display = "none";
						} else {
							while( this.row[e].cells.length > 2 ) this.row[e].deleteCell(2);
							this.row[e].cells[1].innerHTML = gui[lib.lang].buildingVars.buildingCompleted;
							this.row[e].cells[1].style.color = "";
							this.row[e].cells[1].className = "inactive";
							this.row[e].cells[1].style.textAlign = "center";
							this.row[e].cells[1].colSpan = 6;
						}
					} else if( parseInt(actualBuildings[this.bui],10)>parseInt(this.config[this.bui],10) ) {
						while( this.row[e].cells.length > 2 ) this.row[e].deleteCell(2);
						this.row[e].cells[1].innerHTML="";
						this.row[e].cells[1].colSpan = 6;
						this.row[e].cells[1].style.textAlign = "center";
						this.row[e].cells[1].style.color = "";
						this.row[e].cells[1].className = "";
						if( buildDestroy ) {
							if( totalDestroys < 5 ) {
								this.row[e].cells[1].style.color="red";
								this.row[e].cells[1].colSpan = 4;
								this.row[e].cells[1].style.textAlign = "center";
								this.row[e].cells[1].innerHTML = gui[lib.lang].buildingVars.buildingOverbuild;
								this.cell=this.row[e].appendChild( document.createElement("td") );
								var bigger = Math.round( buildings[this.bui].build_time * Math.pow( buildings[this.bui].build_time_factor,parseInt(actualBuildings[this.bui],10)-1) * Math.pow(1.05,-1*parseInt(lib.game_data.village.buildings.main,10)));
								this.cell.innerHTML = formatDuration(bigger);
								this.cell=this.row[e].appendChild( document.createElement("td") );
								this.cell.style.textAlign = "center";
								var a = this.cell.appendChild(document.createElement("a"));
								a.setAttribute("onclick", "javascript: BuildingMain.mode = 1; return BuildingMain.destroy('"+this.bui+"');");
								a.innerHTML = gui[lib.lang].buildingVars.destroyLevel;
								a.style.cursor="pointer";
							} else {
								this.row[e].cells[1].className="inactive";
								this.row[e].cells[1].innerHTML = gui[lib.lang].buildingVars.destroyQueueFull;
							}
						} else {
							this.row[e].cells[1].className="inactive";
							this.row[e].cells[1].innerHTML = gui[lib.lang].buildingVars.noDestroy;
						} 
					} else if( parseInt(actualBuildings[this.bui],10)<parseInt(this.config[this.bui],10) ) {
						while( this.row[e].cells.length > 1 ) this.row[e].deleteCell(1);
						var exis=0, popFree=parseInt(document.getElementById("pop_max").innerHTML,10)-parseInt(document.getElementById("pop_current").innerHTML,10), popOk=true;
						var storageOk=true; var queueOk=true;
						for( var x=0 ; x<6 ; x++ ) {
							this.row[e].appendChild( document.createElement("td") );
							this.row[e].cells[x+1].style.whiteSpace = "nowrap";
							if( x<4 ) {
								var arr = ["icon header wood","icon header stone","icon header iron","icon header population"];
								var fac = ["wood","stone","iron","pop"]
								var bigger = Math.round(parseFloat(buildings[this.bui][fac[x]])*Math.pow(parseFloat(buildings[this.bui][fac[x]+"_factor"]),parseInt(actualBuildings[this.bui],10)));
								if( fac[x] == "pop" && parseInt(actualBuildings[this.bui],10)-1 >= 0 ) {
									var smaller = Math.round(parseFloat(buildings[this.bui][fac[x]])*Math.pow(parseFloat(buildings[this.bui][fac[x]+"_factor"]),(parseInt(actualBuildings[this.bui],10)-1)));
									bigger=bigger-smaller;
								}
								if( bigger > 0 ) {
									var span = this.row[e].cells[x+1].appendChild( document.createElement("span") );
									span.className = arr[x];
									if( fac[x] == "pop" ) {
										if( popFree - bigger < 0 ) popOk=false;
										this.row[e].cells[x+1].innerHTML+=bigger+" ";
									} else {
										var miss = parseInt(document.getElementById(fac[x]).innerHTML,10);
										miss = bigger-miss;
										if( totalBuildings >= 5 ) {
											var more = Math.round(Math.pow(1.25,parseInt(totalBuildings,10)-4)*bigger)-bigger;
											if( miss <= 0 && miss+more > 0 ) queueOk=false;
											miss = miss+more;
											bigger=bigger+more;
										}
										this.row[e].cells[x+1].innerHTML+=bigger+" ";
										var span = this.row[e].cells[x+1].appendChild( document.createElement("span") );
										if( miss <= 0 ) {span.className="inactive";span.innerHTML="(0)";} 
										else {
											span.style.color="red";
											span.innerHTML="("+miss+")";
											var bigger = Math.round(miss*3600/parseInt(document.getElementById(fac[x]).title,10));
											if( bigger > exis ) exis = bigger;
										}
									}
								}
							} else if( x==4 ) {
								var bigger = Math.round( buildings[this.bui].build_time * Math.pow( buildings[this.bui].build_time_factor,parseInt(actualBuildings[this.bui],10)) * Math.pow(1.05,-1*parseInt(lib.game_data.village.buildings.main,10)));
								this.row[e].cells[x+1].innerHTML = formatDuration(bigger);
							} else if( x==5 ) {
								if( popOk && storageOk ) {
									if( exis > 0 ) {
										var span = this.row[e].cells[x+1].appendChild( document.createElement("span") );
										if( !queueOk ) {		
											span.className = "inactive";
											span.innerHTML = gui[lib.lang].buildingVars.toLessRes;
										} else {
											span.innerHTML = gui[lib.lang].buildingVars.resAvailable+" "+formatTime(exis);
											span.style.color = "#c5a76b";
										}
									} else {	
										var a = this.row[e].cells[x+1].appendChild(document.createElement("a"));
										a.setAttribute("onclick", "javascript: BuildingMain.mode = 0; return BuildingMain.build('"+this.bui+"');");
										a.innerHTML = gui[lib.lang].buildingVars.buildingLevelUp+" "+(parseInt(actualBuildings[this.bui],10)+1);
										a.style.cursor="pointer";
									}
								} else {
									var span = this.row[e].cells[x+1].appendChild( document.createElement("span") );
									this.row[e].cells[x+1].style.textAlign="center";
									span.className = "inactive";
									if( !storageOk ) span.innerHTML = gui[lib.lang].buildingVars.storageToSmall;
									if( !popOk ) span.innerHTML = gui[lib.lang].buildingVars.farmToSmall;
								}								
							}
						}
					}
				}
			} else lib.storage.deleteValue("BuildingVars_village"+lib.game_data.village.id);
		};
		
		var Main = function(id) {
			totalDestroys=0; totalBuildings=0;
			var mainBuild = table.getElementsByTagName("tr");
			for( var j=1 ; j<mainBuild.length ; j++ ) {
				var buildName = mainBuild[j].getElementsByTagName("a")[0].href.match(/screen=([a-z_]+)/g)[0].split("=")[1];
				var level = mainBuild[j].getElementsByTagName("td")[0].textContent;//.match(/[\d]+/)[0];
				if( level.match(/[\d]+/) ) level = parseInt(level.match(/[\d]+/)[0],10); else level=0;
				actualBuildings[buildName] = level;					
			}
			var queue = document.getElementById("build_queue");
			if( queue ) {
				var a = queue.rows[0].cells[0].appendChild(document.createElement("a"));
				a.href = "javascript:;";
				a.addEventListener("click", function() { document.getElementById("dssbBV_build_queue").style.display=""; document.getElementById("build_queue").style.display="none"; checkboxes.bvSmallQueue=true; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);}, false );
				a.innerHTML = ' <img src="graphic/map/map_n.png" alt="'+gui[lib.lang].buildingVars.minimize+'" title="'+gui[lib.lang].buildingVars.minimize+'"/>';
				var smallQueue = queue.parentNode.insertBefore(document.createElement("table"),queue);
				smallQueue.id = "dssbBV_build_queue";
				var row = smallQueue.insertRow(0);
				var cell = row.appendChild(document.createElement("th"));
				cell.colSpan = queue.rows.length-1;
				cell.appendChild( lib.createTextNode(gui[lib.lang].buildingVars.buildQueueTitle + " ") );
				a = cell.appendChild(document.createElement("a"));
				a.href = "javascript:;";
				a.addEventListener("click", function() { document.getElementById("dssbBV_build_queue").style.display="none"; document.getElementById("build_queue").style.display=""; checkboxes.bvSmallQueue=false; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);}, false );
				a.innerHTML = '<img src="graphic/map/map_s.png" alt="'+gui[lib.lang].buildingVars.maximize+'" title="'+gui[lib.lang].buildingVars.maximize+'"/>';
				if( checkboxes.bvSmallQueue ) queue.style.display = "none";
				else smallQueue.style.display = "none";
				row = smallQueue.insertRow(1);
				for( var i = 1; i < queue.rows.length; i++ ) {
					var res = queue.rows[i].cells[0].innerHTML.match( regExp[lib.lang].buildingVars.buildDestroy );
					if( res ) {
						var down = false;
						var level = parseInt(res[2],10);
						var name = res[1];
						name = name.substring(0,name.length-1);
						var link = queue.rows[i].cells[3].getElementsByTagName("a")[0].getAttribute("onClick");
						cell = row.insertCell(i-1);
						var html = '<a href="#" onclick="'+link+'">';
						
						if( isNaN(level) ) {
							cell.title=gui[lib.lang].buildingVars.destroy+": "; down=true; totalDestroys++;
							html += '<img src="graphic/overview/down.png" alt="'+gui[lib.lang].buildingVars.destroy+':'+'"/>';
						} else {cell.title=""; totalBuildings++}
						if( i==1 ) cell.title += name+" - "+queue.rows[i].cells[2].innerHTML;
						else cell.title += name+" - "+queue.rows[i].cells[1].innerHTML.replace(/<[^>]+>/g,"")+"- "+queue.rows[i].cells[2].innerHTML;

						for( var j=1 ; j<mainBuild.length ; j++ ) {
							var img = mainBuild[j].getElementsByTagName("img")[0];
							if( lib.game_data.mode == "destroy" ) img.title = img.alt;
							if( name.indexOf( img.title ) > -1 ) {
								html+="<img src=\""+img.src+"\"alt=\""+img.title+"\"/></a>";
								var buildName = img.src.match(/buildings\/([^\.]+)\.png/)[1];
								if( down ) actualBuildings[buildName]--;
								else actualBuildings[buildName]++;
								break;
							}
						}
						if( i==1 ) {
							html += '<span style="font-size:xx-small;font-weight:bold;" id="dssbBV_curtime">'+queue.rows[1].cells[1].innerHTML+'</span>';
							setInterval( function() { document.getElementById("dssbBV_curtime").innerHTML = document.getElementById("build_queue").rows[1].cells[1].innerHTML; }, 1000 );
						}
						cell.innerHTML=html;
					}
				}
				if( totalBuildings >= 5 ) {
					var cost = parseInt((Math.pow(1.25,parseInt(totalBuildings,10)-4)-1)*100,10)+"%";
					cell = smallQueue.rows[0].appendChild(document.createElement("th"));
					if( lib.win.BuildingMain.mode == 0 ) smallQueue.rows[0].cells[0].colSpan--;
					cell.innerHTML = '<img src="graphic/gold.png" alt="'+gui[lib.lang].buildingVars.queueCost+'"/>';
					cell.title = gui[lib.lang].buildingVars.queueCost;
					cell = row.appendChild( document.createElement("td") );
					cell.innerHTML = "<b>"+cost+"</b>";
				}
			}
			var tab = document.getElementById("building_wrapper").nodeName=="TABLE"?document.getElementById("building_wrapper"):document.getElementById("buildings");
			tab.getElementsByTagName("th")[0].noWrap = true;
			tab.getElementsByTagName("th")[0].appendChild( tableSpan );
			new updateMain(id);
			var p=null;
			while( tab.parentNode.getElementsByTagName("p").length > 0 ) {
				p=tab.parentNode.getElementsByTagName("p")[0];
				p.parentNode.removeChild( p );
			}
			var p = tab.parentNode.appendChild( document.createElement("p") );
			var input = p.appendChild( document.createElement("input") );
			input.type = "checkbox";
			input.checked = checkboxes.bvShowAll;
			input.id = "dssb_showAllBuildings";
			input.addEventListener("click",function() {
				this.sel = document.getElementById("dssbBV_variant");
				this.choId = this.sel.options[this.sel.selectedIndex].value;
				checkboxes.bvShowAll=!checkboxes.bvShowAll;
				lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
				new updateMain( this.choId );
			}, false);
			var label = p.appendChild( document.createElement("label") );
			label.textContent = " "+lib.createTextNode(gui[lib.lang].buildingVars.showAllBuildings).textContent;
			
			var p = tab.parentNode.appendChild( document.createElement("p") );
			var input = p.appendChild( document.createElement("input") );
			input.type = "checkbox";
			input.checked = checkboxes.bvFadeReady;
			input.id = "dssb_hideCompletedBuildings";
			input.addEventListener("click",function() {
				this.sel = document.getElementById("dssbBV_variant");
				this.choId = this.sel.options[this.sel.selectedIndex].value;
				checkboxes.bvFadeReady=!checkboxes.bvFadeReady;
				lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
				new updateMain( this.choId );
			}, false);
			var label = p.appendChild( document.createElement("label") );
			label.textContent = " "+lib.createTextNode(gui[lib.lang].buildingVars.hideCompletedBuildings).textContent;
		}; new Main(id);
	
		tableSpan.innerHTML+= " ";
		var input = tableSpan.appendChild( document.createElement("select") );
		input.id = "dssbBV_variant";
		input.options.add( new Option(lib.createTextNode(gui[lib.lang].buildingVars.selectVariantOption).textContent,0,true,id==0) );
		for( var i = 0; i < variants.length; i++ ) input.options.add( new Option(variants[i].name,variants[i].id,false,id==variants[i].id) );
		input.addEventListener("change", function() {
			lib.storage.setValue("BuildingVars_village"+lib.game_data.village.id,this.options[this.selectedIndex].value);
			id = this.options[this.selectedIndex].value;
			new updateMain( id );
		}, false );
		var a = tableSpan.appendChild(document.createElement("a"));
		a.href = "javascript:;";
		a.innerHTML = ' <img alt="#" src="graphic/rename.png"/>';
		a.addEventListener("click", function(event) { new MainSettingsMenu(); }, false);
	
		var twUpdate = lib.win.BuildingMain.update_all;
		lib.win.BuildingMain.update_all = function(data) {
			twUpdate(data);
			new Main(id);
		}
	}
}

/* show groupLinks/ short links on screen=map: */
if(location.href.match(/screen=map/) ) { 
	if( !checkboxes.disableGroupLinksMap ) {
		var tr = document.getElementsByTagName("h2")[0].parentNode.insertBefore(document.createElement("tr"),document.getElementsByTagName("h2")[0].nextSibling);
		newShowGroups( tr, lib.game_data.village.id, false, false );
	} 
	if( !checkboxes.disableMapRedirTargets ) {
	
		var Init = function() {
			document.getElementById("classiclink").parentNode.parentNode.parentNode.removeChild( document.getElementById("classiclink").parentNode.parentNode );
			var table;
			var Map = {
				redirTarget : lib.storage.getValue("redirTarget"+lib.game_data.player.id, "villageInfo"),
				twmap: lib.win.TWMap,
				lnk: document.getElementById("map"),
				redirHref: "",
				popupId: 0,
				bbcode: lib.storage.getValue("bbcode"+lib.game_data.player.id,false),
				coordlist: lib.storage.getValue("coordlist"+lib.game_data.player.id, ""),
				doIt : function() {
					Map.twmap.popup.dssbHandleMouseMove = Map.twmap.popup.handleMouseMove;
					Map.twmap.popup.handleMouseMove = Map.handleMouseMove;
					Map.twmap.mapHandler.dssbSpawnSector = Map.twmap.mapHandler.spawnSector;
					Map.twmap.mapHandler.spawnSector = Map.spawnSector;
                	if( !lib.firefox ) Map.twmap.reload();
					Map.lnk.addEventListener("click", Map.redirectLink, false);
					Map.twmap.context.enabled=false;
					table = document.getElementById("map_config").appendChild( document.createElement("table") );
				},
				redirectLink : function(e) {
					var pos = Map.twmap.map.coordByEvent(e);
					var x = pos[0];
					var y = pos[1];
					var v = Map.twmap.villages[x*1000+y];
					if( v ) {
						switch( Map.redirTarget ) {
							case "coordList":
								var coords = x+"|"+y;
								if( Map.bbcode ) coords = "[coord]"+coords+"[/coord]";
								if( document.getElementById("coordlist").value.indexOf(coords) == -1  ) {
									document.getElementById("coordlist").value += coords + "\n";
									document.getElementById("hotkeys_overlay_"+x+"_"+y).style.backgroundColor = "rgba(127,255,255,0.4)";
									document.getElementById("hotkeys_overlay_"+x+"_"+y).style.border = "dotted red 3px";
	          					} else {
									document.getElementById("coordlist").value = document.getElementById("coordlist").value.replace(coords+"\n","");
									document.getElementById("hotkeys_overlay_"+x+"_"+y).style.backgroundColor = "";
									document.getElementById("hotkeys_overlay_"+x+"_"+y).style.border = "";
								}
								document.getElementById("coordlist").style.height = (document.getElementById("coordlist").value.split("\n").length*12)+"px";
								Map.coordlist = document.getElementById("coordlist").value.replace(/\n/g,";");
								lib.storage.setValue("coordlist"+lib.game_data.player.id,Map.coordlist);
								break;
		      				}
					}		
					return false;
				},
				/* modified code from source "/js/game/twmap_drag.js?1314177858" */
				spawnSector : function(data, sector) {
					Map.twmap.mapHandler.dssbSpawnSector(data,sector);
					var beginX = sector.x - data.x;
					var endX = beginX + Map.twmap.mapSubSectorSize;
					
					var beginY = sector.y - data.y;
					var endY = beginY + Map.twmap.mapSubSectorSize;
					
					for(var x in data.tiles) {
						x = parseInt(x);
						if( x < beginX || x >= endX ) continue;
						for(var y in data.tiles[x]) {
							y = parseInt(y);
							if( y < beginY || y >= endY ) continue;
							var xx = data.x+x;
							var yy = data.y+y;
							var v = Map.twmap.villages[(xx)*1000+yy];
							if( v ) {
								var el = document.createElement('div');
								el.style.position = 'absolute';
								el.style.zIndex = '10';
								el.id = "hotkeys_overlay_"+xx+"_"+yy;
								el.style.width = Map.twmap.map.scale[0]-4+"px";
								el.style.height = Map.twmap.map.scale[1]-4+"px";
								if( Map.coordlist.indexOf(xx+"|"+yy) > -1 ) {
									el.style.backgroundColor = "rgba(127,255,255,0.4)";
									el.style.border = "dotted red 2px";
								}
								sector.appendElement(el, x-beginX, y-beginY);
							} 
						}			
					}
				},
				popupInfos: function( pos, villageId ) {	
					var popIn = [];
					if( !checkboxes.disableShowLoyalty[5] && !updateLoyalty(villageId).match(/\?\?\?/) ) popIn.push("loyalty");
					
					for( var f=0 ; f<popIn.length ; f++ ) {
						if( document.getElementById("info_"+popIn[f]+"_row") == undefined ) {
							var tbody = document.getElementById("info_content").getElementsByTagName("tbody")[0];
							tbody.innerHTML = tbody.innerHTML.replace('id="info_points">' + document.getElementById('info_points').innerHTML + '</td>', 'id="info_points">' + document.getElementById('info_points').innerHTML + '</td></tr><tr style="display: table-row;" id="info_'+popIn[f]+'_row"><td width="100px">'+gui[lib.lang].dsLoyalty.loyalty+'</td><td id="info_'+popIn[f]+'">'+updateLoyalty(villageId)+'</td>');
							Map.popupInfos(pos, villageId);
						} else {
							document.getElementById("info_"+popIn[f]+"_row").style.display = "table-row";
							document.getElementById("info_"+popIn[f]+"_row").innerHTML = "<td>"+gui[lib.lang].dsLoyalty.loyalty+":</td><td>"+updateLoyalty(villageId)+"</td>";
						}
					}
					return;
				},
				/* modified code from source "/js/game/twmap.js?1317810924" */
				handleMouseMove : function(e) {
					var pos = Map.twmap.map.coordByEvent(e);
					var x = pos[0];
					var y = pos[1];
					Map.twmap.popup.dssbHandleMouseMove(e);
					Map.lnk.href = Map.redirHref;
					if( x != Map.mocX || y != Map.mocY ) {
						var coordidx = x*1000+y;
						var village = Map.twmap.villages[coordidx];
						if( village ) {
							switch( Map.redirTarget ) {
								case "villageInfo": Map.lnk.href = lib.game_data.link_base_pure.replace("screen=","screen=info_village&id="+village.id); break;
								case "sendUnits": Map.lnk.href = lib.game_data.link_base_pure.replace("screen=","screen=place&target="+village.id); break;
								case "getUnits": Map.lnk.href = lib.game_data.link_base_pure.replace(/village=\d+/,"village="+village.id).replace("screen=","screen=place&target="+lib.game_data.village.id); break;
								case "sendResources": Map.lnk.href = lib.game_data.link_base_pure.replace("screen=","screen=market&target="+village.id); break;
								case "getResources": Map.lnk.href = lib.game_data.link_base_pure.replace(/village=\d+/,"village="+village.id).replace("screen=","screen=market&target="+lib.game_data.village.id); break;
								case "centerMap": Map.lnk.href = lib.game_data.link_base_pure.replace("screen=","screen=map&x="+x+"&y="+y); break;
								case "groupLinks": Map.lnk.href="javascript:popup_scroll(\"groups.php?&mode=village&village_id="+village.id+(lib.game_data.player.sitter_id!=0?"&t="+lib.game_data.player.id:"")+"\", "+filter.groupPopup[0]+", "+filter.groupPopup[1]+");"; break;				
								case "selectVillage": Map.lnk.href = lib.game_data.link_base_pure.replace(/village=\d+/,"village="+village.id).replace("screen=","screen=map"); break;
								case "chooseSnob": Map.lnk.href = lib.game_data.link_base_pure.replace(/village=\d+/,"village="+village.id).replace("screen=","screen=snob"); break;
								case "coordList": Map.lnk.href = "javascript:;"; break;
								case "contextMenu": Map.twmap.context.enabled=true; Map.lnk.href = "javascript:;"; break;
							}
							if( Map.redirTarget != "contextMenu" && Map.twmap.context.enabled ) Map.twmap.context.enabled=false; 
							Map.redirHref = Map.lnk.href;
							if( Map.bbcode ) document.getElementById("coords").value = "[coord]"+x+"|"+y+"[/coord]";
							else document.getElementById("coords").value = x+"|"+y; 
							if( !lib.opera) document.getElementById("coords").select();
							setTimeout(function() {Map.popupInfos(pos,village.id);}, 0);
						} else {
							document.getElementById("coords").value = "";
							Map.lnk.href = "#";
							document.getElementById("coords").blur();
							Map.popupId = 0;
						}
					}
					return false;
				},
			}
			Map.doIt();
		
			table.width = "100%";
			table.id = "hotkeysMap";
			table.className = "vis";
			var row, cell;
			var tbody = table.appendChild(document.createElement("tbody"));
			row = tbody.appendChild( document.createElement("tr") );
			cell = row.appendChild(document.createElement("th"));
			cell.colSpan = 2;
			cell.innerHTML = gui[lib.lang].headSettingsMap;
			row = tbody.appendChild( document.createElement("tr") );
			cell = row.appendChild( document.createElement("td") );
			cell.innerHTML = gui[lib.lang].coordinates;
			var cell2 = row.appendChild( document.createElement("td") );
			cell2.noWrap = "true";

			var input = cell2.appendChild(document.createElement("input"));
			input.id = "coords";
			input.readOnly = true;
			input.style.border = 0;
			input.style.backgroundColor = "inherit";
			input.style.width = "140px";

			var openDiv = function() {	
				var div = document.getElementById("coords").parentNode.appendChild(document.createElement("div"));
				div.id = "coordlist_div";
				div.style.width = "200px";
				div.style.border = "1px solid #804000";
				var input = div.appendChild(document.createElement("textarea"));
				input.value = Map.coordlist.replace(/;/g,"\n");
				input.id = "coordlist";
				input.setAttribute("onclick","this.focus();this.select();");
				input.readOnly = true;
				input.style.width = "180px";
				input.style.fontSize = "xx-small";
				input.style.border = "0";
				input.style.backgroundColor = "inherit";
				input.style.height = (input.value.split("\n").length*12)+"px";
				var a = div.appendChild(document.createElement("a"));
				a.href = "javascript:;";
				a.style.fontWeight = "bold";
				a.style.color = "red";
				a.style.verticalAlign = "top";
				a.innerHTML = "X";
				a.addEventListener("click",function() {
					document.getElementById("coords").style.display="";
					document.getElementById("coordlist_div").parentNode.removeChild(document.getElementById("coordlist_div") );
					lib.storage.deleteValue("coordlist"+lib.game_data.player.id);
					Map.coordlist = Map.coordlist.split(";");
					for( var i=0 ; i<Map.coordlist.length-1 ; i++ ) { 
						Map.coordlist[i]=Map.coordlist[i].replace("[coord]","").replace("[/coord]","");
						document.getElementById("hotkeys_overlay_"+Map.coordlist[i].split("|")[0]+"_"+Map.coordlist[i].split("|")[1]).style.backgroundColor = "";
						document.getElementById("hotkeys_overlay_"+Map.coordlist[i].split("|")[0]+"_"+Map.coordlist[i].split("|")[1]).style.border = "";
					}
					Map.coordlist = "";
					Map.redirTarget = "villageInfo";
					document.getElementById("villageInfo").selected = "true";
					lib.storage.setValue("redirTarget"+lib.game_data.player.id, Map.redirTarget);
				}, false);
				document.getElementById("coords").parentNode.appendChild( document.getElementById("bbcode") );
				document.getElementById("coords").parentNode.appendChild( document.getElementById("bbcode_txt") );
				document.getElementById("coords").style.display = "none";
			}

			input = cell2.appendChild( document.createElement("input") );
			input.type = "checkbox";
			input.id = "bbcode";
			input.checked = Map.bbcode;
			input.addEventListener("click",function() {
				Map.bbcode = (this.checked ? true : false);
				lib.storage.setValue("bbcode"+lib.game_data.player.id, Map.bbcode ); 
				if( Map.bbcode ) {  
					if( document.getElementById("coordlist") != undefined && document.getElementById("coordlist").value != "" ) {
				 		var value = document.getElementById("coordlist").value.split(/\n/g);
						for( var i=0 ; i<value.length ; i++ ) { 
					   		if( value[i] != "" )
					   			value[i] = "[coord]"+value[i]+"[/coord]";
						} value=value.join("\n");
						document.getElementById("coordlist").value = value;
						lib.storage.setValue("coordlist"+lib.game_data.player.id,value.replace(/\n/g,";") );
					}
					if( document.getElementById("coords").value != "" ) {
						document.getElementById("coords").value = "[coord]"+document.getElementById("coords").value+"[/coord]"; 
						document.getElementById("coords").select();  
					}
				} else {     
					if( document.getElementById("coordlist") != undefined && document.getElementById("coordlist").value != "" ) {
						var value = document.getElementById("coordlist").value.split(/\n/g);
						for( var i=0 ; i<value.length ; i++ ) { 
					   		if( value[i] != "" )
								value[i] = value[i].replace("[coord]","").replace("[/coord]","");
						} value=value.join("\n");
						document.getElementById("coordlist").value = value;
						lib.storage.setValue("coordlist"+lib.game_data.player.id,value.replace(/\n/g,";") );  
					} document.getElementById("coords").value = document.getElementById("coords").value.replace("[coord]","").replace("[/coord]",""); 
				}
			}, false);
			var txt = cell2.appendChild( lib.createTextNode(gui[lib.lang].bbcode) );
			txt.id = "bbcode_txt";
			if( Map.redirTarget == "coordList" ) openDiv();

			var tbody = table.appendChild(document.createElement("tbody"));
			row = tbody.appendChild( document.createElement("tr") )
			cell = row.appendChild( document.createElement("td") );
			cell.innerHTML = gui[lib.lang].clickVillage;
			cell = row.appendChild( document.createElement("td") );
			var redirTarget = lib.storage.getValue("redirTarget"+lib.game_data.player.id, "villageInfo");
			var select = cell.appendChild(document.createElement("select")), i=0;
			for( var key in gui[lib.lang].mapRedirTargets ) { 
				if( !lib.pa ) {if( key == "groupLinks" ) continue;} 
				select.options.add( new Option(lib.createTextNode(gui[lib.lang].mapRedirTargets[key]+lib.showHotkey( hotkeys.keys.keysMap[key] )).textContent,false,false) );
				select.options[i].id = key;
				if( redirTarget == key ) select.selectedIndex = i;
				if( !hotkeys.disableAll.keysMap ) lib.hotkeys.keys.push( { key: hotkeys.keys.keysMap[key], event: { id: key, event: "click" } } );
				select.options[i].addEventListener("click",function() {
					this.selected = true;
					lib.storage.setValue("redirTarget"+lib.game_data.player.id, this.id);
					Map.redirTarget = this.id;
					if( this.id != "coordList" ) {
						document.getElementById("coords").style.display="";
						if( document.getElementById("coordlist_div") != undefined ) {
							document.getElementById("coords").style.display="";
							document.getElementById("coordlist_div").parentNode.removeChild(document.getElementById("coordlist_div") );
						}
					} else {if( !document.getElementById("coordlist_div") ) openDiv();}
				},false);
				i++;
			}		
			select.addEventListener("change",function() {
				lib.storage.setValue("redirTarget"+lib.game_data.player.id, this.options[this.selectedIndex].id);
				Map.redirTarget = this.options[this.selectedIndex].id;
				if( this.options[this.selectedIndex].id != "coordList" ) {
					document.getElementById("coords").style.display="";
					if( document.getElementById("coordlist_div") != undefined ) {
						document.getElementById("coords").style.display="";
						document.getElementById("coordlist_div").parentNode.removeChild(document.getElementById("coordlist_div") );
					}
				} else {if( !document.getElementById("coordlist_div") ) openDiv();}	
			}, false);
			table.appendChild( document.createElement("br") );
		}
		lib.win.onload=new Init();
	}
}

/*read incoming trades on 'mode=trader'*/
if ( document.getElementById("trades_table") || ( location.href.match(/screen=overview_villages/) && location.href.match(/mode=trader/) ) 
		&&  !checkboxes.disableSendResources && lib.pa) {
    
        var getIncTrades = function () {
            window.location.href = lib.game_data.link_base_pure.replace("amp;","").replace("screen=","screen="+lib.game_data.screen+"&mode=trader&group=0&type=inc&page=-1");
            checkboxes.getIncomingTradesCheckbox=true;
            lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
            var vals = lib.storage.listValues();
            for(var i = 0; i < vals.length; i++ ) {
                if( vals[i].match("Trade_player.id"+lib.game_data.player.id) )
                	lib.storage.deleteValue(vals[i]);}
        }
        
        var parseIncTrades = function () {
            var rows = lib.xPath('//tr[contains(@class, "row_")]');

            /*generate object with data*/
            for( var i=0 ; i<rows.length ; i++ ) {
                var destinationName = rows[i].getElementsByTagName("td")[3].textContent.split("(");
                destinationName = destinationName[destinationName.length-1].split(")")[0].toString().replace("|","_");
                var tradeValues = {wood: 0, clay: 0, iron: 0, dateOfArrival:""};
				var arrayLength = tradeValues.wood.length+1;
                var arrival = rows[i].getElementsByTagName("td")[5].textContent.split(":");
                var time=parseInt(new lib.getServerTime().getTime(),10)+parseInt(arrival[0]*1000*60*60,10)+parseInt(arrival[1]*1000*60,10)+parseInt(arrival[2]*1000);
               	tradeValues.dateOfArrival = time;
                var resName = rows[i].getElementsByTagName("td")[7].getElementsByTagName("img");
                var resValue = rows[i].getElementsByTagName("td")[7].textContent.split(" ");
                    for( var r=0 ; r<resName.length ; r++ ) {
                        if( resName[r].title == gui[lib.lang].wood )
                            tradeValues.wood = parseInt(resValue[r].replace(".","") );
                        if( resName[r].title == gui[lib.lang].clay )
                            tradeValues.clay = parseInt(resValue[r].replace(".","") );
                        if( resName[r].title == gui[lib.lang].iron ) 
                            tradeValues.iron = parseInt(resValue[r].replace(".","") );
                    }	
				if( tradeValues.wood.length < arrayLength ) tradeValues.wood.push( 0 );
				if( tradeValues.clay.length < arrayLength ) tradeValues.clay.push( 0 );
				if( tradeValues.iron.length < arrayLength ) tradeValues.iron.push( 0 );
				var trades = {wood: [], clay: [], iron: [], dateOfArrival:[]};
				var trade = lib.storage.getValue("Trade_player.id"+lib.game_data.player.id+"_"+destinationName,trades);
				trade.wood.push(tradeValues.wood); trade.clay.push(tradeValues.clay); trade.iron.push(tradeValues.iron); trade.dateOfArrival.push(tradeValues.dateOfArrival);
				lib.storage.setValue("Trade_player.id"+lib.game_data.player.id+"_"+destinationName,trade);
            }
            checkboxes.getIncomingTradesCheckbox=false; checkboxes.tradesReaded=true;
            lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
            alert(gui[lib.lang].gotTrades);
        }

	if( checkboxes.getIncomingTradesCheckbox )
		var newTrades = new parseIncTrades();
        var tab = document.getElementById("paged_view_content").getElementsByClassName("vis")[2];
        var a = tab.parentNode.insertBefore(document.createElement("a"),tab);
        if( !checkboxes.tradesReaded )
        	a.innerHTML = gui[lib.lang].getTrades+lib.showHotkey( hotkeys.keys.keysTransportOverview.readInTransports );
	else a.innerHTML = gui[lib.lang].getTradesAgain+lib.showHotkey( hotkeys.keys.keysTransportOverview.readInTransports );
        a.href = "javascript:;";
        a.id = "getTrades";
        a.addEventListener("click", function() {var newTrades = new getIncTrades();}, false );
        lib.hotkeys.keys.push( { key: hotkeys.keys.keysTransportOverview.readInTransports, event: { id: "getTrades", event: "click" } } );
}


/*settings: 'mode=settings'*/
if (location.href.match("mode=settings") && location.href.match("screen=settings") ) {

	var th = new Array(3);
    	for( var i=0 ; i<th.length ; i++ ) {
      		th[i] = document.createElement("th");
		th[i].colSpan = "2";
	}      	
	var tr = new Array(5);
	for( var i=0 ; i<tr.length ; i++ ) {
		tr[i] = document.createElement("tr");
		document.getElementsByClassName("vis settings")[0].appendChild(tr[i]);
	}		
	var td = new Array(2);
	for( var i=0 ; i<td.length ; i++ ) {
		td[i] = document.createElement("td");
		td[i].noWrap = "true";
		td[i].colSpan = "2";
	}
	th[0].style.whiteSpace = "nowrap";
	th[0].innerHTML = "<a href=\""+gui.threadLink+"\" target='"+gui[lib.lang].forum[0]+"' title='"+gui[lib.lang].forum[1]+" \"" 
	+ gui.name + "\" "+gui[lib.lang].forum[2]+"'>" + gui.name+" "+gui[lib.lang].version+" "+gui.version + "</a>";

	var save = th[2].appendChild(document.createElement("input"));
	save.type = "button";
	save.value = gui[lib.lang].saveButton;
	save.id = "saveButtonlib.storageBalancer";
	save.addEventListener("click", function(){
		var filter = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings);
		var values = ["disablePointsFilter","changePointsFilter","disableFarmFilter","changeFarmFilter","disableMinRes","minResPerCent","disableMaxRes","maxResPerCent"];
		values.push("distanceFilterCheckbox","disableOwnOfferBorder","disableOfferBorder","disableSendResources","disableLastVillage","disableDoOwnOffer","disableDSLoyalty");
		values.push("disableMaxButtons","disableFadeOutOffersEnemies","disableUseOfTroops","disableUseOfRessis","disableNeighbourVillages","disableLastTroopsLink");
		values.push("disableAbsoluteDisplay","sumUpRessisAbsolute","neighbourVillagesResAbsolute","disableFilterLines","disableSumRessis");
		values.push("disableGroupLinks","disableGroupLinksCombined","disableGroupLinksProduction","disableGroupLinksMain","disableGroupLinksMap","disableSortSendResources");
		values.push("disableBadEQ","disableSaveOrder","disableCombineUnitImgs","disableDsAccDualForum","disableDsRealCharts","disableMapRedirTargets","disableMinSendBorder");
		values.push("uniMaxRes","uniMinRes","disableHotkeys","disableDsMoveReports","disableMassRecruit","disableAGCounter","disableShowGroupsMain","disableShowGroupsMap");	
		values.push("disableShowGroupsCombined","disableShowGroupsProduction","disableDSTroopsCalc","disableNewIncs","disableBashpoints");
		values.push("disableAddStandingUnits","disableAddInfosStorage","disableBuildVars","disableConTimeM","disableConTimeP","disableVpDistance","disableShowGroupsBuildings");
		values.push("disableGroupLinksBuildings");
		for( var i=0 ; i<values.length ; i++ ) checkboxes[values[i]] = document.getElementById("dssb_"+values[i]).checked ? true : false;
		
		var dsLoyalty = ["disableLoyaltyMain","disableLoyaltyCombined","disableLoyaltyProduction","disableLoyaltyBuildings","disableLoyaltyInfoVill","disableLoyaltyMap"];
		for( var i=0 ; i<dsLoyalty.length ; i++ ) checkboxes.disableShowLoyalty[i] = document.getElementById("dssb_"+dsLoyalty[i]).checked ? true : false;			
		
		this.f = 0;
		for( var reportSettings in gui[lib.lang].dsMoveReports.gui.reportGroup ) {
			checkboxes.selectedGroups[this.f] = document.getElementById("dssb_dsMoveReports_"+reportSettings).selectedIndex;
			checkboxes.disableReportButtons[this.f] = document.getElementById("dssb_dsMoveReports_disable_"+reportSettings).checked ? true : false;
			this.f++;
		}		
		var settingsDsRealCharts=["disableChartPlayer","disableBashPlayer","disableChartAlly","disableBashAlly","disableLinkToFile","disableLinkToMap"];
		for( var i=0 ; i<settingsDsRealCharts.length ; i++ ) checkboxes.settingsDsRealCharts[i] = document.getElementById("dssb_"+settingsDsRealCharts[i]).checked ? true : false; 
		checkboxes.disableLoyaltyColor = document.getElementById("dssb_selectLoyaltyColor").selectedIndex;
		
		if( checkboxes.disableDsAccDualForum ) lib.storage.setValue("DsAccDualForum_disabled",true);  
		else lib.storage.setValue("DsAccDualForum_disabled",false); 
		if( checkboxes.disableSortSendResources ) checkboxes.isSorted = ["dssb_sortWithEQ",false];
		lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
		var ids = ["minRes","minResWood","minResClay","minResIron"], minRes = [];
		for( var e=0 ; e<ids.length ; e++ ) minRes.push( document.getElementById(ids[e]).value );
		if( document.getElementById("dssb_minResPerCent").checked ) filter.minResPerCent = minRes; 
		else filter.minRes = minRes; 
		var ids = ["maxRes","maxResWood","maxResClay","maxResIron"], maxRes = [];
		for( var e=0 ; e<ids.length ; e++ ) maxRes.push( document.getElementById(ids[e]).value );
		if( document.getElementById("dssb_maxResPerCent").checked ) filter.maxResPerCent = maxRes;
		else filter.maxRes = maxRes;
		filter.pointsFilter = parseInt(document.getElementById("pointsFilter").value,10); filter.farmFilter = parseInt(document.getElementById("farmFilter").value,10);
		filter.distanceFilter = parseInt(document.getElementById("distanceFilter").value,10); filter.offerBorder = parseInt(document.getElementById("offerBorder").value,10);
		filter.minSendBorder = parseInt(document.getElementById("minSendBorder").value,10); filter.ownOfferBorder = parseInt(document.getElementById("ownOfferBorder").value,10);
		filter.imgSize = document.getElementById("sizeNeighourVillageImages").value.toString()+"px";
		filter.fontSize = document.getElementById("sizeNeighbourVillageFonts").value.toString()+"em";
		filter.marginTop = document.getElementById("marginTopNeighbourVillages").value.toString()+"px";
		filter.groupFontSize = document.getElementById("dssb_groupFontSize").value;
		filter.groupPopup[0] = document.getElementById("dssb_groupPopup_width").value;
		filter.groupPopup[1] = document.getElementById("dssb_groupPopup_height").value;
		lib.storage.setValue("Filter_player.id"+lib.game_data.player.id,filter);
		lib.storage.setValue("Hotkeys_player.id"+lib.game_data.player.id,hotkeys.keys);
		lib.storage.setValue("HotkeysDisableAll_player.id"+lib.game_data.player.id,hotkeys.disableAll);
		alert(gui[lib.lang].saveMessage);
	}, false);
	
	var exp = th[2].appendChild( document.createElement("input") );
	exp.type = "button";
	exp.value = gui[lib.lang].importExport.exportButton;
	exp.addEventListener("click",function(event) {
		this.popTable = document.createElement("table");
		this.h3 = this.popTable.appendChild( document.createElement("h3") );
		this.h3.innerHTML = gui[lib.lang].importExport.exportSettingsData;
		this.popTable2 = this.popTable.appendChild( document.createElement("table") );		
		this.textarea = this.popTable2.appendChild( document.createElement("textarea") );
		this.textarea.style.width = "675px";
		this.textarea.style.height = "300px";
		this.values = lib.storage.listValues();
		var text = "- exportDSSBSettings -\nDSStorageBalancer "+gui.version+"\n\n", val="",valu="";
		this.intValue = function(v,key) {text+=key+":;: "+v+"\n";}		
		for( var i=0 ; i<this.values.length ; i++ ) {
			val=lib.storage.getValue(this.values[i],"");
			switch( typeof(val) ) {
                case "object":
                case "function": this.intValue("j"+JSON.stringify(val),this.values[i]); break;
                case "number": this.intValue("n"+val,this.values[i]); break;
                case "boolean": this.intValue("b" + (val ? 1 : 0),this.values[i]); break;
                case "string": this.intValue("s" + val ,this.values[i]); break;
                case "undefined": this.intValue("u",this.values[i]); break;
            }			
		} text+="- exportDSSBSettings -";
		this.textarea.value = text;
		this.textarea.addEventListener("focus",function() {this.select()},false);	
		lib.popup("exportPopup", screen.width/2-350, event.pageY-350, this.popTable, false, 700, 400 );
		document.getElementById("exportPopup").getElementsByTagName("textarea")[0].select();
	},false);
	
	var imp = th[2].appendChild(document.createElement("input"));
	imp.type = "button";
	imp.value = gui[lib.lang].importExport.importButton;
	imp.addEventListener("click",function(event) {
		this.popTable = document.createElement("table");
		this.h3 = this.popTable.appendChild( document.createElement("h3") );
		this.h3.innerHTML = gui[lib.lang].importExport.importSettingsData;
		this.popTable2 = this.popTable.appendChild( document.createElement("table") );		
		this.textarea = this.popTable2.appendChild( document.createElement("textarea") );
		this.textarea.style.width = "675px";
		this.textarea.style.height = "290px";
		this.textarea.id = "dssb_importText";
		
		this.popTable2.appendChild( document.createElement("br") );
		this.impor = this.popTable2.appendChild( document.createElement("input") );
		this.impor.type = "button";
		this.impor.value = gui[lib.lang].importExport.importData;
		this.impor.addEventListener("click",function() {
			this.area = this.parentNode.parentNode.getElementsByTagName("textarea")[0].value.split("\n");
			this.check = true; this.error=false;
			this.intValue = function(str) {
				if( typeof(str) != "undefined" ) {
					switch( str[0] ) {
						case "j": return JSON.parse(str.substring(1));
						case "n": return parseFloat(str.substring(1));
						case "b": return str[1] == "1";
						case "s": return str.substring(1);
						default: return "";
					}
		        }	
			};
			if( !this.area[0].match(/- exportDSSBSettings -/) ) {this.error=true;alert(gui[lib.lang].importExport.errorOccured);return;}
			if( !this.area[1].match(new RegExp(gui.version)) ) this.check = confirm(lib.createTextNode(gui[lib.lang].importExport.olderDatas).textContent);
			if( this.check ) {
				if( this.area.length < 1 ) {this.error=true;alert(gui[lib.lang].importExport.errorOccured);return;}
				if( !this.area[this.area.length-1].match(/- exportDSSBSettings -/) ) this.check=confirm(lib.createTextNode(gui[lib.lang].importExport.failureInDatas).textContent);
				if( this.check ) {
					for( var i=3 ; i<this.area.length-1 ; i++ ) {
						this.val = this.area[i].split(":;: ");
						if( this.val.length != 2 ) {this.error=true;alert(gui[lib.lang].importExport.errorOccured);return;}		
			        	this.obj = this.intValue(this.val[1]);
						lib.storage.setValue(this.val[0],this.obj);
					} alert(gui[lib.lang].importExport.importSuccessfull);
				} else alert(gui[lib.lang].importExport.importCanceled);
			} else alert(gui[lib.lang].importExport.importCanceled);
		}, false);		
		lib.popup("importPopup", screen.width/2-350, event.pageY-350, this.popTable, false, 700, 400 );
	}, false);

	var del = th[2].appendChild(document.createElement("input"));
	del.type = "button";
	del.value = lib.createTextNode(gui[lib.lang].deleteButton).textContent;
	del.addEventListener("click", function(){
		if( confirm( lib.createTextNode(gui[lib.lang].confirm_delAll).textContent ) ) {
			var vals = lib.storage.listValues();
			for(var i = 0; i < vals.length; i++ ) lib.storage.deleteValue(vals[i]); alert( lib.createTextNode(gui[lib.lang].allDataDeleted).textContent );}
	}, false);
	
	var span = th[2].appendChild( document.createElement("span") );
	span.style.paddingRight = "20px";
	
	var wiki = th[2].appendChild( document.createElement("a") );
	wiki.href = gui.wikiLink;
	wiki.target = "_blank";
	wiki.innerHTML = gui[lib.lang].goToWiki;

	tr[0].appendChild(th[0]);
	tr[1].appendChild(td[0]);
	tr[2].appendChild(th[1]);
	tr[3].appendChild(td[1]);
	tr[4].appendChild(th[2]);
	
	var appendCheckbox = function( nbj, obj, text, id, checkbox ) {
		if( nbj ) nbj.innerHTML = text;
		this.newCheckbox = obj.appendChild( document.createElement("input") );
		this.newCheckbox.type = "checkbox";
		this.newCheckbox.id = "dssb_"+id;
		this.newCheckbox.checked = checkbox;
		obj.appendChild(lib.createTextNode(gui[lib.lang].disableFilter));
		if( this.newCheckbox.checked ) this.newCheckbox.parentNode.parentNode.style.color = "#A9A9A9";
		this.newCheckbox.addEventListener( "click", function(){
			if( this.checked ) this.parentNode.parentNode.style.color = "#A9A9A9"; else this.parentNode.parentNode.style.color = "#000000";
    	}, false);
		return this.newCheckbox;
	};
	
	var Settings = function(name) {
		document.getElementById("dssb_"+name).parentNode.className = "selected";
		th[1].innerHTML = gui[lib.lang].settingsTabTitle[name]+":";
		this.checkboxes = new newCheckboxes();
		var THIS = this;
		for( var key in gui[lib.lang].settingsTabTitle ) {
   			if( key == "tabSendResources" ) {
				if(  name =="tabSendResources" ) document.getElementById("dssb_tabSendResources_tab").style.display = "block";
				var imgSrcs = ["/graphic/"+regExp[lib.lang].wood+".png?1","/graphic/"+regExp[lib.lang].clay+".png?1","/graphic/"+regExp[lib.lang].iron+".png?1",
					"/graphic/buildings/market.png?"];
   		   			var trTab = new Array(11);
				  	for( var i=0 ; i<trTab.length ; i++ )
			  			trTab[i] = document.getElementById("dssb_"+key+"_tab").appendChild( document.createElement("tr") );
				   	var tdTab = new Array(22);
				  	for( var i=0 ; i<tdTab.length ; i++ )
		  	   			tdTab[i] = trTab[Math.floor(i/2)].appendChild( document.createElement("td") );
    			
        		tdTab[0].innerHTML = gui[lib.lang].minRes;
				tdTab[0].appendChild( document.createElement("br") );

				for( var e=0 ; e<imgSrcs.length-1 ; e++ ) {
					var td = tdTab[0].appendChild( document.createElement("td") );
					td.style.paddingRight = "40px";
					var img = td.appendChild( document.createElement("img") );
					img.src= imgSrcs[e];
					if( this.checkboxes.uniMinRes ) img.src = lib.grayscale(img);
					img.style.cursor = "pointer";
					img.addEventListener("click",function() {
						if( !document.getElementById("dssb_uniMinRes").checked ) {
							this.ids = ["minRes","minResWood","minResClay","minResIron"];
							this.allTd = this.parentNode.parentNode.getElementsByTagName("td");
							for( this.i=0 ; this.i < this.allTd.length ; this.i++ ) {this.allTd[this.i].className="";}
							this.parentNode.className = "selected";
							for( this.j=0 ; this.j<this.ids.length; this.j++ ) document.getElementById(this.ids[this.j]).style.display = "none";
							this.images = this.parentNode.parentNode.getElementsByTagName("img");
							for( this.j=0 ; this.j<this.images.length; this.j++ ) {
								if( this.images[this.j].src == this.src ) {document.getElementById(this.ids[this.j+1]).style.display = ""; break;}
							}
						}
					}, false);
					if( e==0 && !this.checkboxes.uniMinRes) img.parentNode.className = "selected";
				}

				var font = document.createElement("font");
				font.id = "minResPerCentColor";
				font.innerHTML = "%";
				if( this.checkboxes.minResPerCent ) {
					font.color='#000000';
					var minResValue = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).minResPerCent;
            		if(this.checkboxes.disableMinRes ) font.color='#A9A9A9';
				} else {
					font.color='#f7eed3';
					var minResValue = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).minRes;}
				var ids = ["minRes","minResWood","minResClay","minResIron"];
				for( var j=0 ; j<minResValue.length ; j++ ) {
					var input = tdTab[1].appendChild( document.createElement("input") );
					input.type = "text";
					input.id = ids[j];
					input.value = minResValue[j];
					if( this.checkboxes.uniMinRes && j>0 ) input.style.display = "none";
					else if( !this.checkboxes.uniMinRes ) {
						if( j==0 ) {input.style.display = "none"; continue;}
						var span = tdTab[0].getElementsByTagName("td");
						if( !(span[j-1].className == "selected") ) input.style.display = "none";
					}
				} tdTab[1].appendChild( font );

				var disableMinRes = tdTab[1].appendChild(document.createElement("input"));
				disableMinRes.type="checkbox";
				disableMinRes.id = "dssb_disableMinRes";
				disableMinRes.setAttribute("style", "margin-left:1em;");
				disableMinRes.checked = this.checkboxes.disableMinRes;
				tdTab[1].appendChild(lib.createTextNode(gui[lib.lang].disableFilter));
				if( disableMinRes.checked ) trTab[0].style.color = "#A9A9A9";
				disableMinRes.addEventListener( "click", function(){
					if( this.checked ) this.parentNode.parentNode.style.color = "#A9A9A9"; else this.parentNode.parentNode.style.color = "#000000";
            				if( document.getElementById("dssb_minResPerCent").checked ) {
						if( this.checked ) document.getElementById("minResPerCentColor").color = "#A9A9A9";
						else document.getElementById("minResPerCentColor").color = "#000000";}
        	    			else { if( this.checked ) document.getElementById("minResPerCentColor").color = "#f7eed3";
						else document.getElementById("minResPerCentColor").color = "#f7eed3";}
				}, false); 

				var minResPerCent = tdTab[1].appendChild(document.createElement("input"));
				minResPerCent.type="checkbox";
				minResPerCent.setAttribute("style", "margin-left:2em;");
				minResPerCent.id = "dssb_minResPerCent";
				minResPerCent.checked = this.checkboxes.minResPerCent;
				minResPerCent.addEventListener( "change", function(){ 
					var ids = ["minRes","minResWood","minResClay","minResIron"];
					if( this.checked ) {
						if( disableMinRes.checked ) perCent = "#A9A9A9"; else perCent = "#000000"; 
						minResValue = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).minResPerCent;
					} else { perCent = "#f7eed3";
						minResValue = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).minRes};
					for( this.j=0 ; this.j<minResValue.length ; this.j++ ) document.getElementById(ids[this.j]).value=minResValue[this.j];
					document.getElementById("minResPerCentColor").color=perCent;
				}, false);  
				tdTab[1].appendChild(lib.createTextNode(gui[lib.lang].resPerCent));
				tdTab[1].appendChild( document.createElement("br") );

				var uniMinRes = tdTab[1].appendChild(document.createElement("input"));
				uniMinRes.type="checkbox";
				uniMinRes.id = "dssb_uniMinRes";
				uniMinRes.checked = this.checkboxes.uniMinRes;
				uniMinRes.addEventListener("click",function() {
					this.ids = ["minRes","minResWood","minResClay","minResIron"];
					this.images = this.parentNode.parentNode.firstChild.getElementsByTagName("img");
					for( this.i=0 ; this.i<this.images.length ; this.i++ ) {
						if( this.checked ) {
							this.images[this.i].src = lib.grayscale( this.images[this.i] );
							this.images[this.i].parentNode.className="";
						} else this.images[this.i].src = imgSrcs[this.i];
					} 
					for( this.j=0 ; this.j<this.ids.length; this.j++ ) document.getElementById(this.ids[this.j]).style.display = "none";
					if( !this.checked ) {
						this.images[0].parentNode.className="selected";
						document.getElementById(this.ids[1]).style.display = "";
					} else document.getElementById(this.ids[0]).style.display = "";
				}, false);
				tdTab[1].appendChild(lib.createTextNode(gui[lib.lang].uniMinRes));

				tdTab[2].innerHTML = gui[lib.lang].maxRes;
				tdTab[2].appendChild( document.createElement("br") );

				for( var e=0 ; e<imgSrcs.length-1 ; e++ ) {
					var td = tdTab[2].appendChild( document.createElement("td") );
					td.style.paddingRight = "40px";
					var img = td.appendChild( document.createElement("img") );
					img.src= imgSrcs[e];
					var imga = document.createElement("img");
					if( this.checkboxes.uniMaxRes ) img.src = lib.grayscale(img);
					img.style.cursor = "pointer";
					img.addEventListener("click",function() {
						if( !document.getElementById("dssb_uniMaxRes").checked ) {
							this.ids = ["maxRes","maxResWood","maxResClay","maxResIron"];
							this.allTd = this.parentNode.parentNode.getElementsByTagName("td");
							for( this.i=0 ; this.i < this.allTd.length ; this.i++ ) {this.allTd[this.i].className="";}
							this.parentNode.className = "selected";
							for( this.j=0 ; this.j<this.ids.length; this.j++ ) document.getElementById(this.ids[this.j]).style.display = "none";
							this.images = this.parentNode.parentNode.getElementsByTagName("img");
							for( this.j=0 ; this.j<this.images.length; this.j++ ) {
								if( this.images[this.j].src == this.src ) {document.getElementById(this.ids[this.j+1]).style.display = ""; break;}
							}
						}
					}, false);
					if( e==0 && !this.checkboxes.uniMaxRes) img.parentNode.className = "selected";
				}
				
				var font = document.createElement("font");
				font.id = "maxResPerCentColor";
				font.innerHTML = "%";
				if( this.checkboxes.maxResPerCent ) {
					font.color='#000000';
					var maxResValue = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).maxResPerCent;
            		if(this.checkboxes.disableMaxRes ) font.color='#A9A9A9';
				} else {
					font.color='#f7eed3';
					var maxResValue = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).maxRes;}
				var ids = ["maxRes","maxResWood","maxResClay","maxResIron"];
				for( var j=0 ; j<maxResValue.length ; j++ ) {
					var input = tdTab[3].appendChild( document.createElement("input") );
					input.type = "text";
					input.id = ids[j];
					input.value = maxResValue[j];
					if( this.checkboxes.uniMaxRes && j>0 ) input.style.display = "none";
					else if( !this.checkboxes.uniMaxRes ) {
						if( j==0 ) {input.style.display = "none"; continue;}
						var span = tdTab[2].getElementsByTagName("td");
						if( !(span[j-1].className == "selected") ) input.style.display = "none";
					}
				} tdTab[3].appendChild( font );
	
				var disableMaxRes = tdTab[3].appendChild(document.createElement("input"));
				disableMaxRes.type="checkbox";
				disableMaxRes.id = "dssb_disableMaxRes";
				disableMaxRes.setAttribute("style", "margin-left:1em;");
				disableMaxRes.checked = this.checkboxes.disableMaxRes;
				tdTab[3].appendChild(lib.createTextNode(gui[lib.lang].disableFilter));
				if( disableMaxRes.checked ) trTab[1].style.color = "#A9A9A9";
				disableMaxRes.addEventListener( "click", function(){
					if( this.checked ) this.parentNode.parentNode.style.color = "#A9A9A9"; else this.parentNode.parentNode.style.color = "#000000";
					if( document.getElementById("dssb_maxResPerCent").checked ) {
						if( this.checked ) document.getElementById("maxResPerCentColor").color = "#A9A9A9";
						else document.getElementById("maxResPerCentColor").color = "#000000";}
					else { if( this.checked ) document.getElementById("maxResPerCentColor").color = "#f7eed3";
					else document.getElementById("maxResPerCentColor").color = "#f7eed3";}
				}, false); 

				var maxResPerCent = tdTab[3].appendChild(document.createElement("input"));
				maxResPerCent.type="checkbox";
				maxResPerCent.setAttribute("style", "margin-left:2em;");
				maxResPerCent.id = "dssb_maxResPerCent";
				maxResPerCent.checked = this.checkboxes.maxResPerCent;
				maxResPerCent.addEventListener( "change", function(){ 
					this.ids = ["maxRes","maxResWood","maxResClay","maxResIron"];
					if( this.checked ) {	
						if( disableMaxRes.checked ) maxPerCent = "#A9A9A9"; else maxPerCent = "#000000";
						maxResValue = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).maxResPerCent;
						if( disableMaxRes.checked ) 
							maxPerCent = "<font id='maxResPerCentColor' color='#A9A9A9'>%</font>";
					} else { maxPerCent = "#f7eed3";
						maxResValue = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).maxRes};
					for( this.j=0 ; this.j<maxResValue.length ; this.j++ ) document.getElementById(this.ids[this.j]).value=maxResValue[this.j];
					document.getElementById("maxResPerCentColor").color=maxPerCent;
				}, false);
				tdTab[3].appendChild(lib.createTextNode(gui[lib.lang].resPerCent));
				tdTab[3].appendChild( document.createElement("br") );

				var uniMaxRes = tdTab[3].appendChild(document.createElement("input"));
				uniMaxRes.type="checkbox";
				uniMaxRes.id = "dssb_uniMaxRes";
				uniMaxRes.checked = this.checkboxes.uniMaxRes;
				uniMaxRes.addEventListener("click",function() {
					this.images = this.parentNode.parentNode.firstChild.getElementsByTagName("img");
					this.ids = ["maxRes","maxResWood","maxResClay","maxResIron"];
					this.images = this.parentNode.parentNode.firstChild.getElementsByTagName("img");
					for( this.i=0 ; this.i<this.images.length ; this.i++ ) {
						if( this.checked ) {
							this.images[this.i].src = lib.grayscale( this.images[this.i] );
							this.images[this.i].parentNode.className="";
						} else this.images[this.i].src = imgSrcs[this.i];
					} 
					for( this.j=0 ; this.j<this.ids.length; this.j++ ) document.getElementById(this.ids[this.j]).style.display = "none";
					if( !this.checked ) {
						this.images[0].parentNode.className="selected";
						document.getElementById(this.ids[1]).style.display = "";
					} else document.getElementById(this.ids[0]).style.display = "";
				}, false);
				tdTab[3].appendChild(lib.createTextNode(gui[lib.lang].uniMaxRes));

				tdTab[4].innerHTML = gui[lib.lang].distanceFilter;
				tdTab[5].setAttribute("style", "vertical-align:top;");
				tdTab[5].innerHTML = "<input type='text' id='distanceFilter' value='" 
				+ lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).distanceFilter+"'><font color='#f7eed3'>%</font>";

				var distanceCheck = tdTab[5].appendChild(document.createElement("input"));
				distanceCheck.type="checkbox";
				distanceCheck.id = "dssb_distanceFilterCheckbox";
				distanceCheck.setAttribute("style", "margin-left:1em;");
				distanceCheck.checked = this.checkboxes.distanceFilterCheckbox;
				tdTab[5].appendChild(lib.createTextNode(gui[lib.lang].distanceFilterCheckbox));  
				if( !distanceCheck.checked ) trTab[2].style.color = "#A9A9A9";
				distanceCheck.addEventListener( "click", function(){
					if( !this.checked ) this.parentNode.parentNode.style.color = "#A9A9A9"; else this.parentNode.parentNode.style.color = "#000000";
				}, false); 

				tdTab[6].innerHTML = gui[lib.lang].offerBorder;
				tdTab[7].setAttribute("style", "vertical-align:top;");
				tdTab[7].innerHTML = "<input type='text' id='offerBorder' value='" 
				+ lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).offerBorder + "'><font color='#f7eed3'>%</font>";

				var disableOfferBorder = tdTab[7].appendChild(document.createElement("input"));
				disableOfferBorder.type="checkbox";
				disableOfferBorder.id = "dssb_disableOfferBorder";
				disableOfferBorder.setAttribute("style", "margin-left:1em;");
				disableOfferBorder.checked = this.checkboxes.disableOfferBorder;
				tdTab[7].appendChild(lib.createTextNode(gui[lib.lang].disableOfferBorder));
				if( disableOfferBorder.checked ) trTab[3].style.color = "#A9A9A9";
				disableOfferBorder.addEventListener( "click", function(){
					if( this.checked ) this.parentNode.parentNode.style.color = "#A9A9A9"; else this.parentNode.parentNode.style.color = "#000000";
        			}, false);
					
				tdTab[8].innerHTML = gui[lib.lang].minSendBorder;
				tdTab[9].setAttribute("style", "vertical-align:top;");
				tdTab[9].innerHTML = "<input type='text' id='minSendBorder' value='" 
				+ lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).minSendBorder + "'><font color='#f7eed3'>%</font>";

				var disableMinSendBorder = tdTab[9].appendChild(document.createElement("input"));
				disableMinSendBorder.type="checkbox";
				disableMinSendBorder.id = "dssb_disableMinSendBorder";
				disableMinSendBorder.setAttribute("style", "margin-left:1em;");
				disableMinSendBorder.checked = this.checkboxes.disableMinSendBorder;
				tdTab[9].appendChild(lib.createTextNode(gui[lib.lang].disableMinSendBorder));
				if( disableMinSendBorder.checked ) trTab[4].style.color = "#A9A9A9";
				disableMinSendBorder.addEventListener( "click", function(){
					if( this.checked ) this.parentNode.parentNode.style.color = "#A9A9A9"; else this.parentNode.parentNode.style.color = "#000000";
        			}, false);

				var disableBadEQ = appendCheckbox(tdTab[10],tdTab[11],gui[lib.lang].badEq,"disableBadEQ",this.checkboxes.disableBadEQ);
				var disableSortSendResources = appendCheckbox(tdTab[12],tdTab[13],gui[lib.lang].sortSendResources,"disableSortSendResources",this.checkboxes.disableSortSendResources);
				var disableSendResources = appendCheckbox(tdTab[14],tdTab[15],gui[lib.lang].sendResources,"disableSendResources",this.checkboxes.disableSendResources);
				var disableLastVillage = appendCheckbox(tdTab[16],tdTab[17],gui[lib.lang].lastVillageMarket,"disableLastVillage",this.checkboxes.disableLastVillage);
				var disableConTimeM = appendCheckbox(tdTab[18],tdTab[19],gui[lib.lang].confirmTimeMarket,"disableConTimeM",this.checkboxes.disableConTimeM);			
				var disableAbsoluteDisplay = appendCheckbox(tdTab[20],tdTab[21],gui[lib.lang].absoluteDisplaySendResources,"disableAbsoluteDisplay",this.checkboxes.disableAbsoluteDisplay);
   			} else if( key == "tabOwnOffer" ) {
				if(  name =="tabOwnOffer" ) document.getElementById("dssb_tabOwnOffer_tab").style.display = "block";  
				var trTab = new Array(2);
			  	for( var i=0 ; i<trTab.length ; i++ )
		  			trTab[i] = document.getElementById("dssb_"+key+"_tab").appendChild( document.createElement("tr") );
			   	var tdTab = new Array(4);
			  	for( var i=0 ; i<tdTab.length ; i++ )
	  	   			tdTab[i] = trTab[Math.floor(i/2)].appendChild( document.createElement("td") );

				tdTab[0].innerHTML = gui[lib.lang].ownOfferBorder;
				tdTab[1].innerHTML = "<input type='text' id='ownOfferBorder' value='" 
				+ lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).ownOfferBorder + "'><font color='#f7eed3'>%</font>";
				
				var disableOwnOfferBorder = tdTab[1].appendChild(document.createElement("input"));
				disableOwnOfferBorder.type="checkbox";
				disableOwnOfferBorder.id = "dssb_disableOwnOfferBorder";
				disableOwnOfferBorder.setAttribute("style", "margin-left:1em;");
				disableOwnOfferBorder.checked = this.checkboxes.disableOwnOfferBorder;
				tdTab[1].appendChild(lib.createTextNode(gui[lib.lang].disableOfferBorder));
				if( disableOwnOfferBorder.checked ) trTab[0].style.color = "#A9A9A9";
				disableOwnOfferBorder.addEventListener( "click", function(){
					if( this.checked ) this.parentNode.parentNode.style.color = "#A9A9A9"; else this.parentNode.parentNode.style.color = "#000000";
        			}, false);

				var disableDoOwnOffer = appendCheckbox(tdTab[2],tdTab[3],gui[lib.lang].ownOffer,"disableDoOwnOffer",this.checkboxes.disableDoOwnOffer);
   			} else if( key == "tabForeignOffer" ) {
				if(  name =="tabForeignOffer" ) document.getElementById("dssb_tabForeignOffer_tab").style.display = "block";
   		    	var trTab = new Array(3);
			  	for( var i=0 ; i<trTab.length ; i++ )
		  			trTab[i] = document.getElementById("dssb_"+key+"_tab").appendChild( document.createElement("tr") );
			   	var tdTab = new Array(5);
			  	for( var i=0 ; i<tdTab.length ; i++ )
	  	   			tdTab[i] = trTab[Math.floor(i/2)].appendChild( document.createElement("td") );
	
				var disableMaxButtons = appendCheckbox(tdTab[0],tdTab[1],gui[lib.lang].maxButtons,"disableMaxButtons",this.checkboxes.disableMaxButtons);
				var disableFadeOutOffersEnemies = appendCheckbox(tdTab[2],tdTab[3],gui[lib.lang].fadeOutOffersEnemies,"disableFadeOutOffersEnemies",this.checkboxes.disableFadeOutOffersEnemies);

				if( !lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).allyEnemies )
					var dot = '/graphic/dots/red.png?1';
				else var dot = '/graphic/dots/green.png?1';
				tdTab[4].innerHTML="   <img style='margin-left:1em' src=" + dot + ">"; 
				tdTab[4].colSpan = "2";

				var linkContracts = tdTab[4].appendChild(document.createElement("a"));
				linkContracts.innerHTML = gui[lib.lang].readInAllyContracts;
				linkContracts.setAttribute("style", "margin-left:0.5em;");
				linkContracts.href = "javascript:;";
				linkContracts.addEventListener( "click", function(){ 
					this.checkboxes = new newCheckboxes();
					if( this.checkboxes.disableFadeOutOffersEnemies ) 
						alert( gui[lib.lang].readingAllyContractsIsDisabled );
					else {
						this.checkboxes.readInContracts=true;
						lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,this.checkboxes);
						window.location.href= lib.game_data.link_base_pure.replace("screen=","screen=ally&mode=contracts").replace("amp;","");
					}
				}, false);
			} else if( key == "tabNeighbourVillages" ) {
				if(  name =="tabNeighbourVillages" ) document.getElementById("dssb_tabNeighbourVillages_tab").style.display = "block";
				var trTab = new Array(7);
			  	for( var i=0 ; i<trTab.length ; i++ )
		  			trTab[i] = document.getElementById("dssb_"+key+"_tab").appendChild( document.createElement("tr") );
			   	var tdTab = new Array(14);
			  	for( var i=0 ; i<tdTab.length ; i++ )
	  	   			tdTab[i] = trTab[Math.floor(i/2)].appendChild( document.createElement("td") );
					
				var filter = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings);
				tdTab[0].innerHTML = gui[lib.lang].sizeNeighourVillageImages;
				tdTab[1].innerHTML = "<input type='text' id='sizeNeighourVillageImages' value='" 
				+ parseInt(filter.imgSize,10) + "'>px";
				
				tdTab[2].innerHTML = gui[lib.lang].sizeNeighbourVillageFonts;
				tdTab[3].innerHTML = "<input type='text' id='sizeNeighbourVillageFonts' value='" 
				+ parseFloat(filter.fontSize,10) + "'>em";
				
				tdTab[4].innerHTML = gui[lib.lang].marginTopNeighbourVillages;
				tdTab[5].innerHTML = "<input type='text' id='marginTopNeighbourVillages' value='" 
				+ parseInt(filter.marginTop,10) + "'>px";
				
				var disableUseOfTroops = appendCheckbox(tdTab[6],tdTab[7],gui[lib.lang].disableUseOfTroops,"disableUseOfTroops",this.checkboxes.disableUseOfTroops);
				var disableUseOfRessis = appendCheckbox(tdTab[8],tdTab[9],gui[lib.lang].disableUseOfRessis,"disableUseOfRessis",this.checkboxes.disableUseOfRessis);
				var neighbourVillagesResAbsolute = appendCheckbox(tdTab[10],tdTab[11],gui[lib.lang].neighbourVillagesResAbsolute,"neighbourVillagesResAbsolute",this.checkboxes.neighbourVillagesResAbsolute);
				var disableNeighbourVillages = appendCheckbox(tdTab[12],tdTab[13],gui[lib.lang].neighbourVillages,"disableNeighbourVillages",this.checkboxes.disableNeighbourVillages);	
			} else if( key == "tabProductionTable" ) {
				if(  name =="tabProductionTable" ) document.getElementById("dssb_tabProductionTable_tab").style.display = "block";
				var trTab = new Array(7);
			  	for( var i=0 ; i<trTab.length ; i++ )
		  			trTab[i] = document.getElementById("dssb_"+key+"_tab").appendChild( document.createElement("tr") );
			   	var tdTab = new Array(14);
			  	for( var i=0 ; i<tdTab.length ; i++ )
	  	   			tdTab[i] = trTab[Math.floor(i/2)].appendChild( document.createElement("td") );
			
				if( this.checkboxes.changePointsFilter )
					tdTab[0].innerHTML = gui[lib.lang].pointsFilterTo;
				else tdTab[0].innerHTML = gui[lib.lang].pointsFilterFrom;
				tdTab[1].setAttribute("style", "vertical-align:top;");
				tdTab[1].innerHTML = "<input type='text' id='pointsFilter' value='" 
				+ lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).pointsFilter + "'><font color='#f7eed3'>%</font>";
			
				var disablePointsFilter = tdTab[1].appendChild(document.createElement("input"));
				disablePointsFilter.type="checkbox";
				disablePointsFilter.id = "dssb_disablePointsFilter";
				disablePointsFilter.setAttribute("style", "margin-left:1em;");
  				disablePointsFilter.checked = this.checkboxes.disablePointsFilter;
				tdTab[1].appendChild(lib.createTextNode(gui[lib.lang].disableFilter));
				if( !this.checkboxes.disableSendResources ) {
					if( disablePointsFilter.checked ) trTab[0].style.color = "#A9A9A9";
					disablePointsFilter.addEventListener( "click", function(){if( this.checked ) this.parentNode.parentNode.style.color = "#A9A9A9";
						else this.parentNode.parentNode.style.color = "#000000";}, false);  
				} else trTab[0].style.color = "#A9A9A9";

				var changePointsFilter = tdTab[1].appendChild(document.createElement("input"));
				changePointsFilter.type="checkbox";
				changePointsFilter.id = "dssb_changePointsFilter";
				changePointsFilter.setAttribute("style", "margin-left:2em;");
  				changePointsFilter.checked = this.checkboxes.changePointsFilter;
				changePointsFilter.addEventListener( "click", function(){ 
					if( this.checked ) this.parentNode.parentNode.firstChild.innerHTML = gui[lib.lang].pointsFilterTo;
					else this.parentNode.parentNode.firstChild.innerHTML = gui[lib.lang].pointsFilterFrom;}, false);    

				tdTab[1].appendChild(lib.createTextNode(gui[lib.lang].changePointsFilter)); 
				
				tdTab[2].setAttribute("style", "vertical-align:top;");
				if( this.checkboxes.changeFarmFilter )
					tdTab[2].innerHTML = gui[lib.lang].farmFilterTo;
				else tdTab[2].innerHTML = gui[lib.lang].farmFilterFrom;
				tdTab[3].setAttribute("style", "vertical-align:top;");
				tdTab[3].innerHTML = "<input type='text' id='farmFilter' value='" 
				+ lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).farmFilter + "'><font color='#f7eed3'>%</font>";

				var disableFarmFilter = tdTab[3].appendChild(document.createElement("input"));
				disableFarmFilter.type="checkbox";
				disableFarmFilter.id = "dssb_disableFarmFilter";
				disableFarmFilter.setAttribute("style", "margin-left:1em;");
  				disableFarmFilter.checked = this.checkboxes.disableFarmFilter;
				tdTab[3].appendChild(lib.createTextNode(gui[lib.lang].disableFilter));
				if( !this.checkboxes.disableSendResources ) {
					if( disableFarmFilter.checked ) trTab[1].style.color = "#A9A9A9";
					disableFarmFilter.addEventListener( "click", function(){if( this.checked ) this.parentNode.parentNode.style.color = "#A9A9A9";
						else this.parentNode.parentNode.style.color = "#000000";}, false); 
				} else trTab[1].style.color = "#A9A9A9";
				
				var changeFarmFilter = tdTab[3].appendChild(document.createElement("input"));
				changeFarmFilter.type="checkbox";
				changeFarmFilter.id = "dssb_changeFarmFilter";
				changeFarmFilter.setAttribute("style", "margin-left:2em;");
  				changeFarmFilter.checked = this.checkboxes.changeFarmFilter;
				changeFarmFilter.addEventListener( "change", function(){ 
				if( this.checked ) this.parentNode.parentNode.firstChild.innerHTML = gui[lib.lang].farmFilterTo;
					else this.parentNode.parentNode.firstChild.innerHTML = gui[lib.lang].farmFilterFrom;}, false);    
				tdTab[3].appendChild(lib.createTextNode(gui[lib.lang].changeFarmFilter));

				var disableFilterLines = appendCheckbox(tdTab[4],tdTab[5],gui[lib.lang].filterLines,"disableFilterLines",this.checkboxes.disableFilterLines);
				var disableSumRessis = appendCheckbox(tdTab[6],tdTab[7],gui[lib.lang].sumRessis,"disableSumRessis",this.checkboxes.disableSumRessis);
				var sumUpRessisAbsolute = appendCheckbox(tdTab[8],tdTab[9],gui[lib.lang].sumUpRessisAbsolute,"sumUpRessisAbsolute",this.checkboxes.sumUpRessisAbsolute);
				var disableCombineUnitImgs = appendCheckbox(tdTab[10],tdTab[11],gui[lib.lang].disableCombineUnitImgs,"disableCombineUnitImgs",this.checkboxes.disableCombineUnitImgs);
				var disableSaveOrder = appendCheckbox(tdTab[12],tdTab[13],gui[lib.lang].saveOrder,"disableSaveOrder",this.checkboxes.disableSaveOrder);
			} else if( key == "tabDsLoyalty" ) {
				if(  name =="tabDsLoyalty" ) document.getElementById("dssb_tabDsLoyalty_tab").style.display = "block";
				var trTab = new Array(8);
			   	for( var i=0 ; i<trTab.length ; i++ )
		   			trTab[i] = document.getElementById("dssb_"+key+"_tab").appendChild( document.createElement("tr") );
		   	   	var tdTab = new Array(16);
		   	   	for( var i=0 ; i<tdTab.length ; i++ )
		   	   		tdTab[i] = trTab[Math.floor(i/2)].appendChild( document.createElement("td") );
		
				var disableDSLoyalty = appendCheckbox(tdTab[0],tdTab[1],gui[lib.lang].dsLoyalty.dsLoyalty,"disableDSLoyalty",this.checkboxes.disableDSLoyalty);
				var disableLoyaltyMain = appendCheckbox(tdTab[2],tdTab[3],gui[lib.lang].dsLoyalty.showMain,"disableLoyaltyMain",this.checkboxes.disableShowLoyalty[0]);
				var disableLoyaltyCombined = appendCheckbox(tdTab[4],tdTab[5],gui[lib.lang].dsLoyalty.showCombined,"disableLoyaltyCombined",this.checkboxes.disableShowLoyalty[1]);
				var disableLoyaltyProduction = appendCheckbox(tdTab[6],tdTab[7],gui[lib.lang].dsLoyalty.showProduction,"disableLoyaltyProduction",this.checkboxes.disableShowLoyalty[2]);
				var disableLoyaltyBuildings = appendCheckbox(tdTab[8],tdTab[9],gui[lib.lang].dsLoyalty.showBuildings,"disableLoyaltyBuildings",this.checkboxes.disableShowLoyalty[3]);
				var disableLoyaltyInfoVill = appendCheckbox(tdTab[10],tdTab[11],gui[lib.lang].dsLoyalty.showInfoVillage,"disableLoyaltyInfoVill",this.checkboxes.disableShowLoyalty[4]);
				var disableLoyaltyMap = appendCheckbox(tdTab[12],tdTab[13],gui[lib.lang].dsLoyalty.showMap,"disableLoyaltyMap",this.checkboxes.disableShowLoyalty[5]);
				
				tdTab[14].innerHTML = gui[lib.lang].dsLoyalty.dsLoyaltyColor;
				var selectLoyaltyColor = tdTab[15].appendChild( document.createElement("select") );
				selectLoyaltyColor.id = "dssb_selectLoyaltyColor";
				for( var i=0 ; i<gui[lib.lang].dsLoyalty.loyaltyColor.length ; i++ ) {
					selectLoyaltyColor.options.add( new Option( gui[lib.lang].dsLoyalty.loyaltyColor[i], i, i==this.checkboxes.disableLoyaltyColor ? true : false ) );
				}
				selectLoyaltyColor.selectedIndex = this.checkboxes.disableLoyaltyColor;
		   } else if( key == "tabAccDualForum" ) {
				if(  name =="tabAccDualForum" ) document.getElementById("dssb_tabAccDualForum_tab").style.display = "block";
			    var trTab = new Array(1);
			   	for( var i=0 ; i<trTab.length ; i++ )
		   			trTab[i] = document.getElementById("dssb_"+key+"_tab").appendChild( document.createElement("tr") );
		   	   	var tdTab = new Array(2);
		   	   	for( var i=0 ; i<tdTab.length ; i++ )
		   	   		tdTab[i] = trTab[Math.floor(i/2)].appendChild( document.createElement("td") ); 
		
				var disableDsAccDualForum = appendCheckbox(tdTab[0],tdTab[1],gui[lib.lang].dsAccDualForum,"disableDsAccDualForum",this.checkboxes.disableDsAccDualForum);
		   } else if( key == "tabDsRealCharts" ) {
				if(  name =="tabDsRealCharts" ) document.getElementById("dssb_tabDsRealCharts_tab").style.display = "block";
				var trTab = new Array(7);
			   	for( var i=0 ; i<trTab.length ; i++ )
		     		trTab[i] = document.getElementById("dssb_"+key+"_tab").appendChild( document.createElement("tr") );
		   		var tdTab = new Array(14);
	  	   		for( var i=0 ; i<tdTab.length ; i++ )
	   	   			tdTab[i] = trTab[Math.floor(i/2)].appendChild( document.createElement("td") );

				var disableDsRealCharts = appendCheckbox(tdTab[0],tdTab[1],gui[lib.lang].dsRealCharts,"disableDsRealCharts",this.checkboxes.disableDsRealCharts);
				var disableChartPlayer = appendCheckbox(tdTab[2],tdTab[3],gui[lib.lang].disableChartPlayer,"disableChartPlayer",this.checkboxes.settingsDsRealCharts[0]);
				var disableBashPlayer = appendCheckbox(tdTab[4],tdTab[5],gui[lib.lang].disableBashPlayer,"disableBashPlayer",this.checkboxes.settingsDsRealCharts[1]);
				var disableChartAlly = appendCheckbox(tdTab[6],tdTab[7],gui[lib.lang].disableChartAlly,"disableChartAlly",this.checkboxes.settingsDsRealCharts[2]);
				var disableBashAlly = appendCheckbox(tdTab[8],tdTab[9],gui[lib.lang].disableBashAlly,"disableBashAlly",this.checkboxes.settingsDsRealCharts[3]);
				var disableLinkToFile = appendCheckbox(tdTab[10],tdTab[11],gui[lib.lang].disableLinkToFile,"disableLinkToFile",this.checkboxes.settingsDsRealCharts[4]);
				var disableLinkToMap = appendCheckbox(tdTab[12],tdTab[13],gui[lib.lang].disableLinkToMap,"disableLinkToMap",this.checkboxes.settingsDsRealCharts[5]);			
			} else if( key == "tabDsMoveReports" ) {
					if(  name =="tabDsMoveReports" ) document.getElementById("dssb_tabDsMoveReports_tab").style.display = "block";
					var trTab = new Array(3);
					for( var i=0 ; i<trTab.length ; i++ )
						trTab[i] = document.getElementById("dssb_"+key+"_tab").appendChild( document.createElement("tr") );
					var tdTab = new Array(3);
					for( var i=0 ; i<tdTab.length ; i++ )   
						tdTab[i] = trTab[i].appendChild( document.createElement("td") );	

					var disableDsMoveReports = appendCheckbox(tdTab[0],tdTab[0],gui[lib.lang].dsMoveReports.gui.dsMoveReports+"<span style=\"padding-right:20px;\"></span>","disableDsMoveReports",this.checkboxes.disableDsMoveReports);
					
					var img = tdTab[1].appendChild( document.createElement("img") );
					img.src = (typeof(this.checkboxes.reportGroups) == "boolean" ? "/graphic/dots/red.png?1" : "/graphic/dots/green.png?1");	
					tdTab[1].appendChild( lib.createTextNode(gui[lib.lang].dsMoveReports.gui.reportsReadedRed) );	
					var a = tdTab[1].appendChild( document.createElement("a") );
					a.href = lib.game_data.link_base_pure.replace("screen=","screen=report");
					a.innerHTML = gui[lib.lang].dsMoveReports.gui.readReportFolders;
					a.addEventListener("click",function() {
						checkboxes.reportGroups = false;
						lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
					}, false);
					tdTab[1].appendChild( lib.createTextNode(")") );
						
					var section = tdTab[2].appendChild( document.createElement("table") ); 
					section.style.border = "1px solid rgb(222, 211, 185)";
					section.style.width = "700px";
					section.style.whiteSpace = "noWrap";
					var sectionTr = section.appendChild( document.createElement("tr") );
					var sectionTh = sectionTr.appendChild( document.createElement("th") );
					sectionTh.colSpan = 2;
					sectionTh.innerHTML = gui[lib.lang].dsMoveReports.gui.groupAttribution;
										
					this.i = 0;
					for( var report in gui[lib.lang].dsMoveReports.gui.reportGroup ) {
						sectionTr = section.appendChild( document.createElement("tr") );
						sectionTd = sectionTr.appendChild( document.createElement("td") );
						sectionTd.width = "100%";
						var select = sectionTd.appendChild( document.createElement("select") );
						select.id = "dssb_dsMoveReports_"+report;
						for( this.option=0 ; this.option < this.checkboxes.reportGroups.length ; this.option++ ) {
							select.options.add( new Option(this.checkboxes.reportGroups[this.option],this.option,(this.option==checkboxes.selectedGroups[this.i]?true:false) ) );
						}
						var span = sectionTd.appendChild( document.createElement("span") );
						span.style.paddingRight = "20px";
						sectionTd.innerHTML += gui[lib.lang].dsMoveReports.gui.reportGroup[report];
						sectionTd = sectionTr.appendChild( document.createElement("td") );
						sectionTd.style.textAlign = "right";
						var input = sectionTd.appendChild( document.createElement("input") );
						input.type = "checkbox";
						input.checked = this.checkboxes.disableReportButtons[this.i];
						input.id = "dssb_dsMoveReports_disable_"+report;
						if( input.checked ) sectionTr.style.color = "#A9A9A9";
						input.addEventListener( "click", function(){
							if( this.checked ) this.parentNode.parentNode.style.color = "#A9A9A9"; else this.parentNode.parentNode.style.color = "#000000";
				        	}, false);
						sectionTd.appendChild(lib.createTextNode(gui[lib.lang].disableFilter));
						this.i++;
					}
			} else if( key == "tabHotkeys" ) {
					if(  name =="tabHotkeys" ) document.getElementById("dssb_tabHotkeys_tab").style.display = "block";
					var trTab = new Array(3);
					for( var i=0 ; i<trTab.length ; i++ )
						trTab[i] = document.getElementById("dssb_"+key+"_tab").appendChild( document.createElement("tr") );
					var tdTab = new Array(5);
					for( var i=0 ; i<tdTab.length ; i++ )   
						tdTab[i] = document.createElement("td");
					
					trTab[0].appendChild( tdTab[0] );				
					trTab[1].appendChild( tdTab[1] );				
					var disableHotkeys = appendCheckbox(tdTab[0],tdTab[0],gui[lib.lang].disableHotkeys+" ","disableHotkeys",this.checkboxes.disableHotkeys);
					tdTab[1].colSpan = "1";
					var table = tdTab[1].appendChild( document.createElement("table") );
					table.style.border = "1px solid rgb(222, 211, 185)";
					table.style.width = "100%";
					table.style.whiteSpace = "noWrap";

					var trTableTab = new Array(4);
					for( var i=0 ; i<trTableTab.length ; i++ ) trTableTab[i] = table.appendChild( document.createElement("tr") );
					var thTableTab = new Array(2);
					for( var i=0 ; i<thTableTab.length ; i++ ) {thTableTab[i] = document.createElement("th"); thTableTab[i].colSpan="2";}
					var tdTableTab = new Array(2);		
					trTableTab[0].appendChild( thTableTab[0] );
					thTableTab[0].style.width = "100%";
					thTableTab[0].innerHTML = gui[lib.lang].taskForHotkeys;
					
					tdTableTab[0] = trTableTab[1].appendChild( document.createElement("td") );
					tdTableTab[0] .colSpan = "2";

					trTableTab[2].appendChild( thTableTab[1] );
					thTableTab[1].colSpan = "2";
					tdTableTab[1] = trTableTab[3].appendChild( document.createElement("td") );

					var hotkeysTabsSettings = function() {
						for( var x in gui[lib.lang].hotkeysTabTitle ) {
							if( x == "tabGlobalHotkeys" ) {
								var trHotkeyTab = new Array(8);
								for( var i=0 ; i<trHotkeyTab.length ; i++ )
									trHotkeyTab[i] = document.createElement("tr");
								var tdHotkeyTab = new Array(16);
								for( var i=0 ; i<tdHotkeyTab.length ; i++ )   
									tdHotkeyTab[i] = document.createElement("td");

								tdHotkeyTab[0].innerHTML = gui[lib.lang].settingsKeys.disableAll.globalHotkeys;
								var disableGlobalHotkeys = tdHotkeyTab[1].appendChild(document.createElement("input"));
								disableGlobalHotkeys.type = "checkbox";
								disableGlobalHotkeys.checked = hotkeys.disableAll.globalHotkeys;
								tdHotkeyTab[1].appendChild(lib.createTextNode(gui[lib.lang].disableFilter));
								if( disableGlobalHotkeys.checked ) trHotkeyTab[0].style.color = "#A9A9A9";
								disableGlobalHotkeys.addEventListener( "click", function(){
									if( this.checked ) {this.parentNode.parentNode.style.color = "#A9A9A9"; hotkeys.disableAll.globalHotkeys=true;}
									else {this.parentNode.parentNode.style.color = "#000000"; hotkeys.disableAll.globalHotkeys=false;}
        						}, false);

								this.i = 1;
								for( var hotkeyTab in hotkeys.keys.globalHotkeys ) {
									tdHotkeyTab[this.i*2].innerHTML = gui[lib.lang].settingsKeys.globalHotkeys[hotkeyTab];
									this.button = tdHotkeyTab[(this.i*2)+1].appendChild( document.createElement("input") );
									lib.hotkeyInput(this.button,hotkeyTab,"globalHotkeys",gui[lib.lang].disableFilter,trHotkeyTab[this.i]);
									this.i++;
								}

								for( var i=0 ; i<tdHotkeyTab.length ; i++ )
									trHotkeyTab[Math.floor(i/2)].appendChild(tdHotkeyTab[i]);		
								for( var i=0 ; i<trHotkeyTab.length ; i++ )
									document.getElementById("dssb_hotkeys_tabGlobalHotkeys_tab").appendChild(trHotkeyTab[i]);
							} else if( x == "tabKeysPlace" ) {
								var trHotkeyTab = new Array(11);
								for( var i=0 ; i<trHotkeyTab.length ; i++ )
									trHotkeyTab[i] = document.createElement("tr");
								var tdHotkeyTab = new Array(22);
								for( var i=0 ; i<tdHotkeyTab.length ; i++ )   
									tdHotkeyTab[i] = document.createElement("td");
									
								tdHotkeyTab[0].innerHTML = gui[lib.lang].settingsKeys.disableAll.keysPlace;
								var disableKeysPlace = tdHotkeyTab[1].appendChild(document.createElement("input"));
								disableKeysPlace.type = "checkbox";
								disableKeysPlace.checked = hotkeys.disableAll.keysPlace;
								tdHotkeyTab[1].appendChild(lib.createTextNode(gui[lib.lang].disableFilter));
								if( disableKeysPlace.checked ) trHotkeyTab[0].style.color = "#A9A9A9";
								disableKeysPlace.addEventListener( "click", function(){
									if( this.checked ) {this.parentNode.parentNode.style.color = "#A9A9A9"; hotkeys.disableAll.keysPlace=true;}
									else {this.parentNode.parentNode.style.color = "#000000"; hotkeys.disableAll.keysPlace=false;}
	        					}, false);
									
								this.i = 1;
								for( var hotkeyTab in hotkeys.keys.keysPlace ) {
									tdHotkeyTab[this.i*2].innerHTML = gui[lib.lang].settingsKeys.keysPlace[hotkeyTab];
									this.button = tdHotkeyTab[(this.i*2)+1].appendChild( document.createElement("input") );
									lib.hotkeyInput(this.button,hotkeyTab,"keysPlace",gui[lib.lang].disableFilter,trHotkeyTab[this.i]);
									this.i++;
								}
										
								for( var i=0 ; i<tdHotkeyTab.length ; i++ )
									trHotkeyTab[Math.floor(i/2)].appendChild(tdHotkeyTab[i]);		
								for( var i=0 ; i<trHotkeyTab.length ; i++ )
									document.getElementById("dssb_hotkeys_tabKeysPlace_tab").appendChild(trHotkeyTab[i]);
							} else if( x == "tabKeysDsMoveReports" ) {
								var trHotkeyTab = new Array(11);
								for( var i=0 ; i<trHotkeyTab.length ; i++ )
									trHotkeyTab[i] = document.createElement("tr");
								var tdHotkeyTab = new Array(22);
								for( var i=0 ; i<tdHotkeyTab.length ; i++ )   
									tdHotkeyTab[i] = document.createElement("td");
									
								tdHotkeyTab[0].innerHTML = gui[lib.lang].settingsKeys.disableAll.keysDsMoveReports;
								var disableKeysDsMoveReports = tdHotkeyTab[1].appendChild(document.createElement("input"));
								disableKeysDsMoveReports.type = "checkbox";
								disableKeysDsMoveReports.checked = hotkeys.disableAll.keysDsMoveReports;
								tdHotkeyTab[1].appendChild(lib.createTextNode(gui[lib.lang].disableFilter));
								if( disableKeysDsMoveReports.checked ) trHotkeyTab[0].style.color = "#A9A9A9";
								disableKeysDsMoveReports.addEventListener( "click", function(){
									if( this.checked ) {this.parentNode.parentNode.style.color = "#A9A9A9"; hotkeys.disableAll.keysDsMoveReports=true;}
									else {this.parentNode.parentNode.style.color = "#000000"; hotkeys.disableAll.keysDsMoveReports=false;}
		        				}, false);
									
								this.i = 1;
								for( var hotkeyTab in hotkeys.keys.keysDsMoveReports ) {
									tdHotkeyTab[this.i*2].innerHTML = gui[lib.lang].settingsKeys.keysDsMoveReports[hotkeyTab];
									this.button = tdHotkeyTab[(this.i*2)+1].appendChild( document.createElement("input") );
									lib.hotkeyInput(this.button,hotkeyTab,"keysDsMoveReports",gui[lib.lang].disableFilter,trHotkeyTab[this.i]);
									this.i++;
								}
									
								for( var i=0 ; i<tdHotkeyTab.length ; i++ )
									trHotkeyTab[Math.floor(i/2)].appendChild(tdHotkeyTab[i]);		
								for( var i=0 ; i<trHotkeyTab.length ; i++ )
									document.getElementById("dssb_hotkeys_tabKeysDsMoveReports_tab").appendChild(trHotkeyTab[i]);
							} else if( x == "tabKeysMarketSendRes" ) {
								var trHotkeyTab = new Array(10);
								for( var i=0 ; i<trHotkeyTab.length ; i++ )
									trHotkeyTab[i] = document.createElement("tr");
								var tdHotkeyTab = new Array(20);
								for( var i=0 ; i<tdHotkeyTab.length ; i++ )   
									tdHotkeyTab[i] = document.createElement("td");
									
								tdHotkeyTab[0].innerHTML = gui[lib.lang].settingsKeys.disableAll.keysMarketSendRes;
								var disableKeysMarketSendRes = tdHotkeyTab[1].appendChild(document.createElement("input"));
								disableKeysMarketSendRes.type = "checkbox";
								disableKeysMarketSendRes.checked = hotkeys.disableAll.keysMarketSendRes;
								tdHotkeyTab[1].appendChild(lib.createTextNode(gui[lib.lang].disableFilter));
								if( disableKeysMarketSendRes.checked ) trHotkeyTab[0].style.color = "#A9A9A9";
								disableKeysMarketSendRes.addEventListener( "click", function(){
									if( this.checked ) {this.parentNode.parentNode.style.color = "#A9A9A9"; hotkeys.disableAll.keysMarketSendRes=true;}
									else {this.parentNode.parentNode.style.color = "#000000"; hotkeys.disableAll.keysMarketSendRes=false;}
			        			}, false);
									
								this.i = 1;
								for( var hotkeyTab in hotkeys.keys.keysMarketSendRes ) {
									tdHotkeyTab[this.i*2].innerHTML = gui[lib.lang].settingsKeys.keysMarketSendRes[hotkeyTab];
									this.button = tdHotkeyTab[(this.i*2)+1].appendChild( document.createElement("input") );
									lib.hotkeyInput(this.button,hotkeyTab,"keysMarketSendRes",gui[lib.lang].disableFilter,trHotkeyTab[this.i]);
									this.i++;
								}
								
								for( var i=0 ; i<tdHotkeyTab.length ; i++ )
									trHotkeyTab[Math.floor(i/2)].appendChild(tdHotkeyTab[i]);		
								for( var i=0 ; i<trHotkeyTab.length ; i++ )
									document.getElementById("dssb_hotkeys_tabKeysMarketSendRes_tab").appendChild(trHotkeyTab[i]);
							} else if( x == "tabKeysMarketOwnOffer" ) {
								var trHotkeyTab = new Array(3);
								for( var i=0 ; i<trHotkeyTab.length ; i++ )
									trHotkeyTab[i] = document.createElement("tr");
								var tdHotkeyTab = new Array(6);
								for( var i=0 ; i<tdHotkeyTab.length ; i++ )   
									tdHotkeyTab[i] = document.createElement("td");
									
								tdHotkeyTab[0].innerHTML = gui[lib.lang].settingsKeys.disableAll.keysMarketOwnOffer;
								var disableKeysMarketOwnOffer = tdHotkeyTab[1].appendChild(document.createElement("input"));
								disableKeysMarketOwnOffer.type = "checkbox";
								disableKeysMarketOwnOffer.checked = hotkeys.disableAll.keysMarketOwnOffer;
								tdHotkeyTab[1].appendChild(lib.createTextNode(gui[lib.lang].disableFilter));
								if( disableKeysMarketOwnOffer.checked ) trHotkeyTab[0].style.color = "#A9A9A9";
								disableKeysMarketOwnOffer.addEventListener( "click", function(){
									if( this.checked ) {this.parentNode.parentNode.style.color = "#A9A9A9"; hotkeys.disableAll.keysMarketOwnOffer=true;}
									else {this.parentNode.parentNode.style.color = "#000000"; hotkeys.disableAll.keysMarketOwnOffer=false;}
				        		}, false);
									
								this.i = 1;
								for( var hotkeyTab in hotkeys.keys.keysMarketOwnOffer ) {
									tdHotkeyTab[this.i*2].innerHTML = gui[lib.lang].settingsKeys.keysMarketOwnOffer[hotkeyTab];
									this.button = tdHotkeyTab[(this.i*2)+1].appendChild( document.createElement("input") );
									lib.hotkeyInput(this.button,hotkeyTab,"keysMarketOwnOffer",gui[lib.lang].disableFilter,trHotkeyTab[this.i]);
									this.i++;
								}
								
								for( var i=0 ; i<tdHotkeyTab.length ; i++ )
									trHotkeyTab[Math.floor(i/2)].appendChild(tdHotkeyTab[i]);		
								for( var i=0 ; i<trHotkeyTab.length ; i++ )
									document.getElementById("dssb_hotkeys_tabKeysMarketOwnOffer_tab").appendChild(trHotkeyTab[i]);
							} else if( x == "tabKeysMarketOtherOffer" ) {
								var trHotkeyTab = new Array(11);
								for( var i=0 ; i<trHotkeyTab.length ; i++ )
									trHotkeyTab[i] = document.createElement("tr");
								var tdHotkeyTab = new Array(22);
								for( var i=0 ; i<tdHotkeyTab.length ; i++ )   
									tdHotkeyTab[i] = document.createElement("td");
									
								tdHotkeyTab[0].innerHTML = gui[lib.lang].settingsKeys.disableAll.keysMarketOtherOffer;
								var disableKeysMarketOtherOffer = tdHotkeyTab[1].appendChild(document.createElement("input"));
								disableKeysMarketOtherOffer.type = "checkbox";
								disableKeysMarketOtherOffer.checked = hotkeys.disableAll.keysMarketOtherOffer;
								tdHotkeyTab[1].appendChild(lib.createTextNode(gui[lib.lang].disableFilter));
								if( disableKeysMarketOtherOffer.checked ) trHotkeyTab[0].style.color = "#A9A9A9";
								disableKeysMarketOtherOffer.addEventListener( "click", function(){
									if( this.checked ) {this.parentNode.parentNode.style.color = "#A9A9A9"; hotkeys.disableAll.keysMarketOtherOffer=true;}
									else {this.parentNode.parentNode.style.color = "#000000"; hotkeys.disableAll.keysMarketOtherOffer=false;}
					        	}, false);
								
								this.i = 1;
								for( var hotkeyTab in hotkeys.keys.keysMarketOtherOffer ) {
									tdHotkeyTab[this.i*2].innerHTML = gui[lib.lang].settingsKeys.keysMarketOtherOffer[hotkeyTab];
									this.button = tdHotkeyTab[(this.i*2)+1].appendChild( document.createElement("input") );
									lib.hotkeyInput(this.button,hotkeyTab,"keysMarketOtherOffer",gui[lib.lang].disableFilter,trHotkeyTab[this.i]);
									this.i++;
								}

								for( var i=0 ; i<tdHotkeyTab.length ; i++ )
									trHotkeyTab[Math.floor(i/2)].appendChild(tdHotkeyTab[i]);		
								for( var i=0 ; i<trHotkeyTab.length ; i++ )
									document.getElementById("dssb_hotkeys_tabKeysMarketOtherOffer_tab").appendChild(trHotkeyTab[i]);						
							} else if( x == "tabTransportOverview" ) {
								var trHotkeyTab = new Array(2);
								for( var i=0 ; i<trHotkeyTab.length ; i++ )
									trHotkeyTab[i] = document.createElement("tr");
								var tdHotkeyTab = new Array(4);
								for( var i=0 ; i<tdHotkeyTab.length ; i++ )   
									tdHotkeyTab[i] = document.createElement("td");
									
								tdHotkeyTab[0].innerHTML = gui[lib.lang].settingsKeys.disableAll.keysTransportOverview;
								var disableKeysTransportOverview = tdHotkeyTab[1].appendChild(document.createElement("input"));
								disableKeysTransportOverview.type = "checkbox";
								disableKeysTransportOverview.checked = hotkeys.disableAll.keysTransportOverview;
								tdHotkeyTab[1].appendChild(lib.createTextNode(gui[lib.lang].disableFilter));
								if( disableKeysTransportOverview.checked ) trHotkeyTab[0].style.color = "#A9A9A9";
								disableKeysTransportOverview.addEventListener( "click", function(){
									if( this.checked ) {this.parentNode.parentNode.style.color = "#A9A9A9"; hotkeys.disableAll.keysTransportOverview=true;}
									else {this.parentNode.parentNode.style.color = "#000000"; hotkeys.disableAll.keysTransportOverview=false;}
		        				}, false);
									
								this.i = 1;
								for( var hotkeyTab in hotkeys.keys.keysTransportOverview ) {
									tdHotkeyTab[this.i*2].innerHTML = gui[lib.lang].settingsKeys.keysTransportOverview[hotkeyTab];
									this.button = tdHotkeyTab[(this.i*2)+1].appendChild( document.createElement("input") );
									lib.hotkeyInput(this.button,hotkeyTab,"keysTransportOverview",gui[lib.lang].disableFilter,trHotkeyTab[this.i]);
									this.i++;
								}
																	
								for( var i=0 ; i<tdHotkeyTab.length ; i++ )
									trHotkeyTab[Math.floor(i/2)].appendChild(tdHotkeyTab[i]);		
								for( var i=0 ; i<trHotkeyTab.length ; i++ )
									document.getElementById("dssb_hotkeys_tabTransportOverview_tab").appendChild(trHotkeyTab[i]);		
							} else if( x == "tabKeysReports" ) {
								var trHotkeyTab = new Array(7);
								for( var i=0 ; i<trHotkeyTab.length ; i++ )
									trHotkeyTab[i] = document.createElement("tr");
								var tdHotkeyTab = new Array(14);
								for( var i=0 ; i<tdHotkeyTab.length ; i++ )   
									tdHotkeyTab[i] = document.createElement("td");
									
								tdHotkeyTab[0].innerHTML = gui[lib.lang].settingsKeys.disableAll.keysReports;
								var disableKeysReports = tdHotkeyTab[1].appendChild(document.createElement("input"));
								disableKeysReports.type = "checkbox";
								disableKeysReports.checked = hotkeys.disableAll.keysReports;
								tdHotkeyTab[1].appendChild(lib.createTextNode(gui[lib.lang].disableFilter));
								if( disableKeysReports.checked ) trHotkeyTab[0].style.color = "#A9A9A9";
								disableKeysReports.addEventListener( "click", function(){
									if( this.checked ) {this.parentNode.parentNode.style.color = "#A9A9A9"; hotkeys.disableAll.keysReports=true;}
									else {this.parentNode.parentNode.style.color = "#000000"; hotkeys.disableAll.keysReports=false;}
						        }, false);
									
								this.i = 1;
								for( var hotkeyTab in hotkeys.keys.keysReports ) {
									tdHotkeyTab[this.i*2].innerHTML = gui[lib.lang].settingsKeys.keysReports[hotkeyTab];
									this.button = tdHotkeyTab[(this.i*2)+1].appendChild( document.createElement("input") );
									lib.hotkeyInput(this.button,hotkeyTab,"keysReports",gui[lib.lang].disableFilter,trHotkeyTab[this.i]);
									this.i++;
								}
									
								for( var i=0 ; i<tdHotkeyTab.length ; i++ )
									trHotkeyTab[Math.floor(i/2)].appendChild(tdHotkeyTab[i]);		
								for( var i=0 ; i<trHotkeyTab.length ; i++ )
									document.getElementById("dssb_hotkeys_tabKeysReports_tab").appendChild(trHotkeyTab[i]);
							} else if( x == "tabKeysMap" ) {
								var trHotkeyTab = new Array(12);
								for( var i=0 ; i<trHotkeyTab.length ; i++ )
									trHotkeyTab[i] = document.createElement("tr");
								var tdHotkeyTab = new Array(24);
								for( var i=0 ; i<tdHotkeyTab.length ; i++ )   
									tdHotkeyTab[i] = document.createElement("td");
									
								tdHotkeyTab[0].innerHTML = gui[lib.lang].settingsKeys.disableAll.keysMap;
								var disableKeysMap = tdHotkeyTab[1].appendChild(document.createElement("input"));
								disableKeysMap.type = "checkbox";
								disableKeysMap.checked = hotkeys.disableAll.keysMap;
								tdHotkeyTab[1].appendChild(lib.createTextNode(gui[lib.lang].disableFilter));
								if( disableKeysMap.checked ) trHotkeyTab[0].style.color = "#A9A9A9";
								disableKeysMap.addEventListener( "click", function(){
									if( this.checked ) {this.parentNode.parentNode.style.color = "#A9A9A9"; hotkeys.disableAll.keysMap=true;}
									else {this.parentNode.parentNode.style.color = "#000000"; hotkeys.disableAll.keysMap=false;}
			        			}, false);
									
								this.i = 1;
								for( var hotkeyTab in hotkeys.keys.keysMap ) {
									tdHotkeyTab[this.i*2].innerHTML = gui[lib.lang].settingsKeys.keysMap[hotkeyTab];
									this.button = tdHotkeyTab[(this.i*2)+1].appendChild( document.createElement("input") );
									lib.hotkeyInput(this.button,hotkeyTab,"keysMap",gui[lib.lang].disableFilter,trHotkeyTab[this.i]);
									this.i++;
								}
								
								for( var i=0 ; i<tdHotkeyTab.length ; i++ )
									trHotkeyTab[Math.floor(i/2)].appendChild(tdHotkeyTab[i]);		
								for( var i=0 ; i<trHotkeyTab.length ; i++ )
									document.getElementById("dssb_hotkeys_tabKeysMap_tab").appendChild(trHotkeyTab[i]);
							}
						}
					}

					for( var hotkey in gui[lib.lang].hotkeysTabTitle ) {
						if( hotkey == "tabTransportOverview" ) tdTableTab[0] .appendChild( document.createElement("br") );
						var span = tdTableTab[0] .appendChild( document.createElement("span") );
						span.style.paddingRight = "20px";
						var a = span.appendChild( document.createElement("a") );
						a.href = "javascript:;";
						a.id = "dssb_hotkeys_"+hotkey;
						a.innerHTML = gui[lib.lang].hotkeysTabTitle[hotkey];		
						a.addEventListener("click", function() {
							for( var x in gui[lib.lang].hotkeysTabTitle ) {
								document.getElementById("dssb_hotkeys_"+x+"_tab").style.display = "none";
								document.getElementById("dssb_hotkeys_"+x).parentNode.className = "vis";
							}
							this.parentNode.className = "selected";
							document.getElementById("dssb_hotkeys_"+this.id.split("_")[2]+"_tab").style.removeProperty("display");
							thTableTab[1].innerHTML = gui[lib.lang].hotkeysTabTitle[this.id.split("_")[2]]+":";
						},false);
						var tab = tdTableTab[1].appendChild( document.createElement("table") );
						tab.id = "dssb_hotkeys_"+hotkey+"_tab";
						tab.className="vis";
						tab.style.display = "none";
					}
					tdTableTab[0] .getElementsByTagName("a")[0].parentNode.className = "selected";
					thTableTab[1].innerHTML = gui[lib.lang].hotkeysTabTitle[tdTableTab[0] .getElementsByTagName("a")[0].id.split("_")[2]]+":";
					tdTableTab[1].getElementsByTagName("table")[0].style.removeProperty("display");
					new hotkeysTabsSettings();
			} else if( key == "tabGroups" ) {
					if(  name =="tabGroups" ) document.getElementById("dssb_tabGroups_tab").style.display = "block";
					var trTab = new Array(9);
				   	for( var i=0 ; i<trTab.length ; i++ )
			   			trTab[i] = document.getElementById("dssb_"+key+"_tab").appendChild( document.createElement("tr") );
			   	   	var tdTab = new Array(18);
			   	   	for( var i=0 ; i<tdTab.length ; i++ )
			   	   		tdTab[i] = trTab[Math.floor(i/2)].appendChild( document.createElement("td") );
						
					var tabGroupsCheckbox = function( obj, text, id, checkbox ) {
						this.span = obj.appendChild( document.createElement("span") );
						this.span.style.paddingRight = "50px";
						this.groupsCheckbox = obj.appendChild( document.createElement("input") );
						this.groupsCheckbox.type = "checkbox";
						this.groupsCheckbox.id = "dssb_"+id;
						this.groupsCheckbox.checked = checkbox;
						obj.appendChild(lib.createTextNode(text));
						return this.groupsCheckbox;
					};
					var disableGroupLinks = appendCheckbox(tdTab[0],tdTab[1],gui[lib.lang].showGroups.groupLinks,"disableGroupLinks",this.checkboxes.disableGroupLinks);
					/* kann später wieder ausgebaut werden. Dient hier dem Fehlermanagement */
					var filter = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings);
					if( typeof filter.groupPopup == "undefined" ) {filter.groupPopup = [300,550]; filter.groupFontSize=1; lib.storage.setValue("Filter_player.id"+lib.game_data.player.id,filter);}
					tdTab[2].innerHTML = gui[lib.lang].showGroups.winWidthPopup;
					tdTab[3].innerHTML = "<input type='text' id='dssb_groupPopup_width' value='"+filter.groupPopup[0]+"'> px";
					tdTab[4].innerHTML = gui[lib.lang].showGroups.winHeightPopup;
					tdTab[5].innerHTML = "<input type='text' id='dssb_groupPopup_height' value='"+filter.groupPopup[1]+"'> px";
					tdTab[6].innerHTML = gui[lib.lang].showGroups.fontSizeGroups;
					var input = tdTab[7].appendChild( document.createElement("input") );
					input.type = "text";
					input.id = "dssb_groupFontSize";
					input.value = filter.groupFontSize;
					input.addEventListener("keyup",function() { if( document.getElementById("dssb_fontSizeExample") != null ) document.getElementById("dssb_fontSizeExample").size = this.value; }, false);					
					var span = tdTab[7].appendChild( document.createElement("span") );
					span.style.paddingLeft = "40px";
					span.innerHTML = "<font size="+filter.groupFontSize+" id='dssb_fontSizeExample'>"+gui[lib.lang].showGroups.fontSizeExample+"</font>";
					
					var disableGroupLinksMain = appendCheckbox(tdTab[8],tdTab[9],gui[lib.lang].showGroups.groupLinksMain,"disableGroupLinksMain",this.checkboxes.disableGroupLinksMain);
					var disableShowGroupsMain = tabGroupsCheckbox( tdTab[9],gui[lib.lang].showGroups.disableShowGroups,"disableShowGroupsMain",this.checkboxes.disableShowGroupsMain);
					var disableGroupLinksMap = appendCheckbox(tdTab[10],tdTab[11],gui[lib.lang].showGroups.groupLinksMap,"disableGroupLinksMap",this.checkboxes.disableGroupLinksMap);					
					var disableShowGroupsMap = tabGroupsCheckbox( tdTab[11],gui[lib.lang].showGroups.disableShowGroups,"disableShowGroupsMap",this.checkboxes.disableShowGroupsMap);
					var disableGroupLinksCombined = appendCheckbox(tdTab[12],tdTab[13],gui[lib.lang].showGroups.groupLinksCombined,"disableGroupLinksCombined",this.checkboxes.disableGroupLinksCombined);				
					var disableShowGroupsCombined = tabGroupsCheckbox( tdTab[13],gui[lib.lang].showGroups.disableShowGroups,"disableShowGroupsCombined",this.checkboxes.disableShowGroupsCombined);
					var disableGroupLinksProduction = appendCheckbox(tdTab[14],tdTab[15],gui[lib.lang].showGroups.groupLinksProduction,"disableGroupLinksProduction",this.checkboxes.disableGroupLinksProduction);
					var disableShowGroupsProduction = tabGroupsCheckbox( tdTab[15],gui[lib.lang].showGroups.disableShowGroups,"disableShowGroupsProduction",this.checkboxes.disableShowGroupsProduction);
					var disableGroupLinksBuildings = appendCheckbox(tdTab[16],tdTab[17],gui[lib.lang].showGroups.groupLinksBuildings,"disableGroupLinksBuildings",this.checkboxes.disableGroupLinksBuildings);
					var disableShowGroupsBuildings = tabGroupsCheckbox( tdTab[17],gui[lib.lang].showGroups.disableShowGroups,"disableShowGroupsBuildings",this.checkboxes.disableShowGroupsBuildings);
					
			} else if( key == "tabOther" ) {
					if(  name =="tabOther" ) document.getElementById("dssb_tabOther_tab").style.display = "block";
					var trTab = new Array(13);
				   	for( var i=0 ; i<trTab.length ; i++ )
			   			trTab[i] = document.getElementById("dssb_"+key+"_tab").appendChild( document.createElement("tr") );
			   	   	var tdTab = new Array(26);
			   	   	for( var i=0 ; i<tdTab.length ; i++ )
			   	   		tdTab[i] = trTab[Math.floor(i/2)].appendChild( document.createElement("td") );
						
					var disableMapRedirTargets = appendCheckbox(tdTab[0],tdTab[1],gui[lib.lang].mapRedirTargetsCheckbox,"disableMapRedirTargets",this.checkboxes.disableMapRedirTargets);
					var disableLastTroopsLink = appendCheckbox(tdTab[2],tdTab[3],gui[lib.lang].lastTroopsLink,"disableLastTroopsLink",this.checkboxes.disableLastTroopsLink);	
					var disableConTimeP = appendCheckbox(tdTab[4],tdTab[5],gui[lib.lang].confirmTimePlace,"disableConTimeP",this.checkboxes.disableConTimeP);	
					var disableVpDistance = appendCheckbox(tdTab[6],tdTab[7],gui[lib.lang].showVpDistance,"disableVpDistance",this.checkboxes.disableVpDistance);	
					var dsTroopsCalc = appendCheckbox(tdTab[8],tdTab[9],gui[lib.lang].dstroopscalc.dstroopscalc,"disableDSTroopsCalc",this.checkboxes.disableDSTroopsCalc);
					var newIncsButton = appendCheckbox(tdTab[10],tdTab[11],gui[lib.lang].newIncs.newIncsButton,"disableNewIncs",this.checkboxes.disableNewIncs);
					var bashpoints = appendCheckbox(tdTab[12],tdTab[13],gui[lib.lang].bashpoints,"disableBashpoints",this.checkboxes.disableBashpoints);
					var addStandingUnits = appendCheckbox(tdTab[14],tdTab[15],gui[lib.lang].addStandingUnits,"disableAddStandingUnits",this.checkboxes.disableAddStandingUnits);
					var addInfosStorage = appendCheckbox(tdTab[16],tdTab[17],gui[lib.lang].addInfosStorage.addInfosStorage,"disableAddInfosStorage",this.checkboxes.disableAddInfosStorage);					
					var disableMassRecruit = appendCheckbox(tdTab[18],tdTab[19],gui[lib.lang].massRecruit,"disableMassRecruit",this.checkboxes.disableMassRecruit);
					var disableBuildVars = appendCheckbox(tdTab[20],tdTab[21],gui[lib.lang].buildingVars.buildVars,"disableBuildVars",this.checkboxes.disableBuildVars);
					var disableAGCounter = appendCheckbox(tdTab[22],tdTab[23],gui[lib.lang].dsAGCounter.dsAGCounter,"disableAGCounter",this.checkboxes.disableAGCounter);
					
					var span = tdTab[23].appendChild(document.createElement("span"));
					span.style.paddingRight = "40px";
					var resetAGCounter = tdTab[23].appendChild(document.createElement("a"));
					resetAGCounter.innerHTML = gui[lib.lang].dsAGCounter.resetAGCounter;
					resetAGCounter.style.cursor = "pointer";
					resetAGCounter.addEventListener("click",function() {
						if( this.parentNode.parentNode.style.color != "rgb(169, 169, 169)" ) {
							if( confirm( gui[lib.lang].dsAGCounter.deleteConfirm ) ) {
				         		lib.storage.deleteValue("killsNoblemen_"+lib.game_data.player.id);
								lib.storage.deleteValue("savedIDs_"+lib.game_data.player.id);

								var cell = document.getElementById("dssb_dsAGCounterValues");
								cell.innerHTML = "<span style=\"padding-right: 5px;\"></span>"+gui[lib.lang].dsAGCounter.nobleMen+": <b>0/0</b>";
								cell.title = gui[lib.lang].dsAGCounter.kills[0]+" 0/0 "+gui[lib.lang].dsAGCounter.kills[1];
								var span = cell.appendChild( document.createElement("span") ); span.style.paddingRight = "5px";
				            	alert( gui[lib.lang].dsAGCounter.deleted );
				       		}
						} else alert( gui[lib.lang].dsAGCounter.isDisabled );
					}, false);

					tdTab[24].innerHTML = gui[lib.lang].paypalButton;
					var img = tdTab[25].appendChild( document.createElement("img") );
					img.src = paypalButton;
					img.style.cursor = "pointer";
					img.addEventListener("click",function() {
						window.open( "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=GA7P7K8AUEF8S" );
					}, false);

				for( var i=0 ; i<tdTab.length ; i++ )
					trTab[Math.floor(i/2)].appendChild(tdTab[i]);		
				for( var i=0 ; i<trTab.length ; i++ )
					document.getElementById("dssb_"+key+"_tab").appendChild(trTab[i]);
			}
		}
   	}
   	
	for( var key in gui[lib.lang].settingsTabTitle ) {
		if( key == "tabDsLoyalty" ) td[0].appendChild( document.createElement("br") );
		var span = td[0].appendChild( document.createElement("span") );
		span.style.paddingRight = "20px";
		var a = span.appendChild( document.createElement("a") );
		a.href = "javascript:;";
		a.id = "dssb_"+key;
		a.innerHTML = gui[lib.lang].settingsTabTitle[key];
		a.addEventListener("click", function() {
			this.checkboxes = new newCheckboxes();
			for( var key in gui[lib.lang].settingsTabTitle ) {
				document.getElementById("dssb_"+key+"_tab").style.display = "none";
				document.getElementById("dssb_"+key).parentNode.className = "vis";
			}
			this.parentNode.className = "selected";
			document.getElementById(this.id+"_tab").style.display = "block";
			 th[1].innerHTML = gui[lib.lang].settingsTabTitle[this.id.split("_")[1]]+":";
			this.checkboxes.activeSettingsTab = this.id.split("_")[1];
			lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,this.checkboxes);
		}, false);
		var tab = td[1].appendChild( document.createElement("table") );
		tab.id = "dssb_"+key+"_tab";
		tab.className="vis";
		tab.style.display = "none";
	}
	new Settings(new newCheckboxes().activeSettingsTab);

}

/*screen=ally&mode=contracts*/
if( location.href.match(/screen=ally&mode=contracts/) && !checkboxes.disableFadeOutOffersEnemies ) {
		if( checkboxes.readInContracts ) {
			if( document.getElementById("partners") != null )
				var tr=document.getElementById("partners").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
			else {alert( gui[lib.lang].noTribe ); return; }
			var enemies =[], counter=0;
			for( var i=0 ; i<tr.length ; i++ ) {
				if( counter == 3 ) {
					enemies.push( tr[i].getElementsByTagName("td")[0].getElementsByTagName("a")[0].textContent );
				}
				if( tr[i].getElementsByTagName("th")[0] ) counter++;
			}
			enemies=enemies.join(";");
			var filter = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings);
			filter.allyEnemies = enemies;
			lib.storage.setValue("Filter_player.id"+lib.game_data.player.id,filter);
			checkboxes.readInContracts=false;
			lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);			
			alert(gui[lib.lang].readedAllyContracts);
		}
}

/*screen=market*/
if (location.href.match(/screen=market/)) {
	var checkboxes = new newCheckboxes();
	var now = new lib.getServerTime();
			
	/* append neighbor village link */
	if( !checkboxes.disableNeighbourVillages && lib.pa ) {
	    if( !location.href.match(/try=confirm_send/) || document.getElementById("inputx") ) {
        	var table = document.getElementsByClassName("vis modemenu")[0].getElementsByTagName("tbody")[0];
			var a = table.insertRow(table.getElementsByTagName("tr").length).insertCell(0).appendChild(document.createElement("a"));
        	a.innerHTML = gui[lib.lang].neighborVillages;
			a.href = "javascript:;";
        	var url = location.href.split("screen=market")[0] + "screen=place&mode=neighbor";
        	a.addEventListener('click', function() {location.href=url;}, false);
        }	
	}

	/*suggest new own offer*/
	if( location.href.match(/mode=own_offer/) && !location.href.match(/mode=all_own_offer/) ) {

	var x=0; if( document.getElementById("merchant_exchange") != null ) x=1;
	var inputs = document.getElementsByTagName("form")[x].getElementsByTagName("input");
	var input = inputs[inputs.length-1]; 	
	input.value = lib.createTextNode(gui[lib.lang].submitButton+lib.showHotkey(hotkeys.keys.keysMarketOwnOffer.sendRes) ).textContent;
	input.id = "submit";
	if( lib.firefox )
		input.addEventListener("click", function() {this.disabled = true;}, false);
    lib.hotkeys.keys.push( { key: hotkeys.keys.keysMarketOwnOffer.sendRes, event: { id: "submit", event: "click" } } );

	if( !checkboxes.disableDoOwnOffer ) {
        var NewOffer = function() {
        	var wood=new Number(document.getElementById('wood').innerHTML);
        	var clay=new Number(document.getElementById('stone').innerHTML);
       		var iron=new Number(document.getElementById('iron').innerHTML);
		
		var trade = lib.storage.getValue("Trade_player.id"+lib.game_data.player.id+"_"+lib.game_data.village.coord.split("|")[0]+"_"+lib.game_data.village.coord.split("|")[1],"");
		if( trade != "" )  {
			for( var i=0 ; i<trade.dateOfArrival.length ; i++ ) {
				var dateOfArrival = parseInt(trade.dateOfArrival[i],10 );
				if( dateOfArrival < now.getTime() ) {
					var villageData = lib.storage.getValue("villageData_"+lib.game_data.player.id+"_"+lib.game_data.village.id,"");
					if( villageData != "" ) {
						villageData=villageData.split(",");
						if( parseInt(villageData[5]) < dateOfArrival ) {
							villageData[0]=wood; villageData[1]=clay; villageData[2]=iron; villageData[5] = now.getTime();
							villageData = villageData.join();
							lib.storage.setValue("villageData_"+lib.game_data.player.id+"_"+lib.game_data.village.id,villageData);
						}
					}
					trade.wood.splice(i,1);trade.clay.splice(i,1);trade.iron.splice(i,1);trade.dateOfArrival.splice(i,1);
					if( trade.wood.length==0 ) lib.storage.deleteValue("Trade_player.id"+lib.game_data.player.id+"_"+lib.game_data.village.coord.split("|")[0]+"_"+lib.game_data.village.coord.split("|")[1]);
					else lib.storage.setValue("Trade_player.id"+lib.game_data.player.id+"_"+lib.game_data.village.coord.split("|")[0]+"_"+lib.game_data.village.coord.split("|")[1],trade);
					i--;
				} else {wood += parseInt(trade.wood[i],10); clay += parseInt(trade.clay[i],10); iron += parseInt(trade.iron[i],10)};			
			}			
		}

		var forms=document.getElementsByTagName('form');  
		var table="",own_offer="";
		for(i=0;i<forms.length&&table=="";i++)   {    
		 	if(forms[i].action.indexOf('action=modify_offers')!=-1)     
				table=forms[i].getElementsByTagName('table')[0];}   
		
		for(i=1;table!=""&&i<table.rows.length-1;i++)   {     
			child=table.rows[i].getElementsByTagName("td")[2].childNodes;  
			child2=table.rows[i].getElementsByTagName("td")[1].childNodes;
			res=child[0].title;  
			res2=child2[0].title + ";";
			own_offer += res2;
			num="";     

			for(j=0;j<child.length;j++){     
				value=child[j].nodeValue;     
				if(value != null)num+=value;}     
			num=num.substring(0,num.length-1);   
			num*=new Number(table.rows[i].cells[3].innerHTML);    
			if(res==gui[lib.lang].wood) wood+=num;     
			if(res==gui[lib.lang].clay) clay+=num;     
			if(res==gui[lib.lang].iron) iron+=num;   
		}  

		var tables=document.getElementsByClassName('vis'); var marketeers=0;
		var tradertxt = vistables[1].getElementsByTagName("th")[0].textContent;
		var marketeers = parseInt(tradertxt.substring(tradertxt.indexOf(':')+2, tradertxt.indexOf('/')),10);

		this.conditionMaxWood = wood>=clay&&wood>=iron;
		this.conditionMaxClay = clay>=wood&&clay>=iron;
            this.conditionMaxIron = iron>=wood&&iron>=clay;
            this.conditionMinWood = wood<clay&&wood<iron;
            this.conditionMinClay = clay<wood&&clay<iron;
            this.conditionMinIron = iron<wood&&iron<clay;
            var max, min; this.offers = 0;

            if( !checkboxes.offerWood ) {this.conditionMaxClay = clay>=iron; this.conditionMaxIron = iron>=clay;}
            if( !checkboxes.offerClay ) {this.conditionMaxWood = wood>=iron; this.conditionMaxIron = iron>=wood;}
            if( !checkboxes.offerIron ) {this.conditionMaxWood = wood>=clay; this.conditionMaxClay = clay>=wood;}
            
            if( !checkboxes.requireWood ) {this.conditionMinClay = clay<iron; this.conditionMinIron = iron<clay;}
            if( !checkboxes.requireClay ) {this.conditionMinWood = wood<iron; this.conditionMinIron = iron<wood;}
            if( !checkboxes.requireIron ) {this.conditionMinWood = wood<clay; this.conditionMinClay = clay<wood;}
            
            if( !checkboxes.offerWood && !checkboxes.offerClay ) this.conditionMaxIron=true;
            if( !checkboxes.offerWood && !checkboxes.offerIron ) this.conditionMaxClay=true;
            if( !checkboxes.offerIron && !checkboxes.offerClay ) this.conditionMaxWood=true;
            
            if( !checkboxes.requireWood && !checkboxes.requireClay ) this.conditionMinIron=true;
            if( !checkboxes.requireWood && !checkboxes.requireIron ) this.conditionMinClay=true;
            if( !checkboxes.requireIron && !checkboxes.requireClay ) this.conditionMinWood=true; 

            if(this.conditionMaxWood&&checkboxes.offerWood) max="wood";  
            if(this.conditionMaxClay&&checkboxes.offerClay) max="clay";   
            if(this.conditionMaxIron&&checkboxes.offerIron) max="iron"; 

            if(this.conditionMinWood&&checkboxes.requireWood) min="wood";   
            if(this.conditionMinClay&&checkboxes.requireClay) min="clay";
            if(this.conditionMinIron&&checkboxes.requireIron) min="iron";
            
            wood=Math.round(wood/1000); clay=Math.round(clay/1000); iron=Math.round(iron/1000);   
            balancedOffers=Math.floor(Math.round((wood+clay+iron)/3)); 

            if( max=="wood") { 
                if( min=="clay" ) this.offers = wood-balancedOffers;
                if( min=="iron" ) this.offers=wood-balancedOffers;}  
            if(max=="clay") {     
                if(min=="wood") this.offers=clay-balancedOffers; 
                if(min=="iron") this.offers=clay-balancedOffers;}   
            if( max=="iron" ) {    
                if(min=="wood") this.offers=iron-balancedOffers;
                if(min=="clay") this.offers=iron-balancedOffers;}   
            if( min=="wood" ) { if( wood+this.offers>balancedOffers ) this.offers=balancedOffers-wood;}
            if( min=="clay" ) { if( clay+this.offers>balancedOffers ) this.offers=balancedOffers-clay;}
            if( min=="iron" ) { if( iron+this.offers>balancedOffers ) this.offers=balancedOffers-iron;}
			
            if( marketeers < this.offers ) this.offers = marketeers;

            if( !checkboxes.disableOfferBorder ) {
                var offerBorder = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).ownOfferBorder;
                if( marketeers-offerBorder< this.offers ) {
                    this.offers = marketeers-offerBorder;
                        if( this.offers<0) this.offers=0;
                }
            }

            var resSell = lib.storage.getValue("OwnOfferValue_player.id" + lib.game_data.player.id,defaultOwnOfferValues).resSell;
            if( resSell > 1000 ) {
                var needed = resSell/1000;
                if( Math.round(needed,0)*1000 < resSell ) needed += 1;
                this.offers = Math.ceil(this.offers/needed)-1;
            }

            this.balanced = 0;
            if( this.conditionMaxWood&&checkboxes.offerWood ) this.res_sell = "  <img src='/graphic/"+regExp[lib.lang].wood+".png?1'> "+gui[lib.lang].wood; 
            if( this.conditionMaxClay&&checkboxes.offerClay ) this.res_sell = "  <img src='/graphic/"+regExp[lib.lang].clay+".png?1'> "+gui[lib.lang].clay; 
            if( this.conditionMaxIron&&checkboxes.offerIron ) this.res_sell = "  <img src='/graphic/"+regExp[lib.lang].iron+".png?1'> "+gui[lib.lang].iron; 
            if( this.conditionMinWood&&checkboxes.requireWood ) this.res_buy = "  <img src='/graphic/"+regExp[lib.lang].wood+".png?1'> "+gui[lib.lang].wood; 
            if( this.conditionMinClay&&checkboxes.requireClay ) this.res_buy = "  <img src='/graphic/"+regExp[lib.lang].clay+".png?1'> "+gui[lib.lang].clay; 
            if( this.conditionMinIron&&checkboxes.requireIron ) this.res_buy = " <img src='/graphic/"+regExp[lib.lang].iron+".png?1'> "+gui[lib.lang].iron;

            var resource_offered = ""; own_offer = own_offer.split(";");
            for( var i=0 ; i<own_offer ; i++ ) {
                if( this.res_sell.match( own_offer[i] ) )
                    resource_offered = 1;
            }
            
            if( this.res_sell == this.res_buy ) this.offers = 0;

            if( this.offers <= 0 || resource_offered==1 || this.res_buy == undefined || this.res_sell == undefined ) {
                this.res_buy = "<img id='img_noOffer' src='/graphic/buildings/market.png?'> "+gui[lib.lang].noOffer;
                this.res_sell = "<img id='img_noOffer' src='/graphic/buildings/market.png?'> "+gui[lib.lang].noOffer;
                this.balanced = 1;
            }
            
            if( iron == clay || iron==clay-1 || iron==clay-2 || iron==clay+1 || iron==clay+2 ) {var condition1 = true;}
            else var condition1 = false;
            if( iron == wood || iron==wood-1 || iron==wood-2 || iron==wood+1 || iron== wood+2 ) var condition2 = true;
            else var condition2 = false;
            if( condition1 && condition2 ) {
                this.res_buy = "<img id='img_balanced' src='/graphic/buildings/market.png?'> "+gui[lib.lang].storageBalanced;
                this.res_sell = "<img id='img_balanced' src='/graphic/buildings/market.png?'> "+gui[lib.lang].storageBalanced;
                this.balanced = 1;
            }
            
            this.values = lib.storage.getValue("OwnOfferValue_player.id" + lib.game_data.player.id,defaultOwnOfferValues);
            this.maxTimeText = this.values.maxTime + gui[lib.lang].hours;
            this.inputSell = '<input id="inputSell" name="inputSell" size="5" value="' + this.values.resSell + '" type="text">';
            this.inputBuy = '<input id="inputBuy" name="inputBuy" size="5" value="' + this.values.resBuy + '" type="text">';
            this.inputMaxTime = '<input id="inputMaxTime" name="inputMaxTime" size="5" value="' + this.values.maxTime + '" type="text">';
            
            if( this.balanced == 1 ) {
                this.values.resSell = "";
                this.values.resBuy = "";
                this.offers=0;
            }
        }    

	var guiOwnOffer = function(newOffer) {
		this.tr = document.createElement("tr"); 
		this.tr.style.whiteSpace = "noWrap";      
		var tr1 = new Array(5);
        	for( var i=0 ; i<tr1.length ; i++ ) {
			tr1[i] = document.createElement("tr");}
        	var td = new Array(25);
        	for( var i=0 ; i<td.length ; i++ ) {
			td[i] = document.createElement("td");}
            
        	var point = "<font color='#f7eed3'>.</font>";
		td[0].innerHTML = "<span id='newOffer'><b>"+gui[lib.lang].offer+"</b>";
		td[1].innerHTML = point+newOffer.values.resSell + newOffer.res_sell; 
		td[2].innerHTML = "<i>"+gui[lib.lang].value+"</i>" + newOffer.inputSell;
		td[2].style.textAlign = "right";

		td[3].innerHTML = "<b>"+gui[lib.lang].require+"</b>"
		td[4].innerHTML = point+newOffer.values.resBuy + newOffer.res_buy;
		td[5].innerHTML = "<i>"+gui[lib.lang].value+"</i>" + newOffer.inputBuy;
		td[5].style.textAlign = "right";

		td[6].innerHTML = "<b>"+gui[lib.lang].maxLengthOfTime+"</b>";
		td[7].innerHTML = point+newOffer.maxTimeText;
		td[8].innerHTML = "<i>"+gui[lib.lang].value+"</i>" + newOffer.inputMaxTime;
		td[8].style.textAlign = "right";
	
		td[9].innerHTML = "<b>"+gui[lib.lang].offerNumber+"</b>";
		td[11].innerHTML = Math.abs(newOffer.offers)+"x</span>";
		td[11].style.width = "91px";
		td[12].innerHTML = "<b>"+gui[lib.lang].offer+"</b>";
		td[12].style.width = "40px";
		td[12].style.textAlign = "right";
  	      
		var FadingOutWoodOffer = td[14].appendChild(document.createElement("input"));
  		FadingOutWoodOffer.type="checkbox";
  		FadingOutWoodOffer.checked = checkboxes.offerWood;
		FadingOutWoodOffer.addEventListener("click", function(){ 
				if( this.checked ){checkboxes.offerWood=true; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);}
				else {checkboxes.offerWood=false; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);};
				var newOffer = new NewOffer(); 
				td[1].innerHTML = point+newOffer.values.resSell + newOffer.res_sell; td[4].innerHTML = point+newOffer.values.resBuy + newOffer.res_buy;
				td[11].innerHTML = Math.abs(newOffer.offers)+"x</span>";
				if( newOffer.offers == 0 || newOffer.res_buy == undefined || newOffer.res_sell == undefined) button.disabled = true; else button.disabled = false;
		}, false);
	
		var imgWood = document.createElement("img");
		imgWood.src = "/graphic/"+regExp[lib.lang].wood+".png?1";
		var textnode = lib.createTextNode("");
		imgWood.appendChild(textnode);
		td[14].appendChild(imgWood);

		var FadingOutClay = td[15].appendChild(document.createElement("input"));
  		FadingOutClay.type="checkbox";
  		FadingOutClay.checked = checkboxes.offerClay;
		FadingOutClay.addEventListener("click", function(){ 
				if( this.checked ){checkboxes.offerClay=true; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);}
				else {checkboxes.offerClay=false; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);};
				var newOffer = new NewOffer(); 
				td[1].innerHTML = point+newOffer.values.resSell + newOffer.res_sell; td[4].innerHTML = point+newOffer.values.resBuy + newOffer.res_buy;
				td[11].innerHTML = Math.abs(newOffer.offers)+"x</span>";
				if( newOffer.offers == 0 || newOffer.res_buy == undefined || newOffer.res_sell == undefined) button.disabled = true; else button.disabled = false;
		}, false);
  	      
		var imgClay = document.createElement("img");
		imgClay.src = "/graphic/"+regExp[lib.lang].clay+".png?1";
		imgClay.appendChild(textnode);
		td[15].appendChild(imgClay);

		var FadingOutIron = td[16].appendChild(document.createElement("input"));
  		FadingOutIron.type="checkbox";
  		FadingOutIron.checked = checkboxes.offerIron;
		FadingOutIron.addEventListener("click", function(){ 
				if( this.checked ){checkboxes.offerIron=true; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);}
				else {checkboxes.offerIron=false; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);};
				var newOffer = new NewOffer(); 
				td[1].innerHTML = point+newOffer.values.resSell + newOffer.res_sell; td[4].innerHTML = point+newOffer.values.resBuy + newOffer.res_buy;
				td[11].innerHTML = Math.abs(newOffer.offers)+"x</span>";
				if( newOffer.offers == 0 || newOffer.res_buy == undefined || newOffer.res_sell == undefined) button.disabled = true; else button.disabled = false;
		}, false);
	
		var imgIron = document.createElement("img");
		imgIron.src = "/graphic/"+regExp[lib.lang].iron+".png?1";
		imgIron.appendChild(textnode);
		td[16].appendChild(imgIron);
	
		var button;				
		button = td[17].appendChild( document.createElement("input") );
		button.type = "button";
		button.id = "dssb_button";
		button.value = gui[lib.lang].submitButton+lib.showHotkey( hotkeys.keys.keysMarketOwnOffer.sbOffer );		
		if( newOffer.offers == 0 || newOffer.res_buy == undefined || newOffer.res_sell == undefined) {
			button.disabled = true;
		}
  	 	button.addEventListener("click", function(){
			this.table = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
			this.disabled = true;
			var newValues = {   
				resSell: document.getElementById("inputSell").value,
				resBuy: document.getElementById("inputBuy").value,
				maxTime: document.getElementById("inputMaxTime").value,
			};
			if( newOffer.balanced == 0 )	{	
				lib.storage.setValue("OwnOfferValue_player.id" + lib.game_data.player.id, newValues);
  	            var bow = 1;
  	            for( var i = offers ; i>0 ; i-- ) {
					if( newValues.resSell*i/values.resSell <= offers && bow == 1 ) {
  	                    offers = i;bow = 0;}
  	             }
				 
			/*insert new offer*/
			this.res_sell = document.getElementsByName("res_sell");
			this.res_sell[this.res_sell.length-3].checked=newOffer.conditionMaxWood&&checkboxes.offerWood;   
			this.res_sell[this.res_sell.length-2].checked=newOffer.conditionMaxClay&&checkboxes.offerClay;   
			this.res_sell[this.res_sell.length-1].checked=newOffer.conditionMaxIron&&checkboxes.offerIron; 
			this.res_buy = document.getElementsByName("res_buy");
			this.res_buy[this.res_buy.length-3].checked=newOffer.conditionMinWood&&checkboxes.requireWood;   
			this.res_buy[this.res_buy.length-2].checked=newOffer.conditionMinClay&&checkboxes.requireClay;  
			this.res_buy[this.res_buy.length-1].checked=newOffer.conditionMinIron&&checkboxes.requireIron;  
			
 			document.getElementsByName('multi')[document.getElementsByName('multi').length-1].value=Math.abs(newOffer.offers);
			document.getElementsByName('max_time')[document.getElementsByName('max_time').length-1].value= newValues.maxTime;
			document.getElementsByName('sell')[document.getElementsByName('sell').length-1].value= newValues.resSell;  
			document.getElementsByName('buy')[document.getElementsByName('buy').length-1].value=newValues.resBuy;
			if( lib.pa ) {
				var sourceVillage = lib.storage.getValue("villageData_"+lib.game_data.player.id+"_"+lib.game_data.village.id,"undefined");
				if( sourceVillage != "undefined" ) {
					sourceVillage = sourceVillage.split(",");
					if( this.res_sell[this.res_sell.length-3].checked ) 
						sourceVillage[0] = parseInt(sourceVillage[0],10)-(parseInt(Math.abs(newOffer.offers),10)*parseInt(newValues.resSell,10));
					if( this.res_sell[this.res_sell.length-2].checked ) 
						sourceVillage[1] = parseInt(sourceVillage[1],10)-(parseInt(Math.abs(newOffer.offers),10)*parseInt(newValues.resSell,10));
					if( this.res_sell[this.res_sell.length-1].checked ) 
						sourceVillage[2] = parseInt(sourceVillage[2],10)-(parseInt(Math.abs(newOffer.offers),10)*parseInt(newValues.resSell,10));
					if( this.res_buy[this.res_buy.length-3].checked ) 
						sourceVillage[0] = parseInt(sourceVillage[0],10)+(parseInt(Math.abs(newOffer.offers),10)*parseInt(newValues.resBuy,10)/2);
					if( this.res_buy[this.res_buy.length-2].checked ) 
						sourceVillage[1] = parseInt(sourceVillage[1],10)+(parseInt(Math.abs(newOffer.offers),10)*parseInt(newValues.resBuy,10)/2);
					if( this.res_buy[this.res_buy.length-1].checked ) 
						sourceVillage[2] = parseInt(sourceVillage[2],10)+(parseInt(Math.abs(newOffer.offers),10)*parseInt(newValues.resBuy,10)/2);
					lib.storage.setValue("villageData_"+lib.game_data.player.id+"_"+lib.game_data.village.id,sourceVillage.join());
				}
			}
  	        document.getElementById("submit").click();
  	      }}, false);
  	      
		td[19].style.width = "91px";
		td[20].innerHTML = "<b>"+gui[lib.lang].require+"</b>";
		td[20].style.width = "40px";
		td[20].style.textAlign = "right";
  	      
		var FadingOutWoodRequire = td[22].appendChild(document.createElement("input"));
  		FadingOutWoodRequire.type="checkbox";
  		FadingOutWoodRequire.checked = checkboxes.requireWood;
		FadingOutWoodRequire.addEventListener("click", function(){ 
				if( this.checked ){checkboxes.requireWood=true; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);}
				else {checkboxes.requireWood=false; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);};
				var newOffer = new NewOffer(); 
				td[1].innerHTML = point+newOffer.values.resSell + newOffer.res_sell; td[4].innerHTML = point+newOffer.values.resBuy + newOffer.res_buy;
				td[11].innerHTML = Math.abs(newOffer.offers)+"x</span>";
				if( newOffer.offers == 0 || newOffer.res_buy == undefined || newOffer.res_sell == undefined) button.disabled = true; else button.disabled = false;
		}, false);
        
		imgWood = td[22].appendChild( document.createElement("img") );
		imgWood.src = "/graphic/holz.png?1";
		textnode = lib.createTextNode("");
		imgWood.appendChild(textnode);
        
		var FadingOutClayRequire = td[23].appendChild(document.createElement("input"));
  		FadingOutClayRequire.type="checkbox";
  		FadingOutClayRequire.checked = checkboxes.requireClay;
		FadingOutClayRequire.addEventListener("click", function(){ 
				if( this.checked ){checkboxes.requireClay=true; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);}
				else {checkboxes.requireClay=false; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);};
				var newOffer = new NewOffer(); 
				td[1].innerHTML = point+newOffer.values.resSell + newOffer.res_sell; td[4].innerHTML = point+newOffer.values.resBuy + newOffer.res_buy;
				td[11].innerHTML = Math.abs(newOffer.offers)+"x</span>";
				if( newOffer.offers == 0 || newOffer.res_buy == undefined || newOffer.res_sell == undefined) button.disabled = true; else button.disabled = false;
		}, false);
        
		var imgClay = document.createElement("img");
		imgClay.src = "/graphic/lehm.png?1";
		imgClay.appendChild(textnode);
		td[23].appendChild(imgClay);
        
		var FadingOutIronRequire = td[24].appendChild(document.createElement("input"));
		FadingOutIronRequire.type="checkbox";
		FadingOutIronRequire.checked = checkboxes.requireIron;
		FadingOutIronRequire.addEventListener("click", function(){ 
				if( this.checked ){checkboxes.requireIron=true; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);}
				else {checkboxes.requireIron=false; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);}
				var newOffer = new NewOffer(); 
				td[1].innerHTML = point+newOffer.values.resSell + newOffer.res_sell; td[4].innerHTML = point+newOffer.values.resBuy + newOffer.res_buy;
				td[11].innerHTML = Math.abs(newOffer.offers)+"x</span>";
				if( newOffer.offers == 0 || newOffer.res_buy == undefined || newOffer.res_sell == undefined) button.disabled = true; else button.disabled = false;
		}, false);

		var imgIron = document.createElement("img");
		imgIron.src = "/graphic/eisen.png?1";
		imgIron.appendChild(textnode);
		td[24].appendChild(imgIron);
      
		tr1[0].appendChild(td[0]);
	    tr1[0].appendChild(td[1]);
	    tr1[0].appendChild(td[2]);
	    tr1[1].appendChild(td[3]);
	    tr1[1].appendChild(td[4]);
	    tr1[1].appendChild(td[5]);
	    tr1[2].appendChild(td[6]);
	    tr1[2].appendChild(td[7]);
	    tr1[2].appendChild(td[8]);
	    tr1[3].appendChild(td[9]);
	    tr1[3].appendChild(td[10]);
	    td[10].appendChild(td[11]);
	    td[10].appendChild(td[12]);
	    tr1[3].appendChild(td[10]);
	    tr1[4].appendChild(td[17]);	
        tr1[4].appendChild(td[18]);
	    td[18].appendChild(td[19]);
	    td[18].appendChild(td[20]);
	    tr1[3].appendChild(td[13]);
	    td[13].appendChild(td[14]);
	    td[13].appendChild(td[15]);
	    td[13].appendChild(td[16]);
	    tr1[4].appendChild(td[21]);
		td[21].appendChild(td[22]);
        td[21].appendChild(td[23]);
        td[21].appendChild(td[24]);
        table.appendChild(this.tr);
        this.tr.appendChild(tr1[0]);
		this.tr.appendChild(tr1[1]);
        this.tr.appendChild(tr1[2]);
        this.tr.appendChild(tr1[3]);
        this.tr.appendChild(tr1[4]);
	}   
	
	input.addEventListener("click",function() {
			if( lib.pa ) {
				var sourceVillage = lib.storage.getValue("villageData_"+lib.game_data.player.id+"_"+lib.game_data.village.id,"undefined");
				if( sourceVillage != "undefined" ) {
					sourceVillage = sourceVillage.split(",");
					if( document.getElementById('res_sell_wood').checked ) 
						sourceVillage[0] = parseInt(sourceVillage[0],10)-(parseInt(Math.abs(newOffer.offers),10)*parseInt(newValues.resSell,10));
					if( document.getElementById('res_sell_stone').checked ) 
						sourceVillage[1] = parseInt(sourceVillage[1],10)-(parseInt(Math.abs(newOffer.offers),10)*parseInt(newValues.resSell,10));
					if( document.getElementById('res_sell_iron').checked ) 
						sourceVillage[2] = parseInt(sourceVillage[2],10)-(parseInt(Math.abs(newOffer.offers),10)*parseInt(newValues.resSell,10));
					if( document.getElementById('res_buy_wood').checked ) 
						sourceVillage[0] = parseInt(sourceVillage[0],10)+(parseInt(Math.abs(newOffer.offers),10)*parseInt(newValues.resBuy,10)/2);
					if( document.getElementById('res_buy_stone').checked ) 
						sourceVillage[1] = parseInt(sourceVillage[1],10)+(parseInt(Math.abs(newOffer.offers),10)*parseInt(newValues.resBuy,10)/2);
					if( document.getElementById('res_buy_iron').checked ) 
						sourceVillage[2] = parseInt(sourceVillage[2],10)+(parseInt(Math.abs(newOffer.offers),10)*parseInt(newValues.resBuy,10)/2);
					lib.storage.setValue("villageData_"+lib.game_data.player.id+"_"+lib.game_data.village.id,sourceVillage.join());
				}
			}
	}, false);

    var vistables = lib.xPath('//table[contains(@class, "vis")]');
	var vis = vistables[vistables.length-1];
	var nameTags = vis.getElementsByTagName("input");
	for( var i=0 ; i<nameTags.length ; i++ ) {
		if( nameTags[i].name.match(/all/) ) {
			vis = vistables[vistables.length-2];
			break;
		}
	}
	
	var tr = vis.appendChild( document.createElement("tr") );
	var th =  tr.appendChild( document.createElement("th") );
	th.innerHTML = "<u>"+gui[lib.lang].dsStorageOffer+"</u>";
	th.colSpan = "3";
   	var table = document.createElement("table");
	
	tr = vis.appendChild( document.createElement("tr") );
	var td = vis.appendChild( document.createElement("td") );
	table.id = "DSStorageBalancerPreview";
	td.colSpan = "3";	
	td.appendChild(table);

	var img = th.appendChild(document.createElement("img"));
	img.src = "/graphic/sorthandle.png?1";
	img.setAttribute("style", "margin-left:1em;");
	img.style.cursor = "pointer";
	img.addEventListener("click",function() {
		var preview = document.getElementById("DSStorageBalancerPreview");
		for( var i=0 ; i<lib.hotkeys.keys.length ; i++) {
			if( lib.hotkeys.keys[i].key == hotkeys.keys.keysMarketOwnOffer.sbOffer[1] ) lib.hotkeys.keys.splice(i,1);}
		if( checkboxes.fadeOutOwnOfferTable ) {
        		var newOffer = new NewOffer();
			var ownGUI = new guiOwnOffer(newOffer);
			document.getElementById("DSStorageBalancerPreview").appendChild(ownGUI.tr);
			checkboxes.fadeOutOwnOfferTable = false; lib.hotkeys.keys.push( { key: hotkeys.keys.keysMarketOwnOffer.sbOffer, event: { id: "dssb_button", event: "click" } } );
		} else {
			var tabletr = preview.getElementsByTagName("tr")[0]; preview.removeChild(tabletr);
			checkboxes.fadeOutOwnOfferTable=true; 
		}
		lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
	},false);

	if( !checkboxes.fadeOutOwnOfferTable ) {
        var newOffer = new NewOffer();
		var ownGUI = new guiOwnOffer(newOffer); 
		lib.hotkeys.keys.push( { key: hotkeys.keys.keysMarketOwnOffer.sbOffer, event: { id: "dssb_button", event: "click" } } );
	}
    
	}
	}

	/*mode=send*/
	if( location.href.match(/screen=market/) && location.href.match(/try=confirm_send/) && !document.getElementById("inputx") ) {
        	var inputs = document.getElementsByTagName("input");
        	var submit = "";
       		for( var i=0 ; i<inputs.length ; i++ ) {
            		if( inputs[i].type == "submit" ) submit = inputs[i];}
        	submit.value=lib.createTextNode(gui[lib.lang].submitButton+lib.showHotkey( hotkeys.keys.keysMarketSendRes.marketConfirm ) ).textContent;
			submit.addEventListener("click",function() {
				if( lib.firefox ) this.disabled = true;
				if( lib.pa ) {
					var table = document.getElementsByClassName("vis")[0];
					var destinationPlayer = table.getElementsByTagName("td")[3].textContent;
					if( lib.game_data.player.name == destinationPlayer ) {
						var destinationName = table.getElementsByTagName("td")[1].textContent.split("(");
						var villId = table.getElementsByTagName("td")[1].getElementsByTagName("a")[0].href.match(/id=(\d+)/)[1];
						destinationName = destinationName[destinationName.length-1].split(")")[0].toString().replace("|","_");						
						var dummyTrades = lib.storage.getValue("DummyTrades_player.id"+lib.game_data.player.id,{});
						var dum = {}, boole = false;
						
						for( var ey in dummyTrades ) {	
							if( ey == lib.game_data.village.id && !boole ) {boole = true; dum = dummyTrades[ey];}
							/* delete and allocate dummy-values from other villages */
							else if( ey != lib.game_data.village.id ) {
								for( var sec in dummyTrades[ey] ) {
									var tradeValues = dummyTrades[ey][sec];
									destinationName = tradeValues.coords;
									delete tradeValues["coords"];
									lib.storage.setValue("Trade_player.id"+lib.game_data.player.id+"_"+destinationName,tradeValues);
								}
								delete dummyTrades[ey];
							}							
						}
						
						dummyTrades[lib.game_data.village.id] = dum;
						if( dummyTrades[lib.game_data.village.id][villId] != null )
							var tradesDefault = dummyTrades[lib.game_data.village.id][villId];
						else var tradesDefault = {coords: destinationName, wood: [], clay: [], iron: [], dateOfArrival:[]};
						dummyTrades[lib.game_data.village.id][villId] = tradesDefault;
						
						var arrayLength = dummyTrades[lib.game_data.village.id][villId].wood.length+1;
						var resName = table.getElementsByTagName("td")[5].getElementsByTagName("span");
						var resValue = table.getElementsByTagName("td")[5].textContent.split(" ");
						for( var r=0 ; r<resName.length ; r++ ) {
							if( resName[r].className.replace(/icon header /,"") == "wood" )
								dummyTrades[lib.game_data.village.id][villId].wood.push( parseInt(resValue[r+1].replace(".",""),10 ) );
							if( resName[r].className.replace(/icon header /,"") == "stone" )
								dummyTrades[lib.game_data.village.id][villId].clay.push( parseInt(resValue[r+1].replace(".",""),10 ) );
							if( resName[r].className.replace(/icon header /,"") == "iron" ) 
								dummyTrades[lib.game_data.village.id][villId].iron.push( parseInt(resValue[r+1].replace(".",""),10 ) );
							r++;
        	           	}
						if( dummyTrades[lib.game_data.village.id][villId].wood.length < arrayLength ) dummyTrades[lib.game_data.village.id][villId].wood.push( 0 );
						if( dummyTrades[lib.game_data.village.id][villId].clay.length < arrayLength ) dummyTrades[lib.game_data.village.id][villId].clay.push( 0 );
						if( dummyTrades[lib.game_data.village.id][villId].iron.length < arrayLength ) dummyTrades[lib.game_data.village.id][villId].iron.push( 0 );
						var time = new lib.getServerTime();
						var lengthOfTime = table.getElementsByTagName("td")[9].textContent.split(":");
						var timeMs = (parseInt(lengthOfTime[2]) + lengthOfTime[1]*60 + lengthOfTime[0]*3600)*1000;
            	   		time = new Date(time.getTime()+timeMs).getTime();
	               		dummyTrades[lib.game_data.village.id][villId].dateOfArrival.push( time );
						lib.storage.setValue("DummyTrades_player.id"+lib.game_data.player.id,dummyTrades);
						
						var updateDestination = lib.storage.getValue("villageData_"+lib.game_data.player.id+"_"+lib.game_data.village.id,"undefined");
						if( updateDestination != "undefined" ) {
							updateDestination = updateDestination.split(",");
							var resName = table.getElementsByTagName("td")[5].getElementsByTagName("img");
							var resValue = table.getElementsByTagName("td")[5].textContent.split(" ");
							for( var r=0 ; r<resName.length ; r++ ) {
								if( resName[r].title == gui[lib.lang].wood )
									updateDestination[0] = updateDestination[0] - parseInt(resValue[r].replace(".","") );
								if( resName[r].title == gui[lib.lang].clay )
									updateDestination[1] = updateDestination[1] - parseInt(resValue[r].replace(".","") );
								if( resName[r].title == gui[lib.lang].iron ) 
									updateDestination[2] = updateDestination[2] - parseInt(resValue[r].replace(".","") );
							}
							lib.storage.setValue("villageData_"+lib.game_data.player.id+"_"+lib.game_data.village.id,updateDestination.join());
						}
					}
				}
			}, false);
        	submit.id="submits";
	        lib.hotkeys.keys.push( { key: hotkeys.keys.keysMarketSendRes.marketConfirm, event: { id: "submits", event: "click" } } );
			
			/* time counter */
			if( !checkboxes.disableConTimeM ) {
				var td = document.getElementsByClassName("vis")[0].getElementsByTagName("td");
				var dura = td[9].textContent.split(":");
				var millis = (parseInt(dura[0],10)*3600+parseInt(dura[1],10)*60+parseInt(dura[2],10))*1000;
				
				var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
				if( MutationObserver != undefined && !lib.chrome ) {
					var observer = new MutationObserver(function (mutations) {
						mutations.forEach( function(mutation) {
							td[11].innerHTML = newTimeCounter(parseInt(lib.getServerTime().getTime(),10)+millis);
							td[13].innerHTML = newTimeCounter(parseInt(lib.getServerTime().getTime(),10)+(2*millis));
						});
					});
					observer.observe(document.getElementById("serverTime"), { childList: true });
				} else {
                    if( lib.chrome ) var name = "DOMSubtreeModified"; else var name = "DOMNodeInserted";
					document.getElementById("serverTime").addEventListener( name, function() {
						td[11].innerHTML = newTimeCounter(parseInt(lib.getServerTime().getTime(),10)+millis);
						td[13].innerHTML = newTimeCounter(parseInt(lib.getServerTime().getTime(),10)+(2*millis));
					}, false );
				}		
			}
    }

    /*screen=market: last village link */
    if( location.href.match(/screen=market/) && document.getElementById("inputx") ) {
        var inputs = document.getElementsByTagName("form")[0].getElementsByTagName("input");
        inputs[inputs.length-1].value = lib.createTextNode(gui[lib.lang].submitButton+lib.showHotkey( hotkeys.keys.keysMarketSendRes.sendRes )).textContent;
        inputs[inputs.length-1].removeAttribute("style");
        inputs[inputs.length-1].id = "submit";
        lib.hotkeys.keys.push( { key: hotkeys.keys.keysMarketSendRes.sendRes, event: { id: "submit", event: "click" } } );

		var a = inputs[4].parentNode.parentNode.getElementsByTagName("td")[1].getElementsByTagName("a");
		if( a.length <= 2 ) {
			var newA = a[1].parentNode.insertBefore( document.createElement("a"), a[1] );
			newA.innerHTML = gui[lib.lang].own;
			newA.className = "inactive";
		}
		a[0].id = "favourite"; a[1].id = "ownVillages"; a[2].id = "course";
		a[0].textContent += lib.showHotkey( hotkeys.keys.keysMarketSendRes.favourite );
		a[1].textContent += lib.showHotkey( hotkeys.keys.keysMarketSendRes.ownVillages );
		a[2].textContent += lib.showHotkey( hotkeys.keys.keysMarketSendRes.course );
		lib.hotkeys.keys.push( { key: hotkeys.keys.keysMarketSendRes.favourite, event: { id: "favourite", event: "click" } } );
		lib.hotkeys.keys.push( { key: hotkeys.keys.keysMarketSendRes.ownVillages, event: { id: "ownVillages", event: "click" } } );
		lib.hotkeys.keys.push( { key: hotkeys.keys.keysMarketSendRes.course, event: { id: "course", event: "click" } } );

	if( !checkboxes.disableLastVillage ) {
        	inputs[inputs.length-1].addEventListener("click",function() {
        	    		if( lib.firefox ) this.disabled = true;
                        var values = {  wood: inputs[1].value, clay: inputs[2].value, iron: inputs[3].value,
                                        x: inputs[4].value, y: inputs[5].value,};
                        lib.storage.setValue("LastMarketInput_player.id"+lib.game_data.player.id,values);},false);
        	var a = document.createElement("a");
        	a.setAttribute("href","javascript:;"); a.setAttribute("id","DSStorageBalancer_lastActionLink");
        	a.appendChild(lib.createTextNode(gui[lib.lang].last+lib.showHotkey( hotkeys.keys.keysMarketSendRes.lastVillage )));
        	a.addEventListener("click",function() {
        	                var defaultValues = {wood: 0, clay: 0, iron: 0, x: "0", y: "0",};
        	                var values = lib.storage.getValue("LastMarketInput_player.id"+lib.game_data.player.id,defaultValues);
        	                if( inputs[4].value != values.x && inputs[5].value != values.y ) {inputs[4].value = values.x; inputs[5].value = values.y;}
        	                else {var inputsA = document.getElementsByTagName("form")[0].getElementsByTagName("a");
        	                    if( parseInt(inputsA[1].textContent.replace(/[()]/g,""),10) < values.wood ) 
        	                            inputs[1].value = inputsA[1].textContent.replace(/[()]/g,"");
        	                    else inputs[1].value = values.wood; 
        	                    if( parseInt(inputsA[2].textContent.replace(/[()]/g,""),10) < values.clay ) 
        	                            inputs[2].value = inputsA[2].textContent.replace(/[()]/g,"");
        	                    else inputs[2].value = values.clay; 
        	                    if( parseInt(inputsA[3].textContent.replace(/[()]/g,""),10) < values.iron ) 
        	                            inputs[3].value = inputsA[3].textContent.replace(/[()]/g,"");
        	                    else inputs[3].value = values.iron;}
        	},false);
        	lib.hotkeys.keys.push( { key: hotkeys.keys.keysMarketSendRes.lastVillage, event: { id: "DSStorageBalancer_lastActionLink", event: "click" } } );

			inputs[4].parentNode.parentNode.style.whiteSpace = "noWrap";
        	var node = inputs[4].parentNode.parentNode.getElementsByTagName("td")[1];
        	for( var i=0 ; i<node.childNodes.length-2 ; i++ ) {
        	    if( node.childNodes[i].nodeName == "BR" )
        	        inputs[4].parentNode.parentNode.getElementsByTagName("td")[1].removeChild(node.childNodes[i]);}
        	var hrefs = inputs[4].parentNode.parentNode.getElementsByTagName("td")[1].getElementsByTagName("a");
        	var tr = new Array(2); 
			if( lib.pa )
				var td = new Array(4);
			else var td = new Array(2);
        	for( var i=0 ;i<tr.length ; i++ ) {
        	    tr[i] = document.createElement("tr");
        	    inputs[4].parentNode.parentNode.getElementsByTagName("td")[1].appendChild(tr[i]);}
        	for( var i=0 ;i<td.length ; i++ ) {
        	    td[i] = document.createElement("td");
				if( lib.pa )
					tr[Math.floor(i/tr.length)].appendChild(td[i]);
				else tr[i].appendChild(td[i]);
        	    if( i<td.length-1 ) td[i].appendChild(hrefs[0]);
        	    else td[i].appendChild(a);
        	}
	}
    }
	/*screen=market: send resources*/
	if( location.href.match(/screen=market/) && document.getElementById("inputx") && lib.pa &&  !checkboxes.disableSendResources ) {
		var vistables = lib.xPath('//table[contains(@class, "vis")]');
       	var th = document.createElement("th");
		th.colSpan="2";
		vistables[3].appendChild(th);
		
		/* nowrap in normal shown res inputs */
		document.getElementsByClassName("resources_max")[0].parentNode.parentNode.parentNode.style.whiteSpace = "nowrap";	
		
        var tr = new Array(6);
       	for( var i=0 ; i<tr.length ; i++ ) {
           	tr[i] = document.createElement("tr");
			tr[i].style.whiteSpace = "nowrap";
			tr[i].style.height = "28px";
		}
        var td = new Array(26);
       	for( var i=0 ; i<td.length ; i++ ) {
      		td[i] = document.createElement("td");
		}
		var table = document.createElement("table");
		tr[0].id = "DSStorageBalancerPreview";
		var offerList=[];  
		var filter = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings);

		var newList = function() { 
			if( document.getElementById("closepopup") != null ) lib.fireEvent( document.getElementById("closepopup"),"click" );
			
			var GenOffers = function() {
				this.filter = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings);
				this.sourceWood=new Number(document.getElementById('wood').innerHTML);
				this.sourceClay=new Number(document.getElementById('stone').innerHTML);
				this.sourceIron=new Number(document.getElementById('iron').innerHTML);
				this.storage = new Number(document.getElementById('storage').innerHTML);
				this.time = new lib.getServerTime();
				this.traders = parseInt(vistables[1].getElementsByTagName("th")[0].textContent.split(":")[1].replace(/ /g,"").split("/")[0],10);
				this.updateSourceData = [];
				this.updateSourceData.push( this.sourceWood, this.sourceClay, this.sourceIron, this.storage, this.traders, this.time.getTime(), lib.game_data.village.id, lib.game_data.village.coord, lib.game_data.village.name );
				lib.storage.setValue("villageData_"+lib.game_data.player.id+"_"+lib.game_data.village.id,this.updateSourceData.join());
			
				/* villageData als Array an update trades uebergeben */
				this.updateTrades = function(village) {
					/* coords are at village[7], exist trade? */
					this.trade = lib.storage.getValue("Trade_player.id"+lib.game_data.player.id+"_"+village[7].split("|")[0]+"_"+village[7].split("|")[1],undefined);
					if( this.trade != undefined ) {
						for( this.i=0 ; this.i<this.trade.dateOfArrival.length ; this.i++ ) {
							this.dateOfArrival = parseInt(this.trade.dateOfArrival[this.i],10);
							/* is trade in village? */
							if( this.dateOfArrival < lib.getServerTime().getTime() ) {
								if( parseInt( village[5],10) < this.dateOfArrival ) {
									village[0] = parseInt(village[0],10)+parseInt(this.trade.wood[this.i],10);
									village[1] = parseInt(village[1],10)+parseInt(this.trade.clay[this.i],10);
									village[2] = parseInt(village[2],10)+parseInt(this.trade.iron[this.i],10);
									lib.storage.setValue("villageData_"+lib.game_data.player.id+"_"+village[6],village.join());
								}
								this.trade.wood.splice(this.i,1); this.trade.clay.splice(this.i,1); this.trade.iron.splice(this.i,1); this.trade.dateOfArrival.splice(this.i,1);
								if( this.trade.wood.length == 0 ) lib.storage.deleteValue("Trade_player.id"+lib.game_data.player.id+"_"+village[7].split("|")[0]+"_"+village[7].split("|")[1]);
								else lib.storage.setValue("Trade_player.id"+lib.game_data.player.id+"_"+village[7].split("|")[0]+"_"+village[7].split("|")[1],this.trade);
								this.i--;
							} else {
								village[0] = parseInt(village[0],10)+parseInt(this.trade.wood[this.i],10);
								village[1] = parseInt(village[1],10)+parseInt(this.trade.clay[this.i],10);
								village[2] = parseInt(village[2],10)+parseInt(this.trade.iron[this.i],10);
							}			
						}
					}
					return village;
				}
			
				/* exist trades to source? */
				this.updateSource = new this.updateTrades(this.updateSourceData);
				this.sourceWood=parseInt(this.updateSource[0],10);
				this.sourceClay=parseInt(this.updateSource[1],10);
				this.sourceIron=parseInt(this.updateSource[2],10);
			
				this.idOfVillages = lib.storage.getValue("DestinationVillages_player.id"+lib.game_data.player.id,"");
				if( this.idOfVillages == "" ) this.idOfVillages = [];
				else this.idOfVillages = this.idOfVillages.split(",");
			
				this.destinationVillages=[];
				for( this.i=0 ; this.i<this.idOfVillages.length ; this.i++ ) {
					/* if destination == source */
					if( this.idOfVillages[this.i] == lib.game_data.village.id ) continue;
					this.village = lib.storage.getValue("villageData_"+lib.game_data.player.id+"_"+this.idOfVillages[this.i],undefined);
					if( this.village != undefined ) {
						this.village = this.village.split(",");		
						/* exist trade? */
						this.village = new this.updateTrades(this.village);
					}
					this.destinationVillages.push( this.village );
				}

				if( this.destinationVillages.length > 0 ) {	
					/* offer border */
					if( !checkboxes.disableOfferBorder ) this.traders = this.traders - parseInt(filter.offerBorder,10);					

					if( this.traders > 0 ) {
						/* minRes border */
						if( !checkboxes.disableMinRes ) {
							if( checkboxes.minResPerCent ) {
								this.minRes = filter.minResPerCent;
								for( this.k=0 ; this.k<this.minRes.length ; this.k++ )
									this.minRes[this.k] = parseInt( this.minRes[this.k],10 )/100*this.storage;
							} else {this.minRes = filter.minRes;
								for( this.k=0 ; this.k<this.minRes.length ; this.k++ ) this.minRes[this.k] = parseInt( this.minRes[this.k],10 );}
							if( checkboxes.uniMinRes ) {
								if (parseInt(this.minRes[0]) > 0) {
									this.sourceWood = (this.sourceWood > this.minRes[0]) ? (this.sourceWood-this.minRes[0]) : 0;
									this.sourceClay = (this.sourceClay > this.minRes[0]) ? (this.sourceClay-this.minRes[0]) : 0;
									this.sourceIron = (this.sourceIron > this.minRes[0]) ? (this.sourceIron-this.minRes[0]) : 0;
								}
							} else {						
								if (parseInt(this.minRes[1]) > 0) this.sourceWood = (this.sourceWood > this.minRes[1]) ? (this.sourceWood-this.minRes[1]) : 0;
								if (parseInt(this.minRes[2]) > 0) this.sourceClay = (this.sourceClay > this.minRes[2]) ? (this.sourceClay-this.minRes[2]) : 0;
								if (parseInt(this.minRes[3]) > 0) this.sourceIron = (this.sourceIron > this.minRes[3]) ? (this.sourceIron-this.minRes[3]) : 0;
							}
						}

						/* generate offer res */
						var loopWood = this.sourceWood, loopClay = this.sourceClay, loopIron = this.sourceIron;
						var wood = 0, clay = 0, iron = 0, high = 0;
						while ( clay+wood+iron < (this.traders*1000) ) {
							high=0;
							if (loopWood >= loopClay && loopWood >= loopIron &&loopWood>0) {
								wood+=1000;loopWood -= 1000;high=1;}
							if( clay+wood+iron >= (this.traders*1000) ) break;
							if (loopClay >= loopWood && loopClay >= loopIron &&loopClay>0) {
								clay+=1000;loopClay -= 1000;high=1;}
							if( clay+wood+iron >= (this.traders*1000) ) break;
							if (loopIron >= loopWood && loopIron >= loopClay &&loopIron>0) {
								iron+=1000;loopIron -= 1000;high=1;}
							if ( high==0 ) {clay+=333;wood+=333;iron+=333;}
						}
						if (wood>this.sourceWood) wood=this.sourceWood;
						if (clay>this.sourceClay) clay=this.sourceClay;
						if (iron>this.sourceIron) iron=this.sourceIron;
						if( !checkboxes.useWood ) wood=0 ;
						if( !checkboxes.useClay ) clay=0 ;
						if( !checkboxes.useIron ) iron=0 ;
						while ( clay+wood+iron > this.traders*1000 ) {
							if (wood>=clay && wood>=iron) wood-=1000; 
							else if (clay>=wood&& clay>=iron) clay-=1000;
							else iron-=1000;
						}
						this.offerList = [];
						var sourceCoords = lib.game_data.village.coord.split("|");
						for( var i=0 ; i<this.destinationVillages.length ; i++ ) {
							var destinationVillage = {villageName: this.destinationVillages[i].slice(8).join(""), villageCoord: this.destinationVillages[i][7], villageId: this.destinationVillages[i][6],
								villageWood: parseInt(this.destinationVillages[i][0],10), villageClay: parseInt(this.destinationVillages[i][1],10), villageIron: parseInt(this.destinationVillages[i][2],10),
								wood: parseInt(wood,10), clay: parseInt(clay,10), iron: parseInt(iron,10), storage: parseInt(this.destinationVillages[i][3],10)};
				
							/* calculate and check distance */
							var coords = destinationVillage.villageCoord.split("|");
							var distance = Math.sqrt( Math.pow(parseInt(sourceCoords[0],10)-parseInt(coords[0],10),2)+Math.pow(parseInt(sourceCoords[1],10)-parseInt(coords[1],10),2) );
							if( checkboxes.distanceFilterCheckbox ) {
								var maxDistance = parseInt( filter.distanceFilter , 10 );
								if( maxDistance < distance ) continue;
							}
							destinationVillage.distance = distance;

							/* maxStorage */
							if( !checkboxes.disableMaxRes) {
								var villageStorage = parseInt(destinationVillage.storage,10);    
								if( checkboxes.maxResPerCent ) {  
									var maxStorage=[];
									for( this.f=0 ; this.f<4 ; this.f++ ) maxStorage.push( Math.floor( villageStorage/100*(parseInt(this.filter.maxResPerCent[this.f],10))) ); 
								} else { 
									var maxStorage=[];  
									for( this.f=0 ; this.f<4 ; this.f++ ) 
										maxStorage.push( ( parseInt(this.filter.maxRes[this.f],10) <= villageStorage ? parseInt(this.filter.maxRes[this.f],10) : parseInt(villageStorage,10)*0.9 ) ); 
								}  
							} else {var maxStorage=[]; maxStorage.push( Math.floor(parseInt(destinationVillage.storage,10)*0.95) )}; 
							if( checkboxes.uniMaxRes || checkboxes.disableMaxRes ) {
								if( parseInt(this.destinationVillages[i][0],10) + wood > maxStorage[0] ) 
									destinationVillage.wood = (maxStorage[0]-parseInt(this.destinationVillages[i][0],10)) >= 0 ? Math.floor(maxStorage[0]-parseInt(this.destinationVillages[i][0],10)) : 0;
								if( parseInt(this.destinationVillages[i][1],10) + clay > maxStorage[0] ) 
									destinationVillage.clay = (maxStorage[0]-parseInt(this.destinationVillages[i][1],10)) >= 0 ? Math.floor(maxStorage[0]-parseInt(this.destinationVillages[i][1],10)) : 0;
								if( parseInt(this.destinationVillages[i][2],10) + iron > maxStorage[0] ) 
									destinationVillage.iron = (maxStorage[0]-parseInt(this.destinationVillages[i][2],10)) >= 0 ? Math.floor(maxStorage[0]-parseInt(this.destinationVillages[i][2],10)) : 0;
							} else {
								if( parseInt(this.destinationVillages[i][0],10) + wood > maxStorage[1] ) 
									destinationVillage.wood = (maxStorage[1]-parseInt(this.destinationVillages[i][0],10)) >= 0 ? Math.floor(maxStorage[1]-parseInt(this.destinationVillages[i][0],10)) : 0;
								if( parseInt(this.destinationVillages[i][1],10) + clay > maxStorage[2] ) 
									destinationVillage.clay = (maxStorage[2]-parseInt(this.destinationVillages[i][1],10)) >= 0 ? Math.floor(maxStorage[2]-parseInt(this.destinationVillages[i][1],10)) : 0;
								if( parseInt(this.destinationVillages[i][2],10) + iron > maxStorage[3] ) 
									destinationVillage.iron = (maxStorage[3]-parseInt(this.destinationVillages[i][2],10)) >= 0 ? Math.floor(maxStorage[3]-parseInt(this.destinationVillages[i][2],10)) : 0;
							}  
							if( !checkboxes.disableMinSendBorder )	{
								if( destinationVillage.wood+destinationVillage.clay+destinationVillage.iron < parseInt(filter.minSendBorder,10) ) continue;
							}
						    	
							if( destinationVillage.wood+destinationVillage.clay+destinationVillage.iron == 0 ) continue;
							if( destinationVillage.wood > new Number(document.getElementById('wood').innerHTML) ) continue;
							if( destinationVillage.clay > new Number(document.getElementById('stone').innerHTML) ) continue;
							if( destinationVillage.iron > new Number(document.getElementById('iron').innerHTML) ) continue;
							
							/* calculate efficiency, create offerListArray */
							var w = parseInt(destinationVillage.wood,10), c = parseInt(destinationVillage.clay,10), ir = parseInt(destinationVillage.iron,10);
							var vsum = parseInt(w+c+ir,10); var sum = parseInt(this.destinationVillages[i][0],10)+parseInt(this.destinationVillages[i][1],10)+parseInt(this.destinationVillages[i][2],10);
							var value = ((this.destinationVillages[i][0]/sum)*((this.destinationVillages[i][0]/sum*100)-(w/vsum*100)))
								+((this.destinationVillages[i][1]/sum)*((this.destinationVillages[i][1]/sum*100)-(c/vsum*100)))
								+((this.destinationVillages[i][2]/sum)*((this.destinationVillages[i][2]/sum*100)-(ir/vsum*100)));
							if( checkboxes.disableBadEQ ) { if( value <= 0 ) continue;}
							destinationVillage.efficiency = value;
							
							if( (checkboxes.isSorted[0] != "dssb_sortWithEQ" || checkboxes.isSorted[1]) && !checkboxes.disableSortSendResources ) {
								value = 0;
								if( checkboxes.isSorted[0] == "dssb_sortWoodInDestinationVillage" ) value += parseInt(destinationVillage.villageWood,10);
								else if( checkboxes.isSorted[0] == "dssb_sortClayInDestinationVillage" ) value += parseInt(destinationVillage.villageClay,10);
								else if( checkboxes.isSorted[0] == "dssb_sortIronInDestinationVillage" ) value += parseInt(destinationVillage.villageIron,10);
								else if( checkboxes.isSorted[0] == "dssb_sortWoodInSourceVillage" ) value += parseInt(destinationVillage.wood,10);
								else if( checkboxes.isSorted[0] == "dssb_sortClayInSourceVillage" ) value += parseInt(destinationVillage.clay,10);
								else if( checkboxes.isSorted[0] == "dssb_sortIronInSourceVillage" ) value += parseInt(destinationVillage.iron,10);
								else if( checkboxes.isSorted[0] == "dssb_sortWithDistanceToSourceVillage" ) value += destinationVillage.distance,10;
								else if( checkboxes.isSorted[0] == "dssb_sortWithEQ" ) value += destinationVillage.efficiency,10;
							}

							this.offerList.push( [value, destinationVillage] );
							if( !checkboxes.isSorted[1] ) this.offerList.sort(function(a,b) {return b[0]-a[0]});
							else this.offerList.sort(function(a,b) {return a[0]-b[0]});
							if( this.offerList.length > 10 ) this.offerList.pop();

						}
						for( var i=0 ; i<this.offerList.length ; i++ )
							this.offerList[i]=this.offerList[i][1];
						if( this.offerList.length == 0) this.offerList.push({wood: 0, clay: 0, iron: 0, villageName: gui[lib.lang].noOffer, villageId: 0, villageWood: "", 
							villageClay: "", villageIron: "", storage: "", villageCoord: lib.game_data.village.coord, efficiency:0,});
					} else {this.offerList = [];
						this.offerList.push({wood: 0, clay: 0, iron: 0, villageName: gui[lib.lang].notEnoughMarketeers, villageId: 0, villageWood: "", villageClay: "", villageIron: "", storage: "", 
							villageCoord: lib.game_data.village.coord, efficiency:0,});var sourceCoords = lib.game_data.village.coord.split("|");}
				} else {this.offerList = [];
					this.offerList.push({wood: 0, clay: 0, iron: 0, villageName: gui[lib.lang].noOffer, villageId: 0, villageWood: "", villageClay: "", villageIron: "", storage: "", 
						villageCoord: lib.game_data.village.coord, efficiency:0,});var sourceCoords = lib.game_data.village.coord.split("|");}

				for( var i=0 ; i<this.offerList.length ; i++ ) {		
					/*calculate time*/
					var distanceSec = ( parseInt( 360/( parseFloat(lib.storage.getValue("speed",1)) ),10 ) ) * parseFloat(this.offerList[i].distance,10);
					var distH = 0; var distMin = 0;

					while( distanceSec/3600 >= 1 ) {distanceSec-=3600; distH += 1;}
					while( distanceSec/60 >= 1 ) {distanceSec-=60; distMin += 1;}
					distanceSec = Math.round(distanceSec);
					if( distanceSec == 60 ) {distanceSec -=60; distMin += 1;}
					if( distMin == 60 ) {distMin -=60; distH += 1;}
					distMin += ""; distanceSec += "";
					if( distMin.length == 1 ) distMin = "0" + distMin;
					if( distanceSec.length == 1 ) distanceSec = "0" + distanceSec;
					this.offerList[i].runtime = distH + ":" + distMin + ":" + distanceSec + "h";
				}
				offerList=this.offerList;
				return this.offerList;
			};
			this.offerList = new GenOffers();
			
			var offerGui = function(num,td,first) {
				td[1].innerHTML = "<img src='/graphic/holz.png?1'> " + (first? 0 : (offerList[num].wood == 0 ? "-" : (checkboxes.disableAbsoluteDisplay ? lib.formatNumber(parseInt(offerList[num].wood,10)) : offerList[num].wood )));
				td[2].innerHTML = "<img src='/graphic/lehm.png?1'> " + (first? 0 : (offerList[num].clay == 0 ? "-" : (checkboxes.disableAbsoluteDisplay ? lib.formatNumber(parseInt(offerList[num].clay,10)) : offerList[num].clay )));
				td[3].innerHTML = "<img src='/graphic/eisen.png?1'> " + (first? 0 : (offerList[num].iron == 0 ? "-" : (checkboxes.disableAbsoluteDisplay ? lib.formatNumber(parseInt(offerList[num].iron,10)) : offerList[num].iron )));
				td[6].innerHTML = first ? "<i id='dssb_noOfferYet'>- "+((offerList.length > 0 && offerList[0].distance > 0 ) ? gui[lib.lang].offerAvai : gui[lib.lang].noOfferAvai)+" -</i>" : "<b>"+offerList[num].villageName+"</b>";
				td[8].innerHTML = first? "-" : "(<img src='/graphic/holz.png?1'>"+(checkboxes.disableAbsoluteDisplay ? lib.formatNumber(parseInt(offerList[num].villageWood,10)) : offerList[num].villageWood )
					+" <img src='/graphic/lehm.png?1'>"+(checkboxes.disableAbsoluteDisplay ? lib.formatNumber(parseInt(offerList[num].villageClay,10)) : offerList[num].villageClay );
				td[8].innerHTML +=first? "" : " <img src='/graphic/eisen.png?1'>" + (checkboxes.disableAbsoluteDisplay ? lib.formatNumber(parseInt(offerList[num].villageIron,10)) : offerList[num].villageIron )+", "+" <img src='graphic/buildings/storage.png?1'>";
				td[8].innerHTML+= first? "" : (checkboxes.disableAbsoluteDisplay ? lib.formatNumber(parseInt(offerList[num].storage,10)) : offerList[num].storage )+")";
				if( offerList[num].villageWood == "" && offerList.length == 1 ) td[8].innerHTML = "-"; 
				if( offerList[num].wood == "-" ) td[8].innerHTML = "-";
				var area = offerList[num].distance != 1 ? gui[lib.lang].fields : gui[lib.lang].field;
				td[12].innerHTML = first? "-" : (Math.round(offerList[num].distance*10)/10 + " " + area);
				td[14].innerHTML = first? "-" : offerList[num].runtime;
			}
			
			td[4].innerHTML = "";
			var a = td[4].appendChild(document.createElement("a"));
			a.href = "javascript:;"; 
			a.innerHTML = gui[lib.lang].otherOffer+lib.showHotkey( hotkeys.keys.keysMarketSendRes.otherOffer );
			a.id= "otherOffer";
			lib.hotkeys.keys.push( { key: hotkeys.keys.keysMarketSendRes.otherOffer, event: { id: "otherOffer", event: "click" } } );
			a.addEventListener("click",function() {
				var up = lib.createTextNode( String.fromCharCode(9650) );
				up.id = "dssb_up";
				var down = lib.createTextNode( String.fromCharCode(9660) );
				down.id = "dssb_down";
				var popup = document.getElementById("inline_popup");
    			popup.style.width="700px";
				popup.style.whiteSpace = "nowrap";
				var close = document.getElementById("inline_popup_menu").getElementsByTagName("a")[0];
				close.id="closepopup";
				close.addEventListener("click", function() {
					document.getElementById("inline_popup").style.display="none";
				}, false);
				lib.hotkeys.keys.push( { key: hotkeys.keys.keysMarketSendRes.closePopup, event: { id: "closepopup", event: "click" } } );
				var content = document.getElementById("inline_popup_main");
				content = document.getElementById("inline_popup_content");
				content.style.width="100%";
				content.innerHTML = "";
				popup.style.display = "block";
				popup.style.left = Math.round(Math.max(0,self.pageXOffset + (self.innerWidth-popup.offsetWidth)/2)) +"px";
				popup.style.top = Math.round(Math.max(0,self.pageYOffset + (self.innerHeight-popup.offsetHeight)/2)) + "px";
				var tab = content.appendChild( document.createElement("table") );	
				tab.className = "vis";
    			tab.style.width = "100%";
				var row = tab.insertRow(0);
				row.id = "dssb_offerlist";
				var cell = row.appendChild(document.createElement("th"));
				cell.colSpan="2";
				cell = row.appendChild(document.createElement("th"));
				cell.colSpan="3";
				cell.innerHTML = gui[lib.lang].available; cell.style.textAlign = "center";
				cell = row.appendChild(document.createElement("th"));
				cell.colSpan="3";
				cell.innerHTML = gui[lib.lang].sendRes; cell.style.textAlign = "center";
				cell = row.appendChild(document.createElement("th"));
				cell.colSpan="3";
				var row = tab.insertRow(1);
				cell = row.appendChild(document.createElement("th"));
				cell.innerHTML = gui[lib.lang].coords;
				cell.colSpan="2";
				cell.style.textAlign = "center";
				
				var layIds = ["WoodInDestinationVillage","ClayInDestinationVillage","IronInDestinationVillage","WoodInSourceVillage","ClayInSourceVillage","IronInSourceVillage","WithDistanceToSourceVillage","WithEQ"];
				var orna = [["holz","wood"],["lehm","clay"],["eisen","iron"],["holz","wood"],["lehm","clay"],["eisen","iron"],["","distanceShort"],["","eq"]], a;
				
				for( var m=0 ; m<layIds.length ; m++ ) {
					cell = row.appendChild( document.createElement("th") );
					cell.style.textAlign = "center";
					a = cell.appendChild( document.createElement("a") );
					a.href = "javascript:;";
					a.id = "dssb_sort"+layIds[m];
					if( orna[m][0] != "" ) a.innerHTML = "<img src='/graphic/"+orna[m][0]+".png' alt='"+gui[lib.lang][orna[m][1]]+"' title='"+gui[lib.lang][orna[m][1]]+"'>";
					else a.innerHTML = gui[lib.lang][orna[m][1]];
					
					/* sort otherOffers */
					a.addEventListener("click",function(e) {
						this.th = this.parentNode.parentNode.getElementsByTagName("th");
						for( this.i=0 ; this.i<this.th.length ; this.i++ ) this.th[this.i].className = "vis";
						if( document.getElementById("dssb_down") ) document.getElementById("dssb_down").parentNode.removeChild( document.getElementById("dssb_down") );
						if( document.getElementById("dssb_up") ) document.getElementById("dssb_up").parentNode.removeChild( document.getElementById("dssb_up") );
						this.parentNode.className = "selected";
						if( checkboxes.isSorted[0] == this.id ) {
							if( checkboxes.isSorted[1] != false ) 
								this.parentNode.appendChild( down );
							else this.parentNode.appendChild( up );
						} else {
							this.parentNode.appendChild( up );
							checkboxes.isSorted[1] = false;
						}
						this.trPopup = popup.getElementsByTagName("tr"); this.sorted=[]; this.sortOffers=[];
						this.index = this.trPopup[1].getElementsByTagName("th");
						for( this.i=0 ; this.i<this.index.length ; this.i++ ) {
							if( this.index[this.i].innerHTML == this.parentNode.innerHTML ) {
								this.index= parseInt(this.i,10)+1;
								break;
							}
						}
						for( var i=2 ; i<this.trPopup.length ; i++ ) {
							this.value = this.trPopup[i].getElementsByTagName("td")[this.index].textContent == "-" ? 0 : parseInt(this.trPopup[i].getElementsByTagName("td")[this.index].textContent,10);
							this.sorted.push( [this.value,this.trPopup[i] ] );
							this.sortOffers.push( [this.value,offerList[i-2]] );
						}
						if( checkboxes.isSorted[1] ) {
							this.sorted.sort(function(a,b) {return b[0]-a[0]}); 
							this.sortOffers.sort(function(a,b) {return b[0]-a[0]}); this.sortOffers = offerList;
							checkboxes.isSorted[0]=this.id; checkboxes.isSorted[1]=false;
						} else {
							this.sorted.sort(function(a,b) {return a[0]-b[0]}); checkboxes.isSorted[0]=this.id; checkboxes.isSorted[1]=true;
							this.sortOffers.sort(function(a,b) {return a[0]-b[0]}); this.sortOffers = offerList;
						}
						for( var i=0 ; i< this.sorted.length ; i++ ) {
							this.sorted[i][1].getElementsByTagName("td")[0].innerHTML = i+1+".";
							tab.appendChild(this.sorted[i][1]);
						}
						if( !checkboxes.disableSortSendResources )
							lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
						new GenOffers();
					}, false);
				}
				
				document.getElementById(checkboxes.isSorted[0]).parentNode.className="selected";
				checkboxes.isSorted[1] ? document.getElementById(checkboxes.isSorted[0]).parentNode.appendChild( up ) : document.getElementById(checkboxes.isSorted[0]).parentNode.appendChild( down );	
				var dummyTrades = lib.storage.getValue("DummyTrades_player.id"+lib.game_data.player.id,{})[lib.game_data.village.id];
				
				for( var i=0 ; i<offerList.length ; i++ ) {
					if( offerList[i].villageWood == "" ) break;
					var row = tab.appendChild( document.createElement("tr") );
					var tdPopup = new Array(10), boole = false;
        			for( var e=0 ; e<tdPopup.length ; e++ ) {tdPopup[e] = row.appendChild( document.createElement("td") );}
					tdPopup[0].innerHTML = (i+1)+".";
					if( dummyTrades != null ) {
						if( dummyTrades[offerList[i].villageId] != null ) {
							boole = true; 
							row.style.color = "grey";
							tdPopup[1].innerHTML = offerList[i].villageCoord;
							tdPopup[1].title = offerList[i].villageName;
						} 
					}
					if( !boole ) {
						var a = tdPopup[1].appendChild( document.createElement("a") );
						a.href= "javascript:;";
						a.id = offerList[i].villageId;
						a.title = offerList[i].villageName;
						a.innerHTML = offerList[i].villageCoord;
						a.addEventListener("click",function() {		
							var num = parseInt( this.parentNode.parentNode.getElementsByTagName("td")[0].textContent.replace(".",""), 10 )-1;
							var FillIn = new offerGui(num,td,false);
							var okButton = new button(list,num);
							popup.style.display="none";
						}, false);
					}
					tdPopup[2].innerHTML = offerList[i].villageWood;
					tdPopup[3].innerHTML = offerList[i].villageClay;
					tdPopup[4].innerHTML = offerList[i].villageIron;
					tdPopup[5].innerHTML = offerList[i].wood == 0 ? "-" : offerList[i].wood;
					tdPopup[6].innerHTML = offerList[i].clay == 0 ? "-" : offerList[i].clay;
					tdPopup[7].innerHTML = offerList[i].iron == 0 ? "-" : offerList[i].iron;
					tdPopup[8].innerHTML = Math.floor(offerList[i].distance);
					tdPopup[9].innerHTML = Math.floor(offerList[i].efficiency);		
				}
			},false);
			var span = td[4].appendChild( document.createElement("span") );
			span.style.paddingRight = "10px";
			var input = td[4].appendChild( document.createElement("input") );
			input.type = "checkbox";
			input.checked = checkboxes.durableOffer;
			input.id = "dssb_durableOffer";
			if( input.checked && !checkboxes.fadeOutTable ) lib.fireEvent(a,"click");
			input.addEventListener("change",function() {
				if( this.checked ) lib.fireEvent(a,"click");
				checkboxes.durableOffer = this.checked;
				lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
			}, false);
			var label = td[4].appendChild( document.createElement("label") );
			label.innerHTML = gui[lib.lang].durable;
			
			td[19].innerHTML = "";
			var disableUsageOfWood = td[19].appendChild(document.createElement("input"));
			disableUsageOfWood.type="checkbox";
			disableUsageOfWood.checked = checkboxes.useWood;
			disableUsageOfWood.addEventListener("click", function(){ 
				if( this.checked ) checkboxes.useWood=true; else checkboxes.useWood=false;
				lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
				var list = new newList();
				var okButton = new button(list,0);
			}, false);
	
			var imgWood = document.createElement("img");
			imgWood.src = "/graphic/"+regExp[lib.lang].wood+".png?1";
			td[19].appendChild(imgWood);
			
			var disableUsageOfClay = td[19].appendChild(document.createElement("input"));
			disableUsageOfClay.type="checkbox";
			disableUsageOfClay.checked = checkboxes.useClay;
			disableUsageOfClay.addEventListener("click", function(){ 
				if( this.checked ) checkboxes.useClay=true; else checkboxes.useClay=false;
				lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
				var list = new newList();
				var okButton = new button(list,0);
			}, false);
			disableUsageOfClay.setAttribute("style", "margin-left:1.5em;");
			
			var imgClay = document.createElement("img");
			imgClay.src = "/graphic/"+regExp[lib.lang].clay+".png?1";
			td[19].appendChild(imgClay);
			
			var disableUsageOfIron = td[19].appendChild(document.createElement("input"));
			disableUsageOfIron.type="checkbox";
			disableUsageOfIron.checked = checkboxes.useIron;
			disableUsageOfIron.setAttribute("style", "margin-left:1.5em;");
			disableUsageOfIron.addEventListener("click", function(){ 
				if( this.checked ) checkboxes.useIron=true; else checkboxes.useIron=false;
				lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
				var list = new newList();
				var okButton = new button(list,0);
			}, false);
			
			var imgIron = document.createElement("img");
			imgIron.src = "/graphic/"+regExp[lib.lang].iron+".png?1";
			td[19].appendChild(imgIron);

			var firstFillIn = new offerGui(0,td,true);
			td[0].innerHTML = "<b>"+gui[lib.lang].send+"</b>";
			td[5].innerHTML = "<b>"+gui[lib.lang].sendTo+"</b>";
			td[7].innerHTML = "<b>"+gui[lib.lang].availableIn+"</b>";
			td[11].innerHTML = "<b>"+gui[lib.lang].distance+"</b>";
			td[13].innerHTML = "<b>"+gui[lib.lang].runtime+"</b>";
			td[9].innerHTML = "<b>"+gui[lib.lang].showGroups.groups+"</b>";
			var lastReadIn = lib.storage.getValue("LastReadIn_player.id"+lib.game_data.player.id,"");
			if( navigator.appName == "Opera" ) {
				if( lastReadIn != "" ) var date = new Date(lastReadIn.time).toGMTString().split(" ");
			} else if( lastReadIn != "" ) {var date = new Date(lastReadIn.time).toLocaleString().split(" ");}
			
			var groups = lastReadIn != "" ? lastReadIn.group.split(";") : "";
			if( groups.length > 3 ) groups[Math.floor(groups.length/2)]+="<br/>"; var group="";
			for( var i=0 ; i<groups.length-1 ; i++)  {group += groups[i].match(/<br/) ? groups[i] : groups[i]+", "}; group+= groups[groups.length-1];
			
			td[10].innerHTML = lastReadIn != "" ? group  : "-";
			td[20].innerHTML = "<b>"+gui[lib.lang].lastReadIn+"</b>";
			td[21].innerHTML = lastReadIn != "" ? date[0]+" "+date[1]+" "+date[2]+"<br/>"+date[3]+" "+date[4] : (gui[lib.lang].noReadIn[0]
				+"<br/>"+gui[lib.lang].noReadIn[1]);
			td[15].innerHTML = "<b>"+gui[lib.lang].villagePool+"</b>";
			this.idOfVillages = lib.storage.getValue("DestinationVillages_player.id"+lib.game_data.player.id,"").split(",");
			td[16].innerHTML = this.idOfVillages.length+" "+(this.idOfVillages.length == 1 ? gui[lib.lang].village : gui[lib.lang].villages);

			table.style.whiteSpace = "nowrap";
			td[17].colSpan="2";
			vistables[3].appendChild(tr[0]);
			tr[0].appendChild(td[17]);
			td[17].appendChild( table );
			
			tr[1].appendChild(td[0]);
			tr[1].appendChild(td[1]);
			td[1].style.textAlign = "right";
			tr[1].appendChild(td[2]);
			td[2].style.textAlign = "center";
			tr[1].appendChild(td[3]);
			td[3].style.textAlign = "left";
			tr[1].appendChild(td[4]);
			td[4].colSpan="2";
			tr[2].appendChild(td[5]);
			td[6].style.textAlign = "center";
			tr[2].appendChild(td[6]);
			td[6].colSpan="3";
			tr[3].appendChild(td[7]);
			tr[3].appendChild(td[8]);
			td[8].colSpan="3";
			td[8].style.textAlign = "center";
			tr[3].appendChild(td[9]);
			td[9].style.textAlign = "right";
			tr[3].appendChild(td[10]);
			tr[4].appendChild(td[11]);
			tr[4].appendChild(td[12]);
			td[12].style.textAlign = "center";
			tr[4].appendChild(td[13]);
			td[13].style.textAlign = "center";
			td[15].style.textAlign = "left";
			tr[4].appendChild(td[14]);
			tr[4].appendChild(td[15]);
			tr[4].appendChild(td[16]);
			tr[5].appendChild(td[18]);
			tr[5].appendChild(td[19]);
			td[19].colSpan = "2";
			td[19].style.textAlign = "center";
			tr[5].appendChild(td[20]);
			td[20].style.textAlign = "right";
			tr[5].appendChild(td[21]);
			td[21].style.textAlign = "center";
			td[21].colSpan="2";
			table.appendChild(tr[1]);
			table.appendChild(tr[2]);
			table.appendChild(tr[3]);
			table.appendChild(tr[4]);
			table.appendChild(tr[5]);
		};
		
		var button = function(target,num) {
			if( !checkboxes.fadeOutTable ) {
				td[18].innerHTML = "";
				this.button = td[18].appendChild( document.createElement("input") );
				this.button.type = "button";
				this.button.value = gui[lib.lang].submitButton+lib.showHotkey( hotkeys.keys.keysMarketSendRes.sbOffer );
				this.button.id = "dssb_button";
				if( target.offerList[0].villageWood == "" ) {
					this.button.disabled = true;
					var container = document.getElementById("menu_row2"); var a = container.getElementsByTagName("a");
					for( var i=0 ; i<lib.hotkeys.keys.length ; i++) {
						if( lib.hotkeys.keys[i].key == hotkeys.keys.keysMarketSendRes.sbOffer ) lib.hotkeys.keys.splice(i,1);}
				} else {
					if( document.getElementById("dssb_noOfferYet") != null ) this.button.disabled = true;
					else {
						this.button.disabled = false;
						lib.hotkeys.keys.push( { key: hotkeys.keys.keysMarketSendRes.sbOffer, event: { id: "dssb_button", event: "click" } } );
					}
				}
				this.button.addEventListener("click", function(){
					this.disabled = true;
					var x = 0;
                    if (/Version[\/\s](\d+\.\d+)/.test(navigator.userAgent) && navigator.appName == "Opera" ){
                        var oprversion=new Number(RegExp.$1);
                        if (oprversion<=10) var x = 1;
                    }
					document.getElementsByName('wood')[x].value = Math.floor(target.offerList[num].wood);
					document.getElementsByName('stone')[x].value = Math.floor(target.offerList[num].clay);
					document.getElementsByName('iron')[x].value = Math.floor(target.offerList[num].iron);
					document.getElementById('inputx').value =target.offerList[num].villageCoord.split("|")[0];
					document.getElementById('inputy').value = target.offerList[num].villageCoord.split("|")[1];
					var values = {wood: Math.floor(target.offerList[num].wood), clay: Math.floor(target.offerList[num].clay), iron: Math.floor(target.offerList[num].iron),
							x: target.offerList[num].villageCoord.split("|")[0], y: target.offerList[num].villageCoord.split("|")[1],};
					lib.storage.setValue("LastMarketInput_player.id"+lib.game_data.player.id,values);
					document.getElementById("submit").click();
                }, false);
			}
		}

		th.innerHTML = "<u>"+gui[lib.lang].storageBalancerOffer+"</u>";
		var img = th.appendChild(document.createElement("img"));
		img.src = "/graphic/sorthandle.png?1";
		img.setAttribute("style", "margin-left:1em;");
		img.style.cursor = "pointer";
		img.addEventListener("click",function() {
			var preview = document.getElementById("DSStorageBalancerPreview");
			if( preview.style.display=="none" ) {
				if( document.getElementById("dssb_button") != null ) document.getElementById("dssb_button").disabled=false;
				checkboxes.fadeOutTable = false;
				lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
				preview.style.display=""; 
				for( var i=0 ; i<lib.hotkeys.keys.length ; i++) {
					if( lib.hotkeys.keys[i].key == hotkeys.keys.keysMarketSendRes.sbOffer ) lib.hotkeys.keys.splice(i,1);}
				var list = new newList();
				var okButton = new button(list,0);
			} else {preview.style.display = "none"; checkboxes.fadeOutTable=true;
				if( document.getElementById("dssb_button") != null ) document.getElementById("dssb_button").disabled=true;
				for( var i=0 ; i<lib.hotkeys.keys.length ; i++) {
					if( lib.hotkeys.keys[i].key == hotkeys.keys.keysMarketSendRes.sbOffer ) lib.hotkeys.keys.splice(i,1);}
			}
			lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
		},false);

		if( !checkboxes.fadeOutTable ) {
			var list = new newList();
			var okButton = new button(list,0);
		} else {
			var list = new newList();
			var okButton = new button(list,0);
			document.getElementById("DSStorageBalancerPreview").style.display = "none";
		} 

		if( document.getElementsByTagName("h3").length > 1 ) {
			var vis = document.getElementsByClassName("vis");
			var vistr = vis[vis.length-1].getElementsByTagName("tr");
			for( var i=1 ; i<vistr.length ; i++ ) {
				var tdTable = vistr[i].getElementsByTagName("td");
				if( tdTable.length < 1 ) continue;
				if( tdTable[tdTable.length-1].textContent == regExp[lib.lang].cancel ) {
					tdTable[tdTable.length-1].addEventListener("click",function() {
						this.thistd = this.parentNode.getElementsByTagName("td");
						this.villId = this.thistd[0].getElementsByTagName("a")[0].href.match(/id=(\d+)/)[1];
						this.coords = this.thistd[0].getElementsByTagName("a")[0].textContent.split("(");
						this.coords = this.coords[this.coords.length-1].split(")")[0].split("|");
						this.dummy = lib.storage.getValue("DummyTrades_player.id"+lib.game_data.player.id,null);
						for( var b=0 ; b<2 ; b++ ) {
							if( b < 1 ) this.trades = lib.storage.getValue("Trade_player.id"+lib.game_data.player.id+"_"+this.coords[0]+"_"+this.coords[1],null);
							else this.trades = this.dummy != null ? (this.dummy[lib.game_data.village.id] == null ? null : this.dummy[lib.game_data.village.id][this.villId]) : null;
							if( this.trades != null ) {
								this.timeMs = parseInt(new lib.getServerTime().getTime(),10);
								this.arrival = this.thistd[5].textContent.split(":");
								this.hours = parseInt( this.arrival[0],10 );
								this.minutes = parseInt( this.arrival[1],10 );
								this.seconds = parseInt( this.arrival[2],10 );
								this.time = Math.floor((new Date(this.timeMs+1000*(this.seconds+60*(this.minutes+60*this.hours)))).getTime()/60000);
								this.match = [];
								for( this.i=0 ; this.i<this.trades.dateOfArrival.length ; this.i++ ) {
									this.dateOfArrival = Math.floor( parseInt(this.trades.dateOfArrival[this.i],10)/60000 );
									if( this.dateOfArrival == this.time ) {
										this.matchedTrade = {
											wood: this.trades.wood[this.i],
											clay: this.trades.clay[this.i],
											iron: this.trades.iron[this.i],
											i: this.i,
										};
										this.match.push( this.matchedTrade );
									}
								}
								if( this.match.length > 1 ) {
									this.tradeValues = {wood: 0, clay: 0, iron:0 };
									this.resName = this.thistd[1].getElementsByTagName("img");
									this.resValue = this.thistd[1].textContent.split(" ");
									for( this.r=0 ; this.r<this.resName.length ; this.r++ ) {
										if( this.resName[this.r].title == gui[lib.lang].wood )
											this.tradeValues.wood = parseInt(this.resValue[this.r].replace(".","") );
										if( this.resName[this.r].title == gui[lib.lang].clay )
											this.tradeValues.clay = parseInt(this.resValue[this.r].replace(".","") );
										if( this.resName[this.r].title == gui[lib.lang].iron ) 
											this.tradeValues.iron = parseInt(this.resValue[this.r].replace(".","") );
										if( this.tradeValues.wood.length == 0 ) this.tradeValues.wood.push( 0 );
										if( this.tradeValues.clay.length == 0 ) this.tradeValues.clay.push( 0 );
										if( this.tradeValues.iron.length == 0 ) this.tradeValues.iron.push( 0 );
									}
									for( this.i=0 ; this.i<this.match.length ; this.i++ ) {
										if( this.match[this.i].wood == this.tradeValues.wood ) {
											if( this.match[this.i].clay == this.tradeValues.clay ) {
												if( this.match[this.i].iron == this.tradeValues.iron ) {
													this.trades.wood.splice( this.match[this.i].i,1 );
													this.trades.clay.splice( this.match[this.i].i,1 );
													this.trades.iron.splice( this.match[this.i].i,1 );
													this.trades.dateOfArrival.splice( this.match[this.i].i,1 );
													if( b<1 ) lib.storage.setValue("Trade_player.id"+lib.game_data.player.id+"_"+this.coords[0]+"_"+this.coords[1],this.trades);
													else {
														this.dummy[lib.game_data.village.id][this.villId] = this.trades;
														lib.storage.setValue("DummyTrades_player.id"+lib.game_data.player.id,this.dummy);
													}
													break;
												}
											}
										}
									}
								} else if( this.match.length == 1 ) {
									if( b< 1 ) lib.storage.deleteValue("Trade_player.id"+lib.game_data.player.id+"_"+this.coords[0]+"_"+this.coords[1]);
									else { 
										delete this.dummy[lib.game_data.village.id][this.villId]; 
										var element_count = 0;
										for (e in this.dummy[lib.game_data.village.id]) { element_count++; }
										if( element_count < 1 ) delete this.dummy[lib.game_data.village.id];
										lib.storage.setValue("DummyTrades_player.id"+lib.game_data.player.id,this.dummy);
									}
								}
							}
						}
					},false);
				}
			}
		
		}
	}}

		/*mode=other_offer*/
		if( location.href.match(/mode=other_offer/) ) {
			var tabs = document.getElementById("content_value").getElementsByClassName("vis");

			if( !checkboxes.disableFadeOutOffersEnemies ) {	
            	var newElement = document.createElement('tr');
				if( document.getElementById("offerAmount") != null )
					tabs[3].rows[2].parentNode.insertBefore(newElement, tabs[3].rows[2].nextSibling);
				else tabs[2].rows[2].parentNode.insertBefore(newElement, tabs[2].rows[2].nextSibling);
				newElement.innerHTML = '<td colspan="4">'+gui[lib.lang].fadeOutEnemies+'</td>';
				var td=document.createElement("td");
				var fadeOutEnemies = td.appendChild(document.createElement("input"));
  				fadeOutEnemies.type="checkbox";
  				fadeOutEnemies.checked = checkboxes.fadeOutEnemies;
				fadeOutEnemies.addEventListener("click", function(){ 
					if( this.checked ){checkboxes.fadeOutEnemies=true;			
						lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);window.location.reload();}
					else {checkboxes.fadeOutEnemies=false;			
						lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);window.location.reload();}
				}, false);
				newElement.appendChild(td);
			}

			if( !checkboxes.disableMaxButtons ) {
				var trader = tabs[1].rows[0].cells[0].innerHTML.match(/: (\d+)\/\d+/)[1];	
				var inputs = tabs[2].getElementsByTagName("input");
				for (var h=0 ; h<inputs.length ; h++ ) {
					if( inputs[h].type== "submit" ) inputs[h].parentNode.rowSpan=5;}
				var tab = tabs[tabs.length-1];
				var res = { holz: "wood", lehm: "stone", eisen: "iron" }
				if (trader >= 0 && tab) {
					var boolean=false;
					for( var i = 1; i < tab.rows.length; i++ ) {
                    	if( checkboxes.fadeOutEnemies ) {
                       		var offerer = tab.rows[i].cells[2].textContent;
                        	var allyEnemies = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings).allyEnemies.replace(/\*/g,"").replace("[","\[").replace("]","\]").split(";");
                        	for( var e=0 ; e< allyEnemies.length ; e++ ) {
                        	   	if( offerer.indexOf(allyEnemies[e]) >-1 && allyEnemies[e]!="" ) {
                        	        tab.rows[i].parentNode.removeChild(tab.rows[i]);
                        	        boolean=true; break;}
                        	} if( boolean ) {i--; boolean=false; continue;}
                    	}
						var offers = parseInt(tab.rows[i].cells[5].innerHTML.split(" ")[0],10);
						var toSend = parseInt(tab.rows[i].cells[1].innerHTML.replace(/<[^>]+>/g, "").replace(/\./g,""),10);   						
						var available = document.getElementById(tab.rows[i].cells[1].getElementsByTagName("span")[0].className.replace(/icon header /,"")).innerHTML;   					
						var maxTraders = Math.min(trader,Math.ceil(Math.min( offers * toSend, available ) / 1000));
						if( maxTraders * 1000 > available )
	        					maxTraders--;
						var maxOffers = Math.min(offers,Math.floor(maxTraders*1000/toSend));	
						if( maxOffers >= 0 ) {
							var cell = tab.rows[i].insertCell(-1);
							
							var input = cell.appendChild(document.createElement("input"));
							input.type = "hidden";
							input.value = maxOffers;
							var input = cell.appendChild(document.createElement("input"));  
							input.parentNode.nowWrap = "true";
							input.type = "button";
							input.id = "maxOffer_"+i;
							input.style.width = "7em";
							input.value = gui[lib.lang].maxButton+" ("+ maxOffers + ")";
							input.addEventListener("click", function(e) {
									this.disabled = true;
									var row = this.parentNode.parentNode;
									var max = parseInt(this.parentNode.firstChild.value,10);
									if( lib.pa ) {
										var tradesDefault = {wood: [], clay: [], iron: [], dateOfArrival:[]};
										var destinationName=lib.game_data.village.coord.split("|")[0]+"_"+lib.game_data.village.coord.split("|")[1];
										var tradeValues = lib.storage.getValue("Trade_player.id"+lib.game_data.player.id+"_"+destinationName,tradesDefault);
										var arrayLength = tradeValues.wood.length+1;
										var offer = this.parentNode.parentNode.getElementsByTagName("td")[0];
										var resNameOffer = offer.getElementsByTagName("span")[0].className.replace(/icon header /,"");
										
										var resValueOffer = offer.textContent;
										if( resNameOffer == gui[lib.lang].wood )
											tradeValues.wood.push( parseInt(resValueOffer.replace(".",""),10 )*max );
										if( resNameOffer == gui[lib.lang].clay )
											tradeValues.clay.push( parseInt(resValueOffer.replace(".",""),10 )*max );
										if( resNameOffer == gui[lib.lang].iron ) 
											tradeValues.iron.push( parseInt(resValueOffer.replace(".",""),10 )*max );
										if( tradeValues.wood.length < arrayLength ) tradeValues.wood.push( 0 );
										if( tradeValues.clay.length < arrayLength ) tradeValues.clay.push( 0 );
										if( tradeValues.iron.length < arrayLength ) tradeValues.iron.push( 0 );

										var runtime = this.parentNode.parentNode.getElementsByTagName("td")[3].textContent.split(":");
										var ms = parseInt(runtime[0],10)*3600000; ms += parseInt(runtime[1],10)*60000;
										ms+= parseInt(runtime[2],10)*1000; ms += parseInt(now.getTime(),10);
               							tradeValues.dateOfArrival.push(ms);
										lib.storage.setValue("Trade_player.id"+lib.game_data.player.id+"_"+destinationName,tradeValues);
									
										var updateSource = lib.storage.getValue("villageData_"+lib.game_data.player.id+"_"+lib.game_data.village.id,"undefined");
                        				if( updateSource != "undefined" ) {
                        				    updateSource=updateSource.split(",");
											var srch = this.parentNode.parentNode.parentNode.getElementsByTagName("td")[1];
											var resName = srch.getElementsByTagName("span")[0].className.replace(/icon header /,"");
											var resValue = srch.textContent;
											if( resName == gui[lib.lang].wood )
												updateSource[0] = parseInt(updateSource[0],10) - parseInt(resValue.replace(".",""),10 )*max;
											if( resName == gui[lib.lang].clay )
												updateSource[1] = parseInt(updateSource[1],10) - parseInt(resValue.replace(".",""),10 )*max;
											if( resName == gui[lib.lang].iron ) 
												updateSource[2] = parseInt(updateSource[2],10) - parseInt(resValue.replace(".",""),10 )*max;
											lib.storage.setValue("villageData_"+lib.game_data.player.id+"_"+lib.game_data.village.id,updateSource.join());
										}
									}
									if( max > 1 ) {
										var form = row.cells[6].getElementsByTagName("form")[0];
										form.getElementsByTagName("input")[0].value = max;
										form.submit();
									} else location.href = row.cells[6].getElementsByTagName("a")[0].href;
							}, false );
						}
						var inputs = input.parentNode.parentNode.getElementsByTagName("input");
						for( var h=0 ; h<inputs.length ; h++ ) {
							if( inputs[h].type == "submit" ) {
								var submitButton = inputs[h];
								submitButton.parentNode.parentNode.noWrap = "true";
								submitButton.addEventListener("click",function() {
									if( lib.firefox ) this.disabled = true;
									var max = inputs[0].value;
									if( lib.pa ) {
										var tradesDefault = {wood: [], clay: [], iron: [], dateOfArrival:[]};
										var destinationName=lib.game_data.village.coord.split("|")[0]+"_"+lib.game_data.village.coord.split("|")[1];
										var tradeValues = lib.storage.getValue("Trade_player.id"+lib.game_data.player.id+"_"+destinationName,tradesDefault);
										var arrayLength = tradeValues.wood.length+1;
										var offer = this.parentNode.parentNode.parentNode.getElementsByTagName("td")[0];
										var resNameOffer = offer.getElementsByTagName("img")[0];
										var resValueOffer = offer.textContent;
										if( resNameOffer.title == gui[lib.lang].wood )
											tradeValues.wood.push( parseInt(resValueOffer.replace(".",""),10 )*max );
										if( resNameOffer.title == gui[lib.lang].clay )
											tradeValues.clay.push( parseInt(resValueOffer.replace(".",""),10 )*max );
										if( resNameOffer.title == gui[lib.lang].iron ) 
											tradeValues.iron.push( parseInt(resValueOffer.replace(".",""),10 )*max );
										if( tradeValues.wood.length < arrayLength ) tradeValues.wood.push( 0 );
										if( tradeValues.clay.length < arrayLength ) tradeValues.clay.push( 0 );
										if( tradeValues.iron.length < arrayLength ) tradeValues.iron.push( 0 );

										var runtime = this.parentNode.parentNode.parentNode.getElementsByTagName("td")[3].textContent.split(":");
										var ms = parseInt(runtime[0],10)*3600000; ms += parseInt(runtime[1],10)*60000;
										ms+= parseInt(runtime[2],10)*1000; ms += parseInt(now.getTime(),10);
               							tradeValues.dateOfArrival.push(ms);
										lib.storage.setValue("Trade_player.id"+lib.game_data.player.id+"_"+destinationName,tradeValues);
									
										var updateSource = lib.storage.getValue("villageData_"+lib.game_data.player.id+"_"+lib.game_data.village.id,"undefined");
                        				if( updateSource != "undefined" ) {
                        				    updateSource=updateSource.split(",");
											var srch = this.parentNode.parentNode.parentNode.getElementsByTagName("td")[1];
											var resName = srch.getElementsByTagName("img")[0];
											var resValue = srch.textContent;
											if( resName.title == gui[lib.lang].wood )
												updateSource[0] = parseInt(updateSource[0],10) - parseInt(resValue.replace(".",""),10 )*max;
											if( resName.title == gui[lib.lang].clay )
												updateSource[1] = parseInt(updateSource[1],10) - parseInt(resValue.replace(".",""),10 )*max;
											if( resName.title == gui[lib.lang].iron ) 
												updateSource[2] = parseInt(updateSource[2],10) - parseInt(resValue.replace(".",""),10 )*max;
											lib.storage.setValue("villageData_"+lib.game_data.player.id+"_"+lib.game_data.village.id,updateSource.join());
										}
									}
								},false);
							}
						}
                    	if( trader == 0 || maxOffers == 0) input.disabled = true;
                   		lib.hotkeys.keys.push( { key: hotkeys.keys.keysMarketOtherOffer["maxOffer"+i], event: { id: input.id, event: "click" } } );
                    }
				}
        }
}

/* mode=incomings new incs-filter */
if( location.href.match(/screen=overview_villages/) && document.getElementById("incomings_table") && !checkboxes.disableNewIncs ) {
	var table = document.getElementById("incomings_table");
	var div = table.parentNode.insertBefore(document.createElement("div"),table);
	var filterIncs = div.appendChild( document.createElement("input") );
	filterIncs.type = "checkbox";
	filterIncs.id = "dssb_filterIncs";
	filterIncs.addEventListener("change",function() {
		this.tr = document.getElementById("incomings_table").getElementsByTagName("tr");
		if( this.tr.length > 0 ) {
			for( var i=1 ; i<this.tr.length-1 ; i++ ) {
				this.text = document.getElementById("labelText["+(i-1)+"]");
				this.time = this.text.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("td");
				this.time=this.time[this.time.length-2].textContent.split(":");
				this.time=parseInt(this.time[0],10)*60+parseInt(this.time[1],10)+parseInt(this.time[2],10)/60;
				if( this.checked ) {
					if( this.text.textContent != regExp[lib.lang].attack ) this.tr[i].style.display="none";
					else this.tr[i].style.removeProperty("display");
					if( this.text.textContent.match(checkboxes.newIncsSettings[1]) && checkboxes.newIncsSettings[1] != "" ) 
						this.tr[i].style.removeProperty("display");
					if( parseInt(checkboxes.newIncsSettings[2],10) >= this.time ) this.tr[i].style.removeProperty("display");
				} else this.tr[i].style.removeProperty("display");
			}
		}
	}, false);
	if( checkboxes.newIncsSettings[0] ) lib.fireEvent(filterIncs,"change");
	div.appendChild( lib.createTextNode("<b> "+gui[lib.lang].newIncs.fadeOutRenamed+"</b> - ") );
	
	var settingsA = div.appendChild( document.createElement("a") );
	settingsA.href = "javascript:;";
	settingsA.innerHTML = gui[lib.lang].newIncs.settings;
	settingsA.addEventListener("click",function(e) {
		this.pos = lib.findPos( e.target );	
		this.settings = document.createElement("table");
		this.h3 = this.settings.appendChild( document.createElement("h3") );
		this.h3.innerHTML = gui[lib.lang].filterSettings;				
		this.settings2 = this.settings.appendChild( document.createElement("table") );
		this.settings2.noWrap = "true";
		var trTab = new Array(3);
		for( var i=0 ; i<trTab.length ; i++ ) trTab[i] = this.settings2.appendChild(document.createElement("tr"));
		var tdTab = new Array(6);
		for( var i=0 ; i<tdTab.length ; i++ ) {
			tdTab[i] = trTab[Math.floor(i/2)].appendChild(document.createElement("td"));
			tdTab[i].noWrap = "true";
		}
		tdTab[0].style.textAlign = "center";
		var input = tdTab[0].appendChild( document.createElement("input") );
		input.type = "checkbox";
		input.checked=checkboxes.newIncsSettings[0];
		input.addEventListener("change",function() {
			checkboxes.newIncsSettings[0] = this.checked;
			lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
			document.getElementById("dssb_filterIncs").checked = !this.checked;
			lib.fireEvent(document.getElementById("dssb_filterIncs"),"change");
		}, false);
		tdTab[1].innerHTML = "<span style=\"padding-left: 10px;\">"+gui[lib.lang].newIncs.autoFadeOut+"</span>";
		
		var input = tdTab[2].appendChild( document.createElement("input") );
		input.size = "16"; input.style.textAlign = "center";
		input.value=checkboxes.newIncsSettings[1];
		input.addEventListener("change",function() {
			checkboxes.newIncsSettings[1] = this.value;
			lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
			document.getElementById("dssb_filterIncs").checked = !document.getElementById("dssb_filterIncs").checked;
			lib.fireEvent(document.getElementById("dssb_filterIncs"),"change");
		}, false);
		tdTab[3].innerHTML = "<span style=\"padding-left: 10px;\">"+gui[lib.lang].newIncs.keyFadeIn+"</span>";
		
		var input = tdTab[4].appendChild( document.createElement("input") );
		input.size = "16"; input.style.textAlign = "center";
		input.value=checkboxes.newIncsSettings[2];
		input.addEventListener("change",function() {
			checkboxes.newIncsSettings[2] = this.value;
			lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
			document.getElementById("dssb_filterIncs").checked = !document.getElementById("dssb_filterIncs").checked;
			lib.fireEvent(document.getElementById("dssb_filterIncs"),"change");
		}, false);
		tdTab[5].innerHTML = "<span style=\"padding-left: 10px;\">"+gui[lib.lang].newIncs.timeFadeIn+"</span>";
		
		lib.popup("newIncsSettings", this.pos[0]+25, this.pos[1]-100, this.settings, true, 420, 150 );
	}, false);	
}

/* neighbor village display */
if( location.href.match(/screen=place/) && lib.pa ) {	
	if( location.href.match(/&mode=neighbor/) && !checkboxes.disableNeighbourVillages  ) {
    	/* add elements */
    	this.Datas = function(viewConfig) {
    	    var format = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings);
        	var vistables = document.getElementById("content_value").getElementsByClassName("vis");
        	if( !checkboxes.disableUseOfTroops ) var units = lib.storage.getValue("unit_info","");
        	for( var s=0 ; s<vistables.length ; s++ ) {
        	    if( vistables[s].getElementsByTagName("th").length > 0 )  {
        	        var searchTr = vistables[s].getElementsByTagName("tr");
        	        for( var t=0 ; t<searchTr.length ; t++ ) {
        	            if( searchTr[t].getElementsByTagName("td").length > 0 && searchTr[t].getElementsByTagName("a").length > 0 ) {
        	                var neighborVillageA = searchTr[t].getElementsByTagName("td")[0].getElementsByTagName("a")[0];
                        var neighborVillageId = neighborVillageA.href.split("village=")[1].split("&")[0];
                        if( !checkboxes.disableUseOfTroops ) {var unitsData = lib.storage.getValue("unitsData_"+lib.game_data.player.id+"_"+neighborVillageId,"undefined");
                        if( unitsData != "undefined" ) {
                                if( viewConfig[1] == "block" ) {
                                    if( typeof(document.getElementsByClassName("troops_"+neighborVillageId)[0]) == "undefined" )  {
                                        var divTroops = document.createElement("div");
                                        neighborVillageA.parentNode.insertBefore(divTroops, neighborVillageA.nextSibling);
                                        divTroops.className = "troops_"+neighborVillageId;
                                        divTroops.style.display = viewConfig[1];
                                        divTroops.marginTop = format.marginTop;
                                        var secondTr = "", graphicsTroops=""; unitsData = unitsData.split(",");
                                        for( var u=0 ; u<unitsData.length ; u++ ) {
                                            if( unitsData[u] == 0 ) continue;
                                            graphicsTroops += '<td style="text-align:center"><img style="width:'+format.imgSize+';height:'+format.imgSize
                                                +'" src="graphic/unit/unit_'+units[u]+'.png"/></td>';
                                            secondTr += '<td style="font-size:'+format.fontSize+'">'+unitsData[u]+'</td>';
                                        }
                                        if( t%2 > 0 ) divTroops.innerHTML = '<table><tr class="nowrap row_a">'+graphicsTroops+'</tr><tr class="nowrap row_a">'+secondTr+'</tr></table>';
                                        else divTroops.innerHTML = '<table><tr class="nowrap row_b">'+graphicsTroops+'</tr><tr class="nowrap row_b">'+secondTr+'</tr></table>';
                                    } else document.getElementsByClassName("troops_"+neighborVillageId)[0].style.display = "block";
                                } else if( viewConfig[1] == "none" ) {
                                    if( typeof(document.getElementsByClassName("troops_"+neighborVillageId)[0]) != "undefined" )
                                        document.getElementsByClassName("troops_"+neighborVillageId)[0].style.display = "none";
                                }		
                            }
                        } 
                        var villageData = lib.storage.getValue("villageData_"+lib.game_data.player.id+"_"+neighborVillageId,"undefined");
                        if( villageData != "undefined" ) {
                            if( viewConfig[0] == "block" && !checkboxes.disableUseOfRessis ) {
                                if( typeof(document.getElementsByClassName("resources_"+neighborVillageId)[0]) == "undefined" )  {
                                    var divRes = document.createElement("div");
                                    neighborVillageA.parentNode.insertBefore(divRes, neighborVillageA.nextSibling);
                                    divRes.className = "resources_"+neighborVillageId;
                                    divRes.style.display = viewConfig[0];
                                    divRes.marginTop = format.marginTop;                  
                                    divRes.innerHTML = '<img style="width:'+format.imgSize+';height:'+format.imgSize+'" src="/graphic/holz.png?1" /> <span style="font-size:'
                                        + format.fontSize+'" id="wood_'+neighborVillageId+'"></span> <img style="width:'+format.imgSize+';height:'+format.imgSize
                                        +'" src="/graphic/lehm.png?1" /> <span style="font-size:'+format.fontSize+'" id="stone_'+neighborVillageId
                                        +'"></span> <img style="width:'+format.imgSize+';height:'+format.imgSize+'" src="/graphic/eisen.png?1" /> <span style="font-size:'
                                        +format.fontSize+'" id="iron_'+neighborVillageId+'"></span> <a href="'+ location.href.split('?')[0] + '?village=' 
                                        + neighborVillageId + '&screen=market&target=' + lib.game_data.village.id+ '"><img style="width:'+format.imgSize+';height:'
                                        +format.imgSize+'" src="/graphic/buildings/market.png?1" /> <span style="font-size:'+format.fontSize+'" id="market_'+neighborVillageId+'"></span></a>';
                                    villageData = villageData.split(",");
                                    document.getElementById("wood_"+neighborVillageId).innerHTML =  
                                    	(checkboxes.neighbourVillagesResAbsolute ? lib.formatNumber(villageData[0]) : lib.addCommas(villageData[0]));
                                    document.getElementById("stone_"+neighborVillageId).innerHTML =
                                    	(checkboxes.neighbourVillagesResAbsolute ? lib.formatNumber(villageData[1]) : lib.addCommas(villageData[1]));
                                    document.getElementById("iron_"+neighborVillageId).innerHTML =
                                    	(checkboxes.neighbourVillagesResAbsolute ? lib.formatNumber(villageData[2]) : lib.addCommas(villageData[2]));
                                    document.getElementById("market_"+neighborVillageId).innerHTML =
                                    	(checkboxes.neighbourVillagesResAbsolute ? lib.formatNumber(villageData[4]) : lib.addCommas(villageData[4]));
                                } else document.getElementsByClassName("resources_"+neighborVillageId)[0].style.display = "block";
                            } else if( viewConfig[0] == "none" ) {
                                if( typeof(document.getElementsByClassName("resources_"+neighborVillageId)[0]) != "undefined" )
                                    document.getElementsByClassName("resources_"+neighborVillageId)[0].style.display = "none";
                            }
                        }
                    }
                	}
            	}
        	}
    	}
        
    	var newCell = document.getElementsByTagName("h3")[0].parentNode.insertBefore(document.createElement("tr"), document.getElementsByTagName("h3")[0].nextSibling);
    
    	if( !checkboxes.disableUseOfRessis ) {
    		var td = newCell.appendChild( document.createElement("td") );
    		td.style.width = "150px";
			var aRes = td.appendChild(document.createElement("a") );
    		aRes.href = "javascript:;";
    		aRes.id = "aResources";
    		if( checkboxes.viewConfig[0] == "none" ) aRes.innerHTML = gui[lib.lang].displayResources;
    		else aRes.innerHTML = gui[lib.lang].hideResources;
    		aRes.addEventListener("click",function() {
    	    	var checkboxes = new newCheckboxes();
    	        if( checkboxes.viewConfig[0] == "none" ) { checkboxes.viewConfig[0] = "block"; aRes.innerHTML=gui[lib.lang].hideResources; 
    	        } else { checkboxes.viewConfig[0] = "none"; aRes.innerHTML=gui[lib.lang].displayResources;}
				lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
    	        divs = new Datas(checkboxes.viewConfig);
    		}, false);
   		}

    	if( !checkboxes.disableUseOfTroops ) {
    		var td = newCell.appendChild( document.createElement("td") );
    		td.style.width = "150px";
        	var aTroops = td.appendChild( document.createElement("a") );
        	aTroops.href = "javascript:;";
        	aTroops.id = "aTroops";
	        if( checkboxes.viewConfig[1] == "none" ) aTroops.innerHTML = gui[lib.lang].displayTroops;
    	    else aTroops.innerHTML = gui[lib.lang].hideTroops; 
    	    aTroops.addEventListener("click",function() {
    	        var checkboxes = new newCheckboxes();
    	        if( checkboxes.viewConfig[1] == "none" ) { checkboxes.viewConfig[1] = "block"; aTroops.innerHTML=gui[lib.lang].hideTroops; 
    	        } else { checkboxes.viewConfig[1] = "none"; aTroops.innerHTML=gui[lib.lang].displayTroops;}
				lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
    	        divs = new Datas(checkboxes.viewConfig);
    	    }, false);
    	}
    
    	if( checkboxes.viewConfig[0] == "block" || checkboxes.viewConfig[1] == "block" ) var divs = new Datas(checkboxes.viewConfig);
	}
	
	/* read out troops on place */
    if( !checkboxes.disableUseOfTroops ) {
        if (location.href.match(/screen=place/) && !location.href.match(/mode=units/) && !location.href.match(/mode=sim/) && !location.href.match(/mode=neighbor/)) {
            var villageUnits=[];
            if (typeof document.getElementsByName('spear')[0]!='undefined') 
                villageUnits.push( document.getElementsByName('spear')[0].nextSibling.nextSibling.textContent.replace(/[()]/g,"") );
            if (typeof document.getElementsByName('sword')[0]!='undefined') 
                villageUnits.push( document.getElementsByName('sword')[0].nextSibling.nextSibling.textContent.replace(/[()]/g,"") );
            if (typeof document.getElementsByName('axe')[0]!='undefined') 
                villageUnits.push( document.getElementsByName('axe')[0].nextSibling.nextSibling.textContent.replace(/[()]/g,"") );
            if (typeof document.getElementsByName('archer')[0]!='undefined') 
                villageUnits.push( document.getElementsByName('archer')[0].nextSibling.nextSibling.textContent.replace(/[()]/g,"") );
            if (typeof document.getElementsByName('spy')[0]!='undefined') 
                villageUnits.push( document.getElementsByName('spy')[0].nextSibling.nextSibling.textContent.replace(/[()]/g,"") );
            if (typeof document.getElementsByName('light')[0]!='undefined') 
                villageUnits.push( document.getElementsByName('light')[0].nextSibling.nextSibling.textContent.replace(/[()]/g,"") );
            if (typeof document.getElementsByName('marcher')[0]!='undefined') 
                villageUnits.push( document.getElementsByName('marcher')[0].nextSibling.nextSibling.textContent.replace(/[()]/g,"") );
            if (typeof document.getElementsByName('heavy')[0]!='undefined') 
                villageUnits.push( document.getElementsByName('heavy')[0].nextSibling.nextSibling.textContent.replace(/[()]/g,"") );
            if (typeof document.getElementsByName('ram')[0]!='undefined') 
                villageUnits.push( document.getElementsByName('ram')[0].nextSibling.nextSibling.textContent.replace(/[()]/g,"") );
            if (typeof document.getElementsByName('catapult')[0]!='undefined') 
                villageUnits.push( document.getElementsByName('catapult')[0].nextSibling.nextSibling.textContent.replace(/[()]/g,"") );
            if (typeof document.getElementsByName('knight')[0]!='undefined') 
                villageUnits.push( document.getElementsByName('knight')[0].nextSibling.nextSibling.textContent.replace(/[()]/g,"") );
            if (typeof document.getElementsByName('snob')[0]!='undefined') 
                villageUnits.push( document.getElementsByName('snob')[0].nextSibling.nextSibling.textContent.replace(/[()]/g,"") );
            villageUnits = villageUnits.join();
            if (villageUnits!='') lib.storage.setValue("unitsData_"+lib.game_data.player.id+"_"+lib.game_data.village.id,villageUnits);
        }
    }
	
	/* time counter */
	if( location.href.match(/try=confirm/) && document.getElementById("units_form") == null && !checkboxes.disableConTimeP ) {
		var tr = document.getElementById("date_arrival").parentNode.parentNode.getElementsByTagName("tr");
		if( tr[4].innerHTML.match(/date_arrival/) ) var y=3; else var y=2;
		var dura = tr[y].getElementsByTagName("td")[1].textContent.split(":");
		var millis = (parseInt(dura[0],10)*3600+parseInt(dura[1],10)*60+parseInt(dura[2],10))*1000;
		
		var newTr = tr[y+2].parentNode.insertBefore( document.createElement("tr"), tr[y+2] );
		var td = newTr.appendChild( document.createElement("td") );
		td.innerHTML = gui[lib.lang].returning;
		td = newTr.appendChild( document.createElement("td") );
		td.id = "dssb_date_return";
		td.innerHTML = newTimeCounter(parseInt(lib.getServerTime().getTime(),10)+(millis*2));
		
		var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
		if( MutationObserver != undefined && !lib.chrome ) {
			var observer = new MutationObserver(function (mutations) {
				mutations.forEach( function(mutation) {
					document.getElementById("date_arrival").innerHTML = newTimeCounter(parseInt(lib.getServerTime().getTime(),10)+millis);
					document.getElementById("dssb_date_return").innerHTML = newTimeCounter(parseInt(lib.getServerTime().getTime(),10)+(2*millis));
				});
			});
			observer.observe(document.getElementById("serverTime"), { childList: true });
		} else {
            if( lib.chrome ) var name = "DOMSubtreeModified"; else var name = "DOMNodeInserted";
			document.getElementById("serverTime").addEventListener( name, function() {
				document.getElementById("date_arrival").innerHTML = newTimeCounter(parseInt(lib.getServerTime().getTime(),10)+millis);
				document.getElementById("dssb_date_return").innerHTML = newTimeCounter(parseInt(lib.getServerTime().getTime(),10)+(2*millis));
			}, false );
		}
	}
	
	if( location.href.match(/mode=units/) && !checkboxes.disableVpDistance ) {
		var DistCol = function(ele, pos) {
			ele.style.whiteSpace = "nowrap";
			var tr = ele.getElementsByTagName("tr"), td, elem, sumDis=0, count=0;
			var up = lib.createTextNode( String.fromCharCode(9650) );
			up.id = "dssb_"+ele.id+"_up";
			var down = lib.createTextNode( String.fromCharCode(9660) );
			down.id = "dssb_"+ele.id+"_down";
		
			for( var x=0 ; x<tr.length ; x++ ) {
				if( tr[x].getElementsByTagName("td").length > 0 ) {
					td = tr[x].getElementsByTagName("td");
					elem = td[pos].parentNode.insertBefore( document.createElement("td"), td[pos] );
				
					if( td[0].getElementsByTagName("input").length > 0 ) {
						var coords = td[pos-1].getElementsByTagName("a")[0].textContent.match(/\((\d{1,3})\|(\d{1,3})\) K(\d+)$/);
						var sourceCoords = lib.game_data.village.coord.split("|");
						var distance = Math.sqrt( Math.pow(parseInt(sourceCoords[0],10)-parseInt(coords[1],10),2)+Math.pow(parseInt(sourceCoords[1],10)-parseInt(coords[2],10),2) );
						distance = parseInt(Math.round(distance*10),10)/10;
						elem.innerHTML = distance;
						sumDis+=distance; count++;
					}
				} else if( tr[x].getElementsByTagName("th").length > 0 ) {
					td = tr[x].getElementsByTagName("th");
					if( ele.id == "units_away" && x > 0 ) {
						td[0].colSpan = 2;
						elem = td[1].parentNode.insertBefore( document.createElement("th"), td[1] );
						elem.colSpan = 12;
						elem = td[1].parentNode.insertBefore( document.createElement("th"), td[1] );						
					} else elem = td[pos].parentNode.insertBefore( document.createElement("th"), td[pos] );
					if( x==0 ) {
						var a = elem.appendChild( document.createElement("a") );
						a.href = "javascript:;";
						a.innerHTML = gui[lib.lang].distanceShort;
						a.addEventListener("click",function() {
							this.toSort = [];
							this.tr = this.parentNode.parentNode.parentNode.getElementsByTagName("tr");
							for( this.i=(ele.id == "units_away" ? 1 : 2) ; this.i<this.tr.length ; this.i++ ) {
								if( this.tr[this.i].getElementsByTagName("th").length > 0 || this.tr[this.i].getElementsByTagName("td").length == 0 ) continue;
								this.toSort.push( [this.tr[this.i].getElementsByTagName("td")[pos].textContent, this.tr[this.i]] );
							}						
							if( document.getElementById("dssb_"+ele.id+"_up") ) {
								this.parentNode.removeChild( document.getElementById("dssb_"+ele.id+"_up") );
								this.parentNode.appendChild( down );
								this.toSort.sort(function(a,b) {return b[0]-a[0]});
							} else {
								if( document.getElementById("dssb_"+ele.id+"_down") ) this.parentNode.removeChild( document.getElementById("dssb_"+ele.id+"_down") );
								this.parentNode.appendChild( up );							
								this.toSort.sort(function(a,b) {return a[0]-b[0]});
							}						
							for( this.i=0 ; this.i<this.toSort.length ; this.i++ ) {
								this.parentNode.parentNode.parentNode.insertBefore( this.toSort[this.i][1], this.tr[this.tr.length-2] );
							}
						
						}, false);					
					} else if( (ele.id == "units_away" && x==tr.length-1) || x==tr.length-2 ) {
						elem.innerHTML = gui[lib.lang].average+" "+parseInt(Math.round(sumDis/count*10),10)/10;
					}
				}
			}
		}
		if( document.getElementById("units_home") != null ) new DistCol( document.getElementById("units_home"),1 );
		if( document.getElementById("units_away") != null ) new DistCol( document.getElementById("units_away"),2 );		
	}
}
/* read out all troops on units_table*/
if( document.getElementById("units_table") ) { 
	if( !checkboxes.disableUseOfTroops ) {
		var cellNames = document.getElementById("units_table").getElementsByTagName("tr")[0].getElementsByTagName("th"), fm= false;
		var villageCell = 0; var units = lib.storage.getValue("unit_info",""); var startCell=0; var reg = new RegExp(units[0]);
		for(var i=0 ; i<cellNames.length ; i++) {
			if( cellNames[i].textContent.match(regExp[lib.lang].village) ) villageCell=i;
			if( cellNames[i].innerHTML.match(reg) ) startCell=i;
		}
		var rows = document.getElementById("units_table").getElementsByTagName("tr");
		for( var e=1 ; e<rows.length ; e++ ) {
			var td =  rows[e].getElementsByTagName("td");
			if( td.length < 1 ) continue;
			if( fm ? td[2].textContent.match(regExp[lib.lang].own) : td[1].textContent.match(regExp[lib.lang].own)) {
				var villageId = rows[e].innerHTML.split("village=")[1].split("&")[0];
				var villageUnits = [];
				for( var i=0 ; i<units.length ; i++ ) {villageUnits.push( rows[e].getElementsByTagName("td")[startCell+i].textContent.replace(/\+/g,"") );}
				villageUnits = villageUnits.join();
				lib.storage.setValue("unitsData_"+lib.game_data.player.id+"_"+villageId,villageUnits);
			}
		}
	}
}  

if( location.href.match(/screen=place/) && location.href.match(/mode=sim/) && !checkboxes.disableDSTroopsCalc && lib.pa ) {
	var inputs = document.getElementsByClassName("content-border")[0].getElementsByTagName("input");
	var texts=[["att_spear","att_sword","att_axe","att_archer","att_spy","att_light","att_marcher","att_heavy","att_ram","att_catapult","att_knight","att_snob"],[],[]];
	texts[0].push("def_spear","def_sword","def_axe","def_archer","def_spy","def_light","def_marcher","def_heavy","def_ram","def_catapult","def_knight","def_snob");
	texts[0].push("def_wall","def_building","moral","luck");
	texts[1].push("att_knight_items[]","def_knight_items[]");
	texts[2].push("belief_att","belief_def","building","night");
	
	if( !checkboxes.disableDSTroopsCalc ) {
		var unitBashVal = {
			"spear": [10,15,45,20],
			"sword": [25,50,15,40],
			"axe": [40,10,5,10],
			"archer": [15,50,40,5],
			"spy": [0,2,1,2],
			"light": [130,30,40,30],
			"marcher": [120,40,30,50],
			"heavy": [150,200,80,180],
			"ram": [2,20,50,20],
			"catapult": [100,100,50,100],
			"knight": [150,250,400,150],
			"snob": [30,100,50,100],
			"snob": [30,100,50,100],
		};
		var churchConsFac = [0,800,333,240];
	
		var input = inputs[inputs.length-1].parentNode.appendChild( document.createElement("input") );
		input.type = "button";
		input.value = lib.createTextNode( gui[lib.lang].dstroopscalc.sumUpAll ).textContent;
		input.addEventListener("click",function() {
			var base = this;
			var elements = document.forms[0].elements;
			
			this.units = lib.storage.getValue("unit_info","");
			/* config, die der rekursiven Berechnung übergeben wird */
			this.mainConf = {
				ram: typeof elements["att_ram"] != "undefined" ? (parseInt(elements["att_ram"].value,10) > 0 ? parseInt(elements["att_ram"].value,10) : 0) : 0,
				tooLess: false,
				defWall: typeof elements["def_wall"] != "undefined" ? (parseInt(elements["def_wall"].value,10)>0 ? parseInt(elements["def_wall"].value,10) : 0) : 0,
				endWall: typeof elements["def_wall"] != "undefined" ? (parseInt(elements["def_wall"].value,10)>0 ? parseInt(elements["def_wall"].value,10) : 0) : 0,
				defBelief: typeof elements["belief_def"] != "undefined" ? (elements["belief_def"].checked?1:0.5) : 1,
				attBelief: typeof elements["belief_att"] != "undefined" ? (elements["belief_att"].checked?1:0.5) : 1,
				catapult: typeof elements["att_catapult"] != "undefined" ? (parseInt(elements["att_catapult"].value,10) > 0 ? parseInt(elements["att_catapult"].value,10) : 0) : 0,
				preBuilding: typeof elements["def_building"] != "undefined" ? (parseInt(elements["def_building"].value,10) > 0 ? parseInt(elements["def_building"].value,10) : 0) : 0,
				endBuilding: typeof elements["def_building"] != "undefined" ? (parseInt(elements["def_building"].value,10) > 0 ? parseInt(elements["def_building"].value,10) : 0) : 0,
				cataChurch: typeof elements["building"] != "undefined" ? (elements["building"].checked ? true : false) : false,
				counterOffs: 0,
				night: typeof elements["night"] != "undefined" ? (elements["night"].checked?2:1) : 1,
				morality: typeof elements["moral"] != "undefined" ? ((parseFloat(elements["moral"].value)>1?100:parseFloat(elements["moral"].value))/100) : 1,
				luck: typeof elements["luck"] != "undefined" ? (parseFloat(elements["luck"].value)/100) : 0,
				defTroops: {},
				AlwaysAttTroops: {},
				losses: {att:{},deff:{}},
				defWinner: true,
				aletheia: typeof elements["att_knight_items[]"] != "undefined" ? (elements["att_knight_items[]"].value == "catapult" ? 2 : 1) : 1,
				carols: typeof elements["att_knight_items[]"] != "undefined" ? (elements["att_knight_items[]"].value == "ram" ? 2 : 1) : 1,
				defItems: {
					spear: typeof elements["def_knight_items[]"] != "undefined" ? (elements["def_knight_items[]"].value == "spear" ? 1.2 : 1) : 1,
					sword: typeof elements["def_knight_items[]"] != "undefined" ? (elements["def_knight_items[]"].value == "sword" ? 1.3 : 1) : 1,
					axe: typeof elements["def_knight_items[]"] != "undefined" ? (elements["def_knight_items[]"].value == "axe" ? 1.3 : 1) : 1,
					archer: typeof elements["def_knight_items[]"] != "undefined" ? (elements["def_knight_items[]"].value == "archer" ? 1.2 : 1) : 1,
					spy: 1,
					light: typeof elements["def_knight_items[]"] != "undefined" ? (elements["def_knight_items[]"].value == "light" ? 1.2 : 1) : 1,
					marcher: typeof elements["def_knight_items[]"] != "undefined" ? (elements["def_knight_items[]"].value == "marcher" ? 1.2 : 1) : 1,
					heavy: typeof elements["def_knight_items[]"] != "undefined" ? (elements["def_knight_items[]"].value == "heavy" ? 1.2 : 1) : 1,
					ram: 1,
					catapult: typeof elements["def_knight_items[]"] != "undefined" ? (elements["def_knight_items[]"].value == "catapult" ? 10 : 1) : 1,
					snob: 1,
				},
				attItems: {
					spear: typeof elements["att_knight_items[]"] != "undefined" ? (elements["att_knight_items[]"].value == "spear" ? 1.3 : 1) : 1,
					sword: typeof elements["att_knight_items[]"] != "undefined" ? (elements["att_knight_items[]"].value == "sword" ? 1.4 : 1) : 1,
					axe: typeof elements["att_knight_items[]"] != "undefined" ? (elements["att_knight_items[]"].value == "axe" ? 1.4 : 1) : 1,
					archer: typeof elements["att_knight_items[]"] != "undefined" ? (elements["att_knight_items[]"].value == "archer" ? 1.3 : 1) : 1,
					spy: 1,
					light: typeof elements["att_knight_items[]"] != "undefined" ? (elements["att_knight_items[]"].value == "light" ? 1.3 : 1) : 1,
					marcher: typeof elements["att_knight_items[]"] != "undefined" ? (elements["att_knight_items[]"].value == "marcher" ? 1.3 : 1) : 1,
					heavy: typeof elements["att_knight_items[]"] != "undefined" ? (elements["att_knight_items[]"].value == "heavy" ? 1.3 : 1) : 1,
					ram: typeof elements["att_knight_items[]"] != "undefined" ? (elements["att_knight_items[]"].value == "ram" ? 2 : 1) : 1,
					catapult: 1,
					snob: 1,
				},
				attTroopTest: [["att_spear","att_sword","att_axe","att_ram","att_catapult","att_knight","att_snob"],["att_light","att_heavy"],["att_archer","att_marcher"],["att_spy"]],
				defTroopTest: ["def_spear","def_sword","def_axe","def_archer","def_spy","def_light","def_marcher","def_heavy","def_ram","def_catapult","def_knight","def_snob"],
				attTroop: [],
				defTroop: [],
			}	

			//Teste weltenspezifisch, was vorhanden ist
			for( var x=0 ; x<this.mainConf.attTroopTest.length ; x++ ) {
				var troopsDummy = [];
				for( var y=0 ; y<this.mainConf.attTroopTest[x].length ; y++ ) {
					if( typeof elements[this.mainConf.attTroopTest[x][y]] != "undefined" )
						troopsDummy.push( this.mainConf.attTroopTest[x][y] );
				}
				this.mainConf.attTroop.push( troopsDummy );
			}
			for( var x=0 ; x<this.mainConf.defTroopTest.length ; x++ ) {
				if( typeof elements[this.mainConf.defTroopTest[x]] != "undefined" )
				this.mainConf.defTroop.push( this.mainConf.defTroopTest[x] );
			}
			
			for( var i=0 ; i<this.mainConf.attTroop.length; i++ ) {
				for( var j=0 ; j<this.mainConf.attTroop[i].length; j++ ) {
					var val = elements[this.mainConf.attTroop[i][j]].value;
					if( !isNaN(parseInt(val)) ) {
						this.mainConf.AlwaysAttTroops[this.mainConf.attTroop[i][j].split("_")[1]] = val;
					}		
				}
			}
			for( var i=0 ; i<this.mainConf.defTroop.length ; i++ ) {
				if( !isNaN(parseInt(elements[this.mainConf.defTroop[i]].value,10)) )
					this.mainConf.defTroops[this.mainConf.defTroop[i].split("_")[1]] = parseInt(elements[this.mainConf.defTroop[i]].value,10);
			}
			
			this.BashRec = function( config ) {
				var pointer = this;
				
				this.simOff = function( conf ) {
					/* Zuerst nur Angriff mit Rammen. Die Berechnung hat 3 Stufen */
					var self = this;
					/* 1. Stufe - Rammen greifen den Wall allein an und setzen ihn auf provisorischen Wert herab: */
					this.ram = conf.ram, this.defWall = conf.defWall, this.carols = conf.carols, this.defBelief = conf.defBelief, this.attBelief = conf.attBelief, this.catapult = conf.catapult;
					this.aletheia = conf.aletheia, this.preBuilding = conf.preBuilding, this.cataChurch = conf.cataChurch, this.night = conf.night, this.morality = conf.morality;
					this.luck = Math.abs( conf.luck ) > 0.25 ? (conf.luck < 0 ? 0.75 : 1.25) : 1+conf.luck;
					this.attTroop = conf.attTroop;
					this.defTroop = conf.defTroop;
					this.losses = conf.losses; this.attTroops = conf.AlwaysAttTroops; this.defTroops = conf.defTroops;
					
					this.resultWall = this.defWall-Math.round((this.ram*this.attBelief*this.carols)/(4*Math.pow(1.09,this.defWall)));
					
					/* letzter Schritt der 1. Stufe: Ueberpruefung, ob auf einer Welt mit alten Paladingegenstaenden gespielt wird; Begrenzung der maximal zu senkenden Wallstufe. */
					this.minWall = 0.5/this.carols * this.defWall;
					if( this.minWall > this.resultWall ) this.resultWall = Math.round( this.minWall );
					
					/* 2. Stufe - Die Berechnung des Kampfausgangs und des Truppenverlusts wird durchgeführt: */
					this.wallBonus = Math.pow(1.037,this.resultWall), this.wallBaseDef = 20 + 50 * this.resultWall;
					
					this.RecCalculate = function() {
						this.attGroups = [], this.totalAttPoints = 0; this.roundLosses = {att:{},deff:{}}
						/* 1. Stufe: Die Späher werden berechnet */
						if( self.attTroops["spy"] != "undefined" ) {
							this.spy = self.attTroops["spy"] != "undefined" ? parseInt(self.attTroops["spy"]) : 0, this.defSpy = self.defTroops["spy"] != "undefined" ? parseInt(self.defTroops["spy"],10) : 0;
							if( this.spy == 0 ) this.fac = 0;
							else this.fac = Math.pow((this.defSpy/this.spy/ 2),1.5);
							if( !isNaN(this.fac) ) {
								if( typeof this.roundLosses.att["spy"] == "undefined" ) this.roundLosses.att["spy"] = 0;
								this.roundLosses.att["spy"] += Math.round(this.spy*this.fac)>this.spy?this.spy:Math.round(this.spy*this.fac);
							}
						}
						
						/* Die Punkte des Angreifers werden aufgeteilt nach Infanterie, Kavallerie und Bogis: */						
						for( var i=0 ; i<self.attTroop.length-1; i++ ) {
							var attPoints = 0;
							for( var j=0 ; j<self.attTroop[i].length; j++ ) {
								var val = self.attTroops[self.attTroop[i][j].split("_")[1]];
								if( !isNaN(parseInt(val)) ) {
									if( typeof conf.attItems[self.attTroop[i][j].split("_")[1]] != "undefined" ) attPoints += parseInt(val,10)*unitBashVal[self.attTroop[i][j].split("_")[1]][0]*conf.attItems[self.attTroop[i][j].split("_")[1]]*self.morality*self.luck*self.attBelief;
									else attPoints += parseInt(val,10)*unitBashVal[self.attTroop[i][j].split("_")[1]][0]*self.morality*self.luck*self.attBelief;
								}
							}
							this.attGroups.push( attPoints );
							this.totalAttPoints += attPoints;
						}
				
						/* Die Defftruppen teilen sich prozentual zu den Angreifergruppen auf und bekämpfen in Gruppen den Angreifer: */
						this.winner = 0, this.rounds = 3;
						for( var i=0 ; i<this.attGroups.length ; i++ ) {
							/* Fuer jeden Teilkampf wird anteilig die Grundverteidigung durch den Wall mit einbezogen (ist unabhaengig vom Glauben) */
							this.defPoints = Math.round(this.attGroups[i]/this.totalAttPoints*self.wallBaseDef);
							for( var j in self.defTroops ) {
								if( typeof conf.defItems[j] != "undefined" ) this.defPoints += (this.attGroups[i]/this.totalAttPoints*self.defTroops[j]*(unitBashVal[j][i+1]*conf.defItems[j])*self.night*self.defBelief*self.wallBonus);
								else this.defPoints += this.attGroups[i]/this.totalAttPoints*self.defTroops[j]*unitBashVal[j][i+1]*self.night*self.defBelief*self.wallBonus;
							}
				
							/* Es wird nun geklaert, wer diesen Teilkampf gewinnt, außerdem werden die Truppenverluste berechnet: */
							if( this.defPoints > this.attGroups[i] ) {
								this.winner++;
								this.fac = Math.pow( (this.attGroups[i]/this.defPoints), 1.5 );
								for( var j in self.defTroops ) {
									if( typeof this.roundLosses.deff[j] == "undefined" ) this.roundLosses.deff[j] = 0;
									this.roundLosses.deff[j] += Math.round(this.attGroups[i]/this.totalAttPoints*self.defTroops[j]*this.fac);
								}
								for( var j=0 ; j<self.attTroop[i].length ; j++ ) {
									if( typeof self.attTroops[self.attTroop[i][j].split("_")[1]] != "undefined" ) {
										if( typeof this.roundLosses.att[self.attTroop[i][j].split("_")[1]] == "undefined" ) this.roundLosses.att[self.attTroop[i][j].split("_")[1]] = 0;
										this.roundLosses.att[self.attTroop[i][j].split("_")[1]] += parseInt(self.attTroops[self.attTroop[i][j].split("_")[1]],10);
									}
								}
							} else if( this.attGroups[i] > this.defPoints ) {
								this.winner--;
								this.fac = Math.pow( (this.defPoints/this.attGroups[i]), 1.5 );
								for( var j in self.defTroops ) {
									if( typeof this.roundLosses.deff[j] == "undefined" ) this.roundLosses.deff[j] = 0;
									this.roundLosses.deff[j] += Math.round(this.attGroups[i]/this.totalAttPoints*self.defTroops[j]);
								}
								for( var j=0 ; j<self.attTroop[i].length ; j++ ) {
									if( typeof self.attTroops[self.attTroop[i][j].split("_")[1]] != "undefined" ) {
										if( typeof this.roundLosses.att[self.attTroop[i][j].split("_")[1]] == "undefined" ) this.roundLosses.att[self.attTroop[i][j].split("_")[1]] = 0;
										this.roundLosses.att[self.attTroop[i][j].split("_")[1]] += Math.round(self.attTroops[self.attTroop[i][j].split("_")[1]]*this.fac);
									}
								}
							} else {
								if( this.attGroups[i] == 0 ) {
									this.rounds--;
								} else {
									this.fac = 1;
									for( var j in self.defTroops ) {
										if( typeof this.roundLosses.deff[j] == "undefined" ) this.roundLosses.deff[j] = 0;
										this.roundLosses.deff[j] += Math.round(this.attGroups[i]/this.totalAttPoints*self.defTroops[j]);
									}
									for( var j=0 ; j<self.attTroop[i].length ; j++ ) {
										if( typeof self.attTroops[self.attTroop[i][j].split("_")[1]] != "undefined" ) {
											if( typeof this.roundLosses.att[self.attTroop[i][j].split("_")[1]] == "undefined" ) this.roundLosses.att[self.attTroop[i][j].split("_")[1]] = 0;
											this.roundLosses.att[self.attTroop[i][j].split("_")[1]] += Math.round(self.attTroops[self.attTroop[i][j].split("_")[1]]*this.fac);
										}
									}
								}
							}
						}
					}
					
					this.Recursive = function() {
						var calc = new self.RecCalculate();
						for( var i in self.attTroops ) {
							if( typeof calc.roundLosses.att[i] != "undefined" ) {
								self.attTroops[i] = self.attTroops[i] - calc.roundLosses.att[i];
								if( typeof self.losses.att[i] == "undefined" ) self.losses.att[i] = calc.roundLosses.att[i];
								else self.losses.att[i] += calc.roundLosses.att[i];
								
							}
						}
						this.count = 0;
						for( var i in calc.roundLosses.deff ) this.count+= calc.roundLosses.deff[i];
						
						for( var i in self.defTroops ) {
							if( typeof calc.roundLosses.deff[i] != "undefined" ) {
								self.defTroops[i] = self.defTroops[i] - calc.roundLosses.deff[i];
								if( typeof self.losses.deff[i] == "undefined" ) self.losses.deff[i] = calc.roundLosses.deff[i];
								else self.losses.deff[i] += calc.roundLosses.deff[i];
							}
						}
						if( Math.abs(calc.winner) == calc.rounds ) {
							conf.defWinner = calc.winner<0?false:true;
							if( this.count == 0 ) {
								conf.defWinner = true;
								conf.tooLess = true;
							}
						} else new self.Recursive();
					}
					new this.Recursive();
					
					/* 3. Stufe - Die endgültige Berechnung der Wallsenkung und die Senkung eines Gebäudes durch die Katapulte wird durchgeführt. Es wird zwischen Kirche und herkömmlichem Gebäude unterschieden: */			
					//Unterscheidung, ob der Angreifer als Sieger oder Verlierer aus dem Kampf hervorgeht:
					if( !conf.defWinner ) {
						this.maxBashWall = (this.ram*unitBashVal["ram"][0]*this.attBelief*this.carols)/(4*Math.pow(1.09,this.defWall));
						if( this.cataChurch ) {
							this.preBuilding = this.preBuilding > 3 ? 3 : this.preBuilding;
							this.maxBashBuilding = (this.catapult*this.attBelief*this.aletheia)/churchConsFac[this.preBuilding];
						} else this.maxBashBuilding = (this.catapult*unitBashVal["catapult"][0]*this.attBelief*this.aletheia)/(300*Math.pow(1.09,this.preBuilding));
				
						this.lossesAttacker = 0;
						this.sumAttackerUnits = 0;
						for( var i in self.attTroops ) this.sumAttackerUnits += parseInt(self.attTroops[i],10)+(typeof self.losses["att"][i] == "undefined" ? 0 : parseInt(self.losses["att"][i],10));
						for( var i in self.losses["att"] ) this.lossesAttacker += parseInt(self.losses["att"][i],10);
						
						if( this.sumAttackerUnits == 0 ) this.lossesRate = 0;
						else this.lossesRate = this.lossesAttacker/this.sumAttackerUnits;				
						this.endWall = this.defWall - Math.round(this.maxBashWall - (0.5*this.maxBashWall*this.lossesRate) );
						this.endBuilding = this.preBuilding - Math.round(this.maxBashBuilding - (0.5*this.maxBashBuilding*this.lossesRate) );
					} else {
						this.lossesDeffer = 0;
						this.sumDefferUnits = 0;
						for( var i in self.defTroops ) this.sumDefferUnits += parseInt(self.defTroops[i],10)+(typeof self.losses["deff"][i] == "undefined" ? 0 : parseInt(self.losses["deff"][i],10));
						for( var i in self.losses["deff"] ) this.lossesDeffer += parseInt(self.losses["deff"][i],10);
	
						if( this.sumDefferUnits == 0 ) this.lossesRate = 0;
						else this.lossesRate = this.lossesDeffer/this.sumDefferUnits;	
						this.endWall = this.defWall - Math.round((this.ram*unitBashVal["ram"][0]*this.lossesRate*this.attBelief*this.carols)/(8*Math.pow(1.09,this.defWall)));	
						if( this.cataChurch ) {
							this.preBuilding = this.preBuilding > 3 ? 3 : this.preBuilding;
							this.endBuilding = this.preBuilding - Math.round(0.5*((this.catapult*this.attBelief*this.aletheia*this.lossesRate)/(churchConsFac[this.preBuilding])));
						} else this.endBuilding = this.preBuilding - Math.round(((this.catapult*unitBashVal["catapult"][0]*this.attBelief*this.aletheia)/(600*Math.pow(1.09,this.preBuilding)))*this.lossesRate);
					}
					this.endWall = this.endWall < 0 ? 0 : this.endWall;
					if( this.preBuilding <= 0 ) this.endBuilding = 0;
					this.endBuilding = this.endBuilding < 0 ? 0 : this.endBuilding;
					
					/* überschreibe das conf-Objekt */
					base.mainConf.counterOffs++;
					base.mainConf.endWall = this.endWall;
					base.mainConf.endBuilding = this.endBuilding;
					if( !conf.defWinner || conf.tooLess ) {
						base.mainConf.losses = conf.losses;
						base.mainConf.tooLess = conf.tooLess;
						if( !base.mainConf.tooLess ) base.mainConf.defTroops = conf.losses["deff"];
						base.mainConf.defWinner = conf.defWinner;
						base.mainConf.tooLess = conf.tooLess;
						return base.mainConf;
					} else {
						base.mainConf.defTroops = conf.defTroops;
						base.mainConf.defWall = this.endWall;
						base.mainConf.preBuilding = this.endBuilding;
						conf = JSON.parse(JSON.stringify(base.mainConf));
						return new pointer.simOff( conf );
					}
				}
				var confi = JSON.parse(JSON.stringify(config));
				this.sim = new pointer.simOff(confi);
			};
			this.lastValue = new this.BashRec( this.mainConf );
			
			/* 4. Stufe - Die Ausgabe erfolgt über ein Formular: */
			this.popTable = document.createElement("table");
			this.popTable.id = "dssb_recCalcTable";
			this.h3 = this.popTable.appendChild( document.createElement("h3") );
			this.h3.innerHTML = gui[lib.lang].dstroopscalc.recResult;
			this.popTable2 = this.popTable.appendChild( document.createElement("table") );
			base.mainConf.luck = Math.abs( base.mainConf.luck ) > 0.25 ? (base.mainConf.luck < 0 ? 0.75 : 1.25)-1 : base.mainConf.luck;
			this.popTable2.innerHTML = "<br />"+gui[lib.lang].dstroopscalc.youNeed[0]+" <b>"+base.mainConf.counterOffs+"</b> "+gui[lib.lang].dstroopscalc.youNeed[1]+"<br />"+gui[lib.lang].dstroopscalc.youNeed[2]+" <b>"+((base.mainConf.luck)>0?"+":"")+Math.round((base.mainConf.luck)*100)+"%</b> "+gui[lib.lang].dstroopscalc.youNeed[3];
			this.popTable3 = this.popTable2.appendChild( document.createElement("table") );
			this.popTable3.className = "vis";
			this.tbody = this.popTable3.appendChild( document.createElement("tbody") );
			this.tr = this.tbody.appendChild( document.createElement("tr") );
			this.td = this.tr.appendChild( document.createElement("td") );
			this.td.colSpan = 2;
			this.counter = 1;
			this.arr = [];
			for( var i=0 ; i<base.mainConf.defTroop.length ; i++ ) {
				if( this.units.indexOf(base.mainConf.defTroop[i].split("_")[1]) != -1 ) {
					this.th = this.tr.appendChild( document.createElement("th") );
					this.th.width = "35";
					this.img = this.th.appendChild( document.createElement("img") );
					this.img.src = "/graphic/unit/unit_"+base.mainConf.defTroop[i].split("_")[1]+".png";
					this.counter++; this.arr.push( base.mainConf.defTroop[i].split("_")[1] );
				}
			}
			for( var j=0 ; j<4 ; j++ ) {
				this.tr = this.tbody.appendChild( document.createElement("tr") );
				if( parseInt(j/2) * 2 == j ) {
					this.td = this.tr.appendChild( document.createElement("td") );
					this.td.innerHTML = j > 1 ? gui[lib.lang].dstroopscalc.deffer : gui[lib.lang].dstroopscalc.attacker;
					this.td.rowSpan = 2;
				}
				for( var i=0 ; i<this.counter ; i++ ) {
					this.td = this.tr.appendChild( document.createElement("td") );
					if( i==0 ) this.td.innerHTML = parseInt(j/2) * 2 == j ? gui[lib.lang].dstroopscalc.units : gui[lib.lang].dstroopscalc.losses;
					else {
						if( parseInt(j/2) * 2 != j ) {
							if( typeof base.mainConf.losses[(j>1?"deff":"att")][this.arr[i-1]] != "undefined" ) this.td.innerHTML = base.mainConf.losses[(j>2?"deff":"att")][this.arr[i-1]];
							else {this.td.innerHTML = 0; this.td.className = "unit-item hidden";}
						} else {
							this.val = j>1 ? base.mainConf.defTroops : base.mainConf.AlwaysAttTroops;
							this.val2 = j>1 ? "deff" : "att";
							if( typeof this.val[this.arr[i-1]] != "undefined" ) this.td.innerHTML = this.val[this.arr[i-1]];
							else {this.td.innerHTML = 0; this.td.className = "unit-item hidden";}
						}
						if( this.td.innerHTML == "0" ) {this.td.innerHTML = 0; this.td.className = "unit-item hidden";}
					}
				}
			}
			if( (base.mainConf.defWall != base.mainConf.endWall) || (base.mainConf.preBuilding != base.mainConf.endBuilding) ) {
				this.popTable3 = this.popTable2.appendChild( document.createElement("table") );
				this.tbody = this.popTable3.appendChild( document.createElement("tbody") );
				
				for( var i=0 ; i<2 ; i++ ) {
					if( (i<1 && base.mainConf.defWall != base.mainConf.endWall) || (i>0 && base.mainConf.preBuilding != base.mainConf.endBuilding ) ) {
						this.tr = this.tbody.appendChild( document.createElement("tr") );
						this.th = this.tr.appendChild( document.createElement("th") );
						this.th.innerHTML = i<1 ? gui[lib.lang].dstroopscalc.damageFromRam : gui[lib.lang].dstroopscalc.damageFromCata;
						this.td = this.tr.appendChild( document.createElement("td") );
						this.td.innerHTML = i<1 ? gui[lib.lang].dstroopscalc.wallDamaged[0]+" <b>"+base.mainConf.defWall+"</b> "+gui[lib.lang].dstroopscalc.wallDamaged[1]+" <b>"+base.mainConf.endWall+"</b>" : (base.mainConf.cataChurch?gui[lib.lang].dstroopscalc.buildingDamaged[0]:gui[lib.lang].dstroopscalc.buildingDamaged[1])+" "+gui[lib.lang].dstroopscalc.buildingDamaged[2]+" <b>"+base.mainConf.preBuilding+"</b> "+gui[lib.lang].dstroopscalc.buildingDamaged[3]+" <b>"+base.mainConf.endBuilding+"</b>";
					}
				}
			}
			lib.popup("recCalcPopup", screen.width/2-400, screen.height/2, this.popTable, true, 650, 300 );
		}, false);
	}
	
	var input = inputs[inputs.length-1].parentNode.appendChild( document.createElement("input") );
	input.type = "button";
	input.value = lib.createTextNode( gui[lib.lang].troopsInput ).textContent;
	input.addEventListener("click",function() {
		this.elements = document.forms[0].elements;
		
		this.val=[[false,false,6500,false,20,2750,250,false,250,50,false,false,false,false,false,false,false,false,false],[],[]];
		this.val[0].push(false,false,false,false,false,false,false,false,false);
		this.val[1].push("0","none");
		this.val[2].push(true,true,false,false);
		this.values = lib.storage.getValue("TroopsSimInput_player.id"+lib.game_data.player.id,this.val);
				
		for( this.i=0 ; this.i<texts[0].length ; this.i++ ) {
			if( !this.values[0][this.i] ) continue;
			else this.elements[texts[0][this.i]].value=this.values[0][this.i];
		} 
		for( this.i=0 ; this.i<texts[1].length ; this.i++ )
			this.elements[texts[1][this.i]].value = this.values[1][this.i];
		for( this.i=0 ; this.i<texts[2].length ; this.i++ )
			this.elements[texts[2][this.i]].checked = this.values[2][this.i];

		this.inputs = this.parentNode.getElementsByTagName("input");
	}, false);	
	var span = inputs[inputs.length-1].parentNode.appendChild( document.createElement("span") );
	span.style.paddingRight = "10px";	
	var a = inputs[inputs.length-1].parentNode.appendChild( document.createElement("a") );
	a.href = "javascript:;";
	a.innerHTML = " "+gui[lib.lang].actualConfig;
	a.addEventListener("click",function() {
		this.elements = document.forms[0].elements;
		this.values=[[],[],[]];
					
		for( this.i=0 ; this.i<texts[0].length ; this.i++ ) {
			if( this.elements[texts[0][this.i]].value != "" ) 
				this.values[0].push( this.elements[texts[0][this.i]].value );
			else this.values[0].push( false );
		} 
		for( this.i=0 ; this.i<texts[1].length ; this.i++ ) {
			this.cache = "";
			for( this.j=0 ; this.j<this.elements[texts[1][this.i]].options.length ; this.j++ ) {
				if( this.elements[texts[1][this.i]].options[this.j].selected )
					this.cache = this.elements[texts[1][this.i]].options[this.j].value;
			} if( this.cache == "" ) this.cache = this.elements[texts[1][this.i]].options[0].value;
			this.values[1].push( this.cache );
		}
		for( this.i=0 ; this.i<texts[2].length ; this.i++ )
			this.values[2].push( this.elements[texts[2][this.i]].checked );
			
		lib.storage.setValue("TroopsSimInput_player.id"+lib.game_data.player.id,this.values);		
		alert( lib.createTextNode( gui[lib.lang].troopsStandard ).textContent );
	}, false);
}

/* show storage */
if( location.href.match(/screen=storage/) && !checkboxes.disableAddInfosStorage ) {
	var tbody = document.getElementById("content_value").getElementsByClassName("vis")[1].getElementsByTagName("tbody")[0];
	var filter = lib.storage.getValue("Filter_player.id"+lib.game_data.player.id,defaultFilterSettings);
	tbody.getElementsByTagName("tr")[0].innerHTML = "<th>"+gui[lib.lang].addInfosStorage.time+"</th><th>"+gui[lib.lang].addInfosStorage.resCrows+
		"</th><th>"+gui[lib.lang].addInfosStorage.castra+"</th>"+tbody.getElementsByTagName("tr")[0].innerHTML;
	var imgSrcs = ["/graphic/"+regExp[lib.lang].wood+".png?1","/graphic/"+regExp[lib.lang].clay+".png?1","/graphic/"+regExp[lib.lang].iron+".png?1"];
	
	var wood=parseInt(document.getElementById("wood").title,10); wood = wood/3600;
	var stone=parseInt(document.getElementById("stone").title,10); stone = stone/3600;
	var iron=parseInt(document.getElementById("iron").title,10); iron = iron/3600;
	var storage=parseInt(document.getElementById("storage").innerHTML,10);	
	var object=tbody.getElementsByTagName('td');
	
	for( var i=0 ; i<3 ; i++ ) {
		object[3*i+1].noWrap="true";
		var time = object[3*i+2].innerHTML.match(/(\d+){1,2}:(\d+){1,2}:(\d+){1,2}/);
		time = parseInt(time[1],10)*3600+parseInt(time[2],10)*60+parseInt(time[3],10);
		var val=[i==0?storage+1:Math.floor(parseInt(document.getElementById("wood").innerHTML,10)+time*wood)];
		val.push(i==1?storage+1:Math.floor(parseInt(document.getElementById("stone").innerHTML,10)+time*stone));
		val.push(i==2?storage+1:Math.floor(parseInt(document.getElementById("iron").innerHTML,10)+time*iron));
		for( var j=0 ; j<val.length ; j++ ) {val[j]=val[j]>storage?gui[lib.lang].addInfosStorage.full:val[j];}
		
		var oldStr = object[3*i+1].innerHTML.match(/(\d+){1,2}:(\d+){1,2}:(\d+){1,2}/);
		var newStr = "<a title=\""+gui[lib.lang].wood+": "+val[0]+" | "+gui[lib.lang].clay+": "+val[1]+" | "+gui[lib.lang].iron+": "+val[2]+"\">"+oldStr[0]+"</a>";
		object[3*i+1].innerHTML = object[3*i+1].innerHTML.replace(oldStr[0],newStr);
	}
	tbody.getElementsByTagName("tr")[1].innerHTML="<td rowSpan='3' nowrap='nowrap'>"+gui[lib.lang].addInfosStorage.charge+" <select id='dssb_time'></select> <input id='dssb_timeH' style='width:15px' maxLength='2'></input>:"+
		"<input id='dssb_timeM' style='width:15px' maxLength='2'></input>:<input id='dssb_timeS' style='width:15px' maxLength='2'></input>"+
		"</td><td><img src='"+imgSrcs[0]+"'></img> <span id='dssb_crop_wood'></span></td><td><img src='"+imgSrcs[0]+"'></img> <span id='dssb_level_wood'></span></td>"+
		tbody.getElementsByTagName("tr")[1].innerHTML;
	tbody.getElementsByTagName("tr")[2].innerHTML="<td><img src='"+imgSrcs[1]+"'></img> <span id='dssb_crop_stone'></span></td>"+
		"<td><img src='"+imgSrcs[1]+"'></img> <span id='dssb_level_stone'></span></td>"+tbody.getElementsByTagName("tr")[2].innerHTML;
	tbody.getElementsByTagName("tr")[3].innerHTML="<td><img src='"+imgSrcs[2]+"'></img> <span id='dssb_crop_iron'></span></td>"+
		"<td><img src='"+imgSrcs[2]+"'></img> <span id='dssb_level_iron'></span></td>"+tbody.getElementsByTagName("tr")[3].innerHTML;
	
	var updateShowRes = function(id) {
		if(navigator.userAgent.indexOf("Opera")!=-1) var name = "DOMNodeInserted";
		else var name = "DOMSubtreeModified";
		document.getElementById(id).addEventListener(name,function() {
			this.valS = parseInt( this.innerHTML, 10 )+parseInt(document.getElementById("dssb_crop_"+id).innerHTML,10);	
			this.elem = document.getElementById("dssb_level_"+id);		
			if( this.valS > parseInt(this.elem.innerHTML,10) ) {
				if( this.valS > parseInt(document.getElementById("storage").innerHTML, 10) ) {
					this.elem.innerHTML=parseInt(document.getElementById("storage").innerHTML, 10); this.elem.style.color="red";
				} else this.elem.innerHTML=parseInt(this.elem.innerHTML,10)+1;
			}
		}, false);	
	};
	var updateStorVal = function() {
		if( filter.timeStor[3] != 0 ) { 
			this.date = new Date();
			this.date.setHours(filter.timeStor[0]);
			this.date.setMinutes(filter.timeStor[1]);
			this.date.setSeconds(filter.timeStor[2]);
			if( parseInt(lib.getServerTime().getTime(),10) > parseInt(this.date.getTime(),10) ) {
				this.date.setTime(this.date.getTime()+24*60*60*1000);
			} this.seconds=Math.floor(parseInt(this.date.getTime()-lib.getServerTime().getTime(),10)/1000);
		} else this.seconds=parseInt(filter.timeStor[0],10)*3600+parseInt(filter.timeStor[1],10)*60+parseInt(filter.timeStor[2],10);
		document.getElementById("dssb_crop_wood").innerHTML=Math.floor( wood * this.seconds );
		document.getElementById("dssb_crop_stone").innerHTML=Math.floor( stone * this.seconds );
		document.getElementById("dssb_crop_iron").innerHTML=Math.floor( iron * this.seconds );
		this.res = ["wood","stone","iron"];
		
		for( var i=0 ; i<this.res.length ; i++ ) {
			this.lev = Math.floor( parseInt(document.getElementById("dssb_crop_"+this.res[i]).innerHTML,10) )+parseInt(document.getElementById(this.res[i]).innerHTML,10);
			if( this.lev > parseInt(document.getElementById("storage").innerHTML, 10) ) {
				document.getElementById("dssb_level_"+this.res[i]).innerHTML=parseInt(document.getElementById("storage").innerHTML, 10); 
				document.getElementById("dssb_level_"+this.res[i]).style.color="red"
			} else {
				document.getElementById("dssb_level_"+this.res[i]).innerHTML=this.lev;
				document.getElementById("dssb_level_"+this.res[i]).style.removeProperty("color");
			} 	new updateShowRes(this.res[i]);
		}
	}; 
	var select = document.getElementById("dssb_time");
	select.options.add( new Option(gui[lib.lang].addInfosStorage.in,0, false) );
	select.options.add( new Option(gui[lib.lang].addInfosStorage.at,1, false) );
	select.selectedIndex=filter.timeStor[3];	
	select.addEventListener("change",function() {
		filter.timeStor[3] = this.selectedIndex;
		lib.storage.setValue("Filter_player.id"+lib.game_data.player.id,filter);
		new updateStorVal();
	}, false);
	
	var inputH = document.getElementById("dssb_timeH");
	inputH.value = filter.timeStor[0];
	inputH.addEventListener("change",function() {
		filter.timeStor[0]=parseInt(this.value,10)>0?this.value:"00";
		this.value=parseInt(this.value,10)>0?this.value:"00";
		if( parseInt(filter.timeStor[0],10) > 0 && parseInt(filter.timeStor[0],10) < 10 ) {filter.timeStor[0]="0"+filter.timeStor[0];this.value="0"+this.value;}
		lib.storage.setValue("Filter_player.id"+lib.game_data.player.id,filter);
		new updateStorVal();
	}, false);
	var inputM = document.getElementById("dssb_timeM");
	inputM.value = filter.timeStor[1];	
	inputM.addEventListener("change",function() {
		filter.timeStor[1]=parseInt(this.value,10)>0?this.value:"00";
		this.value=parseInt(this.value,10)>0?this.value:"00";
		if( parseInt(filter.timeStor[1],10) > 0 && parseInt(filter.timeStor[1],10) < 10 ) {filter.timeStor[1]="0"+filter.timeStor[1];this.value="0"+this.value;}
		lib.storage.setValue("Filter_player.id"+lib.game_data.player.id,filter);
		new updateStorVal();
	}, false);
	var inputS = document.getElementById("dssb_timeS");
	inputS.value = filter.timeStor[2];
	inputS.addEventListener("change",function() {
		filter.timeStor[2]=parseInt(this.value,10)>0?this.value:"00";
		this.value=parseInt(this.value,10)>0?this.value:"00";
		if( parseInt(filter.timeStor[2],10) > 0 && parseInt(filter.timeStor[2],10) < 10 ) {filter.timeStor[2]="0"+filter.timeStor[2];this.value="0"+this.value;}
		lib.storage.setValue("Filter_player.id"+lib.game_data.player.id,filter);
		new updateStorVal();
	}, false);	
	new updateStorVal();
}
}

/* dsAccDualForum */  
if( !lib.storage.getValue("DsAccDualForum_disabled",false) ) {
	if ( location.href.match(/screenmode=view_forum&forum_id/) || location.href.match(/screen=view_forum&forum_id/) || location.href.match("forum.php?") || location.href.match(/screen=forum/) ) {  
		var index=1; if( location.href.match("forum.php?") ) index=0;
	 	if( !location.href.match("screenmode=view_thread") && !location.href.match(/screen=view_thread/) ) {  
		var vis = document.getElementsByClassName("vis");
		var th = document.createElement("th");
		th.style.textAlign="center";   
		vis[index].getElementsByTagName("tr")[0].appendChild(th);  
		
		var markAll = vis[index].parentNode.parentNode.getElementsByTagName("tbody")[0].getElementsByTagName("td")[1].getElementsByTagName("a");
		var href=[];
		markAll[0].addEventListener("click",function() {
			this.rowsLength = vis[index].getElementsByTagName("tr");
			for(var i=1 ; i<this.rowsLength.length ; i++) {
				if( this.rowsLength[i].getElementsByTagName("th").length != 0 ) break;
				this.threadid = this.rowsLength[i].getElementsByTagName("a")[0].href;
				this.threadid = this.threadid.split("thread_id=");
				this.threadid = this.threadid[this.threadid.length-1].split("&")[0];
				this.answers = this.rowsLength[i].getElementsByTagName("td")[3].textContent;
				lib.storage.setValue("forum_thread.id"+this.threadid,this.answers);
			}
		},false);
		href.push( markAll[1].href ); href.push( markAll[1].innerHTML );
		markAll[1].parentNode.removeChild( markAll[1] );
		markAll[1] = markAll[0].parentNode.appendChild( document.createElement("a") );
		markAll[1].innerHTML = href[1];
		markAll[1].style.cursor = "pointer";
		markAll[1].href = "javascript:;";
		markAll[1].addEventListener("click",function() {
			if( confirm(gui[location.href.match(/([a-z]+)\d+\./)[1]].dsForumAllReaded) ) {
				this.values = lib.storage.listValues();
				for( var i=0 ; i<this.values.length ; i++ ) {
					if( this.values[i].match(/forum_thread\.id/) ) lib.storage.deleteValue(this.values[i]);
				} lib.storage.setValue("allThreadsReaded",true);
				window.location.href = href[0];
			} else return false;
		}, false);
    
		var rowsLength = vis[index].getElementsByTagName("tr");
		for(var i=1 ; i<rowsLength.length ; i++) {
			if( rowsLength[i].getElementsByTagName("th").length != 0 ) break;
			var threadid = vis[index].getElementsByTagName("tr")[i].getElementsByTagName("a")[0].href;
			var threadid = threadid.split("thread_id=");
			threadid = threadid[threadid.length-1].split("&")[0];
        
			var answersStorage = lib.storage.getValue("forum_thread.id"+threadid,"");
			var answers = vis[index].getElementsByTagName("tr")[i].getElementsByTagName("td")[3].textContent;
			var allReaded = lib.storage.getValue("allThreadsReaded",false);
			if( answersStorage != answers ) var readed = false; else var readed = true;
			if( allReaded ) {
				if( answersStorage == "" ) {
					if( vis[index].getElementsByTagName("tr")[i].getElementsByTagName("img")[0].src.match(/thread_unread/) ) readed=false;
					else readed = true;
				}
			}
        
			var img = document.createElement("IMG");
			img.src = readed ? "/graphic/dots/green.png?1" : "/graphic/dots/red.png?1";
        
			var td = document.createElement("td");
			td.style.textAlign="center";
			td.appendChild(img);
			vis[index].getElementsByTagName("tr")[i].appendChild(td);
		}
		vis[index].addEventListener("click",function(e) {
						if( e.target.nodeName == "A" ) {  
							var threadid = e.target.href;
							if( threadid.match(/screenmode=view_thread&thread_id/) || threadid.match(/screen=view_thread&thread_id/) ) {  
								var threadid = threadid.split("thread_id="); 
								threadid = threadid[threadid.length-1].split("&")[0];   
								try{var threadanswers = e.target.parentNode.parentNode.getElementsByTagName("td")[3].textContent;} catch(err) {
								var threadanswers = e.target.parentNode.parentNode.parentNode.getElementsByTagName("td")[3].textContent;};
								lib.storage.setValue("forum_thread.id"+threadid,threadanswers);
							}}
		},false);}
	}

	if( (location.href.match(/screenmode=view/) || location.href.match(/screen=view/)  ) && location.href.match(/answer=true/) ) {
		var buttons = document.getElementsByTagName("input"); var i=0;
		for( var e=0 ; e<buttons.length ; e++ ) {
			if( buttons[e].name == "send" ) i=e;
		}
		buttons[i].addEventListener("click",function(){
			var threadid = location.href.match(/thread_id=(\d+)/)[1];
			var answersStorage = lib.storage.getValue("forum_thread.id"+threadid,0);
			answersStorage++;
			lib.storage.setValue("forum_thread.id"+threadid,answersStorage);
		},false);
                
		if( document.getElementsByClassName("error")[0] ) {
			var threadid = location.href.match(/thread_id=(\d+)/)[1];
			var answersStorage = lib.storage.getValue("forum_thread.id"+threadid,0);
			answersStorage--;
			lib.storage.setValue("forum_thread.id"+threadid,answersStorage);   
		}
	}

	if( location.href.match(/screenmode=view_thread&thread_id/) || location.href.match(/screen=view_thread&thread_id/) ) {
		var fbox = document.getElementById("forum_box");
		fbox.addEventListener("click",function(e) {
			if( e.target.nodeName == "A" ) {
				var href = e.target.href;
				if( href.match(/action=del_post/) ) {   
					var threadid = location.href.match(/thread_id=(\d+)/)[1];
					var answersStorage = lib.storage.getValue("forum_thread.id"+threadid,0);
					answersStorage--;
					lib.storage.setValue("forum_thread.id"+threadid,answersStorage); 
		}}},false);
	}  
} 

if( !lib.game_data ) return;
if( document.getElementById("target_attack") ) {
	var a = document.getElementById("target_attack").parentNode.parentNode.getElementsByTagName("a");

	if( !hotkeys.disableAll.keysPlace ) {
		document.getElementById("target_support").value = lib.createTextNode(gui[lib.lang].target_support+lib.showHotkey( hotkeys.keys.keysPlace.targetSupport )).textContent;
		lib.hotkeys.keys.push( { key: hotkeys.keys.keysPlace.targetSupport, event: { id: "target_support", event: "click" } } );
		document.getElementById("target_attack").value = lib.createTextNode(gui[lib.lang].target_attack+lib.showHotkey( hotkeys.keys.keysPlace.targetAttack )).textContent;
		lib.hotkeys.keys.push( { key: hotkeys.keys.keysPlace.targetAttack, event: { id: "target_attack", event: "click" } } );

		/* Alle Truppen auswaehlen */
		document.getElementById("selectAllUnits").textContent += lib.showHotkey( hotkeys.keys.keysPlace.selectAllUnits );
		lib.hotkeys.keys.push( { key: hotkeys.keys.keysPlace.selectAllUnits, href: "javascript:selectAllUnits(true)" } );	
        
		if( lib.game_data.player.premium ) { 
			/* choose favourites, own villages, course */
			a[0].textContent += lib.showHotkey( hotkeys.keys.keysPlace.favourite );
			a[0].id = "favourite";
			lib.hotkeys.keys.push( { key: hotkeys.keys.keysPlace.favourite, event: { id: "favourite", event: "click" } } );
			a[1].textContent += lib.showHotkey( hotkeys.keys.keysPlace.ownVillages );
			a[1].id = "ownVillages";
			lib.hotkeys.keys.push( { key: hotkeys.keys.keysPlace.ownVillages, event: { id: "ownVillages", event: "click" } } );
			a[2].textContent += lib.showHotkey( hotkeys.keys.keysPlace.course );	
			a[2].id = "course";
			lib.hotkeys.keys.push( { key: hotkeys.keys.keysPlace.course, event: { id: "course", event: "click" } } );
			a[3].textContent += lib.showHotkey( hotkeys.keys.keysPlace.lastVillage );
			a[3].id = "lastVillage";
			lib.hotkeys.keys.push( { key: hotkeys.keys.keysPlace.lastVillage, event: { id: "lastVillage", event: "click" } } );
			
			/* close popup again */
			lib.hotkeys.keys.push( { key: hotkeys.keys.keysPlace.closePopup, href: "javascript:inlinePopupClose()" } ); 
		}
	}
	
	/* last troop link */
	if( !checkboxes.disableLastTroopsLink )  {
		var defaultValues = {spear: "0", sword: "0",axe: "0",archer:"0",spy:"0",light:"0",marcher:"0",heavy:"0",ram:"0",catapult:"0",knight:"0",snob:"0",};
		var names = ["spear","sword","axe","archer","spy","light","marcher","heavy","ram","catapult","knight","snob"], fadedIn = 0;
	
		var troopsTd = document.getElementById("selectAllUnits").parentNode.parentNode.appendChild( document.createElement("td") );
		troopsTd.colSpan = 2;
		var lastTroops = troopsTd.appendChild( document.createElement("a") );
		lastTroops.style.paddingLeft = "20px";
		lastTroops.href = "javascript:;";
		lastTroops.innerHTML = gui[lib.lang].lastTroops+lib.showHotkey( hotkeys.keys.keysPlace.lastTroops );
		lastTroops.id = "dssb_lastTroops";
		lastTroops.addEventListener("click",function() {
			var values = lib.storage.getValue("LastVillage"+lib.game_data.player.id,defaultValues);
			if( !fadedIn ) {
				for( var i=0 ; i<names.length ; i++ ) {
					if( values[names[i]] == "" ) values[names[i]]=0;
					if ( (typeof document.getElementById("unit_input_"+names[i])!='undefined') && values[names[i]] != "0") {
						if( parseInt(document.getElementById("unit_input_"+names[i]).nextSibling.nextSibling.textContent.replace(/[()]/g,""))>=parseInt(values[names[i]]) )
							document.getElementById("unit_input_"+names[i]).value = values[names[i]];
						else  {document.getElementById("unit_input_"+names[i]).value = 
							document.getElementById("unit_input_"+names[i]).nextSibling.nextSibling.textContent.replace(/[()]/g,"");}
					}
				}
			} else {
				for( var i=0 ; i<names.length ; i++ ) {
					if ( (typeof document.getElementById("unit_input_"+names[i])!='undefined' && values[names[i]] != "") ) {
						if( parseInt(document.getElementById("unit_input_"+names[i]).nextSibling.nextSibling.textContent.replace(/[()]/g,""))>0 ) 
							document.getElementById("unit_input_"+names[i]).value = "";
					}
				}
			}
			fadedIn = !fadedIn;
		}, false);
		lib.hotkeys.keys.push( { key: hotkeys.keys.keysPlace.lastTroops, event: { id: "dssb_lastTroops", event: "click" } } );

		/* save Values */
		function saveValues() {
			var values =  defaultValues;
			for( var i=0 ; i<names.length ; i++ ) {
				if ( typeof document.getElementById("unit_input_"+names[i])!='undefined' )
					values[names[i]]=document.getElementById("unit_input_"+names[i]).value;
			}
			lib.storage.setValue("LastVillage"+lib.game_data.player.id,values);
		}
		document.getElementById("target_attack").addEventListener("click", saveValues, false);
		document.getElementById("target_support").addEventListener("click", saveValues, false);
	}
}

/* attack button on place submit */ 
if( document.getElementById("troop_confirm_go") && !hotkeys.disableAll.keysPlace ) {
	document.getElementById("troop_confirm_go").value = lib.createTextNode(gui[lib.lang].target_attack+lib.showHotkey( hotkeys.keys.keysPlace.troopConfirm )).textContent;
	lib.hotkeys.keys.push( { key: hotkeys.keys.keysPlace.troopConfirm, event: { id: "troop_confirm_go", event: "click" } } )
}

if( location.href.match(/screen=report/) ) {
	
	/* DSMoveReports */
	if( !checkboxes.disableDsMoveReports && !location.href.match(/view=/) && lib.pa ) {
		var mode = lib.game_data.mode;
		if( mode=="group_create" || mode=="filter" || mode=="block" || mode=="public" || mode=="forward" || mode=="move" || mode=="process_reports" ) return;
		var reportGroups = document.getElementsByClassName("vis")[1].getElementsByTagName("td")[1].getElementsByTagName("*");

		if( typeof(checkboxes.reportGroups) == "boolean" || ( typeof(checkboxes.reportGroups) == "object" && checkboxes.reportGroups.length != reportGroups.length-1 ) ) {
			var groups = new Array(reportGroups.length-1);
			for( var x=1 ; x<reportGroups.length ; x++ ) {
				groups[x-1] = reportGroups[x].textContent.replace(/[\[\]\<\>]/g,"");
			}
			checkboxes.reportGroups = groups;
			lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
			alert( gui[lib.lang].dsMoveReports.reportFoldersImported );
		}
		
		var input = document.getElementsByTagName("input");
		for( var x=0 ; x<input.length ; x++ ) {
			if( input[x].name == "group_name" ) {
				input[x+1].addEventListener("click",function() {
					checkboxes.reportGroups = false;
					lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
				}, false);
				break;
			}
		}
		
		var getReports = function() {
			var reportElements = lib.xPath('//span[contains(@id, "labelText")]');
			var reports = [];

			for(var x = 0; x < reportElements.length; x++) {
				var Report =  new function() {
					this.name = ''; this.id = 0; this.green = 0; this.redYellow = 0; this.yellow = 0; this.red = 0;
					this.blue = 0; this.read = 0; this.text = 0; this.empty = 0; this.forwarded = 0;
				}
				Report.name = reportElements[x].textContent;
				Report.id = reportElements[x].id.replace(/labelText_/, "");
				if( reportElements[x].parentNode.getElementsByTagName("IMG").length > 0 ) {
					if( reportElements[x].parentNode.getElementsByTagName("IMG")[0].src.indexOf('forwarded.png') > 0 ) Report.forwarded = 1;
				} else if(reportElements[x].parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.nodeName == 'IMG'){
					if (reportElements[x].parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.src.indexOf('green.png')>0) {Report.green = 1;}
					else if (reportElements[x].parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.src.indexOf('red_yellow.png')>0) {Report.redYellow = 1;}
					else if (reportElements[x].parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.src.indexOf('red_blue.png')>0) {Report.redBlue = 1;}
					else if (reportElements[x].parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.src.indexOf('yellow.png')>0) {Report.yellow = 1;}
					else if (reportElements[x].parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.src.indexOf('red.png')>0) {Report.red = 1;}
					else if (reportElements[x].parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.src.indexOf('blue.png')>0) {Report.blue = 1;}
					else if (reportElements[x].parentNode.parentNode.parentNode.firstChild.nextSibling.nextSibling.nodeName == 'SPAN') {
						Report.empty = 1;
					}
				}
				else Report.text = 1;
				if ( reportElements[x].parentNode.parentNode.parentNode.parentNode.getElementsByTagName("td")[0].textContent.match(regExp[lib.lang].newr) ) Report.read = 1;
				reports.push(Report);
			}	
			return reports;
		};
		
		var DSMoveReportsFunctions = function(objId) {
			var THIS = this;
			this.check = 0;
			this.setCheck = function(rid, check) {document.getElementsByName('id_' + rid)[0].checked = true;this.check++;}
			this.removeCheck = function(rid) {document.getElementsByName('id_' + rid)[0].checked = false;}
			this.errorHandling = function(groupname) {
				this.error = false;
				this.selectGroup = function(groupname) {
					try {
						this.options = document.getElementsByName("group_id")[0].getElementsByTagName("option"); this.selected = false;	
						for(this.q = 0; this.q < this.options.length; this.q++) {
							if(this.options[this.q].textContent == groupname) {
								if( THIS.check > 0 ) this.options[this.q].selected = true; 
								this.selected = true;
							}
						} return this.selected;
					} catch(e) {return false;}
				}
				if(groupname === '') {alert( gui[lib.lang].dsMoveReports.noGroupSet ); this.error=true;
				} else if(document.getElementsByTagName("strong")[0].textContent.replace(/[\[\]\<\>]/g, "") == groupname+" ") {
					alert( gui[lib.lang].dsMoveReports.alreadyInGroup );this.error=true;
				} else if( THIS.allReports.length <= 0 ) { alert( gui[lib.lang].dsMoveReports.noAvailableReports ); this.error=true;
				} else if(this.selectGroup(groupname) === false) {alert( gui[lib.lang].dsMoveReports.noExistentGroup ); this.error=true;
				} else if( THIS.check > 0 ) lib.xPath('//input[@value="'+regExp[lib.lang].move+'"]')[0].click();
				if( this.error ) {for(this.w = 0; this.w < THIS.allReports.length; this.w++) THIS.removeCheck(THIS.allReports[this.w].id);}
			};
			this.moveBBIDs = lib.storage.getValue("moveBBIDs:"+lib.game_data.player.id,"").split(";");
			this.moveAttsIDs = lib.storage.getValue("moveAttsIDs:"+lib.game_data.player.id,"").split(";");
			this.moveSpyIDs = lib.storage.getValue("moveSpyIDs:"+lib.game_data.player.id,"").split(";");
			this.allReports = new getReports();
			
			if( objId == "moveBB" ) {
				this.groupName = checkboxes.reportGroups[checkboxes.selectedGroups[0]];
				for( this.x=0; this.x<this.allReports.length; this.x++) {
					if(this.allReports[this.x].green || this.allReports[this.x].yellow) {
						if ( this.allReports[this.x].name.match(regExp[lib.lang].barbarianVillage) || this.allReports[this.x].name.match(regExp[lib.lang].bonusVillage) ) {
							if ( this.allReports[this.x].name.match(new RegExp(lib.game_data.player.name.replace(/\*/g,""))) && !this.allReports[this.x].name.match(regExp[lib.lang].conquers) ) {
								this.setCheck(this.allReports[this.x].id); 
							} else this.removeCheck(this.allReports[this.x].id);
						} else this.removeCheck(this.allReports[this.x].id);
					} else this.removeCheck(this.allReports[this.x].id);
					for( this.f=0 ; this.f<this.moveBBIDs.length ; this.f++ ) {
						if( this.moveBBIDs[this.f].match(this.allReports[this.x].id) ) this.setCheck(this.allReports[this.x].id);}
					for( this.f=0 ; this.f<this.moveAttsIDs.length ; this.f++ ) {
						if( this.moveAttsIDs[this.f].match(this.allReports[this.x].id) ) this.removeCheck(this.allReports[this.x].id);}
					for( this.f=0 ; this.f<this.moveSpyIDs.length ; this.f++ ) {
						if( this.moveSpyIDs[this.f].match(this.allReports[this.x].id) ) this.removeCheck(this.allReports[this.x].id);}
				} this.errorHandling(this.groupName);
			} else if( objId == "moveForwarded" ) {
				this.groupName = checkboxes.reportGroups[checkboxes.selectedGroups[1]];		
				for(this.x = 0; this.x < this.allReports.length; this.x++) {
					if(this.allReports[this.x].forwarded) { this.setCheck(this.allReports[this.x].id);} 
					else this.removeCheck(this.allReports[this.x].id);
				} this.errorHandling(this.groupName);
			} else if( objId == "moveAtts" ) {
				this.groupName = checkboxes.reportGroups[checkboxes.selectedGroups[3]];
				for(this.x = 0; this.x < this.allReports.length; this.x++) {
					if(this.allReports[this.x].green || this.allReports[this.x].yellow || this.allReports[this.x].red || this.allReports[this.x].redYellow || this.allReports[this.x].redBlue ) {
						if ( this.allReports[this.x].name.match(regExp[lib.lang].attacks) && this.allReports[this.x].name.match(new RegExp(lib.game_data.player.name.replace(/\*/g,""))) ) {
							if ( this.allReports[this.x].red || this.allReports[this.x].blue || this.allReports[this.x].redYellow || this.allReports[this.x].redBlue ) {
								this.setCheck(this.allReports[this.x].id);
							} else if ( this.allReports[this.x].name.match(regExp[lib.lang].barbarianVillage) || this.allReports[this.x].name.match(regExp[lib.lang].bonusVillage) ) {
								this.removeCheck(this.allReports[this.x].id);
							} else this.setCheck(this.allReports[this.x].id);
						} else this.removeCheck(this.allReports[this.x].id);
					} else this.removeCheck(this.allReports[this.x].id);
					for( this.f=0 ; this.f<this.moveBBIDs.length ; this.f++ ) {
						if( this.moveBBIDs[this.f].match(this.allReports[this.x].id) ) this.removeCheck(this.allReports[this.x].id);}
					for( this.f=0 ; this.f<this.moveAttsIDs.length ; this.f++ ) {
						if( this.moveAttsIDs[this.f].match(this.allReports[this.x].id) ) this.setCheck(this.allReports[this.x].id);}
					for( this.f=0 ; this.f<this.moveSpyIDs.length ; this.f++ ) {
						if( this.moveSpyIDs[this.f].match(this.allReports[this.x].id) ) this.removeCheck(this.allReports[this.x].id);}
				} this.errorHandling(this.groupName);
			} else if( objId == "moveSpys" ) {
				this.groupName = checkboxes.reportGroups[checkboxes.selectedGroups[2]];
				for(this.x = 0; this.x < this.allReports.length; this.x++) {
					if( this.allReports[this.x].blue && this.allReports[this.x].name.match(new RegExp(lib.game_data.player.name.replace(/\*/g,""))) ) this.setCheck(this.allReports[this.x].id);
					else this.removeCheck(this.allReports[this.x].id);
					for( this.f=0 ; this.f<this.moveBBIDs.length ; this.f++ ) {
						if( this.moveBBIDs[this.f].match(this.allReports[this.x].id) ) this.removeCheck(this.allReports[this.x].id);}
					for( this.f=0 ; this.f<this.moveAttsIDs.length ; this.f++ ) {
						if( this.moveAttsIDs[this.f].match(this.allReports[this.x].id) ) this.removeCheck(this.allReports[this.x].id);}
					for( this.f=0 ; this.f<this.moveSpyIDs.length ; this.f++ ) {
						if( this.moveSpyIDs[this.f].match(this.allReports[this.x].id) ) this.setCheck(this.allReports[this.x].id);}
				} this.errorHandling(this.groupName);
			} else if( objId == "moveIncs" ) {
				this.groupName = checkboxes.reportGroups[checkboxes.selectedGroups[4]];
				for(this.x = 0; this.x < this.allReports.length; this.x++) {
					if(this.allReports[this.x].green || this.allReports[this.x].yellow || this.allReports[this.x].red || this.allReports[this.x].blue) {
						if ( this.allReports[this.x].name.match(regExp[lib.lang].attacks) || this.allReports[this.x].name.match(regExp[lib.lang].conquers) ) {
							if ( this.allReports[this.x].name.match(new RegExp(lib.game_data.player.name.replace(/\*/g,""))) ) this.removeCheck(this.allReports[this.x].id);
							else this.setCheck(this.allReports[this.x].id);
						} else this.removeCheck(this.allReports[this.x].id); 
					} else this.removeCheck(this.allReports[this.x].id);
				} this.errorHandling(this.groupName);
			} else if( objId == "moveConquest" ) {
				this.groupName = checkboxes.reportGroups[checkboxes.selectedGroups[5]];
				for(this.x = 0; this.x < this.allReports.length; this.x++) {
					if(this.allReports[this.x].green || this.allReports[this.x].yellow) {
						if ( this.allReports[this.x].name.match(regExp[lib.lang].conquers) && this.allReports[this.x].name.match(new RegExp(lib.game_data.player.name.replace(/\*/g,""))) )
							this.setCheck(this.allReports[this.x].id);
						else this.removeCheck(this.allReports[this.x].id);
					} else this.removeCheck(this.allReports[this.x].id);
				} this.errorHandling(this.groupName);
			} else if( objId == "moveAttsOnSupport" ) {
				this.groupName = checkboxes.reportGroups[checkboxes.selectedGroups[6]];
				for(this.x = 0; this.x<this.allReports.length; this.x++) {
					if(this.allReports[this.x].green || this.allReports[this.x].yellow || this.allReports[this.x].red || this.allReports[this.x].blue) {
						if ( this.allReports[this.x].name.match(regExp[lib.lang].supportIsAttacked[0]) && this.allReports[this.x].name.match(regExp[lib.lang].supportIsAttacked[1]) 
							&& this.allReports[this.x].name.match(regExp[lib.lang].supportIsAttacked[2]) ) {
							this.setCheck(this.allReports[this.x].id);
						} else this.removeCheck(this.allReports[this.x].id); 
					} else this.removeCheck(this.allReports[this.x].id);
				} this.errorHandling(this.groupName);
			} else if( objId == "moveRest" ) {
				this.groupName = checkboxes.reportGroups[checkboxes.selectedGroups[7]];
				for(this.x = 0; this.x<this.allReports.length; this.x++) {
					if(this.allReports[this.x].text) this.setCheck(this.allReports[this.x].id);
					else this.removeCheck(this.allReports[this.x].id);
				} this.errorHandling(this.groupName);
			} else if( objId == "deleteAll" ) {			
				for(var x = 0; x < this.allReports.length; x++) this.setCheck(this.allReports[x].id);
				lib.xPath('//input[@value="'+regExp[lib.lang].deleteAll+'"]')[0].click();
			} else if( objId == "moveKeyWord" ) {
				this.groupName = checkboxes.reportGroups[document.getElementById("DSMoveReports_groupSelect").selectedIndex];
				this.regExpr = new Array();
										
				if( checkboxes.keywordInput[1].match(/ AND /) ) {
					this.keys = checkboxes.keywordInput[1].split(" AND ");
					for( this.f = 0 ; this.f < this.keys.length ; this.f++ ) {
						this.regExpr.push( new RegExp(this.keys[this.f], "i") );
					}
				} else this.regExpr.push( new RegExp(checkboxes.keywordInput[1], "i") );
				
				for(this.x = 0; this.x < this.allReports.length; this.x++) {
					this.boolean = true;
					for( this.f = 0; this.f < this.regExpr.length ; this.f++ ) {	
						if( !this.allReports[this.x].name.match(this.regExpr[this.f]) ) {
							this.boolean = false;
							break;
						}
					}
					if( this.boolean ) this.setCheck(this.allReports[this.x].id);
					else this.removeCheck(this.allReports[this.x].id);
				}				
				if( this.check <= 0 && this.allReports.length > 0 ) alert( gui[lib.lang].dsMoveReports.noFilteredReport );
				this.errorHandling(this.groupName);
			}
		};
								
		var tr, td, a, i=0;
		for( var report in gui[lib.lang].dsMoveReports.reportButtons ) {	
			if( !checkboxes.disableReportButtons[i] ) {	
				tr = document.getElementsByClassName("vis modemenu")[0].appendChild( document.createElement("tr") );
				td = tr.appendChild( document.createElement("td") );
				a = td.appendChild( document.createElement("a") );
				a.href = "javascript:;";
				a.id = "DSMoveReports_"+report;
				a.innerHTML = gui[lib.lang].dsMoveReports.reportButtons[report]+lib.showHotkey( hotkeys.keys.keysDsMoveReports[report] );
				a.style.whiteSpace = "nowrap";
				a.addEventListener("click",function() {
					this.functions = new DSMoveReportsFunctions(this.id.split("_")[1]);
				}, false);
				lib.hotkeys.keys.push( { key: hotkeys.keys.keysDsMoveReports[report], event: { id: "DSMoveReports_"+report, event: "click" } } );
			}
			i++;
		}	
		tr = document.getElementsByClassName("vis modemenu")[0].appendChild( document.createElement("tr") );
		tr.style.textAlign = "right";
		tr.style.whiteSpace = "nowrap";
		td = tr.appendChild( document.createElement("td") );
		td.appendChild( lib.createTextNode( gui[lib.lang].dsMoveReports.gui.groupInput ) );
		var groupSelect = td.appendChild( document.createElement("select") );
		groupSelect.style.width = "125px";
		groupSelect.id = "DSMoveReports_groupSelect";
		for( this.option=0 ; this.option < checkboxes.reportGroups.length ; this.option++ ) {
			groupSelect.options.add( new Option(checkboxes.reportGroups[this.option],this.option,(this.option==checkboxes.keywordInput[0]?true:false) ) );}
		groupSelect.addEventListener("change",function() {
			checkboxes.keywordInput[0] = this.selectedIndex;
			lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
		}, false);
		td.appendChild( document.createElement("br") );
		td.appendChild( lib.createTextNode(gui[lib.lang].dsMoveReports.gui.keyWordInput) );
		var keyInput = td.appendChild( document.createElement("input") );
		keyInput.addEventListener("focus",function() {this.value="";}, false);
		keyInput.addEventListener("blur",function() {
			checkboxes.keywordInput[1] = this.value;
			lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
		}, false);
		keyInput.id = "DSMoveReports_keyWordInput";
		keyInput.style.border = 0;
		groupSelect.style.border = 0;
		keyInput.style.width = groupSelect.style.width;
		keyInput.value = checkboxes.keywordInput[1];			
	}

	if( location.href.match(/view=/) ) {
		/* dsLoyalty */
		if( !checkboxes.disableDSLoyalty ) {
			if( document.getElementsByClassName("vis")[3].textContent.match(regExp[lib.lang].attackerWon) ) {
				if( document.getElementById("attack_info_def").getElementsByTagName("a").length > 1) {
					if( document.getElementById("attack_info_def").getElementsByTagName("a")[0].textContent == lib.game_data.player.name ) {
						if( document.getElementById("attack_results").textContent.match(regExp[lib.lang].loyalty) ) {
							var a = document.getElementById("attack_info_def").getElementsByTagName("a");
							var villageId = a[a.length-1].href.split("id=")[1].replace(/[^0-9]/g,"");
							var b = document.getElementById("attack_results").getElementsByTagName("b");
							var loyalty = b[b.length-1].textContent;
							var time = document.getElementsByClassName("vis")[3].getElementsByTagName("td")[1].textContent.split(" ");
							var date = new Date("20"+time[0].split(".")[2],parseInt(time[0].split(".")[1]-1),time[0].split(".")[0],time[1].split(":")[0],time[1].split(":")[1],time[1].split(":")[2]);
							time = date.getTime()/1000;		
							var arr = lib.storage.getValue("groupsAndLoyaltyData_"+villageId, ",,").split(",");
							if( parseInt(loyalty,10) < 0 ) {
								if( arr[1] <= time || arr[1] == "" ) lib.storage.deleteValue("groupsAndLoyaltyData_"+villageId);
							} else {
								if( arr[1] == "" || arr[1] <= time ) {
									if( arr[2] > loyalty ) {
										arr[1] = time; arr[2] = loyalty;
										lib.storage.setValue("groupsAndLoyaltyData_"+villageId, arr.join(",") );
									}
								}
							}
						}
					}
				}
				if( document.getElementById("attack_info_att").getElementsByTagName("a").length > 1) {
					if( document.getElementById("attack_info_att").getElementsByTagName("a")[0].textContent == lib.game_data.player.name ) {
						if( document.getElementById("attack_results").textContent.match(regExp[lib.lang].loyalty) ) {
							var b = document.getElementById("attack_results").getElementsByTagName("b");
							if( parseInt( b[b.length-1].textContent,10) < 0 ) {
								var a = document.getElementById("attack_info_def").getElementsByTagName("a");
								var villageId = a[a.length-1].href.split("id=")[1].replace(/[^0-9]/g,"");
								var time = document.getElementsByClassName("vis")[3].getElementsByTagName("td")[1].textContent.split(" ");
								var date = new Date("20"+time[0].split(".")[2],parseInt(time[0].split(".")[1]-1),time[0].split(".")[0],time[1].split(":")[0],time[1].split(":")[1],time[1].split(":")[2]);
								time = date.getTime()/1000;
								var arr = lib.storage.getValue("groupsAndLoyaltyData_"+villageId, ",,").split(",");
								if( arr[1] == "" || arr[1] <= time ) {
									arr[1] = time; arr[2] = 25;
									lib.storage.setValue("groupsAndLoyaltyData_"+villageId, arr.join(",") );
								}
								if( lib.storage.getValue("otherLoyaltyData_"+villageId, "") != "" ) {
									lib.storage.deleteValue("otherLoyaltyData_"+villageId);
								}
							} else {
								var a = document.getElementById("attack_info_def").getElementsByTagName("a");
								var villageId = a[a.length-1].href.split("id=")[1].replace(/[^0-9]/g,"");
								var time = document.getElementsByClassName("vis")[3].getElementsByTagName("td")[1].textContent.split(" ");
								
								var date = new Date("20"+time[0].split(".")[2],parseInt(time[0].split(".")[1]-1),time[0].split(".")[0],time[1].split(":")[0],time[1].split(":")[1],time[1].split(":")[2]);
								time = date.getTime()/1000;
								var arr = lib.storage.getValue("otherLoyaltyData_"+villageId, ",100").split(",");
								if( arr[0] == "" || arr[0] <= time ) {
									if( parseInt( b[b.length-1].textContent ) < arr[1] ) {
										arr[0] = time; arr[1] = b[b.length-1].textContent;
										lib.storage.setValue("otherLoyaltyData_"+villageId, arr.join(",") );
									}
								}
							}
						}
					}
				}
			}
		}
			
		/* dsAGCounter */
		if( !checkboxes.disableAGCounter  ) {
			var vis = document.getElementsByClassName("vis")[3].textContent;
			if( vis.match(regExp[lib.lang].attackerLost) || vis.match(regExp[lib.lang].attackerWon) ) {
				if( document.getElementById("attack_info_def").getElementsByTagName("a").length > 1) {
					if( document.getElementById("attack_info_def").getElementsByTagName("a")[0].textContent == lib.game_data.player.name ) {
						if( document.getElementById("attack_info_att").getElementsByTagName("a")[0].textContent != lib.game_data.player.name ) {							
							var id = location.href.split("view=")[1].split("&")[0].replace(/[^0-9]/);	
							var attack = document.getElementById("attack_info_att_units").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].getElementsByTagName("td");
							var kills = 0, atts=0; 
							if( attack[attack.length-1].textContent != 0 ) {
								atts=parseInt( attack[attack.length-1].textContent,10 );
								attack = document.getElementById("attack_info_att_units").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[2].getElementsByTagName("td");
								kills=parseInt( attack[attack.length-1].textContent,10 );
								var savedIDs = lib.storage.getValue("savedIDs_"+lib.game_data.player.id,"").split(";"); var match = false;
								for( var i=0 ; i<savedIDs.length ; i++) {if( savedIDs[i] == id) match=true;}
								if( !match ) {
									savedIDs[savedIDs.length] = id;
									if( savedIDs.length > 500 ) savedIDs.shift(); var value="";
									for( var i=0; i<savedIDs.length-1 ; i++ ) {
										value += savedIDs[i]+";";
									} value += savedIDs[savedIDs.length-1];
									lib.storage.setValue("savedIDs_"+lib.game_data.player.id,value);
									var nobleMenKills = lib.storage.getValue("killsNoblemen_"+lib.game_data.player.id,[0,0]);
									nobleMenKills[0] += kills;
									nobleMenKills[1] += atts;
									lib.storage.setValue("killsNoblemen_"+lib.game_data.player.id,nobleMenKills);
									var cell = document.getElementById("dssb_dsAGCounterValues");
									cell.innerHTML = "<span style=\"padding-right: 5px;\"></span>"+gui[lib.lang].dsAGCounter.nobleMen+": <b>"+nobleMenKills[0]+"/"+nobleMenKills[1]+"</b>";
									cell.title = gui[lib.lang].dsAGCounter.kills[0]+" "+nobleMenKills[0]+"/"+nobleMenKills[1]+" "+gui[lib.lang].dsAGCounter.kills[1];
									var span = cell.appendChild( document.createElement("span") ); span.style.paddingRight = "5px";
								}
							}
						}
					}
				}
			}
		}
					
		/* Bashpoints And AddStandingUnits in Reports */
		if( (!checkboxes.disableBashpoints || !checkboxes.disableAddStandingUnits) && document.getElementById("attack_info_att") ) {
			var bashpoints = {
				att: {
					new: {spear:4, sword:5, axe:1, archer:5, spy:1, light:5, marcher:6, heavy:23, ram:4, catapult:12, knight:40, snob:200, militia:4,},
					old: {spear:1, sword:1, axe:1, archer:1, spy:2, light:4, marcher:5, heavy:6, ram:5, catapult:8, knight:10, snob:100,},
				},
				def: {
					new: {spear:1, sword:2, axe:4, archer:2, spy:2, light:13, marcher:12, heavy:15, ram:8, catapult:10, knight:20, snob:200, militia:0,},	
					old: {spear:1, sword:1, axe:1, archer:1, spy:2, light:4, marcher:5, heavy:6, ram:5, catapult:8, knight:10, snob:100,},
				}
			};
			var config = lib.storage.getValue("killRanking",2);
			if( config > 0 ) {
				if( config > 1 ) config="new";
				else config="old";
			} var table = [document.getElementById("attack_info_att"),document.getElementById("attack_info_def")];
			var text = [[gui[lib.lang].bashpointsAtt,"bashpoints_att"],[gui[lib.lang].bashpointsDef,"bashpoints_def"]];
			var bash = []; var te = ["def","att"];
			for( var i=0 ; i<table.length ; i++ ) {
				if( !checkboxes.disableAddStandingUnits ) {
					if( table[i].getElementsByTagName("p").length > 0 ) continue;
					var tr = table[i].getElementsByTagName("table")[0].appendChild( document.createElement("tr") );
					var td = tr.appendChild( document.createElement("td") );
					td.innerHTML = gui[lib.lang].survivor;					
					var surTr = table[i].getElementsByTagName("table")[0].getElementsByTagName("tr"),surTd="", sur=0;
					for( var j=1 ; j<surTr[0].getElementsByTagName("td").length ; j++ ) {
						sur=parseInt(surTr[1].getElementsByTagName("td")[j].textContent,10)-parseInt(surTr[2].getElementsByTagName("td")[j].textContent,10);
						surTd = tr.appendChild( document.createElement("td") );
						surTd.style.textAlign="center";
						if( sur > 0 ) surTd.className = "unit-item";
						else surTd.className = "unit-item hidden";
						surTd.innerHTML = sur;
					}
				}
		
				if( !checkboxes.disableBashpoints ) {
					var bashTr = table[i].getElementsByTagName("table")[0].getElementsByTagName("tr"), unit="", bashies=0;
					for( var j=1 ; j<bashTr[2].getElementsByTagName("td").length ; j++ ) {
						unit = bashTr[0].getElementsByTagName("td")[j].getElementsByTagName("img")[0].src.split("unit_")[1].split(".")[0];
						bashies+=parseInt(bashTr[2].getElementsByTagName("td")[j].textContent,10)*parseInt(bashpoints[te[i]][config][unit],10);
					} bash.push( bashies );
					
					tr = table[i].appendChild( document.createElement("tr") );
					td = tr.appendChild( document.createElement("td") );
					td.colSpan = "2";
					td.id = "dssb_"+text[i][1];
				}
			}
			if( !checkboxes.disableBashpoints ) {
				if( document.getElementById("dssb_bashpoints_def") )
					document.getElementById("dssb_bashpoints_def").innerHTML += "<i>"+text[1][0]+" "+bash[0]+"</i>";
				if( document.getElementById("dssb_bashpoints_def") )
					document.getElementById("dssb_bashpoints_att").innerHTML += "<i>"+text[0][0]+" "+bash[1]+"</i>";
			}
		}
	
		/* hotkeys in reports */
		if( !hotkeys.disableAll.keysReports ) {
			var reportA = new Array();
			reportA.push( document.getElementsByClassName("vis")[1].getElementsByTagName("a") );
			reportA.push( document.getElementsByClassName("vis")[document.getElementsByClassName("vis").length-1].getElementsByTagName("a") );
			var id;

			for( var i = 0; i < Math.max( reportA[0].length,reportA[1].length ); i++ ) {
				for( var j=0 ; j<reportA.length-1 ; j++ ) {
					if( typeof(reportA[j][i]) == "undefined" ) continue;
					id=null; 
					if( reportA[j][i].href.indexOf("#")>-1 && !reportA[j][i].className.match(/farm_icon/) ) {
						if(reportA[j][i].getAttribute("onclick").indexOf("move") > -1 ) {
							reportA[j][i].id = "dssb_moveReports";
							lib.hotkeys.keys.push( { key: hotkeys.keys.keysReports.move, event: { id: "dssb_moveReports", event: "click" } } );
							reportA[j][i].textContent += lib.showHotkey( hotkeys.keys.keysReports.move );
							reportA[j][i].style.whiteSpace="nowrap";
						} else {
							reportA[j][i].id = "dssb_exportReports";
							lib.hotkeys.keys.push( { key: hotkeys.keys.keysReports.expor, event: { id: "dssb_exportReports", event: "click" } } );
							reportA[j][i].textContent += lib.showHotkey( hotkeys.keys.keysReports.expor );
							reportA[j][i].style.whiteSpace="nowrap";
						}
					} else if( reportA[j][i].href.indexOf("mode=forward")>-1 ) id="forward";
					else if( reportA[j][i].href.indexOf("action=del_one")>-1 ) id="del";
					else if( reportA[j][i].innerHTML.indexOf("&lt;&lt;")>-1 ) id="next";
					else if( reportA[j][i].innerHTML.indexOf("&gt;&gt;")>-1 ) id="prev";
			
					if( id && id != null ) {
						lib.hotkeys.keys.push( { key: hotkeys.keys.keysReports[id], href: reportA[j][i].href } );   
						reportA[j][i].textContent += lib.showHotkey( hotkeys.keys.keysReports[id] );
						reportA[j][i].style.whiteSpace="nowrap";
					}
				}
			}
		}

		if( !checkboxes.disableDsMoveReports ) {
			var labelText = document.getElementById("labelText").textContent;
			var graphic = document.getElementById("label").parentNode.getElementsByTagName("img")[0].src;
			if( labelText.match(regExp[lib.lang].conquers) || labelText.match(regExp[lib.lang].supportIsAttacked[0]) || !labelText.match(new RegExp(lib.game_data.player.name.replace(/\*/g,""))) 
				|| graphic.match(/forwarded.png/) || graphic.match(/rename/) || graphic.match(/red/) ) return;
			else {
				var img = document.getElementById("attack_info_att_units").getElementsByClassName("center")[0].getElementsByTagName("img");
				var spyindex = 0;
				for( var i=0 ; i< img.length ; i++) {if( img[i].src.match("unit_spy") ) {spyindex = i; break;}}
				if( document.getElementById("attack_info_def").getElementsByTagName("th")[1].textContent == "---" ) {
					var attack = document.getElementById("attack_info_att_units").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].getElementsByTagName("td");
					if( attack[attack.length-1].textContent != 0 ) {lib.saveReportIDs("moveAttsIDs"); return;}
					var troops = document.getElementById("attack_info_def_units").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].getElementsByTagName("td");
					var matchTroops = false;
					for( var i=1 ; i<troops.length ; i++ ) { if( troops[i].textContent != 0 ) matchTroops = true; }
					if( matchTroops ) {
						troops = document.getElementById("attack_info_att_units").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].getElementsByTagName("td");
						var max = 0, spy = parseInt(troops[spyindex+1].textContent,10);
						for( var i=1 ; i<troops.length ; i++ ) {
							if( parseInt(troops[i].textContent,10) > max ) max=parseInt(troops[i].textContent,10);} 
						if( spy >= max && max != 0 ) {lib.saveReportIDs("moveSpyIDs"); return; }
						else {lib.saveReportIDs("moveAttsIDs"); return;}
					}
					if( graphic.match(/blue.png/) ) lib.saveReportIDs("moveBBIDs");	
				} else if( graphic.match(/blue.png/) ) {
					var troops = document.getElementById("attack_info_att_units").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].getElementsByTagName("td");
					var max = 0, spy = parseInt(troops[spyindex+1].textContent,10);
					for( var i=1 ; i<troops.length ; i++ ) {
						if( parseInt(troops[i].textContent,10) > max ) max=parseInt(troops[i].textContent,10);}		
					if( max < spy && troops[troops.length-1].textContent > 0 ) {lib.saveReportIDs("moveAttsIDs"); return;}
				} else {
					var troops = document.getElementById("attack_info_att_units").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].getElementsByTagName("td");
					var max = 0, spy = parseInt(troops[spyindex+1].textContent,10);
					for( var i=1 ; i<troops.length ; i++ ) {
						if( parseInt(troops[i].textContent,10) > max ) max=parseInt(troops[i].textContent,10);} 		
					if( spy >= max && max != 0 ) {lib.saveReportIDs("moveSpyIDs"); return;}	
				} 
			}
		}
	}
}

if( !checkboxes.disableDsRealCharts && (lib.lang == "de" || lib.lang == "ch") ) {

	/* player charts and links */
	if( location.href.match(/screen=info_player/) ) {
		var playerId = location.href.match(/id=(\d+)\&screen=info_player[&=A-Za-z0-9]*/)[1]; 
		var tab = document.evaluate('//table[@class="main"]/tbody/tr/td/table/tbody/tr/td/table[@class="vis"]/tbody', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; 
		var els = false;
		if( tab == undefined ) {  
			var link = document.links; els = true;
			for( var i=0 ; i<document.links.length ; i++ ) {
				if (link[i].href.search(/village=[0-9]+&mode=new[&=A-Za-z0-9]*&player=([0-9]+)&screen=mail/) > -1) {
				    tab = link[i].parentNode.parentNode; 
					break;
				}
			}
			if( tab == undefined ) tab = document.getElementById("content_value"); 
		}   
	
		for (var i=0 ; i<document.links.length ; i++) {
			var link=document.links[i];
			console.log(link.href);
			if (link.href.search(/village=[0-9]+&mode=new&player=([0-9]+)[&=A-Za-z0-9]*&screen=mail/) > -1) {  
				var tr = new Array(6);
				for( var i=0 ; i<tr.length ; i++ ) tr[i] = document.createElement("tr");
				var td = new Array(4);
				for( var i=0 ; i<td.length ; i++ ) td[i] = document.createElement("td"); 
				var th = new Array(2); 
				for( var i=0 ; i<th.length ; i++ ) th[i] = document.createElement("th"); 
				var obj=link.parentNode.parentNode; 
 
				/* chart from player */
				if( !checkboxes.settingsDsRealCharts[0] ) {			 
					tr[0].style.textAlign="center";
					tr[0].appendChild(td[0] );
					td[0].colSpan=2;
					td[1].colSpan = 4;
					var a=td[1].appendChild( document.createElement('a') );
					a.target='dsreal';
					a.href='http://www.dsreal.de/index.php?world='+lib.game_data.world+'&screen=file&mode=player&id='+playerId;
					var img=a.appendChild( document.createElement('img') );   
					img.id = "dsRealChartPlayer";				
					img.src= "http://www.dsreal.de/charts/"+checkboxes.chartSettings[0]+".php?id=" + playerId + "&world=" + lib.game_data.world;
					tr[1] = td[0].appendChild( document.createElement("tr") );
					tr[1].appendChild(td[1]);
					td[0].appendChild(tr[2]);
					tr[2].appendChild(th[0]);
					th[0].innerHTML = "<u>"+gui[lib.lang].general+"</u>";
					th[0].noWrap = "true";

					var span = th[0].appendChild( document.createElement("span") );
					span.setAttribute("style", "margin-left:2em;");
					span.style.paddingRight = "20px";
					a = span.appendChild( document.createElement("a") );
					a.href = "javascript:;";
					a.id = "playerPoints";
					a.innerHTML = gui[lib.lang].points;
					a.addEventListener("click",function() {
						this.span = this.parentNode.parentNode.getElementsByTagName("span");
						for( this.i=0 ; this.i<this.span.length ; this.i++ ) this.span[this.i].className = "";
						this.parentNode.className = "selected";
						document.getElementById("dsRealChartPlayer").src = "http://www.dsreal.de/charts/"+this.id+".php?id=" + playerId + "&world=" + lib.game_data.world;
						checkboxes.chartSettings[0] = this.id; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
					},false);

					span = th[0].appendChild( document.createElement("span") );
					span.setAttribute("style", "margin-left:2em;");
					span.style.paddingRight = "20px";
					a = span.appendChild( document.createElement("a") );
					a.href = "javascript:;";
					a.id = "playerVillages";
					a.innerHTML = gui[lib.lang].villages2;
					a.addEventListener("click",function() {
						this.span = this.parentNode.parentNode.getElementsByTagName("span");
						for( this.i=0 ; this.i<this.span.length ; this.i++ ) this.span[this.i].className = "";
						this.parentNode.className = "selected";
						document.getElementById("dsRealChartPlayer").src = "http://www.dsreal.de/charts/"+this.id+".php?id=" + playerId + "&world=" + lib.game_data.world;
						checkboxes.chartSettings[0] = this.id; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
					},false);

					span = th[0].appendChild( document.createElement("span") );
					span.setAttribute("style", "margin-left:2em;");
					span.style.paddingRight = "20px";
					a = span.appendChild( document.createElement("a") );
					a.href = "javascript:;";
					a.id = "playerRank";
					a.innerHTML = gui[lib.lang].position;
					a.addEventListener("click",function() {
						this.span = this.parentNode.parentNode.getElementsByTagName("span");
						for( this.i=0 ; this.i<this.span.length ; this.i++ ) this.span[this.i].className = "";
						this.parentNode.className = "selected";
						document.getElementById("dsRealChartPlayer").src = "http://www.dsreal.de/charts/"+this.id+".php?id=" + playerId + "&world=" + lib.game_data.world;
						checkboxes.chartSettings[0] = this.id; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
					},false);
   		
					obj.parentNode.appendChild(tr[0]);  
					document.getElementById(checkboxes.chartSettings[0]).parentNode.className = "selected";					
				} 
			
				/* bash chart from player */
				if( !checkboxes.settingsDsRealCharts[1] ) {			 
					tr[3].style.textAlign="center";
					tr[3].appendChild(td[2] );
					td[2].colSpan=2;
					td[3].colSpan = 4;
					var a=td[3].appendChild( document.createElement('a') );
					a.target='dsreal';				
					a.href='http://www.dsreal.de/index.php?world='+lib.game_data.world+'&screen=conquer&id='+playerId;
					var img=a.appendChild( document.createElement('img') );   
					img.id = "dsRealBashPlayer";
					img.src= "http://www.dsreal.de/charts/"+checkboxes.chartSettings[1]+".php?id=" + playerId + "&world=" + lib.game_data.world;
					tr[4] = td[2].appendChild( document.createElement("tr") );
					tr[4].appendChild(td[3]);
					td[2].appendChild(tr[5]);
					tr[5].appendChild(th[1]);
					th[1].innerHTML = "<u>"+gui[lib.lang].beatenEnemies+"</u>";
					th[1].noWrap = "true";
				
					var span = th[1].appendChild( document.createElement("span") );
					span.style.paddingRight = "15px";
				
					span = th[1].appendChild( document.createElement("span") );
					span.setAttribute("style", "margin-left:0.5em;");
					span.style.paddingRight = "15px";
					a = span.appendChild( document.createElement("a") );
					a.href = "javascript:;";
					a.id = "playerBashall";
					a.innerHTML = gui[lib.lang].total;
					a.addEventListener("click",function() {
						this.span = this.parentNode.parentNode.getElementsByTagName("span");
						for( this.i=0 ; this.i<this.span.length ; this.i++ ) this.span[this.i].className = "";
						this.parentNode.className = "selected";
						document.getElementById("dsRealBashPlayer").src = "http://www.dsreal.de/charts/"+this.id+".php?id=" + playerId + "&world=" + lib.game_data.world;
						checkboxes.chartSettings[1] = this.id; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
					},false);

					span = th[1].appendChild( document.createElement("span") );
					span.setAttribute("style", "margin-left:0.5em;");
					span.style.paddingRight = "15px";
					a = span.appendChild( document.createElement("a") );
					a.href = "javascript:;";
					a.id = "playerBashoff";
					a.innerHTML = gui[lib.lang].offBashs;
					a.addEventListener("click",function() {
						this.span = this.parentNode.parentNode.getElementsByTagName("span");
						for( this.i=0 ; this.i<this.span.length ; this.i++ ) this.span[this.i].className = "";
						this.parentNode.className = "selected";
						document.getElementById("dsRealBashPlayer").src = "http://www.dsreal.de/charts/"+this.id+".php?id=" + playerId + "&world=" + lib.game_data.world;
						checkboxes.chartSettings[1] = this.id; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
					},false);

					span = th[1].appendChild( document.createElement("span") );
					span.setAttribute("style", "margin-left:0.5em;");
					span.style.paddingRight = "15px";
					a = span.appendChild( document.createElement("a") );
					a.href = "javascript:;";
					a.id = "playerBashdef";
					a.innerHTML = gui[lib.lang].deffBashs;
					a.addEventListener("click",function() {
						this.span = this.parentNode.parentNode.getElementsByTagName("span");
						for( this.i=0 ; this.i<this.span.length ; this.i++ ) this.span[this.i].className = "";
						this.parentNode.className = "selected";
						document.getElementById("dsRealBashPlayer").src = "http://www.dsreal.de/charts/"+this.id+".php?id=" + playerId + "&world=" + lib.game_data.world;
						checkboxes.chartSettings[1] = this.id; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
					},false);
   		
					obj.parentNode.appendChild(tr[3]);  
					document.getElementById(checkboxes.chartSettings[1]).parentNode.className = "selected";
				} 
				break;
			}     
		}
		
		/* dsreal Link to player chart */
		if( !checkboxes.settingsDsRealCharts[4] ) { 
			var row = document.createElement("tr"); 
			els ? tab.parentNode.appendChild(row) : tab.appendChild( row );
			var cell = row.appendChild( document.createElement("td") );
			cell.colSpan = "2";
			cell.id = "dsrealLink";

			var link = cell.appendChild( document.createElement("a") );
			link.href = "http://www.dsreal.de/index.php?screen=file&mode=player&id=" + playerId + "&world=" + lib.game_data.world;
			link.target = "_blank";
			link.innerHTML = gui[lib.lang].linkToDsreal;
			cell.appendChild( lib.createTextNode( gui[lib.lang].extern ) );	
		}

		/* Integrate map */
		if( !checkboxes.settingsDsRealCharts[5] ) {
			if( document.getElementById("dsrealLink") != null ) {
				cell = document.getElementById("dsrealLink");
				cell.noWrap = "true";
				var span = cell.appendChild( document.createElement("span") );
				cell = span;
				cell.setAttribute("style", "margin-left:3em;");
			} else {
				var row = document.createElement("tr"); 
				els ? tab.parentNode.appendChild(row) : tab.appendChild( row );
				var cell = row.appendChild( document.createElement("td") );
				cell.colSpan = "2";
				cell.noWrap = "true";
			}				
			var a = cell.appendChild( document.createElement("a") );
			a.href = "http://www.dsreal.de/index.php?screen=map&pid="+playerId+"&world="+lib.game_data.world;
			a.target = "_blank";
			a.innerHTML = gui[lib.lang].toMap;		
		}
	}
	
	/* ally charts */
	if (document.location.href.match(/screen=info_ally/) || document.location.href.match(/screen=ally&mode=profile/) ) {
		for (var i=0 ; i<document.links.length ; i++) {
			var link=document.links[i];
			if (link.href.search(/village=[0-9]+&screen=info_member[&=A-Za-z0-9]*&id=([0-9]+)/) > -1) {
				var allyId = link.href.match(/village=[0-9]+&screen=info_member[&=A-Za-z0-9]*&id=([0-9]+)/)[1];
				var tr = new Array(6);
				for( var i=0 ; i<tr.length ; i++ ) tr[i] = document.createElement("tr");
				var td = new Array(4);
				for( var i=0 ; i<td.length ; i++ ) td[i] = document.createElement("td"); 
				var th = new Array(2); 
				for( var i=0 ; i<th.length ; i++ ) th[i] = document.createElement("th"); 
				var obj=link.parentNode.parentNode; 
 
				/* chart from Ally */
				if( !checkboxes.settingsDsRealCharts[2] ) {			 
					tr[0].style.textAlign="center";
					tr[0].appendChild(td[0] );
					td[0].colSpan=2;
					td[1].colSpan = 4;
					var a=td[1].appendChild( document.createElement('a') );
					a.target='dsreal';					
					a.href='http://www.dsreal.de/index.php?screen=file&mode=ally&id='+allyId+'&world='+lib.game_data.world;
					var img=a.appendChild( document.createElement('img') );   
					img.id = "dsRealChartAlly";
					img.src= "http://www.dsreal.de/charts/"+checkboxes.chartSettings[2]+".php?id="+allyId+"&world="+lib.game_data.world;
					tr[1] = td[0].appendChild( document.createElement("tr") );
					tr[1].appendChild(td[1]);
					td[0].appendChild(tr[2]);
					tr[2].appendChild(th[0]);
					th[0].innerHTML = "<u>"+gui[lib.lang].general+"</u>";
					th[0].noWrap = "true";

					var span = th[0].appendChild( document.createElement("span") );
					span.setAttribute("style", "margin-left:2em;");
					span.style.paddingRight = "20px";
					a = span.appendChild( document.createElement("a") );
					a.href = "javascript:;";
					a.id = "allyPoints";
					a.innerHTML = gui[lib.lang].points;
					a.addEventListener("click",function() {
						this.span = this.parentNode.parentNode.getElementsByTagName("span");
						for( this.i=0 ; this.i<this.span.length ; this.i++ ) this.span[this.i].className = "";
						this.parentNode.className = "selected";
						document.getElementById("dsRealChartAlly").src = "http://www.dsreal.de/charts/"+this.id+".php?id="+allyId+"&world="+lib.game_data.world;
						checkboxes.chartSettings[2] = this.id; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
					},false);

					span = th[0].appendChild( document.createElement("span") );
					span.setAttribute("style", "margin-left:2em;");
					span.style.paddingRight = "20px";
					a = span.appendChild( document.createElement("a") );
					a.href = "javascript:;";
					a.id = "allyVillages";
					a.innerHTML = gui[lib.lang].villages;
					a.addEventListener("click",function() {
						this.span = this.parentNode.parentNode.getElementsByTagName("span");
						for( this.i=0 ; this.i<this.span.length ; this.i++ ) this.span[this.i].className = "";
						this.parentNode.className = "selected";
						document.getElementById("dsRealChartAlly").src = "http://www.dsreal.de/charts/"+this.id+".php?id="+allyId+"&world="+lib.game_data.world;
						checkboxes.chartSettings[2] = this.id; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
					},false);

					span = th[0].appendChild( document.createElement("span") );
					span.setAttribute("style", "margin-left:2em;");
					span.style.paddingRight = "20px";
					a = span.appendChild( document.createElement("a") );
					a.href = "javascript:;";
					a.id = "allyRank";
					a.innerHTML = gui[lib.lang].position;
					a.addEventListener("click",function() {
						this.span = this.parentNode.parentNode.getElementsByTagName("span");
						for( this.i=0 ; this.i<this.span.length ; this.i++ ) this.span[this.i].className = "";
						this.parentNode.className = "selected";
						document.getElementById("dsRealChartAlly").src = "http://www.dsreal.de/charts/"+this.id+".php?id="+allyId+"&world="+lib.game_data.world;
						checkboxes.chartSettings[2] = this.id; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
					},false);
   		
					obj.parentNode.appendChild(tr[0]);  
					document.getElementById(checkboxes.chartSettings[2]).parentNode.className = "selected";
				} 
			
				/* bash chart from Ally */
				if( !checkboxes.settingsDsRealCharts[3] ) {			 
					tr[3].style.textAlign="center";
					tr[3].appendChild(td[2] );
					td[2].colSpan=2;
					td[3].colSpan = 4;
					var a=td[3].appendChild( document.createElement('a') );
					a.target='dsreal';				
					a.href= 'http://www.dsreal.de/index.php?world='+lib.game_data.world+'&screen=conquer&mode=ally&id='+allyId;
					var img=a.appendChild( document.createElement('img') );   
					img.id = "dsRealBashAlly";
					img.src= "http://www.dsreal.de/charts/"+checkboxes.chartSettings[3]+".php?id=" + allyId + "&world=" + lib.game_data.world;
					tr[4] = td[2].appendChild( document.createElement("tr") );
					tr[4].appendChild(td[3]);
					td[2].appendChild(tr[5]);
					tr[5].appendChild(th[1]);
					th[1].innerHTML = "<u>"+gui[lib.lang].beatenEnemies+"</u>";
					th[1].noWrap = "true";
				
					var span = th[1].appendChild( document.createElement("span") );
					span.style.paddingRight = "15px";
				
					span = th[1].appendChild( document.createElement("span") );
					span.setAttribute("style", "margin-left:0.5em;");
					span.style.paddingRight = "15px";
					a = span.appendChild( document.createElement("a") );
					a.href = "javascript:;";
					a.id = "allyBashall";
					a.innerHTML = gui[lib.lang].total;
					a.addEventListener("click",function() {
						this.span = this.parentNode.parentNode.getElementsByTagName("span");
						for( this.i=0 ; this.i<this.span.length ; this.i++ ) this.span[this.i].className = "";
						this.parentNode.className = "selected";
						document.getElementById("dsRealBashAlly").src = "http://www.dsreal.de/charts/"+this.id+".php?id=" + allyId + "&world=" + lib.game_data.world;
						checkboxes.chartSettings[3] = this.id; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
					},false);

					span = th[1].appendChild( document.createElement("span") );
					span.setAttribute("style", "margin-left:0.5em;");
					span.style.paddingRight = "15px";
					a = span.appendChild( document.createElement("a") );
					a.href = "javascript:;";
					a.id = "allyBashoff";
					a.innerHTML = gui[lib.lang].offBashs;
					a.addEventListener("click",function() {
						this.span = this.parentNode.parentNode.getElementsByTagName("span");
						for( this.i=0 ; this.i<this.span.length ; this.i++ ) this.span[this.i].className = "";
						this.parentNode.className = "selected";
						document.getElementById("dsRealBashAlly").src = "http://www.dsreal.de/charts/"+this.id+".php?id=" + allyId + "&world=" + lib.game_data.world;
						checkboxes.chartSettings[3] = this.id; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
					},false);

					span = th[1].appendChild( document.createElement("span") );
					span.setAttribute("style", "margin-left:0.5em;");
					span.style.paddingRight = "15px";
					a = span.appendChild( document.createElement("a") );
					a.href = "javascript:;";
					a.id = "allyBashdef";
					a.innerHTML = gui[lib.lang].deffBashs;
					a.addEventListener("click",function() {
						this.span = this.parentNode.parentNode.getElementsByTagName("span");
						for( this.i=0 ; this.i<this.span.length ; this.i++ ) this.span[this.i].className = "";
						this.parentNode.className = "selected";
						document.getElementById("dsRealBashAlly").src = "http://www.dsreal.de/charts/"+this.id+".php?id=" + allyId + "&world=" + lib.game_data.world;
						checkboxes.chartSettings[3] = this.id; lib.storage.setValue("Checkboxes_player.id"+lib.game_data.player.id,checkboxes);
					},false);
   		
					obj.parentNode.appendChild(tr[3]);  
					document.getElementById(checkboxes.chartSettings[3]).parentNode.className = "selected";
				}
				break;
			}
		}	
	}
}

/* Gruppen auslesen in der Gruppenuebersicht */
if( document.getElementById("group_assign_table") ) {
	var tr = document.getElementById("group_assign_table").getElementsByTagName("tr");
	var villageCell=0, groupCell=4;
	
	var getCells = function() {
		var cellNames = document.getElementById("group_assign_table").getElementsByTagName("tr")[0].getElementsByTagName("th");
		for(var e=0 ; e<cellNames.length ; e++) {
			if( cellNames[e].textContent.match(regExp[lib.lang].village) ) villageCell=e;
			if( cellNames[e].textContent.match(regExp[lib.lang].groups) ) groupCell=e;				
		}
	} 
	new getCells();
	
	for( var i=1 ; i<tr.length ; i++ ) {
		if( !tr[i].className.match(/row_/) ) continue;
		var td = tr[i].getElementsByTagName("td");
		var villageId = td[villageCell].getElementsByTagName("a")[0].href.match(/village=(\d+)+\&/)[1];
		var arr = lib.storage.getValue("groupsAndLoyaltyData_"+villageId, ",,").split(",");
		arr[0]=td[groupCell].textContent;
		lib.storage.setValue("groupsAndLoyaltyData_"+villageId, arr.join(",") );
		if( tr[i].getElementsByTagName("th").length > 0 ) break;
	}
}

if( location.href.match(/screen=train/) && location.href.match(/mode=mass/) && !location.href.match(/mode=mass_decommission/) && lib.pa &&  !checkboxes.disableMassRecruit ) {
	/*	thanks to Poncho for his script "massrecruit"	*/
	
	var table = document.getElementById("mr_all_form").getElementsByTagName("table")[0];
	var tr = table.appendChild( document.createElement("tr") );
	var td = new Array( table.getElementsByTagName("tr")[0].getElementsByTagName("th").length );
	var dsMassBuild = lib.storage.getValue("DSMassRecruit_player.id"+lib.game_data.player.id,[]);
	for( var i=0 ; i<td.length ; i++ ) {
		var tabTd = tr.appendChild( document.createElement("td") );
		tabTd.setAttribute("align","center");
		tabTd.appendChild( lib.createTextNode("<small>"+gui[lib.lang].dsMassRecruit.continueBuilding+"</small>") );
		tabTd.appendChild( document.createElement("br") );
		var input = tabTd.appendChild( document.createElement("input") );
		input.type = "checkbox";
		for( this.f=0 ; this.f < dsMassBuild.length ; this.f++ ) {
			if( lib.game_data.village.group == dsMassBuild[this.f][0] )
				input.checked = dsMassBuild[this.f][1][i];
		}
	}
	var inputs = document.getElementById("mr_all_form").parentNode.getElementsByClassName("vis_item")[0].getElementsByTagName("input");
	inputs[inputs.length-1].addEventListener("click",function() {
		this.inputs = this.parentNode.parentNode.getElementsByTagName("table")[0].getElementsByTagName("tr")[2].getElementsByTagName("input");
		this.array = [];
		this.boolean = false;
		for( this.x=0 ; this.x<this.inputs.length ; this.x++ )
			this.array.push( this.inputs[this.x].checked );
		for( this.x=0 ; this.x<dsMassBuild.length ; this.x++ ) {
			if( lib.game_data.village.group == dsMassBuild[this.x][0] ) {
				this.boolean = true;
				dsMassBuild[this.x][1] = this.array;
				break;
			}
		}
		if( !this.boolean ) dsMassBuild.push( [lib.game_data.village.group, this.array] );
		lib.storage.setValue("DSMassRecruit_player.id"+lib.game_data.player.id,dsMassBuild);
	}, false);
	var inputButtons = document.getElementById("mr_all_form").parentNode.getElementsByClassName("vis_item")[1].getElementsByTagName("input");
	var inputButton = inputButtons[0].parentNode.appendChild( document.createElement("input") );
	inputButton.type = "button";
	inputButton.className = "dssb_ui_tooltip";
	inputButton.value = lib.createTextNode(gui[lib.lang].dsMassRecruit.massrecruitButton).textContent;
	inputButton.title = lib.createTextNode(gui[lib.lang].dsMassRecruit.massrecruitButtonTitle).textContent;
	inputButtons[inputButtons.length-1].addEventListener("click",function(evt) {
		evt.target.disabled = true;
		evt.target.value = lib.createTextNode( gui[lib.lang].dsMassRecruit.massrecruitIsRunning ).textContent;
		var THIS = this;
		this.tr = document.getElementById("mass_train_form").getElementsByTagName("tr");
		/* costs for unit: [wood, stone, iron, worker, time] */
		this.costs = {
			spear: [50, 30, 10, 1, 159],
			sword: [30, 30, 70, 1, 239],
			axe: [60, 30, 40, 1, 206],
			archer: [100, 30, 60, 1, 206],
			spy: [50, 50, 20, 2, 188],
			light: [125, 100, 250, 4, 375],
			marcher: [250, 100, 150, 5, 375],
			heavy: [200, 150, 600, 6, 749],
			ram: [300, 200, 200, 5, 1416],
			catapult: [320, 400, 100, 8, 2124],
			priest: [800, 500, 750, 100]
		};
		
		/* get available units */
		this.availableUnits = function() {
			this.units = [];
			this.img = document.getElementById("mr_all_form").getElementsByTagName("tr")[0].getElementsByTagName("img");
			for( this.x=0 ; this.x<this.img.length ; this.x++ ) {
				this.unitName = this.img[this.x].src.split("unit_")[1].split(".")[0];
				this.units.push( { unit: this.unitName, name: this.img[this.x].title } )
			}
			return this.units;
		};
		this.units = this.availableUnits();
		
		/* sum built */
		this.builtsum = [];
		for( this.x=0 ; this.x<this.units.length ; this.x++ ) this.builtsum.push( 0 );
		this.builtvilnum = 0;
		
		/* get current settings */
		this.getCurrentSettings = function() {
			this.currentsettings = {
				group: lib.game_data.village.group,
				units: [],
				openend: [],
				free: 0,
				res: [0, 0, 0],
			};
			this.inputs = document.getElementById("mass_train_form").parentNode.getElementsByClassName("res_buffer");
			for( this.x=0 ; this.x<this.inputs.length-1 ; this.x++ ) {
				if( parseInt(this.inputs[this.x].value,10) > 0 ) this.currentsettings.res[this.x] = parseInt(this.inputs[this.x].value,10);
			}
			if( parseInt( this.inputs[3].value,10 ) > 0 && this.inputs[3].value != "" ) this.currentsettings.free = parseInt(this.inputs[3].value,10);
			this.tableTd = document.getElementById("mr_all_form").getElementsByTagName("tr")[1].getElementsByTagName("td");
			this.openendTd = document.getElementById("mr_all_form").getElementsByTagName("tr")[2].getElementsByTagName("td");
			for( this.x=0 ; this.x<this.tableTd.length ; this.x++ ) {
				this.currentsettings.units.push( parseInt( this.tableTd[this.x].getElementsByTagName("input")[0].value,10 ) );
				this.currentsettings.openend.push( this.openendTd[this.x].getElementsByTagName("input")[0].checked );
			}				
			return this.currentsettings;
		};
		this.currentsettings = this.getCurrentSettings();
	
		/* add up all troup costs */
		this.sumCosts = function(unitcosts) {
			this.sumunitcosts = new Array(unitcosts[0].length);
			for(this.j = 0; this.j < this.sumunitcosts.length; this.j++) {
				this.sumunitcosts[this.j] = 0;
			}
			for(this.j = 0; this.j < unitcosts.length; this.j++) {
				for(this.k = 0; this.k < unitcosts[this.j].length; this.k++) {
					this.sumunitcosts[this.k] += unitcosts[this.j][this.k];}
			}
			return this.sumunitcosts;
		};
		
		/* calculate costs for x units */
		this.getCosts = function(unit, num) {
			return [
				num * THIS.costs[unit][0],
				num * THIS.costs[unit][1],
				num * THIS.costs[unit][2],
				num * THIS.costs[unit][3],
				num * THIS.costs[unit][4],
			];
		};
		
		/* calculate max available resources */
		this.getMaxCosts = function(unitcosts, resavail, workerfree, openend) {
			this.maxfactor = 0;
			this.idx = 0;
			this.factor = 0;
			for(this.j = 0; this.j < 4; this.j++) {
				if(this.j == 3) this.factor = unitcosts[this.j] / workerfree;
				else this.factor = unitcosts[this.j] / resavail[this.j];
				if((openend || (!openend && this.factor > 1)) && this.factor > this.maxfactor) {
					this.maxfactor = this.factor;
					this.idx = this.j;
				}
			}
			this.maxcosts = [];
			if(!openend && this.maxfactor < 1) {
				this.maxcosts = unitcosts;
			} else {
				for(this.j = 0; this.j < 4; this.j++) {
					if( this.maxfactor < 1 ) this.maxcosts[this.j] = 0;
					else this.maxcosts[this.j] = unitcosts[this.j] / this.maxfactor;
				}
			}
			return this.maxcosts;
		};
		
		/* calculate max units */
		this.getPossibleUnits = function(resavail, workeravail) {
			this.openendunits = [];
			this.numunits = 0;
			for(this.p = 0; this.p < THIS.currentsettings.units.length; this.p++) {
				if(THIS.currentsettings.openend[this.p]) {
					this.openendunits.push(THIS.getCosts(THIS.units[this.p].unit, THIS.currentsettings.units[this.p]));
					this.numunits += THIS.currentsettings.units[this.p];
				}
			}
			this.sum = THIS.sumCosts(this.openendunits);
			this.maxu = THIS.getMaxCosts(this.sum, resavail, workeravail, true);
			this.builder = new Array(THIS.currentsettings.units.length);
			for(this.p = 0; this.p < THIS.currentsettings.units.length; this.p++) {
				if(THIS.currentsettings.openend[this.p]) {
					this.builder[this.p] = (this.maxu[0] / this.sum[0]) * THIS.currentsettings.units[this.p];
				} else this.builder[this.p] = 0;
			}
			return this.builder;
		};
		
		/* calculate */
		for( this.x=1 ; this.x < this.tr.length ; this.x++ ) {
			this.cells = this.tr[this.x].getElementsByTagName("td");
			if( this.cells.length > 0 ) {
				/* get resources */
				this.spans = this.cells[1].getElementsByTagName("span");
				this.res = []; this.ai=0;
				for( this.i=0 ; this.i<this.spans.length ; this.i++ ) {
					if( this.spans[this.i].className == "grey" ) continue;
					else if( parseInt( this.spans[this.i].textContent.replace(/\./g,""), 10 )-this.currentsettings.res[this.ai] > 0 ) {
						this.res.push( parseInt( this.spans[this.i].textContent.replace(/\./g,""), 10 )-this.currentsettings.res[this.ai] );
						this.ai++;
					} else this.res.push( 0 );
				}
				
				/* get worker */
				this.worker = this.cells[2].textContent.split("/");
				this.worker[0] = parseInt(this.worker[0], 10);
				this.worker[1] = parseInt(this.worker[1], 10);
				if( this.worker[1] - (this.worker[0] + this.currentsettings.free) <= 0 ) continue;
				
				/* get units */
				this.vilunits = [];
				for(this.j = 3; this.j < this.cells.length; this.j++) {
					this.vilunits[this.j-3] = {ok: false, units: 0};
					this.indicator = lib.xPath('div/a/img[contains(@src,"/prod_")]', this.cells[this.j]);
					if(this.indicator.length == 0) continue;
					this.vilunits[this.j-3].ok = true;
					this.vilunits[this.j-3].units = parseInt(this.indicator[0].parentNode.parentNode.textContent, 10);
					if(this.indicator[0].title != '') this.vilunits[this.j-3].units += parseInt(this.indicator[0].title, 10);
				}
				
				/* get toBuild */
				this.tobuild = [];
				for( this.f=0 ; this.f<this.vilunits.length ; this.f++ ) {
					if( this.vilunits[this.f].ok ) {
						this.tobuild[this.f] = THIS.currentsettings.units[this.f] - this.vilunits[this.f].units;
						if( this.tobuild[this.f] < 0 ) this.tobuild[this.f] = 0;
					} else this.tobuild[this.f] = 0;
				}
				this.build = new Array(this.tobuild.length);
				this.scosts = [];
				for(this.f = 0; this.f < this.tobuild.length; this.f++) {
					this.scosts.push(this.getCosts(this.units[this.f].unit, this.tobuild[this.f]));
				}
				this.sum = this.sumCosts(this.scosts);
				this.maxi = this.getMaxCosts(this.sum, this.res, this.worker[1] - (this.worker[0] + this.currentsettings.free), false);
				this.factor = (this.worker[1] - (this.worker[0] + this.currentsettings.free)) > 0 ? (this.maxi[0] / this.sum[0]) : 0;
				for(this.f = 0; this.f < this.build.length; this.f++) {
					if(this.maxi[0] == 0) {
						this.build[this.f] = 0;
						continue;
					}
					this.build[this.f] = this.tobuild[this.f] * this.factor;
				}
				
				/* open end */
				if(Math.ceil(this.maxi[0]) < this.res[0] && Math.ceil(this.maxi[1]) < this.res[1] && Math.ceil(this.maxi[2]) < this.res[2] && ((this.worker[1] - Math.ceil(this.maxi[3])) - this.worker[0]) - this.currentsettings.free > 0) {
					for(this.f = 0; this.f < this.currentsettings.units.length; this.f++) {
						if(this.currentsettings.openend[this.f] && this.currentsettings.units[this.f] > 0) {
							this.possible = this.getPossibleUnits([this.res[0] - this.maxi[0], this.res[1] - this.maxi[1], this.res[2] - this.maxi[2]], ((this.worker[1] - this.worker[0]) - this.maxi[3]) - this.currentsettings.free);
							for(this.k = 0; this.k < this.build.length; this.k++) {
								this.build[this.k] += this.possible[this.k];
							}
							break;
						}
					}		
				}
			}
			
			this.vilcounted = false;
			for( this.j=3 ; this.j < this.cells.length ; this.j++ ) {
				this.field = lib.xPath('input[not(@disabled)]', this.cells[this.j]);
				if( this.field.length > 0 ) {
					this.field[0].value = Math.floor( this.build[this.j-3] );
					if( Math.floor( this.build[this.j-3] ) > 0 ) {
						this.builtsum[this.j-3] += Math.floor( this.build[this.j-3] );
						if( !this.vilcounted ) {
							this.vilcounted = true;
							this.builtvilnum++;
						}
					}
				}
			}
		}
		this.frag = gui[lib.lang].dsMassRecruit.massrecruitIsFilled;
		if( !document.getElementById("dssb_dsMassRecruit_filled") ) {
			this.parentNode.appendChild( document.createElement("br") );
			this.text = this.parentNode.appendChild( lib.createTextNode( this.frag[0]+this.builtsum+this.frag[1]+this.builtvilnum+this.frag[2] ) );
			this.text.id = "dssb_dsMassRecruit_filled";
		} else document.getElementById("dssb_dsMassRecruit_filled").innerHTML = this.frag[0]+this.builtsum+this.frag[1]+this.builtvilnum+this.frag[2];
		
		inputButtons[inputButtons.length-2].addEventListener("click",function() {
			if( !document.getElementById("dssb_dsMassRecruit_filled") ) return;
			this.parentNode.removeChild( this.parentNode.getElementsByTagName("br")[0] );
			this.parentNode.removeChild( document.getElementById("dssb_dsMassRecruit_filled") );
		}, false);
		
		inputButtons[inputButtons.length-3].addEventListener("click",function() {
			this.parentNode.removeChild( this.parentNode.getElementsByTagName("br")[0] );
			this.parentNode.removeChild( document.getElementById("dssb_dsMassRecruit_filled") );
		}, false);
		
		inputButtons[inputButtons.length-4].addEventListener("click",function() {
			this.parentNode.removeChild( this.parentNode.getElementsByTagName("br")[0] );
			this.parentNode.removeChild( document.getElementById("dssb_dsMassRecruit_filled") );
		}, false);
		
		evt.target.disabled = false;
		evt.target.value = lib.createTextNode(gui[lib.lang].dsMassRecruit.massrecruitButton).textContent;
	}, false);
	var script = document.body.appendChild( document.createElement("script") );
	script.innerHTML = "$(function(){UI.ToolTip($('.dssb_ui_tooltip'));});";
}

function Knish3rDSLib(prefix) {
    //Hypix's storage-class; thanks for providing!
    this.StorageHandler = function(prefix,forceGM){
        var gm = typeof(unsafeWindow) != "undefined" && navigator.userAgent.indexOf("Firefox")>-1;
        var win = gm ? unsafeWindow : window;
        var ls = false;
        var intGetValue;
        var intSetValue;
        var prefix = prefix;
        try {ls = typeof(win.localStorage) != "undefined";} catch(e) {}
        if( !ls && !gm )
            throw("Keine geeignete Speicherm&ouml;glichkeit gefunden");
            if( forceGM && gm || !ls) {
                if( gm ) {
                    prefix = prefix + "_" + document.location.host.split('.')[0];
                    intSetValue = function(key,value) {
                        GM_setValue(prefix+"_"+key,value);
                    };
                    intGetValue = function(key,defaultValue) {
                        return GM_getValue(prefix+"_" + key, defaultValue);
                    }     
                    this.deleteValue = function(key) {
                        GM_deleteValue(prefix+"_"+key);
                    }
                    this.listValues = function(re) {
                    var allkeys = GM_listValues();
                    var serverKeys = [];
                    var rePrefix = new RegExp("^"+prefix+"_(.*)$");
                    if( typeof(re) != "undefined" )
                    var reKey = new RegExp(re);
                    for( var i = 0; i < allkeys.length; i++ ) {
                        var res = allkeys[i].match(rePrefix);
                        if( res ) {
                            if( reKey ) {
                                res = res[1].match(reKey);
                                if( res ) serverKeys.push(res);
                            } else serverKeys.push(res[1]);
                        }
                    } return serverKeys;
                }
            }
        } else if( ls ) {
            intSetValue = function(key,value) {
                localStorage.setItem(prefix+"_"+key, value );};    
            intGetValue = function(key,defaultValue) {
                var value = localStorage.getItem(prefix+"_"+key);
                if( value ) return value;
                else return defaultValue;
            };
            this.deleteValue = function(key) {
                localStorage.removeItem(prefix+"_"+key);}
            this.listValues = function() {
                var keys = []; var key;
	        try{
         		 for(var i = 0 ; ; i++) {
           			 key = window.localStorage.key(i);
            			if(!key){ break; }
               			if( typeof(re) != "undefined") {
                    			var reKey = new RegExp(re);
					if( key.match(prefix) && key.match(reKey) )
            					keys.push(key);
				} else if( key.match(prefix) ) {
					key=key.replace(prefix+"_","");
            				keys.push(key);}}
        	} catch(e) {}
		return keys;
            }
        }
        this.clear = function(re) {
            var keys = this.listValues(re);
            for( var i = 0; i < keys.length; i++ )
                this.deleteValue(keys[i]);
        }
        this.setValue = function(key,value) {
            switch( typeof(value) ) {
                case "object":
                case "function": intSetValue(key,"j"+JSON.stringify(value)); break;
                case "number": intSetValue(key,"n"+value); break;
                case "boolean": intSetValue(key,"b" + (value ? 1 : 0)); break;
                case "string": intSetValue(key,"s" + value ); break;
                case "undefined": intSetValue(key,"u"); break;
            }
        }  
        this.getValue = function(key,defaultValue){
            var str = intGetValue(key);
            if( typeof(str) != "undefined" ) {
                switch( str[0] ) {
                    case "j": return JSON.parse(str.substring(1));
                    case "n": return parseFloat(str.substring(1));
                    case "b": return str[1] == "1";
                    case "s": return str.substring(1);
                    default: this.deleteValue(key);
                }
            } return defaultValue;
        }
        this.getString = function(key) {
            return intGetValue(key);}
        this.setString = function(key,value){
            intSetValue(key,value);}
    }
    var self = this;
    this.hotkeys = {
		keys: [],
		click: 0,
        doIt: function() {
            window.addEventListener("keyup", this.keyUpHandler, false );},
        keyUpHandler : function(e) {
            if( e.target.nodeName.toUpperCase() == "INPUT" && (e.target.value != "PASSWORD" || e.target.type == "text" ) )
                return;
            if( e.target.nodeName.toUpperCase() != "TEXTAREA" ) {
                for( var i = 0; i < self.hotkeys.keys.length; i++ ) {
                    if( self.hotkeys.keys[i].key[0] == e.keyCode && !self.hotkeys.keys[i].key[2] && !hotkeys.disableAll[self.hotkeys.keys[i].key[3]] && !hotkeys.disableAll.disableAll ) {
                        if( self.hotkeys.keys[i].href ) {
                            location.href = self.hotkeys.keys[i].href; 
						if( self.hotkeys.keys[i].href == "javascript:selectAllUnits(true)" && self.hotkeys.click%2 == 0 ) {
						    self.hotkeys.keys[i].href = "javascript:selectAllUnits(false)";
							self.hotkeys.click = 1;
						} else if( self.hotkeys.keys[i].href == "javascript:selectAllUnits(false)" && self.hotkeys.click%2 > 0 ) {
							self.hotkeys.keys[i].href = "javascript:selectAllUnits(true)";
							self.hotkeys.click = 0;
						} break;}
                        if( self.hotkeys.keys[i].event ) {
                            self.fireEvent( document.getElementById(self.hotkeys.keys[i].event.id), self.hotkeys.keys[i].event.event ); break;}
                    }
                }
            }
        },
    }
    this.createTextNode = function(key) {
       var textNode = document.createElement('span');
   		textNode.innerHTML = key;
    	return textNode;
    }
    this.addCommas = function(nStr) {
        this.x = nStr.toString().split('.');
        this.x1 = this.x[0];
        this.x2 = this.x.length > 1 ? '.' + this.x[1] : '';
        this.rgx = /(\d+)(\d{3})/;
        while (this.rgx.test(this.x1))
            this.x1 = this.x1.replace(this.rgx, '$1' + ',' + '$2');
        this.x = (this.x1+this.x2).replace(/,/g,'.');
        return this.x;
    }
    this.formatNumber = function(nStr) {
        nStr = nStr.toString();
        if( nStr.length<4 ) return nStr;
		this.number = nStr.split('.');
		if( this.number.length == 2 ) {
			this.last = Math.round(parseInt(this.number[1],10)/100);
			return this.number[0]+"."+this.last+"k";
		}
		else if( this.number.length >2 ) {
			this.last = Math.round(parseInt(this.number[this.number.length-2],10)/100);
			this.number.pop(); this.number.pop();
			this.output = (this.number.join(".")+"."+this.last+" Mio").toString();
			return this.output;
		}
		else return self.formatNumber(self.addCommas(nStr));
    }
    this.contains = function(cont,array) {
    	for(this.x = 0; this.x < array.length; this.x++) {
			if(array[this.x].split(":")[0] == cont)
				return "\"" + this.x + "\"";
		}
		return false;
    }
    this.xPath = function(path, context) {
        if(!context) var context = document;	
        var XPath = document.evaluate(path, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var nodes = [];
        for(var x = 0; x < XPath.snapshotLength; x++)
            nodes.push(XPath.snapshotItem(x));
        return nodes;
    }
    this.getGameData = function() {
        var game_data;
        if(typeof(unsafeWindow) != 'undefined' && navigator.userAgent.indexOf("Firefox")>-1)
            game_data = unsafeWindow.game_data;
        if(!game_data) {
            var script = document.createElement("script");
            script.type = "application/javascript";
            script.textContent = 	"var input=document.createElement('input');" +
                                    "input.type='hidden';" +
                                    "input.value=JSON.stringify(game_data);"  +
                                    "input.id='game_data';" +
                                    "document.body.appendChild(input);";
            document.body.appendChild(script);
            var input = document.getElementById("game_data");
            if( input ) eval("game_data=" + input.value + ";");
            document.body.removeChild(script);
        }
        if( game_data ) game_data.link_base_pure = game_data.link_base_pure.replace(/&amp;/g,"&");
        return game_data;
    }
	this.unique = function(array) {
    	var o = {};
    	var tmp = [];
    	for(var i = 0 ; i < array.length; i++) o[array[i]] = true;
    	for(var i in o) tmp[tmp.length] = i;
    	return tmp;
	}
	this.concat = function(a,b) {
		this.array = new Array(parseInt(a.length,10)+parseInt(b.length,10));
		for( this.i=0 ; this.i<a.length ; this.i++ ) {
			this.array[this.i] = a[this.i];
		}
		for( this.i=0 ; this.i<b.length ; this.i++ ) {
			this.array[parseInt(this.i,10)+parseInt(a.length,10)] = b[this.i];
		}
		return this.array;
	}
    this.grayscale = function(image) {
		if( image.width == 0 || image.height == 0 ) return "";
		this.canvas = document.createElement("canvas");
		this.canvasContext = this.canvas.getContext("2d");
		this.canvas.width = image.width;
		this.canvas.height = image.height;
		this.canvasContext.drawImage(image,0,0);
		this.imageData = this.canvasContext.getImageData(0,0, image.width, image.height);

		for( this.j=0 ; this.j<this.imageData.height ; this.j++ ) {
			for( this.i=0 ; this.i<this.imageData.width ; this.i++ ) {
				this.index=(this.i*4)*this.imageData.width+(this.j*4);
				this.red=this.imageData.data[this.index];
				this.green=this.imageData.data[this.index+1];
				this.blue=this.imageData.data[this.index+2];
				this.alpha=this.imageData.data[this.index+3];
				this.average=(this.red+this.green+this.blue)/3;
				this.imageData.data[this.index]=this.average;
				this.imageData.data[this.index+1]=this.average;
				this.imageData.data[this.index+2]=this.average;
				this.imageData.data[this.index+3]=this.alpha;
			}
		}	
		this.canvasContext.putImageData(this.imageData,0,0,0,0,this.imageData.width,this.imageData.height);
		return this.canvas.toDataURL();
    };
	this.findPos = function(obj) {
		this.curleft = this.curtop = 0;
		if (obj.offsetParent) {
			this.curleft = obj.offsetLeft;
			this.curtop = obj.offsetTop;
			while (obj = obj.offsetParent) {
				this.curleft += obj.offsetLeft;
				this.curtop += obj.offsetTop
			}
		}
		return [this.curleft,this.curtop];
	};
	this.popup = function(id, x, y, html, draggable, width, height) {	
		if( document.getElementById( id ) ) {
			this.content = document.getElementById( id );
			this.content.innerHTML = "";
			this.content.appendChild( html );
		} else {
			this.table = document.body.appendChild( document.createElement("div") );
			this.table.style.position = "absolute";
			this.table.zIndex = 1000;	
			this.table.className = "ui-draggable";
			this.table.id = "dssb_inline_popup";
			this.table.style.borderTop = "2px solid #804000"; this.table.style.borderLeft = "2px solid #804000"; this.table.style.borderRight = "2px solid #603000"; this.table.style.borderBottom = "2px solid #402000";
			this.table.style.backgroundImage = "url(http://cdn2.tribalwars.net/graphic/index/main_bg.jpg)"; this.table.style.position = "absolute"; this.table.style.zIndex = 99999;
			this.table.style.left = x+"px";
			this.table.style.top = y+"px";	
			this.table.style.width = width+"px";
			this.table.style.height = height+"px";
			
			this.div = this.table.appendChild( document.createElement("div") );
			this.div.id = "inline_popup_menu";
			if( !draggable ) this.div.style.cursor = "default";
			this.a = this.div.appendChild( document.createElement("a") );
			this.a.innerHTML = "schließen";
			this.a.style.cursor = "pointer";
			this.a.addEventListener("click",function() { this.parentNode.parentNode.style.display = "none"; }, false);		
			this.div = this.table.appendChild( document.createElement("div") );
			this.div.id = "inline_popup_main";
			this.div.style.width = width-10+"px";
			this.div.style.height = height-30+"px";
			this.content = this.div.appendChild( document.createElement("div") );
			this.content.noWrap = "true";
			this.content.id = id;
			this.content.appendChild( html );
			if( draggable ) {
				this.script = document.body.appendChild(document.createElement("script") );
				this.script.type = "text/javascript";
				this.script.innerHTML = "$(document).ready(function(){ UI.Draggable($('#dssb_inline_popup')); });"
			}
		}
		this.content.parentNode.parentNode.style.display="block";		
	};
    this.fireEvent = function(node,evt) {
        if( node.nodeName.toUpperCase() == "INPUT" && node.type.toUpperCase() == "CHECKBOX" )
            node.checked = !node.checked;
        if( node.nodeName.toUpperCase() == "INPUT" && node.type.toUpperCase() == "SUBMIT" ) {
            node.focus(); node.click();}
        else{ var evObj = document.createEvent('HTMLEvents');
        evObj.initEvent( evt, true, true );
        node.dispatchEvent(evObj);}
    }
    this.getServerTime = function() {
    	this.now = new Date();
		this.serverDate = document.getElementById("serverDate").innerHTML.split("/");
		this.serverTime = document.getElementById("serverTime").innerHTML.split(":");
		this.now.setFullYear( this.serverDate[2] ); 
		this.now.setMonth( this.serverDate[1]-1 );
		this.now.setDate( this.serverDate[0] ); 
		this.now.setHours( this.serverTime[0] );
		this.now.setMinutes( this.serverTime[1] ); 
		this.now.setSeconds( this.serverTime[2] );
		return this.now;
    };
	this.hotkeyInput = function(elem,id,section,text,trTab) {
		elem.id = section+"_"+id;
		elem.type = "text";
		elem.size = "9";
		elem.value = "[ "+hotkeys.keys[section][id][1]+" ]";
		elem.maxLength=1;
		elem.style.textAlign = "center";
		elem.addEventListener("focus",function() {this.value="";}, false);
		elem.addEventListener("keydown",function(e) {if( e.keyCode == "13" || e.keyCode == "9" ) e.preventDefault();}, false);
		elem.addEventListener("keyup",function(e) {
			var keyCode = e.keyCode;
			if( this.value.toUpperCase() == "" || this.value.toUpperCase() == " " ) {
				for( var i in hotkeys.extraKeys.allKeys ) {
					if( hotkeys.extraKeys.allKeys[i][0] == keyCode ) {
						hotkeys.keys[this.id.split("_")[0]][this.id.split("_")[1]] = [keyCode,hotkeys.extraKeys[hotkeys.extraKeys.allKeys[i][1]],hotkeys.keys[this.id.split("_")[0]][this.id.split("_")[1]][2],this.id.split("_")[0]];
						this.value = "[ "+hotkeys.extraKeys[hotkeys.extraKeys.allKeys[i][1]]+" ]";}
				} if( this.value == "" ) {
					hotkeys.keys[this.id.split("_")[0]][this.id.split("_")[1]] = [keyCode,String.fromCharCode(e.charCode),hotkeys.keys[this.id.split("_")[0]][this.id.split("_")[1]][2],this.id.split("_")[0]];
					this.value = "[ "+String.fromCharCode(e.charCode)+" ]";}
			} else {
				hotkeys.keys[this.id.split("_")[0]][this.id.split("_")[1]] = [keyCode,this.value.toUpperCase(),hotkeys.keys[this.id.split("_")[0]][this.id.split("_")[1]][2],this.id.split("_")[0]];
				this.value = "[ "+this.value.toUpperCase()+" ]";			
			} e.preventDefault();
			this.blur();
		},false);
		elem.addEventListener("blur",function() {
			if( this.value == "" ) this.value = "[ "+hotkeys.keys[section][id][1]+" ]";
		}, false);
		
		this.span = elem.parentNode.appendChild( document.createElement("span") );
		this.span.style.paddingRight = "30px";
		this.disable = elem.parentNode.appendChild( document.createElement("input") );
		this.disable.type = "checkbox";
		this.disable.id = section+"_"+id+"_checkbox";
		this.disable.checked = hotkeys.keys[section][id][2];
		elem.parentNode.appendChild(lib.createTextNode( text ) );
		if( this.disable.checked ) trTab.style.color = "#A9A9A9";
		this.disable.addEventListener( "click", function(){
			if( this.checked ) {
				this.parentNode.parentNode.style.color = "#A9A9A9"; 
				hotkeys.keys[this.id.split("_")[0]][this.id.split("_")[1]][2] = true;
			} else {
				this.parentNode.parentNode.style.color = "#000000";
				hotkeys.keys[this.id.split("_")[0]][this.id.split("_")[1]][2] = false;
			}
		}, false);
	};
	this.saveReportIDs = function(char) {
		var id = location.href.split("view=")[1].split("&")[0].replace(/[^0-9]/);
		var savedIDs = self.storage.getValue(char+":"+self.game_data.player.id,"");
		if( savedIDs.length == 0 ) {
			savedIDs = new Array(1);
			savedIDs[0] = id;}
		else {
			savedIDs = savedIDs.split(";");
			var match = false;
			for( var i=0 ; i<savedIDs.length ; i++) {if( savedIDs[i] == id) match=true;}
			if( !match ) savedIDs[savedIDs.length] = id;
			if( savedIDs.length > 500 ) savedIDs.shift();
		} var value = savedIDs.join(";");
		self.storage.setValue(char+":"+self.game_data.player.id,value);
    };
	this.showHotkey = function(show) {
		if( !show[2] && !hotkeys.disableAll[show[3]] && !hotkeys.disableAll.disableAll ) return " ["+show[1]+"]";
		else return "";
	};
	this.alert = function(message,fadeOutTime,boole) {
		this.script = document.body.appendChild(document.createElement("script") );
		this.script.type = "text/javascript";
		if( arguments.length < 2 )
			this.script.innerHTML = "$(document).ready(function(){ UI.InfoMessage('"+message+"'); });";
		else if( arguments.length > 2 )
			this.script.innerHTML = "$(document).ready(function(){ UI.InfoMessage('"+message+"',"+fadeOutTime+","+boole+"); });";		
    }
    this.firefox = typeof(unsafeWindow) != "undefined" && navigator.userAgent.indexOf("Firefox")>-1;
    this.chrome = typeof(unsafeWindow) != "undefined" && navigator.userAgent.indexOf("Chrome")>-1;
	this.opera = navigator.userAgent.indexOf("Opera")>-1;
    this.game_data = this.getGameData();
    this.storage = new this.StorageHandler(prefix,true);
    this.hotkeys.doIt(); 
    this.win = this.firefox || this.chrome ? unsafeWindow : window;
    if( !this.game_data ) return;  
	this.pa = this.game_data.player.premium;   
    this.lang = this.game_data.world.replace(/[0-9]/g,"");
    if( this.lang == "des" || this.lang == "dec" || (this.lang == "ch" && this.game_data.world.replace(/[^0-9]/) < 4) || this.lang == "chs" )
	this.lang = "de"; 
}
})();
