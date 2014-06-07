// ==UserScript==
// @name        PassThePopcorn torrent filtering by genre and IMDb rating
// @description The script removes the unwanted torrents from the torrents page based on the genre tags and IMDb rating. For example you can hide all torrents that are rated below IMDb score 7 or all the documentaries. v2011.04.18. by TnS
// @namespace   http://passthepopcorn.me/
// @include     http://*passthepopcorn.me/torrents.php*
// @include     https://*passthepopcorn.me/torrents.php*
// @exclude     http://*passthepopcorn.me/torrents.php?id=*
// @exclude     https://*passthepopcorn.me/torrents.php?id=*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------

/*
Genre: name of the genre. Leave it empty for generic filter that applies to all genres.
ImdbRating: anything equal or below this value will be filtered. So if you set this 10, everything for the given genre will be filtered.
ShowUnrated: if set to true and the movie don't have IMDb score it will be shown. If set to false, it will be hidden.

Filters are applied in the same order as they are here, so the first rule is the strongest.
*/

var filter = new Array
(
	// This example setting will hide all documentary and short movies, horror movies that are rated below 6 and any movies below 7.
	// A horror movie rated 6.5 will be shown because the rule for the horror genre is before the generic filter.

	{ Genre: "documentary", ImdbRating:  10, ShowUnrated: false },
	{ Genre: "short",       ImdbRating:  10, ShowUnrated: false },
	{ Genre: "horror",      ImdbRating: 5.9, ShowUnrated: true  },

	// Filter for all genres.
	{ Genre: "", ImdbRating: 6.9, ShowUnrated: true } // Do not write comma after the last filter!
);

// Change this true to enable test mode.
// In test mode the filtered movies are highlited instead of being hidden.
var testMode = false;

// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------

function ShowMovie(row)
{
	imdbRating = $( row ).find( ".imdbrating" ).text();
	imdbRating = parseFloat( imdbRating );

	// Get all tags.
	tags = {}
	$( "td:eq(1) a[href*='taglist=']", row ).each( function()
	{
		tags[ $( this ).text().toLowerCase() ] = true;
	} );

	// Do the filtering.
	for ( var i = 0; i < filter.length; ++i )
	{
		var filterItem = filter[ i ];
		var genre = filterItem.Genre.toLowerCase();
		var isGenericFilter = genre.length <= 0;
		if ( isGenericFilter || ( genre in tags ) )
		{
			if ( isNaN( imdbRating ) )
				return filterItem.ShowUnrated;
			else
				return imdbRating > filterItem.ImdbRating;
		}
	}

	return true;
}

function HideRow(row)
{
	if ( testMode )
		row.css( { "background-color" : "red" } );
	else
		row.hide();
}

function Main()
{
	var showMovie = true;

	// Check all rows on the browse page.
	$( "#torrent_table tr" ).each( function()
	{
		if ( $( this ).hasClass( "group" ) )
		{
			showMovie = ShowMovie( this );
			if ( !showMovie )
				HideRow( $( this ) );
		}
		else if ( !showMovie && ( $( this ).hasClass( "group_torrent" ) || $( this ).hasClass( "edition_info" ) ) )
		{
			HideRow( $( this ) );
		}
		else
		{
			showMovie = true;
		}
	} );
}

Main();