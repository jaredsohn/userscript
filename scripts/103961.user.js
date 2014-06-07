// ==UserScript==
// @name           	FarmCalculator
// @author 			Matt Edwards
// @description    	Calculates the production of a farm and suggests the optimal amount of troops to send.
// @include 		http://ts2.travian.com/*

// ==/UserScript==

var b = 0;
var raidInterval = 60;
var theDate = new Array();
var carryArray = new Array();
var reportLinks = new Array();
var reportLinks2 = new Array();
var reportObjects = new Array();
var production = new Array();
var reportPairs = new Array();
var production = new Array();
var unitType = new Array();
unitType[0] = 'Clubs';
unitType[1] = 'TK\'s';
unitType[2] = 'Paladin';



function troopsNeeded(){

	var allSlots = document.getElementsByClassName('list');
	//alert('test1');
	var clubs = 0;
	var TK = 0;
	var pallies = 0;
	var TS = 20;
	var TS1 = 20;
	var TS2 = 9;
	//var title = document.getElementsByClassName("listTitleText")[1].childNodes[4];
		//alert(title);
	for(y=0;y<allSlots.length;y++){//each list
		
		var allRows = allSlots[y].getElementsByClassName("slotRow")
		for(i=0;i<allRows.length;i++){	//each row
			var troopType = allRows[i].getElementsByClassName('troopIcon');
			var speed = 0;
			//alert(troopType.length);
			for(x=0;x<troopType.length;x++){//each troop type
				var troopType1 = troopType[x].getElementsByTagName('img')[0];
				var troopType2 = troopType1.getAttribute('alt');
				//alert(troopType2);
				if(troopType2 == 'Clubswinger'){				
					if(speed > 7 || speed == 0){
						speed = 7;
					}
				}else if(troopType2 == 'Teutonic Knight'){
					if(speed > 9 || speed == 0){
						speed = 9;
					}
				}else if(troopType2 == 'Paladin'){
					if(speed > 10 || speed == 0){
						speed = 10;
					}
				}
				//alert('test1');
				var quantity = parseInt(allRows[i].getElementsByClassName('troopIcon')[x].textContent, 10);
				var distance = parseFloat(allRows[i].getElementsByClassName('distance')[0].textContent);
				if(distance > 20){
					var extraDistance = distance-20;
					var numberOfTroops = ((Math.ceil(((20/speed)+(extraDistance/(speed*(1+(TS/10)))))*2)*60)/raidInterval)*quantity;
					//var numberOfTroops = ((Math.ceil((20/speed)*2)*60)/raidInterval)*quantity;
					//numberOfTroops += ((Math.ceil((extraDistance/(speed*(1+(TS/10))))*2)*60)/raidInterval)*quantity;				
				}else{
					var numberOfTroops = ((Math.ceil((distance/speed)*2)*60)/raidInterval)*quantity;
				}
				//alert(numberOfTroops);
				if(troopType2 == 'Clubswinger'){				
					clubs += numberOfTroops;
				}else if(troopType2 == 'Teutonic Knight'){
					TK += numberOfTroops;
				}else if(troopType2 == 'Paladin'){
					pallies += numberOfTroops;
				}
				
			}
			//alert(speed);
			//alert(quantity);
			//alert(distance);		
		}
		
	}
	alert("Approximately " + clubs + " Clubs, " + pallies + " Pallies " + TK + " TK's");
}
function optimizeFarm(reportNumber){
	//alert('test');	
	alert(reportNumber);
}
function parseFarmListPage(){
	var allSlots = document.getElementsByClassName("slotRow");	
	//alert('test1');
	for(i=0;i<10;i++){
		var newCell = document.createElement('td');
		//var he = document.createElement('div');
		//he.setAttribute('style', 'display: none');
		var he = allSlots[i].getElementsByClassName('lastRaid')[0];//this was going to be the reference for the row - just the report id
		var rID = he.childNodes[5];
		reportLinks2[i] = rID;
		//var rID2 = rID.innerHTML.toString();
		//alert(rID);
		var optimizeLink = document.createElement('a');		
		optimizeLink.setAttribute('href', '#list1305');
		
		optimizeLink.addEventListener('click', function(){optimizeFarm(i)}, false);
		var textNode = document.createTextNode('optimize');
		optimizeLink.appendChild(textNode);
		newCell.appendChild(optimizeLink);
		
		allSlots[i].appendChild(newCell);
	}
	//alert('test2');
}
function stripReportLinksFromPage(){
	var a=0;
	var allLinks = document.getElementsByTagName('a');//strips all links in page
	var baseString = 'http:\/\/ts2.travian.com/berichte.php?id=';
	for(i=0;i<allLinks.length;i++){
		if(allLinks[i].toString().substr(0, baseString.length) == baseString){
			var x=39
			var foundId = false;
			while(foundId == false){
				if(allLinks[i].toString().substr(x, 1) != '&' && allLinks[i].toString().substr(x, 1) != '|'){
					x++;
				}else{
					foundId = true;
				}
			}
			var y = x-39;
			var z = 39+y;
			if(allLinks[i].toString().substr(z, 1) == '&'){
				var reportID = allLinks[i].toString().substr(39, y) + "&aid=2395";
			}else{
				var reportID = allLinks[i].toString().substr(39, y);
			}
			reportLinks[a] = baseString + reportID;
			//alert(reportLinks[a]);
			a++;
		}
	}	
}//actually 
function loadReportsIntoArray(){
	var xml = new XMLHttpRequest();
	for(i=0;i<reportLinks.length;i++){
		var reportLink = reportLinks[i];
		xml.open("POST", reportLink, false);
		xml.send();
		var hE = document.createElement('div');
		hE.setAttribute('style', 'display: none');
		hE.innerHTML = xml.responseText;
		reportObjects[i] = hE;
	}
}
function stripTimeAndResourcesFromReports(){
	//alert('test');
	for(x=0;x<reportObjects.length;x++){
	//alert('test');
		var carry = reportObjects[x].getElementsByClassName('carry');
		var goods = reportObjects[x].getElementsByClassName('goods');
		var time = reportObjects[x].getElementsByClassName('header text');		
		for(t=1;t<time.length;t+=2){
			var timeString = time[t].textContent;
			if(timeString.substr(0, 5) == "today"){
				var da = new Date();
				var m = da.getMonth();
				var y = da.getFullYear();
				var d = da.getDate();
				var h = parseInt(timeString.substr(6, 2), 10);
				var mi = parseInt(timeString.substr(9, 2), 10);
				var s = parseInt(timeString.substr(12, 2), 10);
				if(timeString.substr(15, 2) == "pm"){
					if(h!=12){
						h+=12;
					}
				}
			}else{
				var m = parseInt(timeString.substr(3, 2), 10)-1;
				var y = parseInt("20" + timeString.substr(6, 2), 10);
				var d = parseInt(timeString.substr(0, 2), 10);
				var h = parseInt(timeString.substr(9, 2), 10);
				var mi = parseInt(timeString.substr(12, 2), 10);
				var s = parseInt(timeString.substr(15, 2), 10);
				if(timeString.substr(18, 2) == "pm"){
					if(h!=12){
						h+=12;
					}
				}
			}			
			theDate[x] = new Date(y, m, d, h, mi, s, 0);			
			if(goods[1] != undefined){
				carryArray[x] = "0/0";
			}else{
				carryArray[x] = carry[0].textContent;
			}
			//alert(carry[0].textContent);
		}
	}

}
function findSuitableReportsFromList(){
	var availableReports = reportObjects.length;
	var foundFirstReport = false;
	var foundSecondReport = false
	var counter = 0;
	for(i=0;i<availableReports-1;i++){
		var pairs = new Array();
		if(carryArray[i].split("/")[0] != carryArray[i].split("/")[1]){//if the report isn't full it can be used for a start report
			startReportNumber=i;			
			reportPairs[counter] = pairs;
			reportPairs[counter][0] = startReportNumber;//first 'useable' report
			foundFirstReport = true;			
			for(x=startReportNumber+1;x<availableReports;x++){//find next report after 'first'
				if(carryArray[x].split("/")[0] != carryArray[x].split("/")[1]){
					reportPairs[counter][1] = x;//
					foundSecondReport = true;
					break;
				}else{
				
				}
			}
			if(reportPairs[counter][1] == undefined){
				reportPairs.splice(counter, 1);
			}
			counter++;
		}
	}
	//alert('test');
	/*if(reportPairs[counter-1][1] == null){
		reportPairs.splice(counter, 1);
	}else{
		//alert('test');
	}*/
	//alert('test2');
	if(foundFirstReport != true && foundSecondReport != true){//thats if none can be found
		alert("Not able to calculate production from the reports available. Add more troops");
	}	
}
function calculateProduction(reportPairs){	
	for(x=0;x<reportPairs.length;x++){
		var startReportNumber = reportPairs[x][0];
		var finalReportNumber = reportPairs[x][1];
		//alert(startReportNumber + "  " + finalReportNumber);
		var resGained = 0;
		var timeInterval = ((theDate[startReportNumber] - theDate[finalReportNumber])/1000)/60;
		if(timeInterval == 0){
			timeInterval = 1/60;
		}
		//alert(timeInterval);
		for(i=startReportNumber;i<finalReportNumber;i++){
			resGained = parseInt(resGained, 10) + parseInt(carryArray[i].split("/")[0], 10); 		
		}
		//alert(resGained);
		production[x] = (resGained/timeInterval)*60;
		//alert(production[x]);
	}	
}
function calculateAverageProduction(startReportNumber, finalReportNumber){
	var resGained = 0 ;
	for(i=startReportNumber;i<finalReportNumber-1;i++){
		resGained = parseInt(resGained, 10) + parseInt(carryArray[i].split("/")[0], 10);		
	}
	avgProduction = resGained/((theDate[startReportNumber] - theDate[finalReportNumber-1])/1000/60);
	alert(avgProduction);
}
function displayResult(production){
	var output = "number of succesful calculations: " + production.length + "\n\r";
	var totProd = 0;
	for(i=0;i<production.length;i++){
		var clubs = Math.ceil((production[i]/60));// change to 50 for legs, or 70 i believe for imps 
		var pallies = Math.ceil((production[i]/110));//change to 100 for EI's
		var TK = Math.ceil((production[i]/80));
		var roundProd = Math.ceil(production[i])
		totProd = parseInt(totProd, 10) + parseInt(roundProd, 10);
		output += "calculation " + i + ": " + roundProd + ". Recommended troops: " + clubs + " clubs or " + pallies + " pallies or " + TK + " TK's \n\r";//change words:D 
	}
	avgProduction = Math.ceil((totProd/production.length)*1.02);
	clubs = Math.ceil(avgProduction/60);
	pallies = Math.ceil(avgProduction/110);
	TK = Math.ceil(avgProduction/80);
	output += "Average production(+10%): " + avgProduction + ". Recommended troops: " + clubs + " clubs or " + pallies + " pallies or " + TK + " TK's";
	alert("" + output + "");
}
/*function checkTime(){
	var timeInterval = 60; //minutes
	var time = new Date();
	var minutes = time.getUTCMinutes();
	//alert('test1');
	if(minutes <= 15){
		//alert('test');
		if(document.URL != "http://ts2.travian.com/build.php?gid=16&tt=99"){
			window.location = "http://ts2.travian.com/build.php?gid=16&tt=99";
		}
	}else {
		var t = setTimeout("window.location.reload()", 36000);
	}	
}
function checkSendList(){
	var timeInterval = 60; //minutes
	var time = new Date();
	var minutes = time.getUTCMinutes();
	if(minutes >= 01){
		var lists = document.getElementsByClassName("listEntry");
		//for(var i=0;i<lists.length;i++){
			Travian.Game.RaidList.toggleList(4071);
			alert('test');
		//}
	}else {
		var t = setTimeout("window.location.reload()", 36000);
	}
}*/
/*function checkSendList(){
	if(time is on the hour){
		loop through lists
			open list	
				check distance vs speed of first row.
					if less than an hour travel and still attacking
						skip
					else	
						send list
	}
}*/
function addFarmDefaults(){
	document.getElementById("t1").value ="6";
	document.getElementById("t6").value ="1";
}

