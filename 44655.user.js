// ==UserScript==
// @name           TeamStats Shortcut
// @namespace      http://www.courtrivals.com/
// @include        http://www.courtrivals.com/teams.php*
// ==/UserScript==

var tabs = document.evaluate(
	'//td[@background="images/tab.gif"]',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

var lasttab = tabs.snapshotItem(tabs.snapshotLength - 1);

var scan = document.evaluate(
	'//td[@background="images/wood-header-bg.jpg"]',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

var link, teamid;
for(var i = 0; i < scan.snapshotLength; i++)
{
	link = scan.snapshotItem(i).innerHTML;
	if(link.indexOf('<a href="showTeamProfile.php?tid=') != -1)
	{
		teamid = link.slice(link.indexOf("tid") + 4,link.indexOf(">") - 1)
	}
}

var statbutton = document.createElement('td');
statbutton.innerHTML = '<div align="center"><a href="showTeamStats.php?tid=' + teamid + '"><b>Team Stats</b></a></div>';
statbutton.width = "140";
statbutton.setAttribute("background","images/tab.gif");

var blank = document.evaluate(
	'//td[@width="440"]',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

blank = blank.snapshotItem(0);
blank.width = blank.width - 140;

lasttab.parentNode.insertBefore(statbutton, lasttab.nextSibling);