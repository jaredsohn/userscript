// ==UserScript==
// @name BattleReportReformatter2
// @namespace http://www.eljercode.com
// @description Reformats battle reports for easier posting showing only the outcome with losses
// @include http://*playstarfleet*/messages/additional_content/*
// @version 2.0.2
// ==/UserScript==

//get primary attacker, defender, defender's location, outcome summary, and round info

var vBattleLog = GetClassItem(document.getElementById('content'), 'div', 'battle_log');
var vMainParticipants = GetClassItem(vBattleLog, 'div', 'participants');
var vAttackerList = GetClassItem(vMainParticipants, 'div', 'attacker');

var vAttackers = new Array();

var vElements = vAttackerList.getElementsByTagName('div');
var j = 0;
for (var i = 0; i < vElements.length; i++) {
if (typeof vElements[i] == "object" && vElements[i].getAttribute('class') == 'name') {
vAttackers[j] = new Array();
vAttackers[j]['name'] = vTrim(vElements[i].innerHTML);
vAttackers[j]['initialdefenses'] = new Array(26);
vAttackers[j]['initialships'] = new Array(26);
vAttackers[j]['finalships'] = new Array(26);
vAttackers[j]['finaldefenses'] = new Array(26);
vAttackers[j]['script'] = '';
for (var k = 0; k < 26; k++) {
vAttackers[j]['initialdefenses'][k] = 0;
vAttackers[j]['initialships'][k] = 0;
vAttackers[j]['finalships'][k] = 0;
vAttackers[j]['finaldefenses'][k] = 0;
}
j++;
}
}

var vDefenderList = GetClassItem(vMainParticipants, 'div', 'defender');

var vDefenders = new Array();

var vElements = vDefenderList.getElementsByTagName('div');
var j = 0;
for (var i = 0; i < vElements.length; i++) {
if (typeof vElements[i] == "object" && vElements[i].getAttribute('class') == 'name') {
vDefenders[j] = new Array();
vDefenders[j]['name'] = vTrim(vElements[i].innerHTML);
vDefenders[j]['initialdefenses'] = new Array(26);
vDefenders[j]['initialships'] = new Array(26);
vDefenders[j]['finalships'] = new Array(26);
vDefenders[j]['finaldefenses'] = new Array(26);
vDefenders[j]['script'] = '';

for (var k = 0; k < 26; k++) {
vDefenders[j]['initialdefenses'][k] = 0;
vDefenders[j]['initialships'][k] = 0;
vDefenders[j]['finalships'][k] = 0;
vDefenders[j]['finaldefenses'][k] = 0;
}
j++;
}
}

var vMainAttacker = vAttackers[0]['name'];
var vMainDefender = vDefenders[0]['name'];

var vLocation = GetClassItem(GetClassItem(vMainParticipants, 'div', 'defender'), 'div', 'stats');

var vFireFox = false;

if (vLocation.innerText == null) {
vFireFox = true;
}

if (vFireFox == true) {
vLocation = ReturnSystemLink(vTrim(vLocation.textContent.replace(/Defender/, '')));
}
else {
vLocation = ReturnSystemLink(vTrim(vLocation.innerText.replace(/Defender/, '')));
}

var vOutcome = GetClassItem(vBattleLog, 'div', 'outcome');

if (vFireFox == true) {
vOutcome = vOutcome.textContent;
}
else {
vOutcome = vOutcome.innerText;
}

vOutcome = vTrim(vOutcome.replace(/\s\s/g, ' ').replace(/\s\s/g, ' ').replace(/\s\s/g, ' ').replace(/\s\s/g, ' ').replace(/\s\s/g, ' ').replace(/\s\s/g, ' ')).replace(/\.\s/g, '.<br />');

var vDivs = vBattleLog.getElementsByTagName('div');
var RountCount = ''

for (divCount = 0; divCount < vDivs.length; divCount++) {
var div = vDivs[divCount];
if (div.getAttribute('class') == 'round_title') {
if (vTrim(div.innerHTML) == 'Round 1') {
var vRound1 = div.parentNode;
}
if (vTrim(div.innerHTML) == 'Round 1') {
RoundCount = '1'
}
if (vTrim(div.innerHTML) == 'Round 2') {
RoundCount = '2'
}
if (vTrim(div.innerHTML) == 'Round 3') {
RoundCount = '3'
}
if (vTrim(div.innerHTML) == 'Round 4') {
RoundCount = '4'
}
if (vTrim(div.innerHTML) == 'Round 5') {
RoundCount = '5'
}
if (vTrim(div.innerHTML) == 'Round 6') {
RoundCount = '6'
}
if (vTrim(div.innerHTML) == 'Final State') {
var vFinalRound = div.parentNode;
}
}
}

