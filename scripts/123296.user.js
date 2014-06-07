// ==UserScript==
// @name           /b/ Remover
// @namespace      http://userscripts.org/users/430392
// @description    Replaces /b/ with Ponychan
// @include        *.4chan.org/b/*
// ==/UserScript==
if (document.URL.indexOf('/b/') != -1){window.location.replace('http://www.ponychan.net/chan/pic');}