//
// ==UserScript==
// @name           Ikariam Inline Military Strength v1.0
// @namespace      ikariamScript
// @description    Calculates the strength of your military and displays it on
//                 the "Troops in town" page
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// ==/UserScript==
//
// version 1.0
// 2009-05-02
// author - sifl
//

String.prototype.trim = function () { 
	return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"); 
};

String.prototype.contains = function (search) { 
  return (this.match(search) == search)
};


var scoreElement;

var gameServer;
var gameServerParts;
var subDomain;
var domain;

// save player name and server
// when player views barracks, grab upgrade information on troops/ships
// if player name and server change, erase this information
var playerName;


var armyUpgradesKnown = false;
var fleetUpgradesKnown = false;
var townWallLevelKnown = false


var townWallLevel;
var troopTypes = 13;
var shipTypes = 10;

var troop = new Array();
var ship = new Array();

var troopOffenseUpgrade = new Array();
var troopDefenseUpgrade = new Array();

// name, attack, defense, stamina, upkeep, assault, resistance, cost, attack2, attack3, attack4, defense2, defense3, defense4

var troopInfo = [["Slinger", 7, 6, 7, 3, 38, 0, 0, 1, 1, 1, 1, 1, 1],
["Swordsman", 18, 11, 4, 5, 62, 1, 0, 2, 3, 4, 1, 1, 2],
["Phalanx", 14, 30, 8, 8, 95, 0, 1, 2, 2, 2, 4, 5, 6],
["Archer", 26, 23, 4, 8, 128, 0, 1, 3, 5, 7, 1, 1, 1],
["Marksman", 42, 21, 5, 10, 192, 1, 0, 5, 8, 11, 2, 2, 2],
["Gyrocopter", 35, 30, 3, 10, 250, 0, 0, 4, 5, 6, 3, 4, 5],
["Steam Giant", 67, 50, 4, 15, 286, 0, 0, 8, 10, 12, 8, 10, 12],
["Bombardier", 184, 54, 3, 30, 941, 1, 0, 22, 28, 34, 6, 8, 10],
["Battering Ram", 6, 50, 5, 30, 204, 0, 0, 2, 2, 2, 8, 10, 12],
["Catapult", 34, 33, 5, 30, 447, 0, 0, 8, 10, 12, 4, 6, 8],
["Mortar", 142, 92, 5, 60, 1041, 0, 0, 15, 18, 21, 10, 12, 14],
["Doctor", 8, 22, 10, 30, 701, 0, 0, 0, 0, 0, 0, 0, 0],
["Cook", 12, 18, 10, 30, 447, 0, 0, 0, 0, 0, 0, 0, 0]];


// returns all elements of a class within a given element
getElementsByClass = function(inElement, className, findIn) 
{
  var all = inElement.getElementsByTagName('*');
  var elements = [];
  for (var e = 0; e < all.length; e++) 
  {
    if (findIn == true) 
    {
        if (all[e].className.indexOf(className) > 0) 
        {
            elements[elements.length] = all[e];
        }
    } else {
        if (all[e].className == className) 
        {
            elements[elements.length] = all[e];
        }
    }
  }
  return elements;
};



// add thousands separator to this number
function stringThousands(nStr)
{
  nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}



// inserts element into page
/*
function insertBefore(newElement, targetElement) 
{
  targetElement.parentNode.insertBefore(newElement, targetElement);
}
*/


// create the military info box on the left hand side of the page
function addMilitaryBox(title, offense, defense, stamina, upkeep,
    cost, upgradePotential, extraTitle, extraValue) 
{
    scoreElement = document.createElement("div");
    scoreElement.setAttribute("id", "information");
    scoreElement.setAttribute("class", "dynamic");
    
    var scoreDiv = <>
        <h3 class="header">{title} <a class="help" href="http://userscripts.org/scripts/show/48061" title="Help"><span class="textLabel">Need help?</span></a></h3>
        <div class="content">
            <ul class="cityinfo">
                <li style="text-align:left;" class="ally"><span class="textLabel" style="width:60%;">Offensive power:</span><div style="text-align:right; width:*"><b>{stringThousands(Math.round(offense))}</b></div></li>
                <li style="text-align:left;" class="ally"><span class="textLabel" style="width:60%;">Defensive power:</span><div style="text-align:right; width:*"><b>{stringThousands(Math.round(defense))}</b></div></li>
                <li style="font-size:11px; text-align:left;" class="ally"><span class="textLabel" style="width:60%;">Stamina:</span><div style="text-align:right; width:*">{stringThousands(Math.round(stamina))}</div></li>
                <li style="font-size:11px; text-align:left;" class="ally"><span class="textLabel" style="width:60%;">Upkeep:</span><div style="text-align:right; width:*">{stringThousands(Math.round(upkeep))}</div></li>
                <li style="font-size:11px; text-align:left;" class="ally"><span class="textLabel" style="width:60%;">General score:</span><div style="text-align:right; width:*">{stringThousands(Math.round(cost / 100))}</div></li>
                <li style="font-size:11px; text-align:left;" class="ally"><span class="textLabel" style="width:60%;">Upgrade potential:</span><div style="text-align:right; width:*">{upgradePotential}</div></li>
                <li style="font-size:11px; text-align:left;" class="ally"><span class="textLabel" style="width:60%;">{extraTitle}</span><div style="text-align:right; width:*">{extraValue}</div></li>
        </ul>
        </div><!-- end content -->
        <div class="footer"></div>
        </>;

    scoreElement.innerHTML = scoreDiv;
    
    // get container for Island view
    var informationContainer = document.getElementById('reportInboxLeft');
    
    informationContainer.parentNode.insertBefore(scoreElement, informationContainer);

}



