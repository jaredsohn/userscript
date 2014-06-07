// ==UserScript==
// @name           Twitter Emoji
// @namespace      com.mzsanford
// @description    Display Softbank/iPhone emoji on twitter.com
// @include        https://twitter.com/*
// ==/UserScript==

var allSpans, thisSpan;

allSpans = document.evaluate(
    "//span[@class='entry-content']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allSpans.snapshotLength; i++) {
    thisSpan = allSpans.snapshotItem(i);
    var content = thisSpan.innerHTML;
    var replacement = "";
    var charCode;
    for (var j = 0; j < content.length; j++) {
	  charCode = content.charCodeAt(j);
	  // The softbank/iPhone emoji range.
	  if (charCode >= 57345 && charCode <= 58679) {
		replacement += "<img src=\"http://photar.net/emoji/emoji-" + charCode.toString(16).toUpperCase() + ".png\" />";
	  } else {
	    replacement += content.charAt(j);	
	  }
    }
    thisSpan.innerHTML = replacement;
}