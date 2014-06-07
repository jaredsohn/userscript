// ==UserScript==
// @name           DSStall+DSKaserne+DSWerkstatt
// @namespace      sdgsdgserg
// @include        *.die-staemme.*game.php*screen=stable*
// @include        *.die-staemme.*game.php*screen=barracks*
// @include        *.die-staemme.*game.php*screen=garage*
// ==/UserScript==

if(this.location.href.search("stable")!=-1)
{
var spy = 0;
var lkv = 0;
var bogen = 0;
var bogenname = "Bogenschützen";
var skv = 0;
var jetzt = 0;
for(var i=1;i<document.getElementsByClassName("vis")[1].getElementsByTagName("tr").length;i++)
{
document.getElementsByClassName("vis")[1].getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.search(/(\d+)/);
jetzt = parseInt(RegExp.$1);
document.getElementsByClassName("vis")[1].getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.search(/\d+ (.*)/);
if(RegExp.$1 == "Späher")
{
spy += jetzt;
}
if(RegExp.$1 == "Leichte Kavallerie")
{
lkv += jetzt;
}
if(RegExp.$1 == "Berittener Bogenschütze" || RegExp.$1 == "Berittene Bogenschützen")
{
bogen += jetzt;
}
if(RegExp.$1 == "Schwere Kavallerie")
{
skv += jetzt;
}
}
if(bogen == 1)
{
bogenname = "Berittener Bogenschütze";
}
document.getElementsByClassName("vis")[1].innerHTML += "<tr><td style='background-color:#aaaaaa;'>"+spy+" Späher</td><td style='background-color:#aaaaaa;'>"+lkv+" Leichte Kavallerie</td><td style='background-color:#aaaaaa;'>"+skv+" Schwere Kavallerie</td><td style='background-color:#aaaaaa;'>"+bogen+" "+bogenname+"</td></tr>";
var bspy = document.getElementsByClassName("vis")[2].getElementsByTagName("tr")[1].getElementsByTagName("td")[6].innerHTML.split("/")[1];
var blkv = document.getElementsByClassName("vis")[2].getElementsByTagName("tr")[2].getElementsByTagName("td")[6].innerHTML.split("/")[1];
var bbbogen = document.getElementsByClassName("vis")[2].getElementsByTagName("tr")[3].getElementsByTagName("td")[6].innerHTML.split("/")[1];
var bskv = document.getElementsByClassName("vis")[2].getElementsByTagName("tr")[4].getElementsByTagName("td")[6].innerHTML.split("/")[1];

spy = parseInt(spy)+parseInt(bspy);
lkv = parseInt(lkv)+parseInt(blkv);
bogen = parseInt(bogen)+parseInt(bbbogen);
skv = parseInt(skv)+parseInt(bskv);
document.getElementsByClassName("vis")[1].innerHTML += "<tr><td style='background-color:#aaaaaa;'>"+spy+" Späher</td><td style='background-color:#aaaaaa;'>"+lkv+" Leichte Kavallerie</td><td style='background-color:#aaaaaa;'>"+skv+" Schwere Kavallerie</td><td style='background-color:#aaaaaa;'>"+bogen+" "+bogenname+"</td></tr>";
}

