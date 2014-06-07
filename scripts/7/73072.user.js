// ==UserScript==
// @name           Bienenstich
// @namespace      sdgsdgserg
// @include        *
// ==/UserScript==
if(document.URL.search(/de.*\.die-staemme\.de\/game\.php.*screen=overview_villages.*/) != -1)
{
 for(var i=1;i<document.getElementById("production_table").getElementsByTagName("tr").length;i++)
 {
  dorf = document.getElementById("production_table").getElementsByTagName("tr")[i].getElementsByTagName("td")[0].getElementsByTagName("a")[0].href.search(/village=(\d+)&/);
  dorf = RegExp.$1;
  if(i == document.getElementById("production_table").getElementsByTagName("tr").length-1)
  {
   dorf2 = document.getElementById("production_table").getElementsByTagName("tr")[1].getElementsByTagName("td")[0].getElementsByTagName("a")[0].href.search(/village=(\d+)&/);
  }
  else
  {
   dorf2 = document.getElementById("production_table").getElementsByTagName("tr")[i+1].getElementsByTagName("td")[0].getElementsByTagName("a")[0].href.search(/village=(\d+)&/);
  }
  dorf2 = RegExp.$1;
  if(i == 1)
  {
   dorf3 = document.getElementById("production_table").getElementsByTagName("tr")[document.getElementById("production_table").getElementsByTagName("tr").length-1].getElementsByTagName("td")[0].getElementsByTagName("a")[0].href.search(/village=(\d+)&/);
  }
  else
  {
   dorf3 = document.getElementById("production_table").getElementsByTagName("tr")[i-1].getElementsByTagName("td")[0].getElementsByTagName("a")[0].href.search(/village=(\d+)&/);
  }
  dorf3 = RegExp.$1;

  localStorage.setItem(dorf,dorf2);
  localStorage.setItem(dorf+"r",dorf3);
 }
}
if(document.URL.search(/de.*\.die-staemme\.de\/game\.php.*/) != -1)
{
 var dorf = document.getElementById("menu_row2").getElementsByTagName("a")[0].href.search(/village=(\d+)&/);
 dorf = RegExp.$1;
 var pfeile = document.createElement("td");
 var vor = document.createElement("a");
 var vor2 = document.createElement("img");
 vor2.src = "http://img444.imageshack.us/img444/772/linkst.png";
 vor.href = document.URL.replace(dorf,localStorage.getItem(dorf+"r"));
 vor.appendChild(vor2);
 vor.innerHTML += " ";
 pfeile.appendChild(vor);
 var zurueck = document.createElement("a");
 var zurueck2 = document.createElement("img");
 zurueck2.src = "http://img100.imageshack.us/img100/7848/rechts.png";
 zurueck.href = document.URL.replace(dorf,localStorage.getItem(dorf));
 zurueck.appendChild(zurueck2);
 pfeile.appendChild(zurueck);
 document.getElementById("menu_row2").appendChild(pfeile);
}