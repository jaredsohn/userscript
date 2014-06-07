// ==UserScript==
// @name           Kijiji click sanity
// @namespace      http://greasemonkey.jaredmcateer.com
// @description    Removes the click event handler on table cells that breaks ctrl clicking listings to open in a new tab.
// @include        *.kijiji.*
// ==/UserScript==



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
console.log($('td'));
     $('#SNB_Results td').unbind('click');
}

// load jQuery and execute the main function
addJQuery(main);