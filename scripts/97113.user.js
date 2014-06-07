// ==UserScript==
// @name           Pardus Easy Building Trading
// @namespace      Pardus
// @author       Tsarugi (Artemis)
// @description    Auto fills building trading form with an "easy" button for building stocking. Stock any building with 2 clicks and no typing. Search for Pardus Easy Planet Trading for easy buttons on planets.
// @include      *.pardus.at/building_trade.php
// @include      *.pardus.at/overview_buildings.php
// ==/UserScript==

// == Notes ==

// Created by Tsarugi (Artemis)

// Special thanks to Janarius for opening my eyes to Greasemonkey

//

//

// 2.0 Shopping List

// Added ability to track other players' buildings stock

//    and display info list on building > overview page

// Added Keyboard Shortcuts

// Added Price Guarding capability

//

// 1.5 Numerous Substantial Improvements :

// Improved Remaining Space calculation to account for manually entered values

// Improved Remaining Space calculation to account for original click fill usage

// Clicking on individual commodity name will auto insert max buy / sell value

// Added form reset button

// Mag Scoop useablility added

// Added Free Space tracking display for building, ship, and Mag scoop

//

// 1.2 Added funtionality to prohibit :

// selling produced commodities to building and

// buying supply commodities from building

//

// 1.0 Created on 12 / 16 / 2007

// A traders best friend

// Gives three buttons on building trade screen :

// 'Sell All' - Auto fills 'Price (sell) column based on amount in ship, building min/max and avaliable space

// 'Buy All' - Auto fills 'Price (buy) column based on min, produced commodities, and available space in ship

// 'Easy Button' - does both

//

// Does not work on one's own building

//

// == End Notes ==



// ------------- Variable Declarations -------------



// Edit Your building tick capacity here in order shown on Building>Overview Screen:

var buildingTickMax = new Array();

buildingTickMax[0] = new Array(12, 12, 12, 12, 0, 0);   // Orion buildings

buildingTickMax[1] = new Array(12, 12, 12, 12, 0, 0);   // Pegasus Buiildings

buildingTickMax[2] = new Array(4, 20, 4, 4, 0, 0);   // Artemis Buildings



var priceCheck = true; // Toggle 'false' to bypass price warning system

var universe;

var foundTable;

var shipSpace = 0;

var magScoopSpace = 0;

var buildingSpace = 0;

var shipSpaceLocation;

var buildingSpaceLocation;

var hasMagScoop = false;



// create pseudo commodity object

var commodity = new Array();

var commodityMaxPrice = new Array();

var commodityImage = new Array();

var shipStock = new Array();

var buildingStock = new Array();

var min = new Array();

var max = new Array();

var buy = new Array();

var sell = new Array();

var buyPrice = new Array();

var sellPrice = new Array();



// create pseudo building objects

var buildingID = new Array();

var buildingType = new Array();

var buildingOwner = new Array();

var buildingInclude = new Array();

var buildingCommodityNumber = new Array();

var buildingCommodityAmount = new Array();



var currentBuildingID;

var currentBuildingType;

var currentBuildingOwner;

var currentBuildingInclude;

var currentBuildingCommodityNumber = new Array();

var currentBuildingCommodityAmount = new Array();



// Set commodity numbers, Commodity warning prices, and Images

commodity[0] = 'Item'; commodityMaxPrice[0] = 0; commodityImage[0] = '';

commodity[1] = 'Food';  commodityMaxPrice[1] = 150; commodityImage[1] = 'http://static.pardus.at/images/res/food.png';

commodity[2] = 'Energy'; commodityMaxPrice[2] = 150; commodityImage[2] = 'http://static.pardus.at/images/res/energy.png';

commodity[3] = 'Water'; commodityMaxPrice[3] = 120; commodityImage[3] = 'http://static.pardus.at/images/res/water.png';

commodity[4] = 'Animal embryos'; commodityMaxPrice[4] = 50; commodityImage[4] = 'http://static.pardus.at/images/res/animal_embryos.png';

commodity[5] = 'Ore'; commodityMaxPrice[5] = 200; commodityImage[5] = 'http://static.pardus.at/images/res/ore.png';

commodity[6] = 'Metal'; commodityMaxPrice[6] = 615; commodityImage[6] = 'http://static.pardus.at/images/res/metal.png';

commodity[7] = 'Electronics'; commodityMaxPrice[7] = 900; commodityImage[7] = 'http://static.pardus.at/images/res/electronics.png';

commodity[8] = 'Robots'; commodityMaxPrice[8] = 3025; commodityImage[8] = 'http://static.pardus.at/images/res/robots.png';

commodity[9] = 'Heavy plastics'; commodityMaxPrice[9] = 600; commodityImage[9] = 'http://static.pardus.at/images/res/heavy-plastics.png';

commodity[10] = 'Hand weapons'; commodityMaxPrice[10] = 3800; commodityImage[10] = 'http://static.pardus.at/images/res/hand-weapons.png';

commodity[11] = 'Medicines'; commodityMaxPrice[11] = 800; commodityImage[11] = 'http://static.pardus.at/images/res/medicines.png';

commodity[12] = 'Nebula gas'; commodityMaxPrice[12] = 80; commodityImage[12] = 'http://static.pardus.at/images/res/nebula-gas.png';

commodity[13] = 'Chemical supplies'; commodityMaxPrice[13] = 300; commodityImage[13] = 'http://static.pardus.at/images/res/chemical-supplies.png';

commodity[14] = 'Gem stones'; commodityMaxPrice[14] = 100; commodityImage[14] = 'http://static.pardus.at/images/res/gem-stones.png';

