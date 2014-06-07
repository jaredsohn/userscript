// ==UserScript==
// @name				FireDesignGoogle
// @author				Seoester
// @namespace			none
// @description			Mit diesem Skript hat Google das "Fire"-Design (normal)
// @include			http://*.google.de/*
// @include			http://*.google.ae/*
// @include			http://*.google.co.in/*
// @include			http://*.google.com/*
// ==/UserScript==



var googlelogo = document.getElementsByTagName("img")[0];   //Das erste Bild der Website ist nun mithilfe der Variablen googlelogo ansprechbar

googlelogo.src = "http://123softs.webs.com/123ss.png";        //Das normale Googlebild wird durch das Firebild ersetzt

if(googlelogo.height =="40" || googlelogo.height =="106" || googlelogo.alt == "Google(123softs)" && googlelogo.height != "110") {        //Kleines Bild
  googlelogo.height="60";             //Höhe wird festgelegt
  googlelogo.width="105";             //Breite wird festgelegt

  } else if(googlelogo.height == "110" || googlelogo.alt == "Google Produktsuche") {      // Großes Bild
  googlelogo.height="250";            //Höhe witd festgelegt
  googlelogo.width="560";             //Breite wird festgelegt

  } else {
  
  }

//----------------------------------------------------------------------------

for(var i = 0; i<50; i++) {            //for-Schleife zum Auffinden aller "Google-Suche"-buttons

  button = document.getElementsByTagName("input")[i];   //Alle buttons werden mit Variablen belegt

  if(button.value == "Google-Suche") {     //wenn es wirklich ein "Google-Suche"-button ist, 
    button.value = "Fire-Suche";           //wird die Aufschrift durch "Fire-Suche" ersetzt
    }
  }