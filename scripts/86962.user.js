// ==UserScript==
// @name			Combat Report Enhancer
// @namespace		CR-Enhancer
// @description		Enhances the Combat Reports GameStats-like with a balance sheet table
// @include			http://*.ikariam.*/index.php?view=militaryAdvisorReportView&combatId*
// @require			http://home.arcor.de/tvbwsrtt/577user.js
// @author			El Nino
// @version			1.07
//
// @history			1.07 Added: Firefox 4 now supported
// @history			1.06 Changed the link to include the external script to a secure local copy of it to prevent further malicious mass infections from other users scripts
// @history			1.05 Fixed incompatibility to the GameStats.org script
// @history			1.04 Added: Russian and Hungarian Language and Country support
// @history			1.04 Bugfix: at a certain situation no data for the defender were processed
// @history			1.03 Fixed Spanish translation
// @history			1.02 Language and Country support added for Argentina, Chile, Colombia, Mexico, Peru, Spain and Venezuela
// @history			1.01 ScriptUpdater added
// @history			1.00 Initial release
//
// ==/UserScript==


ScriptUpdater.check(86962, "1.06");


GM_addStyle('#otherBg { background-color:#FDF7DD; font-weight:normal; }');
GM_addStyle('#smallImg { position: relative; bottom: -2px; height: 14px; }');
GM_addStyle('#noMargin { margin: 0 auto; }');
GM_addStyle('#noMargin td { padding: 4px !important; }');
GM_addStyle('#tdHeight { height: 28px; }');
GM_addStyle('.tdvalign { vertical-align: middle !important;}');
GM_addStyle('.tdwidth { width: 50% !important;}');
GM_addStyle('.nobr { white-space: nowrap; } ');
GM_addStyle('.contentBox01h div.footer2 { background:url("skin/layout/bg_contentBox01_footer.gif") no-repeat scroll 0 0 transparent; height:3px; overflow:hidden; } ');


var data = {
	'fleet s210': { w:220, s:  50, p: 5, u: 40 },
	'fleet s211': { w: 80, s: 230, p: 4, u: 30, red: 6 },
	'fleet s212': { w:160,         p: 6, u: 70, g: 750, red: 14 },
	'fleet s213': { w:180, s: 160, p: 6, u: 45 },
	'fleet s214': { w:180, s: 140, p: 5, u: 50, red: 6 },
	'fleet s215': { w:220, s: 900, p: 5, u:130, red: 14 },
	'fleet s216': { w:300, s:1500, p: 2, u: 90, red: 14 }, 
	'army s301': { w: 20,         p: 1, u:  2 },
	'army s302': { w: 30, s:  30, p: 1, u:  4, red: 2 },
	'army s303': { w: 40, s:  30, p: 1, u:  3, red: 2 },
	'army s304': { w: 50, s: 150, p: 1, u:  3, red: 14 },
	'army s305': { w:300, s:1250, p: 5, u: 30, red: 14 },
	'army s306': { w:260, s: 300, p: 5, u: 25, red: 6 },
	'army s307': { w:220,         p: 5, u: 15, red: 2 },
	'army s308': { w:130, s: 180, p: 2, u: 12, red: 14 },
	'army s309': { w: 40, s: 250, p: 5, u: 45 },
	'army s310': { w: 50,         p: 1, u: 10, W: 150 },
	'army s311': { w: 50,         p: 1, u: 20, g: 450 },
	'army s312': { w: 25, s: 100, p: 3, u: 15 },
	'army s313': { w: 30, s:  25, p: 1, u:  4, red: 6 },
	'army s314': { },
	'army s315': { w: 30,         p: 1, u:  1 },
	'army s316': { }
};

