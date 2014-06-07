/*
	Anonib Image links
	Copyright (c) 2009, Robert Jacobson <teridon@pobox.com>
	Released under the GPL license
	http://www.gnu.org/copyleft/gpl.html

	--------------------------------------------------------------------
	This is a Greasemonkey user script.

	To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
	Then restart Firefox and revisit this script.
	Under Tools, there will be a new menu item to "Install User Script".
	Accept the default configuration and install.

	To uninstall, go to Tools/Manage User Scripts,
	select "Anonib Image links", and click Uninstall.
	--------------------------------------------------------------------
	
	Changelog

	0.1    2008/12/26  initial release
	0.2    2009/08/27  Update for new anonib
*/

// ==UserScript==
// @name          Anonib Image links
// @version       0.2
// @namespace     http://mysite.verizon.net/teridon
// @description   Strips anonib image links to the actual images instead of the anonib image viewer
// @include       http://anonib.com/*
// @include       http://www.anonib.com/*
// ==/UserScript==



(function () {

	var anonib_image_links = {

		config: {
			fix_link_target: true,       // make links open in the current window
			strip_passthru_script: true, // make links direct (instead of passing through the image viewer script)
		},

		passthru_script_regex: /^http:\/\/(www\.)?anonib\.com.*imagePassn=([^&]+)/i,

		// link_container_xpath: "//table[@class='nilink']/descendant::tr/td[position() = 1]/a",
		link_container_xpath: "//a[@href]",
// 		link_container_xpath2: "//span[@class='headline']/a",

		fixLinks: function() {
			var links = document.evaluate( this.link_container_xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
// 			GM_log("links length: " + links.length);
			for( var link = null, i = 0; ( link = links.snapshotItem( i ) ); i++ ) {
//				GM_log("href is " + link.getAttribute( "href" ));
//				GM_log("replacement is " + link.getAttribute( "href" ).replace( this.passthru_script_regex, "$2" ) );
				this.config.fix_link_target       && link.setAttribute( "target", "" );
				this.config.strip_passthru_script && link.setAttribute( "href", 'http://anonib.com/' + unescape( link.getAttribute( "href" ).replace( this.passthru_script_regex, "$2" ) ) );
				this.config.strip_passthru_script && link.setAttribute( "onmouseover", "" );
				this.config.strip_passthru_script && link.setAttribute( "onmouseout", "" );
			}
		},
	}

	
	anonib_image_links.fixLinks();

})();
