// ==UserScript==
// @name           Punkteverlauf
// @namespace      sdgsdgserg
// @include        http://de*.die-staemme.de/game.php?*screen=ally*mode=members
// @include        http://de*.die-staemme.de/game.php?*mode=members*screen=ally
// ==/UserScript==
var inhalt = document.getElementById("ds_body").innerHTML;
var user1;
var i = 1;
var link = this.location.href;
link = link.split(".");
link = link[0];
link = link.substr(9,11);
var graphen = "";
var antigraphen = "";
var th = document.createElement("th");
th.innerHTML = "-----Punkteverlauf-----";
th.id = "pv";
document.getElementsByClassName("vis")[1].getElementsByTagName("tr")[0].appendChild(th);
while(i<document.getElementsByClassName("vis")[1].getElementsByTagName("tr").length)
{
 user1 = document.getElementsByClassName("vis")[1].getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML;
 user1 = user1.search(/id=(\d+)/);
 if(user1 != -1)
 {
  var td = document.createElement("td");
  td.innerHTML = '<input onclick="javascript:document.getElementById(\'grafik'+i+'\').src=\'http://de.twstats.com/image.php?type=playergraph&graph=points&id='+RegExp.$1+'&s=de'+link+'\';document.getElementById(\'grafik'+i+'\').style.display=\'\';" value="Zeigen" type="button"><input onclick="javascript:document.getElementById(\'grafik'+i+'\').style.display=\'none\';" value="Verstecken" type="button"><br><a href="http://de.twstats.com/de'+link+'/index.php?page=player&id='+RegExp.$1+'"><img src="" id="grafik'+i+'" style="display:none;" alt="Bild wird geladen - Bitte warten" border=0></a>';
  document.getElementsByClassName("vis")[1].getElementsByTagName("tr")[i].appendChild(td);
 }
graphen += "document.getElementById('grafik"+i+"').src=\'http://de.twstats.com/image.php?type=playergraph&graph=points&id="+RegExp.$1+"&s=de"+link

+"';document.getElementById('grafik"+i+"').style.display='';";
antigraphen += "document.getElementById('grafik"+i+"').style.display='none';";
i++;
}
document.getElementById("pv").innerHTML = "<a href='#' onclick=\"javascript:"+antigraphen+"\">-----</a><a href='#' onclick=\"javascript:"+graphen+"\">Punkteverlauf</a><a href='#' onclick=\"javascript:"+antigraphen+"\">-----</a>";