var currentPlayer = null;

if (vRound1 != null) {
var vDivs = vRound1.getElementsByTagName('div');
for (divCount = 0; divCount < vDivs.length; divCount++) {
var div = vDivs[divCount];
if (typeof div == "object" && div.getAttribute('class') == 'name') {
var vData = vTrim(div.innerHTML).split(': ');

if (vData[0] == "ATTACKER")
currentPlayer = findAttackingPlayer(vData[1]);
else
currentPlayer = findDefendingPlayer(vData[1]);
}

if (typeof div == "object" && div.getAttribute('class') == 'attacker ships') {
var vShips = new Array();
GetClassArray(div, 'div', 'ship', vShips);
for (var shipCount = 0; shipCount < vShips.length; shipCount++)
{
var ship = vShips[shipCount];
if (ship.getAttribute('class') == 'ship') {
var vShip = GetShipIndex(ship.getElementsByTagName('img')[0].getAttribute('alt'));
var vQty = parseInt(vTrim(GetClassItem(ship, 'div', 'number').innerHTML).substr(1).replace(/,/g, ''));
currentPlayer['initialships'][vShip] = vQty;
}
}
}

if (typeof div == "object" && div.getAttribute('class') == 'attacker defenses') {
var vShips = new Array();
GetClassArray(div, 'div', 'ship', vShips);
for (var shipCount = 0; shipCount < vShips.length; shipCount++) {
var ship = vShips[shipCount];
if (ship.getAttribute('class') == 'ship') {
var vShip = GetShipIndex(ship.getElementsByTagName('img')[0].getAttribute('alt'));
var vQty = parseInt(vTrim(GetClassItem(ship, 'div', 'number').innerHTML).substr(1).replace(/,/g, ''));
currentPlayer['initialdefenses'][vShip] = vQty;
}
}
}

if (vDivs[i].getAttribute('class') == 'synopsis') {
break;
}
}
}

if (vFinalRound != null) {
var vDivs = vFinalRound.getElementsByTagName('div');
for (divCount = 0; divCount < vDivs.length; divCount++) {
var div = vDivs[divCount];
if (typeof div == "object" && div.getAttribute('class') == 'name') {
var vData = vTrim(div.innerHTML).split(': ');

if (vData[0] == "ATTACKER")
currentPlayer = findAttackingPlayer(vData[1]);
else
currentPlayer = findDefendingPlayer(vData[1]);
}

if (typeof div == "object" && div.getAttribute('class') == 'destroyed')
{
}

if (typeof div == "object" && div.getAttribute('class') == 'attacker ships') {
var vShips = new Array();
GetClassArray(div, 'div', 'ship', vShips);
for (var shipCount = 0; shipCount < vShips.length; shipCount++) {
var ship = vShips[shipCount];
if (ship.getAttribute('class') == 'ship') {
var vShip = GetShipIndex(ship.getElementsByTagName('img')[0].getAttribute('alt'));
var vQty = parseInt(vTrim(GetClassItem(ship, 'div', 'number').innerHTML).substr(1).replace(/,/g, ''));
currentPlayer['finalships'][vShip] = vQty;
}
}
}

if (typeof div == "object" && div.getAttribute('class') == 'attacker defenses') {
var vShips = new Array();
GetClassArray(div, 'div', 'ship', vShips);
for (var shipCount = 0; shipCount < vShips.length; shipCount++) {
var ship = vShips[shipCount];
if (ship.getAttribute('class') == 'ship') {
var vShip = GetShipIndex(ship.getElementsByTagName('img')[0].getAttribute('alt'));
var vQty = parseInt(vTrim(GetClassItem(ship, 'div', 'number').innerHTML).substr(1).replace(/,/g, ''));
currentPlayer['finaldefenses'][vShip] = vQty;
}
}
}

if (vDivs[i].getAttribute('class') == 'synopsis') {
break;
}
}
}

