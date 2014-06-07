// ==UserScript==
// @name           Pardus Trader Buddy
// @namespace      pardus.at
// @author         Tsarugi (Artemis)
// @version        1.5
// @description    Auto Fills building trade form
//
// @include        *pardus.at/building_trade.php
//
// ==/UserScript==//
//
// == Notes ==
// Created by Tsarugi (Artemis)
// Special thanks to Janarius for opening my eyes to Greasemonkey
//
// 1.5 Numerous Substantial Improvements:
// Improved Remaining Space calculation to account for manually entered values
// Improved Remaining Space calculation to account for original click fill usage
// Clicking on individual commodity name will auto insert max buy/sell value
// Added form reset button
// Mag Scoop useablility added
// Added Free Space tracking display for building, ship, and Mag scoop
//
// 1.2 Added funtionality to prohibit:
// selling produced commodities to building and
// buying supply commodities from building
//
// 1.0 Created on 12/16/2007
// A traders best friend
// Gives three buttons on building trade screen:
// 'Sell All' - Auto fills 'Price (sell) column based on amount in ship, building min/max and avaliable space 
// 'Buy All' - Auto fills 'Price (buy) column based on min, produced commodities, and available space in ship
// 'Easy Button' - does both
//
// Does not work on one's own building
//
// == End Notes ==

// ------------- Variable Declarations -------------
var foundTable;
var shipSpace = 0;
var magScoopSpace = 0;
var buildingSpace = 0;
var shipSpaceLocation;
var buildingSpaceLocation;
var hasMagScoop = false;

// create pseudo commodity object
var commodity = new Array();
var shipStock = new Array();
var buildingStock = new Array();
var min = new Array();
var max = new Array();
var buy = new Array();
var sell = new Array();
var buyPrice = new Array();
var sellPrice = new Array();

// Load commodities and associated numbers
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
commodity[28] = 'Neural Tissue';
commodity[29] = 'Stim Chip';
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
for (i = 0; i < 30; i++) {commodityNumber[i] = new Array(3); }

buildingName[0] = 'Fuel Collector'; commodityNumber[0][0] = 16;
buildingName[1] = 'Gas Collector'; commodityNumber[1][0] = 12;
buildingName[2] = 'Space Farm'; commodityNumber[2][0] = 1; commodityNumber[2][1] = 3; commodityNumber[2][2] = 21;
buildingName[3] = 'Energy Well'; commodityNumber[3][0] = 2;
buildingName[4] = 'Chemical Laboratory'; commodityNumber[4][0] = 13;
buildingName[5] = 'Asteroid Mine'; commodityNumber[5][0] = 5; commodityNumber[5][1] = 14;
buildingName[6] = 'Radiation Collector'; commodityNumber[6][0] = 19;
buildingName[7] = 'Medical Laboratory'; commodityNumber[7][0] = 11;
buildingName[8] = 'Brewery'; commodityNumber[8][0] = 15;
buildingName[9] = 'Plastics Facility'; commodityNumber[9][0] = 9;
buildingName[10] = 'Optics Research Center'; commodityNumber[10][0] = 18;
buildingName[11] = 'Slave Camp'; commodityNumber[11][0] = 50;
buildingName[12] = 'Electronics Facility'; commodityNumber[12][0] = 7;
buildingName[13] = 'Recyclotron'; commodityNumber[13][0] = 1; commodityNumber[13][1] = 3;
buildingName[14] = 'Clod Generator'; commodityNumber[14][0] = 23;
buildingName[15] = 'Nebula Plant'; commodityNumber[15][0] = 2; commodityNumber[15][1] = 12;
buildingName[16] = 'Drug Station'; commodityNumber[16][0] = 2;
buildingName[17] = 'Dark Dome'; commodityNumber[17][0] = 21;
buildingName[18] = 'Handweapons Factory'; commodityNumber[18][0] = 10;
buildingName[19] = 'Battleweapons Factory'; commodityNumber[19][0] = 27;
buildingName[20] = 'Robot Factory'; commodityNumber[20][0] = 8;
buildingName[21] = 'Droid Assembly Complex'; commodityNumber[21][0] = 20;
buildingName[22] = 'Leech Nursery'; commodityNumber[22][0] = 22; commodityNumber[22][1] = 21;
buildingName[23] = 'Smelting Facility'; commodityNumber[23][0] = 6;
buildingName[24] = 'Alliance Command Station'; commodityNumber[24][0] = 0;
buildingName[25] = 'Military Outpost'; commodityNumber[25][0] = 0
buildingName[26] = 'Neural Laboratory'; commodityNumber[26][0] = 28;
buildingName[27] = 'Stim Chip Mill'; commodityNumber[27][0] = 29;
var buildingNum = buildingName.indexOf(document.links[0].innerHTML);

