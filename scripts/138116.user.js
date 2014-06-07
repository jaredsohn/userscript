// ==UserScript==
// @name           Lingvoforum - No advertisment
// @namespace      lf_hide_top_ads
// @description    Hides top ads on Lingvoforum for registered users | Скрывает верхнюю рекламу на Лингвофоруме для зарегистрированных пользователей
// @include        http://lingvoforum.net/*
// ==/UserScript==

ad = document.getElementById('logoline').firstChild;
ad.innerHTML='';
ad.style.display='none';