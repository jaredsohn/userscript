// ==UserScript==
// @name           SectaChan Link Bucks Remover
// @namespace      http://cchs.x10hosting.com
// @description    Removes Link Bucks Links From SectaChan
// @include        *sectachan.org*
// ==/UserScript==
//Author: Frosty Fox <df0xyd@yahoo.com>
(function () 
{
	var SectaChan = {
		config: {
			fix_link_target: true,       // make links open in the current window
			strip_passthru_script: true, // make links direct (instead of passing through the image viewer script)
		},
		passthru_script_regex: /^.*l\/(.*)/i,
		link_container_xpath: "//a[@href]",
		fixLinks: function() {
			var links = document.evaluate( this.link_container_xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
			for( var link = null, i = 0; ( link = links.snapshotItem( i ) ); i++ ) {
				this.config.fix_link_target       && link.setAttribute( "target", "" );
				this.config.strip_passthru_script && link.setAttribute( "href", unescape( link.getAttribute( "href" ).replace( this.passthru_script_regex, "$1" ) ) );
				this.config.strip_passthru_script && link.setAttribute( "onmouseover", "" );
				this.config.strip_passthru_script && link.setAttribute( "onmouseout", "" );
			}
		},
	}
	SectaChan.fixLinks();
})
();
//Special Thanks: Robert Jacobson <teridon@pobox.com>
//I used his Anonib Image Links as a Template!