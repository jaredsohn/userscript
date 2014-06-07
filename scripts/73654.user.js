// ==UserScript==
// @name			[DS] UnitGuesser
// @namespace		agrafix.net
// @description		Schätzt in einem Bericht die vorhandenen Einheiten wenn die Gebäude erspäht wurden.
// @include			http://de*.die-staemme.de/game.php*screen=report&mode=all&view=*
// ==/UserScript==

/**
 * DON'T COPY, CHANGE, REPUBLISH OR DUPLICATE THIS FILE WITHOUT PERMISSON OF THE AUTHOR. CONTACT mail@agrafix.net
 */
 
// @version 1.1

function main() {
	var data = {
		'Hauptgebäude': {
			'1': 5,
			'2': 6,
			'3': 7,
			'4': 8,
			'5': 9,
			'6': 11,
			'7': 13,
			'8': 15,
			'9': 18,
			'10': 21,
			'11': 24,
			'12': 28,
			'13': 33,
			'14': 38,
			'15': 45,
			'16': 53,
			'17': 62,
			'18': 72,
			'19': 84,
			'20': 99,
			'21': 116,
			'22': 135,
			'23': 158,
			'24': 185,
			'25': 216,
			'26': 253,
			'27': 296,
			'28': 347,
			'29': 406,
			'30': 475
		}, 

		'Kaserne': {
			'1': 7,
			'2': 8,
			'3': 10,
			'4': 11,
			'5': 13,
			'6': 15,
			'7': 18,
			'8': 21,
			'9': 25,
			'10': 29,
			'11': 34,
			'12': 39,
			'13': 46,
			'14': 54,
			'15': 63,
			'16': 74,
			'17': 86,
			'18': 101,
			'19': 118,
			'20': 138,
			'21': 162,
			'22': 189,
			'23': 221,
			'24': 259,
			'25': 303
		}, 

		'Stall': {
			'1': 8,
			'2': 9,
			'3': 11,
			'4': 13,
			'5': 15,
			'6': 18,
			'7': 21,
			'8': 24,
			'9': 28,
			'10': 33,
			'11': 38,
			'12': 45,
			'13': 53,
			'14': 62,
			'15': 72,
			'16': 84,
			'17': 99,
			'18': 115,
			'19': 135,
			'20': 158
		}, 

		'Werkstatt': {
			'1': 8,
			'2': 9,
			'3': 11,
			'4': 12,
			'5': 14,
			'6': 17,
			'7': 19,
			'8': 23,
			'9': 26,
			'10': 30,
			'11': 35,
			'12': 41,
			'13': 47,
			'14': 55,
			'15': 64
		}, 

		'Adelshof': {
			'1': 80
		}, 

		'Schmiede': {
			'1': 40,
			'2': 47,
			'3': 55,
			'4': 64,
			'5': 75,
			'6': 88,
			'7': 103,
			'8': 120,
			'9': 140,
			'10': 164,
			'11': 192,
			'12': 225,
			'13': 263,
			'14': 308,
			'15': 360,
			'16': 422,
			'17': 493,
			'18': 577,
			'19': 675,
			'20': 790
		}, 

		'Versammlungsplatz': {
			'1': 0
		}, 

		'Marktplatz': {
			'1': 20,
			'2': 23,
			'3': 27,
			'4': 32,
			'5': 37,
			'6': 44,
			'7': 51,
			'8': 60,
			'9': 70,
			'10': 82,
			'11': 96,
			'12': 112,
			'13': 132,
			'14': 154,
			'15': 180,
			'16': 211,
			'17': 247,
			'18': 289,
			'19': 338,
			'20': 395,
			'21': 462,
			'22': 541,
			'23': 633,
			'24': 740,
			'25': 866
		}, 

		'Holzfäller': {
			'1': 5,
			'2': 6,
			'3': 7,
			'4': 8,
			'5': 9,
			'6': 10,
			'7': 12,
			'8': 13,
			'9': 15,
			'10': 18,
			'11': 20,
			'12': 23,
			'13': 27,
			'14': 31,
			'15': 35,
			'16': 41,
			'17': 47,
			'18': 54,
			'19': 62,
			'20': 71,
			'21': 82,
			'22': 94,
			'23': 108,
			'24': 124,
			'25': 143,
			'26': 165,
			'27': 189,
			'28': 218,
			'29': 250,
			'30': 288
		}, 

		'Lehmgrube': {
			'1': 10,
			'2': 11,
			'3': 13,
			'4': 15,
			'5': 17,
			'6': 19,
			'7': 22,
			'8': 25,
			'9': 29,
			'10': 33,
			'11': 37,
			'12': 42,
			'13': 48,
			'14': 55,
			'15': 63,
			'16': 71,
			'17': 81,
			'18': 93,
			'19': 106,
			'20': 121,
			'21': 137,
			'22': 157,
			'23': 179,
			'24': 204,
			'25': 232,
			'26': 265,
			'27': 302,
			'28': 344,
			'29': 392,
			'30': 447
		}, 

		'Eisenmine': {
			'1': 10,
			'2': 12,
			'3': 14,
			'4': 16,
			'5': 19,
			'6': 22,
			'7': 26,
			'8': 30,
			'9': 35,
			'10': 41,
			'11': 48,
			'12': 56,
			'13': 66,
			'14': 77,
			'15': 90,
			'16': 105,
			'17': 123,
			'18': 144,
			'19': 169,
			'20': 197,
			'21': 231,
			'22': 270,
			'23': 316,
			'24': 370,
			'25': 433,
			'26': 507,
			'27': 593,
			'28': 693,
			'29': 811,
			'30': 949
		}, 

		'Bauernhof': {
			'1': 0,
			'2': 0,
			'3': 0,
			'4': 0,
			'5': 0,
			'6': 0,
			'7': 0,
			'8': 0,
			'9': 0,
			'10': 0,
			'11': 0,
			'12': 0,
			'13': 0,
			'14': 0,
			'15': 0,
			'16': 0,
			'17': 0,
			'18': 0,
			'19': 0,
			'20': 0,
			'21': 0,
			'22': 0,
			'23': 0,
			'24': 0,
			'25': 0,
			'26': 0,
			'27': 0,
			'28': 0,
			'29': 0,
			'30': 0
		}, 

		'Speicher': {
			'1': 0,
			'2': 0,
			'3': 0,
			'4': 0,
			'5': 0,
			'6': 0,
			'7': 0,
			'8': 0,
			'9': 0,
			'10': 0,
			'11': 0,
			'12': 0,
			'13': 0,
			'14': 0,
			'15': 0,
			'16': 0,
			'17': 0,
			'18': 0,
			'19': 0,
			'20': 0,
			'21': 0,
			'22': 0,
			'23': 0,
			'24': 0,
			'25': 0,
			'26': 0,
			'27': 0,
			'28': 0,
			'29': 0,
			'30': 0
		}, 

		'Versteck': {
			'1': 2,
			'2': 2,
			'3': 3,
			'4': 3,
			'5': 4,
			'6': 5,
			'7': 6,
			'8': 7,
			'9': 9,
			'10': 10
		}, 

		'Wall': {
			'1': 5,
			'2': 6,
			'3': 7,
			'4': 8,
			'5': 10,
			'6': 11,
			'7': 13,
			'8': 16,
			'9': 19,
			'10': 22,
			'11': 26,
			'12': 31,
			'13': 36,
			'14': 43,
			'15': 51,
			'16': 60,
			'17': 71,
			'18': 83,
			'19': 98,
			'20': 116
		},
		
		'Erste Kirche': {
			'1': 5
		},
		
		'Kirche': {
			'1': 5000,
			'2': 7750,
			'3': 12013
		},
		
		'Statue': {
			'1': 10
		}


	}
	
	var farmdata = {
		's1': {
			'1': 250,
			'2': 280,
			'3': 328,
			'4': 384,
			'5': 449,
			'6': 526,
			'7': 615,
			'8': 720,
			'9': 842,
			'10': 986,
			'11': 1153,
			'12': 1349,
			'13': 1579,
			'14': 1847,
			'15': 2161,
			'16': 2529,
			'17': 2959,
			'18': 3462,
			'19': 4050,
			'20': 4739,
			'21': 5545,
			'22': 6488,
			'23': 7591,
			'24': 8881,
			'25': 10391,
			'26': 12157,
			'27': 14224,
			'28': 16642,
			'29': 19472,
			'30': 22782
		},

		'sds': {
			'1': 240,
			'2': 281,
			'3': 329,
			'4': 386,
			'5': 452,
			'6': 530,
			'7': 622,
			'8': 729,
			'9': 854,
			'10': 1002,
			'11': 1174,
			'12': 1376,
			'13': 1613,
			'14': 1891,
			'15': 2216,
			'16': 2598,
			'17': 3045,
			'18': 3569,
			'19': 4183,
			'20': 4904,
			'21': 5748,
			'22': 6737,
			'23': 7896,
			'24': 9255,
			'25': 10848,
			'26': 12715,
			'27': 14904,
			'28': 17469,
			'29': 20476,
			'30': 24000
		}

	}
	
	var units = {
		'unit_spear': 1,
		'unit_sword': 1,
		'unit_axe': 1,
		'unit_archer': 1,
		'unit_spy': 2,
		'unit_light': 4,
		'unit_marcher': 5,
		'unit_heavy': 6,
		'unit_ram': 5,
		'unit_catapult': 8,
		'unit_snob': 100,
		'unit_knight': 10
	}
	
	var unit_names = ["spear", "sword", "axe", "archer", "spy", "light", "marcher", "heavy", "ram", "catapult", "snob", "knight"];
	
	if (GM_getValue('farmstyle', 'default') == 'default') {
		GM_setValue('farmstyle', prompt("Wie viel umfasst der Bauernhof auf dieser Welt auf Stufe 30? Bei 22782 tippe s1, bei 24000 tippe sds", "sds"));
	}
	
	var farmstyle = GM_getValue('farmstyle', 'sds');


	if ($gid("attack_spy")) {
		var table = $gid("attack_spy");
		var tr = table.getElementsByTagName("tr")[1];
		var td = tr.getElementsByTagName("td")[0];
		//td.setAttribute("style", "border:2px solid red");
		var source = td.innerHTML;
		
		
		var pattern = /([^\s]*)\s<b>\(Stufe ([0-9]*)\)<\/b>/g;
		var search = source.match(pattern);
		var localfind;
		
		var total_bh = 0;
		var farmmax = 0;
		
		for (var i = 0; i < search.length; i++) {
			localfind = /([^\s]*)\s<b>\(Stufe ([0-9]*)\)<\/b>/.exec(search[i]);
			
			if (localfind != null) { 
				var building = trim(localfind[1]).toString();
				var level = trim(localfind[2]).toString();
				//alert(building + " - " + level + " - " + data[building][level]);
				total_bh += data[building][level];
				
				if (building == "Bauernhof") {
					farmmax = farmdata[farmstyle][level];
				}
			}
		}
		
		var free_bh = farmmax - total_bh;
		
		// units of a type
		var newrow = document.createElement("tr");
		var newth = document.createElement("th");
		newth.setAttribute("colspan", "2");
		newth.innerHTML = "Mögliche Einheiten des jeweiligen Typs:";
		newrow.appendChild(newth);
		
		table.appendChild(newrow);
		
		var newrow2 = document.createElement("tr");
		var newtd = document.createElement("td"); 
		newtd.setAttribute("colspan", "2");
		var inHTML = '<table><tbody><tr>'
		for (var unit in unit_names) {
			inHTML += '<th width="35"><img src="/graphic/unit/unit_'+unit_names[unit]+'.png?1" title="'+unit_names[unit]+'" alt=""></th>';
		}
		inHTML += '</tr>';
		inHTML += '<tr>';
		var amount = 0;
		for (var unit in unit_names) {
			amount = Math.round(free_bh/units["unit_" + unit_names[unit]]);
		
			if (amount == 0) {
				inHTML += '<td class="hidden">0</td>';
			}
			else {
				inHTML += '<td>' + amount + '</td>';
			}
		}
		inHTML += '</tr></tbody></table>';
		newtd.innerHTML = inHTML;
		newrow2.appendChild(newtd);
		
		table.appendChild(newrow2);
		
		// Att village
		var newrow = document.createElement("tr");
		var newth = document.createElement("th");
		newth.setAttribute("colspan", "2");
		newth.innerHTML = "Mögliche Einheiten bei Off-Dorf:";
		newrow.appendChild(newth);
		
		table.appendChild(newrow);
		
		var newrow2 = document.createElement("tr");
		var newtd = document.createElement("td"); 
		newtd.setAttribute("colspan", "2");
		var inHTML = '<table><tbody><tr>'
		for (var unit in unit_names) {
			inHTML += '<th width="35"><img src="/graphic/unit/unit_'+unit_names[unit]+'.png?1" title="'+unit_names[unit]+'" alt=""></th>';
		}
		inHTML += '</tr>';
		inHTML += '<tr>';
		var amount = 0;
		for (var unit in unit_names) {
			if (unit_names[unit] == "axe" || unit_names[unit] == "light") {
				amount = Math.round(free_bh*0.4/units["unit_" + unit_names[unit]]);
			}
			else {
				if (unit_names[unit] == "marcher" || unit_names[unit] == "ram") {
					amount = Math.round(free_bh*0.1/units["unit_" + unit_names[unit]]);
				}
				else {
					amount = 0;
				}
			}
		
			if (amount == 0) {
				inHTML += '<td class="hidden">0</td>';
			}
			else {
				inHTML += '<td>' + amount + '</td>';
			}
		}
		inHTML += '</tr></tbody></table>';
		newtd.innerHTML = inHTML;
		newrow2.appendChild(newtd);
		
		table.appendChild(newrow2);
		
		// Def village
		var newrow = document.createElement("tr");
		var newth = document.createElement("th");
		newth.setAttribute("colspan", "2");
		newth.innerHTML = "Mögliche Einheiten bei Def-Dorf:";
		newrow.appendChild(newth);
		
		table.appendChild(newrow);
		
		var newrow2 = document.createElement("tr");
		var newtd = document.createElement("td"); 
		newtd.setAttribute("colspan", "2");
		var inHTML = '<table><tbody><tr>'
		for (var unit in unit_names) {
			inHTML += '<th width="35"><img src="/graphic/unit/unit_'+unit_names[unit]+'.png?1" title="'+unit_names[unit]+'" alt=""></th>';
		}
		inHTML += '</tr>';
		inHTML += '<tr>';
		var amount = 0;
		for (var unit in unit_names) {
			if (unit_names[unit] == "spear" || unit_names[unit] == "sword") {
				amount = Math.round(free_bh*0.35/units["unit_" + unit_names[unit]]);
			}
			else {
				if (unit_names[unit] == "archer" || unit_names[unit] == "heavy") {
					amount = Math.round(free_bh*0.15/units["unit_" + unit_names[unit]]);
				}
				else {
					amount = 0;
				}
			}
		
			if (amount == 0) {
				inHTML += '<td class="hidden">0</td>';
			}
			else {
				inHTML += '<td>' + amount + '</td>';
			}
		}
		inHTML += '</tr></tbody></table>';
		newtd.innerHTML = inHTML;
		newrow2.appendChild(newtd);
		
		table.appendChild(newrow2);

	}
	
}

main();


/*
 * The function library
 * 
 */
function trim (s) {
  return s.replace(/^\s+/, '').replace(/\s+$/, '').replace("\t", '');
}
 
function $xpath(xpath) {
	var xf = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
	var node = xf.singleNodeValue;

	return node;
}

function $gid(id) {
	var el = document.getElementById(id);

	return el;
}

function insertAfter(parent, node, referenceNode) {
	parent.insertBefore(node, referenceNode.nextSibling);
}