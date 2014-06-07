// ==UserScript==
// @name          Remove ads from TitanTv
// @namespace     http://www.chaosarchitect.com/greasemonkey/
// @description	  Remove ads from Titan TV's grid
// @include       http://*.titantv.com/ttv/grid/grid.aspx*
// ==/UserScript==

/******************************************************************************
 *  Removes ads from TitanTV's grid for a cleaner presentation.
 *
 *
 * contact: dtwist@yahoo.com
 *
 * Version history can be found here: http://www.chaosarchitect.com/greasemonkey/TitanTV-adRemover.history
 *
 */



//  credit and thanks to Matthew Gray for this funciton
//  http://www.mkgray.com:8000/blog/Technology/Javascript/XpathAPI.comments
function evaluateXPath(context, path) { 
   var arr = new Array(); 
   var xpr = document.evaluate(path,context,null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
   for(i=0;item=xpr.snapshotItem(i);i++){ arr.push(item); } 
   return arr; 
}




(function() {	// Hide ads)
try
{
	var body, xpathResult, numResults, bannerRow;

	body = document.getElementById('bt');


	// remove right column
	xpathResult = evaluateXPath (body, '//*[@class="bannerColumnHeader"]/../../../../..');
	xpathResult[0].style.display="none";

	// Find all "sponsored by" cells
	xpathResult = evaluateXPath (body, '//*[@class="gridBannerRowCell"]/..');
	numResults = (xpathResult.length - 1);
	for (var i = 0; i <= numResults; i++) {
		xpathResult[i].style.display="none !important";
	}

	// Remove top header monster
	xpathResult = evaluateXPath (body, '//*[@class="headerBackground"]');
	xpathResult[0].style.display="none";

	// Find and hide ads at top and bottom of page
	xpathResult = evaluateXPath (body, '//*[@id="leaderboard"]');
	numResults = (xpathResult.length - 1);
	for (var i = 0; i <= numResults; i++) {
		xpathResult[i].style.display="none";
	}

}

catch (e)
{
	alert("The userscript for this site is no longer functioning as intended. If a page reload doesn't work, check the following website for an update: \n\nhttp://www.userscripts.org/scripts/show/914\n\n(You are using version 1.8 of this script.)");
}
})();

