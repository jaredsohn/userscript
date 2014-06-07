// ==UserScript==
// @name           GLB Delete Button
// @namespace      GLB
// @description    Places a Delete button on the upper right hand corner
// @include        http://goallineblitz.com/game/outbox*
// @include        http://goallineblitz.com/game/inbox*
// ==/UserScript==

window.setTimeout( function() 
{

function buttclick(){
    var inputs = document.getElementsByTagName('input');
    for (var i=inputs.length-5; i<inputs.length ; i++) {
        if (inputs[i].src == 'http://goallineblitz.com/images/game/buttons/delete.png') {
            inputs[i].click();
        }
    }

}


var outbox= document.getElementById('messages');

if (outbox) {
   var newDiv = document.createElement('div');
   newDiv.align = 'right';
   var delbutton = document.createElement('input');
   delbutton.setAttribute('type', 'button');
   delbutton.setAttribute('value', 'Delete');
   delbutton.setAttribute('id', 'delbuttonscr');
   delbutton.setAttribute('name', 'delbuttonscr');
   newDiv.appendChild(delbutton);
   //newDiv.innerHTML = '<input type="button" value="Delete" onClick="document.forms[0].elements[document.forms[0].elements.length-1].click();">';
   delbutton.addEventListener('click', buttclick, false);
   outbox.parentNode.insertBefore(newDiv, outbox);
}


},100);