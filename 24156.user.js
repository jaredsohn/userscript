// ==UserScript==
// @name           Pardus Building Buddy
// @namespace      pardus.at
// @author         Jarius (Orion), Janarius (Artemis)
// @version        1.0
// @description    Autofills building management form -- a building owner's best friend
// @include        http://*.pardus.at/building_management.php
//
// ==/UserScript==//

// ==Notes==
// Based on Pardus Trader Buddy by Tsarugi (Artemis)
//
// This works on one's own buildings.  It adds buttons to help stock your own
//   building for a given number of ticks.
//
// You are able to make changes to your own copy of the script once it is
//   installed.  <b>Please store a backup copy of your user options section
//   before you reinstall the script.</b> I encourage you to send code changes
//   and ideas for enhancements to me so I can update the master copy.  This way
//   everyone has access to helpful changes.  It also makes it easier for me to
//   give help if everyone sticks to the master copy.

// ==Version History==
// 1.0 Created on 3/18/2008
// --Added buttons on building trade screen:
//   'Send All' - Auto fills 'Ship' column with upkeep stock up to the max avaliable space in building
//   'Send to 5x' - Auto fills 'Ship' column with upkeep stock up to 5 ticks worth if space is avaliable in building
//   'Send to 10x' - Auto fills 'Ship' column with upkeep stock up to 10 ticks worth if space is avaliable in building
//   'Send to 15x' - Auto fills 'Ship' column with upkeep stock up to 15 ticks worth if space is avaliable in building
//   'Get All' - Auto fills 'Building - Commodities' column with produced commodities up to the max avaliable space in ship
//   'Easy Button' - does send and get buttons marked with a *, by default they are 'Send Items' and 'Get Items'
// --Buttons know not to send produced commodities back to the building and not to get upkeep stock from the building.
// --Buttons are aware of the mag scoop and will use the space if it is turned on.
// --Clicking on individual commodity name will auto insert max send/get value for the available space
// --Free space is tracked and displayed for building, ship, and mag scoop.  It accounts for manually entered values
//   and click-fill usage


// --User Options---------------------------------------
// Easy customization!

// Turn buttons off by setting the enable flags to false.
var enableEasyButton = true;
var enableMaxTicks1 = true;
var enableMaxTicks2 = true;
var enableMaxTicks3 = true;
var enableSendButton = true;
var enableGetButton = true;
var enableResetButton = true;

// Adjust the number of ticks for each button.
var maxTicks1 = 5;
var maxTicks2 = 10;
var maxTicks3 = 15;

// Assign the Easy Button to perform one of the 'Send' actions.
// That button needs to be enabled above, so make sure its flag is set to true.
var easyButtonSendType = 'MaxTicks2'; //choose from Send, MaxTicks1, MaxTicks2, or MaxTicks3

// --end User Options-----------------------------------


// ------------- Variable Declarations -------------
var shipSpace = 0;
var magScoopSpace = 0;
var buildingSpace = 0;
var hasMagScoop = false;
var freeSpaceElement = null;
var shipStock = new Array();
var buildingStock = new Array();
var buildingCommodities = new Array();
var upkeep = new Array();

// Load commodities and associated numbers
var commodity = new Array();
commodity[0] ='Item';
commodity[1] ='Food';
commodity[2] = 'Energy';
commodity[3] = 'Water';
commodity[4] = 'Animal embryos';
commodity[5] = 'Ore';
commodity[6] = 'Metal';
commodity[7] = 'Electronics';
commodity[8] = 'Robots';
commodity[9] = 'Heavy plastics';
commodity[10] = 'Hand weapons';
commodity[11] = 'Medicines';
commodity[12] = 'Nebula gas';
commodity[13] = 'Chemical supplies';
commodity[14] = 'Gem stones';
commodity[15] = 'Liquor';
commodity[16] = 'Hydrogen fuel';
commodity[17] = 'Exotic matter';
commodity[18] = 'Optical components';
commodity[19] = 'Radioactive cells';
commodity[20] = 'Droid modules';
commodity[21] = 'Bio-waste';
commodity[22] = 'Leech baby';
commodity[23] = 'Nutrient clods';
commodity[24] = 'Cybernetic X-993 Parts';
commodity[25] = 'X-993 Repair-Drone';
commodity[26] = 'Neural Stimulator';
commodity[27] = 'Battleweapon Parts';
commodity[50] = 'Slaves';
commodity[51] = 'Drugs';
commodity[100] = 'Package';
commodity[101] = 'Faction package';
commodity[102] = 'Explosives';
commodity[103] = 'VIP';
commodity[104] = 'Christmas Glitter';
commodity[105] = 'Military Explosives';
commodity[201] = 'Human intestines';
commodity[202] = 'Skaari limbs';
commodity[203] = 'Keldon brains';
commodity[204] = 'Rashkir bones';
commodity[150] = 'Exotic Crystal'
commodity[211] = 'Blue Sapphire jewels';
commodity[212] = 'Ruby jewels';
commodity[213] = 'Golden Beryl jewels';

