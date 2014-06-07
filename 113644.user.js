// ==UserScript==
// @name           DisableFBSidebar
// @version        0.2
// @namespace      uk.co.emrgnt.disablefbsidebar
// @homepage       https://github.com/danieljohnmorris/disablefbsidebar
// @include        *www.facebook.com/*
// @description    Hide mini fb ticker and subscriptions from right hand column
// ==/UserScript==

// document.getElementById('pagelet_rhc_ticker').style.display = 'none';
// document.getElementById('pagelet_ego_pane').style.display = 'none';

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
	$(document).ready(function() {
	    $("#pagelet_rhc_ticker").hide();
	    $("#pagelet_ego_pane").hide();
	});
}

// load jQuery and execute the main function
addJQuery(main);