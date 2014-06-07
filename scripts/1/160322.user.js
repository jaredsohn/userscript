// ==UserScript==
// @name           Gunosy replace to original link
// @namespace      http://mitukiii.jp/
// @description    Gunosy のリンクをオリジナルのリンクに置き換えクリック時にトラックリンクを開くことで既に読んだかどうか分かりやすく表示するスクリプト
// @include        http://gunosy.com/*
// ==/UserScript==
(function() {
  var addVisitedLinkStyleSheet = function() {
    var style = document.createElement('style');
    style.innerHTML = 'a:visited { color: silver; }';
    document.head.appendChild(style);
  };

  var replaceToOriginalLink = function(element) {
    if (! element.getAttribute('data-track-url')) {
      var track_url = element.getAttribute('href');
      var original_url = decodeURIComponent(track_url.match(/url=(.+)$/)[1]);
      element.setAttribute('data-track-url', track_url);
      element.setAttribute('href', original_url);
      element.addEventListener('click', function(event) {
        event.preventDefault();
        var new_window = open(track_url);
        if (! event.ctrlKey) {
          new_window.focus();
        }
      }, false);
    }
  };

  window.addEventListener('load', function() {
    addVisitedLinkStyleSheet();
    var entries = document.querySelectorAll('.entries .entry-title a');
    for (var i = entries.length - 1; i >= 0; i -= 1) {
      replaceToOriginalLink(entries[i]);
    }
  }, false);

  document.addEventListener('DOMNodeInserted', function(event) {
    var entries = event.target.querySelectorAll('.entries .entry-title a');
    for (var i = entries.length - 1; i >= 0; i -= 1) {
      replaceToOriginalLink(entries[i]);
    }
  }, false);
}());
