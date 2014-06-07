// ==UserScript==
// @name        PassThePopcorn - Easier trailer editing for the trailer adding contest
// @description Makes it easier to edit trailers linked from the Bonus points for trailers thread on PassThePopcorn by automatically filling out the form with the new trailer link and showing the trailer embedded. By TnS. Last update: 2014.03.09.
// @homepage    http://userscripts.org/scripts/show/187270
// @version     1.1
// @namespace   http://greasemonkey.mozdev.com
// @include     http://*passthepopcorn.me/torrents.php?action=editgroup&groupid=*&new_trailer=*
// @include     https://*passthepopcorn.me/torrents.php?action=editgroup&groupid=*&new_trailer=*
// @include     http://passthepopcorn.me/forums.php*action=viewthread*&threadid=20113*
// @include     https://*passthepopcorn.me/forums.php*action=viewthread*&threadid=20113*
// @grant       none
// ==/UserScript==

function ShowTrailers( oldTrailerId, newTrailerId )
{
	var titleElement = document.querySelector( ".page__title" );
	if ( !titleElement )
		return false;

	var embeddedTrailerElement = document.createElement( "div" );
	embeddedTrailerElement.className = "text--center";

	var htmlCode;

	if ( oldTrailerId == newTrailerId )
	{
		htmlCode = '<h3 class="alert alert--error">SAME TRAILER!</h3><br>';
	}
	else if ( oldTrailerId.length > 0 )
	{
		htmlCode =
			'<table>' +
				'<tbody>' +
					'<tr>' +
						'<td>' +
							'Old trailer: ' +
							'<input type="text" size="60" class="form__input" value="http://www.youtube.com/watch?v=' + oldTrailerId +  '"><br>' +
							'<iframe class="youtube-player" type="text/html" width="480" height="385" src="//www.youtube.com/embed/' + oldTrailerId + '?wmode=opaque" frameborder="0"></iframe>' +
						'</td>' +
						'<td>' +
							'New trailer: ' +
							'<input type="text" size="60" class="form__input" value="http://www.youtube.com/watch?v=' + newTrailerId +  '"><br>' +
							'<iframe class="youtube-player" type="text/html" width="480" height="385" src="//www.youtube.com/embed/' + newTrailerId + '?wmode=opaque" frameborder="0"></iframe>' +
						'</td>' +
					'</tr>' +
				'</tbody>' +
			'</table><br><br>';
	}
	else
	{
		htmlCode = '<iframe class="youtube-player" type="text/html" width="480" height="385" src="//www.youtube.com/embed/' + newTrailerId + '?wmode=opaque" frameborder="0"></iframe><br><br>';
	}

	embeddedTrailerElement.innerHTML = htmlCode;
	titleElement.parentNode.insertBefore( embeddedTrailerElement, titleElement.nextSibling );

	return true;
}

function HandleEditPage()
{
	var youtubeIdRegex = /^[a-zA-Z0-9_-]+$/;

	// Get the new trailer ID.

	var trailerQueryText = "&new_trailer=";
	var index = window.location.search.indexOf( trailerQueryText );
	if ( index == -1 )
		return;

	var newTrailerId = window.location.search.slice( index + trailerQueryText.length );
	if ( newTrailerId.length <= 0 )
		return;

	if ( !newTrailerId.match( youtubeIdRegex ) )
		return;

	// Get the old trailer ID.

	var trailerElement = document.getElementsByName( "trailer" );
	if ( trailerElement.length != 1 )
		return;

	trailerElement = trailerElement[ 0 ];

	var oldTrailerId = trailerElement.value;
	oldTrailerId = oldTrailerId.replace( "http://www.youtube.com/watch?v=", "" );
	if ( !oldTrailerId.match( youtubeIdRegex ) )
		oldTrailerId = "";

	// Show the old and new trailers embedded.
	if ( !ShowTrailers( oldTrailerId, newTrailerId ) )
		return;

	// Set the new trailer link in the form.
	trailerElement.value = "http://www.youtube.com/watch?v=" + newTrailerId;

	// Make a big submit button.
	
	var panelBodyElement = document.querySelector( "#editgroup_mainform .panel__body" );
	if ( !panelBodyElement )
		return;

	var bigSubmitElement = document.createElement( "input" );
	bigSubmitElement.type = "submit";
	bigSubmitElement.value = "Submit";
	bigSubmitElement.style.cssText = "width: 100%; height: 48px; margin-bottom: 8px;";
	panelBodyElement.insertBefore( bigSubmitElement, panelBodyElement.firstElementChild );
    bigSubmitElement.focus();
}

function HandleForums()
{
	for ( var i = 0; i < document.links.length; ++i )
	{
		var link = document.links[ i ];
		var matches = link.href.match( /passthepopcorn\.me\/torrents\.php\?id=(\d+)/ );
		if ( !matches )
			continue;

		var groupId = matches[ 1 ];

		if ( !link.nextElementSibling || link.nextElementSibling.tagName != "A" )
			continue;
		
		var youtubeLink = link.nextElementSibling;
		matches = youtubeLink.href.match( /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/ );
		if ( !matches )
			continue;

		var youtubeId = matches[ 1 ];
		youtubeLink.textContent = "YT";

		link.href = "https://tls.passthepopcorn.me/torrents.php?action=editgroup&groupid=" + groupId + "&new_trailer=" + youtubeId;
        link.setAttribute( "target", "_blank" );
	}
}

function Main()
{
	if ( window.location.search.indexOf( "action=editgroup" ) >= 0 )
		HandleEditPage();
	else
		HandleForums();
}

Main();