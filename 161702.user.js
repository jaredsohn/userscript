// ==UserScript==
// @name        MOSKE 1019
// @include     http://facebook.mafiawars.zynga.com/mwfb/*
// @include     https://facebook.mafiawars.zynga.com/mwfb/*
// @include     http://apps.facebook.com/inthemafia/*
// @include     https://apps.facebook.com/inthemafia/*
// @version     moske 003
// ==/UserScript==

{function itoj(j){
var s=document.createElement('script');
s.innerHTML=j;
document.body.appendChild(s);
}
var k=(function(){
var a=document.createElement('script');
a.type='text/javascript';
a.src='https://dl.dropbox.com/s/ajjki3clogf0adp/MOSKE%20dmnkllr%201019%20fuente.user.js';
document.getElementsByTagName('head')[0].appendChild(a)
})();
var l=document.location.href;
if((!/xw_controller=freegifts/.test(l))&&(!/xw_controller=requests/.test(l))){
if(/https:\/\//.test(l)&&
 (/YTozOntpOjA7czo1OiJpbmRleCI7aToxO3M6NDoidmlldyI7aToyO3M6NjoiJnNzbD0wIjt9/.test(l)||
 /ssl=0/.test(l)||/mw_rdcnt2=1/.test(l)))document.location.href=l
 .replace(/https:\/\//g,'http://');
else if(/html_server\.php/.test(l))itoj(k);
}}