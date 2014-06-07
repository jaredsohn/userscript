// ==UserScript==
// @name         DS-Farmassistent
// @namespace    FileFace
// @description  Assistiert unter anderem beim Farmen
// @version      5.55
// @author       Zorbing
// @copyright    (C) 2013 Zorbing
// @license      CC BY-NC-ND 3.0 http://creativecommons.org/licenses/by-nc-nd/3.0/
// @include      http://de*.die-staemme.de/game.php?*
// @include      http://des*.ds.ignames.net/game.php?*
// @include      http://ch*.staemme.ch/game.php?*
// @include      http://en*.tribalwars.net/game.php?*
// @include      http://uk*.tribalwars.co.uk/game.php?*
// @include      http://ae*.tribalwars.ae/game.php?*
// @updateURL    https://userscripts.org/scripts/source/134048.meta.js
// ==/UserScript==
var version = "8.10-3.8-5.55",
win = unsafeWindow || window,
$ = jQuery = win.jQuery,
URLBase = 'http://www.fileface.de/gm/data/',
updateURL = 'http://userscripts.org/scripts/show/134048';

try {
(function() {
var image_base = win.image_base,
texts = {
	unitImgPath: image_base +"unit/unit_$.png",
	buildingImgPath: image_base +"buildings/$.png",
	
	lang: 'de_DE',
	unit: {
		spear: "Speerträger",
		sword: "Schwertkämpfer",
		axe: "Axtkämpfer",
		archer: "Bogenschütze",
		spy: "Späher",
		light: "Leichte Kavallerie",
		marcher: "Berittener Bogenschütze",
		heavy: "Schwere Kavallerie",
		ram: "Rammbock",
		catapult: "Katapult",
		knight: "Paladin",
		snob: "Adelsgeschlecht",
		militia: "Miliz"
	},
	units: {
		spear: "Speerträger",
		sword: "Schwertkämpfer",
		axe: "Axtkämpfer",
		archer: "Bogenschützen",
		spy: "Späher",
		light: "Leichte Kavallerie",
		marcher: "Berittene Bogenschützen",
		heavy: "Schwere Kavallerie",
		ram: "Rammböcke",
		catapult: "Katapulte",
		knight: "Paladine",
		snob: "Adelsgeschlechter",
		militia: "Milizen"
	},
	buildings: {
		main: "Hauptgebäude",
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
		wood: "Holzfäller",
		stone: "Lehmgrube",
		iron: "Eisenmine",
		farm: "Bauernhof",
		storage: "Speicher",
		hide: "Versteck",
		wall: "Wall"
	},
	resources: {
		wood: "Holz",
		stone: "Lehm",
		iron: "Eisen",
		sum: "Gesamt"
	},
	reports: {
		subject: "Betreff",
		'delete': "Löschen",
		move: "Verschieben",
		order: {
			title: "Reihenfolge",
			save: "OK",
			luck: "Glück",
			moral: "Moral",
			attacker: "Angreifer-Truppen",
			defender: "Verteidiger-Truppen",
			spy: "Spionage",
			units_out: "Einheiten auswärts",
			units_way: "Einheiten unterwegs",
			result: "Ergebnisse",
		},
	},
	gui: {
		title: "DS-Farmassistent",
		dsVersion: "DS-Version",
		dataVersion: "Datenversion",
		update: "Update von Datenversion $1 auf $2 war erfolgreich!",
		readAttacksFail: "Es wurden einige Angriffe umbenannt, deshalb konnten nicht alle eingelesen werden!",
		FA: "FA",
		reportReadSuccess: "Der Bericht wurde erfolgreich eingelesen!",
		reportReadUpToDate: "Dieser Bericht ist aktuell!",
		reportReadOutOfDate: "Der Bericht ist veraltet!",
		farmlist: "Farmliste",
		noUnitsCol: "Keine Truppen in der Farm?",
		distance: "Entfernung",
		age: "Alter",
		noUnits: "Keine Truppen!",
		yesUnits: "Achtung: Truppen!",
		newReport: "Es gibt min. einen neuen Bericht!",
		noCoords: "Du musst die x und y Koordinaten des Ziels angeben.",
		noUnitsSelected: "Keine Einheiten ausgewählt",
		
		readReports: "Berichte einlesen",
		delOldReports: "Veraltete Berichte löschen",
		effectiveStorage: "offener Speicher (farmbare Größe)",
		buildUps2: "Mögliche Ausbauten errechnen",
		buildUps2Warning: "ACHTUNG!\nDieser Vorgang kann den Browser für einige Minuten vollständig auslasten!\n\nSollen trotzdem bis zu 10000 Ausbaumöglichkeiten errechnet werden?\nDie Ergebnisse sind in der Konsole des Browser einzusehen.",
		lockFarm: "Farm sperren",
		contingentRes: "Jetzt möglich",
		mood: "Zustimmung",
		buildings: "Gebäude",
		units: "Truppen",
		todayBooty: "Heute erfarmte Rohstoffe",
		yesterdayBooty: "Gestern erfarmte Rohstoffe",
		booty: "Beute",
		confirmDeleteReport: "Soll der Bericht wirklich gelöscht werden?",
		spyReport: "Spähbericht",
		markOldReports: "Veraltete Berichte markieren",
		delData: "Daten löschen",
		delConfirm: "Sollen wirklich alle Daten dieses Dorfes gelöscht werden?",
		resetEQ: "Erfolgsquotienten zurücksetzen",
		population: "BH-Plätze",
		name: "Name",
		
		buildVariantHeader: "Gebäudevarianten",
		addBuildVariant: "Gebäudevariante hinzufügen",
		buildReady: "Gebäude vollständig ausgebaut",
		buildOver: "Gebäude zu weit ausgebaut!",
		tearDownLevel: "Abriss um eine Stufe",
		tearDown: "Abriss:",
		points: "Punkte",
		
		unitVariantHeader: "Einheitenvarianten",
		addUnitVariant: "Einheitenvariante hinzufügen",
		units_title: "Einheiten",
		freePopuplation: "Frei",
		unitsTitle: "da/Aktuell/Gesamt",
		fillIn: "Ausfüllen",
		troopsNumReached: "Truppenanzahl erreicht",
		farmToLow: "Zu wenig Bauernhöfe um zusätzliche Soldaten zu versorgen.",
		farmReached: "Der Bauernhof kann keine weiteren Einheiten versorgen.",
		unitNotReseached: "Einheit noch nicht erforscht",
		'delete': "Löschen",
		resources: "Rohstoffe",
		
		village_overview: "Übersichten",
		
		loadingInfos: "Lade Informationen ...",
		loadServerCfg: "Serverkonfiguration wird ermittelt...",
		serverCfgKnown: "Serverkonfiguration wurde ermittelt",
		loadUnitInfo: "Einheiten werden ermittelt...",
		unitInfoKnown: "Einheiten wurden ermittelt",
		loadBuildingInfo: "Gebäude werden ermittelt...",
		buildingInfoKnown: "Gebäude wurden ermittelt",
		error: "Fehler",
		ok: "Ok",
		close: "Schließen",
		valueError: "Fehlerhafter Wert, verwendete Default-Einstellungen",
		outdatedScript: "Der DS-Farmassistent $1 ist überholt!<br>Das Skript wird nicht mehr ausgeführt.",
		optionDisabled: "Diese Option ist zur Zeit leider noch nicht verfügbar!",
		optionNotAvailable: "This option is not available on this server!",
		
		percentage: "Prozent",
		changeColor: "Farbe ändern",
		colorCode: "Farbcode",
		change: "Ändern",
		settings: {
			settings: "Einstellungen",
			titles: {
				general: "Allgemein",
				place: "Platz",
				map: "Karte",
				reports: "Berichte",
				autoFarm: "Autofarmen",
				paFeatures: "PA-Features",
				registerReport: '<span class="icon header new_report" title="Bericht eintragen" style="position: relative; top: -2px;"></span>',
				hotkeys: "Hotkeys",
				misc: "Sonstiges"
			},
			general: {
				considerEQ: ["Den Erfolgsquotienten berücksichtigen"],
				enableAtUV: ["Den Farmassistenten in UV-Accounts aktivieren"],
				dummy1: '<tr><th colspan="2"></th></tr>',
				enableStorageColorAt: ["Speicherstände farbig hinterlegen", {
					all: "Alle auswählen",
					infobar: "Infoleiste",
					production: "Produktionsübersicht",
					market: "Marktplatz",
					place: "Versammlungsplatz (Farmliste)",
					map: "Karte (Popup)",
					info_village: "Dorfinformationen",
					coin_mint: "Goldmünzen prägen"
				}],
				storageColorBar: ["", {}],
			},
			place: {
				farmlistOpt: ["Die Farmliste darstellen", ["gar nicht", "Popup", "integriert"]],
				minRes: ["min. Rohstoffe (<i><u>Filter</u></i>)", ""],
				maxDistance: ["maximale Entfernung (<i><u>Filter</u></i>)", " Felder"],
				maxAge: ["maximales Alter (<i><u>Filter</u></i>)", " Stunden"],
				attackedFarms: ["Farmen, die angegriffen werden", ["so lassen", "ausgrauen", "ausgrauen und an das Ende der Liste verschieben", "nicht mehr anzeigen"]],
				farmSpys: ["Späher pro Farmangriff mitschicken", " Späher"],
				spyOnlyWithUnits: ["Späher nur mit Einheiten zusammen schicken"],
				sendRams: ["Rammen mitschicken ab Walllevel", ""],
				checksActive: ["Einheitenauswahl im Versammlungsplatz"],
				unitPreferences: ["Prioritäten der Einheiten", {}],
				dummy1: '<tr><th colspan="2"></th></tr>',
				sendCatas: ["Katapulte mitschicken"],
				buildingPreferences: ["Katapultbeschussreihenfolge", {}]
			},
			map: {
				integrateInfos: ["Dorfinformationen in das Popup integrieren"],
				overlaysActive: ["Overlays aktivieren"]
			},
			reports: {
				showSearchInput: ["Ein Eingabefeld zum Suchen einfügen"],
				changeLinkStyle: ["Berichtelinks in der Berichteübersicht ändern"],
				newReport: ["Neuer Bericht", {}],
				readReport: ["Eingelesener Bericht", {}],
				spyReport: ["Eingelesener Spähbericht", {}],
				oldReport: ["Veralteter Bericht", {}],
				colors: {
					blue: "blau",
					green: "grün",
					yellow: "gelb",
					red: "rot",
					red_blue: "rot-blau",
					red_yellow: "rot-gelb"
				},
				dummy1: '<tr><th colspan="2"></th></tr>',
				reorder: ["Reihenfolge der Berichtelemente ändern"]
			},
			autoFarm: {
				active: ["Autofarmen aktivieren"],
				farmOver: ["Farmen über", ["die Karte", "den Versammlungsplatz", "den Farm-Assistent"]],
				farm_Assistent_click: ["Farm-Assistent klicken", ["A", "B", "C"]],
				minRes: ["min. Rohstoffe (<i><u>Filter</u></i>)", ""],
				maxDistance: ["Farmen im Umkreis von (<i><u>Filter</u></i>)", " Feldern"],
				farmSpys: ["Späher pro Farmangriff mitschicken", " Späher"],
				sendRams: ["Rammen mitschicken ab Walllevel", ""],
				farmWith: ["Farmen mit", ["genau den für die Rohstoffe benötigten Truppen", "fest eingestellten Truppen", "mindestens den eingestellten Truppen"]],
				units: ["Einheiten", {}],
			},
			paFeatures: {
				freePA: ["Free-PA aktivieren"],
				fileSite: ["Aktenlinks zu", ["twstats.com", "twplus.org", "dsreal.de"]],
				showStats: ["Statistiken anzeigen"],
				quickbar: ["Schnellleiste bearbeiten:", {}],
				dummy1: '<tr><th colspan="2"></th></tr>',
				dummy2: '<tr><td colspan="2"><b>Farm-Assistent:</b></td></tr>',
				farmAssistent: ["Zusätze aktivieren"],
				farmAssistent_minRes: ["min. Rohstoffe (<i><u>Filter</u></i>)", ""],
			},
			registerReport: {
				coords: ["&nbsp;", {
					x: "x:",
					y: "y:"
				}],
				villageName: ["Dorf-Name", {}],
				villageID: ["Dorf-ID", {}],
				ownerID: ["Besitzer-ID", {}],
				spyDate: ["Späh-Datum", { format: "am $day$.$month$.$year$<br>um $hour$:$minute$ Uhr" }],
				units: ["Einheiten", {}],
				res: ["Rohstoffe", {}],
				buildings: ["Gebäude", {}],
				mood: ["Zustimmung", {}],
				bonus: ["Bonus", {
					bonus: [
						'-',
						'100 % mehr Holzproduktion',
						'100 % mehr Lehmproduktion',
						'100 % mehr Eisenproduktion',
						'10 % mehr Bevölkerung',
						'33 % schnellere Produktion in der Kaserne',
						'33 % schnellere Produktion im Stall',
						'50 % schnellere Produktion in der Werkstatt',
						'30 % mehr Rohstoffproduktion aller Produktionsgebäude',
						'50 % mehr Speicherkapazität und Händler'
					]
				}],
				save: ["Eintragen", {}]
			},
			hotkeys: {
				active: ["Hotkeys aktivieren"],
				note: ["Visuell darstellen"],
				userKeys: ["Hotkeys bearbeiten", {
					all: {
						title: 'Allgemein',
						nextVillage: 'Nächstes Dorf',
						prevVillage: 'Vorheriges Dorf'
					},
					report: {
						title: 'Berichte',
						abort: 'Einlesen abbrechen',
						leftArrow: 'nächster Bericht',
						rightArrow: 'vorheriger Bericht',
						'delete': 'Bericht löschen',
						startReading: 'Einlesen starten',
						move: 'Bericht verschieben'
					},
					place: {
						title: 'Platz',
						'submit': 'Angriff bestätigen',
						farmList1:  'Farmliste Position 1',
						farmList2:  'Farmliste Position 2',
						farmList3:  'Farmliste Position 3',
						farmList4:  'Farmliste Position 4',
						farmList5:  'Farmliste Position 5',
						farmList6:  'Farmliste Position 6',
						farmList7:  'Farmliste Position 7',
						farmList8:  'Farmliste Position 8',
						farmList9:  'Farmliste Position 9',
						farmList10: 'Farmliste Position 10'
					},
					market: {
						title: 'Markt',
						'submit': 'Rohstoffe verschicken bestätigen'
					}
				}],
			},
			misc: {
				overview_showBooty: ["Die Beute in der Dorfübersicht anzeigen"],
				dummy1: '<tr><th colspan="2"></th></tr>',
				recruitVariantActive: ["Einheitenvarianten aktivieren"],
				buildVariantActive: ["Gebäudevarianten aktivieren"],
				queueOpt: ["Produktionsschleifen verkürzen", ["Gar nicht", "Leicht", "Stark"]],
				prodRecruit: ["Rekrutierung in der Produktionsübersicht kürzen"],
				cutProd: ["Spalten <i>Bauauftrag</i> und <i>Forschung</i> in der Produktionsübersicht entfernen"],
				dummy2: '<tr><th colspan="2"></th></tr>',
				prodFilterActive: ["Filter in der Produktionsansicht aktivieren"],
				dummy3: '<tr><th colspan="2"></th></tr>',
				fixQuickbar: ["Die Schnellleiste fixieren"],
				fixInfobar: ["Die Infoleiste fixieren"],
				dummy4: '<tr><th colspan="2"></th></tr>',
				enableConfirm: ["Sicherheitsabfrage vor Löschung"]
			},
			standard: "Standard",
			disable: "Aktivieren",
			save: "Speichern",
			port: {
				config: "Einstellungen",
				variants: "Varianten",
				reports: "Berichte",
				villages: "Dörfer",
				coords: "Koordinaten",
				commands: "Befehle",
				booty: "Beute",
			},
			export: {
				button: "Exportieren",
				title: "Daten exportieren:",
				all: "Alles auswählen",
				code: "Code",
				error: "Export fehlgeschlagen!",
				success: "Export erfolgreich abgeschlossen!",
			},
			import: {
				button: "Importieren",
				title: "Daten importieren:",
				code: "Code",
				error: "Import fehlgeschlagen!",
				success: "Import erfolgreich abgeschlossen!"
			},
			reset: {
				button: "Zurücksetzen",
				title: "Daten zurücksetzen:",
				complete: "Die Daten wurden zurückgesetzt!",
			},
		},
		autoFarm: {
			title: 'Autofarmen',
			start: 'Autofarmen starten',
			stop: 'Autofarmen stoppen'
		},
		freePA: {
			villageFile: "Dorfakte",
			playerFile: "Spielerakte",
			allyFile: "Stammesakte",
			externalLink: ["twstats.com", "twplus.org", "dsreal.de"],
		},
		up: String.fromCharCode(9650),
		down: String.fromCharCode(9660)
	},
	regex: {
		reportTitle: /<[Hh]3>Der Angreifer|Verteidiger hat gewonnen<\/[Hh]3>/,
		reportSupport: /unterstützt/,
		villageCoords: /\((\d{1,3})\|(\d{1,3})\) K(\d+)\s*/,
		villageName: /\s*(.*)\s+\((\d{1,3})\|(\d{1,3})\) K(\d+)\s*/,
		send: /^\s*Gesendet\s*$/,
		sendDate: /Gesendet<\/td><td>\s*0?(\d+)\.0?(\d+)\.(\d+)\s+0?(\d+):0?(\d+):0?(\d+)\s*<\/td>/,
		sendDateStr: /Gesendet<\/td><td>\s*([\d\. :]+)\s*<\/td>/,
		attack: /Angriff/,
		spy: /Spionage/,
		spyres: /Ersp.{1,2}hte Rohstoffe/,
		building: /Geb.{1,2}ude/,
		visit: /<h3>Besuch<\/h3>/i,
		playerLink: /<a href="[^"]*id=(\d+)[^>]*>\s*([^<]+)/,
		attacker: /Angreifer:<\/th>\s*<th>([^<]+)/,
		attackerVillage: /Herkunft:<\/td>\s*<td><a href="[^"]*id=(\d+)[^"]*">\s*(.+)\s+\((\d{1,3})\|(\d{1,3})\) K(\d+)/,
		defender: /Verteidiger:<\/th>\s*<th>(.+)/,
		defenderVillage: /Ziel:<\/td>\s*<td[^>]*><a href="[^"]*id=(\d+)[^"]*"[^>]*>\s*(.+)\s+\((\d{1,3})\|(\d{1,3})\) K(\d+)/,
		unitImg: /<img[^>]*src="http:\/\/[a-zA-Z\.\d]+\/graphic\/unit\/unit_([a-zA-Z]+)\.png[^"]*"[^>]*>/,
		buildingLevel: /\s*(.+)\s+<[bB]>\(Stufe (\d+)/,
		buildingLevels: /.+\s+<[bB]>\(Stufe \d+/g,
		mainQueue: /\s*(.+)\s+\(Stufe (\d+)\)|\s*(.+)\s+\(Stufe abrei.{1,2}en\)/,
		unitQueue: /\s*(-?\d+)\s+(.+)\s*/,
		mainLevel: />\s*\(Stufe (\d+)\)\s*</,
		booty: /Beute:/,
		bootyGes: /(\d+)\/(\d+)/,
		wood: /<span class="icon header wood"> <\/span>\s*(\d+)/,
		stone: /<span class="icon header stone"> <\/span>\s*(\d+)/,
		iron: /<span class="icon header iron"> <\/span>\s*(\d+)/,
		deftroopsout: /Einheiten au.{1,2}erhalb:/,
		damage: /[^>]+>(.+) besch.{1,2}digt von Level <[Bb]>\d+<\/[Bb]> auf Level <[Bb]>(\d+)/,
		loyaltyChange: /esunken von <[Bb]>\d+<\/[Bb]> auf <[Bb]>(-?\d+)/,
		
		loyalty: /Zustimmung/,
		commands: {
			attacked: /greift (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2}) an/,
			conquer: /erobert (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
			attack: /Angriff auf (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
			comeback: /R.{1,2}ckkehr von (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
			abort: /Abgebrochener Befehl nach (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
			support: /Unterst.{1,2}tzung für (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
			callback: /R.{1,2}ckzug von (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
			sentback: /Zur.{1,2}ckgeschickt von (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
			cancel: /<a[^>]+>abbrechen<\/a>/
		},
		ownCommands: /^\s*Eigene Befehle[^<>]*$/,
		commandLink: /<a[^>]*href="[^"]*id=(\d+)[^"]*"/,
		attackImg: /<img[^>]*src="[^"]+command\/attack\.png/,
		
		reportSubject: /^\s*Betreff\s*$/,
		moveReport: /Verschieben/,
		
		coordsText: /^\s*Koordinaten:\s*$/,
		pointsText: /^\s*Punkte:\s*$/,
		homeCoords: /<b class="nowrap">\((\d{1,3})\|(\d{1,3})\) K(\d+)<\/b>/,
		
		lowPointsError: /Das Ziel kann bis zum (\d+)\.(\d+)\. (\d+):(\d+) nur angreifen und angegriffen werden, wenn das Punkte-Verh.{1,2}ltnis zwischen Angreifer und Verteidiger h.{1,2}chstens (\d+) : (\d+) ist\./,
		lowSpyNumber: /Es m.{1,2}ssen mindestens (\d+) Sp.{1,2}her geschickt werden\./,
		settings: /Einstellungen/,
		arrivalTitle: /Ankunft/,
		durationTitle: /Dauer:/,
		reserved: /Achtung.+reserviert!$/,
		
		unitNotResearched: /Einheit noch nicht erforscht/,
		
		village: /Dorf/,
		points: /Punkte/,
		resources: /Rohstoffe/,
		ownVill: /<span id="label_text_(\d+)">(.+) \((\d{1,3})\|(\d{1,3})\) K(\d+)<\/span>/,
		
		build_contract: /Bauauftrag/,
		research: /Forschung/,
		specialEventVikings: /graphic\/unit\/unit_viking\.png/,
		
		botProtect: /<[Hh]2>\s*Botschutz\s*<\/[Hh]2>/,
	},
	locale: {
		nrgroupsign: ".",
		nrgroupsign2: ",",
		timeStr1: /(am (\d{2})\.(\d{2})\.(\d{2})?|morgen|heute) um (\d{2}):(\d{2}):?(\d{2})?:?(\d{3})?/,
		timeStr2: /(0?(\d{1,2})\.0?(\d{1,2})\.0?(\d{1,2})?) 0?(\d{1,2}):0?(\d{1,2}):?0?(\d{1,2})?:?0?(\d{2,3})?/,
		tomorrow: "morgen",
		timeStr2Sec: function(str) {
			var res = str.match(texts.locale.timeStr1);
			if (!res)
				res = str.match(texts.locale.timeStr2);
			sec = 0;
			if (res) {
				if (isNaN(res[7]))
					res[7] = 0;
				if (typeof(res[3]) == "undefined") {
					var today = lib.getTime();
					today = today - today % 86400;
					sec = today + res[5] * 3600 + res[6] * 60 + parseInt(res[7], 10);
					if (res[1] == texts.locale.tomorrow)
						sec += 86400;
				} else {
					res[3] = parseInt(res[3], 10);
					res[4] = parseInt(res[4], 10);
					res[5] = parseInt(res[5], 10);
					res[6] = parseInt(res[6], 10);
					res[7] = parseInt(res[7], 10);
					if (isNaN(res[4]))
						res[4] = lib.serverTime.getUTCFullYear();
					if (res[4] < 100)
						res[4] += 2000;
					var dt = new Date();
					dt.setUTCFullYear(res[4]);
					dt.setUTCMonth(res[3] - 1);
					dt.setUTCDate(res[2]);
					dt.setUTCHours(res[5]);
					dt.setUTCMinutes(res[6]);
					dt.setUTCSeconds(res[7]);
					sec = Math.floor(dt.getTime() / 1000);
				}
			}
			return sec;
		},
	},
	ch: {
		unit: {
			sword: "Schwärtkämpfer",
			archer: "Bogeschütz",
			light: "Liechti Kavallerie",
			marcher: "Berittnig  Bogenschütz",
			heavy: "Schwäri Kavallerie",
			snob: "Adusgschlächt",
			militia: "Miliz"
		},
		units: {
			sword: "Schwärtkämpfer",
			archer: "Bogenschütz",
			light: "Liechti Kavallerie",
			marcher: "Berittnig Bogenschütz",
			heavy: "Schwäri Kavallerie",
			ram: "Rammböck",
			catapult: "Katapult",
			snob: "Adelsgeschlechter",
			militia: "Milize"
		},
		buildings: {
			main: "Houptgeböide",
			barracks: "Kasärne",
			stable: "Stau",
			garage: "Wärkstatt",
			church: "Chiuche",
			church_f: "Erschti Chiuche",
			snob: "Adushof",
			smith: "Schmied",
			place: "Platz",
			statue: "Statue",
			market: "Markt",
			wood: "Houzfäuer",
			stone: "Lehmgruebe",
			iron: "Isemine",
			farm: "Burehof",
			storage: "Spicher",
			hide: "Vrsteck",
			wall: "Wall"
		},
		resources: {
			wood: "Houz",
			stone: "Lehm",
			iron: "Isä",
			sum: "Gsamt"
		},
		reports: {
			subject: "Beträff",
			'delete': "Lösche",
			move: "Verschieben"	//?
		},
		gui: {
			noCoords: "Du muesch di x und y Koordinate vom Ziu agä",
			noUnitsSelected: "Ke Einheite usgwäut",
			
			buildings: "Geböide",
			booty: "Büti",
			
			buildVariantHeader: "Geböidevarianten",	//?
			addBuildVariant: "Geböidevariante hinzufügen",	//?
			buildReady: "Geböide vollständig usbout",
			buildOver: "Geböide zu weit usbout!",	//?
			points: "Pünkt",
			
			farmToLow: "Z weni Burehöf um zuesätzlechi Soudate z vrsorge.",
			unitNotReseached: "Einheite no nid erforscht",
			'delete': "Lösche",
			resources: "Rohstoff",
			
			village_overview: "Übersichte",
			
			close: "schliesse",
			
			settings: {
				settings: "Istellige",
				save: "Spichäre",
			},
		},
		regex: {
			reportTitle: /<[Hh]3>Dr Agrifer|Vrteidiger het gwunne<\/[Hh]3>/,
			reportSupport: /unterstützt/,	//?
			send: /^\s*Gsändet\s*$/,
			sendDate: /Gsändet<\/td><td>\s*0?(\d+)\.0?(\d+)\.(\d+)\s+0?(\d+):0?(\d+):0?(\d+)\s*<\/td>/,
			sendDateStr: /Gsändet<\/td><td>\s*([\d\. :]+)\s*<\/td>/,
			attack: /An?griff/,
			spyres: /Ersp.{1,2}hti Rohstoff/,
			building: /Geböide/,
			attacker: /Angrifer:<\/th>\s*<th>([^<]+)/,
			attackerVillage: /Härkunft:<\/td>\s*<td><a href="[^"]*id=(\d+)[^"]*">\s*(.+)\s+\((\d{1,3})\|(\d{1,3})\) K(\d+)/,
			defender: /Vrteidiger:<\/th>\s*<th>(.+)/,
			defenderVillage: /Ziu:<\/td>\s*<td[^>]*><a href="[^"]*id=(\d+)[^"]*"[^>]*>\s*(.+)\s+\((\d{1,3})\|(\d{1,3})\) K(\d+)/,
			mainQueue: /\s*(.+)\s+\(Stuefe (\d+)\)|\s*([^><\s]+)\s+\(Stuefe abrisse\)/,	//?
			booty: /Büti:/,
			deftroopsout: /Einheite au.{1,2}erhalb:/,	//?
			damage: /[^>]+>(.+) besch.{1,2}diget vo Level <[Bb]>\d+<\/[Bb]> uf Level <[Bb]>(\d+)/,	//?
			loyaltyChange: /Zuestimmig gsunke vo <[Bb]>\d+<\/[Bb]> uf <[Bb]>(-?\d+)/,
			
			loyalty: /Zuestimmig/,
			commands: {
				attacked: /grift (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2}) a/,
				attack: /Agriff uf (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
				comeback: /R.{1,2}ckkehr vo (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
				callback: /R.{1,2}ckzug vo (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
				sentback: /Zur.{1,2}ckgeschickt vo (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
				cancel: /<a[^>]+>abbräche<\/a>/,
			},
			ownCommands: /^\s*Eigeni Befäu[^<>]*$/,
			
			reportSubject: /^\s*Beträff\s*$/,
			moveReport: /Verschieben/,	//?
			
			coordsText: /^\s*Koordinate:\s*$/,
			pointsText: /^\s*Pünkt:\s*$/,
			
			lowPointsError: /Das Ziel kann bis zum (\d+)\.(\d+)\. (\d+):(\d+) nur angreifen und angegriffen werden, wenn das Punkte-Verh.{1,2}ltnis zwischen Angreifer und Verteidiger h.{1,2}chstens (\d+) : (\d+) ist\./,	//?
			lowSpyNumber: /Es m.{1,2}ssen mindestens (\d+) Sp.{1,2}her geschickt werden\./,	//?
			settings: /Istellige/,
			arrivalTitle: /Akunft/,
			durationTitle: /Dur:/,
			
			unitNotResearched: /Einheite no nid erforscht/,
			
			village: /Dorf/,
			points: /Pünkt/,
			resources: /Rohstoffe/,
			
			botProtect: /<[Hh]2>\s*Botschutz\s*<\/[Hh]2>/,	//?
		},
		locale: {
			timeStr1: /(am (\d{2})\.(\d{2})\.(\d{2})?|morn|hüt) um (\d{2}):(\d{2}):?(\d{2})?:?(\d{3})?/,
			tomorrow: "morn"
		}
	},
	en: {
		lang: 'ae',
		unit: {
			spear: "مقاتل الرمح",
			sword: "مقاتل السيف",
			axe: "مقاتل الفأس",
			archer: "رماة الأسهم",
			spy: "كشافة",
			light: "فارس خفيف",
			marcher: "فارس القوس",
			heavy: "فارس ثقيل",
			ram: "محطمة الحائط",
			catapult: "مقلاع",
			knight: "قائد الفرسان",
			snob: "نبيل",
			militia: "ميليشيا"
		},
		units: {
			spear: "مقاتل الرمح",
			sword: "مقاتل السيف",
			axe: "مقاتل الفأس",
			archer: "رماة الأسهم",
			spy: "كشافة",
			light: "فارس خفيف",
			marcher: "فارس القوس",
			heavy: "فارس ثقيل",
			ram: "محطمة الحائط",
			catapult: "مقلاع",
			knight: "قائد الفرسان",
			snob: "نبيل",
			militia: "ميليشيا"
		},
		buildings: {
			main: "المبنى الرئيسي",
			barracks: "الثكنات",
			stable: "الاسطبل",
			garage: "الورشه",
			snob: "الاكاديميه",
			smith: "الحداد",
			place: "نقطة التجمع",
			statue: "تمثال الملك",
			market: "السوق",
			wood: "الخشاب",
			stone: "حفرة الطمي",
			iron: "منجم الحديد",
			farm: "المزارع",
			storage: "المخازن",
			hide: "المخابئ",
			wall: "الحائط"
		},
		resources: {
			wood: "خشب",
			stone: "طمي",
			iron: "حديد",
			sum: "المجموع"
		},
		reports: {
			subject: "الموضوع",
			'delete': "حذف",
			move: "نقل"
		},
		gui: {
			dsVersion: "TW-Version",
			dataVersion: "Dataversion",
			update: "Updating database version $1 to $2 successfully!",
			readAttacksFail: "بعض الاوامر تم اعادة تسميتها , لذلك فالسكريبت لن يستطيع قراءتها",
			reportReadSuccess: "تم تسجيل التقرير بنجاح",
			reportReadUpToDate: "تم تحديث التقرير",
			reportReadOutOfDate: "انتهت صلاحية التقرير",
			farmlist: "لائحة المزارع",
			noUnitsCol: "لا يوجد جيش كافي",
			distance: "مسافة",
			age: "تاريخ",
			noUnits: "لا يوجد جيوش",
			yesUnits: "Note: Troops!",
			newReport: "يوجد على الاقل تقرير جديد",
			noCoords: "يجب عليك اضافة احداثيات x و y للهدف",
			noUnitsSelected: "لم تقم باختيار اي وحدات",
			
			readReports: "Read reports",
			delOldReports: "Delete outdated Reports",
			effectiveStorage: "open storage (farmable size)",	//?
			buildUps2: "Compute possible upgrades",
			buildUps2Warning: "Attention!\nThe process can utilize the browser for a few minutes completely\n\nDo you still be calculated up to 10000 possibilities for expansion?\nThe results are available in the console of the browser.",	//?
			lockFarm: "Lock the Farm",
			contingentRes: "Now possible",
			mood: "Loyalty",
			buildings: "المباني",
			units: "الجيوش",
			todayBooty: "Today captured commodities",
			yesterdayBooty: "Yesterday captured commodities",
			booty: "Booty",
			confirmDeleteReport: "Should this report really be deleted?",
			spyReport: "هجموم الكشافة",
			markOldReports: "Mark outdated reports",
			delData: "Delete data",
			delConfirm: "All data will be deleted in this village, are you sure?",
			resetEQ: "Reset the success quotient",	//?
			
			buildVariantHeader: "Building variants",
			addBuildVariant: "Add building variant",
			buildReady: "Building fully constructed",
			buildOver: "Building constructed too far!",
			tearDownLevel: "Downgrade one level",
			tearDown: "Demolish:",
			
			unitVariantHeader: "Unit variants",
			addUnitVariant: "Add unit variant",
			unitsTitle: "in/Current/Total",
			fillIn: "Fill",
			troopsNumReached: "Troop numbers reached",
			farmToLow: "To provide little additional farms to soldiers.",	//?
			farmReached: "The farm can provide no further units.",
			unitNotReseached: "Unit not yet explored",
			'delete': "Delete",
			resources: "Resources",
			
			village_overview: "Overviews",
			
			loadingInfos: "Loading Information ...",
			loadServerCfg: "Server configuration is determined...",
			serverCfgKnown: "Server configuration was determined",
			loadUnitInfo: "Units are determined...",
			unitInfoKnown: "Units were determined",
			loadBuildingInfo: "Buildings are determined...",
			buildingInfoKnown: "Buildings were determined",
			error: "Error",
			ok: "Ok",
			close: "Close",
			valueError: "Incorrect value, using default settings",
			outdatedScript: "The DS-Farmassistent $1 is out-dated!<br>The Script is no longer running.",
			
			percentage: "Percent",
			changeColor: "Change color",
			colorCode: "Colorcode",
			change: "Change",
			settings: {
				settings: "Settings",
				titles: {
					general: "General",
					place: "Rally point",
					map: "Map",
					reports: "Reports",
					autoFarm: "Autofarming",
					paFeatures: "PA-Features",
					registerReport: '<span class="icon header new_report" title="Register report" style="position: relative; top: -2px;"></span>',
					hotkeys: "Hotkeys",
					misc: "Miscellaneous"
				},
				general: {
					considerEQ: ["Consider the success quotient"],
					enableAtUV: ["activate the „Farmassistent“ in sitting accounts"],
					enableStorageColorAt: ["Color the storage", {
						all: "Select all",
						infobar: "Infobar",
						production: "Production Summary",
						market: "Market",
						place: "Rally point (Farm list)",
						map: "Map (Popup)",
						info_village: "Villageinformation",
						coin_mint: "Gold coins minting"
					}],
				},
				place: {
					farmlistOpt: ["Display the farmlist", ["No", "As popup", "integrated"]],
					minRes: ["min. resources (<i><u>filter</u></i>)", ""],
					maxDistance: ["max. Distance (<i><u>filter</u></i>)", " fields<span class=\"grey\">?</span>"],	//?
					maxAge: ["max. Age (<i><u>filter</u></i>)", " Hours"],
					farmSpys: ["Späher pro Farmangriff mitschicken", " Späher"],
					attackedFarms: ["Farmen, die angegriffen werden", ["so lassen", "ausgrauen", "ausgrauen und an das Ende der Liste verschieben", "nicht mehr anzeigen"]],
					farmSpys: ["Späher pro Farmangriff mitschicken", " Späher"],
					spyOnlyWithUnits: ["Späher nur mit Einheiten zusammen schicken"],
					sendRams: ["Send rams for wall upwards level", ""],
					checksActive: ["Select units at the Rally point"],
					unitPreferences: ["Priorities of the units", {}]
				},
				map: {
					integrateInfos: ["Integrate Infos into Popup"],
					overlaysActive: ["Activate Overlays"]
				},
				reports: {
					showSearchInput: ["Insert Search-input"],
					changeLinkStyle: ["Change the linkstyle of reportlinks"],
					newReport: ["New Report", {}],
					readReport: ["Read Report", {}],
					spyReport: ["Read Spyreport", {}],
					oldReport: ["Old Report", {}],
					colors: {
						blue: "blue",
						green: "green",
						yellow: "yellow",
						red: "red",
						red_blue: "red-blue",
						red_yellow: "red-yellow"
					},
				},
				autoFarm: {
					active: ["Activate Autofarming"],
					farmOver: ["Farming", ["the map", "the rally point", "the Farm Assistant"]],
					farm_Assistent_click: ["Farm Assistant click", ["A", "B", "C"]],
					minRes: ["min. ressources (<i><u>filter</u></i>)", ""],
					maxDistance: ["Farming within (<i><u>filter</u></i>)", " fields"],
					farmSpys: ["Send Scouts per farming attack", " Scouts"],
					sendRams: ["Send rams for wall upwards level", ""],
					farmWith: ["Farming with", ["the required units to carry all ressources", "fixed unit numbers", "at least the set units"]],
					units: ["Units", {}],
				},
				paFeatures: {
					freePA: ["Activate Free-PA"],
					dummy2: '<tr><td colspan="2"><b>Farm Assistant:</b></td></tr>',
					farmAssistent: ["Activate additional Features for Farm-Assistent"],
					farmAssistent_minRes: ["min. resources (<i><u>filter</u></i>)", ""],
				},
				registerReport: {
					villageName: ["Villagename", {}],
					villageID: ["Village-ID", {}],
					ownerID: ["Owner-ID", {}],
					spyDate: ["Spydate", { format: "$month$/$day$/$year$<br>at $hour$:$minute$" }],
					units: ["Units", {}],
					res: ["Ressources", {}],
					buildings: ["Buildings", {}],
					mood: ["Mood", {}],
					bonus: ["Bonus", {
						bonus: [
							'-',
							'100 % higher wood production',
							'100 % higher clay production',
							'100 % higher iron production',
							'10 % more population',
							'33 % faster recruitment in the barracks',
							'33 % faster recruitment in the stables',
							'50 % faster recruitment in the workshop',
							'30 % more resources are produced (all resource types)',
							'50 % more storage capacity and merchants'
						]
					}],
					save: ["Register", {}]
				},
				hotkeys: {
					active: ["Activate Hotkeys"],
				},
				misc: {
					overview_showBooty: ["Show the booty in Villageoverview"],
					recruitVariantActive: ["Activate Unit variants"],
					buildVariantActive: ["Activate Building variants"],
					queueOpt: ["Shorten the production queue", ["not at all", "small", "excessive"]],
					prodFilterActive: ["Activate filter in the production overview"],
					fixQuickbar: ["Fix the quickbar"],
					fixInfobar: ["Fix the infobar"]
				},
				standard: "Standard",
				disable: "Enable",
				save: "Save",
				port: {
					config: "Settings",
					variants: "Variants",
					reports: "Reports",
					villages: "Villages",
					coords: "Coordinates",
					commands: "Commands",
					booty: "Booty",
				},
				export: {
					button: "Export",
					title: "Export Data:",
					all: "Select all",
					code: "Code",
					error: "Export failed!",
					success: "Export successful!",
				},
				import: {
					button: "Import",
					title: "Import Data:",
					code: "Code",
					error: "Import failed!",
					success: "Import successful!"
				},
				reset: {
					button: "Reset",
					title: "Resete Data:",
					complete: "Data reset complete!",
				},
			},
			autoFarm: {
				title: 'Autofarming',
				start: 'Start Autofarming',
				stop: 'Stop Autofarming'
			},
			freePA: {
				villageFile: "Village file",
				playerFile: "User file",
				allyFile: "Tribal file",
				externalLink: ["twstats.com", "twplus.org", "dsreal.de"],
			},
		},
		regex: {
			reportTitle: /<[Hh]3>The attacker|defender has won<\/[Hh]3>/,
			reportSupport: /supports/,	//?
			send: /^\s*Sent\s*$/,
			sendDate: /Sent<\/td><td>\s*(\w+)\s+0?(\d+),\s+(\d+)\s+0?(\d+):0?(\d+):0?(\d+)\s*<\/td>/,
			sendDateStr: /Sent<\/td><td>\s*(.+)\s*<\/td>/,
			attack: /Attack/,
			spy: /Espionage/,
			spyres: /Resources scouted/,
			building: /Buildings/,
			visit: /<h3>Visit<\/h3>/i,	//?
			attacker: /Attacker:<\/th>\s*<th>([^<]+)/,
			attackerVillage: /Origin:<\/td>\s*<td><a href="[^"]*id=(\d+)[^"]*">\s*(.+)\s+\((\d{1,3})\|(\d{1,3})\) K(\d+)/,
			defender: /Defender:<\/th>\s*<th>(.+)/,
			defenderVillage: /Destination:<\/td>\s*<td[^>]*><a href="[^"]*id=(\d+)[^"]*"[^>]*>\s*(.+)\s+\((\d{1,3})\|(\d{1,3})\) K(\d+)/,
			buildingLevel: /\s*(.+)\s+<[bB]>\(Level (\d+)/,
			buildingLevels: /.+\s+<[bB]>\(Level \d+/g,
			mainQueue: /\s*(.+)\s+\(Level (\d+)\)|\s*(.+)\s+\(demolish level\)/,
			mainLevel: />\s*\(Level (\d+)\)\s*</,
			booty: /Haul:/,
			deftroopsout: /Units outside/,	//?
			damage: /[^>]+>(.+) has been damaged and downgraded from level <[Bb]>\d+<\/[Bb]> to level <[Bb]>(\d+)/,
			loyaltyChange: /Dropped from <[Bb]>\d+<\/[Bb]> to <[Bb]>(-?\d+)/,
			
			loyalty: /Loyalty/,
			commands: {
				attacked: /attacks (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
				conquer: /conquers (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
				attack: /Attack on (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
				comeback: /Return from (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
				abort: /Cancelled command after (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
				support: /Support for (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
				callback: /Withdrawn from (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
				sentback: /Sent back by (.+) \((\d{1,3})\|(\d{1,3})\) K(\d{1,2})/,
				cancel: /<a[^>]+>cancel<\/a>/
			},
			ownCommands: /^\s*Own commands[^<>]*$/,
			
			reportSubject: /^\s*Subject\s*$/,
			moveReport: /Move/,
			
			coordsText: /^\s*Coordinates:\s*$/,
			pointsText: /^\s*Points:\s*$/,
			
			lowPointsError: /Until (\d+)\.(\d+)\. (\d+):(\d+), the target can only attack or be attacked, if the relation of points between attacker and defender is no more than (\d+)\./,
			lowSpyNumber: /Es m.{1,2}ssen mindestens (\d+) Sp.{1,2}her geschickt werden\./,	//?
			settings: /Settings/,
			arrivalTitle: /Arrival time/,
			durationTitle: /Duration:/,
			reserved: /Achtung.+reserviert!$/,	//?
			
			unitNotResearched: /Unit not yet researched/,
			
			village: /Village/,
			points: /Points/,
			resources: /Resources/,
			
			botProtect: /<[Hh]2>\s*Bot protection\s*<\/[Hh]2>/,
		},
		locale: {
			timeStr1: /(on (\d{2})\.(\d{2})\.(\d{2})?|tomorrow|today) at (\d{2}):(\d{2}):?(\d{2})?:?(\d{3})?/,
			timeStr2: /((\w{3,4}) (\d{2}), (\d{2,4})?)\s+(\d{2}):(\d{2}):?(\d{2})?:?(\d{3})?/,
			months: {
				"Jan": 1,
				"Feb": 2,
				"Mar": 3,
				"Apr": 4,
				"May": 5,
				"Jun": 6,
				"Jul": 7,
				"Aug": 8,
				"Sep": 9,
				"Oct": 10,
				"Nov": 11,
				"Dec": 12
			},
			tomorrow: "tomorrow",
			timeStr2Sec: function(str) {
				var res = str.match(texts.locale.timeStr1);
				if (!res)
					res = str.match(texts.locale.timeStr2);
				sec = 0;
				if (res) {
					if (isNaN(res[7]))
						res[7] = 0;
					if (isNaN(res[2])) {
						var tmp = res[3];
						res[3] = texts.locale.months[res[2]];
						res[2] = tmp;
					}
					if (typeof(res[3]) == "undefined") {
						var today = lib.getTime();
						today = today - today % 86400;
						sec = today + res[5] * 3600 + res[6] * 60 + parseInt(res[7], 10);
						if (res[1] == texts.locale.tomorrow)
							sec += 86400;
					} else {
						res[3] = parseInt(res[3], 10);
						res[4] = parseInt(res[4], 10);
						res[5] = parseInt(res[5], 10);
						res[6] = parseInt(res[6], 10);
						res[7] = parseInt(res[7], 10);
						if (isNaN(res[4]))
							res[4] = lib.serverTime.getUTCFullYear();
						if (res[4] < 100)
							res[4] += 2000;
						var dt = new Date();
						dt.setUTCFullYear(res[4]);
						dt.setUTCMonth(res[3] - 1);
						dt.setUTCDate(res[2]);
						dt.setUTCHours(res[5]);
						dt.setUTCMinutes(res[6]);
						dt.setUTCSeconds(res[7]);
						sec = Math.floor(dt.getTime() / 1000);
					}
				}
				return sec;
			},
		},
	},
	us: 'en',
	uk: 'en'
},
regex = {
	build: /build/,
	NaN: /[^\d]/,
	viewID: /view=(\d+)/,
	ID: /[&\?]id=(\d+)/,
	targetID: /target=(\d+)/,
	captcha: /\/game\.php\?captcha/,
	variant: /^\w+_variant$/,
	villageChangeReplacer: /^.+\/game\.php\?(.*)([\?&]?)village=\d+/,
	coords: /\((\d{1,3}\|\d{1,3})\)/,
};

/*
 * getCursorPosition()
 * setCursorPosition(pos)
 */
(function($) {
	$.fn.getCursorPosition = function() {
		var el = $(this).get(0),
			pos = 0;
		if ('selectionStart' in el) {
			pos = el.selectionStart;
		} else if ('selection' in document) {
			el.focus();
			var Sel = document.selection.createRange(),
				SelLength = document.selection.createRange().text.length;
			Sel.moveStart('character', -el.value.length);
			pos = Sel.text.length - SelLength;
		}
		return pos;
	};
	$.fn.setCursorPosition = function(pos) {
		if ($(this).get(0).setSelectionRange) {
			$(this).get(0).setSelectionRange(pos, pos);
		} else if ($(this).get(0).createTextRange) {
			var range = $(this).get(0).createTextRange();
			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
	}
})(jQuery);

String.prototype.remove = function(pattern) {
	if (arguments.length == 0) {
		return this;
	} else if (arguments.length == 1) {
		return this.replace(pattern,'');
	}
	var i, patt,
		ret = this.remove(pattern);
	for (i = 1; patt = arguments[i]; i++) {
		ret = ret.remove(patt);
	}
	return ret;
};


var lib = new DSLib('dsfa', true);
if (!lib.game_data) {
	return;
}
var game_data = lib.game_data,
	alert = lib.alert,
	UI = win.UI,
	UVActive = /[&\?]t=\d+/.test(location.href),
	pID = game_data.player.id,
	hCoords = false,
	vCoords = false,
	// Classes
	Color,
	ColorBar,
	Queue,
	Place,
	Filter,
	Update,
	Settings,
	Storage,
	Hotkeys,
	Village,
	Command,
	Report,
	Bot,
	Variant,
	Infos,
	Farmlist,
	PA_Features,
	Overview,
	Map;
// Standard ist deutsch
if (typeof(texts[lib.lang]) == 'string')
	texts = $.extend(true, texts, texts[texts[lib.lang]]);
else if (texts[lib.lang])
	texts = $.extend(true, texts, texts[lib.lang]);


/*
 * Color
 */
Color = function() {
	this.r = 0;
	this.g = 0;
	this.b = 0;
	this.fromString = function(str) {
		str = str.remove(/\s*/g);
		var res = str.match(/^rgb[a]?\((\d+),(\d+),(\d+)\)$/i);
		if (res) {
			this.r = res[1];
			this.g = res[2];
			this.b = res[3];
		} else {
			res = str.match(/^#?([0-9a-f]{1,2})([0-9a-f]{1,2})([0-9a-f]{1,2})$/i);
			this.r = parseInt(res[1], 16);
			this.g = parseInt(res[2], 16);
			this.b = parseInt(res[3], 16);
		}
		return this;
	};
	this.toString = function(rgb, a) {
		if (rgb) {
			if (typeof(a) == "undefined")
				return "rgb("+ this.r +", "+ this.g +", "+ this.b +")";
			else
				return "rgba("+ this.r +", "+ this.g +", "+ this.b +", "+ a +")";
		} else {
			return "#" + (0x100 | this.r).toString(16).substr(1) + (0x100 | this.g).toString(16).substr(1) + (0x100 | this.b).toString(16).substr(1);
		}
	};
	this.invert = function() {
		this.r = Math.abs(255-this.r);
		this.g = Math.abs(255-this.g);
		this.b = Math.abs(255-this.b);
		return this;
	};
	this.getContrastColor = function() {
		return 0.213*this.r + 0.715*this.g + 0.072*this.b < 128 ? new Color(255,255,255) : new Color(0,0,0);
	};
	this.fadeTo = function(p,color) {
		p = Math.min(Math.max(p,0),100);
		return new Color( Math.round(this.r + (color.r - this.r)*p), Math.round(this.g + (color.g - this.g)*p), Math.round(this.b + (color.b - this.b)*p) );
	};
	switch(arguments.length) {
		case 0:
			break;
		case 1:
			this.fromString(arguments[0]);
			break;
		case 3:
			this.r = arguments[0];
			this.g = arguments[1];
			this.b = arguments[2];
			break;
		default:
			throw("Color: invalid parameters");
	}
};


/*
 * ColorBar
 */
ColorBar = {
	bars: {},
	reloadColors: function(id, colors) {
		id = '#dsfa_'+ id +'ColorBar_color';
		var diff = 1,
			num1 = 0,
			num2 = 0,
			line2 = '';
		for (var i = 0; i < 101; i++) {
			var color = [
				colors[num1][0] + Math.round( (colors[num2][0] - colors[num1][0]) / diff * (i - num1) ),
				colors[num1][1] + Math.round( (colors[num2][1] - colors[num1][1]) / diff * (i - num1) ),
				colors[num1][2] + Math.round( (colors[num2][2] - colors[num1][2]) / diff * (i - num1) )
			];
			$(id + i).css('background-color', 'rgb('+ color.toString() +')');
			if (colors[i]) {
				num1 = i;
				for (var j = i+1; j < 101 && !colors[j]; j++) ;
				num2 = j;
				diff = num2-num1;
			}
		}
	},
	addColorRow: function(id, p, color) {
		var row, i, tmp,
			insertAfter = $('#dsfa_'+ id +'ColorBar_colorTable tr').eq(0),
			color = new Color('rgb('+ color.toString() +')'),
			colorBarRows = $('#dsfa_'+ id +'ColorBar_colorTable').find('tr');
		for (i = 1; row = colorBarRows[i]; i++) {
			tmp = parseInt($(row).find('td').eq(0).find('a').html());
			if (tmp == p) {
				$(row).find('td').eq(1).html( color.toString().toUpperCase() ).css('background-color', color.toString());
				insertAfter = null;
			} else if (tmp < p)
				insertAfter = $(row);
		}
		if (insertAfter != null) {
			$('<tr><td style="text-align: right;"><a href="javascript:(function() { $(\'#dsfa_'+ id +'ColorBar_percentage\').val('+ p +').keyup();  })();">'+ p +'</a></td><td style="background-color: '+ color.toString() +'">'+ color.toString().toUpperCase() +'</td><td><a class="cancel-icon solo tooltip" title="'+ texts.gui.delete +'" href="javascript:;"></a></td></tr>')
			.insertAfter(insertAfter)
			.find('a.cancel-icon')[0].addEventListener('click', function() {
				ColorBar.deleteColorRow(
					$(this).parents('tbody').eq(0).attr('id').replace(/dsfa_(.+)ColorBar_colorTable/,'$1'),
					parseInt($(this).parents('tr').eq(0).find('td').eq(0).find('a').html(), 10)
				);
			});
		}
		
		recreateToolTip();
		this.reloadColors(id, this.bars[id].colors);
	},
	deleteColorRow: function(id, p) {
		if (p == 0 || p == 100) {
			this.bars[id].colors[p] = this.bars[id].std[p];
			this.addColorRow(id, p, this.bars[id].colors[p]);
		} else {
			delete this.bars[id].colors[p];
			var row, i,
				colorBarRows = $('#dsfa_'+ id +'ColorBar_colorTable').find('tr');
			for (i = 1; row = colorBarRows[i]; i++) {
				if (parseInt($(row).find('td').eq(0).find('a').html(), 10) == p)
					$(row).remove();
			}
		}
		
		this.reloadColors(id, this.bars[id].colors);
	},
	init: function() {
		$('<style type="text/css">' +
			'.colorBar { height: 20px; width: 707px; border: 1px solid black; }' +
			'.colorBar > div { width: 7px; height: 20px; float: left; }' +
			'.arrowBar { height: 20px; width: 707px; }' +
			'.arrow { width: 7px; height: 20px; float: left; visibility: hidden; }' +
			'.arrow.show { visibility: visible !important; }' +
		'</style>').appendTo('head');
	},
	create: function(id, el, colors, std) {
		HTML = '<div id="dsfa_'+ id +'ColorBar" class="colorBar">',
		line2 = rows = '';
		for (var i = 0; i < 101; i++) {
			HTML += '<div id="dsfa_'+ id +'ColorBar_color'+ i +'"></div>';
			line2 += '<div id="dsfa_'+ id +'ColorBar_color'+ i +'_arrow" class="arrow">&#8593;</div>';
		}
		HTML += '</div><div class="arrowBar">' + line2 +'</div>' +
		'<table style="width: 100%; text-align: center;"><tr><td style="width: 50%;"><table style="margin: 0 auto;">' +
		'<tr><td style="text-align: right;">'+ texts.gui.percentage +':</td><td style="text-align: left;"><input id="dsfa_'+ id +'ColorBar_percentage" type="text" size="7" style="border: 1px solid grey;"> %</td></tr>' +
		'<tr><td style="text-align: right;">'+ texts.gui.changeColor +':</td><td style="text-align: left;"><input id="dsfa_'+ id +'ColorBar_colorInput" type="text" size="7" style="border: 1px solid grey;"></td></tr>' +
		'<tr><td></td><td style="text-align: left;"><input id="dsfa_'+ id +'ColorBar_colorButton" type="button" value="'+ texts.gui.change +'"></td></tr>' +
		'</table></td><th></th><td style="width: 50%;">' +
		'<table class="vis" style="margin: 0 auto;"><tbody id="dsfa_'+ id +'ColorBar_colorTable"><tr><th>%</th><th>'+ texts.gui.colorCode +'</th><th>&nbsp;</th></tr></tbody></table></td></tr></table>';
		if (el instanceof HTMLElement)
			el = $(el);
		if (el instanceof jQuery)
			el.append(HTML);
		
		this.bars[id] = {
			html: HTML,
			colors: colors,
			std: std
		};
		for (var key in colors) {
			this.addColorRow(id, parseInt(key), colors[key]);
		}
		
		// Farb-Bereiche ; Klick
		$('#dsfa_'+ id +'ColorBar>div').click(function() {
			var ID = $(this).parent().attr('id').replace(/^dsfa_(.+)ColorBar$/, '$1'),
				color = new Color($(this).css('background-color'));
			$('#dsfa_'+ ID +'ColorBar_colorInput').val( color.toString().toUpperCase() );
			$('.arrow.show').removeClass('show');
			$('#'+ $(this).attr('id') +'_arrow').addClass('show');
			$('#dsfa_'+ ID +'ColorBar_percentage').val( $(this).attr('id').replace(/color(\d+)/, '$1') ).keyup();
		});
		
		// Prozent-Eingabefeld ; Taste losgelassen
		$('#dsfa_'+ id +'ColorBar_percentage').keyup(function() {
			var ID = $(this).attr('id').replace(/^dsfa_(.+)ColorBar_percentage$/, '$1');
			if (/[^\d]/.test($(this).val())) {
				var pos = $(this).getCursorPosition(),
					match = $(this).val().substr(0,pos).match(/[^\d]/g);
				count = match && match.length || 0;
				$(this).val( $(this).val().remove(/[^\d]/g) ).setCursorPosition(pos-count);
			}
			if ($(this).val() == '')
				$(this).val(0).focus().select();
			
			var p = parseInt($(this).val(), 10);
			if (p > 100) {
				p = 100;
				$(this).val(100);
			}
			var color = new Color($('#dsfa_'+ ID +'ColorBar_color'+ p).css('background-color'));
			$('#dsfa_'+ ID +'ColorBar_colorInput').val( color.toString().toUpperCase() ).keyup();
			$('.arrow.show').removeClass('show');
			$('#dsfa_'+ ID +'ColorBar_color'+ p +'_arrow').addClass('show');
		});
		
		// Farbeingabefeld ; Taste losgelassen
		$('#dsfa_'+ id +'ColorBar_colorInput').keyup(function() {
			if (/[a-z]/.test($(this).val())) {
				var pos = $(this).getCursorPosition();
				$(this).val( $(this).val().toUpperCase() ).setCursorPosition(pos);
			}
			var val = $(this).val().remove(/\s*/g),
				match_hex = val.match(/^#?[0-9a-f]{3,6}$/i),
				match_rgb = val.match(/^rgb\(\d+,\d+,\d+\)$/i),
				match_rgba = val.match(/^rgba\(\d+,\d+,\d+,\d+\)$/i);
			if (match_hex || match_rgb || match_rgba) 
				$(this).css({
					'background-color': (new Color(val)).toString(),
					'color': (new Color(val)).getContrastColor()
				});
			else
				$(this).css({
					'background-color': '',
					'color': ''
				});
		});
		
		// Ändern-Button ; Klick
		$('#dsfa_'+ id +'ColorBar_colorButton')[0].addEventListener('click', function() {
			var ID = $(this).attr('id').match(/^dsfa_(.+)ColorBar_colorButton$/)[1],
				val = $('#dsfa_'+ ID +'ColorBar_colorInput').val().remove(/\s*/g),
				p = parseInt($('#dsfa_'+ ID +'ColorBar_percentage').val()),
				match_hex = val.match(/^#?[0-9a-f]{3,6}$/i),
				match_rgb = val.match(/^rgb\(\d+,\d+,\d+\)$/i),
				match_rgba = val.match(/^rgba\(\d+,\d+,\d+,\d+\)$/i);
			if (match_hex || match_rgb || match_rgba) {
				var color = new Color(val);
				ColorBar.bars[ID].colors[p] = [color.r, color.g, color.b];
				ColorBar.addColorRow(ID, p, ColorBar.bars[ID].colors[p]);
			} else {
				ColorBar.deleteColorRow(ID, p);
			}
		}, true);
	},
};


/*
 * Queue
 */
Queue = {
	_hide: {
		'buildqueue_wrap': lib.storage.getValue(game_data.village.id +'_queue_buildqueue_wrap', true),
		'trainqueue_wrap_barracks': lib.storage.getValue(game_data.village.id +'_queue_trainqueue_wrap_barracks', true),
		'trainqueue_wrap_stable': lib.storage.getValue(game_data.village.id +'_queue_trainqueue_wrap_stable', true),
		'trainqueue_wrap_garage': lib.storage.getValue(game_data.village.id +'_queue_trainqueue_wrap_garage', true)
	},
	init: function() {
		if (Settings.get('misc_prodRecruit') && $('#production_table').length) {
			$('#production_table tr td:last-child .order_queue').each(function() {
				var units = {},
					HTML = '';
				$(this).find('img').each(function() {
					var match = $(this).attr('src').match(/unit\/unit_(.+)\.png/);
					if (!match)
						return;
					
					var unit = match[1];
					match = $(this).attr('title').match(/(\d+) - (.+)/);
					if (!match)
						return;
					// rgb(0, 128, 0) = grün
					// rgb(255, 0, 0) = rot
					var red = $(this).parents('li').eq(0).find('.order-status-light').css('background-color') == 'rgb(255, 0, 0)',
						key = unit + (red ? '_decom' : '');
					
					if (units[key]) {
						units[key][0] += parseInt(match[1], 10);
						units[key][1]++;
					} else {
						units[key] = [parseInt(match[1], 10), 1];
						HTML += '<li class="order">' +
							'<div style="background-color: '+ (red ? 'red' : 'green') +';" class="order-status-light"></div>' +
							'<div class="queue_icon"><img src="'+ image_base +'unit/unit_'+ unit +'.png" class="'+ key +'" alt="" style="width: 16px; height: 16px;"></div>' +
						'<li>';
					}
					units[key][2] = match[2];
				});
				$(this).find('*').hide();
				$(this).prepend(HTML);
				for (var key in units)
					$(this).find('img.'+ key).eq(0).attr('title', units[key][0] +' ('+ units[key][1] +') - '+ units[key][2]);
			});
		} else if (Settings.get('misc_queueOpt') && (
					game_data.screen == 'main' ||
					game_data.screen == 'barracks' ||
					game_data.screen == 'stable' ||
					game_data.screen == 'garage' ||
					game_data.screen == 'train'
					)) {
			this.addTable('buildqueue_wrap');
			this.addTable('trainqueue_wrap_barracks');
			this.addTable('trainqueue_wrap_stable');
			this.addTable('trainqueue_wrap_garage');
			this.refresh();
			
			$('#pop_current_label')[0].addEventListener('DOMNodeInserted', function(e) {
				Queue.addTable('buildqueue_wrap');
				Queue.addTable('trainqueue_wrap_barracks');
				Queue.addTable('trainqueue_wrap_stable');
				Queue.addTable('trainqueue_wrap_garage');
				Queue.refresh();
			}, false);
		}
	},
	addTable: function(id) {
		var el = $('#'+ id +' tbody');
		if (!el.length)
			return;
		el = $(el[0]);
		
		if (!el.find('.dsfa_queue_hide').length) {
			var HTML = '',
				pattern = regex.build.test(id) ? texts.regex.mainQueue : texts.regex.unitQueue,
				list = [],
				isBuild = regex.build.test(id),
				extra = 0;
			
			$('#'+ id +' tr').slice(1).each(function() {
				if ($(this).find('td').length == 1) {
					var match = $(this).find('td').html().match(/<b>(\d+)%<\/b>/);
					if (!extra && match)
						extra = parseInt(match[1], 10);
					return;
				}
				var match = $(this).find('td').eq(0).html().match(pattern);
				if (!match)
					return;
				
				if (isBuild) {
					var down = match[1] ? false : true,
						build = match[1] ? trim(match[1]) : trim(match[3]);
					for (var key in lib.buildingInfo)
						if (build == texts.buildings[key])
							list.push({
								obj: this,
								key: key,
								img: 'buildings/'+ key,
								name: build,
								number: match[2],
								// $n = Anzahl, $w = Bezeichnung, $d = Dauer, $l = Fertigstellung (Uhrzeit)
								titleFormat: (down ? texts.gui.tearDown +' $w<br>$d<br>$l' : '$w (Stufe $n)<br>$d<br>$l'),
								duration: $(this).find('td').eq(1).find('span').eq(0).html(),
								lastReady: $(this).find('td').eq(2).html(),
								onclick: $(this).find('a').last().attr('onclick'),
								down: down,
								count: 1
							});
				} else {
					var unit = trim(match[2]);
					for (var key in lib.unitInfo)
						if (unit == texts.unit[key] || unit == texts.units[key])
							list.push({
								obj: this,
								key: key,
								img: 'unit/unit_'+ key,
								name: unit,
								number: parseInt(match[1]),
								titleFormat: '$n $w<br>$d<br>$l',	// $n = Anzahl, $w = Bezeichnung, $d = Dauer, $l = letzte Fertigstellung (Uhrzeit)
								duration: ($(this).find('.timer').length ? $(this).find('.timer').html() : $(this).find('td').eq(1).html()),
								lastReady: $(this).find('td').eq(2).html(),
								onclick: $(this).find('a').last().attr('onclick'),
								count: 1							// 8: Anzahl der Einträge (für stark verkürzte Schleifen)
							});
				}
			});
			
			// Fertigstellung der letzten Position der Produktionsschleife
			if (list.length) {
				var lastReadyQueue = list[list.length-1].lastReady;
			} else {
				var lastReadyQueue = '<i>?</i>';
			}
			
			// Stark verkürzen (wenn eingestellt):
			if (!isBuild && Settings.get('misc_queueOpt') == 2) {
				for (var i = 0, max = list.length; i < max; i++) {
					for (var j = i+1; j < max; j++) {
						if (list[i].key == list[j].key) {
							list[i].count++;
							list[i].number += list[j].number;
							list[i].titleFormat = '$n $w ($c)<br>$l';	// $c = Anzahl der Positionen
							list[i].lastReady = list[j].lastReady;
							list.splice(j, 1);
							j--;
							max--;
						}
					}
				}
			}
			
			// $('#'+ id).prev().find('.timer').html()	// Restzeit der nächsten Einheit
			// $(list[i][0]).find('.timer').html()		// gesamte Restzeit der Position
			for (var i = 0, max = list.length; i < max; i++)
				HTML += '<td class="nowrap" style="'+ (i < max-1 ? 'width: 1px; ' : '') +'padding: 3px 5px;">' +
						'<a href="javascript:;" onclick="'+ (list[i].count == 1 ? list[i].onclick : '') +'">' +
							(list[i].down ? '<img src="'+ image_base +'overview/down.png" alt="'+ texts.gui.tearDown +'">' : '') +
							'<img src="'+ image_base + list[i].img +'.png" alt="'+ list[i].name +'" title="' +
								list[i].titleFormat
								.replace('$w', list[i].name)
								.replace('$n', list[i].number)
								.replace('$c', list[i].count)
								.replace('$d', list[i].duration)
								.replace('$l', list[i].lastReady)
							+'" class="tooltip">' +
						'</a>' +
						(i == 0 ? '&nbsp;<span class="dsfa_timer" style="font-size: x-small; font-weight: bold;">'+ (isBuild ? $(list[i].obj).find('.timer').html() : $('#'+ id).prev().find('.timer').html()) +'</span>' : '') +
					'</td>';
			
			var cancelAll = $('#'+ id +' tr').last().find('a.evt-confirm');
			el.parents('div').last().prepend(
				'<table class="vis" style="display: none;"><tbody class="'+ $(el).parents('div').eq(0).attr('id') +'">' +
					'<tr>' +
						'<th class="nowrap" colspan="'+ max +'">'+ (game_data.screen == 'main' ? 'Bauaufträge' : 'Ausbildung') +' &minus; '+ lastReadyQueue +'</th>' +
						'<th style="text-align: center;"><a href="javascript:;" class="dsfa_queue_show">'+ texts.gui.down +'</a></th></tr>' +
						'<tr>'+ HTML +
						'<td>'+ (isBuild ? (extra ? '<img src="'+ image_base +'/gold.png" alt="" title="Zusatzkosten: '+ extra +'%" class="tooltip">' : '') : (cancelAll.length ? '<a href="'+ cancelAll.attr('href') +'"><img src="'+ image_base +'delete.png" alt="x" title=""></a>' : '')) +'</td>' +
					'</tr>' +
				'</tbody></table>'
			).find('a.dsfa_queue_show')[0].addEventListener('click', function() {
				$(this).parents('div').last().find('table').toggle();
				var key = $(this).parents('tbody').eq(0).attr('class');
				if (key) {
					lib.storage.setValue(game_data.village.id +'_queue_'+ key, false);
					Queue._hide[key] = false;
				}
			}, true);
			
			el.find('th').eq(0).append(' <a href="javascript:;" class="dsfa_queue_hide">'+ texts.gui.up +'</a>')
			.find('.dsfa_queue_hide')[0].addEventListener('click', function() {
				$(this).parents('div').last().find('table').toggle();
				var key = $(this).parents('div').eq(0).attr('id');
				if (key) {
					lib.storage.setValue(game_data.village.id +'_queue_'+ key, true);
					Queue._hide[key] = true;
				}
			}, true);
		}
		var hide = this.check_status(el);
	},
	check_status: function(el) {
		var key = el.parents('div').eq(0).attr('id'),
			hide = (key ? this._hide[key] : false);
		if (hide && el.find('th').eq(0).find('.dsfa_queue_hide').length)
			el.find('th').eq(0).find('.dsfa_queue_hide')[0].click();
		return hide;
	},
	refresh: function() {
		window.setTimeout(function() {
			recreateToolTip();
		}, 600);
		
		var serverTime = win.getTime($("#serverTime"));
		timeDiff = serverTime - win.getLocalTime();
		timeStart = serverTime;
		$('.dsfa_timer').each(function() {
			startTime = win.getTime($(this));
			if (startTime != -1)
				win.addTimer($(this), serverTime + startTime, false);
		});
	}
};


/*
 * Filter
 */
Filter = {
	enabled: lib.storage.getValue('filter_enabled', false),
	filter: ["points", "freeFarm"],
	points: {
		enabled: lib.storage.getValue('filter_points_enabled', true),
		inverted: lib.storage.getValue('filter_points_inverted', false),
		val: lib.storage.getValue('filter_points_val', 9000)
	},
	freeFarm: {
		enabled: lib.storage.getValue('filter_freeFarm_enabled', true),
		inverted: lib.storage.getValue('filter_freeFarm_inverted', false),
		val: lib.storage.getValue('filter_freeFarm_val', 0)
	},
	init: function() {
		if (game_data.screen == 'overview_villages' && Settings.get('misc_prodFilterActive')) {
			var el = $('#production_table').length ? '#production_table' : ($('#buildings_table').length ? '#buildings_table' : false);
			if (!el)
				return;
			
			$('<div class="vis_item" style="clear: both;"><input type="checkbox" id="dsfa_filter"'+ (Filter.enabled ? ' checked' : '') +'> <a href="javascript:;">Filter</a></div>').insertBefore(el).find('a')[0].addEventListener('click', function(e) {
				var pos = [$(e.target).offset().left+20, $(e.target).offset().top+20],
				HTML = '<h3>Filtereigenschaften</h3>' +
				'<table>' +
					'<tr>' +
						'<td class="nowrap">Dörfer filtern mit '+ (Filter.points.inverted ? '&gt;' : '&lt;=') +' Punktezahl:</td>' +
						'<td class="nowrap"><input type="text" id="dsfa_pointsFilter" value="'+ Filter.points.val +'"><input type="checkbox" id="dsfa_disablepointsFilter" style="margin-left:2em;"'+ (Filter.points.enabled ? '' : ' checked') +'><span>Deaktivieren</span><input type="checkbox" id="dsfa_invertpointsFilter" style="margin-left:2em;"'+ (Filter.points.inverted ? ' checked' : '') +'><span>Punktefilter umkehren</span></td>' +
					'</tr>' +
					'<tr'+ ($('#buildings_table').length ? ' style="display:none"' : '') +'>' +
						'<td class="nowrap">Dörfer filtern mit '+ (Filter.freeFarm.inverted ? '&gt;' : '&lt;=') +' freiem BH-Platz:</td>' +
						'<td class="nowrap"><input type="text" id="dsfa_freeFarmFilter" value="'+ Filter.freeFarm.val +'"><input type="checkbox" id="dsfa_disablefreeFarmFilter" style="margin-left:2em;"'+ (Filter.freeFarm.enabled ? '' : ' checked') +'><span>Deaktivieren</span><input type="checkbox" id="dsfa_invertfreeFarmFilter" style="margin-left:2em;"'+ (Filter.freeFarm.inverted ? ' checked' : '') +'><span>BH-Filter umkehren</span></td>' +
					'</tr>' +
					'<tr>' +
						'<td colspan="2">&nbsp;</td>' +
					'</tr>' +
					'<tr>' +
						'<td class="nowrap" colspan="2" style="padding-left: 10px;">' +
							'<i>Filtern ab einer Zahl bedeutet, dass alle Dörfer, die mindestens die Eigenschaft (einschließlich) erfüllen, <br>ausgeblendet werden. Sind beide Dörfer aktiv, werden Dörfer gefiltert, für die eine der Eigenschaften zutrifft.</i>' +
						'</td>' +
					'</tr>' +
				'</table>';
				lib.inlinePopup('filter_settings', pos[0], pos[1], HTML, true, 750, 200 );
				
				$('#dsfa_pointsFilter')[0].addEventListener('keyup', function() {
					Filter.points.val = parseInt($(this).val());
					lib.storage.setValue('filter_points_val', Filter.points.val);
					Filter.apply();
				}, false);
				$('#dsfa_disablepointsFilter')[0].addEventListener('change', function() {
					Filter.points.enabled = !$(this).is(':checked');
					lib.storage.setValue('filter_points_enabled', Filter.points.enabled);
					Filter.apply();
				}, false);
				$('#dsfa_invertpointsFilter')[0].addEventListener('change', function() {
					Filter.points.inverted = $(this).is(':checked');
					lib.storage.setValue('filter_points_inverted', Filter.points.inverted);
					Filter.apply();
					
					$(this).parents('td').eq(0).prev().html('Dörfer filtern mit '+ (Filter.points.inverted ? '&gt;' : '&lt;=') +' Punktezahl:');
				}, false);
				
				$('#dsfa_freeFarmFilter')[0].addEventListener('keyup', function() {
					Filter.freeFarm.val = parseInt($(this).val());
					lib.storage.setValue('filter_freeFarm_val', Filter.freeFarm.val);
					Filter.apply();
				}, false);
				$('#dsfa_disablefreeFarmFilter')[0].addEventListener('change', function() {
					Filter.freeFarm.enabled = !$(this).is(':checked');
					lib.storage.setValue('filter_freeFarm_enabled', Filter.freeFarm.enabled);
					Filter.apply();
				}, false);
				$('#dsfa_invertfreeFarmFilter')[0].addEventListener('change', function() {
					Filter.freeFarm.inverted = $(this).is(':checked');
					lib.storage.setValue('filter_freeFarm_inverted', Filter.freeFarm.inverted);
					Filter.apply();
					
					$(this).parents('td').eq(0).prev().html('Dörfer filtern mit '+ (Filter.freeFarm.inverted ? '&gt;' : '&lt;=') +' freiem BH-Platz:');
				}, false);
			});
			
			$('#dsfa_filter')[0].addEventListener('change', function() {
				Filter.enabled = $(this).is(':checked');
				lib.storage.setValue('filter_enabled', Filter.enabled);
				Filter.apply();
			}, false);
			
			this.apply(1);
		}
	},
	apply: function() {
		var el = $('#production_table').length ? '#production_table' : ($('#buildings_table').length ? '#buildings_table' : false),
		pointsIdx = -1,
		farmIdx = $('#buildings_table').length ? -2 : -1;
		if (!el)
			return;
		
		$(el +' tr').eq(0).find('th').each(function(i) {
			if (/order=points/.test($(this).html()))
				pointsIdx = i;
			if (/order=pop/.test($(this).html()))
				farmIdx = i;
		});
		if (pointsIdx == -1 || farmIdx == -1)
			return;
		
		$(el +' tr').slice(1).each(function() {
			if (!$(this).find('td').length)
				return;
			$(this).show();
			if (Filter.enabled) {
				if (Filter.points.enabled) {
					if (!$(this).find('td').eq(pointsIdx).length)
						return;
					var val = parseInt($(this).find('td').eq(pointsIdx).html().remove(/(<[^>]*>)|\.|\s/g), 10);
					if (!Filter.points.inverted && val > Filter.points.val || Filter.points.inverted && val <= Filter.points.val)
						$(this).hide();
				}
				if (Filter.freeFarm.enabled) {
					if (!$(this).find('td').eq(farmIdx).length)
						return;
					var vals = $(this).find('td').eq(farmIdx).html().remove(/(<[^>]*>)|\.|\s/g).split('/'),
					val1 = parseInt(vals[0]),
					val2 = parseInt(vals[1]),
					val = val2 - val1;
					if (!Filter.freeFarm.inverted && val > Filter.freeFarm.val || Filter.freeFarm.inverted && val <= Filter.freeFarm.val)
						$(this).hide();
				}
			}
		});
		
		if ($('#buildings_table').length && Settings.get('misc_buildVariantActive') && !arguments.length) {
			Variant.doVariant('build');
		}
	},
};


/*
 * Update
 */
Update = {
	dsVersion: version.split('-')[0],
	dsVersionNum: parseFloat(version.split('-')[0].remove('.')),
	dataVersion: version.split('-')[1],
	dataVersionNum: parseFloat(version.split('-')[1].remove('.')),
	scriptVersion: version.split('-')[2],
	scriptVersionNum: parseFloat(version.split('-')[2].remove('.')),
	hideScriptWarnings: lib.storage.getValue('hideScriptWarnings', false),
	init: function() {
		if ($('#script_warning').length) {
			$('#script_warning').prepend('<a style="float: right; margin-top: -3px; display: '+ (this.hideScriptWarnings ? 'none' : 'block') +';" href="javascript:;">Einklappen</a><a style="float: right; margin-top: -3px; display: '+ (this.hideScriptWarnings ? 'block' : 'none') +';" href="javascript:;">Ausklappen</a>')
			.find('a')[0].addEventListener('click', function() {
				$('#script_warning').css({ 'height': 8, 'overflow': 'hidden' });
				$('#script_warning a').slice(0, 1).toggle();
				Update.hideScriptWarnings = true;
				lib.storage.setValue('hideScriptWarnings', Update.hideScriptWarnings);
			}, true);
			$('#script_warning').find('a')[1].addEventListener('click', function() {
				$('#script_warning').css({ 'height': '', 'overflow': '' });
				$('#script_warning a').slice(0, 1).toggle();
				Update.hideScriptWarnings = false;
				lib.storage.setValue('hideScriptWarnings', Update.hideScriptWarnings);
			}, true);
			if (this.hideScriptWarnings)
				$('#script_warning').css({ 'height': 8, 'overflow': 'hidden' });
			
			if (parseFloat(game_data.majorVersion.remove('.')) > Update.dsVersionNum) {
				$('#script_list').append('<li>DS-Farmassistent '+ Update.scriptVersion +' <a href="mailto:zorbing@gmx.net">(Autor: Zorbing)</a></li>');
				$('#script_warning').show();
			}
			
			if (lib.storage.getValue('updateAvailable', false)) {
				lib.error(texts.gui.outdatedScript.replace('$1', Update.scriptVersion), 5000);
				$.ajax({
					type: 'GET',
					url: URLBase +'update.php',
					crossDomain: true,
					dataType: 'json',
					success: function(responseData) {
						if (!responseData || !responseData.responseText)
							return;
						
						var scriptVersion_server = parseFloat(responseData.responseText);
						if (parseFloat(Update.scriptVersion) == scriptVersion_server) {
							lib.storage.setValue('updateAvailable', false);
						} else {
							lib.storage.setValue('updateAvailable', true);
						}
					}
				});
				return false;
			}
		}
		
		var data_version = lib.storage.getValue('data_version', '0'),
		data_versionNum = parseFloat(data_version.remove('.'));
		
		// Update der Daten
		if (data_version != '0' && data_version != Update.dataVersion) {
			alert(texts.gui.update.replace('$1', data_version).replace('$2', Update.dataVersion));
			
			// allgemeine Updates
			if (data_versionNum < 32) {
				var sortCol = lib.storage.getValue('FarmSort', '4-0').split('-');
				lib.storage.setValue('FarmSortKey', ['wood', 'stone', 'iron', 'sum', 'distance', 'wall', 'age'][sortCol[0]]);
				lib.storage.setValue('FarmSortDir', (sortCol[1] == '0' ? 1 : -1));
			}
			
			Update.update_config(data_versionNum);
			Update.update_variants(data_versionNum);
			Update.update_reports(data_versionNum);
			Update.update_village(data_versionNum);
			Update.update_coords(data_versionNum);
			Update.update_commands(data_versionNum);
			Update.update_booty(data_versionNum);
			lib.storage.setValue("data_version", Update.dataVersion);
		}
		return true;
	},
	
	/*
	 * Einstellungen
	 */
	update_config: function(data_versionNum, config_data) {
		// true, wenn config_data uebergeben wurde
		var change = config_data && true || false;
		config_data = config_data || Settings._data;
		
		if (data_versionNum < 33) {
			if (config_data.hasOwnProperty('place_farmlistPos')) {
				config_data.place_farmlistOpt = config_data.place_farmlistPos+1;
				delete config_data.place_farmlistPos;
			}
			change = true;
		}
		if (data_versionNum < 34) {
			if (config_data.hasOwnProperty('variants_recruitActive')) {
				config_data.misc_recruitVariantActive = config_data.variants_recruitActive;
				delete config_data.variants_recruitActive;
			}
			if (config_data.hasOwnProperty('variants_buildActive')) {
				config_data.misc_buildVariantActive = config_data.variants_buildActive;
				delete config_data.variants_buildActive;
			}
			if (config_data.hasOwnProperty('variants_enableQueue')) {
				config_data.misc_enableQueue = config_data.variants_enableQueue;
				delete config_data.variants_enableQueue;
			}
			if (config_data.hasOwnProperty('filter_prodActive')) {
				config_data.misc_prodFilterActive = config_data.filter_prodActive;
				delete config_data.filter_prodActive;
			}
			if (config_data.settings_tab == 'variants' || config_data.settings_tab == 'filter')
				config_data.settings_tab = 'general';
			change = true;
		}
		if (data_versionNum < 35) {
			if (config_data.misc_enableQueue)
				config_data.misc_queueOpt = 1;
			else
				config_data.misc_queueOpt = 2;
			delete config_data.misc_enableQueue;
			change = true;
		}
		if (data_versionNum < 36) {
			if (config_data.place_sendRams)
				config_data.place_sendRams = Settings.getStd('place_sendRams');
			else
				config_data.place_sendRams = Settings._deactivated.place_sendRams;
			if (config_data.autoFarm_sendRams)
				config_data.autoFarm_sendRams = Settings.getStd('autoFarm_sendRams');
			else
				config_data.autoFarm_sendRams = Settings._deactivated.autoFarm_sendRams;
			change = true;
		}
		if (data_versionNum < 37) {
			if (typeof(config_data.place_minRes) == "number")
				config_data.place_minRes = [config_data.place_minRes != 0, config_data.place_minRes];
			if (typeof(config_data.place_maxDistance) == "number")
				config_data.place_maxDistance = [config_data.place_maxDistance != 0, config_data.place_maxDistance];
			if (typeof(config_data.place_maxAge) == "number")
				config_data.place_maxAge = [config_data.place_maxAge != 0, config_data.place_maxAge];
			if (typeof(config_data.place_farmSpys) == "number")
				config_data.place_farmSpys = [config_data.place_farmSpys != 0, config_data.place_farmSpys];
			if (typeof(config_data.place_sendRams) == "number")
				config_data.place_sendRams = [config_data.place_sendRams != 0, Settings._deactivated.place_sendRams];
			if (typeof(config_data.autoFarm_minRes) == "number")
				config_data.autoFarm_minRes = [config_data.autoFarm_minRes != 0, config_data.autoFarm_minRes];
			if (typeof(config_data.autoFarm_maxDistance) == "number")
				config_data.autoFarm_maxDistance = [config_data.autoFarm_maxDistance != 0, config_data.autoFarm_maxDistance];
			if (typeof(config_data.autoFarm_maxAge) == "number")
				config_data.autoFarm_maxAge = [config_data.autoFarm_maxAge != 0, config_data.autoFarm_maxAge];
			if (typeof(config_data.autoFarm_farmSpys) == "number")
				config_data.autoFarm_farmSpys = [config_data.autoFarm_farmSpys != 0, config_data.autoFarm_farmSpys];
			if (typeof(config_data.autoFarm_sendRams) == "number")
				config_data.autoFarm_sendRams = [config_data.autoFarm_sendRams != 0, Settings._deactivated.autoFarm_sendRams];
			if (typeof(config_data.overview_showBooty) != "undefined") {
				config_data.misc_overview_showBooty = config_data.overview_showBooty;
				delete config_data.overview_showBooty;
			}
			change = true;
		}
		
		if (change) {
			lib.storage.setValue("config_data", config_data);
			Settings._data = config_data;
		}
	},
	/*
	 * Varianten
	 */
	update_variants: function(data_versionNum, variant_data) {
		var change = variant_data && true || false;
		variant_data = variant_data || Variant._data;
		
		if (data_versionNum < 38) {
			variant_data.build_hide_complete = false;
			variant_data.unit_hide = false;
			change = true;
		}
		
		if (change) {
			Variant._data = variant_data;
			Variant.save(true);
		}
	},
	/*
	 * Berichte
	 */
	update_reports: function(data_versionNum, report_data) {
		var change = report_data && true || false;
		report_data = report_data || Report._data;
		
		/*
		 * report_data (früher report_ids):
		 *  0 = uneingelesen
		 *  1 = veraltet
		 *  2 = normaler Bericht (aktuell)
		 *  3 = Angriffsbericht (aktuell & volle Taschen)
		 *  4 = Angriffsbericht (aktuell & leere Taschen)
		 *  5 = Spähbericht (aktuell & volle Taschen)
		 *  6 = Spähbericht (aktuell & leere Taschen)
		 */
		
		if (99 < data_versionNum && data_versionNum < 214) {
			// 1 -> 2 & 2 -> 1
			//report_ids = 0;	// Was wollte ich damit bezwecken? (report_ids habe ich jetzt überall zu report_data umbenannt)
			for (var key in report_data) {
				if (report_data[key] == 1)
					report_data[key] = 2;
				else if (report_data[key] == 2)
					report_data[key] = 1;
			}
			change = true;
		}
		if (data_versionNum < 26) {
			// für die erbeuteten Rohstoffe
			for (var key in report_data) {
				if (report_data[key] == 3)
					report_data[key] = 4;
				else if (report_data[key] == 4)
					report_data[key] = 6;
			}
			change = true;
		}
		
		if (change) {
			Report._data = report_data;
			Report.save(true);
		}
	},
	/*
	 * Dörfer
	 */
	update_village: function(data_versionNum, village_data) {
		var change = village_data && true || false;
		village_data = village_data || Village._data;
		
		if (99 < data_versionNum && data_versionNum < 224) {
			// der EQ wird überall zurückgesetzt
			for (var key in village_data) {
				village_data[key].eq = 1;
				village_data[key].eqCount = 1;
			}
			change = true;
		}
		
		if (data_versionNum < 29) {
			// loam wurde umbenannt zu clay
			for (var key in village_data) {
				if (typeof(village_data[key].loam) != "undefined") {
					village_data[key].clay = village_data[key].loam;
					delete village_data[key].loam;
					change = true;
				}
			}
		}
		if (data_versionNum < 33) {
			// clay wird zu stone
			// Dörferdaten
			for (var key in village_data) {
				if (!village_data.hasOwnProperty(key))
					continue;
				
				if (village_data[key].hasOwnProperty('clay')) {
					village_data[key].stone = village_data[key].clay;
					delete village_data[key].clay;
				}
				village_data[key].eq = 1;
				village_data[key].eqCount = 0;
			}
			change = true;
		}
		
		if (change) {
			Village._data = village_data;
			Village.save(true);
		}
	},
	/*
	 * Koordinaten
	 */
	update_coords: function(data_versionNum, village_coords) {
		var change = village_coords && true || false;
		village_coords = village_coords || Village._coords;
		
		if (change) {
			Village._coords = village_coords;
			Village.save(true);
		}
	},
	/*
	 * Befehle
	 */
	update_commands: function(data_versionNum, command_data) {
		var change = command_data && true || false;
		command_data = command_data || Command._data;
		
		if (change) {
			Command._data = command_data;
			Command.save(true);
		}
	},
	/*
	 * Beute
	 */
	update_booty: function(data_versionNum, Res) {
		var change = Res && true || false;
		Res = Res || Overview.data.Res;
		
		if (data_versionNum < 30) {
			for (var key in Res) {
				if (typeof(Res[key].loam) != "undefined" ) {
					if (typeof(Res[key].clay) != "undefined")
						Res[key].clay += Res[key].loam;
					else
						Res[key].clay = Res[key].loam;
					delete Res[key].loam;
				}
			}
			change = true;
		}
		if (data_versionNum < 31) {
			Res = lib.storage.getValue('ResBooty', {});
			change = true;
		}
		if (data_versionNum < 33) {
			// Beute
			for (var key in Res) {
				if (Res[key].hasOwnProperty('clay')) {
					Res[key].stone = Res[key].clay;
					delete Res[key].clay;
				}
				if (Res[key].hasOwnProperty('loam')) {
					Res[key].stone = Res[key].loam;
					delete Res[key].loam;
				}
			}
			change = true;
		}
		
		if (change) {
			Overview.data.Res = Res;
			Overview.saveRes();
		}
	},
};


/*
 * Die Klasse für alle Einstellungen
 */
Settings = {
	_change: false,
	_std: {
		general_considerEQ: false,
		general_enableAtUV: false,
		general_enableStorageColorAt: {
			infobar: true,
			production: true,
			market: true,
			place: true,
			map: true,
			info_village: true,
			coin_mint: true
		},
		general_storageColors: {
			0: [0, 255, 0],
			75: [255, 255, 0],
			100: [255, 0, 0]
		},
		place_farmlistOpt: 2,
		place_minRes: [false, 500],
		place_maxDistance: [false, 20],
		place_maxAge: [false, 36],
		place_attackedFarms: 2,
		place_farmSpys: [true, 1],
		place_spyOnlyWithUnits: true,
		place_sendRams: [true, 1],
		place_checksActive: true,
		place_unitPreferences_order: ["light", "spear", "marcher", "heavy", "sword", "axe", "archer", "knight"],
		place_unitPreferences: {
			spear: true,
			sword: true,
			axe: true,
			archer: true,
			light: true,
			marcher: true,
			heavy: true,
			knight: false
		},
		place_sendCatas: false,
		place_buildingPreferences_order: ["wall", "main", "farm", "barracks", "stable", "garage", "church", "church_f", "snob", "smith", "place", "statue", "market", "wood", "stone", "iron", "storage"],
		place_buildingPreferences: {
			main: true,
			barracks: true,
			stable: true,
			garage: true,
			church: true,
			church_f: true,
			snob: true,
			smith: true,
			place: true,
			statue: true,
			market: true,
			wood: false,
			stone: false,
			iron: false,
			farm: true,
			storage: false,
			wall: true
		},
		map_integrateInfos: true,
		map_overlaysActive: true,
		reports_showSearchInput: true,
		reports_changeLinkStyle: true,
		reports_newReport: 'red',
		reports_readReport: 'green',
		reports_spyReport: 'green',
		reports_oldReport: 'yellow',
		reports_reorder: true,
		autoFarm_active: false,
		autoFarm_farmOver: 0,
		autoFarm_farm_Assistent_click: 0,
		autoFarm_minRes: [false, 500],
		autoFarm_maxDistance: [false, 20],
		autoFarm_minPop: [false, 30],
		autoFarm_farmSpys: [true, 1],
		autoFarm_sendRams: [true, 1],
		autoFarm_farmWith: 0,
		autoFarm_units_order: ["light", "spear", "marcher", "heavy", "sword", "axe", "archer", "knight"],
		autoFarm_units: {
			spear: [true, 0],
			sword: [true, 0],
			axe: [true, 0],
			archer: [true, 0],
			light: [true, 0],
			marcher: [true, 0],
			heavy: [true, 0],
			knight: [false, 0]
		},
		paFeatures_freePA: true,
		paFeatures_fileSite: 0,
		paFeatures_showStats: true,
		paFeatures_farmAssistent: true,
		paFeatures_farmAssistent_minRes: [false, 500],
		hotkeys_active: true,
		hotkeys_note: true,
		misc_overview_showBooty: true,
		misc_recruitVariantActive: true,
		misc_buildVariantActive: true,
		misc_queueOpt: 2,
		misc_prodRecruit: true,
		misc_cutProd: true,
		misc_prodFilterActive: true,
		misc_fixQuickbar: false,
		misc_fixInfobar: false,
		misc_enableConfirm: true,
		farmlistState: 0,
		settings_tab: 'general'
	},
	_data: lib.storage.getValue('config_data', $.extend({}, this._std)),
	_deactivated: {
		place_minRes: 1,
		place_maxDistance: 1,
		place_maxAge: 1,
		place_farmSpys: 1,
		place_sendRams: 1,
		autoFarm_minRes: 1,
		autoFarm_maxDistance: 1,
		autoFarm_minPop: 1,
		autoFarm_farmSpys: 1,
		autoFarm_sendRams: 1,
		paFeatures_farmAssistent_minRes: 1,
	},
	_style: null,
	// _inkColorBar(id, colors)
	_inkColorBar: function(id, colors) {
		id = '#dsfa_'+ id +'ColorBar_color';
		var diff = 1,
		num1 = 0,
		num2 = 0,
		line2 = '';
		for (var i = 0; i < 101; i++) {
			var color = [
				colors[num1][0] + Math.round( (colors[num2][0] - colors[num1][0]) / diff * (i - num1) ),
				colors[num1][1] + Math.round( (colors[num2][1] - colors[num1][1]) / diff * (i - num1) ),
				colors[num1][2] + Math.round( (colors[num2][2] - colors[num1][2]) / diff * (i - num1) )
			];
			$(id + i).css('background-color', 'rgb('+ color.toString() +')');
			if (colors[i]) {
				num1 = i;
				for (var j = i+1; j < 101 && !colors[j]; j++);
				num2 = j;
				diff = num2-num1;
			}
		}
	},
	// buildingPoints
	buildingPoints: {
		main: 10,
		barracks: 16,
		stable: 20,
		garage: 24,
		church: 10,
		church_f: 10,
		snob: 512,
		smith: 19,
		place: 0,
		statue: 24,
		market: 10,
		wood: 6,
		stone: 6,
		iron: 6,
		farm: 5,
		storage: 6,
		hide: 5,
		wall: 8
	},
	boni: { none: 0, wood: 1, stone: 2, iron: 3, farm: 4, barracks: 5, stable: 6, garage: 7, all: 8, storage: 9 },
	catasNeeded: {
		destroy: [0, 2, 6, 10, 15, 21, 28, 36, 45, 56, 68, 82, 98, 115, 136, 159, 185, 215, 248, 286, 328, 376, 430, 490, 558, 634, 720, 815, 922, 1041, 1175],
		reduce: [0, 2, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 6, 6, 6, 7, 8, 8, 9, 10, 10, 11, 12, 13, 15, 16, 17, 19, 20]
	},
	ramsNeeded: {
		destroy: [0, 2, 4, 7, 10, 14, 19, 24, 30, 37, 46, 55, 65, 77, 91, 106, 124, 143, 166, 191, 219],
		reduce: [0, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 6, 6]
	},
	// save()
	save: function() {
		if (this._change || arguments.length > 0 && arguments[0]===true) {
			lib.storage.setValue("config_data", this._data);
			this._change = false;
			return true;
		}
		return false;
	},
	// get(name)
	get: function(name) {
		var match = name.match(/^(.+)\[(.+)\]$/);
		if (match) {	// verschachtelt
			var name = match[1], sub = match[2];
			if (!this._data.hasOwnProperty(name)) {
				if (!this._std.hasOwnProperty(name))
					return null;
				
				this._data[name] = this._std[name];
				this.save(true);
			}
			if (!this._data[name].hasOwnProperty(sub) ) {
				if (!this._std[name].hasOwnProperty(sub))
					return null;
				
				this._data[name][sub] = this._std[name][sub];
				this.save(true);
			}
			return this._data[name][sub];
		}
		if (!this._data.hasOwnProperty(name)) {
			if (!this._std.hasOwnProperty(name))
				return null;
			
			this._data[name] = this._std[name];
			this.save(true);
		}
		if (!this._std.hasOwnProperty(name))
				return null;
		
		return this._data[name];
	},
	// getStd(name)
	getStd: function(name) {
		var match = name.match(/^(.+)\[(.+)\]$/);
		if (match) {	// verschachtelt
			var name = match[1], sub = match[2];
			if (!this._std.hasOwnProperty(name) || !this._std[name].hasOwnProperty(sub))
				return null;
			
			return this._std[name][sub];
		}
		if (!this._std.hasOwnProperty(name))
			return null;
		
		return this._std[name];
	},
	// set(name, value)
	set: function(name, value) {
		var match = name.match(/^(.+)\[(.+)\]$/);
		if (match) {	// verschachtelt
			var name = match[1], sub = match[2];
			if (!this._std.hasOwnProperty(name) || !this._std[name].hasOwnProperty(sub))
				return false;
			
			this._data[name][sub] = value;
		} else {
			if (!this._std.hasOwnProperty(name))
				return false;
			
			this._data[name] = value;
		}
		return this.save(true);
	},
	// setStd(name)
	setStd: function(name) {
		var match = name.match(/^(.+)\[(.+)\]$/);
		if (match) {	// verschachtelt
			var name = match[1], sub = match[2];
			if (!this._std.hasOwnProperty(name) || !this._std[name].hasOwnProperty(sub))
				return false;
			
			if (!this._data.hasOwnProperty(name))
				this._data[name] = this._std[name];
			else
				this._data[name][sub] = this._std[name][sub];
		} else {
			if (!this._std.hasOwnProperty(name))
				return false;
			this._data[name] = this._std[name];
		}
		return this.save(true);
	},
	// init()
	init: function() {
		if (this.get('misc_fixQuickbar') && $('#quickbar_outer').length)
			Settings.fixBar('Quick', 'quickbar_outer');
		if (this.get('misc_fixInfobar'))
			Settings.fixBar('Info', 'header_info');
		
		$('<style type="text/css">' +
			'.preference_table td { padding: 1px !important; }' +
			'.preference_table td, .preference_table th { text-align: center; vertical-align: middle; }' +
			'.bqhandle { width: 11px; height: 11px; background-image: url('+ image_base +'sorthandle.png); cursor: pointer; }' +
		'</style>').appendTo('head');
		
		// in das Menü integrieren
		var href = 'javascript:;';
		if (game_data.screen == 'settings' && game_data.mode == 'settings')
			href = '#dsfaSettingsTable';
		var icon = $(
			'<td>' +
				'<a id="dsfa_settings_link" href="'+ href +'" class="manager_icon" style="background-image:url(\'http://www.tribalwarsmap.com/favicon.ico\');" href="javascript:;" title="'+ texts.gui.title +' '+ texts.gui.settings.settings +'">&nbsp;</a>' +
			'</td>'
		).insertAfter($('td.menu-item').eq(6));
		if (!(game_data.screen == 'settings' && game_data.mode == 'settings')) {
			$('#dsfa_settings_link')[0].addEventListener('click', function() {
				Settings.tabs_init(true);
			}, true);
		}
		
		if (Settings.get('general_enableAtUV') || !UVActive) {
			if (game_data.screen == 'place' && $('#units_form').length > 0) {
				this.placeForm();
			}
		}
		if (game_data.screen == 'settings' && game_data.mode == 'settings') {
			this.tabs_init();
		}
	},
	// fixBar(setting, id)
	fixBar: function(setting, id) {
		if (!Settings.get('misc_fix'+ setting +'bar'))
			return;
		var el = $('#'+ id +'_dummy'),
		noDummy = !el.length;
		if (noDummy)
			el = $('#' + id);
		$('#' + id).css({
			position: 'fixed',
			left: el.offset().left,
			top: el.offset().top,
			width: el.width(),
			zIndex: 100
		});
		if (noDummy)
			$('<div id="'+ id +'_dummy" style="width: 100%; height: '+ el.height() +'px;"></div>').insertBefore(el);
		window.setTimeout(function() {
			Settings.fixBar(setting, id);
		}, 1000);
	},
	// defixBar(id)
	defixBar: function(id) {
		if (!$('#'+ id +'_dummy').length)
			return;
		$('#' + id).css({
			position: '',
			left: '',
			top: '',
			width: '100%',
			zIndex: ''
		});
		$('#'+ id +'_dummy').remove();
	},
	// placeForm()
	placeForm: function() {
		if (!this._data.place_checksActive)
			return;
		
		if (Bot.autoFarmActive) {
			var unit_active = $.extend({}, this.get('autoFarm_units'), {
				spy: [this.get('autoFarm_farmSpys')[0], 0],
				ram: [this.get('autoFarm_sendRams')[0], 0]
			}),
			titles = {
				spy: function() {
					if (Settings.get('autoFarm_farmSpys')[0])
						return texts.gui.settings.autoFarm.farmSpys.join(' '+ Settings.get('autoFarm_farmSpys')[1]);
					return '';
				},
				ram: function() {
					if (Settings.get('autoFarm_sendRams')[0])
						return texts.gui.settings.autoFarm.sendRams.join(' '+ Settings.get('autoFarm_sendRams')[1]);
					return '';
				}
			};
			
			for (var key in unit_active)
				unit_active[key] = unit_active[key][0];
		} else {
			var unit_active = $.extend({}, this.get('place_unitPreferences'), {
				spy: this.get('place_farmSpys')[0],
				ram: this.get('place_sendRams')[0],
				catapult: this.get('place_sendCatas')
			}),
			titles = {
				spy: function() {
					if (Settings.get('place_farmSpys')[0])
						return texts.gui.settings.place.farmSpys.join(' '+ Settings.get('place_farmSpys')[1]);
					return '';
				},
				ram: function() {
					if (Settings.get('place_sendRams')[0])
						return texts.gui.settings.place.sendRams.join(' '+ Settings.get('place_sendRams')[1]);
					return '';
				}
			};
		}
		
		for (var unit in lib.unitInfo) {
			var input = $('#unit_input_'+ unit);
			if (input.length < 1)
				continue;
			input.parent().prepend('<input type="checkbox"> ');
			var checkbox = input.parent().find('input[type="checkbox"]').eq(0);
			if (titles[unit])
				checkbox.attr('title', titles[unit]());
			checkbox.attr('checked', unit_active[unit]);
			if (unit_active.hasOwnProperty(unit)) {
				checkbox[0].addEventListener('click', function() {
					var match = $(this).parent().find('input.unitsInput').attr('id').match(/unit_input_(.+)/);
					if (!match)
						return;
					var unit = match[1];
					if (Bot.autoFarmActive) {
						if (unit == 'spy')
							Settings.set('autoFarm_farmSpys', [$(this).is(':checked'), Settings.get('autoFarm_farmSpys')[1]]);
						else if (unit == 'ram')
							Settings.set('autoFarm_sendRams', [$(this).is(':checked'), Settings.get('autoFarm_sendRams')[1]]);
						else
							Settings.set('autoFarm_units['+ unit +']', [$(this).is(':checked'), Settings.get('autoFarm_units['+ unit +']', [0, 0])[1]]);
					} else {
						if (unit == 'spy')
							Settings.set('place_farmSpys', [$(this).is(':checked'), Settings.get('place_farmSpys')[1]]);
						else if (unit == 'ram')
							Settings.set('place_sendRams', [$(this).is(':checked'), Settings.get('place_sendRams')[1]]);
						else if (unit == 'catapult')
							Settings.set('place_sendCatas', $(this).is(':checked'));
						else
							Settings.set('place_unitPreferences['+ unit +']', $(this).is(':checked'));
					}
					Settings.colorInput( $('#unit_input_'+ unit) );
					
					if (titles[unit])
						$(this).attr('title', titles[unit]());
				}, false);
			} else
				checkbox.attr('disabled', true);
			
			this.colorInput( input );
		}
	},
	// colorInput(el)
	colorInput: function(el) {
		var checkbox = el.parent().find('input[type="checkbox"]').eq(0),
		checkboxDisabled = checkbox.is(':disabled'),
		disabled = /\(0\)/.test( el.parent().find('a').last().html() ),
		checked = checkbox.is(':checked');
		if (disabled) {
			el.css({
				'background-color': 'rgb(207, 207, 207)',
				'border': '1px solid rgb(128, 128, 128)'
			});
		} else if (!checkboxDisabled && checked) {
			el.css({
				'background-color': 'rgb(214, 255, 91)',
				'border': '1px solid rgb(0, 128, 0)'
			});
		} else if (!checkboxDisabled) {
			el.css({
				'background-color': 'rgb(255, 188, 158)',
				'border': '1px solid rgb(255, 0, 0)'
			});
		}
	},
	// createCheckbox(id, checked)
	createCheckbox: function(id, checked) {
		return '<input type="checkbox" '+ (id ? 'id="'+ id +'"' : '') + (checked ? ' checked' : '') +'>';
	},
	// createInput(id, value, style, other)
	createInput: function(id, value, style, other) {
		return '<input type="text" '+ (id ? 'id="'+ id +'"' : '') +' value="'+ value +'" style="border: 1px solid grey; '+ (style ? style : '') +'" '+ (other ? other : '') +'>';
	},
	// createSelect(id, options, selectedIdx, style, other)
	createSelect: function(id, options, selectedIdx, style, other) {
		var ret = '<select '+ (id ? 'id="'+ id +'"' : '') +' style="border: 1px solid grey; '+ (style ? style : '') +'" '+ (other ? other : '') +'>';
		for (var i = 0, max = options.length; i < max; i++) {
			ret += '<option' + (selectedIdx == i ? ' selected' : '') + '>'+ options[i] +'</option>';
		}
		ret += '</select>';
		return ret;
	},
	// crreateSettingsTab(tab)
	createSettingsTab: function(tab) {
		var HTML = '<table class="vis" style="width: 100%; display: '+ (this.get('settings_tab') == tab ? 'block' : 'none') +';" id="dsfa_'+ tab +'_tab"><tbody style="width: 100%;">';
		for (var option in texts.gui.settings[tab]) {
			var content = texts.gui.settings[tab][option],
			key = tab +'_'+ option;
			if (is_array(content)) {
				if (content.length == 1) {
					HTML += '<tr><td style="text-align: right; width: 1px;">'+ content[0] +':</td><td>'+ this.createCheckbox('dsfa_'+ key, this.get(key)) +'</td></tr>';
				} else {
					if (typeof(content[1]) == "string") {
						var val = this.get(key),
						std = '';
						if (this._deactivated[key]) {
							if (typeof(val) === "undefined") {
								throw("val = this.get(key='"+ key +"') is null");
							} else if (!val.length) {
								throw("val = this.get(key='"+ key +"') is empty: []");
							}
							std = '<span style="margin-left: 20px;">'+ this.createCheckbox('dsfa_'+ key +'_active', val[0]) +' '+ texts.gui.settings.disable +'</span>' +
								' <span class="grey" style="font-size: 90%; margin-left: 5px;">' +
									'('+ texts.gui.settings.standard +' = <a href="javascript:(function(){$(\'#dsfa_'+ key +'\').val('+ this.getStd(key)[1] +')})()">'+ this.getStd(key)[1] +'</a>)' +
								'</span>';
							val = val[1];
						}
						
						HTML += '<tr>' +
								'<td style="text-align: right; width: 1px;">'+ content[0] +':</td>' +
								'<td>'+ this.createInput('dsfa_'+ key, val, content[2], content[3]) + content[1] + std +'</td>' +
							'</tr>';
					} else if (is_array(content[1])) {
						HTML += '<tr><td style="text-align: right; width: 1px;">'+ content[0] +':</td><td>'+ this.createSelect('dsfa_'+ key, content[1], this.get(key), content[2], content[3]) +'</td></tr>';
					} else if (typeof(content[1]) == "object") {
						if (Settings.hasOwnProperty('make_'+ key))
							HTML += eval('Settings.make_'+ key +'(content)');
					}
				}
			} else if (typeof(content) == "string") {
				HTML += content;
			}
		}
		HTML += '</tbody></table>';
		return HTML;
	},
	// appendStyle(newContent)
	appendStyle: function(newContent) {
		this._style.html( this._style.html() + newContent );
	},
	maxHeight: 0,
	// tabs_init()
	tabs_init: function(popup) {
		if (!popup) {
			var settingsTD = $('#content_value h3:contains('+ texts.gui.settings.settings +')').parent();
			if (!settingsTD.length)
				return;
		}
		
		this._style = $(
			'<style type="text/css">' +
				'#dsfaSettingsTable > tr > td > a:hover { background-color: #FFF4CC; }' +
			'</style>'
		).appendTo('head');
		
		var HTML = (popup ? '' : '<br>') +
		'<table class="vis settings" style="width: 100%"><tbody id="dsfaSettingsTable">' +
		// Titel
		(popup ? '' :
		'<tr><th><table style="width: 100%;"><tr>' +
		'<td style="width: 34%; text-align: left; background-color: transparent;">'+ texts.gui.title +' '+ Update.scriptVersion +'</td>' +
		'<td style="width: 33%; text-align: center; background-color: transparent;">'+ texts.gui.dsVersion +' '+ Update.dsVersion +'</td>' +
		'<td style="width: 33%; text-align: right; background-color: transparent;">'+ texts.gui.dataVersion +' '+ Update.dataVersion +'</td>' +
		'</tr></table></th></tr>') +
		// Tabs
		'<tr><td class="nowrap" style="text-align: center;">',
		tabHTML = '';
		for (var tab in texts.gui.settings.titles) {
			HTML += '<a href="javascript:;" id="dsfa_'+ tab +'" style="padding: 0 10px;"'+ (this.get('settings_tab') == tab ? ' class="selected"' : '') +'>'+ texts.gui.settings.titles[tab] +'</a>';
			tabHTML += this.createSettingsTab(tab);
		}
		var match = texts.gui.settings.titles[this.get('settings_tab')].match(/title="([^"]+)"/);
		HTML += '</td></tr>' +
		// Tab-Titel
		'<tr><th id="dsfa_tabtitle">'+ (match ? match[1] : texts.gui.settings.titles[this.get('settings_tab')]) +':</th></tr>' +
		// Tab-Inhalte
		'<tr><td class="nowrap" id="dsfa_container">'+ tabHTML +'</td></tr>' +
		'<tr id="dsfa_spacer" style="overflow: hidden; height: 0px;"></tr>' +
		'<tr><th>' +
			'<input type="button" style="float: left;" id="dsfaSettingsSave" value="'+ texts.gui.settings.save + (popup ? ' & '+ texts.gui.close : '') +'">' +
			'<input type="button" style="float: left;" id="dsfaExport" value="'+ texts.gui.settings.export.button +'">' +
			'<input type="button" style="float: left;" id="dsfaImport" value="'+ texts.gui.settings.import.button +'">' +
			'<input type="button" style="float: left;" id="dsfaReset" value="'+ texts.gui.settings.reset.button +'">' +
			'<a href="http://www.fileface.de/" target="_blank" style="float: left; margin: 2px 10px;">» Wiki</a>' +
			'<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=FTRBXRLMYW5JL" target="_blank" style="float: left; margin-left: 6px; height: 21px;"><img src="http://www.paypal.com/'+ texts.lang +'/i/btn/btn_donate_SM.gif" alt="Donate" title=""></a>' +
		'</th></tr>' +
		'</tbody></table>';
		
		if (popup) {
			var settingsPopup = new lib.Popup('settings', texts.gui.title +' '+ Update.scriptVersion, true, null, null, HTML, true);
			$('#dsfaSettingsTable').parents('table').last().find('th').eq(0).attr('title',
				texts.gui.title +' '+ Update.scriptVersion +'\n' +
				texts.gui.dsVersion +' '+ Update.dsVersion +'\n' +
				texts.gui.dataVersion +' '+ Update.dataVersion
			);
		} else
			settingsTD.append(HTML);
		
		// Klick auf einen Tab-Link
		var linkIdx = popup ? 0 : 1;
		$('#dsfaSettingsTable > tr').eq(linkIdx).find('td').eq(0).find('a').each(function() {
			this.addEventListener('click', function() {
				this.blur();
				if ($(this).find('span').length) {
					$('#dsfa_tabtitle').html($(this).find('span').attr('title') +':');
				} else {
					$('#dsfa_tabtitle').html($(this).html() +':');
				}
				$('#dsfa_container>table').each(function() {
					$(this).hide();
				});
				$('#'+ this.id +'_tab').show();
				$(this).parent().find('a').each(function() {
					$(this).removeClass('selected');
				});
				$(this).addClass('selected');
				
				Settings.set('settings_tab', this.id.remove('dsfa_'));
				
				var spacerHeight = Settings.maxHeight - $('#'+ this.id +'_tab').height();
				if (spacerHeight < 0) {
					spacerHeight = 0;
					Settings.maxHeight = $('#'+ this.id +'_tab').height();
				}
				$('#dsfa_spacer').css('height', spacerHeight);
				if (!popup)
					$(document).scrollTop($("#dsfaSettingsTable").offset().top - ($('.top_bar').css('position') == 'fixed' ? 57 : 0));
			}, true);
		});
		
		$('#dsfaSettingsTable input[type=text]').each(function() {
			if ($(this).parent().find('input').length > 1) {
				$(this).change(function() {
					var val = parseInt($(this).val()),
					key = $(this).attr('id').match(/dsfa_(.+)/)[1];
					if (typeof(Settings._deactivated[key]) == "number" && (val === 0 || isNaN(val)))
						$(this).val( Settings._deactivated[key] );
				});
			}
		});
		
		// Alle Events etc. binden:
		for (var tab in texts.gui.settings.titles) {
			if (Settings.hasOwnProperty('attach_'+ tab))
				eval('Settings.attach_'+ tab +'()');
		}
		
		// Nachdem alle Inhalte gefüllt wurden (teilweise durch attach_...) dafür sorgen, dass die Navigation nicht immer springt:
		var widths = [],
		heights = [],
		actHeight = 0;
		$('#dsfa_container>table').each(function() {
			var isHidden = $(this).is(':hidden');
			if (isHidden)
				$(this).show();
			widths.push($(this).width());
			heights.push($(this).height());
			if (isHidden)
				$(this).hide();
			else
				actHeight = $(this).height();
		});
		var shownTab,
		isHotkeysHidden = $('#dsfa_hotkeys_tab').is(':hidden');
		if (isHotkeysHidden) {
			shownTab = $('#dsfa_container>table:visible');
			shownTab.hide();
			$('#dsfa_hotkeys_tab').show();
		}
		$('#dsfa_hotkeys_container>table').each(function() {
			var isHidden = $(this).is(':hidden');
			if (isHidden)
				$(this).show();
			widths.push($('#dsfa_hotkeys_tab').width());
			heights.push($('#dsfa_hotkeys_tab').height());
			if (isHidden)
				$(this).hide();
			else if (!isHotkeysHidden)
				actHeight = $('#dsfa_hotkeys_tab').height();
		});
		if (isHotkeysHidden) {
			$('#dsfa_hotkeys_tab').hide();
			shownTab.show();
		}
		Array.prototype.max = function() {
			return Math.max.apply(null, this)
		};
		maxWidth = Math.max.apply(null, widths);
		$('#dsfa_container').css('min-width', maxWidth);
		
		Settings.maxHeight = Math.max.apply(null, heights);
		var spacerHeight = Math.max(Settings.maxHeight - actHeight, 0);
		$('#dsfa_spacer').css('height', spacerHeight);
		if (popup)
			settingsPopup.setSize();
		
		window.setTimeout(function() {
			recreateToolTip();
		}, 500);
		
		/*
		 * Alles speichern
		 */
		$('#dsfaSettingsSave')[0].addEventListener('click', function() {
			var fail = false;
			for (var tab in texts.gui.settings.titles) {
				for (var option in texts.gui.settings[tab]) {
					var content = texts.gui.settings[tab][option],
					key = tab +'_'+ option;
					if (is_array(content)) {
						if (content.length == 1) {
							Settings.set(key, $('#dsfa_'+ key).is(':checked'));
						} else {
							if (typeof(content[1]) == "string") {
								var val = [$('#dsfa_'+ key +'_active').is(':checked'), $('#dsfa_'+ key).val()];
								if (typeof(Settings.getStd(key)[1]) == "number") {
									try {
										val[1] = parseInt(val[1], 10);
									} catch(e) {
										val[1] = Settings.getStd(key)[1];
									}
								}
								Settings.set(key, val);
							} else if (is_array(content[1])) {
								Settings.set(key, $('#dsfa_'+ key)[0].selectedIndex);
							} else if (typeof(content[1]) == "object") {
								if (Settings.hasOwnProperty('save_'+ key))
									fail = !eval('Settings.save_'+ key +'()') || fail;
							}
						}
					}
				}
			}
			
			if (!fail)
				lib.success('Gespeichert!');
			
			if (!fail && popup) {
				$('.popup_shadow_style').fadeOut(400, function() {
					location.reload();
				});
			}
		}, true);
		
		/*
		 * Daten exportieren
		 */
		$('#dsfaExport')[0].addEventListener('click', function() {
			var alreadyAttached = $('#dsfa_export').length,
			HTML = '<h3>'+ texts.gui.settings.export.title +'</h3>' +
			'<table style="margin: 5px 10px;"><tbody>' +
				'<tr><td><input type="checkbox" id="dsfa_export_config"></td><td>'+ texts.gui.settings.port.config +'</td></tr>' +
				'<tr><td><input type="checkbox" id="dsfa_export_variants"></td><td>'+ texts.gui.settings.port.variants +'</td></tr>' +
				'<tr><td rowspan="3"><input type="checkbox" id="dsfa_export_reports_villages_coords"></td><td style="border-top: 1px dashed black; padding-left: 4px;">'+ texts.gui.settings.port.reports +'</td></tr>' +
				'<tr><td style="padding-left: 5px;">'+ texts.gui.settings.port.villages +'</td></tr>' +
				'<tr><td style="border-bottom: 1px dashed black; padding-left: 4px;">'+ texts.gui.settings.port.coords +'</td></tr>' +
				'<tr><td><input type="checkbox" id="dsfa_export_commands"></td><td>'+ texts.gui.settings.port.commands +'</td></tr>' +
				'<tr><td><input type="checkbox" id="dsfa_export_booty"></td><td>'+ texts.gui.settings.port.booty +'</td></tr>' +
				'<tr><th colspan="2" style="padding-top: 2px;"></th></tr>' +
				'<tr><td><input type="checkbox" id="dsfa_export_all"></td><td><i>'+ texts.gui.settings.export.all +'</i></td></tr>' +
				'<tr><td colspan="2" style="padding-top: 8px;"></td></tr>' +
				'<tr><td></td><td><input id="dsfa_export_button" type="button" value="'+ texts.gui.settings.export.button +'" style="padding: 2px 4px;"></td></tr>' +
				'<tr><td colspan="2">' +
					'<label for="dsfa_export_code">'+ texts.gui.settings.export.code +':</label>' +
					Settings.createInput('dsfa_export_code', '', '', 'readonly="readonly"') +
				'</td></tr>' +
			'</tbody></table>';
			lib.inlinePopup('dsfa_export', $(this).offset().left, 300, HTML, true, 'auto', 'auto');
			$('#inline_popup_main').css({ height: 'auto', width: 'auto' });
			$('#inline_popup').offset({ top: $(this).offset().top - $('#inline_popup').outerHeight() - 2 });
			
			if (alreadyAttached)
				return;
			
			$('#dsfa_export_all').click(function() {
				var check = $(this).is(':checked');
				$(this).parents('table').eq(0).find('input[type=checkbox]').each(function() {
					if ($(this).attr('id') != 'dsfa_export_all')
						$(this).attr('checked', check);
				});
			});
			$('#dsfa_export_button')[0].addEventListener('click', function() {
				$('body').append('<img id="dsfa_export_loading" src="'+ image_base +'throbber.gif" alt="" style="position: fixed;">');
				$('#dsfa_export_loading').css({
					left: Math.floor(($('body').width() - $('#dsfa_export_loading').width()) / 2),
					top: Math.floor(($('body').height() - $('#dsfa_export_loading').height()) / 2)
				});
				$('#dsfa_export_button').attr('disabled', true);
				
				var val = '';
				if ($('#dsfa_export_config').is(':checked'))
					val += 'config['+ Update.dataVersion +']='+ JSON.stringify(Settings._data) +'\n';
				if ($('#dsfa_export_variants').is(':checked'))
					val += 'variants['+ Update.dataVersion +']='+ JSON.stringify(Variant._data) +'\n';
				if ($('#dsfa_export_reports_villages_coords').is(':checked'))
					val += 'reports['+ Update.dataVersion +']='+ JSON.stringify(Report._data)  +'\n' +
						'villages['+ Update.dataVersion +']='+ JSON.stringify(Village._data)   +'\n' +
						'coords['+ Update.dataVersion +']='+ JSON.stringify(Village._coords)  +'\n';
				if ($('#dsfa_export_commands').is(':checked'))
					val += 'commands['+ Update.dataVersion +']='+ JSON.stringify(Command._data) +'\n';
				if ($('#dsfa_export_booty').is(':checked'))
					val += 'booty['+ Update.dataVersion +']='+ JSON.stringify( Overview.data.Res ) +'\n';
				
				$.ajax({
					type: 'POST',
					url: URLBase +'export.php',
					crossDomain: true,
					data: { data: val, world: game_data.world },
					dataType: 'json',
					success: function(responseData, textStatus, jqXHR) {
						$('#dsfa_export_loading').remove();
						$('#dsfa_export_button').attr('disabled', false);
						
						lib.success(texts.gui.settings.export.success);
						$('#dsfa_export_code').val(responseData).select();
					},
					error: function (responseData, textStatus, errorThrown) {
						$('#dsfa_export_loading').remove();
						$('#dsfa_export_button').attr('disabled', false);
						
						lib.error(texts.gui.settings.export.error);
						lib.debug.log('Response: '+ responseData.responseText, 'Error: '+ textStatus, errorThrown);
					}
				});
			}, true);
		}, true);
		
		/*
		 * Daten importieren
		 */
		$('#dsfaImport')[0].addEventListener('click', function() {
			var alreadyAttached = $('#dsfa_import').length;
			var HTML = '<h3>'+ texts.gui.settings.import.title +'</h3>' +
			'<table style="margin: 5px 10px;"><tbody>';
			
			for (var type in texts.gui.settings.port) {
				HTML += '<tr><td><input type="checkbox" id="dsfa_import_'+ type +'" disabled></td><td>'+ texts.gui.settings.port[type] +'</td></tr>';
			}
			HTML += '<tr><th colspan="2" style="padding-top: 2px;"></th></tr>' +
				'<tr>' +
					'<td><label for="dsfa_import_code">'+ texts.gui.settings.import.code +':</label></td>' +
					'<td>'+ Settings.createInput('dsfa_import_code', '') +'</td>' +
				'</tr>' +
				'<tr><td></td><td><input id="dsfa_import_button" type="button" value="'+ texts.gui.settings.import.button +'" style="padding: 2px 4px;"></td></tr>' +
			'</tbody></table>';
			lib.inlinePopup('dsfa_import', $(this).offset().left, 0, HTML, true, 'auto', 'auto');
			$('#inline_popup_main').css({ height: 'auto', width: 'auto' });
			$('#inline_popup').offset({ top: $(this).offset().top - $('#inline_popup').outerHeight() - 2 });
			
			$('#dsfa_import_text').select();
			
			if (alreadyAttached)
				return;
			
			$('#dsfa_import_button')[0].addEventListener('click', function() {
				$('body').append('<img id="dsfa_import_loading" src="'+ image_base +'throbber.gif" alt="" style="position: fixed;">');
				$('#dsfa_import_loading').css({
					left: Math.floor(($('body').width() - $('#dsfa_import_loading').width()) / 2),
					top: Math.floor(($('body').height() - $('#dsfa_import_loading').height()) / 2)
				});
				$('#dsfa_import_button').attr('disabled', true);
				
				$.ajax({
					type: 'POST',
					url: URLBase +'import.php',
					crossDomain: true,
					data: { code: $('#dsfa_import_code').val() },
					dataType: 'text',
					success: function(responseData, textStatus, jqXHR) {
						setTimeout(function() {
							var vals = responseData.split('\n'),
							success = true;
							for (var i = 0, max = vals.length; i < max; i++) {
								if (vals[i] == '')
									continue;
								var match = vals[i].split('=')[0].match(/(\w+)\[([\d\.]+)\]/),
								val = vals[i].split('=')[1];
								if (!match) {
									lib.error(texts.gui.settings.import.error);
									return;
								}
								try {
									var type = match[1],
									data_versionNum = parseInt( match[2].remove(/[^\d]/g), 10 ),
									val = JSON.parse(val);
								} catch(e) {
									lib.debug.log(match, val);
									$('#dsfa_import_'+ type).parent().next().css({ 'color': 'red', 'font-weight': 'bold' });
									success = false;
									continue;
								}
								
								if (type == 'config')
									Update.update_config(data_versionNum, val);
								if (type == 'variants')
									Update.update_variants(data_versionNum, val);
								if (type == 'reports')
									Update.update_reports(data_versionNum, val);
								if (type == 'villages')
									Update.update_village(data_versionNum, val);
								if (type == 'coords')
									Update.update_coords(data_versionNum, val);
								if (type == 'commands')
									Update.update_commands(data_versionNum, val);
								if (type == 'booty')
									Update.update_booty(data_versionNum, val);
								
								if (texts.gui.settings.port[type]) {
									$('#dsfa_import_'+ type).attr('checked', true);
									$('#dsfa_import_'+ type).parent().next().css({ 'color': 'green', 'font-weight': '' });
								}
							}
							if (success) {
								lib.success(texts.gui.settings.import.success);
								
								$('#dsfa_import_loading').remove();
								$('#dsfa_import_button').attr('disabled', false);
								$('#dsfa_import_code').val('');
							} else
								lib.error(texts.gui.settings.import.error);
						}, 0);
					},
					error: function (responseData, textStatus, errorThrown) {
						lib.debug.log('Response: '+ responseData.responseText, 'Error: '+ textStatus, errorThrown);
						$('#dsfa_import_loading').remove();
						
						lib.error(texts.gui.settings.import.error);
					}
				});
			}, true);
		}, true);
		
		/*
		 * Daten zurücksetzen
		 */
		$('#dsfaReset')[0].addEventListener('click', function() {
			var alreadyAttached = $('#dsfa_reset').length,
			HTML = '<h3>'+ texts.gui.settings.reset.title +'</h3>' +
			'<table style="margin: 5px 10px;"><tbody>' +
				'<tr><td><input type="checkbox" id="dsfa_reset_config"></td><td>'+ texts.gui.settings.port.config +'</td></tr>' +
				'<tr><td><input type="checkbox" id="dsfa_reset_variants"></td><td>'+ texts.gui.settings.port.variants +'</td></tr>' +
				'<tr><td rowspan="3"><input type="checkbox" id="dsfa_reset_reports_villages_coords"></td><td style="border-top: 1px dashed black; padding-left: 4px;">'+ texts.gui.settings.port.reports +'</td></tr>' +
				'<tr><td style="padding-left: 5px;">'+ texts.gui.settings.port.villages +'</td></tr>' +
				'<tr><td style="border-bottom: 1px dashed black; padding-left: 4px;">'+ texts.gui.settings.port.coords +'</td></tr>' +
				'<tr><td><input type="checkbox" id="dsfa_reset_commands"></td><td>'+ texts.gui.settings.port.commands +'</td></tr>' +
				'<tr><td><input type="checkbox" id="dsfa_reset_booty"></td><td>'+ texts.gui.settings.port.booty +'</td></tr>' +
				'<tr><th colspan="2" style="padding-top: 2px;"></th></tr>' +
				'<tr><td><input type="checkbox" id="dsfa_reset_all"></td><td><i>'+ texts.gui.settings.export.all +'</i></td></tr>' +
				'<tr><td colspan="2" style="padding-top: 8px;"></td></tr>' +
				'<tr><td></td><td><input id="dsfa_reset_button" type="button" value="'+ texts.gui.settings.reset.button +'" style="padding: 2px 4px;"></td></tr>' +
			'</tbody></table>';
			lib.inlinePopup('dsfa_reset', $(this).offset().left, 300, HTML, true, 'auto', 'auto');
			$('#inline_popup_main').css({ height: 'auto', width: 'auto' });
			$('#inline_popup').offset({ top: $(this).offset().top - $('#inline_popup').outerHeight() - 2 });
			
			if (alreadyAttached)
				return;
			
			$('#dsfa_reset_all').click(function() {
				var check = $(this).is(':checked');
				$(this).parents('table').eq(0).find('input[type=checkbox]').each(function() {
					if ($(this).attr('id') != 'dsfa_reset_all')
						$(this).attr('checked', check);
				});
			});
			$('#dsfa_reset_button')[0].addEventListener('click', function() {
				if ($('#dsfa_reset_config').is(':checked')) {
					Settings._data = $.extend({}, Settings._std);
					Settings.save(true);
				}
				if ($('#dsfa_reset_variants').is(':checked')) {
					Variant._data = $.extend({}, Variant._std);
					Variant.save(true);
				}
				if ($('#dsfa_reset_reports_villages_coords').is(':checked')) {
					Report._data = {};
					Report.save(true);
					Village._data = {};
					Village._coords = {};
					Village.save(true);
				}
				if ($('#dsfa_reset_commands').is(':checked')) {
					Command._data = $.extend({}, Command._std);
					Command.save(true);
				}
				if ($('#dsfa_reset_booty').is(':checked')) {
					Overview.data.Res = {};
					Overview.saveRes();
				}
				alert(texts.gui.settings.reset.complete);
			}, true);
		}, true);
	},
	
	// Allgemein
	make_general_enableStorageColorAt: function(content) {
		var HTML = '<tr><td colspan="2"><b>'+ content[0] +':</b>' +
		'<table style="margin-left: 20px;"><tbody id="dsfa_general_enableStorageColorAt">',
		all = true;
		for (var key in content[1]) {
			if (key == 'all')
				continue;
			HTML +=
			'<tr>' +
				'<td>' +
					Settings.createCheckbox('dsfa_general_enableStorageColorAt_'+ key, Settings.get('general_enableStorageColorAt['+ key +']')) +
				'</td>' +
				'<td>' +
					content[1][key] +
				'</td>' +
			'</tr>';
			if (!Settings.get('general_enableStorageColorAt['+ key +']'))
				all = false;
		}
		HTML +=
		'<tr>' +
			'<th colspan="2"></th>' +
		'</tr>' +
		'<tr>' +
			'<td>' +
				Settings.createCheckbox('dsfa_general_enableStorageColorAt_all', all) +
			'</td><td><i>'+ content[1].all +'</i></td>' +
		'</tr>' +
		'</tbody></table></td></tr>';
		return HTML;
	},
	save_general_enableStorageColorAt: function() {
		var keys = texts.gui.settings.general.enableStorageColorAt[1];
		for (var key in keys) {
			if (key != 'all')
				Settings.set('general_enableStorageColorAt['+ key +']', $('#dsfa_general_enableStorageColorAt_'+ key).is(':checked'));
		}
		return true;
	},
	
	make_general_storageColorBar: function(content) {
		Settings.appendStyle(
			'.colorBar { height: 20px; width: 707px; }' +
			'#dsfa_general_storageColorBar { border: 1px solid black; }' +
			'#dsfa_general_storageColorBar > div { width: 7px; height: 20px; float: left; }' +
			'.arrow { width: 7px; height: 20px; float: left; visibility: hidden; }' +
			'.arrow.show { visibility: visible !important; }'
		);
		return (
		'<tr>' +
			'<td colspan="2" id="dsfa_general_storageColorBar_frame"></td>' +
		'</tr>');
	},
	// Allgemein-attach
	attach_general: function() {
		// enableStorageColorAt
		$('#dsfa_general_enableStorageColorAt_all')[0].addEventListener('click', function() {
			var keys = texts.gui.settings.general.enableStorageColorAt[1];
			for (var key in keys) {
				if (key != 'all')
					$('#dsfa_general_enableStorageColorAt_'+ key).attr('checked', $(this).is(':checked'));
			}
		}, false);
		
		// storageColorBar
		ColorBar.create('general_storage', $('#dsfa_general_storageColorBar_frame'), Settings.get('general_storageColors'), Settings.getStd('general_storageColors'));
	},
	
	// Platz
	make_place_unitPreferences: function(content) {
		var HTML = '<tr><td style="vertical-align: top; text-align: right;">'+ content[0] +':</td><td><table class="vis preference_table"><tbody id="dsfa_place_unitPreferences">',
		unit_order = this.get('place_unitPreferences_order'),
		unit_active = this.get('place_unitPreferences');
		for (var i = 0, max = unit_order.length; i < max; i++) {
			var unit = unit_order[i];
			if (!lib.unitInfo[unit])
				continue;
			var cell = unit_active[unit] ? 'th' : 'td';
			HTML += '<tr><'+ cell +'><input type="checkbox"'+ (unit_active[unit] ? ' checked' : '') +'></'+ cell +'>' +
			'<th><img src="'+ image_base +'unit/unit_'+ unit +'.png" title="'+ texts.units[unit] +'" alt="'+ texts.units[unit] +'"></th>' +
			'<td style="background-color: transparent;"><div class="bqhandle"> </div></td></tr>';
		}
		HTML += '</tbody></table></td></tr>';
		return HTML;
	},
	save_place_unitPreferences: function() {
		var order = [],
		active = {};
		$('#dsfa_place_unitPreferences tr').each(function() {
			var match = $(this).find('img').eq(0).attr('src').match(/unit_(.+)\.png/);
			if (!match)
				return;
			order.push(match[1]);
			active[match[1]] = $(this).find('input').eq(0).is(':checked');
		});
		Settings.set('place_unitPreferences_order', order);
		Settings.set('place_unitPreferences', active);
		return true;
	},
	make_place_buildingPreferences: function(content) {
		var HTML = '<tr><td style="vertical-align: middle; text-align: right;">'+ content[0] +':</td><td><table class="vis preference_table"><tbody id="dsfa_place_buildingPreferences"><tr>',
		build_order = this.get('place_buildingPreferences_order'),
		build_active = this.get('place_buildingPreferences');
		for (var i = 0, max = build_order.length; i < max; i++) {
			var build = build_order[i];
			if (!lib.buildingInfo[build])
				continue;
			var cell = build_active[build] ? 'th' : 'td';
			HTML += '<td style="padding: 0; background: none;" title="'+ texts.buildings[build] +'"><table class="vis preference_table" style="border-spacing: 0 2px;">' +
				'<tr><'+ cell +'><input type="checkbox"'+ (build_active[build] ? ' checked' : '') +'></'+ cell +'></tr>' +
				'<tr><th style="width: 20px; height: 19px;"><img src="'+ image_base +'buildings/'+ build +'.png" alt=""></th></tr>' +
				'<tr><td style="background-color: transparent;"><div style="margin: 0 auto;" class="bqhandle"> </div></td></tr>' +
			'</table></td>';
		}
		HTML += '</tr></tbody></table></td></tr>';
		return HTML;
	},
	save_place_buildingPreferences: function() {
		var order = [],
		active = {};
		$('#dsfa_place_buildingPreferences > tr > td > table').each(function() {
			var match = $(this).find('img').eq(0).attr('src').match(/buildings\/(.+)\.png/);
			if (!match)
				return;
			order.push(match[1]);
			active[match[1]] = $(this).find('input').eq(0).is(':checked');
		});
		Settings.set('place_buildingPreferences_order', order);
		Settings.set('place_buildingPreferences', active);
		return true;
	},
	// Platz-attach
	attach_place: function() {
		// unitPreferences
		$('#dsfa_place_unitPreferences').sortable({ axis: 'y', handle: '.bqhandle' });
		$('#dsfa_place_unitPreferences input[type="checkbox"]').each(function() {
			$(this).click(function() {
				$(this).parent().contents().appendTo($('<t'+ ($(this).is(':checked') ? 'h' : 'd') +'/>').insertBefore($(this).parent()));
				$(this).parent().next().remove();
			});
		});
		
		// buildingPreferences
		$('#dsfa_place_buildingPreferences').sortable({ axis: 'x', handle: '.bqhandle', items: '> tr > td' });
		$('#dsfa_place_buildingPreferences input[type="checkbox"]').each(function() {
			$(this).click(function() {
				$(this).parent().contents().appendTo($('<t'+ ($(this).is(':checked') ? 'h' : 'd') +'/>').insertBefore($(this).parent()));
				$(this).parent().next().remove();
			});
		});
	},
	
	// Berichte
	createDot: function(content, type) {
		var value = this.get('reports_'+ type +'Report'),
		HTML = '<tr><td style="text-align: right;">'+ content[0] +':</td><td><input type="hidden" id="dsfa_reports_'+ type +'Report" value="' + value + '">';
		for (var key in texts.gui.settings.reports.colors) {
			HTML += '<img class="dot' + (key == value ? ' selected' : '') + '" src="'+ image_base +'dots/' + key + '.png" alt="" title="'+ texts.gui.settings.reports.colors[key] +'">';
		}
		HTML += '</td></tr>';
		return HTML;
	},
	
	make_reports_newReport: function(content) {
		Settings.appendStyle(
			'#dsfa_reports_tab img.dot { cursor: pointer; border: 1px solid transparent; }' +
			'#dsfa_reports_tab img.dot.selected { border: 1px solid grey; }'
		);
		
		return Settings.createDot(content, 'new');
	},
	save_reports_newReport: function() {
		Settings.set('reports_newReport', $('#dsfa_reports_newReport').val());
		return true;
	},
	
	make_reports_readReport: function(content) {
		return Settings.createDot(content, 'read');
	},
	save_reports_readReport: function() {
		Settings.set('reports_readReport', $('#dsfa_reports_readReport').val());
		return true;
	},
	
	make_reports_spyReport: function(content) {
		return Settings.createDot(content, 'spy');
	},
	save_reports_spyReport: function() {
		Settings.set('reports_spyReport', $('#dsfa_reports_spyReport').val());
		return true;
	},
	
	make_reports_oldReport: function(content) {
		return Settings.createDot(content, 'old');
	},
	save_reports_oldReport: function() {
		Settings.set('reports_oldReport', $('#dsfa_reports_oldReport').val());
		return true;
	},
	// Berichte-attach
	attach_reports: function() {
		$('#dsfa_reports_newReport, #dsfa_reports_readReport, #dsfa_reports_spyReport, #dsfa_reports_oldReport').each(function() {
			$(this).parent().find('img.dot').each(function() {
				$(this).click(function() {
					$(this).parent().find('img.selected').removeClass('selected');
					$(this).addClass('selected');
					// das ausgewählte Bild in versteckten Eingabefeld schreiben
					$(this).parent().find('input').eq(0).val( this.src.match(/graphic\/dots\/(\w+)\.png/)[1] );
				});
			});
		});
	},
	
	// Autofarmen
	make_autoFarm_units: function(content) {
		var HTML = '<tr><td style="vertical-align: top; text-align: right;">'+ content[0] +':</td><td><table class="vis"><tbody id="dsfa_autoFarm_units">',
		
		unit_order = this.get('autoFarm_units_order'),
		unit_values = this.get('autoFarm_units');
		for (var i = 0, max = unit_order.length; i < max; i++) {
			var unit = unit_order[i];
			if (!lib.unitInfo[unit])
				continue;
			HTML += '<tr>' +
				'<t'+ (unit_values[unit][0] ? 'h' : 'd') +'>' +
					'<input type="checkbox"'+ (unit_values[unit][0] ? ' checked' : '') +'>&nbsp;' +
					'<img src="'+ image_base +'unit/unit_'+ unit +'.png" alt="">&nbsp;' +
					Settings.createInput('dsfa_autoFarm_unit_'+ unit, unit_values[unit][1], 'text-align: center;', 'size="3"') +
				'</t'+ (unit_values[unit][0] ? 'h' : 'd') +'>' +
				'<td style="background-color: transparent;"><div style="width: 11px; height: 11px; background-image: url('+ image_base +'sorthandle.png); cursor: pointer;" class="bqhandle"> </div></td>' +
			'</tr>';
		}
		HTML += '</tbody></table></td></tr>';
		return HTML;
	},
	save_autoFarm_units: function() {
		var order = [],
		values = {};
		$('#dsfa_autoFarm_units tr').each(function() {
			var match = $(this).find('img').eq(0).attr('src').match(/unit_(.+)\.png/);
			if (!match)
				return;
			order.push(match[1]);
			var val = $(this).find('input[type="text"]').val();
			try {
				val = parseInt(val);
			} catch(e) {
				val = 0;
			}
			values[match[1]] = [$(this).find('input[type="checkbox"]').is(':checked'), val];
		});
		Settings.set('autoFarm_units_order', order);
		Settings.set('autoFarm_units', values);
		return true;
	},
	// Autofarmen-attach
	attach_autoFarm: function() {
		// NUR TEMPORÄR!!
		$('#dsfa_autoFarm_farmOver').change(function(e) {
			if (this.selectedIndex != 0) {
				lib.alert(texts.gui.optionDisabled);
				this.selectedIndex = 0;
			}
		});
		$('#dsfa_autoFarm_farmWith').change(function(e) {
			if (this.selectedIndex == 1) {
				lib.alert(texts.gui.optionDisabled);
				this.selectedIndex = 0;
			}
		});
		// NUR TEMPORÄR!!
		
		if ($('#dsfa_autoFarm_farmOver')[0].selectedIndex != 2) {
			$('#dsfa_autoFarm_farm_Assistent_click').parents('tr').eq(0).css('color', 'grey');
			$('#dsfa_autoFarm_farm_Assistent_click').attr('disabled', true);
		}
		$('#dsfa_autoFarm_farmOver').change(function() {
			if (this.selectedIndex == 2) {
				$('#dsfa_autoFarm_farm_Assistent_click').parents('tr').eq(0).css('color', '');
				$('#dsfa_autoFarm_farm_Assistent_click').attr('disabled', false);
			} else {
				$('#dsfa_autoFarm_farm_Assistent_click').parents('tr').eq(0).css('color', 'grey');
				$('#dsfa_autoFarm_farm_Assistent_click').attr('disabled', true);
			}
		});
		
		// units
		$('#dsfa_autoFarm_units').sortable({ axis: 'y', handle: '.bqhandle' });
		$('#dsfa_autoFarm_units').sortable('tr');
		
		$('#dsfa_autoFarm_units input[type="checkbox"]').each(function() {
			$(this).click(function() {
				$(this).parent().contents().appendTo($('<t'+($(this).is(':checked')?'h':'d')+'/>').insertBefore($(this).parent()));
				$(this).parent().next().remove();
			});
		});
		$('#dsfa_autoFarm_units input[type="text"]').each(function() {
			$(this).click(function() {
				if ($(this).val() == '0')
					$(this).focus().select();
			});
		});
	},
	
	make_paFeatures_quickbar: function(content) {
		var HTML = '<tr><td style="text-align: right; width: 1px;">'+ content[0] +'</td><td><textarea id="dsfa_paFeatures_quickbar_items" style="width: 530px; height: 100px;">';
		for (var i = 0, item; item = PA_Features.quickbar_items[i]; i++) {
			HTML += '{\r\n';
			for (var key in item) {
				if (typeof(item[key]) == "boolean")
					HTML += '\t'+ key +': '+ item[key] +',\r\n';
				else
					HTML += '\t'+ key +': "'+ item[key] +'",\r\n';
			}
			HTML += '},\r\n';
		}
		HTML += '</textarea></td></tr>';
		return HTML;
	},
	save_paFeatures_quickbar: function() {
		var text = $('#dsfa_paFeatures_quickbar_items').html();
		try {
			text = '['+ trim(text).remove(/,$/) +']';
			lib.debug.log(text);
			var quickbar_items = eval(text);
			lib.debug.log(quickbar_items);
		} catch(e) {
			lib.debug.log(e);
			lib.error('Die Einstellungen für die Schnellleiste sind nicht korrekt!');
			return false;
		}
		return true;
	},
	
	attach_paFeatures: function() {
		$('#dsfa_paFeatures_fileSite').change(function() {
			if (game_data.market != 'de' && this.selectedIndex == 2) {
				lib.alert(texts.gui.optionNotAvailable);
				this.selectedIndex = 0;
			}
		});
	},
	
	// Bericht eintragen
	make_registerReport_coords: function(content) {
		return (
		'<tr>' +
			'<td>'+ content[0] +'</td>' +
			'<td>' +
				'<span style="margin-right: 5px;">' +
					content[1].x +' '+ Settings.createInput('dsfa_registerReport_coord_x', '', '', 'size="5" onkeyup="xProcess(\'dsfa_registerReport_coord_x\', \'dsfa_registerReport_coord_y\')"') +
				'</span>' +
				'<span>' +
					content[1].y +' '+ Settings.createInput('dsfa_registerReport_coord_y', '', '', 'size="5"') +
				'</span>' +
			'</td>' +
		'</tr>');
	},
	make_registerReport_villageName: function(content) {
		return (
		'<tr>' +
			'<td style="text-align: right;">'+ content[0] +':</td>' +
			'<td>' +
				Settings.createInput('dsfa_registerReport_villageName', '') +
			'</td>' +
		'</tr>');
	},
	make_registerReport_villageID: function(content) {
		return (
		'<tr>' +
			'<td style="text-align: right;">'+ content[0] +':</td>' +
			'<td>' +
				Settings.createInput('dsfa_registerReport_villageID', '', '', 'size="5"') +
			'</td>' +
		'</tr>');
	},
	make_registerReport_ownerID: function(content) {
		return (
		'<tr>' +
			'<td style="text-align: right;">'+ content[0] +':</td>' +
			'<td>' +
				Settings.createInput('dsfa_registerReport_ownerID', '', '', 'size="5"') +
			'</td>' +
		'</tr>');
	},
	make_registerReport_spyDate: function(content) {
		var days = ['dd'],
		months = ['MM'],
		hours = ['HH'],
		minutes = ['mm'];
		for (var i = 0; i < 59; i++) {
			var num = (i < 10 ? '0' : '') + i;
			if (i > 0 && i <= 31)
				days.push(num);
			if (i > 0 && i <= new Date().getMonth()+1)
				months.push(num);
			if (i <= 23)
				hours.push(num);
			minutes.push(num);
		}
		
		HTML = '<tr>' +
			'<td style="text-align: right;">'+ content[0] +':</td>' +
			'<td>' +
				content[1].format
				.replace('$day$', Settings.createSelect('dsfa_registerReport_spyDate_d', days))
				.replace('$month$', Settings.createSelect('dsfa_registerReport_spyDate_M', months))
				.replace('$year$', new Date().getFullYear())
				.replace('$hour$', Settings.createSelect('dsfa_registerReport_spyTime_H', hours))
				.replace('$minute$', Settings.createSelect('dsfa_registerReport_spyTime_m', minutes)) +
			'</td>' +
		'</tr>';
		
		return HTML;
	},
	
	make_registerReport_units: function(content) {
		var line2 = '',
		HTML = '<tr><td style="text-align: right;">'+ content[0] +':</td><td><table class="vis"><tr>';
		for (var key in lib.unitInfo) {
			HTML += '<th style="text-align: center;"><img src="'+ texts.unitImgPath.replace('$', key) +'" class="tooltip" title="'+ texts.unit[key] +'"></th>';
			line2 += '<td style="text-align: center;">'+ Settings.createInput('dsfa_registerReport_unit_'+ key, '0', 'text-align: center;', 'size="3"') +'</td>';
		}
		HTML += '</tr><tr>' + line2 + '</tr></table></td></tr>';
		return HTML;
	},
	make_registerReport_res: function(content) {
		var line2 = '',
		HTML = '<tr><td style="text-align: right;">'+ content[0] +':</td><td><table class="vis"><tr>';
		for (var key in texts.resources) {
			if (key == 'sum')
				continue;
			HTML += '<th style="text-align: center;"><span class="icon header '+ key +' tooltip" title="'+ texts.resources[key] +'"> </span></th>';
			line2 += '<td style="text-align: center;">'+ Settings.createInput('dsfa_registerReport_'+ key, '0', 'text-align: center;', 'size="3"') +'</td>';
			//line2 += '<td style="text-align: center;"><input type="text" size="3" id="dsfa_registerReport_'+ key +'" value="0" style="text-align: center;"></td>';
		}
		HTML += '</tr><tr>' + line2 + '</tr></table></td></tr>';
		return HTML;
	},
	make_registerReport_buildings: function(content) {
		var line2 = '',
		HTML = '<tr><td style="text-align: right;">'+ content[0] +':</td><td><table class="vis"><tr>';
		for (var key in lib.buildingInfo) {
			HTML += '<th style="text-align: center;"><img src="'+ texts.buildingImgPath.replace('$', key) +'" class="tooltip" title="'+ texts.buildings[key] +'"></th>';
			line2 += '<td style="text-align: center;">'+ Settings.createInput('dsfa_registerReport_build_'+ key, '0', 'text-align: center;', 'size="2"') +'</td>';
			//line2 += '<td style="text-align: center;"><input type="text" size="2" id="dsfa_registerReport_build_'+ key +'" value="0" style="text-align: center;"></td>';
		}
		HTML += '</tr><tr>' + line2 + '</tr></table></td></tr>';
		return HTML;
	},
	
	make_registerReport_mood: function(content) {
		return (
		'<tr>' +
			'<td style="text-align: right;">'+ content[0] +':</td>' +
			'<td>' +
				Settings.createInput('dsfa_registerReport_mood', '100', '', 'size="3"') +
			'</td>' +
		'</tr>');
	},
	make_registerReport_bonus: function(content) {
		return (
		'<tr>' +
			'<td style="text-align: right;">'+ content[0] +':</td>' +
			'<td>' +
				Settings.createSelect('dsfa_registerReport_bonus', content[1].bonus) +
			'</td>' +
		'</tr>');
	},
	make_registerReport_save: function(content) {
		return (
		'<tr>' +
			'<td>&nbsp;</td>' +
			'<td>' +
				'<input type="button" value="'+ content[0] +'" id="dsfa_registerReport_save" style="font-size: 14px; padding: 3px 8px;">' +
			'</td>' +
		'</tr>');
	},
	// Bericht eintragen-attach
	attach_registerReport: function() {
		// spyDate
		$('#dsfa_registerReport_spyDate_d').change(function() {
			if (regex.NaN.test($(this).find('option').eq(0).val()))
				$(this).find('option').eq(0).remove();
		});
		$('#dsfa_registerReport_spyDate_M').change(function() {
			if (regex.NaN.test($(this).find('option').eq(0).val()))
				$(this).find('option').eq(0).remove();
			
			var daysPerMonth = [
				0,
				31,
				(new Date().getFullYear() % 4 == 0 || new Date().getFullYear() % 100 == 0 ? 29 : 28),
				31,
				30,
				31,
				30,
				31,
				31,
				30,
				31,
				30,
				31
			],
			HTML = '<option>dd</option>';
			for (var i = 1, max = daysPerMonth[ parseInt($(this).val().replace(/^0?(\d+)/, '$1')) ]; i <= max; i++)
				HTML += '<option>'+ ((i < 10 ? '0' : '') + i) +'</option>';
			$('#dsfa_registerReport_spyDate_d').html(HTML);
		});
		$('#dsfa_registerReport_spyTime_H').change(function() {
			if (regex.NaN.test($(this).find('option').eq(0).val()))
				$(this).find('option').eq(0).remove();
		});
		$('#dsfa_registerReport_spyTime_m').change(function() {
			if (regex.NaN.test($(this).find('option').eq(0).val()))
				$(this).find('option').eq(0).remove();
		});
		
		// units
		for (var key in lib.unitInfo) {
			$('#dsfa_registerReport_unit_'+ key).click(function() {
				if ($(this).val() == '0')
					$(this).focus().select();
			});
		}
		
		// res
		for (var key in texts.resources) {
			$('#dsfa_registerReport_'+ key).click(function() {
				if ($(this).val() == '0')
					$(this).focus().select();
			});
		}
		
		// buildings
		for (var key in lib.buildingInfo) {
			$('#dsfa_registerReport_build_'+ key).click(function() {
				if ($(this).val() == '0')
					$(this).focus().select();
			});
		}
		
		// save
		$('#dsfa_registerReport_save')[0].addEventListener('click', function() {
			var date = {
				day: $('#dsfa_registerReport_spyDate_d').val(),
				month: $('#dsfa_registerReport_spyDate_M').val(),
				hour: $('#dsfa_registerReport_spyTime_H').val(),
				min: $('#dsfa_registerReport_spyTime_m').val()
			};
			for (var key in date)
				if (regex.NaN.test(date[key])) {
					lib.error('Wichtige Daten konnten nicht ausgelesen werden!');
					return;
				}
			var spyTime = texts.locale.timeStr2Sec(date.day +'.'+ date.month +'. '+ date.hour +':'+ date.min);
			
			// Hier fehlt komplett die Fehleranalyse!
			try {
				if ($('#dsfa_registerReport_villageName').val() == '')
					throw('No Villagename');
				var ID = parseInt($('#dsfa_registerReport_villageID').val()),
				data = {
					coords: parseInt($('#dsfa_registerReport_coord_x').val()) +'|'+ parseInt($('#dsfa_registerReport_coord_y').val()),
					name: $('#dsfa_registerReport_villageName').val(),
					ownerID: parseInt($('#dsfa_registerReport_owneID').val()),
					spyReportID: 0,
					spyReportTime: spyTime,
					lastReportID: 0,
					lastReportTime: spyTime,
					units: {},
					buildings: {},
					wood: parseInt($('#dsfa_registerReport_wood').val()),
					stone: parseInt($('#dsfa_registerReport_stone').val()),
					iron: parseInt($('#dsfa_registerReport_iron').val()),
					mood: parseInt($('#dsfa_registerReport_mood').val()),
					bonus: $('#dsfa_registerReport_bonus')[0].selectedIndex,
					eq: 1,
					eqCount: 1,
					locked: false
				};
			} catch(e) {
				lib.error('Wichtige Daten konnten nicht ausgelesen werden!');
				return;
			}
			
			for (var key in lib.unitInfo) {
				if ($('#dsfa_registerReport_unit_'+key).val() == '')
					continue;
				try {
					var num = parseInt($('#dsfa_registerReport_unit_'+ key).val());
					if (num > 0)
						data.units[key] = num;
				} catch(e) { }
			}
			for (var key in lib.buildingInfo) {
				if ($('#dsfa_registerReport_build_'+ key).val() == '')
					continue;
				try {
					var num = parseInt($('#dsfa_registerReport_build_'+ key).val());
					if (num > 0)
						data.buildings[key] = num;
				} catch(e) { }
			}
			
			var ret = Village.register(ID, data);
			if (ret)
				lib.success('Der Bericht wurde eingetragen!');
		}, true);
	},
	// Hotkeys einstellen
	make_hotkeys_userKeys: function(content) {
		var HTML = '<tr><td colspan="2">' +
		'<table class="vis settings nowrap" style="border: 1px solid #DED3B9; width: 100%;"><tbody id="dsfaHotkeysTable">' +
			'<tr><th>'+ content[0] +'</th></tr>' +
			'<tr><td>',
		tables = '',
		i = 0;
		for (var key in content[1]) {
			HTML += '<a id="dsfa_hotkeys_'+ key +'" href="javascript:;" style="padding: 0 10px;"'+ (i ? '' : ' class="selected"') +'>'+ content[1][key].title +'</a>';
			
			tables += '<table id="dsfa_hotkeys_'+ key +'_tab"'+ (i ? ' style="display:none"' : '') +'>';
			for (var subKey in content[1][key]) {
				if (subKey != 'title' && content[1][key].hasOwnProperty(subKey)) {
					var keyCode = Hotkeys.userKeys.hasOwnProperty(key) && Hotkeys.userKeys[key][subKey] || Hotkeys.stdKeys[key][subKey],
					keyCodeString = Hotkeys.char(keyCode);
					tables += '<tr><td>'+ content[1][key][subKey] +':</td><td><input id="dsfa_hotkey_input_'+ key +'_'+ subKey +'" class="dsfa_hotkey_input" value="[ '+ keyCodeString +' ]" style="text-align: center"></td></tr>';
				}
			}
			tables += '</table>';
			i++;
		}
		HTML += '</td></tr>' +
			'<tr><th id="dsfa_hotkeys_tabtitle">'+ content[1].all.title +':</th></tr>' +
			'<tr><td id="dsfa_hotkeys_container">' +
				tables +
			'</td></tr>' +
		'</tbody></table>';
		return HTML;
	},
	save_hotkeys_userKeys: function() {
		$('.dsfa_hotkey_input').each(function() {
			if (this.keyCode) {
				var match = this.id.match(/dsfa_hotkey_input_([^_]+)_(.+)/),
				key = match[1],
				subKey = match[2];
				Hotkeys.userKeys[key] = Hotkeys.userKeys[key] || {};
				Hotkeys.userKeys[key][subKey] = this.keyCode;
			}
		});
		lib.storage.setValue('userHotkeys', Hotkeys.userKeys);
		return true;
	},
	
	attach_hotkeys: function() {
		var popup = (game_data.screen == 'settings' && game_data.mode == 'settings');
		$('#dsfaHotkeysTable tr').eq(1).find('a').each(function() {
			this.addEventListener('click', function() {
				this.blur();
				$('#dsfa_hotkeys_tabtitle').html($(this).html() +':');
				$('#dsfa_hotkeys_container table').each(function() {
					$(this).hide();
				});
				$('#'+ this.id +'_tab').show();
				$(this).parent().find('a').each(function() {
					$(this).removeClass('selected');
				});
				$(this).addClass('selected');
				
				var spacerHeight = Settings.maxHeight - $('#dsfa_hotkeys_tab').height();
				if (spacerHeight < 0) {
					spacerHeight = 0;
					Settings.maxHeight = $('#dsfa_hotkeys_tab').height();
				}
				$('#dsfa_spacer').css('height', spacerHeight);
				if (!popup)
					$(document).scrollTop($("#dsfaSettingsTable").offset().top - ($('.top_bar').css('position') == 'fixed' ? 57 : 0));
			}, true);
		});
		
		$('.dsfa_hotkey_input').each(function() {
			this.addEventListener('focus', function() {
				this.oldValue = this.value;
				this.value = '';
			}, false);
			this.addEventListener('keydown', function(e) {
				e = e || window.event;
				if (e.shiftKey || e.ctrlKey || e.altKey)
					return;
				
				var keyCode = e.keyCode || e.charCode || e.which;
				if (Hotkeys.specialChars[keyCode] || keyCode >= 48 && keyCode <= 57 || keyCode >= 65 && keyCode <= 90) {
					this.value = Hotkeys.char(keyCode);
					if (keyCode >= 96 && keyCode <= 105)
						keyCode -= 48;
					this.keyCode = keyCode;
					e.cancelBubble = true;
					e.returnValue = false;
					
					if (e.stopPropagation) {
						e.stopPropagation();
						e.preventDefault();
					}
				} else {
					this.value = '';
				}
			}, true);
			this.addEventListener('keyup', function() {
				if (this.value != '') {
					if (/(\[ )+/.test(this.value)) {
						var match = this.value.match(/([^\[ ])/);
						this.value = match[1];
					}
					this.value = '[ '+ this.value +' ]';
				}
			}, false);
			this.addEventListener('blur', function() {
				if (this.value == '') {
					this.value = this.oldValue;
				}
				delete this.oldValue;
			}, false);
		});
	}
};


/*
 * Storage
 */
Storage = {
	_resTicker: [],
	_interval: 10,
	colorize: false,
	attachResTicker: function(el, step, max) {
		var val = parseInt( el.innerHTML.remove(/(<[^>]*>)|\.|\s/g), 10 );
		step = parseFloat(step) / 3600;
		max = parseInt(max);
		if (val < max) {
			this._resTicker.push([
				el,
				val,
				step,
				max
			]);
		}
	},
	tickRes: function() {
		for (var i = 0, max = Storage._resTicker.length; i < max; i++) {
			var val = Storage._resTicker[i][1] + Storage._resTicker[i][2] * Storage._interval;
			if (val > Storage._resTicker[i][3])
				val = Storage._resTicker[i][3];
			Storage._resTicker[i][1] = val;
			Storage._resTicker[i][0].innerHTML = lib.formatNumber(parseInt(val, 10), true, true);
			if (val >= Storage._resTicker[i][3]) {
				Storage._resTicker.splice(i, 1);	// Element löschen (an der Grenze angelangt)
				i--;
				max--;
			}
		}
		if (Storage.colorize)
			Storage.colorRes();
	},
	colors: [],
	storage: 0,
	tickInfoRes: function() {
		var wood = parseInt($('#wood').html()),
		woodColor = Storage.getColor(wood),
		stone = parseInt($('#stone').html()),
		stoneColor = Storage.getColor(stone),
		iron = parseInt($('#iron').html()),
		ironColor = Storage.getColor(iron);
		$('#dsfa_wood').html( lib.formatNumber(wood, true, true) ).css({
			'background-color': woodColor.toString(),
			'color': woodColor.getContrastColor()
		});
		$('#dsfa_stone').html( lib.formatNumber(stone, true, true) ).css({
			'background-color': stoneColor.toString(),
			'color': stoneColor.getContrastColor()
		});
		$('#dsfa_iron').html( lib.formatNumber(iron, true, true) ).css({
			'background-color': ironColor.toString(),
			'color': ironColor.getContrastColor()
		});
	},
	init: function() {
		var colors = Settings.get('general_storageColors'),
		diff = 1,
		num1 = 0,
		num2 = 0;
		for (var i = 0; i < 101; i++) {
			var tmp = [
				colors[num1][0] + Math.round( (colors[num2][0] - colors[num1][0]) / diff * (i - num1) ),
				colors[num1][1] + Math.round( (colors[num2][1] - colors[num1][1]) / diff * (i - num1) ),
				colors[num1][2] + Math.round( (colors[num2][2] - colors[num1][2]) / diff * (i - num1) )
			];
			this.colors[i] = tmp;
			if (colors[i]) {
				num1 = i;
				for (num2 = i+1; num2 < 101 && !colors[num2]; num2++);
				diff = num2-num1;
			}
		}
		
		if (game_data.screen == 'market') {
			Storage.colorize = Settings.get('general_enableStorageColorAt[market]');
			if (game_data.mode == 'call')
				this.init_market_call();
			document.addEventListener('DOMNodeInserted', function(e) {
				if (e.relatedNode.id == 'inline_popup_content') {	// das Eigene-Popup hat sich geöffnet
					Storage.init_market_own();
					Storage.colorRes();
				} else if (e.relatedNode.id == 'arrive') {		// auf der Anfordern-Seite hat die "Ankunftszeit des letzten Händlers" verändert
					Storage.init_market_call();
					Storage.colorRes();
				}
			}, false);
		} else if (game_data.screen == 'overview_villages') {
			Storage.colorize = Settings.get('general_enableStorageColorAt[production]');
			this.init_prod();
			this.initResTicker();
		} else if (game_data.screen == 'snob' && game_data.mode == 'coin') {
			Storage.colorize = Settings.get('general_enableStorageColorAt[coin_mint]');
			this.init_coin_mint();
		}
		
		this.colorRes();
		if (Settings.get('general_enableStorageColorAt[infobar]'))
			this.colorInfoRes();
	},
	initResTicker: function() {
		window.setInterval(this.tickRes, this._interval*1000);
	},
	getColor: function() {
		if (arguments.length == 1 && !this.storage || arguments.length != 1 && !arguments[1]) {
			return new Color('rgb('+ this.colors[100].toString() +')');
		} else {
			var idx = Math.round(arguments[0] / (arguments.length == 1 ? this.storage : arguments[1]) * 100);
			if (isNaN(idx) || idx < 0 || idx > 100)
				return new Color(0, 0, 0);
			return new Color('rgb('+ this.colors[idx].toString() +')');
		}
	},
	colorInfoRes: function() {
		$('<span id="dsfa_wood" class="res" title="'+ $('#wood').attr('title') +'"></span>').insertAfter('#wood');
		$('<span id="dsfa_stone" class="res" title="'+ $('#stone').attr('title') +'"></span>').insertAfter('#stone');
		$('<span id="dsfa_iron" class="res" title="'+ $('#iron').attr('title') +'"></span>').insertAfter('#iron');
		this.storage = parseInt($('#storage').html());
		this.tickInfoRes();
		$('#wood').hide();
		$('#stone').hide();
		$('#iron').hide();
		window.setInterval(Storage.tickInfoRes, 1000);
	},
	colorRes: function() {
		if (!Storage.colorize)
			return;
		
		$('td.wood').each(function() {
			var woodEl = $(this),
			stoneEl = $(this).parent().find('td.stone'),
			ironEl = $(this).parent().find('td.iron');
			if (!stoneEl.length || !ironEl.length)
				return;
			var storage = parseInt(ironEl.next().html().remove(/(<[^>]*>)|\./g).remove(/[^\d]/g)),
			woodColor = Storage.getColor( parseInt( woodEl.html().remove(/(<[^>]*>)|\.|\s/g) ), storage ),
			stoneColor = Storage.getColor(parseInt(stoneEl.html().remove(/(<[^>]*>)|\.|\s/g)), storage),
			ironColor = Storage.getColor(parseInt(ironEl.html().remove(/(<[^>]*>)|\.|\s/g)), storage);
			if (isNaN(storage))
				return;
			woodEl.css({
				'background-color': woodColor.toString(),
				'color': woodColor.getContrastColor()
			});
			stoneEl.css({
				'background-color': stoneColor.toString(),
				'color': stoneColor.getContrastColor()
			});
			ironEl.css({
				'background-color': ironColor.toString(),
				'color': ironColor.getContrastColor()
			});
		});
	},
	
	init_prod: function() {
		if (!$('#production_table').length || !Settings.get('general_enableStorageColorAt[production]'))
			return;
		
		Storage.colorize = true;
		var idx;
		$('#production_table tr').eq(0).find('th').each(function(i) {
			if (texts.regex.resources.test($(this).html()))
				idx = i;
		});
		$('<th><span class="res stone">&nbsp;'+ texts.resources.stone +'</span></th><th><span class="res iron">&nbsp;'+ texts.resources.iron +'</span></th>').insertAfter($('#production_table tr').eq(0).find('th').eq(idx));
		$('#production_table tr').eq(0).find('th').eq(idx).html('<span class="res wood">&nbsp;'+ texts.resources.wood +'</span>');
		$('.wood').each(function() {
			var td = $(this).parent(),
			tr = td.parent(),
			woodEl = $(this),
			stoneEl = tr.find('.stone'),
			ironEl = tr.find('.iron'),
			storage = parseInt(ironEl.parents('td').eq(0).next().html());
			if (td[0].nodeName != 'TD')
				return;
			
			td.addClass('wood');
			td.css('text-align', 'right');
			$(
				'<td class="stone" style="text-align: right; "></td>' +
				'<td class="iron" style="text-align: right; "></td>'
			).insertAfter(td);
			td.append( woodEl.html() ).next().append( stoneEl.html() ).next().append( ironEl.html() );
			woodEl.remove();
			stoneEl.remove();
			ironEl.remove();
			
			var woodEl = tr.find('td.wood'),
			woodTitle = woodEl.find('span').eq(0).attr('title'),
			stoneEl = tr.find('td.stone'),
			stoneTitle = stoneEl.find('span').eq(0).attr('title'),
			ironEl = tr.find('td.iron'),
			ironTitle = ironEl.find('span').eq(0).attr('title');
			if (woodTitle && stoneTitle && ironTitle) {
				Storage.attachResTicker(woodEl[0], parseInt(woodTitle, 10), storage);
				Storage.attachResTicker(stoneEl[0], parseInt(stoneTitle, 10), storage);
				Storage.attachResTicker(ironEl[0], parseInt(ironTitle, 10), storage);
			}
		});
	},
	init_market_call: function() {
		if (!Settings.get('general_enableStorageColorAt[market]'))
			return;
		
		var wood_save = $('#checkbox_wood'),
		stone_save = $('#checkbox_stone'),
		iron_save = $('#checkbox_iron');
		
		wood_save.parent().html('<span class="res wood">&nbsp;'+ texts.resources.wood +'</span>').append(wood_save).css('text-align', 'center').addClass('nowrap');
		stone_save.parent().html('<span class="res stone">&nbsp;'+ texts.resources.stone +'</span>').append(stone_save).css('text-align', 'center').addClass('nowrap');
		iron_save.parent().html('<span class="res iron">&nbsp;'+ texts.resources.iron +'</span>').append(iron_save).css('text-align', 'center').addClass('nowrap');
		$('#village_list tr').slice(1).each(function() {
			if (!$(this).find('.res.wood, .warn.wood, .warn_90.wood').length)
				return;
			
			$(this).find('td.wood').css('text-align', 'right');
			var woodEl = $(this).find('.res.wood, .warn_90.wood, .warn.wood').removeClass('warn_90').removeClass('warn').addClass('res'),
			woodP = woodEl.parent(),
			stoneEl = $(this).find('.res.stone, .warn_90.stone, .warn.stone').removeClass('warn_90').removeClass('warn').addClass('res'),
			stoneP = stoneEl.parent(),
			ironEl = $(this).find('.res.iron, .warn_90.iron, .warn.iron').removeClass('warn_90').removeClass('warn').addClass('res'),
			ironP = ironEl.parent();
			
			woodP.parent().append( woodEl.removeClass('wood') ).css('text-align', 'right');
			woodP.remove();
			stoneP.parent().append( stoneEl.removeClass('stone') ).css('text-align', 'right');
			stoneP.remove();
			ironP.parent().append( ironEl.removeClass('iron') ).css('text-align', 'right');
			ironP.remove();
		});
	},
	init_market_own: function() {
		if (!Settings.get('general_enableStorageColorAt[market]'))
			return;
		
		$('#inline_popup_content table').last().find('tr').each(function() {
			var td = $(this).find('td').eq(1);
			if (td.find('.res, .warn_90, .warn').length != 3)
				return;
			var woodEl = $(td.find('.res, .warn_90, .warn')[0]).removeClass('warn_90').removeClass('warn').addClass('res'),
			woodImg = woodEl.prev(),
			stoneEl = $(td.find('.res, .warn_90, .warn')[1]).removeClass('warn_90').removeClass('warn').addClass('res'),
			stoneImg = stoneEl.prev(),
			ironEl = $(td.find('.res, .warn_90, .warn')[2]).removeClass('warn_90').removeClass('warn').addClass('res'),
			ironImg = ironEl.prev();
			$(
				'<td class="nowrap stone"></td>' +
				'<td class="nowrap iron"></td>'
			).insertAfter(td);
			td.next().append(stoneImg).append(stoneEl).next().append(ironImg).append(ironEl);
			woodImg.css('float', 'left');
			woodEl.css('float', 'right').css('margin-top', '2px');
			stoneImg.css('float', 'left');
			stoneEl.css('float', 'right').css('margin-top', '2px');
			ironImg.css('float', 'left');
			ironEl.css('float', 'right').css('margin-top', '2px');
			td.addClass('wood');
		});
	},
	init_coin_mint: function() {
		if (!Settings.get('general_enableStorageColorAt[coin_mint]'))
			return;
		
		$('#coin_overview_table tr').eq(0).find('td').eq(0).add($('#coin_overview_table tr').last().find('td').eq(0)).each(function() {
			$(this).attr('colspan', parseInt($(this).attr('colspan')) + 2);
		});
		$('<th><span class="res stone">'+ texts.resources.stone +'</span></th><th><span class="res iron">&nbsp;'+ texts.resources.iron +'</span></th>')
		.insertAfter( $('#coin_overview_table tr').eq(1).find('th:contains('+ texts.gui.resources +')').html('<span class="res wood">&nbsp;'+ texts.resources.wood +'</span>') );
		
		$('#coin_overview_table tr').slice(2).each(function() {
			if (!$(this).find('.resources').length)
				return;
			var wood = $(this).find('.resources > span.wood').html(),
			stone = $(this).find('.resources > span.stone').html(),
			iron = $(this).find('.resources > span.iron').html();
			$('<td class="nowrap stone" style="text-align: right;">'+ stone +'</td><td class="nowrap iron" style="text-align: right;">'+ iron +'</td>')
			.insertAfter( $(this).find('.resources').html( wood ).removeClass('resources').addClass('wood').css('text-align', 'right') );
		});
	},
};


/*
 * Hotkeys
 */
Hotkeys = {
	textinputActive: false,
	stdKeys: {
		all: {
			nextVillage: 107,
			prevVillage: 109
		},
		report: {
			abort: 27,
			leftArrow: 37,
			rightArrow: 39,
			'delete': 46,
			startReading: 82,
			move: 86
		},
		place: {
			'submit': 13,
			farmList1:  49,
			farmList2:  50,
			farmList3:  51,
			farmList4:  52,
			farmList5:  53,
			farmList6:  54,
			farmList7:  55,
			farmList8:  56,
			farmList9:  57,
			farmList10: 48
		},
		market: {
			'submit': 13
		}
	},
	userKeys: lib.storage.getValue('userHotkeys', { all: {} }),
	actions: {
		all: {
			nextVillage: function() { $('.arrowRight').focus().click() },	// + (für Dörferwechsel)
			prevVillage: function() { $('.arrowLeft').focus().click() },	// - (für Dörferwechsel)
		},
		report: {
			abort: function() {		// 'Esc' zum abbrechen des automatischen Einlesens
				Bot.deactivate();
				window.stop();
			},
			leftArrow: function() {		// linke Pfeiltaste
				if (regex.viewID.test(location.href))
					Report.next();
				else	// eine Seite zuvor
					if ($('strong').prev().length) {
						$('strong').prev().focus().click();
						$('strong').prev()[0].focus();
						$('strong').prev()[0].click();
					}
			},
			rightArrow: function() {		// rechte Pfeiltaste
				if (regex.viewID.test(location.href))
					Report.prev();
				else	// eine Seite danach
					if ($('strong').next().length) {
						$('strong').next().focus().click();
						$('strong').next()[0].focus();
						$('strong').next()[0].click();
					}
			},
			'delete': function() {		// delete wurde gedrückt
				if (/view=\d+/.test(location.href) && (Report.ret == 3 || !Settings.get('misc_enableConfirm') || confirm(texts.gui.confirmDeleteReport)))
					Report.delete();
			},
			startReading: function() {		// 'r' zum Einlesen
				Bot.startReportReading();
			},
			move: function() {		// 'v' zum verschieben
				if (/view=\d+/.test(location.href))
					Report.move();
			}
		},
		place: {
			'submit': function(e, onsubmit) {
				if ($('#target_attack').length) {
					var coords = [parseInt($('#inputx').val(), 10), parseInt($('#inputy').val(), 10)],
					filled = false;
					$('#units_form .unitsInput').each(function() {
						var val = parseInt($(this).val());
						if (val && !isNaN(val))
							filled = true;
					});
					if (coords[0] && !isNaN(coords[0]) && coords[1] && !isNaN(coords[1]) && filled) {
						if (onsubmit)	// weitergereicht durch 'onsubmit'
							return true;
						else
							$('#target_attack').focus().click();
					} else {
						if (!coords[0] || isNaN(coords[0]) || !coords[1] || isNaN(coords[1]))
							alert(texts.gui.noCoords);
						else if (!filled)
							alert(texts.gui.noUnitsSelected);
						if (onsubmit)	// weitergereicht durch 'onsubmit'
							return false;
					}
				} else if ($('#troop_confirm_go').length)
					$('#troop_confirm_go').focus().click();
			},
			farmList1:  function() { Farmlist.click(1) },
			farmList2:  function() { Farmlist.click(2) },
			farmList3:  function() { Farmlist.click(3) },
			farmList4:  function() { Farmlist.click(4) },
			farmList5:  function() { Farmlist.click(5) },
			farmList6:  function() { Farmlist.click(6) },
			farmList7:  function() { Farmlist.click(7) },
			farmList8:  function() { Farmlist.click(8) },
			farmList9:  function() { Farmlist.click(9) },
			farmList10: function() { Farmlist.click(10) },
		},
		market: {
			'submit': function() {
				if ($('#inputx').length) {
					if (!$('#inputx').parents('td').eq(1).find('input[type=submit]').is(':focus'))
						$('#inputx').parents('td').eq(1).find('input[type=submit]').focus().click();
				} else if ($('input[name=target_id]').length) {
					if (!$('input[name=target_id]').parent().find('input[type=submit]').is(':focus'))
						$('input[name=target_id]').parent().find('input[type=submit]').focus().click();
				}
			}
		}
	},
	els: {
		all: {},
		report: {
			leftArrow: function(char) {
				$('#content_value a:contains(<<)').each(function() {
					$(this).addClass('nowrap').html( $(this).html() +' ['+ char +']' );
				});
			},
			rightArrow: function(char) {
				$('#content_value a:contains(>>)').each(function() {
					$(this).addClass('nowrap').html( $(this).html() +' ['+ char +']' );
				});
			},
			'delete': function(char) {
				$('#content_value a:contains('+ texts.reports.delete +')').each(function() {
					$(this).addClass('nowrap').html( $(this).html() +' ['+ char +']' );
				});
			},
			move: function(char) {
				$('#content_value a:contains('+ texts.reports.move +')').each(function() {
					$(this).addClass('nowrap').html( $(this).html() +' ['+ char +']' );
				});
			},
		},
		place: {
			'submit': function(char) {
				if ($('#target_attack').length)
					var el = $('#target_attack');
				else if ($('#troop_confirm_go').length)
					var el = $('#troop_confirm_go');
				else
					return;
				el.val( el.val() +' ['+ char +']' );
			},
		},
		market: {
			'submit': function(char) {
				if ($('#inputx').length) {
					var el = $('#inputx').parents('td').eq(1).find('input[type=submit]');
					el.val( el.val() +' ['+ char +']' );
				} else if ($('input[name=target_id]').length) {
					var el = $('input[name=target_id]').parent().find('input[type=submit]');
					el.val( el.val() +' ['+ char +']' );
				}
			},
		}
	},
	specialChars: {
		  8: '⇐',//'⇐',	// Backspace
	//	  9: '⇔',			// Tab
		 13: '↵', //'↵',	// Enter
		 27: 'Esc',
		 32: 'Space',
		 37: '←',		// Pfeiltaste
		 38: '↑',		// Pfeiltaste
		 39: '→',		// Pfeiltaste
		 40: '↓',		// Pfeiltaste
		 45: 'Einfg',
		 46: 'Entf',
		 91: 'Linkes Fenster', // left window
		 92: 'Rechtes Fenster', // right window
		 93: 'Auswählen', // select key
		 96: '0', // Numpad 0
		 97: '1', // Numpad 1
		 98: '2', // Numpad 2
		 99: '3', // Numpad 3
		100: '4', // Numpad 4
		101: '5', // Numpad 5
		102: '6', // Numpad 6
		103: '7', // Numpad 7
		104: '8', // Numpad 8
		105: '9', // Numpad 9
		106: '*', // Numpad *
		107: '+', // Numpad +
		109: '-', // Numpad -
		110: ',', // Numpad ,
		111: '/', // Numpad /
		163: '#',
		188: ',',
		189: '-',
		190: '.'
	},
	char: function(num) {
		if (this.specialChars.hasOwnProperty(num))
			return this.specialChars[num];
		return String.fromCharCode(num);
	},
	init: function() {
		if (!Settings.get('hotkeys_active'))
			return;
		
		// Link-Fix Anfang
		$('a').click(function(){this.blur()});
		// Link-Fix Ende
		
		document.addEventListener('keyup', Hotkeys.keyUp, false);
		
		// Anzeige
		if (Settings.get('hotkeys_note')) {
			var key;
			for (var name in this.els.all) {
				key = this.userKeys.all[name] || this.stdKeys.all[name];
				this.els.all[name]( this.char(key) );
			}
			for (var name in this.els[game_data.screen]) {
				key = this.userKeys.hasOwnProperty(game_data.screen) && this.userKeys[game_data.screen][name] || this.stdKeys[game_data.screen][name];
				this.els[game_data.screen][name]( this.char(key) );
			}
		}
		
		// Versammlungsplatz:
		if ($('#units_form').length) {
			$('#units_form')[0].addEventListener('submit', function(e) {
				if (!Hotkeys.actions.place.submit(e, true)) {
					e.preventDefault();
					return false;
				}
				return true;
			}, false);
		}
	},
	keyUp: function(e) {
		e = e || window.event;
		if (game_data.screen == 'settings' && game_data.mode == 'settings' || $('#dsfa_settings').is(':visible') || e.shiftKey || e.ctrlKey || e.altKey)
			return;
		
		if (document.activeElement.nodeName == 'INPUT' && (
			 document.activeElement.type && document.activeElement.type.toUpperCase() == 'TEXT' ||
			 document.activeElement.type && document.activeElement.type.toUpperCase() == 'PASSWORD'
			) ||
			 document.activeElement.nodeName == 'TEXTAREA')
			return;
		
		var keyPressed = false,
		keyCode = e.keyCode ? e.keyCode : (e.charCode ? e.charCode : e.which);
		if (keyCode >= 96 && keyCode <= 105)
			keyCode -= 48;
		
		for (var name in Hotkeys.stdKeys.all) {
			var key = Hotkeys.userKeys.all[name] || Hotkeys.stdKeys.all[name];
			if (key == keyCode) {
				Hotkeys.actions.all[name]();
				keyPressed = true;
				break;
			}
		}
		for (var name in Hotkeys.stdKeys[game_data.screen]) {
			key = Hotkeys.userKeys.hasOwnProperty(game_data.screen) && Hotkeys.userKeys[game_data.screen][name] || Hotkeys.stdKeys[game_data.screen][name];
			if (key == keyCode) {
				Hotkeys.actions[game_data.screen][name](e);
				keyPressed = true;
				break;
			}
		}
		
		if (keyPressed) {
			e.cancelBubble = true;
			e.returnValue = false;
			
			if (e.stopPropagation) {
				e.stopPropagation();
				e.preventDefault();
			}
		}
		return false;
	}
};


/*
 * Village
 * Alle Dörfer (auch eigene!?)
 */
Village = {
	_change: false,
	_data: lib.storage.getValue('village_data', {}),
	_coords: lib.storage.getValue('village_coords', {}),
	list: lib.storage.getValue('village_list', []),
	_std: {
		coords: '',
		name: '',
		ownerID: -1,
		spyReportID: 0,
		spyReportTime: 0,
		lastReportID: 0,
		lastReportTime: 0,
		units: {},
		buildings: {},
		wood: 0,
		stone: 0,
		iron: 0,
		mood: 100,
		bonus: 0,
		eq: 1,
		eqCount: 0,
		locked: false
	},
	_getDefault: function() {
		return $.extend({}, this._std);
	},
	_getMining: (function() {
		if (!lib || !lib.serverConfig || !lib.serverConfig.game_base_config)
			return null;
		
		switch (lib.serverConfig.game_base_config) {
			case 1:
				return function(ID, mine) { var bonus = this._data[ID].bonus, level = this.getBuilding(ID,mine); return Math.round((level == 0 ? 5 : Math.round(15 * Math.pow(1.1849979, (level - 1)))) * lib.serverConfig.speed) * (bonus == Settings.boni[mine] ? 2 : (bonus == Settings.boni.all ? 1.3 : 1)); };
			case 3:
				return function(ID, mine) { var bonus = this._data[ID].bonus, level = this.getBuilding(ID,mine); return Math.round((level == 0 ? 5 : Math.round(30 * Math.pow(1.149999, (level - 1)))) * lib.serverConfig.speed) * (bonus == Settings.boni[mine] ? 2 : (bonus == Settings.boni.all ? 1.3 : 1)); };
			case 4:
			case 5:
			case 6:
				return function(ID, mine) { var bonus = this._data[ID].bonus, level = this.getBuilding(ID,mine); return Math.round((level == 0 ? 5 : Math.round(30 * Math.pow(1.163118, (level - 1)))) * lib.serverConfig.speed) * (bonus == Settings.boni[mine] ? 2 : (bonus == Settings.boni.all ? 1.3 : 1)); };
		}
	})(),
	_getStorageSize: (function() {
		if (!lib || !lib.serverConfig || !lib.serverConfig.game_base_config)
			return null;
		
		switch (lib.serverConfig.game_base_config) {
			case 1:
				return function(ID) { var ret = 1000 * Math.pow(1.23, this._data[ID].buildings.storage - 1); if (this._data[ID].bonus == Settings.boni.storage) ret *= 1.5; return Math.round(ret); };
			case 3:
				return function(ID) { var ret = 1000 * Math.pow(1.23, this._data[ID].buildings.storage - 1); if (this._data[ID].bonus == Settings.boni.storage) ret *= 1.5; return Math.round(ret); };
			case 4:
			case 5:
			case 6:
				return function(ID) { var ret = 1000 * Math.pow(1.2294934, this._data[ID].buildings.storage - 1); if (this._data[ID].bonus == Settings.boni.storage) ret *= 1.5; return Math.round(ret); };
		}
	})(),
	_getHideSize: (function() {
		if (!lib || !lib.serverConfig || !lib.serverConfig.game_base_config)
			return null;
		
		switch (lib.serverConfig.game_base_config) {
			case 1:
				return function(ID) { var level = this.getBuilding(ID, 'hide'); return !level ? 0 : Math.round(100 * Math.pow(1.3511, level-1)); };
			case 3:
				return function(ID) { var level = this.getBuilding(ID, 'hide'); return !level ? 0 : Math.round(100 * Math.pow(1.3511, level-1)); };
			case 4:
			case 5:
			case 6:
				return function(ID) { var level = this.getBuilding(ID, 'hide'); return !level ? 0 : Math.round(150 * Math.pow(1.3335, level-1)); };
		}
	})(),
	_getMaxPop: (function() {
		if (!lib || !lib.serverConfig || !lib.serverConfig.game_base_config)
			return null;
		
		switch (lib.serverConfig.game_base_config) {
			case 1:
				return function(ID) { var level = this.getBuilding(ID, 'farm'); return Math.round(240 * Math.pow(1.17, level-1)); };
			case 3:
				return function(ID) { var level = this.getBuilding(ID, 'farm'); return Math.round(240 * Math.pow(1.17, level-1)); };
			case 4:
			case 5:
			case 6:
				return function(ID) { var level = this.getBuilding(ID, 'farm'); return !level ? 0 : Math.round(240 * Math.pow(1.1721024, level-1)); };
		}
	})(),
	_levelPoints: function(key, level) {
		return (level == 0 ? Settings.buildingPoints[key] : (level == 1 ? Math.round(Settings.buildingPoints[key] * Math.pow(1.2, level)) - Settings.buildingPoints[key] : Math.round(Settings.buildingPoints[key] * Math.pow(1.2, level)) - Math.round(Settings.buildingPoints[key] * Math.pow(1.2, level - 1))));
	},
	_ID: function(idx) {
		if (typeof(idx) == "string" && idx.indexOf('|') != -1)
			return this._getID(idx);
		else
			return idx;
	},
	_getID: function(idx) {
		return !this._coords[idx] ? 0 : this._coords[idx];
	},
	save: function() {
		if (this._change || arguments.length > 0 && arguments[0] === true) {
			lib.storage.setValue("village_data", this._data);
			lib.storage.setValue("village_coords", this._coords);
			this._change = false;
			return true;
		}
		return false;
	},
	own: lib.storage.getValue('ownVillages', []),
	THIS: win.game_data.village.id,
	init: function() {
		if ($('#combined_table').length || $('#production_table tr').length) {
			var rows = $('#combined_table').length ? $('#combined_table tr') : $('#production_table tr'),
			match,
			villIdx = 0,
			pointsIdx = -1,
			ownVills = [];
			for (var i = 0; i < rows[0].cells.length; i++) {
				if (texts.regex.village.test(rows[0].cells[i].innerHTML))
					villIdx = i;
				else if (texts.regex.points.test(rows[0].cells[i].innerHTML))
					pointsIdx = i;
			}
			for (var i = 1; i < rows.length; i++) {
				match = rows[i].cells[villIdx].innerHTML.match(texts.regex.ownVill);
				if (match) {
					ownVills.push({
						id: parseInt(match[1], 10),
						name: match[2],
						x: parseInt(match[3], 10),
						y: parseInt(match[4], 10),
						con: parseInt(match[5], 10),
						points: pointsIdx != -1 ? parseInt(rows[i].cells[pointsIdx].innerHTML.remove(/<span class="grey">\.<\/span>/g), 10) : 0
					});
				}
			}
			Village.own = ownVills;
			lib.storage.setValue('ownVillages', Village.own);
		}
		if (this.own.length > 1 && !lib.hasPA && Settings.get('paFeatures_freePA')) {
			var prevLocation = '',
			nextLocation = '';
			if (this.own[0].id == this.THIS) {
				// falls vom ersten zum letzten Dorf wechseln deaktiviert wurde
				//if (getValue('village_wrap') == '1')
					prevLocation = location.href.replace(regex.villageChangeReplacer, '/game.php?$1$2village='+ this.own[this.own.length-1].id);
				nextLocation = location.href.replace(regex.villageChangeReplacer, '/game.php?$1$2village='+ this.own[1].id);
			} else if (this.own[this.own.length-1].id == this.THIS) {
				prevLocation = location.href.replace(regex.villageChangeReplacer, '/game.php?$1$2village='+ this.own[this.own.length-2].id);
				// falls vom Letzen zum ersten Dorf wechseln deaktiviert wurde
				//if (getValue('village_wrap') == '1')
					nextLocation = location.href.replace(regex.villageChangeReplacer, '/game.php?$1$2village='+ this.own[0].id);
			} else {
				for (var i = 1, max = this.own.length-1; i < max; i++) {
					if (this.own[i].id == this.THIS) {
						prevLocation = location.href.replace(regex.villageChangeReplacer, '/game.php?$1$2village=' + this.own[i-1].id);
						nextLocation = location.href.replace(regex.villageChangeReplacer, '/game.php?$1$2village=' + this.own[i+1].id);
					}
				}
			}
			
			// Pfeil nach Links
			if (prevLocation == '') {
				$('<td class="box-item icon-box separate arrowCell">' +
					'<span class="arrowLeftGrey"> </span>' +
				'</td>').insertBefore($('#menu_row2_village'));
			} else {
				$('<td class="box-item icon-box separate arrowCell">' +
					'<a id="village_switch_left" class="village_switch_link" href="'+ prevLocation +'" accesskey="a">' +
						'<span class="arrowLeft"> </span>' +
					'</a>' +
				'</td>').insertBefore($('#menu_row2_village'));
			}
			// Pfeil nach Rechts
			if (nextLocation == '') {
				$('<td class="box-item icon-box separate arrowCell">' +
					'<span class="arrowRightGrey"> </span>' +
				'</td>').insertBefore( $('#menu_row2_village') );
			} else {
				$('<td class="box-item icon-box separate arrowCell">' +
					'<a id="village_switch_right" class="village_switch_link" href="'+ nextLocation +'" accesskey="d">' +
						'<span class="arrowRight"> </span>' +
					'</a>' +
				'</td>').insertBefore($('#menu_row2_village'));
			}
		}
		if (!lib.hasPA && Settings.get('paFeatures_freePA')) {
			var td = document.createElement('td');
			td.setAttribute('class', 'box-item');
			var a = document.createElement('a');
			html = '<a href="javascript:;" id="open_groups"><span class="icon header arr_down"></span></a>' +
			'<a href="javascript:;" id="close_groups" style="display: none;"><span class="icon header arr_up"></span></a>';
			td.innerHTML = html;
			$('#menu_row2')[0].appendChild(td);
			
			if ( $('#inline_popup').length != 0 ) {
				$('#inline_popup').attr('class', 'popup_style ui-draggable');
			} else {
				$('body').append('<div id="inline_popup" class="popup_style ui-draggable">' +
					'<div id="inline_popup_menu">' +
						'<a href="javascript:inlinePopupClose()">schließen</a>' +
					'</div>' +
					'<div id="inline_popup_main" style="height: auto; ">' +
						'<div id="inline_popup_content"></div>' +
					'</div>' +
				'</div>');
				$('inline_popup').hide();
				$('#inline_popup_menu a').mouseup(function(e) {
					$('#open_groups, #close_groups').toggle();
				});
			}
			
			$('#open_groups').click(function(e) {
				var HTML = '<form id="select_group_box"'+ /*' action="/game.php?village=55076&amp;screen=groups&amp;mode=overview&amp;ajax=load_villages_from_group" method="POST"'+*/ '>' +
					'<input type="hidden" name="mode" value="overview">' +
					//'<p style="margin: 0 0 10px 0; font-weight: bold;">Gruppe:<select id="group_id" name="group_id" style="margin-left: 3px; "><option value="3431">Def</option><option value="3430">Off</option><option value="0">alle</option></select></p>' +
					'<p style="margin: 0 0 10px 0; font-weight: bold;">Gruppe:<select id="group_id" name="group_id" style="margin-left: 3px; "><option value="0">alle</option></select></p>' +
				'</form>' +
				'<div id="group_list_content" style="overflow-x: auto; overflow-y: auto; height: auto; ">' +
					'<table id="group_table" class="vis" width="100%" cellpadding="5" cellspacing="0"><tr><th class="group_label" colspan="2">Dorf</th></tr></table>' +
						'<div id="group_popup_content_container">' +
							'<table id="group_table" class="vis" width="100%" cellpadding="5" cellspacing="0">';
				for ( var i = 0; i < Village.own.length; ++i ) {
					HTML += '<tr>' +
						'<td'+ (Village.own[i].id == Village.THIS ? ' class="selected"' : '') +'><a href="javascript:selectVillage('+ Village.own[i].id +', 0)">'+ Village.own[i].name +'</a></td>' +
						'<td style="font-weight: bold; width: 100px; text-align: right;"'+ (Village.own[i].id == Village.THIS ? ' class="selected"' : '') +'>'+ Village.own[i].x +'|'+ Village.own[i].y +'</td>' +
					'</tr>';
				}
				HTML += '</table>' +
				'</div>';
				win.inlinePopup(e, 'inline_popup', null, {
					offset_x: 0,
					offset_y: 0
				}, HTML);
				win.UI.Draggable($('#inline_popup'));
				$('#inline_popup').css('width', '320px').find('h3').hide();
				$('#inline_popup_main').css('max-height', 950);
				$('#inline_popup_main').css('oveflow-y', 'scroll');
				$('#inline_popup_main').css('height', '380px');
				$('#inline_popup_main div').css('height', 'auto');
				
				if ( $('#inline_popup').is(':hidden') )
					$('#inline_popup').toggle();
				if ( $('#close_groups').is(':hidden') )
					$('#close_groups, #open_groups').toggle();
				$('#closelink_group_popup').click(function() {
					$('#close_groups').click();
				});
			});
			$('#close_groups').click(function() {
				if ( $('#open_groups').is(':hidden') )
					$('#open_groups, #close_groups').toggle();
				if ( !$('#inline_popup').is(':hidden') )
					$('#inline_popup').toggle();
			});
		}
	},
	get: function(ID, key) {
		ID = this._ID(ID);
		if (typeof(this._data[ID]) == "undefined")
			return this._std[key];
		else if (!this._data[ID].hasOwnProperty(key)) {
			if (this._std.hasOwnProperty(key))
				return this._data[ID][key] = this._std[key];
			else
				return null;
		} else
			return this._data[ID][key];
	},
	set: function(ID, key, value) {
		if (typeof(key) == 'object' && typeof(value) == "undefined") {
			for (var i in key)
				this.set(ID, i, key[i]);
		} else {
			if (!this._std.hasOwnProperty(key))
				return;
			if (typeof(this._data[ID]) == "undefined")
				this._data[ID] = this._getDefault();
			this._data[ID][key] = value;
			if (key == 'coords') {
				this._coords[value] = ID;
			}
		}
		this._change = true;
	},
	getRes: function(ID, time, eq, hide) {
		if (typeof(this._data[ID]) == "undefined")
			this._data[ID] = this._getDefault();
		if (time == null || time == 'now')
			time = lib.getTime();
		eq = eq || Settings.get('place_considerEQ');	// wenn nichts anderes angegeben ist, die Einstellungen verwenden
		
		var village = this._data[ID];
		if (!village.spyReportTime)	// noch kein Spähbericht!
			return false;
		
		hide = hide === false ? 0 : this._getHideSize(ID);
		eq = eq ? village.eq : 1;
		
		var timeDiff = (time - village.lastReportTime) / 3600,
		ret = {
			max: this._getStorageSize(ID) - hide,
			wood: village.wood + Math.round(timeDiff * this._getMining(ID, 'wood') * eq),
			stone: village.stone + Math.round(timeDiff * this._getMining(ID, 'stone') * eq),
			iron: village.iron + Math.round(timeDiff * this._getMining(ID, 'iron') * eq)
		};
		if (ret.max < 0)
			ret.max = 0;
		if (ret.wood > ret.max)
			ret.wood = ret.max;
		if (ret.stone > ret.max)
			ret.stone = ret.max;
		if (ret.iron > ret.max)
			ret.iron = ret.max;
		ret.sum = ret.wood + ret.stone + ret.iron;
		
		return ret;
	},
	getResProd: function(ID) {
		return {
			wood: this._getMining(ID, 'wood'),
			stone: this._getMining(ID, 'stone'),
			iron: this._getMining(ID, 'iron'),
			sum: this._getMining(ID, 'wood') + this._getMining(ID, 'stone') + this._getMining(ID, 'iron')
		};
	},
	getResWarn: function(ID, time, eq, proz, hide) {
		var res = this.getRes(ID, time, eq);
		if (!proz)
			proz = 1;
		return {
			wood: (res.wood >= res.max * proz),
			stone: (res.stone >= res.max * proz),
			iron: (res.iron >= res.max * proz),
			sum: (res.sum >= 3 * res.max * proz)
		};
	},
	getBuilding: function(ID, key) {
		return ( typeof(this._data[ID]) == "undefined" || typeof(this._data[ID].buildings[key]) == "undefined") ? 0 : this._data[ID].buildings[key];
	},
	getBuildUps: function(ID, pointsDiff) {
		var ret = {};
		
		// einfacher Ausbau
		for (var key in lib.buildingInfo) {
			// Die Vorraussetzungen für die Gebäude berücksichtigen!
			if (key == 'church_f' && this.getBuilding(ID, 'church') > 0 || key == 'church' && this.getBuilding(ID, 'church_f') > 0)
				continue;	// es gibt bereits eine Kirche
			
			var level = this.getBuilding(ID, key),
			points = this._levelPoints(key, level);
			if (level == lib.buildingInfo[key].max_level)
				continue;	// max. Ausbaulevel erreicht
			
			if (points <= pointsDiff) {
				ret[key] = ++level;
				var tmp = pointsDiff - points;
				for (var max = lib.buildingInfo[key].max_level; level < max && tmp > 0; level++) {
					points = this._levelPoints(key, level);
					tmp -= points;
					if (tmp >= 0)
						ret[key] = level+1;
				}
			}
		}
		return ret;
	},
	getBuildUps2: function(ID, pointsDiff) {
		
		var getBuildUpsRec = function(buildings, pointsDiff) {
			var ret = {};
			counter++;
			if (counter >= 10000)	// um einen Überlauf zu verhindern
				return ret;
			for (var key in buildings) {
				if (lib.serverConfig.game_church != 0 && (key == 'church_f' && buildings.church > 0 || key == 'church' && buildings.church_f > 0))
					continue;	// bereits eine Kirche
				
				var level = buildings[key],
				points = Village._levelPoints(key, level);
				if (points == pointsDiff)
					ret[texts.buildings[key] + " Stufe " + (level + 1)] = true;
				else if (points < pointsDiff) {
					buildings2 = $.extend({}, buildings);
					buildings2[key]++;
					if (buildings2[key] == lib.buildingInfo[key].max_level)
						delete buildings2[key];
					var tmp = getBuildUpsRec(buildings2, pointsDiff - points);
					if (tmp != {})
						ret[texts.buildings[key] + " Stufe " + (level + 1)] = tmp;
				}
				delete buildings[key];
			}
			return ret;
		},
		dumpRet = function(obj, tabs) {
			var str = '';
			if (!tabs) {
				tabs = '';
				str = "\nDie Ausbaumöglichkeiten sind wie ein Baum aufgefächert:\n";
			}
			var ntabs = tabs + "-\t";
			for (var key in obj) {
				if (!obj.hasOwnProperty(key))
					continue;
				
				if (typeof(obj[key] ) == "object") {
					str += "\n" + tabs + key;
					str += dumpRet(obj[key], ntabs);
				} else {
					str += "\n" + tabs + key;
				}
			}
			if (tabs == '')
				lib.debug.log(str);
			return str;
		},
		ret2Arr = function(obj) {
			for (var key in obj) {
				if (!obj.hasOwnProperty(key))
					continue;
				// hier kommt noch was...
			}
		},
		buildings = $.extend({}, this._data[ID].buildings);
		
		// Gebäude, die noch nicht existieren mit Level 0 im Objekt speichern und fertig ausgebaute Gebäude löschen
		for (var key in lib.buildingInfo) {
			if (typeof(buildings[key]) == "undefined")
				buildings[key] = 0;
			else if (buildings[key] == lib.buildingInfo[key].max_level)
				delete buildings[key];
		}
		counter = 0;
		var ret = getBuildUpsRec(buildings, pointsDiff);
		if (counter >= 10000)
			lib.alert('Es gibt mehr als '+ counter +' Ausbaumöglichkeiten!');
		dumpRet(ret);
		
		ret2Arr(ret);
		
		return ret;
	},
	getUnit: function(ID, key) {
		return ( typeof(this._data[ID]) == "undefined" || typeof(this._data[ID].units[key]) == "undefined") ? 0 : this._data[ID].units[key];
	},
	getMood: function(ID, time) {
		if (typeof(time) == "undefined" || time == 'now') {	// jetzt
			time = lib.getTime();
		}
		return Math.min(100, this._data[ID].mood + Math.floor((time - this._data[ID].spyReportTime) / 3600) * lib.serverConfig.speed);
	},
	getPoints: function(ID) {
		var points = 0;
		for (var key in lib.buildingInfo) {
			if (!this.getBuilding(ID, key))
				continue;	// Gebäudelevel 0
			points += Math.round(Settings.buildingPoints[key] * Math.pow(1.2, this.getBuilding(ID, key) - 1));
		}
		return points;
	},
	getLastTimeDiff: function(ID, time) {
		if (typeof(time) == "undefined" || time == 'now')
			time = lib.getTime();
		return typeof(this._data[ID]) == "undefined" ? Number.MAX_VALUE : (time - this._data[ID].lastReportTime);
	},
	getSpyDate: function(ID, str) {
		if (typeof(this._data[ID]) == "undefined")
			this._data[ID] = this._getDefault();
		return lib.formatTime(this._data[ID].spyReportTime * 1000, str);
	},
	getLastDate: function(ID, str) {
		if (typeof(this._data[ID]) == "undefined")
			this._data[ID] = this._getDefault();
		return lib.formatTime(this._data[ID].lastReportTime * 1000, str);
	},
	getLastReportNum: function(ID) {
		return (typeof(this._data[ID]) == "undefined" || typeof(Report._data[this._data[ID].lastReportID]) == "undefined") ? 0 : Report._data[this._data[ID].lastReportID];
	},
	recalcEQ: function(ID, resExpected, attResultTotal) {
		var resActual = this.getRes(ID, this._data[ID].lastReportTime, false);
		if (resExpected !== false && resActual !== false && resExpected.sum != 0) {
			if (this._data[ID].eqCount == 0)
				this._data[ID].eq = ((attResultTotal + resActual.sum) / resExpected.sum) / (++this._data[ID].eqCount);
			else
				this._data[ID].eq = (this._data[ID].eq * this._data[ID].eqCount + ((attResultTotal + resActual.sum) / resExpected.sum) ) / (++this._data[ID].eqCount);
		}
		this._change = true;
	},
	exist: function(ID) {
		return ( typeof(this._data[ID]) != "undefined" && this._data[ID].lastReportTime != 0 );
	},
	existSpy: function(ID) {
		return ( typeof(this._data[ID]) != "undefined" && this._data[ID].spyReportTime != 0 );
	},
	getCoords: function(ID) {
		if (typeof(this._data[ID]) == "undefined")
			return null;
		if (arguments.length > 1) {
			if (arguments[1] == 'x')
				return this._data[ID].coords.split('|')[0];
			else if (arguments[1] == 'y')
				return this._data[ID].coords.split('|')[1];
			else
				return false;
		} else
			return this._data[ID].coords;
	},
	noUnits: function(ID) {
		if (typeof(this._data[ID]) == "undefined")
			return true;
		for (var key in lib.unitInfo) {
			if (this.getUnit(ID, key) > 0)
				return false;
		}
		return true;
	},
	isBarbarian: function(ID) {
		return (typeof(this._data[ID]) != "undefined" && this._data[ID].ownerID == 0);
	},
	isLocked: function(ID) {
		return (typeof(this._data[ID]) != "undefined" && this._data[ID].locked);
	},
	register: function(ID, data) {
		if (typeof(this._data[ID]) == "undefined" || this._data[ID].spyReportTime < data.spyReportTime) {
			if (typeof(this._data[ID]) != "undefined" && this._data[ID].lastReportTime > data.lastReportTime) {
				data.lastReportID = this._data[ID].lastReportID;
				data.lastReportTime = this._data[ID].lastReportTime;
			}
			this._data[ID] = data;
			this._coords[data.coords] = ID;
			this.save(true);
			return true;
		}
		return false;
	},
	setData: function(ID, cx, cy, name, ownerID, bonus) {
		if (typeof(this._data[ID]) == "undefined")
			this._data[ID] = this._getDefault();
		this._data[ID].coords = cx + '|' + cy;
		if (name == 0)
			name = 'Barbarendorf';
		this._data[ID].name = name;
		this._data[ID].ownerID = ownerID;
		if (bonus && bonus.length == 2) {
			var match = bonus[1].match(/bonus\/(.+)\.png/);
			if (match && Settings.boni[match[1]])
				this._data[ID].bonus = Settings.boni[match[1]];
		}
		this._coords[cx + '|' + cy] = ID;
		
		this._change = true;
	},
	setLock: function(ID, locked) {
		if (typeof(this._data[ID]) == "undefined")
			this._data[ID] = this._getDefault();
		this._data[ID].locked = locked;
		this.save(true);
	},
	list: function(locked) {
		if (typeof(locked) == "undefined")
			locked = false;
		var ret = [];
		for (var key in this._data) {
			if (this._data[key].locked && locked || !this._data[key].locked && !locked)
				ret.push(key);
		}
		return ret;
	},
	listAll: function() {
		var ret = [];
		for (var key in this._data) {
			ret.push(key);
		}
		return ret;
	},
	delData: function(ID) {
		if (typeof(this._data[ID]) == "undefined")
			return;
		delete this._coords[this._data[ID].coords];
		if (typeof(Command._data.to[ID]) != "undefined") {
			for (var i = 0; i < Command._data.to[ID].length; i++) {
				var actionID = Command._data.to[ID][i];
				if (typeof(Command._data[actionID]) != "undefined") {
					var fromID = Command._data[actionID].from,
					pos = Command._data.from[fromID].length;
					for (var j = 0; j < pos; j++) {
						if (Command._data.from[fromID][j] == actionID) {
							Command._data.from[fromID].splice(j, 1);
							pos = j;
						}
					}
					delete Command._data[actionID];
					// actionIDs löschen
				}
			}
			delete Command._data.to[ID];
		}
		delete Report._data[this._data[ID].lastReportID];
		delete Report._data[this._data[ID].spyReportID];
		delete this._data[ID];
		this.save(true);
	}
};


/*
 * Command
 * Informationen über Befehle
 */
Command = {
	_change: false,
	_data: lib.storage.getValue('command_data', {
		from: {},
		to: {}
	}),
	_std: {
		from: {},
		to: {}
	},
	save: function() {
		if (this._change || arguments.length > 0 && arguments[0] === true) {
			lib.storage.setValue("command_data", this._data);
			this._change = false;
			return true;
		}
		return false;
	},
	init: function() {
		// ist noch zu verbessern:
		if (game_data.screen == 'info_command') {
			var table = $('#content_value').find('table').eq(0),
			attacker = table.find('tr').eq(1).find('a').html() || '---',
			attackerCoords = table.find('tr').eq(2).find('a').html().match(regex.coords)[1],
			defender = table.find('tr').eq(3).find('a').html() || '---',
			defenderCoords = table.find('tr').eq(4).find('a').html().match(regex.coords)[1],
			arrivalTime = null,
			arrivalIn = null,
			wall = game_data.village.buildings && game_data.village.buildings.wall || '',
			idx = 5;
			if (!/\d+\.\d+\.\d+ \d+:\d+:\d+/.test(table.find('tr').eq(idx).find('td').last().html())) {
				idx++;
			}
			arrivalTime = table.find('tr').eq(idx).find('td').last().html();
			arrivalIn = table.find('tr').eq(idx+1).find('td').last().html();
			if (arrivalTime)
				arrivalTime = arrivalTime.replace('<span class="small grey">', '[size=8][color=#ff0000]').replace('</span>', '[/color][/size]');
			if (arrivalIn)
				arrivalIn = arrivalIn.remove(/<[^>]+>/g);
			if (attacker != '---')
				attacker = '[player]'+ attacker +'[/player]';
			if (defender != '---')
				defender = '[player]'+ defender +'[/player]';
			if (wall && defender != '---') {
				var defenderID = table.find('tr').eq(3).find('a').attr('href').match(regex.ID)[1];
				if (defenderID == game_data.player.id) {
					wall = parseInt(wall, 10);
					var color = 'ff0000';
					if (wall > 15)
						color = '23c823';
					else if (wall > 5)
						color = '0000ff';
					wall = '[*][b]Wallstufe:[/b][|][b][color=#'+ color +']'+ wall +'[/color][/b][|]\r\n';
				} else
					wall = '';
			} else
				wall = '';
			
			var text = '[table]' +'\r\n'+
				'[*]Herkunft[|]Spieler:[|]'+ attacker +'\r\n'+
				'[*][|]Dorf:[|][coord]'+ attackerCoords +'[/coord]' +'\r\n'+
				'[*]Ziel[|]Spieler:[|]'+ defender +'\r\n'+
				'[*][|]Dorf:[|][coord]'+ defenderCoords +'[/coord]' +'\r\n'+
				'[*]Ankunft:[|][|]'+ arrivalTime +'\r\n'+
				'[*]Ankunft in:[|][|]'+ arrivalIn +'\r\n'+
				wall +
			'[/table]';
			$(
				'<tr><td colspan="3"><a href="javascript:;" id="dsfa_formatAttack">» fürs Forum formatieren</a></td></tr>' +
				'<tr style="display: none;" id="dsfa_formatAttack_textRow"><td colspan="3">' +
					'<textarea style="width: 95%; height: 160px;" id="dsfa_formatAttack_text" onfocus="this.select();">'+ text +'</textarea>' +
				'</td></tr>'
			).insertBefore(table.find('tr').last());
			$('#dsfa_formatAttack').click(function() {
				$('#dsfa_formatAttack_textRow').toggle();
				if ($('#dsfa_formatAttack_textRow').is(':visible'))
					$('#dsfa_formatAttack_text').focus();
			});
		} else if ($('#units_form').length || $('#overviewtable').length) {
			var commands = [],
			fromID = game_data.village.id,
			ths = $('#units_form').parent().find('th'),
			fail = false;
			if (!ths.length)
				ths = $('#show_outgoing_units th');
			
			for (var i = 0; i < ths.length; i++) {
				if (texts.regex.ownCommands.test(ths[i].innerHTML)) {
					var rows = $(ths[i]).parent().parent().find('tr');
					for (var j = 1; j < rows.length; j++) {
						var match,
						cells = rows[j].cells;
						if (cells.length < 3)
							return;
						match = cells[0].innerHTML.match(texts.regex.commands.attack);
						if (match) {	// ein Angriff
							var idx = match[2] + '|' + match[3],
							actionID = cells[0].innerHTML.match(texts.regex.commandLink),
							time = texts.locale.timeStr2Sec(cells[1].innerHTML.remove(/<[^>]+>/g)),
							cancel = texts.regex.commands.cancel.test(cells[cells.length - 1].innerHTML);
							if (actionID)	// nur dann, wenn es sich um einen eigenen Angriff handelt! - Was sollte es auch sonst sein?
								commands.push([actionID[1], fromID, idx, time, 1, cancel]);
						} else {	// kein Angriff oder umbenannt
							if (texts.regex.attackImg.test(rows[j].innerHTML))	// Angriff wurde umbenannt!
								fail = true;
						}
					}
					break;
				}
			}
			if (fail)
				lib.error(texts.gui.readAttacksFail);
			
			// Erstmal aufräumen
			if (typeof(this._data.from[fromID]) != "undefined") {
				for (var i = 0; i < this._data.from[fromID].length; i++) {
					var actionID = this._data.from[fromID][i];
					if (typeof(this._data[actionID]) != "undefined") {
						var toID = this._data[actionID].to, pos = this._data.to[toID].length;
						for (var j = 0; j < pos; j++) {
							if (this._data.to[toID][j] == actionID) {
								this._data.to[toID].splice(j, 1);
								pos = j;
							}
						}
						delete this._data[actionID];	// actionIDs löschen
					}
				}
			}
			this._data.from[fromID] = [];
			
			// danach neu setzen
			for (var i = 0; i < commands.length; i++) {
				var actionID = commands[i][0],
				//fromID = commands[i][1],
				toID = Village._getID(commands[i][2]),
				time = commands[i][3],
				type = commands[i][4],
				cancelable = commands[i][5];
				if (!toID)
					continue;
				
				this._data.from[fromID].push(actionID);
				
				if (typeof(Command._data.to[toID]) == "undefined") {
					this._data.to[toID] = [actionID];
				} else {
					var pos = this._data.to[toID].length;
					for (var j = 0; j < pos; j++) {
						if (this._data.to[toID][j] == actionID) {
							pos = j;
						}
					}
					if (pos == this._data.to[toID].length) {
						this._data.to[toID].push(actionID);
					}
				}
				
				this._data[actionID] = {
					from: fromID,
					to: toID,
					time: time,
					type: type,
					cancel: cancelable
				};
			}
			
			this.save(true);
		}
	},
	getAttacks: function(ID) {
		return typeof(this._data.to[ID]) == "undefined" ? [] : this._data.to[ID];
	}
};


/*
 * Report
 * Alles über und für Berichte
 */
Report = {
	_change: false,
	_data: lib.storage.getValue('report_ids', {}),
	_data2: lib.storage.getValue('report_data', {}),
	ret: null,
	els: {
		time: null,
		luck: null,
		moral: null,
		attacker: null,
		defender: null,
		spy: null,
		units_out: null,
		units_way: null,
		result: null
	},
	_els_order: ['luck', 'moral', 'attacker', 'defender', 'spy', 'units_out', 'units_way', 'result'],
	els_order: lib.storage.getValue('report_els_order', ['luck', 'moral', 'attacker', 'defender', 'spy', 'units_out', 'units_way', 'result']),
	_els_active: {
		luck: true,
		moral: true,
		attacker: true,
		defender: true,
		spy: true,
		units_out: true,
		units_way: true,
		result: true
	},
	els_active: lib.storage.getValue('report_els_active', {
		luck: true,
		moral: true,
		attacker: true,
		defender: true,
		spy: true,
		units_out: true,
		units_way: true,
		result: true
	}),
	insAfter: null,
	save: function(change) {
		if (this._change || arguments.length > 0 && change === true) {
			lib.storage.setValue("report_ids", this._data);
			lib.storage.setValue('report_data', this._data2);
			this._change = false;
			return true;
		}
		return false;
	},
	init: function() {
		if ($('#units_form').length && $('#menu_row span.icon.header.new_report').length) {
			lib.success(texts.gui.newReport);
		}
		
		if (game_data.screen == 'report') {
			// hier Bericht-Daten (eingelesen, oder nicht, alter etc.) auslesen, bearbeiten...
			if (regex.viewID.test(location.href)) {
				
				// Berichtdaten anordnen
				var tr = $('#label').parent().parent().next();
				while (tr && tr.find('td>*').length) {
					tr = tr.next();
				}
				// Die Seite wurde zu stark manipuliert, um den Bericht einlesen zu können
				if (!tr) {
					return;
				}
				this.els.time = tr.find('td').last();
				
				this.els.luck = $('.report_transparent_overlay > *').slice(0, 2);
				this.els.moral = $('.report_transparent_overlay > *').eq(2);
				this.els.attacker = $('#attack_info_att');
				this.els.defender = $('#attack_info_def');
				this.els.spy = $('#attack_spy').prev().add('#attack_spy');
				this.els.units_way = $('#attack_away_units').prev().add('#attack_away_units');
				this.els.result = $('#attack_results');
				// Defender's troops, that were in transit
				var tmp = this.els.result.prev();
				if (tmp.length && !tmp.attr('id') && tmp.prev().length && tmp.prev()[0].nodeName == 'H4')
					this.els.units_out = tmp.prev().add(tmp);
				else
					this.els.units_out = $();
				
				if (this.els.attacker.length && this.els.defender.length && Settings.get('reports_reorder')) {
					Report.insAfter = $('#label').parent().parent().parent().find('>tr').last().find('td').eq(0).find('*').eq(0);
					var HTML = '<div style="text-align: right; position: relative; top: -'+ (Report.insAfter.height() + parseInt(Report.insAfter.css('margin-bottom'), 10) - 5) +'px;">' +
						'<a id="dsfa_reportOrder_link" href="javascript:;">'+ texts.reports.order.title +'</a>' +
						'<div style="position: absolute; width: 250px; height: 100px; display: none;" id="dsfa_reportOrder">' +
							'<table style="text-align:left; border: 2px solid #804000;" id="dsfa_reorder_tab" class="vis popup_content">' +
								'<tbody id="dsfa_reorder"></tbody>' +
								'<tfoot><tr><td style="background-color: transparent;" colspan="2"><button id="dsfa_submit_order">OK</button><button id="dsfa_cancel_order">X</button></td></tr></tfoot>' +
							'</table>' +
						'</div></div>';
					Report.insAfter = $(HTML).insertAfter(Report.insAfter);
					$('#dsfa_reportOrder_link').click(function() {
						Report.writeReorderPopup();
						$('#dsfa_reportOrder').css('left', Math.round( $(this).offset().left - $(this).parent().offset().left )).fadeIn(400);
					});
					$('#dsfa_submit_order')[0].addEventListener('click', function() {
						$('#dsfa_reportOrder').fadeOut(100);
						lib.storage.setValue('report_els_order', Report.els_order);
						lib.storage.setValue('report_els_active', Report.els_active);
					}, true);
					$('#dsfa_cancel_order')[0].addEventListener('click', function() {
						Report.els_order = lib.storage.getValue('report_els_order', Report._els_order);
						Report.els_active = lib.storage.getValue('report_els_active', Report._els_active);
						$('#dsfa_reportOrder').fadeOut(100);
						Report.reorder();
					}, true);
					
					$('.report_image').hide();
					this.reorder();
				}
				
				// "Einlesen"-Link hinzufügen
				$('.vis.modemenu > tbody').append(
					'<tr><td width="100">' +
						'<a href="javascript:;">Einlesen'+ (Settings.get('hotkeys_active') ? ' ['+ Hotkeys.char(82) +']' : '') +'</a>' +
					'</td></tr>'
				).find('tr').last().find('a')[0].addEventListener('click', Bot.startReportReading, true);
				
				// Bericht einlesen
				this.ret = this.read();
				
				var infoMessageStyle = document.body.appendChild(document.createElement('style'));
				infoMessageStyle.type = "text/css";
				if ($('#quickbar_outer').length) {
					infoMessageStyle.innerHTML = ".FarmReport { top: " + (112 + $('#quickbar_outer')[0].offsetHeight) + "px; }";
				} else {
					infoMessageStyle.innerHTML = ".FarmReport { top: 110px; }";
					var trys = 0,
					infoMessageStyleInterval = window.setInterval(function() {
						if ($('#quickbar_outer').length) {
							infoMessageStyle.innerHTML = ".FarmReport { top: " + (112 + $('#quickbar_outer')[0].offsetHeight) + "px; }";
							trys = 20;
						}
						trys++;
						if (trys >= 20) {
							window.clearInterval(infoMessageStyleInterval);
							infoMessageStyleInterval = null;
						}
					}, 50);
				}
				
				switch (this.ret) {
					case 1:
						lib.success(texts.gui.reportReadSuccess, 2500, 'FarmReport');
						break;
					case 2:
						lib.alert(texts.gui.reportReadUpToDate, 2500, 'FarmReport');
						break;
					case 3:
						lib.error(texts.gui.reportReadOutOfDate, 2500, 'FarmReport');
						// Das Datum rot machen
						$('#label').parents('tbody').eq(0).find('tr').eq(1).find('td').last().addClass('error');
						break;
				}
			} else {
				if ($('#report_list').length) {
					$('#report_list > tbody').prepend(
						'<tr><td colspan="3" style="text-align: right;">' +
							'<input id="dsfa_autoCleaning" type="button" value="'+ texts.gui.delOldReports +'">' +
							'<input id="dsfa_autoReading" type="button" value="'+ texts.gui.readReports +'">' +
						'</td></tr>'
					);
					
					$('#dsfa_autoCleaning')[0].addEventListener('click', Bot.startReportCleaning, true);
					$('#dsfa_autoReading')[0].addEventListener('click', Bot.startReportReading, true);
					
					if (!lib.hasPA && Settings.get('paFeatures_freePA')) {
						var el = document.getElementsByName('del');
						if (el && el.length) {
							$(el[0].parentNode).append(
								'<input type="submit" name="forward" value="Veröffentlichen">' +
								'<input type="submit" name="real_forward" value="Weiterleiten">'
							);
						}
					}
				}
			}
		}
		
		if ($('#report_list').length) {
			if (Settings.get('reports_showSearchInput')) {
				$('#report_list th').eq(0).append('&nbsp;<input type="text" id="dsfa_search" style="border: 1px solid grey; height: 15px; margin-left: 10px;">').find('#dsfa_search')[0]
				.addEventListener('keyup', function() {
					var search_str = $(this).val();
					$('#report_list th').eq(0).parent().nextAll('tr').each(function() {
						if (!$(this).find('td').length) {
							return;
						}
						if ($(this).find('td').eq(0).find('> span').eq(0).find('> a').eq(0).find('> span').eq(0).html().indexOf(search_str) < 0) {
							$(this).hide();
						} else {
							$(this).show();
						}
					});
				}, false);
			}
			
			$('#report_list th').eq(0).parent().append('<th>'+ texts.gui.FA +'</th>').parent().find('tr').last().append('<th></th>');
			var rows = $('#report_list tr').slice(1);	// gt(0) falls die Button-Leiste optional wird...
			for (var i = 1; i < rows.length - 1; i++) {
				var match = rows[i].innerHTML.match(regex.viewID);
				if (match) {
					var rid_num = Report._data[match[1]],
						hasDot = $(rows[i]).find('img').length && /graphic\/dots\//.test($(rows[i]).find('img').attr('src')),
						dot_img = '';
					if (!rid_num) {
						dot_img = Settings.get('reports_newReport');
						if (Settings.get('reports_changeLinkStyle') && hasDot) {
							$(rows[i]).find('a').eq(0).css('color', '#0000BB');
						}
					} else if (rid_num == 1) {
						dot_img = Settings.get('reports_oldReport');
						if (Settings.get('reports_changeLinkStyle') && hasDot) {
							$(rows[i]).find('a').eq(0).css('color', '#808080');
						}
					} else if (rid_num == 5 || rid_num == 6) {
						dot_img = Settings.get('reports_spyReport');
					} else {
						dot_img = Settings.get('reports_readReport');
					}
					$(rows[i]).append('<td style="text-align: center;"><img src="'+ image_base +'dots/'+ dot_img +'.png" alt=""></td>');
					
					if (!lib.hasPA && Settings.get('paFeatures_freePA')) {
						var nel = $(rows[i]).find('td').eq(0).find('img');
						if (nel.length == 1 && !/\/dots\/red\.png/.test(nel[0].src) && !/\/dots\/blue\.png/.test(nel[0].src) && rid_num > 1) {
							$('<img src="'+ image_base +'max_loot/'+ (rid_num == 3 || rid_num == 5 ? '1' : '0') +'.png" title="" alt="" style="margin-left: 5px;">').insertAfter(nel);
						}
					}
				}
			}
			
			// Alte Berichte markieren-Button
			if ($('#report_list').next('table').length) {
				$('#report_list').next('table').find('tr').eq(0).append('<td><input id="dsfa_markOldReports" type="button" value="'+ texts.gui.markOldReports +'"></td>');
				$('#dsfa_markOldReports').click(function() {
					// hier veraltete Berichte markieren
					var rows = $('#report_list tr');
					for (var i = 1; i < rows.length - 1; i++) {
						var match = $(rows[i]).html().match(regex.viewID);
						if (match) {
							var inputs = $(rows[i]).find('input').eq(0);
							if (inputs.attr('type') == 'checkbox' && Report._data[match[1]] == 1) {
								inputs.click();
							}
						}
					}
				});
			}
		}
	},
	delete: function() {
		if (game_data.screen == 'report') {
			$('#content_value a:contains('+ texts.reports.delete +')')[0].click();
		}
	},
	move: function() {
		if (game_data.screen == 'report') {
			$('#content_value a:contains('+ texts.reports.move +')')[0].click();
		}
	},
	next: function(min, max) {
		if (game_data.screen == 'report') {
			if ($('#content_value a:contains(<<)').length) {
				setRandom(function() { $('#content_value a:contains(<<)')[0].click() }, ( min ? min : 0), ( max ? max : 0));
				return true;
			}
			Bot.deactivate();
			return false;
		}
	},
	prev: function() {
		if (game_data.screen == 'report') {
			if ($('#content_value a:contains(>>)').length) {
				$('#content_value a:contains(>>)')[0].click();
				return true;
			}
			return false;
		}
	},
	getNum: function(ID) {
		return this._data[ID] || 0;
	},
	reorder: function() {
		var insAfter = Report.insAfter;
		for (var i = 0, maxi = Report.els_order.length; i < maxi; i++) {
			var item = Report.els[Report.els_order[i]],
			active = Report.els_active[Report.els_order[i]];
			for (var j = 0, maxj = item.length; j < maxj; j++) {
				var el = $(item[j]),
				tmp = null;
				if (j == maxj-1 && el.next().is('br')) {
					if (i == maxi-1) {
						tmp = el.next();
					} else {
						el.next().remove();
					}
				}
				if (!active)
					el.hide();
				else
					el.show();
				el.insertAfter(insAfter);
				insAfter = el;
				if (tmp) {
					tmp.insertAfter(insAfter);
					insAfter = tmp;
				}
			}
		}
	},
	writeReorderPopup: function() {
		var HTML = '';
		for (var i = 0; el = Report.els_order[i]; i++) {
			HTML += '<tr><td style="background-color: transparent;"><input name="dsfa_reorder_'+ el +'" type="checkbox"'+ (Report.els_active[el] ? ' checked' : '') +'></td>' +
				'<td>'+ texts.reports.order[el] +'</td>' +
				'<td style="background-color: transparent;"><div style="width: 11px; height: 11px; background-image: url('+ image_base +'sorthandle.png); cursor: pointer;" class="bqhandle"> </div></td></tr>';
		}
		$('#dsfa_reorder').html(HTML);
		
		$('#dsfa_reorder').sortable({
			axis: 'y',
			handle: '.bqhandle',
			update: function(event, ui) {
				var order = [];
				$('#dsfa_reorder').find('tr').each(function() {
					var name = $(this).find('input').attr('name').remove('dsfa_reorder_');
					order.push(name);
				});
				Report.els_order = order;
				Report.reorder();
				/*setTimeout(function() {
					Report.els_order = order;
					Report.reorder();
				}, 0);*/
			}
		});
		$('#dsfa_reorder').sortable('tr');
		$('#dsfa_reorder input').each(function() {
			var name = this.name && this.name.remove('dsfa_reorder_');
			if (!name)
				return;
			this.addEventListener('click', function() {
				Report.els_active[name] = this.checked;
				Report.reorder();
			}, false);
		});
	},
	
	_std: {
		name: '?',
		coords: '0|0',
		time: null,
		dot: 0,
		
		attackerID: 0,
		fromID: 0,
		ownerID: 0,
		toID: 0,
		
		loot: null,
		old: false,
		own: false	// nur eigene Angriffsberichte (z.B. für die Beute)
	},
	read: function() {
		var match = location.href.match(regex.viewID);
		if (!match)
			return;
		var reportID = parseInt(match[1], 10),	// als Zahl, damit man das vergleichen kann (je höher, desto neuer)
		status = 0,	// lokal
		dat = this._data2[reportID] || $.extend({}, this._std),
		els = this.els,
		attackReport = (
			els.defender.length &&
			els.attacker.length &&
			!texts.regex.specialEventVikings.test($('#content_value').html())	// das Weihachtsevent ignorieren
		);
		
		// Angriffsbericht
		if (els.defender.length && els.attacker.length) {
			var attackerIDval = els.attacker.find('tr').eq(0).find('th').eq(1).find('a').attr('href'),
			fromIDval = els.attacker.find('tr').eq(1).find('td').eq(1).find('a').attr('href'),
			ownerIDval = els.defender.find('tr').eq(0).find('th').eq(1).find('a').attr('href'),
			toIDval = els.defender.find('tr').eq(1).find('td').eq(1).find('a').attr('href');
			if (attackerIDval) {
				dat.attackerID = attackerIDval.match(regex.ID)[1];
				dat.own = dat.attackerID == game_data.player.id;
			}
			if (fromIDval) {
				dat.fromID = fromIDval.match(regex.ID)[1];
			}
			if (ownerIDval) {
				dat.ownerID = ownerIDval.match(regex.ID)[1];
			}
			if (toIDval) {
				dat.toID = toIDval.match(regex.ID)[1];
			}
			dat.time = texts.locale.timeStr2Sec(els.time.html());
			
			dat.dot = $('#label').prev().attr('src').remove(/.*dots\//, /\.png.*/);
			
			var toLink = els.defender.find('tr').eq(1).find('a').eq(0).html(),
			match = toLink && toLink.match(texts.regex.villageName);
			if (match) {
				dat.name = match[1];
				dat.coords = match[2] +'|'+ match[3];
			}
			
			Village.set(dat.toID, {
				name: dat.name,
				coords: dat.coords,
				ownerID: dat.ownerID
			});
			
			// Angriffsergebnis
			var attResult = {
				total: 0,
				max: 0,
				wood: 0,
				stone: 0,
				iron: 0,
				damage: [],
				loyalty: 100
			};
			if (Village.exist(dat.toID)) {
				// falls die Zustimmung noch runter ist
				attResult.loyalty = Village.getMood(dat.toID, dat.time);
			}
			var resultRows = els.result.find('tr'),
			bootyRowCells = els.result.find('tr').eq(0).find('td'),
			booty = (bootyRowCells.length == 2);
			if (booty) {
				var bootyResult = bootyRowCells.eq(0).html().remove(/<span class="grey">\.<\/span>/g),
				// Als regulärer Ausdruck geht /[^\d\/]/g nicht, weil dann von </span> der / übrig bleiben würde...
				bootyGes = bootyRowCells.last().html().remove(/<[^>]*>|\./g).split('/');
				attResult.total = parseInt(bootyGes[0], 10);
				attResult.max = parseInt(bootyGes[1], 10);
				dat.loot = (attResult.max > attResult.total || !attResult.max) ? 0 : 1;
				
				// Holz
				var match = bootyResult.match(texts.regex.wood);
				if (match) {
					attResult.wood = parseInt(match[1], 10);
				}
				
				// Lehm
				var match = bootyResult.match(texts.regex.stone);
				if (match) {
					attResult.stone = parseInt(match[1], 10);
				}
				
				// Eisen
				var match = bootyResult.match(texts.regex.iron);
				if (match) {
					attResult.iron = parseInt(match[1], 10);
				}
			}
			
			if (resultRows.length > 0 && !booty || resultRows.length > 1) {
				for (var i = (booty ? 1 : 0); row = resultRows[i]; i++) {
					var match_damage = resultRows[i].innerHTML.match(texts.regex.damage),
					match_loyalty = resultRows[i].innerHTML.match(texts.regex.loyaltyChange);
					if (match_damage) {
						var buildName = match_damage[1];
						for (var key in lib.buildingInfo) {
							if (texts.buildings[key] == buildName) {
								attResult.damage[key] = parseInt(match_damage[2], 10);
							}
						}
					} else if (match_loyalty) {
						attResult.loyalty = parseInt(match_loyalty[1], 10);
						// Eroberung
						if (attResult.loyalty <= 0) {
							attResult.loyalty = 25;
						}
					}
				}
			}
			
			var spy = els.spy.eq(1),
			spyReportID = Village.get(dat.toID, 'spyReportID') || 0,
			lastReportID = Village.get(dat.toID, 'lastReportID') || 0,
			newReport = reportID > lastReportID,
			spyReport = (
				spy.length &&
				(texts.regex.building.test(spy.html() ||
				Village.existSpy(dat.toID)) && reportID > spyReportID
			));
			
			if (newReport || spyReport) {
				// ---------- neuer Angriffsbericht (z.B. Spähbericht) ---------- //
				
				// Für den EQ
				var resExpected = Village.getRes(dat.toID, dat.time, false),
				isNewer = dat.time > (spyReport ? Village.get(dat.toID, 'spyReportTime') : Village.get(dat.toID, 'lastReportTime')),
				// wenn es sich um einen Angriffsbericht mit rückkehrenden Truppen handelt
				returnedUnits = $('#attack_info_def_units').length != 0;
				
				if (spyReport) {
					if (spyReportID) {
						this._data[spyReportID] = 1;
					}
					Village.set(dat.toID, {
						spyReportID: reportID,
						spyReportTime: dat.time
					});
				}
				
				if (reportID > lastReportID) {
					if (lastReportID && (spyReport || lastReportID != spyReportID)) {
						this._data[lastReportID] = 1;
					}
					Village.set(dat.toID, {
						lastReportID: reportID,
						lastReportTime: dat.time
					});
				} else if (reportID != lastReportID) {
					this._data[reportID] = 2;
				}
				
				// Zustimmung speichern
				Village.set(dat.toID, 'mood', attResult.loyalty);
				
				// erspähte Rohstoffe
				var vRes = {
					wood: 0,
					stone: 0,
					iron: 0
				},
				spyResRow = spy.find('tr').eq(0);
				if (spyResRow.find('b').length != 0)
					spyResRow = $();
				if (spyResRow.length) {
					// in der Zeile ist ein th und ein td
					var spyResHTML = spyResRow.find('td').html().remove(/<span class="grey">\.<\/span>/g);
					match = spyResHTML.match(texts.regex.wood);
					if (match) {
						vRes.wood = parseInt(match[1], 10);
					}
					
					match = spyResHTML.match(texts.regex.stone);
					if (match) {
						vRes.stone = parseInt(match[1], 10);
					}
					
					match = spyResHTML.match(texts.regex.iron);
					if (match) {
						vRes.iron = parseInt(match[1], 10);
					}
				}
				// Berechnung des neuen EQs:
				if (isNewer && (spyResRow.length || attResult.total < attResult.max)) {
					Village.recalcEQ(dat.toID, resExpected, attResult.total);
				} else if (!spyResRow.length && returnedUnits) {
					vRes = {
						wood: Math.max(resExpected.wood - attResult.wood, 0),
						stone: Math.max(resExpected.stone - attResult.stone, 0),
						iron: Math.max(resExpected.iron - attResult.iron, 0)
					};
				}
				
				var buildings = Village.get(dat.toID, 'buildings'),
					rowCount = spyResRow.length ? (game_data.player.farm_manager ? 2 : 1) : 0;
				if (spy.find('tr').length > rowCount) {
					// erspähte Gebäude
					buildings = {};
					// in der Zeile ist ein th und ein td
					var buildingRowHTML = spy.find('tr').eq(rowCount).find('td').html().remove(/<span class="grey">\.<\/span>/g),
					matches = buildingRowHTML.match(texts.regex.buildingLevels) || [];
					for (var i = 0; i < matches.length; i++) {
						var match = matches[i].match(texts.regex.buildingLevel);
						// in matches ein Attribute mit dem Namen des Gebäudes einfügen und ihm die Gebäudestufe als Wert zuweisen
						matches[match[1]] = parseInt(match[2], 10);
					}
					for (var key in lib.buildingInfo) {
						if (matches[texts.buildings[key]]) {
							buildings[key] = matches[texts.buildings[key]];
						}
					}
				} else if (newReport) {
					// Gebäude (die durch Rammböcke und Katapulte zerstört wurden)
					for (var key in lib.buildingInfo) {
						var damageLevel = attResult.damage[key];
						if (typeof(damageLevel) != "undefined") {
							if (!damageLevel) {
								delete buildings[key];
							} else {
								buildings[key] = damageLevel;
							}
						}
					}
				}
				Village.set(dat.toID, 'buildings', buildings);
				Village.set(dat.toID, vRes);
				
				// Truppen auslesen und speichern
				var units = Village.get(dat.toID, 'units');
				// es sind Truppen zurückgekehrt oder nicht...
				if (newReport && returnedUnits) {
					units = {};
					var type = ($('#attack_info_def_units').length ? 'def' : 'att'),
					unitsTable = $('#attack_info_def_units').eq(0),
					cells = [unitsTable.find('tr').eq(0).find('td'), unitsTable.find('tr').eq(1).find('td'), unitsTable.find('tr').eq(2).find('td')];
					for (var i = 1; i < cells[0].length; i++) {
						var match = cells[0][i].innerHTML.match(texts.regex.unitImg),
						unitName = match && match[1];
						if (unitName) {
							// ergibt eine negative Zahl, wenn keine Truppen zurückgekehrt sind
							units[unitName] = parseInt(cells[1][i].innerHTML, 10) - parseInt(cells[2][i].innerHTML, 10);
						}
					}
				} else if (newReport) {
					for (var unit in lib.unitInfo) {
						units[unit] = -1;
					}
				}
				Village.set(dat.toID, 'units', units);
				
				// zu den erfarmten Rohstoffen nur dann zählen, wenn es ein eigener Bericht ist!
				if (dat.own) {
					// Rohstoffe auswerten
					var reportDate = Math.floor(dat.time / (60 * 60 * 24)),
					Res = Overview.data.Res;
					
					if (!Res[reportDate]) {
						// vielleicht noch einen Dorfzähler miteinabauen?
						Res[reportDate] = {
							wood: 0,
							stone: 0,
							iron: 0
						};
					}
					if (!isNaN(attResult.wood)) {
						Res[reportDate].wood += attResult.wood;
					}
					if (!isNaN(attResult.stone)) {
						Res[reportDate].stone += attResult.stone;
					}
					if (!isNaN(attResult.iron)) {
						Res[reportDate].iron += attResult.iron;
					}
					
					Overview.data.Res = Res;
					Overview.saveRes();
				}
				
				if (returnedUnits && attResult.total < attResult.max || !attResult.max) {
					this._data[reportID] = spyReport ? 6 : 4;
				} else if (returnedUnits) {
					this._data[reportID] = spyReport ? 5 : 3;
				} else {
					this._data[reportID] = 2;
				}
				
				status = 1;
			} else if (reportID == lastReportID || spy.length && reportID == spyReportID) {
				// ---------- Bericht ist aktuell ---------- //
				status = 2;
			} else {
				// ---------- Bericht ist veraltet ---------- //
				this._data[reportID] = 1;
				dat.old = true;
				status = 3;
			}
			
			this._data2[reportID] = dat;
		}
		// ---------- andere Berichte (z.B. Handel, Awards etc.) ---------- //
		else {
			this._data2[reportID] = {};
			
			this._data[reportID] = 2;
		}
		
		Village.save();
		
		this.save(true);
		
		return status;
	}
};


Bot = {
	mode: lib.storage.getValue(pID +'_BotMode', 0),		// 'read' oder 'clean'
	reportPage: lib.storage.getValue(pID +'_ReportPage', 0),
	
	deactivate: function() {
		Bot.setReportPage(0);
		Bot.setMode(0);
	},
	setMode: function(mode) {
		Bot.mode = mode;
		lib.storage.setValue(pID +'_BotMode', mode);
	},
	setReportPage: function(page) {
		Bot.reportPage = page;
		lib.storage.setValue(pID +'_ReportPage', page);
	},
	browseReportPages: function() {
		var strongs = $('#content_value strong'),
		found = false;
		for (var i = 0; i < strongs.length; i++) {
			var strong = $(strongs[i]),
			match = strong.html().match(/^\s*&gt;(\d+)&lt;\s*$/);
			if (match) {
				var actPage = parseInt(match[1], 10),
				lel = strong.parent().find('a').last();
				match = lel.html().match(/\[(\d+)\]/),
				over20 = strong.parent().find('select').length;	// über 20 Seiten
				if (over20) {
					lel = strong.parent().find('select > option').last();
					match = lel.html().match(/(\d+)/);
				}
				
				if (!Bot.reportPage) {		// das Einlesen wurde gerade gestartet
					var lastPage = (match ? parseInt(match[1], 10) : 1);
					if (actPage > lastPage) {	// man befindet sich auf der letzten Seite
						Bot.setReportPage(actPage);
						return Bot.browseReportLinks();
					} else
						Bot.setReportPage(lastPage);
				} else {
					while (!match || Bot.reportPage <= parseInt(match[1], 10)) {
						lel = lel.prev();
						if (!lel.length) {	// es gibt keine Seiten mehr vor der aktuellen Seite
							Bot.deactivate();
							return;
						}
						if (over20)
							match = lel.html().match(/(\d+)/);
						else
							match = lel.html().match(/\[(\d+)\]/);
					}
					Bot.setReportPage(parseInt(match[1]));
				}
				found = true;
				setRandom(function() {
					if (over20)
						location.href = lel.val();
					else {
						lel.click();	// Alle Click-Events auslösen
						lel[0].click();	// Weil es sich um einen Link handelt, muss dieser so aufgerufen werden...
					}
				}, 500, 1200);
				break;
			}
		}
		
		if (!found) {	// es gibt nur eine Seite
			if (!Bot.reportPage) {	// das Einlesen wurde gerade erst gestartet
				Bot.setReportPage(1);
				Bot.browseReportLinks();
			} else
				Bot.deactivate();
		}
	},
	browseReportLinks: function() {
		var rows = $('#report_list tr'),
		count = 0;
		for (var i = rows.length - 2; i > 0; i--) {
			var match = rows[i].innerHTML.match(regex.viewID);
			if (Bot.mode == 'read' && match && !Report._data[match[1]]) {
				Bot.setReportPage(0);
				
				var el = $('#report_list tr').eq(i).find('a');
				setRandom(function() {
					el.click();
					el[0].click();
				}, 500, 1000);
				break;
			} else if (Bot.mode == 'clean' && match && Report._data[match[1]] == 1) {
				setRandom('$(\'input[name="'+ $(rows[i]).find('input[type="checkbox"]').eq(0).attr('name') +'"]\').click();', 50, 100);
				count++;
			}
		}
		if (Bot.mode == 'clean' && count) {
			var el = $('input[name="del"]');
			setRandom(function() {
				$('input[name="del"]').click();
			}, 300, 900);
		} else if (!i)
			Bot.browseReportPages();
	},
	
	autoFarmActive: lib.storage.getValue('autoFarm', false),
	mouserOverAutofarmButton: false,
	setRandom: function(func, min, max) {
		window.setTimeout(function() {
			var f = function() {
				if (!Bot.mouserOverAutofarmButton) {
					window.clearInterval(fInt);
					func.apply(Bot, arguments);
				}
			};
			
			if (Bot.mouserOverAutofarmButton) {
				var fInt = window.setInterval(f, 100);
				$('body').prepend('<div style="width: '+ $(window).width() +'px; height: '+ $(window).height() +'px; position: fixed; top: 0px; left: 0px; z-index: -1; background-color: #002; opacity: 0.5;"></div>');
			} else
				f();
		}, Math.floor(min + Math.random() * (max - min)));
	},
	setLocation: function(url, min, max) {
		if (typeof(min) != "undefined" && typeof(max) != "undefined") {	// wenn menschliches Verhalten simuliert werden soll
			Bot.setRandom(function() {
				location.href = url;
			}, min, max);
		} else {
			var script = document.body.appendChild(document.createElement("script"));
			script.type = "text/javascript";
			script.innerHTML = "$(document).ready(function(){ window.location.href='" + url + "'; });";
		}
	},
	autoFarming_nextVillage: function() {
		var ownVills = lib.storage.getValue('autoFarm-ownVillages', []);
		if (ownVills.length < 2) {	// Prozess von vorne beginnen
			Bot.setRandom(function() {
				var link = $('#menu_row a:first');
				link.attr('href', link.attr('href') +'&page=-1');	// alle Dörfer...
				link.click();	// Klick-Events auslösen
				link[0].click();
			}, 300000, 1200000);
			// nach 5-20min Prozess neu beginnen...
		} else {
			ownVills.splice(0, 1);
			lib.storage.setValue('autoFarm-ownVillages', ownVills);
			lib.storage.setValue('autoFarm-noReports', '');
			
			Bot.setLocation('/game.php?village='+ ownVills[0].id +'&screen=overview', 800, 1200);
		}
	},
	autoFarming: function() {
		// keine Aktionen mehr, sobald der Botschutz aktiviert ist!
		if (Bot.protectActive)
			return;
		
		// alle anderen Seiten ignorieren
		if (!{
				report: 1,
				overview_villages: 1,
				overview: 1,
				place: 1,
				map: 1,
				info_village: 1,
			}[game_data.screen])
			return;
		
		getHomeCoords();
		
		// neuer Bericht?
		var newReport = $('#menu_row span.icon.header.new_report').length;
		if (newReport) {
			// Berichte einlesen und dann zurück zum Versammlungsplatz
			if (game_data.screen != 'report')
				Bot.setLocation(game_data.link_base_pure.replace(/screen=/, 'screen=report'), 800, 1200);
			else {
				if (regex.viewID.test(location.href) && Bot.mode != 'read')
					Bot.setLocation(game_data.link_base_pure.replace(/screen=/, 'screen=report'), 600, 1200);
				else
					Bot.setRandom(Bot.startReportReading, 300, 600);
			}
		} else if (game_data.screen == 'report' && !newReport) {
			if (Bot.mode != 'read')
				Bot.setLocation(game_data.link_base_pure.replace(/screen=/, 'screen=place'), 600, 1200);
			else
				Bot.setRandom(function() {
					if (Bot.mode != 'read')
						Bot.setLocation(game_data.link_base_pure.replace(/screen=/, 'screen=place'));
				}, 3500, 4200);
		} else if (game_data.screen == 'overview_villages') {
			if (!$('#combined_table').length && !$('#production_table tr').length) {
				$('#overview_menu a').eq(0).click();
				$('#overview_menu a')[0].click();
			} else {
				var rows = $('#combined_table').length ? $('#combined_table tr') : $('#production_table tr'),
				match,
				villIdx = 0,
				pointsIdx = -1,
				ownVills = [];
				for (var i = 0; i < rows[0].cells.length; i++) {
					if (texts.regex.village.test(rows[0].cells[i].innerHTML))
						villIdx = i;
					else if (texts.regex.points.test(rows[0].cells[i].innerHTML))
						pointsIdx = i;
				}
				for (var i = 1; i < rows.length; i++) {
					match = rows[i].cells[villIdx].innerHTML.match(texts.regex.ownVill);
					if (match) {
						ownVills.push({
							id: parseInt(match[1], 10),
							name: match[2],
							x: parseInt(match[3], 10),
							y: parseInt(match[4], 10),
							con: parseInt(match[5], 10),
							points: pointsIdx != -1 ? parseInt(rows[i].cells[pointsIdx].innerHTML.remove(/<span class="grey">\.<\/span>/g), 10) : 0
						});
					}
				}
				ownVills.sort(function(a, b) {
					return b.points - a.points;
				});
				if (!ownVills.length) {
					lib.error('Es stehen keine Dörfer zum Farmen zur Verfügung!');
					$('#dsfa_autoFarm_button')[0].click();
				} else {
					ownVills.splice(0, 0, 0);
					// Das Element "0" hinzufügen, damit es von der Funkion Bot.autoFarming_nextVillage dann abgeschnitten werden kann
					lib.storage.setValue('autoFarm-ownVillages', ownVills);
					Bot.autoFarming_nextVillage();
				}
			}
		} else if (game_data.screen == 'overview')
			Bot.setLocation(game_data.link_base_pure.replace(/screen=/, 'screen=place'), 600, 1200);
		else if (game_data.screen == 'info_village')
			Bot.setLocation(location.href.replace('info_village&id=', 'place&target='), 600, 1200);
		else if (game_data.screen == 'place') {
			if ($('#units_form').length) {	// Einheiten auslesen (& auswählen)
				var availableUnits = getAvailableUnits(),
				count = 0;
				if (Settings.get('autoFarm_farmWith') == 2) {
					for (var key in availableUnits)
						if (Settings._data.autoFarm_units.hasOwnProperty(key) && Settings._data.autoFarm_units[key][0]) {
							if (availableUnits[key] < Settings._data.autoFarm_units[key][1])
								delete availableUnits[key];
							else
								count++;
						}
				} else {
					for (var key in availableUnits)
						if (Settings._data.autoFarm_units.hasOwnProperty(key) && Settings._data.autoFarm_units[key][0])
							count++;
				}
				
				if (!count)
					Bot.autoFarming_nextVillage();
				else {
					var match = location.href.match(regex.targetID);
					if (match) {
						win.selectAllUnits(false);
						var ID = match[1];
						if (Village.existSpy(ID)) {
							// wie viele Späher mitgeschickt werden sollen kommt in die Einstellungen
							var farmSpys = Settings.get('autoFarm_farmSpys');
							if (farmSpys[0] && availableUnits.spy > 0) {
								$('#unit_input_spy').val( Math.min(availableUnits.spy, farmSpys[1]) );
							}
							
							insertFarmTroops(ID, availableUnits);
							if (Settings.get('autoFarm_farmWith') == 2) {
								var autoFarm_units = Settings.get('autoFarm_units');
								for (var unit in lib.unitInfo) {
									if (!autoFarm_units.hasOwnProperty(unit))
										continue;
									var val = parseInt($('#unit_input_'+ unit).val(), 10);
									if (val > 0 && val < autoFarm_units[unit][1])
										$('#unit_input_'+ unit).val(autoFarm_units[unit][1]);
								}
							}
						} else {	// wenn noch kein Spähbericht existiert...
							// wie viele Späher mitgeschickt werden sollen kommt in die Einstellungen
							var farmSpys = Settings.get('autoFarm_farmSpys');
							if (farmSpys[0] && availableUnits.spy > 0) {
								$('#unit_input_spy').val( Math.min(availableUnits.spy, farmSpys[1]) );
							} else {
								var noReports = lib.storage.getValue('autoFarm-noReports', '');
								if (noReports.indexOf('|' + ID + '|') == -1) {
									noReports += '|' + ID + '|';
									lib.storage.setValue('autoFarm-noReports', noReports);
								}
							}
						}
						Bot.setRandom(function() {
							if (Village.existSpy(ID))
								$('#target_attack').click();
							else {	// wenn noch kein Spähbericht existiert...
								// wie viele Späher mitgeschickt werden sollen kommt in die Einstellungen
								if (farmSpys[0] && availableUnits.spy > 0)
									$('#target_attack').click();
								else
									Bot.setLocation(game_data.link_base_pure.replace(/screen=/, 'screen=map'));
							}
						}, 1000, 1600);
					} else {
						Bot.setLocation(game_data.link_base_pure.replace(/screen=/, 'screen=map'), 600, 1200);
					}
				}
			} else {
				window.setTimeout(function() {
					$('#troop_confirm_go').click();
				}, 400 + Math.floor(Math.random() * 600));
			}
		} else if (game_data.screen == 'map') {
			Bot.setRandom(function() {
				var maxDistance = Settings.get('autoFarm_maxDistance'),
				villages = win.TWMap.villages,
				babas = [],
				noReports = lib.storage.getValue('autoFarm-noReports', '');
				for (var key in villages) {
					if (villages[key].owner == "0") {
						var ID = villages[key].id,
						cx = Math.floor(villages[key].xy / 1000),
						cy = villages[key].xy - cx * 1000;
						// einmal durchweg alles speichern
						Village.setData(ID, cx, cy, villages[key].name, villages[key].owner, villages[key].bonus);
						if (maxDistance[0] && lib.getCoordsDiff(hCoords, [cx, cy], 0) > maxDistance[1] ||
							 Command.getAttacks(ID).length ||
							 noReports.indexOf('|' + ID + '|') != -1)	// Notfalllösung dafür, dass kein Bericht vorliegt und keine Späher zur Verfügung stehen
							continue;
						villages[key].cx = cx;
						villages[key].cy = cy;
						if (Village.exist(ID) && Settings.get('autoFarm_minRes')[0] && Village.getRes(ID).sum < Settings.get('autoFarm_minRes')[1])	// zu wenig Rohstoffe
							continue;
						var dist = lib.getCoordsDiff(hCoords, [cx, cy], 0);
						villages[key].ranking = dist;
						babas.push(villages[key]);
					}
				}
				Village.save();
				if (!babas.length) {	// Autofarmen ausschalten, Karte nachladen oder in ein anderes Dorf gehen
					// momentan noch keine Implementierung für weiteres Kartenmaterial...
					Bot.autoFarming_nextVillage();
				} else {
					babas.sort(function(a, b) {
						return (a.ranking - b.ranking);
					});
					Bot.setLocation(game_data.link_base_pure.replace(/screen=/, 'screen=info_village&id=' + babas[0].id), 100, 200);
				}
			}, 2000, 8000);
		}
	},
	protectActive: ($('#bot_check').length ||
					$('#bot_check_error').length ||
					$('#bot_check_image').length ||
					$('#bot_check_form').length ||
					$('#bot_check_code').length ||
					$('#bot_check_submit').length ||
					texts.regex.botProtect.test($('body').html()) ||
					regex.captcha.test($('body').html())
				   ),
	init: function() {
		if (Bot.protectActive)
			return;
		
		// Autofarmen
		if (Settings.get('autoFarm_active')) {
			$('head').append('<style type="text/css">' +
				"#dsfa_autoFarm_button { font-size: 12px; font-weight: bold; padding: 5px 10px; border: 0; background-color: rgb(244,228,188); color: rgb("+ (this.autoFarmActive ? "255,0,0" : "0,187,0") +") }" +
				"#dsfa_autoFarm_button:hover { background-color: #C1A264; color: #"+ (this.autoFarmActive ? "FF2222" : "00EE00") +" }" +
			'</style>');
			
			// Menüpunkt hinzufügen
			$('#menu_row').append(
				'<td class="menu-item">' +
					'<a id="dsfa_autoFarm_button" href="javascript:;"><span style="color: '+ (this.autoFarmActive ? 'red' : 'green') +'" title="'+ (this.autoFarmActive ? texts.gui.autoFarm.stop : texts.gui.autoFarm.start) +'">'+ texts.gui.autoFarm.title +'</span></a>' +
				'</td>'
			);
			$('#dsfa_autoFarm_button').mouseenter(function() {
				Bot.mouserOverAutofarmButton = true;
			}).mouseleave(function() {
				Bot.mouserOverAutofarmButton = false;
			});
			$('#dsfa_autoFarm_button')[0].addEventListener('click', function() {
				if (Bot.autoFarmActive || confirm('Die Autofarm-Funktion sollte aus Sicherheitsgründen bevorzugt nicht verwendet werden!\nMöchtest du sie trotzdem ausführen?'))
					Bot.toggleAutoFarming();
			}, true);
		}
		
		if (Bot.mode == 'read') {
			if (Bot.reportPage > 0)
				Bot.browseReportLinks();
			else {
				readInterval = window.setInterval(function() {
					// nachgucken, ob der Bericht schon eingelesen wurden, wenn ja nächster
					if (Report.ret > -1) {
						Report.next(600, 1400);
						window.clearInterval(readInterval);
					}
				}, 100);
			}
		} else if (Bot.mode == 'clean')
			Bot.browseReportLinks();
		
		if (Settings.get('autoFarm_active') && Bot.autoFarmActive)
			Bot.autoFarming();
	},
	startReportReading: function() {
		if (game_data.screen != 'report' || Bot.protectActive)
			return;
		
		Bot.setMode('read');
		Bot.setReportPage(0);
		if (regex.viewID.test(location.href))
			Report.next();
		else
			Bot.browseReportPages();
	},
	
	startReportCleaning: function() {
		if (game_data.screen != 'report' || regex.viewID.test(location.href) || Bot.protectActive)
			return;
		
		Bot.setMode('clean');
		Bot.setReportPage(0);
		Bot.browseReportPages();
	},
	
	toggleAutoFarming: function(checkbox) {
		lib.storage.setValue('autoFarm', Bot.autoFarmActive = !Bot.autoFarmActive);
		if (Bot.autoFarmActive) {
			$('a:contains('+ texts.gui.village_overview +')')[0].click();
		} else {
			location.reload();
		}
	}
};


Variant = {
	_change: false,
	_data: lib.storage.getValue('variant_data', {
		build_hide_complete: false,
		build_selected: {},
		build_variants: [],
		unit_hide: false,
		unit_selected: {},
		unit_variants: []
	}),
	_std: {
		build_hide_complete: false,
		build_selected: {},
		build_variants: [],
		unit_hide: false,
		unit_selected: {},
		unit_variants: []
	},
	unit: {},
	build: {},
	initialize: true,
	save: function() {
		if (this._change || arguments.length > 0 && arguments[0]===true) {
			lib.storage.setValue("variant_data", this._data);
			this._change = false;
			return true;
		}
		return false;
	},
	init: function() {
		if (game_data.screen == 'main')
			$('head').append(
				'<style type="text/css">'+ 
					'#buildings tr:hover td { background-color: #FDF4DC; }' +
				'</style>'
			);
		
		if (Settings.get('misc_recruitVariantActive') &&
			( game_data.screen == 'barracks' ||
			  game_data.screen == 'stable' ||
			  game_data.screen == 'garage' ||
			  game_data.screen == 'train' )) {
			if (typeof(this._data.unit_selected[game_data.village.id]) == "undefined")
				this._data.unit_selected[game_data.village.id] = -1;
			
			this.unit.order = [];
			this.unit.order.push('name');
			this.unit.name = {
				cellAttr: 'class="nowrap" style="text-align: left;"',
				head: texts.gui.name,
				cellShow: '%val% <a class="edit-icon" href="javascript:;"><img alt="#" src="graphic/rename.png"></a>',
				cellEdit: '<input type="text" class="dsfa_name" size="4" value="%val%"><input type="button" value="OK">',
				default: '',
				grey: false,
				factorIntoPop: false
			};
			var width = {
				spy: ' width: 20px;',
				ram: ' width: 20px;',
				catapult: ' width: 20px;',
				knight: ' ',	// ein Leerstring wird als false behandelt
				snob: ' ',		// ein Leerstring wird als false behandelt
				other: ' width: 25px;'
			};
			for (var key in lib.unitInfo) {
				if (!lib.unitInfo[key].pop)
					continue;
				(key != 'knight' || key != 'snob' ? ' width: '+ (key != 'spy' && key != 'ram' && key != 'catapult' ? '25' : '20') +'px' : '');
				this.unit.order.push(key);
				this.unit[key] = {
					cellAttr: 'class="nowrap" style="text-align: center;"',
					head: '<img class="tooltip" src="'+ texts.unitImgPath.replace('$', key) +'" alt="'+ texts.unit[key] +'" title="'+ texts.unit[key] +'">',
					cellShow: '%val%',
					cellEdit: '<input type="text" class="dsfa_'+ key +'" size="1" maxlength="5" value="%val%" style="text-align: center;'+ (width[key] ? width[key] : width.other) +'">',
					default: 0,
					grey: true,
					factorIntoPop: true
				};
			}
			this.unit.order.push('free_pop');
			this.unit.free_pop = {
				cellAttr: 'class="nowrap" style="text-align: left;"',
				head: texts.gui.freePopuplation,
				cellShow: '%val%',
				cellEdit: '<input type="text" class="dsfa_free_pop" size="3" maxlength="6" value="%val%">',
				default: 0,
				grey: true,
				factorIntoPop: true
			};
			this.unit.order.push('pop');
			this.unit.pop = {
				cellAttr: 'class="nowrap" style="text-align: left;"',
				head: '<span class="icon header population tooltip" title="'+ texts.gui.population +'"> </span>',
				cellShow: '%val%',
				cellEdit: '<span class="dsfa_pop">%val%</span>',
				default: 0,
				grey: false,
				factorIntoPop: false
			};
			this.unit.order.push('cancel');
			this.unit.cancel = {
				cellAttr: 'class="nowrap" style="text-align: center;"',
				head: '&nbsp;',
				cellShow: '<a class="cancel-icon solo tooltip" href="javascript:;"></a>',
				cellEdit: '<a class="cancel-icon solo tooltip" href="javascript:;"></a>',
				default: '',
				grey: false,
				factorIntoPop: false
			};
			
			this.doVariant('unit');
		} else if (Settings.get('misc_buildVariantActive') &&
				   (game_data.screen == 'main' ||
					game_data.screen == 'overview_villages' && $('#buildings_table').length )) {
			if (typeof(this._data.build_selected[game_data.village.id]) == "undefined")
				this._data.build_selected[game_data.village.id] = -1;
			
			this.build.order = [];
			
			this.build.order.push('name');
			this.build.name = {
				cellAttr: 'class="nowrap" style="text-align: left;"',
				head: texts.gui.name,
				cellShow: '%val% <a class="edit-icon" href="javascript:;"><img alt="#" src="graphic/rename.png"></a>',
				cellEdit: '<input type="text" class="dsfa_name" size="4" value="%val%"><input type="button" value="OK">',
				default: '',
				grey: false,
				factorIntoPop: false
			};
			for (var key in lib.buildingInfo) {
				if (!lib.buildingInfo.hasOwnProperty(key))
					continue;
				this.build.order.push(key);
				this.build[key] = {
					cellAttr: 'class="nowrap" style="text-align: center;"',
					head: '<img class="tooltip" src="'+ texts.buildingImgPath.replace('$', key) +'" alt="'+ texts.buildings[key] +'" title="'+ texts.buildings[key] +'">',
					cellShow: '%val%',
					cellEdit: '<input type="text" class="dsfa_'+ key +'" size="1" maxlength="5" value="%val%" style="text-align: center;">',
					default: 0,
					grey: true,
					factorIntoPop: true
				};
			}
			this.build.order.push('points');
			this.build.points = {
				cellAttr: 'class="nowrap" style="text-align: left;"',
				head: texts.gui.points,
				cellShow: '%val%',
				cellEdit: '<span class="dsfa_points">%val%</span>',
				default: 0,
				grey: false,
				factorIntoPop: false
			};
			this.build.order.push('pop');
			this.build.pop = {
				cellAttr: 'class="nowrap" style="text-align: left;"',
				head: '<span class="icon header population tooltip" title="'+ texts.gui.population +'"> </span>',
				cellShow: '%val%',
				cellEdit: '<span class="dsfa_pop">%val%</span>',
				default: 0,
				grey: false,
				factorIntoPop: false
			};
			this.build.order.push('cancel');
			this.build.cancel = {
				cellAttr: 'class="nowrap" style="text-align: center;"',
				head: '&nbsp;',
				cellShow: '<a class="cancel-icon solo tooltip" href="javascript:;"></a>',
				cellEdit: '<a class="cancel-icon solo tooltip" href="javascript:;"></a>',
				default: '',
				grey: false,
				factorIntoPop: false
			};
			
			if (win.BuildingOverview) {
				win.BuildingOverview.generate_buildings_for_village = Variant.generate_buildings_for_village;
				win.BuildingOverview.upgrade_building = Variant.upgrade_building;
			}
			
			this.doVariant('build');
		}
	},
	doVariant: function(type) {
		if (type == 'unit') {
			if (!$('#train_form tr').eq(0).find('th').eq(0).length || game_data.mode == 'decommission' || game_data.mode == 'mass' || game_data.mode == 'mass_decommission')
				return;
			
			if (!$('#unit_variantselect').length) {
				this.createVariantSelect('unit', $('#train_form tr').eq(0).find('th').eq(0).addClass('nowrap'), true);
				
				$('#train_form tr').eq(0).find('th').eq(0).find('a').last()[0].addEventListener('click', function() {
					HTML = '<h5 style="text-align: center;">'+ texts.gui.unitVariantHeader +'</h5>' +
					'<table class="vis" style="width: 100%;"><tbody id="dsfa_unit_variants"><tr>';
					for (var i = 0, max = Variant.unit.order.length; i < max; i++) {
						var key = Variant.unit.order[i];
						HTML += '<th '+ Variant.unit[key].cellAttr +'>'+ Variant.unit[key].head +'</th>';
					}
					HTML += '</tr>';
					
					for (var i = 0, max = Variant._data.unit_variants.length; i < max; i++) {
						HTML += '<tr id="unit_'+ i +'">'+ Variant.createVariantRow('unit', i) +'</tr>';
					}
					HTML += '</tbody></table>' +
					'<div style="text-align: center;"><a href="javascript:;">'+ texts.gui.addUnitVariant +'</a></div>';
					var pos = $('#train_form tr').eq(1).offset();
					lib.inlinePopup('unit_variants', pos.left, pos.top, HTML, true, $('#train_form tr').eq(1).outerWidth() - $('#inline_popup').outerWidth() + $('#inline_popup').width(), 'auto');
					recreateToolTip();
					
					Variant.attachRowEvents('unit', $('#dsfa_unit_variants tr').slice(1));
					
					// Variante hinzufügen
					$('#unit_variants a').last().click(function() {
						$('#dsfa_unit_variants').append('<tr>'+ Variant.createVariantRow('unit', null, true) +'</tr>');
						
						Variant.attachRowEvents('unit', $('#dsfa_unit_variants tr').last());
					});
				}, true);
				$('#pop_current_label')[0].addEventListener('DOMNodeInserted', function(e) {
					Variant.doVariant('unit');
				}, false);
			}
			
			if (Variant.getSelectedIndex('unit') > -1)
				Variant.createFillInButton();
			
			Variant.updateUnitSum();
			Variant.updateUnitLinks();
		} else if (type == 'build') {
			if ($('#buildings_table').length) {
				if (!$('#dsfa_variant_header').length) {
					$('#buildings_table th').slice(0, 2).remove();
					$(
						'<th id="dsfa_variant_header" class="nowrap">' +
							'Variante&nbsp;' +
							'<a href="javascript:;" class="edit-icon"><img src="graphic/rename.png" alt="#"></a>' +
						'</th>'
					).insertBefore($('#buildings_table th').last());
					
					$('#buildings_table a.edit-icon')[0].addEventListener('click', function(event) {
						HTML = '<h5 style="text-align: center;">'+ texts.gui.buildVariantHeader +'</h5>' +
						'<table class="vis" style="width: 100%;"><tbody id="dsfa_build_variants"><tr>';
						for (var i = 0, max = Variant.build.order.length; i < max; i++) {
							var key = Variant.build.order[i];
							HTML += '<th ' + Variant.build[key].cellAttr + '>' + Variant.build[key].head + '</th>';
						}
						HTML += '</tr>';
						
						for (var i = 0, max = Variant._data.build_variants.length; i < max; i++) {
							HTML += '<tr id="build_'+ i +'">' + Variant.createVariantRow('build', i) + '</tr>';
						}
						HTML += '</tbody></table>' +
						'<div style="text-align: center;"><a href="javascript:;">'+ texts.gui.addBuildVariant +'</a></div>';
						var pos = $('#buildings_table tr').eq(0).offset();
						pos.top += $('#buildings_table tr').eq(0).outerHeight() + 2;
						lib.inlinePopup('build_variants', pos.left, pos.top, HTML, true, $('#buildings_table tr').eq(0).outerWidth() - 4, 'auto');
						recreateToolTip();
						
						Variant.attachRowEvents('build', $('#dsfa_build_variants tr').slice(1));
						
						// Variante hinzufügen
						$('#build_variants a').last().click(function() {
							$('#dsfa_build_variants').append('<tr>'+ Variant.createVariantRow('build', null, true) +'</tr>');
							
							Variant.attachRowEvents('build', $('#dsfa_build_variants tr').last());
						});
					}, true);
				}
				
				$('#villages tr:visible').each(function() {
					if ($(this).find('.build_variantselect').length) {
						return;
					}
					var vID = $(this).attr('id').match(/v_(\d+)/)[1];
					$('<td>'+ Variant.createVariantSelect('build', null, false, null, true, vID) +'</td>').insertBefore( $(this).find('td').last() )
					.find('select')[0].addEventListener('change', Variant.changeVariant, true);
				});
			} else if ($('#buildings tr').eq(0).find('th').eq(0).length && !$('#build_variantselect').length) {
				this.createVariantSelect('build', $('#buildings tr').eq(0).find('th').eq(0).addClass('nowrap'), true);
				
				$('#buildings tr').eq(0).find('th').eq(0).find('a').last()[0].addEventListener('click', function(event) {
					HTML = '<h5 style="text-align: center;">'+ texts.gui.buildVariantHeader +'</h5>' +
					'<table class="vis" style="width: 100%;"><tbody id="dsfa_build_variants"><tr>';
					for (var i = 0, max = Variant.build.order.length; i < max; i++) {
						var key = Variant.build.order[i];
						HTML += '<th ' + Variant.build[key].cellAttr + '>' + Variant.build[key].head + '</th>';
					}
					HTML += '</tr>';
					
					for (var i = 0, max = Variant._data.build_variants.length; i < max; i++) {
						HTML += '<tr id="build_'+i+'">' + Variant.createVariantRow('build', i) + '</tr>';
					}
					HTML += '</tbody></table>' +
					'<div style="text-align: center;"><a href="javascript:;">'+ texts.gui.addBuildVariant +'</a></div>';
					var pos = $('#buildings tr').eq(0).offset();
					pos.top += $('#buildings tr').eq(0).outerHeight() + 2;
					lib.inlinePopup('build_variants', pos.left, pos.top, HTML, true, $('#buildings tr').eq(0).outerWidth() - 4, 'auto');
					recreateToolTip();
					
					Variant.attachRowEvents('build', $('#dsfa_build_variants tr').slice(1));
					
					// Variante hinzufügen
					$('#build_variants a').last().click(function() {
						$('#dsfa_build_variants').append('<tr>'+ Variant.createVariantRow('build', null, true) +'</tr>');
						
						Variant.attachRowEvents('build', $('#dsfa_build_variants tr').last());
					});
				}, true);
				$('#pop_current_label')[0].addEventListener('DOMNodeInserted', function() {
					Variant.doVariant('build');
				}, false);
			}
			
			if ($('#buildings_table').length) {
				Variant.updateBuildOverviewLinks();
			} else if ($('#hide_completed').length) {
				if ($('#hide_completed').is(':checked'))
					$('#hide_completed')[0].click();
				$('#hide_completed').hide();
				if (!$('#dsfa_hide_completed').length) {
					$('<input type="checkbox" id="dsfa_hide_completed" '+ (Variant._data.build_hide_complete ? ' checked' : '') +'>')
					.insertBefore('#hide_completed')[0].addEventListener('click', function() {
						Variant.updateBuildLinks();
						Variant._data.build_hide_complete = $(this).is(':checked');
						Variant.save(true);
					}, false);
				}
				
				Variant.updateBuildLinks();
			}
		}
	},
	createVariantSelect: function(type, element, edit, selected, noID, vID) {
		if (typeof(vID) == "undefined")
			vID = game_data.village.id;
		if (typeof(selected) != "number")
			selected = this._data[type +'_selected'][vID];
		HTML = ' <select size="1" class="'+ type +' variant_select village_'+ vID +' '+ type +'_variantselect"'+ (noID ? '' : ' id="'+ type +'_variantselect"') +'>' +
		'<option'+ (selected == -1 ? ' selected' : '') +'>(Auswählen)</option>';
		for (var i = 0, max = this._data[type +'_variants'].length; i < max; i++) {
			HTML += '<option'+ (selected == i ? ' selected' : '') +'>'+ this.getVariantName(type, i) +'</option>';
		}
		HTML += '</select>';
		if (edit)
			HTML += ' <a class="edit-icon" href="javascript:;"><img alt="#" src="graphic/rename.png"></a>';
		if (element instanceof jQuery && element.length) {
			element.append(HTML);
			element.find('select')[0].addEventListener('change', Variant.changeVariant, true)
		}
		return HTML;
	},
	changeVariant: function() {
		var type = $(this).attr('class').split(' ')[0],
		vID = $(this).attr('class').match(/village_(\d+)/);
		if (!Variant._data.hasOwnProperty(type +'_selected'))
			return;
		if (vID)
			vID = vID[1];
		else
			vID = game_data.village.id;
		Variant._data[type +'_selected'][vID] = this.selectedIndex-1;
		Variant.save(true);
		
		if (type == 'unit') {
			Variant.updateUnitLinks();
			Variant.createFillInButton();
		} else if (type == 'build') {
			Variant.updateBuildLinks();
		}
	},
	createVariantRow: function(type, variant, edit) {
		var kind = 'cell'+ (edit ? 'Edit' : 'Show'),
		otherType = {
			build: 'unit',
			unit: 'build'
		}[type],
		HTML = '';
		if (typeof(variant) == "string" || typeof(variant) == "number")
			variant = this._data[type +'_variants'][variant];
		
		for (var i = 0, max = this[type].order.length; i < max; i++) {
			var key = this[type].order[i],
			val = variant ? variant[key] : this[type][key].default,
			cont = this[type][key][kind];
			HTML += '<td ' + this[type][key].cellAttr + '>';
			if (/%variant_name%/.test(cont))
				HTML += cont.replace(/%variant_name%/g, this.getVariantName(otherType, val));
			else if (/%variant_input%/.test(cont))
				HTML += cont.replace(/%variant_input%/g, this.createVariantSelect(otherType, null, false, val, true));
			else {
				if (edit)
					HTML += cont.replace(/%val%/g, val);
				else
					HTML += cont.replace(/%val%/g, this[type][key].grey && val == 0 ? '<span class="grey">0</span>' : val);
			}
			HTML += '</td>';
		}
		return HTML;
	},
	attachRowEvents: function(type, row) {
		if (type == 'unit') {
			// Inputs (Taste drücken; reinklicken)
			row.find('input[type="text"]').slice(1).each(function() {
				$(this).keyup( Variant.unitInputKeyUp );
				$(this).change( Variant.unitInputChange );
				$(this).click( Variant.unitInputClick );
			});
			
			// Bearbeiten
			row.find('a.edit-icon:first').each(function() {
				this.addEventListener('click',  Variant.editVariant, true);
			});
		} else if (type == 'build') {
			// Inputs (Taste drücken; reinklicken)
			row.find('input[type="text"]').slice(2).each(function() {
				$(this).keyup( Variant.buildInputKeyUp );
				$(this).change( Variant.buildInputChange );
				$(this).click( Variant.buildInputClick );
			});
			
			// Bearbeiten (jeweils das erste 'a.edit-icon'-Element)
			row.find('a.edit-icon:first').each(function() {
				this.addEventListener('click',  function() {
					var row;
					if (lib.buildingInfo.hasOwnProperty('church'))
						row = $(this).parents('tr').eq(0);
					Variant.editVariant(this);
					
					if (row) {
						var church = row.find('.dsfa_church'),
						church_f = row.find('.dsfa_church_f');
						if (church.val() != '' && church.val() != '0' && church_f.val() != '' && church_f.val() != '0') {
							church.css('color', 'red');
							church_f.css('color', 'red');
						} else if (church_f.val() != '' && church_f.val() != '0')
							church.attr('disabled', true);
						else if (church.val() != '' && church.val() != '0')
							church_f.attr('disabled', true);
					}
				}, true);
			});
		}
		
		// Speichern
		row.find('input[type="button"]:first').each(function() {
			this.addEventListener('click', Variant.clickOK, true);
		});
		
		// Löschen
		row.find('a.cancel-icon:last').each(function() {
			this.addEventListener('click', Variant.deleteVariant, true);
		});
	},
	saveVariant: function(type, variant, num) {
		if (typeof(num) == "undefined") {
			$('#'+ type +'_variantselect').append('<option>' + variant.name + '</option>');
			
			this._data[type +'_variants'].push(variant);
			this.save(true);
			num = this._data[type +'_variants'].length-1;
		} else {
			$('#'+ type +'_variantselect option').eq(parseInt(num)+1).html( variant.name );
			
			this._data[type +'_variants'][num] = variant;
			this.save(true);
		}
		
		Variant.doVariant(type);
		
		return num;
	},
	deleteVariant: function() {
		if ($(this).parent().parent().attr('id') && (match = $(this).parent().parent().attr('id').match(/(.+)_(\d+)/))) {
			var type = match[1],
			num = match[2],
			otherType = {
				build: 'unit',
				unit: 'build'
			}[type];
			for (var key in Variant._data[type +'_selected']) {
				// ist die Variante ausgewählt?
				if (Variant._data[type +'_selected'][key] == num) {
					$('#'+ type +'_variantselect option').eq(0).attr('selected', 'selected');
					Variant._data[type +'_selected'][key] = -1;
				}
			}
			// alle Varianten des anderen Typs durchgehen, ob diese Variante noch irgendwo verlinkt ist...
			//otherType
			for (var i = 0, max = Variant._data[otherType +'_variants'].length; i < max; i++) {
				if (Variant._data[otherType +'_variants'][type +'_variant'] == num) {
					Variant._data[otherType +'_variants'][type +'_variant'] = -1;
				}
			}
			
			$('#'+ type +'_variantselect option').eq(parseInt(num)+1).remove();
			
			Variant._data[type +'_variants'].splice(num, 1);
			Variant.save(true);
		}
		
		$(this).parent().parent().remove();
	},
	getVariantName: function(type, num) {
		if (num == -1)
			return '<span class="grey">-</span>';
		else
			return this._data[type +'_variants'][num].name;
	},
	getSelectedIndex: function(type, vID) {
		if (!vID)
			vID = game_data.village.id;
		if (!this._data[type +'_selected'].hasOwnProperty(vID))
			return -1;
		return this._data[type +'_selected'][vID];
	},
	getSelectedVariant: function(type, vID, key) {
		if (!vID)
			vID = game_data.village.id;
		var selIdx = Variant.getSelectedIndex(type, vID);
		if (selIdx < 0)
			return 999999;
		if (key)
			return this._data[type +'_variants'][selIdx][key];
		else
			return this._data[type +'_variants'][selIdx];
	},
	createFillInButton: function() {
		if (this.getSelectedIndex('unit') < 0) {
			$('#dsfa_fillin').remove();
		} else if (!$('#dsfa_fillin').length) {
			$('#train_form table').eq(0).find('tr').last().find('td').prepend(
				'<input id="dsfa_fillin" type="button" value="Ausfüllen" style="font-size: 10pt;">'
			).find('#dsfa_fillin')[0].addEventListener('click', function() {
				var toBuild = {},
				resAvailable = {
					wood: parseInt($('#wood').html()),
					stone: parseInt($('#stone').html()),
					iron: parseInt($('#iron').html()),
					pop: parseInt($('#pop_max_label').html(), 10) - parseInt($('#pop_current_label').html(), 10)
				};
				$('#train_form tr').slice(1).each(function() {
					if (this.cells.length < 2 ||
						 !$(this).find('input').length ||
						 !$(this).find('img').eq(0).attr('src'))
						return;
					var unit = $(this).find('img').eq(0).attr('src').match(/unit_(.+)\.png/)[1],
					max_possible = $(this).find('a').last().html(),
					max_count = Variant.getSelectedVariant('unit', null, unit);
					if (Variant.sum[unit][2] >= max_count || max_possible == '(0)')
						return;
					toBuild[unit] = max_count - Variant.sum[unit][2];
				});
				toBuild = Variant.getBuildUnits(resAvailable, toBuild);
				for (var unit in toBuild) {
					if (toBuild[unit] > 0) {
						$('#'+ unit +'_0').val(toBuild[unit]);
						$('#'+ unit +'_0').change();
					}
				}
			}, true);
		}
	},
	getBuildUnits: function(resAvailable, toBuild) {
		var resNeeded = { wood: 0, stone: 0, iron: 0, pop: 0 };
		var minfactor = 1;
		for (var res in resNeeded) {
			for (var unit in toBuild)
				resNeeded[res] += lib.unitInfo[unit][res] * toBuild[unit];
			factor = resAvailable[res] / resNeeded[res];
			if (factor < minfactor)
				minfactor = factor;
		}
		var count = 0,
		toBuild2 = {};
		for (var unit in toBuild) {
			var c = Math.floor(toBuild[unit] * minfactor);
			toBuild2[unit] = toBuild[unit] - c;
			toBuild[unit] = c;
			count += toBuild[unit];
			for (var res in resNeeded)
				resAvailable[res] -= toBuild[unit] * lib.unitInfo[unit][res];
		}
		if (count) {
			var rest = true;
			for (var res in resNeeded)
				if (!resAvailable[res])
					rest = false;
			if (rest) {
				var toBuild2 = Variant.getBuildUnits(resAvailable, toBuild2);
				for (var unit in toBuild)
					toBuild[unit] += toBuild2[unit];
			}
		}
		
		return toBuild;
	},
	calcPop: function(type, row, tmpkey, tmpval) {
		var pop = 0;
		if (type == 'unit') {
			for (var i = 0, max = this.unit.order.length; i < max; i++) {
				var key = this.unit.order[i],
				val = parseInt(row.find('.dsfa_'+ key).val(), 10);
				if (isNaN(val)) {
					val = 0;
				}
				if (key == 'free_pop' || lib.unitInfo[key]) {
					pop += (key == 'free_pop' ? 1 : lib.unitInfo[key].pop) * val;
				}
			}
			row.find('.dsfa_pop').html(pop);
			return pop;
		} else if (type == 'build') {
			for (var i = 0, max = this.build.order.length; i < max; i++) {
				var key = this.build.order[i];
				if (this.build[key].factorIntoPop) {
					var val = parseInt(row.find('.dsfa_'+ key).val(), 10);
					if (!isNaN(val) && val > 0) {
						pop += Math.round( Math.pow(lib.buildingInfo[key].pop_factor, val - 1) * lib.buildingInfo[key].pop );
					}
				}
			}
			row.find('.dsfa_pop').html(pop);
			return pop;
		}
	},
	calcPoints: function(row) {
		var points = 0;
		for (var key in lib.buildingInfo) {
			var val = row.find('.dsfa_'+ key).val();
			if (!val || val == '' || val == '0')
				continue;
			points += Math.round(Settings.buildingPoints[key] * Math.pow(1.2, parseInt(val) - 1));
		}
		row.find('.dsfa_points').html(points);
		return points;
	},
	calcRes: function(build, level) {
		if (!lib.buildingInfo[build])
			return {
				wood: 0,
				stone: 0,
				iron: 0,
				pop: 0,
				popDiff: 0
			};
		
		return {
			wood: Math.round( lib.buildingInfo[build].wood * Math.pow(lib.buildingInfo[build].wood_factor, level) ),
			stone: Math.round( lib.buildingInfo[build].stone * Math.pow(lib.buildingInfo[build].stone_factor, level) ),
			iron: Math.round( lib.buildingInfo[build].iron * Math.pow(lib.buildingInfo[build].iron_factor, level) ),
			pop: Math.round( lib.buildingInfo[build].pop * Math.pow(lib.buildingInfo[build].pop_factor, level) ),
			popDiff: Math.round( lib.buildingInfo[build].pop * Math.pow(lib.buildingInfo[build].pop_factor, level) ) - Math.round( lib.buildingInfo[build].pop * Math.pow(lib.buildingInfo[build].pop_factor, level-1) )
		};
	},
	editVariant: function(link) {
		var row;
		if (!link.which)
			row = $(link).parents('tr').eq(0);
		else
			row = $(this).parents('tr').eq(0);
		
		var match = row.attr('id').match(/(.+)_(\d+)/);
		if (!match)
			return;
		var type = match[1],
		num = match[2];
		
		row.html(Variant.createVariantRow(type, num, true));
		
		Variant.attachRowEvents(type, row);
	},
	clickOK: function() {
		var row = $(this).parent().parent(),
		type = row.parent().attr('id').match(/^dsfa_(.+)_variants$/)[1],
		num = row.attr('id') ? row.attr('id').match(/.+_(\d+)/)[1] : null,
		obj = {
			name: row.find('.dsfa_name').val()
		};
		if (obj.name == '') {
			lib.alert('Der Name darf nicht leer sein!');
		} else {
			for (var i = 1, max = Variant[type].order.length; i < max; i++) {
				var key = Variant[type].order[i],
				el = $('.dsfa_'+ key);
				if (!el.length)
					continue;
				if (regex.variant.test(key)) {
					obj[key] = el.find('select')[0].selectedIndex-1;
				} else {
					if (el[0].nodeName == 'INPUT') {
						if (el.val() == '')
							el.val('0');
						obj[key] = el.val();
					} else
						obj[key] = el.html();
				}
			}
			row.html( Variant.createVariantRow(type, obj) );
			Variant.attachRowEvents(type, row);
			
			if (!num)
				row.attr('id', type +'_'+ Variant.saveVariant(type, obj));
			else
				Variant.saveVariant(type, obj, num);
		}
	},
	unitInputKeyUp: function() {
		if (regex.NaN.test($(this).val())) {
			var pos = $(this).getCursorPosition(),
			count = $(this).val().substr(0,pos).match(/[^\d]/g).length;
			$(this).val( $(this).val().remove(/[^\d]/g) ).setCursorPosition(pos-count);
		}
		
		Variant.calcPop('unit', $(this).parent().parent());
	},
	unitInputChange: function() {
		if ($(this).val() == '')
			$(this).val(0);
	},
	unitInputClick: function() {
		if ($(this).val() == '')
			$(this).val(0);
		if ($(this).val() == '0')
			$(this).focus().select();
	},
	updateUnitSum: function() {
		$('#train_form tr').eq(0).find('th').last().prev().html(texts.gui.unitsTitle);
		
		Variant.sum = {};
		$('.trainqueue_wrap tr').slice(1).each(function() {
			if (!this.cells.length)
				return;
			var match = this.cells[0].innerHTML.match(texts.regex.unitQueue);
			if (match) {
				match[2] = trim(match[2]);
				for (var key in lib.unitInfo)
					if (texts.unit[key] == match[2] || texts.units[key] == match[2]) {
						if (!Variant.sum.hasOwnProperty(key))
							Variant.sum[key] = [0, 0, 0];
						Variant.sum[key][2] += parseInt(match[1], 10);
						return;
					}
			}
		});
		for (var key in lib.unitInfo) {
			$('#train_form tr').slice(1).find('img').each(function() {
				if ($(this).attr('src') && $(this).attr('src').indexOf('unit_'+ key +'.png') != -1) {
					var val = $(this).parents('tr').eq(0).find('td').last().prev().html();
					if (!val)
						return;
					val = val.split('/');
					if (!Variant.sum.hasOwnProperty(key))
						Variant.sum[key] = [0, 0, 0];
					Variant.sum[key][0] = parseInt(val[0], 10);
					Variant.sum[key][1] = parseInt(val[1], 10);
					Variant.sum[key][2] += parseInt(val[1], 10);
					
					$(this).parents('tr').eq(0).find('td').last().prev().html(Variant.sum[key].join('/'));
				}
			});
		}
	},
	updateUnitLinks: function() {
		// keine Variante ausgewählt; alle Links wieder sichtbar machen
		if (Variant.getSelectedIndex('unit') < 0) {
			$('#train_form tr').slice(1).each(function() {
				if (this.cells.length < 2 || !$(this).find('img').eq(0).attr('src'))
					return;
				var unit = $(this).find('img').eq(0).attr('src').match(/unit_(.+)\.png/)[1];
				$(this).find('td').last().find('*').show().parent().find('span.inactive:contains('+ texts.gui.troopsNumReached +')').hide();
			});
			return;
		}
		
		// Berücksichtigen: Anzahl der freien Bauernhofplätze - Anzahl AGs * 100 - Anzahl frei zu lassender Bauernhofplätze
		$('#train_form tr').slice(1).each(function() {
			if (this.cells.length < 2 || !$(this).find('img').eq(0).attr('src'))
				return;
			var match = $(this).find('img').eq(0).attr('src').match(/unit_(.+)\.png/);
			if (!match)
				return;
			var unit = match[1],
			max_count = Variant.getSelectedVariant('unit', null, unit);
			if (Variant.sum[unit][2] >= max_count) {
				// Wenn es Elemente gibt (Eingabefeld + Link etc.)
				if ($(this).find('td').last().find('*').length) {
					// Wenn es bereits ein Element gibt, dann sichbar machen...
					if (!$(this).find('td').last().find('*').hide().parent().find('span.inactive:contains('+ texts.gui.troopsNumReached +')').show().length)
						// ...ansonsten eins hinzufügen
						$(this).find('td').last().append('<span class="inactive">'+ texts.gui.troopsNumReached +'</span>');
				} else {	// Einheit wurde z.B. noch nicht erforscht, oder nicht genug BH-Pläzte frei etc.
					$(this).find('td').last().html( texts.gui.troopsNumReached );
				}
			} else {
				$(this).find('td').last().find('*').show().parent().find('span.inactive:contains('+ texts.gui.troopsNumReached +')').hide();
				// das _0_a wird so zusammengesetzt: '_' + village_id + '_a'
				//var link = $('#'+ unit +'_0_a'); => wird zu win.unit_build_block.get_a(unit) für die Massenrekrutierung nötig
				var link = $(win.unit_build_block.get_a(unit));
				if (link.length) {
					var max_build = parseInt( link.html().remove(/[\(\)]/g) );
					if (max_build + Variant.sum[unit][2] > max_count) {
						link.html('('+ (max_count - Variant.sum[unit][2]) +')');
						if (!link.hasClass('monitored')) {
							link[0].addEventListener('click', function() {
								var unit = $(this).attr('id').remove(/_\d+_a/),
								max_count = Variant.getSelectedVariant('unit', null, unit),
								max_possible = parseInt($(this).html().match(/\((\d+)\)/)[1], 10);
								var num = max_count - Variant.sum[unit][2];
								if (num > max_possible)
									num = max_possible;
								$('#'+ unit +'_0').val(num);
								win.unit_build_block._onchange();
								
								Variant.updateUnitLinks();
							}, false);
							link.addClass('monitored');
						}
						link.attr('href', 'javascript:;');
					}
				}
			}
		});
	},
	buildInputKeyUp: function() {
		if (regex.NaN.test($(this).val())) {
			var pos = $(this).getCursorPosition(),
			count = $(this).val().substr(0,pos).match(/[^\d]/g).length;
			$(this).val( $(this).val().remove(/[^\d]/g) ).setCursorPosition(pos-count);
		}
		
		var build = $(this).attr('class').match(/dsfa_(.+)/)[1],
		val = $(this).val();
		if (val == '')
			val = 0;
		if (val !== 0) {
			val = parseInt(val, 10);
			if (val < lib.buildingInfo[build].min_level)
				$(this).val(lib.buildingInfo[build].min_level);
			if (val > lib.buildingInfo[build].max_level)
				$(this).val(lib.buildingInfo[build].max_level);
		}
		
		if (build == 'church')
			var otherChurch = $(this).parents('tr').eq(0).find('.dsfa_church_f').attr('disabled', false).css('color', '');
		else if (build == 'church_f')
			var otherChurch = $(this).parents('tr').eq(0).find('.dsfa_church').attr('disabled', false).css('color', '');
		if (build == 'church' || build == 'church_f') {
			if (val && otherChurch.val() != '' && otherChurch.val() != '0') {
				$(this).css('color', 'red');
				otherChurch.css('color', 'red');
			} else if (val)
				otherChurch.attr('disabled', true);
		}
		
		Variant.calcPop('build', $(this).parent().parent());
		Variant.calcPoints($(this).parent().parent());
	},
	buildInputChange: function() {
		if ($(this).val() == '')
			$(this).val(0);
	},
	buildInputClick: function() {
		if ($(this).val() == '')
			$(this).val(0);
		if ($(this).val() == '0')
			$(this).focus().select();
	},
	updateBuildLinks: function() {
		$('#buildings tr').slice(1).each(function() {
			$(this).show();
			var build = $(this).find('img').eq(0).attr('src').match(/buildings\/(.+)\.png/)[1],
			tds = $(this).find('td');
			if ($(this).find('td').length < 3) {
				if ($(this).hasClass('togglerow') && !$('#show_all_buildings').is(':checked') ||
					 !$(this).hasClass('togglerow') && $('#dsfa_hide_completed').is(':checked') && Variant.getSelectedIndex('build') < 0)
					$(this).hide();
			} else
				$(this).find('td').slice(1).show().parent().find('td.buildReady, td.buildOver').hide();
		});
		
		var buildUp = {},
		buildDown = {};
		$('#buildqueue tr').slice(1).each(function() {
			if (this.cells.length < 2)
				return;
			
			
			$(this).show();
			var match = this.cells[0].innerHTML.match(texts.regex.mainQueue);
			if (!match)
				return;
			
			var buildName = match[1] || match[3],
			level = parseInt(match[2], 10) || -1;
			for (var key in lib.buildingInfo)
				if (texts.buildings[key] == buildName) {
					if (level < 0)
						if (buildDown.hasOwnProperty(key))
							buildDown[key] += level;
						else
							buildDown[key] = level;
					else
						buildUp[key] = level;
					break;
				}
		});
		
		$('#buildings tr').slice(1).each(function() {
			if (this.cells.length < 2)
				return;
			
			var build = $(this).find('a').eq(0).attr('href').match(/screen=([^&=]+)/)[1],
			match = $(this).find('td').eq(0).html().match(texts.regex.mainLevel),
			level = (buildUp.hasOwnProperty(build) ? buildUp[build] : (match ? parseInt(match[1], 10) : 0)),
			max_level = Variant.getSelectedIndex('build') < 0 ? lib.buildingInfo[build].max_level : Variant.getSelectedVariant('build', null, build);
			if (buildDown.hasOwnProperty(build))
				level += buildDown[build];
			
			if (level == max_level) {
				if ($('#dsfa_hide_completed').is(':checked'))
					$(this).hide();
				else {
					$(this).find('td').slice(1).hide();
					if (!$(this).find('.buildReady').show().length)
						$(this).append('<td align="center" class="inactive buildReady" colspan="6">'+ texts.gui.buildReady +'</td>');
				}
			} else if (level > max_level) {
				$(this).find('td').slice(1).hide();
				if (!$(this).find('.buildOver').show().length) {
					$(this).append(
						'<td align="center" class="warn buildOver" colspan="5" style="font-weight: bold;">'+ texts.gui.buildOver +'</td>' +
						'<td class="buildOver"><a href="javascript:;">'+ texts.gui.tearDownLevel +'</a></td>'
					).find('.buildOver > a')[0].addEventListener('click', Variant.destroy, true);
				}
			} else {
				var resNext = Variant.calcRes(build, level),
				resNow = {
					wood: parseInt($('#wood').html(), 10),
					stone: parseInt($('#stone').html(), 10),
					iron: parseInt($('#iron').html(), 10)
				},
				resProd = {
					wood: parseInt($('#wood').attr('title'), 10) || 5,
					stone: parseInt($('#stone').attr('title'), 10) || 5,
					iron: parseInt($('#iron').attr('title'), 10) || 5
				};
				
				for (var res in resNow) {
					var diff = resNext[res] - resNow[res];
					if ($(this).find('.'+ res).parent().find('span').length == 1) {
						if (diff > 0) {
							var time = diff / resProd[res],
							hours = Math.floor(time),
							minutes = Math.floor((time - hours) * 60),
							seconds = Math.floor(((time - hours) * 60 - minutes) * 60);
							$(this).find('.'+ res).parent().append(' <span style="color: red;" title="'+ hours +':'+ lib.padLeft(minutes, '0', 2) +':'+ lib.padLeft(seconds, '0', 2) +'">('+ diff +')</span>');
						} else
							$(this).find('.'+ res).parent().append(' <span class="inactive">(0)</span>');
					} else {
						if (diff > 0) {
							var time = diff / resProd[res],
							hours = Math.floor(time),
							minutes = Math.floor((time - hours) * 60),
							seconds = Math.floor(((time - hours) * 60 - minutes) * 60);
							$(this).find('.'+ res).parent().find('span').eq(1).html('('+ diff +')').attr('title', hours +':'+ lib.padLeft(minutes, '0', 2) +':'+ lib.padLeft(seconds, '0', 2)).css('color', 'red').removeClass('inactive');
						} else
							$(this).find('.'+ res).parent().find('span').eq(1).html('(0)').css('color', '').addClass('inactive');
					}
				}
			}
		});
	},
	generate_buildings_for_village_init: false,
	updateBuildOverviewLinks: function() {
		$('td.build_icon, td.destroy_icon').remove();
		var interval = window.setInterval(function() {
			if (typeof(win.BuildingOverview.page_size) == "undefined")
				return;
			Variant.generate_buildings_for_village_init = true;
			
			win.BuildingOverview._display_all = true;
			win.BuildingOverview._display_type = 0;
			$.getJSON(
				$('#get_all_possible_building_upgrades_link').val(),
				{
					destroy: 0,
					page_start: win.BuildingOverview.page_start,
					page_size: win.BuildingOverview.page_size,
					order: win.BuildingOverview.order,
					dir: win.BuildingOverview.dir
				},
				function(villages) {
					$.each(villages, function (village_id, village) {
						if (!village.managed_by_am)
							Variant.generate_buildings_for_village(village, 0);
					});
					
					win.BuildingOverview._display_type = 1;
					$.getJSON(
						$('#get_all_possible_building_upgrades_link').val(),
						{
							destroy: 1,
							page_start: win.BuildingOverview.page_start,
							page_size: win.BuildingOverview.page_size,
							order: win.BuildingOverview.order,
							dir: win.BuildingOverview.dir
						},
						function(villages) {
							$.each(villages, function (village_id, village) {
								if (!village.managed_by_am)
									Variant.generate_buildings_for_village(village, 1);
							});
							Variant.generate_buildings_for_village_init = false;
						}
					);
				}
			);
			win.BuildingOverview.update_paged_nav();
			
			window.clearInterval(interval);
		}, 200);
	},
	generate_buildings_for_village: function (village, destroy) {
		win.BuildingOverview._upgrade_villages[village.village_id] = village;
		var village_row = $('#v_'+ village.village_id);
		if (village_row.is(':hidden')) {
			return;
		}
		
		var buildChanges = {};
		village_row.find('td').last().find('li').each(function() {
			var down = $(this).find('.order-status-light').css('background-color') == 'rgb(255, 0, 0)',
			match = $(this).find('img').last().attr('src').match(/buildings\/(.+)\.png/);
			if (!match)
				return;
			var build = match[1];
			if (!buildChanges.hasOwnProperty(build))
				buildChanges[build] = 0;
			buildChanges[build] += down ? -1 : 1;
		});
		
		village_row.find('td.upgrade_building').each(function(index, building) {
			var id = building.className.replace(/.*b_([^\s]+).*/, '$1'),
			build = id,
			level = parseInt($(this).find('*').length ? $(this).find('*').html() : $(this).html());
			if (isNaN(level))
				level = 0;
			var actLevel = level + (buildChanges.hasOwnProperty(build) ? buildChanges[build] : 0),
			max_level = parseInt(Variant.getSelectedIndex('build') < 0 ? lib.buildingInfo[build].max_level : Variant.getSelectedVariant('build', village.village_id, build));
			
			if ($(this).find('span').length)
				$(this).html( $(this).find('span').html() );
			
			if (actLevel > max_level) {
				$(building).css({
					'background-color': '#FF7070',
					'color': 'red',
					'font-weight': 'bold'
				});
			} else if (actLevel < max_level) {
				$(building).css({
					'background-color': '#AAFFAA',
					'color': 'green',
					'font-weight': 'bold'
				});
			} else {
				$(building).css({
					'background-color': '',
					'color': '',
					'font-weight': ''
				});
				$(building).addClass('hidden');
				
				var links = building.getElementsByTagName('a');
				if (links.length > 0)
					building.innerHTML = links[0].innerHTML;
			}
			
			if (destroy && actLevel > max_level || !destroy && actLevel < max_level) {
				if (typeof(village.buildings[id]) != 'undefined') {
					var building_level = parseInt(building.innerHTML.replace(/<.*>(\d*?)<\/.*?>$/, '$1')),
					title = win.UpgradeBuilding.generateResourcesLabel(village.buildings[id], destroy),
					upgrade_anker = '<a href="#" class="building_tooltip d_'+ destroy +'" tooltip="'+ title +'">'+ building_level +'</a>';
					building.innerHTML = upgrade_anker;
				} else {
					var links = building.getElementsByTagName('a');
					if (links.length > 0)
						building.innerHTML = links[0].innerHTML;
				}
			}
		});
	},
	upgrade_building: function (village_id, building, destroy) {
		var handleAddToQueue = function () {
			if (destroy == 0)
				var url = $('#upgrade_building_link').val().replace(/village=([0-9]*)/, "village="+ village_id);
			else
				var url = $('#downgrade_building_link').val().replace(/village=([0-9]*)/, "village="+ village_id);
			$.ajax({
				dataType: 'json',
				type: 'get',
				url: url,
				data: {
					id: building,
					force: 1,
					source: game_data.village.id
				},
				success: function (ret) {
					if (ret.error) {
						UI.InfoMessage(ret.error, 2000, true)
					} else if (ret.success) {
						win.BuildingOverview._upgrade_villages[village_id].confirm_queue = ret.confirm_queue;
						if ($("#building_order_" + village_id).length == 0) {
							var list = $('<ul></ul>').addClass('order_queue').attr("id", "building_order_"+ village_id);
							win.BuildingOverview.create_sortable(list);
							$("td:last-child", "#v_"+ village_id).append(list)
						};
						$("#building_order_"+ village_id).html(ret.building_orders)
						
						Variant.generate_buildings_for_village(ret.next_buildings, destroy);
					}
				}
			})
		};
		if (win.BuildingOverview._upgrade_villages[village_id].confirm_queue) {
			var msg = "Aufträge in der Bauschleife kosten extra. Dennoch bauen?",
			buttons = [{
				text: "OK",
				callback: handleAddToQueue,
				confirm: true
			}];
			UI.ConfirmationBox(msg, buttons)
		} else
			handleAddToQueue();
	},
	destroy: function() {
		var building_id = $(this).parents('tr').eq(0).find('img').eq(0).attr('src').match(/buildings\/(.+)\.png/)[1],
		current_request_id = ++win.BuildingMain.request_id,
		data = {
			id: building_id,
			force: 1,
			destroy: 1,
			source: game_data.village.id
		};
		$.ajax({
			url: win.BuildingMain.downgrade_building_link,
			dataType: 'json',
			data: data,
			success: function (build_ret) {
				if (build_ret.error) {
					UI.InfoMessage(build_ret.error, 2000, true)
				} else if (build_ret.success && current_request_id > win.BuildingMain.last_request_id) {
					win.BuildingMain.last_request_id = current_request_id;
					delete build_ret.next_buildings;	// sonst updated der auch die Ausbau-Links zu Abbriss-Links
					win.BuildingMain.update_all(build_ret)
				}
			}
		});
		return false
	}
};


/*
 * Zeigt Informationen über ein Dorf an
 */
Infos = {
	villageID: null,
	init: function() {
		if (game_data.screen != 'info_player' &&
			game_data.screen != 'info_ally' &&
			game_data.screen != 'info_village' &&
			game_data.screen != 'place')
			return;
		
		getHomeCoords();
		
		var matchID = location.href.match(regex.ID);
		if (game_data.screen == 'info_player') {
			if (!matchID)
				return;
			
			// Aktenlinks
			var ID = matchID[1], link,
			playerInfoTable = $($('#content_value').find('table')[1]);
			site = Settings.get('paFeatures_fileSite');
			if (site == 0) {
				link = 'http://'+ game_data.market +'.twstats.com/'+ game_data.world +'/index.php?page=player&id='+ ID;
			} else if (site == 1) {
				link = 'http://'+ game_data.world +'.twplus.org/file/player/'+ ID +'/';
			} else if (site == 2) {
				link = 'http://www.dsreal.de/index.php?screen=file&id='+ ID +'&mode=player&world='+ game_data.world;
			}
			var HTML = '<td colspan="2"><a href="'+ link +'" target="_blank">» '+ texts.gui.freePA.playerFile +'</a> ('+ texts.gui.freePA.externalLink[site] +')</td>';
			if (lib.hasPA) {
				playerInfoTable.find('tr').last().html(HTML);
			} else if (!lib.hasPA && Settings.get('paFeatures_freePA')) {
				playerInfoTable.append('<tr>'+ HTML +'</tr>');
			}
			
			if (game_data.market == 'de' && Settings.get('paFeatures_showStats')) {
				var playerChartLink = 'http://www.dsreal.de/index.php?world='+ game_data.world +'&amp;screen=$1&amp;id='+ ID,
				playerChartSrc = 'http://www.dsreal.de/charts/player$1.php?id='+ ID +'&world='+ game_data.world,
				playerChartSrcPure = 'http://www.dsreal.de/charts/player$1.php?id='+ ID +'&amp;world='+ game_data.world;
				playerInfoTable.append(
					'<tr style="text-align: center;">' +
						'<td colspan="2">' +
							'<a target="_blank" href="'+ playerChartLink.replace('$1', 'file&amp;mode=player') +'" style="display:block">' +
								'<img id="dsfa_dsRealChartPlayer" src="'+ playerChartSrcPure.replace('$1', 'Points') +'">' +
							'</a>' +
							'<table class="vis" style="width: 100%;"><tr class="nowrap">' +
								'<th><u>Allgemein:</u></th>' +
								'<th class="selected">' +
									'<a href="javascript:;" id="dsfa_playerPoints">» Punkte</a>' +
								'</th>' +
								'<th>' +
									'<a href="javascript:;" id="dsfa_playerVillages">» Dörfer</a>' +
								'</th>' +
								'<th>' +
									'<a href="javascript:;" id="dsfa_playerRank">» Rang</a>' +
								'</th>' +
							'</tr></table>' +
						'</td>' +
					'</tr>' +
					'<tr style="text-align: center;">' +
						'<td colspan="2">' +
							'<a target="_blank" href="'+ playerChartLink.replace('$1', 'conquer&amp;mode=player') +'" style="display:block">' +
								'<img id="dsfa_dsRealBashPlayer" src="'+ playerChartSrcPure.replace('$1', 'Bashall') +'">' +
							'</a>' +
							'<table class="vis" style="width: 100%;"><tr class="nowrap"><tr>' +
								'<th><u>Bes. Gegner:</u></th>' +
								'<th class="selected">' +
									'<a href="javascript:;" id="dsfa_playerBashall">» Gesamt</a>' +
								'</th>' +
								'<th>' +
									'<a href="javascript:;" id="dsfa_playerBashoff">» Offensiv</a>' +
								'</th>' +
								'<th>' +
									'<a href="javascript:;" id="dsfa_playerBashdef">» Defensiv</a>' +
								'</th>' +
							'</tr></table>' +
						'</td>' +
					'</tr>'
				);
				function changeChart() {
					this.blur();
					$(this).parents('table').eq(0).parent().find('img').eq(0).attr('src', playerChartSrc.replace('$1', this.id.remove(/dsfa_player/)));
					$(this).parent().parent().find('.selected').removeClass('selected');
					$(this).parent().addClass('selected');
				}
				$('#dsfa_playerPoints').click(changeChart);
				$('#dsfa_playerVillages').click(changeChart);
				$('#dsfa_playerRank').click(changeChart);
				$('#dsfa_playerBashall').click(changeChart);
				$('#dsfa_playerBashoff').click(changeChart);
				$('#dsfa_playerBashdef').click(changeChart);
			}
		} else if (game_data.screen == 'info_ally') {
			if (!matchID)
				return;
			
			// Aktenlinks
			var ID = matchID[1], link,
			site = Settings.get('paFeatures_fileSite');
			if (site == 0) {
				link = 'http://'+ game_data.market +'.twstats.com/'+ game_data.world +'/index.php?page=tribe&id='+ ID;
			} else if (site == 1) {
				link = 'http://'+ game_data.world +'.twplus.org/file/ally/'+ ID +'/';
			} else if (site == 2) {
				link = 'http://www.dsreal.de/index.php?screen=file&id='+ ID +'&mode=ally&world='+ game_data.world;
			}
			var beforeRow = $($('#content_value').find('table')[1]).find('tr').last();
			while (beforeRow.find('td.no_bg').length)
				beforeRow = beforeRow.prev();
			
			var HTML = '<td colspan="2"><a href="'+ link +'" target="_blank">» '+ texts.gui.freePA.allyFile +'</a> ('+ texts.gui.freePA.externalLink[site] +')</td>';
			if (lib.hasPA) {
				beforeRow.prev().html(HTML);
			} else if (!lib.hasPA && Settings.get('paFeatures_freePA')) {
				$('<tr>'+ HTML +'</tr>').insertBefore(beforeRow);
			}
			
			if (game_data.market == 'de' && Settings.get('paFeatures_showStats')) {
				var allyChartLink = 'http://www.dsreal.de/index.php?world='+ game_data.world +'&amp;screen=$1&amp;id='+ ID,
				allyChartSrc = 'http://www.dsreal.de/charts/ally$1.php?id='+ ID +'&world='+ game_data.world,
				allyChartSrcPure = 'http://www.dsreal.de/charts/ally$1.php?id='+ ID +'&amp;world='+ game_data.world;
				$(
					'<tr style="text-align: center;">' +
						'<td colspan="2">' +
							'<a target="_blank" href="'+ allyChartLink.replace('$1', 'file&amp;mode=ally') +'" style="display:block">' +
								'<img id="dsfa_dsRealChartAlly" src="'+ allyChartSrcPure.replace('$1', 'Points') +'">' +
							'</a>' +
							'<table class="vis" style="width: 100%;"><tr class="nowrap">' +
								'<th><u>Allgemein:</u></th>' +
								'<th class="selected">' +
									'<a href="javascript:;" id="dsfa_allyPoints">» Punkte</a>' +
								'</th>' +
								'<th>' +
									'<a href="javascript:;" id="dsfa_allyVillages">» Dörfer</a>' +
								'</th>' +
								'<th>' +
									'<a href="javascript:;" id="dsfa_allyRank">» Rang</a>' +
								'</th>' +
							'</tr></table>' +
						'</td>' +
					'</tr>' +
					'<tr style="text-align: center;">' +
						'<td colspan="2">' +
							'<a target="_blank" href="'+ allyChartLink.replace('$1', 'conquer&amp;mode=ally') +'" style="display:block">' +
								'<img id="dsfa_dsRealBashAlly" src="'+ allyChartSrcPure.replace('$1', 'Bashall') +'">' +
							'</a>' +
							'<table class="vis" style="width: 100%;"><tr class="nowrap">' +
								'<th><u>Bes. Gegner:</u></th>' +
								'<th class="selected">' +
									'<a href="javascript:;" id="dsfa_allyBashall">» Gesamt</a>' +
								'</th>' +
								'<th>' +
									'<a href="javascript:;" id="dsfa_allyBashoff">» Offensiv</a>' +
								'</th>' +
								'<th>' +
									'<a href="javascript:;" id="dsfa_allyBashdef">» Defensiv</a>' +
								'</th>' +
							'</tr></table>' +
						'</td>' +
					'</tr>'
				).insertBefore(beforeRow);
				function changeChart() {
					this.blur();
					$(this).parents('table').eq(0).parent().find('img').eq(0).attr('src', allyChartSrc.replace('$1', this.id.remove(/dsfa_ally/)));
					$(this).parent().parent().find('.selected').removeClass('selected');
					$(this).parent().addClass('selected');
				}
				$('#dsfa_allyPoints').click(changeChart);
				$('#dsfa_allyVillages').click(changeChart);
				$('#dsfa_allyRank').click(changeChart);
				$('#dsfa_allyBashall').click(changeChart);
				$('#dsfa_allyBashoff').click(changeChart);
				$('#dsfa_allyBashdef').click(changeChart);
			}
		} else if (game_data.screen == 'info_village') {
			if (!matchID)
				return;
			var ID = matchID[1],
			match = $('#content_value table.vis tr').eq(1).find('td').last().html().split('|'),
			vCoords = [parseInt(match[0], 10), parseInt(match[1], 10)],
			coordDiff = Math.sqrt(Math.pow(hCoords[0] - vCoords[0], 2) + Math.pow(hCoords[1] - vCoords[1], 2)),
			tooltips = false;
			this.villageID = ID;
			
			if (!Village._coords[vCoords.join('|')]) {
				Village._coords[vCoords.join('|')] = ID;
				Village.save(true);
			}
			
			// Aktenlinks
			var link,
			villageInfoTable = $($('#content_value').find('table')[1]),
			site = Settings.get('paFeatures_fileSite');
			if (site == 0) {
				link = 'http://'+ game_data.market +'.twstats.com/'+ game_data.world +'/index.php?page=village&id='+ ID;
			} else if (site == 1) {
				link = 'http://'+ game_data.world +'.twplus.org/file/village/'+ ID +'/';
			} else if (site == 2) {
				link = 'http://www.dsreal.de/index.php?screen=village&id='+ ID +'&world='+ game_data.world;
			}
			var HTML = '<td colspan="2"><a href="'+ link +'" target="_blank">» '+ texts.gui.freePA.villageFile +'</a> ('+ texts.gui.freePA.externalLink[site] +')</td>';
			if (lib.hasPA) {
				villageInfoTable.find('tr').last().html(HTML);
			} else if (!lib.hasPA && Settings.get('paFeatures_freePA')) {
				villageInfoTable.append('<tr>'+ HTML +'</tr>');
			}
			
			/*
			 * "Daten löschen"-Link
			 */
			if (Village.existSpy(ID) || Village.exist(ID)) {
				$('#content_value table.vis th').eq(0).append('<a href="javascript:;" class="cancel-icon solo tooltip" title="'+ texts.gui.delData +'" style="float: right;"></a>')
				.find('a').last()[0].addEventListener('click', function() {
					if (!Settings.get('misc_enableConfirm') || confirm(texts.gui.delConfirm)) {
						var ID = location.href.match(regex.ID)[1];
						Village.delData(ID);
						location.reload();
					}
				}, false);
				tooltips = true;
			}
			
			/*
			 * Sperrung anzeigen
			 */
			$($('#content_value').find('table')[1]).append('<tr id="dsfa_lock"><td colspan="2"><input type="checkbox"'+ (Village.isLocked(ID) ? ' checked' : '') +'> '+ texts.gui.lockFarm +'</td></tr>')
			.find('input[type="checkbox"]').last()[0].addEventListener('change', function() {
				Village.setLock(Infos.villageID, this.checked);
			}, false);
			
			// Bonus einlesen und speichern
			var bonus = $('.bonus_icon').attr('class');
			if (bonus)
				Village.set(ID, 'bonus', bonus.match(/bonus_icon_(\d)/)[1]);

			/*
			 * Punkte ausrechnen und einfügen
			 */
			if (Village.existSpy(ID)) {
				var pointsEl = $('#content_value table.vis tr').eq(2).find('td').last(),
				momPoints = parseInt(pointsEl.html().remove(/(<[^>]*>)|\.|\s/g)),
				pointsDiff = momPoints - Village.getPoints(ID),
				buildingConstruction = {};
				if (pointsDiff > 0)
					var buildingConstruction = Village.getBuildUps(ID, pointsDiff);
				
				var HTML = lib.formatNumber(momPoints, true, true);
				HTML += ' <span style="font-size: 90%;';
				if (pointsDiff > 0)
					HTML += ' color: green !important;">+<span id="getBuildUps2" title="'+ texts.gui.buildUps2 +'" style="cursor: pointer;">';
				else if (pointsDiff < 0)
					HTML += ' color: red;">';
				else
					HTML += '">±';
				HTML += pointsDiff;
				if (pointsDiff > 0)
					HTML += '</span>';
				HTML += '</span>';
				pointsEl.html(HTML);
				
				if (pointsDiff > 0)
					$('#getBuildUps2').click(function() {
						if (confirm(texts.gui.buildUps2Warning)) {
							Village.getBuildUps2(Infos.villageID, pointsDiff);
						}
					});
			}
			
			/*
			 * Den Erfolgsquotienten anzeigen
			 */
			if (Village.existSpy(ID)) {
				var eqEl = null;
				$('#content_value table.vis>tbody').eq(0).find('tr').each(function() {
					if (this.cells.length > 1)
						eqEl = this;
				});
				$('<tr class="dsfa_eq">' +
					'<td>EQ:</td>' +
					'<td>'+ Math.round(Village.get(ID, 'eq') * 100) +' <i>%</i> <span class="grey">('+ Village.get(ID, 'eqCount') +')</span><a href="javascript:;" class="cancel-icon solo tooltip" title="'+ texts.gui.resetEQ +'" style="float: right;"></a></td>' +
				'</tr>').insertAfter(eqEl)
				.find('a')[0].addEventListener('click', function() {
					var ID = Infos.villageID;
					Village.set(ID, 'eq', 1);
					Village.set(ID, 'eqCount', 0);
					Village.save();
					$('<tr class="dsfa_eq">' +
						'<td>EQ:</td>' +
						'<td>'+ Math.round(Village.get(ID, 'eq') * 100) +' <i>%</i> <span class="grey">('+ Village.get(ID, 'eqCount') +')</span></td>' +
					'</tr>').insertAfter( $(this).parents('tr').eq(0) ).find('td').last().append( $(this) ).parents('tr').eq(0).prev().remove();
				}, true);
				tooltips = true;
			}
			
			if (!Village.existSpy(ID))
				return;
			
			/*
			 * Informationen ( Rohstoffstand, Zustimmung, Gebäude, Einheiten )
			 */
			var HTML = '<table class="vis" style="width: 100%;">',
			res = Village.getRes(ID, null, false),
			resWarn = Village.getResWarn(ID, null, false),
			resWarn90 = Village.getResWarn(ID, null, false, 0.9),
			resProd = Village.getResProd(ID),
			storageColorActive = Settings.get('general_enableStorageColorAt['+ game_data.screen +']');
			
			// mögliche Rohstoffe:
			HTML += '<tr id="dsfa_contingentRes">' +
			'<td class="nowrap">'+ texts.gui.contingentRes +':</td>' +
			'<td style="padding: 0;">' +
			'<table class="overview_table" style="border-spacing: 6px 0;"><tr>' +
			'<td style="padding: 2px 3px;" class="wood"><span class="'+ (resWarn.wood && !storageColorActive ? 'warn' : (resWarn90.wood && !storageColorActive ? 'warn_90' : 'res')) +' wood" title="'+ resProd.wood +'">'+ lib.formatNumber(res.wood, true, true) +'</span></td>' +
			'<td style="padding: 2px 3px;" class="stone"><span class="'+ (resWarn.stone && !storageColorActive ? 'warn' : (resWarn90.stone && !storageColorActive ? 'warn_90' : 'res')) +' stone" title="'+ resProd.stone +'">'+ lib.formatNumber(res.stone, true, true) +'</span></td>' +
			'<td style="padding: 2px 3px;" class="iron"><span class="'+ (resWarn.iron && !storageColorActive ? 'warn' : (resWarn90.iron && !storageColorActive ? 'warn_90' : 'res')) +' iron" title="'+ resProd.iron +'">'+ lib.formatNumber(res.iron, true, true) +'</span></td>' +
			'<td style="padding: 2px 3px;"><span style="padding: 0 10px 0 0;">/</span><span style="background: transparent url(\''+ image_base +'res.png?\') no-repeat;" class="res" title="'+ texts.gui.effectiveStorage +'">'+ lib.formatNumber(res.max, true, true) +'</span></td>' +
			'</tr></table>' +
			'</td>' +
			'</tr>';
			
			// Zustimmung
			if (Village.getMood(ID) < 100)
				HTML += '<tr><td class="nowrap">'+ texts.gui.mood +':</td><td>'+ Village.getMood(ID) +'</td></tr>';
			
			// Gebäude:
			var line1 = line2 = line3 = '';
			for (var key in lib.buildingInfo) {
				var buildingLevel = Village.getBuilding(ID, key),
				newLevel = ( typeof(buildingConstruction[key]) == "undefined" ? 0 : buildingConstruction[key]);
				if (buildingLevel > 0 || newLevel > 0) {
					line1 += '<td style="text-align: center; width: 25px;'+ (line1 != '' ? ' border-left: 1px dashed #C1A264;' : '') +'"><img src="'+ texts.buildingImgPath.replace('$', key) +'"></td>';
					line2 += '<td style="text-align: center;'+ (line2 != '' ? ' border-left: 1px dashed #C1A264;' : '') +'">';
					if (key == 'wall' && buildingLevel > 4)
						line2 += '<span class="'+ (buildingLevel > 9 ? 'warn' : 'warn_90') +'">'+ buildingLevel +'</span>';
					else
						line2 += buildingLevel;
					line2 += '</td>';
					line3 += '<td style="text-align: center;'+ (line3 != '' ? ' border-left: 1px dashed #C1A264;' : '') +'">'+ (newLevel > 0 ? '<span style="color: grey; font-size: 80%;">('+ newLevel +')</span>' : '') +'</td>';
				}
			}
			HTML += '<tr id="dsfa_buildings">' +
			'<td class="nowrap">'+ texts.gui.buildings +':<br><span style="font-size: 80%; font-style: italic;">'+ Village.getSpyDate(ID, 'd.M. H:m:s') +'</span></td>' +
			'<td><table id="buildings"><tr>'+ line1 +'</tr><tr>'+ line2 +'</tr><tr>'+ line3 +'</tr></table>';
			
			// Einheiten Tabelle
			var line1 = line2 = '';
			for (var key in lib.unitInfo) {
				line1 += '<td style="text-align: center; width: 25px;'+ (line1 != '' ? 'border-left: 1px dashed #C1A264;' : '') +'"><img src="'+ texts.unitImgPath.replace('$', key) +'" title="'+ texts.unit[key] +'" alt="'+ texts.unit[key] +'"></td>';
				line2 += '<td style="text-align: center;'+ (line2 != '' ? ' border-left: 1px dashed #C1A264;' : '') +'" class="unit-item';
				var unit = Village.getUnit(ID, key);
				if (unit < 1) {
					line2 += ' hidden';
					if (unit < 0)
						unit = '?';
				}
				line2 += '">'+ unit +'</td>';
			}
			HTML += '<tr id="dsfa_units">' +
			'<td class="nowrap">'+ texts.gui.units +':<br><span style="font-size: 80%; font-style: italic;">'+ Village.getSpyDate(ID, 'd.M. H:m:s') +'</span></td>' +
			'<td><table id="units"><tr>'+ line1 +'</tr><tr>'+ line2 +'</tr></table></td>' +
			'</table>';
			
			$('#content_value table:eq(0) :first :first>:last').append(HTML);
			
			Storage.attachResTicker($('.overview_table span.wood')[0], resProd.wood, res.max);
			Storage.attachResTicker($('.overview_table span.stone')[0], resProd.stone, res.max);
			Storage.attachResTicker($('.overview_table span.iron')[0], resProd.iron, res.max);
			Storage.initResTicker();
			Storage.colorize = storageColorActive;
			Storage.colorRes();
			
			if (tooltips)
				UI.ToolTip($('.tooltip'), {});
		} else if (game_data.screen == 'place') {
			if ($('#troop_confirm_go').length && $('#content_value table').eq(0).find('a').length) {
				var match = $('#content_value table').eq(0).find('a').attr('href').match(regex.ID);
				if (!match)
					return;
				var ID = match[1],
				ownerID = 0;
				if ($('#content_value table').eq(0).find('a').length > 1) {
					var match = $('#content_value table').eq(0).find('a').eq(1).attr('href').match(regex.ID);
					if (!match)
						return;
					ownerID = match[1];
				}
				if (Village.existSpy(ID) && ownerID != Village.get(ID, 'ownerID')) {
					$('#content_value table').eq(0).find('tr').eq(2).find('a').parent().css('background-color', 'red');
					$('#troop_confirm_go').attr('disabled', true);
					window.setTimeout(function() {
						$('#troop_confirm_go').attr('disabled', false);
					}, 600);
				}
			}
		}
	},
	getRuntimesHTML: function(coordDiff) {
		var line1 = line2 = '',
		i = 0;
		for (var unit in lib.unitInfo) {
			var uSpeed = lib.unitInfo[unit].speed;
			if (uSpeed > 1) {
				var time = coordDiff * uSpeed;
				var time1 = Math.floor(time / 60);
				time -= time1*60;
				var time2 = Math.floor(time);
				time -= time2;
				if (time2 < 10)
					time2 = '0'+ time2;
				var time3 = Math.round(time * 60);
				if (time3 >= 60) {
					time2 = parseInt(time2) + 1;
					if (time2 < 10)
						time2 = '0'+ time2;
					time3 -= 60;
				}
				if (time3 < 10)
					time3 = '0'+ time3;
				
				line1 += '<td style="padding: 2px; background-color: #'+ (i%2 == 0 ? 'F8F4E8' : 'DED3B9') +'"><img src="'+ texts.unitImgPath.replace('$', unit) +'" title="'+ texts.unit[unit] +'"></td>';
				line2 += '<td style="background-color: #'+ (i%2 == 0 ? 'F8F4E8' : 'DED3B9') +'">'+ time1 +':'+ time2 +':'+ time3 +'</td>';
			}
			i++;
		}
		var HTML = '<table><tr class="center">'+ line1 +'</tr><tr class="center">'+ line2 +'</tr></table>';
		return HTML;
	},
};


/*
 * Farmlist
 */
Farmlist = {
	sortKey: lib.storage.getValue('FarmSortKey', 'distance'),
	sortDir: lib.storage.getValue('FarmSortDir', 1),
	normalList: [],
	attackList: [],
	init: function() {
		if ($('#troop_confirm_go').length && $('#content_value table').eq(0).find('a').length && (!Bot.autoFarmActive && Settings.get('place_sendCatas') || Bot.autoFarmActive && Settings.get('autoFarm_sendCatas'))) {
			var match = $('#content_value table').eq(0).find('a').attr('href').match(regex.ID);
				if (!match)
					return;
			var ID = match[1],
			rows = $('.unit-item').parent().parent().find('tr'),
			thRow = rows.eq(0),
			tdRow = rows.eq(1),
			ramCount = 0;
			cataCount = 0;
			thRow.find('img').each(function(i) {
				if (/unit_ram\.png/.test(this.src)) {
					ramCount = parseInt(tdRow.find('td').eq(i).html(), 10);
				} else if (/unit_catapult\.png/.test(this.src)) {
					cataCount = parseInt(tdRow.find('td').eq(i).html(), 10);
				}
			});
			if (cataCount) {
				var building_order = Settings.get('place_buildingPreferences_order');
				for (var i = 0; (build = building_order[i]); i++) {
					var level = Village.getBuilding(ID, build);
					if (level && (build != 'wall' || ramCount < Settings.ramsNeeded.destroy[level])) {
						$('select[name="building"]').val(build);
						i = -2;
					}
				}
			}
		}
		
		if (Settings.get('place_farmlistOpt') == 0 || game_data.screen != 'place' || !$('#units_form').length)
			return;
		
		// Ausgangskoordinaten ermitteln
		getHomeCoords();
		
		// Style hinzufügen
		$('head').append('<style type="text/css">' +
			"#dsfa_farmTable th { white-space: nowrap; }" +
			"#dsfa_farmTable tr td { background-color: #F4E4BC; }" +
			"#dsfa_farmTable tr:hover td { background-color: #FFF4CC; }" +
			"#dsfa_farmTable tr.attack td { background-color: #D4C4AC; }" +
			"#dsfa_farmTable tr.attack:hover td { background-color: #DFCFAF; }" +
			"#dsfa_farmTable tr td.first-player { background-image: url('http://cdn2.tribalwars.net/graphic/icons/header.png?d2518'); background-repeat: no-repeat; background-position: -72px 1px; min-width: 13px; }" +
			"#dsfa_farmTable tr .lock-icon { background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAAAA7wsK9wMG9wQD9gUE9wQF9wQH9AYE9QYF9QYJ8ggG9gsM9wwO9g4P+wEC+QMA+gIB+gIC+QID+gIE+AMF+AQC+AQD+AYF/QAA/QAB/QAC/AIB+AgJ+AsN8xAP8xER9BAQ9BMS9BIT9RQV9RYV8hoa9RsZ9hob9hse9h8i8iAd9CAi8S4s71BQ81RS8F9e7GFe62Nh6mNj62Nl62dk62Zl7GFg7WBh7GNg7WJi7mRg7WVh7WZg7mRm7m9w7W9x7W9y63J07HNy7Hd17Hd373h38GNh8GVk82hm8XVz8XZ38Xx79Ht754aG6YWH6YaF6IqK6oyI7IuK7YyL8oOF8oaG8ouJ85GT8pWX9JmW9JqW9Z+d85+g9aei96io9Kqt9K2t9a6u86+w8rGu9LKv9rSv8rOx8bK29LKx9LSz9bq39bq7+Li598zM9dTT99zaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH1mncAAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjQ+jcx2AAAAzElEQVQYV2P4DwS+BuZmZmZ+ICYDEDsKCUhKSUkJ2UP4TqJSUpJAICHiAOI7igqAeEC+hJDdfwZ/dnVxBWUlMU1uIV45Fn8GS8+McI98b/2kFM7c+FBTBotIXS2hHKFYxSjtZMZMEwYjlQgfID+RI0wnL93WhsFQjyubI0s0Tj5aNU1Y2prBOCQxhi2VyS0pnitBWNKKIYBDTVyQR1BIQ0ZaVlA4iOG/Mys/xH5JSSFXkPtcmMHOleIT9oK4H6oCKAvh/w+0dQeCYBATAHESSVaqgfK6AAAAAElFTkSuQmCC');}" +
		'</style>');
		
		if (Settings.get('place_farmlistOpt') == 1)
			$('#target_attack').parent().parent().parent().append('<tr></tr><tr><td colspan="6"><a id="dsfa_farmlistLink" href="javascript:;">» ' + texts.gui.farmlist + '</td></tr>');
		else if (Settings.get('place_farmlistOpt') == 2)
			$('<table class="vis" style="width: 100%;"><thead><tr><th>' + texts.gui.farmlist + ' <a id="dsfa_farmlistLink" href="javascript:;" style="float: right;">' + (Settings.get('farmlistState') == 0 ? texts.gui.down : texts.gui.up) + '</a></th></tr></thead></table>').insertAfter('#units_form');
		$('#dsfa_farmlistLink')[0].addEventListener('click', function() {
			if (Settings.get('place_farmlistOpt') == 1) {
				Farmlist.load();
			} else if (Settings.get('place_farmlistOpt') == 2) {
				if (Settings.get('farmlistState') == 0) {
					Settings.set('farmlistState', 1);
					$('#dsfa_farmlistLink').html(texts.gui.up);
					Farmlist.load();
				} else {
					Settings.set('farmlistState', 0);
					$('#dsfa_farmlistLink').html(texts.gui.down);
					$('#dsfa_farmTable').remove();
				}
			}
			this.blur();
		}, false);
		if (Settings.get('place_farmlistOpt') == 2 && Settings.get('farmlistState') == 1) {
			Farmlist.load();
			// Events auslösen
			Farmlist.changeCoords();
			$('#inputx, #inputy').keyup(Farmlist.changeCoords);
		}
	},
	sortCol: function(e) {
		var match = e.target.id.match(/FarmCol-(.+)-(.+)/),
		key = match[1],
		dir = (match[2] == 'up' ? 1 : -1);
		if (Farmlist.sortKey != key || Farmlist.sortDir != dir) {
			$('.sortCol').addClass('grey');
			$(this).removeClass('grey');
			Farmlist.sortKey = key;
			Farmlist.sortDir = dir;
			lib.storage.setValue('FarmSortKey', key);
			lib.storage.setValue('FarmSortDir', dir);
			$('#dsfa_farmTable').remove();
			Farmlist.load();
		}
	},
	changeCoords: function() {
		// die andere Reihe wieder normal einfärben
		$('#selectedFarmRow td').each(function() {
			if (!$(this).hasClass('wood') && !$(this).hasClass('stone') && !$(this).hasClass('iron')) 
				$(this).css('background-color', '');
		});
		$('#selectedFarmRow').attr('id', '');
		
		if (!$('#inputx').length || regex.NaN.test($('#inputx').val()) || !$('#inputy').length || regex.NaN.test($('#inputy').val()))
			return;
		
		var coord = $('#inputx').val() +'|'+ $('#inputy').val(),
		items = $('.farm_link');
		for (var i = 0, item; item = items[i]; i++) {
			if (item.innerHTML == coord) {
				var $tr = $(item).parents('tr').eq(0);
				$tr.find('td').each(function() {
					if (!$(this).hasClass('wood') && !$(this).hasClass('stone') && !$(this).hasClass('iron'))
						$(this).css('background-color', '#FFF6DC');
				});
				$tr.attr('id', 'selectedFarmRow');
				break;
			}
		}
	},
	// 
	clickCoords: function() {	// Einheiten schicken
		var ID = Village._getID(this.innerHTML),
		coords = this.innerHTML.split('|');
		win.selectTarget(coords[0], coords[1], '');
		Farmlist.changeCoords();
		
		var availableUnits = getAvailableUnits();
		
		win.selectAllUnits(false);
		
		// wenn rohstofftragende Einheiten geschickt und Späher nur dann geschickt werden sollen, wenn auch Einheiten geschickt werden
		var sendResTroops = insertFarmTroops(ID, availableUnits),
		farmSpysSettings = Settings.get('place_farmSpys');
		// ob Späher mitgeschickt werden sollen (wenn nicht genug da sind, werden gar keine geschickt)
		if ((sendResTroops || !sendResTroops && !Settings.get('place_spyOnlyWithUnits')) && farmSpysSettings[0] && availableUnits.spy >= farmSpysSettings[1]) {
			if (Village.isBarbarian(ID) || sendResTroops) {
				$('#unit_input_spy').val(farmSpysSettings[1]);
			} else {
				$('#unit_input_spy').val( Math.max(5, farmSpysSettings[1]) );
			}
		}
		
		$(document).scrollTop(0);
	},
	clickAge: function() {	// nur Spähen
		var coords = $(this).parents('tr').eq(0).find('.farm_link').html().split('|'),
		ID = Village._getID(coords.join('|')),
		farmSpysSettings = Settings.get('place_farmSpys'),
		farmSpys = farmSpysSettings[1],
		match = $('#unit_input_spy').next().html().match(/\((\d+)\)/),
		availableSpys = (match && match[1]) || 0;
		win.selectTarget(coords[0], coords[1], '');
		Farmlist.changeCoords();
		
		if (!Village.isBarbarian(ID))
			farmSpys = Math.max(5, farmSpys);
		win.selectAllUnits(false);
		win.insertUnit($('#unit_input_spy'), Math.min(farmSpys, availableSpys));
		$(document).scrollTop(0);
	},
	load: function() {
		var HTML = '';
		if (Settings.get('place_farmlistOpt') == 1) {		// PopUp
			HTML += '<h3>Farmen</h3>' +
			'<table class="vis" style="width: 100%;">';
			var pos = {
				x: $('#units_form').offset().left,
				y: $('#dsfa_farmlistLink').offset().top + 18,
				width: $('#units_form').outerWidth() < 690 ? 690 : $('#units_form').outerWidth(),	// mindestens 690 Pixel breit!
				height: 340
			};
		}
		
		var rows = {
			order: ['attack', 'coords', 'wood', 'stone', 'iron', 'sum', 'eq', 'unitsInfo', 'distance', 'wall', 'age', 'lock', 'delete'],
			attack: {
				headAttr: 'style="width: 14px;"',
				head: '',
				sortable: false
			},
			coords: {
				headAttr: 'id="dsfa_coords"',
				head: '<span style="color:transparent">x</span>x<span style="color:transparent">x</span>|<span style="color:transparent">y</span>y<span style="color:transparent">y</span> (<span id="dsfa_coords_count">?</span>)',
				sortable: false
			},
			wood: {
				headAttr: 'style="text-align: right;"',
				head: '<span class="icon header wood tooltip" title="'+ texts.resources.wood +'"> </span>',
				sortable: true
			},
			stone: {
				headAttr: 'style="text-align: right;"',
				head: '<span class="icon header stone tooltip" title="'+ texts.resources.stone +'"> </span>',
				sortable: true
			},
			iron: {
				headAttr: 'style="text-align: right;"',
				head: '<span class="icon header iron tooltip" title="'+ texts.resources.iron +'"> </span>',
				sortable: true
			},
			sum: {
				headAttr: 'style="text-align: right;"',
				head: '<span class="icon header ressources tooltip" title="'+ texts.resources.sum +'"> </span>',
				sortable: true
			},
			eq: {
				headAttr: 'style="text-align: right;"',
				head: 'EQ',
				sortable: true
			},
			unitsInfo: {
				headAttr: 'style="text-align: right;"',
				head: '<img src="'+ image_base +'command/attack.png" alt="" title="'+ texts.gui.noUnitsCol +'" class="tooltip">',
				sortable: false
			},
			distance: {
				headAttr: 'style="text-align: right;"',
				head: '<img src="'+ image_base +'unit/speed.png" alt="" title="'+ texts.gui.distance +'" class="tooltip">',
				sortable: true
			},
			wall: {
				headAttr: 'style="text-align: right;"',
				head: '<img src="'+ image_base +'buildings/wall.png" alt="" title="'+ texts.buildings.wall +'" class="tooltip">',
				sortable: true
			},
			age: {
				headAttr: 'style="text-align: right;"',
				head: '<span>'+ texts.gui.age +'</span>',
				sortable: true
			},
			lock: {
				headAttr: 'style="width: 15px;"',
				head: '',
				sortable: false
			},
			'delete': {
				headAttr: 'style="width: 15px;"',
				head: '',
				sortable: false
			}
		};
		HTML += '<tbody id="dsfa_farmTable"><tr>';
		for (var i = 0, max = rows.order.length; i < max; i++) {
			var key = rows.order[i],
			val = rows[key];
			HTML += '<th '+ val.headAttr +'>'+ val.head;
			if (val.sortable) {
				if (Farmlist.sortKey == key) {
					HTML += ' <a id="FarmCol-'+ key +'-up" class="sortCol'+ (Farmlist.sortDir == 1 ? '' : ' grey') +'" href="javascript:;">'+ texts.gui.up +'</a>';
					HTML += '<a id="FarmCol-'+ key +'-down" class="sortCol'+ (Farmlist.sortDir == -1 ? '' : ' grey') +'" href="javascript:;">'+ texts.gui.down +'</a>';
				} else {
					HTML += ' <a id="FarmCol-'+ key +'-up" class="sortCol grey" href="javascript:;">'+ texts.gui.up +'</a>';
					HTML += '<a id="FarmCol-'+ key +'-down" class="sortCol grey" href="javascript:;">'+ texts.gui.down +'</a>';
				}
			}
			HTML += '</th>';
		}
		HTML += '</tr>' +
		'<tr><td colspan="'+ max +'"><table style="width: 100%;"><tbody><tr><td><img src="'+ image_base +'throbber.gif" alt=""></td><td>' + texts.gui.loadingInfos + '</td></tr></tbody></table></td></tr>' +
		'</tbody>';
		
		if (Settings.get('place_farmlistOpt') == 1) {		// PopUp
			HTML += '</table>';
			$('#farmlist').remove();
			lib.inlinePopup('farmlist', pos.x, pos.y, HTML, true, pos.width, pos.height);
		} else if (Settings.get('place_farmlistOpt') == 2) {	// integriert
			if (!$('#dsfa_farmlistFrame').length) {
				$('#dsfa_farmlistLink').parents('th').eq(0).attr('colspan', max);
				$('#dsfa_farmlistLink').parents('table').eq(0).append(HTML);
			}
		}
		$('#dsfa_farmTable tr').eq(0).find('.sortCol').each(function() {
			this.addEventListener('click', Farmlist.sortCol, false);
		});
		// Dorf-Zeilen einfügen
		setTimeout(Farmlist.appendRows, 50);
	},
	appendRows: function() {
		// Spalten füllen
		var IDs = Village.list(),
		hideAttackedFarms = (Settings.get('place_attackedFarms') == 3),
		markAttacks = (Settings.get('place_attackedFarms') == 1 || Settings.get('place_attackedFarms') == 2),
		moveAttacks = (Settings.get('place_attackedFarms') == 2),
		min_res = Settings.get('place_minRes'),
		max_age = Settings.get('place_maxAge'),
		max_dist = Settings.get('place_maxDistance');
		
		Farmlist.normalList = [];
		Farmlist.attackList = [];
		for (var i = 0, max = IDs.length; i < max; i++) {
			if (!Village.existSpy(IDs[i]))
				continue;
			
			var ID = IDs[i];
			if (max_age[0] && Village.getLastTimeDiff(ID) > max_age[1] * 3600)
				continue;
			
			var attack = Command.getAttacks(ID).length;
			if (attack && hideAttackedFarms)
				continue;
			
			var coordDiff = lib.getCoordsDiff(hCoords, [Village.getCoords(ID, 'x'), Village.getCoords(ID, 'y')]);
			if (max_dist[0] && coordDiff > max_dist[1])
				continue;
			
			var coordDiff2 = Math.round(coordDiff * 100) / 100,
			res = Village.getRes(ID);
			if (min_res[0] && res.sum < min_res[1])
				continue;
			
			var resProd = Village.getResProd(ID),
			resWarn = Village.getResWarn(ID),
			resWarn90 = Village.getResWarn(ID, null, null, 0.9),
			eq = Village.get(ID, 'eq'),
			wallLevel = Village.getBuilding(ID, 'wall'),
			attrs = '"';
			if (wallLevel == 0)
				attrs = '" class="grey"';
			else if (wallLevel > 4)
				attrs = ' font-weight: bold;" class="'+ (wallLevel > 9 ? 'warn' : 'warn_90') +'"';
			var age = Village.getLastTimeDiff(ID),
			ageH = Math.floor(age / 3600),
			agem = Math.floor((age - ageH * 3600) / 60),
			ages = age - ageH * 3600 - agem * 60;
			if (agem < 10)
				agem = '0' + agem;
			if (ages < 10)
				ages = '0' + ages;
			
			var attackImg = attack && markAttacks ? '&nbsp;<img src="'+ image_base +'command/attack.png" alt="">' : '',
			HTML = '<td'+ (!Village.isBarbarian(ID) ? ' class="first-player"' : '') +'></td>' +
			'<td><a class="farm_link tooltip" title="'+ Village.get(ID, 'name') +'" href="javascript:;">'+ Village.getCoords(ID) +'</a>'+ attackImg +'</td>' +
			'<td class="wood'+ (resWarn90.wood ? (resWarn.wood ? ' warn' : ' warn_90') : '') +'" title="'+ resProd.wood +'" style="text-align: right;">'+ lib.formatNumber(res.wood, true, true) +'</td>' +
			'<td class="stone'+ (resWarn90.stone ? (resWarn.stone ? ' warn' : ' warn_90') : '') +'" title="'+ resProd.stone +'" style="text-align: right;">'+ lib.formatNumber(res.stone, true, true) +'</td>' +
			'<td class="iron'+ (resWarn90.iron ? (resWarn.iron ? ' warn' : ' warn_90') : '') +'" title="'+ resProd.iron +'" style="text-align: right;">'+ lib.formatNumber(res.iron, true, true) +'</td>' +
			'<td style="display: none;">'+ res.max +'</td>' +
			'<td class="sum'+ (resWarn90.sum ? (resWarn.sum ? ' warn' : ' warn_90') : '') +'" title="'+ resProd.sum +'" style="text-align: right;">'+ lib.formatNumber(res.sum, true, true) +'</td>' +
			'<td style="text-align: right;">'+ Math.round(eq * 100) +' <i>%</i></td>';
			
			if (Village.noUnits(ID))
				HTML += '<td style="text-align: right;"><img src="'+ image_base +'quests/completed.png" alt="" title="' + texts.gui.noUnits + '" style="width: 19px; height: 16px;"></td>';
			else
				HTML += '<td style="text-align: right;"><img src="'+ image_base +'delete.png" alt="x" title="' + texts.gui.yesUnits + '"></td>';
			
			HTML += '<td style="text-align: right;">'+ coordDiff2 +'</td>' +
			'<td style="text-align: right;'+ attrs +'>'+ wallLevel +'</td>';
			
			HTML += '<td style="text-align: right;">' +
				'<a class="spy_only tooltip" title="Nur Späher schicken';
			if (Village.getLastReportNum(ID) == 3 || Village.getLastReportNum(ID) == 4)
				HTML += '<br>Der letzte Angriff war ohne Späherfolg!" style="color: orange;';
			HTML += '" href="javascript:;">' +
					ageH +':'+ agem +':'+ ages +
				'</a>' +
			'</td>';
			HTML += '<td><a href="javascript:;" class="cancel-icon lock-icon solo tooltip" title="'+ texts.gui.lockFarm +'"></a></td>';
			HTML += '<td><a href="javascript:;" class="cancel-icon del-icon solo tooltip" title="'+ texts.gui.delete +'"></a></td>';
			
			var tr = document.createElement('tr');
			tr.className = (attack && markAttacks ? 'attack' : '');
			tr.innerHTML = HTML;
			
			// Ereignisse etc. binden
			$(tr).find('.farm_link')[0].addEventListener('click', Farmlist.clickCoords, true);
			$(tr).find('.spy_only')[0].addEventListener('click', Farmlist.clickAge, true);
			$(tr).find('.lock-icon')[0].addEventListener('click', function(e) {
				el = $(this).parents('tr').eq(0);
				this.blur();
				var match = $(this).parents('tr').eq(0).find('a').eq(0).html().match(/(\d+\|\d+)/);
				Village.setLock(Village._getID(match[1]), true);
				$(this).parents('tr').eq(0).remove();
			}, true);
			$(tr).find('.del-icon')[0].addEventListener('click', function(e) {
				if (!Settings.get('misc_enableConfirm') || confirm(texts.gui.delConfirm)) {
					el = $(this).parents('tr').eq(0);
					this.blur();
					var match = $(this).parents('tr').eq(0).find('a').eq(0).html().match(/(\d+\|\d+)/);
					Village.delData(Village._getID(match[1]));
					$(this).parents('tr').eq(0).remove();
				}
			}, true);
			
			var arr = [0, tr];
			if (Farmlist.sortKey == 'wood')
				arr[0] = res.wood;
			else if (Farmlist.sortKey == 'stone')
				arr[0] = res.stone;
			else if (Farmlist.sortKey == 'iron')
				arr[0] = res.iron;
			else if (Farmlist.sortKey == 'sum')
				arr[0] = res.sum;
			else if (Farmlist.sortKey == 'eq')
				arr[0] = eq;
			else if (Farmlist.sortKey == 'distance')
				arr[0] = coordDiff;
			else if (Farmlist.sortKey == 'wall')
				arr[0] = wallLevel;
			else if (Farmlist.sortKey == 'age')
				arr[0] = age;
			arr[0] = arr[0] * Farmlist.sortDir + parseInt(Village.getCoords(ID).remove('|')) / 1000000000;
			
			if (attack && moveAttacks)
				Farmlist.attackList.push(arr);
			else
				Farmlist.normalList.push(arr);
		}
		
		var fragment = document.createDocumentFragment();
		Farmlist.normalList.sort(function(a,b) {
			return a[0] - b[0];
		});
		for (var i = 0, max = Farmlist.normalList.length; i < max; i++)
			fragment.appendChild(Farmlist.normalList[i][1]);
		Farmlist.attackList.sort(function(a,b) {
			return a[0] - b[0];
		});
		for (var i = 0, max = Farmlist.attackList.length; i < max; i++)
			fragment.appendChild(Farmlist.attackList[i][1]);
		
		$('#dsfa_farmTable').append(fragment).find('tr').eq(1).remove();	// Einfügen und die Ladezeile entfernen
		// Die Anzahl der Dörfer ergänzen
		$('#dsfa_coords_count').html( Farmlist.normalList.length + Farmlist.attackList.length );
		
		window.setTimeout(function() {
			UI.ToolTip($('.tooltip'), {});
		}, 800);
		
		Storage.colorize = Settings.get('general_enableStorageColorAt[place]');
		window.setTimeout(function() {
			Storage.colorRes();
		}, 50);
	},
	click: function(i) {
		if (Settings.get('place_farmlistOpt') == 0 || game_data.screen != 'place' || !$('#units_form').length)
			return;
		
		if ($('#dsfa_farmTable tr').eq(i).find('a').eq(0).length)	// es kann sein, dass die Liste zugeklappt ist...
			$('#dsfa_farmTable tr').eq(i).find('a')[0].click();
	}
};


/*
 * PA_Features
 */
PA_Features = {
	fa_button: lib.storage.getValue(game_data.village.id +'_am_farm_button', ''),
	fa_hide_attacks: lib.storage.getValue('dsfa_am_farm_hide_attacks', false),
	call_units: lib.storage.getValue('call_units', {}),
	call_res: lib.storage.getValue('call_res', {}),
	quickbar_items: lib.storage.getValue('quickbar_items', [
		{
			name: texts.buildings.main,
			title: '',
			img: '{graphic}/buildings/main.png',
			link: '{game}&screen=main',
			newTab: false
		},
		{
			name: 'Rekrutieren',
			title: '',
			img: '{graphic}/buildings/barracks.png',
			link: '{game}&screen=train',
			newTab: false
		},
		{
			name: texts.buildings.snob,
			title: '',
			img: '{graphic}/buildings/snob.png',
			link: '{game}&screen=snob',
			newTab: false
		},
		{
			name: texts.buildings.smith,
			title: '',
			img: '{graphic}/buildings/smith.png',
			link: '{game}&screen=smith',
			newTab: false
		},
		{
			name: texts.buildings.place,
			title: '',
			img: '{graphic}/buildings/place.png',
			link: '{game}&screen=place',
			newTab: false
		},
		{
			name: texts.buildings.market,
			title: '',
			img: '{graphic}/buildings/market.png',
			link: '{game}&screen=market',
			newTab: false
		}
	]),
	init: function() {
		// Schnellleiste
		if (!lib.hasPA && Settings.get('paFeatures_freePA')) {
			var el = $('#header_info').prevAll('hr:first'),
				HTML = '<table id="quickbar_outer" style="text-align: center; width: 100%; cell-spacing: 0;"><tr><td><table id="quickbar_inner" style="border-collapse: collapse;" width="100%">' +
					'<tr class="topborder"><td class="left"> </td><td class="main"> </td><td class="right"> </td></tr>' +
					'<tr><td class="left"> </td><td class="main"><ul class="menu quickbar">',
				target, title, link, img;
			for (var i = 0, item; item = PA_Features.quickbar_items[i]; i++) {
				target = item.newTab ? ' target="_blank" ' : '';
				title = item.title ? ' title="'+ item.title +'"' : '';
				link = item.link.replace('{game}', game_data.link_base_pure.remove('screen='));
				img = item.img.replace('{graphic}', image_base);
				HTML += '<li><span><a'+ target + title +' href="'+ link +'"><img src="'+ img +'" alt="'+ item.name +'">'+ item.name +'</a></span></li>';
			}
			HTML += '</ul></td><td class="right"> </td></tr>' +
				'<tr class="bottomborder"><td class="left"> </td><td class="main"> </td><td class="right"> </td></tr>' +
				'<tr><td class="shadow" colspan="3"><div class="leftshadow"> </div><div class="rightshadow"> </div></td></tr>' +
			'</table></td></tr></table>';
			$(HTML).insertBefore( $('#header_info').prevAll('hr:first') );
		}
		
		if (game_data.screen == 'am_farm' && Settings.get('paFeatures_farmAssistent') && $('#am_widget_Farm').length) {
			this.fa_initGUI();
			$('#am_widget_Farm')[0].addEventListener('DOMNodeInserted', function(e) {
				if (e.originalTarget.id != 'dsfa_row' &&
					 !$(e.originalTarget).parents('#dsfa_row').length &&
					 !$(e.relatedNode).is('td') &&
					 !$(e.relatedNode).is('tr'))	// Endlosrekursion verhindern
					PA_Features.fa_initGUI();
			}, false);
		} else if (game_data.screen == 'place' && game_data.mode == 'call') {
			var HTML = '<tr>';
			$('#support_sum tr').eq(0).find('img').each(function() {
				var unit = $(this).attr('src').match(/unit_(.+)\.png/)[1];
				HTML += '<td><input type="text" id="dsfa_'+ unit +'" size="5" value="'+ (PA_Features.call_units[unit] ? PA_Features.call_units[unit] : 0) +'"></td>';
			});
			HTML += '</tr>';
			$('#support_sum').append(HTML)
			.find('input').each(function() {
				this.addEventListener('keyup', function() {
					var unit = this.id.match(/dsfa_(.+)/)[1];
					PA_Features.call_units[unit] = this.value;
					lib.storage.setValue('call_units', PA_Features.call_units);
				}, false);
			});
			$('<div style="text-align: right;"><input type="button" value="Einfügen"></div>').insertAfter('#support_sum')
			.find('input')[0].addEventListener('click', this.call_clickInsert, true);
		} else if (game_data.screen == 'market' && game_data.mode == 'call') {
			var HTML = '<tr>';
			$('#res_sum td').each(function() {
				var res = $(this).attr('id').remove(/total_/);
				HTML += '<td><input type="text" id="dsfa_call_'+ res +'" size="5" value="'+ (PA_Features.call_res[res] ? PA_Features.call_res[res] : 0) +'"></td>';
			});
			HTML += '</tr>';
			$('#res_sum').append(HTML)
			.find('input').each(function() {
				this.addEventListener('keyup', function() {
					var res = this.id.remove(/dsfa_call_/);
					PA_Features.call_res[res] = this.value;
					lib.storage.setValue('call_res', PA_Features.call_res);
				}, false);
			});
			$('#res_sum tr').eq(1).parent().append(
				'<tr><td style="text-align: right;" colspan="3">' +
					'<input type="button" value="Einfügen">' +
				'</td></tr>'
			).find('input').last()[0].addEventListener('click', this.call_res_clickInsert, true);
		}
	},
	fa_initGUI: function() {
		if (!$('#stone_header').length) {
			$('<th id="stone_header" style="text-align: center;"></th><th id="iron_header" style="text-align: center;"></th>').insertAfter($('#am_widget_Farm table th').eq(5));
			var img = $('#am_widget_Farm table th').eq(5).attr('id', 'wood_header').css('text-align', 'center').find('img').attr('src', image_base +'holz.png');
			$('#stone_header').append(img.clone()).find('img').attr('src', image_base +'lehm.png');
			$('#iron_header').append(img.clone()).find('img').attr('src', image_base +'eisen.png');
			$('#am_widget_Farm table tr').each(function() {
				if ($(this).find('td').length > 1) {
					var res = $(this).find('.res, .warn, .warn_90'),
					td = $(res[0]).parent();
					if (!res.length) {
						res = [$('<t>?</t>')[0], $('<t>?</t>')[0], $('<t>?</t>')[0]];
						td = $(this).find('td').eq(5);
					}
					$('<td style="text-align: right;" class="'+ $(res[1]).attr('class') +'">'+ $(res[1]).html() +'</td><td style="text-align: right;" class="'+ $(res[2]).attr('class') +'">'+ $(res[2]).html() +'</td>').insertAfter(td);
					
					td.html( $(res[0]).html() ).attr('class', $(res[0]).attr('class'));
					td.css('text-align', 'right');
				} else
					$(this).find('td').attr('colspan', parseInt($(this).find('td').attr('colspan')) + 2);
			});
		}
		
		if (!$('#dsfa_hide_attacks').length) {
			HTML = '<input type="checkbox" id="dsfa_hide_attacks"'+ (PA_Features.fa_hide_attacks ? ' checked' : '') +'> <label for="dsfa_hide_attacks">Zeige nur Dörfer, die noch nicht angegriffen werden.</label> ' +
			'<div style="float: right;"><select>';
			if ($('.tooltip.farm_icon_a').length > 0)
				HTML += '<option value="a"'+ (PA_Features.fa_button == 'a' ? ' selected' : '') +'>A</option>';
			if ($('.tooltip.farm_icon_b').length > 0)
				HTML += '<option value="b"'+ (PA_Features.fa_button == 'b' ? ' selected' : '') +'>B</option>';
			if ($('.tooltip.farm_icon_c').length > 0)
				HTML += '<option value="c"'+ (PA_Features.fa_button == 'c' ? ' selected' : '') +'>C</option>';
			HTML += '</select><input id="dsfa_am_farm_click" type="button" value="Klicken"></div>';
			$('#am_widget_Farm table').eq(0).find('tr').eq(0).clone().attr('id', 'dsfa_row').insertAfter($('#am_widget_Farm table').find('tr').eq(0)).find('td').eq(0).html( HTML );
			$('#dsfa_hide_attacks')[0].addEventListener('change', PA_Features.fa_hideAttacks, true);
			
			$('#dsfa_am_farm_click').prev()[0].addEventListener('change', function() {
				PA_Features.fa_button = $(this).val();
				lib.storage.setValue(game_data.village.id +'_am_farm_button', PA_Features.fa_button);
			}, false);
			$('#dsfa_am_farm_click')[0].addEventListener('click', function() {
				PA_Features.fa_button = $(this).prev().val();
				lib.storage.setValue(game_data.village.id +'_am_farm_button', PA_Features.fa_button);
				PA_Features.fa_clickButton();
			}, true);
			
			PA_Features.fa_hideAttacks();
			PA_Features.fa_colorAttackedRows();
		}
		if (Settings.get('paFeatures_farmAssistent_minRes')[0]) {
			var minRes = Settings.get('paFeatures_farmAssistent_minRes')[1];
			$('.row_a, .row_b').each(function() {
				var resSum = parseInt($(this).find('td').eq(5).html().remove(/<span class="grey">\.<\/span>/)) +
					parseInt($(this).find('td').eq(6).html().remove(/<span class="grey">\.<\/span>/)) +
					parseInt($(this).find('td').eq(7).html().remove(/<span class="grey">\.<\/span>/));
				if (resSum < minRes)
					$(this).hide();
			});
		}
	},
	fa_colorAttackedRows: function() {
		$('.row_a, .row_b').each(function() {
			if ($(this).find('td').eq(3).length && /command\/attack\.png/.test($(this).find('td').eq(3).html()))
				$(this).find('td').css('background-color', '#F0727E');
		});
	},
	fa_hideAttacks: function() {
		PA_Features.fa_hide_attacks = $('#dsfa_hide_attacks').is(':checked');
		lib.storage.setValue('dsfa_am_farm_hide_attacks', PA_Features.fa_hide_attacks);
		if (PA_Features.fa_hide_attacks) {
			$('.row_a, .row_b').each(function() {
				if ($(this).find('td').eq(3).length && /command\/attack\.png/.test($(this).find('td').eq(3).html()))
					$(this).hide();
			});
		} else {
			$('.row_a, .row_b').each(function() {
				if (!$(this).hasClass('inactive'))
					$(this).show();
			});
		}
	},
	fa_clickButton: function() {
		var clicked = false;
		$('.tooltip.farm_icon_'+ PA_Features.fa_button +':visible').each(function() {
			if (clicked || $(this).hasClass('farm_icon_disabled') || /command\/attack\.png/.test($(this).parents('tr').eq(0).find('td').eq(3).html()))
				return;
			this.click();
			$(this).addClass('farm_icon_disabled');
			clicked = true;
		});
		if (clicked && !$('.autoHideBox.error').length) {
			var max = 700;
			if (Math.floor(Math.random()*50) == 0)
				max += Math.floor(Math.random()*1000);
			setRandom(PA_Features.fa_clickButton, 300, max);
		}
	},
	call_clickInsert: function() {
		$('#village_troup_list tr').slice(1).each(function() {
			if ($(this).find('input').length > 1)
				for (var key in lib.unitInfo)
					$(this).find('input[name='+ key +']').val( $('#dsfa_'+ key).val() );
		});
	},
	call_res_clickInsert: function() {
		$('#village_list tr').slice(1).each(function() {
			if ($(this).find('input').length > 1)
				$(this).find('input').slice(0, 2).each(function() {
					var res = $(this).attr('name');
					$(this).val( $('#dsfa_call_'+ res).val() );
				});
		});
	}
};


/*
 * Overview
 */
Overview = {
	VillageOverview: null,
	data: {
		Res: lib.storage.getValue(pID +'-ResBooty', {}),
		booty: {
			res: lib.storage.getValue(pID +'-ResBooty', {}),
			show: lib.storage.getValue('booty_show', true),
			position: lib.storage.getValue('booty_position', [0, 0, 'rightcolumn'])
		}
	},
	_std: {
		
	},
	save: function() {
		lib.storage.setValue(pID +"-ResBooty", this.data.Res);
		lib.storage.getValue("booty_show", this.data.booty.show);
		lib.storage.getValue("booty_position", this.data.booty.position);
		return true;
	},
	saveRes: function() {
		lib.storage.setValue(pID +"-ResBooty", this.data.Res);
		return true;
	},
	saveHideBooy: function() {
		lib.storage.setValue("booty_show", this.data.booty.show);
		return true;
	},
	savePosition: function() {
		lib.storage.setValue("booty_position", this.data.booty.position);
		return true;
	},
	init: function() {
		if (game_data.screen == 'overview_villages') {
			if ($('#production_table').length && Settings.get('misc_cutProd')) {
				var buildIdx = false,
				researchIdx = false;
				$('#production_table tr').eq(0).find('th').each(function(i) {
					if (buildIdx === false && texts.regex.build_contract.test($(this).html())) {
						buildIdx = i;
						$(this).remove();
					} else if (researchIdx === false && texts.regex.research.test($(this).html())) {
						researchIdx = i;
						$(this).remove();
					}
				});
				if (buildIdx !== false && researchIdx !== false) {
					if (buildIdx < researchIdx)
						researchIdx--;
					else if (buildIdx > researchIdx)
						buildIdx--;
				}
				if (buildIdx !== false || researchIdx !== false) {
					$('#production_table tr').slice(1).each(function() {
						if (buildIdx !== false)
							$(this).find('td').eq(buildIdx).remove();
						if (researchIdx !== false)
							$(this).find('td').eq(researchIdx).remove();
					});
				}
			} else if ($('#commands_table').length) {
				var commands = {
					attack: {},
					support: {}
				},
				idx = {};
				$('#commands_table tr').each(function() {
					if ($(this).find('th').length > 1) {
						$(this).find('th').each(function(i) {
							if (!$(this).find('img').length || !$(this).find('img').attr('src'))
								return;
							var match = $(this).find('img').attr('src').match(/unit\/unit_(.+)\.png/);
							if (!match)
								return;
							idx[i] = match[1];
						});
					} else if ($(this).find('td').length > 2 && $(this).find('img').eq(0).length) {
						var match = $(this).find('img').eq(0).attr('src').match(/command\/(.+)\.png/);
						if (!match)
							return;
						var type = match[1];
						if (type == 'attack' || type == 'support') {
							var text = $(this).find('a').eq(0).find('> span').html(),
							match = text.match(texts.regex.commands[type]);
							if (!match)
								return;
							
							var ID = match[2] + match[3];
							if (commands[type].hasOwnProperty(ID)) {
								var units = commands[type][ID].units,
								count = commands[type][ID].count;
								$(this).find('td').each(function(i) {
									if (idx[i])
										units[idx[i]] += parseInt($(this).html());
								});
							} else {
								var units = {},
								count = 0;
								$(this).find('td').each(function(i) {
									if (idx[i])
										units[idx[i]] = parseInt($(this).html());
								});
							}
							commands[type][ID] = {
								text: text,
								count: ++count,
								units: units
							};
						}
					}
				});
				
				HTML ='<table class="vis"><tbody>' +
				'<tr><th>&#10005;</th><th>Befehl</th>';
				for (var i in idx) {
					HTML += '<th style="text-align: center;"><img src="'+ image_base +'unit/unit_'+ idx[i] +'.png" title="'+ texts.unit[idx[i]] +'"></th>';
				}
				HTML += '</tr>';
				for (var type in commands) {
					for (var ID in commands[type]) {
						HTML += '<tr><td style="font-weight: bold;">'+ commands[type][ID].count +'</td><td><img src="'+ image_base +'command/'+ type +'.png" alt="">&nbsp;<a href="#">'+ commands[type][ID].text +'</a></td>';
						for (var unit in commands[type][ID].units)
							HTML += '<td class="unit-item '+ (!commands[type][ID].units[unit] ? 'hidden' : '') +'">'+ commands[type][ID].units[unit] +'</td>';
						HTML += '</tr>';
					}
				}
				HTML += '</tbody></table>';
				$(HTML).insertBefore('#commands_table');
			}
		} else if (game_data.screen == 'overview') {
			if (win.hasOwnProperty('VillageOverview') && Settings.get('misc_overview_showBooty')) {
				this.VillageOverview = $.extend(
					{
						position: null,
					},
					win.VillageOverview,
					{
						init: function () {
							if (win.mobile || !$('#overviewtable').length)
								return;
							
							$( $('#overviewtable')[0].cloneNode(false) ).attr('id', 'dsfa_overviewtable').insertAfter('#overviewtable');
							$('#dsfa_overviewtable').append( $('#overviewtable').children() );
							$('#overviewtable').remove();
							$('#dsfa_overviewtable').sortable({
								placeholder: "vis placeholder",
								cursor: 'move',
								items: "div.moveable",
								handle: 'h4',
								opacity: 0.6,
								start: function () {
									$('.hidden_widget').fadeTo(0, 0.5)
								},
								stop: function () {
									$('.hidden_widget').hide()
								},
								update: function () {
									var columns = {
										leftcolumn: [],
										rightcolumn: []
									},
									widgets = $(this).sortable("toArray");
									for (var i in widgets)
										if (widgets.hasOwnProperty(i)) {
											var parent = document.getElementById(widgets[i]).parentNode.id;
											columns[parent].push(widgets[i])
										};
									
									for (var key in columns)
										for (var i = 0, max = columns[key].length; i < max; i++) {
											if (columns[key][i] == 'show_booty') {
												if (i != 0)
													var position = [columns[key][i-1], 0, key];
												else if (max != 1)
													var position = [0, columns[key][i+1], key];
												else
													var position = [0, 0, key];
												columns[key].splice(i, 1);
											}
										}
									Overview.data.booty.position = position;
									window.setTimeout(function() { Overview.savePosition() }, 0);
									
									$.post(Overview.VillageOverview.urls.reorder, columns)
								}
							})
						}
					}
				);
				this.VillageOverview.init();
				
				var today = Math.floor(lib.getTime() / (60 * 60 * 24)),
				yesterday = today - 1,
				change = false;
				if (!this.data.Res[today]) {
					this.data.Res[today] = {
						wood: 0,
						stone: 0,
						iron: 0
					};
					change = true;
				} else if (!this.data.Res[today].wood) {
					this.data.Res[today].wood = 0;
					change = true;
				} else if (!this.data.Res[today].stone) {
					this.data.Res[today].stone = 0;
					change = true;
				} else if (!this.data.Res[today].iron) {
					this.data.Res[today].iron = 0;
					change = true;
				}
				if (!this.data.Res[yesterday]) {
					this.data.Res[yesterday] = {
						wood: 0,
						stone: 0,
						iron: 0
					};
					change = true;
				} else if (!this.data.Res[yesterday].wood) {
					this.data.Res[yesterday].wood = 0;
					change = true;
				} else if (!this.data.Res[yesterday].stone) {
					this.data.Res[yesterday].stone = 0;
					change = true;
				} else if (!this.data.Res[yesterday].iron) {
					this.data.Res[yesterday].iron = 0;
					change = true;
				}
				
				if (change) {
					this.saveRes();
				}
				
				var HTML = '<div id="show_booty" class="vis moveable widget" style="opacity: 1; z-index: 0;">' +
					'<h4><a href="javascript:;">'+ texts.gui.booty +'</a><img src="'+ (this.data.booty.show ? 'graphic/minus.png' : 'graphic/plus.png') +'" style="float: right; cursor: pointer;"></h4>' +
					'<div style="display:'+ (this.data.booty.show ? 'block' : 'none') +';">' +
						'<table width="100%">' +
							'<tr class="nowrap"><td colspan="2"><strong>'+ texts.gui.todayBooty +':</strong></td></tr>' +
							'<tr class="nowrap"><td width="70"><span class="icon header wood"> </span> '+ texts.resources.wood +'</td><td><strong>'+ lib.formatNumber(this.data.Res[today].wood, true, true) +'</strong></td></tr>' +
							'<tr class="nowrap"><td width="70"><span class="icon header stone"> </span> '+ texts.resources.stone +'</td><td><strong>'+ lib.formatNumber(this.data.Res[today].stone, true, true) +'</strong></td></tr>' +
							'<tr class="nowrap"><td width="70"><span class="icon header iron"> </span> '+ texts.resources.iron +'</td><td><strong>'+ lib.formatNumber(this.data.Res[today].iron, true, true) +'</strong></td></tr>' +
							'<tr class="nowrap"><td width="70"><span class="icon header ressources"> </span> '+ texts.resources.sum +'</td><td><strong>'+ lib.formatNumber(this.data.Res[today].wood + this.data.Res[today].stone + this.data.Res[today].iron, true, true) +'</strong></td></tr>' +
							'<tr class="nowrap"><td colspan="2"><strong>'+ texts.gui.yesterdayBooty +':</strong></td></tr>' +
							'<tr class="nowrap"><td width="70"><span class="icon header wood"> </span> '+ texts.resources.wood +'</td><td><strong>'+ lib.formatNumber(this.data.Res[yesterday].wood, true, true) +'</strong></td></tr>' +
							'<tr class="nowrap"><td width="70"><span class="icon header stone"> </span> '+ texts.resources.stone +'</td><td><strong>'+ lib.formatNumber(this.data.Res[yesterday].stone, true, true) +'</strong></td></tr>' +
							'<tr class="nowrap"><td width="70"><span class="icon header iron"> </span> '+ texts.resources.iron +'</td><td><strong>'+ lib.formatNumber(this.data.Res[yesterday].iron, true, true) +'</strong></td></tr>' +
							'<tr class="nowrap"><td width="70"><span class="icon header ressources"> </span> '+ texts.resources.sum +'</td><td><strong>'+ lib.formatNumber(this.data.Res[yesterday].wood + this.data.Res[yesterday].stone + this.data.Res[yesterday].iron, true, true) +'</strong></td></tr>' +
						'</table>' +
					'</div>' +
				'</div>';
				
				if (this.data.booty.position[0])
					$(HTML).insertAfter('#'+ this.data.booty.position[0]);
				else if (this.data.booty.position[1])
					$(HTML).insertBefore('#'+ this.data.booty.position[1]);
				else	// für den Fall, dass entweder kein anderes Fenster in der Spalte ist, oder ein Fenster nicht mehr vorhanden ist (z.B. show_secret)
					$('#'+ this.data.booty.position[2]).append(HTML);
				if (!$('#show_booty').length) {
					this.data.booty.position = [0, 0, 'rightcolumn'];
					this.savePosition();
					$('#rightcolumn').append(HTML);
				}
				
				if (!$('#show_booty a').eq(0).length)
					return;
				
				$('#show_booty a')[0].addEventListener('click', function(e) {
					var HTML = '<div style="min-width: 350px; max-height: '+ Math.floor( window.innerHeight * 0.6 ) +'px; overflow: auto;"><table class="vis"><tr>' +
					'<th>Datum</th>' +
					'<th style="text-align: center;"><span class="icon header wood"></th>' +
					'<th style="text-align: center;"><span class="icon header stone"></th>' +
					'<th style="text-align: center;"><span class="icon header iron"></th>' +
					'<th style="text-align: center;"><span class="icon header ressources"></th>' +
					'</tr>',
					list = [],
					tmpHTML,
					sum = [0, 0, 0, 0];
					for (var key in Overview.data.Res) {
						if (key == 0)
							continue;
						
						var date = new Date(key * 60 * 60 * 24 * 1000),
						day = date.getDate(),
						month = date.getMonth() + 1,
						year = date.getFullYear();
						if (day < 10)
							day = '0'+ day;
						if (month < 10)
							month = '0'+ month;
						
						var tmpWood = Overview.data.Res[key].wood,
						tmpStone = Overview.data.Res[key].stone,
						tmpIron = Overview.data.Res[key].iron,
						tmpSum = Overview.data.Res[key].wood + Overview.data.Res[key].stone + Overview.data.Res[key].iron;
						if (!tmpSum) {
							list.push([key, 0]);
							continue;
						}
						tmpHTML = '<td><i>'+ day +'.'+ month +'.'+ year +'</i></td>' +
						'<td style="text-align: right;" title="'+ lib.formatNumber(tmpWood, true) +'">'+ lib.formatNumber(tmpWood, true, true, 1) +'</td>' +
						'<td style="text-align: right;" title="'+ lib.formatNumber(tmpStone, true) +'">'+ lib.formatNumber(tmpStone, true, true, 1) +'</td>' +
						'<td style="text-align: right;" title="'+ lib.formatNumber(tmpIron, true) +'">'+ lib.formatNumber(tmpIron, true, true, 1) +'</td>' +
						'<td style="text-align: right;" title="'+ lib.formatNumber(tmpSum, true) +'">'+ lib.formatNumber(tmpSum, true, true, 1) +'</td>';
						sum[0] += tmpWood;
						sum[1] += tmpStone;
						sum[2] += tmpIron;
						sum[3] += tmpSum;
						list.push([key, tmpHTML]);
					}
					list.sort(function(a, b) {
						return b[0] - a[0];
					});
					var lastEmpty = false,
					a = 0;
					for (var i = 0, max = list.length; i < max; i++) {
						if (i > 0 && list[i][0] != list[i-1][0]-1 && !lastEmpty) {
							HTML += '<tr class="row_'+ (a % 2 ? 'a' : 'b') +'"><td colspan="5"></td></tr>';
							lastEmpty = true;
							a++;
						}
						if (i > 0 && !list[i][1] && !lastEmpty || list[i][1]) {
							HTML += '<tr class="row_'+ (a % 2 ? 'a' : 'b') +'">'+ (list[i][1] ? list[i][1] : '<td colspan="5"></td>') +'</tr>';
							lastEmpty = list[i][1] == 0;
							a++;
						}
					}
					
					HTML += '<tr><td colspan="5" style="background-color: grey; height: 1px; padding: 0;"></td></tr>' +
					'<tr class="row_'+ (a % 2 ? 'a' : 'b') +'">' +
					'<td style="text-align: right;"><b>'+ texts.resources.sum +':</b></td>' +
					'<td style="text-align: right;" title="'+ lib.formatNumber(sum[0], true) +'"><b>'+ lib.formatNumber(sum[0], true, true, 2) +'</b></td>' +
					'<td style="text-align: right;" title="'+ lib.formatNumber(sum[1], true) +'"><b>'+ lib.formatNumber(sum[1], true, true, 2) +'</b></td>' +
					'<td style="text-align: right;" title="'+ lib.formatNumber(sum[2], true) +'"><b>'+ lib.formatNumber(sum[2], true, true, 2) +'</b></td>' +
					'<td style="text-align: right;" title="'+ lib.formatNumber(sum[3], true) +'"><b>'+ lib.formatNumber(sum[3], true, true, 2) +'</b></td>' +
					'</tr>';
					HTML += '</table></div>';
					
					new lib.Popup('booty', texts.gui.booty, true, null, null, HTML);
				}, false);
				$('#show_booty img').last()[0].addEventListener('click', function() {
					element = $('#show_booty > div').last();
					element.toggle();
					this.src = element.is(':hidden') ? 'graphic/plus.png' : 'graphic/minus.png';
					Overview.data.booty.show = !element.is(':hidden');
					Overview.saveHideBooy();
					return false;
				}, false);
			}
		}
	},
};


/*
 * Map
 */
Map = {
	// 15x15
	stopImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAAAA7wsK9wMG9wQD9gUE9wQF9wQH9AYE9QYF9QYJ8ggG9gsM9wwO9g4P+wEC+QMA+gIB+gIC+QID+gIE+AMF+AQC+AQD+AYF/QAA/QAB/QAC/AIB+AgJ+AsN8xAP8xER9BAQ9BMS9BIT9RQV9RYV8hoa9RsZ9hob9hse9h8i8iAd9CAi8S4s71BQ81RS8F9e7GFe62Nh6mNj62Nl62dk62Zl7GFg7WBh7GNg7WJi7mRg7WVh7WZg7mRm7m9w7W9x7W9y63J07HNy7Hd17Hd373h38GNh8GVk82hm8XVz8XZ38Xx79Ht754aG6YWH6YaF6IqK6oyI7IuK7YyL8oOF8oaG8ouJ85GT8pWX9JmW9JqW9Z+d85+g9aei96io9Kqt9K2t9a6u86+w8rGu9LKv9rSv8rOx8bK29LKx9LSz9bq39bq7+Li598zM9dTT99zaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH1mncAAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjQ+jcx2AAAAzElEQVQYV2P4DwS+BuZmZmZ+ICYDEDsKCUhKSUkJ2UP4TqJSUpJAICHiAOI7igqAeEC+hJDdfwZ/dnVxBWUlMU1uIV45Fn8GS8+McI98b/2kFM7c+FBTBotIXS2hHKFYxSjtZMZMEwYjlQgfID+RI0wnL93WhsFQjyubI0s0Tj5aNU1Y2prBOCQxhi2VyS0pnitBWNKKIYBDTVyQR1BIQ0ZaVlA4iOG/Mys/xH5JSSFXkPtcmMHOleIT9oK4H6oCKAvh/w+0dQeCYBATAHESSVaqgfK6AAAAAElFTkSuQmCC",
	infos: Settings.get('map_integrateInfos'),
	_data: lib.storage.getValue('map_data', {}),
	_change: false,
	vills: win && win.TWMap && win.TWMap.villages,
	ids_coords: {},
	ownOvl: 'none',
	otherOvl: 'points',
	mapSize: 9,
	map_sizes: [4,5,7,9,11,13,15,20,30],
	minimapSize: 50,
	minimap_sizes: [20,30,40,50,60,70,80,90,100,110,120],
	popup_options: {
		options_open: false,
		attack: false,
		moral: false,
		res: false,
		pop: false,
		trader: false,
		reservation: false,
		units: false,
		units_home: false,
		units_times: true,
		notes: false
	},
	save: function(change) {
		if (this._change || change === true) {
			this._data = {
				ownOvl: this.ownOvl,
				otherOvl: this.otherOvl,
				mapSize: this.mapSize,
				minimapSize: this.minimapSize,
				popup_options: this.popup_options
			};
			lib.storage.setValue('map_data', this._data);
			this._change = false;
			return true;
		}
		return false;
	},
	init: function() {
		if (this._data.hasOwnProperty('ownOvl'))
			this.ownOvl = this._data.ownOvl;
		if (this._data.hasOwnProperty('otherOvl'))
			this.otherOvl = this._data.otherOvl;
		if (this._data.hasOwnProperty('mapSize'))
			this.mapSize = this._data.mapSize;
		if (this._data.hasOwnProperty('minimapSize'))
			this.minimapSize = this._data.minimapSize;
		if (this._data.hasOwnProperty('popup_options'))
			this.popup_options = this._data.popup_options;
		
		if (game_data.screen != 'map')
			return;
		if ($('#map').length)
			$('#map')[0].addEventListener('DOMNodeInserted', function(e) {
				if (e.target.id && e.target.id == 'map_container')
					$('#map_container')[0].addEventListener('DOMNodeInserted', Map.updateMap, false);
			}, false);
		
		if (this.infos || !lib.hasPA && Settings.get('paFeatures_freePA')) {
			if (this.infos && $('#tpl_popup').length) {
				var HTML = $('#tpl_popup').html()
				.replace(/<% } \/\* end owner \*\/ %>/, '<% } /* end owner */ %>' +
				'<% if (dsfa.mood < 100) { %>' +
					'<tr id="dsfa_mood">' +
						'<td>'+ texts.gui.mood +':</td>' +
						'<td><%= dsfa.mood %></td>' +
					'</tr>' +
				'<% } /* end mood */ %>')
				.replace(/%>\s*<\/table>\s*$/, '%>' +
				'<% if (dsfa.infos) { %>' +
					'<tr id="dsfa_contingentRes">' +
						'<td class="nowrap">'+ texts.gui.contingentRes +':</td>' +
						'<td style="padding: 0;">' +
							'<table class="overview_table" style="border-spacing: 6px 0;"><tr>' +
								'<td style="padding: 2px 3px;" class="wood"><span class="<%= dsfa.resClass.wood %> wood"><%= dsfa.res.wood %></span></td>' +
								'<td style="padding: 2px 3px;" class="stone"><span class="<%= dsfa.resClass.stone %> stone"><%= dsfa.res.stone %></span></td>' +
								'<td style="padding: 2px 3px;" class="iron"><span class="<%= dsfa.resClass.iron %> iron"><%= dsfa.res.iron %></span></td>' +
								'<td style="padding: 2px 3px;"><span style="padding: 0 10px 0 0;">/</span><span style="background: transparent url('+ image_base +'res.png?) no-repeat;" class="res" title="'+ texts.gui.effectiveStorage +'"><%= dsfa.res.max %></span></td>' +
							'</tr></table>' +
						'</td>' +
					'</tr>' +
					'<tr id="dsfa_buildings">' +
						'<td class="nowrap">'+ texts.gui.buildings +':<br><span style="font-size: 80%; font-style: italic;"><%= dsfa.spyDate %></span></td>' +
						'<td>' +
							'<table id="buildings">' +
								'<tr><%= dsfa.buildings[0] %></tr>' +
								'<tr><%= dsfa.buildings[1] %></tr>' +
								'<tr><%= dsfa.buildings[2] %></tr>' +
							'</table>' +
						'</td>' +
					'</tr>' +
					'<tr id="dsfa_units">' +
						'<td class="nowrap">'+ texts.gui.units +':<br><span style="font-size: 80%; font-style: italic;"><%= dsfa.spyDate %></span></td>' +
						'<td>' +
							'<table id="units">' +
								'<tr><%= dsfa.units[0] %></tr>' +
								'<tr><%= dsfa.units[1] %></tr>' +
							'</table>' +
						'</td>' +
					'</tr>' +
				'<% } /* end DS-Farmassistent-Infos */ %>' +
				'</table>');
				$('#tpl_popup').html( HTML );
			}
			
			if (!lib.hasPA && Settings.get('paFeatures_freePA') && $('#map_config td').last().length && $('#map_config tr').last().length) {
				$('#map_config td').last().append('<img src="'+ image_base +'icons/slide_'+ (Map.popup_options.options_open ? 'up' : 'down') +'.png" class="dsfa_popup_options_toggler" title="">');
				$('#map_config tr').last().parent().append(
					'<tr id="dsfa_popup_options" '+ (Map.popup_options.options_open ? '' : 'style="display: none;"') +'>' +
						'<td style="padding-left:8px" colspan="3">' +
						'<form id="dsfa_form_map_popup">' +
							'<table>' +
								'<tbody><tr>' +
									'<td><input type="checkbox" '+ (Map.popup_options.attack ?  'checked="checked"' : '') +' disabled="disabled" name="map_popup_attack" id="map_popup_attack"></td>' +
									'<td><label for="map_popup_attack">Letzten Angriff anzeigen</label></td>' +
								'</tr>' +
								'<tr>' +
									'<td><input type="checkbox" '+ (Map.popup_options.moral ?  'checked="checked"' : '') +' disabled="disabled" name="map_popup_moral" id="map_popup_moral"></td>' +
									'<td><label for="map_popup_moral">Moral anzeigen</label></td>' +
								'</tr>' +
								'<tr>' +
									'<td><input type="checkbox" '+ (Map.popup_options.res ?  'checked="checked"' : '') +' disabled="disabled" name="map_popup_res" id="map_popup_res"></td>' +
									'<td><label for="map_popup_res">Rohstoffe anzeigen</label></td>' +
								'</tr>' +
								'<tr>' +
									'<td><input type="checkbox" '+ (Map.popup_options.pop ?  'checked="checked"' : '') +' disabled="disabled" name="map_popup_pop" id="map_popup_pop"></td>' +
									'<td><label for="map_popup_pop">Bevölkerung anzeigen</label></td>' +
								'</tr>' +
								'<tr>' +
									'<td><input type="checkbox" '+ (Map.popup_options.trader ?  'checked="checked"' : '') +' disabled="disabled" name="map_popup_trader" id="map_popup_trader"></td>' +
									'<td><label for="map_popup_trader">Händler anzeigen</label></td>' +
								'</tr>' +
								'<tr>' +
									'<td><input type="checkbox" '+ (Map.popup_options.reservation ?  'checked="checked"' : '') +' disabled="disabled" name="map_popup_reservation" id="map_popup_reservation"></td>' +
									'<td><label for="map_popup_reservation">Reservierungen anzeigen</label></td>' +
								'</tr>' +
								'<tr>' +
									'<td><input type="checkbox" '+ (Map.popup_options.units ?  'checked="checked"' : '') +' disabled="disabled" onclick="$(\'#map_popup_units_home\').attr(\'disabled\', this.checked ? \'\' : \'disabled\').attr(\'checked\', \'\')" name="map_popup_units" id="map_popup_units"></td>' +
									'<td><label for="map_popup_units">Truppen anzeigen</label></td>' +
								'</tr>' +
								'<tr>' +
									'<td><input type="checkbox" '+ (Map.popup_options.units_home ?  'checked="checked"' : '') +' disabled="disabled" name="map_popup_units_home" id="map_popup_units_home"></td>' +
									'<td><label for="map_popup_units_home">Lokale Truppen anzeigen</label></td>' +
								'</tr>' +
								'<tr>' +
									'<td><input type="checkbox" '+ (Map.popup_options.units_times ?  'checked="checked"' : '') +' name="map_popup_units_times" id="map_popup_units_times"></td>' +
									'<td><label for="map_popup_units_times">Laufzeiten anzeigen</label></td>' +
								'</tr>' +
								'<tr>' +
									'<td><input type="checkbox" '+ (Map.popup_options.notes ?  'checked="checked"' : '') +' disabled="disabled" name="map_popup_notes" id="map_popup_notes"></td>' +
									'<td><label for="map_popup_notes">Dorf-Notizen anzeigen</label></td>' +
								'</tr>' +
							'</tbody></table>' +
						'</form>' +
						'</td>' +
					'</tr>'
				);
				$('.dsfa_popup_options_toggler')[0].addEventListener('click', function() {
					Map.popup_options.options_open = !Map.popup_options.options_open;
					
					$(this).attr('src', image_base +'icons/slide_'+ (Map.popup_options.options_open ? 'up' : 'down') +'.png');
					
					$('#dsfa_popup_options').toggle('fast');
					
					Map.save(true);
				}, false);
				$('#map_popup_units_times')[0].addEventListener('click', function() {
					Map.popup_options.units_times = $(this).is(':checked');
					Map.save(true);
				}, false);
				getHomeCoords();
			}
			
			win.TWMap.popup.displayForVillage = this.displayForVillage;
		}
		
		var HTML = '<tr><td colspan="3" style="padding:0; border:0;">' +
		'<table class="vis" style="width: 100%; margin: 0;">' +
			'<tr>' +
				'<td class="nowrap" style="width:1px">'+ 'Eigenes Dorf' +':</td>' +
				'<td><select id="dsfa_ownOvl">';
		var ownOptions = {
			none: '(nichts)',
			points: 'Punkte',
			name: 'Name',
			coords: 'Koordinaten'
		};
		for (var key in ownOptions) {
			HTML += '<option value="'+ key +'"'+ (Map.ownOvl == key ? ' selected' : '') +'>'+ ownOptions[key] +'</option>';
		}
		HTML += '</select></td>' +
			'</tr>' +
			'<tr>' +
				'<td class="nowrap">'+ 'Fremdes Dorf' +':</td>' +
				'<td><select id="dsfa_otherOvl">';
		var otherOptions = {
			none: '(nichts)',
			points: 'Punkte',
			name: 'Name',
			coords: 'Koordinaten'
		};
		for (var key in otherOptions) {
			HTML += '<option value="'+ key +'"'+ (Map.otherOvl == key ? ' selected' : '') +'>'+ otherOptions[key] +'</option>';
		}
		HTML += '</select></td>' +
				'</tr>' +
			'</table>' +
		'</td></tr>';
		$('#map_config>table>tbody').append(HTML);
		$('#dsfa_ownOvl')[0].addEventListener('change', Map.changeSelectedOverlay, false);
		$('#dsfa_otherOvl')[0].addEventListener('change', Map.changeSelectedOverlay, false);
		
		if (!lib.hasPA && Settings.get('paFeatures_freePA')) {
			win.TWMap.premium = true;
			win.TWMap.urls.sizeSave = '';
			var mapResizeInterval = window.setInterval(function() {
				if (win.TWMap) {
					win.TWMap.resize(Map.mapSize);
					win.TWMap.resizeMinimap(Map.minimapSize);
					// wieder richtig zentrieren
					win.TWMap.focusSubmit();
					window.clearInterval(mapResizeInterval);
					mapResizeInterval = null;
				}
			}, 50);
			
			$('#fullscreen').show();
			
			var HTML = '<table width="100%" class="vis"><body>' +
				'<tr><th colspan="2">'+ 'Kartengröße ändern' +'</th></tr>' +
				'<tr><td><table cellspacing="0"><tr>' +
					'<td width="80">'+ 'Karte' +':</td>' +
					'<td><select id="map_chooser_select">';
			for (var i = 0, size; size = Map.map_sizes[i]; i++) {
				HTML += '<option value="'+ size +'"'+ (size == Map.mapSize ? ' selected' : '') +'>'+ size +'x'+ size +'</option>';
			}
			HTML += '</select></td>' +
					'<td valign="middle"><img alt="" class="tooltip" title="Du kannst die Größe der Karte leider <u>nicht</u> mit der Maus beliebig verändern." src="graphic//questionmark.png" width="13" height="13"></td>' +
				'</tr></table></td></tr>' +
				'<tr><td><table cellspacing="0"><tr>' +
					'<td width="80">Minimap:</td>' +
					'<td colspan="2"><select id="minimap_chooser_select">';
			for (var i = 0; size = Map.minimap_sizes[i]; i++) {
				HTML += '<option value="'+ size +'"'+ (size == Map.minimapSize ? ' selected' : '') +'>'+ size +'x'+ size +'</option>';
			}
			HTML += '</select></td>' +
				'</tr></table></td></tr>' +
			'</tbody></table>';
			$('#map_topo').append( HTML );
			$('#map_chooser_select')[0].addEventListener('change', function() {
				Map.mapSize = parseInt($('#map_chooser_select').val(), 10);
				Map.save(true);
				win.TWMap.resize(Map.mapSize, true);
			}, false);
			$('#minimap_chooser_select')[0].addEventListener('change', function() {
				var pos = location.href.match(/#(\d+);(\d+)/);
				Map.minimapSize = parseInt($('#minimap_chooser_select').val(), 10);
				Map.save(true);
				win.TWMap.resizeMinimap(Map.minimapSize, true);
				win.TWMap.map.centerPos(pos[1], pos[2], true);
			}, false);
			
			// bisher noch ohne Funktion:
			$('#map').append('<div class="ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se" style="z-index: 14;"></div>');
			
			// bisher noch ohne Funktion:
			$('#minimap').append('<div class="ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se" style="z-index: 14;"></div>');
		}
	},
	// wird durch onChange aufgerufen
	changeSelectedOverlay: function() {
		var type = this.id.remove('dsfa_', 'Ovl');
		Map[type +'Ovl'] = this.value;
		Map.save(true);
		
		$('.dsfa_Info_overlay').each(function() {
			var ID = this.id.remove('dsfa_Info_'),
			img = document.getElementById('map_village_'+ ID);
			Map.updateOverlay(ID, Map.ids_coords[ID], img);
		});
	},
	updateMap: function(e) {
		if (e.target.nodeName != 'IMG' || !e.target.id)
			return;
		
		var img = e.target,
		ID = img.id.remove('map_village_');
		if (!Map.ids_coords.hasOwnProperty(ID)) {
			for (var coord in Map.vills) {
				if (!Map.ids_coords.hasOwnProperty(Map.vills[coord].id))
					Map.ids_coords[Map.vills[coord].id] = coord;
			}
		}
		
		if (Settings.get('map_overlaysActive'))
			Map.updateOverlay(ID, Map.ids_coords[ID], img);
	},
	updateOverlay: function(ID, coord, el) {
		var div = document.getElementById('dsfa_Info_'+ ID),
		own = Map.vills[coord].owner == game_data.player.id;
		if (!div) {
			div = document.createElement('div');
			div.id = 'dsfa_Info_'+ ID;
			div.className = 'dsfa_Info_overlay';
			div.setAttribute('style', 'position: absolute; z-index: 10; width: 53px; height: 38px; left: '+ el.style.left +'; top: '+ el.style.top +';');
			el.parentNode.appendChild(div);
		}
		if (own && Map.ownOvl == 'none' || !own && Map.otherOvl == 'none') {
			div.innerHTML = '';
		} else if (own && Map.ownOvl == 'points' || !own && Map.otherOvl == 'points') {
			div.innerHTML = '<div style="position: relative; width: 53px; height: 10px; top: 14px; font-size: xx-small; font-weight: bold; color: white; text-align: center; vertical-align: middle;">'+ Map.vills[coord].points +'</div>';
		} else if (own && Map.ownOvl == 'name' || !own && Map.otherOvl == 'name') {
			div.innerHTML = '<div style="position: relative; width: 43px; height: 38px; left: 10px; font-size: xx-small; color: #F0C800;">'+ escapeHTML(Map.vills[coord].name, '&shy;') +'</div>';
		} else if (own && Map.ownOvl == 'coords' || !own && Map.otherOvl == 'coords') {
			var xy = parseInt(coord, 10),
			x = Math.floor(xy / 1000);
			div.innerHTML = '<div style="position: relative; width: 53px; height: 10px; top: 14px; font-size: xx-small; font-weight: bold; color: white; text-align: center; vertical-align: middle;">'+ x +'|'+ (xy - x*1000) +'</div>';
		}
		
		if (Village.isLocked(ID) && !document.getElementById('dsfa_farmStop_'+ ID)) {
			var obj = document.createElement('img');
			obj.id = 'dsfa_farmStop_'+ ID;
			obj.src = Map.stopImg;
			obj.setAttribute('style', 'position: absolute; z-index: 5; margin-left: 18px; margin-top: 9px; left: '+ el.style.left +'; top: '+ el.style.top +';');
			el.parentNode.appendChild(obj);
		}
		
		if (!lib.hasPA && Settings.get('paFeatures_freePA')) {
			if (Command.getAttacks(ID).length) {
				var obj = document.createElement('img');
				obj.id = 'map_cmdicons_'+ ID +'_0';
				obj.src = image_base +'map/attack.png';
				obj.setAttribute('style', 'position: absolute; z-index: 4; margin-top: 0px; margin-left: 32px; left: '+ el.style.left +'; top: '+ el.style.top +';');
				el.parentNode.insertBefore(obj, el);
			}
		}
	},
	displayForVillage: function (village, x, y) {
		if (win.TWMap.popup._currentVillage != village.id)
			return;
		var owner = win.TWMap.players[village.owner],
		dat = {
			bonus: null,
			name: village.name,
			x: x,
			y: y,
			continent: win.TWMap.con.continentByXY(x, y),
			points: village.points,
			owner: null,
			newbie: null,
			ally: null,
			extra: null,
			units: [],
			units_display: {}
		};
		if (village.bonus)
			dat.bonus = {
				text: village.bonus[0],
				img: win.TWMap.image_base + village.bonus[1]
			};
		if (owner) {
			dat.owner = owner;
			if (owner.newbie && village.owner != game_data.player.id)
				dat.owner.newbie_time = owner.newbie;
			var ally = win.TWMap.allies[owner.ally];
			if (ally)
				dat.ally = ally
		};
		if (win.TWMap.popup.extraInfo && win.TWMap.popup.popupOptionsSet()) {
			var extra = win.TWMap.popup._cache[village.id];
			if (typeof(extra) === 'undefined') {
				win.TWMap.popup.loadVillage(village.id);
				dat.extra = false
			} else if (typeof(extra) === 'object') {
				var unit_checked = {
					total: $('#map_popup_units').is(":checked"),
					home: $('#map_popup_units_home').is(":checked"),
					time: $('#map_popup_units_times').is(":checked")
				};
				dat.units_display.count = false;
				dat.units_display.time = unit_checked.time && extra.id != win.TWMap.currentVillage;
				if (unit_checked.total || unit_checked.home || unit_checked.time)
					for (var name in extra.units) {
						if (!extra.units.hasOwnProperty(name))
							continue;
						var total = parseInt(extra.units[name]['count']['home'], 10) + parseInt(extra.units[name]['count']['foreign'], 10),
						has_total = (unit_checked.total && total != 0);
						if (has_total || (unit_checked.time && extra.units[name]['time'])) {
							var cntstr = '';
							if (has_total) {
								cntstr = total;
								if (unit_checked.home && extra.units[name]['count']['home'] != 0)
									cntstr += '<br/><span class="unit_count_home">(' + extra.units[name]['count']['home'] + ')</span>';
								dat.units_display.count = unit_checked.total
							}
							dat.units.push({
								name: name,
								image: extra.units[name]['image'],
								time: extra.units[name]['time'],
								count: cntstr
							});
						}
					}
				dat.extra = extra;
			}
		};
		
		// DS-Farmassistent Anfang
		var ID = village.id;
		dat.dsfa = {
			infos: Map.infos && Village.existSpy(ID),
			mood: 100,
			resClass: null,
			res: null,
			buildings: null,
			units: null
		};
		
		if (dat.dsfa.infos) {
			var momPoints = parseInt( dat.points.remove(/\./g) ),
			pointsDiff = momPoints - Village.getPoints(ID),
			buildingConstruction = {};
			if (pointsDiff > 0)
				var buildingConstruction = Village.getBuildUps(ID, pointsDiff);
			
			dat.points += ' <span style="font-size: 90%;';
			if (pointsDiff > 0)
				dat.points += ' color: green !important;">+<span id="getBuildUps2" title="'+ texts.gui.buildUps2 +'" style="cursor: pointer;">';
			else if (pointsDiff < 0)
				dat.points += ' color: red;">';
			else
				dat.points += '">±';
			dat.points += pointsDiff;
			if (pointsDiff > 0)
				dat.points += '</span>';
			dat.points += '</span>';
			
			if (village.bonus)
				Village.set(ID, 'bonus', Settings.boni[village.bonus[1].match(/bonus\/(.+)\.png/)[1]]);
			
			dat.dsfa.mood = Village.getMood(ID);
			
			dat.dsfa.spyDate = Village.getSpyDate(ID, 'd.M. H:m:s');
			
			var res = Village.getRes(ID, null, false),
			resWarn = Village.getResWarn(ID, null, false),
			resWarn90 = Village.getResWarn(ID, null, false, 0.9),
			resProd = Village.getResProd(ID),
			storageColorActive = Settings.get('general_enableStorageColorAt[map]');
			// Rohstoffe
			dat.dsfa.resClass = {
				wood: resWarn.wood && !storageColorActive ? 'warn' : (resWarn90.wood && !storageColorActive ? 'warn_90' : 'res'),
				stone: resWarn.stone && !storageColorActive ? 'warn' : (resWarn90.stone && !storageColorActive ? 'warn_90' : 'res'),
				iron: resWarn.iron && !storageColorActive ? 'warn' : (resWarn90.iron && !storageColorActive ? 'warn_90' : 'res')
			};
			dat.dsfa.res = {
				wood: lib.formatNumber(res.wood, true, true),
				stone: lib.formatNumber(res.stone, true, true),
				iron: lib.formatNumber(res.iron, true, true),
				max: lib.formatNumber(res.max, true, true)
			};
			
			// Gebäude
			var line1 = line2 = line3 = '';
			for (var key in lib.buildingInfo) {
				var buildingLevel = Village.getBuilding(ID, key),
				newLevel = buildingConstruction.hasOwnProperty(key) ? buildingConstruction[key] : 0;
				if (buildingLevel > 0 || newLevel > 0) {
					line1 += '<td style="text-align: center; width: 25px;'+ (line1 != '' ? ' border-left: 1px dashed #C1A264;' : '') +'"><img src="'+ texts.buildingImgPath.replace('$', key) +'"></td>';
					line2 += '<td style="text-align: center;'+ (line2 != '' ? ' border-left: 1px dashed #C1A264;' : '') +'">';
					if (key == 'wall' && buildingLevel > 4)
						line2 += '<span class="'+ (buildingLevel > 9 ? 'warn' : 'warn_90') +'">'+ buildingLevel +'</span>';
					else
						line2 += buildingLevel;
					line2 += '</td>';
					line3 += '<td style="text-align: center;'+ (line3 != '' ? ' border-left: 1px dashed #C1A264;' : '') +'">'+ (newLevel > 0 ? '<span style="color: grey; font-size: 80%;">('+ newLevel +')</span>' : '') +'</td>';
				}
			}
			dat.dsfa.buildings = [line1, line2, line3];
			
			// Einheiten Tabelle
			var line1 = line2 = '';
			for (var key in lib.unitInfo) {
				line1 += '<td style="text-align: center; width: 25px;'+ (line1 != '' ? 'border-left: 1px dashed #C1A264;' : '') +'"><img src="'+ texts.unitImgPath.replace('$', key) +'" title="'+ texts.unit[key] +'" alt="'+ texts.unit[key] +'"></td>';
				line2 += '<td style="text-align: center;'+ (line2 != '' ? ' border-left: 1px dashed #C1A264;' : '') +'" class="unit-item';
				var unit = Village.getUnit(ID, key);
				if (unit < 1) {
					line2 += ' hidden';
					if (unit < 0)
						unit = '?';
				}
				line2 += '">'+ unit +'</td>';
			}
			dat.dsfa.units = [line1, line2];
		}
		if (!lib.hasPA && Settings.get('paFeatures_freePA')) {
			if (Map.popup_options.units_times) {
				var diff = lib.getCoordsDiff(hCoords, [x, y]);
				if (diff != 0) {
					dat.units_display.time = true;
					for (var key in lib.unitInfo) {
						if (lib.unitInfo[key].speed > 1)
							dat.units.push({
								image: 'unit/unit_'+ key +'.png',
								time: lib.formatTime(Math.round(diff * lib.unitInfo[key].speed * 60000), 'H:m:s', true)
							});
					}
				}
			}
		}
		// DS-Farmassistent Ende
		
		$('#map_popup').html(win.jstpl('tpl_popup', dat));
		
		// DS-Farmassistent Anfang
		if (dat.dsfa.infos) {
			Storage.colorize = storageColorActive;
			Storage.colorRes();
		}
		// DS-Farmassistent Ende
		
		this.calcPos()
	}
};


/*
 * Hauptfunktion starten
 */
// $('#dsfa_loadcfg') existiert, wenn die Serverdaten ermittelt wurden/werden...
var runInterval;
if ($('#dsfa_loadcfg').length)
	runInterval = window.setInterval(run, 500);
else
	run();


// --------------------
// -    Funktionen    -
// --------------------

/* Hauptskript */
function run() {
	if ($('#dsfa_loadcfg').length && runInterval)
		return;
	
	window.clearInterval(runInterval);
	if (win.mobile) {
		UI.ErrorMessage('The '+ texts.gui.title +' '+ Update.scriptVersion +' does not support the mobile TW-Version!', 5000);
		return;
	}
	// falls die aktuelle Version veraltet ist...
	if (!Update.init())
		return;
	Settings.init();
	
	if (Settings.get('general_enableAtUV') || !UVActive) {
		Hotkeys.init();
		Storage.init();
		Filter.init();
		Queue.init();
		
		Report.init();
		Command.init();
		Village.init();
		Bot.init();
		Variant.init();
		Infos.init();
		Map.init();
		Overview.init();
		Farmlist.init();
		PA_Features.init();
	}
}

function getNodeTextRecursively(node, delimeter) {
	if (typeof(delimeter) == "undefined")
		delimeter = '';
	var result = '';
	if (node && node.nodeType == 3) {
		if (node.nodeValue && /^\s+$/.test(node.nodeValue) == null) {
			result += trim(node.nodeValue) + delimeter;
		}
	}
	if (node.hasChildNodes()) {
		for (var i = 0, max = node.childNodes.length; i < max; i++) {
			result += getNodeTextRecursively(node.childNodes[i], delimeter);
		}
	}
	return result;
}

function escapeHTML(str, sep) {
	var ret = '';
	if (str) {
		sep = sep || sep;
		for (var i = 0; c = str.charAt(i); i++) {
			switch (c) {
				case '&':
					ret += "&amp;";
					break;
				case '<':
					ret += "&lt;";
					break;
				case '>':
					ret += "&gt;";
					break;
				default:
					ret += c+sep;
			}
		}
	}
	return ret;
}

function is_array(obj) {
	return typeof(obj) == 'object' && (obj instanceof Array);
}

function trim(str) {
	return str.remove(/^\s+/, /\s+$/);
}

function setLocation(url, min, max) {
	if (typeof(min) != "undefined" && typeof(max) != "undefined") {// wenn menschliches Verhalten simuliert werden soll
		window.setTimeout("location.href='" + url + "';", Math.floor(min + Math.random() * (max - min)));
	} else {
		var script = document.body.appendChild(document.createElement("script"));
		script.type = "text/javascript";
		script.innerHTML = "$(document).ready(function(){ window.location.href='" + url + "'; });";
	}
}

function setRandom(func, min, max) {
	window.setTimeout(func, Math.floor(min + Math.random() * (max - min)));
}

function recreateToolTip() {
	// das Attribut ".tooltipText" ist nur so erreichbar:
	$('body').append("<script type=\"text/javascript\">" +
		"$('.tooltip').each(function() { if (this.tooltipText) this.title = this.tooltipText; });" +
	"</script>");
	
	UI.ToolTip($('.tooltip'), {});
}

/**************************\
 * spezifische Funktionen *
\**************************/

function getHomeCoords() {
	var match = $('#menu_row2').html().match(texts.regex.homeCoords);
	hCoords = [parseInt(match[1], 10), parseInt(match[2], 10)];
	return hCoords;
}

function getAvailableUnits() {
	var input, match,
	availableUnits = {};
	for (var unit in lib.unitInfo) {
		input = $('#unit_input_'+ unit);
		if (input.length) {
			match = input.parent().find('a').last().html().match(/(\d+)/);
			if (match && parseInt(match[1], 10) != 0) {
				availableUnits[unit] = parseInt(match[1], 10);
			}
		}
	}
	return availableUnits;
}

function insertFarmTroops(ID, availableUnits) {
	var unit, unitCount,
	resSum = Village.getRes(ID, 'now').sum,	// auf die Rohstoffe jetzt setzen
	farmUnit_order = Bot.autoFarmActive ? Settings.get('autoFarm_units_order') : Settings.get('place_unitPreferences_order'),
	farmUnit_active = Bot.autoFarmActive ? Settings.get('autoFarm_units') : Settings.get('place_unitPreferences');
	coordDiff = lib.getCoordsDiff(hCoords, [Village.getCoords(ID, 'x'), Village.getCoords(ID, 'y')]),
	ramsCount = 0,
	catasCount = 0,
	slowestUnit = (function() {
		var ret = 0,
		sendRams = Bot.autoFarmActive ? Settings.get('autoFarm_sendRams') : Settings.get('place_sendRams'),
		wallDestroy = false,
		sendCatas = Bot.autoFarmActive ? Settings.get('autoFarm_sendCatas') : Settings.get('place_sendCatas');
		if (sendRams[0]) {
			var wall = Village.getBuilding(ID, 'wall');
			if (wall >= sendRams[1] && availableUnits.ram >= Settings.ramsNeeded.reduce[wall]) {
				wallDestroy = availableUnits.ram >= Settings.ramsNeeded.destroy[wall];
				ramsCount = wallDestroy ? Settings.ramsNeeded.destroy[wall] : Settings.ramsNeeded.reduce[wall];
				$('#unit_input_ram').val(ramsCount);
				ret = lib.unitInfo.ram.speed;
			}
		}
		if (sendCatas) {
			var buildName = 0,
			buildLevel = 0,
			building_order = Settings.get('place_buildingPreferences_order');
			for (var i = 0; (build = building_order[i]) && !buildName; i++) {
				if (Village.getBuilding(ID, build) && (build != 'wall' || !wallDestroy)) {
					buildName = build;
					buildLevel = Village.getBuilding(ID, build);
				}
			}
			if (buildName && availableUnits.catapult >= Settings.catasNeeded.reduce[buildLevel]) {
				catasCount = availableUnits.catapult >= Settings.catasNeeded.destroy[buildLevel] ? Settings.catasNeeded.destroy[buildLevel] : Settings.catasNeeded.reduce[buildLevel];
				$('#unit_input_catapult').val(catasCount);
				ret = lib.unitInfo.catapult.speed;
			}
		}
		return ret;
	})(),
	carryRes = 0;
	for (var i = 0, max = farmUnit_order.length; i < max && (carryRes < resSum || slowestUnit == 0); i++) {
		var unit = farmUnit_order[i];
		if (!availableUnits[unit] || !(Bot.autoFarmActive ? farmUnit_active[unit][0] : farmUnit_active[unit]))
			continue;
		if (slowestUnit < lib.unitInfo[unit].speed) {
			slowestUnit = lib.unitInfo[unit].speed;
			resSum = (Village.getRes(ID, lib.getTime() + Math.round(coordDiff * slowestUnit * 60))).sum;
		}
		unitCount = Math.ceil((resSum - carryRes) / lib.unitInfo[unit].carry);
		if (unitCount > availableUnits[unit])
			unitCount = availableUnits[unit];
		carryRes += unitCount * lib.unitInfo[unit].carry;
		$('#unit_input_'+ unit).val(unitCount);
	}
	// falls keine rohstofftragenden Einheiten geschickt werden
	if (!carryRes) {
		if (ramsCount)
			$('#unit_input_ram').val('');
		if (catasCount)
			$('#unit_input_catapult').val('');
		// wenn nur dann Späher geschickt werden sollen, wenn auch Einheiten geschickt werden
		if (Settings.get('place_spyOnlyWithUnits'))
			$('#unit_input_spy').val('');
		return false;
	}
	// es werden rohstofftragende Einheiten geschickt
	return true;
}

function DSLib(prefix) {
	// Hypix's storage-class; thanks for providing!
	var lib = this;
	this.prefix = prefix;
	this.Debugger = function() {
		this.log = function() {
			for (var i = 0; i < arguments.length; i++) {
				var msg = arguments[i];
				if (typeof(GM_log) != "undefined")
					GM_log(msg);
				else if (typeof(opera) != "undefined")
					opera.postError(msg);
				if (typeof(console) != "undefined")
					console.log(msg);
			}
		};
		
		this.dumpObj = function(obj, tabs) {
			if (!tabs) {
				tabs = '';
				var str = '\nDumpObj:\n{';
			} else
				var str = '\n'+ tabs +'{';
			var ntabs = tabs +'\t';
			for (var key in obj) {
				if (typeof(obj[key]) == "object") {
					str += '\n'+ ntabs + key + ':';
					str += this.dumpObj(obj[key], ntabs)
				} else if (typeof(obj[key]) != "function") {
					if (typeof(obj[key]) == "string")
						str += '\n'+ ntabs + key +': "'+ obj[key] +'"';
					else
						str += '\n'+ ntabs + key +': '+ obj[key];
				}
			}
			str += '\n'+ tabs +'}';
			if (tabs == '')
				this.log(str);
			return str;
		};
		
		this.dumpVar = function(obj, lnbr) {
			lib.debug.log(dump(obj, lnbr));
		};
		var dump = function(obj, lnbr) {
			var ret = typeof(obj) +' '+ obj + (lnbr ? '\n' : '');
			if (typeof(obj) == "number") {
				ret = 'Number('+ obj +')'+ (lnbr ? '\n' : '');
			} else if (typeof(obj) == "string") {
				ret = 'String('+ obj.length +') "'+ obj +'"'+ (lnbr ? '\n' : '');
			} else if (is_array(obj)) {
				ret = 'array('+ obj.length +') {'+ (lnbr ? '\n' : ' ');
			} else if (typeof(obj) == "object") {
				ret = 'object {'+ (lnbr ? '\n' : ' ');
			}
			if (typeof(obj) == "object") {
				for (var key in obj) {
					ret += '['+ (typeof(key) == "string" ? '"' : '') + key + (typeof(key) == "string" ? '"' : '') +'] => '+ dump(obj[key], lnbr) + (lnbr ? '' : ' ');
				}
				ret += '}'+ (lnbr ? '\n' : '');
			}
			return ret;
		};
	};
	this.ServerInfo = function(cfgVals, needUnitInfo, needBuildingInfo) {
		if (lib.world == -1)
			return;
		var cfg = this,
		allData = true,
		ajaxReq = 0,
		ajaxLoaded = 0;
		this.config = lib.storage.getValue('svrcfg');
		if (cfgVals.length > 0) {
			if (typeof(this.config) == "undefined" )
				allData = false;
			else {
				var vals = cfgVals.replace(/\//g, '_').split(',');
				for (var i = 0; i < vals.length; i++) {
					if (typeof(this.config[vals[i]]) == "undefined") {
						delete this.config;
						allData = false;
						break;
					}
				}
			}
		}
		this.buildingInfo = lib.storage.getValue('buildinginfo');
		if (needBuildingInfo && typeof(this.buildingInfo) == "undefined")
			allData = false;
		this.unitInfo = lib.storage.getValue('unitInfo');
		if (needUnitInfo && typeof(this.unitInfo) == "undefined")
			allData = false;
		if (!allData){
			var HTML = '<table style="width:100%;">';
			if (cfgVals.length > 0) {
				ajaxReq++;
				HTML += '<tr><td>';
				if (typeof(this.config) == "undefined") {
					HTML += texts.gui.loadServerCfg +'<span id="' + lib.prefix +'_svrcfg"/>';
					loadServerCfg(cfgVals.split(','));
				} else {
					HTML += '<span style="color:green;">'+ texts.gui.serverCfgKnown +'</span>';
					ajaxLoaded++;
				}
				HTML += '</td></tr>';
			}
			if (needUnitInfo) {
				ajaxReq++;
				HTML += '<tr><td>';
				if (typeof(this.unitInfo) == "undefined") {
					HTML += texts.gui.loadUnitInfo +'<span id="'+ lib.prefix +'_unitinfo"/>';
					loadUnitInfo();
				} else {
					HTML += '<span style="color:green;">'+ texts.gui.unitInfoKnown +'</span>';
					ajaxLoaded++;
				}
				HTML += '</td></tr>';
			}
			if (needBuildingInfo) {
				ajaxReq++;
				HTML += '<tr><td>';
				if (typeof(this.buildingInfo ) == "undefined") {
					HTML += texts.gui.loadBuildingInfo +'<span id="'+ lib.prefix +'_buildinginfo"/>';
					loadBuildingInfo();
				} else {
					HTML += '<span style="color:green;">'+ texts.gui.buildingInfoKnown +'</span>';
					ajaxLoaded++;
				}
				HTML += '</td></tr>';
			}
			HTML += '</table>';
			var popup = new lib.Popup('loadcfg', texts.gui.title +' '+ version.split('-')[2], true, 300, 0, HTML, true);
		}
		
		function loadServerCfg(cfgVals) {
			var req = new XMLHttpRequest();
			if (req == null)
				alert('Error creating request object!');
			
			req.open('GET', '/interface.php?func=get_config', true);
			req.onreadystatechange = function() {
				if (req.readyState == 4) {
					var span = document.getElementById(lib.prefix +'_svrcfg');
					if (req.status != 200) {
						span.innerHTML = texts.gui.error + req.status;
						span.style.color = 'red';
					} else {
						cfg.config = {};
						var xml = req.responseXML;
						for (var i = 0; i < cfgVals.length; i++) {
							var path = cfgVals[i].split('/');
							var name = '';
							var e = xml;
							for (var j = 0; j < path.length; j++) {
								e = e.getElementsByTagName(path[j]);
								var len = e.length;
								e = e[0];
								if (len > 0) {
									if (j > 0)
										name += '_';
									name += path[j];
								} else
									break;
							}
							var val = null;
							if (e)
								if (e.firstChild)
									cfg.config[name] = parseFloat(e.firstChild.nodeValue);
								else
									cfg.config[name] = 0;
							else
								lib.debug.log(cfgVals[i] +' not found');
						}
						lib.storage.setValue('svrcfg', cfg.config);
						span.style.color = 'green';
						span.innerHTML = texts.gui.ok;
						ajaxLoaded++;
					}
				}
			};
			req.setRequestHeader('If-Modified-Since', 'Sat, 1 Jan 2000 00:00:00 GMT');
			req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			req.send(null);
		}
		
		function loadUnitInfo() {
			var req = new XMLHttpRequest();
			if (req == null)
				alert('Error creating request object!');
			
			req.open('GET', '/interface.php?func=get_unit_info', true);
			req.onreadystatechange = function() {
				if (req.readyState == 4) {
					var span = document.getElementById(lib.prefix +"_unitinfo");
					if (req.status != 200) {
						span.innerHTML = texts.gui.error + req.status;
						span.style.color = "red";
					} else {
						var xml = req.responseXML;
						cfg.unitInfo = {};
						var e = xml.firstChild;
						var bit = 1;
						for (var i = 0; i < e.childNodes.length; i++) {
							var unitnode = e.childNodes[i];
							if (unitnode.nodeType != 3) {
								cfg.unitInfo[unitnode.nodeName] = {};
								for (var c = 0; c < unitnode.childNodes.length; c++) {
									var node = unitnode.childNodes[c];
									if (node.nodeType != 3)
										cfg.unitInfo[unitnode.nodeName][node.nodeName] = parseFloat(node.firstChild.nodeValue);
								}
							}
						}
						lib.storage.setValue('unitInfo', cfg.unitInfo);
						span.style.color = 'green';
						span.innerHTML = texts.gui.ok;
						ajaxLoaded++;
					}
				}
			};
			req.setRequestHeader('If-Modified-Since', 'Sat, 1 Jan 2000 00:00:00 GMT');
			req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			req.send(null);
		}
		
		function loadBuildingInfo() {
			var req = new XMLHttpRequest();
			if (req == null)
				alert('Error creating request object!');
			
			req.open('GET', '/interface.php?func=get_building_info', true);
			req.onreadystatechange = function() {

				if (req.readyState == 4) {
					var span = document.getElementById(lib.prefix +'_buildinginfo');
					if (req.status != 200) {
						span.innerHTML = texts.gui.error + req.status;
						span.style.color = 'red';
					} else {
						var xml = req.responseXML;
						cfg.buildingInfo = {};
						var e = xml.firstChild;
						for (var i = 0; i < e.childNodes.length; i++) {
							var buildingnode = e.childNodes[i];
							if (buildingnode.nodeType != 3) {
								cfg.buildingInfo[buildingnode.nodeName] = {};
								for (var c = 0; c < buildingnode.childNodes.length; c++) {
									var node = buildingnode.childNodes[c];
									if (node.nodeType != 3)
										cfg.buildingInfo[buildingnode.nodeName][node.nodeName] = parseFloat(node.firstChild.nodeValue);
								}
							}
						}
						lib.storage.setValue('buildinginfo', cfg.buildingInfo);
						span.style.color = 'green';
						span.innerHTML = texts.gui.ok;
						ajaxLoaded++;
					}
				}
			};
			req.setRequestHeader('If-Modified-Since', 'Sat, 1 Jan 2000 00:00:00 GMT');
			req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			req.send(null);
		}
	};
	this.StorageHandler = function() {
		var gm = typeof(unsafeWindow) != "undefined" && navigator.userAgent.indexOf("Firefox") > -1,
		win = gm ? unsafeWindow : window,
		ls = false,
		intGetValue, intSetValue,
		prefix = lib.prefix;
		try {
			ls = typeof(win.localStorage) != "undefined";
		} catch(e) {
			lib.debug.log(e.message);
		}
		if (gm || !ls) {
			if (gm) {
				prefix = prefix +'_'+ document.location.host.split('.')[0];
				intSetValue = function(key, value, inIdx) {
					GM_setValue(prefix +'_'+ key, value);
				};
				intGetValue = function(key, defaultValue) {
					return GM_getValue(prefix +'_'+ key, defaultValue);
				};
				this.deleteValue = function(key) {
					GM_deleteValue(prefix +'_'+ key);
				};
			} else {
				this.error('No suitable storage capability found!');
				end;
			}
		} else if (ls) {
			intSetValue = function(key, value, inIdx) {
				localStorage.setItem(prefix +'_'+ key, value);
			};
			intGetValue = function(key, defaultValue) {
				var value = localStorage.getItem(prefix +'_'+ key);
				if (value)
					return value;
				else
					return defaultValue;
			};
			this.deleteValue = function(key) {
				localStorage.removeItem(prefix +'_'+ key);
			};
		} else {
			this.error('No suitable storage capability found!');
			end;
		}
		this.setValue = function(key, value) {
			switch (typeof(value)) {
				case "object":
				case "function":
					intSetValue(key, 'j'+ JSON.stringify(value));
					break;
				case "number":
					intSetValue(key, 'n'+ value);
					break;
				case "boolean":
					intSetValue(key, 'b'+ (value ? 1 : 0));
					break;
				case "string":
					intSetValue(key, 's'+ value);
					break;
				case "undefined":
					intSetValue(key, 'u');
					break;
			}
		};
		this.getValue = function(key, defaultValue) {
			var str = intGetValue(key);
			if (typeof(str) != "undefined") {
				switch (str[0]) {
					case 'j':
						try {
							return JSON.parse(str.substring(1));
						} catch(e) {
							alert(key +': '+ texts.gui.valueError);
							return defaultValue;
						}
					case 'n':
						return parseFloat(str.substring(1));
					case 'b':
						return str[1] == '1';
					case 's':
						return str.substring(1);
					default:
						this.deleteValue(key);
				}
			}
			return defaultValue;
		};
		this.getString = function(key) {
			return intGetValue(key);
		};
		this.setString = function(key, value) {
			intSetValue(key, value);
		};
	};
	this.Popup = function(id, title, close, width, height, content, draggable, reloadAfterClosing) {
		var THIS = this;
		id = lib.prefix +'_'+ id;
		
		this.close = function() {
			if (reloadAfterClosing)
				$('.popup_shadow_style').fadeOut(400, function() {
					location.reload();
				});
			else
				$('#popup_shadow_div, .popup_shadow_style').fadeOut(400);
		};
		
		this.div = document.getElementById(id);
		this.shadowDiv = document.getElementById('popup_shadow_div');
		if (this.shadowDiv === null) {
			this.shadowDiv = document.body.appendChild( document.createElement('div') );
			this.shadowDiv.id = 'popup_shadow_div';
			this.shadowDiv.style.position = 'fixed';
			this.shadowDiv.style.left = '0px';
			this.shadowDiv.style.top = '0px';
			this.shadowDiv.style.backgroundColor = 'rgba(0,0,0,0.7)';
			this.shadowDiv.style.zIndex = 11999;
			this.shadowDiv.style.display = 'none';
			this.shadowDiv.onclick = this.close;
		}
		this.prevShadowDisplay = this.shadowDiv.style.display;
		if (this.div === null) {
			this.div = document.body.appendChild( document.createElement('div') );
			this.div.id = id;
			this.div.className = 'popup_style popup_shadow_style';
			this.div.style.position = 'absolute';
			this.div.style.zIndex = 12000;
			this.div.style.display = 'none';
		}
		this.div.innerHTML = '';
		var tab = this.div.appendChild( document.createElement('table') );
		tab.className = 'popup_content';
		tab.style.border = '2px solid #804000';
		var row = tab.insertRow(0);
		var cell = row.appendChild( document.createElement('th') );
		if (draggable !== false)
			cell.style.cursor = 'move';
		// mit Schliessen-Link
		if (close) {
			var titleTab = cell.appendChild( document.createElement('table') );
			titleTab.style.width = '100%';
			row = titleTab.insertRow(0);
			this.titleCell = row.insertCell(0);
			this.titleCell.appendChild(document.createTextNode(title));
			cell = row.insertCell(1);
			cell.style.textAlign = 'right';
			var a = cell.appendChild( document.createElement('a') );
			a.id = id +'_close';
			a.href = "javascript:;";
			a.appendChild(document.createTextNode(texts.gui.close));
			a.addEventListener('click', this.close, false);
			
			if (typeof('close') == 'function')
				a.addEventListener('click', close, false);
		} else {	// kein Schliessen-Link
			this.titleCell = cell;
			cell.appendChild(document.createTextNode(title));
		}
		this.content = tab.insertRow(1).insertCell(0);
		if (content)
			this.content.innerHTML = content;
		
		if (draggable !== false)
			$('#'+ id).draggable({
				handle: 'tr:first',
				cursor: 'move'
			});
		
		this.resize = function() {
			THIS.shadowDiv.style.width = self.innerWidth +'px';
			THIS.shadowDiv.style.height = self.innerHeight +'px';
		};
		this.center = function() {
			THIS.div.style.left = Math.round(Math.max(0, self.pageXOffset + (self.innerWidth - THIS.div.offsetWidth) / 2)) +'px';
			var top = Math.round(Math.max(document.getElementById('topContainer').offsetHeight + 4, self.pageYOffset + (self.innerHeight - THIS.div.offsetHeight) / 2));
			THIS.div.style.top = top +'px';
			
			if (!THIS.footerFix) {
				THIS.footerFix = document.body.appendChild( document.createElement('div') );
				THIS.footerFix.id = 'footer_fix';
				THIS.footerFix.style.display = 'block';
				THIS.footerFix.style.width = '100%';
				THIS.footerFix.style.position = 'absolute';
			}
			THIS.footerFix.style.height = (document.getElementById('footer').offsetHeight + 4) +'px';
			THIS.footerFix.style.top = (top + THIS.div.offsetHeight) +'px';
		};
		this.show = function() {
			if (!arguments.length || arguments[0]) {
				$( [THIS.shadowDiv, THIS.div] ).fadeIn(400);
				window.addEventListener('resize', THIS.resize, false);
				THIS.resize();
				THIS.center();
			} else {
				$( [THIS.shadowDiv, THIS.div] ).fadeOut(400);
				window.removeEventListener('resize', this.resize, false);
			}
		};
		this.hide = function() {
			THIS.show(false);
		};
		this.setSize = function(width, height) {
			var display = THIS.div.style.display;
			THIS.div.style.display = 'block';
			if (typeof(width) == 'undefined')
				width = tab.offsetWidth;
			if (typeof(height) == 'undefined')
				height = tab.offsetHeight;
			THIS.div.style.display = display;
			THIS.div.style.width = width +'px';
			THIS.div.style.height = height +'px';
			THIS.content.parentNode.parentNode.parentNode.style.width = Math.max(0, width - 8) +'px';
			THIS.content.parentNode.parentNode.parentNode.style.height = Math.max(0, height - 50) +'px';
			THIS.center();
		};
		this.setTitle = function(title) {
			THIS.titleCell.innerHTML = '';
			THIS.titleCell.appendChild(document.createTextNode(title));
		};
		
		this.setSize(width, height);
		window.addEventListener('resize', THIS.setSize, false);
		this.show();
	};
	this.inlinePopup = function(id, x, y, html, draggable, width, height) {	
		if (!$('#'+ id).length) {
			if (!$('#inline_popup').length) {
				$('body').append(
					'<div id="inline_popup" class="ui-draggable" style="position: absolute; z-index: 12000; overflow: auto; ">' +
						'<div id="inline_popup_menu"'+ (draggable ? '' : ' style="cursor: default;"') +'>' +
							'<a href="javascript:inlinePopupClose()">'+ texts.gui.close +'</a>' +
						'</div>' +
						'<div id="inline_popup_main">' +
						'</div>' +
					'</div>'
				);
			}
			$('#inline_popup #inline_popup_main').append('<div id="'+ id +'" class="nowrap">'+ ( typeof(html) == 'string' ? html : '' ) +'</div>');
			if (html instanceof HTMLElement)
				html = $(html);
			if (html instanceof jQuery)
				$('#'+ id).append(html);
			if (draggable) {
				$('body').append(
					'<script type="text/javascript">' +
						"$(document).ready(function(){ UI.Draggable($('#inline_popup')); });" +
					'</script>'
				);
			}
		}
		$('#inline_popup_main > div').each(function() {
			if (!$(this).attr('id') && $(this).find('> #inline_popup_content').length)
				$(this).attr('id', 'inline_popup_content_container');
		});
		$('#inline_popup_main > *').hide();
		$('#'+ id).show();
		$('#inline_popup_menu a')[0].addEventListener('click', function(e) {
			window.setTimeout(function() {
				if ($('#inline_popup').is(':hidden')) {
					$('#inline_popup_main > *').hide();
					$('#inline_popup_main > h3').show();
					$('#inline_popup_content_container').show();
					$('#inline_popup_main').css({
						width: '',
						height: 'auto'
					});
					$('#inline_popup').css({
						width: '',
						height: ''
					});
				}
			}, 200);
		}, false);
		$('#inline_popup_main').css({
			width: (width-10) +'px',
			height: (height-30) +'px'
		});
		$('#inline_popup').css({
			left: x +'px',
			top: y +'px',
			width: width +'px',
			height: height +'px'
		}).show();
	};
	this.parseParams = function(url) {
		url = url.remove(location.hash);
		// Wegschneiden von allem was nach # kommt
		url = url.substring(url.indexOf('?') + 1);
		url = url.replace(/&amp;/g, '&');
		var hash = url.indexOf('#');
		if (hash > -1) {
			url = url.substring(0, hash - 1);
		};
		url = url.split('&');
		var params = {
			get: function(name, def) {
				if (typeof(this[name]) == "undefined")
					return def;
				else
					return this[name];
			}
		};
		for (var i = 0; i < url.length; i++) {
			var param = url[i].split('=');
			params[param[0]] = param[1];
		}
		return params;
	};
	this.getGameData = function() {
		var game_data;
		if (typeof(unsafeWindow) != 'undefined' && navigator.userAgent.indexOf("Firefox") > -1) {
			game_data = unsafeWindow.game_data;
		}
		if (!game_data) {
			var script = document.createElement('script');
			script.type = 'application/javascript';
			script.textContent = "if(document&&document.body){" +
			"var input=document.createElement('input');" +
			"input.type='hidden';" +
			"input.value=JSON.stringify(game_data);" +
			"input.id='game_data';" +
			"document.body.appendChild(input);" +
			"}";
			if (document && document.body){
				document.body.appendChild(script);
				var input = document.getElementById('game_data');
				if (input)
					eval('game_data='+ input.value +';');
				document.body.removeChild(script);
			}
		}
		if (game_data)
			game_data.link_base = game_data.link_base.replace(/&amp;/g, '&');
		return game_data;
	};
	this.createLink = function(screen) {
		var lnk = this.game_data.link_base.replace('screen=', 'screen='+ screen);
		var len = arguments.length - 1;
		for (var i = 1; i < len; i++) {
			lnk += '&'+ arguments[i] +'=';
			i++;
			if (i < len)
				lnk += arguments[i];
		}
		if (arguments[len] == true)
			lnk.replace(/&/g, '&amp;');
		return lnk;
	};
	this.fireEvent = function(node, evt) {
		if (node.nodeName.toUpperCase() == "INPUT" && node.type.toUpperCase() == "CHECKBOX")
			node.checked = !node.checked;
		var evObj = document.createEvent('HTMLEvents');
		evObj.initEvent(evt, true, true);
		var ok = node.dispatchEvent(evObj);
		if (ok && node.nodeName == "A" && node.href != "") {
			location.href = node.href;
		}
	};
	this.alert = function(message, fadeOutTime, mclass) {
		var script = document.body.appendChild(document.createElement("script"));
		script.type = "text/javascript";
		if (arguments.length < 2)
			script.innerHTML = "$(document).ready(function(){ UI.InfoMessage('"+ message +"'); });";
		else if (arguments.length > 2)
			script.innerHTML = "$(document).ready(function(){ UI.InfoMessage('"+ message +"',"+ fadeOutTime +",'"+ mclass +"'); });";
	};
	this.success = function(message, fadeOutTime, mclass) {
		fadeOutTime = fadeOutTime || 2000;
		mclass = mclass || '';
		this.alert(message, fadeOutTime, mclass +' success');
	};
	this.error = function(message, fadeOutTime, mclass) {
		fadeOutTime = fadeOutTime || 2000;
		mclass = mclass || '';
		this.alert(message, fadeOutTime, mclass +' error');
	};
	this.getServerTime = function() {
		try {
			var hms = document.getElementById('serverTime').firstChild.nodeValue.split(":"),
			dmy = document.getElementById('serverDate').firstChild.nodeValue.split('/');
			dt = new Date(parseInt(dmy[2], 10), parseInt(dmy[1], 10) - 1, parseInt(dmy[0], 10), parseInt(hms[0], 10), parseInt(hms[1], 10), parseInt(hms[2], 10));
			dt = new Date(dt.getTime() - dt.getTimezoneOffset() * 60000);
			return dt;
		} catch(e) {
			return new Date();
		}
	};
	this.getServerTimeDiff = function() {
		return this.serverTime.getTime() / 1000 - new Date().getTime() / 1000;
	};
	this.getTime = function() {
		return parseInt(new Date().getTime() / 1000 + this.timeDiff, 10);
	};
	this.padLeft = function(str, chr, len) {
		var ret = str.toString();
		var pad = len - ret.length;
		for (var i = 0; i < pad; i++)
			ret = chr + ret;
		return ret;
	};
	this.formatNumber = function(nr, dotted, greyspan, shortMode) {
		var ret = '';
		if (!nr)
			return '0';
		if (shortMode > 0 && nr > 999999) {
			var tmp = Math.round(nr / 10000),
			tmp2 = tmp % 100;
			ret = lib.formatNumber(Math.floor(tmp / 100), dotted, greyspan) + (greyspan ? '<span class="grey">'+ texts.locale.nrgroupsign2 +'</span>' : texts.locale.nrgroupsign2) + (tmp2 < 10 ? '0' : '') + tmp2 +' M';	//' <- Dreamweaver-Syntaxhighlightning-Fehler
		} else if (shortMode == 2 && nr > 999) {
			var tmp = Math.round(nr / 100),
			tmp2 = tmp % 10;
			ret = lib.formatNumber(Math.floor(tmp / 10), dotted, greyspan) + ( greyspan ? '<span class="grey">'+ texts.locale.nrgroupsign2 +'</span>' : texts.locale.nrgroupsign2) + tmp2 +'k';	//' <- Dreamweaver-Syntaxhighlightning-Fehler
		} else if (dotted) {
			nr = nr.toString();
			var len = nr.length;
			for (var i = 0; i < len; i++) {
				ret += nr[i];
				//var j = len-i;
				//if (j == 10 || j == 7 || j == 4 ) { //i < len-1 && (len-i-1) % 3 == 0)
				if (i < len - 1 && (len - i - 1) % 3 == 0) {
					if (greyspan)
						ret += '<span class="grey">'+ texts.locale.nrgroupsign +'</span>';
					else
						ret += texts.locale.nrgroupsign;
				}
			}
		} else
			ret = nr;
		return ret;
	};
	this.formatTime = function(time, formatStr) {
		var dateObj = new Date(time),
		date = {
			Y: dateObj.getUTCFullYear(),
			M: dateObj.getUTCMonth(),
			d: dateObj.getUTCDate(),
			H: dateObj.getUTCHours(),
			m: dateObj.getUTCMinutes(),
			s: dateObj.getUTCSeconds()
		};
		
		var ret = '';
		for (var i = 0; i < formatStr.length; i++) {
			if (date.hasOwnProperty(formatStr[i])) {
				if (formatStr[i] != 'Y' && date[formatStr[i]] < 10)	// beim Jahr keine 0 anhängen
					ret += '0';
				ret += date[formatStr[i]];
			} else {
				ret += formatStr[i];
			}
		}
		return ret;
	};
	this.getCoordsDiff = function(c1, c2, g) {
		if (g === 0) {// ungerundet
			return Math.sqrt(Math.pow(c1[0] - c2[0], 2) + Math.pow(c1[1] - c2[1], 2));
		} else {
			if (!g) g = 1;
			// eine Nachkommastelle
			return Math.round(Math.sqrt(Math.pow(c1[0] - c2[0], 2) + Math.pow(c1[1] - c2[1], 2)) * Math.pow(10, g)) / Math.pow(10, g);
		}
	};
	
	this.tzOff = new Date().getTimezoneOffset() * 60;
	this.serverTime = this.getServerTime();
	this.timeDiff = this.getServerTimeDiff();
	this.debug = new this.Debugger();
	this.storage = new this.StorageHandler();
	this.params = this.parseParams(location.href);
	this.server = document.location.host.split('.')[0];
	var serverInfo = new this.ServerInfo("speed,unit_speed,game/base_config,game/tech,game/knight,game/archer,game/church,night/active,night/start_hour,night/end_hour", true, true);
	this.serverConfig = serverInfo.config;
	this.buildingInfo = serverInfo.buildingInfo;
	this.unitInfo = serverInfo.unitInfo;
	this.hasPA = false;
	var res = this.server.match(/^([a-z]{2})s?(\d+)/);
	if (res) {
		this.lang = res[1];
		this.world = parseInt(res[2], 10);
	} else {
		this.lang = "de";
		this.world = -1;
	}
	this.worldString = this.lang + this.world;
	
	if (this.params.screen) {
		this.game_data = this.getGameData();
		if (this.game_data)
			this.hasPA = this.game_data.player.premium;
		else
			throw "No GameData found!";
	}
}
})();
} catch(e) {
	function close() {
		$('#errorOverlay, #errorWindow').fadeOut(400, function() {
			$('#errorOverlay, #errorWindow').remove();
		});
	}
	function log(msg) {
		if (typeof(console) != "undefined")
			console.log(msg);
		if (typeof(GM_log) != "undefined")
			GM_log(msg);
		else if (typeof(opera) != "undefined")
			opera.postError(msg);
	}
	
	var storage = new (function() {
		var gm = typeof(unsafeWindow) != "undefined" && navigator.userAgent.indexOf("Firefox") > -1,
		win = gm ? unsafeWindow : window,
		ls = false,
		intSetValue,
		prefix = 'dsfa';
		try {
			ls = typeof(win.localStorage) != "undefined";
		} catch(e) {
			log(e.message);
		}
		if (gm || !ls) {
			if (gm) {
				prefix = prefix +'_'+ document.location.host.split('.')[0];
				intSetValue = function(key, value, inIdx) {
					GM_setValue(prefix +'_'+ key, value);
				};
			} else {
				alert('No suitable storage capability found!');
				end;
			}
		} else if (ls) {
			intSetValue = function(key, value, inIdx) {
				localStorage.setItem(prefix +'_'+ key, value);
			};
		} else {
			alert('No suitable storage capability found!');
			end;
		}
		this.setValue = function(key, value) {
			switch (typeof(value)) {
				case "object":
				case "function":
					intSetValue(key, 'j'+ JSON.stringify(value));
					break;
				case "number":
					intSetValue(key, 'n'+ value);
					break;
				case "boolean":
					intSetValue(key, 'b'+ (value ? 1 : 0));
					break;
				case "string":
					intSetValue(key, 's'+ value);
					break;
				case "undefined":
					intSetValue(key, 'u');
					break;
			}
		};
	})();
	
	log(e);
	
	if (e != "No GameData found!") {
		var data,
		overlayOpen = false,
		transmitted = false,
		transmittingError = false,
		updateAvailable = false,
		loadingInterval,
		
		/*
		 * Privatsphäre erhalten
		 */
		// Dateiname
		name = e.name || 'General Failure',
		message = e.message || e,
		fileName = e.fileName ? e.fileName.substr(e.fileName.lastIndexOf('/') + 1) : '',
		lineNumber = e.lineNumber || '?',
		// Dateinamen (in einem Stapel)
		stack = e.stack ? e.stack.split('\n') : e.toString(),
		// URL
		url = location.href
		.replace(/([&?])village=[np0-9]+/,'$1village=')
		.replace(/([&?])view=\d+/,'$1view=')
		.replace(/([&?])id=\d+/,'$1id=')
		.replace(/([&?])group=\d+/,'$1group=')
		.replace(/([&?])t=\d+/,'$1t=')
		.replace(/([&?])h=[a-z0-9]+/,'$1h=')
		.replace(/([&?])thread_id=\d+/,'$1thread_id=')
		.replace(/([&?])target=\d+/,'$1target=')
		.replace(/([&?])lit=\d+/,'$1lit=')
		.replace(/#\d{1,3};\d{1,3}/,'#xxx;yyy');
		
		// Den Stapel an Dateinamen bearbeiten:
		if (!typeof(stack) == 'object' || !(stack instanceof Array))
			stack = [stack];
		for (var i = 0, max = stack.length; i < max; i++) {
			// nur nicht leere Strings bearbeiten
			if (stack[i]) {
				var pos1 = stack[i].indexOf('://'),
				pos2 = stack[i].lastIndexOf('/');
				if (pos1 != -1 && pos2 != -1)
					stack[i] = stack[i].substr(0, pos1 + 3) + stack[i].substr(pos2 + 1 );
			}
		}
		stack = stack.join('\n');
		
		data = {
			version: version,
			name: name,
			message: message,
			fileName: fileName,
			lineNumber: lineNumber,
			stack: stack,
			url: url,
			browser: navigator.userAgent
		};
		
		$('#linkContainer').append('<div style="float: right; margin: 3px 16px 0 0;"><a id="errorMsg" href="javascript:;" style="color: red; text-decoration: blink;">An Error Has Occurred!</a></div>');
		$('#errorMsg').click(function() {
			overlayOpen = true;
			this.blur();
			$('#errorMsg').css('text-decoration', '');
			
			$('body').append(
				'<div id="errorOverlay" style="background-color: black; opacity: 0.7; position: fixed; top: 0px; left: 0px; height: '+ $(window).outerHeight() +'px; width: '+ $(window).outerWidth() +'px; z-index: 14000; display: none;"></div>' +
				'<div id="errorWindow" style="background-color: white; border: 2px solid brown; position: fixed; z-index: 15000; padding: 12px 20px;">' +
					'<h2 style="color: red;">An Error Has Occurred In "DS-Farmassistent"!</h2>' +
					'<h3 id="progress" style="color: blue; margin: 20px 20px 0;">The error is being reported '+ (transmitted ? ' ... <span style="color: green; margin-left: 10px;">transmitted</span>' : (transmittingError ? ' ... <span style="color: red; margin-left: 10px;">failed</span>' : '')) +'</h3>' +
					(updateAvailable ? '<h3 style="text-align: center;"><a href="'+ updateURL +'" style="color: #0D0; text-decoration: blink;">Update available!</a></h3>' : '') +
					'<table style="margin-top: 20px; width: 100%; border: 1px solid black; padding: 1px 2px;"><tbody>' +
						'<tr><th colspan="2" style="background: #D3D3D3 ! important; padding: 2px 6px; font-size: 110%;">Data:</th></tr>' +
						'<tr><td style="padding-left: 5px; width: 1px;">version:</td><td><input type="text" value="'+ data.version +'" id="dsfa_error_version" style="border: 1px solid #7D510F; padding: 4px;" readonly="readonly"></td></tr>' +
						'<tr><td style="padding-left: 5px; width: 1px;">name:</td><td><input type="text" value="'+ data.name +'" id="dsfa_error_name" style="border: 1px solid #7D510F; padding: 4px;" readonly="readonly"></td></tr>' +
						'<tr><td style="padding-left: 5px; width: 1px;">message:</td><td><textarea id="dsfa_error_message" style="width: 100%;" readonly="readonly">'+ data.message +'</textarea></td></tr>' +
						'<tr><td style="padding-left: 5px; width: 1px;">filename:</td><td><input type="text" value="'+ data.fileName +'" id="dsfa_error_fileName" style="border: 1px solid #7D510F; padding: 4px;" readonly="readonly"></td></tr>' +
						'<tr><td style="padding-left: 5px; width: 1px;">linenumber:</td><td><input type="text" value="'+ data.fileNumber +'" id="dsfa_error_lineNumber" style="border: 1px solid #7D510F; padding: 4px;" readonly="readonly"></td></tr>' +
						'<tr><td style="padding-left: 5px; width: 1px;">stack:</td><td><textarea id="dsfa_error_stack" style="width: 100%;" readonly="readonly">'+ data.stack +'</textarea></td></tr>' +
						'<tr><td style="padding-left: 5px; width: 1px;">url:</td><td><input type="text" value="'+ data.url +'" id="dsfa_error_url" style="border: 1px solid #7D510F; padding: 4px;" readonly="readonly"></td></tr>' +
						'<tr><td style="padding-left: 5px; width: 1px;">browser:</td><td><input type="text" value="'+ data.browser +'" id="dsfa_error_browser" style="border: 1px solid #7D510F; padding: 4px;" readonly="readonly"></td></tr>' +
					'</tbody></table>' +
					'<h5 style="text-align: center;"><a id="closeErrorWindow" href="javascript:;" style="color: #603000;">close</a></h5>' +
				'</div>'
			);
			
			$('#errorWindow textarea, #errorWindow input').each(function() {
				$(this).width( $(this).parent().innerWidth() - 10 );	// 10 = 2 * 4 (padding) + 2 * 1 (border)
			});
			$('#closeErrorWindow').click(close);
			$('#errorWindow').css({
				'top': Math.round( ($(window).height() - $('#errorWindow').height()) / 2 ),
				'left': Math.round( ($(window).width() - $('#errorWindow').width()) / 2 )
			}).hide();
			$('#errorOverlay, #errorWindow').fadeIn(400, function() {
				if (!loadingInterval)
					loadingInterval = setInterval(function() {
						if (!$('#progress').length) {
							window.clearInterval(loadingInterval);
							return;
						}
						var match = $('#progress').html().match(/^(.+)\s?([\.]+)$/);
						if (!match)
							return;
						
						if (match[2].length == 3)
							$('#progress').html( match[1] +' ');
						else
							$('#progress').html( match[1] +' '+ match[2] +'.');
					}, 500);
			});
		});
		
		$.ajax({
			type: 'POST',
			url: URLBase +'error.php',
			crossDomain: true,
			data: data,
			dataType: 'json',
			success: function(responseData, textStatus, jqXHR) {
				transmitted = true;
				if (overlayOpen) {
					clearTimeout(loadingInterval);
					var html = $('#progress').html(),
					match = html && html.match(/^(.+)\s?([\.]{0,3})$/);
					if (match)
						$('#progress').html(match[1] +' ... <span style="color: green; margin-left: 10px;">transmitted</span>');
				}
				
				// Auf Updates prüfen
				$.ajax({
					type: 'GET',
					url: URLBase +'update.php',
					crossDomain: true,
					dataType: 'json',
					success: function(responseData) {
						if (!responseData || !responseData.responseText)
							return;
						
						var vsplit = version.split('-'),
						scriptVersion_this = parseFloat(vsplit[2]),
						scriptVersion_server = parseFloat(responseData.responseText);
						if (scriptVersion_this == scriptVersion_server) {
							storage.setValue('updateAvailable', false);
						} else {
							updateAvailable = true;
							if (overlayOpen)
								$('<h3 style="text-align: center;"><a href="'+ updateURL +'" style="color: #0D0; text-decoration: blink;">Update available!</a></h3>').insertAfter('#progress');
							storage.setValue('updateAvailable', true);
						}
					}
				});
			},
			error: function (responseData, textStatus, errorThrown) {
				log(responseData);
				log(textStatus);
				log(errorThrown);
				transmittingError = true;
				
				if (overlayOpen) {
					clearTimeout(loadingInterval);
					var match = $('#progress').html().match(/^(.+)\s?([\.]{0,3})$/);
					if (match)
						$('#progress').html(match[1] +' ... <span style="color: red; margin-left: 10px;">failed</span>');
				}
			}
		});
	}
}