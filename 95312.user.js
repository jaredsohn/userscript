// ==UserScript==
// @name           Ikariam Port Fixer
// @namespace      IKPF
// @description    Adds buttons to the trading port to send goods and troops, as well as deploy fleets.  Also adds convenience to other pages with incremental and "all" shipping options.  Latest version adds links to the trading post for easy player lookup.
// @version        3.02
// @include        http://s*.ikariam.*/*
// @require        http://www.betawarriors.com/bin/gm/57756user.js
// @require        http://userscripts.org/scripts/source/95311.user.js
// @history        0.05 - First versioned version
// @history        0.06 - First multi-language attempt
// @history        2.00 - General re-wrte
// @history        2.00 - Dropped Localization until a better method is found
// @history        2.01 - Fixed mouseover texts, slight changes to layout
// @history        3.00 - Added Trading Post links
// @history        3.02 - Fixed for 4.1, eliminates tiles, retains old look
// ==/UserScript==
ScriptUpdater.check(48698, '3.02');
var imgTagOpen    = '<img style="position:relative; top:5px;" src="http://' + window.location.host + '/skin/actions/';                             
function zfill(str, len)          { while ((str+'').length<len) {str = '0' + str;} return str; }
function timeString(tm)           { days = 0;  hours = 0;  mins = 0;  secs = 0;  str  = ''; if (tm > 0) { if (tm >= 60) { while (tm >= 60) { hours += 1; tm -= 60; } } if (hours >= 24) { while (hours >= 24) { days += 1; hours -= 24; } } tm = (tm + '').split('.'); mins = tm[0]; if (tm[1] > 0) { secs = (('0.' + tm[1]) * 60).toFixed(0); } } else {mins = 10;} if (days  > 0)  { str += days  + 'D '; }  if (hours  > 0) { str += hours + 'h ';}  if (mins  > 0)  { str += mins  + 'm ';}  if (secs  > 0)  { str += secs  + 's';} return '<font style="font-size:11px;">' + str + '</font>'; }
function getSelectedCityCoords()  { return trimCoord(C_API.getNodeTC("id('breadcrumbs')")); }
function getSelectedCityName()    { return C_API.getNodeTC("id('breadcrumbs')").split('>')[2]; }
function currentBuilding()        { return C_API.getNodeTC("id('breadcrumbs')/span[@class='building']"); }
function trimCoord(str)           { if (str.indexOf(')') >= 0) { return str.substring(str.indexOf('(')+1, str.indexOf(')')).split(':'); } else if (str.indexOf(']') >= 0) { return str.substring(str.indexOf('[')+1, str.indexOf(']')).split(':'); } else { return null; } }
function getCityId(str)           { m = /[\?&]destinationCityId=([0-9]+)/.exec(str); if (m != null) { return RegExp.$1; } }
function getCityName(str)         { if (str.indexOf(')') >= 0) { return str.substring(str.indexOf(')') + 1, str.length); } else if (str.indexOf(']') >= 0) { return str.substring(str.indexOf(']') + 1, str.length); } else { return null; } }
function lineDiv(contents, w, sp) { return '<span style="width:'+w+'px; display:inline-table; ' + sp + '">' + contents + '</span>'; }
function goodsLink(cid)           { return '<a style="background:url(); width:36px; height:22px;" href="?view=transport&amp;destinationCityId=' +                           cid + '" title="Transport Goods">' + imgTagOpen + 'transport.gif"   alt="Transport Goods" width="30" /></a>'; }
function troopLink(cid)           { return '<a style="background:url(); width:36px; height:22px;" href="?view=deployment&amp;deploymentType=army&amp;destinationCityId=' +  cid + '" title="Station Troops">' + imgTagOpen + 'move_army.gif"   alt="Station Troops"  width="30" /></a>'; }
function fleetLink(cid)           { return '<a style="background:url(); width:36px; height:22px;" href="?view=deployment&amp;deploymentType=fleet&amp;destinationCityId=' + cid + '" title="Station Fleets">' + imgTagOpen + 'move_fleet.gif"  alt="Station Fleets"  width="30" /></a>'; }
function newCityRow(city, cityId, coords, t) { return  '<div style="width:65px;  display:inline-table; text-align:center; font-size:14px;"><b>[</b><span style="padding:0px 2px 0px 2px; font-size:12px; position:relative; top:1px;">' + (coords+'').replace(',', ':') + '</span><b>]</b></div><div style="width:100px; display:inline-table; font-size:12px;">' + city + '</div>' + lineDiv(goodsLink(cityId), 36, 'text-align:center;') + lineDiv(troopLink(cityId), 36, 'text-align:center;') + lineDiv(fleetLink(cityId), 36, 'text-align:center;') + '<div style="width:100px;  display:inline-table; text-align:center; padding-left:10px; font-size:12px;">' + t + '</div>'; }
function newPortList() {
  shipList = C_API.getNode("//ul[@class='cities clearfix']");
  if (shipList) {
    listText = shipList.innerHTML;
    shipList.innerHTML = listText;
    result = C_API.xpath("//ul[@class='cities clearfix']/li/a");
    selectedCity = getSelectedCityCoords();
    for ( var i=0; i < result.snapshotLength; i++ ) { 
      city         = result.snapshotItem(i).textContent;
      cityId       = getCityId(result.snapshotItem(i).href);
      if (cityId != undefined) {cityId = RegExp.$1;}
      coords       = trimCoord(city);
      dist         = Math.sqrt(Math.pow(Math.abs(coords[0] - selectedCity[0]), 2) + Math.pow(Math.abs(coords[1] - selectedCity[1]), 2)) * 1200.00;
      if (dist == 0) {dist = 600;}
      result.snapshotItem(i).parentNode.className = "";
      pn = result.snapshotItem(i).parentNode;
      pn.innerHTML  = newCityRow(getCityName(city), cityId, coords, timeString(dist/60));
    }
  }
sn = C_API.xpath("//div[@title='Merchant ships']");
sn = sn.snapshotItem(0);
sc = /([0-9]+)\/([0-9]+)/.exec(sn.firstChild.nextSibling.textContent);
if (sc != null) {
  total_ships = 1*RegExp.$2;
  next_ship   = 1*RegExp.$1+1;
  t_cost = 0;
  t_spent = 0;
  for (n=1; n<=total_ships; n++) {
    m = 1.03;
    for (i=1; i<n; i++) {
      m = m * 1.03;
    }
    if   (n >= next_ship) { t_cost += 3 * Math.floor(4500 * m - 4475); }
    else                  { t_spent += 3 * Math.floor(4500 * m - 4475); }
  }
  d = document.createElement('p');
  d.textContent = C_API.addSep(t_cost) + " gold needed to buy all remaining ships. " + C_API.addSep(t_spent) + " gold spent so far.";
  sn.parentNode.appendChild(d);
 }
}

function postLinks() {
  tradeList = C_API.xpath("//table[@class='tablekontor']");
  tradeList = tradeList.snapshotItem(1);
  tradeRows = tradeList.getElementsByTagName('tr');
  for (i=1; i<tradeRows.length-1; i++) {
    d = tradeRows[i].getElementsByTagName('td');
    m = /\((.+)\)/.exec(d[0].textContent);
    if (m != null) {
      cc = d[0].textContent;
      d[0].innerHTML = '<a href="/index.php?view=highscore&highscoreType=score&offset=0&searchUser=' + m[1] + '">' + cc + '</a>';
    }
  }
}


switch (currentBuilding()) {
  case 'Trading port':
  case 'Town hall':
    newPortList();
    break;
  case 'Trading post':
    postLinks();
    break;
}