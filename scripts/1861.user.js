/*
	Fark Lite
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
	select "Fark Lite", and click Uninstall.
	--------------------------------------------------------------------
	
	Changelog

	0.2.3  2007/10/10
		bugs: updated for latest fark design (with thanks teridon at userscripts)
	0.2.2  2005/10/08
		bug: no longer hiding the "view voting results" link on the comments page
	0.2.1  2005/10/03
		bug: updated to work with updated fark.com source
	0.2    2005/10/02
		new: refactored to use XPath
	0.1    2005/07/20
		initial release
*/

// ==UserScript==
// @name          Fark Lite
// @version       0.2.3
// @namespace     http://flet.ch/things/greasemonkey/
// @description   Strips fark.com down to just the links.  Hides links from categories you don't want to see.
// @include       http://*.fark.com/*
// @include       http://fark.com/*
// ==/UserScript==

(function () {

	var farklite = {

		config: {
			hide_side_columns: true,     // remove the columns on either side of the page
			fix_link_target: true,       // make links open in the current window
			strip_passthru_script: true, // make links direct (instead of passing through the go.fark.com script)
			unwanted_categories:         // links that are in these categories will be removed
				[ "weeners", "satire", "video edit" ],
		},

		fark_passthru_script_regex: /^http:\/\/go\.fark\.com.*l=([^&]+)/i,

		link_container_xpath: "//tr[@class='headlineRow']/td[position() = 1]/a",

		addCSS: function( css ) {
			var head = window.document.getElementsByTagName( "head" )[0];
			var style = window.document.createElement( "style" );
			style.setAttribute( "type", "text/css" );
			style.innerHTML = css;
			head.appendChild( style );
		},

		fixLinks: function() {
			var links = document.evaluate( this.link_container_xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
			for( var link = null, i = 0; ( link = links.snapshotItem( i ) ); i++ ) {
				this.config.fix_link_target       && link.setAttribute( "target", "" );
				this.config.strip_passthru_script && link.setAttribute( "href", unescape( link.getAttribute( "href" ).replace( this.fark_passthru_script_regex, "$1" ) ) );
				this.config.strip_passthru_script && link.setAttribute( "onmouseover", "" );
				this.config.strip_passthru_script && link.setAttribute( "onmouseout", "" );
			}
		},

		removeUnwanted: function() {
			for( var i = 0; i < this.config.unwanted_categories.length; i++ ) {
				this.config.unwanted_categories[i] = this.config.unwanted_categories[i].toLowerCase().replace( /[^a-z]/, "" );
			}

			var link_category_xpath = "//tr[@class='headlineRow']/descendant::img[translate(@alt,'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz')='" + this.config.unwanted_categories.join( "' or translate(@alt,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='" ) + "']/parent::*";
			var links = document.evaluate( link_category_xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
			for( var link = null, i = 0; ( link = links.snapshotItem( i ) ); i++ ) {
				link.parentNode.parentNode.removeChild( link.parentNode );
			}
		},
	}

//	farklite.addCSS( "td.howto, form div.howto:first-child, .banhead div, div.footnote { display: none; }" );

	farklite.config.hide_side_columns && farklite.addCSS( "#bodyRightSideContainer { display: none; }" );
	farklite.config.hide_side_columns && farklite.addCSS( "#bodyHeadlineContainer { margin-right: 0; }" );
	
	farklite.removeUnwanted();
	farklite.fixLinks();

})();