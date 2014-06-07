// ==UserScript==
// @name           GameKnot daily chess puzzle contest enhancement
// @namespace      maeki.org
// @description    Show exact chance of winning the Grand Prize
// @include        http://gameknot.com/chess-puzzle-contest.pl
// ==/UserScript==

var myChances;
var myChancesTdSnapshot = document.evaluate( "//td[@style='padding: 0px 20px;']",
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var myChancesTd = myChancesTdSnapshot.snapshotItem(0);
myChances = myChancesTd.textContent;

var allStarboxes, thisStarbox, totalSolutions;
totalSolutions = 0;
allStarboxes = document.evaluate( "//div[@class='star_box']",
			document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = 0; i < allStarboxes.snapshotLength; i++)
				{
					thisStarbox = allStarboxes.snapshotItem(i);
					var solutions = parseInt(thisStarbox.parentNode.parentNode.childNodes[5].textContent.match('\\d+'));
					if (solutions) {
						totalSolutions = totalSolutions + solutions;
					}
				}
var chanceString ="(Actual chance: "+(Math.round(1000000*myChances/totalSolutions))+" in a million)";
if (myChancesTd) {
    newElement = document.createElement('td');
    newElement.innerHTML = chanceString;
    myChancesTd.parentNode.insertBefore(newElement, myChancesTd.nextSibling);
}			
	