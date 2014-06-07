// ==UserScript==
// @name           Sovserv+
// @include        http://sovserv.ru/vbb/showthread.php*
// @description    Sovserv.ru/vbb features
// ==/UserScript==

var tables = document.getElementsByTagName('table'), mnum = 0;
for( var i = 0, table; table = tables[i]; i++ ) {
  if (table.cellPadding == 10) {
  var cell = table.rows[0].cells[0];
   for( var k = 0; k < cell.childNodes.length; k++ ) {
    if (cell.childNodes[k].nodeName == "#comment") {
    var node = cell.childNodes[k];
     if(node.nodeValue.search("message") == 3) {
     messagefunc(node.previousSibling.previousSibling, k);
     }
     if(node.nodeValue.search("sig") == 1) {
     sigfunc(node.nextSibling.nextSibling, k);
     }
    }
   }
  }
}

function messagefunc(a, k) {

}

function sigfunc(a, k) {
var sigstr = a.innerHTML;
a.innerHTML = "";
mnum = mnum + 1;
a.setAttribute("id","sig"+mnum);
var button = document.createElement("img");
button.setAttribute("src", "http://sovserv.ru/gallery/albums/userpics/10266/menu_close.gif");
button.style.marginTop="20px";
button.addEventListener("click", function(toggle) { if ( a.innerHTML == '' ) { a.innerHTML = sigstr; button.setAttribute("src", "http://sovserv.ru/gallery/albums/userpics/10266/menu_open.gif"); } else { a.innerHTML = ''; button.setAttribute("src", "http://sovserv.ru/gallery/albums/userpics/10266/menu_close.gif"); } }, true);
a.parentNode.insertBefore(button, a);
}
