// ==UserScript==
// @name           Quick Training Editor Add Update Button To Top
// @namespace      GLB
// @description    Adds the Update Button to the top of the page
// @include        http://goallineblitz.com/game/quick_training*
// ==/UserScript==

window.setTimeout( function() 
{

var quick_training= document.getElementById('training_table');

if (quick_training) {
    var newDiv = document.createElement('div');
   newDiv.align = 'right';
   newDiv.innerHTML = '<input type="button" value="Update" onClick="document.forms[0].elements[document.forms[0].elements.length-1].click();">';

   quick_training.parentNode.insertBefore(newDiv, quick_training);
}


},100);