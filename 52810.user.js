// ==UserScript==
// @name           Zaffs Berichteformatierer
// @namespace      none
// @include        http://de*.die-staemme.de*screen=report*view=*
// @include        http://de*.die-staemme.de*view=*screen=report*
// ==/UserScript==

var doc=this.document;
var search=doc.getElementsByTagName("td");
var found;

for(var i=0;i<search.length;i++) {
if(search[i].getAttribute("class")=="selected") found=search[i].parentNode.parentNode;
}

tr=doc.createElement("tr");
td=doc.createElement("td");
td.setAttribute("class","selected");
link=doc.createElement("a");
link.setAttribute("href","http://noox.redio.de/berichte.php");
link.setAttribute("target","_blank");
link.appendChild(doc.createTextNode("Formatierer"));

td.appendChild(link);
tr.appendChild(td);
found.appendChild(tr);