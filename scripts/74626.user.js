// Copyright (c) 2009-2010, RxR

// ==UserScript==
// @name KingsAge Mark On Map
// @namespace RxR KingsAge
// @description This script creates "s=edit_player_colors" page and and prepares data from "Mark on map"
//
// @include http://s*.kingsage.*/*
//
// @history  0.01 26.12.2009	created basic algorithm
// @history  0.10 27.12.2009	basic algorithm debugged
// @history  0.20 27.12.2009	legend is diplayed on game.php*s=map* page
// @history  1.00 28.12.2009	displaying on map (only players are supported)
// @history  2.00 27.02.2010	settlements and alliances are supported; objects are sorted by type, e.g. in order ally-player-settlement
// @history  2.01 27.02.2010	support for more than 5 objects
// @history  2.02 15.03.2010	getInfoTxt and getLink functions were added
// @history  3.00 19.03.2010	handling of link "Mark on map"
// @history  3.01 08.04.2010	fixed bug which caused loss of object's ID while editing
//
// ==/UserScript==

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

var unknownLanguage = "unknown";
var textyLanguageIndex = {unknownLanguage:0, "sk":1, "org":0, "net":2, "net":3, "net":4, "net":5, "net":6, "net":7, "net":8, "net":9, "net":10, "net":11, "net":12, "net":13, "net":14, "net":15, "net":16, "net":17, "net":18, "net":19, "net":20, "net":21, "net":22, "net":23, "net":24, "net":25, "net":26, "net":27, "net":28, "net":29, "net":30};
var texty_language_id = getLanguageID(window.location.hostname, textyLanguageIndex);

var colourLabel = "Seçenekler " + window.location.hostname;
var selectionName = "Name " + window.location.hostname;
var delObjClass = "RxR_del_";
var edtObjClass = "RxR_edt_";
var submitID = "RxR_MoM";
var pocHracov = 0;

var texty;
texty = [
	 ["You need a premium account for this game feature",	"xxx"]				//  0
	,["Edit selections",					"Seçenekleri düzenle"]		//  1
	,["Objects",						"Nesne"]			//  2
	,["Edit",						"Düzenle"]			//  3
	,["Remove",						"Kaldır"]			//  4
	,["New selection",					"Yeni Seçim"]		//  5
	,["Object's name:",					"Nesne ismi:"]		//  6
//	,["Create",						"Yarat"]			//  7
	,["Add",						"Ekle"]			//  7
	,["Red:",						"Kırmızı:"]			//  8
	,["Green:",						"Yeşil:"]			//  9
	,["Blue:",						"Mavi:"]			// 10
	,["Object's type:",					"Nesne şekli:"]			// 11
	,["Settlement",						"Seç"]			// 12
	,["Player",						"Oyuncu"]				// 13
	,["Alliance",						"Ittıfak"]			// 14
	,["Maximum selections count is "+MAX_SELECTIONS+".",	"En çok seçme sayısı "+MAX_SELECTIONS+"."]	// 15
	,["Change",						"Değiştir"]			// 16
	];

var objekty = new Array();

