
// DumbQuotes
// version 0.4 BETA!
// 2005-07-08
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script that converts "smart" quotes,
// curly apostrophes, and other fancy typographical symbols to their
// plain ASCII equivalents.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "DumbQuotes", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          DumbQuotes
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   straighten curly quotes and apostrophes, simplify fancy dashes, etc.
// @include       *
// @exclude        https://www.google.com/accounts/ServiceLogin?service=mail*
// @exclude        http://www.google.com/accounts/ServiceLogin?service=mail*
// @exclude        https://mail.google.com/*
// ==/UserScript==
//
// --------------------------------------------------------------------
//
// This script is dedicated to Cory Doctorow, who will know why.
//

/* BEGIN LICENSE BLOCK
Copyright (C) 2005 Mark Pilgrim

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://diveintomark.org/projects/greasemonkey/COPYING
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK */

(function() {
    var replacements, regex, key, textnodes, node, i, s;

    replacements = {
        "\xa0": " ",
        "\xa9": "(c)",
        "\xae": "(r)",
        "\xb7": "*",
        "\u2018": "'",
        "\u2019": "'",
        "\u201c": '"',
        "\u201d": '"',
        "\u2026": "...",
        "\u2002": " ",
        "\u2003": " ",
        "\u2009": " ",
        "\u2013": "-",
        "\u2014": "--",
        "\u2122": "(tm)"};
    regex = {};
    for (key in replacements) {
        regex[key] = new RegExp(key, 'g');
    }

    textnodes = document.evaluate(
        "//body//text()",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    for (i = 0; i < textnodes.snapshotLength; i += 1) {
        node = textnodes.snapshotItem(i);
        s = node.data;
        for (key in replacements) {
            s = s.replace(regex[key], replacements[key]);
        }
        node.data = s;
    }
})();

//
// ChangeLog
// 2005-07-08 - 0.4 - MAP - added license block
// 2005-04-21 - 0.3 - MAP - linted
// 2005-04-18 - 0.2 - MAP - tidy code
//
