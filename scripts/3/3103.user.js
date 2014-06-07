// Remove Targets For Binary Downloads
// User script for Greasemonkey
// 
// based on "Disabe Targets for Downloads"
// originally coded by Jason Rhyley - www.rhyley.org
// changed name to avoid confusion
//
// License:
// 
// Creative Commons Attribution-NonCommercial-ShareAlike 2.0
// http://creativecommons.org/licenses/by-nc-sa/2.0/
//
// ==UserScript==
// @name                Remove Targets For Binary Downloads
// @description         Disable target attribute for any link to a binary file.
// @include             *
// ==/UserScript==

// file extensions matching. add your own extensions here

var regexBinary = /\.(?:zip|rar|ace|exe|tar|jar|xpi|gzip|t?gz|ace|bin|doc|xls|mdb|ppt|iso|7z|cab|arj|lzh|pdf|uue|mpe?g|avi|wmv|asf|mp3)$/i;

// get all links of the document

var allLinks = document.evaluate(
       '//a[@href]',
       document,
       null,
       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
       null);

// check if the document defines a blank target base (opens all links in a new window by default)

var base_element = document.getElementsByTagName("base");
var blankdef     = (base_element.length && base_element[0].target == "_blank") ? true : false;

// examine each link

for (var i = 0, lcand; lcand = allLinks.snapshotItem(i); i++) {

    var ltarget  = lcand.getAttribute("target");

    // If a target attribute is set for the link, or if there is a "_blank" target base, continue

    if (ltarget == "_blank" || ( blankdef && ltarget != "_self" ) ) {
       
       // binary file extension matching is done here

       if (regexBinary.test(lcand.href)) {

          // If the link points to a binary file (as defined above), set target to "_self" and remove onClick attribute

          lcand.setAttribute("target", "_self");
          lcand.setAttribute("onClick", "");
       }
    }
}

