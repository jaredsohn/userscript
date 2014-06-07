// ==UserScript==
// @name           DN.se stocks
// @namespace      http://userscripts.org/users/421858
// @description    Hides the stock market graph from the main page
// @include        http://*.dn.se/*
// ==/UserScript==


(function() {

var temperature = document.getElementById('temperature-widget-wrap');
if (temperature) {
    temperature.parentNode.removeChild(temperature);
}
var bors = document.getElementById('indices-chart-control');
if (bors) {
    bors.parentNode.removeChild(bors);
}

})();