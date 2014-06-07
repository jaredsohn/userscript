// ==UserScript==
// @name           Pardus Quick Commands
// @namespace      pardus.at
// @author         Jarius (Orion), Janarius (Artemis)
// @version        1.0
// @description    Links for frequently used commands are added to the Nav screen for single-click access.
// @include        http://*.pardus.at/main.php
// ==/UserScript==

for (var i = 0; i < 10; i++)
{
  var a = document.links[i];
  if(a.getAttribute('href').search(/planet.php/i) != -1)
  {
    var child = document.createElement("div");
    child.setAttribute("style", "position:relative; top:6px");
    child.innerHTML = "<a href='ship_equipment.php'>Ship Equipment</a><br><a href='planet_trade.php'>Trade with planet</a><br><a href='bulletin_board.php'>Bulletin Board</a><br><a href='hack.php'>Hack faction database</a><br>";
    a.parentNode.insertBefore(child,a.nextSibling);
  }
  if(a.getAttribute('href').search(/starbase.php/i) != -1)
  {
    var child = document.createElement("div");
    child.setAttribute("style", "position:relative; top:6px");
    child.innerHTML = "<a href='ship_equipment.php'>Ship Equipment</a><br><a href='starbase_trade.php'>Trade with starbase</a><br><a href='hack.php'>Hack faction database</a><br><a href='bulletin_board.php'>Bulletin Board</a><br>";
    a.parentNode.insertBefore(child,a.nextSibling);
  }
  if(a.getAttribute('href').search(/building.php/i) != -1 && a.getAttribute('href').search(/newbuilding.php/i) == -1)
  {
    var child = document.createElement("div");
    child.setAttribute("style", "position:relative; top:6px");
    child.innerHTML = "<a href='building_trade.php'>Trade with building</a><br>";
    a.parentNode.insertBefore(child,a.nextSibling);
  }
  if(a.getAttribute('href').search(/building_management.php/i) != -1)
  {
    var child = document.createElement("div");
    child.setAttribute("style", "position:relative; top:6px");
    child.innerHTML = "<a href='building_trade_settings.php'>Building trade settings</a><br>";
    a.parentNode.insertBefore(child,a.nextSibling);
  }
  if(a.getAttribute('href').search(/main.php[?]ccp=1/i) != -1)
  {
    var child = document.createElement("div");
    child.setAttribute("style", "position:relative; top:6px");
    child.innerHTML = "<a href='overview_stats.php'>Stats</a>&nbsp;&nbsp;<a href='overview_jobs.php'>Jobs</a>&nbsp;&nbsp;<a href='overview_buildings.php'>Buildings</a><br><a href='profile.php?action=edit&userid=70619' target='_tab'>Edit Your Profile</a><br>";
    a.parentNode.insertBefore(child,a.nextSibling);
  }
  if(a.getAttribute('href').search(/main.php[?]ccc=1/i) != -1)
  {
    var child = document.createElement("tr");
    child.innerHTML = "<td><a href='overview_ship.php'>Ship Overview</a><br><br></td>";
    a.parentNode.parentNode.parentNode.insertBefore(child,a.parentNode.parentNode.parentNode.firstChild);
    i++;
  }
}

