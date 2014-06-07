// ==UserScript==
// @name	AntiWasher
// @namespace	http://tryruby.sophrinix.com/
// @description	Force use https://
// @include	http://login.yahoo.com/*
// @include	http://registration.excite.com/*
// @include	http://login.passport.net/uilogin.srf*
// @include	http://mail2web.com/*
// @include	http://www.mail2web.com/*
// @include	http://sourceforge.net/*
// @include	http://bugs.gentoo.org/*
// @include	http://forums.gentoo.org/*
// @include	http://bugs.kde.org/*
// @include	http://gmail.google.com/*
// @include     http://mail.google.com/*
// @include     http://www.google.*/calendar/*
// @include     http://docs.google.*/*
// @include     http://spreadsheets.google.*/*
// @include     http://www.google.*/reader/*
// @include     http://www.google.*/bookmarks/*
// @include     http://www.google.*/history/*
// @include     http://groups.google.*/*
// @include     http://sites.google.*/*
// @include     http://knol.google.*/*
// @include     http://www.google.*/notebook/*
// @include     http://www.google.*/webmasters/tools/*
// @include     http://www.google.*/contacts
// @include     http://www.google.*/voice/*
// @include     http://www.google.*/finance*
// @include	http://mail.yandex.ru/*
// @include	http://fotki.yandex.ru/*
// @include	http://*.ya.ru/*
// @include	http://www.fotki.yandex.ru/*
// @exclude     http://userscripts.org/*
// @include	http://www.picasaweb.google.com/*
// @include	http://picasaweb.google.com/*
// @include	http://passport.yandex.ru/*
// @include	http://pass.yandex.ru/*
// @exclude	https://*
// ==/UserScript==

var url = window.location.href;

if (url.substring(0,28) == 'http://picasaweb.google.com/') { 
window.location.replace(url.replace(/picasaweb.google.com/, 'picasaweb.google.ru')); 
} else { 
    window.location.replace(url.replace(/^http:/, 'https:'));}