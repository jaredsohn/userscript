// ==UserScript==
// @name		[DS/TW] Press X to hit >ok< Reloaded
// @namespace		agrafix.net
// @description		Das bekannte Press X to hit >ok< von mir komplett neu.
// @include		http://*.die-staemme.de/game.php*
// @include		http://*.tribalwars.net/game.php*
// @include		http://*.guerretribale.fr/game.php*
// @include		http://*.staemme.ch/game.php*
// @include		http://*.tribalwars.nl/game.php*
// ==/UserScript==


// @version 2.1
// 
// config
// 
var unit_presets = {
	// snob
	'Y': {
			'axe': 100,
			'snob': 1
		},
	'W' : {
		'catapult' : 13
	}
};
var bh_need = 100;
var fake_units = {
	'spy'		:	2,
	'marcher'	:	5,
	'heavy'		:	6,
	'spear'		:	1,
	'sword'		:	1,
	'archer'	:	1,
	'light'		:	4,
	'axe'		:	1	
}
// 
// end config
// 

// settings
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ""); };
document.addEventListener('keyup', aKeyWasPressed, false);

if (document.location.href.indexOf("screen=place") != -1) {
	pageLoad();
}

// handler
function aKeyWasPressed(e) {
	var key = e.keyCode;
	var thechar = String.fromCharCode(key);
	GM_log("key was pressed " + thechar);
	
	if (document.location.href.indexOf("screen=info_village") != -1 || document.location.href.indexOf("screen=place") != -1) {
		switch (thechar){			
			case "X":
				handler("submit");
				break;
				
			case "A":
				handler("attack");
				break;
				
			case "D":
				handler("support");
				break;
			
			case "S":
				unsafeWindow.selectAllUnits(false);
				break;
			case "Q":
				selectFake();
				break;				
			default:
				handle_char(thechar);
				break;
		}
	}
	else {
		if (thechar == "Q") {
			qhandler();
		}
	}
}

// placehandler
function pageLoad() {

	if (document.location.href.indexOf("coords=") != -1) {

		var pattern = /coords=(\d+)\|(\d+)/;
		var m = pattern.exec(document.location.href);
		document.getElementById("inputx").value = m[1];
		document.getElementById("inputy").value = m[2];
	}
}

// qhandler
function qhandler() {
	var vilidpattern = /village=(\d+)/;
	var m = vilidpattern.exec(document.location.href);
	var selection = GetTextSelection();
	var placeurl = "/game.php?village=" + m[1] + "&screen=place&coords=" + selection;
	
	if (selection != "") {
		document.location.href = placeurl;
	}
}

// global handler
function handler(elementName) {
	if (elementName == "submit" && document.location.href.indexOf("screen=info_village") != -1) {
		var links = document.getElementsByTagName("a");
		for (var i = 0;i<links.length;i++) {
			if (links[i].href.indexOf("&screen=place&mode=command&target=") != -1) {
				document.location.href = links[i].href;
			}
		}
	}
	else {
		document.getElementsByName(elementName)[0].click();
	}
}

function handle_char(thechar) {
	if (unit_presets[thechar] != null) {
		for (var name in unit_presets[thechar]) {
			insert_unit(name, unit_presets[thechar][name]);
		}
	}
}

// insert unit-preset
function insert_unit(unit, amount) {
	document.getElementsByName(unit)[0].value = amount;
}

//returns text selection
function GetTextSelection(){
	
	var userSelection = "";
	if (window.getSelection) {
		userSelection = window.getSelection();
	}

	return userSelection;
}
//select Fake dynamic
function selectFake() {
	insert_unit( 'snob' , 0);
	insert_unit( 'knight' , 0);
	
	if (getMaxUnit('catapult')>0) {
		insert_unit( 'catapult' , 1);
		insert_unit( 'ram' , 0);
		bh_need -= 8;
	}
	else if (getMaxUnit("ram")>0) {
		insert_unit( 'ram' , 1);
		insert_unit( 'catapult' , 0);
		bh_need -= 5;
	}
	else {
		alert('Ramme/Katta fehlt');
		return;
	}
	for ( var unit in fake_units ) {
		if (getMaxUnit(unit)*fake_units[unit]>=bh_need) {
			insert_unit( unit , Math.ceil(bh_need/fake_units[unit]));
			bh_need = 0;
		}
		else {
			insert_unit( unit , getMaxUnit(unit) );
			bh_need = bh_need - getMaxUnit()*fake_units[unit];
		}
	}
	if (bh_need>0) {
		alert(bh_need + ' needes');
	}
}

function getMaxUnit(unit) {
	var tmp = document. getElementById('dsfm_'+unit).nextSibling.nextSibling;
	//var tmp2 = parseInt( tmp.innerHTML.replace("(|)",'') );
	return(parseInt(tmp.innerHTML.trim().substr(1)));
}
