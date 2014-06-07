// ==UserScript==
// @name    Scribd downloader
// @author  Witiko
// @version 1.0.9
// @include http://*.scribd.com/doc/*
// @include https://*.scribd.com/doc/*
// ==/UserScript==

(function(href) { // Future-proof code for unknown layouts
  var a     = el("a"),
      arrow = el("span"),
      span  = arrow.cloneNode(false);
  a.href = href;
  a.style.color = "#fff";
  arrow.style.color = "#3fc3f6";
  span.style.fontFamily = "Athelas, serif";
  with(span.style) {
    textShadow = "#000 0px 0px 2px";
    color = "#aaa";
    fontSize = "smaller";
    position = "absolute";
    top = "0.5em";
    left = "0.5em";
  }; document.body.appendChild(append(
    span, txt("("), append(
      a, append(
        arrow, txt("▼")
      ), txt("Direct Download")
    ), txt(" )")
  ));
})(location.href.replace(/^.*?(\d+).*$/, "http://www.scribd.com/document_downloads/$1?extension=pdf&source=mobile_download"));

function el(name) {
  return document.createElement(name);
} function txt(text) {
  return document.createTextNode(text);
} function append(parent) {
  var i = 0, j, l = (j = arguments).length - 1;
  while(i  !==  l) parent.appendChild(j[++i]); return parent;
}