var vNewReport = vMainAttacker + ' led an attack on ' + vMainDefender + ' at ' + vLocation + '.<br />';
vNewReport += 'The following emerged from battle after ' + RoundCount + ' Round(s)';
vNewReport += '<br />';
var vTotalAttackersShipsRSPLost = 0;
for (i = 0; i < vAttackers.length; i++) {
vSurvived = false;
for (var z = 0; z < 16; z++) {
if (vAttackers[i]['finalships'] != null && vAttackers[i]['finalships'][z] != null && parseInt(vAttackers[i]['finalships'][z]) > 0) {
vSurvived = true;
break;
}
}
vAttackers[i]['script'] += '<br />*****Attacker: ' + vAttackers[i]['name'] + '*****<br />';
var vDmg = new Array(0, 0, 0);
for (j = 0; j < 16; j++) {
initialshipCount = (vAttackers[i]['initialships'] != null && vAttackers[i]['initialships'][j] != null) ? vAttackers[i]['initialships'][j] : 0;
finalshipCount = (vAttackers[i]['finalships'] != null && vAttackers[i]['finalships'][j] != null) ? vAttackers[i]['finalships'][j] : 0;
if (initialshipCount > 0) {
var vShipLost = '';
if (vSurvived == false) {
vShipLost = '0&nbsp;&nbsp;(Lost: ' + initialshipCount + ')';
var vLost = initialshipCount;
vDmg[0] += (OreCost(j) * vLost);
vDmg[1] += (CrysCost(j) * vLost);
vDmg[2] += (HydroCost(j) * vLost);
}
else {
if (finalshipCount > 0) {
if (initialshipCount != finalshipCount) {
var vLost = initialshipCount - finalshipCount;
vDmg[0] += (OreCost(j) * vLost);
vDmg[1] += (CrysCost(j) * vLost);
vDmg[2] += (HydroCost(j) * vLost);
vShipLost = finalshipCount + '&nbsp;&nbsp;(Lost: ' + vLost + ')';
}
else {
vShipLost = finalshipCount;
}
}
else {
vShipLost = '0&nbsp;&nbsp;(Lost: ' + initialshipCount + ')';
var vLost = initialshipCount;
vDmg[0] += (OreCost(j) * vLost);
vDmg[1] += (CrysCost(j) * vLost);
vDmg[2] += (HydroCost(j) * vLost);
}
}
vAttackers[i]['script'] += GetShipName(j) + ': ' + vShipLost + '<br />';
}
}
vTotalAttackersShipsRSPLost += (vDmg[0] + vDmg[1] + vDmg[2]);
vAttackers[i]['script'] += '** Resources lost: ' + addCommas(vDmg[0].toString()) + ' ore, ' + addCommas(vDmg[1].toString()) + ' crystal, and ' + addCommas(vDmg[2].toString()) + ' hydrogen.<br />';
}

