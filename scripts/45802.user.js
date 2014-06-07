// ==UserScript==
// @name           ClanTotalLand
// @namespace      niom
// @description    calculates total land for a clan
// @include        http://www.nukezone.nu/clan.asp?Action=SpyReports&Q=*
// @exclude        http://www.nukezone.nu/clan.asp?Action=SpyReports&Q=-1
// @exclude        http://www.nukezone.nu/clan.asp?Action=SpyReports&Q=-2

// ==/UserScript==

var tds = document.getElementsByTagName("td");

var totalLand = 0;
var lastTD = null;
for (var i = 0; i < tds.length ; ++i)
{
	var td = tds[i];
	if (td.innerHTML.search('<td') == -1 && td.innerHTML.length > 3)
	{
		var unparsedLand = td.innerHTML;

		var endIndex = unparsedLand.lastIndexOf(' m²');
		if ( endIndex == unparsedLand.length - 3 )
		{
			var spaceIndex = unparsedLand.indexOf('&nbsp;');
			var landStr = unparsedLand.substr(0, spaceIndex).concat(unparsedLand.substr(spaceIndex + 6, endIndex - spaceIndex - 6));
			var landInt = parseInt(landStr);
			totalLand += landInt;
			lastTD = td;
		}
	}
}

var newPara = document.createElement('p');
newPara.innerHTML = '<br><b>Total Land: ' + totalLand + ' m&sup2</b><br>';

//lastTD.parentNode.parentNode.parentNode.insertBefore(newPara, lastTD.parentNode.parentNode.nextSibling);

var tables = document.getElementsByTagName('table');
for (var ii =0 ; ii < tables.length ; ++ii)
{
	var afterTable = tables[ii];
	if (afterTable.innerHTML.search(' m²') != -1 && afterTable.innerHTML.search('<table') == -1)
	{
		afterTable.parentNode.insertBefore(newPara, afterTable.nextSibling);
	}
}


