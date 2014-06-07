// ==UserScript==
// @name           FloydCountyInView
// @namespace      codesuidae
// @description    Removes rightclick annoyance
// @include        http://www.floydcountyinview.com/*
// ==/UserScript==
unsafeWindow.document.onmousedown = null;
unsafeWindow.window.onmousedown = null;

