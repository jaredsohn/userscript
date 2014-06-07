// ==UserScript==
// @name           GLB Inbox Delete
// @namespace      GLB
// @description   Adds a delete button to the top of your GLB inbox
// @include        http://goallineblitz.com/game/inbox*
// ==/UserScript==

window.setTimeout( function() 
{

var inbox= document.getElementById('messages');

if (inbox) {
    var newDiv = document.createElement('div');
   newDiv.align = 'right';
   newDiv.innerHTML = '<input type="button" value="Delete" onClick="document.forms[0].elements[document.forms[0].elements.length-1].click();">';

   inbox.parentNode.insertBefore(newDiv, inbox);
}


},100);