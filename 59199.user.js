// ==UserScript==
// @name           Dorfaktenlinks
// @namespace      Die St�mme
// @description    Zeigt im Dorfprofil ein Link zu TW+ und TWstats der Infos zum Dorf anzeigt.
// @include        http://de*.die-staemme.de/*.php?village=*&screen=info_village&id=*
// ==/UserScript==

function showlinks () {
i = 22;x="";dssup=
y = document.URL;
villageID = y.substring(y.indexOf("id=")+3);
serv = y.substring(9,y.indexOf("."));
i++; x = document.getElementsByTagName("table")[i].className;

tr=document.createElement("tr");
td1=document.createElement("td");
td2=document.createElement("td");
link1=document.createElement("a");
link1.setAttribute("target","_blank");
link1.setAttribute("href","http://de"+serv+".twplus.org/file/village/"+villageID+"/");
link1.appendChild(document.createTextNode("TWplus +"));
link2=document.createElement("a");
link2.setAttribute("target","_blank");
link2.setAttribute("href","http://de.twstats.com/de"+serv+"/index.php?page=village&id="+villageID+"/");
link2.appendChild(document.createTextNode(" TWstats"));
td1.appendChild(document.createTextNode("Dorfprofilakte:"));
if(dssup.indexOf(serv) != -1);
td2.appendChild(link1); td2.appendChild(link2);
tr.appendChild(td1);tr.appendChild(td2);
document.getElementsByTagName("table")[i].appendChild(tr);


} showlinks();