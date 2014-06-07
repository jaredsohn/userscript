// ==UserScript==
// @name           Team Forum Voodoo
// @description    Enhances the team forum pages to include data from team page
// @include        http://goallineblitz.com/game/forum_thread_list.pl?team_id=*
// @copyright      2009, MrVoodoo
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        a1
// ==/UserScript==
 
window.setTimeout( function() 
{
var header= document.getElementById('header');
if (header) {
    var logo = document.createElement('img');
	logo.src = 'http://img25.imageshack.us/img25/1443/teamheader.jpg';
    header.parentNode.insertBefore(newElement, header.nextSibling);
	}
}

// DO NOT EDIT THE FOLLOWING 

// Now let's remove the original menu bar
var rmenu = document.getElementsByClassName("content_header")[0];
	rmenu.parentNode.removeChild(rmenu);