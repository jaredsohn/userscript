// ==UserScript==
// @name           show_cookie
// @namespace      http://jugyo.org/
// @include        http://*
// ==/UserScript==

(function() {

  element_id = "show_cookie";

  function main() {
    var wrap = document.createElement("div");
    wrap.addEventListener("mouseover", show, false);
    wrap.addEventListener("mouseout", hide, false);
    with(wrap.style) {
      fontFamily = "verdana, sans-serif";
      fontSize = "12px";
      textAlign = "left";
      margin = 0;
      padding = "6px";
      lineHeight = "15px";
      color = "black";
      backgroundColor = "gray";
      MozOpacity = 0.90;
      border = "none";
      position = "fixed";
      bottom = "0px";
      left = "0px";
      overflow = "auto";
    }
    document.body.appendChild(wrap);

    var content = document.createElement("div");
    content.id = element_id;
    with (content.style) {
      display = "none";
    }
    content.innerHTML = document.cookie.split(/;[ ]*/).join('<br />');
    wrap.appendChild(content);
  }

  function show() {
    document.getElementById(element_id).style.display = "block";
  }

  function hide() {
    document.getElementById(element_id).style.display = "none";
  }

  main();

})();