// set building commodities to be bought and not sold at each building
var buildingName = new Array(30);
var commodityNumber = new Array(30);
var upkeepNumber = new Array(30);
for (i = 0; i < 30; i++) { commodityNumber[i] = new Array(3); upkeepNumber[i] = new Array(6); }
buildingName[0] = 'Fuel Collector'; commodityNumber[0][0] = 16; upkeepNumber[0][0] = 2; upkeepNumber[0][1] = 13;
buildingName[1] = 'Gas Collector'; commodityNumber[1][0] = 12; upkeepNumber[1][0] = 1; upkeepNumber[1][1] = 2; upkeepNumber[1][2] = 3;
buildingName[2] = 'Space Farm'; commodityNumber[2][0] = 1; commodityNumber[2][1] = 3; commodityNumber[2][2] = 21; upkeepNumber[2][0] = 2; upkeepNumber[2][1] = 4;
buildingName[3] = 'Energy Well'; commodityNumber[3][0] = 2; upkeepNumber[3][0] = 1; upkeepNumber[3][1] = 3;
buildingName[4] = 'Chemical Laboratory'; commodityNumber[4][0] = 13; upkeepNumber[4][0] = 1; upkeepNumber[4][1] = 2; upkeepNumber[4][2] = 3;
buildingName[5] = 'Asteroid Mine'; commodityNumber[5][0] = 5; commodityNumber[5][1] = 14; upkeepNumber[5][0] = 1; upkeepNumber[5][1] = 2; upkeepNumber[5][2] = 3;
buildingName[6] = 'Radiation Collector'; commodityNumber[6][0] = 19; upkeepNumber[6][0] = 1; upkeepNumber[6][1] = 2; upkeepNumber[6][2] = 3;
buildingName[7] = 'Medical Laboratory'; commodityNumber[7][0] = 11; upkeepNumber[7][0] = 1; upkeepNumber[7][1] = 2; upkeepNumber[7][2] = 3; upkeepNumber[7][3] = 12;
buildingName[8] = 'Brewery'; commodityNumber[8][0] = 15; upkeepNumber[8][0] = 1; upkeepNumber[8][1] = 2; upkeepNumber[8][2] = 3; upkeepNumber[8][3] = 13;
buildingName[9] = 'Plastics Facility'; commodityNumber[9][0] = 9; upkeepNumber[9][0] = 1; upkeepNumber[9][1] = 2; upkeepNumber[9][2] = 3; upkeepNumber[9][3] = 12; upkeepNumber[9][4] = 13;
buildingName[23] = 'Smelting Facility'; commodityNumber[23][0] = 6; upkeepNumber[23][0] = 1; upkeepNumber[23][1] = 2; upkeepNumber[23][2] = 3; upkeepNumber[23][3] = 5;
buildingName[10] = 'Optics Research Center'; commodityNumber[10][0] = 18; upkeepNumber[10][0] = 1; upkeepNumber[10][1] = 2; upkeepNumber[10][2] = 3; upkeepNumber[10][3] = 14;
buildingName[11] = 'Slave Camp'; commodityNumber[11][0] = 50; upkeepNumber[11][0] = 1; upkeepNumber[11][1] = 2; upkeepNumber[11][2] = 3; upkeepNumber[11][3] = 11; upkeepNumber[11][4] = 15;
buildingName[12] = 'Electronics Facility'; commodityNumber[12][0] = 7; upkeepNumber[12][0] = 1; upkeepNumber[12][1] = 2; upkeepNumber[12][2] = 3; upkeepNumber[12][3] = 6; upkeepNumber[12][4] = 9;
buildingName[13] = 'Recyclotron'; commodityNumber[13][0] = 1; commodityNumber[13][1] = 3; upkeepNumber[13][0] = 2; upkeepNumber[13][1] = 13; upkeepNumber[13][2] = 21;
buildingName[14] = 'Clod Generator'; commodityNumber[14][0] = 23; upkeepNumber[14][0] = 2; upkeepNumber[14][1] = 13; upkeepNumber[14][2] = 21;
buildingName[15] = 'Nebula Plant'; commodityNumber[15][0] = 2; commodityNumber[15][1] = 12; upkeepNumber[15][0] = 1; upkeepNumber[15][1] = 3; upkeepNumber[15][2] = 17;
buildingName[16] = 'Drug Station'; commodityNumber[16][0] = 2; upkeepNumber[16][0] = 1; upkeepNumber[16][1] = 2; upkeepNumber[16][2] = 3; upkeepNumber[16][3] = 17; upkeepNumber[16][4] = 50;
buildingName[17] = 'Dark Dome'; commodityNumber[17][0] = 21; upkeepNumber[17][0] = 2; upkeepNumber[17][1] = 50;
buildingName[18] = 'Handweapons Factory'; commodityNumber[18][0] = 10; upkeepNumber[18][0] = 1; upkeepNumber[18][1] = 2; upkeepNumber[18][2] = 3; upkeepNumber[18][3] = 7; upkeepNumber[18][4] = 9; upkeepNumber[18][5] = 18;
buildingName[19] = 'Battleweapons Factory'; commodityNumber[19][0] = 27; upkeepNumber[19][0] = 1; upkeepNumber[19][1] = 2; upkeepNumber[19][2] = 3; upkeepNumber[19][3] = 6; upkeepNumber[19][4] = 9; upkeepNumber[19][5] = 18;
buildingName[20] = 'Robot Factory'; commodityNumber[20][0] = 8; upkeepNumber[20][0] = 1; upkeepNumber[20][1] = 2; upkeepNumber[20][2] = 3; upkeepNumber[20][3] = 6; upkeepNumber[20][4] = 7; upkeepNumber[20][5] = 18;
buildingName[21] = 'Droid Assembly Complex'; commodityNumber[21][0] = 20; upkeepNumber[21][0] = 1; upkeepNumber[21][1] = 2; upkeepNumber[21][2] = 3; upkeepNumber[21][3] = 8; upkeepNumber[21][4] = 19;
buildingName[22] = 'Leech Nursery'; commodityNumber[22][0] = 22; commodityNumber[22][1] = 21; upkeepNumber[22][0] = 1; upkeepNumber[22][1] = 2; upkeepNumber[22][2] = 3; upkeepNumber[22][3] = 19; upkeepNumber[22][4] = 23;
buildingName[25] = 'Military Outpost'; commodityNumber[23][0] = 6; upkeepNumber[25][0] = 2; upkeepNumber[25][1] = 16;
buildingName[24] = 'Alliance Command Station'; commodityNumber[24][0] = 0; upkeepNumber[24][0] = 2; upkeepNumber[24][1] = 19;

