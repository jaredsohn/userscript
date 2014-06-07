// ==UserScript==
// @name           OMID
// @description    Clean all report
// @include        http://173.45.86.130/s2/?s=*&x=*&y=*

// ==/UserScript==


// format of FarmList: X,Y|Status>:)
// Status: FARM, SCOUT, CATA, NEWBIE

var farmList = new Array();		//complete farm List

var playerID = "14417";
var villageID = "404744";
var server = "s1.travian.com.vn";


function ProcessReportList() {

	GM_registerMenuCommand("IMP/EXP Auto Farm List", importFarmList );
	GM_registerMenuCommand("IMP/EXP Semi-Auto Farm List", importSemiFarmList );
	GM_registerMenuCommand("IMP/EXP Util List", importUtilList);

	var lstTable = xpathToFirstFound("//table[@class='tsu_list brd_a x09 sm1']", document);
	
	// alert(lstTable.innerHTML);
	// get the previous and next links 
	var rows = lstTable.rows;
	var suffixLocal = server + '_' + playerID + '_' + villageID;


	if (farmList == null || farmList.length == 0) {
		farmList = GM_getValue("UTIL_FarmList", "").split(">:)");
		//GM_log(GM_getValue("FarmList_s1.travian.com.vn_14417_404744", ""));
		//farmList = GM_getValue("FarmList_s1.travian.com.vn_14417_404744", "").split(">:)");
	}
		



    	for(var i=1; i<rows.length; i++) {

		var intX = rows[i].cells[2].innerHTML;		
		var intY = rows[i].cells[4].innerHTML;	
		var pop = rows[i].cells[11].innerHTML;	
		
		var button = this.document.createElement("a");
		button.href = "javascript:void(0)";
		button.innerHTML = intX + "," + intY;
		button.title = getStatusString(getVillageStatus(intX + "," + intY));
		button.addEventListener('click', function() { updateStatus(this.innerHTML);}, false);
		rows[i].cells[0].appendChild(button);
		
		// highlight the village with pop > 300
		if (pop > 300) {
			rows[i].setAttribute("style", "background-color: #DDDDDD;");
		}
	
		
		//GM_log("Row" + i + " out of " + rows.length + " -->" + intX.innerHTML + "|" + intY.innerHTML );

		if (farmList != null && farmList.length > 0) {
			for (var j=0; j < farmList.length;j++) {
				temp = farmList[j].split('|');
				var XY = temp[0].split(',');
				var X = XY[0];
				var Y = XY[1];
				var Status = temp[1];
				// GM_log("Match X = " + X + "  Y = " + Y + "intX = " + intX + "intY = " + intY);
				if (X == intX && Y == intY) {
					// GM_log("Match X = " + X + "  Y = " + Y + "intX = " + intX + "intY = " + intY);
					// row[i].setAttribute("class", "menu");
					// GM_log("Set attribute for row " + i);
					if (Status == 1 ) {
						rows[i].setAttribute("style", "background-color: #CC99CC;"); // auto farm
					}
					if (Status == 2 ) {
						rows[i].setAttribute("style", "background-color: #00FFCC;"); // semi-auto farm
					}
					if (Status == 3 ) {
						rows[i].setAttribute("style", "background-color: #00FF00;"); // manual farm
					}
					if (Status == 4) {
						rows[i].setAttribute("style", "background-color: #FF3333;"); // scout wait sweep
					}
					if (Status == 5 ) {
						rows[i].setAttribute("style", "background-color: #000066;"); // Locked
					}
					if (Status == 6) {
						rows[i].setAttribute("style", "background-color: #CAFF70;"); // NO TROOP CAN'T FARM
					}
					if (Status == 7) {
						rows[i].setAttribute("style", "background-color: #C82536;");
					}
				}
			}
		}
		
	}


}

