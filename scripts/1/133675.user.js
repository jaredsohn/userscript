// ==UserScript==
// @name        Display Team Matchup Details
// @namespace   http://glenncarr.com/greasemonkey
// @description Displays details of h2h matchups
// @include     http://baseball.fantasysports.yahoo.com/*
// $LastChangedRevision: 642 $
// $LastChangedDate: 2013-04-10 20:18:37 -0500 (Wed, 10 Apr 2013) $
// History:
// 22-May-12 Fixed bug that was causing it not to display before games had started
// 10-Apr-13 Changed to display on Matchups page
// ==/UserScript==
var divScoreboard = document.getElementById('allmatchups-scoreboard');
if ( divScoreboard == null )
	return;
	
var gSpan = document.createElement( 'span' );
var matchupElements = new Array();

GM_addStyle( 'table#matchup-summary-table strong { font-weight: bold; color: blue }' );
GM_addStyle( 'table#matchup-summary-table { font-size: 10px; }' );
GM_addStyle( 'table.teamtable tr td.team, table.teamtable tr th.team { width: 400px; white-space: nowrap; width:30em !important; }' );
GM_addStyle( 'table.teamtable { margin-bottom: 2px }' );
GM_addStyle( '.scoreboard p { padding: 0 0 }' );

showData();

function showData()
{
	var matchups = divScoreboard.getElementsByTagName( 'li' )
	for ( var i = 0; i < matchups.length; i++ )
	{
		var li = matchups[ i ]; 
		var anchors = li.getElementsByTagName( 'a' );
		var p = li.getElementsByTagName( 'p' );
		if ( p.length > 0 )
			p = p[ 0 ];
		else
		{
			p = document.createElement( 'p' );
			li.appendChild( p );
		}
		for ( var iAnchor = 0; iAnchor < anchors.length; iAnchor++ )
		{
			if ( /matchup/.test( anchors[ iAnchor ].href ) )
			{
				matchupElements.push( { displayElement:p } );
				GM_xmlhttpRequest({
					method: 'GET',
					url: anchors[ iAnchor ].href,
					onload: getMatchupDetailsHandler( handleMatchupDetails, p ),
					});
			}
		}
	}
}

function getMatchupDetailsHandler( responseHandler, displayElement )
{
    return function ( responseDetails )
    {
        if ( responseDetails.status == 200 )
            responseHandler( responseDetails.responseText, displayElement );
    }
}

function handleMatchupDetails( responseText, displayElement )
{
	gSpan.innerHTML = responseText;
	try {
	var tables = gSpan.getElementsByTagName( 'table' );
	for ( var iTable = 0; iTable < tables.length; iTable++ )
	{
		var table = tables[ iTable ];
		if ( table.id == 'matchup-summary-table' )
		{
			displayElement.style.display = 'none';
			table.deleteRow( 0 );
			for ( var i = 0; i < table.rows.length; i++ )
				table.rows[ i ].deleteCell( 0 );
			displayElement.parentNode.insertBefore( table, displayElement.nextSibling );
			break;
		}
	}
	} catch ( e ) { GM_log( e ); }
}
