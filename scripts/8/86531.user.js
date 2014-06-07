// ==UserScript==
// @name           CheckForRequest
// @namespace      Unknown
// @description    Checks whether a request exists for your upload.
// @include        https://www.waffles.fm/upload.php
// ==/UserScript==

// Fields of uploads page
var artistfield;
var albumfield;

// Div to hold results
var results = document.createElement("DIV");

// Create request row
var requestNode = document.createElement("TR"); 
requestNode.id = "requestsBox";

// Create left-hand side heading
var sideHeading = document.createElement("TD");
sideHeading.className = "heading"; // Assign waffles css to box
sideHeading.appendChild(document.createTextNode("Requests"));
sideHeading.style.textAlign = 'right';
requestNode.appendChild(sideHeading);

// Create right-hand box containing requests
var requestBox = document.createElement("TD");
requestBox.style.padding = '10px';
requestBox.style.overflow = 'auto';
requestBox.style.textAlign = "center";

	// Create button to search for requests
	var searchRequestBut = document.createElement("input");
	searchRequestBut.className = "btn";
	searchRequestBut.type = "button";
	searchRequestBut.value = "Find Requests!";
	searchRequestBut.addEventListener('click', searchRequests, false);
	
	// Create help link
	var helpBox = document.createElement("DIV");
	helpBox.style.marginTop = "10px";
	helpBox.innerHTML = '<a href="https://www.waffles.fm/forum/16/52795/index.html">Report bugs or need help.</a>';
	
	
	requestBox.appendChild(searchRequestBut);
	requestBox.appendChild(helpBox);

requestNode.appendChild(requestBox);


// The info fields
var info = document.getElementById('info') || document.getElementById('uploadInner');

// Insert requests node after info box. WaffleBrainz???
var infoTR = info.parentNode.parentNode;
infoTR.parentNode.insertBefore(requestNode, infoTR.nextSibling);



// Search requests when button clicked.
// This function is called when the search button is clicked.
// It determines the search term, and calls the required functions to process
// and display the results.
function searchRequests()
{	
	artistfield = info.getElementsByTagName('input')[0];
	albumfield = info.getElementsByTagName('input')[1];
	
	if(!(artistfield.value || albumfield.value))
	{
		return;
	}
	//GM_log(artistfield.value + "   " + albumfield.value);
	var searchTerm = artistfield.value + "+" + albumfield.value;
	var requestPageUrl = "https://www.waffles.fm/requests.php";	
	var searchUrl = requestPageUrl + "?search=" + searchTerm;

	var requestPage = returnHttpText(searchUrl);
	
	var requestHTML;
	// Check for success
	if(requestPage != 1)
	{
		if(requestPage.indexOf("requesttable") != -1)
		{
			requestHTML = processRequestPage(requestPage);
			insertRequestHTML(requestHTML);
			return;
		}
		else
		{
			requestHTML = "<p>No requests found.</p>";
			insertRequestHTML(requestHTML);
			return;
		}
	}
	else
	{
		requestHTML = "<p>Error searching requests!</p>";
		insertRequestHTML(requestHTML);
		return;
	}
}

	
// Processes the results from a XMLHttpRequest so that only 2
// columns are displayed. And then returns http content.
function processRequestPage(requestPage)
{
	var requestHTML;
	
	var nearTableIndex = requestPage.indexOf("requesttable") - 100; // To find correct table
	var startIndex = requestPage.indexOf("<table", nearTableIndex);	
	if(startIndex == -1)
	{
		GM_log("Requests table could not be found.");
		return;
	}
	var endIndex = requestPage.indexOf("</table>", startIndex);
	
	// Add preliminary HTML
	requestHTML = '<table style="border: 0pt none; color: inherit; background-color: inherit;" id="requesttable" cellpadding="5" width="100%"> <tbody>';
	
	var startPos = startIndex;
	var index1, index2, colHTML;
	// Cycle through columns, up to 15 (max on 1 page)
	for(var i = 0; i < 15; i++)
	{
		// Find pos of the new row
		startPos = requestPage.indexOf("<tr>", startPos);
		
		// Check to if reached end of rows
		if(startPos > endIndex || startPos == -1)
		{
			break;
		}
		
		// Manually add the tr label
		requestHTML += "<tr>";

		
		// Add requests column
		colIndexStart = requestPage.indexOf("<td", startPos);
		colIndexEnd = requestPage.indexOf("</td>", colIndexStart);
		colHTML = requestPage.substring(colIndexStart, colIndexEnd + 5); // Add 5 to include the end </td>
		requestHTML += colHTML;
		
		// Move startpos to end of column so it starts search next columns
		startPos = colIndexEnd;

		// Skip the 4 columns between 'requests' and 'filled'
		for(var j = 0; j < 4; j++)
		{
			index1 = requestPage.indexOf("<td", startPos);
			index2 = requestPage.indexOf("</td", index1);
			startPos = index2; // Just skip this td and search for next.
		}
		
		// Add Filled column
		colIndexStart = requestPage.indexOf("<td", startPos);
		colIndexEnd = requestPage.indexOf("</td>", colIndexStart);
		colHTML = requestPage.substring(colIndexStart, colIndexEnd + 5); // Add 5 to include the end </td>
		requestHTML += colHTML
		
		// Manually add the /tr label
		requestHTML += "</tr>";
	}
	
	// Add end html
	requestHTML += "</tbody></table>";		
	
	return requestHTML;
}
	


// Inserts the http text, and alters the search button.	
function insertRequestHTML(requestHTML)
{
	results.innerHTML = requestHTML;
	
	// Change button to search again.
	searchRequestBut.style.marginBottom = "10px";
	searchRequestBut.value = "Search again!";
	
	// Try to remove results box if it has already been appended.
	// If not this will do nothing.
	try
	{
		results.parentNode.removeChild(results);
		requestBox.parentNode.removeChild(helpBox);
	}
	catch(err)
	{
	}
	
	requestBox.appendChild(results);
	requestBox.appendChild(helpBox);
	
	return;
}



// Return the body of an entire webpage as a string
function returnHttpText(url)
{
	var req = new XMLHttpRequest();
	req.open('GET', url, false);
	req.send(null);
	if(req.status == 200)
	return req.responseText;
	else
	return 1;
}