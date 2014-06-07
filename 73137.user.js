// ==UserScript==
// @name           RippyPM
// @namespace      http://what.cd
// @description    Rippy uses PM too you know
// @include        *what.cd*
// ==/UserScript==

function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}

addGlobalStyle(".rippy { z-index:25; background: transparent url('http://hem.bredband.net/thofar/screenshot_004.png') no-repeat bottom center; display: block; position: fixed; color: black; text-align: center; width: 1500px; height: 9px; bottom: 1; right: 0px; padding: 1px 50px 20px 20px; color: #ffffff; font-size: 12px; } span.rbm, span.rbb, span.rbt { padding: 10; background: none; margin: 0; }");