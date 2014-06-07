// ==UserScript==
// @name DS ReportReader
// @description Version 1.0.0 Automatisches Berichte einlesen
// @author ANONYM
// @namespace http://anonym.de/
// @include http://de*.die-staemme.de/game.php*screen=map*
// @include http://de*.die-staemme.de/game.php*screen=info_village*
// @include http://de*.die-staemme.de/game.php*screen=report*
// @include http://de*.die-staemme.de/game.php*screen=place*
// @include http://de*.die-staemme.de/game.php*screen=settings&mode=settings
// ==/UserScript==

(function()
{

// PA-Only umgehen
var menu = document.getElementById("menu_row");
if( !/screen=memo/.test(menu.innerHTML) )
{
  var cell = menu.insertCell(menu.cells.length);
  cell.innerHTML="screen=memo";
  cell.style.display="none";
}

if( /screen=report&mode=attack&view=\d+/.test(location.href) )
{
  var server = document.location.host.split('.')[0];
  var tables = document.getElementsByClassName("vis");
  var table = tables[1];
  var a = table.getElementsByTagName("a");
  var dst;
  for( var i = a.length-1; i >= 0; i-- )
  {
    if( a[i].innerHTML == "&lt;&lt;" )
    {
      dst = a[i];
      break;
    }
  }
  if( GM_getValue(server+"_all", "0" ) == "0"  && i >= 0)
  {
    table = tables[0];
    a = table.insertRow(table.rows.length).insertCell(0).appendChild(document.createElement("a"));
    a.href = "javascript:;";
    a.innerHTML = "Alle neueren einlesen";
    a.addEventListener("click", function() { GM_setValue(server+"_all", "1"); setTimeout(function() { location.href = dst; }, 500); }, false );
  }
  else
  {
    if( dst )
      setTimeout(function() { location.href = dst; }, 500 + Math.floor(Math.random()*801));
    else
      GM_setValue( server+"_all", "0" );
  }
}


})();
