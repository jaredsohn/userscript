// Dynix NoRefresh - Removes Refresh Timer from WTS Dynix (Horizon) catalog
// version 1.0
// 2008-09-26
// Copyright (c) 2008, Ted Carnahan
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Dynix NoRefresh", and click Uninstall.
//
// --
//
// ==UserScript==
// @name          Dynix NoRefresh
// @namespace     http://www.tedcarnahan.com/
// @description   Remove Refresh Timer from WTS Dynix (Horizon) catalog
// @include       http://library.dbq.edu*
// ==/UserScript==

document.body.setAttribute('onload', 'setfocus();');