commodity[15] = 'Liquor'; commodityMaxPrice[15] = 800; commodityImage[15] = 'http://static.pardus.at/images/res/liquor.png';

commodity[16] = 'Hydrogen fuel'; commodityMaxPrice[16] = 100; commodityImage[16] = 'http://static.pardus.at/images/res/hydrogen-fuel.png';

commodity[17] = 'Exotic matter'; commodityMaxPrice[17] = 550; commodityImage[17] = 'http://static.pardus.at/images/res/exotic_matter.png';

commodity[18] = 'Optical components'; commodityMaxPrice[18] = 300; commodityImage[18] = 'http://static.pardus.at/images/res/optical_components.png';

commodity[19] = 'Radioactive cells'; commodityMaxPrice[19] = 400; commodityImage[19] = 'http://static.pardus.at/images/res/radioactive_cells.png';

commodity[20] = 'Droid modules'; commodityMaxPrice[20] = 8000; commodityImage[20] = 'http://static.pardus.at/images/res/droid_modules.png';

commodity[21] = 'Bio-waste'; commodityMaxPrice[21] = 100; commodityImage[21] = 'http://static.pardus.at/images/res/biowaste.png';

commodity[22] = 'Leech baby'; commodityMaxPrice[22] = 50000; commodityImage[22] = 'http://static.pardus.at/images/res/.png';

commodity[23] = 'Nutrient clods'; commodityMaxPrice[23] = 200; commodityImage[23] = 'http://static.pardus.at/images/res/nutrient_clods.png';

commodity[24] = 'Cybernetic X-993 Parts'; commodityMaxPrice[24] = 30000; commodityImage[24] = 'http://static.pardus.at/images/res/.png';

commodity[25] = 'X-993 Repair-Drone'; commodityMaxPrice[25] = 100000; commodityImage[25] = 'http://static.pardus.at/images/res/.png';

commodity[26] = 'Neural Stimulator'; commodityMaxPrice[26] = 100000; commodityImage[26] = 'http://static.pardus.at/images/res/.png';

commodity[27] = 'Battleweapon Parts'; commodityMaxPrice[27] = 3800; commodityImage[27] = 'http://static.pardus.at/images/res/battleweapon_parts.png';

commodity[50] = 'Slaves'; commodityMaxPrice[50] = 3000; commodityImage[50] = 'http://static.pardus.at/images/res/slaves.png';

commodity[51] = 'Drugs'; commodityMaxPrice[51] = 15500; commodityImage[51] = 'http://static.pardus.at/images/res/drugs.png';

commodity[100] = 'Package'; commodityMaxPrice[100] = 0; commodityImage[100] = 'http://static.pardus.at/images/res/package.png';

commodity[101] = 'Faction package'; commodityMaxPrice[101] = 0; commodityImage[101] = 'http://static.pardus.at/images/res/package_faction.png';

commodity[102] = 'Explosives'; commodityMaxPrice[102] = 0; commodityImage[102] = 'http://static.pardus.at/images/res/explosives.png';

commodity[103] = 'VIP'; commodityMaxPrice[103] = 0; commodityImage[103] = 'http://static.pardus.at/images/res/vip.png';

commodity[104] = 'Christmas Glitter'; commodityMaxPrice[104] = 0; commodityImage[104] = '';

commodity[105] = 'Military Explosives'; commodityMaxPrice[105] = 0; commodityImage[105] = 'http://static.pardus.at/images/res/explosives_military.png';

commodity[201] = 'Human intestines'; commodityMaxPrice[201] = 5000; commodityImage[201] = 'http://static.pardus.at/images/res/human_intestines.png';

commodity[202] = 'Skaari limbs'; commodityMaxPrice[202] = 5000; commodityImage[202] = 'http://static.pardus.at/images/res/skaari_limbs.png';

commodity[203] = 'Keldon brains'; commodityMaxPrice[203] = 5000; commodityImage[203] = 'http://static.pardus.at/images/res/keldon_brains.png';

commodity[204] = 'Rashkir bones'; commodityMaxPrice[204] = 5000; commodityImage[204] = 'http://static.pardus.at/images/res/rashkir_bones.png';

commodity[150] = 'Exotic Crystal'; commodityMaxPrice[150] = 50000; commodityImage[150] = 'http://static.pardus.at/images/res/exotic_crystal.png';

commodity[211] = 'Blue Sapphire jewels'; commodityMaxPrice[211] = 1000; commodityImage[211] = 'http://static.pardus.at/images/res/jewels_fed.png';

commodity[212] = 'Ruby jewels'; commodityMaxPrice[212] = 1000; commodityImage[212] = 'http://static.pardus.at/images/res/jewels_emp.png';

commodity[213] = 'Golden Beryl jewels'; commodityMaxPrice[213] = 1000; commodityImage[213] = 'http://static.pardus.at/images/res/jewels_uni.png';



// set building commodities to be bought and not sold at each building

var buildingName = new Array(30);

var commodityNumber = new Array(30);

for (i = 0; i < 30; i ++ ) commodityNumber[i] = new Array();



buildingName[0] = 'Fuel Collector'; commodityNumber[0].push(16);

buildingName[1] = 'Gas Collector'; commodityNumber[1].push(12);

buildingName[2] = 'Space Farm'; commodityNumber[2].push(1, 3, 21);

buildingName[3] = 'Energy Well'; commodityNumber[3].push(2);

buildingName[4] = 'Chemical Laboratory'; commodityNumber[4].push(13);