// ----------------- Extract Data and insert additional tags -----------------

// Get building info
var img = document.getElementsByTagName('img');
for(var i = 0; i < img.length; i++)
{
  if(img[i].getAttribute('src').indexOf('http://static.pardus.at/images/foregrounds/') != -1)
  {
    var buildingNum = buildingName.indexOf(img[i].nextSibling.nextSibling.innerHTML.replace(/^\s+|\s+$/g, ''));
    break;
  }
}

// Get free space info
var b = document.getElementsByTagName('b');
for(var i = 0; i < b.length; i++)
{
  // Search for available space in ship
  if(b[i].innerHTML.indexOf('Free space on ship') != -1)
  {
    freeSpaceElement = b[i];
    if(b[i].innerHTML.indexOf('+') != -1)
    {
      hasMagScoop = true;
      shipSpace = scrubData(b[i].innerHTML.substring(b[i].innerHTML.indexOf('Free space on ship') + 20, b[i].innerHTML.indexOf(' +')));
      if(b[i].innerHTML.indexOf('t') - b[i].innerHTML.indexOf('+') < 8)
        magScoopSpace = scrubData(b[i].innerHTML.substring(b[i].innerHTML.indexOf(' +') + 3, b[i].innerHTML.indexOf('t')));
      else magScoopSpace = 0;
    }
    else { shipSpace = scrubData(b[i].innerHTML.substring(b[i].innerHTML.indexOf('Free space on ship') + 20, b[i].innerHTML.indexOf('t'))); }
  }
  // Search for available space in building
  if(b[i].innerHTML.indexOf('Free space in building') != -1)
  {
    var str = b[i].innerHTML.substr(b[i].innerHTML.indexOf('Free space in building') + 24);
    str = str.substring(0, str.indexOf('t'));
    buildingSpace = scrubData(str);
  }
}

