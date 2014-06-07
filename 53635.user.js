// ==UserScript==
// @name           reporte
// @namespace      ru.adelaide
// @include        http://*imperion*/report/show/id/combat/hid/*
// ==/UserScript==

try {
	
var race = -1;
for (var i = document.styleSheets.length-1; i >= 0; i--) {
    if (document.styleSheets[i].href.match('terran')) { race = 0; break; }
    if (document.styleSheets[i].href.match('titan')) { race = 1; break; }
    if (document.styleSheets[i].href.match('xen')) { race = 2; break; }
}

var maindiv = document.getElementsByClassName('content')[0];

// global data
var capacities = [
	[0, 60, 475, 330, 4000, 0, 0, 0, 2000, 20000, 500, 72],
	[0, 0, 0, 800, 0, 0, 0, 0, 800, 16000, 1000, 3200],
	[0, 0, 285, 225, 180, 6400, 0, 0, 0, 0, 800, 2800]
];

var result = maindiv.getElementsByTagName('h3')[0];
var xh1 = maindiv.getElementsByTagName('h1')[0];

// add
var id = xh1.getElementsByTagName('a')[1].href.match(/(\d+)$/)[1];
xh1.innerHTML += '<div id="informations" style="position:absolute; left:392px; top:10px;">' +
	'<a class="interface_informations_outgoing_attack" style="width:32px; background-position:-5px -56px; height:26px; border:4px solid #0C0D0D; border-right-width:0px; -moz-border-radius:11px 0px 0px 11px; cursor:pointer;" id="outgoingAttack" href="/fleetBase/mission/1/planetId/'+id+'/m/302"/>' +
	'<a class="interface_informations_outgoing_support" style="width:32px; background-position:-1px -56px; height:26px; border:4px solid #0C0D0D; border-left-width:0px; -moz-border-radius:0px 11px 11px 0px; cursor:pointer;" id="outgoingSupport" href="/fleetBase/mission/1/planetId/'+id+'/m/303"/>' +
'</div>';
var nums = result.textContent.match(/\d+/g);
var total = eval(nums.join("+"));
var myFleet = maindiv.getElementsByClassName('fleetTable')[0].getElementsByTagName('table')[0];

var capacity = 0;
for (var i = 0; i < 12; i++) {
	capacity += myFleet.rows[2].cells[i+1].innerHTML * capacities[race][i];
}
result.innerHTML += " [ " + Math.round(100 * total / capacity) + "% ]";

} catch(e) {
	window.status = e;
}