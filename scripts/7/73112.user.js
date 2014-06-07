// ==UserScript==
// @name           Akte anzeigen lassen
// @namespace      sdgsdgserg
// @include        http://de*.die-staemme.de/game.php*screen=info_player*id=*
// ==/UserScript==



id = this.location.href;
id = id.split("id");
id = id[1];
var welt = document.URL.split("//")[1].split(".")[0];


tr = document.createElement("tr");
td = document.createElement("td");
td.setAttribute("colspan","2");
var img = document.createElement("img");
img.src = "http://de.twstats.com/image.php?type=playergraph&graph=points&id"+id+"&s="+welt;
var a = document.createElement("a");
a.href = "http://de.twstats.com/"+welt+"/index.php?page=player&id"+id;
a.target = "_blank";
a.appendChild(img);
td.appendChild(a);
tr.appendChild(td);
document.getElementsByClassName("vis")[2].appendChild(tr);