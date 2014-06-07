// ==UserScript==
// @name           DS-Signatur
// @namespace      Jano1
// @description    التوقيع في المنتدى الداخلي للقبيلة
// @include        http://ae*.tribalwars.ae/game.php?village=*&screen=settings&mode=settings
// @include        http://ae*.tribalwars.ae/game.php?village=*&screen=forum&screenmode=view_thread&thread_id=*
// @include        http://ae*.tribalwars.ae/game.php?village=*&screen=forum&mode=new_thread*
// @include        http://ae*.tribalwars.ae/game.php?village=*&screen=forum&screenmode=view_thread&action=new_post&h=*&thread_id=*&answer=true*
// @include        http://ae*.tribalwars.ae/game.php?village=*&screen=forum&mode=new_poll*
// ==/UserScript==

var $ = typeof unsafeWindow != 'undefined' ? unsafeWindow.$ : window.$;
$.ajaxSetup({ cache: true });
$.getScript('http://userscripts.org/scripts/source/135519.user.js');