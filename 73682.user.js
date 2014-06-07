// ==UserScript==
// @name           Sandkuchen
// @namespace      sdgsdgserg
// @include        http://de*.die-staemme.de/game.php*screen=info_command&id=*&type=*
// ==/UserScript==

var herkunft = document.getElementById("label").parentNode.parentNode.parentNode.getElementsByTagName("tr")[2].getElementsByTagName("td")[1].firstChild.innerHTML.search(/(\d+)\|(\d+)/);
herkunft_x = RegExp.$1;
herkunft_y = RegExp.$2;

var ziel = document.getElementById("label").parentNode.parentNode.parentNode.getElementsByTagName("tr")[4].getElementsByTagName("td")[1].firstChild.innerHTML.search(/(\d+)\|(\d+)/);
ziel_x = RegExp.$1;
ziel_y = RegExp.$2;

var abstand = Math.sqrt(Math.pow(ziel_x-herkunft_x,2)+Math.pow(ziel_y-herkunft_y,2));

var speer_axt_bogen = abstand*18*60;
var schwert = abstand*22*60;
var spy = speer_axt_bogen/2;
var pala_lkv_bbogen = abstand*10*60;
var skv = schwert/2;
var ramm_kata = pala_lkv_bbogen*3;
var ag = abstand*35*60;

speer_axt_bogen_stunden = Math.floor(speer_axt_bogen/60/60);
speer_axt_bogen_minuten = Math.floor(speer_axt_bogen/60-speer_axt_bogen_stunden*60);
speer_axt_bogen_sekunden = Math.round(speer_axt_bogen-speer_axt_bogen_minuten*60-speer_axt_bogen_stunden*60*60);
if((speer_axt_bogen_sekunden+"").length == 1)
{
 speer_axt_bogen_sekunden = "0"+speer_axt_bogen_sekunden;
}
if((speer_axt_bogen_minuten+"").length == 1)
{
 speer_axt_bogen_minuten = "0"+speer_axt_bogen_minuten;
}
if((speer_axt_bogen_stunden+"").length == 1)
{
 speer_axt_bogen_stunden = "0"+speer_axt_bogen_stunden;
}
speer_axt_bogen = speer_axt_bogen_stunden+":"+speer_axt_bogen_minuten+":"+speer_axt_bogen_sekunden;

schwert_stunden = Math.floor(schwert/60/60);
schwert_minuten = Math.floor(schwert/60-schwert_stunden*60);
schwert_sekunden = Math.round(schwert-schwert_minuten*60-schwert_stunden*60*60);
if((schwert_sekunden+"").length == 1)
{
 schwert_sekunden = "0"+schwert_sekunden;
}
if((schwert_minuten+"").length == 1)
{
 schwert_minuten = "0"+schwert_minuten;
}
if((schwert_stunden+"").length == 1)
{
 schwert_stunden = "0"+schwert_stunden;
}
schwert = schwert_stunden+":"+schwert_minuten+":"+schwert_sekunden;

spy_stunden = Math.floor(spy/60/60);
spy_minuten = Math.floor(spy/60-spy_stunden*60);
spy_sekunden = Math.round(spy-spy_minuten*60-spy_stunden*60*60);
if((spy_sekunden+"").length == 1)
{
 spy_sekunden = "0"+spy_sekunden;
}
if((spy_minuten+"").length == 1)
{
 spy_minuten = "0"+spy_minuten;
}
if((spy_stunden+"").length == 1)
{
 spy_stunden = "0"+spy_stunden;
}
spy = spy_stunden+":"+spy_minuten+":"+spy_sekunden;

pala_lkv_bbogen_stunden = Math.floor(pala_lkv_bbogen/60/60);
pala_lkv_bbogen_minuten = Math.floor(pala_lkv_bbogen/60-pala_lkv_bbogen_stunden*60);
pala_lkv_bbogen_sekunden = Math.round(pala_lkv_bbogen-pala_lkv_bbogen_minuten*60-pala_lkv_bbogen_stunden*60*60);
if((pala_lkv_bbogen_sekunden+"").length == 1)
{
 pala_lkv_bbogen_sekunden = "0"+pala_lkv_bbogen_sekunden;
}
if((pala_lkv_bbogen_minuten+"").length == 1)
{
 pala_lkv_bbogen_minuten = "0"+pala_lkv_bbogen_minuten;
}
if((pala_lkv_bbogen_stunden+"").length == 1)
{
 pala_lkv_bbogen_stunden = "0"+pala_lkv_bbogen_stunden;
}
pala_lkv_bbogen = pala_lkv_bbogen_stunden+":"+pala_lkv_bbogen_minuten+":"+pala_lkv_bbogen_sekunden;

