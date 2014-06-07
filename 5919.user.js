// ==UserScript==
// @name          Helgon.net new visitor awareness
// @namespace     http://henrik.nyh.se
// @description   Displays (next to the visitor counter on your user info page) the number of new visits since the last time you checked the visitor list. New visitors are highlighted in that list.
// @include       http://*helgon.net/*
// ==/UserScript==

// TODO: Possibly: Visitors page could XHR user info, so reloading visitors page without going by the user info page still keeps track of new visitors. Currently, constantly reloading the visitors page without visiting the user info page inbetween will not highlight those visits as "unseen" nor subsequently mark them as "seen", on the visitors page. Only the user info page learns of new visitors.

var href = location.href;

if (href.match(/userinfo/i) && $xs("//a[contains(translate(@href, 'USERSETUP', 'usersetup'), 'usersetup')]")) {
	// On own userinfo

	var visitors_link = $xs("//a[contains(translate(@href, 'VISITORS', 'visitors'), 'visitors')]");
	var visitor_count = parseInt(visitors_link.innerHTML);
	GM_setValue("visitor_count", visitor_count);
	var checked_count = GM_getValue("checked_count", 0);
	var to_check = visitor_count - checked_count;
	
	var change = document.createElement("span");
	change.innerHTML = '+' + to_check;
	if (to_check > 0)
		change.style.color = '#9F9';
	
	insert_after_counter(document.createTextNode(")"));	
	insert_after_counter(change);
	insert_after_counter(document.createTextNode(" ("));
	
} else if (href.match(/visitors/i) && $xs("//a[contains(translate(@href, 'LASTVISITS', 'lastvisits'), 'lastvisits')]")) {
	// On own visitors page
	
	GM_addStyle(
		"tr.GM_oldVisitor {opacity:0.4;}"
	);

	var visitor_count = GM_getValue("visitor_count");
	var checked_count = GM_getValue("checked_count", visitor_count);
	var to_check = visitor_count - checked_count;
	if (to_check > 20) to_check = 20;

	if (to_check) {
		var row, all_rows = $x("//td[.='Inloggad senast']/ancestor::table[1]//tr");
		
		for (var i = 2; row = all_rows[i]; i++) {
			if (i < 2+to_check) {  // New visitor
				if (i == 2) row.className += ' GM_lastNewVisitor';
				row.className += ' GM_newVisitor';
				if (i == 1+to_check) row.className += ' GM_firstNewVisitor';
			} else {  // Old visitor
				row.className += ' GM_oldVisitor';				
			}
		}
	}
	
	if (visitor_count)
		GM_setValue("checked_count", visitor_count);
}


function insert_after_counter(node) {
	visitors_link.parentNode.insertBefore(node, visitors_link.nextSibling);
}


function $x(query, root) {
	var results = [], snapshot = document.evaluate(query, root || document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0, j = snapshot.snapshotLength; i < j; i++) results.push(snapshot.snapshotItem(i));
	return results;
}
function $xs(query, root) { return document.evaluate(query, root || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue; }
function with_each(query, cb, root) {
	var results = $x(query, root);
	for (var i = 0, j = results.length; i < j; i++)
		cb(results[i]);
}