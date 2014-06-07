// ==UserScript==
// @name           Deseret News De-paginator
// @namespace      http://userscripts.org/users/6623/scripts
// @description    Gets all pages of text from Deseret News stories
// @include        http://*deseretnews.com/dn/view/*.html*
// @include        http://*deseretnews.com/article/*.html*
// @version        1.1
// ==/UserScript==

/* Begin script*/

goPageOne();
var numberOfPages = getNumberOfPages();
if (numberOfPages > 1)
{
	var i=2;
	var thisDiv = document.getElementById("storyText");	
	for (i=2;i<=numberOfPages;i++)
	{
		var addedDiv = document.createElement("div");
		addedDiv.setAttribute('id','depaginator_page_' + i);
		thisDiv.appendChild(addedDiv);
		replacePages(i);
	} // end for
} // end if
/* End script*/

/* Functions */

function removeLinks() {
	// remove now-unnecessary links to more pages
	var allDivs, thisDiv;
	allDivs = document.evaluate(
		"//div[@class='pageNumbers']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allDivs.snapshotLength; i++) {
		thisDiv = allDivs.snapshotItem(i);
		thisDiv.parentNode.removeChild(thisDiv);
	}
} // end removeLinks

function goPageOne() {
	var currentLocation =String(window.location); 
	var targetLocation = String(window.location).replace("?pg=2",'').replace("?pg=3",'').replace("?pg=4",'').replace("?pg=5",'').replace("?pg=6",'').replace("?pg=7",'').replace("?pg=8",'').replace("?pg=9",'');
	if (currentLocation != targetLocation)
	{
		window.location = targetLocation;
	}
} // end goPageOne

function getNumberOfPages() {
	var numberOfPages = 1;
	var allPageNumbersDivs = document.evaluate(
			'//div[@class="pageNumbers"]',
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
	thisPageNumbersDiv = allPageNumbersDivs.snapshotItem(0);
	if (thisPageNumbersDiv)
	{
		var nodes = thisPageNumbersDiv.childNodes;
		var theUL = nodes[0];
		var ULChildNodes = theUL.childNodes;
		var liCount = 0;
		for (var i = 0; i < ULChildNodes.length; ++i) {
			if (ULChildNodes[i].nodeName.match(/li/i)) {
				liCount++;
			}  // end if
		}  // end for
		numberOfPages = liCount - 2;
	} // end if
	return numberOfPages;
} // end function getNumberOfPages

function replacePages(page_number) {
	var nextPageURL = String(window.location) + "?pg=" + page_number; 
	GM_xmlhttpRequest({
		method: 'GET',
		url: nextPageURL,
		onload: function(responseDetails) {
		
			doc = document.createElement('div');
			doc.innerHTML = responseDetails.responseText;
			
			findPattern = "//div[@id='storyText']";
			results = document.evaluate(findPattern, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

			if (results.snapshotItem(0) != null) {
				var addedDiv = document.getElementById('depaginator_page_' + page_number);
				addedDiv.innerHTML = results.snapshotItem(0).innerHTML;
			} // end if 
			
			removeLinks();

		}
	});
} // end replacePages()