// objekt template
function objekt (_type, _ID, _name, _clr) {		// zakladne atributy su typ, ID, meno a farba
	switch(1*_type) {
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

	this.xPos  = 0;					// osada ma este poziciu
	this.yPos  = 0;

	this.setXY  = function(xy) { var xxx = xy.split("|"); if (xxx.length == 2) { this.xPos = 1*xxx[0]; this.yPos = 1*xxx[1]; }}
	this.getInfoTxt = function() { switch (1*this.type) { case TYPE_SETT: return ("info_village"); break; case TYPE_ALLY: return ("info_ally"); break; default: return ("info_player"); }}
	this.getLink = function(villageID) { return ('<a href="game.php?village=' + villageID + '&s=' + this.getInfoTxt() + '&id=' + this.ID + '">' + this.name + '</a>'); }
	this.getRec  = function() { return (this.type + SPRTR + this.ID + SPRTR + this.name + SPRTR + this.color + SPRTR + this.xPos + SPRTR + this.yPos); };
	this.fromRec  = function(ret) {
				var xxx = ret.split(SPRTR);
				var i = 0;
				this.type  = xxx[i++];
				this.ID    = 1*xxx[i++];
				this.name  = trimStr(xxx[i++]);
				this.color = xxx[i++];
				this.xPos  = 1*xxx[i++];
				this.yPos  = 1*xxx[i++]; }
}

function usporiadajObjekty () {
	function mensiObjekt(a, b) {
		return (b.type < a.type);
	}

	objekty.sort(mensiObjekt);
}

if (GM_getValue) {							// nacitaj objekty
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

	var savedParams = (GM_getValue)?GM_getValue(selectionName, ""):"";	// precitaj meno/typ/id
	if (savedParams != "") {						// ak bolo nieco ulozene
		if (GM_deleteValue) GM_deleteValue(selectionName);		// tak to vymaz
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

	var pNodes = xpath(document, '//p[@class="error"]');		// hladaj <p class="error">You need a premium account for this game feature.
	for (var i = 0; i< pNodes.snapshotLength; i++) {
		var node = pNodes.snapshotItem(i);
		if (node.innerHTML.indexOf(texty[0][texty_language_id]) > -1) {
			var editedRow = -1;

			var pNode = node.parentNode;			// odpamataj rodica
			removeAllChildren(pNode);			// odstran vsetko, co je dnu

			node = document.createElement("h1");		// pridaj nazov
			node.innerHTML = texty[1][texty_language_id];
			pNode.appendChild(node);

			node = document.createElement("table");
			node.className = "borderlist";
			node.width = "500";
			pNode.appendChild(node);			// at the end of the list of child nodes
			node.insertRow(NA_KONIEC);			// vloz prvy riadok
			var thNode = document.createElement("th")	// a do neho urob <TH>
			thNode.colSpan = 4;
			thNode.innerHTML = texty[2][texty_language_id];
			node.rows[0].appendChild(thNode);

			for (i = 1; i <= pocHracov; i++) {
				node.insertRow(i);			// vloz riadok pre tohoto hraca

				node.rows[i].insertCell(0);		// vloz prvu bunku
				node.rows[i].cells[0].innerHTML = '<div style="background: ' + objekty[i-1].color + ' none repeat scroll 0% 0%; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous;" class="color_field"></div>';

				node.rows[i].insertCell(1);		// vloz druhu bunku
				node.rows[i].cells[1].width = "100%";
				if (objekty[i-1].ID > 0) {
				     node.rows[i].cells[1].innerHTML = objekty[i-1].getLink(villageID);
				}
				else node.rows[i].cells[1].innerHTML = objekty[i-1].name;

// EDIT
				node.rows[i].insertCell(2);		// vloz tretiu bunku
				node.rows[i].cells[2].style.whiteSpace = "nowrap";
				var sType = ((1*objekty[i-1].type == TYPE_PLYR)?1:((1*objekty[i-1].type == TYPE_SETT)?0:2));	// 0 - osada; 1 - hrac; 2 - aliancia
				node.rows[i].cells[2].innerHTML = '<span id="' + edtObjClass+(i-1) + '" class="click" onclick="editColorType(' + sType + ', \'' + objekty[i-1].name + '\', \'' + objekty[i-1].color + '\'); return false;"><img src="http://' + window.location.host + '/img/arrow_right_raquo.png" alt=""> ' + texty[3][texty_language_id] + '</span>';

				var aNode = document.getElementById(edtObjClass+(i-1));
				aNode.addEventListener("click", function() {
						editedRow = this.id.replace(edtObjClass,"");
						objectID = objekty[editedRow].ID;
						var node = document.getElementById(submitID);
						if (node) node.value = texty[16][texty_language_id];
					}, true);

// DELETE
				node.rows[i].insertCell(3);		// vloz stvrtu bunku
				node.rows[i].cells[3].style.whiteSpace = "nowrap";
				aNode = document.createElement("a");
				aNode.id = delObjClass + (i-1);
				aNode.href = "game.php?village=" + villageID + "&s=edit_player_colors";
				aNode.innerHTML = '<img src="http://' + window.location.host + '/img/arrow_right_raquo.png" alt=""> ' + texty[4][texty_language_id] + '</a>';
				aNode.addEventListener("click", function() { var i = this.id.replace(delObjClass,""); objekty.splice(1*i, 1); storeMyObjects(); editedRow = -1; }, true);
				node.rows[i].cells[3].appendChild(aNode);
			}

			node = document.createElement("br");		// vytvor <br>
			pNode.appendChild(node);			// a vloz ho na koniec
			node = document.createElement("br");		// vytvor <br>
			pNode.appendChild(node);			// a vloz ho na koniec

			var fNode = document.createElement("form");	// vytvor <form
			fNode.method = "post";
			fNode.action = window.location.href;
			fNode.name = FORM_NAME;
			pNode.appendChild(fNode);			// a vloz ho na koniec

			node = document.createElement("br");		// vytvor <br>
			pNode.appendChild(node);			// a vloz ho na koniec

			node = document.createElement("table");		// vytvor <table
			node.className = "borderlist";
			node.width = "500";
			fNode.appendChild(node);			// vloz ju na koniec

			node.insertRow(NA_KONIEC);			// vloz riadok zahlavia
			thNode = document.createElement("th")		// a do neho urob <TH>
			thNode.colSpan = 3;
			thNode.innerHTML = texty[5][texty_language_id];
			node.rows[0].appendChild(thNode);

			node.insertRow(NA_KONIEC);			// vloz prvy riadok
			node.rows[1].insertCell(NA_KONIEC);		// vloz prvu bunku
			node.rows[1].cells[0].align = "center";
			node.rows[1].cells[0].vAlign = "center";
			node.rows[1].cells[0].innerHTML = '<div style="background: #000000 none repeat scroll 0% 0%; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous; width: 50px; height: 50px;" class="color_field" id="' + INPUT_OC_NAME + '"></div>';
			node.rows[1].insertCell(NA_KONIEC);		// vloz druhu bunku
			node.rows[1].cells[1].colSpan = 2;		// v nej bude farebna paleta
			pNode = node.rows[1].cells[1];

				var cNode = document.createElement("table");
				cNode.className = "noborder";		// vytvor tabulku
				cNode.border = 0;
				cNode.cellPadding = 2;
				pNode.appendChild(cNode);		// a vloz ju

				cNode.insertRow(NA_KONIEC);		// vloz prvy riadok - cervena
				var r = 0;
				var s = -1;
				cNode.rows[r].insertCell(NA_KONIEC); s++;
				cNode.rows[r].cells[s].innerHTML = texty[8][texty_language_id];
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

				cNode.insertRow(NA_KONIEC);		// vloz druhy riadok - zelena
				r++; s = -1;
				cNode.rows[r].insertCell(NA_KONIEC); s++;
				cNode.rows[r].cells[s].innerHTML = texty[9][texty_language_id];
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

				cNode.insertRow(NA_KONIEC);		// vloz treti riadok - modra
				r++; s = -1;
				cNode.rows[r].insertCell(NA_KONIEC); s++;
				cNode.rows[r].cells[s].innerHTML = texty[10][texty_language_id];
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

			node.insertRow(NA_KONIEC);			// vloz druhy riadok
			node.rows[2].insertCell(NA_KONIEC);		// vloz prvu bunku
			node.rows[2].cells[0].innerHTML = texty[6][texty_language_id];
			node.rows[2].insertCell(NA_KONIEC);		// vloz druhu bunku
			node.rows[2].cells[1].colSpan = 2;		// v nej bude input na nacitanie nazvu objektu
			node.rows[2].cells[1].innerHTML = '<input name="' + INPUT_ON_NAME + '" style="width: 150px;" value="' + objectName + '"><br><div id="search_suggest_div" class="search_suggest_div"></div>';

			node.insertRow(NA_KONIEC);			// vloz treti riadok
//			node.rows[3].style.visibility = "hidden";
			node.rows[3].insertCell(NA_KONIEC);		// vloz prvu bunku
			node.rows[3].cells[0].innerHTML = texty[11][texty_language_id];
			node.rows[3].cells[0].style.borderRightStyle = "none";
			node.rows[3].insertCell(NA_KONIEC);		// vloz druhu bunku
			node.rows[3].cells[1].colSpan = 2;		// v nej bude select na objekty
			node.rows[3].cells[1].style.borderLeftStyle = "none";
			node.rows[3].cells[1].innerHTML = '<select name="' + INPUT_OT_NAME + '" style="width: 150px;"><option value="' + TYPE_SETT + ((objectType == T_SETTLEMENT)?'" selected="selected':'') + '">' + texty[12][texty_language_id] + '</option><option value="' + TYPE_PLYR + ((objectType == T_PLAYER)?'" selected="selected':'') + '">' + texty[13][texty_language_id] + '</option><option value="' + TYPE_ALLY + ((objectType == T_ALLY)?'" selected="selected':'') + '">' + texty[14][texty_language_id] + '</option></select>';

// SUBMIT
			node = document.createElement("input");
			node.value = texty[7][texty_language_id];
			node.id = submitID;
			node.type = "submit";
			node.addEventListener("click",
				function() {
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
						else alert(texty[15][texty_language_id]);
					}
				}, true);

			fNode.appendChild(node);

			break;
		}
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
	}
}
else if ((window.location.href.indexOf("map.php") > 0) && (pocHracov > 0)) {	// sme v mape a mame nejake znacky
	var pNode = document.getElementById("map");				// hladaj <div id="map">
	if (pNode)
	if (pNode.nodeName == "DIV") {
		pNode = getFirstChild(pNode);					// prvy potomok by mala byt tabulka
		if (pNode.nodeName == "TABLE") {
			for (var r = 0; r < pNode.rows.length; r++)
			for (var s = 0; s < pNode.rows[r].cells.length; s++) {
				var node = pNode.rows[r].cells[s];
				for (var o = 0; o < pocHracov; o++)
				switch (1*objekty[o].type) {
					case TYPE_PLYR:
						if (node.innerHTML.indexOf(objekty[o].name+" (") > 0) node.style.backgroundColor = objekty[o].color;
						break;
					case TYPE_SETT:
						if (node.innerHTML.indexOf(objekty[o].name+" (") > 0) node.style.backgroundColor = objekty[o].color;
						break;
				}
			}
		}
	}
}
if (sPar.slice(0,4) == "INFO") { 				// "INFO_PLAYER" or "INFO_VILLAGE" or "INFO_ALLY"
// <a href="game.php?village=xxxx&amp;s=edit_player_colors&amp;type=player &amp;id=yyyy"><img src="http://s5.kingsage.net/img/arrow_right_raquo.png" alt=""> Mark on map</a><br>
// <a href="game.php?village=xxxx&amp;s=edit_player_colors&amp;type=ally   &amp;id=yyyy"><img src="http://s5.kingsage.net/img/arrow_right_raquo.png" alt=""> Mark on map</a><br>
// <a href="game.php?village=xxxx&amp;s=edit_player_colors&amp;type=village&amp;id=yyyy"><img src="http://s5.kingsage.net/img/arrow_right_raquo.png" alt=""> Mark on map</a><br>
	var aNodes = xpath(document, '//a[@href]');				// pohladaj vsetky <a href=
	for (var i = 0; i < aNodes.snapshotLength; i++) {
		var aNode = aNodes.snapshotItem(i);				// ak obsahuju s=edit_player_colors, pridaj eventListener
		if (paramValue("S", aNode.href.toUpperCase()) == "EDIT_PLAYER_COLORS") {
			aNode.addEventListener("click", function() { 
					if (GM_setValue) {
						var hNodes = xpath(document, '//h1');		// pohladaj vsetky <h1>
						if (hNodes.snapshotLength == 1) {
							var hNode = hNodes.snapshotItem(0);
							var txt = trimStr(hNode.innerHTML);
							var j = txt.indexOf(" ");
							if (j > 0) GM_setValue(selectionName, trimStr(txt.slice(j+1))+SPRTR+paramValue("TYPE", this.href.toUpperCase())+SPRTR+paramValue("ID", this.href.toUpperCase()));
						}
					}
				}, true);
			break;
		}
	}
}


// FUNCTIONS ************************************************************************************************************

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
	if (GM_setValue) {
		var txt = "";
		for (var i = 0; i < objekty.length; i++) txt += ((i>0)?vSPRTR:"")+objekty[i].getRec();

		GM_setValue(colourLabel, txt);
	}
}

