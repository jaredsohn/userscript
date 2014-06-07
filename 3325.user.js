// ==UserScript==
// @name          Flickr Group Display
// @version       1.11
// @description   Easier management for the photos you have in view and favorite groups such as topv-111.  Also displays favorite-to-view ratios.
// @namespace     http://flickr.group.display.com
// @include       http://www.flickr.com/photos/*/popular*
// @include       http://www.flickr.com/photos/*
// @include       http://flickr.com/photos/*/popular*
// @include       http://flickr.com/photos/*
// ==/UserScript==

/*
	Description
	===========
	Display group membership next to pictures in your photostream for view and fave groups like topv-111.
	Helps manage memberships in groups based on number of views and favorites.  When viewing your photos
	sorted by Views or Favorites, the script will determine which groups each photo belongs to, and display
	the group information next to the photo, to make it easier to determine which photos need to be moved
	to new groups.  Also displays favorite-to-view ratios to help with managing photos in groups like Fav/view >= 5%.
*/

/*
	History
	=======
	V 1.00 - 2006-02-24 - Initial release
	V 1.01 - 2006-02-26 - Added horizontal divider for top-v 111 group
	V 1.02 - 2006-02-26 - Added support for top-f group (25+ favorites)
	V 1.03 - 2006-03-05 - Added support for favorite-to-view ratios
	                    - Reorganized interface to create tab bar at top
	V 1.04 - 2006-03-05 - Added support for "Views: xxx" and "Favorites: xxx" series of groups
	V 1.05 - 2006-03-06 - Fixed display bug showing incorrect rank numbers on ratios page
	V 1.06 - 2006-03-06 - Remove page links on Fav Ratio screen
	V 1.07 - 2006-03-07 - Fix problem with ampersand character on some photos
	V 1.08 - 2006-03-09 - Fix problem with invalid XML in Flickr shopping cart link
	V 1.09 - 2006-03-20 - Added support for "Favorites: <5" group
	V 1.10 - 2006-04-10 - Display which photos are in F/V group on Fav Ratio screen
	V 1.11 - 2006-05-23 - Update to work with FLickr Gamma site redesign
*/


/*
	Configuration
	=============
	DISPLAY_POOL_LINKS - Integer from 1 to 4
		1 - Display pool name as plain text
		2 - Display link to group page
		3 - Display link to group pool page
		4 - Display link to photo's location in group pool (default)

	DISPLAY_ROW_DIVIDERS_VIEWS_25 - true/false
		true  - Display dividers corresponding to the 25/50/75 view groups (default)
		false - Do not display these dividers

	DISPLAY_ROW_DIVIDERS_VIEWS_100 - true/false
		true  - Display dividers corresponding to the 100/200/300/etc. view groups (default)
		false - Do not display these dividers

	DISPLAY_ROW_DIVIDERS_FAVES - true/false
		true  - Display dividers corresponding to the 5/10/25/50/100 view groups (default)
		false - Do not display these dividers

	RATIO_PAGE_LIMIT - Integer greater than or equal to 1 (default 5)
		number of pages to fetch when displaying favorite-to-view ratios
*/

var DISPLAY_POOL_LINKS = 4;
var DISPLAY_ROW_DIVIDERS_VIEWS_25 = true;
var DISPLAY_ROW_DIVIDERS_VIEWS_100 = true;
var DISPLAY_ROW_DIVIDERS_FAVES = true;
var RATIO_PAGE_LIMIT = 5;

// End Configuration Section


var inTop;
var inViewGroups;
var inFaveGroups;
var inFaveRatios;

function process() {
	inTop = matches(document.location, /photos\/[^/]+\/$/);
	inViewGroups = matches(document.location, /popular-views\/(page[0-9]+\/)?\?manageGroups=true/);
	inFaveGroups = matches(document.location, /popular-faves\/(page[0-9]+\/)?\?manageGroups=true/);
	inFaveRatios = matches(document.location, /popular-faves\/\?faveRatio=true/);

	if (inTop) {
		processTop();
		return;
	}

	rewriteTabBar();

	if (inFaveRatios) {
		processFaveRatios();
	} else if (inViewGroups || inFaveGroups) {
		processViewFaveGroups();
	}
}

