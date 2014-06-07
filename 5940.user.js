/*
	Digg Lite
	Copyright (c) 2007, Rick Fletcher <fletch@pobox.com>
	Released under the GPL license
	http://www.gnu.org/copyleft/gpl.html

	--------------------------------------------------------------------
	This is a Greasemonkey user script.

	To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
	Then restart Firefox and revisit this script.
	Under Tools, there will be a new menu item to "Install User Script".
	Accept the default configuration and install.

	To uninstall, go to Tools/Manage User Scripts,
	select "Digg Lite", and click Uninstall.
	--------------------------------------------------------------------
	
	Changelog
	0.3.1  2007/10/10
		 - the right column on the new digg profile pages (digg.com/users/*) are 
		   no longer hidden (thanks MegatronIsAwesom at userscripts)
	0.3    2007/08/28
		 - tweaked for digg redesign
	0.2    2006/12/18
		 - tweaked for digg redesign
	0.1.1  2006/10/13
		 - made the config options actually do something
		 - added config.hide_banner
	0.1    2006/09/24
		 - initial release
*/

// ==UserScript==
// @name           Digg Lite
// @version        0.3.1
// @namespace      http://flet.ch/greasemonkey/
// @description    Intended for those who never leave the "All Links" section of digg, this script removes the left column
//                 and narrows the overall page width
// @include        http://*.digg.com/*
// @include        http://digg.com/*
// ==/UserScript==

(function () {

	digglite = {
		/**
		 * add a CSS rule to the current page
		 *
		 * @param string the CSS rule to add
		 */
		config: {
			hide_right_column: true,
			hide_footer: true
		},

		/**
		 * add a CSS rule to the current page
		 *
		 * @param string the CSS rule to add
		 */
		addCSS: function( css ) {
			var head = window.document.getElementsByTagName( "head" )[0];
			var style = window.document.createElement( "style" );
			style.setAttribute( "type", "text/css" );
			style.innerHTML = css;
			head.appendChild( style );
		},

		/**
		 *
		 */
		init: function() {
			// hide the page footer
			if( this.config.hide_footer ) {
				this.addCSS( "#footer { display: none; }" );
				this.addCSS( "#contents { padding-bottom: 0; }" );
			}

			// hide the left column
			if( this.config.hide_right_column && ! document.location.pathname.match( /^\/users\// ) ) {
				// hide the sidebar
				this.addCSS( ".sidebar { display: none; }" );
				this.addCSS( ".main { margin-right: 0; }" );
				this.addCSS( "#wrapper { margin-right: 4px; }" );

				// make comments take up the whole width
				this.addCSS( ".comment { margin-right: 0; }" );
			}
		}
	};

	digglite.init();

}) ()