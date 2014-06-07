// ==UserScript==
// @author         alienv
// @name           Wykop anty mixplus
// @namespace      Wykop
// @version         0.1
// @include        *wykop.pl/*
// ==/UserScript==
(
function() {

obj=document.getElementsByTagName("li");

for(i=0;i<obj.length;i++)
{ 
 if(obj[i].className == "comment mixplus")
 {
  obj[i].style.display= "none";
 }
}

})()