function setColour(col) {
	return ('<div style="background: ' + col + ' none repeat scroll 0% 0%; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous;" class="color_field" onclick="setColorValues(\'' + col + '\');"></div>');
}

function removeAllChildren(node) {		// odstran vsetkych potomkov
	while (node.firstChild) node.removeChild(node.firstChild);
}

function checkReaded(masterBoxName, formName, name) {	// The document object is an XPCNativeWrapper,
	var form = document.forms.namedItem(formName);	// and it does not support the shorthand of getting an element by ID
	var masterBox = getInputNode(formName, masterBoxName);
	if (form && masterBox)
	for (var i = 0; i < form.elements.length; i++) {
		var node = form.elements.item(i);
		if (node.name == name) {
			var pNode = node.parentNode.lastChild;		// posledna polozka novej spravy je text "(new)"
			if ((pNode.nodeType != 3) || ((pNode.nodeType == 3) && (trimStr(pNode.data) != texty[18][texty_language_id]))) {
				node.checked = masterBox.checked;
			}
		}
	}
}

function getInputNode(formName, inputName) {		// The document object is an XPCNativeWrapper,
	var form = document.forms.namedItem(formName);	// and it does not support the shorthand of getting an element by ID
	if (form) {
		return(form.elements.namedItem(inputName));
	}
	else {
		return (form);
	}
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

function getLanguageID(host_name, language_array) {
	var m, n;

	n = (m = host_name.match(new RegExp("\.([a-z]{2,6})$","i"))) ? m[1] : unknownLanguage;
	if (typeof language_array[n] == "undefined") { n = unknownLanguage; }
	return (language_array[n]);
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
