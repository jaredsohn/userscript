// ==UserScript==
// @name           Punkteverlauf Stämme
// @namespace      sdgsdgserg
// @include        http://*.die-staemme.de/game.php*screen=ranking*mode=*ally*
// ==/UserScript==

var inhalt = document.getElementById("ds_body").innerHTML;
var user1;
var link = this.location.href;
link = link.split(".");
link = link[0];
link = link.substr(9,11);
i = 1;
var graphen = "";
var antigraphen = "";




document.getElementsByClassName("vis")[1].getElementsByTagName("tr")[0].innerHTML += "<th id='pv'>-----Punkteverlauf-----</th>";
while(i<document.getElementsByClassName("vis")[1].getElementsByTagName("tr").length)
{
 user1 = document.getElementsByClassName("vis")[1].getElementsByTagName("tr")[i].getElementsByTagName("td")[1].innerHTML;
 user1 = user1.search(/id=(\d+)/);
 if(user1 != -1)
 {
  document.getElementsByClassName("vis")[1].getElementsByTagName("tr")[i].innerHTML += '<td><input onclick="javascript:document.getElementById(\'grafik'+i+'\').src=\'http://de.twstats.com/image.php?type=tribegraph&graph=points&id='+RegExp.$1+'&s=de'+link+'\';document.getElementById(\'grafik'+i+'\').style.display=\'\';" value="Zeigen" type="button"><input onclick="javascript:document.getElementById(\'grafik'+i+'\').style.display=\'none\';" value="Verstecken" type="button"><br><a href="http://de.twstats.com/de'+link+'/index.php?page=tribe&id='+RegExp.$1+'"><img src="" id="grafik'+i+'" style="display:none;" alt="Bild wird geladen - Bitte warten" border=0></a></td>';
 }
graphen += "document.getElementById('grafik"+i+"').src=\'http://de.twstats.com/image.php?type=tribegraph&graph=points&id="+RegExp.$1+"&s=de"+link+"';document.getElementById('grafik"+i+"').style.display='';";
antigraphen += "document.getElementById('grafik"+i+"').style.display='none';";
i++;
}
document.getElementById("pv").innerHTML = "<a href='#' onclick=\"javascript:"+antigraphen+"\">-----</a><a href='#' onclick=\"javascript:"+graphen+"\">Punkteverlauf</a><a href='#' onclick=\"javascript:"+antigraphen+"\">-----</a>";
