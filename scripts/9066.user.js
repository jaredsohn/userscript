// ==UserScript==
// @name		Warmonkey
// @version	1.21
// @namespace		tag:.www.ardi.lv,2007-01-01:Warmonkey.
// @description		Enhances warshire =X
// @include		http://*warshireonline.com/Human/*
// @author		Ryuukia(nethamster@gmail.com)
// @author		Pinky(YIM: lvtrii)
// ==/UserScript==
//Comments:
/* Thanks for backbone and idea to Evo+ script authors :). evo+ Script: http://nod.leviathan-flow.net/smf/index.php?action=tpmod;dl=cat2
 * 
 */
//TO-DO:
/*****!!!!Double check if you have set version info correctly! Don't forget to comment out debug lines when you release!!!!
 * V1.0++ options: no need for them yet or maybe...
 * [1st]Make balloon to auto-resize.
 *****!!!!Double check if you have set version info correctly! Don't forget to comment out debug lines when you release!!!!
 */
//////////////////////////////////////////////////////////////////////////////
// ***************************************************************************
// **Initialization.
// ***************************************************************************
//
// Page handlers.
var pageHandlers = [];
// Some globals.
//var content = null;
//For Warmonkey's infobox.
var WMInfoTitle = null;
var WMInfoHTML = null;
//Player stats.
var pGold = null;
var pPopulation = null;
var pPower = null;
var pPlains = null;
var pForests = null;
var pMountains = null;
//Constants.
const WMVersion = "1.21";
//Colours.
var primaryColor = 'chartreuse';
//InfoBox's strings.
var helpAutofill = '<p>Values with <font color="'+primaryColor+'">color</font> when clicked are autofilled into corresponding fields. Saves you typing.</p>';
var helpUserInput = '<p>As in most pages input fields accept values such as "1k","39k","1m","9mil"</p>';
var helpAdvancedAutofill = '<p>* This page uses advanced autofill which also automatically calculates how much more you can buy. Try changing values and you will see how it works.</p>';
//
// ***************************************************************************
// **Page Handlers
// ***************************************************************************
//
regPageHandler(/^\/Human\/(build.php)?$/i,  userInputParser);
regPageHandler(/^\/Human\/(razebuild.php)?$/i,  userInputParser);
regPageHandler(/^\/Human\/(explore.php)?$/i,  userInputParser);
regPageHandler(/^\/Human\/(caravan.php)?$/i,  userInputParser);
regPageHandler(/^\/Human\/(market.php)?$/i,  userInputParser);
regPageHandler(/^\/Human\/(senate.php)?$/i,  userInputParser);
regPageHandler(/^\/Human\/(hsubunits.php)?$/i,  userInputParser);
regPageHandler(/^\/Human\/(military.php)?$/i,  userInputParser);
regPageHandler(/^\/Human\/(blackops.php)?$/i,  userInputParser);
regPageHandler(/^\/Human\/(smelter.php)?$/i,  userInputParser);
regPageHandler(/^\/Human\/(kmanage.php)?$/i,  userInputParser);

function userInputParser() {
	//Parses user input for xK, xMil, xMill -> 2k = 2000 .
	var inputs = document.evaluate('//input[@type="text"]',content, null, 0, null);
	var nInput;
	while(nInput = inputs.iterateNext()) {
		addUserInputParser(nInput);
	}
}

regPageHandler(/^\/Human\/(monsterranch.php)?$/i,  wsMonsterranch);
function wsMonsterranch() {
	var nBs = document.getElementsByTagName("b");
	if ((nBs.length == 8) && (!xpath('//input[@size="3"]',content,true))) {
		addAutofill(nBs[4],nBs[4].textContent,xpath('//input[@type="text"]',content,true));
	}
	if ((nBs.length == 8) && (xpath('//input[@size="3"]',content,true))) {
		addAutofill(nBs[5],nBs[5].textContent,xpath('//input[@size="3"]',content,true));
	}
	if (nBs.length == 7) {
		addAutofill(nBs[4],nBs[4].textContent,xpath('//input[@size="3"]',content,true));
	}
	WMInfoTitle = "Help -> Monster Ranches"
	WMInfoHTML = helpAutofill + helpUserInput;
}

regPageHandler(/^\/Human\/(magiguild.php)?$/i,  wsMagiguild);
function wsMagiguild() {
	var nBs = content.getElementsByTagName("b");
	if ((nBs) && (nBs[4])) {
		addAutofill(nBs[4],nBs[4].textContent,xpath('//input[@size="10"]',content,true));
	}
	WMInfoTitle = "Help -> Magi Guild -> Spellcasting"
	WMInfoHTML = helpAutofill + helpUserInput;
}

regPageHandler(/^\/Human\/(market.php)?$/i,  wsMarket);
function wsMarket() {
	var maxBid = xpath("//tr/td[starts-with(.,'\n\tMax')]",document,true);
	var minBid = xpath("//tr/td[starts-with(.,'\n\tMin')]",document,true);
	if (maxBid) {
		addAutofill(maxBid.parentNode.cells[1],maxBid.parentNode.cells[1].textContent,xpath('//input[@type="text"]',content,true));
		addAutofill(minBid.parentNode.cells[1],minBid.parentNode.cells[1].textContent,xpath('//input[@type="text"]',content,true));
	}
	WMInfoTitle = "Help -> Marketplace"
	WMInfoHTML = helpAutofill + helpUserInput;
	
}

