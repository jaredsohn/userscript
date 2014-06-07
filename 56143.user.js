// ==UserScript==
// @name           WoP Font Killer
// @description    Replaces all user defined fonts in post of http://forum.worldofplayers.de with "Verdana".
// @include        http://forum.worldofplayers.de
// ==/UserScript==

alert(5);

var allFontTags;
allFontTags = document.getElementsByTagName('font');
for (var i = 0; i < allFontTags.length; i++) {
    allFontTags[i].face = 'Verdana';    
}
