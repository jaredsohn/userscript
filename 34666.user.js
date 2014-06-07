// Mafia Cities facebook user script
// version 0.2 BETA!
// 2008-09-29
// Copyright (c) 2008 Lee Coady
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
// select "BUDDY", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          BUDDY
// @namespace     http://apps.new.facebook.com/mafiacities/family.php?id=BULLY
// @description   Turn Mafia cities into a friendly game
// @include       http://apps.new.facebook.com/mafiacities/players.php*
// @include       http://apps.facebook.com/mafiacities/players.php*
// ==/UserScript==



var replacements, regex, key, textnodes, node, s;

replacements = {
    "Killing": "Hugging",
    "Kill": "Hug",
    "Attack": "Huggle",
    "Deaths": "Smothers",
    "Take over businesses": "Lessen burden",
    "Add to Hit List": "Share the Love",
    "Buy Info": "Donate to charity",
    "Deadly": "Cuddly"};
regex = {};
for (key in replacements) {
    regex[key] = new RegExp(key, 'g');
}

textnodes = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);
    s = node.data;
    for (key in replacements) {
        s = s.replace(regex[key], replacements[key]);
    }
    node.data = s;
}

