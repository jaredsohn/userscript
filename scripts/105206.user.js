// ==UserScript==
// @author         vodkoterapevt
// @version        2.1
// @name           Referral Buster (formerly Link2You Buster)
// @namespace      No one can hear your scream… webmaster!
// @description    Удаляет из ссылок сервисы-рефералы. Не давай гнидам на себе наживаться!
// @include        http://rutracker.org/*
// @include        http://pornolab.net/*
// @uso:script     105206
// @scriptsource   http://userscripts.org/scripts/show/105206
// ==/UserScript==

// Добавляйте свои правила

// Обрезать строку вида http://link2you.ru/25621/http://www.10pix.ru/view/*
document.body.innerHTML=document.body.innerHTML.replace(/http:\/\/link2you.ru\/\d+\//ig,'')
// Обрезать строку вида http://j0o.ru/t1/25621/http://www.10pix.ru/view/*
document.body.innerHTML=document.body.innerHTML.replace(/http:\/\/j0o.ru\/[a-z]\d+\/\d+\//ig,'')
// Обрезать строку вида http://linkt.org/45/fastpic.ru/view/*
document.body.innerHTML=document.body.innerHTML.replace(/http:\/\/linkt.org\/\d+\//ig,'')
// Обрезать строку вида http://xxs.ru/5040/http://picp2.com/*
document.body.innerHTML=document.body.innerHTML.replace(/http:\/\/xxs.ru\/\d+\//ig,'')
// Обрезать строку вида http://clikmoney.ru/112/http://fastpic.ru/*
document.body.innerHTML=document.body.innerHTML.replace(/http:\/\/clikmoney.ru\/\d+\//ig,'')
// Обрезать строку вида http://li2p.com/480/fastpic.ru/*
document.body.innerHTML=document.body.innerHTML.replace(/http:\/\/li2p.com\/\d+\//ig,'')
// Обрезать строку вида http://link2me.ru/879/*
document.body.innerHTML=document.body.innerHTML.replace(/http:\/\/link2me.ru\/\d+\//ig,'')
// Обрезать строку вида http://ssylka.net/1113/*
document.body.innerHTML=document.body.innerHTML.replace(/http:\/\/ssylka.net\/\d+\//ig,'')

// Очистка мусора после модераторских репрессий
document.body.innerHTML=document.body.innerHTML.replace(/\[URL=http:\/\/ СПАМ/ig,'[Ссылка удалена]')
document.body.innerHTML=document.body.innerHTML.replace(/\[URL=http:\/\/www. СПАМ/ig,'[Ссылка удалена]')
