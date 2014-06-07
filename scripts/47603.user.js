// FMyLife.com Remove "Today," Script
// version 1.0
// 2008-04-26
// Copyright (c) 2009, Chad Bailey
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
// ==UserScript==
// @name          FMyLife.com "Today" Removal
// @namespace     http://chadsanswers.com/2009/04/26/remove-today-from-fml-fmylifecom/
// @description   Remove "Today," from Fmylife.com FML
// @include       http://www.fmylife.com/*
// @include       http://fmylife.com/*
// ==/UserScript==

var replacements, regex, key, textnodes, node, s;

replacements = {
    "Today, ": " "};
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

// Written with the assistance of http://tinyurl.com/zucoc