// ==UserScript==
// @name Teleport Button
// @namespace Avalon
// @description Button to swiftly teleport to your land
// @include http://thelostrunes.com/game.php
// @include http://www.thelostrunes.com/game.php
// ==/UserScript==
 
function addGlobalJS(js)
{
 var head, script;
 head = document.getElementsByTagName('head')[0];
 if (!head) { return; }
 script = document.createElement('script');
 script.type = 'text/javascript';
 script.innerHTML = js;
 head.appendChild(script);
}
 
document.getElementById("right3").innerHTML += '<table border="0" cellspacing="0" cellpadding="1" align="center" style="margin-top: 0px;" style="margin-bottom: 10px;"><tr><td>[<a href="javascript:teleport();">Teleport Home</a>]</td></tr></table>';

