// ==UserScript==
// @name           jsFiddle indent space 2
// @namespace      http://polygonpla.net/
// @description    jsFiddle indent space 2
// @include        http://jsfiddle.net/
// @include        http://jsfiddle.net/*
// @author         polygon planet
// @version        1.10
// @updateURL      https://userscripts.org/scripts/source/133854.meta.js
// @grant          unsafeWindow
// @grant          GM_log
// ==/UserScript==
(function() {

  window.addEventListener('load', function onWindowLoad() {
    window.removeEventListener('load', onWindowLoad, false);

    setTimeout(function() {
      var editors = unsafeWindow.Layout.editors;

      ['html', 'css', 'js'].forEach(function(type) {
        editors[type].editor.setOption('indentUnit', 2);
      });

    }, 3000);

  }, false);

}());