regPageHandler(/^\/Human\/(structures.php)?$/i,  wsStructures);
function wsStructures() {
	//Grab resources
	var pResources = [];
	var tmpStats = content.getElementsByTagName('table')[2].getElementsByTagName("td");
	//Add resources to array in the same order as shown in table -> plains,forests,mountains,lumber, etc..
	pResources.push(rNum2Int(tmpStats[1].textContent));
	pResources.push(rNum2Int(tmpStats[3].textContent));
	pResources.push(rNum2Int(tmpStats[5].textContent));
	tmpStats = content.getElementsByTagName('table')[1].getElementsByTagName("td");
	pResources.push(pGold);	
	pResources.push(rNum2Int(tmpStats[1].textContent));
	pResources.push(rNum2Int(tmpStats[3].textContent));
	pResources.push(rNum2Int(tmpStats[7].textContent));
	pResources.push(rNum2Int(tmpStats[9].textContent));
	pResources.push(rNum2Int(tmpStats[5].textContent));
	
	var structuresTable = content.getElementsByTagName('table')[3];
	
	var stRows = document.evaluate('//td[2]/center/table/tbody/tr/td/table/tbody/tr[not(@bgcolor)]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var cRow, result;
	for (var i = 0; i < stRows.snapshotLength; i++) {
 	cRow = stRows.snapshotItem(i);
		if (cRow.cells[0].getAttribute("colspan") !=10) {
			if (cRow.cells[0].textContent.search(/BUILT/) !=-1) {
				cRow.id ="wmBuilt";
				cRow.style.textDecoration ="line-through";
				cRow.style.color ="darkgrey"
			}
			else {
				cRow.cells[0].childNodes[1].style.color = "white";
				cRow.cells[0].style.textDecoration = "underline";
				for (var u = 1; u < 10; u++) {
					result =  rNum2Int(cRow.cells[u].textContent) -pResources[u-1];
					if (result <= 0) {
						cRow.cells[u].style.color = primaryColor;
					}
					else {
						cRow.cells[u].style.color = "red";
						cRow.cells[u].title = "You need: "+cRow.cells[u].textContent
						cRow.cells[u].textContent = '-'+int2RNum(result);
					}
				} 
			}
		}
	}
	var onClick = function() {
		var myRows = document.evaluate('//tr[@id="wmBuilt"]',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < myRows.snapshotLength; i++) {
			var myRow = myRows.snapshotItem(i);
			if (myRow.style.display == "none"){
				myRow.style.display = "";
			}
			else {
				myRow.style.display = "none";
			}
		}
	};
	var nDiv = document.createElement("div");
	var nCheck = document.createElement("input");
	nCheck.setAttribute("type","checkbox");
	nDiv.appendChild(nCheck);
	nDiv.appendChild(document.createTextNode("Hide already built buildings."));
	nDiv.style.textAlign= "left";
	nDiv.style.color= primaryColor;
	stRows.snapshotItem(1).cells[0].appendChild(nDiv);
	nCheck.addEventListener('click', onClick, false);
	WMInfoTitle = "Help -> Structures";
	WMInfoHTML = '<p><font color="'+primaryColor+'">Color</font> shows that you have enough of that resource type. The value shows how much of the resource type it will cost you to buy that building.</p>'
	+'<p><font color="red">Color</font> shows that you do not have enough of that resource type. The value shows how much you are lacking to buy that building. If you will hover your mouse over the value you will see how much of the resource type that building cost.</p>';	
}

regPageHandler(/^\/Human\/(razebuild.php)?$/i,  wsRazebuild);
function wsRazebuild() {
	//onClick; onBlur: Refreshed max cells
	var razeTables = content.getElementsByTagName('table');
	function refreshMaxCells(content) {
		var tmpGold = pGold;
		var razeTables = content.getElementsByTagName('table');
		var razeCost, i,u;
		var data = [[],[],[]];
		var avalLand = [[],[],[]];
		for(u = 0; u < (razeTables.length); u++ ) {
			razeCost = razeTables[u].getElementsByTagName("b")[0].textContent.replace(/,/g,'');	
			for(i = 0; i < (razeTables[u].rows.length); i++ ) {
				if ((razeTables[u].rows[i].cells.length == 5) && (razeTables[u].rows[i].cells[4].getElementsByTagName('input')[0])) {
					avalLand[u][i] = razeTables[u].rows[i].cells[1].textContent.replace(/,/g,'');
					if (avalLand[u][i] > 9999){ avalLand[u][i] = 9999;}				
					unitsOrdered = Number(razeTables[u].rows[i].cells[4].getElementsByTagName('input')[0].value);
					if( isNaN(unitsOrdered) ) { unitsOrdered = 0; }
					totalUnitCost = razeCost * unitsOrdered;
					if ((totalUnitCost > tmpGold ) || ( unitsOrdered > avalLand[u][i])) {
						data[u][i] = true;
					}
					else {
						avalLand[u][i] -= unitsOrdered;
						tmpGold -= totalUnitCost;
						data[u][i] = false;
					}
				}
			}
		}
		for(u = 0; u < (razeTables.length); u++ ) {
			for(i = 0; i < (razeTables[u].rows.length); i++ ) {
				if ((razeTables[u].rows[i].cells.length == 5) && (razeTables[u].rows[i].cells[4].getElementsByTagName('input')[0])) {
					razeCost = razeTables[u].getElementsByTagName("b")[0].textContent.replace(/,/g,'');
					maxUnitsAvailable = Math.min(Math.floor( Number(tmpGold) / Number(razeCost)), Number(avalLand[u][i]));
					if (maxUnitsAvailable <= 0) {maxUnitsAvailable = 0;}
					unitsOrdered = Number(razeTables[u].rows[i].cells[4].getElementsByTagName('input')[0].value);
					razeTables[u].rows[i].cells[3].firstChild.data = String(data[u][i]  ? maxUnitsAvailable : (maxUnitsAvailable + unitsOrdered));
					razeTables[u].rows[i].cells[3].style.color = data[u][i] ? 'red' : primaryColor;
				}
			}
		}			
	}
	//onBlur handler for input cell.
	var onBlur = function() { refreshMaxCells(content); };
	//onClick handler for max cell.
	onClick = function (e) {
		this.parentNode.getElementsByTagName('input')[0].value = this.innerHTML.replace(/,/g,'');
		refreshMaxCells(content);
	};
	for(u = 0; u < (razeTables.length); u++ ) {
		for( var i = 0; i < (razeTables[u].rows.length); i++ ) {
			if ((razeTables[u].rows[i].cells.length == 5) && (razeTables[u].rows[i].cells[4].getElementsByTagName('input')[0])) {
				razeTables[u].rows[i].cells[3].addEventListener('click', onClick, false);
				razeTables[u].rows[i].cells[4].getElementsByTagName('input')[0].addEventListener('blur', onBlur, false);
			}
		}
	}
	refreshMaxCells(content);
	WMInfoTitle = "Help -> Raze Buildings"
	WMInfoHTML = helpAutofill + helpUserInput + helpAdvancedAutofill;	
	
}
regPageHandler(/^\/Human\/(blackops.php)?$/i,  wsBlackops);
function wsBlackops() {
	//Attach autofill.
	var thieves = xpath("//b[3]",content,true);
	if (thieves) {
		addAutofill(thieves,thieves.textContent,xpath('//input[@size="10"]',content,true));
	}
	WMInfoTitle = "Help -> Thieves Guild"
	WMInfoHTML = helpAutofill + helpUserInput;
}
regPageHandler(/^\/Human\/(vkingdom.php)?$/i,  wsVkingdom);
function wsVkingdom() {
	//Target the right table.
	var kingdomsTable = content.getElementsByTagName('table')[1];
	var cPower, myRow, startRow;
	startRow = 2;
	if (kingdomsTable.getElementsByTagName('img')[0]) {startRow = 3;}
	//For each country....
	for(var i = startRow; i < kingdomsTable.rows.length - 3; i++ ) {
		myRow = kingdomsTable.rows[i];
		//If it's not tribe..
		if (myRow.cells[5].textContent.match(/Unknown/)) {	
			myRow.cells[5].innerHTML = "<font color='" + primaryColor + "'><b>Unknown</b></font>";
		}
		else {
			cPower = rNum2Int(myRow.cells[5].textContent);
			if ((cPower > (pPower*(1/3))) && ((pPower > (cPower*(1/3))))) {
				myRow.cells[5].innerHTML = ' <font color="' + primaryColor + '"><b>'+int2RNum(cPower)+'</b></font>';
			}
		}
	}
	//Navigation via keyboard
	onKeyDown = function(e) {
		var path;
		//Left
		if (e.keyCode == 37) {
			path = '//a[text()="<<"]';
		}
		//Right
		if (e.keyCode == 39) {
			path = '//a[text()=" >>"]';			
		}
		if (path) {
			var nA = document.evaluate(path,content, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
			document.location = nA.href;
		}
	};
	document.addEventListener('keydown', onKeyDown, false);
	WMInfoTitle = "Help -> View Kingdoms";
	WMInfoHTML = '<p>Countries with power colored <font color="' + primaryColor + '">green</font> has [+/-] 33% of your power, therefore you can attack them.';
	WMInfoHTML += '<p>You can navigate to previous/next kingdom using keyboard keys [rigth] and [left].</p>'
}

regPageHandler(/^\/Human\/(explore.php)?$/i,  wsExplore);
function wsExplore() {
	//Get right table.
	var explorationTable = content.getElementsByTagName('table')[1];
	//Insert new cell to hold max values.
	explorationTable.rows[2].insertCell(1).innerHTML="Max:"
	function refreshMaxCells(explorationTable) {
		var tmpGold = pGold;
		var data = [,,,[],[],[]]; //Another hax =((
		var expData = explorationTable.rows[1].cells[0].getElementsByTagName('b');
		data[3]["price"] = expData[0].innerHTML.replace(/,/g,'');
		data[4]["price"] = expData[1].innerHTML.replace(/,/g,'');
		data[5]["price"] = expData[2].innerHTML.replace(/,/g,'');
		data[3]["max"] = expData[3].innerHTML.replace(/,/g,'');
		data[4]["max"] = expData[4].innerHTML.replace(/,/g,'');
		data[5]["max"] = expData[5].innerHTML.replace(/,/g,'');	
		for(var i = 3; i < (explorationTable.rows.length); i++ ) {
			var landOrdered,totalLandCost;
			landOrdered = Number(explorationTable.rows[i].cells[1].getElementsByTagName('input')[0].value);			
			if( isNaN(landOrdered) ) { landOrdered = 0; }
			totalLandCost = data[i]["price"] * landOrdered;
			if ((totalLandCost > tmpGold) || ( landOrdered > data[i]["max"])) {
				data[i]["tooMuch"] = true;
			}
			else {
				tmpGold = tmpGold - totalLandCost;
				data[i]["max"] = data[i]["max"] - landOrdered;
				data[i]["tooMuch"] = false;
			}			
		}
		for(i = 3; i < (explorationTable.rows.length); i++ ) {
				var landOrdered,maxLandAvailable;
				maxLandAvailable = Math.min((Math.floor( Number(tmpGold) / Number(data[i]["price"]))), Number(data[i]["max"]));
				landOrdered = Number(explorationTable.rows[i].cells[1].getElementsByTagName('input')[0].value);
				explorationTable.rows[i].cells[2].firstChild.data = String(data[i]["tooMuch"] ? maxLandAvailable : (maxLandAvailable + landOrdered));
				explorationTable.rows[i].cells[2].style.color = data[i]["tooMuch"] ? 'red' : primaryColor;
		}
	}
	//onBlur handler for input cell.
	var onBlur = function() { refreshMaxCells(explorationTable); };
	//onClick handler for max cell.
	onClick = function (e) {
		this.parentNode.getElementsByTagName('input')[0].value = this.innerHTML.replace(/,/g,'');
		refreshMaxCells(explorationTable);
	};
	for(var i = 3; i < (explorationTable.rows.length); i++ ) {
		explorationTable.rows[i].insertCell(2).innerHTML=" ";
		explorationTable.rows[i].cells[2].addEventListener('click', onClick, false);
		explorationTable.rows[i].cells[1].getElementsByTagName('input')[0].addEventListener('blur', onBlur, false);
	}
	refreshMaxCells(explorationTable);
	WMInfoTitle = "Help -> Explore";
	WMInfoHTML = helpAutofill + helpUserInput + helpAdvancedAutofill;
			
}
	
regPageHandler(/^\/Human\/(hero.php)?$/i,  wsHero);
function wsHero() {
	var tables = content.getElementsByTagName('table');
	var hLink, heroID, heroesTable;
	//If player has no hero..
	if (tables.length === 0){ return; }
	heroesTable = tables[tables.length-1];	
	for(i = 2; i < heroesTable.rows.length; i++) {
		hLink = heroesTable.rows[i].getElementsByTagName("a")[0];
		if (hLink) {
			heroID = hLink.href.match(/(\d+)/);
			hLink.parentNode.parentNode.cells[7].innerHTML += '<a href="hsubunits.php?hname='+heroID[0]+'"><font color="' + primaryColor + '">A</font></a>'+' | '+'<a href="hsubunits.php?command=dismiss&hname='+heroID[0]+'"><font color="' + primaryColor + '">D</font></a>'+' |';
		}
	}
	WMInfoTitle = "Help -> Heroes -> List"
	WMInfoHTML = '<p><font color="red">A</font> stands for Assign Units.</p><p><font color="red">D</font> stands for Dismiss Units.</p>';
}

regPageHandler(/^\/Human\/(hsubunits.php)?$/i,  wsHsubunits);
function wsHsubunits() {
	var theTable = xpath("//center/table",content,true);
	var submit = xpath('//input[@type="submit"]',content,true);
	var cellNr = 2;
	if (submit.value == "Dismiss Units"){
		cellNr = 1;
	}
	for( var i = 3; i < (theTable.rows.length); i++ ) {
		if ((theTable.rows[i].cells.length == 4) && (theTable.rows[i].cells[3].getElementsByTagName('input')[0])) {
			addAutofill(theTable.rows[i].cells[cellNr],theTable.rows[i].cells[cellNr].textContent,theTable.rows[i].cells[3].getElementsByTagName('input')[0]);
		}
	}
	WMInfoTitle = "Help -> Heroes -> Assign/Dismiss"
	WMInfoHTML = helpAutofill + helpUserInput;
}

regPageHandler(/^\/Human\/(build.php)?$/i,  wsBuild);
function wsBuild() {
	function refreshMaxCells(content) {
		var tmpGold = pGold;
		var tmpLumber = content.getElementsByTagName('table')[1].rows[0].cells[1].innerHTML.replace(/,/g,'');
		var tmpStone = content.getElementsByTagName('table')[1].rows[0].cells[3].innerHTML.replace(/,/g,'');
		var tmpIron = content.getElementsByTagName('table')[1].rows[1].getElementsByTagName('table')[0].rows[0].cells[1].innerHTML.replace(/,/g,'');
		var tmpCoal = content.getElementsByTagName('table')[1].rows[1].getElementsByTagName('table')[0].rows[0].cells[3].innerHTML.replace(/,/g,'');
		var i,e;
		var freeLand = [];
		//This will be hella messy T_T.... Note: neeeds re-work.
		var data = [[],[],[]];	
		var tableIdArray = [3, 6, 7];
		for(e=0;e<tableIdArray.length;e++) {
			buildTable = content.getElementsByTagName('table')[tableIdArray[e]];
			goldCost = buildTable.getElementsByTagName('b')[0].innerHTML.replace(/,/g,'');
			secondaryCost = buildTable.getElementsByTagName('b')[1].innerHTML.replace(/,/g,'');
			if (tableIdArray[e] == 7) {
				coalCost = buildTable.getElementsByTagName('b')[2].innerHTML.replace(/,/g,'');
				freeLand[e] = buildTable.getElementsByTagName('b')[3].innerHTML.replace(/,/g,'');
			}
			else {
				freeLand[e] = buildTable.getElementsByTagName('b')[2].innerHTML.replace(/,/g,'');
			}			
			for( i = 1; i < (buildTable.rows.length); i++ ) {
					
				if ((buildTable.rows[i].cells.length == 5) && (buildTable.rows[i].cells[4].getElementsByTagName('input')[0])) {				
					buildingsOrdered = Number(buildTable.rows[i].cells[4].getElementsByTagName('input')[0].value);
					if( isNaN(buildingsOrdered) ) { buildingsOrdered = 0;}	
					totalBuildCostGold = goldCost * buildingsOrdered;
					totalBuildCostSecondary = secondaryCost * buildingsOrdered;
					if (tableIdArray[e] == 7) {
						totalBuildCostCoal = coalCost * buildingsOrdered;
					}
					switch (tableIdArray[e]) {
						case 3:
							if ((totalBuildCostGold > tmpGold) || (totalBuildCostSecondary > tmpStone) || ( buildingsOrdered > freeLand[e])) {
								data[e][i] = true;
							}
							else {
								freeLand[e] = freeLand[e] - buildingsOrdered;
								tmpGold = tmpGold - totalBuildCostGold;
								tmpStone = tmpStone - totalBuildCostSecondary;
								data[e][i] = false;
							}
							break;
						case 6:
							if ((totalBuildCostGold > tmpGold) || (totalBuildCostSecondary > tmpLumber) || ( buildingsOrdered > freeLand[e])) {
								data[e][i] = true;
							}
							else {
								freeLand[e] = freeLand[e] - buildingsOrdered;
								tmpGold = tmpGold - totalBuildCostGold;
								tmpLumber = tmpLumber - totalBuildCostSecondary;
								data[e][i] = false;
							}
							break;
						case 7:
							if ((totalBuildCostGold > tmpGold) || (totalBuildCostSecondary > tmpIron) || (totalBuildCostCoal > tmpCoal) || ( buildingsOrdered > freeLand[e])) {
								data[e][i] = true;
							}
							else {
								freeLand[e] = freeLand[e] - buildingsOrdered;
								tmpGold = tmpGold - totalBuildCostGold;
								tmpIron = tmpIron - totalBuildCostSecondary;
								tmpCoal = tmpCoal - totalBuildCostCoal;
								data[e][i] = false;
							}
							break;
						
					}
				}
			}
		}
		for(e=0;e<tableIdArray.length;e++) {
			buildTable = content.getElementsByTagName('table')[tableIdArray[e]];
			goldCost = buildTable.getElementsByTagName('b')[0].innerHTML.replace(/,/g,'');
			secondaryCost = buildTable.getElementsByTagName('b')[1].innerHTML.replace(/,/g,'');
			if (tableIdArray[e] == 7) {
				coalCost = buildTable.getElementsByTagName('b')[2].innerHTML.replace(/,/g,'');
			}
			for(i = 1; i < (buildTable.rows.length); i++ ) {
				if ((buildTable.rows[i].cells.length == 5) && (buildTable.rows[i].cells[4].getElementsByTagName('input')[0])) {
					buildingsOrdered = Number(buildTable.rows[i].cells[4].getElementsByTagName('input')[0].value);
					switch (tableIdArray[e]) {
						case 3:
							maxUnitsAvailable = Math.min(Math.floor( Number(tmpGold) / Number(goldCost)), Number(freeLand[e]),Math.floor( Number(tmpStone) / Number(secondaryCost)));
							break;
						case 6:
							maxUnitsAvailable = Math.min(Math.floor( Number(tmpGold) / Number(goldCost)), Number(freeLand[e]),Math.floor( Number(tmpLumber) / Number(secondaryCost)));
							break;
						case 7:
							maxUnitsAvailable = Math.min(Math.floor( Number(tmpGold) / Number(goldCost)), Number(freeLand[e]),Math.floor(Number(tmpIron) / Number(secondaryCost)),Math.floor( Number(tmpCoal) / Number(coalCost)));
							break;						
					}
				if (maxUnitsAvailable <= 0) {maxUnitsAvailable = 0;}
				buildTable.rows[i].cells[3].firstChild.data = String(data[e][i] ? maxUnitsAvailable : (maxUnitsAvailable + buildingsOrdered));
				buildTable.rows[i].cells[3].style.color = data[e][i] ? 'red' : primaryColor;
				}
			}
		}			
	}
	//onBlur handler for input cell..
	var onBlur = function() {
		refreshMaxCells(content);
		var wmBaloon = document.getElementById("wmBaloon");
		wmBaloon.style.display = "none";
	};
	//onKeyPress handler for input cell..
	var onKeyPress = function() {
		var wmBaloon = document.getElementById("wmBaloon");
		var mText;
		eval(this.getAttribute("eval"));
		wmBaloon.innerHTML = mText;
		
	};
	//onFocus handler for input cell..
	var onFocus = function() {
		function findPos(obj) {
			var curleft = curtop = 0;
			if (obj.offsetParent) {
				curleft = obj.offsetLeft
				curtop = obj.offsetTop
				while (obj = obj.offsetParent) {
					curleft += obj.offsetLeft
					curtop += obj.offsetTop
				}
			}
			return [curleft,curtop];
		}
		var wmBaloon = document.getElementById("wmBaloon");
		wmBaloon.style.position="absolute";
		wmBaloon.style.display = "block";
		wmBaloon.style.left = (findPos(this)[0]+55)+"px";
		wmBaloon.style.top = (findPos(this)[1])+"px";
		var mText;
		curInput = this;
		eval(this.getAttribute("eval"));
		wmBaloon.innerHTML = mText;		
	}
	//onClick handler for max cell.
	onClick = function (e) {
		this.parentNode.getElementsByTagName('input')[0].value = this.innerHTML.replace(/,/g,'');
		refreshMaxCells(content);
	};	
 	function smallCycle(element, index, array) {
		//Hotfix for autofill bug.
		var houseRow, barrackRow;
		//Set house size.
		var houseSize = 100;
		//Set barracks size.
		var barrackSize = 75;
		var evalText;
		var buildTable = content.getElementsByTagName('table')[element];
		for (var i = 1; i < (buildTable.rows.length); i++ ) {
			if ((buildTable.rows[i].cells.length == 5) && (buildTable.rows[i].cells[4].getElementsByTagName('input')[0])) {
				var curRow = buildTable.rows[i];
				curInput = curRow.cells[4].getElementsByTagName('input')[0];
				var goldCost = new Array();
				var secondaryCost = new Array();
				goldCost[element] = buildTable.getElementsByTagName('b')[0].innerHTML.replace(/,/g,'');
				secondaryCost[element] = buildTable.getElementsByTagName('b')[1].innerHTML.replace(/,/g,'');
				switch(curRow.cells[0].innerHTML) {
					case "Advanced Housing":
						//Change house size.
						houseSize = 150;
					case "Housing":
						houseRow = i+1;
						//How much houses do we have?
						var houses = rNum2Int(curRow.cells[1].innerHTML);
						//Calculate max capacity of houses.	 
						var maxHoused = houses * houseSize;
						//Show capacity bar.
						var houseProc = Math.round((pPopulation / maxHoused) * 100);
						houses = int2RNum(houses);
						if (houseProc < 71) {
							curRow.cells[1].innerHTML = '<font color="#29D900">'+houses+'</font><table cellspacing="0" style="height: 10px; width: 150px; border: 1px solid orange;"><tbody><tr><td bgcolor="#29D900" width="'+houseProc+'%" ></td><td></td></tr></tbody></table>';
						}
						else if ( houseProc < 91) {
							curRow.cells[1].innerHTML = '<font color="#FD9315">'+houses+'</font><table cellspacing="0" style="height: 10px; width: 150px; border: 1px solid orange;"><tbody><tr><td bgcolor="#FD9315" width="'+houseProc+'%" ></td><td></td></tr></tbody></table>';
						}
						else if ( houseProc < 100) {
							curRow.cells[1].innerHTML = '<font color="red">'+houses+'</font><table cellspacing="0" style="height: 10px; width: 150px; border: 1px solid orange;"><tbody><tr><td bgcolor="red" width="'+houseProc+'%" ></td><td></td></tr></tbody></table>';
						}
						else {
							curRow.cells[1].innerHTML = '<font color="red">'+houses+'</font><table cellspacing="0" style="height: 10px; width: 150px; border: 1px solid orange;"><tbody><tr><td bgcolor="red" width="100%" ></td></tr></tbody></table>';
						}
						//If building new houses, show amount of new free speces.
						var housesBuilding = rNum2Int(curRow.cells[2].innerHTML);
						if (housesBuilding !== 0) {
							curRow.cells[2].innerHTML = '<div><font color="'+primaryColor+'" title="+'+(housesBuilding * houseSize)+' pop">'+housesBuilding+'</font></div>';
						}
						evalText = "<font color=\"blue\">+ <b>'+int2RNum(curInput.value * houseSize)+'</b> population</font><br />";
						evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * goldCost)+'</b> gold</font><br />";
						evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * secondaryCost)+'</b> stone</font><br />";
						curInput.setAttribute("eval","houseSize="+houseSize+";goldCost="+goldCost[element]+";secondaryCost="+secondaryCost[element]+";mText='"+evalText+"';");
						break;
					case "Fortifications":
						evalText = "<font color=\"blue\">+ <b>'+int2RNum(curInput.value * 5)+'</b>dmg</font><br />";
						evalText += "<font color=\"blue\">+ <b>'+int2RNum(curInput.value * 10)+'</b>(<b>'+int2RNum(curInput.value * 15)+'</b>)def</font><br />";
						evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * goldCost)+'</b> gold</font><br />";
						evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * secondaryCost)+'</b> stone (lumber)</font><br />";
						curInput.setAttribute("eval","houseSize="+houseSize+";goldCost="+goldCost[element]+";secondaryCost="+secondaryCost[element]+";mText='"+evalText+"';");
						break;
					case "Blacksmith":
						evalText = "<font color=\"blue\">+ <b>'+int2RNum(curInput.value * 5)+'</b>(<b>'+int2RNum(Math.round(curInput.value * 7.5))+'</b>) prod/tick</font><br />";
						evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * goldCost)+'</b> gold</font><br />";
						evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * secondaryCost)+'</b> stone</font><br />";
						curInput.setAttribute("eval","houseSize="+houseSize+";goldCost="+goldCost[element]+";secondaryCost="+secondaryCost[element]+";mText='"+evalText+"';");						
						break;					 	
					case "Advanced Barracks":
						//Change barracks size.
						barrackSize = 112.5;
					case "Barracks":
						barrackRow = i +1;
						//Number of Barracks.
						var barracks = rNum2Int(curRow.cells[1].innerHTML);
						//Calculate max capacity of barracks.	
						var maxBarracked = barracks * barrackSize;
						//Calculated maximum army size.
						var maxTroops = Math.round(pPopulation * 0.35);
						//Calculate capacity procentage and show capcity bar.
						var barrackProc = Math.round((maxTroops / maxBarracked) * 100);
						int2RNum(barracks);
						if (barrackProc < 71) {
							curRow.cells[1].innerHTML = '<font color="#29D900">'+barracks+'</font><table cellspacing="0" style="height: 10px; width: 150px; border: 1px solid orange;"><tbody><tr><td bgcolor="#29D900" width="'+barrackProc+'%" ></td><td></td></tr></tbody></table>';
						}
						else if ( barrackProc < 91) {
							curRow.cells[1].innerHTML = '<font color="#FD9315">'+barracks+'</font><table cellspacing="0" style="height: 10px; width: 150px; border: 1px solid orange;"><tbody><tr><td bgcolor="#FD9315" width="'+barrackProc+'%" ></td><td></td></tr></tbody></table>';
						}
						else if ( barrackProc < 100)   {
							curRow.cells[1].innerHTML = '<font color="red">'+barracks+'</font><table cellspacing="0" style="height: 10px; width: 150px; border: 1px solid orange;"><tbody><tr><td bgcolor="red" width="'+barrackProc+'%" ></td><td></td></tr></tbody></table>';
						}
						else {
								curRow.cells[1].innerHTML = '<font color="red">'+barracks+'</font><table cellspacing="0" style="height: 10px; width: 150px; border: 1px solid orange;"><tbody><tr><td bgcolor="red" width="100%" ></td></tr></tbody></table>';
						}
						//Show ammount of barracks or houses needed for perfect house/barracks ratio.
						buildTable.insertRow(buildTable.rows.length).insertCell(0).colSpan="5"; // Add one more row to table for information.
						if ((Math.round(maxHoused * 0.35) - maxBarracked) > houseSize) {
							var barracksNeeded = Math.round((Math.round(maxHoused * 0.35) - maxBarracked) / barrackSize);
							buildTable.rows[buildTable.rows.length-1].cells[0].innerHTML = '<font color="red">You need <b id="barracksNeeded">'+barracksNeeded+'</b> more barracks to have perfect house/barrack ratio!</font>';
						}
						else if ((Math.round(maxHoused * 0.35) - maxBarracked) < (houseSize * -1)) {
							var housesNeeded = Math.round((Math.round(maxHoused * 0.35) - maxBarracked) / houseSize * -1);
							buildTable.rows[buildTable.rows.length-1].cells[0].innerHTML = '<font color="red">You need <b id="housesNeeded">'+housesNeeded+'</b> more houses to have perfect house/barrack ratio!</font>';
						}
						else {
							buildTable.rows[buildTable.rows.length-1].cells[0].innerHTML = '<font color="#29D900">You have perfect house/barrack ratio!</font>';
						}
						var needed = xpath('//b[@id]',content,true);
						if (needed){
							if (needed.getAttribute("id") == "barracksNeeded") {
								toField = xpath("//table/tbody/tr["+barrackRow+"]/td[5]/input",content,true);
							}
							else {toField = xpath("//table/tbody/tr["+houseRow+"]/td[5]/input",content,true);}
							eonClick = function(){
								toField.value = rNum2Int(needed.textContent);
								refreshMaxCells(content);
							};
							needed.addEventListener('click', eonClick, false);
							needed.style.color = primaryColor;
						}
						//If building new barracks, show amount of new free speces.
						var barracksBuilding = rNum2Int(curRow.cells[2].innerHTML);
						if (barracksBuilding !== 0) {
							curRow.cells[2].innerHTML = '<div><font color="'+primaryColor+'" title="+'+(barracksBuilding * barrackSize)+' pop">'+barracksBuilding+'</font></div>';
						}
						evalText = "<font color=\"blue\">+ <b>'+int2RNum(Math.round(curInput.value * barrackSize))+'</b> recruits</font><br />";
						evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * goldCost)+'</b> gold</font><br />";
						evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * secondaryCost)+'</b> stone</font><br />";
						evalText += "<font color=\"green\"> * <b>'+int2RNum(Math.round((curInput.value * barrackSize / 0.35) / houseSize))+'</b> houses</font><br />";
						curInput.setAttribute("eval","barrackSize="+barrackSize+";"+"houseSize="+houseSize+";goldCost="+goldCost[element]+";secondaryCost="+secondaryCost[element]+";mText='"+evalText+"';");
						break;
					case "Lumber mill":
						evalText = "<font color=\"blue\">+ <b>'+int2RNum(curInput.value * 30)+'</b> lumber prod/tick</font><br />";
						evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * goldCost)+'</b> gold</font><br />";
						evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * secondaryCost)+'</b> lumber</font><br />";
						curInput.setAttribute("eval","houseSize="+houseSize+";goldCost="+goldCost[element]+";secondaryCost="+secondaryCost[element]+";mText='"+evalText+"';");					
						break;
					case "Quarry":
						evalText = "<font color=\"blue\">+ <b>'+int2RNum(curInput.value * 40)+'</b> stone prod/tick</font><br />";
						evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * goldCost)+'</b> gold</font><br />";
						evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * secondaryCost)+'</b> lumber</font><br />";
						curInput.setAttribute("eval","houseSize="+houseSize+";goldCost="+goldCost[element]+";secondaryCost="+secondaryCost[element]+";mText='"+evalText+"';");					
						break;
					case "Iron Mine":
						coalCost = buildTable.getElementsByTagName('b')[2].innerHTML.replace(/,/g,'');
						evalText = "<font color=\"blue\">+ <b>'+int2RNum(curInput.value * 40)+'</b> iron prod/tick</font><br />";
						evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * goldCost)+'</b> gold</font><br />";
						evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * secondaryCost)+'</b> iron</font><br />";
						evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * coalCost)+'</b> coal</font><br />";
						curInput.setAttribute("eval","houseSize="+houseSize+";mText='"+evalText+"';");						
						break;
					case "Coal Mine":
						coalCost = buildTable.getElementsByTagName('b')[2].innerHTML.replace(/,/g,'');
						evalText = "<font color=\"blue\">+ <b>'+int2RNum(curInput.value * 40)+'</b> coal prod/tick</font><br />";
						evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * goldCost)+'</b> gold</font><br />";
						evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * secondaryCost)+'</b> iron</font><br />";
						evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * coalCost)+'</b> coal</font><br />";
						curInput.setAttribute("eval","houseSize="+houseSize+";mText='"+evalText+"';");						
						break;
					case "Gold Mine":
						coalCost = buildTable.getElementsByTagName('b')[2].innerHTML.replace(/,/g,'');
						evalText = "<font color=\"blue\">+ <b>'+int2RNum(curInput.value * 250)+'</b> gold prod/tick</font><br />";
						evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * goldCost)+'</b> gold</font><br />";
						evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * secondaryCost)+'</b> iron</font><br />";
						evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * coalCost)+'</b> coal</font><br />";
						curInput.setAttribute("eval","houseSize="+houseSize+";mText='"+evalText+"';");						
						break;
				}
				curRow.cells[3].addEventListener('click', onClick, false);
				curInput.addEventListener('blur', onBlur, false);
				curInput.addEventListener('focus', onFocus, false);
				curInput.addEventListener('keyup',onKeyPress, false);
				}
		}
	}
	[3, 6, 7].forEach(smallCycle);	
	refreshMaxCells(content);
	WMInfoTitle = "Help -> Buildings"
	WMInfoHTML = '<p>Status bar visible at barracks and houses rows shows how many of them are used.</p><p>House/barrack ratio ensures that you have enough barracks to hold 35% of your max populaton.</p><p>When you click on input field, an info balloon will pop-up. It provides valuable information about profits and cost of various buildings.</p>'+helpAutofill + helpUserInput + helpAdvancedAutofill;
}