skv_stunden = Math.floor(skv/60/60);
skv_minuten = Math.floor(skv/60-skv_stunden*60);
skv_sekunden = Math.round(skv-skv_minuten*60-skv_stunden*60*60);
if((skv_sekunden+"").length == 1)
{
 skv_sekunden = "0"+skv_sekunden;
}
if((skv_minuten+"").length == 1)
{
 skv_minuten = "0"+skv_minuten;
}
if((skv_stunden+"").length == 1)
{
 skv_stunden = "0"+skv_stunden;
}
skv = skv_stunden+":"+skv_minuten+":"+skv_sekunden;

ramm_kata_stunden = Math.floor(ramm_kata/60/60);
ramm_kata_minuten = Math.floor(ramm_kata/60-ramm_kata_stunden*60);
ramm_kata_sekunden = Math.round(ramm_kata-ramm_kata_minuten*60-ramm_kata_stunden*60*60);
if((ramm_kata_sekunden+"").length == 1)
{
 ramm_kata_sekunden = "0"+ramm_kata_sekunden;
}
if((ramm_kata_minuten+"").length == 1)
{
 ramm_kata_minuten = "0"+ramm_kata_minuten;
}
if((ramm_kata_stunden+"").length == 1)
{
 ramm_kata_stunden = "0"+ramm_kata_stunden;
}
ramm_kata = ramm_kata_stunden+":"+ramm_kata_minuten+":"+ramm_kata_sekunden;

ag_stunden = Math.floor(ag/60/60);
ag_minuten = Math.floor(ag/60-ag_stunden*60);
ag_sekunden = Math.round(ag-ag_minuten*60-ag_stunden*60*60);
if((ag_sekunden+"").length == 1)
{
 ag_sekunden = "0"+ag_sekunden;
}
if((ag_minuten+"").length == 1)
{
 ag_minuten = "0"+ag_minuten;
}
if((ag_stunden+"").length == 1)
{
 ag_stunden = "0"+ag_stunden;
}
ag = ag_stunden+":"+ag_minuten+":"+ag_sekunden;


var weg_zeile = document.createElement("tr");
var weg_spalte = document.createElement("td");
var da_zeile = document.createElement("tr");
var da_spalte = document.createElement("td");
var weg = document.createElement("a");
var da = document.createElement("a");
da.setAttribute("onclick","javascript:for(var i=0;i<document.getElementsByName('Laufzeiten_von_David').length;i++){document.getElementsByName('Laufzeiten_von_David')[i].style.display='';}");
da.innerHTML = "<center>Laufzeiten anzeigen</center>";
da_spalte.setAttribute("colspan","3");
da.href = "#";
weg.setAttribute("onclick","javascript:for(var i=0;i<document.getElementsByName('Laufzeiten_von_David').length;i++){document.getElementsByName('Laufzeiten_von_David')[i].style.display='none';}");
weg.innerHTML = "<center>Laufzeiten verstecken</center>";
weg_spalte.setAttribute("colspan","3");
weg.href = "#";
da_spalte.appendChild(da);
da_zeile.appendChild(da_spalte);
document.getElementById("label").parentNode.parentNode.parentNode.appendChild(da_zeile);
weg_spalte.appendChild(weg);
weg_zeile.appendChild(weg_spalte);
document.getElementById("label").parentNode.parentNode.parentNode.appendChild(weg_zeile);

var spy2 = document.createElement("tr");
spy2.setAttribute("name","Laufzeiten_von_David");
spy2.setAttribute("style", "display:none;");
var spyname = document.createElement("td");
var spyzeit = document.createElement("td");
spyname.innerHTML = "Späher:";
spyname.setAttribute("colspan","2");
spyzeit.innerHTML = spy;
spy2.appendChild(spyname);
spy2.appendChild(spyzeit);
document.getElementById("label").parentNode.parentNode.parentNode.appendChild(spy2);



var pala = document.createElement("tr");
pala.setAttribute("name","Laufzeiten_von_David");
pala.setAttribute("style", "display:none;");
var palaname = document.createElement("td");
var palazeit = document.createElement("td");
palaname.innerHTML = "Paladin:";
palaname.setAttribute("colspan","2");
palazeit.innerHTML = pala_lkv_bbogen;
pala.appendChild(palaname);
pala.appendChild(palazeit);
document.getElementById("label").parentNode.parentNode.parentNode.appendChild(pala);



var lkv = document.createElement("tr");
lkv.setAttribute("name","Laufzeiten_von_David");
lkv.setAttribute("style", "display:none;");
var lkvname = document.createElement("td");
var lkvzeit = document.createElement("td");
lkvname.innerHTML = "Leichte Kavallerie:";
lkvname.setAttribute("colspan","2");
lkvzeit.innerHTML = pala_lkv_bbogen;
lkv.appendChild(lkvname);
lkv.appendChild(lkvzeit);
document.getElementById("label").parentNode.parentNode.parentNode.appendChild(lkv);



