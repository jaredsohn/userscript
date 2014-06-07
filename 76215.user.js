// ==UserScript==
// @name        Growl Now Playing in Pandora for Fluid
// @namespace   http://fluidapp.com
// @description Fluid userscript to growl song information on song change, and add "Now Playing" dock menu item to growl current song
// @include     http://www.pandora.com/*
// @author      Jim Auldridge
// ==/UserScript==

/**
 * GrowlNowPlayinginPandoraforFluid.user.js
 * Copyright (c) 2010, Jim Auldridge
 * Licensed uner the MIT License http://jaaulde.com/license/MIT
 *
 * Last eror free JSLint: 20100507 15:51
 *                        Checked Options: Assume a browser,
 *                                         Allow one var statement per function
 *                                         Disallow undefined variables
 *                                         Disallow dangling _ in identifiers
 *                                         Disallow == and !=
 *                                         Disallow ++ and --
 *                                         Disallow bitwise operators
 *                                         Disallow insecure . and [^...] in /RegExp/
 *                                         Require Initial Caps for constructors 
 *                                         Require parens around immediate invocations
 *                        Predefined: window
 */

( function( global )
{
	"use strict";

	if( global.fluid && global.Pandora )
	{
		( function( f, P )
		{
			var growlSongData, lastReceivedSongData = null;

			growlSongData = function( data )
			{
				var growlOptions;
				if( typeof data.songName === 'string' )
				{
					growlOptions = {
						title: 'Now Playing',
						description: data.songName,
						sticky: false,
						identifier: 'Pandora',
						icon: f.applicationPath + 'icon',
						onclick: function()
						{
							f.unhide();
							f.activate();
						}
					};

					if( typeof data.artistName === 'string' )
					{
						growlOptions.description += '\nby ' + data.artistName;
					}

					if( typeof data.artURL === 'string' )
					{
						growlOptions.icon = data.artURL;
					}

					f.showGrowlNotification( growlOptions );
				}
			};

			P.setEventHandler( 'SongPlayed', function( data )
			{
				lastReceivedSongData = data;
				growlSongData( data );
			} );

			f.addDockMenuItem( 'Now playing...', function()
			{
				if( lastReceivedSongData !== null  )
				{
					growlSongData( lastReceivedSongData );
				}
			} );
		}( global.fluid, global.Pandora ) );
	}
}( window ) );