// ==UserScript==
// @name         Nokaut id
// @namespace    nokautid
// @include      http://www.nokaut.pl/*
// @author       matczar
// @version      0.2
// @description  Wyswietla id przedmiotu na nakaut.pl
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
	$id = jQuery('h1').attr('id');
	$id = $id.replace('p','');
	jQuery('body').prepend('<div style="background-color: #0000FF;    position: fixed;    z-index: 100;    padding: 5px; color: #fff; font-weight: bold;">'+ $id +'</div>');
}

// load jQuery and execute the main function
addJQuery(main);