buildingName[5] = 'Asteroid Mine'; commodityNumber[5].push(5, 14);

buildingName[6] = 'Radiation Collector'; commodityNumber[6].push(19);

buildingName[7] = 'Medical Laboratory'; commodityNumber[7].push(11);

buildingName[8] = 'Brewery'; commodityNumber[8].push(15);

buildingName[9] = 'Plastics Facility'; commodityNumber[9].push(9);

buildingName[10] = 'Optics Research Center'; commodityNumber[10].push(18);

buildingName[11] = 'Slave Camp'; commodityNumber[11].push(50);

buildingName[12] = 'Electronics Facility'; commodityNumber[12].push(7);

buildingName[13] = 'Recyclotron'; commodityNumber[13].push(1, 3);

buildingName[14] = 'Clod Generator'; commodityNumber[14].push(23);

buildingName[15] = 'Nebula Plant'; commodityNumber[15].push(2, 12);

buildingName[16] = 'Drug Station'; commodityNumber[16].push(51);

buildingName[17] = 'Dark Dome'; commodityNumber[17].push(21, 201, 202, 203, 204);

buildingName[18] = 'Handweapons Factory'; commodityNumber[18].push(10);

buildingName[19] = 'Battleweapons Factory'; commodityNumber[19].push(27);

buildingName[20] = 'Robot Factory'; commodityNumber[20].push(8);

buildingName[21] = 'Droid Assembly Complex'; commodityNumber[21].push(20);

buildingName[22] = 'Leech Nursery'; commodityNumber[22].push(22, 21);

buildingName[23] = 'Smelting Facility'; commodityNumber[23].push(6);

buildingName[24] = 'Alliance Command Station'; commodityNumber[24].push(0);

buildingName[25] = 'Military Outpost'; commodityNumber[25].push(0);

buildingName[26] = 'Trading Outpost'; commodityNumber[26].push(0);



var buildingNum = 0;

var universeNum = 0;

// Deterimine Universe

if (document.URL.search('orion') != - 1) universe = 'Orion'; universeNum = 0;

if (document.URL.search('pegasus') != - 1) universe = 'Pegasus'; universeNum = 1;

if (document.URL.search('artemis') != - 1) universe = 'Artemis'; universeNum = 2;



// ------------------------------------------------------------------------------

// ------------- Unowned Building Data Extraction and Tagging -------------------

// ------------------------------------------------------------------------------



