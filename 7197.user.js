// Alluc Cartoon Episode list
// version 1
// 2007-01-23
// Copyright (c) 2006, Russell Small
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
// select "Alluc Episode list", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name          Alluc Cartoon Episode list
// @namespace     http://users.aber.ac.uk/ris6/greasemonkey/
// @description   Opens a new tap with a list of episodes form Wikipedia for the site alluc.org
// @include       http://www.alluc.org/alluc/cartoons.html?action=getviewcategory&category_uid=*
// @exclude	  http://www.alluc.org/alluc/
// ==/UserScript==

if (window.location.href == 'http://www.alluc.org/alluc/cartoons.html?action=getviewcategory&category_uid=354')
{
GM_openInTab('http://en.wikipedia.org/wiki/List_of_Family_Guy_episodes');
}
if (window.location.href == 'http://www.alluc.org/alluc/cartoons.html?action=getviewcategory&category_uid=456')
{
GM_openInTab('http://en.wikipedia.org/wiki/List_of_The_Simpsons_episodes');
}
if (window.location.href == 'http://www.alluc.org/alluc/cartoons.html?action=getviewcategory&category_uid=274')
{
GM_openInTab('http://en.wikipedia.org/wiki/List_of_American_Dad_episodes')
}
if (window.location.href == 'http://www.alluc.org/alluc/cartoons.html?action=getviewcategory&category_uid=1806')
{
GM_openInTab('http://en.wikipedia.org/wiki/List_of_AAAHH%21%21%21_Real_Monsters_episodes')
}
if (window.location.href == 'http://www.alluc.org/alluc/cartoons.html?action=getviewcategory&category_uid=278')
{
GM_openInTab('http://en.wikipedia.org/wiki/List_of_The_Angry_Beavers_episodes')
}
if (window.location.href == 'http://www.alluc.org/alluc/cartoons.html?action=getviewcategory&category_uid=281')
{
GM_openInTab('http://en.wikipedia.org/wiki/List_of_Aqua_Teen_Hunger_Force_episodes')
}
if (window.location.href == 'http://www.alluc.org/alluc/cartoons.html?action=getviewcategory&category_uid=285')
{
GM_openInTab('http://en.wikipedia.org/wiki/List_of_Batman_Beyond_episodes')
}