var languages = {
	'de': {
		allied: "Alliierte",
		balanceSheet: "Bilanz",
		generals: "Generäle",
		upkeep: "Unterhalt",
		resources: "Resourcen",
		offPoints: "Off-Punkte",
		defPoints: "Def-Punkte"
	},
	'en': {
		allied: "Allied Troops",
		balanceSheet: "Balance Sheet",
		generals: "Generals",
		upkeep: "Upkeep",
		resources: "Resources",
		offPoints: "Off points",
		defPoints: "Def points"
	},
	'us': {
		allied: "Allied Troops",
		balanceSheet: "Balance Sheet",
		generals: "Generals",
		upkeep: "Upkeep",
		resources: "Resources",
		offPoints: "Off points",
		defPoints: "Def points"
	},
	'es': {
		allied: "Aliados",
		balanceSheet: "Balance Sheet",
		generals: "Generales",
		upkeep: "Manutencion",
		resources: "Recursos",
		offPoints: "Puntos Off",
		defPoints: "Puntos Def"
	},
	've': {
		allied: "Aliados",
		balanceSheet: "Balance Sheet",
		generals: "Generales",
		upkeep: "Manutencion",
		resources: "Recursos",
		offPoints: "Puntos Off",
		defPoints: "Puntos Def"
	},
	'ar': {
		allied: "Aliados",
		balanceSheet: "Balance Sheet",
		generals: "Generales",
		upkeep: "Manutencion",
		resources: "Recursos",
		offPoints: "Puntos Off",
		defPoints: "Puntos Def"
	},
	'mx': {
		allied: "Aliados",
		balanceSheet: "Balance Sheet",
		generals: "Generales",
		upkeep: "Manutencion",
		resources: "Recursos",
		offPoints: "Puntos Off",
		defPoints: "Puntos Def"
	},
	'pe': {
		allied: "Aliados",
		balanceSheet: "Balance Sheet",
		generals: "Generales",
		upkeep: "Manutencion",
		resources: "Recursos",
		offPoints: "Puntos Off",
		defPoints: "Puntos Def"
	},
	'co': {
		allied: "Aliados",
		balanceSheet: "Balance Sheet",
		generals: "Generales",
		upkeep: "Manutencion",
		resources: "Recursos",
		offPoints: "Puntos Off",
		defPoints: "Puntos Def"
	},
	'cl': {
		allied: "Aliados",
		balanceSheet: "Balance Sheet",
		generals: "Generales",
		upkeep: "Manutencion",
		resources: "Recursos",
		offPoints: "Puntos Off",
		defPoints: "Puntos Def"
	},
	'ru': {
		allied: "Союзнические войска",
		balanceSheet: "Общий счет",
		generals: "Генералы",
		upkeep: "Содержание",
		resources: "Ресурсы",
		offPoints: "Очки атаки",
		defPoints: "Очки защиты"
	},
	'hu': {
		allied: "Szövetséges csapatok",
		balanceSheet: "Jelenlegi mérleg",
		generals: "Tábornoki pont",
		upkeep: "Fenntartás",
		resources: "Nyersanyagok",
		offPoints: "Támadó pont",
		defPoints: "Védő pont"
	}
};


appending = function(element, className, parent, text, span) {
	var newElement = document.createElement(element);
	newElement.className = className;
	if (span) {
		newElement.setAttribute('colSpan',span);
	}
	if (text) {
		var newText = document.createTextNode(text);
		newElement.appendChild(newText);
	}
	parent.appendChild(newElement);
	return newElement;
};

gp = function(unit) {
	var retVal = 0;
	if (data[unit].w) {
		retVal += data[unit].w;
	}
	if (data[unit].s) {
		retVal += data[unit].s;
	}
	if (data[unit].g) {
		retVal += data[unit].g;
	}
	if (data[unit].W) {
		retVal += data[unit].W;
	}
	retVal = retVal / 50;
	return retVal;
};

unitRes = function(unit) {
	var retVal = new Array(0,0,0,0);
	if (data[unit].w) {
		retVal[0] = data[unit].w;
	}
	if (data[unit].s) {
		retVal[1] = data[unit].s;
	}
	if (data[unit].g) {
		retVal[2] = data[unit].g;
	}
	if (data[unit].p) {
		retVal[3] = data[unit].p;
	}
	return retVal;
};

unitUp = function(unit) {
	if (data[unit].u) {
		return data[unit].u;
	} else {
		return 0;
	}
};

unitUpkeepReduction = function(i, unit) {
	if (data[unit].red) {
		if(reduction[i] < data[unit].red) {
			reduction[i] = data[unit].red;
		}
	}
};

