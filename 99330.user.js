// ==UserScript==
// @name			BinnewZ Improvements
// @namespace		Takinator
// @description		Remove non-Free posts, add binsearch link and clean search results page layout
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @include			http://*binnews.in/_bin/liste.php*
// @include			http://*binnews.in/_bin/lastrefs.php*
// @include			http://*binnews.in/_bin/search.php*
// @include			http://*binnews.in/_bin/search2.php*
// @include			http://*binnews.me/_bin/liste.php*
// @include			http://*binnews.me/_bin/lastrefs.php*
// @include			http://*binnews.me/_bin/search.php*
// @include			http://*binnews.me/_bin/search2.php*
// @version			0.4
// ==/UserScript==

/*
	History:
	0.4: Encode filenames before appending them to query strings
	0.3: Added NZBIndex.nl search link
	0.2: Added binnews.me domain name
	0.1: Initial version
*/

/**
	Pictures data
*/
var binSearchImg = 
"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAA"+
"0klEQVQ4ja2SsY2EMBBF3542dAHkuAAKIKABMhIiaqAAIgogchcUQEYLU4DJp4DJ76JDC+g4VuyP"+
"rNGfL38/P4qi+OaGvu4sAzz3g2EY1nPbtu8HZFn21g0+X+FVTdNQVRXOOUSEEAIxxo3nsacwz/Of"+
"gapKXdeb2WmFEAJlWaKqACRJQp7n1wPGccTMmKZpnaVpej3gik4DfpG+ol2WZeM5pdD3PaqK9x4A"+
"M0NErgWICGa2PpqZ0XUdZrbxHTDu5b3HOUeM8bD8bwXg8HH2uk3hBx7SSTXHJRa4AAAAAElFTkSu"+
"QmCC";

var nzbIndexImg = 
"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ"+
"bWFnZVJlYWR5ccllPAAAAMdJREFUeNpi/P//PwMlgImBQkCxASwC1gXlQLoDiDuBeBYQ3wXiCiB2"+
"gWIYAMkpIYndA2JXZBekoRnuCsSMQJyOpAFGm0ANC0U2QBDNRhhwQXIBDJzFFQboBoAMDQXiPUD8"+
"HkncGOYadANCcRi4B0kM5PQzUANRDNiDxfmhWJx/Dxo2IFCOzwBYmJxFcz5yOBijG/AezfkgQ1bj"+
"SQbvkQ14j+YKmPOxGSAIDcg96IG4B0tIgxIWKMPsRgrEd1ALZzEO/cwEEGAAj+EuGiSzrJQAAAAA"+
"SUVORK5CYII=";

/**
	Remove newsgroups and posts not allowed to Free.fr NNTP users and remove odd/event row colors
	@param sRecord jQuery Search record element (Search results table row)
	@return false if Post has been removed, true otherwise.
*/
function RemoveNotFreeNewsgroups(sRecord) {
	var result;
	var newsgroupsCount = $("td a.c16[href^='liste.php']", sRecord).length;
	var $noFreeLinks = $("td a img[src$='notfree.gif']", sRecord);
	
	if (newsgroupsCount == $noFreeLinks.length) {
		// All newsgroups are locked
		sRecord.remove();
		result = false;
	}
	else {
		// Some newsgroups to remove
		$noFreeLinks.parent().prev().remove();
		$noFreeLinks.remove();
		sRecord.attr("style", "background-color: #e6f2ff; border-bottom: solid 1px #999");
		result = true;
	}
	return result;
}

/**
	Add BinSearch search link to search result row
	@param sRecord jQuery Search record element (Search results table row)
*/
function AddSearchLinks(sRecord) {
	var $flagTd = $("td img[src*='/flag_']", sRecord).parent();
	var $postTitle = $flagTd.prev();
	var postFileName = escape($flagTd.next().next().text());
	$postTitle.prepend("<a href=\"http://www.binsearch.info/?q="
		+ postFileName
		+ "&max=100&adv_age=21&server=\"><img src=\"data:image/png;base64,"
		+ binSearchImg
		+ "\"/></a>"
		+ " <a href=\"http://www.nzbindex.nl/search/?q="
		+ postFileName
		+ "&age=30&max=100&sort=agedesc&minsize=&maxsize=&dq=&poster=&nfo=&hidespam=0&hidespam=1"
		+ "&more=0\"><img src=\"data:image/png;base64,"
		+ nzbIndexImg
		+ "\"/></a>");
}

/**
	Remove useless html blocks (Ads, warning text), adjust layout
*/
function CleanPage() {
	var $adDiv = $($("body.menubg div")[0]);
	$adDiv.next().remove();
	$adDiv.remove();
	$xitiDiv = $("#xiti-logo");
	$xitiDiv.prev().remove();
	$xitiDiv.remove();
	$("#tabliste").attr("style", "margin: 0.5em; width: 99%;");
}

/**
	Main entry point
	Iterates through search results and apply enhancements
*/
function Main() {
	var $searchRecords = $("#tabliste tr[class^='ligne']:has(td)");
	
	$searchRecords.each(function(i) {
		if (RemoveNotFreeNewsgroups($(this))) {
			AddSearchLinks($(this));
		}
	});
	CleanPage();
}

Main();
