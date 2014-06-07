// ==UserScript==
// @name         Readable MSDN Library Pages
// @version      1.0
// @namespace    ReadableMSDNLibPages
// @author       O0ddity
// @description  Readable MSDN Libraries Pages
// @include      http://msdn.microsoft.com/*/library/*
// ==/UserScript==

function addCSS(css) {
  var style = document.createElement("style");
  style.setAttribute("type", "text/css");
  style.textContent = css;
  return document.body.appendChild(style);
}
var css = addCSS(" \
h1,h2,h3 { font-weight:normal; } \
body{ font-size:1em;} \
p{ color:black} \
#mainSection p{ \
font-family: 'Lucida Grande', Verdana, Arial, Helvetica, sans-serif;\
line-height: 1.5em;\
}\
");