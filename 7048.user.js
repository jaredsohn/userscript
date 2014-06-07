// ==UserScript==
// @name          Flickr - Photo Rank
// @description	  Display photo rank (if the photo can be found in 500 most interesting photos of the day)
// @author	  Rafal Smyka
// @namespace     http://smyka.net/flickr
// @include       http://www.flickr.com/photos/*
// @include       http://flickr.com/photos/*
// @version       4.0 2007-01-19
// ==/UserScript==

/*
 Installation
 ------------
 This is a Greasemonkey user script.

 To install, you need FireFox  http://www.mozilla.org/firefox and the firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
 Install the Greasemonkey extension then restart Firefox and revisit this script.
 Under Tools, there will be a new menu item to "Install User Script".
 Accept the default configuration and install.

 To uninstall, go to Tools/Manage User Scripts,
 select "Flickr - Multi Group Sender" and click Uninstall.

 --------------------------------------------------------------------

 Usage Instructions
 ------------------

 Changelog:
 ----------
 v1.0	2006-12-14	Initial Release
 v2.0	2007-01-13	When the photo in not in first 1000, appropriate message is displayed too.
 					If photo in first 500, linked to explore page where you can see it.
 v3.0	2007-01-19	Problem with timezones fixed (due to timezones the photo was displayed
 						with other date than it atctually was present in explore).
 						Now sending requests for day before and day after too
 						to make sure we get it if it's classified.
 						This sends 6 requests (2 per day) instead of 2, but is
 						much more reliable.
 					Additional check with XPath if the photo ID is present on the
 						interestingness response. Loop to find rank # is only performed
						for the list the photo is on now. I guess it should be faster.
						I assume the XPath expression is evaluated with some
						native code while the looping itself is JS.
 v4.0	2008-05-31	Flickr doesn't return photo rank above 500 anymore.
 						Therefore the number of AJAX requests can be reduced from 6 to 2
						(requests to check rank between 500 and 1000 became obsolete).
*/

var currentPhotoId;
var responsesProcessed = 0;
var datePosted;
var dayBefore;
var dayAfter;

//GM_log("Script running?");

function sendRankingRequests() {
	var closestElementWithId = document.getElementById("photoswftd");
	if (!closestElementWithId) {
		return;
	}

	currentPhotoId = extractPhotoId();
	if (currentPhotoId) {
		//GM_log("Photo '" + currentPhotoId + "' posted on: '" + datePosted + "'");

		var parentElement = closestElementWithId.parentNode;
		var postedLink = document.evaluate("td[2]/div/a[2]", parentElement, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).href;
		var	dateRegexp1 = /^.*date-posted\//;
		var dateRegexp2 = /\/$/;

        var datePostedStr = postedLink.replace(dateRegexp1, "").replace(dateRegexp2, "");
        determineDates(datePostedStr);

	    sendRequest(datePosted, 1, handleResponsePhotoDate);
	    //sendRequest(datePosted, 2, handleResponsePhotoDate);
	    sendRequest(dayBefore, 1, handleResponseDayBefore);
	    //sendRequest(dayBefore, 2, handleResponseDayBefore);
	    sendRequest(dayAfter, 1, handleResponseDayAfter);
	    //sendRequest(dayAfter, 2, handleResponseDayAfter);
	}
}

function determineDates(datePostedStr) {
	var datePostedTmp = new Date(datePostedStr);
	datePosted = toDateStrObject(datePostedTmp);

	var dayBeforeTmp = new Date(datePostedStr);
	dayBeforeTmp.setDate(dayBeforeTmp.getDate() - 1);
	dayBefore = toDateStrObject(dayBeforeTmp);

	var dayAfterTmp = new Date(datePostedStr);
	dayAfterTmp.setDate(dayAfterTmp.getDate() + 1);
	dayAfter = toDateStrObject(dayAfterTmp);

	//GM_log("Posted on: " + datePosted + ", day before: " + dayBefore + ", day after: " + dayAfter);
}

function toDateStrObject(date) {
	var month = date.getMonth() + 1;
	var monthStr = "" + month;
	if (month < 10) {
		monthStr = "0" + monthStr;
	}
	var dayStr = "" + date.getDate();
	if (date.getDate() < 10) {
		dayStr = "0" + dayStr;
	}
	return {
		year: "" + date.getFullYear(),
		month: monthStr,
		day: dayStr,
		toString: function() {
			return this.year + "-" + this.month + "-" + this.day;
		},
		customToString: function(separator) {
			return this.year + separator + this.month + separator + this.day;
		}
	};
}

