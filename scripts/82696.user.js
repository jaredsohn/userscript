// Copyright (c) 2010-2013, RxR

// ==UserScript==
// @name	KingsAge Quick Menu
// @namespace	RxR KingsAge
// @description	Have you ever dreamt about quick menu customising but run into "You need a premium account for this game feature." warning? Install this script and you'll never see it again.
//
// @grant	GM_getValue
// @grant	GM_setValue
// @grant	GM_deleteValue
//
// @include	http://s*.kingsage.*/game.php*
//
// Auto-update function. Many thanks, Buzzy!
// @require	http://buzzy.260mb.com/AutoUpdater.js
//
// @version	0.46
//
// @history	0.46 19.13.2013	added grant requirements
// @history	0.45 25.12.2011	removed "trash" under non-Premium account, added: link "Check for update", language selection, German translation (thanks to Andreas aka seandre@gmx.de)
// @history	0.44 18.06.2011	only one small "touch-up" - link to userscripts.org was added to version number
// @history	0.43 15.12.2010	options are always displayed, even if Quick Menu doesn't exist
// @history	0.42 13.12.2010	rewritten code
// @history	0.41 23.09.2010	changed the way of Premium Account's detection (compeled by changes in v.1.0.3)
// @history	0.40 19.09.2010	added ability to force using of Quick Menu instead of Premium feature
// @history	0.30 09.08.2010	added ability to choose item from predefined entries
// @history	0.22 01.08.2010	added ability to hide/show particular entry
// @history	0.21 01.08.2010	empty icon was added for entry without icon
// @history	0.20 01.08.2010	fixed some errors and added options
// @history	0.10 31.07.2010	something usable at last...
// @history	0.01 29.07.2010 basic algorithm
//
// ==/UserScript==

const scriptID = 82696;
const scriptVersion = "0.46";

autoUpdate (scriptID, scriptVersion);				// Buzzy's autoaupdate

if (!GM_getValue || !GM_setValue || !GM_deleteValue) return;	// opps, my precious functions're missing

var delayForReady = 10;						// delay in milliseconds for waitForReady's setTimeout
waitForReady(main, delayForReady);				// wait until document is ready and then call main()

const ONLY_TEXT = "T";
const ONLY_ICON = "I";
const ICON_AND_TEXT = "A";
const fHIDE_QUICK_MENU = "H";
const fSHOW_CUSTOMIZE = "C";
const fFORCE_QUICK_MENU = "F";
const fFORCE_LANGUAGE = "L";
const fNOTHING = "-";
const SPRTR = "^";						// record separator
const SPRTRx = "`";						// item separator
const EF_CLONE_ENTRY = "C";					// "clone item" flag
const EF_EDIT_ENTRY = "E";					// "edit item" flag
const EF_NEW_ENTRY = "N";					// "new item" flag
const EF_NO_EDIT = "-";						// "we aren't editing" flag
const NO_ENTRY = "-";						// used in select of predefined entries
const AT_THE_END = -1;
const NEW_WINDOW = "W";						// "open in new window" flag
const SAME_WINDOW = "-";
const HIDE_ENTRY = "H";
const SHOW_ENTRY = "-";

const INPUT_LINES_WIDTH = "400px";

const RxR_edit	 = "RxRe_";
const RxR_clone	 = "RxRc_";
const RxR_delete = "RxRd_";
const RxR_up	 = "RxRu_";
const RxR_down	 = "RxRd_";
const RxR_hide	 = "RxRh_";

const FORM_NAME	   = "RxR_form";
const INPUT_NAME   = "quick_name";
const INPUT_IMAGE  = "quick_image";
const INPUT_URL	   = "quick_url";
const INPUT_WINDOW = "new_window";

const RxR_image = "RxRcustomize";
const IMAGE_OPACITY = "0.4";

const I_ICON_OR_TEXT = "RxR_icons_texts";
const I_DISPLAY_CUSTOMIZE = "RxR_display_customize";
const I_ICON_TEXT_PREVIEW = "RxR_icons_texts_preview";
const I_FORCE_QUICK_MENU = "RxR_force_quick_menu";
const I_FORCE_LANGUAGE	= "RxR_force_language";

var quickMenu;									// list of quick menu items
var villageID = paramValue("VILLAGE", window.location.href.toUpperCase());	// get village's ID

const bigVer = 0;
const midVer = 1;
const smallVer = 2;
var gameVersion = new Array();
getGameVersion(gameVersion);

// menu item template
function tMenuItem (_N, _I, _T, _W) {
	this.name	= trimStr(_N);
	this.imageURL	= trimStr(_I);
	this.targetURL	= trimStr(_T);
	this.openIn	= (_W == NEW_WINDOW)?NEW_WINDOW:SAME_WINDOW;
	this.display	= SHOW_ENTRY;

	this.getRec = function (_IS) {
		return (this.name +_IS+ this.imageURL +_IS+ this.targetURL +_IS+ this.openIn+this.display);
	}
	this.fromRec = function (ret, _IS) {
		var xxx = ret.split(_IS);
		this.name	= xxx[0];
		this.imageURL	= xxx[1];
		this.targetURL	= xxx[2];
		this.openIn	= xxx[3].charAt(0);
		this.display    = (xxx[3].charAt(1) != HIDE_ENTRY)?SHOW_ENTRY:HIDE_ENTRY;
	}
	this.getHTML = function (_TP, _vID) {				// _TP = text/picture; _vID = village ID
		if (this.display == HIDE_ENTRY) return ("");
		if (this.itIsBR()) return ("<br /><br />");
		else return ('<div class="quickentry"><table cellspacing="0" cellpadding="0"><tr>' +
			     ((_TP != ONLY_TEXT)?'<td class="quickico"><a href="game.php?village=' + _vID + '&s=' + this.targetURL + '"' + ((this.openIn == NEW_WINDOW)?' target="_blank"':'') + '><img src="' + this.getImageURL(emptyIcon) + '" alt="' + this.name + '" title="' + this.name + '" /></a></td>':'') +
			     ((_TP != ONLY_ICON)?'<td><a class="txt" href="game.php?village=' + _vID + '&s=' + this.targetURL + '"' + ((this.openIn == NEW_WINDOW)?' target="_blank"':'') + '>' + this.name + '</a></td>':'') +
			     '</tr></table></div>');
	}
	this.getDemoHTML = function (_TP) {				// _TP = text/picture
		if (this.itIsBR()) return ("<br /><br />");
		else return ('<div class="quickentry"><table cellspacing="0" cellpadding="0"><tr>' +
			     ((_TP != ONLY_TEXT)?'<td class="quickico"><img src="' + this.getImageURL(emptyIcon) + '" alt="' + this.name + '" title="' + this.name + '" /></td>':'') +
			     ((_TP != ONLY_ICON)?'<td><div class="txt">' + this.name + '</div></td>':'') +
			     '</tr></table></div>');
	}
	this.itIsBR = function () {
		return (this.name == "");
	}
	this.getImageURL = function (_EI) {
		return ((this.imageURL != "")?this.imageURL:_EI);
	}
}

function tQuickMenu (_label, _RS, _IS, _TP) {				// list of menu items
	this.Items = new Array();
	this.label = _label;
	this.recordSeparator = _RS;
	this.itemSeparator = _IS;
	this.iconOrText = ((_TP == ONLY_TEXT) || (_TP == ONLY_ICON))?_TP:ICON_AND_TEXT;
	this.hideIt = false;
	this.showCustomising = true;
	this.forceQuickMenu = false;					// if set, user's quick menu will be used even under Premium Account
	this.forceLanguage = false;
	this.forcedLanguage = fNOTHING;					// acronym of language (or fNOTHING for automatic)

	this.putItem = function (_N, _I, _T, _W) {
		var i = new tMenuItem(_N, _I, _T, _W);
		this.Items.push(i);
	}
	this.putItemStr = function (_str) {
		var i = new tMenuItem("", "", "", SAME_WINDOW);		// create "empty" item
		i.fromRec(_str, this.itemSeparator);
		this.Items.push(i);
	}
	this.putItemObj = function (_O) {				// append prepared object to the list
		this.Items.push(_O);
	}
	this.removeItem = function (num) {
		if ((num > -1) && (num < this.Items.length))
			this.Items.splice(num, 1);			// remove num-th item
	}
	this.removeMenu = function () {
		this.Items.splice(0, this.Items.length);		// remove all items
		GM_deleteValue(this.label);				// delete menu items
	}
	this.moveItemUp = function (num) {
		if ((num > 0) && (num < this.Items.length)) {
			var i = new tMenuItem(this.Items[num].name, this.Items[num].imageURL, this.Items[num].targetURL, this.Items[num].openIn);
			this.Items.splice(num, 1);			// remove num-th item
			this.Items.splice(num-1, 0, i);			// insert it
		}
	}
	this.moveItemDown = function (num) {
		if ((num > -1) && (num < this.Items.length-1)) {
			var i = new tMenuItem(this.Items[num].name, this.Items[num].imageURL, this.Items[num].targetURL, this.Items[num].openIn);
			this.Items.splice(num, 1);			// remove num-th item
			this.Items.splice(num+1, 0, i);			// insert it
		}
	}
	this.replaceItem = function (num, _str) {
		if ((num > -1) && (num < this.Items.length-1)) {
			var i = new tMenuItem("", "", "", SAME_WINDOW);	// create "empty" item
			i.fromRec(_str, this.itemSeparator);
			this.Items.splice(num, 1, i);			// remove num-th item and insert modified one
		}
	}
	this.replaceItemObj = function (num, _O) {
		if ((num > -1) && (num < this.Items.length-1)) {
			this.Items.splice(num, 1, _O);			// remove num-th item and insert modified one
		}
	}
	this.readItems = function () {
		var qMenu = GM_getValue(this.label, "");		// read menu items
		if (qMenu != "") {
			var firstItem = 1;
			this.forceLanguage = false;
			qMenu = qMenu.split(this.recordSeparator);
			this.hideIt = qMenu[0].charAt(0) == fHIDE_QUICK_MENU;
			this.showCustomising = qMenu[0].charAt(1) == fSHOW_CUSTOMIZE;
			if (qMenu[0].length > 2) this.iconOrText = qMenu[0].charAt(2);
			if (qMenu[0].length > 3) this.forceQuickMenu = qMenu[0].charAt(3) == fFORCE_QUICK_MENU;
			if (qMenu[0].length > 4) {
				this.forceLanguage = qMenu[0].charAt(4) == fFORCE_LANGUAGE;
				if (this.forceLanguage) this.forcedLanguage = qMenu[firstItem++];
			}
			for (var i = firstItem; i < qMenu.length; i++)	// insert to array
				this.putItemStr(qMenu[i]);
		}
	}
	this.saveItems = function () {
		var txt = ((this.hideIt)?fHIDE_QUICK_MENU:fNOTHING) +
			  ((this.showCustomising)?fSHOW_CUSTOMIZE:fNOTHING) +
			    this.iconOrText +
			  ((this.forceQuickMenu)?fFORCE_QUICK_MENU:fNOTHING) +
			  ((this.forceLanguage)?fFORCE_LANGUAGE:fNOTHING);
		if (this.forceLanguage) txt += this.recordSeparator + this.forcedLanguage;
		for (var i = 0; i < this.Items.length; i++)		// create text
			txt += this.recordSeparator + this.Items[i].getRec(this.itemSeparator);
		GM_setValue(this.label, txt);				// write menu
	}
	this.isFilled = function () {
		return (this.Items.length > 0);
	}
	this.hideMenu = function () {
		return (this.hideIt);
	}
	this.forceMenu = function () {
		return (this.forceQuickMenu);
	}
	this.resetToDefaults = function () {
		if (this.Items.length > 0) this.Items.splice(0, this.Items.length);	// remove all items

		for (var i = 0; i < 11; i++) {
			if (i < itemsTemplates.length) this.putItem(itemsTemplates[i][0], itemsTemplates[i][1], itemsTemplates[i][2], SAME_WINDOW);
			else break;
		}
	}
	this.showHideItem = function (num) {
		if ((num > -1) && (num < this.Items.length))
			this.Items[num].display = ((this.Items[num].display == HIDE_ENTRY)?SHOW_ENTRY:HIDE_ENTRY);
	}
	this.setLanguage = function (lang) {				// lang: acronym of language
		if (lang == "") lang = fNOTHING;
		this.forcedLanguage = lang;
		this.forceLanguage = (this.forcedLanguage != fNOTHING);
	}
}