var vTotalDefendersShipsRSPLost = 0;
for (i = 0; i < vDefenders.length; i++) {
vSurvived = false;
for (var z = 0; z < 26; z++) {
if (vDefenders[i]['finalships'] != null && vDefenders[i]['finalships'][z] != null && parseInt(vDefenders[i]['finalships'][z]) > 0) {
vSurvived = true;
}
}
vDefenders[i]['script'] += '<br />*****Defender: ' + vDefenders[i]['name'] + '*****<br />';
var vDmg = new Array(0, 0, 0);
var vShipDmg = new Array(0, 0, 0);
for (j = 0; j < 16; j++) {
initialshipCount = (vDefenders[i]['initialships'] != null && vDefenders[i]['initialships'][j] != null) ? vDefenders[i]['initialships'][j] : 0;
finalshipCount = (vDefenders[i]['finalships'] != null && vDefenders[i]['finalships'][j] != null) ? vDefenders[i]['finalships'][j] : 0;
if (initialshipCount > 0) {
var vShipLost = '';
if (vSurvived == false) {
vShipLost = '0&nbsp;&nbsp;(Lost: ' + initialshipCount + ')';
var vLost = initialshipCount;
vShipDmg[0] += (OreCost(j) * vLost);
vShipDmg[1] += (CrysCost(j) * vLost);
vShipDmg[2] += (HydroCost(j) * vLost);
}
else {
if (finalshipCount > 0) {
if (initialshipCount != finalshipCount) {
var vLost = initialshipCount - finalshipCount;
vShipDmg[0] += (OreCost(j) * vLost);
vShipDmg[1] += (CrysCost(j) * vLost);
vShipDmg[2] += (HydroCost(j) * vLost);
vShipLost = finalshipCount + '&nbsp;&nbsp;(Lost: ' + vLost + ')';
}
else {
vShipLost = finalshipCount;
}
}
else {
vShipLost = '0&nbsp;&nbsp;(Lost: ' + initialshipCount + ')';
var vLost = initialshipCount;
vShipDmg[0] += (OreCost(j) * vLost);
vShipDmg[1] += (CrysCost(j) * vLost);
vShipDmg[2] += (HydroCost(j) * vLost);
}
}
vDefenders[i]['script'] += GetShipName(j) + ': ' + vShipLost + '<br />';
}
}
vTotalDefendersShipsRSPLost += (vShipDmg[0] + vShipDmg[1] + vShipDmg[2]);

vDmg[0] = vShipDmg[0];
vDmg[1] = vShipDmg[1];
vDmg[2] = vShipDmg[2];
for (j = 16; j <= 25; j++) {
initialshipCount = (vDefenders[i]['initialdefenses'] != null && vDefenders[i]['initialdefenses'][j] != null) ? vDefenders[i]['initialdefenses'][j] : '0';
finalshipCount = (vDefenders[i]['finaldefenses'] != null && vDefenders[i]['finaldefenses'][j] != null) ? vDefenders[i]['finaldefenses'][j] : '0';
if (initialshipCount > 0) {
var vShipLost = '';
if (vSurvived == false) {
vShipLost = '0&nbsp;&nbsp;(Lost: ' + initialshipCount + ')';
var vLost = initialshipCount;
vDmg[0] += (OreCost(j) * vLost);
vDmg[1] += (CrysCost(j) * vLost);
vDmg[2] += (HydroCost(j) * vLost);
}
else {
if (finalshipCount > 0) {
if (initialshipCount != finalshipCount) {
var vLost = initialshipCount - finalshipCount;
vDmg[0] += (OreCost(j) * vLost);
vDmg[1] += (CrysCost(j) * vLost);
vDmg[2] += (HydroCost(j) * vLost);
vShipLost = finalshipCount + '&nbsp;&nbsp;(Lost: ' + vLost + ')';
}
else { vShipLost = finalshipCount; }
}
else {
vShipLost = '0&nbsp;&nbsp;(Lost: ' + initialshipCount + ')';
var vLost = initialshipCount;
vDmg[0] += (OreCost(j) * vLost);
vDmg[1] += (CrysCost(j) * vLost);
vDmg[2] += (HydroCost(j) * vLost);
}
}
vDefenders[i]['script'] += GetShipName(j) + ': ' + vShipLost + '<br />';
}
}

vDefenders[i]['script'] += '** Ship Resources lost: ' + addCommas(vShipDmg[0].toString()) + ' ore, ' + addCommas(vShipDmg[1].toString()) + ' crystal, and ' + addCommas(vShipDmg[2].toString()) + ' hydrogen.<br />';
vDefenders[i]['script'] += '** Total Resources lost: ' + addCommas(vDmg[0].toString()) + ' ore, ' + addCommas(vDmg[1].toString()) + ' crystal, and ' + addCommas(vDmg[2].toString()) + ' hydrogen.<br />';
}

var vAttackerDSPGained = addCommas(Math.floor(Math.floor(vTotalDefendersShipsRSPLost / 1000) / vAttackers.length).toString());
for (i = 0; i < vAttackers.length; i++) {
vNewReport += vAttackers[i]['script'] + '** Destroyed Ship Points Gained: ' + vAttackerDSPGained + '<br />';
}
var vDefenderDSPGained = addCommas(Math.floor(Math.floor(vTotalAttackersShipsRSPLost / 1000) / vDefenders.length).toString());
for (i = 0; i < vDefenders.length; i++) {
vNewReport += vDefenders[i]['script'] + '** Destroyed Ship Points Gained: ' + vDefenderDSPGained + '<br />';
}

vNewReport += '<br />' + vOutcome;
AddStickyNotice(vNewReport);



