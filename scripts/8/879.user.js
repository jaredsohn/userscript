// ==UserScript==
// @name          hattrick
// @namespace     http://users.pandora.be/divvy/userscript
// @description	  extends hattrick's user interface
// @include       http://www*.hattrick.org/*
// ==/UserScript==

// file: 	hattrick.user.js
// date:	do jun 30 20:50:28 CEST 2005
// author:	divvy - dyveshinftra@gmail.com
// author:	anonymous contributors
// license:	This file is in the public domain and comes with no warranty.
// history:	0.1	April, 2005	use browser's full width
//		0.2	May, 2005	auto challenge per country
//		0.2.1	June, 2005	auto challenge per region
// version:	$Id: hattrick.user.js,v 1.3 2005/06/30 19:00:17 divvy Exp $

// -- use browser's full width --
var framesets = document.getElementsByTagName('FRAMESET');
for (var i = 0; i < framesets.length; ++i) {
	var frameset = framesets[i];
	if (frameset.cols == '*,745,*') {
		// Keep blank pages left and right of content but reduce their
		// share of the window.
		frameset.cols = '1%,98%,1%';
	} else if (frameset.rows == '80,*,1') {
		// Remove banner above content with blank page and reduce its
		// share of the window.  The actual replacing of the banner is
		// done below.
		frameset.rows = '1%,98%,1%';
	} else if (frameset.cols == '127,*') {
		// Give left menu enough room.  When using default font,
		// the country selector does not fit in 127px.
		frameset.cols = '150,*';
	} else if (frameset.rows == '*,62') {
		// Remove 'laatste nieuws' and 'op dit moment' below content.
		// Supporters probably want to see these menus.  I'm not a
		// supporter.
		frameset.rows = '*,0';
	}
}

var frames = document.getElementsByTagName('FRAME');
for (i = 0; i < frames.length; ++i) {
	var frame = frames[i];
	if (frame.src.match('logo.html$')
			|| frame.src.match('header.html$')
			|| frame.src.match('header.asp$')
			|| frame.src.match('newflash.asp$')) {
		// Replace frames around content with blank content
		// and disable scrolling.  This gives a nice white border
		// around content.
		frame.src = 'blank.html';
		frame.scrolling = 'no';

	}
}

var tables = document.getElementsByTagName('TABLE');
for (i = 0; i < tables.length; ++i) {
	var table = tables[i];
	// Tables are included inside <TD>s so they can have full width.
	switch (table.width) {
		case '355':
		case '590':
		case '600':
			table.width = '100%';
			break;
	}
	// Avoid 'mijn ploeg' dangling at bottom.
	if (table.getAttribute('height') == '100%') {
		table.setAttribute('height', 'undefined');
	}
} 
var tds = document.getElementsByTagName('TD');
for (i = 0; i < tds.length; ++i) {
	var td = tds[i];
	// Best guesses how much place a <TD> can take.
	switch (td.width) {
		case '10':
		case '20':
			td.width = '5%';
			break;
		case '229':
			td.width = '30%';
			break;
		case '355':
			td.width = '60%';
			break;
		case '590':
			td.width = '95%';
			break;
		case '600':
			td.width = '100%';
			break;
	}
}

// Avoid login menu to grab focus when hattrick opens.
var body = document.getElementsByTagName('BODY')[0];
if (body != undefined && body.getAttribute('onload') == 'sf();') {
	body.setAttribute('onload', undefined);
}
// ------------------------------

// -- auto challenge per country --
// When viewing details of a country, add auto challenge link.  Using a link is
// more work than using a button, but a link integrates nicely with the
// Hattrick page.
if (window.location.pathname == '/Common/NationalTeamDetails.asp') {
	// Create auto challenge link.
	var aclink = document.createElement('A')
	aclink.setAttribute('href', 'challanges.asp?')
	aclink.setAttribute('name', 'aclink')
	aclink.appendChild(document.createTextNode('Auto challenge'))

	// Hook it into the country page.
	tds[50].appendChild(aclink)
	tds[50].appendChild(document.createElement('BR'))
	tds[50].appendChild(document.createElement('BR'))

	// Catch the click for our link.
	window.addEventListener('mousedown', function(e) {
		if (e.target.name == 'aclink') {
			challenge_league(document.links[2].search.split('=')[1]);
		}
	}, false)
}

// -- auto challenge per region --
// When viewing details of a region, add auto challenge link.  Using a link is
// more work than using a button, but a link integrates nicely with the
// Hattrick page.
// The link is equal to the current region, by this, just going back in history
// gives the opportunity to select another region for the selected country.
// maybe raclink could be changed to aclink
if (window.location.pathname == '/Common/regionDetails.asp') {
	// Create auto challenge link.
	var raclink = document.createElement('A')
	raclink.setAttribute('href', 'regionDetails.asp'+window.location.search)
	raclink.setAttribute('name', 'raclink')
	raclink.appendChild(document.createTextNode('Auto Challenge'))

	// Hook it into the region page.
	// count the number of <TD> entries in page-source to find the '29'
	tds[29].appendChild(document.createElement('BR'))
	tds[29].appendChild(document.createElement('BR'))
	tds[29].appendChild(raclink)
	tds[29].appendChild(document.createElement('BR'))
	tds[29].appendChild(document.createElement('BR'))

	// Catch the click for our link.
	window.addEventListener('mousedown', function(e) {
		if (e.target.name == 'raclink') {
			challenge_region(document.links[2].search.split('=')[1]);
		}
	}, false)
}

// Challenge all regions in this league.
function challenge_league(league) {
	GM_xmlhttpRequest({
		method:	'GET',
		url:	'http://'+window.location.hostname+'/Common/regions.asp?leagueID='+league,
		onload:	function(d) {
			var i = d.responseText.indexOf('regionID')
			while (i > 0) {
				var b = i + 9
				var e = d.responseText.indexOf('"', b)
				var region = d.responseText.substring(b, e)
				challenge_region(region)
				i = d.responseText.indexOf('regionID', e)
			}
		}
	})
}

// Challenge all online players in this region.
function challenge_region(region) {
	GM_xmlhttpRequest({
		method:	'GET',
		url:	'http://'+window.location.hostname+'/Common/online.asp?regionID='+region,
		onload:	function(d) {
			var i = d.responseText.indexOf('UserID')
			while (i > 0) {
				var b = i + 7
				var e = d.responseText.indexOf('"', b)
				var userid = d.responseText.substring(b, e)
				challenge_player_step1(userid)
				i = d.responseText.indexOf('UserID', e)
			}
		}
	})
}

// Step one: move to step two when this user can be challenged.
function challenge_player_step1(userid) {
	GM_xmlhttpRequest({
		method:	'GET',
		url:	'http://'+window.location.hostname+'/Common/teamDetails.asp?UserID='+userid,
		onload:	function(d) {
			var i = d.responseText.indexOf('opponentID')
			if (i > 0) {
				var b = i + 19
				var e = d.responseText.indexOf('"', b)
				var id = d.responseText.substring(b, e)
				challenge_player_step2(id)
			}
		}
	})
}

// Step two: challenge player.
function challenge_player_step2(opponentid) {
	GM_xmlhttpRequest({
		method:	'POST',
		url:	'http://'+window.location.hostname+'/Common/challanges.asp?action=challange&opponentID='+opponentid+'&matchType=0&matchPlace=0',
		headers: {"Content-Length": '0'}
	})
}
// -------------------------------
