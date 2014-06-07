// Copyright (c) 2009-2011, RxR

// ==UserScript==
// @name	KingsAge Mark On Map
// @namespace	RxR KingsAge
// @description	This script creates "s=edit_player_colors" page and and prepares data from "Mark on map"
//
// @include	http://s*.kingsage.*/game.php*s=edit_player_colors*
// @include	http://s*.kingsage.*/game.php*s=map*
// @include	http://s*.kingsage.*/map.php*
// @include	http://s*.kingsage.*/game.php*s=info_player*
// @include	http://s*.kingsage.*/game.php*s=info_village*
// @include	http://s*.kingsage.*/game.php*s=info_ally*
//
// Auto-update function. Many thanks, Buzzy!
// @require	http://buzzy.260mb.com/AutoUpdater.js
// @version	4.33
//
// @history	4.33 25.07.2011 fixed bug in settlements' searching
// @history	4.32 19.06.2011 only one small "touch-up" - link to userscripts.org was added to version number
// @history	4.31 19.05.2011 fixed bug in versions comparison (thanks szczeciu for reporting)
// @history	4.30 16.12.2010 v.1.1.2 changed the way of creating map
// @history	4.23 04.12.2010 objects are sorted alphabetically within their category (e.g. Players)
// @history	4.22 10.07.2010 fixed bug in alliance's marking (thanks george_dimi for reporting)
// @history	4.21 03.06.2010	implemented waitForReady (thanks GIJoe) to be compatible with the newest version Greasemonkey
// @history	4.20 27.05.2010	algorithm is language-independent (e.g. no testing on strings in searching for specific node)
// @history	4.12 27.05.2010	fixed bug in language's recognizing
// @history	4.11 24.05.2010	fixed some bugs
// @history	4.10 19.05.2010	completely rewritten recognizing of object's names on the map
// @history	4.02 18.05.2010	the player's name wasn't correctly separated during adding if his online status was visible
// @history	4.01 17.05.2010	rewrited few lines for marking of alliances
// @history	4.00 29.04.2010	new feature added: go to
// @history	3.02 25.04.2010	fixed bug in player's name resolving caused by "Title in the alliance"
// @history	3.00 19.03.2010	handling of link "Mark on map"
// @history	3.01 08.04.2010	fixed bug which caused loss of object's ID while editing
// @history	2.02 15.03.2010	getInfoTxt and getLink functions were added
// @history	2.01 27.02.2010	support for more than 5 objects
// @history	2.00 27.02.2010	settlements and alliances are supported; objects are sorted by type, e.g. in order ally-player-settlement
// @history	1.00 28.12.2009	displaying on map (only players are supported)
// @history	0.20 27.12.2009	legend is diplayed on game.php*s=map* page
// @history	0.10 27.12.2009	basic algorithm debugged
// @history	0.01 26.12.2009	created basic algorithm
//
// ==/UserScript==

const scriptID = 72916;
const scriptVersion = "4.33";

autoUpdate (scriptID, scriptVersion);				// Buzzy's autoaupdate

if (!GM_getValue || !GM_getValue || !GM_deleteValue) return;	// opps, my precious functions're missing

var delayForReady = 50;						// delay in miliseconds for waitForReady's setTimeout
waitForReady(main, delayForReady);				// wait until document is ready and then call main()

const cLOWER = -1;						// constants for versions comparison
const cHIGHER = 1;
const cEQUAL  = 0;

var MAX_SELECTIONS = 50;
var MAX_COLS = 10;

var NA_KONIEC = -1;
var T_SETTLEMENT = "SETTLEMENT";
var T_PLAYER = "PLAYER";
var T_ALLY = "ALLY";
var TYPE_SETT = 3;
var TYPE_PLYR = 2;
var TYPE_ALLY = 1;
var TYPE_UNKNOWN = 0;

var SPRTR = "&";
var vSPRTR = "\\";

var FORM_NAME = "kingsage";
var INPUT_OT_NAME = "object_type";
var INPUT_ON_NAME = "object_name";
var INPUT_OC_NAME = "preview_color";

var colourLabel = "Selections " + window.location.hostname;
var selectionName = "Name " + window.location.hostname;
var delObjClass = "RxR_del_";
var edtObjClass = "RxR_edt_";
var submitID = "RxR_MoM";
var formName = "RxR_form";
var xName = "send_x";
var yName = "send_y";
var pocHracov = 0;

