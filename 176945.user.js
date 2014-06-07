// ==UserScript==
// @name        Forældreintra
// @namespace   http://maagensen.dk
// @description Forældreintra udnytter hele skærmen, istedet for at være 2003 agtigt
// @include     http://www.buskelundskolen.silkeborg.dk/Infoweb/Fi2/*
// @include     https://www.buskelundskolen.silkeborg.dk/Infoweb/Fi2/*
// @version     1
// @grant       none
// ==/UserScript==
var fs = document.getElementsByTagName("frameset"); 
for (var i=0; i<fs.length; i++){
  if (fs[i].getAttribute("cols") == "*,1,1024,1,*") {
    fs[i].setAttribute("cols", "*,1,100%,1,*");
    break;
  }
}
