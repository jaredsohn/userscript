// ==UserScript==
// @namespace       ajorpheus
// @name            exforsys.com cleanup
// @description     This version works for both Firefox and Chrome
// @include         http://www.exforsys.com/*
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
//  alert("There are " + $('a').length + " links on this page.");
    $("b:contains('Sponsored')").parent().parent().next("br").remove().end().next("br").remove().end().remove();
    $("b:contains('Read Next')").parent().nextAll().remove();
    $("div#EchoTopic").nextAll().remove();
    $("div.center_box_left").remove();
    $("div.center").css({width: 900});
    $("iframe").remove();
}

// load jQuery and execute the main function
addJQuery(main);
