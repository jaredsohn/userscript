// ==UserScript==
// @name           Firman nimet esiin
// @namespace      Nimet esiin
// @include        http://economy.erepublik.com/en/land/overview/*
// ==/UserScript==

function tyyli() {
tyyli = '.building_details a {opacity:1 !important}.land_holder li.no_quality .building_details {bottom:-147px}.land_holder li .building_details{bottom:-147px}.land_holder li.no_quality:hover .building_details {bottom:-147px}.land_holder li:hover .building_details {bottom:-147px}'

var head = document.getElementsByTagName('head')[0];
var elementti = document.createElement("style");
elementti.type = "text/css";
elementti.innerHTML = tyyli;
head.appendChild(elementti);

}

tyyli();
