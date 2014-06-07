// ==UserScript==
// @name           Gladiatus Login Tool
// @namespace      http://plytas.blogspot.com
// @description    Tool for multiple acc users that lets you easier switch between your users.
// @include        http://s*.gladiatus.*/game/index.php?mod=logout*
// ==/UserScript==

var server;
server="s1.gladiatus.lt";
var one;
var three;
var four;
one="http://";
three="/game/index.php?mod=login";
four=one+server+three;
window.location=four;