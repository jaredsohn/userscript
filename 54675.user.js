// ==UserScript==
// @name           CR Dashboard Button

// @namespace      http://www.courtrivals.com/
// @description    Places a button on the Gym page to jump to the Dashboard
// @include        http://*courtrivals.com/maingame.php
// ==/UserScript==

var DashURL = 'http://www.courtrivals.com/dashboard.php';
DashButton = document.createElement('button');
DashButton.innerHTML = '<input type="button" id="DashButton">Go to Dashboard</input>';

var tables = document.evaluate(
	'//table',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

TrainingTable = tables.snapshotItem(5);
TrainingTable.parentNode.insertBefore(DashButton, TrainingTable);


DashButton.addEventListener('click', function()
{
	window.location.href = DashURL;
}, true);
