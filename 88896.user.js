// ==UserScript==
// @name          DS_Aktenlinks
// @namespace     none
// @version       1.0
// @author        Zaff (original) / Arolas (modified)
// @license       No Distribution!
// @description   Fügt Links zu Spieler- und Stammesakten im Spielerprofil ein
// @include       http://de*.die-staemme.de/game.php?*screen=info_player*id=*
// @include       http://de*.die-staemme.de/guest.php?*screen=info_player*id=*
// ==/UserScript==

function showlinks () {
i=0;x="";dssup="3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80";
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
link1.setAttribute("href","http://www.dsreal.de/index.php?world=de"+serv+"&screen=file&mode=player&id="+id);
link1.appendChild(document.createTextNode(" DsReal "));

link2=document.createElement("a");
link2.setAttribute("target","_blank");
link2.setAttribute("href","http://de"+serv+".twplus.org/file/player/"+id+"/");
link2.appendChild(document.createTextNode(" TwPlus "));

link4=document.createElement("a");
link4.setAttribute("target","_blank");
link4.setAttribute("href","http://de.twstats.com/de"+serv+"/index.php?page=player&id="+id+"/");
link4.appendChild(document.createTextNode(" TwStats "));

link5=document.createElement("a");
link5.setAttribute("target","_blank");
link5.setAttribute("href","http://www.staemme-statistik.de/"+serv+"/"+id+".html");
link5.appendChild(document.createTextNode(" Statistik "));

link6=document.createElement("a");
link6.setAttribute("target","_blank");
link6.setAttribute("href","http://de.my-webtool.com/games/die-staemme/de"+serv+"/users/"+id+"/");
link6.appendChild(document.createTextNode(" Webtool "));

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
link3.appendChild(document.createTextNode("Shiva "));

td1.appendChild(document.createTextNode("Spieler:"));
if(dssup.indexOf(serv) != -1) 

td2.appendChild(link1);
td2.appendChild(link2); 

td2.appendChild(link4); 
td2.appendChild(link5); 
td2.appendChild(link6); 

td2.appendChild(link3); 
link3.appendChild(form);

tr.appendChild(td1);
tr.appendChild(td2);
document.getElementsByTagName("table")[i].appendChild(tr);

if(x==1) {
tr=document.createElement("tr");
td1=document.createElement("td");
td2=document.createElement("td");

link1=document.createElement("a");
link1.setAttribute("target","_blank");
link1.setAttribute("href","http://www.dsreal.de/index.php?screen=file&mode=ally&id="+ally+"&world=de"+serv);
link1.appendChild(document.createTextNode(" DsReal "));

link2=document.createElement("a");
link2.setAttribute("target","_blank");
link2.setAttribute("href","http://de"+serv+".twplus.org/file/ally/"+ally+"/");
link2.appendChild(document.createTextNode(" TwPlus "));

link4=document.createElement("a");
link4.setAttribute("target","_blank");
link4.setAttribute("href","http://de.twstats.com/de"+serv+"/index.php?page=tribe&id="+ally+"/");
link4.appendChild(document.createTextNode("TwStats "));

link5=document.createElement("a");
link5.setAttribute("target","_blank");
link5.setAttribute("href","http://www.staemme-statistik.de/"+serv+"/"+ally+"/");
link5.appendChild(document.createTextNode(" Statistik "));

link6=document.createElement("a");
link6.setAttribute("target","_blank");
link6.setAttribute("href","http://de.my-webtool.com/games/die-staemme/de"+serv+"/allies/"+ally+"/");
link6.appendChild(document.createTextNode(" Webtool "));

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
link3.appendChild(document.createTextNode("Shiva "));

td1.appendChild(document.createTextNode("Stamm:"));
if(dssup.indexOf(serv) != -1) 

td2.appendChild(link1);
td2.appendChild(link2);
 
td2.appendChild(link4);
td2.appendChild(link5);
td2.appendChild(link6);

td2.appendChild(link3); 
link3.appendChild(form);

tr.appendChild(td1);
tr.appendChild(td2);
document.getElementsByTagName("table")[i].appendChild(tr);
}
} showlinks();