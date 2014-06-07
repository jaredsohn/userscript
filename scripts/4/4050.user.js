
// UniCyrConv
// version 0.1 BETA!
// 2006-05-06
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script that converts bad unicode cyrillic
// characters to correct ones.
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
// @name          UniCyrConv
// @namespace     http://eugeni.dodonov.net/projects/unicyrconv/
// @description   Transforms bad russian unicode into valid characters
// @include       http://www.google.com/bookmarks/*
// ==/UserScript==
//
// --------------------------------------------------------------------
//
//

/* BEGIN LICENSE BLOCK
Copyright (C) 2006 Eugeni Dodonov

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
	"%u0410":"Ð",
	"%u0430":"Ð°",
	"%u0411":"Ð",
	"%u0431":"Ð±",
	"%u0412":"Ð",
	"%u0432":"Ð²",
	"%u0413":"Ð",
	"%u0433":"Ð³",
	"%u0414":"Ð",
	"%u0434":"Ð´",
	"%u0415":"Ð",
	"%u0435":"Ðµ",
	"%u0416":"Ð",
	"%u0436":"Ð¶",
	"%u0417":"Ð",
	"%u0437":"Ð·",
	"%u0418":"Ð",
	"%u0438":"Ð¸",
	"%u0419":"Ð",
	"%u0439":"Ð¹",
	"%u041A":"Ð",
	"%u043A":"Ðº",
	"%u041B":"Ð",
	"%u043B":"Ð»",
	"%u041C":"Ð",
	"%u043C":"Ð¼",
	"%u041D":"Ð",
	"%u043D":"Ð½",
	"%u041E":"Ð",
	"%u043E":"Ð¾",
	"%u041F":"Ð",
	"%u043F":"Ð¿",
	"%u0420":"Ð ",
	"%u0440":"Ñ",
	"%u0421":"Ð¡",
	"%u0441":"Ñ",
	"%u0422":"Ð¢",
	"%u0442":"Ñ",
	"%u0423":"Ð£",
	"%u0443":"Ñ",
	"%u0424":"Ð¤",
	"%u0444":"Ñ",
	"%u0425":"Ð¥",
	"%u0445":"Ñ",
	"%u0426":"Ð¦",
	"%u0446":"Ñ",
	"%u0427":"Ð§",
	"%u0447":"Ñ",
	"%u0428":"Ð¨",
	"%u0448":"Ñ",
	"%u0429":"Ð©",
	"%u0449":"Ñ",
	"%u042A":"Ðª",
	"%u044A":"Ñ",
	"%u042B":"Ð«",
	"%u044B":"Ñ",
	"%u042C":"Ð¬",
	"%u044C":"Ñ",
	"%u042D":"Ð­",
	"%u044D":"Ñ",
	"%u042E":"Ð®",
	"%u044E":"Ñ",
	"%u042F":"Ð¯",
	"%u044F":"Ñ"
        };
    regex = {};
    for (key in replacements) {
        regex[key] = new RegExp(key, 'gi');
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
// 2006-05-06 - 0.1 - First version
//
