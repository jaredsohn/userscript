// ==UserScript==
// @name           CVSSv2 Link Creator
// @namespace      http://www.l1pht.com
// @description    Creates a Link for the CVSSv2 Notation on nvd.nist.gov calculator site
// @include        http://nvd.nist.gov/*
// ==/UserScript==
// RETRIEVE THE HTML BODY CODE 
var text = document.body.innerHTML;
// Feel free to tighten this RE up, but no that the full notation is not always displayed.
var searchregex = /\s+\(AV:.{15,100}\)/gi;
var CVSSnotation = text.match(searchregex);

// Building a link that works and includes the vector
link = "<a href='http://nvd.nist.gov/cvss.cfm?calculator&version=2&vector="+CVSSnotation[0]+"'>"+CVSSnotation[0]+"</a>";

// Now replacing the old text with the link
document.body.innerHTML= document.body.innerHTML.replace(searchregex,link);
