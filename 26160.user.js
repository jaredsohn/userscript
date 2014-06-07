// ==UserScript==
// @name           Gallery Updater
// @namespace      www.dp.cx/userscripts
// @include        *
// ==/UserScript==

function updateGalleryKeywords() {
	
	// attempt to read the tags cookie
	var tags = readCookie("tags");
	// if we don't have tags, then prompt for the ending page
	if (!tags) { stoppage = prompt('What page should we stop on?\n\nClick cancel to tag everything'); createCookie("stoppage", stoppage); }
	// also, prompt for the keywords we're going to set
	if (!tags) { tags = prompt('Please supply the keywords you\'d like applied, comma separated'); createCookie("tags", tags); }
	// if we still don't have any tags, kill the cookie, and exit
	if (!tags) { createCookie("tags", "", -1); return false; }
	stoppage = readCookie("stoppage");
	
	// get the "Edit Captions" text.  this tells us what page we're on
	var captions = document.evaluate("/html/body/div/form/table/tbody/tr/td[2]/div/div/h2", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	// snapshotItem(0) gives us the internal value
	var captiontext = captions.snapshotItem(0).textContent;
	// match it
	if (captiontext.match(/Edit Captions \(page (\d+) of \d+\)/)) {
		// fetch the current page number
		currentpage = RegExp.$1;
		// if we've reached the last page, remove the cookies, and return
		if (currentpage >= stoppage && parseInt(stoppage)) {
			// reset the cookies
			createCookie("tags", "", -1);
			createCookie("stoppage", "", -1);
			return false;
		}
	} 
	
	// fetch all of the textareas that are for keywords
	var areas = document.evaluate("/html/body/div/form/table/tbody/tr/td[2]/div/div/textarea[1]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	// loop
	for(var area = 0; area < areas.snapshotLength; area++) {
		var areaNode = areas.snapshotItem(area);
		// if it's empty, then we set the value
		if (areaNode.textContent.match(/^$/)) {
			areaNode.textContent = tags;
		}
	}
	
	try {
		// click the save and next button
		document.evaluate("/html/body/div/form/table/tbody/tr/td[2]/div/div/input[@name='g2_form[action][save][next]']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
	} catch (e) {
		// or click the save and done button
		try {
			document.evaluate("/html/body/div/form/table/tbody/tr/td[2]/div/div/input[@name='g2_form[action][save][done]']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
		} catch (e) {
			// or click the outright 'save' button
			document.evaluate("/html/body/div/form/table/tbody/tr/td[2]/div/div/input[@name='g2_form[action][save][stay]']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).click();
		}
		// clear the cookies
		createCookie("tags", "", -1);
		createCookie("stoppage", "", -1);
	}
}

// check for cookie.  if it doesn't exist, then we registerMenuCommand
if (!readCookie("tags")) {
	GM_registerMenuCommand('Update Gallery Keywords', updateGalleryKeywords);
} else {
	// otherwise, start working
	updateGalleryKeywords();
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+";";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}