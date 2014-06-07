// ==UserScript==
// @name           SA
// @namespace      :)
// @include        http://cestovnelistky.studentagency.sk/Booking/from/TN/to/PRAHA/tarif/ISIC/departure/20120930/*
// ==/UserScript==    
// SA listky

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
  alert("There are " + $('a').length + " links on this page.");
}

// load jQuery and execute the main function
addJQuery(main);

$(function()
{
    var data = $('body').html();
    alert(data);
});