// ==UserScript==
// @name           SIG Remover	
// @copyright      2013, Jdog
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        6.10.13
// @include        http://*pigskinempire.com/forum/topic.asp?*
// @description    Removes Sigs from forum
// ==/UserScript==
 
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
 
// the guts of this userscript
function main() {
   $('table').eq(6).find('.fcaption').hide();

}
 
// load jQuery and execute the main function
addJQuery(main);