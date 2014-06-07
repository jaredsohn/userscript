// ==UserScript==
// @name        DLSR/BBR Forum Highlight UInfo
// @namespace   http://www.dslreports.com
// @description Restores original UInfo highlighting on DSLR/BBR forums
// @include     http://dslreports.com/forum/r*
// @include     http://www.dslreports.com/forum/r*
// @include     http://broadbandreports.com/forum/r*
// @include     http://www.broadbandreports.com/forum/r*
// @author      Jim Auldridge (JAAulde)
// ==/UserScript==

/**
 * dslr-bbr-highlight-uinfo.user.js
 * Licensed uner the MIT License http://jaaulde.com/license/MIT
 *
 * Last eror free JSLint: 20101130 09:58
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

	var $ = global.jQuery;

	$( function()
	{
		$( 'span.yellow' )
			.removeClass( 'yellow' )
			.parents( 'td.uinfo' )
				.css( 'background-color', '#88ff88' );
	} );
}( window.wrappedJSObject ) );