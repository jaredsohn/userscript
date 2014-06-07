// Version 0.1 - August 24, 2007
// By Jordon Kalilich - www.theworldofstuff.com
//
// ==UserScript==
// @name          StumblePorn - Picview Remover
// @description   Transforms http://www.stumbleporn.com/picview.php?pic=http://whatever.com into http://whatever.com
// @include       *stumbleporn.com/picview*
// ==/UserScript==

var location = window.location.toString();
var key;    // what we're looking for
key = "?pic=";

firstPos = location.indexOf(key);
// afterKey is everything after the key:
afterKey = location.substring(key.length + firstPos);
afterKeyPos = location.indexOf(afterKey);

newLocation = location.substring(afterKeyPos);
window.location.replace(newLocation);
