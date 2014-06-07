// ==UserScript==
// @name           MouseHunt Advanced Log Summary
// @namespace      MH_ALS
// @description    User set Log history.
// @version        1.05
// @include        http://apps.facebook.com/mousehunt/
// @include        http://apps.facebook.com/mousehunt/soundthehorn.php*
// @include        http://apps.facebook.com/mousehunt/index.php*
// @include        http://apps.facebook.com/mousehunt/inventory.php*
// @require        http://userscripts.org/scripts/source/57756.user.js
// @history        1.01 - Changed positioning, should work much better with all resolutions
// @history        1.01 - Added script update checking
// @history        1.02 - Fixed hornTable errors causing summary not to show
// @history        1.03 - Loot Fix 0.1 Cheese types
// @history        1.04 - Loot Fix 0.2 Satchel of Gold
// @history        1.05 - Catacombs bugfix
// ==/UserScript==

//----  Constants ----//
ScriptUpdater.check(67236, '1.05');
var mhImageDir  = 'http://98.129.188.217/mousehunt/images/interface/';
var headerImage = 'hud_bar.jpg';
var rowImage    = 'menu_bg.gif';
var months = new Array('Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.');


/*  
     Strings used as keys in the following object will be 
     highlighted by the assigned color in output tables.       
     
     Feel free to add more, they will also work on items!   */

var colorRefs = {};
colorRefs['Derr Chieftain'] = '#9f3333';
colorRefs['Nerg Chieftain'] = '#33af33';
colorRefs['Elub Chieftain'] = '#33339f';
colorRefs['Acolyte']        = '#6f336f';
colorRefs['Dragon']         = '#c36f00';
colorRefs['Master of the Dojo'] = '#c36f00';
colorRefs['Dojo Sensei']    = '#6f336f';
colorRefs['Mobster']        = '#7a7a7a';
colorRefs['Leprechaun']     = '#7a7a7a';
colorRefs['Black Widow']    = '#7a7a7a';




