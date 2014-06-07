// version 0.1
// 2007/09/17

// ==UserScript==
// @name          OGame - Inactivos coloridos
// @author        FryGuy - ogame.com.es - uni7
// @namespace     http://userscripts.org/scripts/show/12340
// @include        http://*.ogame.*/game/*
// ==/UserScript==

// cambia colores
(function(){
  if (location.href.search('=galaxy') != -1) {
    var allElements;
    var thisElement;
    var i;

    allElements = document.getElementsByTagName('span');

    for (i = 0; i < allElements.length; i++) {
      thisElement = allElements[i];
      if (thisElement.className.substring(0,8) == 'inactive') {
        thisElement.style.color = "rgb(255,0,50)";
      } else if (thisElement.className.substring(0,12) == 'longinactive') {
        thisElement.style.color = "rgb(189,19,22)";
      }
    }
  }
})();