// StumbleStars For Google
// version 0.1 alpha
// 2008-05-13
// Copyright (c) 2008, Jason Whitener
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//

// ==UserScript==
// @name          StumbleStars For Google
// @namespace     http://jasonwhitener.com
// @description   Script to remove anything not marked by a Stumble Star
// @include       http://www.google.com/*
// @include       http://*.google.com/*
// ==/UserScript==

tablehits = document.evaluate(
    "//table[@class='t bt']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
		for (var i = 0; i < tablehits.snapshotLength; i++) {
    thistablehit = tablehits.snapshotItem(i);
    	
			thistablehit.innerHTML = '<input id="btnFilter" type="submit" class="inputbutton" value="See Stumble Stars" onclick="filterit()" />';
			}
			
function filterit() {
allDivgs = document.evaluate(
    "//div[@class='g']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivgs.snapshotLength; i++) {
    thisDivg = allDivgs.snapshotItem(i);
    	
				var myRegExp = /star.png/;
				var string1 = thisDivg.innerHTML;
				var matchPos1 = string1.search(myRegExp);
				
				if(matchPos1 != -1)
					 temp = 'temp';
				else
					thisDivg.innerHTML = '';

}

}
document.getElementById('btnFilter').addEventListener("click", filterit, true);