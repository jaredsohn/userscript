/*

Dragon Go Server match info

*/

// ==UserScript==
// @name			Dragon Go Server Match Info
// @namespace		N/A
// @description		Adds info about pending matches to the DGS (Dragon Go Server) board page. Click on a game and you will be taken to it. Click the headers to select search field.
// @include			*dragongoserver.net/game*
// @author			logoskaiagape
// ==/UserScript==

(function() {

	var xmlHttp;
	xmlHttp=new XMLHttpRequest();
	var matches;
	var sortField = GM_getValue("DGSSortField");
	if (!sortField) {
		sortField = "time";
		GM_setValue("DGSSortField", sortField);
	}
	var tableBody;

	function numberOrder(arr1, arr2) { return arr1[0] - arr2[0]; } // Used for sorting
	
	function populateMatchTable(tableBody, matches, sortField) {
		var matchArray = new Array();
		var indexArray = new Array(); // Used for sorting
		
		for (i in matches)
		{
			var match = matches[i];
			if (match.length > 0)
			{
				var matchInfo = match.split(",");
				var matchID = matchInfo[1];
				var player = matchInfo[2].slice(2, matchInfo[2].length - 1);
				var timeLeft = matchInfo[5].slice(2, matchInfo[5].length - 1);
				
				matchArray.push(new Array(player, timeLeft, matchID));
				if (sortField == "time") {
					var timePattern = /\w+:(?:\s+(\d+)d)?(?:\s+(\d+)h)?/; // Example string: "J: 34d 12h" -> $1=34, $2=12
					timeLeft.match(timePattern);
					var time = 0;
					if (RegExp.$1) {
						time = RegExp.$1 * 1; // days, multiplication with 1 to force it to be a number (valueOf() fails for some reason)
					}
					if (RegExp.$2) {
						var hours = RegExp.$2 / 100; // hours
						time = time + hours; // obviously nonsensical, mathematically speaking, but good enough for sorting
					}
					
					indexArray.push(new Array(time, i));
				}
				else {
					indexArray.push(new Array(player.toLowerCase(), i));
				}
			}
		}
		
		if (sortField == "time") {
			indexArray.sort(numberOrder);
		}
		else {
			indexArray.sort();
		}

		for (j in indexArray) {
			// Create new row
			var matchRow = document.createElement("tr");
			tableBody.appendChild(matchRow);
			
			// Get row data
			var index = indexArray[j][1];
			var match = matchArray[index];
			
			// Create player cell
			var link = document.createElement("a");
			var linkText = document.createTextNode(match[0]);
			link.style.color = "black";
			link.appendChild(linkText);
			link.setAttribute("href", "game.php?gid=" + match[2]);
			var playerCell = document.createElement("td");
			playerCell.appendChild(link);
			matchRow.appendChild(playerCell);
			
			// Create time cell
			var timeCell = document.createElement("td");
			var timeText = document.createTextNode(match[1]);
			timeCell.style.whiteSpace = "nowrap";
			timeCell.appendChild(timeText);
			matchRow.appendChild(timeCell);
		}
		
		return matchArray.length;
	}
	
	function setTitle(matchCount) {
		document.title = "DGS (" + matchCount + ")";
	}
	
	function changeSortField(newSortField) {
		if (newSortField != sortField) {
			sortField = newSortField;
			GM_setValue("DGSSortField", sortField);

			while(tableBody.childNodes.length > 0) {
				tableBody.removeChild(tableBody.childNodes[0]);
			}
			
			populateMatchTable(tableBody, matches, sortField);
		}
	}

	function playerSort ()
	{
		changeSortField("player");
	}
	
	function timeSort ()
	{
		changeSortField("time");
	}
	
	xmlHttp.onreadystatechange=function()
    {
		if (xmlHttp.readyState == 4)
		{
			var table = document.getElementById('pageLayout');
			var matchData = table.rows[0].insertCell(1);
			var matchTable = document.createElement("Table");
			
			matches = xmlHttp.responseText.split("\n");
			
			matchTable.style.background = "#F7F5FF";
			matchTable.style.minWidth = "200px";
			matchTable.style.height = "100%";
			matchTable.style.border = "thin solid #0C41C9";
			
			// Create header row
			var tableHeader = document.createElement("thead");
			matchTable.appendChild(tableHeader);
			var headingRow = document.createElement("tr");
			tableHeader.appendChild(headingRow);
			
			// Add player header
			var playerHeading = document.createElement("th");
			headingRow.appendChild(playerHeading);
			playerHeading.addEventListener("click", playerSort, false);
			//playerHeading.setAttribute("onclick", "changeSortField(\"player\", tableBody)");
			playerHeading.appendChild(document.createTextNode("Opponent"));
			
			// Add time heading
			var timeHeading = document.createElement("th");
			headingRow.appendChild(timeHeading);
			timeHeading.addEventListener("click", timeSort, false);
			//timeHeading.setAttribute("onclick", "changeSortField(\"time\", tableBody)");
			timeHeading.appendChild(document.createTextNode("Time Left"));
			
			// Add table body
			tableBody = document.createElement("tbody");
			matchTable.appendChild(tableBody); 

			var matchCount = populateMatchTable(tableBody, matches, sortField);
			
			setTitle(matchCount);
			
			matchData.style.padding = "4px";
			matchData.rowspan = 2;
			matchData.vAlign = "top";
			matchData.id = "matchData";
			matchData.appendChild(matchTable);
			

			var dummy = table.rows[1].insertCell(0); // Makes action links appear under the board as they should
		}
    }
	
	xmlHttp.open("GET","quick_status.php",true);
	xmlHttp.send(null);
})();
