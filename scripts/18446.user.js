// Weewar Battle Simulator for Greasemonkey
// version 1.0
// updated 1-1-08
// Copyright (c) 2008, Pluto

// ==UserScript==
// @name           Weewar Battle Simulator
// @namespace      plutosforge.com
// @description    finally a greasemonkey in-game simulator
// @include        http://*weewar.com/game/*
// ==/UserScript==

//initialize unit info with defaults
var myAtkUnit = "_001.";
var myAtkNumber = 10;
var myAtkTerrain = "plain.png";

var myDefUnit = "_001.";
var myDefNumber = 10;
var myDefTerrain = "plain.png";

var myBouns = 0;

// the number of times to run the battle simulation - more runs is more accurate, but takes longer
const SIM_NUM = 1000;

var showHideKey = ("battleSim_" + ((/game\/([0-9]*)/g).exec(window.location.href)[1]));
if(!document.getElementById('previewForm'))
{
	drawSim();
	if(GM_getValue(showHideKey,'show') == 'hide') toggleSim('hide');
}

//////////////////////////// Drawing and DOM modification /////////////////////////////////

var attackerTerrainImg;
var attackerUnitImg; 
var attackerQuantImg; 
var defenderTerrainImg;
var defenderUnitImg; 
var defenderQuantImg;
	