// Load ship stock values located within "Ship" table
var foundTable = null;
for(var i = 0; i < document.getElementsByTagName('th').length; i++)
{
  if(document.getElementsByTagName('th')[i].textContent == 'Ship' && i+5 < document.getElementsByTagName('th').length)  foundTable = document.getElementsByTagName('th')[i+1].parentNode.parentNode;
}
if(foundTable != null)
{
  // Add listener to table for keyboard entries and original click fillers
  foundTable.addEventListener('keyup',updateSpace,true);
  foundTable.addEventListener('click',pauseUpdate,true);

  for(var i = 0; i < foundTable.getElementsByTagName('TD').length; i++)
  {
    var cell = foundTable.getElementsByTagName('TD')[i];
    if(commodity.indexOf(cell.textContent) != -1 && cell.textContent.replace(/^\s+|\s+$/g, '') != '')
    {
      shipStock[commodity.indexOf(cell.textContent)] = scrubData(cell.nextSibling.textContent);
      // insert id tag into commodity name cell
      var tagString = "<a id = 'send" + commodity.indexOf(cell.textContent) + "'>" + cell.textContent + "</a>";
      cell.innerHTML = cell.innerHTML.replace(cell.textContent, tagString);
    }
  }
}

// Load upkeep stock values located within the "Building - Upkeep Stock" table
var foundTable = null;
for(var i = 0; i < document.getElementsByTagName('th').length; i++)
{
  if(document.getElementsByTagName('th')[i].textContent == 'Building - Upkeep Stock' && i+5 < document.getElementsByTagName('th').length)  foundTable = document.getElementsByTagName('th')[i+2].parentNode.parentNode;
}
if(foundTable != null)
{
  // Add listener to table for keyboard entries and original click fillers
  foundTable.addEventListener('keyup',updateSpace,true);
  foundTable.addEventListener('click',pauseUpdate,true);

  for(var i = 0; i < foundTable.getElementsByTagName('td').length; i++)
  {
    var cell = foundTable.getElementsByTagName('td')[i];
    if(commodity.indexOf(cell.textContent) != -1 && cell.textContent.replace(/^\s+|\s+$/g, '') != '')
    {
      buildingStock[commodity.indexOf(cell.textContent)] = scrubData(cell.nextSibling.textContent);
      // insert id tag into commodity name cell
      var tagString = "<a id = 'getS" + commodity.indexOf(cell.textContent) + "'>" + cell.textContent + "</a>";
      cell.innerHTML = cell.innerHTML.replace(cell.textContent, tagString);
    }
  }
}

// Load commodity values located within the "Building - Commodities" table
var foundTable = null;
for(var i = 0; i < document.getElementsByTagName('th').length; i++)
{
  if(document.getElementsByTagName('th')[i].textContent == 'Building - Commodities' && i+5 < document.getElementsByTagName('th').length)  foundTable = document.getElementsByTagName('th')[i+5].parentNode.parentNode;
}
if(foundTable != null)
{
  // Add listener to table for keyboard entries and original click fillers
  foundTable.addEventListener('keyup',updateSpace,true);
  foundTable.addEventListener('click',pauseUpdate,true);

  for(var i = 0; i < foundTable.getElementsByTagName('td').length; i++)
  {
    var cell = foundTable.getElementsByTagName('td')[i];
    if(commodity.indexOf(cell.textContent) != -1 && cell.textContent.replace(/^\s+|\s+$/g, '') != '')
    {
      buildingCommodities[commodity.indexOf(cell.textContent)] = scrubData(cell.nextSibling.textContent);
      // insert id tag into commodity name cell
      var tagString = "<a id = 'get" + commodity.indexOf(cell.textContent) + "'>" + cell.textContent + "</a>";
      cell.innerHTML = cell.innerHTML.replace(cell.textContent, tagString);
    }
  }
}

