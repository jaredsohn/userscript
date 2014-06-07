/*
	Google Thumbnails
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
	select "Google Thumbnails", and click Uninstall.
	--------------------------------------------------------------------

	Changelog
	0.3.5 2007/10/10
		bug: fixed thumbnails for google's (slightly) altered markup
	0.3.4 2005/12/29
		bug: fixed links such that they always use the google result link (even if it's a passthru script)
		bug: hid the ugly black borders on the alexa images
	0.3.3 2005/11/24
		bug: fixed thumbnails for results inside of google's new inline recommendation blocks
		     (e.g.: http://www.google.com/search?q=kiesler) (reported by Nathan Freier)
		bug: fixed a few minor layout issues
	0.3.2 2005/10/28
		bug: google changed their source and broke the script again.  it's fixed and should continue to work if they switch back to 
		     yesterday's version
	0.3.1 2005/10/27
		bug: fixed to work with new (broken?) google source
	0.3   2005/10/02
		new: refactored to use XPath
	0.2.1 2005/08/08
		bug: fixed thumbnails when using google's search history (http://www.google.com/psearch)
		new: added use_amazon_thumbnails config option
	0.2   2005/08/03
 		new: results that link to an amazon product page now show the product image instead of the screen shot thumbnail
		bug: fixed thumbnail placement for non-html (PDF, PPT, etc.) results
	0.1   2005/07/18
		initial release
*/

// ==UserScript==
// @name          Google Thumbnails
// @version       0.3.5
// @namespace     http://flet.ch/things/greasemonkey/
// @description   Adds web site thumbnail images to google search results
// @include       http://www.google.*/search*
// ==/UserScript==

(function () {

	var gthumbnails = {

		config: {
			use_amazon_thumbnails: true, // use amazon product images in place of screen shots for amazon.com results?
			debug: true,                // print debug output to the javascript console
		},

		result_link_xpath: "//*[(name() = 'DIV' and @class='g') or (name() = 'H3' and @class='sem')]/H2/A",

		amazon_regex: /^http:\/\/(?:www\.)?amazon\.(?:com|(?:co.)?[a-z]{2})\/exec\/obidos\/(?:tg\/detail\/-|ASIN)\/(?:[a-z]+\/)?([a-zA-Z0-9]+)\/?.*$/i,
		result_link_regex: /^(?:([^\/].*)|\/url\?.*q=([^&]+)&?.*$)/i,

		addCSS: function( css ) {
			var head = window.document.getElementsByTagName( "head" )[0];
			var style = window.document.createElement( "style" );
			style.setAttribute( "type", "text/css" );
			style.innerHTML = css;
			head.appendChild( style );
		},

		addThumbnails: function() {
			var results = document.evaluate( this.result_link_xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );

			this.config.debug && ( t0 = new Date().getTime() );
			for( var result_link = null, i = 0; ( result_link = results.snapshotItem( i ) ); i++ ) {
				// create the thumbnail <IMG> and surrounding <A> elements
				var thumbnail = document.createElement( "span" );

				var result_url = result_link.getAttribute( "href" );
				var real_result_url = result_url.replace( this.result_link_regex, "$1$2" );
				var asin = result_url.match( this.amazon_regex ) && result_url.replace( this.amazon_regex, "$1" );

				if( this.config.use_amazon_thumbnails && asin ) {
					var is_amazon_link = true;
					var thumb_url = "http://images.amazon.com/images/P/" + asin + ".01._SS78_BO1,255,255,255_BO1,170,170,170_BO61,255,255,255_CR46,61,112,82_.jpg";
				} else {
					var is_amazon_link = false;
					var thumb_url = "http://open.thumbshots.org/image.pxf?url=" + real_result_url;
				}

				thumbnail.innerHTML = 
					'<a href="' + result_url + '">' +
						'<img src="' + thumb_url + '" align="left"  height="80" width="110" class="gms_gthumbnail' + ( is_amazon_link ? "_amazon" : "" )  + '" style="background: url(http://pthumbnails.alexa.com/image_server.cgi?size=small&url=' + real_result_url + ') no-repeat center;"/>' +
					'</a>';

				result_link.parentNode.insertBefore( thumbnail, result_link );
			}
			this.config.debug && ( t1 = new Date().getTime() );
			this.config.debug && ( GM_log( ( t1 - t0 ) / 1000 ) );
		}
	}

	gthumbnails.addCSS( ".g, hr, p { clear: left; }" );
	gthumbnails.addCSS( ".gms_gthumbnail { border: 1px solid #AAA; }" );
	gthumbnails.addCSS( ".gms_gthumbnail, .gms_gthumbnail_amazon { margin: 0 6px 8px 0; width: 106px; height: 78px;  }" );
	gthumbnails.addCSS( ".gms_gthumbnail_amazon { border-width: 0; }" );

	gthumbnails.addThumbnails();

})();
