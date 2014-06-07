// ==UserScript==
// @name           Tumblr Dashboard Bookmarker
// @namespace      freevo
// @include        http://www.tumblr.com/dashboard
// @include        http://www.tumblr.com/dashboard*
// @description    Bookmark your last read post on tumblr, and automatically scroll to it when you come back.
// @version        1.2
// ==/UserScript==
var c, d, e, f, g, h, y;
c = document.getElementsByClassName("dashboard_subpages")[0];
if(typeof GM_getValue == "undefined") {
  var GM_getValue = function(a) { return window.localStorage.getItem(a) }
  var GM_setValue = function(r,s) { window.localStorage.setItem(r,s) }
}
if(c) {
  y = document.getElementById("auto_pagination_loader");
  h = y !== null;
  d = document.createElement("a");
  d.title = "Mark this page read and save position";
  d.href = "#";
  d.addEventListener("click", k, true);
  d.innerHTML = "Bookmark this page";
  e = document.createElement("a");
  e.title = "Find last read post";
  e.href = "#";
  e.addEventListener("click", l, true);
  e.innerHTML = "Go to bookmark";
  f = document.createElement("li");
  g = document.createElement("li");
  f.setAttribute("style", "padding-left:20px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEhJREFUeNpi/P//PwO5gImBAsCCLrD94C2sTvG0V2MkqBmbQlwGUuTsUc1oIYwrlPFGFUgTLLrwGcBEKJ6xJQ4YYKQkbQMEGAC/6B1qqN6JxwAAAABJRU5ErkJggg==) no-repeat");
  g.setAttribute("style", "padding-left:20px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAANCAYAAAB2HjRBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAANhJREFUeNpi/P//P8P2g7cZCAFPe1UMMSYktgUQpwHxayD+DMTbgVgdn4EsSGxtIO4GYnco3wyI9wKxHhC/w6YZ2eYOqMYTUDwJiKWBOBmXzcia+bDI3wdiUWI0PwJiRTR5EP8wMZo9oX7+D8T3oDQIbAJiKWCMMOHTfAcaaFlAvAyIfaDif6FhoAw0gBlXaIPARyCejsQH+fcUEAtDQ94WiB/CJBlBiQQXANrECKQkgfgIyOlAfBeYWLSxORtbqgKZ/ByIzYH4GhC/R5bHazMhwMRAAQAIMABpCzQnmwzz8wAAAABJRU5ErkJggg==) no-repeat");
  f.id = "tdm_save_position";
  g.id = "tdm_find_position";
  f.appendChild(d);
  c.appendChild(f);
  g.appendChild(e);
  c.appendChild(g)
  document.addEventListener("keydown", m, false);
  var n = 0, p = document.createElement("div"), pf = document.createElement("li");
  p.setAttribute("style", "position:fixed;top:90px;right:20px;z-index:3000;opacity:0.8;width:50px;height:50px;cursor:pointer;display:none");
  var i = document.createElement("img");
	i.src = "data:image/png;base64,\n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";
  p.appendChild(i);
  p.id = "stopsearch";
  p.addEventListener("click", function(a) {
    GM_setValue("TDM_searching", "0");
    a.target.style.display = "none";
    a && a.preventDefault();
    return false
  }, true);
  document.getElementById("container").appendChild(p);
  pf.setAttribute("class","notification single_notification");
  pf.innerHTML = "<b>You have marked this post:</b>";
  GM_getValue("TDM_searching") === "1" && l();
}
function m(a) {
  if(a.altKey == 1 && a.shiftKey == 0 && a.ctrlKey == 1) {
    a.keyCode == 77 && k(a);
    a.keyCode == 76 && l(a)
  }
  a.keyCode == 27 && GM_setValue("TDM_searching", "0")
}
function k(a) {
  var b, o, i;
  b = document.getElementById("posts");
  o = document.getElementById("tdm_save_position");
  for(i = 0;b.childNodes[i].id == "new_post" || !b.childNodes[i].id || !b.childNodes[i].localName;) {
    i++
  }
  GM_setValue("TDM_lastRead", b.childNodes[i].id);
  o.innerHTML += "&nbsp;&nbsp;(marked)";
  a && a.preventDefault()
}
function l(a) {
  if(!GM_getValue("TDM_lastRead")) {
    GM_setValue("TDM_searching", "0");
    a.preventDefault();
    return false
  }
  GM_setValue("TDM_searching", "1");
  p.style.display = "block";
  h && document.getElementById("posts").addEventListener("DOMNodeInserted", q, true);
  q();
  a && a.preventDefault();
  return false
}
function q(a) {
  if(GM_getValue("TDM_searching") == "0") {
    document.getElementById("posts").removeEventListener("DOMNodeInserted", q);
    return false
  }
  var b;
  b = GM_getValue("TDM_lastRead");
  a = a ? a.target : document.getElementById(b);
  if(a !== null && a.id == b) {
    GM_setValue("TDM_searching", "0");
    document.getElementById("posts").insertBefore(pf,a);
    setTimeout(function(){window.scrollTo(0,pf.offsetTop)},400);
    p.style.display = "none";
    return false
  }else {
    if(h) {
      if(n++ % 10 == 0) setTimeout(function(){window.scrollTo(0,y.offsetTop)},400)
    }else {
      window.location.href = document.getElementById("next_page_link").href
    }
  }
}
;