function drawSim()
{
	var chatContainer = document.getElementById('chat').parentNode;
	var simWindow = createDOMElement("div",{id:"simWindow", title:"Weewar Battle Simulator (GM) - by Pluto, 2008"},{border:"1px solid #DDDDDD;",marginBottom:"10px"});
	
	var commandLinks = createDOMElement("div",{id:"commandLinks",innerHTML:'<a id="enterSimMode" href="#" onclick="enterSimMode();return false;" style="text-decoration:none; color:#00BF00; margin: 0px 10px 0px 0px;">Enter Sim Mode  </a>' +
																			'<a id="exitSimMode"  href="#" onclick="exitSimMode();return false;"style="text-decoration:none; display:none; color:#BF0000; margin: 0px 10px 0px 0px;">  Exit Sim Mode  </a>' +
																			'<a id="startBattle"  href="#" onclick="startBattle();return false;" style="text-decoration:none; display:none;">Battle! (+0)</a>'+
																			'<a id="simTitle" href="#" style="text-decoration:none; display:none;"> Weewar Battle Simulator (GM)  </a>' +
																			'<a id="hideSim" href="#" onclick="toggleSim(' + "'hide'" + ');return false;" style="text-decoration:none; position:absolute; margin: 0px 0px 0px 142px;"> Hide </a>'+
																			'<a id="secondHideSim" href="#" onclick="toggleSim(' + "'secondHide'" + ');return false;" style="text-decoration:none; position:absolute; margin: 0px 0px 0px 82px; display:none;"> Hide </a>'+
																			'<a id="showSim" href="#" onclick="toggleSim(' + "'show'" + ');return false;" style="text-decoration:none; margin: 0px 0px 0px 57px; display:none;"> Show </a>'},
												{backgroundColor:"#EEE", padding:"3px 3px 5px 3px"});

	var unitsDiv = createDOMElement("div",{innerHTML:'units:'},{position:'absolute;',borderBottom:"1px solid #808080;",margin:"2.5px 0px 0px 2px",width:"273px", zIndex:"2"});
	
	var attackerImages = createDOMElement("div",{id:'attackerImages'},{position:'absolute;',margin:"20px 0px 0px 2px"});
		attackerTerrainImg = createDOMElement("img",{id:'attackerTerrain'},{position:'absolute;'});
		attackerUnitImg = createDOMElement("img",{id:'attackerUnit'},{position:'absolute;'}); 
		attackerQuantImg = createDOMElement("img",{id:'attackerQuant'},{position:'absolute;'});
		appendChildren(attackerImages,attackerTerrainImg,attackerUnitImg,attackerQuantImg);
		
	var defenderImages = createDOMElement("div",{id:'defenderImages'},{position:'absolute;',margin:"54px 0px 0px 2px"});
		defenderTerrainImg = createDOMElement("img",{id:'defenderTerrain'},{position:'absolute;'});
		defenderUnitImg = createDOMElement("img",{id:'defenderUnit'},{position:'absolute;'}); 
		defenderQuantImg = createDOMElement("img",{id:'defenderQuant'},{position:'absolute;'});
		appendChildren(defenderImages,defenderTerrainImg,defenderUnitImg,defenderQuantImg);
		
		defenderUnitImg.src = "/images/red_001.png";
		defenderTerrainImg.src = "/images/plain.png";
		defenderQuantImg.src = "/images/10.png";

		attackerUnitImg.src = "/images/blue_001.png";
		attackerTerrainImg.src = "/images/plain.png";
		attackerQuantImg.src = "/images/10.png";	
	
	var headerRow = buildTableRow([0,1,2,3,4,5,6,7,8,9,10],0,'th','Bonus');
	var attackerResultsRow = buildTableRow([0,0,0,0,0,0,0,0,0,0,0],32,'td','Attacker');
	var defenderResultsRow = buildTableRow([0,0,0,0,0,0,0,0,0,0,0],32,'td','Defender');
	
	var resultsTable = createDOMElement('div',{id:'resultsTable'},{position:"relative",marginLeft:'32px',fontSize:'0.95em',zIndex:"9"});
		resultsTable.innerHTML = '<table><tbody>' + 
									'<tr id="headerRow">' + headerRow + '</tr>' + 
									'<tr id="attackerResultsRow">' + attackerResultsRow + '</tr>' +
									'<tr id="defenderResultsRow">' + defenderResultsRow + '</tr>' +
								 '</tbody></table>';
	
	var resultsSection = document.createElement('div');  resultsSection.id = "resultsSection";
	appendChildren(resultsSection,unitsDiv,attackerImages,defenderImages,resultsTable);
	appendChildren(simWindow,commandLinks,resultsSection);
	chatContainer.parentNode.insertBefore(simWindow,chatContainer);

}
function buildTableRow(contents,height,cellType,side)
{
	var rowString = '';
	for(var col=0; col <= 10; col++)
	{	
		rowString += '<' + cellType + ' width="22" height="' + height + '" align="center">' + '<a href="#" onclick="set' + side + 'Quant(' + col + ');return false;" style="text-decoration:none; color:#000000;">' + contents[col]  +'</a>'+ '</' + cellType + '>';
	}	
	return rowString;
}

//createDOMElement,setStyle,appendChildren functions borrowed from Jason Bunting (sapientdevelopment.com)
function createDOMElement(name, attrs, styleList) { 
  var domElement = document.createElement(name);
  for(var prop in attrs) { domElement[prop] = attrs[prop]; }
  setStyle(domElement, styleList);
  return domElement; 
}
function setStyle(element, styleList) {
  for(var styleName in styleList) { 
  element.style[styleName] = styleList[styleName]; }
}
function appendChildren(element /*, list of children*/) {
  for(var i = 1; i < arguments.length; i++) element.appendChild(arguments[i]);
}

////////////////////////////// Game Interaction ///////////////////////////////

