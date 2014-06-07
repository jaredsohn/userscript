// ==UserScript==
// @name           TBK-Light forum [PHPBB] - reload thread
// @description    Reloads the thread to the latest unread post
// @namespace      http://userscripts.org/users/rhashana
// @version        2012.0323
// @changelog      Initial version
// @include        http://www.tbk-light.com/phpBB3/viewtopic.php*
// ==/UserScript==

// reloadToURL will dynamically hold the correct URL to load
var reloadToURL= "";

// See if 'Next' link is available
var hasNext = document.evaluate("//b/a[contains(text(),'Next')]", document,null, 3, null);

if (hasNext.booleanValue == false) {
	// This is the last page, so let's get URL of last visible post
		var viewedPosts = document.evaluate("//td[@class='gensmall']/div/a[contains(@href,'#')]", document, null, 7, null);
		var lastPostPosition = (viewedPosts.snapshotLength)-2;
		var currentURL = (window.location.href).replace(/#p[0-9]*/,"");
		reloadToURL = currentURL+(viewedPosts.snapshotItem(lastPostPosition).href).match(/#p[0-9]*/m);
		
	} else {
	// There's more pages, so grab the 'Next' link's URL
		reloadToURL = document.evaluate("//b/a[contains(text(),'Next')]", document, null, 9 , null).singleNodeValue.href;
}

// create button
var refreshBtn = document.createElement( 'div' );
with( refreshBtn) {
	setAttribute( 'align', 'right');
}
refreshBtn.innerHTML = '<a href='+reloadToURL+'><input type="button" value="Reload" title="Get new posts"</></a>';

// append button after lower PageNav
var pagecontentDiv = document.evaluate("//div[@id='pagecontent']",document, null, 9, null).singleNodeValue;
pagecontentDiv.parentNode.insertBefore(refreshBtn, pagecontentDiv.nextSibling);
refreshBtn.addEventListener("click", function () {
	// if is last page, need to reload to avoid just going to anchor
	if (hasNext.booleanValue == false) {
		window.location.href = reloadToURL; window.location.reload(true);
	} }, false);