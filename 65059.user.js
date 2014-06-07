// HotKey URL
// version 0.0.1 ALPHA
// 2009-12-27
// Copyright (c) 2009, Aleksey V. Zapparov AKA ixti
//
// "HotKey URL" is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// "HotKey URL" is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// http://www.gnu.org/licenses/gpl.txt
//
// -----------------------------------------------------------------------------
// 
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "HotKey URL", and click Uninstall.
//
// -----------------------------------------------------------------------------
//
// ==UserScript==
// @name           HotKey URL
// @namespace      http://www.ixti.ru/
// @description    Allow to bind <Alt+HotKey> to open URLs in new tab
// @include        *
// ==/UserScript==

(function(MAP, DEBUG_MODE){
    document.addEventListener('keypress', function(evt) {
        if ( ! evt.altKey) {
            return;
        }
        (function(code){
            if (DEBUG_MODE) { GM_log('evt.which: ' + evt.which); }
            if (MAP.hasOwnProperty(code)) { GM_openInTab(MAP[code]); }
        })(evt.which);
    }, true);
})({
    // 77 (Shift + m)
    77: 'https://mail.google.com/',
    // 82 (Shift + r)
    82: 'https://www.google.com/reader'
}, false);