// Load commodity values located within the "Upkeep" table
var foundTable = null;
for(var i = 0; i < document.getElementsByTagName('th').length; i++)
{
  if(document.getElementsByTagName('th')[i].textContent == 'Upkeep' && i+5 < document.getElementsByTagName('th').length)  foundTable = document.getElementsByTagName('th')[i].parentNode.parentNode;
}
if(foundTable != null)
{
  for(var i = 0; i < foundTable.getElementsByTagName('td').length; i++)
  {
    var cell = foundTable.getElementsByTagName('td')[i];
    if(commodity.indexOf(cell.firstChild.getAttribute('alt')) != -1 && cell.textContent.replace(': ', '').replace(/^\s+|\s+$/g, '') != '')
    {
      upkeep[commodity.indexOf(cell.firstChild.getAttribute('alt'))] = scrubData(cell.textContent.replace(': ', ''));
    }
  }
}

// ---------- Insert the Buttons ---------

// create buttons
var child = document.createElement("div");
//if (hasMagScoop) { child.innerHTML += '<br><input type="checkbox" id="useMagScoop">Use Magscoop'; }
if(enableEasyButton)  child.innerHTML += '<br><input type="button" id="tradeAll" value = "Easy Button"><br>';
if(enableMaxTicks1)  child.innerHTML += '<br><input type="button" id="sendMaxTicks1" value = "Send to ' + maxTicks1 + 'x' + (easyButtonSendType == 'MaxTicks1' ? '*' : '') + '"><br>';
if(enableMaxTicks2)  child.innerHTML += '<br><input type="button" id="sendMaxTicks2" value = "Send to ' + maxTicks2 + 'x' + (easyButtonSendType == 'MaxTicks2' ? '*' : '') + '"><br>';
if(enableMaxTicks3)  child.innerHTML += '<br><input type="button" id="sendMaxTicks3" value = "Send to ' + maxTicks3 + 'x' + (easyButtonSendType == 'MaxTicks3' ? '*' : '') + '"><br>';
if(enableSendButton)  child.innerHTML += '<br><input type="button" id="sendAll" value = "Send All' + (easyButtonSendType == 'Send' ? '*' : '') + '"><br>';
if(enableGetButton)  child.innerHTML += '<br><input type="button" id="getAll" value = "Get All*"><br>';
if(enableResetButton)  child.innerHTML += '<br><input type="button" id="reset" value = "Reset Form"><br>';

// insert buttons after transfer button
for(var i = 0; i < document.getElementsByTagName('input').length; i++)
{
  var placeButtons = document.getElementsByTagName('input')[i];
  if(placeButtons.value == '<- Transfer ->')  placeButtons.parentNode.appendChild(child);
}

if(enableEasyButton)  document.getElementById('tradeAll').addEventListener('click', serviceBuilding,true);
if(enableSendButton)  document.getElementById('sendAll').addEventListener('click', sendItems,true);
if(enableMaxTicks1)  document.getElementById('sendMaxTicks1').addEventListener('click', sendItemsMaxTicks1,true);
if(enableMaxTicks2)  document.getElementById('sendMaxTicks2').addEventListener('click', sendItemsMaxTicks2,true);
if(enableMaxTicks3)  document.getElementById('sendMaxTicks3').addEventListener('click', sendItemsMaxTicks3,true);
if(enableGetButton)  document.getElementById('getAll').addEventListener('click', getItems,true);
if(enableResetButton)  document.getElementById('reset').addEventListener('click', resetForm,true);

// Add listeners for commodity clicking
for (var i = 0; i < commodity.length; i++)
{
  // Add listener to inserted commodity Tags
  if (document.getElementById('send' + i)) { document.getElementById('send' + i).addEventListener('click', sendSingle, true); }
  if (document.getElementById('getS' + i)) { document.getElementById('getS' + i).addEventListener('click', getSingleStock, true); }
  if (document.getElementById('get' + i)) { document.getElementById('get' + i).addEventListener('click', getSingleCommodity, true); }
}

// ---------------- Space Calculating Routines -------------

updateSpace();

