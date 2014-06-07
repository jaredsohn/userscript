// ==UserScript==
// @name           Pardus Easy Planet Trading
// @namespace      pardus.at
// @author         Tsarugi (Artemis)
// @version        2.0.1
// @description    Auto Fills Starbase and Planet trade form using easy 1 click buttons with no typing. FWE has never been so easy. To add these easy trading buttons to buildings search for Pardus easy building trading. 
//
// @include        *.pardus.at/starbase_trade.php
// @include        *.pardus.at/planet_trade.php
//
// ==/UserScript==
//
// ==Notes==
// Created by Tsarugi (Artemis)
//
// 2.0 Complete Redesign based on Trader Buddy 1.5
// Improved Remaining Space calculation to account for manually entered values
// Improved Remaining Space calculation to account for original click fill usage
// Clicking on individual commodity name will auto insert max buy/sell value
// Added form reset button
// Mag Scoop useablility added
// Added Free Space tracking display for building, ship, and Mag scoop
//

// 1.0 Created on 12/16/2007
// 
// Auto inserts values for regular runs between Starbases, Planets, and Buildings

// 
// At Starbase:
// "Planet Run" - Auto unloads ship and fills ship with energy

// "Unload Ship" - Take a guess
// 
// At Planet:

// "Starbase Run" - Unloads ship and loads 3/5 to 2/5 ratio of food and water (starbase maintenance)
// "Stock Run" - unloads ship and loads 50/50 ratio of food and water
// "Water Run" - unloads ship and fills with water

// "Food Run" - unloads ship and fills with food
//
// note that fuel is never automatically unloaded

//

// ==/End Notes==


var inDBC = false;
var inPlanet = false;

var inStarbase = false;
var shipSpace = 0;
var shipSpaceLocation;

var shipSpaceLocationTop;
var buildingSpace = 500;
var buildingSpaceLocation;

var foundTable;
var hasMagScoop = false;
var magScoopSpace = 0;

var inPO = false;

// create pseudo commodity object

var commodity = new Array();
var shipStock = new Array();
var buildingStock = new Array();

var min = new Array();
var bal = new Array();
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



// -------------------- Retrieve information from page and add position markers -----------------------


// Load each Commodity's values located within "Price (Sell)" table
for(var i = 0; i < document.getElementsByTagName('TH').length; i++)
{

  var findTable = document.getElementsByTagName('TH')[i]
  if (findTable.innerHTML == 'Price&nbsp;(sell)') { foundTable = findTable.parentNode.parentNode; }
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
    cell.innerHTML = "<a id = 'sell" + commodity.indexOf(cell.textContent) + "'>" + cell.innerHTML + "</a>";
  }


  // Search for available Space in ship.
  if (cell.innerHTML == 'free&nbsp;space:')

  {
    shipSpaceLocation = cell.nextSibling;
    shipSpaceLocationTop = shipSpaceLocation.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.firstChild.lastChild.previousSibling.previousSibling;

    shipSpaceLocationTop.innerHTML = 'Free Space: ' + shipSpaceLocation.innerHTML;

    if (shipSpaceLocation.innerHTML.indexOf('+') != -1)

    {
      hasMagScoop = true;
      shipSpace = scrubData(shipSpaceLocation.innerHTML.substr(0,shipSpaceLocation.innerHTML.indexOf('+') - 1));

      magScoopSpace = scrubData(shipSpaceLocation.innerHTML.substring(shipSpaceLocation.innerHTML.indexOf('+') + 2, shipSpaceLocation.innerHTML.length - 1));
    }
    else { shipSpace = scrubData(shipSpaceLocation.innerHTML.substr(0,cell.nextSibling.innerHTML.length - 1)); }

  }
}


