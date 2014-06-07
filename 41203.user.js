// ==UserScript==
// @name	wikipedialayout
// @namespace	NA
// @include	http://en.wikipedia.*
// ==/UserScript==

function init() {
var search = document.getElementById('searchBody');
var topDiv = document.getElementById('siteNotice');
topDiv.parentNode.removeChild(topDiv);
columnone = document.getElementById('column-one');
columnone.parentNode.removeChild(columnone);
columntwo = document.getElementById('content');
var cont = columntwo.innerHTML;
document.body.innerHTML = "";
contentDiv = document.createElement('div');
contentDiv.innerHTML = cont;
contentDiv.style.margin = "0px 20px 20px 20px";
//document.body.appendChild(search);
document.body.appendChild(contentDiv);
document.body.style.background = "#f9f9f9";
//var style = columntwo.style;
//columntwo.style.width = "100%";
//columntwo.style.position = "absolute";
//columntwo.style.float = "left";

var heading = contentDiv.childNodes[3];
var head = heading.innerHTML;

var table = document.createElement('table');
heading.parentNode.insertBefore(table,heading);
table.innerHTML = "<td width='100%'><h1 class='firstHeading'>"+head+"</h1></td><td width='100px'><center>"+search.innerHTML+"</center></td>";
table.style.width = "100%";
heading.parentNode.removeChild(heading);

}

init();