// ==UserScript==
// @name           TW Command Renamer(v8).user
// @namespace      http://userscripts.org/users/351815
// @include        http://ae*.tribalwars.ae/game.php?*&mode=commands*
// @include        http://en*.tribalwars.net/game.php?*&mode=commands*
// @include        http://us*.tribalwars.us/game.php?*&mode=commands*
// @description    Script to rename outgoing commands on TribalWarsv8 (v1.0.0.1)
// @author         hatchywatchy
// @version        1.0.0.1
// ==/UserScript==

function OutgoingRename() {

	var doc = (window.frames.length > 0) ? window.main.document : document;
	var eleSpans = doc.getElementsByTagName("span");
	for (var x = 0; x < eleSpans.length; x++) {
		if (eleSpans[x].id.match(/label/))
			table = doc.getElementById("commands_table")
	}
	function theInnerText(theNode) {
		return typeof (theNode.innerText) == 'undefined' ? theNode.textContent : theNode.innerText
	}

	function overView() {
		var eleTrs = table.rows;
		var headers = eleTrs[0].getElementsByTagName("th");
		function getHeader(ele) {
			for ( i = 0; i < headers.length; i++) {
				if (headers[i].innerHTML.match(ele, "i"))
					return i
			}
		}

		for ( x = 1; x < eleTrs.length - 1; x++) {
			var inputs = eleTrs[x].getElementsByTagName("input");

			var spear = eleTrs[x].cells[getHeader('spear')].innerHTML;
			var sword = eleTrs[x].cells[getHeader('sword')].innerHTML;
			var axe = eleTrs[x].cells[getHeader('axe')].innerHTML;
			var scout = eleTrs[x].cells[getHeader('spy')].innerHTML;
			var lc = eleTrs[x].cells[getHeader('light')].innerHTML;
			var hc = eleTrs[x].cells[getHeader('heavy')].innerHTML;
			var ram = eleTrs[x].cells[getHeader('ram')].innerHTML;
			var cat = eleTrs[x].cells[getHeader('catapult')].innerHTML;
			var noble = eleTrs[x].cells[getHeader('snob')].innerHTML;

			if ( typeof (eleTrs[x].cells[getHeader('archer')]) != "undefined") {
				var archer = eleTrs[x].cells[getHeader('archer')].innerHTML;
				var ma = eleTrs[x].cells[getHeader('marcher')].innerHTML;
			} else {
				archer = 0;
				ma = 0;
				var arrow = 1
			}
			if ( typeof (eleTrs[x].cells[getHeader('knight')]) != "undefined") {
				var pally = eleTrs[x].cells[getHeader('knight')].innerHTML;
			} else {
				pally = 0;
			}
			if (inputs[1].value.match(/(هجوم على|Attack on|دعم|Support for)/i)) {
				var coord = inputs[1].value.match(/\((\d+\|\d+)\)\s+K\d+/)[1];
			}
			
			var villagename = inputs[1].value.split('(');
			villagename = villagename[0].replace("دعم", "").replace("هجوم على", "").replace("Support for", "").replace("Attack on", "");

			var farming = parseInt(spear) + parseInt(sword) + parseInt(axe) + parseInt(lc) + parseInt(hc);
			var noArcherNoPaly = parseInt(spear) + parseInt(sword) + parseInt(axe) + parseInt(lc) + parseInt(hc) + parseInt(ram) + parseInt(cat);
			var isArcherNoPaly = parseInt(spear) + parseInt(sword) + parseInt(axe) + parseInt(archer) + parseInt(lc) + parseInt(ma) + parseInt(hc) + parseInt(ram) + parseInt(cat);
			var noArcherIsPaly = parseInt(spear) + parseInt(sword) + parseInt(axe) + parseInt(lc) + parseInt(hc) + parseInt(ram) + parseInt(cat) + parseInt(pally);
			var isArcherIsPaly = parseInt(spear) + parseInt(sword) + parseInt(axe) + parseInt(archer) + parseInt(lc) + parseInt(ma) + parseInt(hc) + parseInt(ram) + parseInt(cat) + parseInt(pally);
			var fake = noArcherNoPaly || isArcherNoPaly || noArcherIsPaly || isArcherIsPaly;
			var scouting = parseInt(scout);
			var nukes = parseInt(axe) || parseInt(lc) || parseInt(ma) || parseInt(ram);

			var foot = parseInt(spear) + parseInt(sword) + parseInt(archer);
			var totalfoot = parseInt(spear) + parseInt(sword) + parseInt(archer) + parseInt(axe);
			var totallc = parseInt(lc) * parseInt(4);
			var totalma = parseInt(ma) * parseInt(5);
			var horse = parseInt(totallc) + parseInt(totalma);
			var totalhc = parseInt(hc) * parseInt(6);
			var totalram = parseInt(ram) * parseInt(5);
			var totalcat = parseInt(cat) * parseInt(8);
			var shop = parseInt(ram) + parseInt(cat);
			var DEFtotal = parseInt(foot) + parseInt(totalhc) + parseInt(totalcat);
			var nuke = parseInt(axe) + parseInt(horse) + parseInt(totalhc) + parseInt(totalram);
			var fang = parseInt(axe) + parseInt(horse) + parseInt(totalhc) + parseInt(shop);
			var total = parseInt(foot) + parseInt(fang);

			if (inputs[1].value.match(/(هجوم على|Attack on)/i)) {
				//inputs[1].value = 'Fake';

				//- Farming
				if (farming > 1 && ram == 0) {

					inputs[1].value = 'farming ';

					if (spear > 1) {
						inputs[1].value = inputs[1].value + "SP,";
					}
					if (axe > 1) {
						inputs[1].value = inputs[1].value + "AX,";
					}
					if (lc > 1) {
						inputs[1].value = inputs[1].value + "LC,";
					}
					if (hc > 1) {
						inputs[1].value = inputs[1].value + "HC,";
					}
					inputs[1].value = inputs[1].value.substr(0, inputs[1].value.length - 1);

				}

				//- Scouting
				if (scouting > 4) {
					if (scout > 4 && fake == 0) {
						inputs[1].value = 'Scoutting';
					}
					inputs[1].value = '{' + coord + '}' + '{' + inputs[1].value + '}';

				}

				// - Fakes

				if (fake < 4) {
					if (arrow == 1 && pally == 0) {
						if (noArcherNoPaly <= 1 && scout == 1) {
							inputs[1].value = 'Scout fake';
						} else if (noArcherNoPaly == 1 && scout == 0) {
							inputs[1].value = 'fake';
						}

					}
					if (arrow != 1 && pally == 0) {
						if (isArcherNoPaly <= 1 && scout == 1) {
							inputs[1].value = 'Scout fake';
						} else if (isArcherNoPaly == 1 && scout == 0) {
							inputs[1].value = 'fake';
						}

					}
					if (arrow == 1 && pally != 0) {
						if (noArcherIsPaly <= 1 && scout == 1) {
							inputs[1].value = 'Scout fake';
						} else if (noArcherIsPaly == 1 && scout == 0) {
							inputs[1].value = 'fake';
						}

					}
					if (arrow != 1 && pally != 0) {
						if (isArcherIsPaly <= 1 && scout == 1) {
							inputs[1].value = 'Scout fake';
						} else if (isArcherIsPaly == 1 && scout == 0) {
							inputs[1].value = 'fake';
						}

					}
					inputs[1].value = inputs[1].value;
				}

				// - Nukes
				if (nukes > 4) {
					if (axe >= 5000 && ram >= 2) {
						inputs[1].value = 'Real_Nuke';
					}
					if ((axe < 5000 && ram >= 2) && (axe > 3000 && ram >= 2)) {
						inputs[1].value = 'half_Nuke';
					}
					if ((axe < 3000 && ram >= 2) && (axe > 1000 && ram >= 2)) {
						inputs[1].value = 'tiny_Nuke';
					}
					if (spear >= 1 && noble == 1 || sword >= 1 && noble == 1 || hc >= 1 && noble == 1) {
						inputs[1].value = 'Def_Noble';
					}
					if (axe != 0 && noble == 1 || lc != 0 && noble == 1 || axe != 0 && lc != 0 && noble == 1) {
						inputs[1].value = 'Off_Noble';
					}
					if (cat >= 30) {
						inputs[1].value = "Cat wave";
					}
					if (spear >= 100 && noble == 0 || sword >= 100 && noble == 0) {
						inputs[1].value = 'Support';
					}

					inputs[1].value = /*'{' + villagename + '}' +*/'{' + coord + '}' + '{' + inputs[1].value + '}';

				}

				inputs[2].click();
			}

			if (inputs[1].value.match(/(دعم|Support for)/i)) {
				
				inputs[1].value = 'Support';
				
				if (scout != 0 && DEFtotal == 0) {
					inputs[1].value = 'Scout ' + parseInt(scout);
				}
				if (foot != 0 && foot <= 5 && fang == 0) {
					inputs[1].value = 'fake_Support';
				}
				if (DEFtotal >= 3000 && DEFtotal <= 8000) {
					inputs[1].value = '1/4 Def';
				}
				if (DEFtotal >= 8000 && DEFtotal <= 13000) {
					inputs[1].value = '1/2 Def';
				}
				if (DEFtotal >= 13000 && DEFtotal <= 18000) {
					inputs[1].value = '3/4 Def';
				}
				if (DEFtotal >= 18000) {
					inputs[1].value = 'Full Def';
				}
				if (spear != 0 && sword == 0 && archer == 0 && fang == 0) {
					inputs[1].value = 'Spear ' + parseInt(spear);
				}
				if (sword != 0 && spear == 0 && archer == 0 && fang == 0) {
					inputs[1].value = 'Sword ' + parseInt(sword);
				}
				if (archer != 0 && sword == 0 && spear == 0 && fang == 0) {
					inputs[1].value = 'Archer ' + parseInt(archer);
				}
				if (totalfoot == 0 && shop == 0 && lc != 0) {
					inputs[1].value = 'LC ' + parseInt(lc) + ' ,MA ' + parseInt(ma);
				}
				if (totalfoot == 0 && shop == 0 && ma == 0 && lc != 0) {
					inputs[1].value = 'LC ' + parseInt(lc);
				}
				if (totalfoot == 0 && cat != 0 && horse == 0) {
					inputs[1].value = 'Cat ' + parseInt(cat);
				}
				if (hc != 0 && totalfoot == 0 && shop == 0) {
					inputs[1].value = 'HC ' + parseInt(hc);
				}
				if (cat != 0 && foot == 0 && nuke == 0 && pally == 1) {
					inputs[1].value = 'Cat ' + parseInt(cat);
				}
				inputs[1].value  = '{' + coord + '}' + '{' + inputs[1].value + '}';
				inputs[2].click();
			}
		} 
	}

	overView()
};

var cform = document.getElementById("cancelform");
var newbutton = document.createElement("input");
newbutton.setAttribute("text", "Rename Commands");
newbutton.setAttribute("type", "button");
newbutton.addEventListener("click", OutgoingRename, true);
newbutton.setAttribute("value", "Rename Commands");
cform.insertBefore(newbutton, cform.childNodes.item(1));
