// ==UserScript==
// @name         viewvc-link-log-view
// @version      0.1
// @description  Provide links to log view for directories in ViewVC until http://viewvc.tigris.org/issues/show_bug.cgi?id=470 is implemented
// @author       Keegan Witt
// @include      http://svn.*/viewvc/*
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
    var loc = "" + document.location.href;
    var view = new RegExp(/.+view=/);
    if (!loc.match(view)) {
//        $("h1").after("<a href=\"" + encodeURI(document.location.href + "?view=log") + "\"><img src=\"/viewvc/*docroot*/images/log.png\" height=\"16\" width=\"16\"> Log" + "</a>");
        $("h1").after("<a href=\"" + encodeURI(document.location.href + "?view=log") + "\">Log" + "</a>" + "<br/>");
    }
}

// load jQuery and execute the main function
addJQuery(main);
