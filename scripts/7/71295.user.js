// ==UserScript==
// @name           WF Cargo "Load All Same"
// @namespace      http://unidomcorp.com
// @description    Load a fleet of cargo ships the same as the current ship
// @include        http://www.war-facts.com/cargo.php*
// ==/UserScript==


var resArray = ['iron','copper','silver','titanium','gold','uranium','platinum','diamonds','oil','water','food'];
var shipSel = document.getElementsByName('ship')[0];
var curShip = document.getElementsByName('ship')[1];
var form = document.getElementsByTagName('form')[1];
var submit = document.evaluate("//input[@name='Submit']", form, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
var table = document.evaluate("//table", form, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
var shipArr;

window.loadNext = function(ships) {
	if (ships.length < 1) return false;
	
	var values = [];
	for (var i = 1, len = table.rows.length-1; i < len; i++)
	{
		values.push(parseInt(table.rows[i].cells[2].innerHTML));
	}
	
	for (var i = 0, len = resArray.length; i < len; i++)
	{
		var load = document.getElementById('load'+resArray[i]);
		load.disabled = false;
		load.checked = true;
		document.getElementById(resArray[i]).value = values[i];
	}
	
	curShip.value = ships.shift();
	if (ships.length > 0) form.action += '?loadsame='+ships.toString();
	submit.click();
}

unsafeWindow.loadAllSame = function() { loadNext(shipArr); }

if (window.location.href.indexOf('loadsame=') == -1)
{	
	shipArr = [];
	for (var i = 1, len = shipSel.options.length; i < len; i++)
	{
		var cargoHold = shipSel.options[i].text.match(/(\d+) \/ (\d+)$/);
		if (shipSel.options[i].value != curShip.value && cargoHold[1] != cargoHold[2])
			shipArr.push(shipSel.options[i].value);
	}
}
else
{
	shipArr = window.location.href.match(/loadsame=([0-9,]+)/)[1];
	shipArr = shipArr.split(',');
	loadNext(shipArr);
	
	return;
}

var loadAllSameBtn = document.createElement('input');
loadAllSameBtn.setAttribute('type','button');
loadAllSameBtn.setAttribute('value','Load All Same');
loadAllSameBtn.setAttribute('onClick','loadAllSame()');

table.rows[0].cells[3].appendChild(loadAllSameBtn);