function xpathToList(query, startNode) {
	if (!startNode) startNode = document;
    return document.evaluate(query, startNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function xpathToFirstFound(query, startNode) {
	if (!startNode) startNode = document;
    return document.evaluate(query, startNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function importUtilList() {
	var data = GM_getValue("UTIL_FarmList", "");
	var importData = prompt("Import/Export Farm List: ", data);
	GM_setValue("UTIL_FarmList", importData);
	window.location.reload();
}

function importFarmList() {
	var Status = 1;
	var data = GM_getValue("UTIL_FarmList", "");
	var importData = prompt("Import/Export Farm List: ", data);
	var tempData = "";
	var tempList = new Array();		//complete farm List
	farmList = GM_getValue("UTIL_FarmList", "").split(">:)");


	if (importData != "") {
		tempList = importData.split(">:)");
			for (var j=0; j < tempList.length;j++) {
				temp = tempList[j].split('|');
				var XY = temp[0];
				if ( isVillageExist(XY) ) {
					updateVillageStatus(XY, Status);		
					//GM_log("update village XY = " + XY);
				}
				else {
					addVillage(XY, Status);
					//GM_log("add village XY = " + XY);
				}

			}

	}
	else {
		GM_setValue("UTIL_FarmList", "");
	}
	window.location.reload();
}

function importSemiFarmList() {
	var Status = 2;
	var data = GM_getValue("UTIL_FarmList", "");
	var importData = prompt("Import/Export Farm List: ", data);
	var tempData = "";
	var tempList = new Array();		//complete farm List
	farmList = GM_getValue("UTIL_FarmList", "").split(">:)");


	if (importData != "") {
		tempList = importData.split(">:)");
			for (var j=0; j < tempList.length;j++) {
				temp = tempList[j].split('|');
				var XY = temp[0];
				if ( isVillageExist(XY) ) {
					updateVillageStatus(XY, Status);		
					//GM_log("update village XY = " + XY);
				}
				else {
					addVillage(XY, Status);
					//GM_log("add village XY = " + XY);
				}

			}

	}
	else {
		GM_setValue("UTIL_FarmList", "");
	}
	window.location.reload();
}


function isVillageExist(XY) {
	farmList = GM_getValue("UTIL_FarmList", "").split(">:)");
	for (var j=0; j < farmList.length;j++) {
		var temp = farmList[j].split('|');
		var farmXY = temp[0];
		if ( farmXY == XY ) {
			return true;
		}
	}
}

function getVillageStatus(XY) {
	farmList = GM_getValue("UTIL_FarmList", "").split(">:)");
	for (var j=0; j < farmList.length;j++) {
		var temp = farmList[j].split('|');
		var farmXY = temp[0];
		if ( farmXY == XY ) {
			return temp[1];
		}
	}
	return -1;
}

function getStatusString(Status) {
	switch(Status)
	{
		case "1":
		  	return "AUTO FARM";
		case "2":
		  	return "SEMI-AUTO FARM";
		case "3":
		  	return "MANUAL FARM";
		case "4":
		  	return "SCOUT WAIT SWEEP";
		case "5":
		  	return "LOCKED";
		case "6":
		  	return "NO TROOP, NO FARM";
		case "7":
		  	return "SPARE";
		default:
			return "NOT SET";
		}
}

function addVillage(XY, Status) {
	farmList = GM_getValue("UTIL_FarmList", "");
	farmList = farmList + XY + "|" + Status + ">:)";
	GM_setValue("UTIL_FarmList", farmList);
}

function updateVillageStatus(XY, Status) {
	farmList = GM_getValue("UTIL_FarmList", "").split(">:)");
	for (var j=0; j < farmList.length;j++) {
		var temp = farmList[j].split('|');
		var farmXY = temp[0];
		if ( farmXY == XY ) {
			farmList[j] = XY + "|" + Status;
		}
	}
	farmList = farmList.join('>:)');
	farmList = farmList + ">:)";
	GM_setValue("UTIL_FarmList", farmList);
}

function deleteVillage(XY) {
	var tempList = "";
	farmList = GM_getValue("UTIL_FarmList", "").split(">:)");
	for (var j=0; j < farmList.length;j++) {
		var temp = farmList[j].split('|');
		var farmXY = temp[0];
		if ( farmXY != XY ) {
			tempList = tempList + farmList[j] + ">:)";
		}
	}
	GM_setValue("UTIL_FarmList", tempList);
}


function updateFarmList(XY, Status) {
	if ( isVillageExist(XY) ) {
		updateVillageStatus(XY, Status);		
		GM_log("update village XY = " + XY + " with status = " + Status);
	}
	else {
		addVillage(XY, Status);
		GM_log("add village XY = " + XY);
	}
	if (Status == 8) {
		deleteVillage(XY);
	} 
//	window.location.reload();
}

function updateStatus(XY) {
	var Status = prompt("Update Status of the Farm (" + XY + ") \nAUTO FARM: 1 \nSEMI-AUTO FARM: 2 \nMANUAL FARM: 3 \nSCOUT WAIT SWEEP: 4 \nLOCKED: 5 \nNO TROOP, NO FARM: 6 \nSPARE: 7 \nDELETE: 8", "");
	if (Status > 0 && Status < 9) {
		updateFarmList(XY, Status)
	}
}



ProcessReportList();
 
       


