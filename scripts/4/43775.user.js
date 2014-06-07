// ==UserScript==
// @name           twit_monkey
// @namespace      http://jugyo.org/
// @description    twitter poster
// @include        http://*
// ==/UserScript==
//
// version: 1.04
//

(function() {

  if (self.location.href != top.location.href) {
    return;
  }

  function init() {
    init_tiwt_content();
    init_tiwt_poster();
  }

  function init_tiwt_content() {
    var element = c("div", "tiwt_content");
    with (element) {
      with (style) {
        zIndex = 300;
        backgroundColor = "#9AE4E8";
        position = "fixed";
        top = "40px";
        right = "0px";
        overflow = "auto";
        MozOpacity = 0.80;
        minHeight = "16px";
        minWidth = "16px";
        padding = "2px";
      }
      addEventListener("mouseover", show_tiwt, false);
      addEventListener("mouseout", hide_tiwt, false);
    }
    a(document.body, element);
  }

  function init_tiwt_poster() {
    var element = c("div", "tiwt_poster");
    with (element) {
      with (style) {
        padding = "2px";
        display = "none";
        textAlign = "right";
      }
    }

    var textarea = c("textarea", "tiwt_textarea");
    with (textarea) {
      with (style) {
        display = "block";
        width = "400px";
        height = "60px";
        marginBottom = "2px";
        border = "solid 1px gray";
        borderBottomColor = "silver";
        borderRightColor = "silver";
      }
    }
    a(element, textarea);

    var img = c("img", "twit_indicator");
    var img_data = 'data:image/gif;base64,'
                   + 'R0lGODlhEAAQAPQAAP///5aWlvv7+6ysrMzMzJiYmKWlpe3t7dra2p+fn8bGxr+/v/Pz89TU1Ofn57Ozs7m5uQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla+KIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAAKAAEALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK+o2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkEAAoAAgAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC+0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU/NXcDBHwkaw1cKQ8MiyEAIfkEAAoAAwAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK+kCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm/4AhACH5BAAKAAQALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAAKAAUALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg+boUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC+RAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA==';
    img.setAttribute("src", img_data);
    with (img) {
      with (style) {
        display = "none";
        margin = "0 2px";
      }
    }
    a(element, img);

    var button = c("button", "tiwt_button");
    with (button) {
      innerHTML = "Post";
      with (style) {
        backgroundColor = "silver";
        border = "solid 1px gray";
      }
      addEventListener("click", post, false);
    }
    a(element, button);

    a(e("tiwt_content"), element);
  }

  function post() {
    e("tiwt_button").style.display = "none";
    e("twit_indicator").style.display = "inline";

    GM_xmlhttpRequest({
        method: 'POST',
        url: 'http://twitter.com/statuses/update.json',
        data: 'status=' + encodeURIComponent(e("tiwt_textarea").value),
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        onload : function (req) {
          e("tiwt_button").style.display = "inline";
          e("twit_indicator").style.display = "none";
          e("tiwt_textarea").value = "";
          e("tiwt_textarea").focus();
        },
    });

  }

  function show_tiwt() {
    d("tiwt_poster", "block");
    e("tiwt_textarea").focus();
  }

  function hide_tiwt() {
    d("tiwt_poster", "none");
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

  function d(id, value) {
    e(id).style.display = value;
  }

  init();

})();