regPageHandler(/^\/Human\/(military.php)?$/i,  wsMilitary);
function wsMilitary() {
	var unitsTable = content.getElementsByTagName('table')[2];
	//onClick; onBlur: Refreshed max cells
	function refreshMaxCells(unitsTable) {
		var tmpGold = pGold;
		var tmpRecruits = unitsTable.rows[1].getElementsByTagName('b')[0].innerHTML.replace(/,/g,'');
		var unitCost, i;
		var data = [];
		for(i = 0; i < (unitsTable.rows.length); i++ ) {
			if ((unitsTable.rows[i].cells.length == 6) && (unitsTable.rows[i].cells[5].getElementsByTagName('input')[0])) {
				unitsCost = unitsTable.rows[i].cells[3].innerHTML.replace(/,/g,'');				
				unitsOrdered = Number(unitsTable.rows[i].cells[5].getElementsByTagName('input')[0].value);
				if( isNaN(unitsOrdered) ) { unitsOrdered = 0; }
				totalUnitCost = unitsCost * unitsOrdered;
				if ((totalUnitCost > tmpGold) || ( unitsOrdered > tmpRecruits)) {
					data[i] = true;
				}
				else {
					tmpRecruits = tmpRecruits - unitsOrdered;
					tmpGold = tmpGold - totalUnitCost;
					data[i] = false;
				}
			}
		}
		for(i = 0; i < (unitsTable.rows.length); i++ ) {
			if ((unitsTable.rows[i].cells.length == 6) && (unitsTable.rows[i].cells[5].getElementsByTagName('input')[0])) {
				unitsCost = unitsTable.rows[i].cells[3].innerHTML.replace(/,/g,'');	
				maxUnitsAvailable = Math.min(Math.floor( Number(tmpGold) / Number(unitsCost)), Number(tmpRecruits));
				if (maxUnitsAvailable <= 0) {maxUnitsAvailable = 0;}
				unitsOrdered = Number(unitsTable.rows[i].cells[5].getElementsByTagName('input')[0].value);
				unitsTable.rows[i].cells[4].firstChild.data = String(data[i] ? maxUnitsAvailable : (maxUnitsAvailable + unitsOrdered));
				unitsTable.rows[i].cells[4].style.color = data[i] ? 'red' : primaryColor;
			}
		}			
	}
	//onBlur handler for input cell.
	var onBlur = function() {
		refreshMaxCells(unitsTable);
		var wmBaloon = document.getElementById("wmBaloon");
		wmBaloon.style.display = "none";
	};
	
	//onClick handler for max cell.
	var onClick = function (e) {
		this.parentNode.getElementsByTagName('input')[0].value = this.innerHTML.replace(/,/g,'');
		refreshMaxCells(unitsTable);
	};
	
	//onFocus handler for input cell..
	var onFocus = function() {
		function findPos(obj) {
			var curleft = curtop = 0;
			if (obj.offsetParent) {
				curleft = obj.offsetLeft
				curtop = obj.offsetTop
				while (obj = obj.offsetParent) {
					curleft += obj.offsetLeft
					curtop += obj.offsetTop
				}
			}
			return [curleft,curtop];
		}
		var wmBaloon = document.getElementById("wmBaloon");
		wmBaloon.style.position="absolute";
		wmBaloon.style.display = "block";
		wmBaloon.style.left = (findPos(this)[0]+75)+"px";
		wmBaloon.style.top = (findPos(this)[1])+"px";
		var mText;
		curInput = this;
		eval(this.getAttribute("eval"));
		wmBaloon.innerHTML = mText;		
	}
	
	//onKeyPress handler for input cell..
	var onKeyPress = function() {
		var wmBaloon = document.getElementById("wmBaloon");
		var mText;
		eval(this.getAttribute("eval"));
		wmBaloon.innerHTML = mText;		
	};
	
	for( var i = 0; i < (unitsTable.rows.length); i++ ) {
		if ((unitsTable.rows[i].cells.length == 6) && (unitsTable.rows[i].cells[5].getElementsByTagName('input')[0])) {
			unitsTable.rows[i].cells[4].addEventListener('click', onClick, false);
			curInput = unitsTable.rows[i].cells[5].getElementsByTagName('input')[0];
			curInput.addEventListener('blur', onBlur, false);
			var goldCost = rNum2Int(unitsTable.rows[i].cells[3].textContent);
			switch (unitsTable.rows[i].cells[0].textContent) {
				case "Builder":
					curInput.addEventListener('focus', onFocus, false);
					curInput.addEventListener('keyup', onKeyPress, false);
					evalText = "<font color=\"blue\"> - <b>'+int2RNum(Math.round(curInput.value /2))+'</b> buildings/tick</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * goldCost)+'</b> gold</font><br />";
					curInput.setAttribute("eval","goldCost="+goldCost+";mText='"+evalText+"';");	
					break;
				case "Trainer":
					curInput.addEventListener('focus', onFocus, false);
					curInput.addEventListener('keyup', onKeyPress, false);
					evalText = "<font color=\"blue\"> - <b>'+int2RNum(Math.round(curInput.value /2))+'</b> units/tick</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * goldCost)+'</b> gold</font><br />";
					curInput.setAttribute("eval","goldCost="+goldCost+";mText='"+evalText+"';");	
					break;
				case "Scout":
					curInput.addEventListener('focus', onFocus, false);
					curInput.addEventListener('keyup', onKeyPress, false);
					evalText = "<font color=\"blue\"> - <b>'+int2RNum(Math.round(curInput.value /5))+'</b> land/tick</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * goldCost)+'</b> gold</font><br />";
					curInput.setAttribute("eval","goldCost="+goldCost+";mText='"+evalText+"';");	
					break;
				case "Thief":
					curInput.addEventListener('focus', onFocus, false);
					curInput.addEventListener('keyup', onKeyPress, false);
					evalText = "<font color=\"red\"> - <b>'+int2RNum(curInput.value * goldCost)+'</b> gold</font><br />";
					curInput.setAttribute("eval","goldCost="+goldCost+";mText='"+evalText+"';");	
					break;
				case "Spellcaster":
					curInput.addEventListener('focus', onFocus, false);
					curInput.addEventListener('keyup', onKeyPress, false);
					evalText = "<font color=\"red\"> - <b>'+int2RNum(curInput.value * goldCost)+'</b> gold</font><br />";
					curInput.setAttribute("eval","goldCost="+goldCost+";mText='"+evalText+"';");	
					break;
				case "Skirmisher":
					curInput.addEventListener('focus', onFocus, false);
					curInput.addEventListener('keyup', onKeyPress, false);
					evalText = "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 2)+'</b> Att</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 1)+'</b> Dmg</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 4)+'</b> Def</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 2)+'</b> Score</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * 1)+'</b> gold/tick</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * goldCost)+'</b> gold</font><br />";
					curInput.setAttribute("eval","goldCost="+goldCost+";mText='"+evalText+"';");	
					break;
				case "Maceman":
					curInput.addEventListener('focus', onFocus, false);
					curInput.addEventListener('keyup', onKeyPress, false);
					evalText = "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 2*2)+'</b> Att</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 1*2)+'</b> Dmg</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 4*2)+'</b> Def</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 2*2)+'</b> Score</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * 1*2)+'</b> gold/tick</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * goldCost)+'</b> gold</font><br />";
					curInput.setAttribute("eval","goldCost="+goldCost+";mText='"+evalText+"';");	
					break;
				case "Swordsman":
					curInput.addEventListener('focus', onFocus, false);
					curInput.addEventListener('keyup', onKeyPress, false);
					evalText = "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 2*3)+'</b> Att</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 1*3)+'</b> Dmg</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 4*3)+'</b> Def</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 2*3)+'</b> Score</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * 1*3)+'</b> gold/tick</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * goldCost)+'</b> gold</font><br />";
					curInput.setAttribute("eval","goldCost="+goldCost+";mText='"+evalText+"';");
					break;
				case "Pikeman":
					curInput.addEventListener('focus', onFocus, false);
					curInput.addEventListener('keyup', onKeyPress, false);
					evalText = "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 2*4)+'</b> Att</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 1*4)+'</b> Dmg</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 4*4)+'</b> Def</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 2*4)+'</b> Score</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * 1*4)+'</b> gold/tick</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * goldCost)+'</b> gold</font><br />";
					curInput.setAttribute("eval","goldCost="+goldCost+";mText='"+evalText+"';");	
					break;
				case "Knight":
					curInput.addEventListener('focus', onFocus, false);
					curInput.addEventListener('keyup', onKeyPress, false);
					evalText = "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 10)+'</b> Att</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 5)+'</b> Dmg</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 20)+'</b> Def</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 10)+'</b> Score</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * 5)+'</b> gold/tick</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * goldCost)+'</b> gold</font><br />";
					curInput.setAttribute("eval","goldCost="+goldCost+";mText='"+evalText+"';");
					break;
				case "Archer":
					curInput.addEventListener('focus', onFocus, false);
					curInput.addEventListener('keyup', onKeyPress, false);
					evalText = "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 1)+'</b> Att</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 3)+'</b> Dmg</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 1)+'</b> Def</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 2)+'</b> Score</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * 1)+'</b> gold/tick</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * goldCost)+'</b> gold</font><br />";
					curInput.setAttribute("eval","goldCost="+goldCost+";mText='"+evalText+"';");
					break;
				case "Crossbowman":
					curInput.addEventListener('focus', onFocus, false);
					curInput.addEventListener('keyup', onKeyPress, false);
					evalText = "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 1*2)+'</b> Att</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 3*2)+'</b> Dmg</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 1*2)+'</b> Def</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 2*2)+'</b> Score</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * 1*2)+'</b> gold/tick</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * goldCost)+'</b> gold</font><br />";
					curInput.setAttribute("eval","goldCost="+goldCost+";mText='"+evalText+"';");
					break;
				case "Longbowman":
					curInput.addEventListener('focus', onFocus, false);
					curInput.addEventListener('keyup', onKeyPress, false);
					evalText = "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 1*3)+'</b> Att</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 3*3)+'</b> Dmg</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 1*3)+'</b> Def</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 2*3)+'</b> Score</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * 1*3)+'</b> gold/tick</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * goldCost)+'</b> gold</font><br />";
					curInput.setAttribute("eval","goldCost="+goldCost+";mText='"+evalText+"';");	
					break;
				case "Sniper":
					curInput.addEventListener('focus', onFocus, false);
					curInput.addEventListener('keyup', onKeyPress, false);
					evalText = "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 1*4)+'</b> Att</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 3*4)+'</b> Dmg</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 1*4)+'</b> Def</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 2*4)+'</b> Score</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * 1*4)+'</b> gold/tick</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * goldCost)+'</b> gold</font><br />";
					curInput.setAttribute("eval","goldCost="+goldCost+";mText='"+evalText+"';");
					break;
				case "Siege Archer":
					curInput.addEventListener('focus', onFocus, false);
					curInput.addEventListener('keyup', onKeyPress, false);
					evalText = "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 1*5)+'</b> Att</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 3*5)+'</b> Dmg</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 1*5)+'</b> Def</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 2*5)+'</b> Score</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * 1*5)+'</b> gold/tick</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * goldCost)+'</b> gold</font><br />";
					curInput.setAttribute("eval","goldCost="+goldCost+";mText='"+evalText+"';");	
					break;
				case "Witch":
					curInput.addEventListener('focus', onFocus, false);
					curInput.addEventListener('keyup', onKeyPress, false);
					evalText = "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 6)+'</b> Att</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 1)+'</b> Dmg</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 2)+'</b> Def</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 2)+'</b> Score</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * 1)+'</b> gold/tick</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * goldCost)+'</b> gold</font><br />";
					curInput.setAttribute("eval","goldCost="+goldCost+";mText='"+evalText+"';");
					break;
				case "Battle Medic":
					curInput.addEventListener('focus', onFocus, false);
					curInput.addEventListener('keyup', onKeyPress, false);
					evalText = "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 6*2)+'</b> Att</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 1*2)+'</b> Dmg</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 2*2)+'</b> Def</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 2*2)+'</b> Score</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * 1*2)+'</b> gold/tick</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * goldCost)+'</b> gold</font><br />";
					curInput.setAttribute("eval","goldCost="+goldCost+";mText='"+evalText+"';");
					break;
				case "Mage":
					curInput.addEventListener('focus', onFocus, false);
					curInput.addEventListener('keyup', onKeyPress, false);
					evalText = "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 6*3)+'</b> Att</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 1*3)+'</b> Dmg</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 2*3)+'</b> Def</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 2*3)+'</b> Score</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * 1*3)+'</b> gold/tick</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * goldCost)+'</b> gold</font><br />";
					curInput.setAttribute("eval","goldCost="+goldCost+";mText='"+evalText+"';");
					break;
				case "Druid":
					curInput.addEventListener('focus', onFocus, false);
					curInput.addEventListener('keyup', onKeyPress, false);
					evalText = "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 6*4)+'</b> Att</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 1*4)+'</b> Dmg</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 2*4)+'</b> Def</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 2*4)+'</b> Score</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * 1*4)+'</b> gold/tick</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * goldCost)+'</b> gold</font><br />";
					curInput.setAttribute("eval","goldCost="+goldCost+";mText='"+evalText+"';");
					break;
				case "Wizard":
					curInput.addEventListener('focus', onFocus, false);
					curInput.addEventListener('keyup', onKeyPress, false);
					evalText = "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 6*5)+'</b> Att</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 1*5)+'</b> Dmg</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 2*5)+'</b> Def</font><br />";
					evalText += "<font color=\"blue\"> + <b>'+int2RNum(curInput.value * 2*5)+'</b> Score</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * 1*5)+'</b> gold/tick</font><br />";
					evalText += "<font color=\"red\"> - <b>'+int2RNum(curInput.value * goldCost)+'</b> gold</font><br />";
					curInput.setAttribute("eval","goldCost="+goldCost+";mText='"+evalText+"';");
					break;
			}
		}
	}
	refreshMaxCells(unitsTable);
	var avalRecruits = xpath("//b[7]",content,true);
	var recField = xpath("//form/input[1]",content,true);
	addAutofill(avalRecruits,avalRecruits.textContent,recField);
	WMInfoTitle = "Help -> Barracks"
	WMInfoHTML = helpAutofill + helpUserInput +"<p>When you click on input field, an info balloon will pop-up. It provides valuable information about profits and cost of various units.</p>"+ helpAdvancedAutofill;	
}

