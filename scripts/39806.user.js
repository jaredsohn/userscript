// ==UserScript==
// @name           Background Image rewriter
// @namespace      *
// @description    Makes images hidden as Table Background accessible by replacing the first Table Row with the image itself
// @include        *
// ==/UserScript==

var arrayTables = document.getElementsByTagName("table");
for (var i = 0; i < arrayTables.length; i++) {
  var element = arrayTables[i];
  var bg = element.getAttribute("background", false);
  if (bg != null)
  {
    element.deleteRow(0);
    var TR = element.insertRow(0);
    var TD1 = document.createElement("td");
    var TD1img =  document.createElement("img");
    TD1img.src = bg;
    TD1.appendChild(TD1img);
    TR.appendChild(TD1);
  }
}