// ----------------- Extract Data and insert additional tags -----------------

// Load each Commodity's values located within "Price (Sell)" table
for(var i = 0; i < document.getElementsByTagName('TH').length; i++)
{
  var findTable = document.getElementsByTagName('TH')[i]
  if (findTable.textContent == 'Price (sell)') { foundTable = findTable.parentNode.parentNode; }
}

// Add listener to table for keyboard entries and original click fillers
foundTable.addEventListener('keyup',updateSpace,true);
foundTable.addEventListener('click',pauseUpdate,true);

// Get info from ship side table and store into "commodity"
for(var i = 0; i < foundTable.getElementsByTagName('TD').length; i++)
{
  var cell = foundTable.getElementsByTagName('TD')[i];
  if (commodity.indexOf(cell.textContent) != -1)
  {
    // Get shipStock and sell price values
    shipStock[commodity.indexOf(cell.textContent)] = scrubData(cell.nextSibling.nextSibling.textContent);
    sellPrice[commodity.indexOf(cell.textContent)] = scrubData(cell.nextSibling.nextSibling.nextSibling.textContent);
    // insert id tag into commodity name cell
    var tagString = "<a id = 'sell" + commodity.indexOf(cell.textContent) + "'>" + cell.textContent + "</a>";
    cell.innerHTML = cell.innerHTML.replace(cell.textContent, tagString);
  }

  // Search for available Space in ship.
  if (cell.innerHTML == 'free&nbsp;space:')
  {
    shipSpaceLocation = cell.nextSibling;
    if (shipSpaceLocation.innerHTML.indexOf('+') != -1)
    {
      hasMagScoop = true;
      shipSpace = scrubData(shipSpaceLocation.innerHTML.substr(0,shipSpaceLocation.innerHTML.indexOf('+') - 1));
      magScoopSpace = scrubData(shipSpaceLocation.innerHTML.substring(shipSpaceLocation.innerHTML.indexOf('+') + 2, shipSpaceLocation.innerHTML.length-1));
    }
    else { shipSpace = scrubData(shipSpaceLocation.innerHTML.substr(0,cell.nextSibling.innerHTML.length - 1)); }
  }
}


// Load each Commodities value located within the "Price (buy)" table
for(var i = 0; i < document.getElementsByTagName('TH').length; i++)
{
  var findTable = document.getElementsByTagName('TH')[i];
  if (findTable.textContent == 'Price (buy)') { foundTable = findTable.parentNode.parentNode; }
}

// Add listener to table for keyboard entries and original click fillers
foundTable.addEventListener('keyup',updateSpace,true);
foundTable.addEventListener('click',pauseUpdate,true);

