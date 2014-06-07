// ==UserScript==
// @name			Kickstarter Funding Totaller
// @author			Gryphonvere
// @description		Calculates total amount of money you've pledged and collected for Kickstarter projects.
// @include			https://www.kickstarter.com/profile/transactions*
// @version			1.0.5
// @grant			none
// ==/UserScript==

/*	
	Script History
	
	v. 1.0.0 - 2010-12-21	Initial version
	
	v. 1.0.1 - 2010-12-21	Formatting fix for readability
	
	v. 1.0.2 - 2011-03-24	Added handling (i.e., excluding from calculation) for projects which are unsuccessful in raising funding.  (Oops!)
							
	v. 1.0.3 - 2011-03-24	Revised project status-based determining (now includes only if matches two acceptable patterns, rather than list of exclusions).  [Sorry!]
							
	v. 1.0.5 - 2013-03-20	A couple of fixes:
								-Fixed to work with additional currencies (thanks to UserScripts user 'b2b' for alerting me to this problem!)
								-Changed the summary display to use a table. Hurrah! :)
								(I'm aware the table displays kinda wonky.  Still working on this, but figured it was worth it to publish the improvements as they stand.)
*/

// ==/UserScript==
(function main() {

	var backingsTable, allRows, thisRow;
	
	var currenciesAppendix = []; // Currency list (and their order) is generated on the fly. :)
	var totalsColumns = 0;
	
	var totalPledged = new Array();
	var totalCollected = new Array();
	
	var projStatus, pledgeStatus, pledge;
	var currency = '';

	backingsTables = document.getElementById("main");
	if (backingsTables != null) {
		
		backingsTables = backingsTables.childNodes[5];
		allRows = backingsTables.rows;
		// Navigate to the backings table & retrieve its rows
		
		for (var i=1; i < allRows.length; i++) { // Iterate through the pledges, skipping the header row (0)
			projStatus = allRows[i].cells[1].childNodes[0].innerHTML; // Project Status (second cell)
			currency = allRows[i].cells[3].childNodes[1].innerHTML.substring(0,1); // Pledge currency (fourth cell)
			pledge = parseFloat(allRows[i].cells[3].childNodes[1].innerHTML.substring(1)); // Pledge (fourth cell)
			pledgeStatus = allRows[i].cells[4].innerHTML.split("<br>")[0].replace(/^\s+|\s+$/g,""); // Pledge Status (fifth cell)
			// Thanks to http://www.somacon.com/p355.php for the "trim" regex pattern.
			
			if (projStatus == "FUNDED!" || projStatus == "In Progress") {					

				curIndex = currenciesAppendix.indexOf(currency);
				if (curIndex == -1) {
					currenciesAppendix.push(currency); // Add the currency to the CurrencyAppendix
					curIndex = currenciesAppendix.length-1; // Update the currencyIndex to the newly-added item
					totalsColumns = currenciesAppendix.length; // Update the columns-length in the totalsArray
					
					// Initialize the new cells
					totalPledged[curIndex] = 0.0;
					totalCollected[curIndex] = 0.0;
					
				}
				if (pledgeStatus == "Pledged") {
					totalPledged[curIndex] += pledge; // Correct currency, "pledged."
				}
				else if (pledgeStatus == "Collected") {
					totalCollected[curIndex] += pledge; // Correct currency, "collected."
				}
			}
			// Only add to either total if the project is in progress or was successfully funded.
		}
		
		// Now to generate the display table.
		
		var additionTable = document.createElement('table');
		additionTable.id = "fundInfoTable";
		
		var additionTableBody = document.createElement('tBody');
		
		var row = document.createElement('tr');
		var cell = document.createElement('td');
		
		var cellText = document.createTextNode("");
		cell.appendChild(cellText);
		row.appendChild(cell);			
		// Create a blank first cell.
		
		// Column labels (with currency characters)
		for (var i=0; i < currenciesAppendix.length; i++) {
			cell = document.createElement('td');
			cellText = document.createTextNode(currenciesAppendix[i]);
			cell.appendChild(cellText);
			cell.style.fontWeight = "bold";
			cell.style.textAlign = "right";
			row.appendChild(cell);
		}
		
		additionTableBody.appendChild(row);
		row = document.createElement('tr');
		
		// Row label (Pledges)
		cell = document.createElement('td');
		cellText = document.createTextNode("Total Outstanding Pledges");
		cell.appendChild(cellText);
		cell.style.fontWeight = "bold";
		cell.style.textAlign = "right";
		cell.style.width = "min-content";
		
		row.appendChild(cell);
		
		// Row data (Pledges)
		for (var i=0; i < totalsColumns; i++) {
			cell = document.createElement('td');
			cellText = document.createTextNode(totalPledged[i].toFixed(2));
			cell.appendChild(cellText);
			cell.style.textAlign = "right";
			cell.style.fontWeight = "normal";
			row.appendChild(cell);
		}
		
		additionTableBody.appendChild(row);
		row = document.createElement('tr');

		// Row label (Collected)
		cell = document.createElement('td');
		cellText = document.createTextNode("Total Collected");
		cell.appendChild(cellText);
		cell.style.fontWeight = "bold";
		cell.style.textAlign = "right";
		cell.style.width = "min-content";
		
		row.appendChild(cell);
		
		// Row data (Collected)
		for (var i=0; i < totalsColumns; i++) {
			cell = document.createElement('td');
			cellText = document.createTextNode(totalCollected[i].toFixed(2));
			cell.appendChild(cellText);
			cell.style.textAlign = "right";
			cell.style.fontWeight = "normal";
			row.appendChild(cell);
		}
		
		additionTableBody.appendChild(row);			
		row = document.createElement('tr');
		
		// Row label (Total Funded)
		cell = document.createElement('td');
		cellText = document.createTextNode("Total Funded");
		cell.appendChild(cellText);
		cell.style.fontWeight = "bold";
		cell.style.textAlign = "right";
		cell.style.width = "min-content";
		
		row.appendChild(cell);
		
		// Row data (Total Funded)
		for (var i=0; i < totalsColumns; i++) {
			cell = document.createElement('td');
			cellText = document.createTextNode((totalPledged[i]+totalCollected[i]).toFixed(2));
			cell.appendChild(cellText);
			cell.style.textAlign = "right";
			cell.style.fontWeight = "normal";
			row.appendChild(cell);
		}
		additionTableBody.appendChild(row);
		
		additionTable.appendChild(additionTableBody);
		additionTable.style.textAlign = "center";
		additionTable.style.verticalAlign = "middle";
		
		backingsTables.parentNode.insertBefore(additionTable, backingsTables); // Add this funding support info before the backing table
		
		backingsTables.parentNode.insertBefore(document.createElement('hr'),backingsTables); // Add in a horizontal row line before the backing table			
	}
})();