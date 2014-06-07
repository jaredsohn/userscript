// LJ Thread Unfolder
// version 0.2
// 2005-08-23
// Copyright (c) 2005, Tim Babych
// Homepage: http://clear.com.ua/projects/firefox/unfolder
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// Modified 2006-09-09 by Henrik Nyh <http://henrik.nyh.se>
// Added "Unfold all".

// Modified 2007-03-15 by katenok
// Fixed the Unfold all link

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "LJ Thread Unfolder", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name			LJ Thread Unfolder with "Unfold all"
// @namespace		http://clear.com.ua/projects/firefox/unfolder+http://henrik.nyh.se
// @description		Expands nested discussion threads in place.
// @include			http://*.livejournal.com/*
// ==/UserScript==

function xp(query, root) { return document.evaluate(query, root || document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); }
function with_each(query, cb, root) {
	var results = xp(query, root);
	for (var i = 0, j = results.snapshotLength; i < j; i++)
		cb(results.snapshotItem(i));
}

function unfold_all() {
	for (var i = 0, j = unfoldNodes.length; i < j; i++)
		unfold_thread(unfoldNodes[i]);
}

var unfoldNodes = [];

//================================
//	INIT
//================================

get_itemid_regexp = /thread=(\d+)/;
var allReplies = xp("//a[contains(@href, '?thread')]");

for (var i = 0; i < allReplies.snapshotLength; i++) {
	var thisOne = allReplies.snapshotItem(i);

	// if  this is not just "line with link" , but comment with text omit it
	tb = thisOne;
	while (tb.nodeName != 'TBODY')
		tb = tb.parentNode;
	if (tb.firstChild != tb.lastChild)
		continue;

	t = document.createTextNode(' - ');
	thisOne.parentNode.insertBefore(t, thisOne.nextSibling);

	thread_id = thisOne.href.match(get_itemid_regexp)[1];

	a = document.createElement('A');
	linktxt = document.createTextNode('Unfold');
	a.href = 'javascript:void(0)';
	a.setAttribute('thread_id', thread_id);
	a.setAttribute('thread_href', thisOne.href);
	a.addEventListener("click", unfold_click, false)
	a.appendChild(linktxt)
	t.parentNode.insertBefore(a, t.nextSibling);
	unfoldNodes.push(a);

	d = document.createElement('div');
	d.style.display = 'none';
	d.id = 'thread_unfolder_temp_div_' + thread_id;
	document.body.appendChild(d);

}

GM_addStyle(
"a.unfold_thread {color: black; text-decoration:none} " +
"a.unfold_thread:hover {color: black; text-decoration:none} " +
"a.unfold_thread img { border:none}"
);

// Inject "Unfold all" links

if (!unfoldNodes.length)
	return;

with_each("//a[contains(@href, '?mode=reply')]/ancestor::b", function(b) {

	var comma = document.createTextNode(', ');
	b.appendChild(comma);

	var newA = document.createElement("A");
	newA.innerHTML = "Unfold all";
	newA.href = "javascript:void(0)";
	newA.addEventListener("click", unfold_all, false);
	b.appendChild(newA);

	b.insertBefore(newA, newA.previousSibling.previousSibling);
	b.insertBefore(comma, comma.previousSibling.previousSibling);

});


//================================
//	WORKHORSES
//================================

function unfold_click() {
	unfold_thread(this);
}

function unfold_thread(link) {

	link.className = 'unfold_thread';
	link.style.cursor = 'default';
	link.innerHTML = loader;
	link.blur();
	elem = link;

	// Closure yo!
	(function(elem) {

	GM_xmlhttpRequest({
	    method: 'GET',
	    url: link.getAttribute('thread_href'),
	    onload: function(responseDetails) {

			dummy = document.getElementById('thread_unfolder_temp_div_'+elem.getAttribute('thread_id'));
			dummy.innerHTML = responseDetails.responseText;
			reply = document.getElementById('ljcmt'+elem.getAttribute('thread_id'));

			try {  // If we fail, fail silently

				// get cell
				td = elem;
				while (td.nodeName != 'TD')
					td = td.parentNode;

				//cleanse cell
				while(td.firstChild)
					td.removeChild(td.firstChild);

				// remove nesting comments
				tbody = td.parentNode.parentNode;
				my_padding = tbody.firstChild.firstChild.firstChild.width;


				next_comment = tbody.parentNode.nextSibling.nextSibling.nextSibling;
				while(next_comment &&
						next_comment.firstChild &&
						next_comment.firstChild.firstChild &&
						next_comment.firstChild.firstChild.firstChild &&
						next_comment.firstChild.firstChild.firstChild.firstChild &&
						(next_comment.firstChild.firstChild.firstChild.firstChild.width > my_padding)) {
					to_del = next_comment;
					next_comment = next_comment.nextSibling.nextSibling.nextSibling;
					to_del.parentNode.removeChild(to_del);
				}

				// add comments there
				while(reply && reply.nodeName != 'HR') {
					next_one = reply.nextSibling;
					td.appendChild(reply);
					reply = next_one;
				}
			} catch(e) {}

			dummy.innerHTML = '';

		}
	});

	})(elem);
}

