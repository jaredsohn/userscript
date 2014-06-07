// ==UserScript==
// @name Delicious.com - Dim Saved Links
// @namespace http://murklins.talkoncorners.net
// @description Dim out any links on Delicious that you've already saved in your own account.
// @include http://delicious.com/*
// @include http://www.delicious.com/*
// ==/UserScript==

// This script adds the "dimsavedlinks_post" class to all the post li items that are already saved
// in your own Delicious account. Then it adds some css that dims out all the posts with that new class.
// If you have modified the default Delicious CSS in some way, you can change the CSS used by this script
// to do the dimming so that it fits in better with your custom CSS.

addGlobalStyle(
  'li.dimsavedlinks_post div.data h4 { color: #a9a9a9; background-color: #fff; }' +
	'li.dimsavedlinks_post div.data h4 a { color: #a9a9a9; }' +
	'li.dimsavedlinks_post div.data h4 a:visited { color: #a9a9a9; }' +
	'li.dimsavedlinks_post div.data .savers { color: #a9a9a9; background-color: #fff; border-top: 1px solid #D5D5D5; }' +
	'li.dimsavedlinks_post div.data .savers a span { color: #D5D5D5; }' +
	'li.dimsavedlinks_post div.data .full-url a { color: #a9a9a9; }' +
	'li.dimsavedlinks_post div.data .description { background-color: #fff; color: #a9a9a9; }' +
	'li.dimsavedlinks_post div.meta a { color: #a9a9a9; }' +
	'li.dimsavedlinks_post div.meta a span { color: #a9a9a9; }' +
	'li.dimsavedlinks_post ul.tag-chain li.tag-chain-item a.tag-chain-item-link { color: #a9a9a9 !important; }' +
	'li.dimsavedlinks_post ul.tag-chain li.on a.tag-chain-item-link { background-image: none !important; }' +
	'li.dimsavedlinks_post ul.tag-chain li.on a span.tag-chain-item-span { color: #a9a9a9 !important; background-color: #fff; }'
);

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var main_node = document.getElementById("bd");
var saved = document.evaluate("//span[@class = 'saverem']//a/text()", main_node, null,
                              XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                              null);
                                  
for (var i = 0; i < saved.snapshotLength; i++) {  
  var n = saved.snapshotItem(i);  
  t = n.textContent;
  if (t == "EDIT") {
    // iterate up from the saved span until we reach the post li
    var p = n;
    while (p != null && !(p.nodeName == "LI" && p.className.indexOf("post") != -1)) {
  	  p = p.parentNode;
    }
    p.className = p.className + " dimsavedlinks_post";
  }
}
