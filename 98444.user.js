// ==UserScript==
// @name           buggybank.com vehicle id viewer
// @namespace      buggybank
// @description    Show buggybank vehicle IDs. The sortable field acts as a proxy for indicating how long the car has been on the lot.
// @include        http://buggybank.org/lotlist.php
// @include        http://buggybank.com/lotlist.php
// @include        http://www.buggybank.com/lotlist.php
// @grant          none
// ==/UserScript==

function addColumnHeader()
{
	var th = document.createElement('th');
	th.innerHTML = 'Id';
	th.setAttribute('class', 'header');

	var tr = document.getElementsByTagName('tr')[0];
	var stub = tr.lastChild;
	tr.replaceChild(th, stub);
}

function getVehicleId(row)
{
	var vehicleId = row.firstChild.firstChild;
	if (vehicleId == null)
	{
		return vehicleId;
	}
	var vehicleId = vehicleId.getAttribute('href');

	var end = vehicleId.lastIndexOf('.');
	var start = vehicleId.lastIndexOf('/');
	
	return vehicleId.substr(start + 1 , end - start - 1);
}

var rows = document.getElementsByTagName('tr');
for (var i = 0; i < rows.length; ++i) {
	var vehicleId = getVehicleId(rows[i]);
	if (vehicleId == null) {
		continue;
	}
	var newCell = rows[i].insertCell(-1);
	newCell.innerHTML = vehicleId;
}

addColumnHeader();