// TRANSLATIONS ***********************************************************************************************************
var texty = {
	en: {
		needPremium	: "You need a premium account for this game feature",
		editSelections	: "Edit selections",
		objects		: "Objects",
		edit		: "Edit",
		remove		: "Remove",
		newSelection	: "New selection",
		objectsName	: "Object's name:",
//		create		: "Create",
		add		: "Add",
		red		: "Red:",
		green		: "Green:",
		blue		: "Blue:",
		objectsType	: "Object's type:",
		settlement	: "Settlement",
		player		: "Player",
		alliance	: "Alliance",
		maximumCount	: "Maximum selections count is "+MAX_SELECTIONS+".",
		change		: "Change",
		properties	: "Properties from:",				// in info_player table
		goTo		: "Go to",
	},
	sk: {
		needPremium	: "Pre túto hernú funkciu potrebujete prémium účet",
		editSelections	: "Upraviť značky",
		objects		: "Objekty",
		edit		: "Upraviť",
		remove		: "Odstrániť",
		newSelection	: "Nová značka",
		objectsName	: "Názov objektu:",
//		create		: "Vytvoriť",
		add		: "Pridať",
		red		: "Červená:",
		green		: "Zelená:",
		blue		: "Modrá:",
		objectsType	: "Typ objektu:",
		settlement	: "Osada",
		player		: "Hráč",
		alliance	: "Aliancia",
		maximumCount	: "Maximálne množstvo značiek je "+MAX_SELECTIONS+".",
		change		: "Zmeniť",
		properties	: "Vlastnosti:",
		goTo		: "Choď na",
	},
}
var text = new legend(window.location.hostname, texty);

var objekty = new Array();
var gameVersion;

var villageID = paramValue("VILLAGE", window.location.href.toUpperCase());

// objekt template
function objekt (_type, _ID, _name, _clr) {			// basic properties are type, ID, name and colour
	switch (1*_type) {
		case TYPE_SETT:
		case TYPE_PLYR:
		case TYPE_ALLY:
			this.type = 1*_type;
			break;
		default:
 			this.type = TYPE_UNKNOWN;
	}
	this.ID    = 1*_ID;
	this.name  = trimStr(_name);
	this.color = _clr;

	this.xPos  = 0;						// settlement has position
	this.yPos  = 0;

	this.setXY = function(xy) { var xxx = xy.split("|"); if (xxx.length == 2) { this.xPos = 1*xxx[0]; this.yPos = 1*xxx[1]; }}
	this.getInfoTxt = function() { switch (1*this.type) { case TYPE_SETT: return ("info_village"); break; case TYPE_ALLY: return ("info_ally"); break; default: return ("info_player"); }}
	this.getLink = function(villageID) { return ('<a href="game.php?village=' + villageID + '&s=' + this.getInfoTxt() + '&id=' + this.ID + '">' + this.name + '</a>'); }
	this.getRec  = function() { return (this.type + SPRTR + this.ID + SPRTR + this.name + SPRTR + this.color + SPRTR + this.xPos + SPRTR + this.yPos); }
	this.fromRec = function(ret) {
		var xxx = ret.split(SPRTR);
		var i = 0;
		this.type  = xxx[i++];
		this.ID    = 1*xxx[i++];
		this.name  = trimStr(xxx[i++]);
		this.color = xxx[i++];
		this.xPos  = 1*xxx[i++];
		this.yPos  = 1*xxx[i++];
	}
	this.getType = function() { return (1*this.type); }
}

function usporiadajObjekty () {
	function mensiObjekt(a, b) {
		if (a.getType() == b.getType()) return (b.name < a.name);
		else return (b.getType() < a.getType());
	}

	objekty.sort(mensiObjekt);
}

