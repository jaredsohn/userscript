// ==UserScript==
// @name           Travian Allianz Attack Analyzer
// @description    Analyze Allianz Attack
// @include        http://*.travian.com.vn/allianz.php?*s=3*

// ==/UserScript==



var PageURL = [];

function ProcessReportList() {
	// GM_log("ALLIANZ TASKS ANALYZER ...");

	var rptTable = document.getElementById('offs');

	var rows = document.getElementById("offs").rows;
	var index = 1;
    	for(var i=1; i<rows.length; i++) {

		var td = rows[i].cells[0];		
		var img = xpathToFirstFound("a/img", td);
		/* LOST ALL or PARTIALLY*/
		if (img) {
		if ( img.className.indexOf('iReport3') > -1 || img.className.indexOf('iReport2') > -1 || img.className.indexOf('iReport15') > -1) {
		}
		else /* WON OR OTHERS */
		{
			var a = xpathToFirstFound("div/a[contains(@href, 'berichte.php')]", td);
			if (a) {
				
				// var reportId = a.href.substring(a.href.lastIndexOf('id=')+3);
				PageURL[index] = a.href;
				index = index + 1;
			}
		}
		}
		
	}
	
	/*
	GM_log("Length = " + PageURL.length);
	for(var i=0; i<PageURL.length; i++) {
		GM_log("PageURL[" + i + "] =" + PageURL[i]);
	}
	*/ 

	loadReportPage(index-1);


}

function loadReportPage(index) {
	var url = PageURL[index];
	// GM_log("START QUERY " + url);
	var httpRequest = new XMLHttpRequest();
	httpRequest.open("GET", url, true);
	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState == 4) { //complete
			if (httpRequest.status == 200) { // ok
				var sResponse = httpRequest.responseText;
				var holder = document.createElement('div');
				holder.innerHTML = sResponse;
				var myTmp = holder.getElementsByClassName("carry");
				if (myTmp.length > 0) {
					var resValue = myTmp[0].innerHTML.substring(myTmp[0].innerHTML.lastIndexOf('>')+1);
					var resTmp = resValue.split("/");
					// GM_log("Bring back " + resTmp[0] + " Can carry " + resTmp[1]);
					if ( parseInt(resTmp[0]) > 1000 ) {
						var farmName = GetFarmNameFromReportPage(holder);
						var farmLink = GetFarmLinkFromReportPage(holder);
						addFarm(farmName, farmLink);			
					}

				}
				holder = null;
				if (index > 1 ) {
					setTimeout(loadReportPage(index - 1), 5000);
				}
				else {
					if (GM_getValue("ALLIANZ_FARM_RUN", false) ) {
						// GM_log("wait for 100s to reload the page");
						setTimeout(location.reload(), 50000 );
					}
				}
			}
		} // close readyState
	} // close first function
	httpRequest.send(null);

}

function xpathToList(query, startNode) {
	if (!startNode) startNode = document;
    return document.evaluate(query, startNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function xpathToFirstFound(query, startNode) {
	if (!startNode) startNode = document;
    return document.evaluate(query, startNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function GetFarmLinkFromReportPage(holder) {
	var farmLink = xpathToFirstFound("//table[@class='defender']//a[contains(@href, 'karte.php?d=')]", holder);
	if(!farmLink) {
		return null;
	}
	var farmUrl = farmLink.href;
	return farmUrl;	
}
function GetFarmNameFromReportPage(holder) {
	var farmLink = xpathToFirstFound("//table[@class='defender']//a[contains(@href, 'karte.php?d=')]", holder);
	if(!farmLink) {
		return null;
	}
	return farmLink.innerHTML;	
}


// Convert villagedId to XY
function id2xy(villagedId) {
	var arrXY = new Array; 
	var ivid = parseInt(villagedId); 
	arrXY[0] = (ivid%801?(ivid%801)-401:400); 
	arrXY[1] = 400 - (ivid - 401 - arrXY[0]) / 801; 
	return arrXY;
}

// add found farm to the list
function addFarm(farmName, farmLink) {
	GM_log("add " + farmName);
	var data = "";
	data = GM_getValue("ALLIANZ_FARM_LIST", "");

	if (data !=  "") { 
		var farmList = data.split("|");
		for(var i = 1; i < farmList.length; i++) {
			var aThisFarm = farmList[i].split(",");
			if (farmName == aThisFarm[0]) { // already has farm in the farm list
				return false;
			}
		}
		data = data + "|" + farmName + "," + farmLink;
	} else {
		data = farmName + "," + farmLink;
	}
	GM_setValue("ALLIANZ_FARM_LIST", data);
	return true;
}
function startAnalyzer() {
	GM_setValue("ALLIANZ_FARM_LIST", "");
	GM_setValue("ALLIANZ_FARM_RUN", true);
	ProcessReportList();
}

function stopAnalyzer() {
	GM_setValue("ALLIANZ_FARM_RUN", false);
	var data = GM_getValue("ALLIANZ_FARM_LIST", "");
	var importData = prompt("Import/Export Farm Hunting: ", data);
}

function init() {
	// GM_log("Register Command");
	GM_registerMenuCommand("Start Allianz Farming", startAnalyzer );
	GM_registerMenuCommand("Stop Allianz Farming", stopAnalyzer );
	if (GM_getValue("ALLIANZ_FARM_RUN", false) ) {
		ProcessReportList();
	}

}


init();
       

