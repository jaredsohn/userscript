// ==UserScript==
// @name        Clictune skipper
// @namespace   Automatically skips clictune timers
// @description This script allows to bypass the clictune timer
// @include     *clictune.com/id=*
// @grant       none
// @version     1.0
// ==/UserScript==

var s1 = 'redirect.php?url=';
var s2 = '&';

var p1 = document.documentElement.innerHTML.indexOf(s1) + s1.length;
var p2 = document.documentElement.innerHTML.indexOf(s2);
var result = document.documentElement.innerHTML.substring(p1,p2);
result = unescape(result);
if (s1.length > 0 && s2.length > 0 && p1 > 0 && p2 > 0 && result.length > 0)
{
	document.location.href = result;
}
