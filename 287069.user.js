// ==UserScript==
// @name        WebDev Panel
// @namespace   q
// @description Web panel for q developers
// @include     *
// @version     1.1
// @grant       GM_addStyle
// @grant       GM_getResourceText
// ==/UserScript==

// Запуск скрипта только в главном окне
if (window.top != window.self)
    return;
  

var newCSS = GM_getResourceText("WebDevCSS");
GM_addStyle(newCSS);

var wrapper = document.createElement('div');
wrapper.id = 'WebDevPanelWrapper'
var iframe = document.createElement('iframe');
iframe.src = "info?url="+window.location.href;
wrapper.appendChild(iframe);
document.body.appendChild(wrapper);