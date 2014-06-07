// ==UserScript==
// @name        Redmine Ticket With Name
// @namespace   http://www.manuelgeier.com
// @description Displays the name of the ticket next to the ticket number, e.g. #123 -> #123 Title of the Ticket
// @include     */projects/*/wiki*
// @include     */projects/*/issues/new
// @include     */issues/*
// @version     1.0
// @grant		none
// ==/UserScript==

( function(){

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
    
    console.log("Redmine Ticket With Name started.");
    
    jQ("a.issue").each(function() {
        var title = jQ(this).attr('title');
        title = title.substring(0, title.lastIndexOf("(") - 1);
        jQ(this).append('<span>: '+title+'</span>');
    });
    
}

// load jQuery and execute the main function
addJQuery(main);

} )();