// calculate final ship/building space and display on form
function updateSpace()
{
  var newShipSpace = shipSpace + magScoopSpace;
  var newBuildingSpace = buildingSpace;
  var newSpaceString;

  for(var i = 0; i < commodity.length; i++)
  {
    if(document.getElementById(i + '_ship'))
    {
      newBuildingSpace = newBuildingSpace - document.getElementById(i + '_ship').value * 1;
      newShipSpace = newShipSpace + document.getElementById(i + '_ship').value * 1;
    }
  }
  for(var i = 0; i < commodity.length; i++)
  {
    if(document.getElementById(i + '_stock'))
    {
      newBuildingSpace = newBuildingSpace + document.getElementById(i + '_stock').value * 1;
      newShipSpace = newShipSpace - document.getElementById(i + '_stock').value * 1;
    }
  }
  for(var i = 0; i < commodity.length; i++)
  {
    if(document.getElementById(i + '_comm'))
    {
      newBuildingSpace = newBuildingSpace + document.getElementById(i + '_comm').value * 1;
      newShipSpace = newShipSpace - document.getElementById(i + '_comm').value * 1;
    }
  }

  if(hasMagScoop)
  {
     if(newShipSpace < 0) { newSpaceString = newShipSpace + ' + 0'; }
     if(newShipSpace < 150) { newSpaceString = '0 + ' + newShipSpace; }
     if(newShipSpace >= 150) { newSpaceString = (newShipSpace - 150) + ' + 150'; }
  }
  else newSpaceString = newShipSpace + 't';

  newSpaceString = 'Free space on ship: ' + newSpaceString + 't<br>Free space in building: ' + newBuildingSpace + 't';

  freeSpaceElement.innerHTML = newSpaceString;

}

// determine amount of free ship space available including current transaction values
function freeShipSpace()
{
  var freeSpace = shipSpace;
  /*
  if (document.getElementById('useMagScoop'))
  {
    if (document.getElementById('useMagScoop').checked) { freeSpace += magScoopSpace; }
    if (!document.getElementById('useMagScoop').checked) { freeSpace += magScoopSpace - 150; }
  }
  */
  freeSpace += magScoopSpace;

  for(var i = 0; i < commodity.length; i++)
  {
    if(document.getElementById(i + '_ship'))
    {
      freeSpace += document.getElementById(i + '_ship').value;
    }
    if(document.getElementById(i + '_stock'))
    {
      freeSpace -= document.getElementById(i + '_stock').value;
    }
    if(document.getElementById(i + '_comm'))
    {
      freeSpace -= document.getElementById(i + '_comm').value;
    }
  }

  return parseInt(freeSpace);
}

// determine amount of free building space available including current transaction values
function freeBuildingSpace()
{
  var freeSpace = buildingSpace;

  for(var i = 0; i < commodity.length; i++)
  {
    if(document.getElementById(i + '_ship'))
    {
      freeSpace -= document.getElementById(i + '_ship').value;
    }
    if(document.getElementById(i + '_stock'))
    {
      freeSpace += document.getElementById(i + '_stock').value;
    }
    if(document.getElementById(i + '_comm'))
    {
      freeSpace += document.getElementById(i + '_comm').value;
    }
  }

  return parseInt(freeSpace);
}

//  --------------- Service Building functions --------------


// send/get max amount of a single commodity
function sendSingle(commodityType)
{
  var commodityNumber = commodityType.target.id.replace('send', '');
  if(document.getElementById(commodityNumber + '_ship').value == '')
    sendStock(commodityNumber, shipStock[commodityNumber]);
  else
    sendStock(commodityNumber, 0);
}

function getSingleStock(commodityType)
{
  var commodityNumber = commodityType.target.id.replace('getS', '');
  if(document.getElementById(commodityNumber + '_stock').value == '')
    getStock(commodityNumber, buildingStock[commodityNumber]);
  else
    getStock(commodityNumber, 0);
}

function getSingleCommodity(commodityType)
{
  var commodityNumber = commodityType.target.id.replace('get', '');
  if(document.getElementById(commodityNumber + '_comm').value == '')
    getCommodity(commodityNumber, buildingCommodities[commodityNumber]);
  else
    getCommodity(commodityNumber, 0);
}

// Send the max amount of commodity based on available space and building settings
function sendStock(commodityNumber, amount)
{
  if(document.getElementById(commodityNumber + '_ship'))
  {
    var oldAmount = parseInt(document.getElementById(commodityNumber + '_ship').value == '' ? 0 : document.getElementById(commodityNumber + '_ship').value);
    var freeSpace = freeBuildingSpace();
    if(amount > freeSpace + oldAmount) { amount = freeSpace + oldAmount; }
    if(amount > 0) { document.getElementById(commodityNumber + '_ship').value = amount; } else { document.getElementById(commodityNumber + '_ship').value = ''; }
    updateSpace();
  }
}