// Get info from ship side table and store into "commodity"
for(var i = 0; i < foundTable.getElementsByTagName('TD').length; i++)
{
  var cell = foundTable.getElementsByTagName('TD')[i];
  if (commodity.indexOf(cell.textContent) != -1)
  {
    buildingStock[commodity.indexOf(cell.textContent)] = scrubData(cell.nextSibling.nextSibling.textContent);
    min[commodity.indexOf(cell.textContent)] = scrubData(cell.nextSibling.nextSibling.nextSibling.nextSibling.textContent);
    max[commodity.indexOf(cell.textContent)] = scrubData(cell.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.textContent);
    buyPrice[commodity.indexOf(cell.textContent)] = scrubData(cell.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.textContent);
    var tagString = "<a id = 'buy" + commodity.indexOf(cell.textContent) + "'>" + cell.textContent + "</a>";
    cell.innerHTML = cell.innerHTML.replace(cell.textContent, tagString);
  }

  // Search for available Space in building.
  if (cell.innerHTML == 'free&nbsp;space:')
  {
    buildingSpaceLocation = cell.nextSibling;
    buildingSpace = scrubData(cell.nextSibling.innerHTML.substr(0, cell.nextSibling.innerHTML.length-1));
  }
}


// Calculate amount to trade
for (i = 1; i < commodity.length; i++)
{
  if (max[i] != null)
  {
    sell[i] = max[i] - buildingStock[i];
    if (sell[i] > shipStock[i]) { sell[i] = shipStock[i]; }
    buy[i] = buildingStock[i] - min[i];
  }
}


// ---------- Insert the Buttons ---------

// code buttons
var buttons = ''
if (hasMagScoop) { buttons = buttons + '<br><input type="checkbox" id="useMagScoop">Use Magscoop'; }
buttons = buttons + '<br><input type="button" id="tradeAll" value = "Easy Button"><br>';
buttons = buttons + '<br><input type="button" id="sellAll" value = "Sell Items"><br>';
buttons = buttons + '<br><input type="button" id="buyAll" value = "Buy Items"><br>';
buttons = buttons + '<br><input type="button" id="reset" value = "Reset Form"><br>';

// insert buttons
for(var i = 0; i < document.getElementsByTagName('input').length; i++)
{
  var placeButtons = document.getElementsByTagName('input')[i];
  if (placeButtons.value == '<- Transfer ->')
  {
    // insert buttons after transfer button
    placeButtons.parentNode.innerHTML =  placeButtons.parentNode.innerHTML + buttons;
  }
}

document.getElementById('tradeAll').addEventListener('click',serviceBuilding,true);
document.getElementById('sellAll').addEventListener('click',sellItems,true);
document.getElementById('buyAll').addEventListener('click',buyItems,true);
document.getElementById('reset').addEventListener('click',resetForm,true);


// Add listeners for commodity clicking
for (var i = 0; i < commodity.length; i++)
{
  // Add listener to inserted commodity Tags
  if (document.getElementById('buy' + i)) { document.getElementById('buy' + i).addEventListener('click', buySingle, true); }
  if (document.getElementById('sell' + i)) { document.getElementById('sell' + i).addEventListener('click', sellSingle, true); }
}


// ---------------- Space Calculating Routines -------------

// calculate final ship/building space and display on form
function updateSpace()
{
  var newShipSpace = shipSpace + magScoopSpace;
  var newBuildingSpace = buildingSpace;
  var newSpaceString;
  for (var i = 0; i < commodity.length; i++)
  {
    if (document.getElementById('sell_' + i))
    {
      newBuildingSpace = newBuildingSpace - document.getElementById('sell_' + i).value * 1;
      newShipSpace = newShipSpace + document.getElementById('sell_' + i).value * 1;
    }
  }
  for (var i = 0; i < commodity.length; i++)
  {
    if (document.getElementById('buy_' + i))
    {
      newShipSpace = newShipSpace - document.getElementById('buy_' + i).value * 1;
    }
  }


  if (hasMagScoop)
  {
     if (newShipSpace < 0) { newSpaceString = newShipSpace + 't + 0t'; }
     if (newShipSpace < 150) { newSpaceString = '0t + ' + newShipSpace + 't'; }
     if (newShipSpace >= 150) { newSpaceString = (newShipSpace - 150) + 't + 150t'; }
  }
  else newSpaceString = newShipSpace + 't';
  shipSpaceLocation.innerHTML = newSpaceString;
  buildingSpaceLocation.innerHTML = newBuildingSpace + 't';
}