function itemTemplate () {						// "templates" for easy adding
	this.name = "";
	this.imageURL = "";
	this.targetURL = "";
}

var imgPath = "http://" + window.location.host + "/img/shortcut/";
var itemsTemplates = new Array();					// definion is bellow, because it need to know "text"

// TRANSLATIONS ***********************************************************************************************************
var texty = {
	en: {	languageName		: "English",			// thanks to me :)
		editFastList: {
			editFastList	: "Edit fast list",
			addNewEntry	: "Add new entry",
			addLineBreak	: "Add line break",
			hideQuickMenu	: "Hide quick start task bar",
			showQuickMenu	: "Show quick start task bar",
			link		: "Link",
			editItem	: "Edit",
			cloneItem	: "Clone",
			showItem	: "Show entry",
			hideItem	: "Hide entry",
			deleteItem	: "Delete",
			moveItemUp	: "Move up",
			moveItemDown	: "Move down",
			resetQuickMenu	: "Reset quick menu",
			createQuickMenu	: "Create quick menu",
			removeQuickMenu	: "Remove quick menu",
		},
		defaultName: {
			overviews	: "Overviews",
			settlementView	: "Estate",
			map		: "Map",
			castle		: "Castle",
			barracks	: "Barracks",
			warehouse	: "Stock",
			market		: "Market",
			donkeyStable	: "Stable",
			goldsmith	: "Smith",
			residence	: "Count",
			profile		: "Player",
			stone		: "Quarry",
			wood		: "Sawmill",
			iron		: "Ore Mine",
			hideout		: "Hideout",
			miller		: "Miller",
			townWall	: "Town Wall",
			alchemist	: "Alchemist",
			writeMessage	: "New message",
			writeCircular	: "Circular",
		},
		editEntry: {
			editEntry	: "Edit entry",
			name		: "Name:",
			imageURL	: "Image URL:",
			targetURL	: "Target URL:",
			newWindow	: "Open in new window:",
			buttonOK	: "OK",
			illegalChars	: "Don't use following characters:",
			predefinedEntry	: "you can select predefined entry",
		},
		customize		: "Customize",
		options: {
			legend		: "Quick menu options",
			iconsAndTexts	: "Display icons and texts",
			onlyTexts	: "Display only texts",
			onlyIcons	: "Display only icons",
			customize	: "Display link to this page",
			apply		: "Apply options",
			forceQuickMenu	: "Use Quick Menu instead of Premium feature",
			checkForUpdate	: "Check for update",
			language	: "Language",
			automaticLang	: "set automatically",
		},
	},
	sk: {	languageName		: "Slovenčina",			// thanks to me again :D
		editFastList: {
			editFastList	: "Upraviť rýchly zoznam",
			addNewEntry	: "Pridať novú položku",
			addLineBreak	: "Pridať zlom riadku",
			hideQuickMenu	: "Skryť panel rýchleho zoznamu",
			showQuickMenu	: "Zobraziť panel rýchleho zoznamu",
			link		: "Odkaz",
			editItem	: "Upraviť",
			cloneItem	: "Klonovať",
			showItem	: "Zobraziť položku",
			hideItem	: "Skryť položku",
			deleteItem	: "Zmazať",
			moveItemUp	: "Posunúť nahor",
			moveItemDown	: "Posunúť nadol",
			resetQuickMenu	: "Obnoviť rýchly zoznam",
			createQuickMenu	: "Vytvoriť rýchly zoznam",
			removeQuickMenu	: "Odstrániť rýchly zoznam",
		},
		defaultName: {
			overviews	: "Prehľady",
			settlementView	: "Osada",
			map		: "Mapa",
			castle		: "Hrad",
			barracks	: "Kasárne",
			warehouse	: "Sklad",
			market		: "Trh",
			donkeyStable	: "Stajne",
			goldsmith	: "Zlatník",
			residence	: "Rezidencia",
			profile		: "Hráč",
			stone		: "Kameňolom",
			wood		: "Píla",
			iron		: "Železná baňa",
			hideout		: "Úkryt",
			miller		: "Mlyn",
			townWall	: "Múr",
			alchemist	: "Alchymista",
			writeMessage	: "Nová správa",
			writeCircular	: "Obežník",
		},
		editEntry: {
			editEntry	: "Upraviť položku",
			name		: "Názov:",
			imageURL	: "URL k obrázku:",
			targetURL	: "URL cieľovej stránky:",
			newWindow	: "Otvoriť v novom okne:",
			buttonOK	: "OK",
			illegalChars	: "Nepoužívaj nasledovné znaky:",
			predefinedEntry	: "môžeš si vybrať preddefinovanú položku",
		},
		customize		: "Prispôsobiť",
		options: {
			legend		: "Nastavenia rýchleho zoznamu",
			iconsAndTexts	: "Zobraziť ikony a texty",
			onlyTexts	: "Zobraziť len texty",
			onlyIcons	: "Zobraziť len ikony",
			customize	: "Zobraziť odkaz na túto stránku",
			apply		: "Aplikovať nastavenia",
			forceQuickMenu	: "Použiť Quick Menu namiesto funkcie Prémium konta",
			checkForUpdate	: "Skontrolovať aktualizácie",
			language	: "Jazyk",
			automaticLang	: "nastaviť automaticky",
		},
	},
	de: {	languageName		: "Deutsch",			// thanks to Andreas aka seandre@gmx.de
		editFastList: {
			editFastList	: "Bearbeiten schnelle Liste",
			addNewEntry	: "Neuer Eintrag",
			addLineBreak	: "Zeilenumbruch hinzufügen",
			hideQuickMenu	: "Ausblenden Schnellstart-Taskleiste",
			showQuickMenu	: "Einblenden Schnellstart-Taskleiste",
			link		: "Verbindung",
			editItem	: "Bearbeiten",
			cloneItem	: "Verdoppeln",
			showItem	: "Einblenden Eintrag",
			hideItem	: "Ausblenden Eintrag",
			deleteItem	: "Löschen",
			moveItemUp	: "Nach oben",
			moveItemDown	: "Nach unten",
			resetQuickMenu	: "Zurücksetzen Schnell Menu",
			createQuickMenu	: "Erstellen Schnell Menu",
			removeQuickMenu	: "Entfernen Schnell Menu",
		},
		defaultName: {
			overviews	: "Überblick",
			settlementView	: "Nachlass",
			map		: "Karte",
			castle		: "Burg",
			barracks	: "Kaserne",
			warehouse	: "Lader",
			market		: "Markt",
			donkeyStable	: "Stall",
			goldsmith	: "Schmiede",
			residence	: "zählen",
			profile		: "Spieler",
			stone		: "Steinbruch",
			wood		: "Sägewerk",
			iron		: "Erz Mine",
			hideout		: "Versteck",
			miller		: "Müller",
			townWall	: "Stadtmauer",
			alchemist	: "Alchemist",
			writeMessage	: "Neue Nachricht",
			writeCircular	: "Rundschreiben",
		},
		editEntry: {
			editEntry	: "Eintrag bearbeiten",
			name		: "Name:",
			imageURL	: "Bild URL:",
			targetURL	: "Ziehl URL:",
			newWindow	: "Öffne ein neues Fenster:",
			buttonOK	: "OK",
			illegalChars	: "Verwenden Sie keine folgenden Zeichen:",
			predefinedEntry	: "Sie können vordefinierte Eintrag auswählen",
		},
		customize		: "anpassen",
		options: {
			legend		: "Schnell Menü Einstellungen",
			iconsAndTexts	: "Anzeigen von Symbole und Texte",
			onlyTexts	: "Anzeigen nur Texte",
			onlyIcons	: "Anzeigen nur Symbole",
			customize	: "Anzeigen Link zu dieser Seite",
			apply		: "Übernehmen Einstellungen",
			forceQuickMenu	: "Schnell Menü verwenden anstelle von Premium Zusätze",
			checkForUpdate	: "Prüfe auf Update",
			language	: "Sprachauswahl",
			automaticLang	: "Sprachauswahl Automatisch",
		},
	},
}
var text = new legend(window.location.hostname, texty);

