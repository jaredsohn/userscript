// ==UserScript==
// @name           Dom-enabled character mover
// @namespace      Dom-enabled character mover
// @description    Moves dom-enabled characters to the top of your character selection list.
// @include        http://*.forumwarz.com/characters/index
// @include        http://forumwarz.com/characters/index
// ==/UserScript==

var charTable = document.getElementsByTagName("table")[0].children[0];
var offset = 0;

for(var i = charTable.children.length-1; i>0;i--) {

if(charTable.children[i+offset].innerHTML.indexOf("<b>enabled</b>") != -1) {
var moveRow = charTable.children[i+offset];
var insertPos = charTable.children[1];
var rowParent = moveRow.parentNode;
rowParent.removeChild(moveRow);
rowParent.insertBefore(moveRow, insertPos);
offset++;
}

}