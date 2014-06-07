// ==UserScript==
// @name          TH - Final Earth Combat Grease
// @namespace     http://falksdf8934fioase9f
// @description   Adds some unit counts/costs to combat logs
// @include       http://www.finalearth.com/log.php*
// @require       http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

var attCostKilled = 0;
var attCost = 0;
var attUnitsKilled = 0;
var attUnits = 0;
var defCostKilled = 0;
var defCost = 0;
var defUnitsKilled = 0;
var defUnits = 0;

var units = new Array();

// Soldiers
units['Assault']=100000;
units['Support']=125000;
units['Anti-tank']=200000;
units['Medic']=250000;
units['Engineer']=250000;
units['Sniper']=400000;
units['Suicide bomber']=400000;
units['Special ops']=750000;

// Tanks
units['Humvee']=250000;
units['Vodnik']=300000;
units['Black Eagle']=2000000;
units['Type 98']=2150000;
units['M1A2 Abram']=6200000;
units['T-90']=2500000;
units['Wuzhuang Zhisheng']=2500000;
units['Tunguska M1']=3500000;
units['M3A3 Bradley']=4500000;

// Aircraft
units['F-5 Tiger']=11000000;
units['AH-1 Cobra']=11000000;
units['F-16 Viper']=20000000;
units['AH-64 Apache']=15000000;
units['Mi-28 Havoc']=16000000;
units['MiG-29 Fulcrum']=30000000;
units['F-18 Hornet']=32000000;
units['Panavia Tornado']=33000000;
units['SU-34 Flanker']=36000000;
units['F-14 Tomcat']=38000000;
units['F-15 Eagle']=43000000;
units['Yak-141 Freestyle']=47000000;
units['B-2 Stealth bomber']=900000000;

// Naval
units['Destroyer']=150000000;
units['Submarine']=200000000;
units['Cruiser']=350000000;
units['Battleship']=700000000;
units['Aircraft carrier']=2500000000;
units['Nuclear sub']=1700000000;

function addCommas(nStr) {
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function totalUnitCosts(data, type) {
	var newData = data;
	
	for (var key in units) {
		var unitRgx = new RegExp("<b>"+key+":<\/b> (\\d+) \/ (\\d+)", "i");
		var unitCounts = unitRgx.exec(data);
		if (unitCounts) {
			
			if (type == 'att') {
				attCostKilled += (unitCounts[1] * units[key]) - 0;
				attCost += (unitCounts[2] * units[key]) - 0;
				attUnitsKilled += unitCounts[1] - 0;
				attUnits += unitCounts[2] - 0;
			} else {
				defCostKilled += (unitCounts[1] * units[key]) - 0;
				defCost += (unitCounts[2] * units[key]) - 0;
				defUnitsKilled += unitCounts[1] - 0;
				defUnits += unitCounts[2] - 0;
			}
			
			newData = newData.replace("<b>"+key+":<\/b> "+unitCounts[1]+" / "+unitCounts[2],
								   "<b>"+key+":<\/b> "+unitCounts[1]+" ($"+addCommas(unitCounts[1] * units[key])+") / "+unitCounts[2]+" ($"+addCommas(unitCounts[2] * units[key])+")");
		}
	}
	//GM_log(newData);
	return (newData);
}

var combatantRgx = /M<br><br>(.+?) killed <b>.+?<br>(.+?) killed <b>/;
var combatTable = $("td:contains('Attack Log'):last").html();
var combatants = combatantRgx.exec(combatTable);
var defenderUnits = $("center:contains("+combatants[2]+"):last").html();
var attackerUnits = $("center:contains("+combatants[1]+"):last").html();

$("center:contains("+combatants[2]+"):last").html(totalUnitCosts(defenderUnits, 'def'));
$("center:contains("+combatants[1]+"):last").html(totalUnitCosts(attackerUnits, 'att'));

$("table:contains('lost the following'):last").attr('width', '100%').after(
	"Defenders Lost: "+addCommas(defUnitsKilled)+"/"+addCommas(defUnits)+"; "+
		"$"+addCommas(defCostKilled)+"/$"+addCommas(defCost)+"<br>"+
	"Attackers Lost: "+addCommas(attUnitsKilled)+"/"+addCommas(attUnits)+"; "+
		"$"+addCommas(attCostKilled)+"/$"+addCommas(attCost)	
);

var logIdRgx = /^.+?\?ID=(\d+)$/;

var logId = logIdRgx.exec(window.location);

$("a:contains('War'):last").replaceWith("<a href='log.php?ID="+(logId[1]-1)+"'>Previous</a>");
$("a:contains('Events'):last").replaceWith("<a href='log.php?ID="+((logId[1]-0)+1)+"'>Next</a>");