var bbogen = document.createElement("tr");
bbogen.setAttribute("name","Laufzeiten_von_David");
bbogen.setAttribute("style", "display:none;");
var bbogenname = document.createElement("td");
var bbogenzeit = document.createElement("td");
bbogenname.innerHTML = "Berittene Bogenschützen:";
bbogenname.setAttribute("colspan","2");
bbogenzeit.innerHTML = pala_lkv_bbogen;
bbogen.appendChild(bbogenname);
bbogen.appendChild(bbogenzeit);
document.getElementById("label").parentNode.parentNode.parentNode.appendChild(bbogen);



var skv2 = document.createElement("tr");
skv2.setAttribute("name","Laufzeiten_von_David");
skv2.setAttribute("style", "display:none;");
var skvname = document.createElement("td");
var skvzeit = document.createElement("td");
skvname.innerHTML = "Schwere Kavallerie:";
skvname.setAttribute("colspan","2");
skvzeit.innerHTML = skv;
skv2.appendChild(skvname);
skv2.appendChild(skvzeit);
document.getElementById("label").parentNode.parentNode.parentNode.appendChild(skv2);



var speer = document.createElement("tr");
speer.setAttribute("name","Laufzeiten_von_David");
speer.setAttribute("style", "display:none;");
var speername = document.createElement("td");
var speerzeit = document.createElement("td");
speername.innerHTML = "Speerträger:";
speername.setAttribute("colspan","2");
speerzeit.innerHTML = speer_axt_bogen;
speer.appendChild(speername);
speer.appendChild(speerzeit);
document.getElementById("label").parentNode.parentNode.parentNode.appendChild(speer);



var axt2 = document.createElement("tr");
axt2.setAttribute("name","Laufzeiten_von_David");
axt2.setAttribute("style", "display:none;");
var axt2name = document.createElement("td");
var axt2zeit = document.createElement("td");
axt2name.innerHTML = "Axtkämpfer:";
axt2name.setAttribute("colspan","2");
axt2zeit.innerHTML = speer_axt_bogen;
axt2.appendChild(axt2name);
axt2.appendChild(axt2zeit);
document.getElementById("label").parentNode.parentNode.parentNode.appendChild(axt2);



var bogen = document.createElement("tr");
bogen.setAttribute("name","Laufzeiten_von_David");
bogen.setAttribute("style", "display:none;");
var bogenname = document.createElement("td");
var bogenzeit = document.createElement("td");
bogenname.innerHTML = "Bogenschützen:";
bogenname.setAttribute("colspan","2");
bogenzeit.innerHTML = speer_axt_bogen;
bogen.appendChild(bogenname);
bogen.appendChild(bogenzeit);
document.getElementById("label").parentNode.parentNode.parentNode.appendChild(bogen);



var schwert2 = document.createElement("tr");
schwert2.setAttribute("name","Laufzeiten_von_David");
schwert2.setAttribute("style", "display:none;");
var schwert2name = document.createElement("td");
var schwert2zeit = document.createElement("td");
schwert2name.innerHTML = "Schwertkämpfer:";
schwert2name.setAttribute("colspan","2");
schwert2zeit.innerHTML = schwert;
schwert2.appendChild(schwert2name);
schwert2.appendChild(schwert2zeit);
document.getElementById("label").parentNode.parentNode.parentNode.appendChild(schwert2);



var ramm = document.createElement("tr");
ramm.setAttribute("name","Laufzeiten_von_David");
ramm.setAttribute("style", "display:none;");
var rammname = document.createElement("td");
var rammzeit = document.createElement("td");
rammname.innerHTML = "Rammböcke:";
rammname.setAttribute("colspan","2");
rammzeit.innerHTML = ramm_kata;
ramm.appendChild(rammname);
ramm.appendChild(rammzeit);
document.getElementById("label").parentNode.parentNode.parentNode.appendChild(ramm);



var kata = document.createElement("tr");
kata.setAttribute("name","Laufzeiten_von_David");
kata.setAttribute("style", "display:none;");
var kataname = document.createElement("td");
var katazeit = document.createElement("td");
kataname.innerHTML = "Katapulte:";
kataname.setAttribute("colspan","2");
katazeit.innerHTML = ramm_kata;
kata.appendChild(kataname);
kata.appendChild(katazeit);
document.getElementById("label").parentNode.parentNode.parentNode.appendChild(kata);



var ag2 = document.createElement("tr");
ag2.setAttribute("name","Laufzeiten_von_David");
ag2.setAttribute("style", "display:none;");
var ag2name = document.createElement("td");
var ag2zeit = document.createElement("td");
ag2name.innerHTML = "Adelsgeschlecht:";
ag2name.setAttribute("colspan","2");
ag2zeit.innerHTML = ag;
ag2.appendChild(ag2name);
ag2.appendChild(ag2zeit);
document.getElementById("label").parentNode.parentNode.parentNode.appendChild(ag2);