// ==UserScript==
// @name           Bigger Font
// @namespace      biggerFont
// @description    Increase font size in pages with small text.
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @include        http://*
// @include        https://*
// @version        0.1
// ==/UserScript==

// Generic GM-/DOM-related functions. Don't change
// unless you have to.
(function() {
  function init() {
    if (navigator.userAgent.toLowerCase().indexOf('chrome') >= 0) {
      GM_setValue = function(name, value) {
        value = (typeof value)[0] + value;
        localStorage.setItem(name, value);
      };
      GM_getValue = function(name, defaultValue) {
        var value = localStorage.getItem(name);
        if (!value)
            return defaultValue;
        var type = value[0];
        value = value.substring(1);
        switch (type) {
          case 'b':
            return value == 'true';
          case 'n':
            return Number(value);
          default:
            return value;
        }
      }
    }
  }

  function getEnabled(key) {
    v = GM_getValue(key, true);
    return v;
  }

  function setEnabled(key, v) {
    GM_setValue(key, v);
  }

  var size = GM_getValue('size', 15);

  $('*').filter(function() {
    return ($(this).text() && $(this).text().length > 10);
  }).each(function() {
    var s = $(this).css('font-size');
    if (s) {
      s = s.replace('px','');
      if (s < size) { s = size; }
    } else {
      s = size;
    }
    $(this).css('font-size', s + 'px');
  });
})();