function GetShipIndex(ShipName) {
switch (ShipName) {
case 'Hermes_class_probe': return 0; break;
case 'Helios_class_solar_satellite': return 1; break;
case 'Artemis_class_fighter': return 2; break;
case 'Atlas_class_cargo': return 3; break;
case 'Apollo_class_fighter': return 4; break;
case 'Charon_class_transport': return 5; break;
case 'Hercules_class_cargo': return 6; break;
case 'Dionysus_class_recycler': return 7; break;
case 'Poseidon_class_cruiser': return 8; break;
case 'Gaia_class_colony_ship': return 9; break;
case 'Athena_class_battleship': return 10; break;
case 'Ares_class_bomber': return 11; break;
case 'Hades_class_battleship': return 12; break;
case 'Prometheus_class_destroyer': return 13; break;
case 'Zeus_class': return 14; break;
case 'Hephaestus_class_attack_platform': return 15; break;
case 'Missile_battery': return 16; break;
case 'Laser_cannon': return 17; break;
case 'Pulse_cannon': return 18; break;
case 'Particle_cannon': return 19; break;
case 'Anti-Ballistic_missile': return 20; break;
case 'Decoy': return 21; break;
case 'Interplanetary_ballistic_missile': return 22; break;
case 'Gauss_cannon': return 23; break;
case 'Large_decoy': return 24; break;
case 'Plasma_cannon': return 25; break;
}
}

function GetShipName(ShipIndex) {
switch (ShipIndex) {
case 0: return 'Hermes'; break;
case 1: return 'Helios'; break;
case 2: return 'Artemis'; break;
case 3: return 'Atlas'; break;
case 4: return 'Apollo'; break;
case 5: return 'Charon'; break;
case 6: return 'Hercules'; break;
case 7: return 'Dionysus'; break;
case 8: return 'Poseidon'; break;
case 9: return 'Gaia'; break;
case 10: return 'Athena'; break;
case 11: return 'Ares'; break;
case 12: return 'Hades'; break;
case 13: return 'Prometheus'; break;
case 14: return 'Zeus'; break;
case 15: return 'Hephaestus'; break;
case 16: return 'Missile'; break;
case 17: return 'Laser'; break;
case 18: return 'Pulse'; break;
case 19: return 'Particle'; break;
case 20: return 'ABM'; break;
case 21: return 'Decoy'; break;
case 22: return 'IPBM'; break;
case 23: return 'Gauss'; break;
case 24: return 'Large decoy'; break;
case 25: return 'Plasma'; break;
}
}


function ReturnSystemLink(PlanetInBrackets) {
var PlanetMatch = PlanetInBrackets.match(/\[(\d{1,2}):(\d{1,3}):\d{1,2}m?\]/im);
var PlanetLink = '';
var currPlanet = '';
var vURLTest = document.location.href.match(/_planet=(\d+)/i);
if (vURLTest != null) { currPlanet = vURLTest[1]; }
if (PlanetMatch != null) { PlanetLink = '<a href="/galaxy/show?current_planet=' + currPlanet + '&amp;galaxy=' + PlanetMatch[1] + '&amp;solar_system=' + PlanetMatch[2] + '">' + PlanetInBrackets + '</a>'; }
return PlanetLink;
}

function GetTableItem(vTable, vPrevious) {
var vReturn = null;
var vElements = vTable.getElementsByTagName('tr');
if (vPrevious == null) {
vReturn = vElements[0];
}
else {
var i = 0;

for (i = 0; i < vElements.length; i++) {
if (vElements[i] == vPrevious) {
i++;
break;
}
}

if (i < vElements.length)
vReturn = vElements[i];
}
return vReturn;
}

function GetClassItem(vSource, vTagname, vClass) {
var vReturn = null;
var vElements = vSource.getElementsByTagName(vTagname);
for (var i = 0; i < vElements.length; i++) {
if (typeof vElements[i] == "object" && vElements[i].getAttribute('class') == vClass) {
vReturn = vElements[i];
}
}
return vReturn;
}

function GetClassArray(vSource, vTagname, vClass, vReturn) {
var vElements = vSource.getElementsByTagName(vTagname);
var j = 0;
for (var i = 0; i < vElements.length; i++) {
if (typeof vElements[i] == "object" && vElements[i].getAttribute('class') == vClass) {
vReturn[j] = vElements[i];
j++;
}
}
}

function assertNull(vSource) {
var vElements = vSource.getElementsByTagName('');
}

function assertNull2(vSource) {
var vElements = vSource.getElementsByTagName('');
}

function vTrim(vInString) { return vInString.replace(/^\s+|\s+$/g, ""); };

function findAttackingPlayer(vName) {
for (var i = 0; i < vAttackers.length; i++) {
if (vName == vAttackers[i]['name']) {
return vAttackers[i];
}
}
return null;
}

function findDefendingPlayer(vName) {
for (var i = 0; i < vDefenders.length; i++) {
if (vName == vDefenders[i]['name']) {
return vDefenders[i];
}
}
return null;
}

