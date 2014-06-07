// ==UserScript==
// @name           Firefoxbugfiks for Underskog
// @namespace      http://henrik.synth.no
// @description    Fikser displaybug på underskog.no
// @include        http://underskog.no/*
// @include        http://*.underskog.no/*
// ==/UserScript==

var version = 200910061900;

function letsFilter() {
  var mainc = document.getElementById("maincontent");
  if (mainc) {
    mainc.innerHTML += "";
  }
  var flu = document.getElementById("flash_uploader_0");
  if (flu) {
    flu.style.height = "15px";
    flu.style.width = "50px";
  }
}

window.onload = letsFilter();
