// ==UserScript==
// @name           Redirect demonoid.com to demonoid.me
// @namespace      http://userscripts.org/users/122579
// @description    When you open a demonoid.com page, it will load the equivalent page on the new .me site.
// @include        http://demonoid.com/*

// @include        http://www.demonoid.com/*
// ==/UserScript==

window.location.href = window.location.href.replace(/(www.)?demonoid.com/, "demonoid.me");