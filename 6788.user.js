// ==UserScript==
// @name          Mininova Last.fm Artist Torrent Links
// @include       http://www.last.fm/music/*
// @include       http://last.fm/music/*
// @description   If you are looking at an artist on last.fm, this script will (in the background) retrieve a list of torrents and insert it on the page, so it looks like a normal feature of the page. The torrent name (linked to minonova.org), number of seeders, number of leechers and size in MB. Written by Tom Rix (aka rixth) tom@frogontop.com
// ==/UserScript==


(function() {
	var bandName = false;
	if (window.location.href.replace(/[^\/]+/g,'').length == 4) {
		bandName = unescape(window.location.href.substr(window.location.href.lastIndexOf('\/') + 1));
		var insertBefore = 'Similar Artists';
		var type = 'artist';
	}
	if (window.location.href.replace(/[^\/]+/g,'').length == 5) {
		var albumName = window.location.href.substr(window.location.href.lastIndexOf('\/') + 1);
		var newLocation = window.location.href.replace('/' + albumName, '');
		bandName = newLocation.substr(newLocation.lastIndexOf('\/') + 1);
		bandName = unescape(bandName) + ' ' + unescape(albumName);
		var insertBefore = 'Tracklist';
		var type = 'album';
	}
	if (bandName) {
		// Find the insertion point for the torrent table
		var headers = document.getElementsByTagName('h2');
		for (var i = 0; i < headers.length; i++) { 
			items = headers[i].getElementsByTagName(type == 'artist' ? 'a' : 'span');
			for (var j = 0; j < items.length; j++) { 
				if (items[j].textContent == insertBefore) { 
					var insertionPoint = headers[i];
				}
			}
		}
		// If there is an insertion point, continue
		if (insertionPoint) {
			// Setup the torrent container, add the header
			var contain = document.createElement('div');
			var header = document.createElement('h2');
			var headerSpan = document.createElement('span');
			headerSpan.className = 'h2Wrapper';
			header.className = 'heading';
			var headerText = document.createTextNode('Download Now');
			headerSpan.appendChild(headerText);
			header.appendChild(headerSpan);
			contain.appendChild(header);
			
			// Add the loading images
			var loading = document.createElement('img');
			loading.src = 'data:image/gif;base64,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';
			loading.id = 'dl-div-loading';
			contain.appendChild(loading);
			
			// Create the no results div
			var noResults = document.createElement('p');
			noResults.id = 'dl-p-no-results';
			noResults.style.display = 'none';
			noResults.appendChild(document.createTextNode('Sorry, there were no results on Mininova'));
			
			// Create the torrent table
			var tableStart = document.createElement('table');
			tableStart.id = 'torrent-table-start';
			tableStart.style.display = 'none';
			tableStart.setAttribute('class', 'candyStriped chart');
			tableStart.setAttribute('cellspacing', '0');
			tableStart.setAttribute('cellpadding', '0');
			tableStart.setAttribute('border', '0');
			tableStart.setAttribute('width', '100%');
			var tableTbody = document.createElement('tbody');
			tableTbody.id = 'torrent-table';
			// Create the column headers
			var tableThead = document.createElement('thead');
			var tableHeader = document.createElement('tr');
			var downloadTitle = document.createElement('td');
			downloadTitle.innerHTML = 'Download Title';
			var seedersTitle = document.createElement('td');
			seedersTitle.innerHTML = 'S';
			var leechersTitle = document.createElement('td');
			leechersTitle.innerHTML = 'D';
			var sizeTitle = document.createElement('td');
			sizeTitle.innerHTML = 'Size';
			tableHeader.appendChild(downloadTitle);
			tableHeader.appendChild(seedersTitle);
			tableHeader.appendChild(leechersTitle);
			tableHeader.appendChild(sizeTitle);
			tableThead.appendChild(tableHeader);
			tableStart.appendChild(tableThead);
			tableStart.appendChild(tableTbody);
			
			// Append the table & container to the insertion point
			contain.appendChild(tableStart);
			contain.appendChild(noResults);
			insertionPoint.parentNode.insertBefore(contain, insertionPoint);
			// Start getting the torrnets
			GM_xmlhttpRequest({
				method: 'GET',
				headers: { 'Content-type': 'text/xml' },
				url: 'http://www.mininova.org/search/' + bandName + '/5/seeds',
				onload: function(responseDetails) {
					// Once torrent HTML has been retrieved, load it into the DOM
					var parser = new DOMParser();
					var mininovaDom = parser.parseFromString(responseDetails.responseText.replace(/&/g, "&amp;"), "text/xml");
					if (responseDetails.responseText.indexOf('<h1>No results for') != -1) {
						document.getElementById('dl-div-loading').style.display = 'none';
						document.getElementById('dl-p-no-results').style.display = 'block';
					}
					else {
						// Locate the torrent table
						var torrentTable = mininovaDom.getElementsByTagName('table').item(0);
						var torrentRows = torrentTable.getElementsByTagName('tr');
						// Iterate over each of the rows (bar the first, which is just headers) 
						for(var i = 1; i < torrentRows.length; i++) {
							var tableCells = torrentRows.item(i).getElementsByTagName('td');
							// Get the size unit (mb, gb etc) and the size in MB
							var torrentSizeUnit = tableCells.item(2).textContent.substr(-2);
							var torrentSizeNumber = tableCells.item(2).textContent.replace('&nbsp;' + torrentSizeUnit, '');
							//torrentSizeUnit = torrentSizeUnit.replace(' ');
							//torrentSizeUnit = torrentSizeUnit.replace(';', '');
							// If the size is in GB, convert it to MB
							if (torrentSizeUnit == 'GB') {
								torrentSizeNumber = torrentSizeNumber * 1024;
							}
							// Get the number of seeders
							var torrentSeeders = tableCells.item(3).textContent;//.replace('&nbsp', '');
							GM_log('torrent size: ' + torrentSizeNumber);
							// If the torrent is bigger than 30mb, and has seeders, continue
							if (torrentSizeNumber > 2 && torrentSeeders != '0' && torrentSeeders != '---') {
								// Get the number of leechers
								var torrentLeechers = tableCells.item(4).textContent;
								// Extract links from the title td and iterate through them
								var torrentLinks = tableCells.item(1).getElementsByTagName('a');
								for(var j = 0; j < torrentLinks.length; j++) {
									var hrefValue = torrentLinks.item(j).getAttribute('href');
									// Only extract the element if it is the link element to the torrent details page
									if (hrefValue.match(/\/tor\//)) {
										var torrentLink = torrentLinks.item(j);
									}
								}
								// Extract the actual link
								var torrentUrl = torrentLink.getAttribute('href');
								// Extract the torrent title
								var torrentName = torrentLink.textContent;
								// Create the torrent image link
								var dlImage = document.createElement('img');
								dlImage.src = 'http://www.mininova.org/images/down.gif';
								var torrentImageLinkElement = document.createElement('a');
								torrentImageLinkElement.href = 'http://www.mininova.org' + torrentUrl;
								torrentImageLinkElement.appendChild(dlImage);
	
								// Create the torrent link
								var torrentLinkElement = document.createElement('a');
								torrentLinkElement.href = 'http://www.mininova.org' + torrentUrl;
								torrentLinkElement.innerHTML = ' ' + torrentName;
	
								// Create the table row
								var tableRow = document.createElement('tr');
								var downloadCell = document.createElement('td');
								var seedersCell = document.createElement('td');
								var leechersCell = document.createElement('td');
								var sizeCell = document.createElement('td');
								seedersCell.innerHTML = torrentSeeders;
								leechersCell.innerHTML = torrentLeechers;
								sizeCell.innerHTML = torrentSizeNumber + 'mb';
								sizeCell.setAttribute('class', 'end');
								downloadCell.setAttribute('class', 'subject');
								if (i % 2) {
									tableRow.className = 'odd';
								}
								tableRow.appendChild(downloadCell);
								tableRow.appendChild(seedersCell);
								tableRow.appendChild(leechersCell);
								tableRow.appendChild(sizeCell);
								// Add the torrent image & link
								downloadCell.appendChild(torrentImageLinkElement);
								downloadCell.appendChild(document.createTextNode(' '));
								downloadCell.appendChild(torrentLinkElement);
								// Append it to the list
								document.getElementById('torrent-table').appendChild(tableRow);
							}		
						}
						// Hide the loading indicator
						document.getElementById('dl-div-loading').style.display = 'none';
						// Show the torrent list
						document.getElementById('torrent-table-start').style.display = 'table';
					}
				}
			});
		}
	}
})();
