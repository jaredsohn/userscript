// ==UserScript==
// @name           Yahoo Copy Roster
// @namespace      http://www.glenncarr.com/greasemonkey
// @description    Copy roster from Yahoo fantasy league
// @include        http://*.fantasysports.yahoo.com/*
// $LastChangedRevision: 638 $
// $LastChangedDate: 2012-10-04 09:28:07 -0500 (Thu, 04 Oct 2012) $
// ==/UserScript==
/*
Updates:
10-Sep-2009 - Fixed bug causing DL'ed players to not displayed.
30-May-2011 - Added option to not display roster slots
02-Aug-2012 - Copy farm rosters if they are present
04-Oct-2012 - Copy notes in farm rosters
*/
(function(){

String.prototype.stripTags = function() {
  return this.replace(/<\/?[^>]+>|&[^;]+;|^\s+|\s+$/gi,'');
}

if ( document.getElementById('statTable0') == null )
	return;
	
var yspteammh = document.getElementById( 'yspteammh' );
if ( yspteammh == null )
	return;
leagueName = yspteammh.getElementsByTagName( 'span' )[ 0 ].lastChild.innerHTML;
	
var teaminfo = document.getElementById( 'teaminfo' );
if ( teaminfo == null )
	return;
teamName = teaminfo.getElementsByTagName( 'h1' )[ 0 ].innerHTML.stripTags();
manager = teaminfo.getElementsByTagName( 'a' )[ 0 ].innerHTML.stripTags();

GM_registerMenuCommand( "Copy roster (as displayed)", copyRosterAsDisplayed );
GM_registerMenuCommand( "Copy roster (as displayed, no positions)", copyRosterAsDisplayedNoPos );
GM_registerMenuCommand( "Copy roster (condensed)", copyRosterCondensed );

function copyRosterAsDisplayed() { copyRoster( 'DISPLAYED' ); }
function copyRosterAsDisplayedNoPos() { copyRoster( 'DISPLAYED_NOPOS' ); }
function copyRosterCondensed() { copyRoster( 'CONDENSED' ); }

function copyRoster( option )
{
try {
	var title = 'League: ' + leagueName + '\nTeam: ' + teamName + '\nManager: ' + manager + '\n\n';
	
	var clipStrings = new Array( title );
	var clipStringsNoPos = new Array( title );
	var clipStringsCondensed = new Array( title );
	for ( var iTable = 0; ; iTable++ )
	{
		var statTable = document.getElementById('statTable' + iTable);
		if ( statTable == null )
			break;

		var positions = new Object();

		for ( var iRow = 0; iRow < statTable.rows.length; iRow++ )
		{
			var row = statTable.rows[ iRow ];
			var rowClass = getClassName( row );
			if ( rowClass == 'headerRow1' )
			{
				for ( var iCell = 0; iCell < row.cells.length; iCell++ )
				{
					var cell = row.cells[ iCell ];
					var cellClass = getClassName( cell );
					if ( cellClass == 'player' )
					{
						var category = cell.innerHTML.stripTags();
						clipStrings.push( category );
						clipStrings.push( '\n' );

						clipStringsNoPos.push( category );
						clipStringsNoPos.push( '\n' );

						clipStringsCondensed.push( category );
						clipStringsCondensed.push( '\n' );
						break;
					}
				}                   
			}
			else if ( /\b(odd|even)\b/i.test( rowClass ) )
			{
				if ( !/--empty--/i.test( row.innerHTML ) )
				{
					for ( var iCell = 0; iCell < row.cells.length; iCell++ )
					{
						var cell = row.cells[ iCell ];
						var cellClass = getClassName( cell );
						if ( /^pos/i.test( cellClass ) )
						{
							var playerPos = cell.innerHTML.stripTags();
							if ( !positions.hasOwnProperty( playerPos ) )
								positions[ playerPos ] = new Array();
							clipStrings.push( playerPos );
							clipStrings.push( ': ' );
						}
						else if ( getClassName( cell ) == 'player' )
						{
							var playerName = stripAccent( cell.innerHTML.stripTags() ).replace( /\r\n|^\s+|\s+$/gi, '' ).replace( /\s+/g, ' ' );
							positions[ playerPos ].push( playerName );
							clipStrings.push( playerName  );
							clipStrings.push( '\n' );
							clipStringsNoPos.push( playerName  );
							clipStringsNoPos.push( '\n' );
							break;
						}
					}
				}
			} 
		}
		clipStrings.push( '\n' );
		clipStringsNoPos.push( '\n' );

		for ( var pos in positions )
		{
			clipStringsCondensed.push( pos );
			clipStringsCondensed.push( ': ' );
			var players = positions[ pos ];
			var delim = '';
			for ( var p = 0; p < players.length; p++ )
			{
				clipStringsCondensed.push( delim );
				clipStringsCondensed.push( players[ p ].replace( /\(\w+\s+- /, '(' ).replace( /\)\s+DL/i, ')' ) ); // remove team abbreviation and DL indicator
				delim = ', ';
			}
			clipStringsCondensed.push( '\n' );
		}
		clipStringsCondensed.push( '\n' );
	}

	statTable = document.getElementById( 'gncFarmRoster' );
	if ( statTable )
	{
		clipStrings.push( 'Farm\n' );
		clipStringsNoPos.push( 'Farm\n' );
		for ( var iRow = 1; iRow < statTable.rows.length - 1; iRow++ )
		{
			var row = statTable.rows[ iRow ];
			
			var cell = row.cells[ 0 ];
			var playerName = stripAccent( cell.innerHTML.stripTags() ).replace( /\r\n|^\s+|\s+$/gi, '' ).replace( /\s+/g, ' ' );
			clipStrings.push( playerName + ' '  );
			clipStringsNoPos.push( playerName + ' ' );

			var cell = row.cells[ 1 ];
			if ( cell )
			{
				var playerPos = stripAccent( cell.innerHTML.stripTags() ).replace( /\r\n|^\s+|\s+$/gi, '' ).replace( /\s+/g, ' ' );
				clipStrings.push( playerPos );
				clipStringsNoPos.push( playerPos );
			}

			var cell = row.cells[ 2 ];
			if ( cell )
			{
				var playerNotes = ' ' + stripAccent( cell.innerHTML.stripTags() ).replace( /\r\n|^\s+|\s+$/gi, '' ).replace( /\s+/g, ' ' );
				clipStrings.push( playerNotes );
				clipStringsNoPos.push( playerNotes );
			}

			clipStrings.push( '\n' );
			clipStringsNoPos.push( '\n' );
		}
	}

	var rosterText = clipStrings.join( '' ).replace( /\n+\s*$/, '' );
	var rosterTextNoPos = clipStringsNoPos.join( '' ).replace( /\n+\s*$/, '' );
	var condensedRosterText = clipStringsCondensed.join( '' ).replace( /\n+\s*$/, '' );

	if ( option == 'DISPLAYED' )	
		alert( rosterText );
	else if ( option == 'DISPLAYED_NOPOS' )
		alert( rosterTextNoPos );
	else if ( option == 'CONDENSED' )
		alert( condensedRosterText );
	/* else if ( option == 'WITH_STATS' )
		alert( rosterTextWithStats );
	*/
} catch ( e ) { alert( e ); }
}
	
/* Based on code by (C)Stephen Chalmers
* Strips grave, acute & circumflex accents
* http://www.thescripts.com/forum/thread145532.html
*/
function stripAccent(str)
{
    var s=str;

    var rExps=[ 
    /[\xC0-\xC2]/g, /[\xE0-\xE2]/g,
    /[\xC8-\xCA]/g, /[\xE8-\xEB]/g,
    /[\xCC-\xCE]/g, /[\xEC-\xEE]/g,
    /[\xD2-\xD4]/g, /[\xF2-\xF4]/g,
    /[\xD9-\xDB]/g, /[\xF9-\xFB]/g, 
    /[\xD1]/g, /[\xF1]/g ];

    var repChar=['A','a','E','e','I','i','O','o','U','u','N','n'];

    for(var i=0; i<rExps.length; i++)
        s=s.replace(rExps[i],repChar[i]);

    return s;
}

function getClassName( el )
{
    var className = el.getAttribute( 'class' );
    if ( className == null )
        className = el.getAttribute( 'className' );
    return className;
}


})();