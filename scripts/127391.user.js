// ==UserScript==
// @name           Wikipedia: Limit maximum width for widescreens
// @namespace      http://userscripts.org/users/79816
// @description    Changes Wikipedia's CSS (setting content max-midth) to increase readability on widescreen displays.
// @include        http*://en.wikipedia.org/wiki/*
// @include        http*://*.wikipedia.org/wiki/*
// @version        1.0.2
// @copyright      2012, ulrichb
// ==/UserScript==

(function () {
  
  function addStyle(style) {
    var head = document.getElementsByTagName("head")[0];
    var styleElement = document.createElement("style");
    styleElement.type = "text/css";
    styleElement.innerHTML = style;
    head.appendChild(styleElement);
    return styleElement;
  }
  
  addStyle([
      '#content {',
      '  max-width: 900px;',
      '}'].join('\n'));
  
})();
