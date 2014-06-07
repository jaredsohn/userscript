// ==UserScript==
// @name           SOFUread
// @namespace      http://userscripts.org/users/4294
// @description    Puts marker next to questions that haven't been marked as read
// @include        http://stackoverflow.com/*
// @include        http://serverfault.com/*
// @include        http://superuser.com/*
// @include        http://meta.stackoverflow.com/*
// ==/UserScript==

// TODO:
// Optimize markRead to just delete links


function deleteNewLinks() {
	allNewLinks = document.evaluate("//a[@id='SOFUread']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < allNewLinks.snapshotLength; i++) {
		thisNewLink = allNewLinks.snapshotItem(i);
		thisNewLink.parentNode.removeChild(thisNewLink);
	}
}

function markRead(qNum,alsoRead) {
	return function() {
		for (var question in alsoRead) {
			if (parseInt(question) < qNum) {
				delete alsoRead[question];
			}
		}
		GM_setValue(site, qNum.toString() + "|" + alsoRead.toSource());
		deleteNewLinks();
		createNewLinks();
		return false;
	}
}

function markOneRead(qNum,alsoRead) {
	return function() {
		alsoRead[qNum] = 1;
		GM_setValue(site, GM_getValue(site).split("|",1) + "|" + alsoRead.toSource());
	}
}

function createNewLinks(markInd) {
	var allQuestions, lastRead, alsoRead, readObj;
	var newElement;
	var thisQuestion;
	var qNum;


	allQuestions = document.evaluate("//a[@class='question-hyperlink']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	readObj = GM_getValue(site);
	if (! readObj) {
		lastRead = 0;
		alsoRead = {};
		GM_setValue(site, lastRead.toString() + "|" + alsoRead.toSource());
	} else {
		readObj = RegExp("^([^\\|]+)(\\|(.*))?$").exec(readObj);
		lastRead = parseInt(readObj[1]);
		if (readObj[3]) {
			alsoRead = eval(readObj[3]);
		} else {
			alsoRead = {};
		}
	}

	for (var i = 0; i < allQuestions.snapshotLength; i++) {
		thisQuestion = allQuestions.snapshotItem(i);
		qNum = RegExp("^/questions/(\\d+)/").exec(thisQuestion.getAttribute("href"));

		if (qNum) {
			qNum = parseInt(qNum[1]);
			if (qNum > mostRecentQ) {
				mostRecentQ = qNum;
			}
			if ((qNum > lastRead) && !(qNum.toString() in alsoRead)) {
				newElement = document.createElement("a");
				newElement.id = "SOFUread";
				newElement.addEventListener("click", markRead(qNum,alsoRead), false);
				var newImg = document.createElement("img");
				newImg.src = "/favicon.ico";
				newElement.appendChild(newImg);
				newElement.innerHTML += "&nbsp;";
				thisQuestion.parentNode.insertBefore(newElement, thisQuestion);
				if (markInd) {
					thisQuestion.addEventListener("click", markOneRead(qNum,alsoRead), false);
				}
			}
		}
	}
}

function toggleInd(markInd) {
	return function() {
		markInd = !markInd;
		GM_setValue(site + ".markInd", markInd);
		document.location.reload();
	}
}

var site = RegExp("^https?://(?:www\\.)?([^/]+)\\.[^\\./]+/").exec(document.URL);
var mostRecentQ = 0;
var markInd;

if (site) {
	site = site[1];

	markInd = GM_getValue(site + ".markInd");
	if (markInd == undefined) {
		markInd = true;
	}

	createNewLinks(markInd);

	// XXX accelerator doesn't work
	//GM_registerMenuCommand("Mark All Read", markRead(mostRecentQ), "a", "control alt", "A");
	GM_registerMenuCommand("Mark All Read", markRead(mostRecentQ, {}), "", "", "A");
	GM_registerMenuCommand("Mark None Read", markRead(0, {}), "", "", "N");
	GM_registerMenuCommand((markInd?"\327 ":"") + "Mark Individual Questions", toggleInd(markInd), "", "", "I");
	GM_registerMenuCommand("Clear Individual Questions", markRead(GM_getValue(site).split("|",1),{}), "", "", "I");
}