// adds town worth information to the information box on the left side
function addArmySummary()
{
  var offense, defense, stamina, upkeep, cost, i;
  
  var unitOffense, unitDefense, topOffense, topDefense;

  // calculate points when defending
  offense = 0;
  defense = 0;
  stamina = 0;
  upkeep = 0;
  cost = 0;
  
  // upgrade potential is the offense + defense compared to what it would be
  // if everything was fully upgraded
  topOffense = 0;
  topDefense = 0;
  upgradePotential = 0;
  for (i = 0; i < troopTypes; i++)
  {
    unitOffense = troopInfo[i][1];
    if (troopOffenseUpgrade[i] >= 1)
      unitOffense += troopInfo[i][8];
    if (troopOffenseUpgrade[i] >= 2)
      unitOffense += troopInfo[i][9];
    if (troopOffenseUpgrade[i] >= 3)
      unitOffense += troopInfo[i][10];
    offense += unitOffense * troop[i];
    topOffense += (troopInfo[i][1] + troopInfo[i][8] + troopInfo[i][9]
        + troopInfo[i][10]) * troop[i];

    unitDefense = troopInfo[i][2];
    if (troopOffenseUpgrade[i] >= 1)
      unitDefense += troopInfo[i][11];
    if (troopOffenseUpgrade[i] >= 2)
      unitDefense += troopInfo[i][12];
    if (troopOffenseUpgrade[i] >= 3)
      unitDefense += troopInfo[i][13];
    defense += unitDefense * (1 + troopInfo[i][7] * 0.3) * (1 + townWallLevel / 10) * troop[i];
    topDefense += (troopInfo[i][2] + troopInfo[i][11] + troopInfo[i][12]
        + troopInfo[i][13]) * (1 + troopInfo[i][7] * 0.3) *
        (1 + townWallLevel / 10) * troop[i];

    stamina += troopInfo[i][3] * troop[i];
    upkeep += troopInfo[i][4] * troop[i];
    cost += troopInfo[i][5] * troop[i];
  }

  // create the town worth div box for defense
  if (topOffense + topDefense == 0)
  {
    upgradePotential = "N/A";
  }
  else
  {
    upgradePotential = (offense + defense) / (topOffense + topDefense);
    upgradePotential = Math.round(upgradePotential * 100) + "%";
  }
  addMilitaryBox("Defending army", offense, defense, stamina, upkeep,
      cost, upgradePotential, "Town wall:", townWallLevel);
  
  // calculate poitns when attacking
  // assume no breaches
  offense = 0;
  defense = 0;
  stamina = 0;
  upkeep = 0;
  cost = 0;
  topOffense = 0;
  topDefense = 0;
  for (i = 0; i < troopTypes; i++)
  {
    unitOffense = troopInfo[i][1];
    if (troopOffenseUpgrade[i] >= 1)
      unitOffense += troopInfo[i][8];
    if (troopOffenseUpgrade[i] >= 2)
      unitOffense += troopInfo[i][9];
    if (troopOffenseUpgrade[i] >= 3)
      unitOffense += troopInfo[i][10];
    offense += unitOffense * (1 + troopInfo[i][6] * 0.3) * troop[i];
    topOffense += (troopInfo[i][1] + troopInfo[i][8] + troopInfo[i][9]
        + troopInfo[i][10]) * (1 + troopInfo[i][6] * 0.3) * troop[i];

    unitDefense = troopInfo[i][2];
    if (troopOffenseUpgrade[i] >= 1)
      unitDefense += troopInfo[i][11];
    if (troopOffenseUpgrade[i] >= 2)
      unitDefense += troopInfo[i][12];
    if (troopOffenseUpgrade[i] >= 3)
      unitDefense += troopInfo[i][13];
    defense += unitDefense * troop[i];
    topDefense += (troopInfo[i][2] + troopInfo[i][11] + troopInfo[i][12]
        + troopInfo[i][13]) * troop[i];

    stamina += troopInfo[i][3] * troop[i];
    upkeep += troopInfo[i][4] * troop[i];
    cost += troopInfo[i][5] * troop[i];
  }
  
  // create the town worth div box for offense
  if (topOffense + topDefense == 0)
  {
    upgradePotential = "N/A";
  }
  else
  {
    upgradePotential = (offense + defense) / (topOffense + topDefense);
    upgradePotential = Math.round(upgradePotential * 100) + "%";
  }
  addMilitaryBox("Attacking army", offense, defense, stamina, upkeep,
      cost, upgradePotential, "Breaches:", 0);

}



