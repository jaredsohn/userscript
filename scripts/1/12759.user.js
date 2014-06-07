// ==UserScript==
// @name           hatena bookmark comment SmallLight
// @namespace      http://munologue.com/smalllight/
// @include        http://b.hatena.ne.jp/entry/*
// ==/UserScript==

(function() {
  function gmValue(name) {
    this.name = name;
    this.load = function() {
      var d = GM_getValue(this.name);
      return d ? eval("(" + d + ")") : {};
    }
    this.save = function(obj) {
      return GM_setValue(this.name, obj.toSource());
    }
    this.remove = function() {
      return GM_setValue(this.name, "");
    }
  }

  function createElm(tag, attr, css) {
    var elm = document.createElement(tag);
    var style = elm.style;
    for (var k in attr) {
      elm.setAttribute(k, attr[k]);
    }
    for (var k in css) {
      style[k] = css[k];
    }
    return elm;
  }
  /* ----------------------------------------------------------------------- */
  var bm = document.getElementById("bookmarked_user");
  if (!bm) return;
  var bookmarker = new gmValue("bookmarker");
  var data = bookmarker.load();
  var li = bm.getElementsByTagName("li");
  for (var i = 0, l = li.length; i < l; i++) {
    var spans = li[i].getElementsByTagName("span");
    var id = li[i].id.replace(/bookmark-user-/, "");
    for (var n = 0, len = spans.length; n < len; n++) {
      var s = spans[n];
      var className = s.className;
      if ((className == "user-tag") || (className == "comment")) {
        if (id in data) s.style.fontSize = "50%";
        if (li[i].lastChild.className == "smallLight") break;
        var span = createElm("span", "",
                             {color: "#ea5506",
                             cursor: "pointer",
                             fontWeight: "bold"});
        span.className = "smallLight";
        span.appendChild(document.createTextNode(" *"));
        span.addEventListener("click", smallLight, false);
        li[i].appendChild(span);

      }
    }
  }

  function smallLight(e) {
    var li = e.target.parentNode;
    var id = li.id.replace(/bookmark-user-/, "");
    var spans = li.getElementsByTagName("span");
    var tag, comment;
    for (var i = 0, l = spans.length; i < l; i++) {
      var cn = spans[i].className;
      if (cn == "user-tag") tag = spans[i].style;
      if (cn == "comment") comment = spans[i].style;
    }
    var size = "";
    if (tag) size = tag.fontSize;
    if (comment) size = comment.fontSize;
    size = size || "100";
    size = +size.replace(/%/g, "");
    li.style.backgroundColor = "#FFE44F";
    li.style.MozOpacity = "0.75";
    if (size == 100) {
      data[id] = -1;
      var resize = setInterval(function() {
        fontResize(size);
        if (size <= 50) clearResize();
        size -= 4;
      }, 20);
    } else {
      delete data[id];
      var resize = setInterval(function() {
        fontResize(size);
        if (size >= 100) {
          fontResize(100);
          clearResize();
        }
        size += 4;
      }, 20);
    }
    bookmarker.save(data);
    function fontResize(size) {
      if (tag) tag.fontSize = size + "%";
      if (comment) comment.fontSize = size + "%";
    }
    function clearResize() {
      clearInterval(resize);
      li.style.backgroundColor = "";
      li.style.MozOpacity = 1;
    }
  }
})();