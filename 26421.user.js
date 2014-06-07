// ==UserScript==
// @name           removeLogout
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==

unsafeWindow.$j('.logout a').removeAttr("href")