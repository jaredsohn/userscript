// Copyright (c) 2010-2011, RxR

// ==UserScript==
// @name	Ikariam Inbox with Links
// @namespace	RxR Ikariam
// @description	Get mad copying all the web-addresses from your inbox to address line? This little one adds real links to your inbox.
// @include	http://*.ikariam.*/index.php?*view=diplomacyAdvisor*
// @include	http://*.ikariam.*/index.php?*action=Messages*function=processUserMessage*
// @include	http://*.ikariam.*/index.php?*action=Messages*function=markAsDeletedByReceiver*
//
// Auto-update function. Many thanks, Buzzy!
// @require	http://buzzy.260mb.com/AutoUpdater.js
// @version	0.07
//
// @history	0.07 29.03.2011	added detection of "error" message
// @history	0.06 29.03.2011	fixed calculation of current page after deleting of one message
// @history	0.05 26.03.2011	fixed one minor bug
// @history	0.04 24.03.2011	added direct jumps to pages in "paginator" line
// @history	0.03 23.02.2011	removed dependence on Ikariam ExMachina - script worked only if Ikariam ExMachina was installed
// @history	0.02 08.11.2010	added include http://*.ikariam.*/index.php?*action=Messages*function=markAsDeletedByReceiver*
// @history	0.01 08.11.2010	Here we are! :D
//
// ==/UserScript==

const scriptID = 90021;
const scriptVersion = "0.07";

autoUpdate (scriptID, scriptVersion);				// Buzzy's autoaupdate

var delayForReady = 10;						// delay in milliseconds for waitForReady's setTimeout
waitForReady(main, delayForReady);				// wait while document is ready and then call main()

// ************************************************************************************************************************
function main() {

// insert links
var myTable = xpath(document, '//div[@id="messages"]/descendant::table[@id="messages"]');
if (myTable.snapshotLength != 1) return;
myTable = myTable.snapshotItem(0);

// var msgs = xpath(myTable, 'child::tbody/tr[contains(@class, "entry") and contains(@class, "exMachinaParsed")]');
var msgs = xpath(myTable, 'tbody/tr[contains(@class, "entry")]');
if (msgs.snapshotLength == 0) msgs = xpath(document, '//div[@id="messages"]/descendant::table[@id="messages"]/tbody/tr[contains(@class, "entry")]');
for (var i = 0; i < msgs.snapshotLength; i++) {
	var r = msgs.snapshotItem(i);
	r.cells[1].addEventListener("click", function() { insertLinks (this); }, true);
	r.cells[2].addEventListener("click", function() { insertLinks (this); }, true);
	r.cells[3].addEventListener("click", function() { insertLinks (this); }, true);
	r.cells[5].addEventListener("click", function() { insertLinks (this); }, true);
}

/*
<tr>	<td style="text-align: left;" colspan="3">
		<a href="?view=diplomacyAdvisor">1</a>&nbsp;&nbsp;<a href="?view=diplomacyAdvisor&amp;start=10">2</a>&nbsp;&nbsp;<a href="?view=diplomacyAdvisor&amp;start=20">3</a>&nbsp;&nbsp;<a href="?view=diplomacyAdvisor&amp;start=30">4</a>
	</td>
	<td colspan="3" class="paginator">
		<a href="?view=diplomacyAdvisor&amp;start=0" title="...posledných 10">...posledných 10</a>
		<a href="?view=diplomacyAdvisor&amp;start=0" title="...posledných 10"><img src="skin/img/resource/btn_min.gif"></a>
		11 - 20
		<a href="?view=diplomacyAdvisor&amp;start=20"><img src="skin/img/resource/btn_max.gif"></a>
		<a href="?view=diplomacyAdvisor&amp;start=20">ďalších 10...</a>
	</td>
</tr>
*/

// insert buttons to jump
msgs = xpath(document, '//td[@class="selected"]/a[@href="?view=diplomacyAdvisor"]');
if (msgs.snapshotLength == 1) {
	// find out total number of messages
	var numPattern = /\(\d{1,}\)/gi;				// search for (xxx)
	var msgsNum = msgs.snapshotItem(0).innerHTML.match(numPattern);
	if (msgsNum && (msgsNum.length == 1)) msgsNum = parseInt(msgsNum[0].substring(1, msgsNum[0].length-1));
	else msgsNum = 0;

	const onePage = 10;

	msgs = msgsNum % onePage;					// number of messages on the last page
	var pageNum = Math.floor(msgsNum/onePage);			// number of pages
	if (msgs > 0) ++pageNum;

	var myTD = xpath(myTable, 'descendant::td[@class="paginator"]');
	if (myTD.snapshotLength != 1) {					// no/many "paginator" row(s)
		// all messages on this page were deleted recently - skip to previous page
		if (pageNum > 1) window.location.href = "?view=diplomacyAdvisor&start=" + ((pageNum-1)*onePage).toString();
		else if (pageNum > 0) window.location.href = "?view=diplomacyAdvisor";
		else return;
	}
	else if (msgsNum > onePage) {					// we found one "paginator" row
		const numToShow = 25;					// how many pages to show?
		const halfToShow = Math.floor(numToShow / 2);

		myTD = myTD.snapshotItem(0);
		var myTR = myTD.parentNode;

		// get START parameter
		var actPage = paramValue("START", window.location.href.toUpperCase());
		if (actPage != "") actPage = Math.floor(parseInt(actPage))/10 + 1;
		else {							// no START parameter, e.g. after deleting of message
			actPage = 1;
			numPattern = /\d{1,} \-/gi;			// search for "xxx -"
			var myTXT = xpath(myTD, 'child::text()');
			for (var i = 0; i < myTXT.snapshotLength; i++) {
				var currPage = trimStr(myTXT.snapshotItem(i).data);
				if (currPage != "") {
					currPage = currPage.match(numPattern);
					if (currPage && (currPage.length == 1)) {
						actPage = Math.floor(parseInt(currPage[0].replace(" -", "")) / onePage) + 1;
						break;
					}
				}
			}
		}

		myTR.deleteCell(0);					// remove old cell
		myTD = myTR.insertCell(0);				// and insert the new one
		myTD.style.textAlign = "left";
		myTD.colSpan = 6;

		// button for moving to beginning
		if (actPage > 1) myTD.innerHTML = '<a href="?view=diplomacyAdvisor&amp;start=' + ((actPage-2)*onePage) + '"><img src="skin/img/resource/btn_min.gif"></a>&nbsp;&nbsp;&nbsp;';
		else myTD.innerHTML = '<img style="visibility: hidden" src="skin/img/resource/btn_min.gif">&nbsp;&nbsp;&nbsp;';

		// first page
		if (actPage == 1) myTD.innerHTML += '<a href="?view=diplomacyAdvisor"><strong>1</strong</a>';
		else myTD.innerHTML += '<a href="?view=diplomacyAdvisor">1</a>';

		var firstToShow = 2;
		var lastToShow = numToShow + 4;
		if (pageNum > (numToShow+4)) {
			lastToShow = actPage + halfToShow;
			if (lastToShow < (numToShow+2)) lastToShow = numToShow + 2;
			if (lastToShow > (pageNum-3)) {
				lastToShow = pageNum;
				firstToShow = pageNum - numToShow - 1;
			}
			else firstToShow = actPage - halfToShow;

			if (firstToShow > 3) myTD.innerHTML += '&nbsp;&nbsp;..';
			else firstToShow = 2;
		}
		else if (lastToShow > pageNum) lastToShow = pageNum;

		for (var i = firstToShow; i <= lastToShow; ++i) {
			if (actPage == i) myTD.innerHTML += '&nbsp;&nbsp;<a href="?view=diplomacyAdvisor&amp;start=' + ((i-1)*onePage) + '"><strong>' + i + '</strong></a>';
			else myTD.innerHTML += '&nbsp;&nbsp;<a href="?view=diplomacyAdvisor&amp;start=' + ((i-1)*onePage) + '">' + i + '</a>';
		}

		if (lastToShow < (pageNum-2)) {
			myTD.innerHTML += '&nbsp;&nbsp;..&nbsp;&nbsp;<a href="?view=diplomacyAdvisor&amp;start=' + ((pageNum-1)*onePage) + '">' + pageNum + '</a>';
		}

		// button for moving to end
		if (actPage < pageNum) myTD.innerHTML += '&nbsp;&nbsp;&nbsp;<a href="?view=diplomacyAdvisor&amp;start=' + (actPage*onePage) + '"><img src="skin/img/resource/btn_max.gif"></a>';
		else myTD.innerHTML += '&nbsp;&nbsp;&nbsp;<img style="visibility: hidden" src="skin/img/resource/btn_max.gif">';
	}
}
else {
	msgs = xpath(document, '//ul[@class="error"]');			// <ul class="error"> - most probably disallowed activity (don't use "go back")
	if (msgs.snapshotLength == 1) window.location.href = "?view=diplomacyAdvisor";
}

} // DO NOT TOUCH!! -> function main() {

