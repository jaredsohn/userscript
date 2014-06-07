// Hello World! example user script
// version 0.1 BETA!
// 2005-04-22
// Copyright (c) 2005, Mark Pilgrim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          ESPNxFIP
// @description   Adds xFIP stats to ESPN MLB player pages
// @include       http://*.espn.go.com/mlb/players/stats?playerId=*
// @include       *espfgfgn*
// ==/UserScript==

function gmGet(url,cb) {
  	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		onload: function(response) {
			cb(response.responseText)
		}
	})	
}

function myGet(url,cb) {
	if(true) {
		gmGet(url,cb)
	}
	else {
		$.get(url,cb)
	}
}

function getxFIP(firstName,lastName,cb) {
	//url = "http://www.hardballtimes.com/thtstats/main/player/1636/cliff-lee"
	url = 'http://www.hardballtimes.com/main/stats/players/index.php?lastName='+lastName+'&firstName='+firstName
	//url = "tht.html"
	myGet(url, function(data) {
		table = $($('table.pv_table',$(data))[1])
		h = {}
		table.find("tr").each(function() {
			h = parsePlayerRow($(this),h)
		})
		cb(h)
	})
}

function parsePlayerRow(row,h) {
	cells = row.find('td')
	if(cells.length >= 8) {
		year = $(cells[0]).text()
		xFIP = $(cells[7]).text()
		h[year] = xFIP
	}
	return h
}

function addxFIPTest(xFIPHash) {
	f = function(data) {
		d = $(data)
		addxFIP(xFIPHash,d)
	}
	//u = 'http://sports.espn.go.com/mlb/players/stats?playerId=5353'
	u = "espn.html"
	//jQuery.get(u,f)
	addxFIP(xFIPHash,$(this))
}

function addxFIP(xFIPHash,page) {
	headerRow = $($('div.gp-body tr.colhead')[0])
	headerRow.append('<td>xFIP</td>')
	table = $($('div.gp-body table.tablehead')[0])
	table.find('tr.oddrow').each(function() {
		addxFIPToRow($(this),xFIPHash)
	})
	table.find('tr.evenrow').each(function() {
		addxFIPToRow($(this),xFIPHash)
	})
}

function addxFIPToRow(row,h) {
	cells = row.find('td')
	year = $(cells[0]).text()
	xFIP = h[year]
	if (xFIP != undefined) {
		row.append('<td>'+xFIP+'</td>')
	}
}

function getPlayerName() {
	return $('head title').text().split(" ",2)
}

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
		player = getPlayerName()
		//alert(player)
		getxFIP(player[0],player[1],function(h) {
			addxFIPTest(h)
		})
    }

