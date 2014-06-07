// CleanMilliyet
// version 0.0.1
// 23.01.2008
// Copyleft Tanaydın 'Huzursuz' Şirin
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ChangeLog
// 0.0.1
// Started Coding
// --------------------------------------------------------------------
// ==UserScript==
// @name			CleanMilliyet
// @description	Removes ads from Milliyet Online
// @author		HuzursuZ
// @version		0.0.1
// @include		http://*.milliyet.com.tr/*

// ==/UserScript==

var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var XPIter  = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;

function find(xpath, xpres){
	var ret = document.evaluate(xpath, document, null, xpres, null);
	return xpres == XPFirst ? ret.singleNodeValue : ret;
}

window.addEventListener(
    'load', 
    function() {
		var hidecontains = new Array(
			"banner",
			"_ust",
			"_sol",
			"_scrolling",
			"_popup_",
			"_sticky",
			"_sagust",
			"130x90",
			"300x250",
			"100x400",
			"637x60",
			"megaadcorner"
		);
		for (var z = 0; z < hidecontains.length; z++) {
			var elemToHideList = find("//*[contains(@id, '" + hidecontains[z] + "')]", XPList);
			for (var i = 0; i < elemToHideList.snapshotLength; i++) {
				elemToHide = elemToHideList.snapshotItem(i); 
				if (elemToHide) {
					elemToHide.style.display = 'none';
				}
			}
		}
		var elemToHide = find("//iframe", XPFirst);
		//alert(elemToHide.src);
		if (elemToHide) {
			elemToHide.style.display = 'none';
		}
	},
    false);