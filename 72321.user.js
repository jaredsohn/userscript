// ==UserScript==
// @name           HP BSC
// @namespace      Appearance
// @description    Widens the Manuals section of HP BSC and removes unneeded colums
// @include        http://h20000.www2.hp.com/bizsupport/TechSupport/DocumentIndex.jsp*
// ==/UserScript==

var table = document.getElementsByTagName("table");
for(var i=0; i<table.length; i++) {
  if(table[i].width == 720 && table[i].style.height == "100%") { table[i].removeAttribute("width"); }
  if(table[i].width == 570) { table[i].removeAttribute("width"); }
  if(table[i].width == 370) {
    table[i].removeAttribute("width");

    // remove columns "Size (MB)" and "Estimated download time"
    // uncomment the 
    if(table[i].getAttribute("summary")) {
      tr = table[i].getElementsByTagName("tr");
      for(var x=0; x<tr.length; x++) {
        th = tr[x].getElementsByTagName("th");
        td = tr[x].getElementsByTagName("td");
        if(th[4]) { tr[x].removeChild(th[4]); }
        if(td[4]) { tr[x].removeChild(td[4]); }
        if(th[3]) { tr[x].removeChild(th[3]); }
        if(td[3]) { tr[x].removeChild(td[3]); }
        }
      }
    // end of column removal
    }
  }

var th = document.getElementsByTagName("th");
for(var i=0; i<th.length; i++) {
  th[i].removeAttribute("width");
}

var td = document.getElementsByTagName("td");
for(var i=0; i<td.length; i++) {
  if(td[i].width == 530) { td[i].removeAttribute("width"); }
  if(td[i].width == 380) { td[i].removeAttribute("width"); }
  if(td[i].width == 370) { td[i].removeAttribute("width"); }
  if(td[i].width == 160) { td[i].removeAttribute("width"); }
}

// EOF