// PICTURES ***************************************************************************************************************
var arrowDown	= "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%02%00%00%01%E7%96X%A0%00%00%00%06tRNS%00%FF%00%FF%00%FF7X%1B%7D%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD~%FC%00%00%00%09tEXtComment%00%00%89*%8D%06%00%00%01oIDATx%9Cc%F8%FF%FF%3F%03%10%00)%CFi%0F%40%14H%C0%BE%EB6%83%CB%5C%10O%3A%FD%90%7C%CDU%90%18%08%A7%BFD%E20%40%F5%81%B0f%F3M(G%A6%E0l%E0%DC%A7%82%D1%5B\'O%9E%0C%128%F6%E4%3FB%19%100%3A-%07!%EB%99%10Q%84a%9A%A5g%2C%7B%EF%1Bt%DCE1%98!%F6%E1%96%5B%FF%B2%D7%BDO%5C%FE%9A%2Bz%17%8AQ%20V%EEC%B89%08%09%06%18%40%97%60%F5X%0D%B4%19%DDr%20H_%F9B%BE%F1%0E%AB%CFrtW5%EE%FA%00t%95%40%F8Z%84%AB%18%E2%0F(%17%9F%03%3A%09%E8O%A5%A4%D5%FC%B1%7B%18%D8%05%A1%3A%D8RO%D7%EE%FA%9A%B6%1A%E4%5C%06i%3B%14%3B4%1A%EE%CE9%FF%9FA%2F%13%DDU%20V%CA%E5%FFH%80%01%85%83%03%E0%D4%00%8C3%EFy%20%FFH%D6%DE%16%AE%B8%0A%F1%15%3E%0DJy\'%8A7%BD%01%06%BD%5E%DB%5D%60L%F2%85%AC%C4%AE%01n50%AE%FA%0F~v%9F%F6%C4e%EA%13%C7%89%0F%E0%C1%83%EC6h%EC%01C%04%18%81S%8E%FF%80%04J%D4%A2%97%C0%60%03%A1%85oX%03%D61%F0i%A3G%05%88%15%F7L%A4%F0%D2%FE%87%FF%81aY%B4%F9K%E5%F6%AF%22Y\'%18%94%82%F0%F9%01%C4%CF%7D%07%F4w%C0%9C%D7%0C%8E%13%D0%94b%D7%00%01b%81%B3%B0%8A%03%01%00%91R%F4%C2%AD%AE%A0%D4%00%00%00%00IEND%AEB%60%82";
var arrowUp	= "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%02%00%00%01%E7%96X%A0%00%00%00%06tRNS%00%FF%00%FF%00%FF7X%1B%7D%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD~%FC%00%00%00%09tEXtComment%00%00%89*%8D%06%00%00%01xIDATx%9Cc%F8%0F%06%0C%40%EC8%F1%01%03%94%A7Yz%86%01%08%80L%91%C2K%95%DB%BFBUH%A7%1F%12%AE%B8%0A%E5%C0%01%88S%BB%EB%2B%83R%10%88%03%04%EE%D3%9E0%40%00P%40%BE%F1%0E%84%81%D0%E3%3D%EF%05%83%E3%04%14%FDl%A9%A7%A7%1C%FF%91%B8%FCu%E0%DC%A7%81%0B%DF0%F0i%23t(%E5%9D0%E8%B8%AB%D9%7C%13b%0EB%82%01%09%A0H%00%81X%E0%2Ct7%82%A8%DCw%01s%5E%C3%95C%25%18%E2%9E%ED%7F%F8%BFh%F3%17%91%AC%13%08%A3%18b%1Fn%B9%F5%2Fm%F5%FB%A8E%2F%81%AEb%0DX%07%F5%07%04%F4%1F%FC%EC2%F5%89%40%F8Z%B8%FDP%8D%C5%9B%DE%E8%B5%DD%E5%0BY%89%EE*%A0%B7%25ko%B3%FA%2C\'%C5%1F%08%87%E6%3EdH%B9%8C%ECt%2C%FE%83r%D2_j4%DC%3D%F6%E4%FF%9C%F3%FF%E5k%AE2%E8ebj%83Y%14%FB%10%18%F4%40%7F%02%230%7B%DD%7B%A0o%81q%00D%5C%D1%BB%18%A4%ED0%02*%FE%80L%C1Y%E5%E2s%F6%5D%B7%81%AAAq5%F7%A9%E7%B4%07JI%AB%05%A3%B7%F2%C7%EEap%99%CB%C0.8y%F2dt%CF%01%13T%E3%AE%0F%96%BD%F7%81%08%18%99%F0%60%C3%E9i%60RK_%F9%02%18%E9%C0%F4%03%F4%03%24%D4%D0%BC%81%C2atZ%CE%EA%B1%1AH2Z%CF%84%20%02%1A%FE%A3%06%3C%A6j%20%00%00%E2%26%F4%C2Q!z%E2%00%00%00%00IEND%AEB%60%82";
var customize	= "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%12%00%00%00%12%08%02%00%00%01%AE%AB)%96%00%00%00%06tRNS%00%FF%00%FF%00%00%1AZ%F4%F0%00%00%00%09pHYs%00%00%0E%C3%00%00%0E%C3%01%C7o%A8d%00%00%00%09tEXtComment%00%00%89*%8D%06%00%00%01%B4IDATx%9C%9D%92mO%82P%14%C7%FD%7C%BD%EA%93%B8V%2Fr%D6%A6%AB%7C%CA%B9%26%86%A2%98sH%EA%B2%07C3%C8%8A%00M%5E%90.%86%D3%A5%D8%E6%0C%92%8A%3E%82%E1t%19D%D6%DA%CE%E5%1E%CE%FF%FE%CE%E5p%8Ee4%B2Ll%BC%FC%D9%F6%D4%9B%C5%A6%9B%C7%E3%B6%2C%AC%DF%EB%E4t%1A%D9%DE%F6%8D%3D%F4j%B8%BA%D7%D3A%BA%97%C1%60%10%08%04%C6%1E%8C%CB%C5b1%04%ECXB%98%14%2BI%D3cVP02%9F%16%8F%C3%AA%AA%9Ak%82%20%94%CBe%8A%A2vC%C1i%08*Iir%88%B1%AF%F68%AF%CB%89%B1o%91%82%B4%0C%F7%0C9%8C9%E7iZ!%20%08%9Ah%10%14i4%1A%E3%7F%E8%F7%1B5%00%00X%96%25%08%82a%98%99vZ%E9F%CE%24%9E%E7%BD%5E%AF%CB%B55%CByBw%2F%EA*r%F9%ECL%3D%EA%BE%E5%90z8%E7%D4%10%F6t%C8(ND%D0i%D6p'v.%1F%D0%CAZ%82%1F%7D%AFaq%A3i%83%8D%C2%2F%B5O%2C%9B%DD%87%E1X4%0A%FD%15%CBd%D0~%BF%2F%CB2%8E%E3Z%E5%7F%C5%C2%E1%B0(%8A%95J%05E%93)%24%91%CB%E5Z%AD%966u%E6X%E1V%8Cbm%00%08%D6j5%8E%E3%B4g%B5Z%A5i%9A%24I%B7%DBer%5B%9E%E9%C2%25%A9%DCx'%EA%AA%FF%A8o%8F%F1%3E%9Fo%5E%CB%8Fo%3A%DA%B4%10w*z%3D%04%0BOq%5C%3E%AA%BE%D8%12%BD%CDT%F3G%CC%96%10K%DC%9B%D6%B9%60~%10%3D%93r%B4%B2%02%F7%1CI%C1%14%98a%0E%A4%AD%B5%FA%80R2%A4%B2%04u%BF%CE%ED%3C%EC%1F%F6%01%86%9C%93%24%FA%24%87%CB%00%00%00UIDATx%9Cm%8F%5B%16%00!%08B%D9%FF%A6%EF%1C%DFVc%1F%26%24%90%00%F9%B1n%17%E5%60%DD%91d%7C%B6%C2%F1%20%E6%09%CD%25%1B%BDX%DE%0D%95o%ECh%24J%A4%0D%9BJe.e%CAM%1B%F8%85%EA%7Fk%5E%89%C6%86%0Et%40%170%D0%CE%C2S%1F%CFd%D2.%FB1%B1%F1%00%00%00%00IEND%AEB%60%82";
var cloning	= "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%11%00%00%00%11%08%02%00%00%01%C3%08%E0%3B%00%00%00%06tRNS%00%FF%00%FF%00%00%1AZ%F4%F0%00%00%00%09pHYs%00%00%0E%C3%00%00%0E%C3%01%C7o%A8d%00%00%00%09tEXtComment%00%00%89*%8D%06%00%00%00%F1IDATx%9C%85P%BD%0A%82P%14%F6%A5z%95Z%22%A3%AD%97h%0B%A7%20%0A%E7%DE%A0%C15A%A2F%A1%02-%1A%0C%87%86%06%2B%08*p9%9D%DB%D1%FB%A7%17%E5C%3D%E7%FB%B9%E7%5C%0B%C0%22%D0%07%F8%9F%E8Y%D6p%B1r%FCXm%A22%BD%97r%14%90W%B1%8Bbs%BE%02%F7%88%02C%CD%1E%C2%5Bz%0ANna%D6%3FD%CC%0D4%2C(%8F%D8N%B4%EA%CF%AB'%06%EE%91%1F%D9%EA8%82%08%A2G%10%A7%23%2F%C4%BD%18%A1%09%91%98n%13F%F4%E7%91%EDz%5C(%88%EE%24%24%82j%1A%8E%11%ED%F1Z%25%CA%A9%90%E0%5B(D%F3%1E2pT%82%3D%3B%C8%A0H%A3'%CFs%5CA%06%1F%A3!%F5%F5%85K%C6%90d%15%8F)%F5%F9%81%D3%AD%80%E2%E9M%F7XS%9E%96j%F4%D0%C5qNV%2C%FD%1D%BEe4%7B%8Cw%AD%25i%A9U%FC%00%BE%7Ck%A3%9B%DC%E2L%00%00%00BIDATx%9Cc%F8%FF%FF%3F%03%18%82%E8%FF%0C%40%00e%80%04!l%B8%0C%04%20%C4%A0%EA%19%60%92%18%2C%B8%3A%18%03f%02%92q%F8%00%8A%0Eds%FE%23%1B%81U%04%DD%24%8AE%E0%B6%A3%8B%00%00.lo%916%A9%B3%8B%00%00%00%00IEND%AEB%60%82";
var emptyIcon	= "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%02%00%00%01%E7%96X%A0%00%00%00%06tRNS%00%FF%00%FF%00%FF7X%1B%7D%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD~%FC%00%00%00%09tEXtComment%00%00%89*%8D%06%00%00%00%19IDATx%9Cc%F8%0F%06%0Cx(ZpF%25%C8%93%18%D5%40W%0D%00%81L%FD%1F%D5r%D3%1A%00%00%00%00IEND%AEB%60%82";
var hideIcon	= "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%11%08%02%00%00%01%2C%CA%8B%05%00%00%00%06tRNS%00%FF%00%FF%00%FF7X%1B%7D%00%00%00%09pHYs%00%00%0E%C3%00%00%0E%C3%01%C7o%A8d%00%00%00%09tEXtComment%00%00%89*%8D%06%00%00%02IIDATx%9C%85Q%EDKSa%14%DF%D7%FE%00%FF%0A%23%FA%10TP1j%F6!%23%FDRX%04%830FV%92%BDa%88%23%A5e.%AC%60%2B%85%24%DCp%8C%88%22%9BYMb1%8Bm%3A%1367E%E7%5E%AE%BB%DB%DC%BD%EE%DE%DDm%F7%EDyY%BB%B5%98S%A3%C3%F3p8%E7%F7%3B%CF9%E7%F7%A8%CA%BFMU%B9%A5%A8NU%8B%14'%24%EEb%1C%D9%92D%E2j%19Ke%B4%A9%04Tr%E5%B1%FE%40%8D%5E%A5%89%EB%0E%0CY%C4%07%A8o%03*%C6k%E4%13%B7S%86%3D%A9%89n%85f5%DF%3Bw%7C%EF%8E%9A%3FNLN%C1%C2%12%16%091%F61%FB%F9%EA%DF%9E%7C%0C%F2%F3%B0%18%04%F9Y%C0%7D%11%C8%AE%E5G%FB%15%00pd!h%E3%13%B7%F8x%17mm%0E%DFo%AC%7B%D79%3D%ED%F7%CF_k%3F_%D7c%A7)%80%98%9E%01%B4%07%09%09%C8.o%3A%3B%40!%AD%00R%C6%83e%12%CB%C9%CA%CE%182%20%EF%C8~%E8P%80%DC%8F%5EX%F2%22!%0C%B9%05%C8%CE%88%D9%E7%A8H(%4012%85!%9D%1D%D9%A7L%95%B8Y%085%91%AF%3B%AB%3D2%13%3A%F6m%7B%25%CB%C7o0%EE%97%C5%98%B76%D5%8B%FE%CB%C3%83%87%EF%5C%D7%E6%D2%D1%BAq%CDC%7D%D9%2C%F5j%CC%BA%5D%AB%DD%F7%D8jB%CA%C5%AF%D9%F3%01%13%EB%7F%C0z%F4%AC%EF!%1Fw%EER%C0%13%932%E5F%12%81%A48%12B%88_%80E%1F%2Cz%90%14%C62%C5%CD%3E%25%ED-H%E2%AA%05%5C%C0%04%98%00%96V%91%14%C3%80%C60WQF9%80%C2R%1C%E4%3F%81%BC%5D%24%E7%D6%CCG%AB%05%B9%EF%BD%D2%86%0FI%8B%C2z%8FH%1A%98%F7ZfR%C78.%D1%B6f!%D9W%8A%B4%C9%D4%A0%40%CC%AD%0C%1D%AA%8DD%BB%F4%85%C5q%2CG%A8%B1%83%8A%92%C9%2B%25%E2b%E5%973%CF%1AP%C9%95%FF%F9f%A9%BF%11%146%EA%96%96Y%22%F1%AE35%DA%24%7C%3D%85R'%11%A9%06%EE%D6hOCp%E0%88%90%5E%FC%A7JFC%B7e%DCf%B1%D8%87GF%8DOL%DA%B6%D6%FF%C8JF%83%17%CE%9E%D1hN%A8%D5%C7ZNk%A2!%EF6%C2%2FJ%B5%BE%CD%2F%5DiQ%00%00%00GIDATx%9C%7DN%81%0D%00%20%08%F2%FF%A7)%85%16e%AB%B9d%88H%00%81%88%FCg%23%A8%9E%05%90%D4%DB%9Chi5%13S3PH%F1%A1x%03%5B_)h%E3%3E%16%C7S4%97%1F%D1V%9C%B9%AE%B4%B3%05%07%84%40m%93*%C0(%19%00%00%00%00IEND%AEB%60%82";
var showIcon	= "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%11%08%00%00%00%01%86%C3C%8E%00%00%00%02tRNS%00%FF%5B%91%22%B5%00%00%00%09pHYs%00%00%0E%C3%00%00%0E%C3%01%C7o%A8d%00%00%00%09tEXtComment%00%00%89*%8D%06%00%00%00%FBIDATx%9Cc%F8%FF%9F%E1%FFM%06%10%F9%9F%E1%CE%2F0%E3%DB%DF%3F%0C%FF%9FV%81%84%80%DC'%BF%BF%1Cg8%7Bg%EAn%86%FFS%5D%A1b%FF%FF%3F%FD%F4%FD%D1~%20%E3%EB%E7%CF%1F%DE%DF%9B%0E%14%B9q%E7%F6%FA%89%60%F9%5DgR%FFC%14B%14%BFx%F3%ED%E3A%20%E3%E5%CF%9F%7F%7F%BF%DD%FD%9F%E1%D4%A7%AF%1F%DF%3F%FD%F2%9F%E1%FE%EFew%EE%9C%DF%0AT%B3k%E7%9D%DB%A7%1F%83t%B5%B6%E6%BD%00k%EF%7D5%FF%3F%8A9%20%F0%FC%FE%D5%F3g%CE%3D%82%0A%3C~%FD%FD%FB%D7%2F%9F%3E~%FBya%03H%E0%EA%FB%EF%DF%7F%FD%FE%FD%FB%D7%8Fwo%5E%2C%04%0A%9C%7C%F5%ED%DE%C3%5D%FB%F6l%BC%7F%ED%E9%B3%D9%20-%C7n%FCXs%E7%EE%AD%DB%F3%3E%5D%9D%045t%DB%CACwn%1F%EF%9B%F6%12nK%EB%E2%853z%23%91%AC%BD%1F%EAl%EFs%0D%CC%04%00_%93%F1d%AD%9Af%5C%00%00%00KIDATx%9CeO%81%0D%00%20%08%F2%FF%A7)%85)VsI%0C%91%02%08D%E4%7D%1BA%F5%2C%80%A4%CEp%A2%A5%D5%9C%98B%A0%90b%17%D0%E6%03h%D0)h%E3%3E%16%C7SL%82%F5%5E%F1%B6%BD%8F%F8%17%9F-%DF%DA%82%07%FF%E0r%8E%8F%11%1B%F7%00%00%00%00IEND%AEB%60%82";
var newMessage	= "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%02%00%00%01%E7%96X%A0%00%00%00%06tRNS%00%FF%00%FF%00%00%1AZ%F4%F0%00%00%00%09pHYs%00%00%0E%C3%00%00%0E%C3%01%C7o%A8d%00%00%00%09tEXtComment%00%00%89*%8D%06%00%00%02%90IDATx%9C%7D%91%CBO%13Q%14%C6gi%24!%26.%5C%BA%22%18%C5%85lX%18d%E3J%FE%007R%5BJK)%20%0D%0F%01Q%10%82%16!5X%10%08%84%04%25%01kl%D0%88%22X%C4%B6P*%A5%D8RH%1F%3C%24%A4J%3Bm%A73%BD%9D%E9%B4%84%D6s%ED%E8%D2%9B%B38'%DF%FD%DD%F3%9Ds%09%A3y%D1%B0%F4%89%18%1D%1F%3E%1A*%26%205%2C%CD%11!*%94%C9d%88%F7%1Fg%18%C4%D0%B1h%7C%2C%8F%E8%EA%EEX%B7%DBl%7D%97%B0%F2%E7%1E%BE%0A9%81%E21%06%D1%D4%97n%5C%90%112%12%0D%FB%3B%CE%E0bk%7Bkw%A1%CB%E1t%E0b%DE%F0!%99J%26%93%7C%82Op%09.%CE%A2%40%FF%95M%E5YbZ7%19%A2H2%12%84%08%86%03%E1%D1%AB%9E%D6%8B%98x%DA%DFG%D1%14%F4G%94%9F%9D.1%F5%DCLg%D2Xhl%AE%87%0CB!%BA%E1v%BB!I%A5RX%F8%BC4%F7%D7%9A%60%F0%ABy%11%0B%60%1A%9A%F3%B89%C7%26%D8%98K%17%1D%CA%C7%02%B01%C4%C0%98L%8C%86N%E4%F3%22%7BE%8E%20d-%91%E1%20%A9%2B%0Bk%CE%0D%8Dh%FF%09d8%1A%8ADC%F4D%B1OS%DA%ABQ%0BB%94%A1%60%15%FE%9E%0B%BE%FA%9C%FD%83%FD%F6%87m%82%B0%B6%BE%E6%F5y%BDod%0BZ9%CB%B1%0D%8D*%2C%80%A5%EC%1C%86%D9W%08!0Y%DF%A4%12vu%92%3E%C9%FC%EF%A4i%BDhG%5Dxd%99%12%00x%C6%B7%EB%B3o%D8%3D%5E%0F%CB%C5%E3%10%2CB%2C%3A%0A%FC%3A%3C%F0%06%B5%85%F1%A9%92%BD%E6%DC%1F%2Fj1%A0%7F%AB%03%C0%B5%BD%F9m%CD%9A%0D%2B%8EU%A7%CB%11%F1%BB~%3E%C9%E7__%F3%D4%E5%CE%A8%25p%1B%03%13%93%E3%00%D8%EC6%D3%B2%D1%B4l2%AF%40%98%CD%16%F3%F7%F9%B1%C3%C7yI%5D%91K~%1A%EDX%FA%074%0208%FC%0C%80%CD-%A7%C5%BA%B2j%85%87%9D%B0_ju%D4%DFw9%F1%B2%C0!%3D%15%D8s%C2%1C%DD%EAN%01%E8%E9%7D%04%00%7C%05%7C%08%F8%86%01%0E%E7%1E%B8G%AE%D3%83%E7%ED%15%B9%B3%EF%F4%81%60%00%80%96%7BM%02%D0%D6%DE%0A%00L%09%E3r%3C%C7%F3%FC%DD%CA%D2%81%EA%82%F9%C9N%A3%D1%C80%CC%F1%F11%005uJ%01hji%A8UU%D7%DC%A9R%D6*%AA%AA%E5%95J%99L..%AF%10K%A4%22%89%F4%B6%B8%BCL%24%BE%A5P%CAZ%EF7g%81%DF%C3r%3F%3A%5E%03%AAr%00%00%00%00IEND%AEB%60%82";
var newCircular	= "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%02%00%00%01%E7%96X%A0%00%00%00%06tRNS%00%FF%00%FF%00%00%1AZ%F4%F0%00%00%00%09pHYs%00%00%0E%C3%00%00%0E%C3%01%C7o%A8d%00%00%00%09tEXtComment%00%00%89*%8D%06%00%00%02%B2IDATx%9CU%92%C9OSQ%14%87_%60c%24%01%93%92%B84%22%04%A3%B8%90%0D%0B%83l%5C%C9%1F%E0Fj%19Z%A0%80%10%06%A1%A2%20%04-Bj%909%25%24(%09X%23%02a%A8%D4%22%D4b%C1B%B5%03%A6-%93%D0TZ%3A%BF%BE%BEG%07%E9%F3%5C%FAXxsrsN~%E7%CB%19%EE%C5%14%CAE%F9%D2'L%3C%3C%60%EB%CF%C6%C0%95%2FI1%A7%C7I%D3463%3F%89%13%B8%CF%EF%0D%0C%A5a%ADm%CD%1B%9A%F5%F5%CE%EBH9%CDC%A9%E0c%01%CB%BE%FF%60%CF%F3%A5%0D%05%0E%B7%C3%EDuY%9B%2F%A0%60%F3%D7%E6%8E%ACU%AB%D3%A2%60A%3EG%A7%A6%86m%87%D1%D4%2B%D41%15%20%09%7B%D7M%3D%9F%85%8DKFORR%5C%3B%A6%BF)%97%8F%5Cv%97%F8%96Ip%0D%11%AF%BA%3A%3D%3E%0F%D4'%3CVr%3C%E7k%FB%BD(%1DEBm%7D5x%60%25%EC%BBF%A3%11%9Cp8%8C%84%CFK%D2%B3%D6%98%06%97%95%8BH%A0%15%8A%C8%CAJxE%19%92%CB%C8c%D2o%90x%FB%D3O%85%F88%3F%81%C3%98t%5C%1CTr%F4ei%8A%12b%C4%B2W%26%05%F3%CDL%3B%24y.%D1%C5%FE%C1n%24%405%18%D2%E5u%BA%BDN%DFH%F6%96(%B7C%24d%04%2F%EE%C1%09%9F%B5%FD%EAVu%C2%DE%FE%5E%D3%B3FFPo%A8%CD%5Bf%F3%07%AE%AC%9BGRdMm%15%12B%E1Pl%0E%F9%EC%3B%82%20%60%B3%D5uU%CC%AEN%A2'%D04%9D%9CL%C7%C7%A3%1B%FC%FFN%D47%C1%DE%16f%DATcg%CBMf%1D%CC%CFi~hLf%13I%05%A8%0D5%CDb%11%24a%B3%1FZ%F6%CDG%DD%99%81%B1%9C%DD%FA%C4%DFo*%1001%25%01%60%7B%EA%E3w%F5Z%CC%F4%E3c%91%A4%24%9DA%EB%B6%1A%FE%BCL%0F%BE%BFm%AAL%9C%14%E6C6%02FF%87%A1Q%D3%90%18%92%60Wp%EB%FBz%95*%E5%CF%85!%CB%8B%B4%90%24%CB%C0%3BOl%AB%BAzD%0C%D0%3B%F0%1A%00%FD%A6N%B5%F6mumUg%D0%C1~%3D%ABbk%E7%8D%E3%B7%19%DA%C2s%F6%5D%1D%CC%D1%26la%80%F6%8E%E7%00%C0S%C0%83%40%DF%01*%60%91%3E5%0E%DE%F1%F5%5E%D2%14%25%CENO%D8%8F%EC%004%3C%AEc%80%C6%26%01%00%F0%91%D0%B8A*%18%0C%3E*%CE%ED)%CBX%18mQ(%148%8EG%22%11%00%CA%2B%F9%0CP%D7PSQUV%FE%B0%94_QRZ%C6%2B%E6s%B9%3CNA%11'%BF%90%9D_%F8%80S%90%C7%E6%DC%2F%E1s%05O%EAc%C0%3F%F1%99%1E%9F%9EUx%FF%00%00%00%00IEND%AEB%60%82";