if (document.URL.search('pardus.at/building_trade.php') != - 1) {



  // Building Tracker stuff

  // Deterimine Building ID #

  var userloc = document.getElementsByTagName('SCRIPT')[0].textContent;

  userloc = userloc.slice(userloc.lastIndexOf(' '), userloc.length);

  userloc = userloc.slice(1, userloc.length - 2);

  currentBuildingID = userloc;



  // Determine building Type

  buildingNum = buildingName.indexOf(document.links[0].innerHTML);

  currentBuildingType = buildingNum;



  // Determine Owner Name



  for (i=0; i<document.getElementsByTagName('B').length; i++) {

    if (document.getElementsByTagName('B')[i].textContent.indexOf("'") != -1) {

      var owner = document.getElementsByTagName('B')[i].textContent;

      owner = owner.substring(0, owner.indexOf("'"));

      currentBuildingOwner = owner;

    }

  }



  // End Building Tracker stuff





  // Load each Commodity's values located within "Price (Sell)" table

  for(var i = 0; i < document.getElementsByTagName('TH').length; i ++ ) {

    var findTable = document.getElementsByTagName('TH')[i]

    if (findTable.textContent == 'Price (sell)') foundTable = findTable.parentNode.parentNode;

  }



  // Add listener to table for keyboard entries and original click fillers

  foundTable.addEventListener('keyup', updateSpace, true);

  foundTable.addEventListener('click', pauseUpdate, true);



  // Get info from ship side table and store into "commodity"

  for (i = 0; i < foundTable.getElementsByTagName('TD').length; i ++ ) {

    var cell = foundTable.getElementsByTagName('TD')[i];

    if (commodity.indexOf(cell.textContent) != - 1) {

      // Get shipStock and sell price values

      shipStock[commodity.indexOf(cell.textContent)] = scrubData(cell.nextSibling.nextSibling.textContent);

      sellPrice[commodity.indexOf(cell.textContent)] = scrubData(cell.nextSibling.nextSibling.nextSibling.textContent);

      // insert id tag into commodity name cell

      var tagString = "<a id = 'sell" + commodity.indexOf(cell.textContent) + "'>" + cell.textContent + "</a>";

      cell.innerHTML = cell.innerHTML.replace(cell.textContent, tagString);

    }





    // Search for available Space in ship.

    if (cell.innerHTML == 'free&nbsp;space:') {

      shipSpaceLocation = cell.nextSibling;

      if (shipSpaceLocation.innerHTML.indexOf('+') != - 1) {

        hasMagScoop = true;

        shipSpace = scrubData(shipSpaceLocation.innerHTML.substr(0, shipSpaceLocation.innerHTML.indexOf('+') - 1));

        magScoopSpace = scrubData(shipSpaceLocation.innerHTML.substring(shipSpaceLocation.innerHTML.indexOf('+') + 2, shipSpaceLocation.innerHTML.length - 1));

      }

      else {

        shipSpace = scrubData(shipSpaceLocation.innerHTML.substr(0, cell.nextSibling.innerHTML.length - 1));

      }

    }

  }





  // Load each Commodities value located within the "Price (buy)" table

  for (i = 0; i < document.getElementsByTagName('TH').length; i ++ ) {

    var findTable = document.getElementsByTagName('TH')[i];

    if (findTable.textContent == 'Price (buy)') foundTable = findTable.parentNode.parentNode;

  }



  // Add listener to table for keyboard entries and original click fillers

  foundTable.addEventListener('keyup', updateSpace, true);

  foundTable.addEventListener('click', pauseUpdate, true);



  // Get info from ship side table and store into "commodity"

  for (i = 0; i < foundTable.getElementsByTagName('TD').length; i ++ ) {

    var cell = foundTable.getElementsByTagName('TD')[i];

    if (commodity.indexOf(cell.textContent) != - 1) {

      buildingStock[commodity.indexOf(cell.textContent)] = scrubData(cell.nextSibling.nextSibling.textContent);

      min[commodity.indexOf(cell.textContent)] = scrubData(cell.nextSibling.nextSibling.nextSibling.nextSibling.textContent);

      max[commodity.indexOf(cell.textContent)] = scrubData(cell.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.textContent);

      buyPrice[commodity.indexOf(cell.textContent)] = scrubData(cell.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.textContent);

      var tagString = "<a id = 'buy" + commodity.indexOf(cell.textContent) + "'>" + cell.textContent + "</a>";

      cell.innerHTML = cell.innerHTML.replace(cell.textContent, tagString);

    }



    // Search for available Space in building.

    if (cell.innerHTML == 'free&nbsp;space:') {

      buildingSpaceLocation = cell.nextSibling;

      buildingSpace = scrubData(cell.nextSibling.innerHTML.substr(0, cell.nextSibling.innerHTML.length - 1));

    }

  }







  // Calculate needed and have values for building tracker and store info

  for (i = 1; i < commodity.length; i ++ ) {

    if (max[i] != null) {

      currentBuildingCommodityNumber.push(i);

      var pushVal = buildingStock[i] - max[i];

      if (pushVal > 0) pushVal = 0;

      if (commodityNumber[buildingNum].indexOf(i) == - 1) currentBuildingCommodityAmount.push(pushVal*1);

      else {

        pushVal = buildingStock[i] - min[i];

        if (pushVal <= 0) pushVal = 0;

        currentBuildingCommodityAmount.push(pushVal*1);

      }

    }

  }



  // Load Building List and update if tracking

  loadBuildings();

  var existingBuilding = 0;

  if (buildingID.indexOf(currentBuildingID) != -1) {

    existingBuilding = 1;

    updateBuilding();

  }

  // End Building Tracker stuff





  // Calculate amount to trade

  for (i = 1; i < commodity.length; i ++ ) {

    if (max[i] != null) {

      sell[i] = max[i] - buildingStock[i];

      if (sell[i] > shipStock[i]) sell[i] = shipStock[i];

      buy[i] = buildingStock[i] - min[i];

    }

  }





  // ---------- Insert the Buttons ---------



  // code buttons

  var buttons = ''

  if (hasMagScoop) buttons = buttons + '<br><input type="checkbox" id="useMagScoop">Use Magscoop';

  buttons = buttons + '<br><input type="button" id="tradeAll" value = "Easy Button"><br>';

  buttons = buttons + '<br><input type="button" id="sellAll" value = "Sell Items"><br>';

  buttons = buttons + '<br><input type="button" id="buyAll" value = "Buy Items"><br>';

  buttons = buttons + '<br><input type="button" id="reset" value = "Reset Form"><br>';

  if (!existingBuilding && buildingNum != 26) buttons = buttons + '<br><input type="button" id="' + currentBuildingID + '" value = "Track"><br>';

  if (existingBuilding && buildingNum != 26) buttons = buttons + '<br><input type="button" id="' + currentBuildingID + '" value = "Untrack"><br>';



  // insert buttons

  for(i = 0; i < document.getElementsByTagName('input').length; i ++ ) {

    var placeButtons = document.getElementsByTagName('input')[i];

    if (placeButtons.value == '<- Transfer ->') {

      // insert buttons after transfer button

      placeButtons.parentNode.innerHTML = placeButtons.parentNode.innerHTML + buttons;

    }

  }



  // Add listeners to new buttons

  document.getElementById('tradeAll').addEventListener('click', serviceBuilding, true);

  document.getElementById('sellAll').addEventListener('click', sellItems, true);

  document.getElementById('buyAll').addEventListener('click', buyItems, true);

  document.getElementById('reset').addEventListener('click', resetForm, true);

  if (!existingBuilding && buildingNum != 26) document.getElementById(currentBuildingID).addEventListener('click', updateBuilding, true);

  if (existingBuilding && buildingNum != 26) document.getElementById(currentBuildingID).addEventListener('click', tradeRemoveBuilding, true);



  // Add listeners to inserted tags for commodity clicking

  for (i = 0; i < commodity.length; i ++ ) {

    if (document.getElementById('buy' + i)) document.getElementById('buy' + i).addEventListener('click', buySingle, true);

    if (document.getElementById('sell' + i)) document.getElementById('sell' + i).addEventListener('click', sellSingle, true);

    

  // Add listener for keyboard shortcuts

  document.addEventListener('keyup', keyStroke, true);

  }

}



// ------------------------------------------------------

// ----------------- Building Overview Page -------------

// ------------------------------------------------------

