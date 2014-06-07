// ==UserScript==
// @name          hatebu_monkey
// @namespace     http://jugyo.org/
// @description   Hatena Bookmark Comments Viewer
// @include       http://*
// ==/UserScript==
//
// version: 1.03
//

(function() {

  if (self.location.href != top.location.href) {
    return;
  }

  function main() {
    var element = c("div");
    with (element) {
      id = "hatebu_content";
      init_style(style);
      with (style) {
        zIndex = 300;
        position = "fixed";
        bottom = "0px";
        right = "0px";
        overflow = "auto";
        MozOpacity = 0.60;
        minHeight = "16px";
        minWidth = "16px";
        maxHeight = "400px";
        padding = "2px";
      }
      addEventListener("mouseover", show_hatebu, false);
      addEventListener("mouseout", hide_hatebu, false);
    }
    var status_element = c("div");
    with(status_element) {
      id = "hatebu_status";
      init_style(style);
      style.textAlign = "right";
    }
    element.appendChild(status_element);
    document.body.appendChild(element);
  }

  function show_hatebu() {
    var hatebu_elem = e("hatebu");
    if (hatebu_elem == null) {
      u("hatebu_status", "loading...");
      var hatebu_elem = c("div");
      with (hatebu_elem) {
        id = "hatebu";
        init_style(style);
        with (style) { display = "none"; }
      }
      e("hatebu_content").appendChild(hatebu_elem);
      get_hatebu();
    } else {
      hatebu_elem.style.display = "block";
    }
  }

  function hide_hatebu() {
    var hatebu_elem = e("hatebu");
    if (hatebu_elem) {
      hatebu_elem.style.display = "none";
    }
  }

  function get_hatebu() {
    var url = 'http://b.hatena.ne.jp/entry/json/?url=' + escape(top.location.href) + '&callback=get_hatebu_json_callback';
    GM_xmlhttpRequest({
        method : "GET",
        url : url,
        onload : function (req) {
            eval(req.responseText);
        },
      });
  }

  function get_hatebu_json_callback(item) {

    e("hatebu_content").style.MozOpacity = 0.90;

    if (item == null) {
      u("hatebu_status", "0");
      return;
    }

    u(
      "hatebu_status",
      '<a href="http://b.hatena.ne.jp/entry/' + escape(top.location.href) + '" target="_blank" style="font-weight: bold; padding: 0; color: #FFBDBD; text-decoration: underline;">' +
      item.count +
      '</a>'
    );

    hatebu_elem = e("hatebu");
    
    var table = c('table');
    with (table) {
      init_style(style);
      with (style) {
        borderCollapse = "collapse";
      }
    }

    var col1 = c('col');
    col1.setAttribute('width', "140")
    table.appendChild(col1);
    var col2 = c('col');
    col2.setAttribute('width', "600")
    table.appendChild(col2);

    var bookmarks = item.bookmarks;
    for (var n = 0; n < bookmarks.length; n++) {
      var bookmark = bookmarks[n];
      if (bookmark.comment) {
        var tr = c('tr');

        var user_elem = c('td');
        with (user_elem) {
          init_style(style);
          with (style) {
            textAlign = "right";
            padding = "4px";
            fontWeight = "bold";
            verticalAlign = "middle";
          }
          innerHTML =
            '<a href="http://b.hatena.ne.jp/' + bookmark.user + '/" style="margin-right: 2px;">' +
            '<img src="' + create_user_icon_src(bookmark.user) + '" style="border: none; vertical-align: middle;" alt="" height="16" width="16"/>' +
            '</a>' +
            '<a href="http://b.hatena.ne.jp/' + bookmark.user + '/" style="color: #8FA6F1; text-decoration: underline;">' +
            bookmark.user +
            '</a>';
        }

        var comment_elem = c('td');
        with (comment_elem) {
          init_style(style);
          with (style) {
            verticalAlign = "middle";
          }
          innerHTML = bookmark.comment;
        }
        tr.appendChild(user_elem);
        tr.appendChild(comment_elem);
        table.appendChild(tr);
      }
    }

    if (table.childNodes.length > 0) {
      hatebu_elem.appendChild(table);
      show_hatebu();
    }
  }

  function create_user_icon_src(user_name) {
    return 'http://www.hatena.ne.jp/users/' + user_name.substring(0, 2).toLowerCase() + '/' + user_name + '/profile_s.gif'
  }

  function init_style(style) {
    with(style) {
      fontSize = "11px";
      textAlign = "left";
      padding = 0;
      margin = 0;
      lineHeight = "15px";
      color = "white";
      backgroundColor = "#1841CE";
      border = "none";
    }
  }
  
  function c(tag_name) {
    return document.createElement(tag_name);
  }
  
  function u(id, text) {
    e(id).innerHTML = text;
  }
  
  function e(id) {
    return document.getElementById(id);
  }

  main();
  
})();
