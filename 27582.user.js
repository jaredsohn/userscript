// Version 0.1 - May 31, 2008
// 
//
// ==UserScript==
// @name          Bring the Porn - straight to the original URL        
// @description Transforms  http://www.bringtheporn.com/pages/support.html?img=http://whatever.com 
// into http://whatever.com
// @include       *BringThePorn.com/pages*
// ==/UserScript==

var location = window.location.toString();
var key;    // what we're looking for
key = "?img=";

firstPos = location.indexOf(key);
// afterKey is everything after the key:
afterKey = location.substring(key.length + firstPos);
afterKeyPos = location.indexOf(afterKey);

newLocation = location.substring(afterKeyPos);
window.location.replace(newLocation);