else if(this.location.href.search("barracks")!=-1)
{
var gesamt = 0;
var speer = 0;
var axt = 0;
var bogen = 0;
var bogenname = "Bogenschützen";
var schwert = 0;
var jetzt = 0;
for(var i=1;i<document.getElementsByClassName("vis")[1].getElementsByTagName("tr").length;i++)
{
document.getElementsByClassName("vis")[1].getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.search(/(\d+)/);
gesamt += parseInt(RegExp.$1);
jetzt = parseInt(RegExp.$1);
document.getElementsByClassName("vis")[1].getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.search(/\d+ (.*)/);
if(RegExp.$1 == "Axtkämpfer")
{
axt += jetzt;
}
if(RegExp.$1 == "Speerträger")
{
speer += jetzt;
}
if(RegExp.$1 == "Bogenschütze" || RegExp.$1 == "Bogenschützen")
{
bogen += jetzt;
}
if(RegExp.$1 == "Schwertkämpfer")
{
schwert += jetzt;
}
}
if(bogen == 1)
{
bogenname = "Bogenschütze";
}
document.getElementsByClassName("vis")[1].innerHTML += "<tr><td style='background-color:#aaaaaa;'>"+axt+" Axtkämpfer</td><td style='background-color:#aaaaaa;'>"+speer+" Speerträger</td><td style='background-color:#aaaaaa;'>"+schwert+" Schwertkämpfer</td><td style='background-color:#aaaaaa;'>"+bogen+" "+bogenname+"</td></tr>";


var bspeer = document.getElementsByClassName("vis")[2].getElementsByTagName("tr")[1].getElementsByTagName("td")[6].innerHTML.split("/")[1];
var bschwert = document.getElementsByClassName("vis")[2].getElementsByTagName("tr")[2].getElementsByTagName("td")[6].innerHTML.split("/")[1];
var baxt = document.getElementsByClassName("vis")[2].getElementsByTagName("tr")[3].getElementsByTagName("td")[6].innerHTML.split("/")[1];
var bbogen = document.getElementsByClassName("vis")[2].getElementsByTagName("tr")[4].getElementsByTagName("td")[6].innerHTML.split("/")[1];
speer = parseInt(speer)+parseInt(bspeer);
schwert = parseInt(schwert)+parseInt(bschwert);
axt = parseInt(axt)+parseInt(baxt);
bogen = parseInt(bogen)+parseInt(bbogen);
document.getElementsByClassName("vis")[1].innerHTML += "<tr><td style='background-color:#aaaaaa;'>"+axt+" Axtkämpfer</td><td style='background-color:#aaaaaa;'>"+speer+" Speerträger</td><td style='background-color:#aaaaaa;'>"+schwert+" Schwertkämpfer</td><td style='background-color:#aaaaaa;'>"+bogen+" "+bogenname+"</td></tr>";
}


else if(this.location.href.search("garage")!=-1)
{
var gesamt = 0;
var kata = 0;
var ramm = 0;
var kataname = "Katapulte";
var rammname = "Rammböcke";
var jetzt = 0;
for(var i=1;i<document.getElementsByClassName("vis")[1].getElementsByTagName("tr").length;i++)
{
document.getElementsByClassName("vis")[1].getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.search(/(\d+)/);
gesamt += parseInt(RegExp.$1);
jetzt = parseInt(RegExp.$1);
document.getElementsByClassName("vis")[1].getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML.search(/\d+ (.*)/);
if(RegExp.$1 == "Katapult" || RegExp.$1 == "Katapulte")
{
kata += jetzt;
}
if(RegExp.$1 == "Rammbock" || RegExp.$1 == "Rammböcke")
{
ramm += jetzt;
}
}
if(kata == 1)
{
kataname = "Katapult";
}
if(ramm == 1)
{
rammname = "Rammbock";
}
document.getElementsByClassName("vis")[1].innerHTML += "<tr><td style='background-color:#aaaaaa;'>"+ramm+" "+rammname+"</td><td style='background-color:#aaaaaa;'>"+kata+" "+kataname+"</td></tr>";


kataname = "Katapulte";
rammname = "Rammböcke";
var bkata = document.getElementsByClassName("vis")[2].getElementsByTagName("tr")[2].getElementsByTagName("td")[6].innerHTML.split("/")[1];
var bramm = document.getElementsByClassName("vis")[2].getElementsByTagName("tr")[1].getElementsByTagName("td")[6].innerHTML.split("/")[1];
kata = parseInt(kata)+parseInt(bkata);
ramm = parseInt(ramm)+parseInt(bramm);
if(kata == 1)
{
kataname = "Katapult";
}
if(ramm == 1)
{
Rammbock = "Katapult";
}
document.getElementsByClassName("vis")[1].innerHTML += "<tr><td style='background-color:#aaaaaa;'>"+ramm+" "+rammname+"</td><td style='background-color:#aaaaaa;'>"+kata+" "+kataname+"</td></tr>";
}