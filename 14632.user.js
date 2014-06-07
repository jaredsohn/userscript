// BBC Score Update
// v1 0 November 2007
// 

// ==UserScript==

// @name        BBC Score Update
// @namespace   brunwin.uk/greasemonkey
// @description Displays an alert with the scorer and the time when on a BBC sport live text football commentary to make it easier to track multiple games
// @include http://*.bbc.co.uk/sport*/hi/football/teams/*/*/live_text/default.stm*

// ==/UserScript==

(function() {
	if (!GM_setValue || !GM_getValue)
	{
	    alert('Please upgrade to the latest version of Greasemonkey.');
	    return;
	}
 	var allDivs = document.evaluate(
		"//div[@class='commGoal']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
     		null);
     	for (var i = 0; i < allDivs.snapshotLength; i++)
     	{
     		var thisDiv = allDivs.snapshotItem(i);
     		var announcement = thisDiv.innerHTML.replace(/<br>/, "\n").replace(/<\/?[^>]+(>|$)/g, '');
     		if(GM_getValue(window.location.href, "No Goals") == announcement)
     		{
     			return;
     		}
     		else
     		{
     			GM_setValue(window.location.href, announcement);
     			alert(announcement);
     			return;
     		}
     	}
})();