if (document.URL.search('pardus.at/overview_buildings.php') != - 1) {

  loadBuildings();



  // get data for personal buildings

  var table = document;



  // locate table containing information

  for (i=0; i < document.getElementsByTagName('TH').length; i++) {

    if (document.getElementsByTagName('TH')[i].innerHTML == 'Building') {

      table = document.getElementsByTagName('TH')[i].parentNode.parentNode;

    }

  }



  // go building by building and extract building data

  var row = table.firstChild.nextSibling.nextSibling;

  var sweep = 0;

  while (row != null) {

    // Extract Building ID, location, and Owner data

    var userloc = row.getElementsByTagName('A')[0].href;

    userloc = userloc.substring(userloc.indexOf('=') + 1, userloc.length);



    currentBuildingID = userloc;

    currentBuildingType = buildingName.indexOf(row.getElementsByTagName('A')[0].textContent);

    currentBuildingOwner = 'You';

    currentBuildingCommodityNumber = new Array();

    currentBuildingCommodityAmount = new Array();



    column = row.firstChild;

    for (i=0; i<6; i++) column = column.nextSibling;

    var comNum;

    var amount;



    // extract consuming amounts

    for (j=0; j<column.getElementsByTagName('TD').length; j++) {

      currentBuildingCommodityNumber.push(commodity.indexOf(column.getElementsByTagName('IMG')[j].alt));

      comNum = column.getElementsByTagName('TD')[j].textContent;

      comNum = comNum.substring(2, comNum.length);

      currentBuildingCommodityAmount.push(comNum*1);

    }



    // Determine amount needed to fill to specified ticks

    column = column.nextSibling.nextSibling;

    for (j=0; j< column.getElementsByTagName('TD').length; j++) {

      amount = column.getElementsByTagName('TD')[j].textContent;

      amount = amount.substring(2, amount.length)*1;

      currentBuildingCommodityAmount[j] = amount - currentBuildingCommodityAmount[j]*buildingTickMax[universeNum][sweep];

    }





    // Determine how much stock available

    column = column.nextSibling;

    for (j=0; j< column.getElementsByTagName('TD').length; j++) {

      item = commodity.indexOf(column.getElementsByTagName('IMG')[j].alt);

      amount = column.getElementsByTagName('TD')[j].textContent;

      amount = amount.substring(2, amount.length)*1;

      currentBuildingCommodityNumber.push(item);

      currentBuildingCommodityAmount.push(amount);

    }



    updateBuilding();

    row = row.nextSibling;

    sweep ++;

  }



  // locate and insert table

  var locateTable = document.getElementsByTagName('P')[0];

  var originalContent = locateTable.textContent;

  displayBuildingData();

}





// ------------------------------------------------------

// ------------- Data Recording Functions ---------------

// ------------------------------------------------------



// Load data from stored file

function loadBuildings() {

  var loadList = GM_getValue('buildingList' + universe, null);

  if (loadList != null) {

    var loadedList = new Array();

    loadedList = loadList.split('.');

    

    for (i=0; i<loadedList.length; i++) {

      var building = new Array();

      building = loadedList[i].split(',');

      buildingID.push(building.shift());

      buildingType.push(building.shift());

      buildingOwner.push(building.shift());

      buildingInclude.push(building.shift());

      var comm = new Array();

      var amm = new Array();

      while (building.length > 1) {

        comm.push(building.shift()*1);

        amm.push(building.shift()*1);

      }

      buildingCommodityNumber.push(comm);

      buildingCommodityAmount.push(amm);

    }

  }

}



// Save data to stored file

function saveBuildings() {

  var buildingList = "";

  for (i = 0; i < buildingID.length; i ++ ) {

    buildingList += buildingID[i];

    buildingList += ',' + buildingType[i];

    buildingList += ',' + buildingOwner[i];

    buildingList += ',' + buildingInclude[i];

    for (j = 0; j < buildingCommodityNumber[i].length; j ++ ) {

      buildingList += ',' + buildingCommodityNumber[i][j];

      buildingList += ',' + buildingCommodityAmount[i][j];

    }

    if (i < buildingID.length - 1) buildingList += '.';

  }

  GM_setValue('buildingList' + universe, buildingList);

}



// Add / Update a building

function updateBuilding() {

  var buildingIndex = buildingID.indexOf(currentBuildingID);

  if (buildingIndex == -1) {

    buildingID.push(currentBuildingID);

    buildingType.push(currentBuildingType);

    buildingOwner.push(currentBuildingOwner);

    buildingInclude.push(1);

    buildingCommodityNumber.push(currentBuildingCommodityNumber);

    buildingCommodityAmount.push(currentBuildingCommodityAmount);

  }

  else {

    buildingID[buildingIndex] = currentBuildingID;

    buildingType[buildingIndex] = currentBuildingType;

    buildingOwner[buildingIndex] = currentBuildingOwner;

    buildingCommodityNumber[buildingIndex] = currentBuildingCommodityNumber;

    buildingCommodityAmount[buildingIndex] = currentBuildingCommodityAmount;

  }

  saveBuildings();

}



function overviewRemoveBuilding(ident) {

  var ID = ident.target.id.substring(6,ident.target.id.length);

  removeBuilding(ID);

  displayBuildingData();

}



function tradeRemoveBuilding(ident) {

  var ID = ident.target.id;

  removeBuilding(ID);

}



// Remove a building from the list

function removeBuilding(ID) {

  var buildingIndex = buildingID.indexOf(ID);

  if (buildingIndex != -1) {

    buildingID.splice(buildingIndex, 1);

    buildingType.splice(buildingIndex, 1);

    buildingOwner.splice(buildingIndex, 1);

    buildingInclude.splice(buildingIndex, 1);

    buildingCommodityNumber.splice(buildingIndex, 1);

    buildingCommodityAmount.splice(buildingIndex, 1);

    saveBuildings();

  }

}



