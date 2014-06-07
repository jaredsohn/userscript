// ==UserScript==
// @name           make_link
// @namespace      http://jugyo.org/
// @description    make link html
// @include        http://*
// ==/UserScript==

(function() {

  if (self.location.href != top.location.href) {
    return;
  }

  function init() {
    var content = c("div", "make_link_content");
    with (content) {
      with (style) {
        backgroundColor = "#FF552A";
        position = "fixed";
        top = "80px";
        right = "0px";
        overflow = "auto";
        MozOpacity = 0.80;
        minHeight = "16px";
        minWidth = "16px";
        padding = "2px";
        zIndex = 300;
      }
      addEventListener("mouseover", show, false);
      addEventListener("mouseout", hide, false);
    }
    a(document.body, content);
  }

  function init_textarea() {
    init_textarea = null;

    var textarea = c("textarea", "make_link_textarea");
    with (textarea.style) {
      display = "none";
      width = "400px";
      margin = "2px";
      height = "5em";
      borderTop = "solid 1px #3C3C3C";
      borderLeft = "solid 1px #3C3C3C";
    }
    a(e("make_link_content"), textarea);
  }

  function show() {
    if (init_textarea != null) init_textarea();

    var text = '<a href="' + top.location.href + '">' + document.title + '</a>';
    var textarea = e("make_link_textarea");
    textarea.innerHTML = text;
    textarea.style.display = "block";
    textarea.focus();
    textarea.select();
  }

  function hide() {
    var textarea = e("make_link_textarea");
    textarea.style.display = "none";
  }

  function a(parent, child) {
    parent.appendChild(child);
  }

  function c(tag_name, element_id) {
    element = document.createElement(tag_name);
    with (element) {
      id = element_id;
      init_style(style);
    }
    return element;
  }

  function u(id, text) {
    e(id).innerHTML = text;
  }

  function e(id) {
    return document.getElementById(id);
  }

  function init_style(style) {
    with(style) {
      fontFamily = "verdana, sans-serif";
      fontSize = "11px";
      textAlign = "left";
      padding = 0;
      margin = 0;
      lineHeight = "15px";
      color = "black";
      backgroundColor = "none";
      border = "none";
    }
  }

  init();

})();
