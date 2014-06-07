// ==UserScript==
// @name           Halt!
// @namespace      Halt
// @description  всем стоять смирно
// @include http://kp.ru/*
// @include http://*.computerra.ru/*
// @include http://*.cnews.ru/*
// @include http://*
// @include https://*
// @source https://userscripts.org/scripts/show/125995
// @downloadURL https://userscripts.org/scripts/source/125995.user.js
// @grant GM_registerMenuCommand
// @grant GM_setValue
// @grant GM_getValue
// @version 2.2
// 2013-02-13 status bar msg
// 2012-12-05 убиваются все таймауты
// 2.1 возможность добавления/удаления сайта из "чёрного" списка -
//   - при помощи пункта меню GreaseMonkey "User Script Commands"
// ==/UserScript==
var stopTimeOut = 9999; // 10 sec

var blackList = (
"kp.ru izvestia.ru kinopoisk.ru mk.ru sovsport.ru\
 computerra.ru cnews.ru compulenta.ru utro.ru argumenti.ru\
 novayagazeta.ru aif.ru eg.ru ria.ru \
"), bL=[];

function findHost(loc){
 blackList=GM_getValue('haltList',blackList);
 bL=blackList.split(' ');
 for(i=0, il= bL.length; i<il; i++)
  if(loc==bL[i]) return i;
 return -1;
}

function addHost(loc){
 var ix=findHost(loc);
 if(ix > -1){
 console.log("halt:!!"+location.hostname+location.pathname+' :already: ' + loc);
  return;
 }
 blackList=loc+' '+bL.join(' ');
 GM_setValue('haltList',blackList);
 console.log('HaltOn['+ix+']: '+loc);
 window.location.reload(true);
}

function delHost(loc){
 var ix=findHost(loc);
 if(ix <0) return;
 bL.splice(ix,1);
 blackList=bL.join(' ');
 GM_setValue('haltList',blackList);
 console.log('HaltOff['+ix+']: '+loc);
 window.location.reload(true);
}

function killEmAll(){
var T = setTimeout('alert("T")', 99999);
console.log("halt:!!"+location.hostname+location.pathname+' : '+T+' timeouts');
while(T>=0) clearTimeout(T--);
window.stop(); window.status='Halted';
}
var loc; 
function main(){
loc=window.location.host;
var t=loc.split('.');
if(t.length>2)
 loc=t[t.length-2]+'.'+t[t.length-1];
var bL=blackList.split(' ');
var ix=findHost(loc);
 if(ix>-1){
  GM_registerMenuCommand("halt! DEL "+loc, function(){delHost(loc)});
// останавливаем бесконечную загрузку страницы и убиваем все таймауты
  setTimeout( killEmAll, stopTimeOut ); // через 10 sec
 }else{
  GM_registerMenuCommand("halt! ADD "+loc, function(){addHost(loc)});
 }
}

if(document.body)
 main();

