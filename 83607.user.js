// ==UserScript==
// @name           craigslist account listings toggle
// @namespace      7null.com/GM_scripts
// @match https://accounts.craigslist.org/*
// @include https://accounts.craigslist.org/*
// @description    Very basic script to toggle hide/show listing status on account page for your craigslist listings.   
// ==/UserScript==
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js");
  script.addEventListener('load', function () {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
function main() {
(function () {
$("tr[style*=lightgreen]").addClass("lightgreen");
$('tr[style*=lightblue]').addClass("lightblue");
$('tr[style*=lightgrey]').addClass("lightgrey");
$('tr[style*=rgb]').addClass("rgbx");
$('tr[style*=cc99ff]').addClass("cc99ff");
$('tr[style*=pink]').addClass("pink");
$("td:contains('active')").click(function () {$(".lightgreen").toggle(); });
$("td:contains('pending')").click(function () {$(".lightgrey").toggle(); });
$("td:contains('removed by me')").click(function () {$(".lightblue").toggle(); });
$("td:contains('expired')").click(function () {$(".rgbx").toggle(); });
$("td:contains('expired')").click(function () {$(".cc99ff").toggle(); });
$("td:contains('flagged')").click(function () {$(".pink").toggle(); });
}());
}
addJQuery(main);

