// ==UserScript==
// @name       Seattle 911 Maps Links
// @namespace  http://chickensnack.com
// @version    0.1
// @description  Adds google maps links to the addresses on the Seattle FD Real-time 911 Page: http://www2.seattle.gov/fire/realTime911/getDatePubTab.asp
// @match      http://www2.seattle.gov/fire/realTime911/*
// @copyright  2012+, Brian Lee
// ==/UserScript==

// load jQuery
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
    $('tr td.active:nth-child(5), tr td.closed:nth-child(5)').each( function(index) {
        var locString = $(this).html();
        var locAdd = $(this).html().replace('/','%26');
        $(this).html("<a style='color:inherit' href='http://maps.google.com/maps?q=" + locAdd + "'>" + locString + "</a>");
    });
}

// load jQuery and execute the main function
addJQuery(main);
