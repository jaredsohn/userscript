// ==UserScript==
// @name          dev2dev Mr Wong
// @namespace     http://dev2dev.bea.com
// @description   Injects a link to Mr Wong on each blog/article link
// @include       http://dev2dev.bea.com/blog/*
// @include       http://dev2dev.bea.com/pub/*
// ==/UserScript==

var divTagsWithClass, taggingDiv;
GM_log('Running dev2dev Mr Wong script');

// get the existing tagging div box 
//   by looking for the class (box_gray)
divTagsWithClass = document.evaluate(
    "//div[@class='box_gray']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
// the tagging div appears last
taggingDiv = divTagsWithClass.snapshotItem(divTagsWithClass.snapshotLength-1);

if (taggingDiv)
{
	// find the table
	tableTag = taggingDiv.getElementsByTagName('table')[0];
	if (tableTag)
	{
		// create the new row
		var lastIndex = tableTag.rows.length;
		newLinkTR = tableTag.insertRow(lastIndex);
		
		// create the td for image and set styles
		var newLinkTD = newLinkTR.insertCell(0);
		newLinkTD.valign = 'bottom';
		newLinkTD.width = '20';

		// build the HTML	
		newLinkTD.innerHTML = '<img src='+
			'"http://www.mister-wong.cn/favicon.ico"'+
			' alt="Mr. Wong" border="0" height="18" '+
			'hspace="8" width="18">';

		// create the td for the image
		var newLinkTD = newLinkTR.insertCell(1);

		// set the styles
		newLinkTD.nowrap = 'nowrap';
		newLinkTD.valign = 'bottom';

		// build the HTML	
		newLinkTD.innerHTML = 
			'<a href="http://www.mister-wong.cn/index.php?'+
			'action=addurl&v=1&bm_url='+
			window.location+
			'&bm_description='+
			document.title+
			'">'+
			'Mr. Wong</a>';
	}
	else {
		GM_log('  Error: did not find the tagging inner table');
	}
}
else {
	GM_log('  Error: did not find a tagging div');
}