// ==UserScript==
// @name           Spieleraktenlinks staemme-statistik.de
// @namespace      none
// @include        http://de*.die-staemme.de/game.php?*screen=info_player*id=*
// @include        http://de*.die-staemme.de/guest.php?*screen=info_player*id=*
// ==/UserScript==

if(document.getElementsByClassName("menu nowrap quickbar")[0])
{

function showlinks () {
i=0;x="";
y=document.URL;
id=y.substring(y.indexOf("id=")+3);
serv=y.substring(9,y.indexOf("."));
while(x != "vis") { i++; x=document.getElementsByTagName("table")[i].className; }

k=0;x=0;l=0;
while(x==0) {
 if(document.getElementsByTagName("a")[k]!=undefined)
 if(document.getElementsByTagName("a")[k].getAttribute("href").indexOf("screen=info_ally") != -1) x=1;
 else k++;
 else x=2;
} 
if(x==1) {
y=document.getElementsByTagName("a")[k].getAttribute("href"); 
ally=y.substring(y.indexOf("id=")+3);
}
tr=document.createElement("tr");
td1=document.createElement("td");
td2=document.createElement("td");
link1=document.createElement("a");
link1.setAttribute("target","_blank");
link1.setAttribute("href","http://www.staemme-statistik.de/"+serv+"/"+id+".html");
link1.appendChild(document.createTextNode(" staemme-statistik.de"));

td1.appendChild(document.createTextNode("Spielerakte:"));
td2.appendChild(link1);
tr.appendChild(td1);tr.appendChild(td2);

document.getElementsByTagName("table")[i].appendChild(tr);
if(x==1) {
tr=document.createElement("tr");
td1=document.createElement("td");
td2=document.createElement("td");
link1=document.createElement("a");
link1.setAttribute("target","_blank");
link1.setAttribute("href","http://www.staemme-statistik.de/"+serv+"/"+ally);
link1.appendChild(document.createTextNode(" staemme-statistik.de"));

td1.appendChild(document.createTextNode("Stammesakte:"));
td2.appendChild(link1);
tr.appendChild(td1);tr.appendChild(td2);
document.getElementsByTagName("table")[i].appendChild(tr);
}
} showlinks();
}