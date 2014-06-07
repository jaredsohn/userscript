// Learns u sum gramar
// c r e a t e d   b y   the eNeME
// 3/29/2009
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Learns u sum gramar", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Learns u sum gramar
// @namespace      http://www.bungie.net/Forums/posts.aspx?postID=27428424
// @description    Changes "join this group" to "Join this group." on the main page of all groups on Bungie.net and fixes a grammatical error on the "you have no friends" page.
// @include        *.bungie.net/Fanclub*
// @include        *.bungie.net/Stats/LiveFriends.aspx
// ==/UserScript== 

document.getElementById('ctl00_MainContentArea_membershipLink').innerHTML = "Join this group.";
document.body.replace(/Were sorry, no friends were/,"We're sorry, no friends were");

/*
Or... join THIS group instead:
http://www.bungie.net/fanclub/dirty/Group/GroupHome.aspx

p.s. Due to the incessecent bitching of YahwehFreak4evr, I wrote this script. (Look, Yahweh! Attention! Bask in it.) 

Now stop whining.
*/

//		  GTFO
//		d[(**)]T
//     MAI SCRIPT