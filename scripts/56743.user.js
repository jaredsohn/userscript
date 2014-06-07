// ==UserScript==
// @name			Automatically Add The 'site:DOMAIN' Tag To Delicious Bookmarks
// @author			Erik Vold
// @namespace		deliciousAutoAddSiteTag
// @include			http*://delicious.com/save
// @include			http*://delicious.com/save#*
// @include			http*://delicious.com/save?*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-08-31
// @lastupdated		2009-08-31
// @description		This userscript automatically adds the 'site:DOMAIN' tag to delicious bookmarks
// ==/UserScript==

var deliciousAutoAddSiteTag = {};
deliciousAutoAddSiteTag.setup = function() {
	var urlInput = document.getElementById( 'url' );
	if(!urlInput) return false;

	var tagsInput = document.getElementById( 'tags' );
	if(!tagsInput) return false;

	var domain = ( /^https?:\/\/([^\/]*)/i ).exec( urlInput.value );
	if(!domain) return false;
	else domain = domain[1];

	// remove leading www's
	domain = domain.replace( /^www\./i, "" );

	var newTag = "site:"+domain;
	if( tagsInput.value.match( newTag )  ) {
		return true;
	}
	else if ( tagsInput.value.length == 0 || tagsInput.value.match( / $/ ) ) {
		tagsInput.value += newTag+" ";
	}
	else {
		tagsInput.value += " "+newTag+" ";
	}
	return true;
};
deliciousAutoAddSiteTag.setup();