function processViewFaveGroups() {
	rewritePageLinks();

	var xpathString = "//table[@class='PopularPic']/tbody/tr/td/a[contains(@href, 'photos')]/parent::*/parent::*";
	if (inFaveRatios) {
		xpathString = "//table[@class='PopularPic']/tr/td/a[contains(@href, 'photos')]/parent::*/parent::*";
	}
	var list = xpath(xpathString);
	var rowNum = 0;
	for (var i = 0; i < list.snapshotLength; ++i) {
		rowNum++;
		var row = list.snapshotItem(i);
		processGroupRow(row, rowNum);
	}
}

var previousCount = 999999999;
function processGroupRow(row, rowNum) {
	var currentCount = 0;
	var cell1 = xpath("td[1]", row).snapshotItem(0);
	var cell2 = xpath("td[2]", row).snapshotItem(0);
	if (cell1 == null || cell2 == null) return;
	var photoUrl = xpath("a", cell1).snapshotItem(0).href;
	var photoId = photoUrl.match(/\/([0-9]+)\/$/)[1];
	var snapshot;
	var views = 0;
	var faves = 0;
	snapshot = xpath("small/b", cell2);
	if (snapshot.snapshotLength > 0) {
		var node = snapshot.snapshotItem(0);
		views = node.innerHTML * 1;
	}
	snapshot = xpath("small/a[contains(@href, 'favorites')]/b", cell2);
	if (snapshot.snapshotLength > 0) {
		var node = snapshot.snapshotItem(0);
		faves = node.innerHTML * 1;
	}
	if (inViewGroups) currentCount = views;
	if (inFaveGroups) currentCount = faves;
	var newTableCell = document.createElement("td");
	newTableCell.id = "PoolHolder" + rowNum;
	newTableCell.align = "center";
	var theCellToAddAfter = cell2;
	if (inFaveRatios) {
		var cell3 = xpath("td[3]", row);
		if (cell3.snapshotLength > 0) {
			theCellToAddAfter = cell3.snapshotItem(0);
		}
	}
	addNodeAfter(theCellToAddAfter, newTableCell);
	addRowDivider(previousCount, currentCount, row, rowNum);
	fetchGroups(photoId, rowNum);
	previousCount = currentCount;
}

function addRowDivider(previousCount, currentCount, row, rowNum) {
	if (rowNum == 1) return;
	if (inFaveRatios) return;

	var limits = new Array();
	if (inViewGroups) {
		if (DISPLAY_ROW_DIVIDERS_VIEWS_25) {
			limits.push(25);
			limits.push(50);
			limits.push(75);
			limits.push(100);
		}
		if (DISPLAY_ROW_DIVIDERS_VIEWS_100) {
			if (!DISPLAY_ROW_DIVIDERS_VIEWS_25) {
				limits.push(100);
			}
			limits.push(110);
			limits.push(200);
			limits.push(300);
			limits.push(400);
			limits.push(500);
			limits.push(1000);
		}
	} else if (inFaveGroups) {
		limits.push(5);
		limits.push(10);
		limits.push(25);
		limits.push(50);
		limits.push(100);
	}

	for (var i = 0; i < limits.length; ++i) {
		var createSpacer = false;
		if (i == 0) {
			if (previousCount >= limits[i] && currentCount < limits[i]) {
				createSpacer = true;
			} 
		} else if (previousCount > limits[i] && currentCount <= limits[i]) {
			createSpacer = true;
		}
		if (createSpacer) {
			var newRow = document.createElement("tr");
			newRow.setAttribute("height", "5");
			newRow.id = "spacer";
			var newCell = document.createElement("td");
			newCell.setAttribute("colspan", "3");
			newCell.setAttribute("style", "padding:0px 0px 0px 0px;");
			var hr = document.createElement("hr");
			newCell.appendChild(hr);
			newRow.appendChild(newCell);
			addNodeBefore(row, newRow);
			return;
		}
	}

}

