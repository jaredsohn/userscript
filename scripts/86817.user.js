// ==UserScript==
// @name Snype
// @match [url]http://forums.somethingawful.com/forumdisplay.php?forumid=219[/url]
// ==/UserScript==

try
{
	var r = document.evaluate("//td[@class='replies']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	for(var i = 2; i < r.snapshotLength; i++)
	{
		var n = r.snapshotItem(i).getElementsByTagName("a")[0];
		var num = (parseInt(n.innerHTML) + 1) % 40;
		if(num == 0)
			n.parentNode.innerHTML = n.parentNode.innerHTML + "<h1>SNYPE IT</h1>";
	}
}
catch(e)
{
	alert("fail: " + e);
}
