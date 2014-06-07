// phpchina forum64 hide spam user script
// version 0.1 BETA!
// 2012-07-08
// Copyright (c) 2012, PHP.Object
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          phpchina forum64 hide spam
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   example script to alert "Hello world!" on every page
// @include       *
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// ==/UserScript==

var nodelist = document.evaluate('//table[@summary="forum_64"]//tr/td[@class="by"]/cite/a/text()',document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var hidden_list = ['myc550719','天佑的天'];
for (var i = 0; i < nodelist.snapshotLength; i ++){
    text = nodelist.snapshotItem(i);
    for (var j = 0; j < hidden_list.length; j ++){
        if(hidden_list[j] == text.textContent){
            console.log(text.parentNode.parentNode.parentNode.parentNode.parentNode.style.display="none");
        }
    }
}