regPageHandler(null,  wsClockTime);
function wsClockTime(){
// GMT and Local Time by Pinky

	var d = new Date(); // Set up our date to use
	//First, let's do the GMT	
	function leadingZero(x){
		return (x>9)?x:'0'+x;
	}
	var clockContent = '<br />GMT Time: ' + leadingZero(d.getUTCHours()) + ':' + leadingZero(d.getUTCMinutes()) + '<br />';
	
	//And the Local
	var clockContent = clockContent + 'Local Time: ' + leadingZero(d.getHours()) + ':' + leadingZero(d.getMinutes()) + '<br />';
	
	//Append using the DOM
	var clockContainer = document.createElement('span');
	clockContainer.innerHTML = clockContent;
	clockContainer.style.fontSize = "0.8em";
	
	var oldClock = xpath(".//table/tbody/tr/td[contains(.,'AM') or contains(.,'PM')]",document,true);
	oldClock.appendChild(clockContainer);
}

regPageHandler(null,  wsScorePopup);
function wsScorePopup(){
//Inline score display by Pinky
	var scoreHTML = '<br />'
			+'<a onClick="document.getElementById(\'wminfo\').style.display=\'none\';" target="_blank" href="../scores.php?command=MPP">Most Powerful Counties</a><br />'
            +'<a onClick="document.getElementById(\'wminfo\').style.display=\'none\';" target="_blank" href="../scores.php?command=RC">Richest Counties</a> <br />'
            +'<a onClick="document.getElementById(\'wminfo\').style.display=\'none\';" target="_blank" href="../scores.php?command=MPC">Most Populated Counties</a> <br />'
            +'<br />'
            +'<a onClick="document.getElementById(\'wminfo\').style.display=\'none\';" target="_blank" href="../scores.php?command=MPK">Most Powerful Kingdoms</a><br />'
            +'<a onClick="document.getElementById(\'wminfo\').style.display=\'none\';" target="_blank" href="../scores.php?command=RK">Richest Kingdoms</a> <br />'
			+'<br />'
            +'<a onClick="document.getElementById(\'wminfo\').style.display=\'none\';" target="_blank" href="../scores.php?command=BHCL">Best Hero by Character Level</a> <br />'
            +'<a onClick="document.getElementById(\'wminfo\').style.display=\'none\';" target="_blank" href="../scores.php?command=BHTW">Best Hero by Tournament Wins</a><br />'
            +'<a onClick="document.getElementById(\'wminfo\').style.display=\'none\';" target="_blank" href="../scores.php?command=BHCW">Best Hero by Challenge Wins</a><br />'
			+'<br />'
            +'<a onClick="document.getElementById(\'wminfo\').style.display=\'none\';" target="_blank" href="../scores.php?command=BMBL">Best Monster by Level</a><br /><br />';
            
    var onClick = function(e) {
		document.getElementById("wmtitle").textContent = "Scores";
		document.getElementById("wmtext").innerHTML = scoreHTML;
		document.getElementById("wminfo").style.display='block';
		e.preventDefault();
	};
	var scoreLink = xpath(".//table/tbody/tr/td/li/a[starts-with(.,'Scores')]",document,true);
	scoreLink.addEventListener('click', onClick, false);
}

