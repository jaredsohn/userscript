// ==UserScript==
// @name           Delete Diigo lists
// @namespace      tag:brainonfire.net,2009-07-18:diigo-delete-all-lists
// @description    Delete all of your lists on Diigo. This is useful if you migrated from Furl and have an auto-created list for each tag. To use this script, visit your "My Lists" page and simply leave the page open. The script will take care of the rest.
// @include        http://www.diigo.com/list/*
// @version        0.3
// @changelog      Since 0.2: Put a warning/explanation at top of screen.
// ==/UserScript==

/*LIB: From http://wiki.greasespot.net/Code_snippets */
function $xpath(p, context)
{
	if(!context)
		context = document;
	var i;
	var arr = [];
	var xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(i = 0; item = xpr.snapshotItem(i); i++)
		arr.push(item);
	return arr;
}

var findNumber_re = /([0-9]+)/;

function reload() {
	location.reload();
}

function deleteEachAndRefresh() {
	if(listsFound.length == 0) {
		setTimeout(reload, 1000);
		return;
	}
	var next = listsFound.pop();
	var killAction = next.getAttribute('onclick');
	var listKillID = findNumber_re.exec(killAction)[0];
	loader.setAttribute('src', "http://www.diigo.com/bookmark_list/delete_list?list_id="+listKillID);
	setTimeout(deleteEachAndRefresh, 1000);
}

//delete everything on this page, then go to next page
var listsFound = $xpath("//span[starts-with(@onclick, 'delete')]");
var loader = $xpath("//img")[0];
var title = $xpath("//*[@id='pageName']/h1")[0];
title.style.color = 'red';

if(listsFound.length > 0) {
	title.innerHTML = 'Greasemonkey script: Deleting all lists';

	deleteEachAndRefresh();
} else {
	title.innerHTML = 'Greasemonkey script: Done deleting, please uninstall this Diigo userscript';
}


