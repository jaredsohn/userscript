// ==UserScript==
// @name           Expand Message Boxes
// @namespace      Cronus6
// @description    Expand Message Boxes
// @include        http://goallineblitz.com/game/message.pl=*
// @include        http://goallineblitz.com/game/new_message.pl?to=*
// @include        http://goallineblitz.com/game/message.pl?id=*
// ==/UserScript==

window.setTimeout( function() 
{

var fsbox= document.getElementById('message_content');

if (fsbox) {
    fsbox.style.height = "550px";
}


},100);