function main() {

// game version template
function tGameVersion () {
	this.bigVer = 0;
	this.midVer = 0;
	this.lowVer = 0;

	this.getGameVersion = function () {
	// <div class="status" style="padding-left:10px;">Version <a href="game.php?village=35689&amp;s=changelog">1.0.3</a></div>
		var statusNodes = xpath(document, '//div[(@class="status")]/a[contains(@href, "s=changelog")]');
		if (statusNodes.snapshotLength == 1) {
			statusNodes = statusNodes.snapshotItem(0).innerHTML.split(".");
			this.bigVer = statusNodes[0];
			this.midVer = statusNodes[1];
			this.lowVer = statusNodes[2];
		}
	}
	this.getGameVersion ();
	this.compareWith = function (ver) {				// ver is string e.g. "1.1.2"
		ver = ver.split(".");

		var bVer = parseInt(ver[0], 10);
		var mVer = (ver.length > 1)?parseInt(ver[1], 10):0;
		var lVer = (ver.length > 2)?parseInt(ver[2], 10):0;

		if	(this.bigVer < bVer) return (cLOWER);
		else if (this.bigVer > bVer) return (cHIGHER);
		else if (this.midVer < mVer) return (cLOWER);
		else if (this.midVer > mVer) return (cHIGHER);
		else if (this.lowVer < lVer) return (cLOWER);
		else if (this.lowVer > lVer) return (cHIGHER);
		else return (cEQUAL);
	}
}
gameVersion = new tGameVersion();

// read objects
var txt = GM_getValue(colourLabel,"");
if (txt != "") {
	var vvv = txt.split(vSPRTR);
	pocHracov = vvv.length;
	for (var i = 0; i < pocHracov; i++) {
		objekty[i] = new objekt;
		objekty[i].fromRec(vvv[i]);
	}
	usporiadajObjekty();
}

var villageID = paramValue("VILLAGE", window.location.href.toUpperCase());
var sPar = paramValue("S", window.location.href.toUpperCase());

// precitat meno/typ/id
// porovnat zaciatok typ-objectType a id-objectID
// ked sa rovnaju nastavit objectName
// ked sa nerovnaju nastavit objectType na player a vynulovat objectID

if (sPar == "EDIT_PLAYER_COLORS") {
	var objectType = paramValue("TYPE", window.location.href.toUpperCase());	// precitaj typ: ALLY - VILLAGE - PLAYER
	var objectID = paramValue("ID", window.location.href.toUpperCase());		// precitaj ID
	var objectName = "";								// nuluj meno

	var savedParams = GM_getValue(selectionName, "");			// precitaj meno/typ/id
	if (savedParams != "") {						// ak bolo nieco ulozene
		GM_deleteValue(selectionName);					// tak to vymaz
		var paramsArray = savedParams.split(SPRTR);			// a rozdel to na retazce
		if (paramsArray.length == 3) {					// ked su tam tri polozky
			if ((objectType == paramsArray[1]) && (objectID == paramsArray[2])) {
				objectName = paramsArray[0];			// ked sa typ a ID rovnaju, nastav meno
			}
			else {							// ked nie,
				objectType = T_PLAYER;				// nastav objectType na "PLAYER"
				objectID = 0;					// a vynuluj objectID
			}
		}
	}

	// search for <p class="error">You need a premium account for this game feature. <a href="game.php?village=36772&amp;s=premium">
	var pNodes = xpath(document, '//p[@class="error"]/a[contains(@href, "s=premium")]');
	if (pNodes.snapshotLength == 1) {
		var node = pNodes.snapshotItem(0).parentNode;

		var editedRow = -1;

		var pNode = node.parentNode;					// odpamataj rodica
		removeAllChildren(pNode);					// odstran vsetko, co je dnu

		node = document.createElement("h1");				// pridaj nazov
		node.innerHTML = text.getTranslation("editSelections");
		pNode.appendChild(node);

		node = document.createElement("table");
		node.className = "borderlist";
		node.width = "500";
		pNode.appendChild(node);					// at the end of the list of child nodes
		node.insertRow(NA_KONIEC);					// vloz prvy riadok
		var thNode = document.createElement("th")			// a do neho urob <TH>
		thNode.colSpan = 4;
		thNode.innerHTML = text.getTranslation("objects");
		node.rows[0].appendChild(thNode);

		for (i = 1; i <= pocHracov; i++) {
			node.insertRow(i);					// vloz riadok pre tohoto hraca

			node.rows[i].insertCell(0);				// vloz prvu bunku
			node.rows[i].cells[0].innerHTML = '<div style="background: ' + objekty[i-1].color + ' none repeat scroll 0% 0%; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous;" class="color_field"></div>';

			node.rows[i].insertCell(1);				// vloz druhu bunku
			node.rows[i].cells[1].width = "100%";
			if (objekty[i-1].ID > 0) {
			     node.rows[i].cells[1].innerHTML = objekty[i-1].getLink(villageID);
			}
			else node.rows[i].cells[1].innerHTML = objekty[i-1].name;
// EDIT
			node.rows[i].insertCell(2);				// vloz tretiu bunku
			node.rows[i].cells[2].style.whiteSpace = "nowrap";
			var sType = ((objekty[i-1].getType() == TYPE_PLYR)?1:((objekty[i-1].getType() == TYPE_SETT)?0:2));	// 0 - osada; 1 - hrac; 2 - aliancia
			node.rows[i].cells[2].innerHTML = '<span id="' + edtObjClass+(i-1) + '" class="click" onclick="editColorType(' + sType + ', \'' + objekty[i-1].name + '\', \'' + objekty[i-1].color + '\'); return false;"><img src="http://' + window.location.host + '/img/arrow_right_raquo.png" alt=""> ' + text.getTranslation("edit") + '</span>';

			var aNode = document.getElementById(edtObjClass+(i-1));
			aNode.addEventListener("click", function() {
				editedRow = this.id.replace(edtObjClass,"");
				objectID = objekty[editedRow].ID;
				var node = document.getElementById(submitID);
				if (node) node.value = text.getTranslation("change");
			}, true);
// DELETE
			node.rows[i].insertCell(3);				// vloz stvrtu bunku
			node.rows[i].cells[3].style.whiteSpace = "nowrap";
			aNode = document.createElement("a");
			aNode.id = delObjClass + (i-1);
			aNode.href = "game.php?village=" + villageID + "&s=edit_player_colors";
			aNode.innerHTML = '<img src="http://' + window.location.host + '/img/arrow_right_raquo.png" alt=""> ' + text.getTranslation("remove") + '</a>';
			aNode.addEventListener("click", function() { var i = this.id.replace(delObjClass,""); objekty.splice(1*i, 1); storeMyObjects(); editedRow = -1; }, true);
			node.rows[i].cells[3].appendChild(aNode);
		}

		node = document.createElement("br");				// vytvor <br>
		pNode.appendChild(node);					// a vloz ho na koniec
		node = document.createElement("br");				// vytvor <br>
		pNode.appendChild(node);					// a vloz ho na koniec

		var fNode = document.createElement("form");			// vytvor <form
		fNode.method = "post";
		fNode.action = window.location.href;
		fNode.name = FORM_NAME;
		pNode.appendChild(fNode);					// a vloz ho na koniec

		node = document.createElement("br");				// vytvor <br>
		pNode.appendChild(node);					// a vloz ho na koniec

		node = document.createElement("table");				// vytvor <table
		node.className = "borderlist";
		node.width = "500";
		fNode.appendChild(node);					// vloz ju na koniec

		node.insertRow(NA_KONIEC);					// vloz riadok zahlavia
		thNode = document.createElement("th")				// a do neho urob <TH>
		thNode.colSpan = 3;
		thNode.innerHTML = text.getTranslation("newSelection");
		node.rows[0].appendChild(thNode);

		node.insertRow(NA_KONIEC);					// vloz prvy riadok
		node.rows[1].insertCell(NA_KONIEC);				// vloz prvu bunku
		node.rows[1].cells[0].align = "center";
		node.rows[1].cells[0].vAlign = "center";
		node.rows[1].cells[0].innerHTML = '<div style="background: #000000 none repeat scroll 0% 0%; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous; width: 50px; height: 50px;" class="color_field" id="' + INPUT_OC_NAME + '"></div>';
		node.rows[1].insertCell(NA_KONIEC);				// vloz druhu bunku
		node.rows[1].cells[1].colSpan = 2;				// v nej bude farebna paleta
		pNode = node.rows[1].cells[1];

			var cNode = document.createElement("table");
			cNode.className = "noborder";				// vytvor tabulku
			cNode.border = 0;
			cNode.cellPadding = 2;
			pNode.appendChild(cNode);				// a vloz ju

			cNode.insertRow(NA_KONIEC);				// vloz prvy riadok - cervena
			var r = 0;
			var s = -1;
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = text.getTranslation("red");
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = '<input id="color_red" name="color_red" style="width: 50px;" value="0" onchange="setPreviewColor();">';
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = setColour('#FF0000');
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = setColour('#FF00FF');
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = setColour('#0000EA');
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = setColour('#009CEA');
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = setColour('#00FFFF');
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = setColour('#00FF00');
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = setColour('#FFFF00');
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = setColour('#FF7F00');
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = setColour('#FFFFFF');

			cNode.insertRow(NA_KONIEC);				// vloz druhy riadok - zelena
			r++; s = -1;
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = text.getTranslation("green");
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = '<input id="color_green" name="color_green" style="width: 50px;" value="0" onchange="setPreviewColor();">';
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = setColour('#BF0000');
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = setColour('#BF00BF');
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = setColour('#0000B7');
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = setColour('#0078B7');
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = setColour('#00BFBF');
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = setColour('#00BF00');
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = setColour('#EAC300');
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = setColour('#BF5F00');
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = setColour('#8F8F8F');

			cNode.insertRow(NA_KONIEC);				// vloz treti riadok - modra
			r++; s = -1;
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = text.getTranslation("blue");
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = '<input id="color_blue" name="color_blue" style="width: 50px;" value="0" onchange="setPreviewColor();">';
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = setColour('#7F0000');
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = setColour('#820082');
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = setColour('#00007A');
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = setColour('#00507A');
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = setColour('#007F7F');
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = setColour('#007F00');
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = setColour('#7F7F00');
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = setColour('#7F3F00');
			cNode.rows[r].insertCell(NA_KONIEC); s++;
			cNode.rows[r].cells[s].innerHTML = setColour('#000000');

		node.insertRow(NA_KONIEC);					// vloz druhy riadok
		node.rows[2].insertCell(NA_KONIEC);				// vloz prvu bunku
		node.rows[2].cells[0].innerHTML = text.getTranslation("objectsName");
		node.rows[2].insertCell(NA_KONIEC);				// vloz druhu bunku
		node.rows[2].cells[1].colSpan = 2;				// v nej bude input na nacitanie nazvu objektu
		node.rows[2].cells[1].innerHTML = '<input name="' + INPUT_ON_NAME + '" style="width: 150px;" value="' + objectName + '"><br><div id="search_suggest_div" class="search_suggest_div"></div>';

		node.insertRow(NA_KONIEC);					// vloz treti riadok
//		node.rows[3].style.visibility = "hidden";
		node.rows[3].insertCell(NA_KONIEC);				// vloz prvu bunku
		node.rows[3].cells[0].innerHTML = text.getTranslation("objectsType");
		node.rows[3].cells[0].style.borderRightStyle = "none";
		node.rows[3].insertCell(NA_KONIEC);				// vloz druhu bunku
		node.rows[3].cells[1].colSpan = 2;				// v nej bude select na objekty
		node.rows[3].cells[1].style.borderLeftStyle = "none";
		node.rows[3].cells[1].innerHTML = '<select name="' + INPUT_OT_NAME + '" style="width: 150px;"><option value="' + TYPE_SETT + ((objectType == T_SETTLEMENT)?'" selected="selected':'') + '">' + text.getTranslation("settlement") + '</option><option value="' + TYPE_PLYR + ((objectType == T_PLAYER)?'" selected="selected':'') + '">' + text.getTranslation("player") + '</option><option value="' + TYPE_ALLY + ((objectType == T_ALLY)?'" selected="selected':'') + '">' + text.getTranslation("alliance") + '</option></select>';

// SUBMIT
		node = document.createElement("input");
		node.value = text.getTranslation("add");
		node.id = submitID;
		node.type = "submit";
		node.addEventListener("click", function() {
			var oType = getInputNode(FORM_NAME, INPUT_OT_NAME).value;
			var oName = getInputNode(FORM_NAME, INPUT_ON_NAME).value;
			var oColor = getColor(document.getElementById(INPUT_OC_NAME).style.backgroundColor);
			if (oName != "") {
			var naMiesto = objekty.length;
			if (editedRow >= 0) {
				naMiesto = editedRow;
				editedRow = -1;
			}
			else for (i = 0; i < naMiesto; i++) if (objekty[i].name == oName) {
				naMiesto = i;
				break;
			}
			if (naMiesto < MAX_SELECTIONS) {
				objekty[naMiesto] = new objekt(oType, objectID, oName, oColor);
				storeMyObjects();
			}
			else alert(text.getTranslation("maximumCount"));
			}
		}, true);

		fNode.appendChild(node);
	}
}
else if (sPar == "MAP") {
	var pNodes = xpath(document, '//table[@class="map_colors"]');		// hladaj <table class="map_colors"
	if (pNodes.snapshotLength == 1) {
		var pNode = pNodes.snapshotItem(0);				// pNode je tabulka
		var actRow = 2;							// zaciname od 2.-ho riadku
		var actCol = pNode.rows[actRow].cells.length - 1;		// zisti pocet buniek v poslednom riadku

		for (var i = 0; i < objekty.length; i++) {
			if (actCol >= MAX_COLS) {				// ak mame plno,
				pNode.insertRow(++actRow);			// tak vloz novy riadok
				pNode.rows[actRow].insertCell(actCol = 0);	// a prvu (prazdnu) bunku
				pNode.rows[actRow].cells[0].innerHTML = "&nbsp;";
			}
			pNode.rows[actRow].insertCell(++actCol);		// vloz bunku s farbou
			pNode.rows[actRow].cells[actCol].innerHTML = '<div style="background: ' + objekty[i].color + ' none repeat scroll 0% 0%; width: 10px; height: 10px; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous;"></div>';
			pNode.rows[actRow].insertCell(++actCol);		// vloz bunku s nazvom objektu
			if (objekty[i].ID > 0) {
			     pNode.rows[actRow].cells[actCol].innerHTML = objekty[i].getLink(villageID);
			}
			else pNode.rows[actRow].cells[actCol].innerHTML = objekty[i].name;
		}

		var fNode = document.createElement("form");
		fNode.method = "post";
		fNode.action = "game.php?village=14755&s=map";
		fNode.name = formName;

		var tNode = document.createElement("table");
		tNode.className = "borderlist";
		tNode.insertRow(0);
		tNode.rows[0].insertCell(0);	tNode.rows[0].cells[0].innerHTML = "x: ";
		tNode.rows[0].insertCell(1);	tNode.rows[0].cells[1].innerHTML = '<input id="' + xName + '" name="' + xName + '" style="width: 50px;" value="" onkeyup="splitxy(\'' + xName + '\', \'' + yName + '\')">';
		tNode.rows[0].insertCell(2);	tNode.rows[0].cells[2].innerHTML = "y: ";
		tNode.rows[0].insertCell(3);	tNode.rows[0].cells[3].innerHTML = '<input id="' + yName + '" name="' + yName + '" style="width: 50px;" value="">';

		var sNode = document.createElement("span");
		sNode.className = "click";
		sNode.innerHTML = '<img src="http://s3.kingsage.org/img/arrow_right_raquo.png" alt=""> ' + text.getTranslation("goTo");
		sNode.addEventListener("click", function() {
			var xValue = 1*getInputNode(formName, xName).value;
			var yValue = 1*getInputNode(formName, yName).value;

			if (!isNaN(xValue) && !isNaN(yValue))
			if ((xValue > 0) && (yValue > 0) && (xValue < 1000) && (yValue < 1000)) {
				if (gameVersion.compareWith("1.1.1") == cHIGHER) {
					// v.1.1.2 changed the way of creating map
					// http://*.kingsage.*/game.php?village=vvvvv&s=map&x=XXX&y=YYY
					window.location.href = window.location.protocol + '//' + window.location.host + '/game.php?village=' + villageID + '&s=map&x=' + xValue + '&y=' + yValue;
				}
				else {
					var iNodes = xpath(document, '//iframe');	// search for <iframe
					if (iNodes.snapshotLength == 1) {
						var iNode = iNodes.snapshotItem(0);
						iNode.src = replaceValue(iNode.src, "x", xValue);
						iNode.src = replaceValue(iNode.src, "y", yValue);
					}
				}
			}
		}, true);
		tNode.rows[0].insertCell(4);	tNode.rows[0].cells[4].appendChild(sNode);

		fNode.appendChild(tNode);					// append table	to form
		pNode.parentNode.insertBefore(fNode, pNode);			// insert form to page

		// Version
		fNode.parentNode.insertBefore(versionParagraph(scriptVersion, scriptID), fNode.nextSibling);
		
		tNode = document.createElement("br");
		fNode.parentNode.insertBefore(tNode, sNode.nextSibling);	// append <br> after form
	}

	// v.1.1.2 changed the way of creating map
	if (gameVersion.compareWith("1.1.1") == cHIGHER)
	if (pocHracov > 0) {
		depictureObjects();

		// <img id="minimap_jumpclick" onclick="obj_minimap.jumpClick(event)" ...
		var minimapClick = xpath(document, '//img[(@id="minimap_jumpclick") and contains(@onclick, "obj_minimap.jumpClick")]');
		if (minimapClick.snapshotLength == 1) {
			minimapClick = minimapClick.snapshotItem(0);
			// add objects' depicturing to minimap jumps
			minimapClick.addEventListener("click", function() {
				depictureObjects();
			}, true);
		}

		var minimapClick = xpath(document, '//td[contains(@onclick, "MapGoLink")]');
		for (var i = 0; i < minimapClick.snapshotLength; i++) {
			var moveTheMap = minimapClick.snapshotItem(i);
			// add objects' depicturing to map moving controls
			moveTheMap.addEventListener("click", function() {
				depictureObjects();
			}, false);
		}
	}
}
else if ((window.location.href.indexOf("map.php") > 0) && (pocHracov > 0)) {	// sme v mape a mame nejake znacky
	depictureObjects();
}

if (sPar.slice(0,4) == "INFO") { 				// "INFO_PLAYER" or "INFO_VILLAGE" or "INFO_ALLY"
// <a href="game.php?village=xxxx&amp;s=edit_player_colors&amp;type=player &amp;id=yyyy"><img src="http://s5.kingsage.org/img/arrow_right_raquo.png" alt=""> Mark on map</a><br>
// <a href="game.php?village=xxxx&amp;s=edit_player_colors&amp;type=ally   &amp;id=yyyy"><img src="http://s5.kingsage.org/img/arrow_right_raquo.png" alt=""> Mark on map</a><br>
// <a href="game.php?village=xxxx&amp;s=edit_player_colors&amp;type=village&amp;id=yyyy"><img src="http://s5.kingsage.org/img/arrow_right_raquo.png" alt=""> Mark on map</a><br>
	var aNodes = xpath(document, '//a[contains(@href, "s=edit_player_colors")]');		// pohladaj vsetky <a href=...s=edit_player_colors...
	for (var i = 0; i < aNodes.snapshotLength; i++) {
		var aNode = aNodes.snapshotItem(i);				// ak obsahuju s=edit_player_colors, pridaj eventListener
		if (paramValue("S", aNode.href.toUpperCase()) == "EDIT_PLAYER_COLORS") {
			aNode.addEventListener("click", function() { 
				var hNodes = xpath(document, '//h1');		// search all <h1>
				if (hNodes.snapshotLength == 1) {
					var hNode = hNodes.snapshotItem(0);
					var _name = trimStr(hNode.innerHTML);
					var j = _name.indexOf(" ");
					var _type = paramValue("TYPE", this.href.toUpperCase());
					if (_type == "PLAYER") {
						var xNode = getNextSibling(getNextSibling(getNextSibling(hNode)));	// <div> <br> <table>
						xNode = getFirstChild(xNode.rows[0].cells[0]);
						var nameX = "";

						hNodes = xpath(document, '//table[@class="borderlist"]');
						for (var k = 0; k < hNodes.snapshotLength; k++) {
							hNode = hNodes.snapshotItem(k);
							if (hNode == xNode) {
								nameX = longestCommonSubstring (_name, hNode.rows[0].cells[0].innerHTML);
								break;
							}
						}
						if (nameX != "") _name = nameX;
						else _name = _name.slice(j+1);
					}
					else _name = _name.slice(j+1);
					_name = trimStr(_name);
					if (j > 0) GM_setValue(selectionName, _name+SPRTR+_type+SPRTR+paramValue("ID", this.href.toUpperCase()));
				}
			}, true);
			break;
		}
	}
}
} // DO NOT TOUCH!! -> function main() {

