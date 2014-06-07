// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey:http://www.greasespot.net/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Greasemonkey/Manage User Scripts,
// select "DTA! - Photobucket - Grey edition", and click Uninstall.
//
// --------------------------------------------------------------------
//	
//	Small script to help downloading with DTA! on Photobucket.
//	
//	Created it after seeing posts about broken Photobucket DTA! script.
//	Guess I just needed something to waste my time at ;-)
//
//	Newbie and the script is not well tested so use it at our own risk ;-)
//	
//	Updated 2008-05-24: 
//		Photobucket.com hade made some changes to their layout that broke the script.
//	
//	Created 2008-04-04 by Andreas (grey) - andreas(changeThisToAt)greyscale(changeThisToADot)se
//	
//	Not the first one to create a script like this so credit to InsaneNinja and coderjoe for their scripts (and others that i likley have missed).
//	
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name				DTA! - Photobucket - Grey edition
// @namespace		http://www.greyscale.se/
// @description		Creates hidden links for DownloadThemAll! (marked as 'DTA_Link' in DTA!, so just create a filter) or replaces the photo-viewer with direct links on Photobucket.com
// @include			http://*photobucket.com/albums/*/*
// ==/UserScript==

(function()
{
	// ----- User setting -----
	const createHiddenLinks = true;	// Doesn't touch Photobuckets links, just adds a hidden like so that DTA! finds the images (Look for 'DTA_Link' in DTA!).
													// If set to false, all photo-viewer links will be replaced with direct links.	
	const openInNewWin = false;		// Change to false if the photo should be opened in the same tab/window. Is ignored if createHiddenLinks is true.
	
	// ----- Don't edit below yhis line if you don't lnow what your doing. Or at lease don't come crying if you do. You breake it, you bought it ;-) -----
	
	
	// xPath to thumbs.
	const xPathToThumbs = "//ul[@id='containerThumbnails']/li/div/div/a/img";
	var thumbCont = document.getElementById('containerThumbnails');
	var strFixUrl  = /\/th_/;
	
	var allThumbs = document.evaluate(
										xPathToThumbs, thumbCont, null,
										XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null
									);
	
	for (var i = 0; i < allThumbs.snapshotLength; i++) {
	
		if (createHiddenLinks) {
			var aHidden = document.createElement('a');
			
			aHidden.setAttribute('href', allThumbs.snapshotItem(i).src.replace(strFixUrl, '/') + "?DTA_Link");
			aHidden.setAttribute('style', 'display:none;' );
			aHidden.setAttribute('title', 'DTA_Link');
			
			allThumbs.snapshotItem(i).parentNode.parentNode.parentNode.appendChild(aHidden);
		} else {
			allThumbs.snapshotItem(i).parentNode.setAttribute('href', allThumbs.snapshotItem(i).src.replace(strFixUrl, '/')  + "?DTA_Link");
			allThumbs.snapshotItem(i).parentNode.setAttribute('title', 'DTA_Link');
			
			if (openInNewWin) 
				allThumbs.snapshotItem(i).parentNode.setAttribute('target', '_blank');
		}
	}
}());
// EOF