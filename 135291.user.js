// ==UserScript==
// @name           Canales2
// @namespace      Cans2
// @include        http://www.entutele.com/programacion/favoritos/*
// @include        http://www.entutele.com/programacion/todos/*
// ==/UserScript==


alert("INICIO9");

var alltags=document.getElementsByTagName("*"); 
for (i=0; i<alltags.length; i++) { 
 //Pick out the tags with our class name 
   if (alltags[i].className=="chsprmedium canalimg") { 
      var temp1=alltags[i].parentNode;
      var temp2=temp1.innerHTML;
      var temp3=temp2.split("/span>")[1].split("<span")[0];
      var temp3=temp3.substring(1);
      var canal="";
      if (temp3=="AXN") canal="410";
      else if (temp3=="Azteca 13") canal="213";
alert("["+temp3+"]");
alert(temp3=="AXN");
      if (canal != ""){
       temp2 = '<span class="numcanal">MEGA: '+canal+'</span>';
       alltags[i].parentNode.innerHTML=alltags[i].parentNode.innerHTML + temp2;
      }
   }
}
