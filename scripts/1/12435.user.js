// ==UserScript==
// @name           LeproImg
// @version        0.1
// @namespace      LeproImg
// @description    Makes images in posts look transparent
// @include        http://leprosorium.ru/*
// @include        http://www.leprosorium.ru/*
// @author         Marilyn Omen
// ==/UserScript==

var css = "\
  div.post img { \
    opacity: 0.25; \
    max-width: 600px; \
    max-height: 600px; \
  } \
  div.post img:hover { \
    opacity: 1; \
    max-width: none; \
    max-height: none; \
  }";
style = document.createElement("STYLE");
style.type = "text/css";
style.innerHTML = css;
document.body.appendChild(style);