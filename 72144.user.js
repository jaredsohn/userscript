// ==UserScript==
// @name           KlickFürEintragen
// @namespace      sdgsdgserg
// @include        *
// ==/UserScript==
if(document.URL.search(/.*np\.bmaker\.net\/tools\/farmmanager\.php\?id=.*/) != -1)
{
 var coord;
 var speer;
 var lkv;
 var zuschlag;
 var wdorf = "";
 var zfrage = false;
 var was;
 var wdorf2;
 var spaltes = 7;
 var spaltel = 8;
 var spaltex = 12;
 var sd = document.getElementsByName("filter")[0].selectedIndex;
 sd = document.getElementsByName("filter")[0].getElementsByTagName("option")[sd].innerHTML;
 if(sd != "- ALLE -")
 {
  sd = sd.search(/(\d+\|\d+), .*/);
  spaltes = 8;
  spaltel = 9;
  spaltex = 13;
 }
 for(var i=1;i>0;i++)
 {
  if(GM_getValue(GM_getValue('welt')+"dorfk"+i))
  {
   if(GM_getValue(GM_getValue('welt')+"dorfk"+i) == RegExp.$1)
   {
    wdorf2 = i;
    i = -1;
   }
  }
  else
  {
   i = -1;
  }
 }
 zuschlag = GM_getValue(GM_getValue('welt')+"dorfnr"+wdorf2);
 var axtz = document.createElement("th");
 axtz.innerHTML = "<center>Angriff</center>";
 document.getElementsByTagName("table")[1].getElementsByTagName("tr")[0].appendChild(axtz);
 for(var i=1;i<document.getElementsByTagName("table")[1].getElementsByTagName("tr").length-1;i++)
 {
  pspeer = 32;
  plkv = 10;
  paxt = 80;
  if(document.getElementsByTagName("table")[1].getElementsByTagName("tr")[i].getElementsByTagName("td")[spaltes-1].getAttribute("class") == "align_left red")
  {
   pspeer = 0;
   plkv = 0;
   paxt = 0;
  }
  coord = document.getElementsByTagName("table")[1].getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML;
  speer = parseInt(document.getElementsByTagName("table")[1].getElementsByTagName("tr")[i].getElementsByTagName("td")[spaltes].innerHTML.split(">")[1])+pspeer;
  lkv = parseInt(document.getElementsByTagName("table")[1].getElementsByTagName("tr")[i].getElementsByTagName("td")[spaltel].innerHTML.split(">")[1])+plkv;
  was = document.getElementsByTagName("table")[1].getElementsByTagName("tr")[i].getElementsByClassName("image_link")[0].href;
  var axt = (lkv-plkv)*8+paxt;
  document.getElementsByTagName("table")[1].getElementsByTagName("tr")[i].getElementsByTagName("td")[spaltes].innerHTML = document.getElementsByTagName("table")[1].getElementsByTagName("tr")[i].getElementsByTagName("td")[spaltes].innerHTML.replace(/(\d+)/, "<a target='_blank' onclick=\"javascript:window.open('http://"+GM_getValue('welt')+".die-staemme.de/staemme.php?screen=place&coords="+coord+"&speer="+speer+"&lkv="+lkv+"&truppen=speer&village="+zuschlag+"');fenster = window.open('"+was+"','UNBEACHTEN','width=1,height=1,left=0,top=0');setTimeout('fenster.close()', 1);location.reload();\">$1</a>");
  document.getElementsByTagName("table")[1].getElementsByTagName("tr")[i].getElementsByTagName("td")[spaltel].innerHTML = document.getElementsByTagName("table")[1].getElementsByTagName("tr")[i].getElementsByTagName("td")[spaltel].innerHTML.replace(/(\d+)/, "<a target='_blank' onclick=\"javascript:window.open('http://"+GM_getValue('welt')+".die-staemme.de/staemme.php?screen=place&coords="+coord+"&speer="+speer+"&lkv="+lkv+"&truppen=lkv&village="+zuschlag+"');fenster = window.open('"+was+"','UNBEACHTEN','width=1,height=1,left=0,top=0');setTimeout('fenster.close()', 1);location.reload();\">$1</a>");
  var axtz = document.createElement("td");
  axtz.innerHTML = "<a target='_blank' onclick=\"javascript:window.open('http://"+GM_getValue('welt')+".die-staemme.de/staemme.php?screen=place&coords="+coord+"&speer="+speer+"&lkv="+lkv+"&axt="+axt+"&truppen=axt&village="+zuschlag+"');fenster = window.open('"+was+"','UNBEACHTEN','width=1,height=1,left=0,top=0');setTimeout('fenster.close()', 1);location.reload();\"><img src='http://de54.die-staemme.de/graphic/unit/unit_axe.png'>Axtangriff</a>";
  document.getElementsByTagName("table")[1].getElementsByTagName("tr")[i].appendChild(axtz);
 }
 var axtz = document.createElement("td");
 axtz.innerHTML = "-";
 document.getElementsByTagName("table")[1].getElementsByTagName("tr")[i].appendChild(axtz);
}
else if(document.URL.search(/die-staemme.*screen=place/) != -1)
{
 var fehler = false;
 var fehler2 = false;
 var coordx;
 var coordy;
 var speer;
 var lkv;
 var axt;
 coordx = document.URL.search(/coords=(\d+)\|\d+/);
 coordx = RegExp.$1;
 coordy = document.URL.search(/coords=\d+\|(\d+)/);
 coordy = RegExp.$1;
 speer = document.URL.search(/speer=(\d+)&/);
 speer = RegExp.$1;
 lkv = document.URL.search(/lkv=(\d+)&/);
 lkv = RegExp.$1;
 axt = document.URL.search(/axt=(\d+)&/);
 axt = RegExp.$1;
 was2 = document.URL.search(/truppen=(.*)&/);
 was = RegExp.$1;
 if(was2 != -1)
 {
  if(was == "speer")
  {
   document.getElementsByClassName("unitsInput")[0].value = speer;
  }
  else if(was == "lkv")
  {
   document.getElementsByClassName("unitsInput")[5].value = lkv;
  }
  else if(was == "axt")
  {
   document.getElementsByClassName("unitsInput")[2].value = axt;
  }
  document.getElementsByClassName("unitsInput")[4].value = "1";
  document.getElementsByName("x")[0].value = coordx;
  document.getElementsByName("y")[0].value = coordy;
 }
}
else if(document.URL.search(/die-staemme.*screen=overview_villages/) != -1)
{
 var test;
 var welt;
 welt = document.URL.search(/http:\/\/(.*)\.die-staemme\..*/);
 GM_setValue("welt",RegExp.$1);
 if(document.getElementById("ds_body").innerHTML.search(/Kombiniert/) == -1)
 {
  for(var i=1;i<document.getElementsByClassName("vis")[0].getElementsByTagName("tr").length;i++)
  {
   GM_setValue(GM_getValue('welt')+"dorf"+i, document.getElementsByClassName("vis")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[0].getElementsByTagName("a")[0].getElementsByTagName("span")[0].innerHTML);
   test = document.getElementsByClassName("vis")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[0].getElementsByTagName("a")[0].getElementsByTagName("span")[0].innerHTML.search(/\((\d+\|\d+)\)/);
   GM_setValue(GM_getValue('welt')+"dorfk"+i,RegExp.$1);
   document.getElementsByClassName("vis")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[0].getElementsByTagName("a")[0].href.search(/village=(\d+)/);
   GM_setValue(GM_getValue('welt')+"dorfnr"+i, RegExp.$1);
  }
 }
 else if(document.getElementById("ds_body").innerHTML.search(/Kombiniert/))
 {
  for(var i=1;i<document.getElementsByClassName("vis")[3].getElementsByTagName("tr").length;i++)
  {
   GM_setValue(GM_getValue('welt')+"dorf"+i, document.getElementsByClassName("vis")[3].getElementsByTagName("tr")[i].getElementsByTagName("td")[0].getElementsByTagName("a")[0].getElementsByTagName("span")[0].innerHTML);
   test = document.getElementsByClassName("vis")[3].getElementsByTagName("tr")[i].getElementsByTagName("td")[0].getElementsByTagName("a")[0].getElementsByTagName("span")[0].innerHTML.search(/\((\d+\|\d+)\)/);
   GM_setValue(GM_getValue('welt')+"dorfk"+i, RegExp.$1);
   document.getElementsByClassName("vis")[3].getElementsByTagName("tr")[i].getElementsByTagName("td")[0].getElementsByTagName("a")[0].href.search(/village=(\d+)/);
   GM_setValue(GM_getValue('welt')+"dorfnr"+i, RegExp.$1);
  }
 }
}