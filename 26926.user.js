// ==UserScript==
// @name           Resizable Table Columns GM Demo
// @description   Demonstate resizable table columns
// @include       http://icant.co.uk/csstablegallery/
// @include       http://moronicbajebus.com/wordpress/wp-content/cssplay/reformat-table/index.html
// @include       http://www.webtoolkit.info/demo/javascript/scrollable/demo.html
// ==/UserScript==

var tbls = document.getElementsByTagName("table");
for (var i=0; i < tbls.length; i++) {
  if (tbls[i].hasAttribute("class")) {
    tbls[i].className += " resizable";
  } else {
    tbls[i].className = "resizable";
  }
}