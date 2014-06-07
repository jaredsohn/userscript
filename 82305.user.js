// ==UserScript==
// @name          Flickr Group Display
// @version       3.0
// @description   Easier management for the photos you have in view and favorite groups such as topv-111.  Also displays favorite-to-view ratios.
// @namespace     http://flickr.group.display.com
// @include       http://*flickr.com/photos/*/popular*
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
	--------------------- Updates by Ricardo Mendonça Ferreira: http://www.flickr.com/photos/ricardo_ferreira/440861106/
	V 1.12 - 2007-03-31 - Update to work with another Flickr redesign
	V 1.13 - 2007-04-11 - Update to work with another Flickr redesign
	V 1.14 - 2007-04-11 - Should "break" less for small changes now
	V 1.15 - 2007-05-28 - Added some new groups (favorite, * favourites)
	V 1.16 - 2007-06-16 - Update to work with another Flickr redesign (translations)
	V 1.17 - 2007-08-11 - Update to work with another Flickr redesign
	V 1.18 - 2007-11-30 - Added option to remove photo from pool
	V 1.19 - 2008-01-12 - Fixed bug with "Guest Passes" message
	V 1.20 - 2008-01-18 - Update to work with another Flickr redesign
	V 1.21 - 2008-01-18 - Fixed problem where groups where not showing on Fave Ratios tab
	V 1.22 - 2008-09-16 - Removed "paginator"; several changes under the hood; now works with Firefox 3
	V 1.23 - 2008-11-03 - Update to work with another Flickr redesign
    V 1.24 - 2008-11-04 - Fixed bug where stream containing just one fav would not work
    V 2.0  - Alesa Dam's changes :)
    V 2.1  - removed some logging
    V 2.2  - do not count on 'views' string, but on format of 'views/faves/comments', for other languages
    V 2.3  - 2011-02-15 - support for older FF version that lack JSON support
    V 2.4  - 2011-02-15 - bug fix: view groups with a comma (100,000 Views) only showed as '000 Views'
    V 2.5  - 2011-02-15 - bug fix: view groups with a space (50 000 Views) only showed as '000 Views'
    V 2.6  - 2011-02-18 - support for 'minimum 1500 views' type of groups
    V 3.0  - 2011-02-21 - support for Auto Pager(s)
*/


/*
	Configuration
	=============
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

(function () {
var DISPLAY_ROW_DIVIDERS_VIEWS_25 = true;
var DISPLAY_ROW_DIVIDERS_VIEWS_100 = true;
var DISPLAY_ROW_DIVIDERS_FAVES = true;
var RATIO_PAGE_LIMIT = undefined;

// End Configuration Section


var inTop;
var inViewGroups;
var inFaveGroups;
var inFaveRatios;

var magic_cookie = '';
var magic_temp = document.body.innerHTML.match(/magic_cookie=(.+?)"/i);
if (magic_temp && magic_temp.length >= 2)
     { magic_cookie = magic_temp[1]; }
else {
   magic_temp = document.documentElement.innerHTML.match(/global_auth_hash\s*=\s*[\'\"](.+?)[\'\"]/i);
   if (magic_temp && magic_temp.length >= 2)
      { magic_cookie = magic_temp[1]; }
}

function process() {
	inViewGroups = matches(document.location, /popular-views\/(page[0-9]+\/)?\?manageGroups=true/);
	inFaveGroups = matches(document.location, /popular-faves\/(page[0-9]+\/)?\?manageGroups=true/);
	inFaveRatios = matches(document.location, /popular-faves\/\?faveRatio=true/);

	rewriteTabBar();

	if (inFaveRatios) {
		processFaveRatios();
	} else if (inViewGroups || inFaveGroups) {
		processViewFaveGroups();
	}
}

var rowNum = 0;
function processViewFaveGroups() {
	rewritePageLinks();

	var xpathString = "//tr/td/span[@class='photo_container pc_s']/a[contains(@href, 'photos')]/parent::*/parent::*/parent::*";
	if (inFaveRatios) {
		xpathString = "//table[@class='PopularPic']/tr"; // /td/span/a[contains(@href, 'photos')]/parent::span/parent::td/parent::tr";
	}
	var list = xpath(xpathString);
	for (var i = 0; i < list.snapshotLength; ++i) {
		var row = list.snapshotItem(i);
		processGroupRow(row, ++rowNum);
	}
    document.getElementById('Main').addEventListener('DOMNodeInserted', function(event) {
        try {
            var target = event.target;
            if (target.nodeName == 'TR') {
                processGroupRow(target, ++rowNum);
            }
        } catch (e) {
            GM_log("error on insert: " + e);
        }
    }, true);
}

