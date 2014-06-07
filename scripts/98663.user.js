/*
 * TinyOgg redirector
 * Copyright © 2011 Wacław Jacek
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

// ==UserScript==
// @name           TinyOgg redirector
// @namespace      wj
// @include        http://tinyogg.com/*
// @include        http://www.tinyogg.com/*
// @include        http://www.youtube.com/watch?v=*
// @description    Replaces YouTube videos with a link that submits them to TinyOgg.com. Also provides some TinyOgg automation (see the "DEFINES" section of the code).
// ==/UserScript==

/********** DEFINES - BEGIN **********/
var AUTOMATIC_REDIRECTION_TO_WATCH_PAGE_ENABLED = true; // Automatically redirects you from the post-add page to the watch page.
var AUTOMATIC_SUBMISSION_TO_TINYOGG_ENABLED = true; // Automatically submits videos to TinyOgg.
var AUTOMATIC_WATCH_PAGE_REFRESHING_ENABLED = true; // This refreshes the watch page as long as the conversion is in progress.
var OPEN_IN_NEW_WINDOW = true; // When set to true, the converts will be opened in a new window/tab (depending on your browser settings).
var REFRESHING_INTERVAL = 30; // In seconds. Only applies if AUTOMATIC_WATCH_PAGE_REFRESHING_ENABLED is true.
/*********** DEFINES - END ***********/

var current_address = document.location.href;
var tinyogg_add_video_address_regexp = new RegExp( '^http://(www\\.)?tinyogg\\.com/add/$' );
var tinyogg_began_converting_notice_regexp = new RegExp( '<a href=".*">.*</a>.*was added to the queue. Wait and watch it on <a href="/watch/(.*)/">this page</a>.' );
var tinyogg_still_converting_notice_regexp = new RegExp( 'didn\'t finish yet. Please reload this page after a few minutes.' );
var tinyogg_watch_video_address_regexp = new RegExp( '^http://(www\\.)?tinyogg\\.com/watch/' );
var youtube_address_regexp = new RegExp( '^http://(www\\.)?youtube\\.com/watch\\?v=[^&]+' );

if ( current_address.match( youtube_address_regexp ) )
{
	var form = document.createElement( 'form' );
	form.setAttribute( 'action', 'http://www.tinyogg.com/add/' );
	form.setAttribute( 'id', 'tinyogg-conversion-form' );
	form.setAttribute( 'method', 'post' );
	if ( OPEN_IN_NEW_WINDOW == true ) form.setAttribute( 'target', '_blank' );
	
	var url_field = document.createElement( 'input' );
	url_field.setAttribute( 'name', 'url' );
	url_field.setAttribute( 'value', youtube_address_regexp.exec( document.location.href )[0] );
	form.appendChild( url_field );
	
	var type_field = document.createElement( 'input' );
	type_field.setAttribute( 'name', 'type' );
	type_field.setAttribute( 'value', 'video' );
	form.appendChild( type_field );
	
	document.body.appendChild( form );
	
	watch_video_box = document.getElementById( 'watch-player' );
	watch_video_box.style['backgroundColor'] = '#ffffff';
	watch_video_box.style['color'] = '#000000';
	
	if ( AUTOMATIC_SUBMISSION_TO_TINYOGG_ENABLED == true )
	{
		watch_video_box.innerHTML = '<p>Loading the video...</p><p style="font-size: 0.8em">(<a href="#" onclick="javascript:document.getElementById( \'tinyogg-conversion-form\' ).submit();">click here to open it again</a>)</p>';
		form.submit();
	}
	else
	{
		watch_video_box.innerHTML = '<p><a href="#" onclick="javascript:document.getElementById( \'tinyogg-conversion-form\' ).submit();">Watch this video on TinyOgg.com</a></p>';
	}
}
else if ( current_address.match( tinyogg_add_video_address_regexp ) )
{
	if ( AUTOMATIC_REDIRECTION_TO_WATCH_PAGE_ENABLED == true )
	{
		var webpage_content = document.body.innerHTML;
		if ( webpage_content.match( tinyogg_began_converting_notice_regexp ) )
		{
			var video_id = tinyogg_began_converting_notice_regexp.exec( webpage_content )[1];
			document.location.href = 'http://www.tinyogg.com/watch/' + video_id + '/';
		}
	}
}
else if ( current_address.match( tinyogg_watch_video_address_regexp ) )
{
	if ( AUTOMATIC_WATCH_PAGE_REFRESHING_ENABLED == true )
	{
		var webpage_content = document.body.innerHTML;
		if ( webpage_content.match( tinyogg_still_converting_notice_regexp ) )
		{
			setTimeout( 'document.location.reload()', ( REFRESHING_INTERVAL * 1000 ) );
		}
	}
}

