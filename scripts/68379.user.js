// ==UserScript==
// @name		 سكربت الاختصرات من الكيبورد بأحرف عربية
// @namespace		agrafix.net
// @description		ه" من اجل الهجوم "د" من اجل الدفاع "و"من اجل الهجوم الوهمي"
// @include		http://*.die-staemme.de/game.php*screen=place*
// @include		http://*.tribalwars.net/game.php*screen=place*
// @include		http://ae*.tribalwars.ae/
// @include		http://*.guerretribale.fr/game.php*screen=place*
// @include		http://*.staemme.ch/game.php*screen=place*
// @include		http://*.tribalwars.*/game.php*screen=place*
// ==/UserScript==


// @version 2.0

// 
// config
// 
var unit_presets = {
	// snob
	'ن': {
			'spear': 50,
			'sword': 50,
			'snob': 1
		},
		
	// fake
	'و': {
			
			'ram': 1
		}
};
// 
// end config
// 

// settings
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ""); };
document.addEventListener('keyup', aKeyWasPressed, false);

// handler
function aKeyWasPressed(e) {
	var key = e.keyCode;
	var thechar = String.fromCharCode(key);
	GM_log("key was pressed " + thechar);
	switch (thechar){			
		case "X":
			handler("submit");
			break;
			
		case "ه":
			handler("attack");
			break;
			
		case "د":
			handler("support");
			break;
		
		case "ك":
			unsafeWindow.selectAllUnits(false);
			break;
			
		default:
			handle_char(thechar);
			break;
	}
}

// global handler
function handler(elementName) {
	document.getElementsByName(elementName)[0].click();
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