var previousCount = 999999999;
function processGroupRow(row, rowNum) {
	var currentCount = 0;
	var cell1 = xpath("td[1]", row).snapshotItem(0);
	var cell2 = xpath("td[2]", row).snapshotItem(0);
	if (cell1 == null || cell2 == null) return;
	
	var photoUrl = "";
	//if (inFaveRatios)
	//     { photoUrl = xpath("a", cell1).snapshotItem(0).href; }
	//else { photoUrl = xpath("span/a", cell1).snapshotItem(0).href; }
    photoUrl = xpath("//span/a", cell1).snapshotItem(0).getAttribute('href');
	var photoId = cell1.innerHTML.match(/\/([0-9]+)\//)[1];
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
    newTableCell.setAttribute('nowrap', 'nowrap');
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
        if (DISPLAY_ROW_DIVIDERS_FAVES) {
    		limits.push(5);
	    	limits.push(10);
		    limits.push(25);
    		limits.push(50);
	    	limits.push(100);
        }
	}

	for (var i = 0; i < limits.length; ++i) {
		var createSpacer = false;
/*		if (i == 0) {
			if (previousCount >= limits[i] && currentCount < limits[i]) {
				createSpacer = true;
			} 
		} else */if (previousCount >= limits[i] && currentCount < limits[i]) {
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
		url: "http://www.flickr.com/services/rest/?method=flickr.photos.getAllContexts&photo_id=" + photoId + "&api_key=" + API_KEY + "&format=json&nojsoncallback=1",
		/*headers: {
			"Accept": "application/atom+xml,application/xml,text/xml",
		}, */
		onload: function(responseDetails) {
            try {
                var doc = JSON.parse(responseDetails.responseText);
            } catch (e) {
                GM_log("unable to jsonify \n" + responseDetails.responseText);
                doc = eval('(' + responseDetails.responseText + ')');
            }
			var list = xpath("//td[@id='PoolHolder" + rowNum + "']");
			if (list.snapshotLength > 0) {
				var holder = list.snapshotItem(0);
			}
            var inSupportedGroup = false;
            try {
                if (doc.stat == 'ok') {
                    if (doc.pool) {
                        doc.pool.forEach(function (pool, idx) {
		    		        var poolId = pool.id;
			    	        var poolName = pool.title;
				            var shortPoolName = checkPoolName(poolName);
    				        if (shortPoolName != null) {
                                inSupportedGroup = true;
		    			        linkify(shortPoolName, photoId, poolId, holder);
			    	        }
                        });
                    } // else: 
			    }
            } catch (e) {
                GM_log("error: " + e + " while looping \n" + responseDetails.responseText + 
                    (doc.set ? "\n-> in a set?" : ""));
            }
			if (!inSupportedGroup) {
				if (!inFaveRatios) {
                    var none = document.createElement('span')
                    none.setAttribute('style', 'font-weight:bold;color:red;');
                    none.appendChild(document.createTextNode('None'));
					holder.appendChild(none);
				}
			}
		}
	});
}

function linkify(displayName, photoId, poolId, container) {
    var displaySpan = document.createElement('span');

	var poolLink = document.createElement('a');
    poolLink.href = "http://www.flickr.com/groups/" + poolId + "/pool/with/" + photoId + "/";
    poolLink.appendChild(document.createTextNode(displayName));
    displaySpan.appendChild(poolLink);

    var rem = document.createElement('a');
    rem.title = 'Remove the photo from this pool';
    rem.class = 'Grey';
    rem.href = '#';
    rem.addEventListener('click',
            function (evt) {
                evt.preventDefault();
                if(confirm('Are you sure you want to remove the photo from this pool?')) {
                    GM_xmlhttpRequest({
                        url: "http://www.flickr.com/groups/" + poolId + "/pool/?remove=" + photoId + "&magic_cookie=" + magic_cookie,
                        method: 'get',
                        onload: function (response) {
                            var spanElement = evt.target.parentNode;
                            spanElement.parentNode.removeChild(spanElement);
                        },
                        onerror: function (response) {
                            alert("error deleting: " + response.statusText);
                        }
                    });
                }
            },
            false);
    rem.appendChild(document.createTextNode('[X]'));
    displaySpan.appendChild(rem);
    displaySpan.appendChild(document.createElement('br'));
    
    container.appendChild(displaySpan);
}

