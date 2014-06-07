// ESPN MLB Sort! example user script
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
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
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
// @name          ESPN MLB Sort
// @namespace     http://mharrisdev.com/
// @description   ESPN MLB Sort
// @include       http://espn.go.com/mlb/team/*
// ==/UserScript==

function arrEach(a,f) {
	for(var i=0;i<a.length;i++) {
		f(a[i])
	}
}

function eachMatchingLink(match,f) {
	var links = document.getElementsByTagName('a')
	arrEach(links,function(a) {
		if (match(a)) {
			f(a)
		}
	})
}

function startsWith(str,exp) {
	return str.substr(0,exp.length) == exp
}

function isBattingStatsLink(a) {
	return startsWith(a.href,"http://espn.go.com/mlb/team/stats/batting") && a.href.match("/cat/")==null
}

function isPitchingStatsLink(a) {
	return startsWith(a.href,"http://espn.go.com/mlb/team/stats/pitching") && a.href.match("/cat/")==null
}

function insertInto(str,new_str,spot) {
	return str.substr(0,spot) + new_str + str.substr(spot,9999)
}

function fixStatsLinks() {
	eachMatchingLink(isBattingStatsLink,function(a) {
		a.href = insertInto(a.href,"/cat/atBats",52)
	})
	eachMatchingLink(isPitchingStatsLink,function(a) {
		a.href = insertInto(a.href,"/cat/thirdInnings/order/true",53)
	})
}

//http://espn.go.com/mlb/team/stats/batting/_/name/cin/cincinnati-reds
//http://espn.go.com/mlb/team/stats/batting/_/name/cin/cat/atBats/cincinnati-reds//

fixStatsLinks()