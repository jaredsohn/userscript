// ==UserScript==
// @name           CSSRemix Frame Remover
// @namespace      http://cssremix.com
// @include        http://cssremix.com/*
// @include        http://*.cssremix.com/*
// ==/UserScript==

window.location = document.getElementsByTagName('frame')[1].getAttribute('src');