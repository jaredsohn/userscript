// ==UserScript==
// @name           Instagram Stream JK Navigation
// @description    Adding J/K key navigation to instagram's new online stream
// @version        1.0.0
// @author         Pedro Gaspar 
// @include        http://www.instagram.com/*
// @include        http://instagram.com/*
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
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

  var curr = jQ(".timelineItem").first();
  var not_last = ":not(.timelineLast)";

  jQ("body").keypress(function(event) {
    if ((event.which == 74 || event.which == 106) && curr.next(not_last).length) {
      jQ("body").scrollTop(curr.next(not_last).offset().top - 50);
      curr = curr.next(not_last);
    }
    if ((event.which == 75 || event.which == 107) && curr.prev(not_last).length) {
      jQ("body").scrollTop(curr.prev(not_last).offset().top - 50);
      curr = curr.prev(not_last);
    }
  });

}

// load jQuery and execute the main function
addJQuery(main);


