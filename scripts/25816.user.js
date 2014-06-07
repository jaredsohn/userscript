// ==UserScript==
// @name           Runningahead.com Pace Adder
// @version        0.4
// @namespace      http://lowpro.ca/ra_pace
// @description    Adds average pace columns to the summary page on runningahead.com logs. Email sean@lowpro.ca with questions, suggestions, or additions.
// @include        http://runningahead.com/logs/*
// @include        http://www.runningahead.com/logs/*
// ==/UserScript==

// stuff stolen from RA javascript files

function TimeStringToSeconds(strTime)
{
 var vecResults = strTime.match(/^((\d+):)?([0-5]?\d):([0-5]?\d)$/);

 var nSeconds = 0;

 if (vecResults != null && vecResults.length >= 3)
 {
 var tmp = parseInt(vecResults[2], 10);
 if (!isNaN(tmp))
 nSeconds += tmp;
 nSeconds *= 60;

 var tmp = parseInt(vecResults[3], 10);
 if (!isNaN(tmp))
 nSeconds += tmp;
 nSeconds *= 60;

 var tmp = parseInt(vecResults[4], 10);
 if (!isNaN(tmp))
 nSeconds += tmp;
 }
 return nSeconds;
}

function SecondsToTimeString(nSeconds)
{
 var strTime = "";
 var nMinutes = Math.floor(nSeconds / 60);
 nSeconds -= nMinutes * 60;
 var nHours = Math.floor(nMinutes / 60);
 nMinutes -= nHours * 60;

 if (nHours > 0)
 strTime = nHours.toString() + ":";

 if (nMinutes < 10 && nHours > 0)
 strTime += "0";
 strTime += nMinutes.toString() + ":";

 if (nSeconds < 10)
 strTime += "0";
 strTime += nSeconds.toString();

 return strTime;
}

// my stuff starts here

var allHeaders, thisHeader;
allHeaders = document.evaluate(
  "//td[@class='header']",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
for (var i = 0; i < 2; i++) {
	thisHeader = allHeaders.snapshotItem(i);
	thisHeader.colSpan += 1;
}

var allLogInfos, thisLogInfo;
allLogInfos = document.evaluate(
  "//td[@class='key2']",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
for (var i = 0; i < allLogInfos.snapshotLength; i++) {
	thisLogInfo = allLogInfos.snapshotItem(i);
	// get rid of border;
	thisLogInfo.nextSibling.nextSibling.style.borderRight = 'none';
	// then add info;
	newTD = document.createElement('td');
	miles = parseFloat(thisLogInfo.nextSibling.innerHTML);
	seconds = TimeStringToSeconds(thisLogInfo.nextSibling.nextSibling.innerHTML);
  result = SecondsToTimeString(Math.round(seconds / miles));
	newTD.innerHTML = (miles > 0) ? result : "N/A";
	thisLogInfo.parentNode.insertBefore(newTD, thisLogInfo.nextSibling.nextSibling.nextSibling);
}