// Get the max amount of commodity based on available space and building settings
function getStock(commodityNumber, amount)
{
  if(document.getElementById(commodityNumber + '_stock'))
  {
    var oldAmount = parseInt(document.getElementById(commodityNumber + '_stock').value == '' ? 0 : document.getElementById(commodityNumber + '_stock').value);
    var freeSpace = freeShipSpace();
    if(amount > freeSpace + oldAmount) { amount = freeSpace + oldAmount; }
    if(amount > 0) { document.getElementById(commodityNumber + '_stock').value = amount; } else { document.getElementById(commodityNumber + '_stock').value = ''; }
    updateSpace();
  }
}

// Get the max amount of commodity based on available space and building settings
function getCommodity(commodityNumber, amount)
{
  if(document.getElementById(commodityNumber + '_comm'))
  {
    var oldAmount = parseInt(document.getElementById(commodityNumber + '_comm').value == '' ? 0 : document.getElementById(commodityNumber + '_comm').value);
    var freeSpace = freeShipSpace();
    if(amount > freeSpace + oldAmount) { amount = freeSpace + oldAmount; }
    if(amount > 0) { document.getElementById(commodityNumber + '_comm').value = amount; } else { document.getElementById(commodityNumber + '_comm').value = ''; }
    updateSpace();
  }
}

// fill in the 'send' side with upkeep commodities, values are balanced among the commodities if there is not enough space for all
function sendItems()
{
  var typeCount = 0;
  var useStock = new Array();
  var useStockTotal = 0;
  var upkeepTotal = 0;

  for(i = 0; i < upkeepNumber[buildingNum].length; i++)
  {
    commodityNum = upkeepNumber[buildingNum][i];
    if(document.getElementById(commodityNum + '_ship') && document.getElementById(commodityNum + '_ship').value == '')
    {
      typeCount++;
      useStock[commodityNum] = shipStock[commodityNum];
      useStockTotal += shipStock[commodityNum];
      upkeepTotal += upkeep[commodityNum];
    }
    else
      useStock[commodityNum] = 0;
  }

  // send all ship stock
  if(freeBuildingSpace() > useStockTotal)
  {
    for(i = 0; i < upkeepNumber[buildingNum].length; i++)
    {
      commodityNum = upkeepNumber[buildingNum][i];
      if(document.getElementById(commodityNum + '_ship'))
      {
        useStock[commodityNum] -= useStock[commodityNum];
        sendStock(commodityNum, shipStock[commodityNum] - useStock[commodityNum]);
      }
    }
  }
  // send balanced amount of ship stock to fill the building
  else if(freeBuildingSpace() <= useStockTotal)
  {
    while(freeBuildingSpace() > 0)
    {
      var freeBuildingSpaceOrig = freeBuildingSpace();
      for(i = 0; i < upkeepNumber[buildingNum].length && freeBuildingSpace() > 0; i++)
      {
        commodityNum = upkeepNumber[buildingNum][i];
        if(useStock[commodityNum] > parseInt(freeBuildingSpaceOrig*upkeep[commodityNum]/upkeepTotal))
        {
          if(parseInt(freeBuildingSpaceOrig*upkeep[commodityNum]/upkeepTotal) == 0)
            useStock[commodityNum] -= freeBuildingSpace();
          else
            useStock[commodityNum] -= parseInt(freeBuildingSpaceOrig*upkeep[commodityNum]/upkeepTotal);
          sendStock(commodityNum, shipStock[commodityNum] - useStock[commodityNum]);
        }
        else if(useStock[commodityNum] > 0 && freeBuildingSpace() > 0)
        {
          if(useStock[commodityNum] > freeBuildingSpace())
            useStock[commodityNum] -= freeBuildingSpace();
          else
            useStock[commodityNum] = 0;
          upkeepTotal -= upkeep[commodityNum];
          typeCount--;
          sendStock(commodityNum, shipStock[commodityNum] - useStock[commodityNum]);
        }
      }
    }
  }
/*
  while(freeBuildingSpace() > 0 && parseInt(useStock.toString().replace(/,/g,'')) > 0)
  {
    for(i = 0; i < upkeepNumber[buildingNum].length; i++)
    {
      commodityNum = upkeepNumber[buildingNum][i];
      if(document.getElementById(commodityNum + '_ship'))
      {
        if(freeBuildingSpace() > upkeep[commodityNum] && useStock[commodityNum] > upkeep[commodityNum])
        {
          useStock[commodityNum] -= upkeep[commodityNum];
          sendStock(commodityNum, shipStock[commodityNum] - useStock[commodityNum]);
        }
        else if(freeBuildingSpace() > 0 && useStock[commodityNum] > 0)
        {
          if(freeBuildingSpace() > useStock[commodityNum]) useStock[commodityNum] = 0; else useStock[commodityNum] -= freeBuildingSpace();
          sendStock(commodityNum, shipStock[commodityNum] - useStock[commodityNum]);
        }
      }
    }
  }
  */
}

