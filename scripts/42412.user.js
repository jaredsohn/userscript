// ==UserScript==
// @name           Wikipedia: Optimize print layout
// @namespace      http://userscripts.org/users/79816
// @description    Removes unnecessary elements from Wikipedia print layout
// @version        1.0.4
// @copyright      2009, ulrichb
// @include        http*://en.wikipedia.org/wiki/*
// @include        http*://*.wikipedia.org/wiki/*
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
      '@media print {',
      '  .firstHeading { margin-top: 0; padding-top: 0; }',
      '  #siteSub { display: none; }',
      '  #toc { display: none; }',
      '  .printfooter { display: none; }',
      '  #catlinks, .catlinks { display: none; }',
      '  #footer { display: none; }',
      '}'].join('\n'));
  
})();