function controlFunctions(){
	var page = document.URL;
	//alert(page);
	var farmList = "http://ts2.travian.com/build.php?gid=16&tt=99";
	var farmList1 = "http://ts2.travian.com/build.php?id=39&tt=99";
	var reports = "http://ts2.travian.com/position_details";
	var addFarm = "http://ts2.travian.com/build.php?gid=16&tt=99&action=showSlot";
	if(page.substr(0, farmList.length) == farmList){
		if(page.substr(0, addFarm.length) == addFarm){	
			//addFarmDefaults();
			//alert('test1');
			
		}else{		
			//checkSendList();
			//troopsNeeded();
			//parseFarmListPage();
		}
	}else if(page.substr(0, farmList1.length) == farmList1){
		if(page.substr(0, addFarm.length) == addFarm){	
			//addFarmDefaults();
			//alert('test1');
			
		}else{		
			//checkSendList();
			//troopsNeeded();
			//parseFarmListPage();
		}
	}else if(page.substr(0, reports.length) == reports){
		stripReportLinksFromPage();
		for(i=0;i<reportLinks.length;i++){
			//alert(reportLinks[i]);
		}
		loadReportsIntoArray();
		for(x=0;x<reportObjects.length;x++){
			//alert(reportObjects[x]);
		}
		stripTimeAndResourcesFromReports();
		findSuitableReportsFromList();
		calculateProduction(reportPairs);
		for(x=0;x<production.length;x++){
			//alert(production[x]);
		}
		displayResult(production);
	}else {
		//checkTime();
		//alert('test');
	}
}
controlFunctions();

