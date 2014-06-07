// ==UserScript==
// @name           Feuer
// @namespace      sdgsdgserg
// @include        http://de*.die-staemme.de/game.php*screen=overview_villages*mode=commands*
// ==/UserScript==
var ziel;
var text = "";
var text2 = "";
var text3 = "";
var text4 = "";
var text5 = "";
var ankunft;
var color;
var truppen = "";
var truppen2 = "";
var namen = new Array();
var anzahl = "";
var ausdruck = /unit_(\w*)\.png/g;
var i=0;
while(truppen != null)
{
 truppen = ausdruck.exec(document.getElementById("commands_table").getElementsByTagName("tr")[0].innerHTML);
 if(truppen != null)
 {
  namen[i] = truppen[1];
 }
 i++;
}


for(var i=1;i<document.getElementById("commands_table").getElementsByTagName("tr").length;i++)
{
 truppen = "http://dsextra.net/ic/knights_";
 truppen2 = "";
 for(var t=3;t<=14;t++)
 {
  anzahl = document.getElementById("commands_table").getElementsByTagName("tr")[i].getElementsByTagName("td")[t].innerHTML;
  truppen += anzahl;
  if(t<14)
  {
   truppen += "_";
  }
  if(parseInt(anzahl) != 0)
  {
   truppen2 += " [unit]"+namen[t-3]+"[/unit]"+anzahl;
  }
 }
 ziel1 = document.getElementById("commands_table").getElementsByTagName("tr")[i].getElementsByTagName("span")[1].innerHTML;
 ziel = ziel1.search(/\((\d+\|\d+)\)/);
 ziel = RegExp.$1;
 if(ziel1.search(/Angriff auf/) != -1)
 {
  ziel = "Angriff auf [coord]"+ziel+"[/coord]";
  color = "#aa0000";
 }
 else if(ziel1.search(/Unterstützung für/) != -1)
 {
  ziel = "Unterstützung für [coord]"+ziel+"[/coord]";
  color = "#00aa00";
 }
 else if(ziel1.search(/Rückkehr von/) != -1)
 {
  ziel = "Rückkehr von [coord]"+ziel+"[/coord]";
  color = "#0000aa";
 }
 else if(ziel1.search(/Zurückgeschickt von/) != -1)
 {
  ziel = "Zurückgeschickt von [coord]"+ziel+"[/coord]";
  color = "#0055aa";
 }
 else if(ziel1.search(/Rückzug von/) != -1)
 {
  ziel = "Rückzug von [coord]"+ziel+"[/coord]";
  color = "#4444aa";
 }
 else if(ziel1.search(/Abgebrochener Befehl nach/) != -1)
 {
  ziel = "Abgebrochener Befehl nach [coord]"+ziel+"[/coord]";
  color = "#aa44aa";
 }
 else
 {
  ziel = "[i]Angriff/Unterstützung/Rückkehr - "+ziel1+"[/i]";
  color = "#aa00aa";
 }
 herkunft = document.getElementById("commands_table").getElementsByTagName("tr")[i].getElementsByTagName("td")[1].getElementsByTagName("a")[0].innerHTML;
 herkunft = herkunft.search(/\((\d+\|\d+)\)/);
 herkunft = RegExp.$1;
 ankunft = document.getElementById("commands_table").getElementsByTagName("tr")[i].getElementsByTagName("td")[2].innerHTML;
 text += "[color="+color+"][b]"+ziel+". Herkunft: [coord]"+herkunft+"[/coord] - "+ankunft+"[/b][/color][img]"+truppen+"[/img]\n\n";
 text2 += "[color="+color+"][b]"+ziel+". Herkunft: [coord]"+herkunft+"[/coord] - "+ankunft+"[/b][/color]\n\n";
 text3 += "[color="+color+"][b]"+ziel+". Herkunft: [coord]"+herkunft+"[/coord] - "+ankunft+"[/b][/color][img]"+truppen+"[/img]\\n\\n";
 text4 += "[color="+color+"][b]"+ziel+". Herkunft: [coord]"+herkunft+"[/coord] - "+ankunft+"[/b][/color]\\n\\n";
 text5 += "[color="+color+"][b]"+ziel+". Herkunft: [coord]"+herkunft+"[/coord] - "+ankunft+"[/b][/color]"+truppen2+"\\n\\n";
}
var bb = document.createElement("tr");
var bbb = document.createElement("td");
bbb.innerHTML = "<script type='text/javascript'>var normal = '"+text3+"';var nachr = '"+text5+"';var ohne = '"+text4+"';function aender(wie){document.getElementById('copy_to_board').value = wie;}</script><input type='radio' onclick='aender(normal);' name='copyyy'>Mit Truppen (Forum) <input type='radio' onclick='aender(nachr);' name='copyyy'>Mit Truppen (Nachricht) <input type='radio' onclick='aender(ohne);' name='copyyy' checked='checked'>Ohne Truppen\n<br><textarea id='copy_to_board' cols=50 rows=10 onFocus='this.select();'>"+text2+"</textarea>";
bb.appendChild(bbb);
document.getElementById("commands_table").appendChild(bb);