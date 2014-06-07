// ==UserScript==
// @name           Blenderartists: Replies & views in columns
// @description    Makes post replies and views visible in their own columns. Based on the "Blenderartists: Add replies/views" script by reD_Fox
// @include        http://blenderartists.org/forum/search.php*
// @include        http://blenderartists.org/forum/forumdisplay.php*
// ==/UserScript==

var headerTds, allTds, thisTd, repliesCell, viewsCell;

//Add view and reply count column headers if necessary
headerTds = document.evaluate("//td[@class='thead' and @colspan='3']/span/..", document, null,
                             XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < headerTds.snapshotLength; i++) {
	thisTd = headerTds.snapshotItem(i);
	thisTd.colSpan = 1;

	repliesCell = thisTd.cloneNode(false);
	repliesCell.appendChild(document.createTextNode("Replies"));
	thisTd.parentNode.insertBefore(repliesCell, thisTd.nextSibling);

	viewsCell = thisTd.cloneNode(false);
	viewsCell.appendChild(document.createTextNode("Views"));
	thisTd.parentNode.insertBefore(viewsCell, repliesCell.nextSibling);
}

//Add view and reply count columns
allTds = document.evaluate(
    "//td[@class='alt2' and @title]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allTds.snapshotLength; i++) {
	thisTd = allTds.snapshotItem(i);
	thisTd.colSpan = 1; //so replies and views will fit

	viewsText = thisTd.title.replace(/Replies:.*, /, "").replace(/Views: /, "");
	repliesText = thisTd.title.replace(/, Views:.*/, "").replace(/Replies: /, "");

	thisTd.title = "";  //don't need the title any more, and I find it annoying

	repliesCell = thisTd.cloneNode(false);
	repliesCell.appendChild(document.createTextNode(repliesText));
	thisTd.parentNode.insertBefore(repliesCell, thisTd.nextSibling);

	viewsCell = thisTd.cloneNode(false);
	viewsCell.appendChild(document.createTextNode(viewsText));
	thisTd.parentNode.insertBefore(viewsCell, repliesCell.nextSibling);
}