regPageHandler(null,  wsAutoUpdate);
function wsAutoUpdate(){
// Automatic update by Pinky
	// -----------------------------------------------------------------------
	// let's try to update :)
	if (GetCookie('WMUpToDate') == null )
	{
		var upToDate = false;
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/review/9066?format=txt',
			onload: function(responseDetails) {
				if (!responseDetails.responseText.match(/@version\s+([\d.]+)/)) {
					upToDate = true;
				}
				var theOtherVersion = parseFloat(RegExp.$1);
				if (theOtherVersion == parseFloat(WMVersion)) {
					 upToDate = true;
				}
				if (upToDate){ 
			SetCookie('WMUpToDate','',24);
				}else{ 
					if (confirm("A newer version of Warmonkey is available, click OK to update now.\n\nThis will open the new version in a new tab, uninstall the current one, then install the new one.") ) {
						// time to update !
						GM_openInTab('http://userscripts.org/scripts/source/9066.user.js');	
					}else{
						SetCookie('WMUpToDate','',3);
					}
				}
			}
		});		
	}
}
//
// ***************************************************************************
// ** Main function.
// ***************************************************************************
(function () {
	// Initialization.
	// -----------------------------------------------------------------------
	//#DEBUG
	//var execution = Date.now();
	//#
	var mainTable, sideContent, scoreTable1, scoreTable2;
	mainTable = xpath("/html/body/table",document,true);
	
	//Fix maintable, for some pages there is no sideContent cell.
	if (!mainTable.rows[1].cells[2]) {
		mainTable.rows[1].insertCell(2).style.textAlign = 'center';
		mainTable.rows[1].cells[2].style.verticalAlign = 'top';
	}
	
	//Find content and sideContent nodes.
	content = xpath("tbody/tr[2]/td[2]",mainTable,true);
	sideContent = xpath("tbody/tr[2]/td[3]",mainTable,true);
	
	//Player stats.
	scoreTable1 = xpath("//td[6]/table[1]",mainTable,true);
	scoreTable2 = xpath("//td[6]/table[2]",mainTable,true);
	pGold = rNum2Int(scoreTable1.rows[0].cells[1].textContent);
	pPopulation = rNum2Int(scoreTable1.rows[0].cells[3].textContent);
	pPower = rNum2Int(scoreTable1.rows[0].cells[5].textContent);
	pPlains = rNum2Int(scoreTable2.rows[0].cells[1].textContent);
	pForests = rNum2Int(scoreTable2.rows[0].cells[3].textContent);
	pMountains = rNum2Int(scoreTable2.rows[0].cells[5].textContent);
	
	//Add warmonkey emblem
	sideContent.innerHTML = '<div style="color: ' + primaryColor + ';text-decoration:overline;">Warmonkey '+WMVersion+'</div>';

	//Add Warmonkey's info box to document.
	buildWMInfo();
	
	//Add Content/Buttons to side 
	var nButton = document.createElement("div");
	nButton.style.color = "rgb(239, 168, 44)";
	sideContent.appendChild(nButton);
	nButton.appendChild(document.createTextNode("About"));
	var onClick = function() {
		document.getElementById("wmtitle").textContent = "About Warmonkey";
		document.getElementById("wmtext").innerHTML = "<p>Warmonkey is warshire enhance script written by community for community.</p>"
		+"<p>Credits:<br /><li>Ryuukia Mori<br /></li></p><p>Contributors:<br /><li>Pinky<br /></li></p>"
		+"<p><a href=\"http://userscripts.org/scripts/show/9066\">Userscripts page</a></p>"
		+"<p>-Thanks for using :)</p>";
		document.getElementById("wminfo").style.display='block' 
	};
	nButton.addEventListener('click', onClick, false);
	
	// Dispatch.  (Idea and code taken from evo+ script).
	// -----------------------------------------------------------------------
	for(var i = 0; i < pageHandlers.length; i++ ) {	
		if( pageHandlers[i].urlRegEx === null || pageHandlers[i].urlRegEx.test(document.location.pathname) ) { pageHandlers[i].handler(); }
	}
	
	//Finally add help button if it is defined.
	if (WMInfoTitle !== null){		
		var nButton = document.createElement("div");
		nButton.style.color = "rgb(239, 168, 44)";
		sideContent.appendChild(nButton);
		var nButtonText = document.createTextNode("Help");
		nButton.appendChild(nButtonText);
		var onClick = function() {
			document.getElementById("wmtitle").textContent = WMInfoTitle;
			document.getElementById("wmtext").innerHTML = WMInfoHTML;
			document.getElementById("wminfo").style.display='block' 
		};
		nButton.addEventListener('click', onClick, false);
	}
	//#DEBUG
	//execution = Date.now() - execution;
	//window.addEventListener('load',function(){document.body.title='Warmonkey execution time: '+String(execution)+' ms';},true);
	//#
	
}) ();
//
// ***************************************************************************
// ** Helper functions.
// ***************************************************************************
// Readable numbers to Int.
function rNum2Int(num) { return Number(num.replace(/,/g,'') ); }

