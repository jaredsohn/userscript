// ==UserScript==
// @name           College Publisher Network De-paginator
// @namespace      http://www.curtisgibby.com/greasemonkey/
// @description    Gets all pages of text from College Publisher Network sites' stories
// @include        http://media.www.dailyutahchronicle.com/media/*.shtml*
// @include        http://media.www.utahstatesman.com/media/*.shtml*
// @include        http://media.www.dukechronicle.com/media/*.shtml*
// @include        http://media.www.dailyfreepress.com/media/*.shtml*
// @include        http://media.www.browndailyherald.com/media/*.shtml*
// @include        http://media.www.thelantern.com/media/*.shtml*
// @include        http://media.www.dailytargum.com/media/*.shtml*
// @include        http://media.www.thedailyaztec.com/media/*.shtml*
// @include        http://media.www.dailyorange.com/media/*.shtml*
// @include        http://media.www.thetraveleronline.com/media/*.shtml*
// @include        http://media.www.dailycampus.com/media/*.shtml*
// @include        http://media.www.dailyillini.com/media/*.shtml*
// @include        http://media.www.dailyiowan.com/media/*.shtml*
// @include        http://media.www.dailyillini.com/media/*.shtml*
// @include        http://media.www.kykernel.com/media/*.shtml*
// @include        http://media.www.dailylobo.com/media/*.shtml*
// @include        http://media.www.dailytarheel.com/media/*.shtml*
// @include        http://media.www.ndsmcobserver.com/media/*.shtml*
// @include        http://media.www.dailytrojan.com/media/*.shtml*
// @include        http://media.www.dailytexanonline.com/media/*.shtml*
// @include        http://media.www.gwhatchet.com/media/*.shtml*
// @include        http://media.www.bcheights.com/media/*.shtml*
// @include        http://media.www.udreview.com/media/*.shtml*
// @include        http://media.www.ucdadvocate.com/media/*.shtml*
// @include        http://media.www.wkuherald.com/media/*.shtml*
// @version        1.0
// ==/UserScript==

/* Begin script*/

goPageOne();
var numberOfPages = getNumberOfPages();
if (numberOfPages > 1)
{
	var i=2;
	for (i=2;i<=numberOfPages;i++)
	{
	replacePages(i);
	} // end for
} // end if
removeLinks();
/* End script*/

/* Functions */

function removeLinks() {
	// remove now-unnecessary links to more pages
	var removeLinksArray = new Array();
	var allnextPagesDivs, thisnextPagesDiv;
	removeLinksArray[0] = '//div[@id="cp_continued"]';
	removeLinksArray[1] = '//li[@class="cp_article_page"]';
	removeLinksArray[2] = '//div[@id="cp_story_bot_nav"]';

	for (i=0;i<removeLinksArray.length;i++)
	{
		allnextPagesDivs = document.evaluate(
			removeLinksArray[i],
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		thisnextPagesDiv = allnextPagesDivs.snapshotItem(0);
		thisnextPagesDiv.parentNode.removeChild(thisnextPagesDiv);   
	} // end for
} // end removeLinks

function goPageOne() {
	var currentLocation =String(window.location); 
	var targetLocation = String(window.location).replace("-page2",'').replace("-page3",'').replace("-page4",'').replace("-page5",'').replace("-page6",'').replace("-page7",'').replace("-page8",'').replace("-page9",'');
	if (currentLocation != targetLocation)
	{
		window.location = targetLocation;
	}
} // end goPageOne

function getNumberOfPages() {
	var search_string_start = "Page <strong>1</strong> of ";
	match_start = document.body.innerHTML.indexOf(search_string_start);
	numberOfPagesText = document.body.innerHTML.substring(match_start + search_string_start.length, match_start + search_string_start.length + 2);
	numberOfPages = parseInt(numberOfPagesText);
	if (match_start == -1) return -1;
	else return numberOfPages;
} // end function getNumberOfPages

function replacePages(page_number) {
	var thisLocationBase = String(window.location).replace(".shtml",'');
	var nextPage_url = thisLocationBase + "-page" + page_number + ".shtml"; // debug
	GM_xmlhttpRequest({
		method: 'GET',
		url: nextPage_url,
		onload: function(responseDetails) {
			var search_string_start = '<div id="cp_story_text">';
			var search_string_end = '</div>';
			var match_start = responseDetails.responseText.lastIndexOf(search_string_start);
			var match_end = responseDetails.responseText.indexOf(search_string_end,match_start + search_string_start.length);
			var nextPageText = responseDetails.responseText.substring(match_start + search_string_start.length,match_end);
			if (match_start != -1) {
				// found it
				var currentPage = document.getElementById('cp_story_text');
				currentPage.innerHTML += "<DIV id='depaginator_page_number_" + page_number + "'><P>" + nextPageText + "</div>";
			}
		}
	});
} // end replacePages()