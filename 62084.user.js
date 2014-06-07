// ==UserScript==
// @name           Wurzelimperium - Punkte als Bargraph
// @namespace      Woems
// @include        http://s*.wurzelimperium.de/*
// ==/UserScript==

function $(id) {
  return document.getElementById(id);
}

function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

function insertAfter(newNode, node) {
  return node.parentNode.insertBefore(newNode, node.nextSibling);
}


var loc = document.location; 
var reg = /http:\/\/s(.*?)\.wurzelimperium\.de\/(.*?)\.php/i;
if (reg.exec(loc))
{
  var server = reg.exec(loc)[1];
  var page = reg.exec(loc)[2];
} else {
  var server = "";
  var page = "";
}

switch (page) {
case "" : do_login();break;
case "main"	  : do_main();break;
/*
case "hilfe" : break;
case "map" : break;
case "stadt/showquest" : break;
case "stadt/index" : break;
case "stadt/markt" : break;
case "stadt/marktstand" : break;
case "nachrichten/inbox" : break;
case "nachrichten/system" : break;
case "nachrichten/read" : break;
case "nachrichten/outbox" : break;
case "nachrichten/contact" : break;
case "nachrichten/new" : break;
case "verkauf" : break;
*/
case "garten_map" : do_garten_map(); window.addEventListener('unload',function () { do_garten_map(); }, true); break;
case "verkauf_map": do_verkauf_map();break;
//default: GM_log("Unbekannte Seite gefunden: "+page); break;
}

function do_login()
{

}

function do_main()
{
  var level=new Array(0,300,1000,5000,15000,40000,100000,200000,350000,550000,800000,1500000,2500000,4500000,7500000,15000000,22000000,30000000,40000000,55000000,70000000,99999999);
  var min=0;
  var max=0;
  var Punkte=$('pkt').innerHTML.replace(/[^0-9]/,"");
  for (i=1; i<level.length; i++)
    if (level[i-1]<=Punkte && Punkte<level[i])
    {
      var Bereich=level[i]-level[i-1];
      var BereichPunkte=Punkte-level[i-1];
      var bar_width=60*BereichPunkte/Bereich;
    }
      
  var bar=document.createElement("span");
  bar.style.border="1px solid black";
  bar.style.position="absolute";
  bar.style.left="92px";
  bar.style.width="60px";
  bar.style.height="10px";
  //$('pkt').appendChild(bar);
  insertAfter(bar,$('pkt'));
     
  var bar_perc=document.createElement("span");
  bar_perc.id="bar_perc";
  bar_perc.innerHTML="&nbsp;"
  bar_perc.style.position="absolute";
  bar_perc.style.backgroundColor="white";
  bar_perc.style.width=bar_width+"px";
  bar_perc.style.height="10px";
  bar.appendChild(bar_perc);
     
  var bar_rest=document.createElement("span");
  bar_rest.id="bar_rest";
  bar_rest.innerHTML="&nbsp;"
  bar_rest.style.position="absolute";
  bar_rest.style.backgroundColor="lightgray";
  bar_rest.style.left=bar_width+"px";
  bar_rest.style.width=(60-bar_width)+"px";
  bar_rest.style.height="10px";
  bar.appendChild(bar_rest);
   
  $('pkt').addEventListener('change',function () {
    var Punkte=$('pkt').innerHTML.replace(/[^0-9]/,"");
    for (i=1; i<level.length; i++)
      if (level[i-1]<=Punkte && Punkte<level[i])
      {
        var Bereich=level[i]-level[i-1];
        var BereichPunkte=Punkte-level[i-1];
        var bar_width=60*BereichPunkte/Bereich;
      }
    $("bar_perc").style.width=bar_width+"px";
    $("bar_rest").style.left=bar_width+"px";
    $("bar_rest").style.width=(60-bar_width)+"px";
    //alert("changed");
  });
}
function do_garten_map()
{

}

function do_verkauf_map()
{

}