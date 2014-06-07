// ==UserScript==
// @name           Todoist Note Remover
// @namespace      todoist
// @description    remoiving notes, that are available only for premium users
// @include        http://todoist.com/*
// @author         Sergei O. Udalov
// ==/UserScript==

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
  jQuery.noConflict(true);
  jQuery(function($){
    $("span.note_icon").remove();
  })($);
}

// load jQuery and execute the main function
addJQuery(main);