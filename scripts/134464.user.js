// ==UserScript==
// @name           OpenTTD Multiline Translator
// @namespace      tony.ro
// @match          http://translator.openttd.org/*/edit
// ==/UserScript==

if (document.getElementById('stringBase') != null)
{
  var parNode = document.getElementById('stringBase').parentNode;
  parNode.innerHTML = parNode.innerHTML.replace('<input', '<textarea');

  document.getElementById('stringBase').style.width = "550px";
  document.getElementById('stringBase').style.height = "100px";

  document.getElementById('stringTranslation').style.width = "550px";
}
