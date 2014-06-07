// Vox Homepage Reorder Script
// version 0.1
// 2008-03-19
// Copyright (c) 2008, Ross Goldberg
// Please direct comments/questions to rossruns@gmail.com
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// IF YOU ARE UPGRADING FROM A PREVIOUS VERSION OF VOX HOMEPAGE REORDER 
// SCRIPT, go to Tools/Manage User Scripts and manually uninstall the 
// previous version before installing this one.  Sorry, this is a limitation
// of Greasemonkey.
// 
// To uninstall, go to Tools/Manage User Scripts,
// select "Vox Homepage Reorder Script", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
//
// Reorders the modules on the vox homepage (http://www.vox.com) when
// you are logged in.  The order of the modules is:
//
// Left column:
//   1) Posts
//   2) Comments
//   3) Neighbor Activity
//   4) [This is Good] Explore Box
//   5) Vox MSN Advertisement
//
// Right column:
//   1) QotD
//   2) Vox Hunt
//   3) Team Vox News
//   4) Tips Box 
//   5) Themes Box
//   6) Advertisement
//   7) Find your friends box
//
//
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Vox Homepage Reorder Script
// @namespace       http://rossotron.com/public/gm/collapser/
// @description     Reorders the modules on the vox homepage (http://www.vox.com) to include the most popular ones "above the fold"
// @include         http://www.vox.com/
// ==/UserScript==


// Find the various div blocks for the modules to be moved
var post_module, comment_module, qotd_module, voxhunt_module;
var post_module_list, comment_module_list, qotd_module_list, voxhunt_module_list;
var team_vox_module, tips_module, themes_module;
var team_vox_module_list, tips_module_list, themes_module_list;
var explore_module, ad_module1, ad_module2,  friends_module;
var explore_module_list, ad_module1_list, ad_module2_list, friends_module_list;

post_module_list = document.evaluate(
	"//div[@class='recent-posts pkg round-box blue-box']",
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

post_module = post_module_list.snapshotItem(0);


comment_module_list = document.evaluate(
	"//div[@class='recent-comments pkg round-box blue-box']",
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

comment_module = comment_module_list.snapshotItem(0);


explore_module_list = document.evaluate(
	"//div[@class='editorial round-box blue-box pkg']",
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

explore_module = explore_module_list.snapshotItem(0);


qotd_module_list = document.evaluate(
	"//div[@class='qotd']",
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

qotd_module = qotd_module_list.snapshotItem(0);


voxhunt_module_list = document.evaluate(
	"//div[@class='vox-hunt pkg']",
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

voxhunt_module = voxhunt_module_list.snapshotItem(0);


team_vox_module_list = document.evaluate(
	"//div[@class='news pkg']",
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

team_vox_module = team_vox_module_list.snapshotItem(0);


tips_module_list = document.evaluate(
	"//div[@class='tips round-box pkg']",
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

tips_module = tips_module_list.snapshotItem(0);


themes_module_list = document.evaluate(
	"//div[@class='featured-themes round-box set-box-height']",
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

themes_module = themes_module_list.snapshotItem(0);


ad_module1_list = document.evaluate(
	"//div[@class='advertisement']",
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

ad_module1 = ad_module1_list.snapshotItem(0);


ad_module2_list = document.evaluate(
	"//div[@class='msn-sponsored-feed round-box set-box-height']",
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

ad_module2 = ad_module2_list.snapshotItem(0);


friends_module_list = document.evaluate(
	"//div[@class='find-friends round-box']",
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

friends_module = friends_module_list.snapshotItem(0);


// Reorder the items

// Insert posts before comments
comment_module.parentNode.insertBefore(post_module, comment_module);

// Insert MSN Advertisement (left side) after TIG module
explore_module.parentNode.insertBefore(ad_module2, explore_module.nextSibling);

// Insert QotD at top (before friends module)
friends_module.parentNode.insertBefore(qotd_module, friends_module);

// Insert Vox Hunt after QotD
qotd_module.parentNode.insertBefore(voxhunt_module, qotd_module.nextSibling);

// Insert Team Vox News after Vox Hunt
voxhunt_module.parentNode.insertBefore(team_vox_module, voxhunt_module.nextSibling);

// Insert Tips after Team Vox News
team_vox_module.parentNode.insertBefore(tips_module, team_vox_module.nextSibling);

// Insert Themes after Tips
tips_module.parentNode.insertBefore(themes_module, tips_module.nextSibling);

// Insert Advertisement (Right side) after Themes
themes_module.parentNode.insertBefore(ad_module, themes_module.nextSibling);

// Insert Friends after Advertisement
ad_module1.parentNode.insertBefore(friends_module, ad_module1.nextSibling);

/*
TODO:
- Get QotD from the various explore pages and post on homepage?

0.1 - 2008-03-19 - Initial release
*/

// END FILE	