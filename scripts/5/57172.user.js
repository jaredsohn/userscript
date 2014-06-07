// ==UserScript==
// @name           Spieleraktenlinks
// @namespace      none
// @include        http://de*.die-staemme.de/game.php?*screen=info_player*id=*
// @include        http://de*.die-staemme.de/guest.php?*screen=info_player*id=*
// ==/UserScript==

function showlinks () {
i=21;x="";
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
link1.setAttribute("href","http://de"+serv+".twplus.org/file/player/"+id+"/");
link1.appendChild(document.createTextNode("TWplus +"));
link2=document.createElement("a");
link2.setAttribute("target","_blank");
link2.setAttribute("href","http://de.twstats.com/de"+serv+"/index.php?page=player&id="+id+"/");
link2.appendChild(document.createTextNode(" TWstats +"));
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
link3.appendChild(document.createTextNode(" Shiva"));
link4=document.createElement("a");
link4.setAttribute("target","_blank");
link4.setAttribute("href","http://www.dsreal.de/index.php?tool=akte&mode=player&world=de"+serv+"&id="+id+"/");
link4.appendChild(document.createTextNode(" DS-Real +"));
link5=document.createElement("a");
link5.setAttribute("target","_blank");
link5.setAttribute("href","http://www.staemme-statistik.de/"+serv+"/"+id+".html");
link5.appendChild(document.createTextNode(" DSS"));
td1.appendChild(document.createTextNode("Spielerakte:"));
td2.appendChild(link1);
td2.appendChild(link2); td2.appendChild(link3); link3.appendChild(form); td2.appendChild(link4); td2.appendChild(link5);
tr.appendChild(td1);tr.appendChild(td2);
document.getElementsByTagName("table")[i].appendChild(tr);
if(x==1) {
tr=document.createElement("tr");
td1=document.createElement("td");
td2=document.createElement("td");
link1=document.createElement("a");
link1.setAttribute("target","_blank");
link1.setAttribute("href","http://de"+serv+".twplus.org/file/ally/"+ally+"/");
link1.appendChild(document.createTextNode("TWplus +"));
link2=document.createElement("a");
link2.setAttribute("target","_blank");
link2.setAttribute("href","http://de.twstats.com/de"+serv+"/index.php?page=tribe&id="+ally+"/");
link2.appendChild(document.createTextNode(" TWstats +"));
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
link3.appendChild(document.createTextNode(" Shiva"));
link4=document.createElement("a");
link4.setAttribute("target","_blank");
link4.setAttribute("href","http://www.dsreal.de/index.php?tool=akte&mode=ally&world=de"+serv+"&id="+ally+"/");
link4.appendChild(document.createTextNode(" DS-Real +"));
link5=document.createElement("a");
link5.setAttribute("target","_blank");
link5.setAttribute("href","http://www.staemme-statistik.de/"+serv+"/"+ally+"//");
link5.appendChild(document.createTextNode(" DSS"));
td1.appendChild(document.createTextNode("Stammesakte:"));
td2.appendChild(link1);
td2.appendChild(link2); td2.appendChild(link3); link3.appendChild(form); td2.appendChild(link4); td2.appendChild(link5);
tr.appendChild(td1);tr.appendChild(td2);
document.getElementsByTagName("table")[i].appendChild(tr);
}
} showlinks();