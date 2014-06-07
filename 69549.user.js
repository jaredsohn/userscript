// ==UserScript==
// @name	  Estiah Explorer's Journal
// @description	  Explorer's Journal Version 1.1.  Discovered sites on the city page are added to a journal displayed below the world map.  Direct questions/comments to Gitface in Estiah or email 'theoneandonlygitface@gmail.com'.
// @author        Gitface
// @license	  (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @include http://www.estiah.com/city
// @include http://www.estiah.com/character/map

// ==/UserScript==

//----------------------------
// Known Issues/Limitations
//----------------------------
// - None

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  General functions
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function quotekeyval(str1, str2) {
  return "\"" + str1 + "\"\"" + str2 + "\"";
}

// This function inserts newNode after referenceNode
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
}

//---------------------------------------------------------------
//  return first token in a list of {} tokens
//---------------------------------------------------------------
function firstToken(str) {
  var token = str.replace(/^{([^{}]+)}.*/,'$1');
  return token;  
}

//---------------------------------------------------------------
//  return last token in a list of {} tokens
//---------------------------------------------------------------
function lastToken(str) {
  var token = str.replace(/.*{([^{}]+)}$/,'$1');
  return token;  
}

//---------------------------------------------------------------
//  return str with last token popped off
//---------------------------------------------------------------
function popLastToken(str) {
  var newstr = str.replace(/(.*){[^{}]+}$/,'$1');
  return newstr;
}

//---------------------------------------------------------------
//  return str with first token popped off
//---------------------------------------------------------------
function popFirstToken(str) {
  var newstr = str.replace(/^{[^{}]+}(.*)$/,'$1');
  return newstr;
}

//---------------------------------------------------------------
//  append token
//---------------------------------------------------------------
function appendToken(str, token) {
  var newstr = str + "{" + token + "}";
  return newstr;
}

//---------------------------------------------------------------
function jump(linkText) {
  return function() {
    window.open("http://progenitor-softworks.com/ew/index.php?title=" + linkText);
  }
}

