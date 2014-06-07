// JPDaigle (jpdaigle@gmail.com)
// version 0.3 (2009-03-09)

// ==UserScript==
// @name          BugzillaKeyboardNavigation
// @namespace     tag:jpdaigle@gmail.com,2009-02-12:GreasemonkeyScripts
// @description   Add navigation to the comment thread in Bugzilla (J/K/N/L/P keystrokes).
// @include       http://*/show_bug.cgi?id=*
// @include       http://*/process_bug.cgi*
// ==/UserScript==

// Pretty much my first greasemonkey script so I'm a JS newbie.

document.addEventListener("keydown", handleKeyPress, true);

function handleKeyPress(event) {

	// Abort if we're handling a form keypress or something. We just want the page itself.
	if (event.originalTarget.tagName != "HTML")
		return;
		
	// Abort if a modifier key is held. (Thanks to seth@slackorama.com for bug report)
	if (event.ctrlKey || event.metaKey || event.altKey)
		return;
	
	var code = event.keyCode;
	// 74 = j
	// 75 = k
	// 76 = l
	// 78 = n
	// 80 = p
	switch(event.keyCode) {
		case 74:
		scrollNextTx();		
		break;

		case 75:
		scrollPrevTx();
		break;

		case 76:
		var lastResultsLink = getBugLink("//a[contains(text(),'last search results')]");
		if (lastResultsLink)
			window.location = lastResultsLink;
		break;
			
		case 78:
		var nextlink = getBugLink("//a[text()='Next']");
		if (nextlink)
			window.location = nextlink;
		break;

		case 80:
		var nextlink = getBugLink("//a[text()='Prev']");
		if (nextlink)
			window.location = nextlink;
		break;
	}
}

// get href of first match
function getBugLink(query) {
	var allNext = document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (allNext.snapshotLength > 0) {
		return allNext.snapshotItem(0).href;
	}
}

function getCurVisibleTx() {
	var allTx, countTx, curTx, prevTx, nextTx;
	allTx = document.evaluate( "//span[@class='bz_comment'] | //a[@name='c0']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	countTx = allTx.snapshotLength;
	var cur_ypos = get_cur_ypos();

	var i, tx_ypos;
	for (i = 0; i < countTx; i++) {
		curTx = allTx.snapshotItem(i);
		tx_ypos = find_ypos(curTx);
		if (tx_ypos >= cur_ypos)
			break;
	}
	
	if (curTx && i == 0 && tx_ypos > (get_cur_ypos() + window.innerHeight)) {
		// special case: the first comment is below the screen
		// so we scroll to that
		return [prevTx, curTx, curTx];
	}
	
	if (i < countTx-1) {
		nextTx = allTx.snapshotItem(i+1);
	}
	if (i > 0) {
		prevTx = allTx.snapshotItem(i-1);
	}
	
	return [prevTx, curTx, nextTx];
}

function scrollNextTx() {
	var selectTx = getCurVisibleTx();
	if (selectTx[2]) {
		window.scroll(0, find_ypos(selectTx[2]));
	}
}

function scrollPrevTx() {
	var selectTx = getCurVisibleTx();
	if (selectTx[0]) {
		window.scroll(0, find_ypos(selectTx[0]));
	}
}

// Find Y position of an object
function find_ypos(obj) {
	var curtop = 0;
	do {
		curtop += obj.offsetTop;
	} while (obj = obj.offsetParent);
	return curtop;
}

// Find Y position of the top of the display page
function get_cur_ypos() {
	return window.pageYOffset;
}