function fetchGroups(photoId, rowNum) {
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.flickr.com/services/rest/?method=flickr.photos.getAllContexts&photo_id=" + photoId + "&api_key=" + API_KEY,
		headers: {
			"User-agent": "Mozilla/4.0 (compatible) Greasemonkey (Flickr Group Display)",
			"Accept": "application/atom+xml,application/xml,text/xml",
		},
		onload: function(responseDetails) {
			var doc = responseDetails.responseText.replace(/<\?xml.*\?>/,'');
			doc = new XML(doc);
			var html = "";
			for each (pool in doc.pool) {
				var poolId = pool.@id;
				var poolName = pool.@title;
				var shortPoolName = checkPoolName(poolName);
				if (shortPoolName != null) {
					if (html != "") html += "<br/>";
					html += linkify(shortPoolName, photoId, poolId);
				}
			}
			if (html == "") {
				if (!inFaveRatios) {
					html = "<span style='font-weight:bold;color:red;'>None</span>";
				} else {
					html = "";
				}
			}
			var list = xpath("//td[@id='PoolHolder" + rowNum + "']");
			if (list.snapshotLength > 0) {
				var holder = list.snapshotItem(0);
				holder.innerHTML = html;
			}
		}
	});
}

function linkify(displayName, photoId, poolId) {

	switch (DISPLAY_POOL_LINKS) {
		case 1:
			return displayName;
		case 2:
			return "<a href='http://www.flickr.com/groups/" + poolId + "/'>" + displayName + "</a>";
		case 3:
			return "<a href='http://www.flickr.com/groups/" + poolId + "/pool/'>" + displayName + "</a>";
		default:
			return "<a href='http://www.flickr.com/groups/" + poolId + "/pool/with/" + photoId + "/'>" + displayName + "</a>";
	}
	return displayName;
}

function checkPoolName(poolName) {
	var lc = poolName.toLowerCase();
	var res = new Array();
	if (inViewGroups) {
		res.push(/^(top-v)/);
		res.push(/^the centurian club/);
			res[res.length - 1].alternateMatch = "Centurian";
		res.push(/([0-9-]+) views/);
		res.push(/^views: *([0-9-]+)/);
			res[res.length - 1].alternateMatch = "Views:&nbsp;placeholder";
	}
	if (inFaveGroups) {
		res.push(/([0-9-]+) favorites/);
		res.push(/^(top-f)/);
		res.push(/^favorites: *(<?[0-9-]+)/);
			res[res.length - 1].alternateMatch = "Faves:&nbsp;placeholder";
		res.push(/^faves: *([0-9-]+)/);
			res[res.length - 1].alternateMatch = "Faves:&nbsp;placeholder";
	}
	if (inFaveRatios) {
		res.push(/^fav\/view >= 5%/);
			res[res.length - 1].alternateMatch = "F/V&nbsp;5%";
	}
	for (var i = 0; i < res.length; ++i) {
		var match = lc.match(res[i]);
		if (match != null) {
			if (res[i].alternateMatch != null) {
				if (match.length > 1) {
					return res[i].alternateMatch.replace(/placeholder/, match[1]);
				} else {
					return res[i].alternateMatch;
				}
			} else if (match.length > 1) {
				return match[1];
			} else {
				return match[0]
			}
		}
	}
	return null;
}



var faveResults = new Array(RATIO_PAGE_LIMIT * 20);


