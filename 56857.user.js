// ==UserScript==
// @name			OpenDNS Create New Shortcut Fix
// @author			Erik Vold
// @namespace		openDNSCreateNewShortcutForFix
// @include			http://guide.opendns.com/controller.php?url=*
// @include			http://guide.opendns.com/controller.php?*&url=*
// @include			https://guide.opendns.com/controller.php?url=*
// @include			https://guide.opendns.com/controller.php?*&url=*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-09-02
// @lastupdated		2009-09-02
// @description		This userscript is for the 'Create shortcut for' link, which is displayed when you provide a url that is not a url, and is not already a shortcut. The userscript will correct the link so that it auto populates the shortcut field which is displayed upon click.
// ==/UserScript==


var openDNSCreateNewShortcutForFix = {};
openDNSCreateNewShortcutForFix.setup = function() {
	var toggleLink = document.getElementById( 'toggle-shortcuts' );
	if( !toggleLink ) return false;

	var shortcutFld = document.getElementById( 's_label' );
	if( !shortcutFld ) return false;

	var tag = toggleLink.getElementsByTagName( 'b' );
	if(!tag) return false;
	tag = tag[0].innerHTML.replace( /\.{3}$/, "" );

	toggleLink.addEventListener( "click", function(){
		if( shortcutFld.value.length == 0 ) {
			shortcutFld.value = tag;
		}
		return;
	}, false );
	return true;
};

window.addEventListener( "load", openDNSCreateNewShortcutForFix.setup, false );
