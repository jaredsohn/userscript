// ==UserScript==
// @name           Google Reader Mini
// @namespace      http://userscripts.org/scripts/show/29495
// @description    Hide unnecessary elements in Google Reader.
// @include        http*://*google.com/reader/*
// ==/UserScript==

var ids = [
  "viewer-header",
  "viewer-top-links",
  "chrome-footer-container",
  "search",
  "logo-container",
  "global-info",
  "ogspacer",
  "selectors-box",
  "gbar"
];

function toggle_gr() {
  var element;
  var is_visible = document.getElementById(ids[0]).style.display != "none";
  for (var i = 0; i < ids.length; i++) {
    if (document.getElementById(ids[i]) != null)
      document.getElementById(ids[i]).style.display = is_visible ? "none" : "block";
  }
  if (is_visible) {
    GM_addStyle(".gbh { display: none !important; }");
    element = document.getElementById('main');
    element.className += ' diff-minimized';
  }
  else {
    GM_addStyle(".gbh { display: block !important; }");
    element = document.getElementById('main');
    element.className = element.className.replace(/\bdiff-minimized\b/,'');
  }
  toggle_navbar(2); /* Hack google reader into recalculating window size */
  /**
   * unsafeWindow.AK();
   * AK() Currently works for recalculating window size, however it may change in future, so we don't trust it!
   * Also, we prefer to use unsafeWindow as little as possible!
   */
}

function toggle_navbar(x) {
  var evt;
  for (i = 0; i < x; i++) {
    evt = document.createEvent("KeyboardEvent");
    evt.initKeyEvent("keypress", false, false, null, false, false, false, false, 0x55, 0);
    document.dispatchEvent(evt);
  }
}

function GRT_key(event) {
  element = event.target;
  elementName = element.nodeName.toLowerCase();
  if (elementName == "input") {
    typing = (element.type == "text" || element.type == "password");
  } else {
    typing = (elementName == "textarea");
  }
  if (typing) return true;
  if (String.fromCharCode(event.which)=="W" && !event.ctrlKey && !event.altKey && !event.metaKey) {
    toggle_gr();
    try {
      event.preventDefault();
    }
    catch (e) {}
    return false;
  }
  return true;
}

document.addEventListener("keydown", GRT_key, false);
toggle_gr();

document.title = unsafeWindow._USER_NAME + '@' + document.title;
