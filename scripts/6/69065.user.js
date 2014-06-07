// ==UserScript==
// @name           Ikariam Round Summary
// @namespace      IKRS
// @description    Text based analysis of single rounds of combat in detailed reports
// @include        http://s*.ikariam.*/index.php?*view=militaryAdvisorDetailedReportView*
// ==/UserScript==

var server = /\/\/([a-z._0-9]+)\//.exec(document.URL);
    server = server[1];
var atkUnits = {};
var defUnits = {};
var lastUnits = {};
var units = { 's301':'Slinger', 's302':'Swordsman', 's303':'Hoplite', 's304':'S. Carabineer', 's305':'Mortar', 's306':'Catapult', 's307':'B. Ram', 's308':'Steam Giant', 's309':'B. Bombardier', 's310':'Cook', 's311':'Doctor', 's312':'Gyrocopter', 's313':'Archer','s315':'Spearmen',
              's210':'Ram Ship','s211':'Fire Ship', 's212':'Diving Boat', 's213':'Ballsta Ship', 's214':'Catapult Ship', 's215':'Mortar Ship', 's216':'Paddle Ram'};
function debugString(str) {
  var d = document.createElement('div');
  document.body.appendChild(d);
  d.innerHTML = str + '';
}

function xpath(query)             { return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); }
function setValue(key, value)     { GM_setValue(window.location.host + key, value) }
function getValue(key, defVal)    { ret = GM_getValue(window.location.host + key);  if (ret != undefined) { return ret; } else { return defVal; } }
function periodPad(str, l)        { str += ''; while (str.length < l) { str += '.'; } return str; }
function outputWindow(par) {
  var d = document.createElement('div');
  d.setAttribute('style', 'text-align:center; margin-bottom:10px;');
  var t = document.createElement('textarea');
  d.appendChild(t);
  par.appendChild(d);
  t.setAttribute('rows', 15);
  t.setAttribute('cols', 80);
  t.setAttribute('style',  'font-family:"Courier New";');
  return t;
}

function getReserveUnits() {
  var atkResUnits = xpath('//div[@id="resAttacker"]//div[@class="units "]//li');
  var defResUnits = xpath('//div[@id="resDefender"]//div[@class="units "]//li');
  for (var i=0; i<atkResUnits.snapshotLength; i++) {
    unitId   = atkResUnits.snapshotItem(i).getElementsByTagName('div')[0].className;
    if (atkUnits[unitId] != undefined) { atkUnits[unitId] += parseInt(atkResUnits.snapshotItem(i).textContent); }
    else                               { atkUnits[unitId]  = parseInt(atkResUnits.snapshotItem(i).textContent); }
  }
  for (var i=0; i<defResUnits.snapshotLength; i++) {
    unitId   = defResUnits.snapshotItem(i).getElementsByTagName('div')[0].className;
    if (defUnits[unitId] != undefined) { defUnits[unitId] += parseInt(defResUnits.snapshotItem(i).textContent); }
    else                               { defUnits[unitId]  = parseInt(defResUnits.snapshotItem(i).textContent); }
  }
}

function getFieldedUnits() {
  var atkFUnits = xpath('//div[@id="fieldAttacker"]//li');
  for (var i=0; i<atkFUnits.snapshotLength; i++) {
    var cItem = atkFUnits.snapshotItem(i);
    var n     = cItem.getElementsByTagName('div')[0].className;
    if (n != 'empty') {
      var cnt = /([0-9]+)\s*\(-[0-9]+\)/.exec(cItem.textContent)[1];
      if (cnt > 0) { 
        if (atkUnits[n] != undefined) { atkUnits[n] += parseInt(cnt); }
        else { atkUnits[n] = parseInt(cnt); }
      }
    }
  }
  var defFUnits = xpath('//div[@id="fieldDefender"]//li');
  for (var i=0; i<defFUnits.snapshotLength; i++) {
    var cItem = defFUnits.snapshotItem(i);
    var n     = cItem.getElementsByTagName('div')[0].className;
    if (n != 'empty') {
      var cnt = /([0-9]+)\s*\(-[0-9]+\)/.exec(cItem.textContent)[1];
      if (cnt > 0) { 
        if (defUnits[n] != undefined) { defUnits[n] += parseInt(cnt); }
        else { defUnits[n] = parseInt(cnt); }
      }
    }
  }
}

