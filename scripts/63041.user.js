// ==UserScript==
// @name           snob-tribalwars-plapl
// @namespace      none
// @include        http://ae*.tribalwars.ae/g*
// ==/UserScript==

doc=this.document;
imgs=doc.getElementsByTagName("img");

wood=Math.round(doc.getElementById("wood").innerHTML);
wood=wood-(wood%28000);
stone=Math.round(doc.getElementById("stone").innerHTML);
stone=stone-(stone%30000);
iron=Math.round(doc.getElementById("iron").innerHTML);
iron=iron-(iron%25000);

village=document.URL;
village=village.substring(village.indexOf("village=")+8,village.indexOf("village=")+13);

now=doc.getElementById("iron").parentNode.parentNode;
td=document.createElement("td");
img=document.createElement("img");
img.setAttribute("src","graphic/unit/unit_snob.png");
img.setAttribute("alt","Einlagerbar");
img.setAttribute("style","height:18px");
td.appendChild(img);

td.appendChild(document.createTextNode(Math.min(Math.min(wood/40000,stone/50000),iron/50000)));
now.appendChild(td);