// ==UserScript==
// @name           Cure Cosplay Picture Unhider
// @namespace      http://userscripts.org/users/72665
// @description    Allows you to view and choose "save as" on pictures found on Curecos.com
// @include        http://*.curecos.com/*
// ==/UserScript==


var allTextareas, thisTextarea;
allTextareas = document.getElementsByTagName('img');
for (var i = 0; i < allTextareas.length; i++) {
    thisTextarea = allTextareas[i];
    thisTextarea.style.width = "";
    thisTextarea.style.height = "";
}