// ************************************************************************************************************************
itemsTemplates[0]  = [text.getTranslation("defaultName.overviews"),		imgPath + "overview.png",	"overview_villages"];
itemsTemplates[1]  = [text.getTranslation("defaultName.settlementView"),	imgPath + "village.png",	"overview"];
itemsTemplates[2]  = [text.getTranslation("defaultName.map"),			imgPath + "map.png",		"map"];
itemsTemplates[3]  = [text.getTranslation("defaultName.castle"),		imgPath + "main.png",		"build_main"];
itemsTemplates[4]  = [text.getTranslation("defaultName.barracks"),		imgPath + "barracks.png",	"build_barracks"];
itemsTemplates[5]  = [text.getTranslation("defaultName.warehouse"),		imgPath + "storage.png",	"build_storage"];
itemsTemplates[6]  = [text.getTranslation("defaultName.market"),		imgPath + "market.png",		"build_market"];
itemsTemplates[7]  = [text.getTranslation("defaultName.donkeyStable"),		imgPath + "stable.png",		"build_stable"];
itemsTemplates[8]  = [text.getTranslation("defaultName.goldsmith"),		imgPath + "smith.png",		"build_smith"];
itemsTemplates[9]  = [text.getTranslation("defaultName.residence"),		imgPath + "snob.png",		"build_snob"];
itemsTemplates[10] = [text.getTranslation("defaultName.profile"),		imgPath + "profile.png",	"info_player"];

