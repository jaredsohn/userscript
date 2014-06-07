// ==UserScript==
// @name       No Facebook Advertisement
// @version    2012.11.01.0
// @description  Facebook advertisement remover
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// @include          http://*.facebook.com/*
// @include          https://*.facebook.com/*
// @run-at         document-body
// @copyright  2012.11.01, Dénes Sávoli
// ==/UserScript==
// ==NoBanner==
body = document.body;
if(body != null) {
	div = document.createElement("style");
	div.setAttribute('type','text/css');
	div.innerHTML = ".ego_section{display:none !important;};"
        div.innerHTML += ".ego_column{display:none !important;}"
	body.appendChild(div);
}
// ==============