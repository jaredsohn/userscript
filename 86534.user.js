// ==UserScript==
// @name           Waffles Show Number of Requests - *Lite*
// @namespace      Unknown
// @description    Adds links to torrents which have been requested. Will only work
//				   for the first ~10 browse pages & 24hr top ten tables.
// @include        http://www.waffles.fm/browse.php* 	
// @include https://www.waffles.fm/browse.php*
// @include        http://www.waffles.fm/topten.php* 	
// @include https://www.waffles.fm/topten.php*
// ==/UserScript==

// User Settings
//------------------------------------------------------------------------------
var linkColour = "RED";

// How many votes a torrent needs before showing, a higher value may speed up
// page loading. Note must be at least '1'.
var minimumVotesToShow = 1; 
//------------------------------------------------------------------------------


// Check whether browsing secure version or not
var wafflesUrl;
if((location.protocol).indexOf('s') == -1)
{
	wafflesUrl = "http://www.waffles.fm";
}
else
{
	wafflesUrl = "https://www.waffles.fm";
}


// Check whether on browse page or topten
if(location.pathname == "/browse.php")
{
	var browseTable = document.getElementById('browsetable');
	var rows = browseTable.getElementsByTagName('tr');
	main(rows);
}

else if(location.pathname == "/topten.php")
{
	var mainTD = document.getElementById("browsetable").parentNode; // As there are multiple Tables with SAME Id.
	var browseTables = mainTD.getElementsByTagName("TABLE");

	for(var j = 0; j < 2; j++) // Just show first two tables as rest are somewhat irrelevant with this lite version
	{
		var rows = browseTables[j].getElementsByTagName('tr');
		main(rows);
	}
}



function main(rows)
{
	var numVotesInt;
	// Return page log of last 50 filled requests
	var logPageText = returnHttpText(wafflesUrl + "/log.php?search=filled");

	// Work with 1 torrent (a row) at a time
	for(var i = 1; i < rows.length; i++)
	{
		numVotesInt = 0;	

		var torrentId = getId(rows[i]);

		var IdPosition = logPageText.indexOf(torrentId);
		// Torrent not a filled request
		if(IdPosition == -1)
			continue;

		var textUptoTorrentId = logPageText.substring(0, IdPosition);

		// Find the url of the request page by search for last occurance of string previous substring
		var requestUrlString = "/requests.php?do=viewreq&id=";
		var urlStart = textUptoTorrentId.lastIndexOf(requestUrlString);

		// Create full request page url
		var requestUrl = wafflesUrl;
		requestUrl += logPageText.substring(urlStart, urlStart + requestUrlString.length + 7); // 7 Reqests Id up to 9999999
		var quoteMark = requestUrl.indexOf("\"");
		requestUrl = requestUrl.substring(0, quoteMark);

		// Get body text from the request page
		var requestPageText = returnHttpText(requestUrl);

		// Check page was successfully found
		if(requestPageText != "1")
		{
			// Find number of votes by searching for position of unique string (Votes</b>) in body
			var votesPos = requestPageText.indexOf("Votes</b>");
			// Get a smaller string containing the number of votes in text, last char in string will always be last digit of number of votes
			var stringContainingNumVotes = requestPageText.substring(votesPos - 5, votesPos - 1); // Up to 9999 votes allowed
			// Find position of letter 'b' just before number of votes
			var posOfBoldTag = stringContainingNumVotes.indexOf("b");
			// Knowing position of 'b', we are able to extract just the number of votes
			var numVotesString = stringContainingNumVotes.substring(posOfBoldTag + 2);
			// Convert string to int
			numVotesInt = parseInt(numVotesString, 10);
		}

		if(numVotesInt >= minimumVotesToShow)
		{
			addNumVotesDescrip(rows[i], numVotesInt, requestUrl);
		}
	}
}


// Add the number of votes & link to request page to torrent description
function addNumVotesDescrip(row, numVotes, requestUrl)
{
	var columns, divs, embeddedDiv, torrentLinks, tofrrentName;

	columns = row.getElementsByTagName('td');
	if(columns[1])
	{
		divs = columns[1].getElementsByTagName('div');
		if(divs[0])
		{
			embeddedDiv = divs[0].getElementsByTagName('div');
			if(embeddedDiv[0])
			{
				torrentLinks = embeddedDiv[0].getElementsByTagName('A');
				if(torrentLinks[1])
				{
					var numVotesElement = document.createElement("A");
					numVotesElement.innerHTML = "  [" + numVotes + "]";
					numVotesElement.href = requestUrl;
					numVotesElement.style.fontweight = "BOLD";
					numVotesElement.style.color = linkColour;
					torrentLinks[1].parentNode.insertBefore(numVotesElement, torrentLinks[1].nextSibling);
				}
			}
		}
	}
}
	

// Return the ID of the torrent in the specified row
function getId(row)
{
	var columns, divs, embeddedDiv, torrentLinks, tofrrentUrl, startOfTorrentId;
	columns = row.getElementsByTagName('td');

	if(columns[1])
	{
		divs = columns[1].getElementsByTagName('div');
		if(divs[0])
		{
			embeddedDiv = divs[0].getElementsByTagName('div');
			if(embeddedDiv[0])
			{
				torrentLinks = embeddedDiv[0].getElementsByTagName('A');
				if(torrentLinks[1])
				{
					torrentUrl = torrentLinks[1].href; // [1] as there are two links.
                    startOfTorrentId = torrentUrl.indexOf("=") + 1;
                   	torrentId = torrentUrl.substring(startOfTorrentId);
                   	return torrentId;
				}
			}
		}
	}
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