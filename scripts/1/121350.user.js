// ==UserScript==
// @name           Lepra Best Comments Link
// @namespace      ru.whitered
// @include        http://leprosorium.ru/*
// @include        http://*.leprosorium.ru/*
// @exclude        http://leprosorium.ru/users/*
// @version        1.1
// ==/UserScript==


function includeScript(url) {
  var s = document.createElement("script");
  s.src = url;
  document.body.appendChild(s);
}

includeScript("https://raw.github.com/whitered/lepra_best_comments/master/LepraBestComments.js");