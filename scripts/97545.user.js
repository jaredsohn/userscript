// ==UserScript==
// @author         vodkoterapevt
// @version        1.0.5
// @name           Link2You Buster
// @namespace      No one can hear your scream… webmaster!
// @description    Удаляет из ссылок подстроку link2you.ru. Не давай гнидам на себе наживаться!
// @include        http://rutracker.org/*
// @uso:script     97545
// @scriptsource   http://userscripts.org/scripts/show/97545
// ==/UserScript==

document.body.innerHTML=document.body.innerHTML.replace(/http:\/\/link2you.ru\/\d+\//ig,'')