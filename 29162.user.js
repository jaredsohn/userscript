// ==UserScript==
// @name           TranspImg
// @version        0.1
// @namespace      TranspImg
// @description    Makes images in posts look transparent
// @include        *
// @include        
// @author         Marilyn Omen
// ==/UserScript==

var css = "\
  img { \
    opacity: 0.02; \
    max-width: 600px; \
    max-height: 600px; \
  } \
  img:hover { \
    opacity: 1; \
    max-width: none; \
    max-height: none; \
  }";
style = document.createElement("STYLE");
style.type = "text/css";
style.innerHTML = css;
document.body.appendChild(style);