itemsTemplates[11] = [text.getTranslation("defaultName.stone"),			imgPath + "stone.png",		"build_stone"];
itemsTemplates[12] = [text.getTranslation("defaultName.wood"),			imgPath + "wood.png",		"build_wood"];
itemsTemplates[13] = [text.getTranslation("defaultName.iron"),			imgPath + "iron.png",		"build_iron"];
itemsTemplates[14] = [text.getTranslation("defaultName.hideout"),		imgPath + "hide.png",		"build_hide"];
itemsTemplates[15] = [text.getTranslation("defaultName.miller"),		imgPath + "farm.png",		"build_farm"];
itemsTemplates[16] = [text.getTranslation("defaultName.townWall"),		imgPath + "wall.png",		"build_wall"];
itemsTemplates[17] = [text.getTranslation("defaultName.alchemist"),		imgPath + "garage.png",		"build_garage"];
itemsTemplates[18] = [text.getTranslation("defaultName.writeMessage"),		newMessage,			"messages&m=new"];
itemsTemplates[19] = [text.getTranslation("defaultName.writeCircular"),		newCircular,			"messages&m=massmail"];

// ************************************************************************************************************************
function main() {

var myNode = window.location.href.toUpperCase();
var pNode, lastNode, tmpNode;

var qmLabel = window.location.hostname.toUpperCase();			// label for get/set/deleteValue
var qmActionLabel = qmLabel + " action";				// label for get/set/deleteValue

var editFlag = EF_NO_EDIT;

// initialize quick menu
quickMenu = new tQuickMenu (qmLabel, SPRTR, SPRTRx, ICON_AND_TEXT);
quickMenu.readItems();							// read quick menu
if (quickMenu.forceLanguage) text.setLanguage(quickMenu.forcedLanguage);// force language

if ((paramValue("TYPE", myNode) == "QUICKMENU") && (paramValue("M", myNode) == "SETTINGS") && (paramValue("S", myNode) == "PROFILE")) {
	if (premiumAccount()) {
		myNode = xpath(document, '//h2');			// search for "Edit fast list" header
		if (myNode.snapshotLength != 1) return;			// return if there isn't exactly one such node

		myNode = myNode.snapshotItem(0);
		pNode = myNode.parentNode;

		if (quickMenu.forceMenu()) {
			while (lastNode = myNode) {			// remove all nodes after (and including) header
				myNode = myNode.nextSibling;
				pNode.removeChild(lastNode);
			}
		}
		else {							// options' frame for Premium account
			lastNode = myNode.nextSibling;			// there's only one option: Force Quick Menu

			myNode = document.createElement("div");		// create div
			myNode.style.cssFloat = "right";		// set position
			myNode.style.margin = "0 20px 0 0";
			myNode.style.position = "relative";
			myNode.style.top = "70px";
			pNode.insertBefore(myNode, lastNode);
			var tmpNode = document.createElement("form");	// create form
			myNode.appendChild(tmpNode);			// insert it to div
			myNode = tmpNode;
			tmpNode.method = "post";
			tmpNode.action = window.location.href;
			tmpNode.name = FORM_NAME;
			tmpNode = document.createElement("fieldset");	// create fieldset
			myNode.appendChild(tmpNode);			// insert it to form
			myNode = tmpNode;
			tmpNode.style.padding = "10px";
			tmpNode.style.width = "380px";
			tmpNode.style.maxHeight = "155px";
			tmpNode = document.createElement("legend");	// create legend
			myNode.appendChild(tmpNode);			// insert it to fieldset
			tmpNode.innerHTML = " " + text.getTranslation("options.legend") + " ";

			// Use Quick Menu instead of Premium feature
			tmpNode = document.createElement("input");
			myNode.appendChild(tmpNode);
			tmpNode.type = "checkbox";
			tmpNode.value = "ON";
			tmpNode.id = tmpNode.name = I_FORCE_QUICK_MENU;
			tmpNode.checked = quickMenu.forceMenu();
			tmpNode = document.createTextNode(" " + text.getTranslation("options.forceQuickMenu"));
			myNode.appendChild(tmpNode);				// append it to fieldset
			tmpNode = document.createElement("br");			// create <br>
			myNode.appendChild(tmpNode);				// append it to fieldset

			// forceLanguage
			tmpNode = document.createElement("select");		// create select
			myNode.appendChild(tmpNode);				// append it to fieldset
			tmpNode.style.margin = "10 3 0 4";
			tmpNode.innerHTML = "<option" + ((quickMenu.forceLanguage)?"":" selected") + ">" + text.getTranslation("options.automaticLang") + "</option>";
			var languageSet = text.getLanguageList();
			for (var lng in languageSet)
				tmpNode.innerHTML += '<option value="' + lng + '"'+ ((quickMenu.forcedLanguage == lng)?" selected":"") + ">" + languageSet[lng] + "</option>";
			tmpNode.size = "1";
			tmpNode.id = tmpNode.name = I_FORCE_LANGUAGE;
			tmpNode = document.createTextNode(" " + text.getTranslation("options.language"));
			myNode.appendChild(tmpNode);				// append it to fieldset
			tmpNode = document.createElement("br");			// create <br>
			myNode.appendChild(tmpNode);				// append it to fieldset

			// Version
			myNode.appendChild(versionParagraph(scriptVersion, scriptID));
			tmpNode = document.createElement("br");			// create <br>
			myNode.appendChild(tmpNode);				// append it to fieldset

			// Apply options
			tmpNode = document.createElement("a");
			tmpNode.href = window.location.href;
			tmpNode.innerHTML = '<img src="' + windowLocationHost + '/img/arrow_right_raquo.png" alt="" /> ' + text.getTranslation("options.apply");
			tmpNode.addEventListener("click", function() {
				var iNode = document.getElementById(I_FORCE_QUICK_MENU);
				if (iNode) quickMenu.forceQuickMenu = iNode.checked;
				iNode = document.getElementById(I_FORCE_LANGUAGE);
				if (iNode) quickMenu.setLanguage(iNode.options[iNode.selectedIndex].value);
				quickMenu.saveItems();				// save modified menu
			}, true);
			myNode.appendChild(tmpNode);				// append it to fieldset

			// "check for update" button
			tmpNode = document.createElement("a");
			tmpNode.style.cssFloat = "right";
			tmpNode.href = window.location.href;
			tmpNode.innerHTML = '<img src="' + windowLocationHost + '/img/arrow_right_raquo.png" alt="" /> ' + text.getTranslation("options.checkForUpdate");
			tmpNode.addEventListener("click", function() {
				GM_deleteValue("update");				// Buzzy's autoUpdater label
			}, true);
			myNode.appendChild(tmpNode);					// append it to fieldset

			return;
		}
	}
	else {								// non-Premium account
		myNode = xpath(document, '//p[@class="error"]');

		if (myNode.snapshotLength == 0) {			// if <p class="error">You need a premium account for this game feature. ... doesn't exist
			myNode = xpath(document, '//h2');		// search for "Edit fast list" header
			if (myNode.snapshotLength != 1) return;		// return if there isn't exactly one such node
		}
		myNode = myNode.snapshotItem(0);
		pNode = myNode.parentNode;

		while (lastNode = myNode) {				// remove all nodes after (and including) header
			myNode = myNode.nextSibling;
			pNode.removeChild(lastNode);
		}
	}

	var addNewItem = GM_getValue(qmActionLabel, EF_NO_EDIT);	// are we editing something?
	editFlag = addNewItem.charAt(0);

	if (editFlag != EF_NO_EDIT) {					// yes, we're editing
		GM_deleteValue(qmActionLabel);				// remove edit flag, to not edit after next refresh

		var editItem = new Boolean();
		var itemNumber;						// entry number

		editItem = (editFlag != EF_NEW_ENTRY);
		if ((editFlag == EF_NEW_ENTRY) || (editFlag == EF_CLONE_ENTRY)) itemNumber = quickMenu.Items.length;
		if ((editFlag == EF_EDIT_ENTRY) || (editFlag == EF_CLONE_ENTRY)) {
			addNewItem = addNewItem.split(quickMenu.recordSeparator);

			if (editFlag == EF_EDIT_ENTRY) itemNumber = addNewItem[1];
			addNewItem = addNewItem[2].split(quickMenu.itemSeparator);
		}

		myNode = document.createElement("h2");
		myNode.innerHTML = text.getTranslation("editEntry.editEntry");
		pNode.insertBefore(myNode, lastNode);

		var myForm = document.createElement("form");
		myForm.method = "post";
		myForm.action = window.location.href;
		myForm.name = FORM_NAME;
		pNode.insertBefore(myForm, lastNode);

		// select predefined
		var tmpNode = document.createElement("select");		// create select
		myForm.appendChild(tmpNode);				// append it to form
		tmpNode.style.margin = "10 0 0 0";
		tmpNode.innerHTML = '<option value="' + NO_ENTRY + '" selected>' + text.getTranslation("editEntry.predefinedEntry") + '</option>';
		for (var i = 0; i < itemsTemplates.length; i++)
			tmpNode.innerHTML += '<option value="' + i + '">' + itemsTemplates[i][0] + '</option>';
		tmpNode.size = "1";
		tmpNode.addEventListener("change", function() {
			var i = this.options[this.selectedIndex].value;
			if (!isNaN(i))
			if ((i > -1) && (i < itemsTemplates.length)) {
				var iNode = document.getElementById(INPUT_NAME);
				if (iNode) iNode.value = itemsTemplates[i][0];

				iNode = document.getElementById(INPUT_IMAGE);
				if (iNode) iNode.value = itemsTemplates[i][1];

				iNode = document.getElementById(INPUT_URL);
				if (iNode) iNode.value = itemsTemplates[i][2];
			}
		}, true);
		tmpNode = document.createElement("br");			// create <br>
		myForm.appendChild(tmpNode);				// append it to fieldset
		tmpNode = document.createElement("br");			// create <br>
		myForm.appendChild(tmpNode);				// append it to fieldset

		var myTable = document.createElement("table");
		myTable.className = "borderlist";
		myForm.appendChild(myTable);
		// header
		var myRow = myTable.insertRow(AT_THE_END);
		myRow.innerHTML = '<th style="text-align: center" colspan="2">' + text.getTranslation("editEntry.editEntry") + '</th>';
		// name
		myRow = myTable.insertRow(AT_THE_END);
		var myCell = myRow.insertCell(AT_THE_END);
		myCell.innerHTML = text.getTranslation("editEntry.name");
		myCell = myRow.insertCell(AT_THE_END);
		myNode = document.createElement("input");
		myNode.name = myNode.id = INPUT_NAME;
		myNode.style.width = INPUT_LINES_WIDTH;
		myNode.value = (editItem)?addNewItem[0]:"";
		myNode.addEventListener("keyup", function() {
			this.value = checkForIllegalChars(this.value);
		}, true);
		myCell.appendChild(myNode);
		// image
		myRow = myTable.insertRow(AT_THE_END);
		myCell = myRow.insertCell(AT_THE_END);
		myCell.innerHTML = text.getTranslation("editEntry.imageURL");
		myCell = myRow.insertCell(AT_THE_END);
		myNode = document.createElement("input");
		myNode.name = myNode.id = INPUT_IMAGE;
		myNode.style.width = INPUT_LINES_WIDTH;
		myNode.value = (editItem)?addNewItem[1]:"";
		myNode.addEventListener("keyup", function() {
			this.value = checkForIllegalChars(this.value);
		}, true);
		myCell.appendChild(myNode);
		// target
		myRow = myTable.insertRow(AT_THE_END);
		myCell = myRow.insertCell(AT_THE_END);
		myCell.innerHTML = text.getTranslation("editEntry.targetURL");
		myCell = myRow.insertCell(AT_THE_END);
		myNode = document.createElement("input");
		myNode.name = myNode.id = INPUT_URL;
		myNode.style.width = INPUT_LINES_WIDTH;
		myNode.value = (editItem)?addNewItem[2]:"";
		myNode.addEventListener("keyup", function() {
			this.value = checkForIllegalChars(this.value);
		}, true);
		myCell.appendChild(myNode);
		// window
		myRow = myTable.insertRow(AT_THE_END);
		myCell = myRow.insertCell(AT_THE_END);
		myCell.innerHTML = text.getTranslation("editEntry.newWindow");
		myCell = myRow.insertCell(AT_THE_END);
		myNode = document.createElement("input");
		myNode.name = INPUT_WINDOW;
		myNode.type = "checkbox";
		myNode.value = "1";
		myNode.checked = (editItem)?addNewItem[3] == NEW_WINDOW:false;
		myCell.appendChild(myNode);

		// button "OK"
		myNode = document.createElement("input");
		myNode.type = "submit";
		myNode.id = RxR_edit + itemNumber;
		myNode.value = text.getTranslation("editEntry.buttonOK");
		myNode.addEventListener("click", function() {
			var number = 1*(this.id.replace(RxR_edit, ""));		// what's the number?
			var editedEntry = new tMenuItem (getInputNode(FORM_NAME, INPUT_NAME).value, getInputNode(FORM_NAME, INPUT_IMAGE).value, getInputNode(FORM_NAME, INPUT_URL).value, (getInputNode(FORM_NAME, INPUT_WINDOW).checked)?NEW_WINDOW:SAME_WINDOW);
			// empty entry is <BR> - don't save it to not confuse our dear users :)
			if (!editedEntry.itIsBR()) {
				switch (editFlag) {
					case EF_NEW_ENTRY:
					case EF_CLONE_ENTRY:
						quickMenu.putItemObj(editedEntry);	// attach new entry to the menu
						break;
					case EF_EDIT_ENTRY:
						quickMenu.replaceItemObj(number, editedEntry);
						break;
					default:
				}
				quickMenu.saveItems();
			}
		}, true);
		myForm.appendChild(myNode);
	}
	else {								// we aren't editing
		var windowLocationHost = window.location.protocol + '//' + window.location.host;

		myNode = document.createElement("h2");			// set the header
		myNode.innerHTML = text.getTranslation("editFastList.editFastList");
		pNode.insertBefore(myNode, lastNode);

// Options - begin
		myNode = document.createElement("div");			// create div
		myNode.style.cssFloat = "right";			// set position
		myNode.style.position = "relative";			// move it up a bit
		myNode.style.top = "-25px";
		myNode.style.margin = "0 20px 0 0";
		pNode.insertBefore(myNode, lastNode);
		var tmpNode = document.createElement("form");		// create form
		myNode.appendChild(tmpNode);				// insert it to div
		myNode = tmpNode;
		tmpNode.method = "post";
		tmpNode.action = window.location.href;
		tmpNode.name = FORM_NAME;
		tmpNode = document.createElement("fieldset");		// create fieldset
		myNode.appendChild(tmpNode);				// insert it to form
		myNode = tmpNode;
		tmpNode.style.padding = "10px";
		tmpNode.style.width = "380px";
		tmpNode.style.maxHeight = "185px";
		tmpNode = document.createElement("legend");		// create legend
		myNode.appendChild(tmpNode);				// insert it to fieldset
		tmpNode.innerHTML = " " + text.getTranslation("options.legend") + " ";

		// Display icons and texts
		tmpNode = document.createElement("input");
		myNode.appendChild(tmpNode);
		tmpNode.type = "radio";
		tmpNode.value = ICON_AND_TEXT;
		tmpNode.name = I_ICON_OR_TEXT;
		tmpNode.checked = quickMenu.iconOrText == tmpNode.value;
		tmpNode.addEventListener("click", function() {
			modifyPreview();
		}, true);
		tmpNode = document.createTextNode(" " + text.getTranslation("options.iconsAndTexts"));
		myNode.appendChild(tmpNode);				// append it to fieldset
		tmpNode = document.createElement("br");			// create <br>
		myNode.appendChild(tmpNode);				// append it to fieldset
		// Display only icons
		tmpNode = document.createElement("input");		// create input
		myNode.appendChild(tmpNode);				// append it to fieldset
		tmpNode.type = "radio";
		tmpNode.value = ONLY_ICON;
		tmpNode.name = I_ICON_OR_TEXT;
		tmpNode.checked = quickMenu.iconOrText == tmpNode.value;
		tmpNode.addEventListener("click", function() {
			modifyPreview();
		}, true);
		tmpNode = document.createTextNode(" " + text.getTranslation("options.onlyIcons"));
		myNode.appendChild(tmpNode);				// append it to fieldset
		tmpNode = document.createElement("br");			// create <br>
		myNode.appendChild(tmpNode);				// append it to fieldset
		// Display only texts
		tmpNode = document.createElement("input");		// create input
		myNode.appendChild(tmpNode);				// append it to fieldset
		tmpNode.type = "radio";
		tmpNode.value = ONLY_TEXT;
		tmpNode.name = I_ICON_OR_TEXT;
		tmpNode.addEventListener("click", function() {
			modifyPreview();
		}, true);
		tmpNode.checked = quickMenu.iconOrText == tmpNode.value;
		tmpNode = document.createTextNode(" " + text.getTranslation("options.onlyTexts"));
		myNode.appendChild(tmpNode);				// append it to fieldset
		tmpNode = document.createElement("br");			// create <br>
		myNode.appendChild(tmpNode);				// append it to fieldset
		tmpNode = document.createElement("br");			// create <br>
		myNode.appendChild(tmpNode);				// append it to fieldset

		// Preview
		tmpNode = document.createElement("div");		// create div for preview
		myNode.appendChild(tmpNode);				// append it to fieldset
		tmpNode.id = I_ICON_TEXT_PREVIEW;
		tmpNode.style.width = "100px";
		tmpNode.style.height = "24px";
		tmpNode.style.position = "absolute";
		tmpNode.style.left = "300px";
		tmpNode.style.top = "48px";
		tmpNode.innerHTML = quickMenu.Items[0].getDemoHTML(quickMenu.iconOrText);

		// Display link to this page
		tmpNode = document.createElement("input");		// create input
		myNode.appendChild(tmpNode);				// append it to fieldset
		tmpNode.type = "checkbox";
		tmpNode.value = "ON";
		tmpNode.id = tmpNode.name = I_DISPLAY_CUSTOMIZE;
		tmpNode.checked = quickMenu.showCustomising;
		tmpNode.addEventListener("click", function() {
			var imgNode = document.getElementById(RxR_image);
			if (imgNode) imgNode.style.opacity = (this.checked)?"1":IMAGE_OPACITY;
		}, true);
		tmpNode = document.createTextNode(" " + text.getTranslation("options.customize"));
		myNode.appendChild(tmpNode);				// append it to fieldset
		tmpNode = document.createElement("img");		// create image
		myNode.appendChild(tmpNode);				// append it to fieldset
		tmpNode.style.position = "relative";
		tmpNode.style.left = "5px";
//		tmpNode.style.top = "4px";
		tmpNode.src = customize;
		tmpNode.id = RxR_image;
		tmpNode.alt = tmpNode.title = text.getTranslation("customize");
		if (!quickMenu.showCustomising) tmpNode.style.opacity = IMAGE_OPACITY;
		tmpNode = document.createElement("br");			// create <br>
		myNode.appendChild(tmpNode);				// append it to fieldset
		tmpNode = document.createElement("br");			// create <br>
		myNode.appendChild(tmpNode);				// append it to fieldset

		// Use Quick Menu instead of Premium feature
		tmpNode = document.createElement("input");
		myNode.appendChild(tmpNode);
		tmpNode.type = "checkbox";
		tmpNode.value = "ON";
		tmpNode.id = tmpNode.name = I_FORCE_QUICK_MENU;
		tmpNode.checked = quickMenu.forceMenu();
		tmpNode = document.createTextNode(" " + text.getTranslation("options.forceQuickMenu"));
		myNode.appendChild(tmpNode);				// append it to fieldset
		tmpNode = document.createElement("br");			// create <br>
		myNode.appendChild(tmpNode);				// append it to fieldset

		// forceLanguage
		tmpNode = document.createElement("select");		// create select
		myNode.appendChild(tmpNode);				// append it to fieldset
		tmpNode.style.margin = "10 3 0 4";
		tmpNode.innerHTML = "<option" + ((quickMenu.forceLanguage)?"":" selected") + ">" + text.getTranslation("options.automaticLang") + "</option>";
		var languageSet = text.getLanguageList();
		for (var lng in languageSet)
			tmpNode.innerHTML += '<option value="' + lng + '"'+ ((quickMenu.forcedLanguage == lng)?" selected":"") + ">" + languageSet[lng] + "</option>";
		tmpNode.size = "1";
		tmpNode.id = tmpNode.name = I_FORCE_LANGUAGE;
		tmpNode = document.createTextNode(" " + text.getTranslation("options.language"));
		myNode.appendChild(tmpNode);				// append it to fieldset
		tmpNode = document.createElement("br");			// create <br>
		myNode.appendChild(tmpNode);				// append it to fieldset

		// Version
		myNode.appendChild(versionParagraph(scriptVersion, scriptID));
		tmpNode = document.createElement("br");			// create <br>
		myNode.appendChild(tmpNode);				// append it to fieldset

		// Apply options
		tmpNode = document.createElement("a");
		tmpNode.href = window.location.href;
		tmpNode.innerHTML = '<img src="' + windowLocationHost + '/img/arrow_right_raquo.png" alt="" /> ' + text.getTranslation("options.apply");
		tmpNode.addEventListener("click", function() {
			var iNode = document.getElementById(I_DISPLAY_CUSTOMIZE);
			if (iNode) quickMenu.showCustomising = iNode.checked;
			quickMenu.iconOrText = getRadioButton();
			iNode = document.getElementById(I_FORCE_QUICK_MENU);
			if (iNode) quickMenu.forceQuickMenu = iNode.checked;
			iNode = document.getElementById(I_FORCE_LANGUAGE);
			if (iNode) quickMenu.setLanguage(iNode.options[iNode.selectedIndex].value);
			quickMenu.saveItems();				// save modified menu
		}, true);
		myNode.appendChild(tmpNode);				// append it to fieldset

		// "check for update" button
		tmpNode = document.createElement("a");
		tmpNode.style.cssFloat = "right";
		tmpNode.href = window.location.href;
		tmpNode.innerHTML = '<img src="' + windowLocationHost + '/img/arrow_right_raquo.png" alt="" /> ' + text.getTranslation("options.checkForUpdate");
		tmpNode.addEventListener("click", function() {
			GM_deleteValue("update");				// Buzzy's autoUpdater label
		}, true);
		myNode.appendChild(tmpNode);					// append it to fieldset
// Options - end

		// Create quick menu
		if (!quickMenu.isFilled()) {
			myNode = document.createElement("a");
			myNode.href = window.location.href;		// a=playerResetQuickmenu&p=0c5c
			myNode.innerHTML = '<img src="' + windowLocationHost + '/img/arrow_right_raquo.png" alt="" /> ' + text.getTranslation("editFastList.createQuickMenu");
			myNode.addEventListener("click", function() {
				quickMenu.resetToDefaults();		// reset to defaults
				quickMenu.saveItems();			// save modified menu
			}, true);
			pNode.insertBefore(myNode, lastNode);
			myNode = document.createElement("br");
			pNode.insertBefore(myNode, lastNode);
			myNode = document.createElement("br");
			pNode.insertBefore(myNode, lastNode);
		}

		// Add new entry
		myNode = document.createElement("a");
		// myNode.href = "game.php?village=" + villageID + "&s=profile&m=settings&type=quickmenu_edit";
		myNode.href = window.location.href;
		myNode.innerHTML = '<img src="' + windowLocationHost + '/img/arrow_right_raquo.png" alt="" /> ' + text.getTranslation("editFastList.addNewEntry");
		myNode.addEventListener("click", function() {
			GM_setValue(qmActionLabel, EF_NEW_ENTRY);
		}, true);
		pNode.insertBefore(myNode, lastNode);
		myNode = document.createElement("br");
		pNode.insertBefore(myNode, lastNode);

		// Add line break
		myNode = document.createElement("a");
		myNode.href = window.location.href;			// a=playerSaveQuickmenu&p=0c5c&quick_name=[br]
		myNode.innerHTML = '<img src="' + windowLocationHost + '/img/arrow_right_raquo.png" alt="" /> ' + text.getTranslation("editFastList.addLineBreak");
		myNode.addEventListener("click", function() {
			quickMenu.putItem("", "", "", SAME_WINDOW);	// empty item stands for <br>
			quickMenu.saveItems();				// save modified menu
		}, true);
		pNode.insertBefore(myNode, lastNode);
		myNode = document.createElement("br");
		pNode.insertBefore(myNode, lastNode);
		myNode = document.createElement("br");
		pNode.insertBefore(myNode, lastNode);

		// Hide quick start task bar
		myNode = document.createElement("a");
		myNode.href = window.location.href;			// a=playerHideQuickmenuText&p=0c5c
		myNode.innerHTML = '<img src="' + windowLocationHost + '/img/arrow_right_raquo.png" alt="" /> '+ text.getTranslation((quickMenu.hideIt == false)?"editFastList.hideQuickMenu":"editFastList.showQuickMenu");
		myNode.addEventListener("click", function() {
			quickMenu.hideIt = !quickMenu.hideIt;
			quickMenu.saveItems();				// save modified menu
		}, true);
		pNode.insertBefore(myNode, lastNode);
		myNode = document.createElement("br");
		pNode.insertBefore(myNode, lastNode);
		myNode = document.createElement("br");
		pNode.insertBefore(myNode, lastNode);

		// entry list
		if (quickMenu.isFilled()) {
			var myTable = document.createElement("table");	// create table
			myTable.className = "borderlist";
			pNode.insertBefore(myTable, lastNode);

			var myRow = myTable.insertRow(AT_THE_END);
			myRow.innerHTML = '<th colspan="2">' + text.getTranslation("editFastList.link") + '</th><th colspan="6">&nbsp;</th>';

			for (var i = 0; i < quickMenu.Items.length; i++) {
				myRow = myTable.insertRow(AT_THE_END);
				// image
				var myCell = myRow.insertCell(AT_THE_END);
				myCell.style.background = "#AF1616";
				myCell.style.textAlign = "center";
				if (!quickMenu.Items[i].itIsBR()) myCell.innerHTML = '<a href="game.php?village=' + villageID + '&s=' + quickMenu.Items[i].targetURL + '"><img src="' + quickMenu.Items[i].getImageURL(emptyIcon) + '" /></a>';
				// name
				myCell = myRow.insertCell(AT_THE_END);
				if (quickMenu.Items[i].itIsBR()) myCell.innerHTML = '<a href="' + window.location.href + '">[br]</a>';
				else myCell.innerHTML = '<a href="game.php?village=' + villageID + '&s=' + quickMenu.Items[i].targetURL + '">' + quickMenu.Items[i].name + '</a>';
				// edit
				myCell = myRow.insertCell(AT_THE_END);
				if (quickMenu.Items[i].itIsBR()) {
					myNode = document.createElement("img");
					myNode.src = windowLocationHost + "/img/ico_edit.png";
					myNode.alt = "";
					myNode.style.visibility = "hidden";
				}
				else {
					myNode = document.createElement("a");
					myNode.id = RxR_edit + i;
					myNode.href = window.location.href;
					myNode.innerHTML = '<img src="' + windowLocationHost + '/img/ico_edit.png" alt="' + text.getTranslation("editFastList.editItem") + '" title="' + text.getTranslation("editFastList.editItem") + '" />';
					myNode.addEventListener("click", function() {
						var number = 1*(this.id.replace(RxR_edit, ""));		// what's the number?
						GM_setValue(qmActionLabel, EF_EDIT_ENTRY + quickMenu.recordSeparator + number + quickMenu.recordSeparator + quickMenu.Items[number].getRec(quickMenu.itemSeparator));
					}, true);
				}
				myCell.appendChild(myNode);
				// clone
				myCell = myRow.insertCell(AT_THE_END);
				if (quickMenu.Items[i].itIsBR()) {
					myNode = document.createElement("img");
					myNode.src = cloning;
					myNode.alt = "";
					myNode.style.visibility = "hidden";
				}
				else {
					myNode = document.createElement("a");
					myNode.id = RxR_clone + i;
					myNode.href = window.location.href;
					myNode.innerHTML = '<img src="' + cloning + '" alt="' + text.getTranslation("editFastList.cloneItem") + '" title="' + text.getTranslation("editFastList.cloneItem") + '" />';
					myNode.addEventListener("click", function() {
						var number = 1*(this.id.replace(RxR_clone, ""));		// what's the number?
						GM_setValue(qmActionLabel, EF_CLONE_ENTRY + quickMenu.recordSeparator + number + quickMenu.recordSeparator + quickMenu.Items[number].getRec(quickMenu.itemSeparator));
					}, true);
				}
				myCell.appendChild(myNode);
				// show/hide
				myCell = myRow.insertCell(AT_THE_END);
				myNode = document.createElement("a");
				myNode.id = RxR_hide + i;
				myNode.href = window.location.href;
				myNode.innerHTML = '<img src="' + ((quickMenu.Items[i].display == HIDE_ENTRY)?showIcon:hideIcon) + '" alt="' + text.getTranslation((quickMenu.Items[i].display == HIDE_ENTRY)?"editFastList.showItem":"editFastList.hideItem") + '" title="' + text.getTranslation((quickMenu.Items[i].display == HIDE_ENTRY)?"editFastList.showItem":"editFastList.hideItem") + '" />';
				myNode.addEventListener("click", function() {
					var number = 1*(this.id.replace(RxR_hide, ""));		// what's the number?
					quickMenu.showHideItem(number);		// move number-th item up
					quickMenu.saveItems();			// save modified menu
				}, true);
				myCell.appendChild(myNode);
				// move up
				myCell = myRow.insertCell(AT_THE_END);
				if (i > 0) {
					myNode = document.createElement("a");
					myNode.id = RxR_up + i;
					myNode.href = window.location.href;
					myNode.innerHTML = '<img src="' + arrowUp + '" alt="' + text.getTranslation("editFastList.moveItemUp") + '" title="' + text.getTranslation("editFastList.moveItemUp") + '" />';
					myNode.addEventListener("click", function() {
						var number = 1*(this.id.replace(RxR_up, ""));	// what's the number?
						quickMenu.moveItemUp(number);	// move number-th item up
						quickMenu.saveItems();		// save modified menu
					}, true);
				}
				else {
					myNode = document.createElement("img");
					myNode.src = arrowUp;
					myNode.alt = "";
					myNode.style.visibility = "hidden";
				}
				myCell.appendChild(myNode);
				// move down
				myCell = myRow.insertCell(AT_THE_END);
				if (i < quickMenu.Items.length-1) {
					myNode = document.createElement("a");
					myNode.id = RxR_down + i;
					myNode.href = window.location.href;
					myNode.innerHTML = '<img src="' + arrowDown + '" alt="' + text.getTranslation("editFastList.moveItemDown") + '" title="' + text.getTranslation("editFastList.moveItemDown") + '" />';
					myNode.addEventListener("click", function() {
						var number = 1*(this.id.replace(RxR_down, ""));	// what's the number?
						quickMenu.moveItemDown(number);	// move number-th item down
						quickMenu.saveItems();		// save modified menu
					}, true);
				}
				else {
					myNode = document.createElement("img");
					myNode.src = arrowDown;
					myNode.alt = "";
					myNode.style.visibility = "hidden";
				}
				myCell.appendChild(myNode);
				// delete
				myCell = myRow.insertCell(AT_THE_END);
				myNode = document.createElement("a");
				myNode.id = RxR_delete + i;
				myNode.href = window.location.href;
				myNode.innerHTML = '<img src="' + windowLocationHost + '/img/ico_delete.png" alt="' + text.getTranslation("editFastList.deleteItem") + '" title="' + text.getTranslation("editFastList.deleteItem") + '" />';
				myNode.addEventListener("click", function() {
					var number = 1*(this.id.replace(RxR_delete, ""));	// what's the number?
					quickMenu.removeItem(number);	// remove number-th item
					quickMenu.saveItems();		// save modified menu
				}, true);
				myCell.appendChild(myNode);
			}
			myNode = document.createElement("br");
			pNode.insertBefore(myNode, lastNode);
			myNode = document.createElement("br");
			pNode.insertBefore(myNode, lastNode);

			// Reset quick menu
			myNode = document.createElement("a");
			myNode.href = window.location.href;		// a=playerResetQuickmenu&p=0c5c
			myNode.innerHTML = '<img src="' + windowLocationHost + '/img/arrow_right_raquo.png" alt="" /> ' + text.getTranslation("editFastList.resetQuickMenu");
			myNode.addEventListener("click", function() {
				quickMenu.resetToDefaults();		// reset to defaults
				quickMenu.saveItems();			// save modified menu
			}, true);
			pNode.insertBefore(myNode, lastNode);
			myNode = document.createElement("br");
			pNode.insertBefore(myNode, lastNode);
			myNode = document.createElement("br");
			pNode.insertBefore(myNode, lastNode);

			// Remove quick menu
			myNode = document.createElement("a");
			myNode.href = window.location.href;
			myNode.innerHTML = '<img src="' + windowLocationHost + '/img/arrow_right_raquo.png" alt="" /> ' + text.getTranslation("editFastList.removeQuickMenu");
			myNode.addEventListener("click", function() {
				quickMenu.removeMenu();			// remove menu entirely
			}, true);
			pNode.insertBefore(myNode, lastNode);
			myNode = document.createElement("br");
			pNode.insertBefore(myNode, lastNode);
			myNode = document.createElement("br");
			pNode.insertBefore(myNode, lastNode);
		}
	}
}

// modify "quickstart_pane"
myNode = xpath(document, '//table[@class="quickstart_pane"]');
if (myNode.snapshotLength == 1) {
	myNode = myNode.snapshotItem(0);
	if (quickMenu.hideMenu()) {
		myNode.parentNode.removeChild(myNode);
/*		myNode = xpath(document, '//div/img[contains(@src, "qs_bottom.png")]/..');
		if (myNode.snapshotLength > 0) {
			myNode = myNode.snapshotItem(0);
			myNode.parentNode.removeChild(myNode);
		} */
	}
	else if (quickMenu.isFilled() && (myNode.rows[0].cells.length == 3)) {
		myNode.style.padding = "0 15px 0 25px";
		myNode.deleteRow(0);					// remove entire row
		myNode = myNode.insertRow(AT_THE_END);
		myNode = myNode.insertCell(AT_THE_END);
		myNode.innerHTML = "";
		var _TP = quickMenu.iconOrText;
		for (var i = 0; i < quickMenu.Items.length; i++) {
			myNode.innerHTML += quickMenu.Items[i].getHTML(_TP, villageID);
		}
		if (quickMenu.showCustomising) {
			myNode.innerHTML += '<div class="quickentry" style="float:right"><table cellspacing="0" cellpadding="0"><tr>' +
				'<td class="quickico"><a href="game.php?village=' + villageID + '&s=profile&m=settings&type=quickmenu"><img src="' + customize + '" alt="' + text.getTranslation("customize") + '" title="' + text.getTranslation("customize") + '" /></a></td>' +
				'</tr></table></div>';
		}
	}
}

} // DO NOT TOUCH!! -> end of function main() {

