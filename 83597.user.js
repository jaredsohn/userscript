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
// @name          MILB Click
// @namespace     http://mharrisdev.com/
// @description   MILB Click
// @include       http://web.minorleaguebaseball.com/milb/stats/*
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

function getMatchingLinks(match) {
    var res = []
    eachMatchingLink(match,function(a) {
        res.push(a)
    })
    return res
}

function getPlayerLinks() {
    function isPlayer(a) {
        return a.getAttribute('class') == 'playerLink'
    }
    return getMatchingLinks(isPlayer)
}

function clickSingleLink() {
    var res = getPlayerLinks()
    if (res.length == 1) window.location = res[0].getAttribute('href')
}

clickSingleLink()