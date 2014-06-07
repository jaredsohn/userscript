// ==UserScript==
// @name           JobNet Title
// @namespace      http://freecog.net/2007/
// @description    Changes the page title on job detail pages to the name of the job, allowing easy bookmarking.
// @include        http://www.dwd.state.wi.us/jobnet/Scripts/Jobs-det.asp*
// ==/UserScript==

var h3 = document.getElementsByTagName('h3')[0];
if (h3) {
	document.title = h3.textContent.replace('(Job', ' (Job').replace(/\s+/, ' ').replace(/(^ | $)/g, '');
}