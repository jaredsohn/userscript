// ==UserScript==
// @name		Day of CR Season
// @namespace		http://www.courtrivals.com/
// @description		Adds day of season graphic on Court Rivals Gym Page
// @include		http://www.courtrivals.com/*
// @exclude		http://www.courtrivals.com/forums/*
// @exclude		http://www.courtrivals.com/
// @exclude		http://www.courtrivals.com/index.php
// @exclude		http://www.courtrivals.com/index.php?mess=nologin
// ==/UserScript==


var scan;
scan = document.evaluate(
	'//table',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

if(window.location == "http://www.courtrivals.com/teams.php")
{
	var table2 = scan.snapshotItem(3);

	var dayimage;
	dayimage = document.createElement('div');
	dayimage.innerHTML = '<div><table cellpadding="7"><td width="720" background=""></td><td><img align="right" height="25" src="http://www.courtrivals.com/images/seasonHistogram.php"></table></div>';
	table2.parentNode.insertBefore(dayimage, table2);
}
else
{
	var table2 = scan.snapshotItem(2);

	var dayimage;
	dayimage = document.createElement('div');
	dayimage.innerHTML = '<div><table cellpadding="7"><td width="720" background=""></td><td><img align="right" height="25" src="http://www.courtrivals.com/images/seasonHistogram.php"></table></div>';
	table2.parentNode.insertBefore(dayimage, table2);
}