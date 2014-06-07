// ==UserScript==

// @name          jQueryCalendar

// @description   Include jQuery to google calendar

// @include       https://www.google.com/calendar/render

// @include       https://www.google.com/calendar/render/*

// ==/UserScript==

var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-latest.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://code.jquery.com/jquery-latest.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
    if (typeof jQuery == 'undefined') {
        alert("jQuery has not be loaded.");
    }
    
    $('#onegoogbar').slideUp();
    $('div#nav').slideUp();
}

// load jQuery and execute the main function
addJQuery(main);

