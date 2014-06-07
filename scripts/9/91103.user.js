// Zombie-Hysterie
// Copyright (c) jbick
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ----------------------------------------------------------------------------------
//
// ==UserScript==
// @name          Zombie-Hysterie
// @namespace     http://blog.jbick.com/post/1657819723/die-zombie-hysterie-gibt-es-jetzt-auch-als
// @description   Macht aus der Terror-Hysterie eine Zombie-Hysterie
// @include       *       
// ==/UserScript==

function rt(a,b,e){
if(!e) e=document.body;
var m=e.childNodes;
for(var n=0;n<m.length;n++){
  if(m[n].nodeType==Node.TEXT_NODE){
    m[n].textContent=m[n].textContent.replace(new RegExp(a,'g'),b);
  }
  else{
    rt(a,b,m[n]);
  }
}
}
rt('terror','zombie');
rt('Terror','Zombie');
rt('islamistisch','infiziert');
rt('islamisch','infiziert');
rt('Islamist','Infiziert');