function toggleInclude(ident) {

  var ID = ident.target.id.substring(7,ident.target.id.length);

  ID = buildingID.indexOf(ID)

  if (ID != -1) {

    if (buildingInclude[ID] == 1) buildingInclude[ID] = 0;

    else buildingInclude[ID] = 1;

    saveBuildings();

    displayBuildingData();

  }

}



function upBuilding(ident) {

  var ID = ident.target.id.substring(2,ident.target.id.length);

  ID = buildingID.indexOf(ID);

  if (ID != 0) {

    currentBuildingID = buildingID[ID];

    currentBuildingType = buildingType[ID];

    currentBuildingOwner = buildingOwner[ID];

    currentBuildingInclude = buildingInclude[ID];

    currentBuildingCommodityNumber = buildingCommodityNumber[ID];

    currentBuildingCommodityAmount = buildingCommodityAmount[ID];

    

    buildingID.splice(ID, 1);

    buildingType.splice(ID, 1);

    buildingOwner.splice(ID, 1);

    buildingInclude.splice(ID, 1);

    buildingCommodityNumber.splice(ID, 1);

    buildingCommodityAmount.splice(ID, 1);

    

    buildingID.splice(ID - 1, 0,currentBuildingID);

    buildingType.splice(ID - 1, 0, currentBuildingType);

    buildingOwner.splice(ID - 1, 0, currentBuildingOwner);

    buildingInclude.splice(ID - 1, 0, currentBuildingInclude);

    buildingCommodityNumber.splice(ID - 1, 0, currentBuildingCommodityNumber);

    buildingCommodityAmount.splice(ID - 1, 0, currentBuildingCommodityAmount);



    saveBuildings();

    displayBuildingData();

  } 

}



function dnBuilding(ident) {

  var ID = ident.target.id.substring(2,ident.target.id.length);

  ID = buildingID.indexOf(ID);

  if (ID < buildingID.length - 1) {

    currentBuildingID = buildingID[ID];

    currentBuildingType = buildingType[ID];

    currentBuildingOwner = buildingOwner[ID];

    currentBuildingInclude = buildingInclude[ID];

    currentBuildingCommodityNumber = buildingCommodityNumber[ID];

    currentBuildingCommodityAmount = buildingCommodityAmount[ID];

    

    buildingID.splice(ID, 1);

    buildingType.splice(ID, 1);

    buildingOwner.splice(ID, 1);

    buildingInclude.splice(ID, 1);

    buildingCommodityNumber.splice(ID, 1);

    buildingCommodityAmount.splice(ID, 1);

    

    buildingID.splice(ID + 1, 0,currentBuildingID);

    buildingType.splice(ID + 1, 0, currentBuildingType);

    buildingOwner.splice(ID + 1, 0, currentBuildingOwner);

    buildingInclude.splice(ID + 1, 0, currentBuildingInclude);

    buildingCommodityNumber.splice(ID + 1, 0, currentBuildingCommodityNumber);

    buildingCommodityAmount.splice(ID + 1, 0, currentBuildingCommodityAmount);



    saveBuildings();

    displayBuildingData();

  }

}



// Display Table of info