//function registration
unsafeWindow.setAttackerQuant = setAttackerQuant;
unsafeWindow.setDefenderQuant = setDefenderQuant;
unsafeWindow.setBonusQuant = setBonusQuant;
unsafeWindow.toggleSim = toggleSim;
unsafeWindow.enterSimMode = enterSimMode;	
unsafeWindow.exitSimMode = exitSimMode;	
unsafeWindow.startBattle = startBattle;	
unsafeWindow.startSimMode = startSimMode;
unsafeWindow.cordGrabber = cordGrabber;
unsafeWindow.weewarMap._tooltip = unsafeWindow.weewarMap.tooltip;
unsafeWindow.weewarMap.tooltip = unsafeWindow.cordGrabber;
function toggleSim(state)
{
	 if(state == 'hide')
	{
		document.getElementById('hideSim').style.display = 'none;';
		document.getElementById('resultsSection').style.display = 'none;';
		document.getElementById('showSim').style.display = '';	
		document.getElementById('enterSimMode').style.display = 'none;';
		document.getElementById('simTitle').style.display = '';
		GM_setValue(showHideKey,'hide');
		
	}
	else if(state == 'show')
	{
		document.getElementById('hideSim').style.display = '';
		document.getElementById('resultsSection').style.display = '';
		document.getElementById('showSim').style.display = 'none;';	
		document.getElementById('simTitle').style.display = 'none;';
		document.getElementById('enterSimMode').style.display = '';
		GM_setValue(showHideKey,'show');
	} 
	else //second hide
	{
		document.getElementById('simTitle').style.display = '';
		document.getElementById('secondHideSim').style.display = 'none;';
		document.getElementById('showSim').style.display = '';	
		unsafeWindow.weewarMap.setClickFunction( oldClick );
		document.getElementById('exitSimMode').style.display = 'none;';	
		document.getElementById('startBattle').style.display = 'none;';
		document.getElementById('resultsSection').style.display = 'none;';
		GM_setValue(showHideKey,'hide');
	}
	return false;
}
var oldClick;	
function enterSimMode()
{
	setBonusQuant(0);
	oldClick=unsafeWindow.weewarMap.getClickFunction();
	unsafeWindow.weewarMap.setClickFunction( startSimMode );
	document.getElementById('enterSimMode').style.display = 'none;';
	document.getElementById('exitSimMode').style.display = '';	
	document.getElementById('startBattle').style.display = '';
	document.getElementById('hideSim').style.display = 'none;';
	document.getElementById('secondHideSim').style.display = '';
	return false;
}
function exitSimMode()
{	
	unsafeWindow.weewarMap.setClickFunction( oldClick );
	document.getElementById('enterSimMode').style.display = '';
	document.getElementById('exitSimMode').style.display = 'none;';	
	document.getElementById('startBattle').style.display = 'none;';
	document.getElementById('hideSim').style.display = '';
	document.getElementById('secondHideSim').style.display = 'none;';
	return false;
}

var xcord;
var ycord;
function cordGrabber( x, y ) 
{
	xcord = x;
	ycord = y;
	unsafeWindow.weewarMap._tooltip( x,y );
}

var defender = true;
function startSimMode()
{
	defender = !defender;
	var unitTerrain = unsafeWindow.weewarMap.getTerrain(xcord,ycord);
	var unitType = unsafeWindow.weewarMap.getUnit(xcord,ycord)
	var unitQuantId = xcord + '_' + ycord + '_' + 'unitQuantity';
	var unitQuant;
	if(document.getElementById(unitQuantId))
	{
		unitQuant = document.getElementById(unitQuantId).src;
		unitQuant = unitQuant.substring(unitQuant.lastIndexOf('/')+1);
	}
	GM_log('defender?: ' + defender + 'terrain: ' + unitTerrain + ', unit: ' + unitType + ', number: ' + unitQuant);
	
	if(defender)
	{
		defenderUnitImg.src = "/images/" + unitType;
		defenderTerrainImg.src = "/images/" + unitTerrain;
		defenderQuantImg.src = "/images/" + unitQuant;
		
		myDefUnit = unitType;
		myDefNumber = parseInt(unitQuant.substring(0,unitQuant.indexOf('.')));
		myDefTerrain = unitTerrain;
	}
	else
	{
		attackerUnitImg.src = "/images/" + unitType;
		attackerTerrainImg.src = "/images/" + unitTerrain;
		attackerQuantImg.src = "/images/" + unitQuant;
		
		myAtkUnit = unitType;
		myAtkNumber = parseInt(unitQuant.substring(0,unitQuant.indexOf('.')));
		myAtkTerrain = unitTerrain;
	}
}

