// ==UserScript==
// @name            Worse Than Failure Comments Expand Full Text
// @version     	1.1
// @author          Tom McCaffery
// @description     Automatically expands full text of an article from the first comments page, reviving the "old" way of browsing TheDailyWTF: an article with comments below.
// @include         http://worsethanfailure.com/Comments/*
// @include         http://www.worsethanfailure.com/Comments/*
// ==/UserScript==

/*
 * This file is a Greasemonkey user script. To install it, you need
 * the Firefox plugin "Greasemonkey" (URL: http://greasemonkey.mozdev.org/)
 * After you installed the extension, restart Firefox and revisit
 * this script. Now you will see a new menu item "Install User Script"
 * in your tools menu.
 *
 * To uninstall this script, go to your "Tools" menu and select
 * "Manage User Scripts", then select this script from the list
 * and click uninstall :-)
 *
 	Version History
	 -1.1 Updated domain and script name to reflect site's name change (you can uninstall the existing script if you have 1.0)
	 -1.0 Initial release
*/


// only expand comments on the first page
if (window.location.href.match(/pg=/) == null) {
	document.getElementById('ArticleFull').style.display='block';
	document.getElementById('ArticleSummary').style.display='none';
}