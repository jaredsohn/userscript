// ==UserScript==
// @name          Cammmmy's Auto Shout Troll Face
// @namespace     Cammmmy/TrollFace
// @description   Shouts a troll face every 60 seconds
// @include       http://nextgenupdate.com/forums/idetach.php
// @include       http://www.nextgenupdate.com/forums/idetach.php
// @include       http://nextgenupdate.com/forums/
// @include       http://www.nextgenupdate.com/forums/
// @include       www.nextgenupdate.com/forums/idetach.php
// @include       www.nextgenupdate.com/forums/
// @version 	  1.0
// ==/UserScript==

function shout(x)
{
InfernoShoutboxControl.shout.ajax = new vB_AJAX_Handler(true);InfernoShoutboxControl.shout.ajax.send('infernoshout.php','do=shout&message=' + PHP.urlencode(x));
}
setInterval('shout(":carling:")', 60);