// ==UserScript==
// @name                Bookmark Bar Hider
// @namespace	        http://www.digitalraven.org/
// @description	        Script to hide the bookmark bar on RPGnet
// @include		http://forum.rpg.net/*
// ==/UserScript==

HideBar();

function HideBar() {
  var killlist = /^Bookmarks$/;
  var tables = document.getElementsByTagName('table');

  if (tables.length) {
    for ( var i = 0; i < tables.length; i ++ ) {
      var table = tables[i];
      var cells = table.getElementsByTagName('td');
      if (cells.length) {
        var cell = cells[0];
        var title = cell.textContent;
        if (killlist.test(title)) {
		  table.parentNode.removeChild(table);
        }
      }
    }
  }
}