function displayBuildingData() {

  var includeCommodity = new Array(commodity.length);

  var showBuilding = new Array(buildingID.length);

  var commodityColumn = new Array();

  var commodityNeed = new Array(commodity.length);

  var commodityHave = new Array(commodity.length);

  for (i = 0; i < includeCommodity.length; i ++ ) {

    includeCommodity[i] = 0;

    commodityNeed[i] = 0;

    commodityHave[i] = 0;

  }



  // Determine what commodites to show and totals

  for (i = 0; i < buildingID.length; i ++ ) {

    for (j = 0; j < buildingCommodityAmount[i].length; j ++ ) {

      if (buildingCommodityAmount[i][j] != 0 && buildingInclude[i] == 1) {

        includeCommodity[buildingCommodityNumber[i][j]] = 1;

        if (buildingCommodityAmount[i][j] < 0 && buildingInclude[i] == 1) commodityNeed[buildingCommodityNumber[i][j]] += buildingCommodityAmount[i][j];

        if (buildingCommodityAmount[i][j] > 0 && buildingInclude[i] == 1) commodityHave[buildingCommodityNumber[i][j]] += buildingCommodityAmount[i][j];

      }

    }

  }



  // abreviate shown commodities to needed/have items

  for (i = 1; i < includeCommodity.length; i ++ ) {

    if (includeCommodity[i]) commodityColumn.push(i);

  }



  // if builidng doesn't need/have anything, don't show

  for (i=0; i< buildingID.length; i++) {

    showBuilding[i] = 0;

    for (j=0; j < 7; j++) {

      if (buildingCommodityAmount[i][j] && buildingCommodityAmount[i][j] != 0) showBuilding[i] = 1;

    }

  }



  // Code the table

  var inclNeg = 'cc3300';

  var inclPos = '99ff00';

  var exclNeg = '660000';

  var exclPos = '006600';

  var useColor, useNeg, usePos;



  var tableCode = originalContent + "<br><br>";

  var satisfiedBuildings = "";

  var imageRow = "";

  tableCode += '<table background="http://static.pardus.at/images/bgdark.gif" class="messagestyle" align="center">'



  // Insert net row

  tableCode += '<tr><td></td><td></td><td>Net:</td>';

  for (i=0; i< commodityColumn.length; i++) {

    tableCode += '<td align = center>';

    var showValue = commodityNeed[commodityColumn[i]] + commodityHave[commodityColumn[i]];

    if (showValue < 0) useColor = inclNeg;

    else if (showValue == 0) useColor = '000000';

    else useColor = inclPos;

    tableCode += '<font color = "' + useColor + '">' + Math.abs(showValue) + '</font></td>';

  }

  tableCode += '</tr>';



  // insert Avalilable row

  tableCode += '<tr><td></td><td></td><td>Available:</td>';

  for (i=0; i< commodityColumn.length; i++) {

    tableCode += '<td align = center>';

    var showValue = commodityHave[commodityColumn[i]]

    if (showValue < 0) useColor = inclNeg;

    else if (showValue == 0) useColor = '000000';

    else useColor = inclPos;

    tableCode += '<font color = "' + useColor + '">' + Math.abs(showValue) + '</font></td>';

  }

  tableCode += '</tr>';



  // insert need row

  tableCode += '<tr><td></td><td></td><td>Required:</td>';

  for (i=0; i< commodityColumn.length; i++) {

    tableCode += '<td align = center>';

    var showValue = commodityNeed[commodityColumn[i]];

    if (showValue < 0) useColor = inclNeg;

    else if (showValue == 0) useColor = '000000';

    else useColor = inclPos;

    tableCode += '<font color = "' + useColor + '">' + Math.abs(showValue) + '</font></td>';

  }

  tableCode += '</tr>';



  // Insert Image Row

  tableCode += '<tr><td align="center">Incl</td><td align="center">Building</td><td align="center">Owner</td>';

  for (i = 0; i < commodityColumn.length; i ++ ) {

    imageRow += '<td align="center"><img src="' + commodityImage[commodityColumn[i]] + '"</img></td>';

  }

  imageRow += '</tr>';

  tableCode += imageRow;



  // Insert Buildings

  for (i = 0; i < buildingID.length; i ++ ) {

    if (showBuilding[i]) {

      tableCode += '<tr><td align="center"><input type="checkbox" id="include' + buildingID[i] + '"></td>';

      tableCode += '<td align="center">' + buildingName[buildingType[i]] + '</td>';

      tableCode += '<td align="center">' + buildingOwner[i] + '</td>';

      if (buildingInclude[i] == 1) { usePos = inclPos; useNeg = inclNeg; }

      else { usePos = exclPos; useNeg = exclNeg; }

      for (j = 0; j < commodityColumn.length; j ++ ) {

        tableCode += '<td align="center">';

        var comIndex = buildingCommodityNumber[i].indexOf(commodityColumn[j]);

        if (comIndex != -1) {

          var showValue = buildingCommodityAmount[i][comIndex];

          if (showValue < 0) useColor = useNeg;

          else if (showValue == 0) useColor = '000000';

          else useColor = usePos;

          tableCode += '<font color = "' + useColor + '">' + Math.abs(showValue) + '</font>';

        }

        tableCode += '</td>';

      }

      tableCode += '<td align="center"><input style="width:15px;height:22px" type="button" id="up' + buildingID[i] + '" value = "^"></td>';

      tableCode += '<td align="center"><input style="width:15px;height:22px" type="button" id="dn' + buildingID[i] + '" value = "v"></td>';

      tableCode += '<td align="center"><input type="button" id="remove' + buildingID[i] + '" value = "Rem"></td></tr>';

    }

    else {

      satisfiedBuildings += '<tr><td align="center"></td>';

      satisfiedBuildings += '<td align="center">' + buildingName[buildingType[i]] + '</td>';

      satisfiedBuildings += '<td align="center">' + buildingOwner[i] + '</td>';

      for (j = 0; j < commodityColumn.length; j ++ ) {

        satisfiedBuildings += '<td align="center">';

        var comIndex = buildingCommodityNumber[i].indexOf(commodityColumn[j]);

        if (comIndex != -1) {

          var showValue = buildingCommodityAmount[i][comIndex];

          useColor = '000000';

          satisfiedBuildings += '<font color = "' + useColor + '">' + Math.abs(showValue) + '</font>';

        }

        satisfiedBuildings += '</td>';

      }

      satisfiedBuildings += '<td align="center"></td>';

      satisfiedBuildings += '<td align="center"></td>';

      satisfiedBuildings += '<td align="center"><input type="button" id="remove' + buildingID[i] + '" value = "Rem"></td></tr>';  

    }  

  }



  if (satisfiedBuildings != "") satisfiedBuildings = '<tr><td align="center"></td><td align="center">Satisfied Buildings</td><td align="center">Owner</td>' + imageRow + satisfiedBuildings;

  tableCode += satisfiedBuildings;

  tableCode += '</table>';

  locateTable.innerHTML = tableCode;



  // add event listenerts to buttons

  for (i=0; i<buildingID.length; i++) {

    if (showBuilding[i] == 1) {

      if (buildingInclude[i] == 1) document.getElementById('include' + buildingID[i]).checked = true;

      document.getElementById('include' + buildingID[i]).addEventListener('click', toggleInclude, true);

      document.getElementById('remove' + buildingID[i]).addEventListener('click', overviewRemoveBuilding, true);

      document.getElementById('up' + buildingID[i]).addEventListener('click', upBuilding, true);

      document.getElementById('dn' + buildingID[i]).addEventListener('click', dnBuilding, true);

    }

    else document.getElementById('remove' + buildingID[i]).addEventListener('click', overviewRemoveBuilding, true);

  }

}





// -----------------------------------------------------

// ----------------- Support Functions -----------------

// -----------------------------------------------------





