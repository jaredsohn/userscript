// ==UserScript==
// @name           Wowhead Condense Loot Info
// @namespace      http://www.wowhead.com/user=Nulgar
// @description    .
// @include        http://*.wowhead.com/item=*
// @grant          none
// ==/UserScript==

whclic=0;
al=function(ert) {
 alert(ert+" : "+whclic) }
obj=function(o)
 {
 var s="";
 for(var e in o) s+=e+" = "+o[e]+"\n";
 alert(s)
 }

try {

bla=function(){
 // level range
 if(!window["g_listviews"]||!window["g_listviews"]["dropped-by"]) return;// al("no");
 var min=100;
 var max=0;
 var zones=[];
 var override=false;
 m=window["g_listviews"]["dropped-by"].data;
 if(m.length<50) { whclic="not enough"; return }
 for(var ob=0;ob<m.length;ob++)
  {
  var mob=m[ob];
  if(mob.percent>5) override=Math.max(override,mob.percent)
  if(mob.minlevel<min) min=mob.minlevel;
  if(mob.maxlevel>max) max=mob.maxlevel;
  if(mob.location)
   for(var z in mob.location)
    zones[mob.location[z]]=window.g_zones[mob.location[z]];
  }
 if(override) return; //al("override: "+Math.round(override*100)/100+"%")
 var dn=document.getElementById("tab-dropped-by")
 var d=dn.childNodes[2];//document.createElement("div");
 d.innerHTML="This item can be dropped by level <b></b>"+(min>0?min:"??")+"-"+(max<100?max:"??")+"</b> creatures in the following zones:<br>";
// obj(zones)
 var fz=true;
 for(var z in zones)
  {
  if(!fz) d.innerHTML+=", ";
  fz=0;
  if(z) d.innerHTML+="<a href='/zone="+z+"'>"+zones[z]+"</a>"
  }
 d.innerHTML+="<br>As there are a lot of known sources with a low individual drop chance, it may be moot to know them.<br>";
 var db=document.createElement("button");
 db.innerHTML="show anyway";
 db.onclick=function(){
  var dc=document.getElementById("tab-dropped-by").childNodes;
  dc[0].style.display="";
  dc[1].style.display="";
  dc[2].style.display="none";
  dc[3].style.display="";
  };
 d.appendChild(db);
 dn.childNodes[0].style.display="none";
 dn.childNodes[1].style.display="none";
 dn.childNodes[3].style.display="none";
 d.style.display="";
 d.style.padding="1.5em";
 }

var blu;
blu=function(){
 if(!document.getElementById("tab-dropped-by")) return;
 if(document.getElementById("tab-dropped-by").childNodes.length==0)
  {
  var drop=window.g_listviews["dropped-by"];
   for(var e=0;e<=3;++e)
    if(drop.tabs.uls[e])
     drop.tabs.uls[e].childNodes[drop.tabIndex].addEventListener("click",bla,false)
  }
 else bla();
 }
blu();

} catch(e) { obj(e) }