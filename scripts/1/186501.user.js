// ==UserScript==
// @name          Tek allow adblock
// @version       0.1
// @description   Gjør slik at adblock funker på Tek-nettverket (tek.no). Funker bare i Firefox.
// @match	      	http://*.hardware.no/*
// @match	      	http://*.tek.no/*
// @match	      	http://*.amobil.no/*
// @match	      	http://*.akam.no/*
// @match	      	http://*.teknofil.no/*
// @match	      	http://*.gamer.no/*
// @match	      	http://*.mobilen.no/*
// @match	      	http://hardware.no/*
// @match	      	http://tek.no/*
// @match	      	http://amobil.no/*
// @match	      	http://akam.no/*
// @match	      	http://teknofil.no/*
// @match	      	http://gamer.no/*
// @match	      	http://mobilen.no/*
// @run-at	      document-start
// ==/UserScript==

window.addEventListener('beforescriptexecute', function(e) {
  htmlc = e.target.innerHTML;
  if(htmlc.search(/_0x700a/) != -1) {
    e.stopPropagation();
    e.preventDefault();
  }
});