//========================================
//	ROUTINES
//========================================

loader = '<img src="data:image/gif;base64,R0lGODlhEAAQAMQAAP///+7u7t3d3bu7u6qqqpmZmYi'+
'IiHd3d2ZmZlVVVURERDMzMyIiIhEREQAR'+
'AAAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05F'+
'VFNDQVBFMi4wAwEAAAAh+QQFBwAQACwAAAAAEAAQAAAFdyAkQgGJJOWoQgIjBM8jkKsoPEzgyMGs'+
'CjPDw7ADpkQBxRDmSCRetpRA6Rj4kFBkgLC4IlUGhbNQIwXOYYWCXDufzYPDMaoKGBoKb886OjAK'+
'dgZAAgQkfCwzAgsDBAUCgl8jAQkHEAVkAoA1AgczlyIDczUDA2UhACH5BAUHABAALAAAAAAPABAA'+
'AAVjICSO0IGIATkqIiMKDaGKC8Q49jPMYsE0hQdrlABCGgvT45FKiRKQhWA0mPKGPAgBcTjsspBC'+
'AoH4gl+FmXNEUEBVAYHToJAVZK/XWoQQDAgBZioHaX8igigFKYYQVlkCjiMhACH5BAUHABAALAAA'+
'AAAQAA8AAAVgICSOUGGQqIiIChMESyo6CdQGdRqUENESI8FAdFgAFwqDISYwPB4CVSMnEhSej+Fo'+
'gNhtHyfRQFmIol5owmEta/fcKITB6y4choMBmk7yGgSAEAJ8JAVDgQFmKUCCZnwhACH5BAUHABAA'+
'LAAAAAAQABAAAAViICSOYkGe4hFAiSImAwotB+si6Co2QxvjAYHIgBAqDoWCK2Bq6A40iA4yYMgg'+
'NZKwGFgVCAQZotFwwJIF4QnxaC9IsZNgLtAJDKbraJCGzPVSIgEDXVNXA0JdgH6ChoCKKCEAIfkE'+
'BQcAEAAsAAAAABAADgAABUkgJI7QcZComIjPw6bs2kINLB5uW9Bo0gyQx8LkKgVHiccKVdyRlqjF'+
'SAApOKOtR810StVeU9RAmLqOxi0qRG3LptikAVQEh4UAACH5BAUHABAALAAAAAAQABAAAAVxICSO'+
'0DCQKBQQonGIh5AGB2sYkMHIqYAIN0EDRxoQZIaC6bAoMRSiwMAwCIwCggRkwRMJWKSAomBVCc5l'+
'UiGRUBjO6FSBwWggwijBooDCdiFfIlBRAlYBZQ0PWRANaSkED1oQYHgjDA8nM3kPfCmejiEAIfkE'+
'BQcAEAAsAAAAABAAEAAABWAgJI6QIJCoOIhFwabsSbiFAotGMEMKgZoB3cBUQIgURpFgmEI0EqjA'+
'CYXwiYJBGAGBgGIDWsVicbiNEgSsGbKCIMCwA4IBCRgXt8bDACkvYQF6U1OADg8mDlaACQtwJCEA'+
'IfkEBQcAEAAsAAABABAADwAABV4gJEKCOAwiMa4Q2qIDwq4wiriBmItCCREHUsIwCgh2q8MiyEKO'+
'DK7ZbHCoqqSjWGKI1d2kRp+RAWGyHg+DQUEmKliGx4HBKECIMwG61AgssAQPKA19EAxRKz4QCVIh'+
'ACH5BAUHABAALAAAAAAQABAAAAVjICSOUBCQqHhCgiAOKyqcLVvEZOC2geGiK5NpQBAZCilgAYFM'+
'ogo/J0lgqEpHgoO2+GIMUL6p4vFojhQNg8rxWLgYBQJCASkwEKLC17hYFJtRIwwBfRAJDk4Obwsi'+
'dEkrWkkhACH5BAUHABAALAAAAQAQAA8AAAVcICSOUGAGAqmKpjis6vmuqSrUxQyPhDEEtpUOgmgY'+
'ETCCcrB4OBWwQsGHEhQatVFhB/mNAojFVsQgBhgKpSHRTRxEhGwhoRg0CCXYAkKHHPZCZRAKUERZ'+
'MAYGMCEAIfkEBQcAEAAsAAABABAADwAABV0gJI4kFJToGAilwKLCST6PUcrB8A70844CXenwILRk'+
'IoYyBRk4BQlHo3FIOQmvAEGBMpYSop/IgPBCFpCqIuEsIESHgkgoJxwQAjSzwb1DClwwgQhgAVVM'+
'IgVyKCEAIfkECQcAEAAsAAAAABAAEAAABWQgJI5kSQ6NYK7Dw6xr8hCw+ELC85hCIAq3Am0U6JUK'+
'jkHJNzIsFAqDqShQHRhY6bKqgvgGCZOSFDhAUiWCYQwJSxGHKqGAE/5EqIHBjOgyRQELCBB7EAQH'+
'fySDhGYQdDWGQyUhADs="> Loading...'
