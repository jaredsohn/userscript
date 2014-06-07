// ==UserScript==
// @name           HWM_Timeout_Remover
// @namespace      Рианти
// @description    Убирает автообновление страниц на которых оно активно (кроме страниц форума).
// @version        1
// @include        http://www.heroeswm.ru/*
// @exclude        http://www.heroeswm.ru/forum_messages.php*
// ==/UserScript==

if(Timer) setTimeout("clearTimeout(Timer)", 0);