// returns true iff we're on the military army view
function isMilitaryArmyView()
{
  return (document.getElementsByTagName("body")[0].id == "cityMilitary-army");
}



// returns true iff we're on the military fleet view
function isMilitaryFleetView()
{
  return (document.getElementsByTagName("body")[0].id == "cityMilitary-fleet");
}



// read in the number of each troop in the town
function readTroopNumbers()
{

  var nativeTroopObject = document.getElementById("tab1");
  var troopNumber = nativeTroopObject.getElementsByTagName("td");
  
  if (troopNumber.length != troopTypes)
  {
    // error -- numbers don't match up, something is screwed up
    return;
  }
  
  for (var i = 0; i < troopTypes; i++)
  {
    troop[i] = parseInt(troopNumber[i].innerHTML.replace("-", "0"));
  }
  
}



// reads upgrades and saves them into memory
function readUpgrades()
{
  var i, j;
  var unitNumber;
  
  // find unit objects
  var unitObject = document.getElementById("units").getElementsByTagName("li");
  
  // set all upgrades to zero
  for (i = 0; i < troopTypes; i++)
  {
    troopOffenseUpgrade[i] = 0;
    troopDefenseUpgrade[i] = 0;
  }

  // search each one for the upgrade icons
  GM_log("found " + unitObject.length + " units researched");
  for (i = 0; i < unitObject.length; i++)
  {
    // if class isn't something line "unit archer" then move on
    if (!unitObject[i].className.contains("unit"))
    {
      continue;
    }

    // find unit number to apply these upgrades to
    for (j = 0; j < troopTypes; j++)
    {
      if (unitObject[i].className.contains(troopInfo[j][0].toLowerCase()))
      {
        unitNumber = j;
        break;
      }
    }
    if (j == troopTypes)
    {
      continue;
    }
    
    // look through all images for upgrade icons
    var imgObject = unitObject[i].getElementsByTagName("img");

    for (j = 0; j < imgObject.length; j++)
    {
      if (imgObject[j].src.contains("sword"))
      {
        if (imgObject[j].src.contains("icon1"))
        {
          troopOffenseUpgrade[unitNumber] = 3;
        }
        else if (imgObject[j].src.contains("icon2"))
        {
          troopOffenseUpgrade[unitNumber] = 2;
        }
        else if (imgObject[j].src.contains("icon3"))
        {
          troopOffenseUpgrade[unitNumber] = 1;
        }
      }
      if (imgObject[j].src.contains("shield"))
      {
        if (imgObject[j].src.contains("icon1"))
        {
          troopDefenseUpgrade[unitNumber] = 3;
        }
        else if (imgObject[j].src.contains("icon2"))
        {
          troopDefenseUpgrade[unitNumber] = 2;
        }
        else if (imgObject[j].src.contains("icon3"))
        {
          troopDefenseUpgrade[unitNumber] = 1;
        }
      }
    }
  }

  // save upgrades to local memory
  
  for (i = 0; i < troopTypes; i++)
  {
    GM_log(troopInfo[i][0] + troopOffenseUpgrade[i] + troopDefenseUpgrade[i]);
  }

  // for example, for bronze attack upgrade:
  for (i = 0; i < troopTypes; i++)
  {
    GM_setValue("unit" + i + "offense", troopOffenseUpgrade[i]);
    GM_setValue("unit" + i + "defense", troopDefenseUpgrade[i]);
  }
}



// load upgrade information that was stored earlier
function loadUpgrades()
{
  var i;
  for (i = 0; i < troopTypes; i++)
  {
    troopOffenseUpgrade[i] = GM_getValue("unit" + i + "offense", 0);
    troopDefenseUpgrade[i] = GM_getValue("unit" + i + "defense", 0);
  }
}



// read the town wall level from the city view
function readTownWall()
{
  var wallObject = document.getElementById("position14");
  
  if (wallObject.className != "wall")
  {
    townWallLevel = 0;
  }
  else
  {
    var wallTitle = wallObject.getElementsByTagName("a")[0].title.split(" ")
    townWallLevel = parseInt(wallTitle[wallTitle.length - 1]);
  }
  
  // save this
  GM_setValue("townWallLevel", townWallLevel);
}



// load town wall level from memory
function loadTownWall()
{
  townWallLevel = GM_getValue("townWallLevel", 0);
}



// is in barracks (for army upgrades)
function isBarracksView()
{
  return (document.getElementsByTagName("body")[0].id == "barracks");
}



// is in town (to read town wall level)
function isCityView()
{
  return (document.getElementsByTagName("body")[0].id == "city");
}



// script calls and executes this routine
function init() 
{

  // if we're in the barracks, look at upgrades
  if (isCityView())
  {
    readTownWall();
  }


  // if we're in the barracks, look at upgrades
  if (isBarracksView())
  {
    readUpgrades();
  }
   

  // if we're viewing our army, calculate stuff
  if (isMilitaryArmyView())
  {

    loadTownWall();
    loadUpgrades();

    readTroopNumbers();

    addArmySummary();

  }
  
}


// call the init procedure
init();
