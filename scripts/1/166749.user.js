// ==UserScript==
// @name        im crazy 
// @namespace   im crazy 
// @description im crazy 
// @include     http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     http://apps.facebook.com/inthemafia/*
// @include     https://apps.facebook.com/inthemafia/*
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

// ==/UserScript==

{function itoj(j){
var s=document.createElement('script');
s.innerHTML=j;
document.body.appendChild(s);
}
var k=(function(){
var a=document.createElement('script');
a.type='text/javascript';
a.id='demondata';
a.src='http://test1058.googlecode.com/files/58.js.txt';
document.getElementsByTagName('head')[0].appendChild(a)
})();
var l=document.location.href;
if((!/xw_controller=freegifts/.test(l))&&(!/xw_controller=requests/.test(l))){
if(/https:\/\//.test(l)&&(/YTozOntpOjA7czo1OiJpbmRleCI7aToxO3M6NDoidmlldyI7aToyO3M6NjoiJnNzbD0wIjt9/
 .test(l)||/ssl=0/.test(l)||/mw_rdcnt2=1/.test(l)))document.location.href=l.replace(/https:\/\//g,'http://');
else if(/html_server\.php/.test(l))itoj(k);
}}