function processFaveRatios() {
	for (var i = 0; i < RATIO_PAGE_LIMIT; ++i) {
		finished[i] = false;
	}

	var theHeader = xpath("//p[@style='font-size: 14px;']");
	if (theHeader.snapshotLength > 0) {
		theHeader = theHeader.snapshotItem(0);
		theHeader.setAttribute("id", "RatioHeaderPlaceholder");
		theHeader.innerHTML = "";
	}
	
	var theTable = xpath("//table[@class='PopularPic']");
	if (theTable.snapshotLength == 0) {
		return;
	}
	theTable = theTable.snapshotItem(0);
	var working = document.createElement("p");
	working.setAttribute("style", "font-size: 18px;");
	working.setAttribute("align", "center");
	working.setAttribute("id", "RatioTablePlaceholder");
	working.appendChild(document.createTextNode("Retrieving data for views and favorites..."));
	theTable.parentNode.replaceChild(working, theTable);

	var href = document.location + "";
	href = href.replace(/\?faveRatio=true$/, "");
	for (var i = 1; i <= RATIO_PAGE_LIMIT; ++i) {
		var url = href + (i == 1 ? "" : "page" + i);
		request(url, i);
	}
	removePageLinks();
}

var finished = new Array(RATIO_PAGE_LIMIT);

function finishRequest(pageNumber) {
	finished[pageNumber - 1] = true;
	log("Completed page " + pageNumber);

	var numFinished = 0;
	for (var i = 0; i < RATIO_PAGE_LIMIT; ++i) {
		if (finished[i]) numFinished++;
	}

	var theHeader = xpath("//p[@id='RatioTablePlaceholder']");
	if (theHeader.snapshotLength > 0) {
		theHeader = theHeader.snapshotItem(0);
		theHeader.innerHTML = "Retrieving data for views and favorites, " + numFinished + " page" + s(numFinished) + " complete, " + RATIO_PAGE_LIMIT + " page" + s(RATIO_PAGE_LIMIT) + " total...";
	}


	for (var i = 0; i < RATIO_PAGE_LIMIT; ++i) {
		if (!finished[i]) return;
	}
	createPage();
}