//---------------------------------------------------------------
// get username
//---------------------------------------------------------------
function getUsername() {
  var dropdownnodes = document.evaluate("//div[@class='entry BV_menu_dropdown']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  for (var i = 0; i < dropdownnodes.snapshotLength; i++) {
    var node = dropdownnodes.snapshotItem(i);
    var thehtml = node.innerHTML.replace(/\n/g, '');

    //<a href="/character" class="nolink">Gitface (L.<strong class="PT_update_level">17</strong>)</a>
    if (thehtml.indexOf("<a href=\"/character\"") >= 0) {
      thehtml = thehtml.replace(/.*<a href="\/character"[^>]+>([^< ]+) \(L.*/,'$1');
      return thehtml;
    } 
  }
  return "unknown";
}

//---------------------------------------------------------------
// get city
//---------------------------------------------------------------
function getCity() {
  var dropdownnodes = document.evaluate("//div[@class='entry BV_menu_dropdown']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  for (var i = 0; i < dropdownnodes.snapshotLength; i++) {
    var node = dropdownnodes.snapshotItem(i);
    var thehtml = node.innerHTML.replace(/\n/g, '');

    //<a href="/city" class="nolink disabled">City Skyrift</a>
    if (thehtml.indexOf("<a href=\"/city\"") >= 0) {
      thehtml = thehtml.replace(/.*<a href="\/city"[^>]+>City ([^<]+)<\/a>.*/,'$1');
      return thehtml;
    } 
  }
  return "unknown";
}

//---------------------------------------------------------------
// <div class="label lhp">Discovery</div> <div class="value">46.2%</div>
function getDiscovery() {
  var thediv = document.getElementsByClassName("z2 PT_city_file");
  if (thediv.length < 1) return;
  var thehtml = thediv[0].innerHTML.replace(/\n/g, '');
  amount = thehtml.replace(/.*Discovery<\/div>[^<]*<div[^>]*>([^<]+)<.*/,'$1');
  return amount;
}

//---------------------------------------------------------------
// a site has:
// name, type (event,shop,place,eventshoplvlreq), stars
//PLACE:    <div class="site">  <div class="score"> <div class="misc_star star_gold"></div><div class="misc_star star_gold"></div>  </div>  <div class="name highlight BV_system_highlight"> <em class="lhp">Tree of Transcendence</em> </div>  </div>
//EVENT:    <div class="site"> <div class="score"> <div class="misc_star star_gold"></div><div class="misc_star star_gold"></div> </div> <div class="name highlight BV_system_highlight"> <div class="functions"> <a href="/dungeon/site/index/id/11004" class="nolink c2">[Event]</a> </div> <em class="lhp">Black River</em> </div> </div>
//ESLVLREQ: <div class="site"> <div class="score"> <div class="misc_star star_gold"></div><div class="misc_star star_gold"></div><div class="misc_star star_gold"></div><div class="misc_star star_gold"></div> </div> <div class="name highlight BV_system_highlight"> <div class="functions"> <span class="lhp">Requires L.30</span> </div> Throne of Nature </div> </div>
//SHOP
function getSites() {
  var sitedivs = document.getElementsByClassName("site");
  var sites = [];
  for (var i = 0; i < sitedivs.length; i++) {
    // get score
    var scorediv = sitedivs[i].getElementsByClassName("score");
    var score = 0;
    if (scorediv.length == 1) {
      var re = new RegExp("<div[^>]*><\\/div>", "g");
      var thehtml = scorediv[0].innerHTML.replace(/\n/g, '');
      while (re.exec(thehtml)) {
        score++;
      }
    }
    // get name
    var name = "";
    var nameem = sitedivs[i].getElementsByTagName("em");
    if (nameem.length == 1) {
      name = nameem[0].innerHTML;
    }
    else {
      var thehtml = sitedivs[i].innerHTML.replace(/\n/g, '');
      name = thehtml.replace(/.*<\/div>\s*([^<]*)\s*<\/div>\s*$/,'$1');
    }
    // remove leading/trailing whitespace
    name = name.replace(/^\s+/,'');
    name = name.replace(/\s+$/,'');

    // get type
    var thehtml = sitedivs[i].innerHTML.replace(/\n/g, '');
    var type = "";
    if (thehtml.indexOf("[Event]") >= 0) {
      type = "event";
    }
    else if (thehtml.indexOf("[Shop]") >= 0) {
      type = "shop";
    }
    else if (thehtml.indexOf("Requires L.") >= 0) {
      type = thehtml.replace(/.*Requires L.(\d+).*/,'$1');
    }
    else {
      type = "place";
    }
    asite = quotekeyval("name " + i, name);
    asite = asite + quotekeyval("score " + i, score);
    asite = asite + quotekeyval("type " + i,type);
    sites.push(asite);
  }
  return sites;
}

//---------------------------------------------------------------
//  name of journal variable
//---------------------------------------------------------------
function getJournalVariableName() {
  return "estiah_explorers_journal_" + getUsername();
}

//---------------------------------------------------------------
function cacheDiscoveredSites() {
  var name = getJournalVariableName();
  var thejournal = GM_getValue(name, "");

  city = getCity();
  amount = getDiscovery();
  sites = getSites();

  var token = quotekeyval("city", city);
  token = token + quotekeyval("amount", amount);
  token = token + quotekeyval("numsites", sites.length);
  for (var i = 0; i < sites.length; i++) {
    token = token + sites[i];
  }

  // add this city to the journal (or update the existing copy of this city)
  var re = new RegExp("(.*){[^}]*\"city\"\"" + city + "\"[^}]*}(.*)");
  var bits = re.exec(thejournal);
  var newjournal = "";
  if (bits) {
    if (bits[1]) newjournal = newjournal + bits[1];
    if (bits[2]) newjournal = newjournal + bits[2];
    newjournal = appendToken(newjournal, token);
  }
  else {
    newjournal = appendToken(thejournal, token);
  }
  GM_setValue(name, newjournal);
}

//---------------------------------------------------------------
function token2map(token) {
  var map = new Object();
  token = token.replace(/^\"/,'');
  token = token.replace(/\"$/,'');
  var bits = token.split("\"\"");

  // extract key value pairs and put them in a map
  for (var i = 0; i < bits.length; i+=2) {
    map[bits[i]] = bits[i+1];
  }
  
  return map;
}

//---------------------------------------------------------------
function type2color(type) {
  if (type == "event") return "#00FF00";
  if (type == "shop") return "#FFFF00";
  if (type == "place") return "#FFFFFF";
  return "#808080";
}

//---------------------------------------------------------------
function type2str(type) {
  if (type == "event") return "Event";
  if (type == "shop") return "Shop";
  if (type == "place") return "Place";
  return "Req L." + type;
}

//---------------------------------------------------------------
function getBorderColor(type) {
  if (type == "inside") return "#696969";
  return "#aa7711";
}

//---------------------------------------------------------------
function setCellBorder(cell, type) {
  if (type == "top") {
    cell.style.borderTop = "1px solid " + getBorderColor("outside");
    cell.style.borderLeft = "0px none";
    cell.style.borderRight = "1px solid "  + getBorderColor("inside");
    cell.style.borderBottom = "1px solid "  + getBorderColor("inside");
  }
  else if (type == "bottom") {
    cell.style.borderTop = "0px none";
    cell.style.borderLeft = "0px none";
    cell.style.borderRight = "1px solid " + getBorderColor("inside");
    cell.style.borderBottom = "2px solid " + getBorderColor("outside");
  }
  else if (type == "middle") {
    cell.style.borderTop = "0px none";
    cell.style.borderLeft = "0px none";
    cell.style.borderRight = "1px solid " + getBorderColor("inside");
    cell.style.borderBottom = "1px solid " + getBorderColor("inside");
  }
  else if (type == "both") {
    // top and bottom 
    cell.style.borderTop = "1px solid " + getBorderColor("outside");
    cell.style.borderLeft = "0px none";
    cell.style.borderRight = "1px solid " + getBorderColor("inside");
    cell.style.borderBottom = "2px solid " + getBorderColor("outside");
  }
  else if (type == "none") {
    cell.style.borderTop = "0px none";
    cell.style.borderLeft = "0px none";
    cell.style.borderRight = "0px none";
    cell.style.borderBottom = "0px none";
  }
  else {
    alert('bad border type');
  }
  return cell;
}

//---------------------------------------------------------------
// type = top, bottom, both
function addCell(row, align, type) {
  var cell = row.insertCell(-1);
  cell.align = align;
  cell.style.padding = "5px 5px 5px 5px";
  cell = setCellBorder(cell, type);  
  return cell;
}

//---------------------------------------------------------------
function addRightCell(row, align, type) {
  var cell = addCell(row, align, type);
  cell.style.borderRight = "1px solid " + getBorderColor("outside");
  return cell
}
//---------------------------------------------------------------
function addLeftCell(row, align, type) {
  var cell = addCell(row, align, type);
  cell.style.borderLeft = "1px solid " + getBorderColor("outside");
  return cell;
}

//---------------------------------------------------------------
function addLeftRightCell(row, align, type) {
  var cell = addCell(row, align, type);
  cell.style.borderLeft = "1px solid " + getBorderColor("outside");
  cell.style.borderRight = "1px solid " + getBorderColor("outside");
  return cell;
}

//---------------------------------------------------------------
function addCity(map, tab, rowIndex) {

  // city header
  tab.insertRow(rowIndex);
  var cell = addLeftCell(tab.rows[rowIndex], "left", "both");

  var chara = document.createElement("a");
  chara.style.textDecoration = "none";
  chara.innerHTML = "<span align=\"left\" style=\"color: #f6ba68;font-weight: bold;\">" + map["city"] + "</span>";
  cell.appendChild(chara);
  var linkstr = map["city"].replace(/\s/,'_');
  chara.addEventListener("click",jump(linkstr),true);
  cell.style.borderRight = "0px solid";
  cell.colSpan = 2;

  var cell = addRightCell(tab.rows[rowIndex], "right", "both");
  cell.innerHTML = "<span align=\"right\" style=\"font-weight: bold;\">" + map["amount"] + "</span>";
  cell.style.borderLeft = "0px solid";
  rowIndex++;

  var siteIdxRemap = [];
  for (var i = 0; i < parseInt(map["numsites"]); i++) {
    siteIdxRemap.push(i + " " + map["score " + i] + " '" + map["name " + i] + "'");
  }
  siteIdxRemap.sort(sortSiteTokens);

  for (var i = 0; i < parseInt(map["numsites"]); i++) {
    idx = parseInt(siteIdxRemap[i].replace(/(^\d+) \d+/,'$1'));

    tab.insertRow(rowIndex);
    var cell = addLeftCell(tab.rows[rowIndex], "left", "bottom");
    var scorediv = document.createElement("div");
    scorediv.className = "score";
    for (var j = 0; j < parseInt(map["score " + idx]); j++) {
      var stardiv = document.createElement("div");
      stardiv.className = "misc_star star_gold";
      scorediv.appendChild(stardiv);
    }
    cell.appendChild(scorediv);

    var cell = addCell(tab.rows[rowIndex], "left", "bottom");
    var chara = document.createElement("a");
    chara.style.textDecoration = "none";
    chara.innerHTML = map["name " + idx];
    cell.appendChild(chara);
    var linkstr = map["name " + idx].replace(/\s/,'_');
    chara.addEventListener("click",jump(linkstr),true);

    var cell = addRightCell(tab.rows[rowIndex], "left", "bottom");
    cell.innerHTML = type2str(map["type " + idx]);
    cell.style.color = type2color(map["type " + idx]);
    rowIndex++;
  }

  tab.insertRow(rowIndex);
  var cell = addCell(tab.rows[rowIndex], "left", "none");
  rowIndex++;
  tab.insertRow(rowIndex);
  var cell = addCell(tab.rows[rowIndex], "left", "none");
  rowIndex++;
  return rowIndex;
}

//---------------------------------------------------------------
function sortSiteTokens(a, b) {
  score1 = a.replace(/\d+ (\d+).*/,'$1');
  score2 = b.replace(/\d+ (\d+).*/,'$1');
  if (score1 > score2) return 1;
  if (score1 < score2) return -1;
  name1 = a.replace(/\d+ \d+ '(.+)'/,'$1');
  name2 = b.replace(/\d+ \d+ '(.+)'/,'$1');
  if (name1 > name2) return 1;
  if (name1 < name2) return -1;
  return 0;
}

//---------------------------------------------------------------
function sortCityTokens(a, b) {
  city1 = a.replace(/.*\"city\"\"([^\"]*)\".*/,'$1');
  city2 = b.replace(/.*\"city\"\"([^\"]*)\".*/,'$1');
  if (city1 > city2) return 1;
  if (city1 < city2) return -1;
  return 0;
}

//---------------------------------------------------------------
function displayDiscoveredSites() {
  name = getJournalVariableName();
  var thejournal = GM_getValue(name, "");

  var discoveredDiv = document.createElement("div");
  discoveredDiv.style.border = "1px solid #aa7711";
  discoveredDiv.style.margin = "15px 0px 0px 0px";
  discoveredDiv.style.padding = "10px 60px 0px 20px";
  discoveredDiv.id = "explorers_journal_mod";

  // title div
  var thediv = document.createElement("div");
  thediv.style.fontSize = "larger";
  thediv.style.margin = "2px 0px 7px 0px";
  thediv.style.width = "100%";
  thediv.className = "deck highlight";
  thediv.innerHTML = "<p align=\"left\" style=\"color: #f6ba68;font-weight: bold;margin-left: 10px;margin-bottom: 7px\">Explorer's Journal</p>";
  discoveredDiv.appendChild(thediv);

  var themap = document.getElementsByClassName("map format");
  if (themap.length < 1) return;
  insertAfter(discoveredDiv, themap[0]);

  var tab = document.createElement("table");
  tab.id = "discovery_table";
  tab.style.margin = "8px 10px 8px 20px";
  tab.style.width = "100%";
  tab.cellSpacing = 0;
  tab.cellPadding = 0;
  discoveredDiv.appendChild(tab);

  // extract tokens and sort them
  var cityTokens = [];
  while (thejournal.length > 0) {
    token = firstToken(thejournal);
    cityTokens.push(token);
    thejournal = popFirstToken(thejournal);
  }
  cityTokens.sort(sortCityTokens);

  // display city data
  var rowIndex = 0;
  for (var i = 0; i < cityTokens.length; i++) {
    token = cityTokens[i];
    var map = token2map(token);
    rowIndex = addCity(map, tab, rowIndex);
  }
}

//---------------------------------------------------------------
// Add interface for the log
//---------------------------------------------------------------
function estiahExplorersJournalSetup() {
  if (document.location.href.indexOf("estiah.com/city") >= 0) {
    cacheDiscoveredSites();
  }
  if (document.location.href.indexOf("estiah.com/character/map") >= 0) {
    displayDiscoveredSites();
  }
}

//---------------------------------------------------------------
// Execute script
//---------------------------------------------------------------
window.addEventListener('load',estiahExplorersJournalSetup,false);