function extractPhotoId() {
	var photoIdElementParent = document.getElementById("photoswftd");
	var photoIdCandidates = document.evaluate("//h1", photoIdElementParent, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; i < photoIdCandidates.snapshotLength; i++) {
		var candidate = photoIdCandidates.snapshotItem(i).id;
		if (candidate.substring(0,9) == "title_div") {
			return candidate.substring(9);
		}
	}
}

function sendRequest(date, page, handler) {
	var dateStr = date.customToString("-");
	//GM_log("Date str: " + dateStr);

	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.flickr.com/services/rest?method=flickr.interestingness.getList&api_key=b29ce998f7e9588ad4b020e73c45cc52&date=" + dateStr + "&per_page=500&page=" + page,
		onload: handler
	});
}

function handleResponsePhotoDate(responseDetails) {
	//GM_log("Handling response for photo date");
	handleRankingResponse(responseDetails, datePosted);
}

function handleResponseDayBefore(responseDetails) {
	//GM_log("Handling response for day before");
	handleRankingResponse(responseDetails, dayBefore);
}

function handleResponseDayAfter(responseDetails) {
	//GM_log("Handling response day after");
	handleRankingResponse(responseDetails, dayAfter);
}

function handleRankingResponse(responseDetails, date) {
	//GM_log("Response received, status: '" + responseDetails.status + "'");
	if (responseDetails.status = 200) {
		var flickrResponse = (new DOMParser()).parseFromString(responseDetails.responseText, "text/xml");
		var flickrStatus = flickrResponse.evaluate("//rsp/attribute::stat", flickrResponse, null, XPathResult.STRING_TYPE, null).stringValue;
		//GM_log("Flickr status: '" + flickrStatus + "'");
		if (flickrStatus = "ok") {
			//GM_log("Checking XPath: //rsp/photos/photo/attribute::id=" + currentPhotoId);
			var photoOnList = flickrResponse.evaluate("//rsp/photos/photo/attribute::id=" + currentPhotoId, flickrResponse, null, XPathResult.BOOLEAN_TYPE, null).booleanValue;
			if (photoOnList) {
				//GM_log("Photo present on list");
				var pageNo = flickrResponse.evaluate("//rsp/photos/attribute::page", flickrResponse, null, XPathResult.STRING_TYPE, null).stringValue;
				//GM_log("Returned page number: '" + pageNo + "'");

				var counter = (pageNo - 1) * 500;
				var photoIds = flickrResponse.evaluate("//rsp/photos/photo/attribute::id", flickrResponse, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				for (i = 0; i < 500; i++) {
					var photoIdAttribute = photoIds.snapshotItem(i);
					if (photoIdAttribute) {
						var photoId = photoIdAttribute.value;
						//GM_log("Checking photo ID: '" + photoId + "'");
						if (currentPhotoId == photoId) {
							var index = (pageNo - 1) * 500 + i + 1;
							//GM_log("Match found! Index is '" + index + "'");
							displayIndex(index, date);
							return;
						}
					}
				}
			}
		}
	}
	if (++responsesProcessed > 2) {
		// photo not found in inrerestingness
		displayNotFound();
	}
}

function displayIndex(index, date) {
	var liElement = document.createElement("li");
	liElement.className = "Stats";

	//GM_log("Index: " + index);
    var indexElement = liElement;
	if (index <= 500) {
		var linkElement = document.createElement("a");
		linkElement.href = "http://flickr.com/explore/interesting/" + date.customToString("/") + "/page" + Math.ceil(index /10);
		//GM_log("Index href: " + linkElement.href);
		indexElement = linkElement;
		liElement.appendChild(linkElement);
	}

    var boldElement = document.createElement("b");
	boldElement.appendChild(document.createTextNode(index));

	indexElement.appendChild(document.createTextNode("#"));
	indexElement.appendChild(boldElement);

	liElement.appendChild(document.createTextNode(" in interestingness (on " + date.customToString("-") + ")"));

	var favesElement = document.getElementById("faves_p");
	favesElement.parentNode.insertBefore(liElement, favesElement);
}

function displayNotFound() {
	var liElement = document.createElement("li");
	liElement.className = "Stats";
	liElement.appendChild(document.createTextNode("Not found  in 500 most interesting"));

	var favesElement = document.getElementById("faves_p");
	favesElement.parentNode.insertBefore(liElement, favesElement);
}

sendRankingRequests();