// fill in the 'send' side with upkeep commodities up to maxTicks1
function sendItemsMaxTicks1()
{
  for(i = 1; i < commodity.length; i++)
  {
    if(document.getElementById(i + '_ship') && document.getElementById(i + '_ship').value == '' && upkeepNumber[buildingNum].indexOf(i) != -1)
    {
      sendStock(i, (upkeep[i]*maxTicks1 - (buildingStock[i] ? buildingStock[i] : 0) > shipStock[i] ? shipStock[i] : upkeep[i]*maxTicks1 - (buildingStock[i] ? buildingStock[i] : 0)));
    }
  }
}

// fill in the 'send' side with upkeep commodities up to maxTicks2
function sendItemsMaxTicks2()
{
  for(i = 1; i < commodity.length; i++)
  {
    if(document.getElementById(i + '_ship') && document.getElementById(i + '_ship').value == '' && upkeepNumber[buildingNum].indexOf(i) != -1)
    {
      sendStock(i, (upkeep[i]*maxTicks2 - (buildingStock[i] ? buildingStock[i] : 0) > shipStock[i] ? shipStock[i] : upkeep[i]*maxTicks2 - (buildingStock[i] ? buildingStock[i] : 0)));
    }
  }
}

// fill in the 'send' side with upkeep commodities up to maxTicks3
function sendItemsMaxTicks3()
{
  for(i = 1; i < commodity.length; i++)
  {
    if(document.getElementById(i + '_ship') && document.getElementById(i + '_ship').value == '' && upkeepNumber[buildingNum].indexOf(i) != -1)
    {
      sendStock(i, (upkeep[i]*maxTicks3 - (buildingStock[i] ? buildingStock[i] : 0) > shipStock[i] ? shipStock[i] : upkeep[i]*maxTicks3 - (buildingStock[i] ? buildingStock[i] : 0)));
    }
  }
}

// fill in the 'get' side with produced commodities, values are balanced among the commodities if there is not enough space for all
function getItems()
{
  var typeCount = 0;
  for(i = 1; i < commodity.length; i++)
  {
    if(document.getElementById(i + '_comm') && document.getElementById(i + '_comm').value == '' && commodityNumber[buildingNum].indexOf(i) != -1)
    {
      typeCount++;
    }
  }
  for(i = 1; i < commodity.length; i++)
  {
    if(document.getElementById(i + '_comm') && document.getElementById(i + '_comm').value == '' && commodityNumber[buildingNum].indexOf(i) != -1)
    {
      getCommodity(i, buildingCommodities[i]);
    }
  }
}

// Send to and get from building
function serviceBuilding() 
{
  if(easyButtonSendType == 'Send')  sendItems();
  if(easyButtonSendType == 'MaxTicks1')  sendItemsMaxTicks1();
  if(easyButtonSendType == 'MaxTicks2')  sendItemsMaxTicks2();
  if(easyButtonSendType == 'MaxTicks3')  sendItemsMaxTicks3();
  getItems();
}

// reset the trade form
function resetForm()
{
  for(var i = 0; i < commodity.length; i++)
  { 
    if(document.getElementById(i + '_ship'))
    {
      document.getElementById(i + '_ship').value = '';
    }
    if(document.getElementById(i + '_stock'))
    {
      document.getElementById(i + '_stock').value = '';
    }
    if(document.getElementById(i + '_comm'))
    {
      document.getElementById(i + '_comm').value = ''; 
    }
  }
  updateSpace();
}

// Short pause, then update space numbers when using original commodity form filler
function pauseUpdate() { var t=setTimeout(updateSpace,100); }

// scrub number data
function scrubData(data)
{
  if(data.search(/,/) != -1) { data = data.replace(/,/,''); }
  if(data.search(/\+/g) != -1) { data = 0; }
  else if(data.search(/-/) != -1) { data = data.replace('-',''); }
  data = data * 1;
  return data;
}
