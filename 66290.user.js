// ==UserScript==
// @name           MS forum
// @namespace      http://milito-spiritum.ucoz.com
// @include        http://milito-spiritum.ucoz.com*
// ==/UserScript==
if (document.getElementsByTagName("title")[0].innerHTML != "Предварительный просмотр сообщения") document.body.getElementsByTagName("div")[0].style.display = "none";