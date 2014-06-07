// ==UserScript==
// @name            Worse Than Failure Comments Redirect
// @version     	1.1
// @author          Tom McCaffery
// @description     Redirects any visit to an article page right to the comments page. Combine this with my other script, Worse Than Failure Comments Expanded Full Text to restore the "old" way of reading articles, with the comments right below.
// @include         http://worsethanfailure.com/Articles/*
// @include         http://www.worsethanfailure.com/Articles/*
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
	 -1.0 Initial Release
*/

// find out if we're on the main articles page, redirect otherwise
if (!window.location.href.match(/Articles\/?$/)) {
	window.location = window.location.href.replace(/Articles/, 'Comments');
}