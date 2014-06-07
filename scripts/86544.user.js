// ==UserScript==
// @name           CleanSkypeLog
// @namespace      AJ
// @description    Removes all skype entries which has 0.000 USD
// @include        https://secure.skype.com/account/call-history*
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function debug(log_txt) {
    if (console != undefined) {
        console.log(log_txt);
    }
}

// the guts of this userscript
function main() {
    $(".price:contains('0.000')").parents("tr").remove();
}

// load jQuery and execute the main function
addJQuery(main);