// FUNCTIONS ************************************************************************************************************

function versionParagraph (ver, ID) {
	var pNode = document.createElement("div");			// create paragraph

	var aNode = document.createElement("a");			// create link to userscripts.org
	aNode.href="http://userscripts.org/scripts/show/" + ID;
	aNode.style.fontWeight = "bold";
	aNode.alt = aNode.title = "KingsAge Mark On Map @ userscripts.org";
	aNode.target = "_blank";
	aNode.innerHTML = "Mark On Map v." + ver;			// set the version

	pNode.appendChild(aNode);
	pNode.style.cssFloat = "right";
	pNode.style.fontWeight = "bold";
	pNode.style.position = "relative";
	pNode.style.top = "-20px";
	pNode.style.right = "22px";
	return (pNode);
}

function depictureObjects () {
	var pNode = xpath(document, '//div[@id="map"]');		// search for <div id="map">
	if (pNode.snapshotLength == 1) pNode = pNode.snapshotItem(0);
	else return;

	pNode = getFirstChild(pNode);					// first child should be table
	if (pNode.nodeName == "TABLE") {
		var towns, aNode, tNode;

		if (gameVersion.compareWith("1.1.1") == cHIGHER) {
			// search for <td data-info="occupied" ...><div><a href=...><img src=...><div></div></a></div></td>
			towns = xpath(pNode, 'descendant::td[contains(@data-info, "occupied")]/div/a');
		}
		else {
			// search for <td><a href=...><img src=...></a></td>
			towns = xpath(pNode, 'descendant::td/a/img/..');
		}

		for (var i = 0; i < towns.snapshotLength; i++) {
			var aNode = towns.snapshotItem(i);		// <a node
			var tNode = aNode.parentNode;			// <td resp. <div node

			for (var j = 0; j < pocHracov; j++) if (objekty[j].getType() != TYPE_UNKNOWN) {
				if ((objekty[j].getType() == TYPE_SETT) && (objekty[j].ID > 0)) {
					if (objekty[j].ID == paramValue("ID", aNode.href.toUpperCase())) tNode.style.backgroundColor = objekty[j].color;
					continue;
				}
				var zac = tNode.innerHTML.indexOf("tooltipDetails");
				if (zac > 0) {
					var txt = tNode.innerHTML.substr(zac);		// jump over beginning
					zac = txt.indexOf("'");				// first apostrophe
					txt = txt.substr(zac+1);			// move to beginning
					var kon = txt.indexOf("'");			// second apostrophe
					if (objekty[j].getType() == TYPE_SETT) {
						var t = trimStr(txt.substr(0, kon));	// text for settlement
						if (t.indexOf(objekty[j].name+" (") >= 0) tNode.style.backgroundColor = objekty[j].color;
						continue;
					}
					txt = txt.substr(kon+1);			// jump thereinafter

					zac = txt.indexOf("'");				// first apostrophe
					txt = txt.substr(zac+1);			// move to beginning
					kon = txt.indexOf("'");				// second apostrophe
					t   = txt.substr(0, kon);			// text for points number
					txt = txt.substr(kon+1);			// jump thereinafter

					zac = txt.indexOf("'");				// first apostrophe
					txt = txt.substr(zac+1);			// move to beginning
					kon = txt.indexOf("'");				// second apostrophe
					if (objekty[j].getType() == TYPE_PLYR) {
						var t = trimStr(txt.substr(0, kon));	// text for player
						if (t.indexOf(objekty[j].name+" (") >= 0) tNode.style.backgroundColor = objekty[j].color;
						continue;
					}
					txt = txt.substr(kon+1);			// jump thereinafter

					zac = txt.indexOf("'");				// first apostrophe
					txt = txt.substr(zac+1);			// move to beginning
					kon = txt.indexOf("'");				// second apostrophe
					if (objekty[j].getType() == TYPE_ALLY) {
						var t = trimStr(txt.substr(0, kon));	// text for alliance
						if (t.indexOf(objekty[j].name+" (") >= 0) tNode.style.backgroundColor = objekty[j].color;
					}
				}
			}
		}
	}
}

