// ==UserScript==
// @name           Remove Digg Period Spam
// @namespace      person.barnes.david
// @include        http://img.4chan.org/b/*
// ==/UserScript==

var cells = document.getElementsByTagName("blockquote"); 
for (var i = 1; i < cells.length; i++) { 
    if (cells[i].innerHTML.indexOf('.<br>.<br>.<br>') != -1)
        cells[i].parentNode.parentNode.parentNode.parentNode.style.display = 'none';
}
