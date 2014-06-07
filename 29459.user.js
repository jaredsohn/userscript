// ==UserScript==
// @name           MythWeb Search Cleaner
// @namespace      http://userscripts.org/users/57999
// @description    Removes repeate items in the MythWeb search results using the Description
// @include        */mythweb/tv/search*
// ==/UserScript==


try
{


var toRemove = new Array();
var toRemoveCount = 0;

var descriptions = new Array();
var descriptionsCount = 0;

var table = document.getElementsByTagName('table')[3];

var rowIndex = 0;
var rowCount = table.rows.length;

for (rowIndex=0; rowIndex<rowCount; rowIndex++)
{

	var thisRow;
	thisRow = table.rows[rowIndex];

	if (thisRow.cells.length >= 4)
	{

		var thisDes = thisRow.cells[3].innerHTML;
		var isUnique = true;

		var otherDesIndex;
		for (otherDesIndex in descriptions)
		{
			if (thisDes == descriptions[otherDesIndex])
			{
				isUnique = false;
				break;
			}
		}

		if (isUnique)
		{
			descriptions[descriptionsCount] = thisDes;
			descriptionsCount++;
		}
		else
		{
			toRemove[toRemoveCount] = rowIndex;
			toRemoveCount++;
		}
	}

}

//delete in reverse order so the numbering does not change
var toRemoveIndex;
for(toRemoveIndex=toRemoveCount-1; toRemoveIndex>=0; toRemoveIndex--)
{
	var rowIndex = toRemove[toRemoveIndex];
	table.deleteRow(rowIndex);
}

//alert('Number of rows removed: ' + toRemoveCount);


}
catch(err)
{
	txt="There was an error on this page.\n\n";
	txt+="Error description: " + err.message + "\n\n";
	txt+="Click OK to continue.\n\n";
	alert(txt);
}




