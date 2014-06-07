// ==UserScript==
// @name           GLB Outbox Delete Button
// @namespace      GLB
// @description    Places a Delete button on the upper right hand corner
// @include        http://goallineblitz.com/game/outbox*
// ==/UserScript==

window.setTimeout( function() 
{

var outbox= document.getElementById('messages');

if (outbox) {
    var newDiv = document.createElement('div');
   newDiv.align = 'right';
   newDiv.innerHTML = '<input type="button" value="Delete" onClick="document.forms[0].elements[document.forms[0].elements.length-1].click();">';

   outbox.parentNode.insertBefore(newDiv, outbox);
}


},100);