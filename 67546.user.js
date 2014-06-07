// Fastcase Search Redirect
// Version 0.2.1 2010-01-29
// Copyright (c) 2010 by Andrew S. <attorneytech@gmail.com>
// Released under the GPL General Public License, available at:
// http://www.gnu.org/licenses/gpl.html
//
// LICENSE SUMMARY:
// This script is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This script is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for complete details.
// 
// This summary description of the license is provided for your benefit only.
// The actual terms of the license are found in the GNU General Public License
// avaliable at: <http://www.gnu.org/licenses/>.
//
// ------------------------------------------------------------------------------
// LEGAL DISCLAIMER: Fastcase® and the related logos are trademarks of Fastcase,
// Inc. The names and logos are used merely to identify the service with which
// this script works. This script is NOT sponsored, endorsed, authorized,
// provided by, or associated with Fastcase® or Fastcase, Inc.
//
// ------------------------------------------------------------------------------
//
// --------------------------------------------------------------------
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.8 or later: http://www.greasespot.net/
// --------------------------------------------------------------------
//
// ==UserScript==

// @name           Fastcase Search Redirect
// @namespace      http://www.attorneytech.net/gmscripts
// @version        0.2.1
// @description    Redirects searches conducted using Fastcase's OpenSearch plugin for Firefox (available here: ****** ) so that the results can be opened and viewed when logged in via a state bar account. You must FIRST login to Fastcase through your state bar login.
// @copyright      2010, Andrew S. (http://www.attorneytech.net/gmscripts/)
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @include        http://apps.fastcase.com/Store/Pages/Store.aspx*
// @include        https://apps.fastcase.com/Store/Pages/Store.aspx*
//
// @uso:script     scriptid
// @uso:version    versionid
// @uso:timestamp  timestamp
// @uso:hash       hash

// ==/UserScript==

var url, re, re2;
url = window.location.href;
var re = new RegExp('apps.fastcase.com/Store/Pages/Store.aspx','gi');
var re2 = 'apps.fastcase.com/Research/Pages/Results.aspx';
url = url.replace(re, re2);
// avoid infinite loop
if (window.location.href != url) {
    window.location.href = url;
}


/* Change Log

0.2.1 - 2010-01-29 - changed namespace, updated license, added legal disclaimer, and prepared for publication

*/