// ==UserScript==
// @name           google_ja2en
// @namespace      http://jugyo.org/
// @description    translate japanese to english
// @include        http://*
// ==/UserScript==
//
// version: 1.00
//

(function() {

  if (self.location.href != top.location.href) {
    return;
  }

  var textarea_from = null;
  var textarea_to = null;
  var body = null;
  var content = null;
  var status = null;

  function init() {
    init_body();
    init_content();
  }

  function init_body() {
    var body_top = 40;
    body = c("div");
    with (body) {
      with (style) {
        zIndex = 300;
        backgroundColor = "#AAD4FF";
        border = "solid 1px #E1E1E1";
        position = "fixed";
        top = body_top + "px";
        left = "0px";
        overflow = "auto";
        MozOpacity = 0.90;
        minHeight = "16px";
        minWidth = "16px";
        padding = "2px";
      }
      addEventListener("mouseover", show_content, false);
      addEventListener("mouseout", 
        function (e) {
          if (e.clientY < body_top || e.clientY > body_top + body.clientHeight || e.layerX < 0 || e.clientX > body.clientWidth) {
            hide_content();
          }
        },
      false);
      addEventListener("keydown", 
        function(e) {
          if (e.keyCode == 27) {
            hide_content();
          }
        },
        false);
    }
    status = c("div");
    a(document.body, body);
  }

  function init_content() {
    content = c("div");
    with (content) {
      with (style) {
        padding = "2px";
        display = "none";
        textAlign = "right";
      }
      addEventListener("keydown", 
        function(e) {
          if (e.keyCode != 13) {
            return;
          }
          translate();
          textarea_from.focus();
          e.preventDefault();
        },
        false);
    }

    textarea_from = c_textarea();
    a(content, textarea_from);

    var button = c("button");
    with (button) {
      innerHTML = "ja → en";
      with (style) {
        borderBottomColor = "gray";
        border = "solid 1px gray";
        margin = "2px 0";
        fontSize = "80%";
      }
      addEventListener("click", 
        function() {
          translate();
          textarea_from.focus();
        },
        false);
    }
    a(content, button);

    textarea_to = c_textarea();
    a(content, textarea_to);

    var p = c("p");
    with(p.style) {
      backgroundColor = "transparent";
      textAlign = "right";
      fontSize = "80%";
    }
    p.innerHTML = 'powered by <a href="http://www.google.co.jp/language_tools?hl=ja" target="_blank">Google Language Tools.</a>';
    a(content, p);

    a(body, content);
  }

  function en2ja(text) {
    if (text.length <= 0) {
      textarea_to.value = "";
      return;
    }
    
    in_progress(true);
    textarea_to.value = 'Translating...';
    var data = 'langpair=ja|en&text=' + text;
    GM_xmlhttpRequest({
        method: 'POST',
        url: 'http://translate.google.co.jp/translate_t',
        data: data,
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        onload : function (req) {
          var match = req.responseText.match(/<div id=result_box[^>]+>([^<>]+)</);
          textarea_to.value = match[1];
          in_progress(false);
        },
    });
  }

  function in_progress(enable) {
    if (enable) {
      textarea_to.readOnly = true;
      textarea_to.style.backgroundColor = "#E1E1E1";
    } else {
      textarea_to.readOnly = false;
      textarea_to.style.backgroundColor = "white";
    }
  }

  function show_content() {
    if (content.style.display == "block") {
      return;
    }
    content.style.display = "block";
    var selection = window.getSelection().toString();
    if (textarea_from.value != selection && selection != '') {
      textarea_from.value = selection;
      translate();
    }
    if (selection == '') {
      textarea_from.focus();
    }
  }

  function hide_content() {
    content.style.display = "none";
  }

  function translate() {
    en2ja(textarea_from.value);
  }

  function init_style(style) {
    with(style) {
      fontSize = "12px";
      textAlign = "left";
      padding = 0;
      margin = 0;
      lineHeight = "15px";
      color = "black";
      backgroundColor = "none";
      border = "none";
    }
  }

  function a(parent, child) {
    parent.appendChild(child);
  }
  
  function c_textarea() {
    textarea = c("textarea");
    with (textarea) {
      with (style) {
        display = "block";
        width = "320px";
        height = "100px";
        margin = "2px 0px";
        border = "solid 1px gray";
        borderBottomColor = "silver";
        borderRightColor = "silver";
      }
    }
    return textarea;
  }

  function c(tag_name, element_id) {
    element = document.createElement(tag_name);
    init_style(element.style);
    return element;
  }

  init();

})();

