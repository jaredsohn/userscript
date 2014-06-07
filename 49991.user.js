// ==UserScript==
// @name           Total Fleet
// @namespace      Echos AE Stuff
// @description    Total fleet at a location
// @include        http://*.astroempires.com/map.aspx?loc*
// ==/UserScript==

function addCommas(nStr)
{
	nStr += '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(nStr)) {
		nStr = nStr.replace(rgx, '$1' + ',' + '$2');
	}
	return nStr;
}

var TotFleet = GetTotFoo();
if(TotFleet != "0")
{
	var spacer = document.createElement('span');
	spacer.style.margin = "5px 5px 0px 0px";
	spacer.innerHTML = "<center>Total Fleet: "+ TotFleet+"</center>";
	document.body.appendChild(spacer);
}

function GetTotFoo()
{
	var runningTot = 0;
	var fleetNode = document.evaluate("//TR/TD[last()]/A[contains(@href,'fleet.aspx?fleet=')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)

	for (var i = 0; i < fleetNode.snapshotLength; i++)
	{
		runningTot += parseInt(fleetNode.snapshotItem(i).text);
	}
	return addCommas(runningTot);
}