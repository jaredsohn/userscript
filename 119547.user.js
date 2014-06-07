// ==UserScript==
// @name                iPredict: My Portfolio - single owned/shorted stock table
// @namespace	        http://lineham.co.nz/userscripts/ipredict/myportfolio
// @description	        Merge owned and shorted stocks on iPredict My Portfolio page
// @version             1.1
// @match		https://ipredict.co.nz/*
// @match		https://www.ipredict.co.nz/*
// @match		http://play.ipredict.co.nz/*
// ==/UserScript==

GM_log("myportfolio: running");

if(document.location.pathname == "/app.php") {
   
   	var longTable = document.evaluate(
   		"//div[@class='page-sub-section']/h4[@id='long-stock']/../table[@class='full-details-data']",
   		document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
   	
   	var shortTable = document.evaluate(
   		"//div[@class='page-sub-section']/h4[@id='short-stock']/../table[@class='full-details-data']",
   		document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
   	
	if(longTable && shortTable) {
		mergeTables(longTable, shortTable);
		removeSubsectionOf(shortTable);
	}
}

function mergeTables(targetTable, sourceTable) {
	var targetBody = targetTable.tBodies.item(0);
	var sourceBody = sourceTable.tBodies.item(0);
	
	while(sourceBody.hasChildNodes())
		targetBody.appendChild(sourceBody.firstChild);
	
	var initialSortHeading = targetTable.tHead.rows.item(0).cells.item(0);
	
	// Simulate a click on Symbol, so to trigger sorting if datatables
	// userscript is also installed and has run first.
	//GM_log("myportfolio: clicking first heading");
	var click = document.createEvent("MouseEvents");
	click.initMouseEvent("click", true, true, window,
    		0, 0, 0, 0, 0, false, false, false, false, 0, null);
    	initialSortHeading.dispatchEvent(click);
    	
    	// Drop a custom property on the table to ask for sorting, in case
    	// datatables userscript is also installed but yet to run.
    	targetTable.setAttribute("initialSortHeadingIdx", initialSortHeading.cellIndex);
}

function removeSubsectionOf(node) {
	var subsection = node.parentNode;
	if(subsection)
		subsection.parentNode.removeChild(subsection);
	else
		GM_log("Couldn't find subsection to remove");
}
