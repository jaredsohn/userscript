// ==UserScript==
// @name           Spieleraktenlinks
// @namespace      none
// @include        http://de*.die-staemme.de/game.php?*screen=info_player*id=*
// @include        http://de*.die-staemme.de/guest.php?*screen=info_player*id=*
// ==/UserScript==

function showlinks () {
i=0;x="";dssup="10 14 15 16 17 18 19 20 21 22 23 24";
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
link1.setAttribute("href","http://dsreal.de/index.php?tool=akte&mode=player&world=de"+serv+"&id="+id);
link1.appendChild(document.createTextNode(" DsReal "));
link2=document.createElement("a");
link2.setAttribute("target","_blank");
link2.setAttribute("href","http://de"+serv+".twplus.org/file/player/"+id+"/");
link2.appendChild(document.createTextNode(" Tw+ "));
form=document.createElement("form");
form.setAttribute("method","post");
form.setAttribute("action","http://looking.at/staemme/perf.php");
form.setAttribute("target","_blank");
form.setAttribute("id","shivaTribe");
shTribe=document.createElement("input");
shTribe.setAttribute("type","hidden");
shTribe.setAttribute("name","fromPlayerId");
shTribe.setAttribute("value",id);
shServ=document.createElement("input");
shServ.setAttribute("type","hidden");
shServ.setAttribute("name","server");
shServ.setAttribute("value",serv);
shAlly=document.createElement("input");
shAlly.setAttribute("type","hidden");
shAlly.setAttribute("name","fromAlly");
if(x==1) shAlly.setAttribute("value",ally); else shAlly.setAttribute("value","0"); 
form.appendChild(shTribe);
form.appendChild(shServ);
form.appendChild(shAlly);
link3=document.createElement("a");
link3.setAttribute("href","javascript:this.document.getElementById('shivaTribe').submit()");
link3.appendChild(document.createTextNode("Shiva"));
td1.appendChild(document.createTextNode("Spielerakte:"));
if(dssup.indexOf(serv) != -1) td2.appendChild(link1);
td2.appendChild(link2); td2.appendChild(link3); link3.appendChild(form);
tr.appendChild(td1);tr.appendChild(td2);
document.getElementsByTagName("table")[i].appendChild(tr);
if(x==1) {
tr=document.createElement("tr");
td1=document.createElement("td");
td2=document.createElement("td");
link1=document.createElement("a");
link1.setAttribute("target","_blank");
link1.setAttribute("href","http://dsreal.de/index.php?tool=akte&mode=ally&world=de"+serv+"&id="+ally);
link1.appendChild(document.createTextNode(" DsReal "));
link2=document.createElement("a");
link2.setAttribute("target","_blank");
link2.setAttribute("href","http://de"+serv+".twplus.org/file/ally/"+ally+"/");
link2.appendChild(document.createTextNode(" Tw+ "));
form=document.createElement("form");
form.setAttribute("method","post");
form.setAttribute("action","http://looking.at/staemme/perfally.php");
form.setAttribute("target","_blank");
form.setAttribute("id","shivaAlly");
shServ=document.createElement("input");
shServ.setAttribute("type","hidden");
shServ.setAttribute("name","server");
shServ.setAttribute("value",serv);
shAlly=document.createElement("input");
shAlly.setAttribute("type","hidden");
shAlly.setAttribute("name","fromAlly");
shAlly.setAttribute("value",ally);
form.appendChild(shAlly);
form.appendChild(shServ);
link3=document.createElement("a");
link3.setAttribute("href","javascript:document.getElementById('shivaAlly').submit()");
link3.appendChild(document.createTextNode("Shiva"));
td1.appendChild(document.createTextNode("Stammesakte:"));
if(dssup.indexOf(serv) != -1) td2.appendChild(link1);
td2.appendChild(link2); td2.appendChild(link3); link3.appendChild(form);
tr.appendChild(td1);tr.appendChild(td2);
document.getElementsByTagName("table")[i].appendChild(tr);
}
} showlinks();