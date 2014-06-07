// ==UserScript==
// @name          Planet Planet reader
// @version       0.1
// @author        Yoan Blanc
// @namespace     http://yoan.dosimple.ch/
// @description   Google Reader behavior on planet planet over the web
// @include       http://planet.*
// @include       http://go-mono.com/monologue/*
// @include       http://www.go-mono.com/monologue/*
// @include       http://linuxfr.org/pub/*
// @include       https://linuxfr.org/pub/*
// @exclude       http://planet.mozilla.org/*
// @exclude       http://planet.python.org/*
// ==/UserScript==

//Author contact info: Yoan Blanc <yoan.blanc@gmail.com>

//Copyright (C) 2007. Yoan Blanc.
//This script is free software; you can redistribute it and/or modify
//it under the terms of the GNU General Public License as published by
//the Free Software Foundation; version 2 of the License. More
//information and a copy of the license available at http://www.gnu.org/copyleft/gpl.html

//This script is distribute in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
//GNU General Public License for more details.

(function(){
	// config
	var sEntryClassNames = [
		// planet.gnome
		{type:"div", classname:"entry"},
		// planet.intertwingly (aka Venus)
		{type:"div", classname:"news"},
		// planet.inertie (aka moonmoon) 
		{type:"div", classname:"post"},
		// planet.gentoo
		{type:"div", classname:"personheading"},
		// planet.lisp (aka blosxom)
		{type:"h4", classname:"blosxomTitle"},
		// linuxfr.org
		{type:"div", classname:"titlediv"}
	];
	var bAutoCollapse = false;
	var sCollapseClassName = "gm_collapse";

	// Extra CSS (for collapsing)
	GM_addStyle(
		// planet gnome
		"."+sCollapseClassName+" .post-contents, "+
		// moonmoon
		"."+sCollapseClassName+" .post-content, "+
		// venus
		"."+sCollapseClassName+" .content, " +
		// planet.gentoo
		"."+sCollapseClassName+" + div + div.entrycontent, " +
		// planet.lisp
		"."+sCollapseClassName+" + div.blosxomStory, " +
		// linuxfr
		"."+sCollapseClassName+" + div.bodydiv " +
		"{ display:none; }"
	);

	// do not touch bellow ;-)
	var aEntries;
	var nCurrentEntry = 0;
	var reCollapse = new RegExp(sCollapseClassName);
	
	function main() {
		// waiting for getElementsByClassName (Firefox 3)
		var oResult;
		for(var i=0, nSize = sEntryClassNames.length; i<nSize; i++) {
			oResult = document.evaluate(
				"//"+sEntryClassNames[i].type+"[contains(concat(' ',@class,' '), ' "+sEntryClassNames[i].classname+" ')]",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
			if(oResult.snapshotLength > 0){
				break;
			}
		}
		
		aEntries = [];
		if(oResult && oResult.snapshotLength) {
			for(var i=0, nSize = oResult.snapshotLength; i<nSize; i++){
				aEntries.push(oResult.snapshotItem(i));
				// auto collapsing entries
				if(bAutoCollapse) {
					collapseEntry(i);
				}
			}
			document.addEventListener("keydown", onKeyDown, true);
		}
	}

	function onKeyDown(oEvent) {
		var oEvent = oEvent || window.event;
		switch(oEvent.keyCode) {
			case 78: // n (for next)
				nCurrentEntry = Math.min(aEntries.length - 1, nCurrentEntry + 1);
				scrollToEntry();
				break;
			case 80: // p (for previous)
				nCurrentEntry = Math.max(0, nCurrentEntry - 1);
				scrollToEntry();
				break;
			case 67: // c (current)
				scrollToEntry();
				break;
			case 13: // enter
				collapseEntry();
				break;
		}
	}
	
	function getEntry(nIndex) {
		return aEntries[nIndex];
	}
	
	function getCurrentEntry() {
		return getEntry(nCurrentEntry);
	}
	
	function getY(oElement) {
		var nY = oElement.offsetTop;
		var oParent = oElement.offsetParent;
		while(oParent && oParent != oElement){
			nY += oParent.offsetTop;
			oParent = oParent.offsetParent;
		}
		return nY;
	}
	
	function scrollToEntry() {
		window.scrollTo(0, getY(getCurrentEntry()));
	}
	
	function collapseEntry(nIndex) {
		var oEntry = typeof(nIndex) !== "undefined"
			? getEntry(nIndex)
			: getCurrentEntry();
		
		oEntry.className = reCollapse.test(oEntry.className)
			? oEntry.className.replace(sCollapseClassName, "")
			: oEntry.className + " " + sCollapseClassName;
	}
	
	main();
})();
