// ==UserScript==
// @name        Cacher Barre GameNet
// @namespace   board.airrivals.fr
// @description Cache la barre gamenet sur le forum Air Rivals
// @include     http://board.airrivals.fr/*
// @version     1
// ==/UserScript==

  var barre = document.getElementById('mmonetbar');
  barre.setAttribute("style","display:none;"); 
  
  var body = document.body;
  body.setAttribute('style', 'margin-top: 0px !important');