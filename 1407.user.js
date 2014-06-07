
// Recent Searches
// version 0.2 BETA!
// 2005-07-08

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script that remembers your recent
// Google searches and displays them on the Google home page and
// on Google search results pages.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Recent Searches", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Recent Searches
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   remember and display recent Google searches
// @include       http://www.google.com/*
// ==/UserScript==

/* BEGIN LICENSE BLOCK
Copyright (C) 2005 Mark Pilgrim

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://diveintomark.org/projects/greasemonkey/COPYING
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK */

function _getSavedSearchCount() {
    return GM_getValue('count') || 0;
}

function _getSavedSearch(searchIndex) {
    var now = new Date();
    return {
	"searchtext": GM_getValue('searchtext.' + searchIndex, ''),
	"searchresult": GM_getValue('searchresult.' + searchIndex, '')
    }
}

function _findSavedSearch(searchText) {
    var count = _getSavedSearchCount();
    for (i = count - 1; i >= 0; i--) {
	if (GM_getValue('searchtext.' + i) == searchText) {
	    return i;
	}
    }
    return -1;
}

function _getSavedSearchList() {
    var now = new Date();
    var count = _getSavedSearchCount();
    var savedSearches = new Array();
    var aSearch;
    for (var i = 0; i < count; i++) {
	aSearch = GM_getValue('searchtext.' + i, '');
	if (aSearch) {
	    savedSearches.push({
		"searchtext": aSearch,
		"searchresult": GM_getValue('searchresult.' + i, '')
	    });
	}
    }
}

function _addSavedSearch(searchText) {
    var now = new Date();
    var count = _getSavedSearchCount();
    GM_setValue('searchtext.' + count, searchText);
    GM_setValue('count', count + 1);
}

function _deleteSavedSearch(searchIndex) {
    var count = _getSavedSearchCount();
    for (var i = searchIndex; i < count - 1; i++) {
	var nextIndex = (i + 1).toString();
	GM_setValue('searchtext.' + i,
		    GM_getValue('searchtext.' + nextIndex));
    }
    GM_setValue('searchtext.' + count, '');
    GM_setValue('count', count - 1);
}

function _clearSavedSearches() {
    var count = _getSavedSearchCount();
    for (var i = 0; i < count; i++) {
	GM_setValue('searchtext.' + i, '');
	GM_setValue('searchresult.' + i, '');
    }
    GM_setValue('count', 0);
    var div = document.getElementById('recentsearcheslist');
    if (div) {
	div.innerHTML = '';
    }
}

function _getCurrentSearchText() {
    // only works on a Google search result page
    if (!document.gs) { return; }
    if (!document.gs.q) { return; }
    if (!document.gs.q.value) { return; }
    return document.gs.q.value;
}

function _addCurrentSearch() {
    var currentSearchText = _getCurrentSearchText();
    if (!currentSearchText) { return; }
    var count = _getSavedSearchCount();
    var lastSearch;
    if (count) {
	lastSearch = _getSavedSearch(count - 1);
    }
    if (lastSearch &&
	(lastSearch['searchtext'] == currentSearchText)) {
	return;
    }
    _addSavedSearch(currentSearchText);
}

function _manageSavedSearches(event) {
    alert('TODO: manage saved searches');
    event.preventDefault();
}

function _injectRecentSearches() {
    var count = _getSavedSearchCount();
    if (!count) { return; }
    var header = document.evaluate("//table[@bgcolor='#e5ecf9']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (!header) {
	header = document.evaluate("//form[@name='f']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
    var div = document.createElement('div');
    div.id = "recentsearcheslist";
    var s = '<p style="font-size: small">Recent searches: ';
    var aSearch, searchresult, href, title, spacePos;
    var displayedCount = 0;
    for (var i = count - 1; (displayedCount < 10) && (i >= 0); i--) {
	aSearch = _getSavedSearch(i);
	if (!aSearch['searchresult']) { continue; }
	searchresult = aSearch['searchresult'];
	spacePos = searchresult.indexOf(' ');
	href = searchresult.substring(0, spacePos);
	title = searchresult.substring(spacePos + 1);
	//title = title.replace(/"/g, '&quot;');
	s += '<a href="' + href + '" title="' + title + '">' + aSearch['searchtext'] + '</a> &middot; ';
	displayedCount++;
    }
    //s += '[<a id="managesavedsearches" title="Manage saved searches" href="#">more</a>] &middot; ';
    s += '[<a id="clearsavedsearches" title="Clear saved searches" href="#">clear</a>]</p>';
    div.innerHTML = s;
    header.parentNode.insertBefore(div, header.nextSibling);
/*
    window.addEventListener('load', function() {
	var more = document.getElementById('managesavedsearches');
	if (more) {
	    more.addEventListener('click', _manageSavedSearches, true);
	}
    }, true);
*/
    window.addEventListener('load', function() {
	var clear = document.getElementById('clearsavedsearches');
	if (clear) {
	    clear.addEventListener('click', _clearSavedSearches, true);
	}
    }, true);
}

function _trackClick(event) {
    var searchIndex, href, title;
    if (typeof(event) == 'string') {
	href = event;
	title = '';
    } else {
	var target = event.target;
	while ((target.nodeName != 'A') && (target.nodeName != 'BODY')) {
	    target = target.parentNode;
	}
	if (target.nodeName != 'A') { return; }
	var p = target.parentNode;
	while ((p.nodeName != 'P') && (p.nodeName != 'BODY')) {
	    p = p.parentNode;
	}
	if (p.nodeName != 'P') { return; }
	if (p.getAttribute('class') != 'g') { return; }
	href = target.href;
	title = target.textContent;
    }
    searchIndex = _findSavedSearch(_getCurrentSearchText());
    if (searchIndex == -1) {
	_addCurrentSearch();
	searchIndex = _getSavedSearchCount() - 1;
    }
    GM_setValue('searchresult.' + searchIndex,
		href + ' ' + title);
}

function _watchLocation(property, oldval, newval) {
    _trackClick(newval);
    return newval;
}

if (/^\/search/.test(window.location.pathname)) {
    _injectRecentSearches();
    _addCurrentSearch();
    document.addEventListener('click', _trackClick, true);
    document.watch('location', _watchLocation);
    document.location.watch('href', _watchLocation);
    window.watch('location', _watchLocation);
    window.location.watch('href', _watchLocation);
} else if (/^\/$/.test(window.location.pathname)) {
    _injectRecentSearches();
}

//
// ChangeLog
// 2005-07-08 - 0.2 - MAP - added license block
// 2005-05-11 - 0.1 - MAP - initial version
//
