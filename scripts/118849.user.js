// ==UserScript==
// @name   Runescape Menu & Ads Remover
// @description   Removes the menu and the ads.
// @author  Jeppe Rune Mortensen
// @version  1.1
// @include  http://world*.runescape.com/*
// ==/UserScript==
(function() {
  function $(id) {
    return document.getElementById(id);
  }
  function removeElement(id) {
    $(id).parentNode.removeChild($(id));
  }
  function fs(id) {
    var a = $(id);
    a.style.width = "100%";
    a.style.height = "100%";
    a.style.position = "absolute";
    a.style.top = "0px";
    a.style.left = "0px";
  }
  function init() {
    var a;
    removeElement("top");
    removeElement("menu");
    removeElement("bottom");
    fs("dynamic");
    fs("game");
  }
  init();
})();