// ==UserScript==
// @name          AdBlock for Unicom
// @namespace     adblock_for_unicom
// @description   Block ads which hijacks DNS of many Unicom users in Shanxi, China
// @include       http://www.kcld.net/*
// @include       http://www.ty.sx.cn/*
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
    window.location = $('#content').attr('src');
}

addJQuery(main);
