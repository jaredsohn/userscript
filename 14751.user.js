// Yahweh Tzedikenu "The Right Arm of Righteousness"
// 2007-11-25 v 1.0
// 2011 v 1.01.04
//
// Changelog
// 2007-11-25 
// - created for the express purpose of esteeming the true names!
// - obtained source via http://userscripts.org/scripts/review/658
// 2007-11-28 
// - restricted replacement to occur on biblegateway, will add more sites later.
// - added funny character replacer to make the online bible cleaner.
// 2011-11-05
// - Used "The Scriptures" from Institute for Scripture Research
// - - http://www.messianic.co.za
// - - as my authority on how to spell the names and words in English
// - Finished replacement for wrongfully Romanized names.
// - Added a few more general Hebrew words.
// - Added blueletterbible.org
// - Updated namespace to bowierocks.com from yuwie.com as yuwie is now gone!
// - minor tweaks to words increase readability
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script that converts the replaced names
// of Yahweh, Yeshua, Elohim, the prophets and places in scripture with
// their true name counterparts as originally written and spoken to us
// from such places as the burning bush, the Mount of Olives, Mount Horeb
// which is otherwise known as the Mountain of Laws and can be found
// in modern day Saudi Arabia, etcetera. This script is my gift to all true
// true name believers and one of my many offerings unto Yahweh!
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Yahweh Tzedikenu", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Yahweh Tzedikenu
// @version        1.01.04
// @namespace      http://www.bowierocks.com
// @description    This script will replace all occurrences of the word "god" with Elohim and "lord" with YHWH and "jesus" with Yeshua!
// @include       *biblegateway.com/*
// @include       *sabbatarian.com/*
// @include       *blueletterbible.org/*
// ==/UserScript==
//
// --------------------------------------------------------------------
//
// This script is dedicated to Emanu'El Yeshua Ha'Moshiach, who will know why.
//
/* BEGIN LICENSE BLOCK
Copyright (C) 2011 Roger Alan Lamb II on Behalf of Emanu'El Yeshua Ha'Moshiach

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
"Bible" : "Scripture",
"bible" : "scripture",
     "the lord":"Yahweh",
     "The Lord":"Yahweh",
     "the Lord":"Yahweh",
     "the LORD":"Yahweh",
     "The LORD": "Yahweh",
     "Christ": "Ha'Moshiach",
     "Jerusalem":"Yahrushalayim",
     "Daniel":"Dani'El",
	"G-d" : "Elohim",
     "GOD":"Elohim",
     "God": "Elohim",
     "Jesus": "Yeshua",
     "Judah":"Yahuda",
     "Israel":"Yitsrael",
     "Egypt":"Mitsrayim",
	"Genesis":"Bereshith",
	"Exodus":"Shemoth",
	"Leviticus":"Wayiqra",
	"Numbers":"Bemidbar",
	"Deuteronomy":"Devarim",
"Isaiah":"Yeshayahu",
"Jeremiah":"Yirmeyahu",
	"Joshua":"Yeshua",
	"Judges":"Shophtim",
	"Judge":"Shopht",
	"judge":"shopht",
	"First":"Aleph",
	"first":"aleph",
		"Matthew":"Mattithyahu",
	"John":"Yohanan",
	"Peter":"Kefa",
	"James":"Ya'akob",
	"Paul":"Sha'ul",
	"Mark":"Marco",
	"Moses":"Mosheh",
"Satan":"Ha'Shatan",
"Samuel":"Shemu'el",
"Kings":"Melakim",
"kings":"melakim",
"King":"Melak",
"king":"melak",
"Ezekiel":"Yehezqel",
"Hosea":"Hoshea",
"Joel":"Yo'el",
"Obadiah":"Obadyah",
"Jonah":"Yonah",
"Micah":"Mikah",
"Habakkuk":"Habaqquq",
"Zephaniah":"Tsephanyah",
"Zechariah":"Zekaryah",
"Malachi":"Mal'aki",
"Psalms":"Tehillim",
"psalms":"tehillim",
"Proverbs":"Mishle",
"proverbs":"mishle",
"Job":"Iyob",
"Song of Songs":"Shir haShirim",
"Song of Solomon":"Shir Shelomo",
"Solomon":"Shelomo",
"David":"Dawid",
"Lamentations":"Ekah",
"Ecclesiastes":"Qoheleth",
"Esther":"Ester",
"Nehemiah":"Nehemyah",
"Chronicles":"Dibre haYamin",
"Hebrews":"Ibrim",
"Day":"Yom",
"day":"yom",
"Holy":"Kodesh",
"holy":"kodesh",
"Star":"Ohr",
"star":"ohr",
"Stars":"Ohrim",
"stars":"ohrim",
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
     "\u2122": "(tm)",
     "\u20ac":" ",
     "\u0153":" ",
     "\u00e2":" "
     };

 regex = {};
 for (key in replacements) {
     regex[key] = new RegExp(key, 'g');
 }

 textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

 for (i = 0; i < textnodes.snapshotLength; i++) {
     node = textnodes.snapshotItem(i);
     s = node.data;
     for (key in replacements) {
         s = s.replace(regex[key], replacements[key]);
     }
     node.data = s;
 }

 })();
 
        