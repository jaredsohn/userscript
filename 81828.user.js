// ==UserScript==
// @name          Flickr - Photo Rank
// @description	  Display photo rank (if the photo can be found in 500 most interesting photos of the day)
// @author	  Rafal Smyka
// @contributor	  Alesa Dam
// @namespace     http://smyka.net/flickr
// @include       http://www.flickr.com/photos/*
// @include       http://flickr.com/photos/*
// @match         http://www.flickr.com/photos/*
// @match         http://flickr.com/photos/*
// @downloadURL	  https://userscripts.org/scripts/source/81828.user.js
// @updateURL	  https://userscripts.org/scripts/source/81828.meta.js
// @version       5.4
// @modified	  2013-10-01
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
 v4.0   2010-07-xx  Support for the new photo page layout
 v5.0   2010-08-11  Support for non-en_US languages
 v5.2   2013-05-23  Support for the new photo page layout
 v5.3	2013-05-31  Language independent - better Chrome support
 v5.4	2013-10-01  Update for API change
*/

(function() {

var currentPhotoId;
var responsesProcessed = 0;

if (typeof(GM_log) == "undefined") {
	var GM_log = function(message) {
		console.info('FPR: ' + message);
	}
}

//GM_log("Script running?");

function getJSVariable(reMatch) {
    var scripts = document.evaluate("//script", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0, len = scripts.snapshotLength; i < len; ++i) {
	var script = scripts.snapshotItem(i);
	var html = script.innerHTML;
	try {
	    retval = html.match(reMatch)[1];
	    return retval;
	} catch (e) {
	}
    }
    return retval;
}

function GM_getAPIKey() {
	return getJSVariable(/[\"\']api_key[\"\'][ :]+[\'\"]([^\'\"]+)[\'\"]/);
}

function GM_getAuthHash() {
	return getJSVariable(/[\"\']auth_hash[\"\'][ :]+[\'\"]([^\'\"]+)[\'\"]/);
}

function GM_getOwnerId() {
	return getJSVariable(/[\"\']page_owner[\"\'][ :]+[\"\']([^\"\']+)[\"\']/);
}

function sendRankingRequests() {
	var closestElementWithId = document.getElementById("photo");
    if (!closestElementWithId) {
        GM_log("no photo element found");
        return;
    }

	currentPhotoId = extractPhotoId();
    if (!currentPhotoId) {
        GM_log("no photo id found");
        return;
    }

    determineDates(handleDates);
}

function handleDates(dates) {
	    sendRequest(dates.datePosted, handleRankingResponse);
	    sendRequest(dates.dayBefore, handleRankingResponse);
	    sendRequest(dates.dayAfter, handleRankingResponse);
}

function determineDates(callback) {
    var retval = {};
        var api_key = GM_getAPIKey();
        try {
            var oReq = new XMLHttpRequest();
            oReq.onload = function (responseDetails) {
                    //if (responseDetails.status === 200) {
                        var response = JSON.parse(oReq.response);
			if (response.stat != "ok") {
				GM_log("failed to get photo info: " + response.code + " - " + response.message);
				return;
			}
                        var datePosted = new Date(parseInt(response.photo.dates.posted) * 1000);
                        retval.datePosted = toDateStrObject(datePosted);
                        var dayBefore = new Date(datePosted);
                        dayBefore.setDate(dayBefore.getDate() - 1);
                        retval.dayBefore = toDateStrObject(dayBefore);
                        var dayAfter = new Date(datePosted);
                        dayAfter.setDate(dayAfter.getDate() + 1);
                        retval.dayAfter = toDateStrObject(dayAfter);
                        callback(retval);
                    //}
                };
            oReq.onerror = function (responseDetails) {
                    alert('error');
                };
            oReq.open("get",
		      "http://www.flickr.com/services/rest?method=flickr.photos.getInfo&api_key=" + api_key + "&auth_hash=" + GM_getAuthHash() + "&photo_id=" + currentPhotoId + "&format=json&nojsoncallback=1",
		     true);
	    oReq.send();
        } catch (e) {
            alert("exception: " + e);
        }
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
    return document.location.href.split('/')[5];
}

function sendRequest(date, handler) {
	var dateStr = date.customToString("-");
	//GM_log("Date str: " + dateStr);

	var oReq = new XMLHttpRequest();
	oReq.onload = function (responseDetails) {
            handler(oReq.response, date);
        };
	oReq.open("GET",
		"http://www.flickr.com/services/rest?method=flickr.interestingness.getList&api_key=b29ce998f7e9588ad4b020e73c45cc52&date=" + dateStr + "&per_page=500&page=1",
		true);
	oReq.send();
}

function handleRankingResponse(responseDetails, date) {
	var flickrResponse = (new DOMParser()).parseFromString(responseDetails, "text/xml");
	var flickrStatus = flickrResponse.evaluate("//rsp/attribute::stat", flickrResponse, null, XPathResult.STRING_TYPE, null).stringValue;
	//GM_log("Flickr status: '" + flickrStatus + "'");
	if (flickrStatus = "ok") {
		//GM_log("Checking XPath: //rsp/photos/photo/attribute::id=" + currentPhotoId);
		var photoOnList = flickrResponse.evaluate("//rsp/photos/photo/attribute::id=" + currentPhotoId, flickrResponse, null, XPathResult.BOOLEAN_TYPE, null).booleanValue;
		if (photoOnList) {
			//GM_log("Photo present on list");

			var counter = 0;
			var iterator = flickrResponse.evaluate("//rsp/photos/photo/attribute::id", flickrResponse, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
			for (var photoIdAttributeNode = iterator.iterateNext(); photoIdAttributeNode != null; photoIdAttributeNode = iterator.iterateNext()) {
				var photoId = photoIdAttributeNode.value;
				//GM_log("Checking photo ID: '" + photoId + "'");
				if (currentPhotoId == photoId) {
					displayIndex(counter+1, date);
					return;
				}
				++counter;
			}
		}
	}
	if (++responsesProcessed > 2) {
		// photo not found in inrerestingness
		displayNotFound();
	}
}

function displayIndex(index, date) {
	var div = document.createElement('div');

	var cardinalSpan = document.createElement('span');
	cardinalSpan.innerHTML = "#";
	div.appendChild(cardinalSpan);

	var boldElement = document.createElement("b");
	boldElement.appendChild(document.createTextNode(index));

	//GM_log("Index: " + index);
	if (index <= 500) {
		var linkElement = document.createElement("a");
		linkElement.href = "http://flickr.com/explore/" + date.customToString("/") + "/with/" + currentPhotoId;
		//GM_log("Index href: " + linkElement.href);
		linkElement.appendChild(boldElement);
		div.appendChild(linkElement);
	} else {
		div.appendChild(boldElement);
	}

	var infoSpan = document.createElement('span');
	infoSpan.innerHTML = " in interestingness (on " + date.customToString("-") + ")";
	div.appendChild(infoSpan);

	document.getElementById("photo-sidebar-additional-info").appendChild(div);
}

function displayNotFound() {
	var div = document.createElement('div');
	var span = document.createElement('span');
	span.innerHTML = "Not found  in 500 most interesting";
	div.appendChild(span);
	document.getElementById("photo-sidebar-additional-info").appendChild(div);
}

sendRankingRequests();

})();

