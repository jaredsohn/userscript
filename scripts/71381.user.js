// ==UserScript==
// @name           Keks
// @namespace      sdgsdgserg
// @include        *.die-staemme.*game.php*
// ==/UserScript==


if(this.location.href.search(/screen=overview/) != -1 && document.getElementById("ds_body").innerHTML.search(/zur graphischen Dorfübersicht/) != -1)
{
var suche;

suche = document.getElementsByClassName("vis")[2].innerHTML.search(/(\d+)<\/strong> Speerträger/);
if(suche != -1) { GM_setValue("speer",RegExp.$1); }
else { GM_setValue("speer", "0"); }



suche = document.getElementsByClassName("vis")[2].innerHTML.search(/(\d+)<\/strong> Schwertkämpfer/);
if(suche != -1) { GM_setValue("schwert",RegExp.$1); }
else { GM_setValue("schwert", "0"); }



suche = document.getElementsByClassName("vis")[2].innerHTML.search(/(\d+)<\/strong> Bogenschütze/);
if(suche != -1) { GM_setValue("bogen",RegExp.$1); }
else { GM_setValue("bogen", "0"); }



suche = document.getElementsByClassName("vis")[2].innerHTML.search(/(\d+)<\/strong> Späher/);
if(suche != -1) { GM_setValue("spy",RegExp.$1); }
else { GM_setValue("spy", "0"); }



suche = document.getElementsByClassName("vis")[2].innerHTML.search(/(\d+)<\/strong> Katapult/);
if(suche != -1) { GM_setValue("kata",RegExp.$1); }
else { GM_setValue("kata", "0"); }



suche = document.getElementsByClassName("vis")[2].innerHTML.search(/(\d+)<\/strong> Schwere Kavallerie/);
if(suche != -1) { GM_setValue("skv",RegExp.$1); }
else { GM_setValue("skv", "0"); }



suche = document.getElementsByClassName("vis")[2].innerHTML.search(/(\d+)<\/strong> Paladin/);
if(suche != -1) { GM_setValue("pala",RegExp.$1); }
else { GM_setValue("pala", "0"); }



suche = document.getElementById("ds_body").innerHTML.search(/Wall<\/a> \(Stufe (\d+)\)/);
GM_setValue("wall",RegExp.$1);


document.getElementsByClassName("vis")[2].innerHTML += "<tr><td><b>Werte gespeichert</b></td></tr>";

for(var i=1;i>0;i++)
{
 if(document.getElementsByClassName("vis")[i].innerHTML.search(/Glauben/) != -1)
 {
  var glaub = document.getElementsByClassName("vis")[i].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].innerHTML;
  i = -1;
 }
}
GM_setValue("glaube", glaub);
}

else if(document.getElementById("ds_body").innerHTML.search(/zur klassischen Dorfübersicht/) != -1)
{
document.getElementsByClassName("vis")[1].innerHTML += "<tr><td><b>Um Werte zu speichen, bitte zur klassischen Übersicht wechseln</b></td></tr>";
}

