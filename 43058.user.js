// Ynet Stop Auto Refresh
// Copyright, benleevolk, 2009
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// ==UserScript==
// @name           Ynet Stop Auto Refresh
// @namespace      http://userscripts.org/scripts/show/35593
// @description    Stop auto-refreshing components in ynet
// @include        http://*.ynet.co.il/*
// @include        http://ynet.co.il/*
// @include        http://*.mynet.co.il/*
// @include        http://mynet.co.il/* 
// @include        http://go.calcalist.co.il/*
// ==/UserScript==

var isYnet=location.href.match(/ynet\.co\.il/);
var isCalcalistIframe=location.href.match(/go\.calcalist\.co\.il/);

if (isYnet) {
	unsafeWindow.pageRefreshDisable();
	unsafeWindow.pageRefreshEnble = function() {};
} else if (isCalcalistIframe) {
	// adapted from Haaretz Enhancer by Lior Zur: http://userscripts.org/scripts/show/2284
	var xPath = document.evaluate("//meta[@http-equiv='Refresh']|//meta[@http-equiv='refresh']|//meta[@http-equiv='REFRESH']", document, null, 
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i=0; metaR=xPath.snapshotItem(i);i++) {
		var content = metaR.getAttribute("content");
		var stopTimer = window.setTimeout("window.stop();",(content-1)*1000); // in case load hasn't finished when the refresh fires

		window.addEventListener("load", function(){ try { window.clearTimeout(stopTimer); } catch(ex) {} window.stop(); }, true);

	}
}

