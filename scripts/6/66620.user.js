// ==UserScript==
// @name          jQuery Loo
// @author        Franck
// @include       http://*legends-of-olympia.net/V2/jouer2.php
// ==/UserScript==


// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
  var table = $("#s4");
  create_code(table);
  var button = $("<table><tr><td><a></a></td></tr></table>")
    .text("CODE")
    .css("background", "#FFFFFF")
    .css("border", "1px solid #000")
    .click(function(){
      $("#container").toggle();
    })
    .appendTo("h1.nm");
  
  function create_code(table){
    container = $("<div></div>")
      .attr("id", "container")
      .css("position", "absolute")
      .css("top", "100px")
      .css("left", "100px");
      
    $("<a></a>")
      .text("fermer")
      .click(function(){
        $("#container").html("");
      })
      .appendTo(container);
    
    $("<textarea></textarea>")
      .text(table.html())
      .css("width", "500px")
      .css("height", "500px")
      .appendTo(container);
      
    container.insertAfter("body").hide();
  }  
}