// FUNCTIONS *************************************************************************************************************

function versionParagraph (ver, ID) {
	var pNode = document.createElement("p");			// create paragraph

	var aNode = document.createElement("a");			// create link to userscripts.org
	aNode.href="http://userscripts.org/scripts/show/" + ID;
	aNode.style.fontWeight = "bold";
	aNode.alt = aNode.title = "KingsAge Quick Menu @ userscripts.org";
	aNode.target = "_blank";
	aNode.innerHTML = "v." + ver;					// set the version

	pNode.appendChild(aNode);
	pNode.style.cssFloat = "right";
	pNode.style.fontWeight = "bold";
	return (pNode);
}

function modifyPreview () {
	var pNode = document.getElementById(I_ICON_TEXT_PREVIEW);
	if (pNode) pNode.innerHTML = quickMenu.Items[0].getHTML(getRadioButton(), villageID) + '<br style="clear:both">';
}

function getRadioButton () {
	var iNode = document.getElementsByName(I_ICON_OR_TEXT);
	for (var i = 0; i < iNode.length; i++) if (iNode[i].checked) return (iNode[i].value);
}

function checkForIllegalChars (_str) {
	var iX;
	var iY;
	var noticeUs = new Boolean(true);

	while (((iX=_str.indexOf(SPRTR)) >= 0) || ((iY=_str.indexOf(SPRTRx)) >= 0)) {
		if (iX >= 0) _str = _str.substr(0, iX) + _str.substr(iX+1);
		if (iY >= 0) _str = _str.substr(0, iY) + _str.substr(iY+1);
		if (noticeUs) {
			noticeUs = false;
			alert (text.getTranslation("editEntry.illegalChars") + " " + SPRTR + " " + SPRTRx);
		}
	}
	return (_str);
}

