// ==UserScript==
// @name           checkVisited
// @namespace      http://apps.facebook.com/fluff/
// @description    Check if a fluff book is visited
// @include        *
// ==/UserScript==

var checkLinkFreq = 5000; // in milliseconds
var lookupName = "fluffVisits";
var checkStr = "fluffbook.php?id=";
var idSep = "x";
var marker = 0;
var idList;
var locidx = location.href.indexOf(checkStr);

function refreshIdList() {
	var todayDate = new Date();
	var year = todayDate.getUTCFullYear();
	var month = todayDate.getUTCMonth() + 1;
	if (month < 10) {
		month = "0" + month;
	}
	var day = todayDate.getUTCDate();
	var dateStr = "" + year + month + day;

	var checkDate = GM_getValue(lookupName+".checkDate");

	if (checkDate == dateStr) { // if check the valid day of the list
		idList = GM_getValue(lookupName); // load the id list
		if (idList == null) {
			idList = "";
		}
	}else { // if valid day is over, clear the list
		idList = ""; // clear id list and start anew
		GM_setValue(lookupName, "");
		GM_setValue(lookupName+".checkDate", dateStr);
	}
	var cLength = idList.length;
	var changed = cLength != marker; // check the length of id list to see if it's the same before refresh
	marker = cLength; // save the legth of id list
	return changed; // return whether there's changes to idList
}

refreshIdList();

if (locidx > 0) { // if current url is a fluffbook
	var visitId = location.href.substring(locidx + checkStr.length); // get the fluff id
	if (visitId != "") {
		var idx2 = visitId.indexOf("&"); // remove unwanted elements in the id
		if (idx2 > 0) {
			visitId = visitId.substring(0, idx2);
		}
		if (idList.indexOf(visitId) < 0)  { // only add to list if is not already in list
			GM_setValue(lookupName, idList + visitId + idSep); // add fluff id to id list and save
		}
	}
}

function checkLinks() {
	var myLinks = document.getElementsByTagName("a"); // retrieve all the hyperlinks in this page
	for (var i=0; i<myLinks.length; i++) { // for each link,
		var anchorUrl = myLinks[i].href;
		var idx = anchorUrl.indexOf(checkStr); // check if this link is to a fluffbook
		if (idx >= 0) {
			var theId = anchorUrl.substring(idx + checkStr.length) + idSep; // get the id from link
			if (idList.indexOf(theId) >= 0) {  // if the id is in the id list, change the color
				myLinks[i].style.color="#780078";
			}else {
				myLinks[i].style.color="";
			}
		}
	}
}

var t;
var performCheck = true;
function executeCheckLinks() {
	if (performCheck) { // if id list has changed, then check the links
		checkLinks();
	}
	if (checkLinkFreq != null && checkLinkFreq != "" && isFinite(checkLinkFreq) && checkLinkFreq > 0) { // if freq is negative, do not loop
		performCheck = refreshIdList(); // refresh list
		t = setTimeout(executeCheckLinks, checkLinkFreq); // perform this function again <checkLinkFreq> ms later
	}
}
executeCheckLinks();
//document.write("<div class=\"z-index:1;position:fixed;bottom:100px;right:100px;\"><input type=\"button\" onClick=\"setCookie('fluffVisits', '')\" value=\"Reset\"/></div>");
/*
var blk = document.createElement("div");
blk.style.zIndex="1";
blk.style.position="fixed";
blk.style.right="20px";
blk.style.bottom="70px";
//blk.style.border="
blk.innerHTML = "<input type=\"text\" value=\"" + checkLinkFreq + "\" size=\"6\" onChange=\"checkLinkFreq=this.value;alert(checkLinkFreq);\">";
document.getElementsByTagName("body")[0].appendChild(blk);
*/
