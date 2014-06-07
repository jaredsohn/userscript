// ==UserScript==
// @name          Smog Download
// @description	  Zapisuje filmy ze Smoga
// @include       *smog.pl/wideo/*
// @namespace       queyas@gmail.com
// ==/UserScript==

var aLst;
var vId;
var vUrl;
var wstaw;
var vDl;

aLst = document.getElementsByTagName("a");
for (i=0; i < aLst.length; i++)
 {
  if (aLst[i].href.match(/file_key/))
   {
	 vUrl = aLst[i].href    
    vId = vUrl.substr(47, 10);
    vUrl = "http://www.wrzuta.pl/vid/file/" + vId;
     
    vDl = document.createElement('a');
    vDl.setAttribute ("href", vUrl);
    vDl.innerHTML = "Pobierz";
    wstaw = aLst[i];
    wstaw.parentNode.insertBefore (vDl, wstaw);
    i = i + 1;
    
   }
 }
 
