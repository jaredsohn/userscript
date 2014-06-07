// ==UserScript==
// @name           ambient
// @namespace      http://www.wtfemu.net/
// @description    blub
// @include        http://*wtfemu.net/*
// @version		   0.1
// ==/UserScript==

function addGlobalStyle(css)
{
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}
addGlobalStyle('.vbskin_wrapper_bl{background-image: url(http://www.vbskin.net/vbdemo/images/styles/ambient-lightingv2/images/wrapper_bl.jpg) !iportant;}');
GM_addStyle('.vbskin_wrapper_bl{background-image: url(http://www.vbskin.net/vbdemo/images/styles/ambient-lightingv2/images/wrapper_bl.jpg) !iportant;}');
alert("test");