// ==UserScript==
// @name           Ikariam TidyRecruiter
// @namespace      IK_BSU
// @description    Hide "obsolete" units in the barracks and shipyard
// @version        0.01
// @include        http://s*.ikariam.org/index.php*
// @require        http://userscripts.org/scripts/source/57756.user.js
// @require        http://userscripts.org/scripts/source/68732.user.js
/// ==/UserScript==
ScriptUpdater.check(68690, '0.01');
var server = /\/\/([a-z._0-9]+)\//.exec(document.URL);
    server = RegExp.$1;

function debugString(str)         { d = document.createElement('div'); document.body.appendChild(d); d.innerHTML = str + '';}
function numString(total, needed) { ret = total - needed; if (ret >  0) { return '<font color="#229922">+' + addSep(ret) + '</font>'; } else if (ret <  0) { return '<font color="#992222">-' + addSep(Math.abs(ret)) + '</font>'; } else if (ret == 0) { return null; } }
function xpath(query)             { return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); }
function getNode(path)            { var value = xpath(path);   if (value.snapshotLength == 1) { return value.snapshotItem(0); } return null; }
function getNodeTC(path)          { var value = getNode(path); if (value != null) { return value.textContent; } return null; }
function getNodeValue(path)       { var value = getNode(path); if (value != null) { return value.value; } return null; }
function setValue(key, value)     { GM_setValue(server + key + '_ikbsu', value) }
function getValue(key, defVal)    { ret = GM_getValue(server + key + '_ikbsu');  if (ret != undefined) { return ret; } else { return defVal; } }
function currentBuilding()        { return getNodeTC("id('breadcrumbs')/span[@class='building']"); }
function getSelectedCityCoords()  { return trimCoord(getNodeTC("id('breadcrumbs')")); }
function getSelectedCityName()    { return getNodeTC("id('breadcrumbs')").split('>')[2]; }
function getSelectedCityId()      { lnk  = getNode("id('breadcrumbs')/a[@class='city']"); if (lnk) { bcId = /id=([0-9]+)/.exec(lnk.href); ret  = RegExp.$1; if (ret) { return ret; } } else { sel = xpath("//select//option"); for (var i=0; i<sel.snapshotLength; i++) { c = sel.snapshotItem(i); if (c.getAttribute('selected') == 'selected') { return c.value; } } return null; } }
function parseSep(number)         { return number.replace(',', '').replace('.', '')*1; }
function addSep(number)           { if (number*1 == NaN || number.length <= 3) { return number; } ret = ''; number += ''; sc  = 0; for (var i=0; i<number.length; i++) { ret = number[number.length - (i + 1)] + ret; sc  += 1; if (sc == 3 && i + 1 < number.length) { ret = ',' + ret; sc = 0; } } return ret; }
function getTownRes()             { ret = new Array(); ret['wood'] = parseSep(getNodeTC("//span[@id='value_wood']")); ret['wine']    = parseSep(getNodeTC("//span[@id='value_wine']"));  ret['marble']  = parseSep(getNodeTC("//span[@id='value_marble']"));  ret['glass']   = parseSep(getNodeTC("//span[@id='value_crystal']"));  ret['sulfur']  = parseSep(getNodeTC("//span[@id='value_sulfur']"));  return ret;}
function infoPut(name, val)       { d = document.createElement('input'); document.body.appendChild(d); d.setAttribute('type', 'hidden'); d.setAttribute('id', name);  d.setAttribute('value', addSep(val));}

function commonTask() {
  var cb = currentBuilding();
  if (cb != null) {
    if (cb =='Barracks' || cb == 'Shipyard') {
      unitNodes = xpath('//li');
      for (var i=0; i<unitNodes.snapshotLength; i++) {
        var n = unitNodes.snapshotItem(i);
        var name = n.getElementsByTagName('h4')[0];
        if (name) {
          if (cb == 'Barracks') {
            if (name.textContent == 'Slinger' || name.textContent == 'Battering ram' || name.textContent == 'Catapult' ||
                name.textContent == 'Archer' || name.textContent == 'Spearmen' || name.textContent == 'Slinger') {
              n.style.display = 'none';
            }
          }
          if (cb == 'Shipyard') {
            if (name.textContent == 'Ballista ship' || name.textContent == 'Battering ram' || name.textContent == 'Catapult' ||
                name.textContent == 'Archer' || name.textContent == 'Spearmen' || name.textContent == 'Slinger') {
              n.style.display = 'none';
            }
          }
        }
      }
    }
  }
}

commonTask();