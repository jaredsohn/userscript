// ==UserScript==
// @name        Automatically Open Web Link
// @namespace   GMonkey
// @description Automatically opens a weblink on webpage if it contains specified string  
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant       none
// ==/UserScript==
 
//--- contains is case-sensitive.
var attackLink          = $("a:contains('INSERT-STRING-HERE')");

//--- "Click" the link the easy way.
window.location.href    = attackLink[0].href;
