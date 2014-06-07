// ==UserScript==
// @name          Pennergame: Auto-Refresh
// @description   Dieses Script aktuallisiert Pennergame (JEDE BELIEBIGE SEITE) jede Minute.
// @include       http://*pennergame.de/*
// @exclude       http://*pennergame.de/messages/write/*
// @version		1.0
// ==/UserScript==
void(setInterval("document.location.reload()",60000));