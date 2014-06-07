// ==UserScript==
// @name           http://www.facebook.com auto-redirect to http://www.facebook.com
// @namespace      http://userscripts.org/users/gensmeta
// @include        http://www.facebook.com/*
// @include        http://apps.facebook.com/*
// ==/UserScript==
location.href=window.location.href.replace("http://www.facebook.com","https://www.facebook.com");
location.href=window.location.href.replace("http://apps.facebook.com","https://apps.facebook.com");