function setAttackerQuant(newQuant)
{
	attackerQuantImg.src = "/images/" + newQuant + ".png";
	myAtkNumber = newQuant;
}
function setDefenderQuant(newQuant)
{	
	defenderQuantImg.src = "/images/" + newQuant + ".png";
	myDefNumber = newQuant;
}
function setBonusQuant(newQuant)
{
	document.getElementById('startBattle').innerHTML = 'Battle! (+' + newQuant +')'
	myBonus = newQuant;
}

//////////////////////////////// Unit Stats ///////////////////////////////////

var softType_colIndex = 0;
var hardType_colIndex = 1;
var airType_colIndex = 2;
var speedboatType_colIndex = 3;
var amphibicType_colIndex = 4;
var subType_colIndex = 5;
var boatType_colIndex = 6;
var defenseStrength_colIndex = 7; 

var terrainAtkStats = new Array();  
terrainAtkStats["airfield"] =  [  2,  0,  3,  0,  0, -2,  0];
terrainAtkStats["city"] =      [  2,  0,  0,  0,  0,  0,  0];
terrainAtkStats["desert"] =    [ -1,  0,  0,  0,  0,  0,  0];
terrainAtkStats["harbor"] =    [  2,  0,  0,  0,  0, -2,  0];
terrainAtkStats["mountain"] =  [  2,-10,  0,  0,  0,  0,  0];
terrainAtkStats["plain"] =     [  0,  0,  0,  0,  0,  0,  0];
terrainAtkStats["repairshop"] =[  0,  0,  0,  0,  0,  0,  0];
terrainAtkStats["swamp"] =     [ -1, -1,  0,  0,  0,  0,  0];
terrainAtkStats["water"] =     [-10,-10,  0,  0,  0,  0,  0];
terrainAtkStats["forest"] =    [  2,  0,  0,  0,  0,  0,  0];

var terrainDefStats = new Array(); 
terrainDefStats["airfield"] =  [  2, -1,  3,  0, -1, -1, -1];
terrainDefStats["city"] =      [  2, -1,  0,  0,  0,  0,  0];
terrainDefStats["desert"] =    [ -1,  0,  0,  0,  0,  0,  0];
terrainDefStats["harbor"] =    [  2, -1,  0,  0, -1, -1, -1];
terrainDefStats["mountain"] =  [  4,-10,  0,  0,  0,  0,  0];
terrainDefStats["plain"] =     [  0,  0,  0,  0,  0,  0,  0];
terrainDefStats["repairshop"] =[ -6, -6,  0,  0,  0,  0,  0];
terrainDefStats["swamp"] =     [ -2, -2,  0,  0,  0,  0,  0];
terrainDefStats["water"] =     [-10,-10,  0,  0,  0,  0,  0];
terrainDefStats["forest"] =    [  3, -3,  0,  0,  0,  0,  0];

var attackStats = new Array();
							   //soft,   hard,    air, speed, amph,   sub,   boat,     def
