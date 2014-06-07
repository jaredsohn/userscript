// ==UserScript==
// @name           inselkampf Build Queue
// @namespace      
// @description    Adds information to the building page in inselkampf
// @include        http://213.203.194.123/us/1/index.php*p=b1
// ==/UserScript==

/* Version history
 * 
 * Version 0.2.1 - Bug Fix (Finally handles mines at level 0 and 20)
 * Version 0.2.0 - New Features!  Highlights time of next building ready
 *					and displays when each resource will reach max capacity
 * Version 0.1.2 - Bug fix (am and pm were not being calculated correctly)
 * Version 0.1.1 - Bug fix (wait time for lumber was being incorrectly set)
 * Version 0.1.0 - Initial release
*/

//debug flag, set to 1 to display additional information
var debug = 0;
var debugMessage = "";

// current resource amounts
var current = new Object();

// resource mine levels
var level = new Object();

// references to each building table cell
var buildings = new Object();

// references to each resource table cell
var resources = new Object();

// resource production rates
var pRates = new Object();
pRates.gold = new Array(8,9,11,13,16,19,23,28,34,41,49,59,71,85,102,123,147,177,212,255,306);
pRates.stone = new Array(5,6,7,8,10,12,14,17,21,25,30,37,44,53,64,77,92,110,133,159,191);
pRates.wood = new Array(6,7,8,10,12,14,17,21,25,30,37,44,53,64,77,92,110,133,159,191,230);

//storehouse capacity
var storeCap = new Array(1000,1200,1440,1727,2073,2488,2985,3583,4299,5159,6191,7430,8916,10699,12839,15407,18488,22186,26623,31947,38337,46005,55206,66247,79496,95396,114475,137370,164844,197813,237376);

function init(){
	buildings = findBuildings();
	if(!buildings) return false; // There's no building table - this isn't the right page
	
	resources = findResourceHolder();
	
	current = findResources();
	level = findLevels(buildings);
	
	showDelayTimes(buildings);
	showMaxResTimes();

	if(debug){
		showDebug();
	}
}

function findResources(){
	var cGold = resources.gold.innerHTML.match(/[\d]+$/i);
	var cStone = resources.stone.innerHTML.match(/[\d]+$/i);
	var cWood = resources.wood.innerHTML.match(/[\d]+$/i);

	if(debug){
		debugMessage = debugMessage+"Current Gold: "+cGold+"<br>Current Stone: "+cStone+"<br>Current Wood: "+cWood+"<br>";
	}
	
	return {gold:cGold,stone:cStone,wood:cWood};
}

function findLevels(buildingCells){
	var lGold = 0;
	var lStone = 0;
	var lWood = 0;
	var levelRegExp = /\(Level ([\d]+)\)/i;

	if(!buildingCells["gold mine"]) lGold = 20;
	else if(!buildingCells["gold mine"].innerHTML.match(levelRegExp)) lGold = 0
	else lGold = buildingCells["gold mine"].innerHTML.match(levelRegExp)[1];

	if(!buildingCells["stone quarry"]) lStone = 20;
	else if (!buildingCells["stone quarry"].innerHTML.match(levelRegExp)) lStone = 0;
	else lStone = buildingCells["stone quarry"].innerHTML.match(levelRegExp)[1];

	if(!buildingCells["lumber mill"]) lWood = 20;
	else if (!buildingCells["lumber mill"].innerHTML.match(levelRegExp)) lWood = 0;
	else lWood = buildingCells["lumber mill"].innerHTML.match(levelRegExp)[1];

	if(debug){
		debugMessage += "Gold per hour: " + pRates.gold[lGold]
					  + "<br>Stone per hour: " + pRates.stone[lStone]
					  + "<br>Wood per hour: " + pRates.wood[lWood] + "<br>";
	}
	
	return {gold:lGold,stone:lStone,wood:lWood};
}

function showDelayTimes(buildingCells){
	var buildDate = null;
	var lines = null;
	var newText = "";
	var myRegExp = null;
	var nextBuilding = null;
	var nextBuildingName = "";

	for( var i in buildingCells ){
		buildDate = getWaitTime(buildingCells[i].innerHTML);
		if(buildDate.endDate > new Date()){
			if(!nextBuilding || buildDate.endDate < nextBuilding){
				nextBuilding = buildDate.endDate;
				nextBuildingName = i;
			}

			lines = buildingCells[i].innerHTML.split("<br>");
			newText = lines[0] + " " + formatTime(buildDate.endDate) + "<br>";

			for(var j = 0; j < buildDate.slackers.length; j++){
				myRegExp = new RegExp(buildDate.slackers[j]+": ([\\d]+)","i");
				lines[1] = lines[1].replace(myRegExp,buildDate.slackers[j]+": <span style='color:red;' title='This resource is delaying production'>$1</span>");
			}
			newText += lines[1];


			buildingCells[i].innerHTML = newText;
		}
	}

	if(nextBuilding) highlightNext(buildingCells[nextBuildingName]);
}