//----  Common Worker Functions  ----//
function debugString(str)        { d = document.createElement('div'); document.body.appendChild(d); d.innerHTML = str + '';}
function xpath(query)            { return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); }
function setValue(key, value)    { GM_setValue(key + '_mhals', value) }
function getValue(key, defVal)   { ret = GM_getValue(key + '_mhals');  if (ret != undefined) { return ret; } else { return defVal; } }
function uniTime(t)              { t = t.split(':'); if (t[1].length >= 3) { m = /([0-9]+)([a-z]+)/.exec(t[1]); if (m != null) { if (m[1] == 'pm') { t[0] += 12; } } } return t[0] + ':' + t[1]; }
function correctStartDate(eTime) { if (startTime() == '') { setValue('logStart', eTime); return 0; } currentStart = startTime().split('.'); eTimeSave = eTime; eTime = eTime.split('.'); tD = new Date(); csS = /([0-9]+):([0-9]+)([a-z]*)/.exec(uniTime(currentStart[2])); etS = /([0-9]+):([0-9]+)([a-z]*)/.exec(uniTime(eTime[2])); cSD = new Date(tD.getFullYear(), currentStart[0], currentStart[1], csS[1], csS[2], 0, 0); eTD = new Date(tD.getFullYear(), eTime[0], eTime[1], etS[1], etS[2], 0, 0); if (eTD < cSD) { setValue('logStart', eTimeSave); } }
function parseSep(number)        { return parseInt(number.replace(',', '')); }
function addSep(number)          { if (number*1 == NaN) { return number; } var ret = ''; number += ''; var ext = ''; var sc = 0; if (number[0] == '-') { ext = '-'; number = number.substring(1, number.length); } for (var i=0; i<number.length; i++) {  ret = number[number.length - (i + 1)] + ret; sc  += 1;  if (sc == 3 && i + 1 < number.length) { ret = ',' + ret;  sc = 0;  } } return ext + ret; }
function padString(str, len)     { str += ''; if (str.length >= len) { str = str.substring(0, len-4); } str = str.replace(/\s+$/, ''); if (str.length < len) { while(str.length < len) { str += '.'; }  return str; } }
function resetData()             { setValue('gold', 0); setValue('points', 0); setValue('savedMice', ''); setValue('savedLoot', ''); setValue('savedCheese', ''); setValue('savedPillages', ''); setValue('savedCallers', ''); setValue('savedCallersMisses', ''); setValue('savedCallersAFail', ''); setValue('savedCallersCatch', ''); setValue('savedCallersGold', ''); setValue('savedCallersPoints', ''); setValue('pillageMice', ''); setValue('savedMisses', ''); setValue('huntCounter', 0); setValue('logStart', ''); clearTimes = confirm('Reset saved times?  \nSelect "OK" if you want the current log page and any previous log pages to be able to be re-added to the current totals.\n\nSelect cancel to reset statistics only, this will cause only future hunts to be shown in the stats.'); if (clearTimes) { setValue('savedTimes', ''); } this.innerHTML += ' (Refresh should occur automatically.)'; location.reload(true); }
//----  Get Info From Journal Functions  ----//
function getGold(str)          { var match = /([0-9,]+) gold/.exec(str);          if (match != null) { return parseSep(RegExp.$1); } else { return 0; } }
function getPoints(str)        { var match = /([0-9,]+) points/.exec(str);        if (match != null) { return parseSep(RegExp.$1); } else { return 0; } }
function getLoot(str)          { var match = /loot:([a-zA-Z0-9', \n\-\+]+)/.exec(str); if (match != null) { return RegExp.$1; } else { return ''; } }
function getMouse(str)         { var match = /oz\. ([a-zA-Z0-9', \n\-]+) mouse/.exec(str); if (match != null) { return RegExp.$1; } else { return ''; } }
function getMouse2(str)        { var match = /[Aan]+ ([a-zA-Z0-9' \-]+) mouse/.exec(str); if (match != null) { return RegExp.$1; } else { return ''; } }
function getCheese()           { var cheeseElement = xpath('//div[@class="hudstatlist"]//ul//li').snapshotItem(8).innerHTML; var cheeseRE = /([a-zA-Z]+[a-zA-Z ]+) \([0-9,]+\)/.exec(cheeseElement); if (cheeseRE != null) { setLastCheese(RegExp.$1); return RegExp.$1; } return getValue('lastCheese', ''); }
function getTime(str)          { var match = /([0-9]+:[0-9]+[apm]*)\s{0,1}([a-zA-Z0-9, ]*)/.exec(str); var curDate = new Date(); if (match != null) { var ts = match[1]; if (match[2] != '') { if (match[2] == 'yesterday') { curDate.setDate(curDate.getDate()-1); } else { dayString = match[2]; if (match[2][0] == 'o') { dayString = dayString.substring(3, dayString.length); } else { m = /([a-zA-Z]+) ([0-9]+)th, ([0-9]+)/.exec(dayString); dayString = m[1] + ' ' + m[2] + ', ' + m[3]; } curDate = new Date(dayString); } } retStr = curDate.getMonth() + '.' + curDate.getDate() + '.' + ts; return retStr; } return ''; }
function getCaller(str)        { var match = /([a-zA-Z0-9\- ]+) sounded/.exec(str); if (match != null) { if (match[1] == 'I') { return 'You'; } else { return match[1]; } } match = /([a-zA-Z0-9\- ]+) returned/.exec(str); if (match != null) { return 'You'; } match = /([a-zA-Z0-9\- ]+) checked/.exec(str); if (match != null) { return 'You'; } return ''; }
function setLastCheese(str)    { setValue('lastCheese', str); }
//----  Get Info From Stored Data Functions ----//
function startTime()           { return getValue('logStart', ''); }
function loadTimes()           { var retObj = {}; savedTimes = getValue('savedTimes', '').split(','); for (var i=0; i<savedTimes.length; i++) { retObj[savedTimes[i]] = null; } return retObj; }
function loadObject(val)       { var retObj = {}; savedData = getValue(val, ''); if (savedData.length > 0) { savedData = savedData.split(';'); for (var i=0; i<savedData.length; i++) { splitData = savedData[i].split(':'); if (splitData[0].length > 0) { retObj[splitData[0]] = parseInt(splitData[1]); } } } return retObj; }
function getCatchStats()       { var currentCatches = loadObject('savedMice'); var currentMisses  = loadObject('savedMisses'); var catchStats = {}; var totalCatches = 0; var totalMisses  = 0; var totalLooted  = 0; for (var mouse in currentCatches) { totalCatches += parseInt(currentCatches[mouse]); if (mouse in currentMisses) {  totalMisses += currentMisses[mouse]; catchStats[mouse] = parseInt((currentCatches[mouse] / (currentCatches[mouse] + currentMisses[mouse]))*100) + '%'; } else { catchStats[mouse] = '100%'; } } for (var mouse in currentMisses) { if (mouse in catchStats || mouse == 'Also Looted') { if (mouse == 'Also Looted') { totalLooted += currentMisses[mouse]; } } else { catchStats[mouse] = '0%'; totalMisses += currentMisses[mouse]; } } return new Array(catchStats, totalCatches, totalMisses, totalLooted); }
//----  Store Data From Journal Functions  ----//
function saveTime(t)             { var cTimes = getValue('savedTimes', ''); if (cTimes != '') { cTimes = cTimes + ',' + t; } else { cTimes = t; setValue('logStart', t); } setValue('savedTimes', cTimes); }
function saveData(val, key, amt) { var currentData = loadObject(val); if (key in currentData) { currentData[key] += amt; } else { currentData[key] = amt; } saveStr = ''; for (var d in currentData) { if (saveStr != '') { saveStr += ';'; } saveStr += d + ':' + currentData[d]; } setValue(val, saveStr); }
function processLoot(str)        { 
  if (str.length > 0) { 
    str = str.split(','); 
    for (var n=0; n<str.length; n++) {
      re = /([0-9]+)\s+([a-zA-Z0-9' \-\+]+)/.exec(str[n]);
      var amt = 0;
      if (re != null && /Lab Research worth ([0-9,]+) /.exec(str[n]) == null && /Satchel of Gold worth ([0-9,]+) /.exec(str[n]) == null) { 
        lootKey = re[2];
        amt = parseInt(re[1]);
        var cheeseCheck = /piece[s]* of ([a-zA-Z0-9 ]+) cheese/.exec(lootKey);
        if (cheeseCheck != null) { lootKey = cheeseCheck[1]; } 
        else if (amt > 1 && lootKey != 'Savoury Vegetables') {
          lootKey = lootKey.substring(0, lootKey.length-1); 
        }
      } else {
        re = /Lab Research worth ([0-9,]+) /.exec(str[n]);
        if (re != null) { lootKey = 'Lab Research'; amt = parseInt(parseSep(re[1])); addPoints(amt);}
        else {
          re = /Satchel of Gold worth ([0-9,]+) /.exec(str[n]);
          if (re != null) {
            lootKey = 'Satchel of Gold';
            amt = parseInt(parseSep(re[1]));
            addGold(amt);
          }
        }
      }
      saveData('savedLoot', lootKey, amt);
    }
  }
}
function getStolenCheese(str)    { var match = /extra ([0-9]+) pieces of my ([a-zA-Z0-9 ]+) cheese/.exec(str); if (match != null) { saveData('savedCheese', RegExp.$2, parseInt(RegExp.$1)); } }
function getRewardCheese(str)    { var match = /([0-9]+) piece[s] of ([a-zA-Z0-9]+)/.exec(str); if (match != null) { saveData('savedCheese', RegExp.$2, -(parseInt(RegExp.$1))); }}
function addGold(amt)            { setValue('gold', getValue('gold', 0) + amt); }
function addPoints(amt)          { setValue('points', getValue('points', 0) + amt); }
function updateStrPattern()      { setValue('strPattern', document.getElementById('strPatternBox').value); }
function checkCheeseChange()     { var cNode = xpath("//div[@class='messagebody']//div[@class='messagecontent']").snapshotItem(0); if (cNode != null) { var m = /with ([a-zA-Z0-9 ]+)\./.exec(cNode.innerHTML); if (m != null) { setValue('lastCheese', m[1]); } } }
function getJournalBody(j)       { var jDivs = j.getElementsByTagName('div'); for (var i=0; i<jDivs.length; i++) { if (jDivs[i].className == 'journaltext') { return jDivs[i]; } } }
function collectData() {
  var journal = xpath("//div[@class='journal']//div[@class='journalcontent']/div");
  var savedTimes = loadTimes();
  for (i=0; i<journal.snapshotLength; i++) {
    var logString  = journal.snapshotItem(i).textContent;
    var entryType  = journal.snapshotItem(i).className.split(' ')[3];
    var eTime      = getTime(logString);
    var entryTime  = eTime + '.' + entryType;
    var entryCaller= getCaller(logString);
    if (entryTime in savedTimes) {
    } else {
      var entryGold  = getGold(logString);
      var entryPts   = getPoints(logString);
      var entryMouse = getMouse(logString);
      var entryLoot  = getLoot(logString);
      saveTime(entryTime);
      correctStartDate(entryTime);
      switch (entryType) {
        case 'catch': 
          saveData('savedCallers', entryCaller, 1);
          saveData('savedCallersCatch', entryCaller, 1);
          saveData('savedCallersGold', entryCaller, entryGold);
          saveData('savedCallersPoints', entryCaller, entryPts);
          saveData('savedMice', entryMouse, 1);
          saveData('savedCheese', getCheese(), 1);
          processLoot(entryLoot);
          addGold(entryGold);
          addPoints(entryPts);
          setValue('huntCounter', parseInt(getValue('huntCounter', 0))+1);
          break;
        case 'rewardclaimed':
          addGold(entryGold);
          addPoints(entryPts);
          getRewardCheese();
          break;
        case 'pillage':
          addGold(-entryGold);
          addPoints(-entryPts);
          saveData('savedCallers', entryCaller, 1);
          saveData('savedCallersMisses', entryCaller, 1);
          saveData('savedCheese', getCheese(), 1);
          saveData('savedMisses', getMouse2(logString), 1);
          saveData('savedMisses', 'Also Looted', 1);
          saveData('pillageMice', getMouse2(logString), 1);
          setValue('huntCounter', parseInt(getValue('huntCounter', 0))+1);
          saveData('savedCallersGold', entryCaller, -entryGold);
          saveData('savedCallersPoints', entryCaller, -entryPts);
          if      (entryGold > 0) { saveData('savedPillages', 'Gold', entryGold); } 
          else if (entryPts > 0)  { saveData('savedPillages', 'Points', entryPts); } 
          else                    { getStolenCheese(logString); }
          break;
        case 'catchfailure':
          saveData('savedCheese', getCheese(), 1);
          saveData('savedMisses', getMouse2(logString), 1);
          saveData('savedCallers', entryCaller, 1);
          saveData('savedCallersMisses', entryCaller, 1);
          setValue('huntCounter', parseInt(getValue('huntCounter', 0))+1);
          break;
        case 'attractionfailurestale':
          saveData('savedCallers', entryCaller, 1);
          saveData('savedCallersAFail', entryCaller, 1);
          saveData('savedCheese', getCheese(), 1);
          saveData('savedCheese', 'Pieces Gone Stale', 1);  
          setValue('huntCounter', parseInt(getValue('huntCounter', 0))+1);
          break;
        case 'attractionfailure':
          saveData('savedCallers', entryCaller, 1);
          saveData('savedCallersAFail', entryCaller, 1);
          saveData('savedCheese', getCheese(), 1);
          setValue('huntCounter', parseInt(getValue('huntCounter', 0))+1);
          break;
        case 'travel': break;
      }
    }
  }
}

//----  Output Functions  ----//
function mouseString(amt)        { if (amt == 1) { return '1 mouse'; } else { return amt + ' mice'; } }
function colorString(str)        { 
  var opener = '';
  var closer = '';
  if (str in colorRefs) {
    opener = '<font style="color:' + colorRefs[str] + ';">';
  }
  if (opener != '') {
    closer = '</font>'; 
  }
  var m = /((?:Student|Master)) of the Cheese ([a-zA-Z]+)/.exec(str);
  var s = '';
  if (m != null) {
    if (m[1] == 'Student') {
      s = 'S ';
    } else {
      s = 'M ';
    }
    str = s + 'ot C ' + m[2];
  } else if (str == 'Master of the Dojo') { str = 'Mojo'; }
  else if (str == 'Dojo Sensei') { str = 'Sojo'; }
  return opener + str + closer;
}
function objectTable(object)     { var d = '<table align="center" width="200" cellspacing="0" cellpadding="2">'; for (var attr in object) { if (attr.length > 0 && attr != 'Also Looted') { d += '<tr style="text-align:center; background:url(\'http://98.129.188.217/mousehunt/images/interface/menu_bg.gif\') bottom center no-repeat;"><td style="width:100px; text-align:right;"><b>' + colorString(attr) + '</b></td><td style="width:50px; text-align:center;">' + object[attr] + '</td></tr>'; } } if ('Also Looted' in object) { d += '<tr style="text-align:center; background:url(\'http://98.129.188.217/mousehunt/images/interface/menu_bg.gif\') bottom center no-repeat;"><td style="width:100px; text-align:right;"><b>Also Looted</b></td><td style="width:50px; text-align:center;">' + object['Also Looted'] + '</td></tr>'; } d += '</table>'; return d; }
function objectTextTable(object) { var d = ''; for (var attr in object) {  if (attr.length > 0 && attr != 'Also Looted') {  d += padString(attr, 22) + padString(object[attr], 6) + '\n'; } } return d + '\n'; }
function mouseTable()            { var currentCatches = loadObject('savedMice'); var currentMisses  = loadObject('savedMisses'); var pillageMice    = loadObject('pillageMice'); var ret = '<table align="center" border="0" cellspacing="0" cellpadding="2" width="200">'; ret += '<tr style="color:#dcee7c; background:url(\'' + mhImageDir + headerImage + '\') bottom center no-repeat; height:25px;"><td style="text-align:center;"><b>Mouse</b></td><td><b>Catch</b></td><td><b>Miss</b></td><td><b>Stole</b></b></td></tr>'; for (var mouse in currentCatches) { ret += '<tr style="background:url(\''+ mhImageDir + rowImage + '\') bottom center no-repeat; text-align:center;"><td style="text-align:right; padding-right:6px;"><b>' + colorString(mouse) + '</b></td><td style="text-align:center;">' + currentCatches[mouse] + '</td><td style="text-align:center;">'; if (mouse in currentMisses) { ret += currentMisses[mouse]; } else { ret += '0'; } ret += '</td><td style="text-align:center;">'; if (mouse in pillageMice) { ret += pillageMice[mouse]; } else { ret += '0'; } ret += '</td></tr>'; } for (mouse in currentMisses) { if (mouse in currentCatches || mouse == 'Also Looted') {} else { ret += '<tr style="text-align:center; background:url(\''+ mhImageDir + rowImage + '\') bottom center no-repeat; text-align:center;"><td style="text-align:right; padding-right:6px;"><b>' + colorString(mouse) + '</b></td><td style="text-align:center;">0</td><td style="text-align:center;">' + currentMisses[mouse] + '</td><td style="text-align:center;">'; if (mouse in pillageMice) { ret += pillageMice[mouse]; } else { ret += '0'; } ret += '</td></tr>'; } } return ret + '</table>'; }
function mouseTextTable()        { var currentCatches = loadObject('savedMice'); var currentMisses  = loadObject('savedMisses'); var pillageMice    = loadObject('pillageMice'); var ret = ''; ret += '..Mouse....Catch.Miss.Stole.\n'; for (var mouse in currentCatches) { ret += padString(mouse, 13) + padString(currentCatches[mouse], 5); if (mouse in currentMisses) { ret += padString(currentMisses[mouse], 5); } else { ret += '0....'; } if (mouse in pillageMice) { ret += padString(pillageMice[mouse], 5); } else { ret += '0....'; } ret += '\n'; } for (mouse in currentMisses) { if (mouse in currentCatches || mouse == 'Also Looted') {} else { ret += padString(mouse, 13) + '0....' + padString(currentMisses[mouse], 5); if (mouse in pillageMice) { ret += padString(pillageMice[mouse], 5); } else { ret += '0....'; } ret += '\n'; } } return ret + '\n'; }
function hornTable2()            { var currentTotals  = loadObject('savedCallers'); var currentCatches = loadObject('savedCallersCatch'); var currentMisses  = loadObject('savedCallersMisses'); var currentFails   = loadObject('savedCallersAFail'); var currentPoints  = loadObject('savedCallersPoints'); var currentGold    = loadObject('savedCallersGold'); var ret = '<table align="center" border="0" cellspacing="0" cellpadding="2" width="200">'; 
  for (var name in currentTotals) { 
    var tCall = 0;
    var tCatch = 0;
    var tMiss = 0;
    var tFail = 0;
    var art = ' has ';
    if (name == 'You') { art = ' have '; }
    ret += '<tr style="background:url(\''+ mhImageDir + rowImage + '\') top left;"><td style="text-align:left; text-indent:15px; padding:2px 6px 2px 10px;" colspan="2"><b>' + colorString(name) + '</b> ' + art + ' sounded the horn ' + currentTotals[name] + ' times, ';
    tCall += currentTotals[name];
    if (name in currentCatches) { ret += mouseString(currentCatches[name]); tCatch += currentCatches[name]; } else { ret += '0'; } 
    ret += ' caught, ';
    if (name in currentMisses) { ret += mouseString(currentMisses[name]); tMiss += currentMisses[name]; } else { ret += '0'; } 
    ret += ' missed, '; 
    if (name in currentFails) { ret += currentFails[name]; tFail += currentFails[name]; } else { ret += '0'; } 
    ret += ' failed to attract.  ' + (100-parseInt((tFail/tCall)*100)) + '% attraction rate, ' + parseInt((tCatch / tCall) * 100) + '% catch rate.  ';
    if (name in currentGold) { ret += addSep(currentGold[name]); } else { ret += '0'; }
    ret += ' gold and ';
    if (name in currentPoints) { ret += addSep(currentPoints[name]); } else { ret += '0'; }
    ret += ' points earned.'; 
    ret += '<div style="height:0px; width:165px; border:1px ridge #9c9c2c; text-align:center; margin-left:5px; margin-top:3px;"> </div></td></tr>';
  }
  return ret + '</table>';  
}

function showHideIT(key, ele)    { var cTable = ele.getElementsByTagName('table')[0]; if (cTable.style.display == 'none') { cTable.style.display = 'table'; setValue(key, true); } else { cTable.style.display = 'none'; setValue(key, false); } }
function concoctStatString()     { var strPattern = getValue('strPattern', 'Hunts: ~H~ hunt, Attractions: ~A~<br />~AR~% attraction rate.<br />~C~ caught, ~M~ missed, ~L~ also looted.<br />~ACR~% of attracted mice caught.<br />~TCR~% total hunt catch rate.'); var replacements = {}; var huntCount = getValue('huntCounter', 1); var huntStats = getCatchStats(); replacements['~H~'] = getValue('huntCounter', 1); replacements['~A~'] = huntStats[1] + huntStats[2]; replacements['~AR~'] = parseInt((replacements['~A~'] / replacements['~H~']) * 100); if (huntStats[1] > 0) { replacements['~C~'] = mouseString(huntStats[1]); } else { replacements['~C~'] = 'No mice'; } if (huntStats[2] > 0) { replacements['~M~'] = mouseString(huntStats[2]); } else { replacements['~M~'] = 'No Mice';    } if (huntStats[3] > 0) { replacements['~L~'] = mouseString(huntStats[3]); } else { replacements['~L~'] = 'No mice'; } if (replacements['~A~'] > 0) { replacements['~ACR~'] = parseInt((huntStats[1] / replacements['~A~']) * 100); } else { replacements['~ACR~'] = 0; } replacements['~TCR~'] = parseInt((huntStats[1] / huntCount) * 100); for (var r in replacements) { strPattern = strPattern.replace(r, replacements[r]); } return strPattern; }
function settingsMenu()          { 
  if (document.getElementById('mhals_settings')) { document.getElementById('mhals_settings').style.display = 'block'; } 
  else { 
    var menuContainer    = document.createElement('div');
    var showSettingsPart = document.createElement('div');
    var statStringPart   = document.createElement('div');
    var closeBtn         = document.createElement('div');
    menuContainer.innerHTML = '<div style="height:30px; font-size:14px; font-weight:bold; text-align:center;">Log Summary Settings</div>';
    menuContainer.appendChild(showSettingsPart);
    menuContainer.appendChild(statStringPart);
    menuContainer.appendChild(closeBtn);
    showSettingsPart.innerHTML = 'Click the following lines to toggle which information boxes will be shown.  This is used to completely remove an item from the summary, it does not simply hide the contents.';
    var lootSetting    = showSettingsPart.appendChild(newCheckBox('Loot', 'showLootBox'));
    var mmSetting      = showSettingsPart.appendChild(newCheckBox('Mice', 'showMainMice'));
    var cheeseSetting  = showSettingsPart.appendChild(newCheckBox('Cheese Used', 'showCheeseBox'));
    var rateSetting    = showSettingsPart.appendChild(newCheckBox('Catch Rates', 'showRateBox'));
    var pillageSetting = showSettingsPart.appendChild(newCheckBox('Pillage Totals', 'showPillageBox'));
    var friendSetting2 = showSettingsPart.appendChild(newCheckBox('Friend Horn Summaries', 'showCallerStats2'));
    closeBtn.innerHTML = 'Close Settings Menu';
    closeBtn.addEventListener('click', hideSettings, false);
    closeBtn.setAttribute('style', 'text-align:center; font-weight:bold; padding:4px 0px 2px 0px; cursor:pointer;');
    statStringPart.innerHTML = '<br />The following string is used to show total stats under the mice caught totals.  There are a few "entities" you can used to make your own strings and custom stats.  Each symbol can only be used once.  <table cellpadding=2 cellspacing=0 align=center border=1><tr><td>Symbol</td><td>Replaced With...</td></tr><tr><td>~H~</td><td>Total Hunts</td></tr><tr><td>~A~</td><td>Total Attracted Mice</td></tr><tr><td>~C~</td><td>Total Caught</td></tr><tr><td>~M~</td><td>Total Missed</td></tr><tr><td>~L~</td><td>Total Also Looted</td></tr><tr><td>~AR~</td><td>Attraction Rate</td></tr><tr><td>~ACR~</td><td>Attracted Catch Rate</td></tr><tr><td>~TCR~</td><td>Total Catch Rate</td></tr></table>';
    var ta = document.createElement('textarea');
    ta.id = 'strPatternBox';
    ta.setAttribute('rows', 5);
    ta.setAttribute('cols', 48);
    ta.innerHTML = getValue('strPattern', '~H~ hunts, ~A~ attracted mice.<br />~AR~% attraction rate.<br />~C~ caught, ~M~ missed, ~L~ also looted.<br />~ACR~% of attracted mice caught.<br />~TCR~% total hunt catch rate.');
    ta.addEventListener('keyup', updateStrPattern, false);
    statStringPart.appendChild(ta);
    menuContainer.setAttribute('style', 'border:2px outset; position:fixed; top:' + (window.screen.height/2-400) + 'px; left:' + ((window.screen.width / 2)-150) + 'px; background:url("'+mhImageDir+rowImage+'") top left; width:300px; text-align:center;');
    menuContainer.id = 'mhals_settings';
    document.body.appendChild(menuContainer);
  }
}

function tableRow(data)          { var tr = document.createElement('tr'); tr.setAttribute('style', 'background:url("' + mhImageDir + rowImage + '") top left;'); for (var i=0; i<data.length; i++) { var td = document.createElement('td'); td.setAttribute('style', 'text-align:left; font-size:12px; padding:2px 0px 2px 0px;'); if (i==0) { td.setAttribute('style', 'width:63px; text-align:center; font-weight:bold; font-size:12px; padding:2px 0px 2px 0px;'); } td.innerHTML = data[i]; tr.appendChild(td); } return tr; }
function containerRow(t)         { var tr = document.createElement('tr'); var td = document.createElement('td'); td.setAttribute('colspan', '2'); td.innerHTML = t; tr.appendChild(td); return tr; }
function tableHead(data)         { var tr = document.createElement('tr'); var td = document.createElement('td'); tr.setAttribute('style', 'background:url("' + mhImageDir + headerImage + '") bottom right; height:30px;'); td.setAttribute('colspan', '2'); if (data.length > 35) { td.setAttribute('style', 'width:200px; text-align:center; color:#dcee7d;'); }  else                  { td.setAttribute('style', 'font-size:12px; width:200px; text-align:center; color:#dcee7d; font-weight:bold;'); } td.innerHTML = data; tr.appendChild(td); return tr; }
function createMainTable(rows)   { 
  var t = document.createElement('table'); 
  t.width = 200; 
  t.setAttribute('cellspacing', '0'); 
  t.setAttribute('cellpadding', '0'); 
  for (var i=0; i<rows.length; i++) { 
    t.appendChild(rows[i]); 
  } 
  var lastRow = document.createElement('tr');
  var resetBtn = document.createElement('td');
  lastRow.appendChild(resetBtn);
  resetBtn.setAttribute('style', 'cursor:pointer; padding-left:10px; text-align:center;');
  resetBtn.innerHTML = 'Reset Data';
  resetBtn.addEventListener('click', resetData, false);

  var settingBtn = document.createElement('td');
  lastRow.appendChild(settingBtn);
  settingBtn.setAttribute('style', 'cursor:pointer; text-align:center;');
  settingBtn.innerHTML = 'Show Settings';
  settingBtn.addEventListener('click', settingsMenu, false);
  t.appendChild(lastRow);

  lastRow = document.createElement('tr');
  var copyBtn = document.createElement('td');
  copyBtn.setAttribute('colspan', '2');
  lastRow.appendChild(copyBtn);
  copyBtn.setAttribute('style', 'cursor:pointer; text-align:center;');
  copyBtn.innerHTML = 'Show Pastable';
  copyBtn.addEventListener('click', function() { textOutput(); }, false);  
  t.appendChild(lastRow);
  
  
  lastRow = document.createElement('tr');
  var outputArea = document.createElement('td');
  outputArea.setAttribute('colspan', '2');
  outputArea.id = 'mhals_textOutput';
  lastRow.appendChild(outputArea);
  t.appendChild(lastRow);
  return t;
}

function showHideClicker(key, row, container) { row.addEventListener('click', function(){ showHideIT(key, container); }, false); row.setAttribute('title', 'Click here to show/hide data.'); row.style.cursor  = 'pointer'; if (getValue(key, false) == false) { showHideIT(key, container); } }
function newCheckBox(label, key) { var d = document.createElement('div'); if (getValue(key, true)) { d.innerHTML = 'Hide ' + label; } else                     { d.innerHTML = 'Show ' + label; } d.setAttribute('style', 'cursor:pointer; text-align:center; text-decoration:underline;'); d.id = key; d.addEventListener('click', changeSetting, false); return d; }
function changeSetting(evt)      { var cMode = /([a-zA-Z]+) ([a-zA-Z0-9 ]+)/.exec(evt.target.innerHTML); if (cMode[1] == 'Show') { setValue(evt.target.id, true); evt.target.innerHTML = 'Hide ' + cMode[2];   } else { setValue(evt.target.id, false); evt.target.innerHTML = 'Show ' + cMode[2];     }}
function hideSettings()          { document.getElementById('mhals_settings').style.display = 'none'; location.reload(true); }
function LOTString()             { var dt = new Date(); var cST = startTime(); cST = cST.split('.'); cST[2] = cST[2].split(':'); if (cST[2][1].length > 2) { if (cST[2][1].substring(2, 4) == 'pm') { cST[2][0] = parseInt(cST[2][0]) + 12; cST[2][1] = cST[2][1].substring(0, 2); } } var myTime = new Date(dt.getFullYear(), cST[0], cST[1], cST[2][0], cST[2][1]); var seconds = parseInt((dt - myTime)/1000); var mins = 0; var hours = 0; var days  = 0; while (seconds >= (60*60*24)) { days += 1; seconds -= 60*60*24; } while (seconds >= (60*60))    { hours += 1; seconds -= 60*60; } while (seconds >= 60)         { mins += 1; seconds -= 60; } timeString = ''; if (days > 1)  { timeString += days + ' Days '; } if (days == 1)  { timeString += days + ' Day '; } if (hours > 1) { timeString += hours + ' Hours '; } if (hours == 1) { timeString += hours + ' Hour '; } if (mins > 1)  { timeString += mins + ' Minutes ';} if (mins == 1)  { timeString += mins + ' Minute ';} return timeString; }

function textOutput() {
  if (document.getElementById('mhals_text')) {
    if (document.getElementById('mhals_text').style.display == '') {
      document.getElementById('mhals_text').style.display = 'none';
    } else {
      document.getElementById('mhals_text').style.display = '';
    }
    return;
  }
  var ta = document.getElementById('mhals_textOutput');
  ta.innerHTML = '';
  var field = document.createElement('textarea');
  field.id = 'mhals_text';
  field.setAttribute('rows', 15);
  field.setAttribute('cols', 24);
  field.setAttribute('style', 'font-family:Courier New;');
  var sinceString = startTime();
  if (sinceString == '') { sinceString = 'No Data'; } else { sinceString = sinceString.split('.'); sinceString = 'Log Since ' + months[parseInt(sinceString[0])] + ' ' + sinceString[1] + ', ' + sinceString[2]; }
  field.value = sinceString + '\n';
  if (sinceString != 'No Data') { 
    field.value += LOTString() + 'of log time.\n\n';
    var huntCount = getValue('huntCounter', 1);
    var huntStats = getCatchStats();
    field.value += 'Gold....' + addSep(getValue('gold', 0))  + ' (' + addSep(parseInt(getValue('gold', 0)   / huntCount)) + ' per hunt)\n';
    field.value += 'Points..' + addSep(getValue('points', 0))  + ' (' + addSep(parseInt(getValue('points', 0)   / huntCount)) + ' per hunt)\n';
    field.value += concoctStatString().replace(/<br \/>/g, '\n') + '\n\n';
    if (getValue('showMainMice', true))   { field.value += mouseTextTable(); }
    if (getValue('showLootBox', true))    { field.value += '............Loot............\n'; field.value += objectTextTable(loadObject('savedLoot')); }
    if (getValue('showCheeseBox', true))  { field.value += '.........Cheese Used........\n'; field.value += objectTextTable(loadObject('savedCheese')); }
    if (getValue('showPillageBox', true)) { field.value += '.......Pillage Totals.......\n'; field.value += objectTextTable(loadObject('savedPillages')); }
    if (getValue('showRateBox', true))    { field.value += '.........Catch Rates........\n'; field.value += objectTextTable(huntStats[0]); }
  }
  field.addEventListener('click', function() { this.focus(); this.select(); }, false);
  ta.appendChild(field);
}

//
//  Start of actually doing something
//
checkCheeseChange();
collectData();
var sinceString = startTime();
if (sinceString == '') { sinceString = 'No Data'; } else { sinceString = sinceString.split('.'); sinceString = 'Log Since ' + months[parseInt(sinceString[0])] + ' ' + sinceString[1] + ', ' + sinceString[2]; }
var myHudNode = document.createElement('div');
myHudNode.id  = 'mhals_mainNode';
var rows = new Array();
rows[0] = tableHead(sinceString);
if (sinceString != 'No Data') { 
  var huntCount = getValue('huntCounter', 1);
  var huntStats = getCatchStats();
  rows[1]  = tableRow(new Array('Gold',   addSep(getValue('gold', 0))  + ' (' + addSep(parseInt(getValue('gold', 0)   / huntCount)) + ' per hunt)'));
  rows[2]  = tableRow(new Array('Points', addSep(getValue('points', 0))+ ' (' + addSep(parseInt(getValue('points', 0) / huntCount)) + ' per hunt)'));
  rows[3]  = tableHead(concoctStatString());
  nID = 4;
  if (getValue('showMainMice', true))    { rows[nID] = containerRow(' &nbsp; '); rows[nID+1] = containerRow(mouseTable()); nID+=2; }
  if (getValue('showLootBox', true))     { rows[nID] = containerRow(' &nbsp; '); rows[nID+1] = tableHead('Loot'); rows[nID+2] = containerRow(objectTable(loadObject('savedLoot'))); showHideClicker('showLoot', rows[nID+1], rows[nID+2]); nID+=3; }
  if (getValue('showCheeseBox', true))   { rows[nID] = containerRow(' &nbsp; '); rows[nID+1] = tableHead('Cheese Used'); rows[nID+2] = containerRow(objectTable(loadObject('savedCheese')));  showHideClicker('showCheese', rows[nID+1], rows[nID+2]); nID += 3; }
  if (getValue('showPillageBox', true))  { rows[nID] = containerRow(' &nbsp; '); rows[nID+1] = tableHead('Pillage Totals'); rows[nID+2] = containerRow(objectTable(loadObject('savedPillages')));  showHideClicker('showPillages', rows[nID+1], rows[nID+2]); nID += 3; }
  if (getValue('showRateBox', true))     { rows[nID] = containerRow(' &nbsp; '); rows[nID+1] = tableHead('Catch Rates'); rows[nID+2] = containerRow(objectTable(huntStats[0])); showHideClicker('showCR', rows[nID+1], rows[nID+2]); nID += 3; }
  if (getValue('showCallerStats2', true)){ rows[nID] = containerRow(' &nbsp; '); rows[nID+1] = tableHead('Horn Stats'); rows[nID+2] = containerRow(hornTable2()); showHideClicker('showFS2', rows[nID+1], rows[nID+2]); nID += 3; }
}
var mainTable = createMainTable(rows);
myHudNode.appendChild(mainTable);

var refNode = xpath("//div[@class='UIStandardFrame_SidebarAds']").snapshotItem(0);
refNode.parentNode.insertBefore(myHudNode, refNode);
refNode.style.display = 'none';
myHudNode.setAttribute('style', 'font-family:Arial; width:0px; height:0px; position:relative; top:125px; left:780px;');