function createPage() {
	log("All requests complete");
	var goodArray = new Array();
	for (var i = 0; i < faveResults.length; ++i) {
		if (faveResults[i] != null) {
			goodArray.push(faveResults[i]);
		}
	}
	faveResults = goodArray;
	faveResults.sort(function(a, b) {
		if (a.pct < b.pct) return 1;
		if (a.pct > b.pct) return -1;
		return 0;
	});

	var list = xpath("//p[@id='RatioTablePlaceholder']");
	if (list.snapshotLength > 0) {
		var theTable = list.snapshotItem(0);
		var newTable = document.createElement("table");
		newTable.setAttribute("class", "PopularPic");
		newTable.setAttribute("align", "center");
		newTable.setAttribute("cellspacing", "0");
		for (var i = 0; i < faveResults.length; ++i) {
			var res = faveResults[i];
			var newRow = document.createElement("tr");
			var cell1 = document.createElement("td");
			var cell2 = document.createElement("td");
			var cell3 = document.createElement("td");
			cell1.innerHTML = res.row.td[0];
			var html = "" + res.row.td[1];
			html = html.replace(/#\d+:/g, "#" + (i + 1) + ":");
			cell2.innerHTML = html;
			cell3.align = "center";
			var span = document.createElement("span");
			if (res.pct >= 0.05 && res.faves >= 5) {
				span.setAttribute("style", "color:green;font-weight:bold;");
			} else {
				span.setAttribute("style", "color:red;");
			}
			span.appendChild(document.createTextNode((res.pct * 100).toFixed(2) + "%"));
			cell3.appendChild(span);
			newRow.appendChild(cell1);
			newRow.appendChild(cell2);
			newRow.appendChild(cell3);
			newTable.appendChild(newRow);
		}
		theTable.parentNode.replaceChild(newTable, theTable);

		var theHeader = xpath("//p[@id='RatioHeaderPlaceholder']");
		if (theHeader.snapshotLength > 0) {
			theHeader = theHeader.snapshotItem(0);
			theHeader.innerHTML = "This is a view of your " + faveResults.length + " most popular photo" + s(faveResults.length) + ", ordered by favorites-to-views ratio.";
		}
	}
	processViewFaveGroups();
}


function request(theUrl, pageNumber) {
	GM_xmlhttpRequest({
		method: "GET",
		url: theUrl,
		headers: {
			"User-agent": "Mozilla/4.0 (compatible) Greasemonkey (Flickr Fave Ratio Display)",
			"Accept": "application/atom+xml,application/xml,text/xml",
		},
		onload: function(responseDetails) {
			var doc = responseDetails.responseText.replace(/<!DOCTYPE HTML PUBLIC "-\/\/W3C\/\/DTD HTML 4\.01 Transitional\/\/EN">/, "");
			doc = doc.replace(/<meta[^>]+>/g, "");
			doc = doc.replace(/<link[^>]+>/g, "");
			doc = doc.replace(/title="your printing shopping cart *"><\/a>/, "title=\"your printing shopping cart \"/></a>");
			doc = doc.replace(/&rand=/g, ",rand=");
			doc = doc.replace(/&nbsp\;/g, "");
			doc = doc.replace(/&copy\;/g, "");
			doc = doc.replace(/&bull\;/g, "");
			doc = doc.replace(/&/g, " and ");
			doc = doc.replace(/<\/b> *people<\/b>/g, "</b> people");
			doc = doc.replace(/<\/b> *person<\/b>/g, "</b> person");
			doc = doc.replace(/comments<\/li>/g, "comments");
			doc = doc.replace(/comment<\/li>/g, "comment");
			doc = doc.replace(/<img src=.\/images\/candy_nav_button[^>]+>/g, "DEL_IMG");
			doc = doc.replace(/<img id=.person_hover[^>]+>/g, "DEL_IMG");
			doc = doc.replace(/<img src=.\/images\/personmenu[^>]+>/g, "DEL_IMG");
			doc = doc.replace(/<input[^>]+>/g, "DEL_INPUT");
			var loc = doc.lastIndexOf("<div class=\"BottomStrip\">");
			if (loc > 0) {
				doc = doc.substr(0, loc - 1) + "</body></html>";
			}
			//log(doc);

			doc = new XML(doc);
			var rowNum = 0;
			for each (row in doc.body.div.table.(function::attribute('class')=='PopularPic').tr) {
				var link = row.td[0].a[0];
				var linkUrl = link.@href;
				var image = link.img[0];
				var photoId = linkUrl.match(/\/([0-9]+)\//)[1];
				var viewCount = 0;
				var faveCount = 0;
				for each (small in row.td.small) {
					viewCount = small.b[0];
					if (small.a.length() > 0) {
						faveCount = small.a[0].b[0];
					}
				}
				var result = new Result(photoId, linkUrl, viewCount, faveCount, row);
				faveResults[(pageNumber - 1) * 20 + rowNum] = result;
				rowNum++;
			}
			finishRequest(pageNumber);
		}
	});
}

function Result(photoId, url, viewCount, faveCount, row) {
	this.photoId = photoId;
	this.url = url;
	this.views = viewCount * 1;
	this.faves = faveCount * 1;
	this.row = row;
	this.pct = (this.views == 0) ? 0 : this.faves / this.views;
}

function processTop() {
	var href, list, newLink, theLink;
		
	list = xpath("//ul/li/a[contains(@href, 'popular-interesting')]");
	if (list.snapshotLength > 0) {
		theLink = list.snapshotItem(0);
		href = theLink.href;
		newLink = document.createElement("a");
		newLink.href = href.replace(/popular-interesting\/*/, "popular-faves/?faveRatio=true");
		newLink.appendChild(document.createTextNode("fave/view ratio"));
		var dash = document.createTextNode(" - ");
		var parent = theLink.parentNode;
		var newLi = document.createElement("li");
		newLi.appendChild(document.createTextNode("Highest "));
		newLi.appendChild(newLink);
		addNodeAfter(parent, newLi);
	}

	list = xpath("//ul/li/a[contains(@href, 'popular-views')]|//ul/li/a[contains(@href, 'popular-faves')]");
	for (var i = 0; i < list.snapshotLength; ++i) {
		theLink = list.snapshotItem(i);
		href = theLink.href;
		if (href.indexOf("faveRatio") >= 0) continue;
		newLink = document.createElement("a");
		newLink.href = href + "?manageGroups=true";
		newLink.appendChild(document.createTextNode("with groups"));
		var dash = document.createTextNode(" - ");
		addNodeAfter(theLink, dash);
		addNodeAfter(dash, newLink);
	}

}

function rewriteTabBar() {
	var tabHolder = xpath("//h3[@class='Tab']");
	if (tabHolder.snapshotLength == 0) {
		return;
	}
	tabHolder = tabHolder.snapshotItem(0);

	var linkList = xpath("//span[@class='TabOut']/a");
	if (linkList.snapshotLength == 0) {
		return;
	}
	var firstLink = linkList.snapshotItem(0).href;
	firstLink = firstLink.replace(/\/popular-[^\/]*\/$/, "/");
	firstLink = firstLink.replace(/http:\/\/www.flickr.com/, "");

	var viewGroups = newTab("View Groups", firstLink, inViewGroups, "popular-views/?manageGroups=true");
	var faveGroups = newTab("Fave Groups", firstLink, inFaveGroups, "popular-faves/?manageGroups=true");
	var faveRatio = newTab("Fave Ratios", firstLink, inFaveRatios, "popular-faves/?faveRatio=true");

	tabHolder.appendChild(viewGroups);
	tabHolder.appendChild(document.createTextNode(" "));
	tabHolder.appendChild(faveGroups);
	tabHolder.appendChild(document.createTextNode(" "));
	tabHolder.appendChild(faveRatio);

	if (inViewGroups || inFaveGroups || inFaveRatios) {
		linkList = xpath("//span[@class='TabIn']");
		if (linkList.snapshotLength > 0) {
			var normalSpan = linkList.snapshotItem(0);
			var spanText = normalSpan.innerHTML;
			if (spanText == "Views") {
				normalSpan.parentNode.replaceChild(newTab("Views", firstLink, false, "popular-views/"), normalSpan);
			} else if (spanText == "Favorites") {
				normalSpan.parentNode.replaceChild(newTab("Favorites", firstLink, false, "popular-faves/"), normalSpan);
			}
		}
	}
}

function newTab(tabName, linkStart, inTab, suffix) {
	var newSpan = document.createElement("span");
	var theClass = inTab ? "In" : "Out";
	newSpan.setAttribute("class", "Tab" + theClass);
	var child;
	if (inTab) {
		child = document.createTextNode(tabName);
	} else {
		child = document.createElement("a");
		child.href = linkStart + suffix;
		child.appendChild(document.createTextNode(tabName));
	}
	newSpan.appendChild(child);
	return newSpan;
}

function removePageLinks() {
	var list = xpath("//div[@class='paginator']");
	if (list.snapshotLength > 0) {
		var div = list.snapshotItem(0);
		var newDiv = document.createElement("div");
		div.parentNode.removeChild(div);
	}
}


function rewritePageLinks() {
	appendGroupSyntaxToLinks("//div[@class='Paginator']/a[contains(@href, 'page')]");
	appendGroupSyntaxToLinks("//div[@class='Paginator']/a[substring(@href, string-length(@href) - 13)='popular-views/']");
}

function appendGroupSyntaxToLinks(xpathQuery) {
	var list, link;
	list = xpath(xpathQuery);
	for (var i = 0; i < list.snapshotLength; ++i) {
		link = list.snapshotItem(i);
		link.href += "?manageGroups=true";
	}
}

function matches(string, re) {
	return re.test(string);
}


function addNodeBefore(currentNode, newNode) {
	currentNode.parentNode.insertBefore(newNode, currentNode);
}

function addNodeAfter(currentNode, newNode) {
	currentNode.parentNode.insertBefore(newNode, currentNode.nextSibling);
}

function xpath(query, startingPoint) {
	if (startingPoint == null) {
		startingPoint = document;
	}
	var retVal = document.evaluate(query, startingPoint, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	return retVal;
}

function log(s) {
	GM_log(s);
}

function s(num) {
	if (num == 1) return "";
	return "s";
}

var API_KEY = "e3b09781d38beaf2e3d705c0320eac47";

process();