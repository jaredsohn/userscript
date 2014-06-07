// Uscript2
// Version 2.1
// Feb 14, 2014
//
// Copyright (c) 2011 USA, Lone Hood (TM)
// Released under the GNU General Public License, version 3 (GPL-3.0)
// https://gnu.org/licenses/gpl-3.0.txt
//
// --------------------------------------------------------------------
//
// Changes in this version:
//
// Added shortcut to get to "your scripts"
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Uscript2", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name         Uscript2
// @namespace    Doyousketch2
// @description  dimmer Userscripts page
//
// @grant  GM_info
// @grant  GM_getValue
// @grant  GM_setValue
// @grant  GM_xmlhttpRequest
// @grant  GM_registerMenuCommand
//
// @include  *userscripts.org*
// @require  http://sizzlemctwizzle.com/109379.js
// @require  http://code.jquery.com/jquery-1.6.2.min.js
//
// ==/UserScript==
// Add an easy shortcut to get to your scripts
$('ul.login_status li:last') .clone() .insertBefore('ul.login_status li:first');
$('ul.login_status li:first a') .attr('href', '/home/scripts') .text('Your Scripts');
//Dim background
$('body') .css('background', 'none repeat scroll 0 0 #888888');
$('div#content pre#source') .css('background', 'none repeat scroll 0 0 #DDDDDD');
//Black fonts
$('div#content h1') .css('color', '#000000');
$('div#content form p label') .css('color', '#000000');
$('body#site-home.site') .css('color', '#000000');
$('body#scripts-index.scripts') .css('color', '#000000');
$('body#forums-index.forums') .css('color', '#000000');
$('div#content p.subtitle') .css('color', '#000000');
$('body#groups-index.groups') .css('color', '#000000');
//Dim tables
$('div#right') .css('background', 'none repeat scroll 0 0 #BBBBBB');
$('td.inv') .css('background', 'none repeat scroll 0 0 #BBBBBB');
//Dim box
$('div#uso') .css('background', 'none repeat scroll 0 0 #3333EE');
$('div#uso h2') .css('color', '#FFFFFF');
$('div#uso ul li') .css('background', 'none repeat scroll 0 0 #FF8800');
//Remove "Delete" link
$('div#script_sidebar ul li') .filter(':first') .remove();
$('div#fans p.favorite a.remove') .remove();