attackStats["antiair"] =   	   [  8,  3,  9,  3,  3,  0,  3,  4]; // antiair
attackStats["004"] = 		   [  8,  6,  6,  6,  6,  0,  6,  6]; // assault artillery
attackStats["battleship"] =    [ 10, 14,  6, 14, 14,  4, 14, 14]; // battleship
attackStats["007"] =  		   [ 14, 16,  0, 14, 14,  0, 14, 14]; // berserker
attackStats["bomber"] =        [ 14, 14,  0, 14, 14,  0, 14, 10]; // bomber
attackStats["010"] =           [ 16, 14,  0, 14, 14,  0, 14,  4]; // DFA
attackStats["destroyer"] =     [ 10, 10, 12, 12, 12, 16, 10, 12]; // destroyer
attackStats["009"] =  		   [ 12, 10,  0, 10, 10,  0, 10,  4]; // heavy artillery
attackStats["006"] =   		   [ 10, 12,  0, 10, 10,  0, 10, 14]; // heavy tank
attackStats["002"] =   		   [  6,  8,  6,  8,  8,  0,  8,  6]; // heavy trooper
attackStats["heli"] =  		   [ 16, 10,  6, 12, 12,  0,  8, 10]; // helicopter
attackStats["hovercraft"] =    [ 10,  6,  0,  8, 10,  0,  6,  8]; // hovercraft
attackStats["jet"] =           [  6,  8, 16,  6,  6,  0,  6, 12]; // jet
attackStats["008"] = 		   [ 10,  4,  0,  4,  4,  0,  4,  3]; // light artillery
attackStats["003"] =   	       [ 10,  4,  4,  4,  8,  0,  4,  8]; // raider
attackStats["speedboat"] =     [  8,  6,  6, 10, 16,  0,  6,  6]; // speedboat
attackStats["sub"] =           [  0,  0,  0,  0,  0, 10, 16, 10]; // sub
attackStats["005"] =           [ 10,  7,  0,  7,  7,  0,  7, 10]; // tank
attackStats["001"] =   	       [  6,  3,  0,  3,  3,  0,  3,  6]; // trooper
attackStats["capturing"] =     [  0,  0,  0,  0,  0,  0,  0,  2]; // capturing

function getUnitTypeCol(thisUnit)
{
	var unitType_colIndex;
	if (thisUnit.indexOf("antiair") > -1 || thisUnit.indexOf("004") > -1 || thisUnit.indexOf("007") > -1 || thisUnit.indexOf("010") > -1 || thisUnit.indexOf("009")  > -1 || thisUnit.indexOf("006") > -1 || thisUnit.indexOf("008") > -1 || thisUnit.indexOf("003") > -1 || thisUnit.indexOf("005") > -1){
		unitType_colIndex = hardType_colIndex;
	}
	else if (thisUnit.indexOf("002") > -1 || thisUnit.indexOf("001") > -1 ||  thisUnit.indexOf("capturing") > -1){
		unitType_colIndex = softType_colIndex;
	}
	else if (thisUnit.indexOf("hovercraft") > -1){
		unitType_colIndex = amphibicType_colIndex;
	}
	else if (thisUnit.indexOf("battleship") > -1 || thisUnit.indexOf("destroyer") > -1 ){
		unitType_colIndex = boatType_colIndex;
	}
	else if (thisUnit.indexOf("bomber") > -1 || thisUnit.indexOf("heli") > -1 || thisUnit.indexOf("jet") > -1){
		unitType_colIndex = airType_colIndex;
	}
	else if (thisUnit.indexOf("sub") > -1){
		unitType_colIndex = subType_colIndex;
	}
	else if (thisUnit.indexOf("speedboat") > -1){
		unitType_colIndex = speedboatType_colIndex;
	}
	else{
		GM_log("did not find a unit type in fucntion getUnitTypeCol");
	}
		
	return unitType_colIndex;
}

////////////////////////////// Simulation Algorithms ////////////////////////////////////
 
//arrays for storing battle results
var attackerUnitsLeft = new Array();
var defenderUnitsLeft = new Array();

function clean(fileName)
{
	return fileName.substring(fileName.indexOf('_')+1,fileName.indexOf('.'))
}

