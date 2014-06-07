// ==UserScript==
// @name        Howrse Exact Energy
// @namespace   myHowrse
// @description Displays the horses exact energy, not the approximate energy.  Requires a page refresh to update the energy listed on the page.
// @include     http://*.howrse.com/elevage/chevaux/cheval*
// @version     1
// ==/UserScript==

scipts = document.getElementsByTagName("script");
i=0;
while(scipts[i].text.indexOf("chevalEnergie") < 0 && i < scipts.length) ++i;
horseVars = scipts[i].text;
horseVars = horseVars.substring(horseVars.indexOf("chevalEnergie"),horseVars.length);
firstEqual = horseVars.indexOf("=");
firstSemi = horseVars.indexOf(";");
chevalEnergie = horseVars.substring(firstEqual+2,firstSemi);

howrseEnergie = document.getElementById("energie");
howrseEnergie.textContent = chevalEnergie;