function showMaxResTimes(){
/*	if(!buildings["storehouse"]) lStoreHouse = 20;
	else if(!buildings["storehouse"].innerHTML.match(/\(Level ([\d]+)\)/i)) lStoreHouse = 0;
	else */
	lStoreHouse = buildings["storehouse"].innerHTML.match(/\(Level ([\d]+)\)/i)[1];
	maxCap = storeCap[lStoreHouse];
	
	timeGold = (maxCap - current.gold) / pRates.gold[level.gold];
	timeStone = (maxCap - current.stone) / pRates.stone[level.stone];
	timeWood = (maxCap - current.wood) / pRates.wood[level.wood];

	var highGold = "";
	var highStone = "";
	var highWood = "";

	if(timeGold < timeStone)
		if(timeGold < timeWood)
			var highGold = "color:red;";
		else
			var highWood = "color:red;";
	else if(timeStone < timeWood)
		var highStone = "color:red;";
	else
		var highWood = "color:red;";
	

	maxTimeGold = new Date();
	maxTimeGold.setTime(maxTimeGold.getTime()+(timeGold*60*60*1000));
	maxTimeStone = new Date();
	maxTimeStone.setTime(maxTimeStone.getTime()+(timeStone*60*60*1000));
	maxTimeWood = new Date();
	maxTimeWood.setTime(maxTimeWood.getTime()+(timeWood*60*60*1000));
	
	
	resources.gold.innerHTML = "<span style='float:left;'>" + resources.gold.innerHTML + "</span>"
		+ "<span style='float:right;font-size:9px;line-height:10px;padding-right:3px;" + highGold + "'>"
		+ formatDate(maxTimeGold) + "<br>" + formatTime(maxTimeGold) + "</span>";
	resources.stone.innerHTML = "<span style='float:left;'>" + resources.stone.innerHTML + "</span>"
		+ "<span style='float:right;font-size:9px;line-height:10px;padding-right:3px;" + highStone + "'>"
		+ formatDate(maxTimeStone) + "<br>" + formatTime(maxTimeStone) + "</span>";
	resources.wood.innerHTML = "<span style='float:left;'>" + resources.wood.innerHTML + "</span>"
		+ "<span style='float:right;font-size:9px;line-height:10px;padding-right:3px;" + highWood + "'>"
		+ formatDate(maxTimeWood) + "<br>" + formatTime(maxTimeWood) + "</span>";
}

// go!
init();

// ----------------- Helper Functions -----------------

/* finds and returns references to the first table
 * cell for each building.  Returns null if there is
 * no building table.
 * 
 * usage:
 * findBuildings();
*/
function findBuildings(){
	var tableElements = document.getElementsByTagName('table');
	var buildingCells = new Object();
	var isBuildingPage = false;
	
	for( var i = 0; i < tableElements.length; i++ ){
		if(tableElements[i].className == "table"){
			var buildingTableRows = tableElements[i].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
			for(var j = 0; j < buildingTableRows.length; j++){
				var buildingName = buildingTableRows[j].childNodes[0].innerHTML.split("<br>")[0].replace(/^[\s]*<[^>]*>[\s]*/i, "");
				
				if(buildingName.match(/\(level [\d]+\)/gi))
					buildingName = buildingName.replace(/^<[^>]*>[\s]*|[\s]*\([^)]*\)[\s]*<[^>]*>[\s]*$/gi, "");
				else
					buildingName = buildingName.replace(/^<[^>]*>[\s]*|[\s]*<[^>]*>[\s]*$/gi, "");
					
				buildingCells[buildingName.toLowerCase()] = buildingTableRows[j].childNodes[0];
			}
			isBuildingPage = true;
			break;
		}
	}
	
	if(!isBuildingPage) return null;
	return buildingCells;
}


/* returns object containing references to the
 * resource table cells
 *
 * usage:
 * findResourceHolder();
*/
function findResourceHolder(){
	var imgElements = document.getElementsByTagName('img');
	var resourceCells = new Object();
	
	for( var i = 0; i < imgElements.length; i++ ){
		if(imgElements[i].src.match(/gold.gif/gi)){
			resourceCells.gold = imgElements[i].parentNode;
		}else if(imgElements[i].src.match(/stones.gif/gi)){
			resourceCells.stone = imgElements[i].parentNode;
		}else if(imgElements[i].src.match(/wood.gif/gi)){
			resourceCells.wood = imgElements[i].parentNode;
		}
	}

	return resourceCells;
}


