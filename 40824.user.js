// ==UserScript==
// @name           GameKnot advanced mini-tournament stats
// @namespace      maeki.org
// @description    Adds more information to mini-tournament tables
// @include        http://gameknot.com/mt.pl?id=*
// ==/UserScript==

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

var tTable = document.getElementsByTagName('tbody')[2];
var titleRow = tTable.childNodes[0];
//var titleRow = xpath("//tr[@bgcolor='#666699']").snapshotItem(0);
var newTitle;
newTitle = document.createElement('th');
newTitle.innerHTML="<b class='sml'>avg score</b>";
titleRow.appendChild(newTitle);

var scoreCells;
var thisCell;
scoreCells = xpath("//tr[@class='odd_list']/td");
for (var i = 0; i < scoreCells.snapshotLength-1; i++) {
    thisCell = scoreCells.snapshotItem(i);
	if(thisCell.textContent.match(/\/ (\d+) \//)) {
		var gamesPlayed = thisCell.textContent.match(/\/ (\d+) \//)[1];
		var nextCell = scoreCells.snapshotItem(i+1);
		var totalScore = nextCell.textContent;
		var avgString;
		if (gamesPlayed > 0)
		{
			avgString = Math.round (100*totalScore/gamesPlayed) / 100;
		}
		else {
		avgString = "n/a";
		}
		var newElement;
		newElement = document.createElement('td');
		newElement.innerHTML = avgString;
		nextCell.parentNode.insertBefore(newElement, nextCell.nextSibling);
		}
}
