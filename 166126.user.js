// ==UserScript==
// @name           Youtube autoplaySTOP für Pennergame alle Städte
// @author         pennereck.de
// @version        1.0.1
// @namespace      http://userscripts.org/scripts/show/166126
// @description    Verhindert das automatische abspielen und vorladen von Youtube Videos auf den Profilseiten
// @grant       	none
// @include			http://*pennergame.de*

// ==/UserScript==


console.log('get links');
var LinksALL_next = document.getElementsByTagName('embed');

  for (var i=0;i<LinksALL_next.length;i++) {
    var aktuellLINK2 = LinksALL_next[i];
      console.log('process: ', aktuellLINK2, aktuellLINK2.src);     
     
    if(aktuellLINK2.src.match("http*://www.youtube.com/v/.*[^#]$")) {
       
      var orgLink2 = String(aktuellLINK2.src.match("http*://www.youtube.com/v/.*[^#]$"));
      var youtubeID2 = orgLink2.match( /[a-zA-Z0-9\-\_]{11}/ );

      aktuellLINK2.removeAttribute('src');     
      var LinkNEU2 =  "http://www.youtube.com/v/"+youtubeID2+"?rel=0&autoplay=0";     
      aktuellLINK2.setAttribute("src", LinkNEU2);
    }
   
  }

// **************************************************************************************
// Das bitterböse  ENDE
// **************************************************************************************

// copyright 2012 4D-ESIGN - Pennereck.de***********************************************
// **************************************************************************************
// Dieses Werk ist durch eine Creative Commons by-nc-sa Lizenz geschuetzt.
// Bearbeiten oder Vervielfaeltigen ist nur nach Absprache mit dem Autor gestattet.
// Bei Nichtbeachtung werden rechtliche Schritte eingeleitet.
// JavaScript Document