// determine amount of free space available including current tansaction values
function freeShipSpace()
{
  var freeShipSpace = shipSpace;
  if (document.getElementById('useMagScoop'))
  {
    if (document.getElementById('useMagScoop').checked) { freeShipSpace = freeShipSpace + magScoopSpace; }
    if (!document.getElementById('useMagScoop').checked) { freeShipSpace = freeShipSpace - 150 + magScoopSpace; }
  }

  for (var i = 0; i < commodity.length; i++)
  {
    if (document.getElementById('sell_' + i))
    {
      freeShipSpace = freeShipSpace + document.getElementById('sell_' + i).value * 1;
    }

    if (document.getElementById('buy_' + i))
    {
      freeShipSpace = freeShipSpace - document.getElementById('buy_' + i).value;
    }
  }
  return freeShipSpace;
}

//  --------------- Service Building functions --------------



// buy/sell max amount of a single commodity
function buySingle(commodityType)
{
  var commodityNumber = commodityType.target.id.substr(3,commodityType.target.id.length);
  buyCommodity(commodityNumber, buy[commodityNumber]);
}

function sellSingle(commodityType)
{
  var commodityNumber = commodityType.target.id.substr(4,commodityType.target.id.length)
  sellCommodity(commodityNumber, sell[commodityNumber]);
}

// Sell the max amount of commodity based on available space and building settings
function sellCommodity(commodityNumber, amount)
{
  if (document.getElementById('sell_' + commodityNumber))
  {
    document.getElementById('sell_' + commodityNumber).value = '';
    var newBuildingSpace = buildingSpace;
    for (var i = 0; i < commodity.length; i++)
    {
      if (document.getElementById('sell_' + i))
      {
        newBuildingSpace = newBuildingSpace - document.getElementById('sell_' + i).value;
      }
    }
    if (amount > newBuildingSpace) { amount = newBuildingSpace; }
    if (amount > 0) { document.getElementById('sell_' + commodityNumber).value = amount; }
    updateSpace();
  }
}

// Buy the max amount of commodity based on available space and building settings
function buyCommodity(commodityNumber, amount)
{
  if (document.getElementById('buy_' + commodityNumber))
  {
    var freeSpace = freeShipSpace();
    document.getElementById('buy_' + commodityNumber).value = '';
    if (amount > freeSpace) { amount = freeSpace; }
    if (amount > 0) { document.getElementById('buy_' + commodityNumber).value = amount; }
    updateSpace();
  }
}


// fill in the 'sell' side except for commodities that are produced there
function sellItems()
{
  for (i = 1; i < commodity.length; i++)
  {
    if (document.getElementById('sell_' + i) && document.getElementById('sell_' + i).value == '' && commodityNumber[buildingNum].indexOf(i) == -1)
    {
      sellCommodity(i, sell[i]);
    }
  }
}

// fill in the buy side for each produced commodity only
function buyItems()
{
  for (i = 1; i < commodity.length; i++)
  {
    if (document.getElementById('buy_' + i) && document.getElementById('buy_' + i).value == '' && commodityNumber[buildingNum].indexOf(i) != -1)
    {
      buyCommodity(i, buy[i]);
    }
  }
}

// Sell to and buy from building
function serviceBuilding() 
{
  sellItems();
  buyItems();
}

// reset the trade form
function resetForm()
{
  for (var i = 0; i < commodity.length; i++)
  { 
    if (document.getElementById('buy_' + i)) { document.getElementById('buy_' + i).value = ''; }
    if (document.getElementById('sell_' + i)) { document.getElementById('sell_' + i).value = ''; }
  }
  updateSpace();
}

// Short pause, then update space numbers when using original commodity form filler
function pauseUpdate() { var t=setTimeout(updateSpace,100); }

// scrub number data
function scrubData(data)
{
  if (data.search(/,/) != -1) { data = data.replace(/,/,''); }
  if (data.search(/\+/g) != -1) { data = 0; }
  else if (data.search(/-/) != -1) { data = data.replace('-',''); }
  data = data * 1;
  return data;
}