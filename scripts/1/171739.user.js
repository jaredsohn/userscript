// ==UserScript==
// @name            Hack Forums Remove Transparent Text
// @namespace       Snorlax
// @description     Removes all the [color=transparent] text
// @include         http://hackforums.net/showthread.php?tid=*
// @include         http://www.hackforums.net/showthread.php?tid=*
// @version         1.0
// ==/UserScript==

var str = document.body.innerHTML; 
var n = str.replace("color: transparent;","color: lime;font-weight: bold;font-size: 200%;");
document.body.innerHTML = n;