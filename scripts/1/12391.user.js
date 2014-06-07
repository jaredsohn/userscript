// by celiomsj

// ==UserScript==
// @name           Sokker - Youth school row highlighting (v0.3)
// @description   Highlight the table row on mouse hover, mostly to prevent firing the wrong player.
// @include        http://online.sokker.org/*
// ==/UserScript==

var color = GM_getValue("ys_highlight_color", "#CDCDCD")
GM_registerMenuCommand('Choose a color...', color_picker);

if (document.URL.indexOf("juniors.php")!=-1) {
  var tables = document.getElementsByTagName("table");
  var rows = tables[tables.length-1].getElementsByTagName("tr");
  var n = rows.length;
  if (document.URL.indexOf("action=SendOff")!=-1) {n--}
  for (i=2; i < n; i++) {
    rows[i].setAttribute("onMouseOver", "this.style.backgroundColor='"+color+"'");
    rows[i].setAttribute("onMouseOut", "this.style.backgroundColor='transparent'");
  }
}

function color_picker() {
  var new_color = window.prompt("Enter a valid color. (You will need to refresh the page)\nExemples:\n#11CCAA\nblue", color);
  GM_setValue("ys_highlight_color", new_color);
  color = new_color;
}