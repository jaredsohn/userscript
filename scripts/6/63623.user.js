// ==UserScript==
// @name DS MapAllyList
// @description Version 1.0.3 Zeigt StÃ¤mme- und Spielerlisten auf der Karte
// @author Hypix
// @namespace http://hypix.de/
// @include http://de*.die-staemme.de/game.php*screen=map*
// ==/UserScript==

// Versionhistory:
// 1.0.3 Zeigt in der Spieler-Ansicht den Stammestag (falls vorhanden) mit an
// 1.0.2 Aktuelle Ansicht wird gespeichert, Sortierung ignoriert Sonderzeichen und GroÃŸ-/Kleinschreibung
// 1.0.1 Punkte des Stammes/Spielers im Sichtbereich und Gesamt eingefÃ¼gt
// 1.0.0 VerÃ¶ffentlichung 
(function(){

var showTag = true;

var mapId = ["mapOld", "mapNew"];
var curMap = 0;
var iconSize = { width: 53, height: 38 };
var mapSize = { width: 0, height: 0, count: 0 };
var mode;
var nameIdx = [8,6];
var groups = {};
var server = location.host.split(".")[0];
restoreMode();

var toFlash;
var flashTimer;
var odd = false;

prepareMap();

function prepareMap()
{
  var mapRows = document.getElementById(mapId[curMap]).getElementsByTagName("tr").length;
  mapSize.count = mapRows;
  mapSize.width = iconSize.width * mapRows;
  mapSize.height = iconSize.height * mapRows;

  var container = document.getElementsByClassName("map_container")[0];
	var tds = container.getElementsByTagName("td");
	
  tds[1].addEventListener("click",function() {followTimer=window.setInterval(followMap,250);}, true);
	tds[3].addEventListener("click",function() {followTimer=window.setInterval(followMap,250);}, true);
	tds[tds.length-4].addEventListener("click",function() {followTimer=window.setInterval(followMap,250);}, true);
	tds[tds.length-2].addEventListener("click",function() {followTimer=window.setInterval(followMap,250);}, true);
  
  container = document.getElementsByClassName("map_container")[1];
  if( container )
  {
    container = container.parentNode.parentNode;
    var tabHead = container.appendChild(document.createElement("table"));
    tabHead.className="vis";
    var row = tabHead.insertRow(0);
    var cell = row.insertCell(0);
    var a = cell.appendChild(document.createElement("a"));
    a.href = "javascript:;";
    a.innerHTML = "StÃ¤mme";
    a.addEventListener("click", function(e) { showGroup(e.target); }, false );
    cell = row.insertCell(1);
    a = cell.appendChild(document.createElement("a"));
    a.href = "javascript:;";
    a.innerHTML = "Spieler";
    a.addEventListener("click", function(e) { showGroup(e.target); }, false );
    
    var div = container.appendChild(document.createElement("div"));
    div.style.margin = "0 auto";
    div.style.width = "300px";
    div.style.height = "300px";
    div.style.overflow = "auto";
    var tab = div.appendChild(document.createElement("table"));
    tab.className="vis";
    tab.width="100%";
    tab.id = "dsal_list";
    row = tab.insertRow(0);
    cell = row.appendChild(document.createElement("th"));
    cell.innerHTML = "Name";
    cell = row.appendChild(document.createElement("th"));
    cell.innerHTML = "DÃ¶rfer";
    cell.style.textAlign = "right";
    cell = row.appendChild(document.createElement("th"));
    cell.innerHTML = "Punkte";
    cell.style.textAlign = "right";
    showGroup(tabHead.rows[0].cells[mode].firstChild);
  }
}

function showGroup(a)
{
  var row = a.parentNode.parentNode;
  for( var i = 0; i < row.cells.length; i++ )
  {
    if( row.cells[i] == a.parentNode )
    {
      mode = i;
      saveMode();
      row.cells[i].className = "selected";
    }
    else
      row.cells[i].className = "";
  }
  parseMap();
}

function parseMap()
{
	var container = document.getElementById(mapId[curMap]);
  if( container )
  {
    var tds = container.getElementsByTagName('td');
    var idx = 0;
    var names = [];
    groups = {};
    var list = document.getElementById("dsal_list");
    while( list.rows.length > 1 )
      list.deleteRow(1);
    for( var i = 0; i < tds.length; i++ )
    {
      var a = tds[i].getElementsByTagName('a');
      if( a.length == 1 )
      {
        a = a[0];
        var parts = a.getAttribute("onmouseover").match( /map_popup\('([^']*)', '([^']*)', '([^'])*', (\d+), ('([^']*)'|null), ('([^']*)'|null), ('([^']*)'|false), (\d+|false), (\d+|false), (\d+|false), ('([^']*)'|false), ('([^']*)'|false), ('([^']*)'|false), ('([^']*)'|false)\)/);
        if( parts && parts[nameIdx[mode]] )
        {
          var name = parts[nameIdx[mode]];
          var pos = name.lastIndexOf("(");
          var points = parseInt(name.substring(pos+1).replace(/\./g,""));
          name = name.substring(0,pos);
          var sortname = name.replace(/[^\w]/g, "").replace(/_/,"").toUpperCase();
          if(showTag && mode == 1 && parts[nameIdx[0]])
          {
            var tag = parts[nameIdx[0]];
            pos = tag.lastIndexOf("(");
            name += " - " + tag.substring(0,pos);
          }
          if( !groups[name] )
          {
            names[names.length] = { "name":name, "sortname":sortname };
            groups[name] = {count:1, cells:[i], points: [parseInt(parts[4]),points] };
          }
          else
          {
            groups[name]["count"]++;
            groups[name]["cells"][groups[name]["cells"].length] = i;
            groups[name]["points"][0] += parseInt(parts[4]);
          }
        }
      }
    }
    names.sort(compareNames);
    for( i = 0; i < names.length; i++ )
    {
      var row = list.insertRow(i+1);
      var cell = row.insertCell(0);
      var a = cell.appendChild(document.createElement("a"));
      a.innerHTML = names[i]["name"];
      a.href = "javascript:;";
      a.addEventListener("click", function(e){ if(toFlash && toFlash[0] == e.target.parentNode) stopFlash(); else startFlash(e); }, false );
      cell = row.insertCell(1);
      cell.style.textAlign = "right";
      cell.innerHTML = groups[names[i]["name"]]["count"];
      cell = row.insertCell(2);
      cell.style.textAlign = "right";
      cell.innerHTML = formatNrShort(groups[names[i]["name"]]["points"][0])+"/"+formatNrShort(groups[names[i]["name"]]["points"][1]);
      cell.title = formatNumber(groups[names[i]["name"]]["points"][0]).replace(/\<span class="grey">\.<\/span>/g,".")+"/"+formatNumber(groups[names[i]["name"]]["points"][1]).replace(/\<span class="grey">\.<\/span>/g,".");
    }
  }
}

function compareNames(a,b)
{
  if( a["sortname"] > b["sortname"] ) 
    return 1;
  else if( a["sortname"] < b["sortname"] ) 
    return -1;
  return 0;
}

function formatNumber(nr)
{
  if( nr == 0 )
    return "0";
  var ret = ""
  do
  {
    var tmp = "00" + nr%1000;
    ret = tmp.substr(tmp.length-3,3) + '<span class="grey">.</span>' + ret;
    nr = Math.floor(nr/1000);
  } while( nr > 0 );
  ret = ret.replace(/^0*/g,"").replace(/\<span class="grey">\.<\/span>$/g,"");
  return ret;
}

function formatNrShort(nr)
{
  if( nr == 0 )
    return "0";
  var ret = "";
  if( nr > 1000000 )
  {
    var nr = Math.round(nr/10000);
    ret = formatNumber(Math.floor(nr/100));
    nr = nr % 100;
    ret += "," + (nr < 10 ? "0" : "") + nr + " Mio.";
  }
  else if( nr > 1000 )
  {
    nr = Math.round( nr / 100 );
    ret = Math.floor( nr / 10 )+","+(nr % 10)+"k";
  }
  else 
    ret = nr;
  return ret;
}

function startFlash(e)
{
  stopFlash();
  e.target.parentNode.className = "selected";
  var container = document.getElementById(mapId[curMap]);
  if( container )
  {
    var tds = container.getElementsByTagName('td');
    toFlash = [e.target.parentNode];
    for( var i = 0; i < groups[e.target.innerHTML]["cells"].length; i++ )
      toFlash[toFlash.length] = tds[groups[e.target.innerHTML]["cells"][i]];
    flashTimer = setInterval(flash, 250);
  }
}

function flash()
{
  if( toFlash )
  {
    for( var i = 1; i < toFlash.length; i++ )
      toFlash[i].style.backgroundColor = invert(toFlash[i].style.backgroundColor);
    odd = !odd;
  }
}

function invert(color)
{
  var res = color.match(/rgb\((\d+), (\d+), (\d+)\)/);
  var ret = "rgb(0,0,0)";
  if( res )
  {
    for( var i = 1; i < 4; i++ )
      res[i] = Math.abs(255 - parseInt(res[i]));
    ret = "rgb("+res[1]+","+res[2]+","+res[3]+")";
  }
  return ret;
}

function stopFlash()
{
  clearInterval(flashTimer);
  if( toFlash )
  {
    toFlash[0].className="";
    if( odd )
    {
      for( var i = 1; i < toFlash.length; i++ )
        toFlash[i].style.backgroundColor = invert(toFlash[i].style.backgroundColor);
      odd = false;
    }
  }
  toFlash = null;
}

function followMap()
{
  stopFlash();
  var map = document.getElementById(mapId[curMap]);
  if( map )
  {
    var left = Math.abs(parseInt(map.style.left));
    var top = Math.abs(parseInt(map.style.top));
    if( left == mapSize.width || top == mapSize.height )
    {
      curMap ^= 1;
      clearInterval(followTimer);
      parseMap();
    }
  }
}

function saveMode()
{
  if( typeof(GM_setValue) == "function" )
    GM_setValue(server+"_mode", mode);
  else
    document.cookie = "dsal_"+server+"_mode="+mode+"; expires= "+new Date(new Date().getTime() + 365*86400000).toGMTString();
}

function restoreMode()
{
  if( typeof(GM_getValue) == "function" )
  {
    mode = GM_getValue( server+"_mode", 0 );
  }
  else
  {
    var re = new RegExp( "dsal_"+server+"_mode=([0|1]);" );
    var res = document.cookie.match(re);
    if( res )
      mode = parseInt(res[1]);
    else
      mode = 0;
  }
}
  
})();
