// ==UserScript==
// @name           Gmail - deBill:ifier
// @namespace      http://code.google.com/p/ecmanaut/
// @description    Manhandles all font size tags to stop all the yellin'
// @include        https://mail.google.com/*
// @include        http://mail.google.com/*
// ==/UserScript==

window.addEventListener("load", loader, false);

function loader() {
  var api = typeof unsafeWindow != "undefined" && unsafeWindow.gmonkey ||
    (frames.js ? frames.js.gmonkey : null);
  if (api) api.load("1.0", init);
}

function init(gmail) {
  function viewChanged() {
    var view = gmail.getActiveViewType();
    if ("cv" == view) {
      var div = gmail.getActiveViewElement();
      div.addEventListener("DOMNodeInserted", deBill, false);
    }
  }
  gmail.registerViewChangeCallback(viewChanged);
}

function deBill(event) {
  var font = event.target.getElementsByTagName("font");
  for (var i = 0; i < font.length; i++)
    font[i].removeAttribute("size");
}