function startBattle()
{
	var attackerAttackStrength = attackStats[clean(myAtkUnit)][getUnitTypeCol(myDefUnit)];
	var defenderAttackStrength = attackStats[clean(myDefUnit)][getUnitTypeCol(myAtkUnit)]; 

	var attackerTerrainAttackStat = terrainAtkStats[clean(myAtkTerrain)][getUnitTypeCol(myAtkUnit)];
	var attackerTerrainDefenseStat = terrainDefStats[clean(myAtkTerrain)][getUnitTypeCol(myAtkUnit)]; 

	var defenderTerrainAttackStat = terrainAtkStats[clean(myDefTerrain)][getUnitTypeCol(myDefUnit)];
	var defenderTerrainDefenseStat = terrainDefStats[clean(myDefTerrain)][getUnitTypeCol(myDefUnit)]; 

	var attackerDefense = attackStats[clean(myAtkUnit)][defenseStrength_colIndex];  
	var defenderDefense = attackStats[clean(myDefUnit)][defenseStrength_colIndex];  
	
	var attackerAttackP = 0.05 * (((attackerAttackStrength + attackerTerrainAttackStat) - (defenderDefense + defenderTerrainDefenseStat)) + myBonus) + 0.5;
	var defenderAttackP = 0.05 * (((defenderAttackStrength + defenderTerrainAttackStat) - (attackerDefense + attackerTerrainDefenseStat))) + 0.5;

	if (attackerAttackP < 0 || myAtkUnit.indexOf("capturing") > -1){ attackerAttackP = 0; } 
	else if (attackerAttackP > 1){ attackerAttackP = 1;	}
	
	if (defenderAttackP < 0 || myDefUnit.indexOf("capturing") > -1){ defenderAttackP = 0; } 
	else if (defenderAttackP > 1){ defenderAttackP = 1;	}
 
	// initialize the units-left storage arrays
	attackerUnitsLeft = [0,0,0,0,0,0,0,0,0,0,0];
	defenderUnitsLeft = [0,0,0,0,0,0,0,0,0,0,0];
	
	//run the battle algorithm as many times as specified in SIM_NUM
	for (var i = 0; i < SIM_NUM; i++)
	{
		attackerUnitsLeft[runHitSim(defenderAttackP,myDefNumber,myAtkNumber)]++;
		defenderUnitsLeft[runHitSim(attackerAttackP,myAtkNumber,myDefNumber)]++;
	}
	
	GM_log(attackerUnitsLeft + '|' + defenderUnitsLeft);	
	
	for(var r = 0; r <= 10; r++)
	{
		attackerUnitsLeft[r] = Math.round(attackerUnitsLeft[r]/SIM_NUM*100);		
		defenderUnitsLeft[r] = Math.round(defenderUnitsLeft[r]/SIM_NUM*100);
	}
	document.getElementById('attackerResultsRow').innerHTML = buildTableRow(attackerUnitsLeft,32,'td','Attacker');
	document.getElementById('defenderResultsRow').innerHTML = buildTableRow(defenderUnitsLeft,32,'td','Defender');			
 
	return false;
}

// the actual game algorithm caps the random number to two decimal points
const  DECIMAL_CAP = 100;  

function runHitSim(thisPvalue,atkNum,defNum)
{	
	var defenderUnitLoss = 0;	
	
	for (var attackerSubUnit = 1; attackerSubUnit <= atkNum; attackerSubUnit++)
	{	// per attacker subunit, the attacker will try out six hits on the defender
		var attackerHits = 0;		
		for (var h = 1; h <= 6; h++)
		{	// a hit is registered if the attacker's pValue is larger than a random number n, where 0.00 < n <= 1.00
			if (Math.floor(Math.random()*(DECIMAL_CAP + 1))/DECIMAL_CAP < thisPvalue){ attackerHits++; }
		}		
		//then the total number of defender units lost is the number of attacker hits divided by 6;
		defenderUnitLoss += attackerHits / 6;		
	}
	//then the total number of defender units left over is the number of starting units minus the number of units lost, rounded down - because you can't destroy a fraction of something.
	var defenderUnitsLeft = defNum - Math.floor(defenderUnitLoss);
	
	if (defenderUnitsLeft < 0){ defenderUnitsLeft = 0; }   // if less than 0, set to 0 to avoid error
	
	return defenderUnitsLeft;
}