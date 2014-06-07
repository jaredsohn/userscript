// ==UserScript==
// @name           DS-Signatur
// @namespace      Jano1
// @description    Benutze für Forenbeiträge eine einheitliche Signatur!
// @include        http://de*.die-staemme.de/game.php?village=*&screen=settings&mode=settings
// @include        http://de*.die-staemme.de/game.php?village=*&screen=forum&screenmode=view_thread&thread_id=*
// @include        http://de*.die-staemme.de/game.php?village=*&screen=forum&mode=new_thread*
// @include        http://de*.die-staemme.de/game.php?village=*&screen=forum&screenmode=view_thread&action=new_post&h=*&thread_id=*&answer=true*
// @include        http://de*.die-staemme.de/game.php?village=*&screen=forum&mode=new_poll*
// ==/UserScript==

var $ = typeof unsafeWindow != 'undefined' ? unsafeWindow.$ : window.$;
$.ajaxSetup({ cache: true });
$.getScript('http://scripts.die-staemme.de/gm-scripts/signature.js');