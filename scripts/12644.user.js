// ==UserScript==
// @name           ModelMayhem Msg Signature
// @namespace      http://www.sfmoe.com
// @description    add a signature to the messages sent through modelmayhem
// @include        http://www.modelmayhem.com/convo.php*
// ==/UserScript==

//<textarea name="message" rows="10" cols="70"></textarea>



var allTextareas, newtext, thisTextarea; 
allTextareas = document.getElementsByTagName('textarea'); 
newtext = "\n\n\n-Sig";
for (var i = 0; i < allTextareas.length; i++) { 
    thisTextarea = allTextareas[i]; 
    // do something with thisTextarea 
    thisTextarea.value = newtext;
} 

