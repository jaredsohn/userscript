// ==UserScript==
// @name           Stammesaktenlinks
// @namespace      none
// @include        http://de*.die-staemme.de/game.php?*screen=info_ally*id=*
// @include        http://de*.die-staemme.de/guest.php?*screen=info_ally*id=*
// ==/UserScript==

function showlinks () {
i=21;x="";
url = document.location.href

// Welt:
var welt = url.split('.')[0].replace('http://de', '');

// stamm-ID:
var stamm_ID = url.split('id=')[1].split('&')[0];

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
if(x==1) {
tr=document.createElement("tr");
td1=document.createElement("td");
td2=document.createElement("td");
link1=document.createElement("a");
link1.setAttribute("target","_blank");
link1.setAttribute("href","http://de"+welt+".twplus.org/file/ally/"+stamm_ID+"/");
link1.appendChild(document.createTextNode("TWplus +"));
link2=document.createElement("a");
link2.setAttribute("target","_blank");
link2.setAttribute("href","http://de.twstats.com/de"+welt+"/index.php?page=tribe&id="+stamm_ID+"/");
link2.appendChild(document.createTextNode(" TWstats +"));
form=document.createElement("form");
form.setAttribute("method","post");
form.setAttribute("action","http://looking.at/staemme/perfally.php");
form.setAttribute("target","_blank");
form.setAttribute("id","shivaStamm_ID");
shWelt=document.createElement("input");
shWelt.setAttribute("type","hidden");
shWelt.setAttribute("name","server");
shWelt.setAttribute("value",welt);
shStamm_ID=document.createElement("input");
shStamm_ID.setAttribute("type","hidden");
shStamm_ID.setAttribute("name","fromAlly");
shStamm_ID.setAttribute("value",stamm_ID);
form.appendChild(shStamm_ID);
form.appendChild(shWelt);
link3=document.createElement("a");
link3.setAttribute("href","javascript:document.getElementById('shivaStamm_ID').submit()");
link3.appendChild(document.createTextNode(" Shiva"));
link4=document.createElement("a");
link4.setAttribute("target","_blank");
link4.setAttribute("href","http://www.dsreal.de/index.php?tool=akte&mode=ally&world=de"+welt+"&id="+stamm_ID+"/");
link4.appendChild(document.createTextNode(" DS-Real +"));
link5=document.createElement("a");
link5.setAttribute("target","_blank");
link5.setAttribute("href","http://www.staemme-statistik.de/"+welt+"/"+stamm_ID+"/");
link5.appendChild(document.createTextNode(" DSS"));
td1.appendChild(document.createTextNode("Stammesakte:"));
td2.appendChild(link1);
td2.appendChild(link2); td2.appendChild(link3); link3.appendChild(form); td2.appendChild(link4); td2.appendChild(link5);
tr.appendChild(td1);tr.appendChild(td2);
document.getElementsByTagName("table")[i].appendChild(tr);
}
} showlinks();