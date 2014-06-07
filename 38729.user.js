// ==UserScript==
// @name           what.cd auto-redirect to SSL
// @namespace      http://userscripts.org/users/gensmeta
// @include        http://what.cd/*
// ==/UserScript==
location.href=window.location.href.replace("http://what.cd","https://ssl.what.cd");