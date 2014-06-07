// ==UserScript==
// @name           PassThePopcorn - Mark new torrents
// @description    All torrents that got uploaded since last pressing the New button get a new mark.
// @author         TnS
// @homepage    http://userscripts.org/scripts/show/114625
// @namespace      http://greasemonkey.mozdev.com
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
//
// @include        http://*passthepopcorn.me/torrents.php*
// @include        https://*passthepopcorn.me/torrents.php*
// @exclude        http://*passthepopcorn.me/torrents.php?id=*
// @exclude        https://*passthepopcorn.me/torrents.php?id=*
//
// @date          3/11/2011
// @version       1.0
// ==/UserScript==

function getTimeForRow(row)
{
	// format: Jul 01 2010, 07:21
	var timeText = $( "td:eq(2) span", row ).attr( "title" );
	var date = new Date();
	date.setTime( Date.parse( timeText ) );
	return date.getTime();
}

function updateNewTags(row)
{
	var clickedTime = getTimeForRow( row );
	GM_setValue( 'last_new', clickedTime + "" ); // + "": save as string
		
	$( "#torrent_table .group" ).each( function()
	{
		var time = getTimeForRow( this );
		if ( time <= clickedTime )
		{
			//$( "td:eq(2) a.PTPNewTag", this ).remove();
			$( "td:eq(1) a.PTPNewTag", this ).fadeOut( 'slow', function() { $(this).remove(); } );
		}
	} );
}

function main()
{
	var lastNew = GM_getValue( "last_new", 0 );

	$( "#torrent_table .group" ).each( function()
	{
		var time = getTimeForRow( this );
		if ( time > lastNew )
		{
			var link = $( '<a href="#" style="color: red; font-weight: bold;" class="PTPNewTag">(New)</a>' );
			link.click( function()
			{
				updateNewTags( $( this ).parent().parent() );
				return false; // prevent jumping to the top of the page ( http://stackoverflow.com/questions/976753/ )
			} );

			$( "td:eq(1)", this ).prepend( link );
		}
	} );
}

main();