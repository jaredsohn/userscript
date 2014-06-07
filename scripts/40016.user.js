// ==UserScript==
// @name           Bloqueador de Plugin do Real Secure Web
// @namespace      http://pazu.com.br/rsw-plugin-blocker
// @description    Bloqueia o frame de instalação de plugin do Real Secure Web
// @include        https://www.realsecureweb.com.br/scripts/engine_brpi.dll
// ==/UserScript==

function hide_plugin_iframe() {
  var frame = document.getElementById('frameplugin');
  if (frame) frame.style.display = 'none';
}

window.addEventListener('load', hide_plugin_iframe, true);