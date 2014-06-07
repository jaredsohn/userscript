// ==UserScript==
// @name           Kabel Deutschland => Google
// @namespace      -
// @description    falls eine Seite, die nicht geöffnet werden kann mit Kabel Deutschland geöffnet wird, wird man durch dieses Skript zu Google weitergleitet
// @include        http://suchen.nxr.kabeldeutschland.de/kdeassistsearch_keyword/ws/results/Dns/*
// ==/UserScript==
location.href = 'http://www.google.com/search?q='+document.URL.split('/')[7];