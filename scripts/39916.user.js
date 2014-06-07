// ==UserScript==
// @name           neopets inventory/safe to nav
// @namespace      userscripts.org
// @include        http://www.neopets.com/*
// @description    adds "Inventory" to the shops-section in the nav, since rev2 it also adds safety deposit box
// Revision 1      : Initial Release
// Revision 2      : Added Safety deposit box to nav as well (due to complains that you can access the inventory over your money-counter)
// ==/UserScript==

navRoot = document.getElementById("template_nav");
myEnt = document.createElement('li');
myEnt.innerHTML = '<a href="/objects.phtml?type=inventory">&raquo; Inventory</a>'
myEnt2 = document.createElement('li');
myEnt2.innerHTML = '<a href="/safetydeposit.phtml">&raquo; Safe';

navRoot.childNodes[11].childNodes[1].appendChild(myEnt);
navRoot.childNodes[11].childNodes[1].appendChild(myEnt2);