function getInputNode(formName, inputName) {		// The document object is an XPCNativeWrapper,
	var form = document.forms.namedItem(formName);	// and it does not support the shorthand of getting an element by ID
	if (form) return(form.elements.namedItem(inputName));
	else return (form);
}

function paramValue (name, url_string) {
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(url_string);
	if (results == null)	return "";
	else			return results[1];
}

function legend (domain, txtObj) {					// language handling
	const unknownSomething = "???";
	const unknownLanguage = "unknownLanguage";
	var languageIndex = {unknownLanguage: "en", "org": "en", "sk": "sk", "de": "de"};
	var languageID = unknownLanguage;
	var automaticLanguageID = unknownLanguage;
	var _texty = txtObj;

	var m, n;
	n = (m = domain.match(new RegExp("\.([a-z]{2,6})$","i"))) ? m[1] : unknownLanguage;
	if (typeof languageIndex[n] == "undefined") n = unknownLanguage;
	this.automaticLanguageID = n;
	this.languageID = n;

	this.getLanguage = function () {				// returns appropriate part of texty
		return (_texty[languageIndex[this.languageID]]);
	}
	this.getAutomaticLanguage = function () {			// returns appropriate original part of texty
		return (_texty[languageIndex[this.automaticLanguageID]]);
	}
	this.setLanguage = function (lang) {				// force some language
		for (var key in languageIndex) if (languageIndex[key] == lang) {
			this.languageID = key;
			break;
		}
	}
	this.getTranslation = function (txt) {
		return ((_texty != "undefined")?this.getTextByLanguageId(txt, this.languageID):unknownSomething);
	}
	this.getOriginalText = function (txt) {
		return ((_texty != "undefined")?this.getTextByLanguageId(txt, this.automaticLanguageID):unknownSomething);
	}
	this.getTextByLanguageId = function (txt, langID) {
		var lang = languageIndex[langID];
		var langObj = _texty[lang];

		var tokens = txt.split('.');
		for (var i = 0; i < tokens.length; i++) {
			if(typeof(langObj[tokens[i]]) != "undefined") langObj = langObj[tokens[i]];
			else return ((langID == unknownLanguage)? unknownSomething : this.getTextByLanguageId(txt, unknownLanguage));
		}
		return (langObj);
	}
	this.getLanguageList = function () {				// returns array of pairs acronym:languageName
		var languageList = new Object();
		for (var key in languageIndex) if (!(languageIndex[key] in languageList))
			languageList[languageIndex[key]] = this.getTextByLanguageId("languageName", key);
		return (languageList);
	}
}

