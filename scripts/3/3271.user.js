// ==UserScript==
// @name           MySpace Blog Stats Adder
// @description    Adds a table of blog statistics to the blog control center.
// @include        http://*.myspace.com/*blog.controlcenter*
// ==/UserScript==

var statsTable, newStatsTable;
var thisStrong, thisNode, rows, dotIndex;
var newTableBody, spacer;
var outData = new Array();
for (i = 0 ; i < 6; i++)
{
	outData[i] = new Array;
}
var data = new Array();
for (i = 1 ; i <= 4; i++)
{
	data[i] = new Array;
}
var tableKeys = new Array;

//Finds the <strong>Today</strong> node, and walks up to the enclosing table.
thisStrong = document.evaluate("//strong[contains(.,'Today')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
thisNode = thisStrong.snapshotItem(0);
while (thisNode.nodeName.toUpperCase() != "TABLE")
{
	thisNode = thisNode.parentNode;
}
statsTable = thisNode;

//Parses the table into an array by row.
for (i = 1; i <= 4; i++)
{
	thisRow = statsTable.rows[i];
	thisNode = thisRow.firstChild.nextSibling.nextSibling.nextSibling;
	data[i][0] = thisNode.innerHTML;
	thisNode = thisNode.nextSibling.nextSibling;
	data[i][1] = thisNode.innerHTML;
	thisNode = thisNode.nextSibling.nextSibling;
	data[i][2] = thisNode.innerHTML;
}

for (i = 0; i < 3; i++)
{
	if (data[1][i] != 0)
	{
		outData[0][i] = data[3][i] / data[1][i];
		outData[1][i] = data[2][i] / data[1][i];
		outData[3][i] = data[4][i] / data[1][i];
	}
	else
	{
		outData[0][i] = "-";
		outData[1][i] = "-";
		outData[3][i] = "-";
	}
	if (data[2][i] != 0)
	{
		outData[2][i] = data[3][i] / data[2][i];
	}
	else
	{
		outData[2][i] = "-";
	}
	if (data[4][i] != 0)
	{
		outData[4][i] = data[2][i] / data[4][i];
	}
	else
	{
		outData[4][i] = '-';
	}
}
	
tableKeys[0] = "V/P";
tableKeys[1] = "C/P";
tableKeys[2] = "V/C";
tableKeys[3] = "K/P";
tableKeys[4] = "C/K";
	
for (i in outData)
{
	for (j in outData[i])
	{
		if (dotIndex = outData[i][j].toString().indexOf("."))
		{
			outData[i][j] = outData[i][j].toString().substr(0, dotIndex + 3);
		}
	}
}

spacer = document.createElement("tr");
spacer.innerHTML = "<td>&nbsp;</td>";
GM_log(spacer.outerHTML);

newStatsTable = document.createElement("tr");
newTableBody = "<td><table width='100%' border='0' cellpadding='1' cellspacing='0' bgcolor='6699cc'><tr><td><table width='100%'" + 
		"border='1' cellpadding='1' cellspacing='0' bordercolor='FFFFFF' bgcolor='F5F5F5' " +
		"style='border-collapse: collapse;' class='blue_white'><tr align='left' valign='middle' bgcolor='a5d5f5'> " + 
		"<td class='white7' style='color: black; font-weight: bold; font-size: 10pt;'>&nbsp;</td> " + 
		"<td width='40' align='center' style='color:000000; font-weight: none; font-size: 8pt;'><strong>Today</strong></td> " + 
		"<td width='40' align='center' style='color:000000; font-weight: none; font-size: 8pt;'><strong>Week</strong></td> " + 
		"<td width='40' align='center' style='color:000000; font-weight: none; font-size: 8pt;'><strong>Total</strong></td></tr>\n";
		
for (i = 0; i < 5; i++)
{
	newTableBody += "<tr align='left' valign='middle' bgcolor='E5E5E5'><td>" + tableKeys[i] + "</td>\n";
	for (j = 0; j < 3; j++)
	{
		newTableBody += "<td align='center'>" + outData[i][j] + "</td>\n";
	}
	newTableBody+= "</tr>";
}
newStatsTable.innerHTML = newTableBody + "</table></td></tr></table></td>";

var rowAbove = statsTable.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
rowAbove.parentNode.insertBefore(newStatsTable, rowAbove.nextSibling);
rowAbove.parentNode.insertBefore(spacer, rowAbove.nextSibling);
