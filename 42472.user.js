/* MySpace - More Profile Links
 * Version 0.1, 2009-02-15
 * By Daniel15 - http://d15.biz/
 *
 * This will add some more items (currently "View Friends" and "View Comments")
 * to the dropdown list on the menubar at the top of a MySpace profile. It works
 * with Firefox (Greasemonkey) and Opera User Javascript.
 */

// ==UserScript==
// @name           MySpace - More Profile Links
// @namespace      http://stuff.d15.biz/userjs/
// @description    Add more links to the user dropdown at the top of a MySpace profile.
// @include        http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&friendid=*
// @include        http://www.myspace.com/*
// ==/UserScript==

var first_item; 	// The item that was originally first in the dropdown menu
var menu; 			// The LI we're adding to
var submenu; 		// The dropdown contained in this LI

// Helper function to add a menu item
// TODO: Make this not use a global variable (first_item, submenu)?
function add_item(name, url)
{
	var menu_link = document.createElement('a');
	menu_link.innerHTML = name;
	// Replace {ID} with their ID in the URL
	menu_link.href = url.replace('{ID}', unsafeWindow.MySpace.ClientContext.DisplayFriendId);
	
	var menu_item = document.createElement('li');
	menu_item.appendChild(menu_link);
	// Add it before the original first item
	submenu.insertBefore(menu_item, first_item);
}

// If we're running on Opera, it doesn't have "unsafeWindow" (used to get the friendID)
if (window.opera)
	unsafeWindow = window;

// Try to get the dropdown menu. If we can't find it, we're not on a profile
menu = document.getElementById('nav2500000');
if (menu)
{
	// Try to get the dropdown menu (Profile 2.0)
	submenu = menu.getElementsByTagName('ul')[0];
	// If we couldn't find it, we're on profile 1.0. Eww :(
	// Seriously profile 1.0 needs to die already
	if (!submenu)
		submenu = document.getElementById('subNav2500000');
	
	// Save a reference to the original first item
	first_item = submenu.firstChild;
	
	// And now our items
	add_item('Comments', 'http://comment.myspace.com/index.cfm?fuseaction=user.viewComments&friendID={ID}');
	add_item('Friends', 'http://friends.myspace.com/index.cfm?fuseaction=user.viewfriends&friendID={ID}');

	// Put a divider under the bottom item.
	first_item.previousSibling.className = 'divider';
}