function trimStr(str) {		// thanks to Steve @ http://blog.stevenlevithan.com/archives/faster-trim-javascript
	var	str = str.replace(/^\s\s*/, ''),
		ws = /\s/,
		i = str.length;
	while (ws.test(str.charAt(--i)));
	return str.slice(0, i + 1);
}

function paramValue(name, url_string) {
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(url_string);
	if (results == null)	return "";
	else			return results[1];
}

function xpath(node, query) {
	return document.evaluate(query, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function premiumAccount() {
	if ((gameVersion[bigVer] < 2) && (gameVersion[midVer] < 1) && (gameVersion[smallVer] < 3)) {
		// up to version 1.0.2
		var premiumNodes = xpath(document, '//table[(@class="shortcut") and contains(@style, "sc_premium_middle.png")]');
		return (premiumNodes.snapshotLength < 1);
	}
	else {	// from version 1.0.3
		var premiumNodes = xpath(document, '//div[(@class="buff") and contains(@style, "premium-account.png")]');
		return (premiumNodes.snapshotLength > 0);
	}
}

function getGameVersion(versionArray) {
// <div class="status" style="padding-left:10px;">Version <a href="game.php?village=35689&amp;s=changelog">1.0.3</a></div>
	var statusNodes = xpath(document, '//div[(@class="status")]/a[contains(@href, "s=changelog")]');
	if (statusNodes.snapshotLength == 1) {
		statusNodes = statusNodes.snapshotItem(0).innerHTML.split(".");
		versionArray[bigVer] = statusNodes[bigVer];
		versionArray[midVer] = statusNodes[midVer];
		versionArray[smallVer] = statusNodes[smallVer];
	}
}

function waitForReady(callback, delayInMS) {			// thanks to GIJoe
	var docState = "";					// since readyState returns String... should be string null
	try {
		docState = window.document.readyState;
	}
	catch(e) {}

	if (docState != "complete") {
		window.setTimeout(waitForReady, delayInMS, callback);
		return;
	}
	callback();
}