// Load each Commodity's values located within "Price (Buy)" table
for(var i = 0; i < document.getElementsByTagName('TH').length; i++)
{

  var findTable = document.getElementsByTagName('TH')[i]
  if (findTable.innerHTML == 'Min') { inPO = true; }
  if (findTable.innerHTML == 'Price&nbsp;(buy)') { foundTable = findTable.parentNode.parentNode; }

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

    // Get building stock price values for Player Starbase
    if (inPO)
    {

      buildingStock[commodity.indexOf(cell.textContent)] = scrubData(cell.nextSibling.textContent);
      min[commodity.indexOf(cell.textContent)] = scrubData(cell.nextSibling.nextSibling.nextSibling.textContent);
      max[commodity.indexOf(cell.textContent)] = scrubData(cell.nextSibling.nextSibling.nextSibling.nextSibling.textContent);

      buyPrice[commodity.indexOf(cell.textContent)] = scrubData(cell.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.lastChild.textContent);
//      alert('PS St:' + buildingStock[commodity.indexOf(cell.textContent)] + ' Mi:' + min[commodity.indexOf(cell.textContent)] + ' Ma:' + max[commodity.indexOf(cell.textContent)] + ' Pr:' + buyPrice[commodity.indexOf(cell.textContent)]);
    }


    // Get info for planet/NPC SB
    else

    {
      buildingStock[commodity.indexOf(cell.textContent)] = scrubData(cell.nextSibling.textContent);
      bal[commodity.indexOf(cell.textContent)] = scrubData(cell.nextSibling.nextSibling.textContent);

      max[commodity.indexOf(cell.textContent)] = scrubData(cell.nextSibling.nextSibling.nextSibling.textContent);
      buyPrice[commodity.indexOf(cell.textContent)] = scrubData(cell.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.lastChild.textContent);
      min[commodity.indexOf(cell.textContent)] = bal[commodity.indexOf(cell.textContent)];

    }

    // insert id tag into commodity name cell

    cell.innerHTML = cell.innerHTML.replace(cell.textContent, "<a id = 'buy" + commodity.indexOf(cell.textContent) + "'>" + cell.textContent + "</a>");
  }


  // Search for available Space in building.
  if (cell.innerHTML == 'free&nbsp;space:')
  {

    buildingSpaceLocation = cell.nextSibling;
    buildingSpace = scrubData(buildingSpaceLocation.innerHTML.substring(0,cell.nextSibling.innerHTML.length - 1));
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


// Add listeners for commodity clicking
for (var i = 0; i < commodity.length; i++)

{
  // Add listener to inserted commodity Tags
  if (document.getElementById('buy' + i)) { document.getElementById('buy' + i).addEventListener('click', buySingle, true); }

  if (document.getElementById('sell' + i)) { document.getElementById('sell' + i).addEventListener('click', sellSingle, true); }
}



// -------------------- Create and insert Buttons ------------------


// Determine if at Planet, Starbase, or DBC
for(var i = 0; i < document.links.length; i++)
{

  var a = document.links[i];
  if (a.textContent == 'Return to starbase menu') { inStarbase = true; }
  if (a.textContent == 'Return to planet menu') { inPlanet = true; }

  if (a.textContent == 'Disco Boogie Club') {inDBC = true;}
}



// If on DBC Trade Screen, Load DBC customized buttons
if (inDBC)

{
  inStarbase = false; 
  // Insert Buttons

  // Complile Buttons to be inserted  var buttons = '';
  buttons = buttons + '<br><input type="button" id="DBCloadPlanet" value = "Planet Run"><br>';
  buttons = buttons + '<br><input type="button" id="loadSF" value = "Load Farm"><br>';  
  buttons = buttons + '<br><input type="button" id="loadRecyc" value = "Load Recylo"><br>';
  
  placeButtons(buttons);

  // Add Event Listeners to Buttons  document.getElementById('loadSF').addEventListener('click',loadSF,true);
  document.getElementById('DBCloadPlanet').addEventListener('click',DBCloadPlanet,true);
  document.getElementById('loadRecyc').addEventListener('click',loadRecyc,true);}

if (inPlanet)
{
  var buttons = '';
  buttons = buttons + '<br><input type="button" id="loadStarbase" value = "Starbase Run"><br>';  
  buttons = buttons + '<br><input type="button" id="loadStock" value = "Stock Run"><br>';  
  buttons = buttons + '<br><input type="button" id="loadFood" value = "Food Run"><br>';  
  buttons = buttons + '<br><input type="button" id="loadWater" value = "Water Run"><br>';

  placeButtons(buttons);


  document.getElementById('loadStock').addEventListener('click',loadStock,true);
  document.getElementById('loadStarbase').addEventListener('click',loadStarbase,true);  
  document.getElementById('loadFood').addEventListener('click',loadFood,true);
  document.getElementById('loadWater').addEventListener('click',loadWater,true);
}


if (inStarbase)
{

  var buttons = '';
  buttons = buttons + '<br><input type="button" id="loadPlanet" value = "Planet Run"><br>';


  placeButtons(buttons);

  document.getElementById('loadPlanet').addEventListener('click',loadPlanet,true);
}


// -------------------------------------------------------------
// ---------------------- Functions ----------------------------
// -------------------------------------------------------------

// ---------------- Buy/Sell Routines ---------------------


// buy a commodity using the commodity link
function buySingle(commodityLink)

{
  var commodityNumber = commodityLink.target.id.substring(3,commodityLink.target.id.length) * 1;
  buyCommodity(commodityNumber, buy[commodityNumber]);

}

// sell a commodity using commodity link

function sellSingle(commodityLink)
{
  var commodityNumber = commodityLink.target.id.substring(4,commodityLink.target.id.length) * 1;

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


// ---------------- Space Calculating Routines -------------

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
  shipSpaceLocationTop.innerHTML = 'Free Space: ' + newSpaceString;
  if (inPO) { buildingSpaceLocation.innerHTML = newBuildingSpace + 't'; }

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


// ------------------- Button Functions ----------------------
// -----------------------------------------------------------


// put Buttons on page
function placeButtons(newButtons) 
{

  // add magScoop check box, Auto-unload, and Reset Form to buttons
  if (hasMagScoop) { newButtons = '<br><input type="checkbox" id="useMagScoop">Use MagScoop' + newButtons; }
  newButtons = '<br><input type="checkbox" id="autoUnload" checked = true>Unload Ship' + newButtons;

  newButtons = newButtons + '<br><input type="button" id="unloadShip" value = "Unload Ship"><br>';
  newButtons = newButtons + '<br><input type="button" id="resetForm" value = "Reset Form"><br>'


  for(var i = 0; i < document.getElementsByTagName('input').length; i++)
  {
    var a = document.getElementsByTagName('input')[i];

    if (a.value == '<- Transfer ->')
    {
      // insert buttons after transfer button

      a.parentNode.innerHTML =  a.parentNode.innerHTML + newButtons;
    }
  }

  
  // Add event listener to Reset Form and Unload Ship buttons
  document.getElementById('resetForm').addEventListener('click',resetForm,true);

  document.getElementById('unloadShip').addEventListener('click',unloadShip,true);
}


// ------------------ General Functions -----------------

// Unload ship (excluding fuel)

function unloadShip()
{
  for (i=1; i<200; i++)

  {
    var item = 'sell_' + i;
    if (document.getElementById(item) && i != 16)

    {
      sellCommodity(i, sell[i]);
    }

  }
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

// -------------- Planet Specific Functions --------------


// load 50/50 of food and water for building stocking
function loadStock()

{
  if (document.getElementById('autoUnload').checked) { unloadShip(); }
  if (document.getElementById('buy_1')) { document.getElementById('buy_1').value = ''; }

  if (document.getElementById('buy_3')) { document.getElementById('buy_3').value = ''; }
  var useSpace = freeShipSpace();
  useSpace = useSpace - useSpace%2

  buyCommodity(1, useSpace / 2);
  buyCommodity(3, useSpace / 2);
}

// load 60/40 of food and water for Starbase stocking
function loadStarbase()

{
  if (document.getElementById('autoUnload').checked) { unloadShip(); }
  if (document.getElementById('buy_1')) { document.getElementById('buy_1').value = ''; }

  if (document.getElementById('buy_3')) { document.getElementById('buy_3').value = ''; }
  var useSpace = freeShipSpace();
  useSpace = useSpace - useSpace%5;

  buyCommodity(1, useSpace * 3/5);
  buyCommodity(3, useSpace * 2/5);
}

function loadFood(){
  if (document.getElementById('autoUnload').checked) { unloadShip(); }
  if (document.getElementById('buy_1')) { document.getElementById('buy_1').value = ''; }

  if (document.getElementById('buy_3')) { document.getElementById('buy_3').value = ''; }
  var useSpace = freeShipSpace();
   buyCommodity(1, useSpace);
}

function loadWater()
{
  if (document.getElementById('autoUnload').checked) { unloadShip(); }
  if (document.getElementById('buy_1')) { document.getElementById('buy_1').value = ''; }
  if (document.getElementById('buy_3')) { document.getElementById('buy_3').value = ''; }

  var useSpace = freeShipSpace(); 
  buyCommodity(3, useSpace);
}

// -------------- Starbase Specific Functions --------------


// get a full load of energy
function loadPlanet()

{
  if (document.getElementById('autoUnload').checked) { unloadShip(); }
  if (document.getElementById('buy_2')) { document.getElementById('buy_2').value = ''; }

  buyCommodity(2, buy[2]);
}


// --------------- DBC Specific Functions -----------------

// Load Space Farm Stock at Starbase
function loadSF()
{
  // Load 48 energy and 60 Embryos

  unloadShip();
  buyCommodity(2, 48);
  buyCommodity(4, 60);

}

// Load Energy and Fuel for Waayan run
function DBCloadPlanet()
{
  unloadShip();

  sellCommodity(16, sell[16]);
  buyCommodity(16, 3);
  buyCommodity(16, buy[16]);

}

// Load ship with Recyclotron Stock
function loadRecyc()
{
  unloadShip();

  buyCommodity(2, 34);
  buyCommodity(13, 10);
  buyCommodity(21, 24);

}