function showHideMorale() {
  if (document.getElementById('morale').style.display == 'none') { document.getElementById('morale').style.display = ''; }
  else { document.getElementById('morale').style.display = 'none'; }
}

function getCombatId() {
  var cId = /detailedCombatId=([0-9]+)/.exec(window.location)[1];
  return cId;
}

function loadLastUnits() {
  var retObj = {};
  var LUnits = getValue('lastUnits', '');
  LUnits = LUnits.split(',');
  for (var i=0; i<LUnits.length; i++) {
    var ss = LUnits[i].split(':');
    retObj[ss[0]] = ss[1];
  }
  return retObj;
}

function saveLastUnits(cRound, atk, def) {
  var str = '';
  for (var au in atk) { 
    if (str != '') { str += ','; }
    str += au + ':' + atk[au]; 
  }
  for (var du in def) { 
    if (str != '') { str += ','; }
    str += du + ':' + def[du]; 
  }
  setValue('lastUnits', str);
  setValue('lastRound', cRound);
}

var combatID = getCombatId();
var lastCid  = getValue('lastId', 0);
setValue('lastId', combatID);
if (combatID > 0) {
  if (lastCid == combatID) { lastUnits = loadLastUnits(); }
  var mv = document.getElementById('mainview');
  var ow = outputWindow(mv);
  var bTitle = xpath('//div[@id="mainview"]//h1').snapshotItem(0).textContent;
  var roundTime    = xpath('//div[@id="mainview"]//div[@id="rounds"]//li[@class="roundTime"]').snapshotItem(0).textContent;
  var roundCounter = xpath('//div[@id="mainview"]//div[@id="rounds"]//li[@class="roundNo"]').snapshotItem(0).textContent;
  var roundReg     = /Round\s*([0-9]+)\s*\/\s*([0-9]+)/.exec(roundCounter);
  var currentRound = roundReg[1];
  var totalRounds  = roundReg[2];
  var attackers = xpath('//div[@id="attacker"]').snapshotItem(0).textContent.replace(/[\s\t\n]+/g, '');
  var defenders = xpath('//div[@id="defender"]').snapshotItem(0).textContent.replace(/[\s\t\n]+/g, '');

  ow.textContent = bTitle + '\n\n';
  ow.textContent += attackers + '\n';
  ow.textContent += 'vs.\n' + defenders + '\n\n';
  ow.textContent += 'Round ' + currentRound + ' of ' + totalRounds + ' ' + roundTime + '\n\n';

  getReserveUnits();
  getFieldedUnits();
  var changeList = {};
  var unitsText = '';
  for (var u in units) {
    var dKey = u+'d';
    if (atkUnits[u] || defUnits[dKey]) {
      unitsText += periodPad(units[u], 18);
      if (atkUnits[u]    != undefined){ unitsText += periodPad(atkUnits[u], 8); }
      else                            { unitsText += '0.......'; }
      if (defUnits[dKey] != undefined){ unitsText  += periodPad(defUnits[dKey], 8); }
      else                            { unitsText += '0.......'; }
      unitsText += '\n';
    }
    if (atkUnits[u]     != undefined) { changeList[u]     = atkUnits[u]; } 
    else                              { changeList[u]     = 0; }
    if (lastUnits[u]    != undefined) { changeList[u]    -= lastUnits[u]; }
    if (defUnits[dKey]  != undefined) { changeList[dKey]  = defUnits[dKey]; }
    else                              { changeList[dKey]  = 0; }
    if (lastUnits[dKey] != undefined) { changeList[dKey] -= lastUnits[dKey]; }
  }
  ow.textContent += '...........Total Units............\n' + 
                    '.......Name........Atk.....Def....\n' + unitsText;
  if (getValue('lastRound', 0) != currentRound) {
    ow.textContent += '\nDifference From Round ' + getValue('lastRound', 0) + '\n';
    for (var u in units) {
      var dKey = u+'d';
      if (changeList[u] > 0 || changeList[dKey] > 0 || changeList[u] < 0 || changeList[dKey] < 0 ) {
        ow.textContent += periodPad(units[u], 18);
        if (changeList[u] != undefined) {
          ow.textContent += periodPad(changeList[u], 8);
        } else { ow.textContent += '0.......'; }
        if (changeList[dKey] != undefined) {
          ow.textContent += periodPad(changeList[dKey], 8);
        } else { ow.textContent += '0.......'; }
        ow.textContent += '\n';
      }
    }
    
  }
  saveLastUnits(currentRound, atkUnits, defUnits);
}










