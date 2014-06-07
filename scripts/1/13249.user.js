// Disable download wait user script
// version 0.1 BETA!
// 2007-08-24
// Copyright (c) 2005, Mark Pilgrim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// To uninstall, go to Tools/Manage User Scripts,
// select "Disable Bleach Wait Time", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Disable Bleach Wait Time
// @description   Disables the wait time on the bleach exile.
// @include       http://www.bleachexile.com/members/downloads/*
// ==/UserScript==

document.getElementById('download_input').innerHTML = '<form name="downloadForm" id="downloadForm" method="post" action"/members/download.php"><input type="hidden" name="www_form_submit" value="1" /><input type="submit" name"submit" id="submitDownload" onclick="disableDownload()" value="Download Now" /> <span style="display: none;" id="enjoy"><em>Who has time to wait? Hacked by J&oelig;</em></span></form>';

