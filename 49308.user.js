// ==UserScript==
// @name           GMail-AnySearch
// @namespace      4tret
// @description    Search as in:anywhere
// @include        https://mail.google.com/mail/*
// @include        http://mail.google.com/mail/*
// ==/UserScript==

// Changes:
// 2009-11-29: I found that Google has been changed
// the ID attr ('ra' -> 're') of search field - i changed this script too

window.addEventListener("load", loader, false);

function loader() {
  var api = typeof unsafeWindow != "undefined" && unsafeWindow.gmonkey ||
    (frames.js ? frames.js.gmonkey : null);
  if (api) api.load("1.0", init);
}

function init(gmail) {
  var top = gmail.getMastheadElement()
  top.addEventListener("keypress", correctSearch, true);
}

function correctSearch(event)
 {
  if (event.eventPhase != 1)
    return;
  if (event.type == 'keypress' && event.target.nodeName == 'INPUT' && event.target.type == 'text' && event.target.maxLength == 2048 && event.keyCode == 13)
   {
    var search = event.target;
    if (search.value.indexOf('in:anywhere') == -1)
     {
      search.value += ' in:anywhere';
     }
   }
 }