//Int to readable numbers. Fails at float ints.
function int2RNum(number) {
	number = '' + number;
	if (number.length > 3) {
		var mod = number.length % 3;
		var output = (mod > 0 ? (number.substring(0,mod)) : '');
		for (i=0 ; i < Math.floor(number.length / 3); i++) {
			if ((mod === 0) && (i === 0)) { output += number.substring(mod+ 3 * i, mod + 3 * i + 3); }
			else { output+= ',' + number.substring(mod + 3 * i, mod + 3 * i + 3); }
		}
	return (output);
	}
	else { return number; }
}

//Xpath wrapper by Pinky.
function xpath(query, domspace, single) {
            if (!single) {
                        return document.evaluate(query, domspace, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            } else {
                        return document.evaluate(query, domspace, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
            }
}

//Infobox constructor.
function buildWMInfo (title, text) {
	//Add WMInfo box css to document.
	var css = '#wminfo{line-height:0;position:fixed;text-align:left;top:100px;width:100%;z-index:100}#wminfo a{color:black;text-decoration: underline;}#wminfo a:hover{color:red;}#wmclose{clear:both;color:#FF6F6F;cursor:pointer;font-weight:bold;padding-bottom:15px;padding-right:15px;text-align:right}#wmcontainer{background-color:#EFF3FF;border:medium outset black;margin:0 auto;position:relative;width:400px;-moz-border-radius:15px 0 15px 0}#wmoverlay{background-image:url("data:image/png;base64,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");background-repeat:repeat;height:100%;left:0;position:fixed;top:0;width:100%;z-index:-1;-moz-opacity:0.7}#wmtext{clear:both;color:black;font:13px Verdana,Helvetica,sans-serif;line-height:1.4em;padding:0px 10px;text-indent:10px}#wmtitle{border-bottom:medium dashed #D8D8D8;color:#705FFF;font:16px Verdana,Helvetica,sans-serif;font-weight:bold;line-height:1.4em;margin:0 auto;overflow:auto;padding-bottom:5px;padding-left:12px;padding-top:3px}'; 
	var html = '<div id="wmoverlay"></div><div id="wmcontainer"><div id="wmtitle"></div><div id="wmtext"></div><div id="wmclose" onClick="this.parentNode.parentNode.style.display=\'none\'">Close</div></div>';
	var nStyle = document.createElement("style");
	nStyle.setAttribute("type", "text/css");
	nStyle.setAttribute("media", "screen");
	nStyle.appendChild(document.createTextNode(css));
	xpath("//head",document,true).appendChild(nStyle);
	//Add WMInfo box html to document.
	var nBody = xpath("//body",document,true);	
	var nWMInfo = document.createElement("div")
	nBody.appendChild(nWMInfo);
	nWMInfo.style.display = "none";
	nWMInfo.setAttribute("id","wminfo");
	nBody.appendChild(nWMInfo);
	var nDiv = document.createElement("div");
	nBody.appendChild(nDiv);
	nDiv.innerHTML = '<div id="wmBaloon" style="border: solid white;background-color: #FFF2CF;-moz-border-radius: 10px;padding: 3px 3px 3px 7px; display: none;"></div>';
	nWMInfo.innerHTML = html;
}

//Autofill for some places.
function addAutofill(to ,what ,where){
	what = rNum2Int(what);
	onClick = function(){
		where.value = what;
	};
	to.addEventListener('click', onClick, false);
	to.style.color = primaryColor;
}

//Parse user input.
function addUserInputParser(to){
	 onChange = function() {
	 	var multiplyer
		var inputArray = this.value.match(/(\d+)(\D+)/);
		if (inputArray) {
			switch(inputArray[2]) {
				case "k":
					multiplyer = 1000;
					break;
				case "mil":
				case "m":
					multiplyer = 1000000;
					break;				
			}
			if (multiplyer) {this.value = inputArray[1] * multiplyer;}
		}
	};
	onFocus = function() {
		this.value ="";
	}
	to.addEventListener('keyup', onChange, false);
//	to.addEventListener('focus', onFocus, false);
	to.onBlur;	
}

// GM implementation of cookies :)
function SetCookie(name, value, hours) {
	GM_setValue('cv_' + name, value);
	var expire = new Date();
	expire.setUTCHours(expire.getUTCHours() + hours);
	GM_setValue('cx_' + name, expire.toGMTString());
}

function GetCookie(name) {
	var value = GM_getValue('cv_' + name);
	var expire = GM_getValue('cx_' + name);
	if( value != null && expire != null ) {
		expire = new Date(expire);
		if( expire.valueOf() >= Date.now() ) return value;
	}
	return null;
}

// Page Handler hooks. (Code taken from Evo+ code).
function pageHandler(urlRegEx, handler) {
	this.urlRegEx = urlRegEx;
	this.handler = handler;
}

function regPageHandler(urlRegEx, handler) {
	pageHandlers.push(new pageHandler(urlRegEx,  handler));
}