function getColor(clr) {
	if (clr.charAt(0) != "#") {
		var hex = "0123456789ABCDEF";

		clr = clr.replace("rgb(",""); clr = clr.replace(")","");
		clr = clr.replace(" ","");

		var xxx = clr.split(",");
		var r = xxx[0];
		var g = xxx[1];
		var b = xxx[2];

		clr = hex.charAt(b % 16);
		b = b >> 4;
		clr = hex.charAt(b % 16) + clr;
		clr = hex.charAt(g % 16) + clr;
		g = g >> 4;
		clr = hex.charAt(g % 16) + clr;
		clr = hex.charAt(r % 16) + clr;
		r = r >> 4;
		clr = hex.charAt(r % 16) + clr;

		clr = '#' + clr;
	}
	return(clr);
}

function storeMyObjects() {
	var txt = "";
	for (var i = 0; i < objekty.length; i++) txt += ((i>0)?vSPRTR:"")+objekty[i].getRec();

	GM_setValue(colourLabel, txt);
}

function setColour(col) {
	return ('<div style="background: ' + col + ' none repeat scroll 0% 0%; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous;" class="color_field" onclick="setColorValues(\'' + col + '\');"></div>');
}

function getNextSibling(node) {
	do { node = node.nextSibling; } while (node && (node.nodeType != 1));
	return (node);
}