function checkPoolName(poolName) {
	var lc = poolName.toLowerCase();
	var res = new Array();
	if (inViewGroups) {
		res.push(/^(top-v)/);
		res.push(/^centurian club/);
			res[res.length - 1].alternateMatch = "Centurian";
        res.push(/^(\d[\s\d,]*) (?:plus )?view club/);
            res[res.length - 1].alternateMatch = "placeholder1 view club";
        res.push(/^minimum (\d[\s\d,]*) views$/);
            res[res.length - 1].alternateMatch = "min. placeholder1 views";
		res.push(/(\d[\s\d,]*) views$/);
			res[res.length - 1].alternateMatch = "placeholder1 views";
        res.push(/(\d[\s\d,]*) views.*(?:no more than)/);
            res[res.length - 1].alternateMatch = "placeholder1 views";
		res.push(/^views: *(\d[\s\d,]*)/);
			res[res.length - 1].alternateMatch = "Views: placeholder1";
        res.push(/^views\s(\d[\s\d,]*)/);
            res[res.length - 1].alternateMatch = "Views placeholder1";
		res.push(/^(\d[\s\d,]*)(?:-)(\d[\s\d,]*) views/);
			res[res.length - 1].alternateMatch = "placeholder1-placeholder2 views";
        res.push(/^\'views:\s*(\d[\s\d,]*)\s*(?:-)\s*(\d[\s\d,]*)/);
            res[res.length - 1].alternateMatch = "'Views: placeholder1-placeholder2";
        res.push(/^(\d[\s\d,]*).*views \(-(\d[\s\d,]*)\)/);
            res[res.length - 1].alternateMatch = "placeholder1 views (-placeholder2)";
        res.push(/^~(\d[\s\d,]*) to (\d[\s\d,]*)~/);
            res[res.length - 1].alternateMatch = "~placeholder1-placeholder2~";
	}
	if (inFaveGroups) {
		res.push(/^([0-9]+) views (?:\+|and) ([0-9]+) fav/);
			res[res.length - 1].alternateMatch = "placeholder1 v + placeholder2 f";
		res.push(/([0-9-]+) favorites/);
			res[res.length - 1].alternateMatch = "placeholder1 v";
		res.push(/^top-f[^\d]*(\d+)/);
            res[res.length - 1].alternateMatch = "top-f [placeholder1+]";
		res.push(/^favorites: *(<?[0-9-]+)/);
			res[res.length - 1].alternateMatch = "Faves: placeholder1";
		res.push(/^faves: *([0-9-]+)/);
			res[res.length - 1].alternateMatch = "Faves: placeholder1";
		res.push(/([0-9-]+) favourites/);
		res.push(/^favourites \((3\+ faves)/);
		res.push(/^(favorite)$/);
		res.push(/greatpixgallery ([0-9]+) faves\+/);
			res[res.length - 1].alternateMatch = "GreatPixGallery: placeholder1";
		res.push(/^([0-9]+) faves (?:\+|and) less than ([0-9]+) views/);
			res[res.length - 1].alternateMatch = "placeholder1 f + < placeholder2 v";
	}
	if (inFaveRatios) {
		res.push(/^fav\/view >= 5%/);
			res[res.length - 1].alternateMatch = "F/V 5%";
		res.push(/^([0-9]+)\+ views .* ([0-9]+)% faves\/views/);
			res[res.length - 1].alternateMatch = "placeholder1 + v + placeholder2%";
        res.push(/^faves extreme (\d+)/);
            res[res.length - 1].alternateMatch = "extreme placeholder1";
	}
	for (var i = 0; i < res.length; ++i) {
		var match = lc.match(res[i]);
		if (match != null) {
			if (res[i].alternateMatch != null) {
				if (match.length > 1) {
					if (match.length > 2) {
						res[i].alternateMatch = res[i].alternateMatch.replace(/placeholder2/,match[2]);
					}
					return res[i].alternateMatch.replace(/placeholder1/, match[1]);
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

var faveResults = undefined;

function processFaveRatios() {

    if (RATIO_PAGE_LIMIT === undefined) {
        var results = xpath("//div[@class='Results']");
        if (results.snapshotLength === 0) {
            RATIO_PAGE_LIMIT = 1;
            alert("no results");
        } else {
            var resultsElement = results.snapshotItem(0);
            var photos = parseInt(resultsElement.innerHTML.match(/(\d+)/)[1]);
            RATIO_PAGE_LIMIT = Math.ceil(photos / 20);
        }
    }
    faveResults = new Array(RATIO_PAGE_LIMIT * 20);

	for (var i = 0; i < RATIO_PAGE_LIMIT; ++i) {
		finished[i] = false;
	}

	// Remove header of the page
	var theHeader = xpath("//p[@style='font-size: 14px;']");
	if (theHeader.snapshotLength > 0) {
		theHeader = theHeader.snapshotItem(0);
		theHeader.setAttribute("id", "RatioHeaderPlaceholder");
		theHeader.innerHTML = "";
	}

	// Remove body of the page
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

	// Remove paginator
	var thePaginator = xpath("//div[@class='Pages']");
	if (thePaginator.snapshotLength > 0) {
		thePaginator = thePaginator.snapshotItem(0);
		thePaginator.innerHTML = "";
	}


	// Request & process the pages
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
	//log("Completed page " + pageNumber);

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
	//log("All requests complete");
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
			cell1.innerHTML = res.td1;
			var html = "" + res.td2;
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
			// alesa: I only want to see photos that have at least 5 faves
			if (res.faves >= 5) {
			    newTable.appendChild(newRow);
		        }
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
		    'Cookie'    : document.cookie,
			'User-agent': "Mozilla/4.0 (compatible) Greasemonkey (Flickr Fave Ratio Display)",
			'Accept'    : "application/atom+xml,application/xml,text/xml",
		},
		onload: function(responseDetails) {
			var table = responseDetails.responseText.replace(/[\r\n]+/g, " ");
			table = table.match(/<table class="PopularPic".+?<.table>/i)[0];
			var rowNum = 0;
            var rows = table.match(/<tr>.+?<\/tr>/ig);
			for (var rowIdx = 0, rowsLen = rows.length-1; rowIdx < rowsLen; ++rowIdx) {
                var row = rows[rowIdx + 1];
				var linkUrl   = row.match(/href="(.+?)"/i)[1];
				var photoId   = linkUrl.match(/\/(\d+)\//)[1];
				//var viewCount = row.match(/<b>.*(\d+)<\/b> views/)[1];
				//var faveCount = row.match(/<b>(\d+)<\/b> (?:people|person)/)[1];
                var viewsAndFavsMatch = row.match(/<small.*<b>(\d+)<\/b>.*\/.*<b>(\d+)<\/b>.*\/.*(?:<b>)?(\d+)(?:<\/b>)?.*<\/small>/);
                if (viewsAndFavsMatch) {
                    var viewCount = viewsAndFavsMatch[1];
                    var faveCount = viewsAndFavsMatch[2];
                    // var commentCount = viewsAndFavsMatch[3];
			    	var td1       = row.match(/<td.*?>(.+?)<\/td>/ig)[0];
				    var td2       = row.match(/<td.*?>(.+?)<\/td>/ig)[1];
    				var result = new Result(photoId, linkUrl, viewCount, faveCount, td1, td2);
	    			faveResults[(pageNumber - 1) * 20 + rowNum] = result;
                } else {
                    GM_log("unable to parse:\n" + row);
                }
				rowNum++;
			}
			finishRequest(pageNumber);
		}
	});
}

function Result(photoId, url, viewCount, faveCount, td1, td2) {
	this.photoId = photoId;
	this.url = url;
	this.views = viewCount * 1;
	this.faves = faveCount * 1;
	this.td1 = td1;
	this.td2 = td2;
	this.pct = (this.views == 0) ? 0 : this.faves / this.views;
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

})();

