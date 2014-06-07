// ==UserScript==
// @name          IAFD Newzbin search
// @description	  Adds Newzbin search link to performer pages on IAFD.com (Internet Adult Film Database)
// @include       http://www.iafd.com/person.rme*
// ==/UserScript==

var table = document.getElementById("personal");
var rows = table.getElementsByTagName("tr");
var performer = document.getElementsByTagName("h1")[0].firstChild.nodeValue.replace(/^\s*|\s*$/g,'');

for (var i = 1; i < rows.length; i++)
{
  var filmCell = rows[i].getElementsByTagName("td")[0];
  var film = rows[i].getElementsByTagName("td")[0].getElementsByTagName("a")[0].firstChild.nodeValue;
  var url = "http://www.newzxxx.com/search/query/?q=%s&area=-1&fpn=p&searchaction=Go&areadone=-1".replace("%s", film.replace(" ", "+"));
  
  var link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("style", "margin-left: 5px");
  link.setAttribute("target", "_blank");
  link.appendChild(document.createTextNode("[newzxxx]"));
  
  filmCell.appendChild(link);
} // for