else if(this.location.href.search(/de.*\.die-staemme\.de\/game\.php.*screen=info_command.*type=other/) != -1)
{
herkunft = document.getElementsByClassName("vis")[0].getElementsByTagName("tr")[2].getElementsByTagName("td")[1].innerHTML;
var her = /\((\d+)\|(\d+)\)/;
var Ergebnis = her.exec(herkunft);
var adorf = "[coord]"+Ergebnis[1]+"|"+Ergebnis[2]+"[/coord]";
var ax = Ergebnis[1];
var ay = Ergebnis[2];

herkunft = document.getElementsByClassName("vis")[0].getElementsByTagName("tr")[4].getElementsByTagName("td")[1].innerHTML;
her = /\((\d+)\|(\d+)\)/;
Ergebnis = her.exec(herkunft);
var vdorf = "[coord]"+Ergebnis[1]+"|"+Ergebnis[2]+"[/coord]";
var vx = Ergebnis[1];
var vy = Ergebnis[2];

herkunft = document.getElementsByClassName("vis")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[2].innerHTML;
her = />(.*)</;
Ergebnis = her.exec(herkunft);
var angreifer = "[player]"+Ergebnis[1]+"[/player]";

herkunft = document.getElementsByClassName("vis")[0].getElementsByTagName("tr")[3].getElementsByTagName("td")[2].innerHTML;
her = />(.*)</;
Ergebnis = her.exec(herkunft);
var verteidiger = "[player]"+Ergebnis[1]+"[/player]";

var ankunft = document.getElementsByClassName("vis")[0].getElementsByTagName("tr")[6].getElementsByTagName("td")[1].innerHTML;
if(ankunft.search(/timer/) != -1)
{
ankunft = document.getElementsByClassName("vis")[0].getElementsByTagName("tr")[5].getElementsByTagName("td")[1].innerHTML;
}
ankunft = ankunft.replace(/<span class="small hidden">/,"[color=#666666]");
ankunft = ankunft.replace(/<\/.*>/,"[/color]");


var zeitbisankunft = document.getElementsByClassName("vis")[0].getElementsByTagName("tr")[6].getElementsByTagName("td")[1].innerHTML;
if(zeitbisankunft.search(/timer/) == -1)
{
 zeitbisankunft = document.getElementsByClassName("vis")[0].getElementsByTagName("tr")[7].getElementsByTagName("td")[1].innerHTML;
}
zeitbisankunft = zeitbisankunft.replace(/<span class="timer">/,"");
zeitbisankunft = zeitbisankunft.replace(/<\/span>/,"");
zba = zeitbisankunft.split(":");
zba = eval(parseInt(zba[2])+parseInt(zba[1])*60+parseInt(zba[0])*60*60);



var speerl = eval(Math.sqrt(Math.pow(vx-ax,2)+Math.pow(vy-ay,2))*18);
var schwertl = eval(Math.sqrt(Math.pow(vx-ax,2)+Math.pow(vy-ay,2))*22);
var axtl = eval(Math.sqrt(Math.pow(vx-ax,2)+Math.pow(vy-ay,2))*18);
var bogenl = eval(Math.sqrt(Math.pow(vx-ax,2)+Math.pow(vy-ay,2))*18);
var spyl = eval(Math.sqrt(Math.pow(vx-ax,2)+Math.pow(vy-ay,2))*9);
var lkvl = eval(Math.sqrt(Math.pow(vx-ax,2)+Math.pow(vy-ay,2))*10);
var bbogenl = eval(Math.sqrt(Math.pow(vx-ax,2)+Math.pow(vy-ay,2))*10);
var skvl = eval(Math.sqrt(Math.pow(vx-ax,2)+Math.pow(vy-ay,2))*11);
var ramml = eval(Math.sqrt(Math.pow(vx-ax,2)+Math.pow(vy-ay,2))*30);
var katal = eval(Math.sqrt(Math.pow(vx-ax,2)+Math.pow(vy-ay,2))*30);
var palal = eval(Math.sqrt(Math.pow(vx-ax,2)+Math.pow(vy-ay,2))*10);
var agl = eval(Math.sqrt(Math.pow(vx-ax,2)+Math.pow(vy-ay,2))*35);

speerlm = parseInt(speerl*60);
schwertlm = parseInt(schwertl*60);
axtlm = parseInt(axtl*60);
bogenlm = parseInt(bogenl*60);
spylm = parseInt(spyl*60);
lkvlm = parseInt(lkvl*60);
bbogenlm = parseInt(bbogenl*60);
skvlm = parseInt(skvl*60);
rammlm = parseInt(ramml*60);
katalm = parseInt(katal*60);
palalm = parseInt(palal*60);
aglm = parseInt(agl*60);




speerh = Math.floor((speerl*60)/3600);
speerm = Math.floor((speerl*60)/60-(speerh*60));
speers = Math.round((speerl*60)%60);
if(speerh < 10) { speerh = "0"+speerh; }
if(speerm < 10) { speerm = "0"+speerm; }
if(speers < 10) { speers = "0"+speers; }
speerl = speerh+":"+speerm+":"+speers;

schwerth = Math.floor((schwertl*60)/3600);
schwertm = Math.floor((schwertl*60)/60-(schwerth*60));
schwerts = Math.round((schwertl*60)%60);
if(schwerth < 10) { schwerth = "0"+schwerth; }
if(schwertm < 10) { schwertm = "0"+schwertm; }
if(schwerts < 10) { schwerts = "0"+schwerts; }
schwertl = schwerth+":"+schwertm+":"+schwerts;


axth = Math.floor((axtl*60)/3600);
axtm = Math.floor((axtl*60)/60-(axth*60));
axts = Math.round((axtl*60)%60);
if(axth < 10) { axth = "0"+axth; }
if(axtm < 10) { axtm = "0"+axtm; }
if(axts < 10) { axts = "0"+axts; }
axtl = axth+":"+axtm+":"+axts;

bogenh = Math.floor((bogenl*60)/3600);
bogenm = Math.floor((bogenl*60)/60-(bogenh*60));
bogens = Math.round((bogenl*60)%60);
if(bogenh < 10) { bogenh = "0"+bogenh; }
if(bogenm < 10) { bogenm = "0"+bogenm; }
if(bogens < 10) { bogens = "0"+bogens; }
bogenl = bogenh+":"+bogenm+":"+bogens;

spyh = Math.floor((spyl*60)/3600);
spym = Math.floor((spyl*60)/60-(spyh*60));
spys = Math.round((spyl*60)%60);
if(spyh < 10) { spyh = "0"+spyh; }
if(spym < 10) { spym = "0"+spym; }
if(spys < 10) { spys = "0"+spys; }
spyl = spyh+":"+spym+":"+spys;

lkvh = Math.floor((lkvl*60)/3600);
lkvm = Math.floor((lkvl*60)/60-(lkvh*60));
lkvs = Math.round((lkvl*60)%60);
if(lkvh < 10) { lkvh = "0"+lkvh; }
if(lkvm < 10) { lkvm = "0"+lkvm; }
if(lkvs < 10) { lkvs = "0"+lkvs; }
lkvl = lkvh+":"+lkvm+":"+lkvs;

bbogenh = Math.floor((bbogenl*60)/3600);
bbogenm = Math.floor((bbogenl*60)/60-(bbogenh*60));
bbogens = Math.round((bbogenl*60)%60);
if(bbogenh < 10) { bbogenh = "0"+bbogenh; }
if(bbogenm < 10) { bbogenm = "0"+bbogenm; }
if(bbogens < 10) { bbogens = "0"+bbogens; }
bbogenl = bbogenh+":"+bbogenm+":"+bbogens;

skvh = Math.floor((skvl*60)/3600);
skvm = Math.floor((skvl*60)/60-(skvh*60));
skvs = Math.round((skvl*60)%60);
if(skvh < 10) { skvh = "0"+skvh; }
if(skvm < 10) { skvm = "0"+skvm; }
if(skvs < 10) { skvs = "0"+skvs; }
skvl = skvh+":"+skvm+":"+skvs;

rammh = Math.floor((ramml*60)/3600);
rammm = Math.floor((ramml*60)/60-(rammh*60));
ramms = Math.round((ramml*60)%60);
if(rammh < 10) { rammh = "0"+rammh; }
if(rammm < 10) { rammm = "0"+rammm; }
if(ramms < 10) { ramms = "0"+ramms; }
ramml = rammh+":"+rammm+":"+ramms;

katah = Math.floor((katal*60)/3600);
katam = Math.floor((katal*60)/60-(katah*60));
katas = Math.round((katal*60)%60);
if(katah < 10) { katah = "0"+katah; }
if(katam < 10) { katam = "0"+katam; }
if(katas < 10) { katas = "0"+katas; }
katal = katah+":"+katam+":"+katas;

palah = Math.floor((palal*60)/3600);
palam = Math.floor((palal*60)/60-(palah*60));
palas = Math.round((palal*60)%60);
if(palah < 10) { palah = "0"+palah; }
if(palam < 10) { palam = "0"+palam; }
if(palas < 10) { palas = "0"+palas; }
palal = palah+":"+palam+":"+palas;

agh = Math.floor((agl*60)/3600);
agm = Math.floor((agl*60)/60-(agh*60));
ags = Math.round((agl*60)%60);
if(agh < 10) { agh = "0"+agh; }
if(agm < 10) { agm = "0"+agm; }
if(ags < 10) { ags = "0"+ags; }
agl = agh+":"+agm+":"+ags;


var moegliche = new Array();

if(spylm >= zba) { moegliche[moegliche.length] = "[unit]spy[/unit]Späher [i]"+spyl+"[/i]"; }
if(lkvlm >= zba) { moegliche[moegliche.length] = "[unit]light[/unit]Leichte Kavallerie [i]"+lkvl+"[/i]"; }
if(bbogenlm >= zba) { moegliche[moegliche.length] = "[unit]marcher[/unit]Berittene Bogenschützen [i]"+bbogenl+"[/i]"; }
if(palalm >= zba) { moegliche[moegliche.length] = "[unit]knight[/unit]Paladin/e [i]"+palal+"[/i]"; }
if(skvlm >= zba) { moegliche[moegliche.length] = "[unit]heavy[/unit]Schwere Kavallerie [i]"+skvl+"[/i]"; }
if(axtlm >= zba) { moegliche[moegliche.length] = "[unit]axe[/unit]Axtkämpfer [i]"+axtl+"[/i]"; }
if(speerlm >= zba) { moegliche[moegliche.length] = "[unit]spear[/unit]Speerträger [i]"+speerl+"[/i]"; }
if(bogenlm >= zba) { moegliche[moegliche.length] = "[unit]archer[/unit]Bogenschützen [i]"+bogenl+"[/i]"; }
if(schwertlm >= zba) { moegliche[moegliche.length] = "[unit]sword[/unit]Schwertkämpfer [i]"+schwertl+"[/i]"; }
if(rammlm >= zba) { moegliche[moegliche.length] = "[unit]ram[/unit]Rammböcke [i]"+ramml+"[/i]"; }
if(katalm >= zba) { moegliche[moegliche.length] = "[unit]catapult[/unit]Katapulte [i]"+katal+"[/i]"; }
if(aglm >= zba) { moegliche[moegliche.length] = "[unit]snob[/unit]Adelsgeschlecht [i]"+agl+"[/i]"; }


moegliche = moegliche.join("\n");



var pala = "Paladine";
var bogen = "Bogenschützen";
var kata = "Katapulte";

if(GM_getValue("pala") == 1)
{
pala = "Paladin";
}
if(GM_getValue("bogen") == 1)
{
pala = "Bogenschütze";
}
if(GM_getValue("kata") == 1)
{
pala = "Katapult";
}

var glaube;
if(parseInt(GM_getValue("glaube")) >= 1)
{
 glaube = "[u]Der Verteidiger ist gläubig[/u]";
}
else
{
 glaube = "[u]Der Verteidiger ist [b]nicht[/b] gläubig[/u]";
}

var anfrage = "[b]Angreifendes Dorf: "+adorf;
anfrage += "\nAngreifer: "+angreifer;
anfrage += "\n\nAngegriffenes Dorf: "+vdorf;
anfrage += "\nVerteidiger: "+verteidiger+"[/b]";
anfrage += "\n\n\n[u]Wall ist auf Stufe "+GM_getValue("wall")+"[/u]";
anfrage += "\n"+glaube;
anfrage += "\n\n[b]Vorhandene Deff-Truppen:[/b]";
anfrage += "\n"+GM_getValue("speer")+" Speerträger";
anfrage += "\n"+GM_getValue("schwert")+" Schwertkämpfer";
anfrage += "\n"+GM_getValue("bogen")+" "+bogen;
anfrage += "\n"+GM_getValue("spy")+" Späher";
anfrage += "\n"+GM_getValue("skv")+" Schwere Kavallerie";
anfrage += "\n"+GM_getValue("kata")+" "+kata;
anfrage += "\n"+GM_getValue("pala")+" "+pala;
anfrage += "\n\n[b][u]Ankunft um "+ankunft+"[/u][/b]";
anfrage += "\nJetzige Zeit: "+document.getElementById("serverTime").innerHTML+" Uhr";
anfrage += "\nZeit bis zum Eintreffen: "+zeitbisankunft;
anfrage += "\n\n\n[u]Mögliche Truppen:[/u]\n";
anfrage += "[b]"+moegliche+"[/b]";
anfrage += "\n\n\n[i]Laufzeiten:[/i]";
anfrage += "\n[spoiler][unit]spy[/unit]Späher: "+spyl;
anfrage += "\n[unit]light[/unit]Leichte Kavallerie: "+lkvl;
anfrage += "\n[unit]marcher[/unit]Berittene Bogenschützen: "+bbogenl;
anfrage += "\n[unit]knight[/unit]Paladine: "+palal;
anfrage += "\n[unit]heavy[/unit]Schwere Kavallerie: "+skvl;
anfrage += "\n[unit]axe[/unit]Axtkämpfer: "+axtl;
anfrage += "\n[unit]spear[/unit]Speerträger: "+speerl;
anfrage += "\n[unit]archer[/unit]Bogenschützen: "+bogenl;
anfrage += "\n[unit]sword[/unit]Schwertkämpfer: "+schwertl;
anfrage += "\n[unit]ram[/unit]Rammböcke: "+ramml;
anfrage += "\n[unit]catapult[/unit]Katapulte: "+katal;
anfrage += "\n[unit]snob[/unit]Adelsgeschlechter: "+agl+"[/spoiler]";






document.getElementsByClassName("vis")[0].innerHTML += "<tr><td colspan='3'><a href='#' onclick=\"javascript:document.getElementById('anfrage').style.display = '';\">"+String.fromCharCode(187)+" Deff-Anfrage erstellen</a></td></tr>";
document.getElementsByClassName("vis")[0].innerHTML += "<tr id='anfrage' style='display:none;'><td colspan='3'><textarea onFocus='this.select()' cols=60 rows=10>"+anfrage+"</textarea></td></tr>";
}