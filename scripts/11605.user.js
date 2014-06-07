// ==UserScript==
// @name           Message Manager
// @namespace      http://www.deadawaken.com
// @include        http://www.deadawaken.com/game.php?sec=home&scr=messages*
// @description    This script replicates the Delete/Save/Mark as Read/Mark as Unread submit buttons at the top of the message page in DeadAwaken.
// ==/UserScript==
if( true )
{
	var allTables, table, tBody, trButton, trHeader, form;

	allTables = document.getElementsByTagName( "table" );

	for( var i = 0; i < allTables.length; i++ )
	{
		if( allTables[i].getAttribute( "class" ) == "t_700 gen center" )
		{
			table = allTables[i];
			break;
		}
	}
	
	form = document.getElementsByTagName( "form" )[0];

	trButton = table.rows[table.rows.length - 1];
	trHeader = table.rows[1];
	tBody = trButton.parentNode;

	tBody.insertBefore( trButton.cloneNode( true ), trHeader );
	
	table.parentNode.insertBefore( form, table );
	form.appendChild( table );
}