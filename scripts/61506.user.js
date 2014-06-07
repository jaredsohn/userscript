// ==UserScript==
// @name Zikina sarenica
// @namespace http://www.erepublik.com/en/citizen/profile/1984056
// @author PetroBoki
// @description Skript za "srpski" meni
// @include http://ww*.erepublik.com/*
// ==/UserScript==

function ChangePicture(meni) {
var element,link;
element=document.getElementById(meni);
switch (meni) {
case "menu1":link=element.childNodes[0];break;
case "menu2":link=element.childNodes[1];break;
case "menu3":link=element.childNodes[1];break;
case "menu4":link=element.childNodes[3];break;
case "menu5":link=element.childNodes[1];break;
}


link.style.backgroundImage="url(http://www.studentskicentar-kg.rs/Excel/Java/Zika/mapa.png)";
}

ChangePicture("menu1");
ChangePicture("menu2");
ChangePicture("menu3");
ChangePicture("menu4");
ChangePicture("menu5");