// FUNCTIONS *************************************************************************************************************

function insertLinks (node) {
	var msgs = xpath(node, '../following-sibling::tr[@class="text"]/td[@class="msgText"]/div');
	if (msgs.snapshotLength > 0) {
		const http = "http://";
		const mark = 'name="RxR"';

		var txt = msgs.snapshotItem(0).innerHTML;
		txt = txt.split(http);
		if (txt.length > 1) {
			for (var i = 0; i < txt.length; i++) {
				if ((txt[i].length == 0) || (txt[i].indexOf(mark) > -1)) continue;
				if ((i > 0) && (txt[i-1].indexOf(mark) > -1)) continue;
				// search for end of link: space or <
				var posEnd = txt[i].indexOf(" ");
				var posEndB = txt[i].indexOf("<");
				if (posEnd < 0)
					if (posEndB < 0) posEnd = txt[i].length;
					else posEnd = posEndB;
				else {
					if ((posEndB > -1) && (posEndB < posEnd))posEnd = posEndB;
				}
				var href = txt[i].substring(0, posEnd);
				txt[i-1] += '<a href="' + http + href + '" target="_blank" style="text-decoration: underline" ' + mark + '>';
				txt[i] = txt[i].replace(href, href + '</a>');
			}
			msgs.snapshotItem(0).innerHTML = txt.join(http);
		}
	}
}

function waitForReady(callback, delayInMS) {			// thanks to GIJoe
	var docState = "";					// since readyState returns String... should be string null
	try {
		docState = window.document.readyState;
	}
	catch(e) {}

	if (docState != "complete") {
		window.setTimeout(waitForReady, delayInMS, callback);
		return;
	}
	callback();
}

function xpath(node, query) {
	return document.evaluate(query, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function trimStr(str) {		// thanks to Steve @ http://blog.stevenlevithan.com/archives/faster-trim-javascript
	var	str = str.replace(/^\s\s*/, ''),
		ws = /\s/,
		i = str.length;
	while (ws.test(str.charAt(--i)));
	return str.slice(0, i + 1);
}

function paramValue (name, url_string) {
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(url_string);
	if (results == null)	return "";
	else			return results[1];
}