// ---------------- Space Calculating Routines -------------



// calculate final ship / building space and display on form

function updateSpace() {

  var newShipSpace = shipSpace + magScoopSpace;

  var newBuildingSpace = buildingSpace;

  var newSpaceString;

  for (var i = 0; i < commodity.length; i ++ ) {

    if (document.getElementById('sell_' + i)) {

      newBuildingSpace = newBuildingSpace - document.getElementById('sell_' + i).value * 1;

      newShipSpace = newShipSpace + document.getElementById('sell_' + i).value * 1;

    }

  }

  for (var i = 0; i < commodity.length; i ++ ) {

    if (document.getElementById('buy_' + i)) {

      newShipSpace = newShipSpace - document.getElementById('buy_' + i).value * 1;

    }

  }





  if (hasMagScoop) {

    if (newShipSpace < 0) newSpaceString = newShipSpace + 't + 0t';

    if (newShipSpace < 150) newSpaceString = '0t + ' + newShipSpace + 't';

    if (newShipSpace >= 150) newSpaceString = (newShipSpace - 150) + 't + 150t';

  }

  else newSpaceString = newShipSpace + 't';

  shipSpaceLocation.innerHTML = newSpaceString;

  buildingSpaceLocation.innerHTML = newBuildingSpace + 't';

}



// determine amount of free space available including current tansaction values

function freeShipSpace()

{

  var freeShipSpace = shipSpace;

  if (document.getElementById('useMagScoop')) {

    if (document.getElementById('useMagScoop').checked) freeShipSpace = freeShipSpace + magScoopSpace;

    if ( ! document.getElementById('useMagScoop').checked) freeShipSpace = freeShipSpace - 150 + magScoopSpace;

  }



  for (var i = 0; i < commodity.length; i ++ ) {

    if (document.getElementById('sell_' + i)) freeShipSpace = freeShipSpace + document.getElementById('sell_' + i).value * 1;

    if (document.getElementById('buy_' + i)) freeShipSpace = freeShipSpace - document.getElementById('buy_' + i).value;

  }

  return freeShipSpace;

}





// --------------- Service Building functions --------------



// buy / sell max amount of a single commodity

function buySingle(commodityType) {

  var commodityNumber = commodityType.target.id.substr(3, commodityType.target.id.length);

  buyCommodity(commodityNumber, buy[commodityNumber]);

}



function sellSingle(commodityType) {

  var commodityNumber = commodityType.target.id.substr(4, commodityType.target.id.length)

  sellCommodity(commodityNumber, sell[commodityNumber]);

}



// Sell the max amount of commodity based on available space and building settings

function sellCommodity(commodityNumber, amount) {

  if (document.getElementById('sell_' + commodityNumber)) {

    document.getElementById('sell_' + commodityNumber).value = '';

    var newBuildingSpace = buildingSpace;

    for (var i = 0; i < commodity.length; i ++ ) {

      if (document.getElementById('sell_' + i)) newBuildingSpace = newBuildingSpace - document.getElementById('sell_' + i).value;

    }

    if (amount > newBuildingSpace) amount = newBuildingSpace;

    if (amount > 0) document.getElementById('sell_' + commodityNumber).value = amount;

    updateSpace();

  }

}



// Buy the max amount of commodity based on available space and building settings

function buyCommodity(commodityNumber, amount) {

  if (document.getElementById('buy_' + commodityNumber)) {

    var freeSpace = freeShipSpace();

    document.getElementById('buy_' + commodityNumber).value = '';

    if (amount > freeSpace) amount = freeSpace;

    if (amount > 0) document.getElementById('buy_' + commodityNumber).value = amount;

    if (priceCheck && buyPrice[commodityNumber] > commodityMaxPrice[commodityNumber]) alert ('High Buy Price on ' + commodity[commodityNumber] + '!');

    updateSpace();

  }

}



// fill in the 'sell' side except for commodities that are produced there

function sellItems() {

  for (i = 1; i < commodity.length; i ++ ) {

    if (document.getElementById('sell_' + i) && document.getElementById('sell_' + i).value == '' && commodityNumber[buildingNum].indexOf(i) == -1) {

      sellCommodity(i, sell[i]);

    }

  }

}



// fill in the buy side for each produced commodity only

function buyItems() {

  for (i = 1; i < commodity.length; i ++ ) {

    if (document.getElementById('buy_' + i) && document.getElementById('buy_' + i).value == '' && commodityNumber[buildingNum].indexOf(i) != -1) {

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

function resetForm() {

  for (var i = 0; i < commodity.length; i ++ ) {

    if (document.getElementById('buy_' + i)) document.getElementById('buy_' + i).value = '';

    if (document.getElementById('sell_' + i)) document.getElementById('sell_' + i).value = '';

  }

  updateSpace();

}





// --------------------- Misc Functions -----------------------



// Short pause, then update space numbers when using original commodity form filler

function pauseUpdate() {

  var t = setTimeout(updateSpace, 100);

}



// scrub number data

function scrubData(data) {

  if (data.search(/,/) != - 1) data = data.replace(/,/, '');

  if (data.search(/\+/g) != - 1) data = 0;

  else if (data.search(/-/) != - 1) data = data.replace('-', '');

  data = data * 1;

  return data;

}



// Keystroke shortcuts

function keyStroke(keypressed) {

  var key = keypressed.keyCode;

  key = String.fromCharCode(key);

  if (key == "E") serviceBuilding();

  if (key == "S") sellItems();

  if (key == "B") buyItems();

  if (key == "R") resetForm();

}