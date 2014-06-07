// ==UserScript==
// @name           Pardus Intelligent Max
// @namespace      pardus.at
// @author         Arnoha (Orion)
// @version        1.6
// @description    More intelligent max on trade.
// @include        http://*.pardus.at/*_trade.php
//
// == Notes ==
// 1.6 2008/01/15 Restructured code to place script into the actual page,
//                in preparation for more dynamic maxes. Also fixed bugs
//                related to player starbases.
// 1.5 2007/12/13 Fixed yet another paren bug.
// 1.4 2007/12/13 Fixed paren bug. Fixed handling of Bal.
//                Added processing of Min.
// 1.3 2007/12/13 Fixed problem with negative values
// 1.2 2007/12/13 Added comma processing to amounts
// 1.1 2007/12/12 Fixed processing of commas. Fixed typo in code.
//                Added starbases and planets.
// 1.0 2007/12/12 Initial release. Included only buildings
// ==/UserScript==

function a() {return a.caller.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2')}
document.body.appendChild(document.createElement('script')).innerHTML=a();
return;

var ship = new Object();
var building = new Object();

function parsePrice(text)
{
  return parseInt(text.replace(/,/g, ""));
}

function parseSpace(text)
{
  return parseInt(text.replace(/[t,]/g, ""));
}

function processShip()
{
  ship.resources = new Array();
  var rows = ship.table.rows;
  for (var i = 1; i < rows.length - 2; ++i)
  {
    var cells = rows[i].cells;
    if (cells.length < 4)
      continue;
      
    var key = cells[1].textContent;
    var resource = new Object();
    resource.name = key;
    resource.row = rows[i];
    resource.amount = parseSpace(cells[2].textContent);
    resource.price = parsePrice(cells[3].textContent);
    resource.transfer = resource.amount;
    ship.resources[key] = resource;
    ship.credits = parsePrice(rows[rows.length - 1].cells[1].textContent);
    ship.freeSpace = parseSpace(rows[rows.length - 2].cells[1].textContent);
    ship.processed = true;
  }
}

function processBuilding()
{
  building.resources = new Array();
  var rows = building.table.rows;
  for (var i = 1; i < rows.length - 2; ++i)  
  {
    var cells = rows[i].cells;
    if (cells.length < 4)
      continue;
    var sb = cells.length == 8;
      
    var key = cells[1].textContent;
    var resource = new Object();
    resource.name = key;
    resource.row = rows[i]
    resource.amount = parseSpace(cells[2].textContent);
    var min = cells[sb ? 4 : 3].textContent;
    resource.min = parseSpace(min);
    // Check for balances instead of mins
    if (!sb && min.search(/[+-]/) != -1)
    {
      resource.min = resource.min >= 0 ? 0 : -resource.min;
    }
    resource.max = parseSpace(cells[sb ? 5 : 4].textContent);
    resource.price = parsePrice(cells[sb ? 6 : 5].lastChild.textContent);
    building.resources[key] = resource;
  }
  building.credits = parsePrice(rows[rows.length - 1].cells[1].textContent);
  if (rows[rows.length - 2].cells.length > 1)
    building.freeSpace = parseSpace(rows[rows.length - 2].cells[1].textContent);
  else
    building.freeSpace = 1000000;
  building.processed = true;
}

// add links to the Building Trade screen
if(location.pathname.search(/_trade.php/i) != -1)
{
  var tables = document.getElementsByTagName("table");
  var first = true;
  for (var i = 0; i < tables.length; ++i)
  {
    // Find the ship and building tables
    var table = tables[i];
    if (table.rows.length >= 5 && table.rows[1].className == "alternating")
    {
      if (first)
      {
        ship.table = table;
        ship.building = false;
        processShip();
        first = false;
      }
      else
      {
        building.table = table;
        building.building = true;
        processBuilding();
        break;
      }
    }
  }
  
  if (ship.processed && building.processed)
  {
    for (var i in ship.resources)
    {
      var resource = ship.resources[i];
      if (resource.row.innerHTML.search(/javascript:usemax/i) != -1)
      {
        resource.transfer = Math.max(0, Math.min(resource.amount, 
          building.resources[i].max - building.resources[i].amount));
        if (resource.transfer * resource.price > building.credits)
          resource.transfer = Math.floor(building.credits / resource.price);
            
        var href = resource.row.cells[2].firstChild.href;
        href = href.substring(0, href.indexOf(","));
        href = href.concat(", ship.resources['", i, "'].transfer);");
        resource.row.cells[2].firstChild.href = href;
      }

      resource = building.resources[i];
      if (resource.row.innerHTML.search(/javascript:usemax/i) != -1)
      {
        resource.transfer = Math.max(0, Math.min(
          Math.min(resource.amount, ship.freeSpace),
          resource.amount - resource.min));
        if (resource.transfer * resource.price > ship.credits)
          resource.transfer = Math.floor(ship.credits / resource.price);
          
        var href = resource.row.cells[2].firstChild.href;
        href = href.substring(0, href.indexOf(","));
        href = href.concat(", building.resources['", i, "'].transfer);");
        resource.row.cells[2].firstChild.href = href;
      }
    }
  }
}