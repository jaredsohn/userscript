// ==UserScript==
// @name          Sporthirado.hu overlay remover
// @namespace     http://sporthirado.hu
// @description   Removes the ugly overlay from sporthirado.hu
// @copyright     2012+, paha (http://userscripts.org/users/paha77)
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       (CC); http://creativecommons.org/licenses/by-nc-sa/3.0/
// @match http://*.sporthirado.hu/*
// @match http://www.sporthirado.hu/*
// @match https://*.sporthirado.hu/*
// @match https://www.sporthirado.hu/*
// @version       0.0.13
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
function remover() {
  try {
    $(".popover").remove();
    $(".overlay").remove();
  } catch (e) {
  }
}

// load jQuery and execute the main function
addJQuery(remover);



