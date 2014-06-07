// ==UserScript==
// @name		TE
// ==/UserScript==

var currentattributes = document.evaluate(
				'//td[@width="14%"]',
				document,
				null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
				null);

	var currentendurance = currentattributes.snapshotItem(2).innerHTML * 1;



if(window.location == "http://www.courtrivals.com/maingame.php" && currentendurance < 15)
{
       window.setTimeout(function() {window.location.replace("http://www.courtrivals.com/processing/train.php?s=Endurance") }, 3600 * 1000);

}


