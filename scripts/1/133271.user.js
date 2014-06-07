// ==UserScript==
// @name           Cure Cosplay Picture Unhider
// @namespace      curecos
// @description    Allows you to choose "save as" on pictures found on Curecos.com
// @include       http://*.curecos.com/picture/detail?id=*
// @match       http://*.curecos.com/picture/detail?id=*
// ==/UserScript==


var allTextareas, thisTextarea;
allTextareas = document.getElementsByTagName('img');
for (var i = 0; i < allTextareas.length; i++) 
{
    thisTextarea = allTextareas[i];
    thisTextarea.style.width = "";
    thisTextarea.style.height = "";
}