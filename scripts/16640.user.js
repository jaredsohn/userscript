// ==UserScript==
// @name           Facebook profile tabs
// @namespace      http://code.google.com/p/ecmanaut/
// @description    Add tabs to profile related pages on Facebook.
// @include        http://*.facebook.com/*
// ==/UserScript==

var id = (location.search||"").match(/[&?]id=(\d+)/), ul, li, current;
var default_tabs = {
  "Mini-Feed":"/minifeed.php",
  "Social Timeline":"/timeline.php",
  "Wall":"/wall.php"
};
if (id) init();

function init() {
  var div = document.getElementById("content");
  if (ul) div.removeChild(ul);
  ul = document.createElement("ul"), li;
  div.insertBefore(ul, div.firstChild);
  ul.className = "toggle_tabs clearfix";
  ul.style.marginTop = "5px";
  ul.style.textAlign = "left";

  var onPrimary = add_tabs({ "Profile":"/profile.php" });
  var onExtended = add_tabs(get_extended());
  current = onPrimary || onExtended;

  if (!onPrimary && !onExtended)
    add_tabs({ "Add Tab":add_tab }, "Add tab shortcut here");
  else if (onExtended)
    add_tabs({ "X":remove_tab }, "Remove current tab");
  li.className = "last";
}

function add_tabs(tabs, title) {
  var selected;
  for (name in tabs) {
    var url = tabs[name];
    var a = document.createElement("a");
    li = document.createElement("li");
    if (!ul.hasChildNodes())
      li.className = "first";
    if (typeof url == "string") {
      if (!location.href.indexOf(url) ||
          !location.pathname.indexOf(url)) {
        a.className = "selected";
        selected = name;
      }
      if (id)
        url += "?id=" + id[1];
      a.href = url;
    } else {
      a.style.cursor = "hand";
      a.addEventListener("click", url, false);
    }
    if (title)
      a.title = title;
    a.appendChild(document.createTextNode(name));
    li.appendChild(a);
    ul.appendChild(li);
  }
  return selected;
}

function add_tab(e) {
  var guess = document.title.replace(/^(.*?\x27s\s+)?/, "");
  var name = prompt("Name of this tab?", guess);
  if (name) {
    var url = location.href.replace(/\?.*/, "");
    var tabs = get_extended();
    tabs[name] = url;
    set_extended(tabs);
    init();
  }
}

function remove_tab(e) {
  var node = e.target.parentNode;
  if (confirm("Remove tab \""+ current +"\" from sticky tab list?")) {
    var url = location.href.replace(/\?.*/,"");
    var tabs = get_extended();
    for (var name in tabs)
      if (tabs[name] == url)
        delete tabs[name];
    set_extended(tabs);
    init();
  }
}

function get_extended() {
  return eval( GM_getValue("tabs", "0") ) || default_tabs;
}

function set_extended(tabs) {
  return GM_setValue("tabs", tabs.toSource());
}
