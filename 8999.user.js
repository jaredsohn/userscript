// ImageReverb Direct Image
// version 0.1 BETA!
// 2007-05-02
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ----------------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "UserCash Link Remover", and click Uninstall.
//
// ----------------------------------------------------------------------------
//
// ==UserScript==
// @name          ImageReverb Direct Image
// @namespace     http://hottamateurs.blogspot.com
// @include       *imagereverb.com/adult/showimage.php*
// @include	  *imagereverb.com/general/showimage.php*
// @exclude       
// ==/UserScript==

match_image  = new RegExp('/images/mid');

links = document.getElementsByTagName('img');

for (var i = 0; i < 50; i++) {
    link = links[i];
    check = match_image.exec(link.src);
    if (check) {
     location.href = link.src;;
    }
}