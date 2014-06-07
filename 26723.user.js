// ==UserScript==
// @name           Steam Forums Reorganiser
// @namespace     tag:d37r17u5/UserScripts
// @include        http://forums.steampowered.com/forums/index.php
// @include        http://forums.steampowered.com/forums/
// ==/UserScript==

var xpath = "//tbody[@id='collapseobj_forumbit_53']/tr/td[@class='alt1']//table";
var result = document.evaluate( xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

for( var i = 0; i < result.snapshotLength; i++ )
{
	RedoTable( result.snapshotItem(i) );
}

function RedoTable( table )
{
	var width = table.rows[0].cells.length;
	var height = table.rows.length;
	
	var newTable = document.createElement( "table" );
	newTable.innerHTML = table.innerHTML;

	var newX = 0;
	var newY = 0;
	
	for( var y = 0; y < height; y++ )
	{
		for( var x = 0; x < width; x++ )
		{
			if( ! newTable.rows[newY].cells[newX] )
			{
				newTable.rows[newY].appendChild( document.createElement( "td" ) );
			}
			
			if( table.rows[y].cells[x] )
			{
				newTable.rows[newY].cells[newX].innerHTML = table.rows[y].cells[x].innerHTML;
			}
			
			newY = ( newY == height - 1 ) ? 0 : newY + 1;
			newX = ( newY == 0 ) ? newX + 1 : newX;
		}
	}
	
	table.innerHTML = newTable.innerHTML;
}
