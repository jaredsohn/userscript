// Auto-switch to Medium in Google Analytics' All Traffic Sources report.
// version 1.0
// 2010-11-11
// Copyright (c) 2010, Axel Queffeulou
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey-style user script.
//
// To install with Firefox, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Regions everywhere in Google Analytics", and click Uninstall.
//
// --------------------------------------------------------------------
//
// With Google Chrome and Chromium, you can install without any add-on.
// More info : http://www.chromium.org/developers/design-documents/user-scripts
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Auto-switch to Medium in Google Analytics' All Traffic Sources report.
// @description   Aren't you bored with always switching to View Medium when you load All Traffic Sources report ? Stop doing that by installing this userscript. :)
// @include       https://www.google.com/analytics/reporting/all_sources*
// ==/UserScript==

setTimeout('analytics.PropertyManager._getInstance()._broadcastChange("slice_by","medium")',200);