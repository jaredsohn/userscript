// ==UserScript==
// @name       Lions Report signature Removal
// @namespace  n/a
// @version    0.1
// @description Removes signatures from posts until they have the feature natively available.
// @match      http://lionsreport.com/forums/topic/*
// @copyright  2013+, HowSuhWeet
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
	$("div.bbp-signature").remove();
$("a.bbp-author-avatar img").remove();
    $("a.bbp-author-avatar").css({
        "width" : 80,
        "height" : 80
    });

}
 
// load jQuery and execute the main function
addJQuery(main);