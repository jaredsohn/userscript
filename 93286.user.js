// ==UserScript==
// @name           Yandex NoAd
// @namespace      test
// @include        http://mail.yandex.ru/*
// ==/UserScript==

head=document.getElementsByTagName('head')[0]

style=document.createElement('style')
style.type='text/css'
style.innerHTML='.b-banner, .block-informer-news, .b-teaser {display:none !important}'

head.appendChild(style)
