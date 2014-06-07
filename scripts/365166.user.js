// ==UserScript==
// @name           BlockUnloadEvents
// @namespace      http://theaceoffire.8k.com/STOPTHEMADDNESS
// @description    This stops ANY AND ALL javascript that stops you from leaving a page. Inspired by this greasemonky script: http://userscripts.org/scripts/show/20781
// @include        *
// ==/UserScript==
(function() {
      unsafeWindow.onbeforeunload = null;

      unsafeWindow.onunload = null;

      unsafeWindow.alert = null;

      unsafeWindow.confirm = null;

      unsafeWindow.prompt = null;

      unsafeWindow.open = null;  
})();