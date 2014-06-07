// ==UserScript==
// @name           GC - Bookmark
// @description    Adds bookmark icon to cache lists
// @include     http://www.geocaching.com/seek/*
// @include		http://www.geocaching.com/bookmarks/view.aspx*
// @include		http://www.geocaching.com/bookmarks/bulk.aspx*
// @version     1.1
// ==/UserScript==

// Tabellenbreite verändern
var el = document.getElementsByClassName('span-20');
for (var i = 0; i < el.length; i++) {
	el[i].style.width = '900px';
}

var bookmarkImage = 'http://www.geocaching.com/images/stockholm/16x16/book_open_mark.gif',
	ignoreImage = 'http://www.geocaching.com/images/icons/16/ignore.png',
	bookmarkLink = 'http://www.geocaching.com/bookmarks/mark.aspx?',
	ignoreLink = 'http://www.geocaching.com/bookmarks/ignore.aspx?';

addHeaders();
addBookmarkColumn();

function addHeader(imgLink,altText) {
	var headers = document.getElementsByTagName('th');
	if (headers) {
		var tableHeaderRow = headers[0].parentNode;
		var bookmarkHeader = document.createElement('th');
		var elementImageture = document.createElement('img');
		bookmarkHeader.setAttribute('scope','col');
		bookmarkHeader.setAttribute('class','AlignCenter');
		elementImageture.setAttribute('src',imgLink);
		elementImageture.setAttribute('alt',altText);
		bookmarkHeader.appendChild(elementImageture);
		tableHeaderRow.appendChild(bookmarkHeader);
	}
}

function addHeaders() {
	addHeader(bookmarkImage,'Create Bookmark');
	addHeader(ignoreImage,'Ignore Cache');
}

function createCell(typ,cacheUrl) {
	var targetLink,
		img,
		link,
		altText;
	
	switch (typ) {
		case 'bookmark' : img = bookmarkImage;
						  link = bookmarkLink;
						  altText = 'Create Bookmark';
						  break;
		case 'ignore' : img = ignoreImage;
						link = ignoreLink;
						altText = 'Ignore Cache';
						break;
	}
	
	targetLink = cacheUrl.replace('http://www.geocaching.com/seek/cache_details.aspx?',link) + '&WptTypeID=2';
	var elementImage = document.createElement('img');
	elementImage.setAttribute('src',img);
	elementImage.setAttribute('alt',altText);
	var elementLink = document.createElement('a');
	elementLink.appendChild(elementImage);
	var cell = document.createElement('td');
	cell.appendChild(elementLink);
	elementLink.setAttribute('href',targetLink);
	return cell;
}

function addBookmarkColumn() {
	var urlString = "";
	if (document.URL.search('seek\/nearest') >= 0) {
		var tables = document.getElementsByClassName('SearchResultsTable');
		if (tables) {
			var tableRows = tables[0].tBodies[0].rows;
			if (tableRows) {
				 for (var i = 1; i < tableRows.length; i++) {
					urlString = tableRows[i].getElementsByTagName('a')[1].href;
					tableRows[i].appendChild(createCell('bookmark',urlString));
					tableRows[i].appendChild(createCell('ignore',urlString));
				}
			}
		}
	}
	else if (document.URL.search('bookmarks\/view') >= 0) {
		var tables = document.getElementsByTagName('table'),
			bookmarkCell,
			ignoreCell;
		if (tables) {
			var tableRows = tables[0].tBodies[0].rows;
			if (tableRows) {
				 for (var i = 0; i < tableRows.length; i = i + 2) {
					urlString = tableRows[i].getElementsByTagName('a')[0].href;
					bookmarkCell = createCell('bookmark',urlString);
					ignoreCell = createCell('ignore',urlString);
					bookmarkCell.setAttribute('rowspan','2');
					ignoreCell.setAttribute('rowspan','2');
					tableRows[i].appendChild(bookmarkCell);
					tableRows[i].appendChild(ignoreCell);
				}
			}
		}
	}
}