function removeAllChildren(node) {
	while (node.firstChild) node.removeChild(node.firstChild);
}

function getInputNode(formName, inputName) {			// The document object is an XPCNativeWrapper,
	var form = document.forms.namedItem(formName);		// and it does not support the shorthand of getting an element by ID
	if (form) return(form.elements.namedItem(inputName));
	else return (form);
}

function paramValue(name, url_string) {
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(url_string);
	if (results == null)	return "";
	else			return results[1];
}

function replaceValue(url_string, name, newValue) {
	var uriArray = url_string.split("?");			// break up url/query
	if (uriArray.length < 2) return (url_string);		// doesn't contain "?" or there's nothing after "?"

	var paramsArray = uriArray[1].split("&");		// break up the query
	var i = 0;

	while (i < paramsArray.length) {
		var itemsArray = paramsArray[i].split("=");	// split name/value pairs

		if (itemsArray[0] == name) {
			if (newValue != "") {
				paramsArray[i] = itemsArray[0] + "=" + newValue;
			}
			else {
				paramsArray.splice(i, 1);	// vymaz tento parameter
				i--;				// dekrementuj, nizsie sa bude inkrementovat
			}
		}
		i++;
	}

	return(uriArray[0] + "?" + paramsArray.join("&"));
}

function xpath(node, query) {
	return document.evaluate(query, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function getFirstChild(node) {
	var nextNode = node.firstChild;
	while (nextNode && (nextNode.nodeType != 1)) {
		nextNode = nextNode.nextSibling;
	}
	return (nextNode);
}

function trimStr(str) {		// thanks to Steve @ http://blog.stevenlevithan.com/archives/faster-trim-javascript
	if (!str) return("");
	var	str = str.replace(/^\s\s*/, ''),
		ws = /\s/,
		i = str.length;
	while (ws.test(str.charAt(--i)));
	return str.slice(0, i + 1);
}

function legend (domain, txtObj) {					// language handling
	const unknownSomething = "???";
	const unknownLanguage = "unknownLanguage";
	var languageIndex = {unknownLanguage: "en", "sk": "sk", "org": "en"};
	var languageID = unknownLanguage;
	var _texty = txtObj;

	var m, n;
	n = (m = domain.match(new RegExp("\.([a-z]{2,6})$","i"))) ? m[1] : this.unknownLanguage;
	if (typeof languageIndex[n] == "undefined") n = unknownLanguage;
	this.languageID = n;

	this.getLanguage = function () {				// returns appropriate part of texty
		return (_texty[languageIndex[this.languageID]]);
	}
	this.getTranslation = function (txt) {
		if (_texty != "undefined") return (this.getText (txt, this.languageID));
		else return (unknownSomething);
	}
	this.getText = function (txt, langID) {
		var lang = languageIndex[langID];
		var langObj = _texty[lang];

		var tokens = txt.split('.');
		for (var i = 0; i < tokens.length; i++) {
			if(typeof(langObj[tokens[i]]) != "undefined") langObj = langObj[tokens[i]];
			else return ((langID == unknownLanguage)? unknownSomething : this.getText(txt, unknownLanguage));
		}
		return (langObj);
	}
}

function longestCommonSubstring (str1, str2) {		// http://en.wikibooks.org/wiki/Algorithm_implementation/Strings/Longest_common_substring#PHP
	var m = str1.length;				// "translated" PHP algorithm
	var n = str2.length;
	var L = new Array();
	var z = 0;
	var ret;
 
	for (var i = 0; i < m; i++) {
		L[i] = new Array();
		for (var j = 0; j < n; j++) L[i][j] = 0;
	}
 
	for (var i = 0; i < m; i++) {
		for (var j = 0; j < n; j++) {
			if (str1[i] == str2[j]) {
				
				if ((i == 0) || (j == 0)) L[i][j] = 1;
				else L[i][j] = L[i-1][j-1] + 1;

				if (L[i][j] > z) {
					z = L[i][j];
					ret = "";
				}

				if (L[i][j] == z) ret = str1.substr(i-z+1, z);
			}
		}
	}
	return (ret);
}

function waitForReady(callback, delayInMS) {			// thanks GIJoe
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
