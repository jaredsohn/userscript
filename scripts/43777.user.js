// ==UserScript==
// @name           google_tasks
// @namespace      http://jugyo.org/
// @description    google tasks
// @include        http://*
// ==/UserScript==

(function() {

  if (self.location.href != top.location.href) {
    return;
  }

  var body = null;
  var content = null;

  function init() {
    var body_bottom = 60;
    body = c("div");
    with (body) {
      with (style) {
        zIndex = 300;
        backgroundColor = "silver";
        position = "fixed";
        bottom = body_bottom + "px";
        right = "0px";
        MozOpacity = 0.90;
        minHeight = "18px";
        minWidth = "18px";
        padding = "1px";
      }
      addEventListener("mouseover", show_content, false);
      addEventListener("mouseout", 
        function (e) {
          if (e.clientY < body_bottom || e.clientY > body_bottom + body.clientHeight || e.layerX < 0 || e.clientX > body.clientWidth) {
            hide_content();
          }
        },
        false
      );
    }
    a(document.body, body);
  }

  function init_content() {
    content = c("iframe");
    content.setAttribute('src', 'http://mail.google.com/tasks/ig');
    with(content.style) {
      width = '300px';
      height = '360px';
      padding = 0;
      margin = 0;
      color = "black";
      border = "none";
    }
    a(body, content);
  }

  function show_content() {
    if (content == null) {
      init_content();
    }
    content.style.display = "block";
  }

  function hide_content() {
    content.style.display = "none";
  }

  function a(parent, child) {
    parent.appendChild(child);
  }

  function c(tag_name, element_id) {
    return document.createElement(tag_name);
  }

  init();

})();