function AddStickyNotice(StickyNotice) {
var stickyNotices = document.getElementById('sticky_notices');
if (vTrim(stickyNotices.innerHTML).length > 0) { stickyNotices.innerHTML += '<br/>'; }
var closeMessages = new Array('(close)', '(OK OK!)', '(OKAY)', '(roger)', '(go away)');
var closeMessage = closeMessages[Math.round(Math.random() * (closeMessages.length - 1))];
var stickyText = ' <div class="notice">';
stickyText += ' <div class="close"><span class="ajax_link"><span class="active"><span class="enabled"><a href="#" onclick="disable_ajax_links();; new Ajax.Request(&#39;/stickies/close/7&amp;klass=GlobalSticky&#39;, {asynchronous:true, evalScripts:true, method:&#39;post&#39;}); return false;">' + closeMessage + '</a></span></span></span></div>';
stickyText += ' <div class="message">' + StickyNotice + '</div>';
stickyText += ' </div>';
stickyNotices.innerHTML += vTrim(stickyText);
}
function OreCost(ShipIndex) {
switch (ShipIndex) {
case 0: return 0; break; //hermes
case 1: return 0; break; //helios
case 2: return 3000; break; //arty
case 3: return 2000; break; //atlas
case 4: return 6000; break; //apollo
case 5: return 4000; break; //charon
case 6: return 6000; break; //herc
case 7: return 10000; break; //dion
case 8: return 20000; break; //pos
case 9: return 10000; break; //gaia
case 10: return 45000; break; //athena
case 11: return 50000; break; //ares
case 12: return 30000; break; //hades
case 13: return 60000; break; //prom
case 14: return 5000000; break; //zeus
case 15: return 20000000; break; //heph
case 16: return 2000; break; //missile batt
case 17: return 1500; break; //laser
case 18: return 6000; break; //pulse
case 19: return 2000; break; //particle
case 20: return 8000; break; //ABM
case 21: return 10000; break; //decoy
case 22: return 12500; break; //IPBM
case 23: return 20000; break; //gauss
case 24: return 50000; break; //large decoy
case 25: return 50000; break; //plasma
}
}
function CrysCost(ShipIndex) {
switch (ShipIndex) {
case 0: return 1000; break; //hermes
case 1: return 2000; break; //helios
case 2: return 1000; break; //arty
case 3: return 2000; break; //atlas
case 4: return 2500; break; //apollo
case 5: return 4000; break; //charon
case 6: return 6000; break; //herc
case 7: return 6000; break; //dion
case 8: return 7000; break; //pos
case 9: return 20000; break; //gaia
case 10: return 15000; break; //athena
case 11: return 25000; break; //ares
case 12: return 40000; break; //hades
case 13: return 50000; break; //prom
case 14: return 4000000; break; //zeus
case 15: return 20000000; break; //heph
case 16: return 0; break; //missile batt
case 17: return 500; break; //laser
case 18: return 2000; break; //pulse
case 19: return 6000; break; //particle
case 20: return 0; break; //ABM
case 21: return 10000; break; //decoy
case 22: return 2500; break; //IPBM
case 23: return 15000; break; //gauss
case 24: return 50000; break; //large decoy
case 25: return 50000; break; //plasma
}
}
function HydroCost(ShipIndex) {
switch (ShipIndex) {
case 0: return 0; break; //hermes
case 1: return 500; break; //helios
case 2: return 0; break; //arty
case 3: return 0; break; //atlas
case 4: return 0; break; //apollo
case 5: return 1000; break; //charon
case 6: return 0; break; //herc
case 7: return 2000; break; //dion
case 8: return 2000; break; //pos
case 9: return 10000; break; //gaia
case 10: return 0; break; //athena
case 11: return 15000; break; //ares
case 12: return 15000; break; //hades
case 13: return 15000; break; //prom
case 14: return 1000000; break; //zeus
case 15: return 10000000; break; //heph
case 16: return 0; break; //missile batt
case 17: return 0; break; //laser
case 18: return 0; break; //pulse
case 19: return 0; break; //particle
case 20: return 2000; break; //ABM
case 21: return 0; break; //decoy
case 22: return 10000; break; //IPBM
case 23: return 2000; break; //gauss
case 24: return 0; break; //large decoy
case 25: return 30000; break; //plasma
}
}

function addCommas(vNumber) {
while (/(\d+)(\d{3})/.test(vNumber)) { vNumber = vNumber.replace(/(\d+)(\d{3})/, '$1' + ',' + '$2'); }
return vNumber;
} 