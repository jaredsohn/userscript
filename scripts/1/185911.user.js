// ==UserScript==
// @name       m.hani test
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://m.hani.co.kr/arti/*
// @copyright  2012+, You
// ==/UserScript==

setTimeout(function () {
  if (!document.getElementById("articleRecopick1")) return;

  document.getElementById("articleRecopick1").setAttribute("data-type", "")
  document.getElementById("articleRecopick1").setAttribute("class", "");
  document.getElementById("articleRecopick1").style.visibility = "visible";
  document.getElementById("articleRecopick1").style.display = "block";
  document.getElementById("articleRecopick1").style.height = "auto";
  document.getElementById("articleRecopick1").setAttribute("data-widget_id", "4aT6dbcM");

  recoPick('widget', 'articleRecopick1');
}, 2000);