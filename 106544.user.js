// ==UserScript==
// @name           OGame Redesign: Fleetpoints
// @namespace      RiV-fleetpts
// @description    Shows the value of your fleet
// @include        http://*.ogame.*/game/index.php?page=fleet1*
// ==/UserScript==

var domain = window.location.host;
domain = domain.split('.')[2];

if(domain == 'de') {
	var strShip = 'Schiff';
	var strCount = 'Anzahl';
	var strMet = 'Metall';
	var strCrys = 'Kristall';
	var strDeut = 'Deuterium';
	var strPoints = 'Punkte';
	var strTotal = 'Gesamt';
} else {
	var strShip = 'Ship';
	var strCount = 'Count';
	var strMet = 'Metal';
	var strCrys = 'Crystal';
	var strDeut = 'Deuterium';
	var strPoints = 'Points';
	var strTotal = 'Total';
}

function removeSeparator(str) {
	if (!str) return null;
	return parseInt(str.replace(/\./g, ''));
}

function formatNumber(num) {
	var separator = '.';
	var res = '';
	num = ''+num;

	while(num.length > 3) {
		res = separator + num.slice(-3) + res;
		num = num.substr(0, num.length - 3);
	}

	res = num + res;
	return res;
}

function getShipCount(id) {
	var res = document.getElementById('button' + id);
	res = res.innerHTML;
	res = res.substring(res.indexOf('(')+1, res.indexOf(')'));

	return removeSeparator(res);
}

function getShipName(id) {
	var res = document.getElementById('button' + id);
	res = res.innerHTML;
	res = res.substring(res.indexOf('|')+1, res.indexOf('('));

	return res;
}

var shipID = [204, 205, 206, 207, 215, 211, 213, 214, 202, 203, 208, 209, 210];
//var shipName = ['Leichter Jäger', 'Schwerer Jäger', 'Kreuzer', 'Schlachtschiff', 'Schlachtkreuzer', 'Bomber', 'Zerstörer', 'Todesstern', 'Kleiner Transporter', 'Großer Transporter', 'Kolonieschiff', 'Recycler', 'Spionagesonde'];
var shipPoints = [4, 10, 29, 60, 85, 90, 125, 10000, 4, 12, 40, 18, 1];
var shipMet = [3000, 6000, 20000, 45000, 30000, 50000, 60000, 5000000, 2000, 6000, 10000, 10000, 0];
var shipCrys = [1000, 4000, 7000, 15000, 40000, 25000, 50000, 4000000, 2000, 6000, 20000, 6000, 1000];
var shipDeut = [0, 0, 2000, 0, 15000, 15000, 15000, 1000000, 0, 0, 10000, 2000, 0];

var strCombatShips = document.getElementById('battleships').innerHTML;
strCombatShips = strCombatShips.substring(strCombatShips.indexOf('<h3>')+4, strCombatShips.indexOf('</h3>'));

var strCivilShips = document.getElementById('civilships').innerHTML;
strCivilShips = strCivilShips.substring(strCivilShips.indexOf('<h3>')+4, strCivilShips.indexOf('</h3>'));

document.getElementsByTagName('head')[0].appendChild(document.createElement("style"));
var stylesheet = document.styleSheets[document.styleSheets.length-1];

stylesheet.insertRule('#fleetPts { \
	margin: 3px 0; \
	margin-left: 15px; \
	padding: 1px 0; \
	background-color: #13181D; \
	border: 3px double black; \
	width: 633px; \
	font-size: 11px; \
}', 0);
stylesheet.insertRule('#fleetPts table { margin: 0 auto; }', 0);
stylesheet.insertRule('#fleetPts td, #fleetPts th, #fleetPts input { text-align:right;}', 0);
stylesheet.insertRule('#fleetPts td, #fleetPts th { border:1px solid grey; padding: 1px 3px;}', 0);


showTable = document.getElementById('inhalt').innerHTML;
showTable += '<div id="fleetPts">';
showTable += '<table>';
showTable += '<tr>' +
	     '<th>' + strShip + '</th>' +
	     '<th>' + strCount + '</th>' +
	     '<th>' + strMet + '</th>' +
	     '<th>' + strCrys + '</th>' +
	     '<th>' + strDeut + '</th>' +
	     '<th>' + strPoints + '</th>' +
	     '</tr>';

var totalCount = 0;
var totalMet = 0;
var totalCrys = 0;
var totalDeut = 0;
var totalPoints = 0;

for( var i = 0; i < shipID.length; i++ ) {
	var Name = getShipName(shipID[i]);
	var Count = getShipCount(shipID[i]);
	var Met = Count * shipMet[i];
	var Crys = Count * shipCrys[i];
	var Deut = Count * shipDeut[i];
	var Points = Count * shipPoints[i];

	if(Count > 0 && i == 0)
		showTable += '<tr><td colspan="6" style="text-align:center">' + strCombatShips + '</td></tr>';

	if(Count > 0) {
		showTable += '<tr>' +
			     '<td>' + Name + '</td>' +
			     '<td>' + formatNumber(Count) + '</td>' +
			     '<td>' + formatNumber(Met) + '</td>' +
			     '<td>' + formatNumber(Crys) + '</td>' +
			     '<td>' + formatNumber(Deut) + '</td>' +
			     '<td>' + formatNumber(Points) + '</td>' +
			     '</tr>';
	}

	if(i == 7)
		showTable += '<tr><td colspan="6" style="text-align:center">' + strCivilShips + '</td></tr>';

	totalCount += Count;
	totalMet += Met;
	totalCrys += Crys;
	totalDeut += Deut;
	totalPoints += Points;
}

showTable += '<tr>' +
	     '<th>' + strTotal + '</th>' +
	     '<th>' + formatNumber(totalCount) + '</th>' +
	     '<th>' + formatNumber(totalMet) + '</th>' +
	     '<th>' + formatNumber(totalCrys) + '</th>' +
	     '<th>' + formatNumber(totalDeut) + '</th>' +
	     '<th>' + formatNumber(totalPoints) + '</th>' +
	     '</tr>';
showTable += '</table>';
showTable += '</div>';
document.getElementById('inhalt').innerHTML = showTable;