calculate = function(j, player, k) {
	for each (var num in player) {
		try {
			if(num.firstChild.nodeValue.replace(/^\s+|\s+$/g,"") != '-') {
				var numbers = num.firstChild.nodeValue.replace(/^\s+|\s+$/g,"").split(' ');
				overall[j] += numbers[0] * gp(units[k]);
				upKeep[j] += numbers[0] * unitUp(units[k]);
				var slicedLess = numbers[1].slice(2, (numbers[1].length - 1));
				less[j] += slicedLess * gp(units[k]);
				lessUpKeep[j] += slicedLess * unitUp(units[k]);
				unitUpkeepReduction(j, units[k]);
				var resources = unitRes(units[k]);
				lostW[j] += slicedLess * resources[0];
				lostS[j] += slicedLess * resources[1];
				lostG[j] += slicedLess * resources[2];
				lostCitizens[j] += slicedLess * resources[3];
			}
		} catch(err) {
			//alert(err);
		}
		k++;
		
	}
};

fmt = function(number) {
	var num = number.toFixed(1);
	return num;
};

format = function(number) {
	var num = number.toString();
	num = num.replace(/\./g, ',');
	return num;
};

convertNumber = function(number){
	var retVal = '';
	var numberToString = number.toString();
	var test = numberToString.match(/,/);
	var i = numberToString.length;
	if(test) {
		if(numberToString.length > 5) {
			retVal = '.' + numberToString.substring(numberToString.length-5, numberToString.length) + retVal;
		} else {
			retVal = numberToString.substring(0, i) + retVal;
		}
		i -= 5;
	}
	for (i; i>0; i-=3) {
		if (i > 3) {
			retVal = '.' + numberToString.substring(i-3, i) + retVal;
		} else {
			retVal = numberToString.substring(0, i) + retVal;
		}
	}
	return retVal;
};

resURL = function(res) {
	return '<img id="smallImg" src="http://' + document.domain + '/skin/resources/icon_' + res + '.gif" />';
};

showResources = function(i, wood, sulfur, glass, citizens, sign, res, allieds) {
	var retVal = '';
	if(wood[i] != 0) {
		retVal += resURL('wood') + ' -' + convertNumber(wood[i]);
		if ((sulfur[i] != 0) || (glass[i] != 0) || (citizens[i] != 0)) {
			retVal += '&nbsp;&nbsp;';
		}
	}
	if(sulfur[i] != 0) {
		retVal += resURL('sulfur') + ' -' + convertNumber(sulfur[i]);
		if ((glass[i] != 0) || (citizens[i] != 0)) {
			retVal += '&nbsp;&nbsp;';
		}
	}
	if(glass[i] != 0) {
		retVal += resURL('glass') + ' -' + convertNumber(glass[i]);
		if (citizens[i] != 0) {
			retVal += '&nbsp;&nbsp;';
		}
	}
	if(citizens[i] != 0) {
		retVal += resURL('citizen') + ' -' + convertNumber(citizens[i]);
	}
	if((wood[i] == 0) && (sulfur[i] == 0) && (glass[i] == 0) && (citizens[i] == 0)) {
		retVal += ' - ';
	}
	retVal += '<br>';
	if(allieds && alliedForces) {
		var i = allieds;
		if(wood[i] != 0) {
			retVal += resURL('wood') + ' -' + convertNumber(wood[i]);
			if ((sulfur[i] != 0) || (glass[i] != 0) || (citizens[i] != 0)) {
				retVal += '&nbsp;&nbsp;';
			}
		}
		if(sulfur[i] != 0) {
			retVal += resURL('sulfur') + ' -' + convertNumber(sulfur[i]);
			if ((glass[i] != 0) || (citizens[i] != 0)) {
				retVal += '&nbsp;&nbsp;';
			}
		}
		if(glass[i] != 0) {
			retVal += resURL('glass') + ' -' + convertNumber(glass[i]);
			if (citizens[i] != 0) {
				retVal += '&nbsp;&nbsp;';
			}
		}
		if(citizens[i] != 0) {
			retVal += resURL('citizen') + ' -' + convertNumber(citizens[i]);
		}
		if((wood[i] == 0) && (sulfur[i] == 0) && (glass[i] == 0) && (citizens[i] == 0)) {
			retVal += ' - ';
		}
		retVal += '<br>';
	}
	var plundering = plunder(sign, res);
	if (plundering != '') {
		retVal += plundering;
	}
	return retVal;
};

