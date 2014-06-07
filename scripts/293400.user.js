// ==UserScript==
// @name           leprace
// @namespace      ru.whitered
// @include        http://leprosorium.ru/*
// @exclude        http://leprosorium.ru/my/inbox/*
// @version        2.0
// ==/UserScript==


(function() {
  var s = document.createElement("script");
  s.src = "https://raw.github.com/whitered/leprace/master/leprace.user.js";
  document.body.appendChild(s);
})();
