// ==UserScript==
// @name          Ikariam AV Resources
// @namespace     IK_AVR
// @description   Shows the resources needed for building upgrades and adds visual indicators to city view when either enough resources are available.
// @version       1.03
// @include       http://s*.ikariam.*/*
// @exclude    http://board.ikariam.*/*
// @exclude    http://*.ikariam.*/*?view=options
// @exclude    http://*.ikariam.*/*?view=highscore
// @exclude    http://*.ikariam.*/*?view=premium
// @exclude    http://*.ikariam.*/*?view=premiumPayment
// @exclude    http://*.ikariam.*/pillory.php
// @exclude    http://support.ikariam.*/*
// @require    http://userscripts.org/scripts/source/68732.user.js
// @history    1.01 - Added version and version checking
// @history    1.01 - Restarted development, improving data storage
// @history    1.02 - Greatly reduced storage footprint
// @history    1.03 - "Max" and "NA" Icon added where appropriate
// ==/UserScript==

var server = /\/\/([a-z._0-9]+)\//.exec(document.URL);
    server = server[1];
var checkmarkSrc = 'data:image/png;base64,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';
var crossoutSrc = 'data:image/png;base64,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';
var maxSrc = 'data:image/png;base64,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'
var naSrc  = 'data:image/png;base64,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'

var res = {
  key:  server+'_resData',
  get:  function()     { var r = C_API.get(res.key, ''); r = r.split(';'); for (var i=0; i<r.length; i++) { var k = r[i].split(':')[0]; var v = r[i].split(':')[1]; if (k.length > 0) { res.data[k] = v; } } },
  set:  function(k, v) { res.data[k] = v; },
  save: function()     { var s = ''; for (var e in res.data) { if (e.length > 0) { if (s != '') { s += ';'; } s += e + ':' + res.data[e]; } } C_API.set(res.key, s); },
  data: {},
  print:function()     { for (var e in res.data) { C_API.debug(e + ' = ' + res.data[e]); } },
};
res.get();
function numString(total, needed) { ret = total - needed; if (ret >=  0) { return '<font color="#229922">+' + addSep(ret) + '</font>'; } else if (ret <  0) { return '<font color="#992222">-' + addSep(Math.abs(ret)) + '</font>'; } else if (ret == 0) { return null; } }
function xpath(query)             { return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); }
function getNode(path)            { var value = xpath(path);   if (value.snapshotLength == 1) { return value.snapshotItem(0); } return null; }
function getNodeTC(path)          { var value = getNode(path); if (value != null) { return value.textContent; } return null; }
function getNodeValue(path)       { var value = getNode(path); if (value != null) { return value.value; } return null; }
function setValue(key, value)     { GM_setValue(server + key + '_mr', value) }
function getValue(key, defVal)    { ret = GM_getValue(server + key + '_mr');  if (ret != undefined) { return ret; } else { return defVal; } }
function currentBuilding()        { return getNodeTC("id('breadcrumbs')/span[@class='building']"); }
function getSelectedCityCoords()  { return trimCoord(getNodeTC("id('breadcrumbs')")); }
function getSelectedCityName()    { return getNodeTC("id('breadcrumbs')").split('>')[2]; }
function getSelectedCityId()      { lnk  = getNode("id('breadcrumbs')/a[@class='city']"); if (lnk) { bcId = /id=([0-9]+)/.exec(lnk.href); ret  = RegExp.$1; if (ret) { return ret; } } else { sel = xpath("//select//option"); for (var i=0; i<sel.snapshotLength; i++) { c = sel.snapshotItem(i); if (c.getAttribute('selected') == 'selected') { return c.value; } } return null; } }
function parseSep(number)         { return number.replace(',', '').replace('.', '')*1; }
function addSep(number)           { if (number*1 == NaN || number.length <= 3) { return number; } ret = ''; number += ''; sc  = 0; for (var i=0; i<number.length; i++) { ret = number[number.length - (i + 1)] + ret; sc  += 1; if (sc == 3 && i + 1 < number.length) { ret = ',' + ret; sc = 0; } } return ret; }
function getTownRes()             { ret = new Array(); ret['wood'] = parseSep(getNodeTC("//span[@id='value_wood']")); ret['wine']    = parseSep(getNodeTC("//span[@id='value_wine']"));  ret['marble']  = parseSep(getNodeTC("//span[@id='value_marble']"));  ret['glass']   = parseSep(getNodeTC("//span[@id='value_crystal']"));  ret['sulfur']  = parseSep(getNodeTC("//span[@id='value_sulfur']"));  return ret;}
function infoPut(name, val)       { d = document.createElement('input'); document.body.appendChild(d); d.setAttribute('type', 'hidden'); d.setAttribute('id', name);  d.setAttribute('value', addSep(val));}
function internalScreenTasks() {
  resArray = getTownRes();
  neededRes = xpath("//div[@id='buildingUpgrade']//div//ul[@class='resources']//li");
  var reqTotal = 0;
  for (var i=0; i < neededRes.snapshotLength; i++) {
    li          = neededRes.snapshotItem(i);
    if (li.className != 'time') {
      liTC        = li.textContent;
      matType     = liTC.substr(0, liTC.indexOf(':'));
      required    = parseSep(liTC.substr(liTC.indexOf(':')+1, liTC.length));
      reqTotal   += required;
      n           = document.createElement('li');
      n.className = li.className;
      n.innerHTML = '<span class="textLabel">' + matType + '</span>' + numString(resArray[li.className.split(' ')[0]], required);
      li.parentNode.appendChild(n);
      if (currentBuilding() == 'Town hall') {
        var test = xpath('//div[@class="buildingDescription"]/h1').snapshotItem(0);
        if (test != undefined) {
          res.set(getSelectedCityId() + '_Trading port_' + matType, required);
        } else {
          res.set(getSelectedCityId() + '_Town hall_' + matType, required);
        }
      } else { res.set(getSelectedCityId() + '_' + currentBuilding() + '_' + matType, required); }
    }
  }
  res.save();
  var d = document.createElement('div');
  li.parentNode.parentNode.appendChild(d);
  d.setAttribute('style', 'text-align:center; font-weight:bold; color: #323232; width:100%; display:block; clear:both;');
  d.innerHTML = numString(Math.floor(reqTotal * 0.01), 0) + ' Total Score';
  li.parentNode.appendChild(document.createElement('br')); 
  li.parentNode.appendChild(document.createElement('br'));
}

