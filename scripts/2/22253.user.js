// ==UserScript==
// @name           Facebook Drug Lord Enhancer
// @namespace      http://userscripts.org/people/14536
// @description    Provides enhancements for the Drug Lords application on facebook
// @include        http://apps.facebook.com/drug_lords/*
// @author        Vaughan Chandler
// ==/UserScript==

// Last updated on 2008-02-04


// Change page title

var loc = window.location.href.toLowerCase();

var site = 'http://apps.facebook.com/drug_lords/';

try {
	var title = '';
	if (loc.indexOf(site + 'cityview.php')!=-1) {
		var pg = loc.indexOf('pg=')!=-1 ? loc.match(/pg=(\d)/)[1]-0 : -1;
		switch(pg) {
			case 3: title = 'Players'; break;
			case 2: title = 'Activity'; break;
			default: title = 'Drugs'; break;
		}
	}
	else if (loc.indexOf(site + 'travel2.php')!=-1) {
		var dest = loc.indexOf('dest=')!=-1 ? loc.match(/dest=(\d)/)[1]-0 : -1;
		switch(dest) {
			case 8: title = 'To Sao Paulo'; break;
			case 7: title = 'To Moscow'; break;
			case 6: title = 'To Mexico City'; break;
			case 5: title = 'To Los Angeles'; break;
			case 4: title = 'To Ibiza'; break;
			case 3: title = 'To Tokyo'; break;
			case 2: title = 'To London'; break;
			case 1: title = 'To New York'; break;
		}
	}
	else if (loc.indexOf(site + 'leader.php')!=-1) {
		var o = loc.indexOf('o=')!=-1 ? loc.match(/o=(\d)/)[1]-0 : -1;
		switch(o) {
			case 4: title = 'Leaderboard (81-100)'; break;
			case 3: title = 'Leaderboard (61-80)'; break;
			case 2: title = 'Leaderboard (41-60)'; break;
			case 1: title = 'Leaderboard (21-40)'; break;
			case 0:
			case -1: title = 'Leaderboard (1-20)'; break;
			default: title = 'Leaderboard';
		}
	}
	else if (loc.indexOf(site + 'tournament.php')!=-1) { title = 'Tournament Info'; }
	else if (loc.indexOf(site + 'index.php')!=-1) { title = 'Status'; }
	else if (loc.indexOf(site + 'travel.php')!=-1) { title = 'Travel'; }
	else if (loc.indexOf(site + 'help.php')!=-1) { title = 'Help'; }
	else if (loc.indexOf(site + 'invite.php')!=-1) { title = 'Invite'; }
	else if (loc.indexOf(site + 'news.php')!=-1) { title = 'News'; }
	if (title != '') { document.title = title + ' - Drug Lords'; }
} catch(x) {
	GM_log('Error while changing page title: ' + x.name + ' - ' + x.message);
}

// Add shortcut menu

menu = document.createElement('div');
menu.id = 'FBDLMenu';

menu.innerHTML = '<div class="DLHeading">&nbsp;- Drug Lords -&nbsp;</div>' +
		'<a href="http://apps.facebook.com/drug_lords/tournament.php">Tournament Info</a><br />' +
		'<a href="http://apps.facebook.com/drug_lords/index.php">Your Status</a><br />' +
		'<div class="DLSection">-City View-</div>' +
		'<a href="http://apps.facebook.com/drug_lords/cityview.php?pg=2">Activity</a><br />' +
		'<a href="http://apps.facebook.com/drug_lords/cityview.php">Drugs</a><br />' +
		'<a href="http://apps.facebook.com/drug_lords/cityview.php?pg=3">Players</a><br />' +
		'<div class="DLSection">-Travel-</div>' +
		'<a href="http://apps.facebook.com/drug_lords/travel2.php?dest=4">Ibiza</a><br />' +
		'<a href="http://apps.facebook.com/drug_lords/travel2.php?dest=2">London</a><br />' +
		'<a href="http://apps.facebook.com/drug_lords/travel2.php?dest=5">Los Angeles</a><br />' +
		'<a href="http://apps.facebook.com/drug_lords/travel2.php?dest=6">Mexico City</a><br />' +
		'<a href="http://apps.facebook.com/drug_lords/travel2.php?dest=7">Moscow</a><br />' +
		'<a href="http://apps.facebook.com/drug_lords/travel2.php?dest=1">New York</a><br />' +
		'<a href="http://apps.facebook.com/drug_lords/travel2.php?dest=8">Sao Paulo</a><br />' +
		'<a href="http://apps.facebook.com/drug_lords/travel2.php?dest=3">Tokyo</a><br />' +
		'<a href="http://apps.facebook.com/drug_lords/travel.php">World</a><br />' +
		'<div class="DLSection">-Leaderboard-</div>' +
		'<a href="http://apps.facebook.com/drug_lords/leader.php">1-20</a><br />' +
		'<a href="http://apps.facebook.com/drug_lords/leader.php?o=1">21-40</a><br />' +
		'<a href="http://apps.facebook.com/drug_lords/leader.php?o=2">41-60</a><br />' +
		'<a href="http://apps.facebook.com/drug_lords/leader.php?o=3">61-80</a><br />' +
		'<a href="http://apps.facebook.com/drug_lords/leader.php?o=4">81-100</a><br />' +
		'<div class="DLSection">-Misc-</div>' +
		'<a href="http://apps.facebook.com/drug_lords/help.php">Help</a><br />' +
		'<a href="http://apps.facebook.com/drug_lords/invite.php">Invite</a><br />' +
		'<a href="http://apps.facebook.com/drug_lords/news.php">News</a><br />' +
		'';

style = document.createElement('style');
style.type = "text/css";
style.innerHTML = "#FBDLMenu { position:fixed; top:2px; right:2px; border:1px solid #0000ff; background:#c7e0ff; color:#333333; padding:2px; font-weight:bold; }" +
		"#FBDLMenu div.DLSection { text-align:center; padding-top:2px; font-style:italic; }" +
		"#FBDLMenu div.DLHeading { text-align:center; background:#a6c0ff; color:#333333; font-variant:small-caps; font-size:120%; }" +
		"#FBDLMenu a { color:#0066FF; text-decoration:none; }" +
		"#FBDLMenu a:hover { text-decoration:underline; }";
try {
	document.getElementsByTagName('head')[0].appendChild(style);
} catch(x) {
	GM_log('Error while adding shortcut menu style: ' + x.name + ' - ' + x.message);
}

document.body.insertBefore(menu, document.body.lastChild);