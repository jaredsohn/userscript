// ==UserScript==
// @name           leproklava
// @namespace      ru.whitered
// @include        http://dirty.ru/*
// @include        http://*.dirty.ru/*
// @include        http://leprosorium.ru/*
// @include        http://*.leprosorium.ru/*
// ==/UserScript==


function includeScript(url) {
  var s = document.createElement("script");
  s.src = url;
  document.body.appendChild(s);
}

includeScript("https://github.com/whitered/leproklava/raw/master/leproklava.js");