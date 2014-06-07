// ==UserScript==
// @name          Facepunch Black theme
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Changes fp theme to back.
// @include       http://*.facepunch*.com/*
// ==/UserScript==


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

function main() {	

$(".blockhead").css("background-color","black");
$(".forumhead").css("background-color","black");
$(".newcontent_textcontrol").css("background-color","black");
$(".threadlisthead").css("background-color","black");
$(".threadfoot").css("background-color","black");
$(".threadhead").css("background-color","black");
$(".popupctrl").css("background-color","black");
$(".footer").css("background-color","black");

}

addJQuery(main);