plunder = function(sign, pillage) {
	var retVal = '';
	if(pillage[0] != 0) {
		retVal += '<span class="nobr">' + resURL('wood') + ' ' + sign + convertNumber(pillage[0]) + '</span>';
		if ((pillage[1] != 0) || (pillage[2] != 0) || (pillage[3] != 0) || (pillage[4] != 0)) {
			retVal += '&nbsp;&nbsp;';
		}
	}
	if(pillage[1] != 0) {
		retVal += '<span class="nobr">' + resURL('wine') + ' ' + sign + convertNumber(pillage[1]) + '</span>';
		if ((pillage[2] != 0) || (pillage[3] != 0) || (pillage[4] != 0)) {
			retVal += '&nbsp;&nbsp;';
		}
	}
	if(pillage[2] != 0) {
		retVal += '<span class="nobr">' + resURL('marble') + ' ' + sign + convertNumber(pillage[2]) + '</span>';
		if ((pillage[3] != 0) || (pillage[4] != 0)) {
			retVal += '&nbsp;&nbsp;';
		}
	}
	if(pillage[3] != 0) {
		retVal += '<span class="nobr">' + resURL('glass') + ' ' + sign + convertNumber(pillage[3]) + '</span>';
		if (pillage[4] != 0) {
			retVal += '&nbsp;&nbsp;';
		}
	}
	if((pillage[0] != 0) && (pillage[1] != 0) && (pillage[2] != 0) && (pillage[3] != 0) && (pillage[4] != 0)) {
		retVal += '<br>';
	}
	if(pillage[4] != 0) {
		retVal += '<span class="nobr">' + resURL('sulfur') + ' ' + sign + convertNumber(pillage[4]) + '</span>';
	}
	return retVal;
};

numberAlign = function(param1, param2, param3, param4, param5) {
	if(alliedForces && param2 != 'no') {
		var line1 = convertNumber(format(fmt(param1))) + ')';
		var line2 = convertNumber(format(fmt(param2))) + ')';
		var1 = parseInt(param1).toString().length;
		var2 = parseInt(param2).toString().length;
		var diff = var2 - var1;
		if(diff < 0) {
			if((diff < -2) || (var1 > 3 && var2 <= 3) || (var1 > 6 && var2 <= 5)) {
				if((diff < -5) || (var1 > 6 && var2 <= 3)) {
					line2 = '&nbsp;' + line2;
				}
				line2 = '&nbsp;' + line2;
			}
			for(var i = 0; i > diff; --i) {
				line2 = '&nbsp;&nbsp;' + line2;
			}
		} else {
			if((diff > 2) || (var2 > 3 && var1 <= 3) || (var2 > 6 && var1 <= 5)) {
				if((diff > 5) || (var2 > 6 && var1 <= 3)) {
					line1 = '&nbsp;' + line1;
				}
				line1 = '&nbsp;' + line1;
			}
			for(var i = 0; i < diff; ++i) {
				line1 = '&nbsp;&nbsp;' + line1;
			}
		}
		line1 = convertNumber(format(fmt(param3))) + ' (-' + line1;
		line2 = convertNumber(format(fmt(param4))) + ' (-' + line2;
		
		var1 = parseInt(param3).toString().length;
		var2 = parseInt(param4).toString().length;
		var diff = var2 - var1;
		if(diff < 0) {
			if((diff < -2) || (var1 > 3 && var2 <= 3) || (var1 > 6 && var2 <= 5)) {
				if((diff < -5) || (var1 > 6 && var2 <= 3)) {
					line2 = '&nbsp;' + line2;
				}
				line2 = '&nbsp;' + line2;
			}
			for(var i = 0; i > diff; --i) {
				line2 = '&nbsp;&nbsp;' + line2;
			}
		} else {
			if((diff > 2) || (var2 > 3 && var1 <= 3) || (var2 > 6 && var1 <= 5)) {
				if((diff > 5) || (var2 > 6 && var1 <= 3)) {
					line1 = '&nbsp;' + line1;
				}
				line1 = '&nbsp;' + line1;
			}
			for(var i = 0; i < diff; ++i) {
				line1 = '&nbsp;&nbsp;' + line1;
			}
		}
		if(param5) {
			line1 = resURL('upkeep') + ' ' + line1;
			line2 = resURL('upkeep') + ' ' + line2;
		}
		return line1 + '<br>' + line2;
	} else {
		var line1 = convertNumber(format(fmt(param3))) + ' (-' + convertNumber(format(fmt(param1))) + ')';
		if(param5) {
			line1 = resURL('upkeep') + ' ' + line1;
		}
		return line1;
	}
};

