// Vox cut
// Hides part of a post under a cut.
// version 0.1 BETA!
// 2007-12-11
// Copyright (c) 2007, Dmitry Rubinstein
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Vox cut", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Vox cut
// @namespace     http://dimrub.vox.com/
// @description   Allows to hide portions of a post under a cut
// @include       http://*.vox.com/*
// ==/UserScript==

var textNodes = document.evaluate(
    '//div[@class="asset-body preview-links"]',
    // For now only allow cut in posts, not in comments
    //'//div[@class="asset-body preview-links" or @class="comment-body"]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < textNodes.snapshotLength; i++) {
    var cut_found = false;
    textNode = textNodes.snapshotItem(i);
    var text = textNode.innerHTML;
    nodes = /&lt;vox-cut( text="([^"]*)")?&gt;/.exec(text);
    var cut_id = 0;
    while (nodes != null) {
        cut_found = true;
        cut_id_str = "vox-cut-id-" + cut_id;
        GM_log("Found a cut. nodes.length = " + nodes.length);
        label = (nodes.length == 3 && nodes[2] != null) ? nodes[2] + "..." : "Read More...";
        text = text.replace(/&lt;vox-cut( text="([^"]*)")?&gt;/,
        "<b><a onmouseover=\"this.style.cursor='pointer'\" onclick=\"this.style.display='none';node=document.getElementById('" + cut_id_str + "'); node.style.display='inline';\">( " + label + 
        " )</a></b>" + "<div id=" + cut_id_str + " style=\"display:none\">");

        if (/&lt;\/vox-cut&gt;/.test(text))
            text = text.replace(/&lt;\/vox-cut&gt;/, "</div>");
        else
            text = text + "</div>";

        nodes = /&lt;vox-cut( text="([^"]*)")?&gt;/.exec(text);
        cut_id++;
    }
    if (cut_found) {
        textNode.innerHTML = text;
    }
}
