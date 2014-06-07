// ==UserScript==
// @name	Clean BitcoinCharts
// @namespace	cleanbitcoincharts
// @description	Get rid of anything you dont need
// @include	http://bitcoincharts.com/
// @include	http://bitcoincharts.com/#
// @include	http://bitcoincharts.com/bitcoin/
// @include	http://bitcoincharts.com/markets/
// @include	http://bitcoincharts.com/charts/
// @version	1.0
// ==/UserScript==


function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  // Note, jQ replaces $ to avoid conflicts.
    jQ("#footer").hide();
    jQ("#menu").appendTo('body');
    jQ("#header").hide();
    
}

// load jQuery and execute the main function
addJQuery(main);