function cityScreenTasks() {
  resArray = getTownRes();
  buildings = xpath("//div[@id='mainview']//ul[@id='locations']//li");
  for (var i=0; i<buildings.snapshotLength; i++) {
    buildingNode = buildings.snapshotItem(i);
    building     = buildingNode.textContent.substr(0, buildings.snapshotItem(i).textContent.indexOf('Level')-1).replace(/^\s+|\s+$/g, '');
    if (buildingNode.className != 'beachboys' && buildingNode.className != 'garnison' && buildingNode.className != 'transporter') {
      if (building == 'Hideout' || building == 'Carpenter`s Workshop' || building == 'Wine Cellars' || building == 'Architect`s Office' || building == 'Optician' || building == 'Firework Test Area' || building == 'Forester`s House' || building == 'Glassblower' || building == 'Alchemist Tower' || building == 'Winery' || building == 'Stonemason') { 
        var cLevel = /Level\s+([0-9]+)/.exec(buildingNode.textContent);
        if (cLevel != undefined) { if (cLevel[1] == 32) { buildingNode.innerHTML += "<img src='" + maxSrc + "' width='20' title='Maximum level reached.'  style='position:relative; top:10px; left:60px; z-index:1000;' />"; continue; } }
      }
      if (building == 'Warehouse') {
        var cLevel = /Level\s+([0-9]+)/.exec(buildingNode.textContent);
        if (cLevel != undefined) { if (cLevel[1] == 40) { buildingNode.innerHTML += "<img src='" + maxSrc + "' width='20' title='Maximum level reached.'  style='position:relative; top:10px; left:60px; z-index:1000;' />"; continue; } }
      }
      needed_Wood   = parseInt(res.data[getSelectedCityId() + '_' + building + '_Building material']);
      needed_Wine   = parseInt(res.data[getSelectedCityId() + '_' + building + '_Wine']);
      needed_Marble = parseInt(res.data[getSelectedCityId() + '_' + building + '_Marble']);
      needed_Glass  = parseInt(res.data[getSelectedCityId() + '_' + building + '_Crystal Glass']);
      needed_Sulfur = parseInt(res.data[getSelectedCityId() + '_' + building + '_Sulphur']);
      ok = 1;
      if (!isNaN(needed_Wood)) {
        if (resArray['wood']   - needed_Wood   < 0)  {ok=0; infoPut(building + 'wood',   Math.abs(resArray['wood'] - needed_Wood));}
        if (resArray['wine']   - needed_Wine   < 0)  {ok=0; infoPut(building + 'wine',   Math.abs(resArray['wine'] - needed_Wine));}
        if (resArray['marble'] - needed_Marble < 0)  {ok=0; infoPut(building + 'marble', Math.abs(resArray['marble'] - needed_Marble));}
        if (resArray['glass']  - needed_Glass  < 0)  {ok=0; infoPut(building + 'glass',  Math.abs(resArray['glass'] - needed_Glass));}
        if (resArray['sulfur'] - needed_Sulfur < 0)  {ok=0; infoPut(building + 'sulfur', Math.abs(resArray['sulfur'] - needed_Sulfur));}
        if (ok) { 
          buildingNode.innerHTML += "<img src='" + checkmarkSrc + "' width='20' title='Goods available to upgrade.'  style='position:relative; top:0px; left:20px; z-index:1000;' />"; 
        } else if (buildingNode.textContent.indexOf('(') == -1) {
          d = document.createElement('img');
          buildingNode.appendChild(d);
          d.setAttribute('style', 'position:relative; top:0px; left:20px; z-index:1500; font-size:16px; font-weight:bold; color:#df2323; width:18px;');
          d.setAttribute('src', crossoutSrc);
          buildingNode.addEventListener('mouseover', function(event){
            if (document.getElementById('buildingUpgrade')) { getNode("//div[@id='mainview']").removeChild(document.getElementById('buildingUpgrade')); }
            t = document.createElement('div');
            getNode("//div[@id='mainview']").appendChild(t);
            buildingFull = this.textContent.replace(/^\s+|\s+$/g, '');
            buildingTag  = buildingFull.substr(0, buildingFull.indexOf('Level')-1).replace(/^\s+|\s+$/g, '');
            t.setAttribute('id', 'buildingUpgrade');
            t.setAttribute('class', 'dynamic');
            t.setAttribute('style', 'position:absolute; left:' + (event.pageX - 400) + 'px; top:' + (event.pageY - 125) + 'px; z-index:9500;');
            t.innerHTML += '<h3 class="header">' + buildingFull + '</h3>';
            t.innerHTML += '<div class="content">Still needed for next level<ul class="resources">';
            if (document.getElementById(buildingTag + 'wood'))   { t.innerHTML += '<li class="wood"><img src="skin/resources/icon_wood.gif" alt="Wood:" style="display:inline-table; height:20px; padding-right:15px; position:relative; top:4px;" />'     + document.getElementById(buildingTag + 'wood').value + '</li>'; }
            if (document.getElementById(buildingTag + 'wine'))   { t.innerHTML += '<li class="wine"><img src="skin/resources/icon_wine.gif" alt="Wine:" style="display:inline-table; height:20px; padding-right:15px; position:relative; top:4px;" />'    + document.getElementById(buildingTag + 'wine').value + '</li>'; }
            if (document.getElementById(buildingTag + 'marble')) { t.innerHTML += '<li class="marble"><img src="skin/resources/icon_marble.gif" alt="Marble:" style="display:inline-table; height:20px; padding-right:15px; position:relative; top:4px;" />'  + document.getElementById(buildingTag + 'marble').value + '</li>'; } 
            if (document.getElementById(buildingTag + 'glass'))  { t.innerHTML += '<li class="crystal"><img src="skin/resources/icon_glass.gif" alt="Glass:" style="display:inline-table; height:20px; padding-right:15px; position:relative; top:4px;" />' + document.getElementById(buildingTag + 'glass').value + '</li>'; } 
            if (document.getElementById(buildingTag + 'sulfur')) { t.innerHTML += '<li class="sulfur"><img src="skin/resources/icon_sulfur.gif" alt="Sulfur:" style="display:inline-table; height:20px; padding-right:15px; position:relative; top:4px;" />'  + document.getElementById(buildingTag + 'sulfur').value + '</li>'; } 
            t.innerHTML += '</ul><br /><div class="footer"></div>';
          }, false);
          buildingNode.addEventListener('mouseout', function(event) { if (document.getElementById('buildingUpgrade')) { getNode("//div[@id='mainview']").removeChild(document.getElementById('buildingUpgrade'));}} , false); 
        }
      } else {
          buildingNode.innerHTML += "<img src='" + naSrc + "' width='20' title='Goods available to upgrade.'  style='position:relative; top:0px; left:20px; z-index:1000;' />";       
      }
    }    
  }
}

function Init() {
  var building = getNode("//div[@id='buildingUpgrade']");
  if (building) { internalScreenTasks(); }
  else          { cityScreenTasks(); }
}

Init();