//#####################################################

// initialize arrays
var overall = new Array(0,0,0);
var less = new Array(0,0,0);
var upKeep = new Array(0,0,0);
var lessUpKeep = new Array(0,0,0);
var reduction = new Array(0,0,0);
var lostW = new Array(0,0,0);
var lostS = new Array(0,0,0);
var lostG = new Array(0,0,0);
var lostCitizens = new Array(0,0,0);
var pillage = new Array(0,0,0,0,0);
var attacker = '';
var defender = '';
var alliedForces = false;
var params = new Array('','','','','','','','');


// define language
try {
	var gameServer = top.location.host;
	var lang = gameServer.split('\.')[1];
	var language = languages[lang];
	var testLanguage = language.generals;		// to produce an error if the language isn't supported
} catch (err) {
	alert('ERROR\nYour language is not supported by this script, yet.\nPlease contact the author of this script and send him the necessary translations:\n\nhttp://userscripts.org/scripts/show/86962');
}


try {
	// get textcolors of attacker and defender
	var colorObject = document.getElementsByClassName('contentBox01h')[0].getElementsByClassName('content')[0];
	var investigatingClass = colorObject.childNodes[1].className;
	if(investigatingClass.match(/textgreen/)) {
		attacker = 'textgreen';
		defender = 'textred';
	} else {
		attacker = 'textred';
		defender = 'textgreen';
	}

	// extract participating units
	var unitObject = document.getElementsByClassName('overview')[0];
	var divObjects = unitObject.getElementsByTagName('div')
	var units = new Array();
	for each(var div in divObjects) {
		try {
			var result = div.className.match(/^army|^fleet/);
			if(result) {
				units.push(div.className);
			}
		} catch(err) { 
			//alert(err);
		}
	}

	// check wether allied forces participate
	var pattern = '' + language.allied + '';
	var re = new RegExp(pattern);
	if(unitObject.innerHTML.match(re)) {
		alliedForces = true;
	}


	// extract number of each unit from the Attacker(s) and calculating generals, ...
	var att = unitObject.getElementsByClassName(attacker);
	var own = 0;
	var all = 0;
	for each(var color in att) {
		try {
			var attackerNumbers = color.getElementsByClassName('numbers');
			if(attackerNumbers[0]) {
				if(typeof(color.childNodes[1].firstChild.data) != 'undefined') {
					if(color.childNodes[1].firstChild.data == language.allied) {
						calculate(2, attackerNumbers , all);
						all += 7;
					} else {
						calculate(0, attackerNumbers , own);
						own += 7;
					}
				}
			}
		} catch(err) {
			//alert(err);
		}
	}

	// extract number of each unit from the Defender(s) and calculating generals, ...
	if((!(alliedForces)) || (alliedForces && (defender == 'textred'))) {
		var unitClasses = 0;
		var defRows = unitObject.getElementsByClassName('col1 nobg ' + defender);
		
		for each(var row in defRows) {
			var baseTR = row.parentNode;
			var nextTrIsGreenOrRed = true;
			
			while(nextTrIsGreenOrRed) {
				try {
					if(baseTR.nextSibling.nextSibling.className == defender) {
						if(defender == 'textgreen') {
							var defOwnNumbers = baseTR.nextSibling.nextSibling.getElementsByClassName('numbers');
							calculate(1, defOwnNumbers, unitClasses);
						}
						if(defender == 'textred') {
							var defenderNumbers = baseTR.nextSibling.nextSibling.getElementsByClassName('remainingUnits');
							calculate(1, defenderNumbers, unitClasses);
						}
					}
					if(baseTR.nextSibling.nextSibling.className == 'line') {
						throw 'Error';
					}
					baseTR = baseTR.nextSibling.nextSibling;
				} catch (err) {
					// alert(err);
					nextTrIsGreenOrRed = false;
					unitClasses += 7;
				}
			}
		}
	}
	if((alliedForces) && defender == 'textgreen') {
		var def = unitObject.getElementsByClassName('col1 nobg textgreen');
		var unitClasses = 0;
		
		for each(row in def) {
			var baseTR = row.parentNode;
			var nextTrIsGreen = true;
			
			while(nextTrIsGreen) {
				try {
					if((baseTR.nextSibling.nextSibling.className == 'textgreen') && (baseTR.nextSibling.nextSibling.childNodes[1].firstChild.data == language.allied)) {
						var defAlliedNumbers = baseTR.nextSibling.nextSibling.getElementsByClassName('remainingUnits');
						calculate(2, defAlliedNumbers, unitClasses);
					}
					if((baseTR.nextSibling.nextSibling.className == 'textgreen') && (baseTR.nextSibling.nextSibling.childNodes[1].firstChild.data != language.allied)) {
						var defOwnNumbers = baseTR.nextSibling.nextSibling.getElementsByClassName('numbers');
						calculate(1, defOwnNumbers, unitClasses);
					}
					if(baseTR.nextSibling.nextSibling.className == 'line') {
						throw 'Error';
					}
					baseTR = baseTR.nextSibling.nextSibling;
				} catch (err) {
					// alert(err);
					nextTrIsGreen = false;
					unitClasses += 7;
				}
			}
		}
	}


	// extract pillaged resources
	try {
		var resultObject = (document.getElementsByClassName('result')[0]).getElementsByClassName('resources');
		for each(plunderer in resultObject) {
			var pillageWood = plunderer.getElementsByClassName('wood')
			if(typeof(pillageWood[0]) != 'undefined') {
				pillage[0] += parseInt(pillageWood[0].lastChild.data);
			}
			var pillageWine = plunderer.getElementsByClassName('wine')
			if(typeof(pillageWine[0]) != 'undefined') {
				pillage[1] += parseInt(pillageWine[0].lastChild.data);
			}
			var pillageMarble = plunderer.getElementsByClassName('marble')
			if(typeof(pillageMarble[0]) != 'undefined') {
				pillage[2] += parseInt(pillageMarble[0].lastChild.data);
			}
			var pillageGlass = plunderer.getElementsByClassName('glass')
			if(typeof(pillageGlass[0]) != 'undefined') {
				pillage[3] += parseInt(pillageGlass[0].lastChild.data);
			}
			var pillageSulfur = plunderer.getElementsByClassName('sulfur')
			if(typeof(pillageSulfur[0]) != 'undefined') {
				pillage[4] += parseInt(pillageSulfur[0].lastChild.data);
			}	
		}
	} catch (err) {
		// alert('ERROR\nCombat Report Enhancer has encountered an error while extracting pillaged resources.\n\n' + err + '\nlineNumber: ' + (err.lineNumber - 359));
	}

	
	// add upKeep reduction
	var j = 0;
	while(typeof(upKeep[j]) != 'undefined') {
		upKeep[j] = upKeep[j] * (1 - reduction[j]/100);
		lessUpKeep[j] = lessUpKeep[j] * (1 - reduction[j]/100);
		++j;
	}

	// determine parameters
	if(defender == 'textgreen') {
		params[0] = numberAlign(less[0],'no',overall[0],'',false);
		params[1] = numberAlign(lessUpKeep[0],'no',upKeep[0],'',true);
		params[2] = numberAlign(less[1],less[2],overall[1],overall[2],false);
		params[3] = numberAlign(lessUpKeep[1],lessUpKeep[2],upKeep[1],upKeep[2],true);
		params[4] = convertNumber(format(fmt(fmt(less[1]+less[2])*2.5)));
		params[5] = convertNumber(format(fmt(fmt(less[0])*2.5)));
		params[6] = showResources(0, lostW, lostS, lostG, lostCitizens, '+', pillage);
		params[7] = showResources(1, lostW, lostS, lostG, lostCitizens, '-', pillage, 2);
	}
	if(defender == 'textred') {
		params[0] = numberAlign(less[0],less[2],overall[0],overall[2],false);
		params[1] = numberAlign(lessUpKeep[0],lessUpKeep[2],upKeep[0],upKeep[2],true);
		params[2] = numberAlign(less[1],'no',overall[1],'',false);
		params[3] = numberAlign(lessUpKeep[1],'no',upKeep[1],'',true);
		params[4] = convertNumber(format(fmt(fmt(less[1])*2.5)));
		params[5] = convertNumber(format(fmt(fmt(less[0]+less[2])*2.5)));
		params[6] = showResources(0, lostW, lostS, lostG, lostCitizens, '+', pillage, 2);
		params[7] = showResources(1, lostW, lostS, lostG, lostCitizens, '-', pillage);
	}


	// create Box showing balance
	var crTop = document.getElementById('troopsReport');

	var newBox = document.createElement('div');
	newBox.className = 'contentBox01h';

	var h3header = appending('h3', 'header', newBox, language.balanceSheet);
	var divContent = appending('div', 'content', newBox);
	var table1 = appending('table', 'overview', divContent);
		table1.id = 'noMargin';
		var thead1 = appending('thead', '', table1);
			var tr1 = appending('tr', '', thead1);
				appending('th', 'numbers '+attacker, tr1, language.generals);
				appending('th', 'numbers '+attacker, tr1, language.upkeep);
				appending('th', 'numbers '+defender, tr1, language.generals);
				appending('th', 'numbers '+defender, tr1, language.upkeep);
		var tbody1 = appending('tbody', '', table1);
			var tr2 = appending('tr', '', tbody1);
				var gen1 = appending('td', 'numbers tdvalign '+attacker, tr2);
					gen1.innerHTML = params[0];
				var up1 = appending('td', 'numbers tdvalign '+attacker, tr2);
					up1.innerHTML = params[1];
				var gen2 = appending('td', 'numbers tdvalign '+defender, tr2);
					gen2.innerHTML = params[2];
				var up2 = appending('td', 'numbers tdvalign '+defender, tr2);
					up2.innerHTML = params[3];
		appending('div', 'footer2', divContent);
	var table2 = appending('table', 'overview', divContent);
		table2.id = 'noMargin';
		var thead2 = appending('thead', '', table2);
			var tr5 = appending('tr', '', thead2);
				appending('th', 'numbers '+attacker, tr5, language.offPoints);
				var offscore = appending('th', 'numbers '+attacker, tr5 , params[4]);
					offscore.id = 'otherBg';
				appending('th', 'numbers '+defender, tr5, language.defPoints);
				var defscore = appending('th', 'numbers '+defender, tr5 , params[5]);
					defscore.id = 'otherBg';
		appending('div', 'footer2', divContent);
	var table3 = appending('table', 'overview', divContent);
		table3.id = 'noMargin';
		var thead3 = appending('thead', '', table3);				
			var tr3 = appending('tr', '', thead3);
				appending('th', 'numbers '+attacker, tr3, language.resources, '2');
				appending('th', 'numbers '+defender, tr3, language.resources, '2');
		var tbody3 = appending('tbody', '', table3);
			var tr4 = appending('tr', '', tbody3);
				var lostRes1 = appending('td', 'numbers tdvalign tdwidth '+attacker, tr4, '', '2');
					lostRes1.id = 'tdHeight';
					lostRes1.innerHTML = params[6];
				var lostRes2 = appending('td', 'numbers tdvalign tdwidth '+defender, tr4, '', '2');
					lostRes2.id = 'tdHeight';
					lostRes2.innerHTML = params[7];
	var divFooter = appending('div', 'footer2', newBox);

	crTop.insertBefore(newBox, document.getElementsByClassName('contentBox01h')[0]);
	
	
} catch (err) {
	//alert('ERROR\nCombat Report Enhancer has encountered an error.\n\n' + err + '\nlineNumber: ' + (err.lineNumber - 676));
}
