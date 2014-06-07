// ==UserScript==
// @name        Fantasy Premier League - Table Enhancer
// @namespace   none
// @description View each team's Fantasy Cup progress, team value and transfers at-a-glance.
// @include     http://fantasy.premierleague.com/my-leagues/*/standings/*
// @grant       GM_xmlhttpRequest
// @version     5
// ==/UserScript==

// Enter a gameweek in quotes (e.g. "23") if you want to force the page to consider a particular gameweek as the "current" one.
// This is useful in the days between cup fixtures being announced and the next gameweek starting 
var LATEST_CUP_GAMEWEEK = "26";

// Option for toggling different columns, as I was eliminated from the cup in GW25 and have ceased to care about it.
// Set "true" to show column, or "false" to hide it.
SHOW_CUP_COLUMN = true;
SHOW_TEAMVALUE_COLUMN = true;
SHOW_TRANSFER_COLUMN = true;
SHOW_CAPTAIN_COLUMN = true;

// Find league table on page
var xPathResult = document.evaluate("//table[contains(@class,'ismTable')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
var leagueTable = xPathResult.singleNodeValue;

// Extend the header to include extra columns
var headerRow = leagueTable.rows[0];
if(SHOW_CUP_COLUMN)
{
  var th = document.createElement('th');
  th.innerHTML="Cup";
  headerRow.appendChild(th);
}
if(SHOW_TEAMVALUE_COLUMN)
{
  var th2 = document.createElement('th');
  th2.innerHTML="Value";
  headerRow.appendChild(th2);
}
if(SHOW_TRANSFER_COLUMN)
{
  var th3 = document.createElement('th');
  th3.innerHTML="Trn";
  headerRow.appendChild(th3);
}
if(SHOW_CAPTAIN_COLUMN)
{
  var th4 = document.createElement('th');
  th4.innerHTML="Captain";
  headerRow.appendChild(th4);
}
  
// Go through all visible rows of the league table, appending the additional information
for (i = 1; i < leagueTable.rows.length; i++) {
	myURL = leagueTable.rows[i].getElementsByTagName('a')[0];
	modifyRow(myURL, leagueTable.rows[i]);
    }

function modifyRow(myPage, targetLink) {
		
		// Nonsense hack for a problem where it was always getting the first team's page
		// From: http://stackoverflow.com/questions/4810346/i-cant-figure-out-why-the-url-wont-change-for-my-gm-xmlhttprequest-in-my-greas
		var moreSubstantial = myPage + " ";
        
		// Send HTTP request for page
		GM_xmlhttpRequest({
            method: 'GET',
            url: moreSubstantial,
            onload: function(response){

                // Get the HTML of the user's team page
				doc = document.createElement('div');
				doc.innerHTML = response.responseText;		

				// You there, what gameweek is this?
				if (LATEST_CUP_GAMEWEEK!='')
					currentGameweek = LATEST_CUP_GAMEWEEK;
				else
				{
					urlChunks = response.finalUrl.split('/');
					currentGameweek = urlChunks[urlChunks.length-2];
				}
				
				// Get captain and vice captain names
				var xPathCaptain = document.evaluate("//div[contains(@class,'\"is_captain\": true')]/div/dl/dt", doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				currentCaptain = xPathCaptain.snapshotItem(0).textContent.trim();
				var xPathViceCaptain = document.evaluate("//div[contains(@class,'\"is_vice_captain\": true')]/div/dl/dt", doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				currentViceCaptain = xPathViceCaptain.snapshotItem(0).textContent.trim();
				captainString = "Captain: " + currentCaptain + ". Vice-captain: " + currentViceCaptain;
				
				// Calculate the team value (current value + in bank)
				var xPath3 = document.evaluate("//dl[contains(@class,'ismRHSFinanceList')]/dd", doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				currentValue = xPath3.snapshotItem(0).textContent.trim();
				inBank = xPath3.snapshotItem(1).textContent.trim();
				totalValue = parseFloat(currentValue.substr(1, currentValue.length-2)) + parseFloat(inBank.substr(1, inBank.length-2));
				teamValue = "£" + totalValue.toFixed(1) + "m";
				teamValueTooltip = "Team value: " + currentValue + ". In bank: " + inBank + ".";
				
				// Find the transfer count and wildcard status, write it to a tooltip string
				var xPath4 = document.evaluate("//dl[contains(@class,'ismRHSTFList')]/dd", doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				totalTransfers = xPath4.snapshotItem(0).textContent.trim();
				gameweekTransfers = xPath4.snapshotItem(1).textContent.trim();
				wildcardStatus = xPath4.snapshotItem(2).textContent.trim();
				
				//wildcard status may contain '?' for an unplayed wildcard... remove it
				wildcardStatus = wildcardStatus.replace("?","");
				
				transferStatus = totalTransfers + "(" + gameweekTransfers + ")";
				
				// If wildcard is active, display a star in the transfer column.
				if(wildcardStatus.indexOf("Active") != -1)
					transferStatus = transferStatus + "*";
							
				transferString = totalTransfers + " transfers (" + gameweekTransfers + " this week). Wildcard status: " + wildcardStatus;

				// Find the "Cup" section of the sidebar
				var xPath2 = document.evaluate("//table[@class='ismTable ismRHSTable']", doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
				var cupTable = xPath2.singleNodeValue;

				// If cupTable is present, they qualified for the cup; take the first row and print its details.
				if(cupTable)
				{
					cupStatus = cupTable.rows[0].cells[0].textContent;
					cupOpponent = cupTable.rows[0].cells[1].textContent.trim();
					cupScore = cupTable.rows[0].cells[2].textContent;
					
					cupTitleText = cupStatus + ": " + cupScore + " v " + cupOpponent;
					
					userGameweek = cupStatus.substr(2);
					userEliminated = false;
					
					// If their most recent cup entry is from a previous gameweek, they have definitely been eliminated
					if(parseInt(userGameweek) < parseInt(currentGameweek))
						userEliminated = true;
				}
				else
				{
					cupStatus = "DNQ";
					cupTitleText = "Failed to qualify for the cup.";
					userEliminated = true;
				}
				
				// Create the Cup column
				if(SHOW_CUP_COLUMN)
				{
				  var div = document.createElement('div'),  // create DIV element
				  txt = document.createTextNode(cupStatus); // create text node
				  div.appendChild(txt);                    // append text node to the DIV
				  div.setAttribute('class', 'col');        // set DIV class attribute
				  div.setAttribute('className', 'col');    // set DIV class attribute for IE (?!)
				  div.setAttribute('title',cupTitleText);
				  
				  if(userEliminated)
					div.setAttribute('style','color:Silver');
				  else
					div.setAttribute('style','color:ForestGreen');
				
				  targetLink.insertCell(targetLink.cells.length).appendChild(div);   // append DIV to the table cell
				}
				
				// Create the Team Value column
				if(SHOW_TEAMVALUE_COLUMN)
				{
				  var div2 = document.createElement('div'),  // create DIV element
				  txt = document.createTextNode(teamValue); // create text node
				  div2.appendChild(txt);                    // append text node to the DIV
				  div2.setAttribute('class', 'col');        // set DIV class attribute
				  div2.setAttribute('className', 'col');    // set DIV class attribute for IE (?!)
				  div2.setAttribute('title', teamValueTooltip);
				  targetLink.insertCell(targetLink.cells.length).appendChild(div2);
				}
				
				// Create the Transfer column
				if(SHOW_TRANSFER_COLUMN)
				{
				  var div3 = document.createElement('div'),  // create DIV element
				  txt = document.createTextNode(transferStatus); // create text node
				  div3.appendChild(txt);                    // append text node to the DIV
				  div3.setAttribute('class', 'col');        // set DIV class attribute
				  div3.setAttribute('className', 'col');    // set DIV class attribute for IE (?!)
				  div3.setAttribute('title', transferString);
				  targetLink.insertCell(targetLink.cells.length).appendChild(div3);
				}
				
				// Create the Captain column
				if(SHOW_CAPTAIN_COLUMN)
				{
				  var div4 = document.createElement('div'),  // create DIV element
				  txt = document.createTextNode(currentCaptain); // create text node
				  div4.appendChild(txt);                    // append text node to the DIV
				  div4.setAttribute('class', 'col');        // set DIV class attribute
				  div4.setAttribute('className', 'col');    // set DIV class attribute for IE (?!)
				  div4.setAttribute('title', captainString);
				  targetLink.insertCell(targetLink.cells.length).appendChild(div4);
				}
				
            }
        }); 
}