/* highlights the time in the given cell in
 * green to show that it'll be ready next
 * 
 * usage:
 * highlightNext(TableCell);
*/
function highlightNext(tableCell){
	var htmlLines = tableCell.innerHTML.split("<br>");
	htmlLines[0] = htmlLines[0].replace(/([^\s]+)$/i,"<span style='color: green' title='This building will be ready next'>$1</span>");
	tableCell.innerHTML = htmlLines[0] + "<br>" + htmlLines[1];
}


/* formats and returns date as m/dd
 * 
 * usage:
 * formatDate(Date);
*/
function formatDate(dateObj){
	var months = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
	var month = months[dateObj.getMonth()];
	var day = padString(dateObj.getDate(),2);
	
//	return hours + ":" + minutes + ":" + seconds + meridian;
	return month + ". " + day;
}


/* formats and returns time as h:mm:sstt
 * 
 * usage:
 * formatTime(Date);
*/
function formatTime(dateObj){
	var hours = dateObj.getHours();
	var meridian = (hours > 11)? "pm" : "am";
	hours = (hours%12 == 0)? 12 : hours%12;
	var minutes = padString(dateObj.getMinutes(),2);
	var seconds = padString(dateObj.getSeconds(),2);
	
//	return hours + ":" + minutes + ":" + seconds + meridian;
	return hours + ":" + minutes + meridian;
}


/* shows the debugging information on the page
 * 
 * usage:
 * padString(String, Integer)
*/
function showDebug(){
	var debugDiv = document.createElement('div');
	debugDiv.style.backgroundColor = "#000000";
	debugDiv.style.color = "#ffffff";
	debugDiv.style.width = "350px";
	debugDiv.style.padding = "0px 5px;";
	debugDiv.style.position = "absolute";
	debugDiv.style.top = "222px";
	debugDiv.style.right = "0px";
	debugDiv.innerHTML = debugMessage;
	document.getElementsByTagName('body')[0].appendChild(debugDiv);
}


/* output helper function.  returns given string
 * padded with 0's in front to specified length
 * 
 * usage:
 * padString(String, Integer)
*/
function padString(str, amount){
	str = str.toString();
	while(str.length < amount){
		str = "0" + str;
	}
	return str;
}


/* returns a date object specifying when the
 * building will be ready to build
 * 
 * usage:
 * getWaitTime(String)
*/
function getWaitTime(htmlString){
	var costs = htmlString.match(/Gold: ([\d]+) Stone: ([\d]+) Lumber: ([\d]+)/i);
	if(!costs) return new Date();
	var goldCost = costs[1];
	var stoneCost = costs[2];
	var woodCost = costs[3];

	wGold = (goldCost - current.gold) / pRates.gold[level.gold];
	wStone = (stoneCost - current.stone) / pRates.stone[level.stone];
	wWood = (woodCost - current.wood) / pRates.wood[level.wood];

	var obj = new Object();
	obj.slackers = new Array();
	var waitTime = 0;

	if(wGold > wStone){
		waitTime = wGold;
		obj.slackers.push("Gold");
	}else if(wGold < wStone){
		waitTime = wStone;
		obj.slackers.push("Stone");
	}else{
		waitTime = wGold;
		obj.slackers.push("Gold");
		obj.slackers.push("Stone");
	}

	if(wWood > waitTime){
		waitTime = wWood;
		obj.slackers = new Array();
		obj.slackers.push("Lumber");
	}else if(wWood == waitTime){
		obj.slackers.push("Lumber");
	}

	if(waitTime <= 0){
		return new Date();
	}

	waitTime = ((waitTime*60)*60)*1000; //get milliseconds from an hour

	obj.endDate = new Date();
	obj.endDate.setTime(obj.endDate.getTime()+waitTime);
	return obj;
}



/* returns all properties of the object argument
 * as a string either in html or plain text
 * 
 * usage:
 * listProperties(Object,Boolean)
*/
function listProperties(obj, returnText){
	var outputmessage = "";
	for(var i in obj){
		if(returnText)
			outputmessage = outputmessage + i + ": " + obj[i] + "\n";
		else
			outputmessage = outputmessage + i + ": " + obj[i] + "<br>";
	}
	return outputmessage;
}
/* just in case I need it:
try{
}catch(e){
	debugMessage = debugMessage+e.message+"<br>";
}
*/
