// ==UserScript==
// @name           Tits in Tops Forum Worksafe
// @namespace      tag:it.org,2008-04-04:furrfu
// @description    Make Tits in Tops forum (a bit more) worksafe.
// @include        http://*titsintops.com/phpBB2/*
// ==/UserScript==

var ttforumtitle = document.evaluate(
    "//span[@class='maintitle']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
var tttitleobject = ttforumtitle.snapshotItem(0);
if (tttitleobject) {
    tttitleobject.parentNode.removeChild(tttitleobject);
}

var ttforumsubtitle = document.evaluate(
    "//span[@class='gen']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
var ttsubtitleobject = ttforumsubtitle.snapshotItem(0);
if (ttsubtitleobject) {
    ttsubtitleobject.parentNode.removeChild(ttsubtitleobject);
}
if (window.location.href.match(/viewforum.php/))
{
	function ttRemoveThreadsWithAttachments() {
		
		var allClips, thisClip;
		allClips = document.evaluate(
			"//img[@src='images/icon_clip.gif']", document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < allClips.snapshotLength; i++)
			{ 
				thisClip = allClips.snapshotItem(i);
				var rowHide = thisClip.parentNode.parentNode.parentNode; 
				if (rowHide)
					{
						rowHide.parentNode.removeChild(rowHide);
					}
			}
		}
		
var topicCell = document.evaluate(
    "//th[@class='thCornerL']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

var tcObject = topicCell.snapshotItem(0);
tcObject.innerHTML = 
	'&nbsp;Topics&nbsp;<a href="javascript:ttRemoveThreadsWithAttachments()">No attachments</a>';
tcObject.addEventListener("click", ttRemoveThreadsWithAttachments, true);		
}