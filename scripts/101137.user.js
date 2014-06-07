// ==UserScript==
// @name            vkontakte fun
// @description     fun fun fun
// @version         1.0
// @date            2010-11-22

// @include         http://vkontakte.ru/*
// @include         http://vk.com/*
// @include         http://*.vkontakte.ru/*
// @include         http://*.vk.com/*

// ==/UserScript==

function onready() {
  var name = document.getElementById("profile_info");
  if(name.innerHTML.indexOf('Виктор') != -1) {
    name.innerHTML = name.innerHTML.replace("Виктор AD Островский", "Ваня Ива́н (библейское имя יחנן Iōḥānān, Iěhōḥānān) — распространенное русское имя. Носителем его может оказаться и умненький пай-мальчик, и шумный лесбиянка. А ещё это, несомненно, <a href='http://yandex.ru/yandsearch?text=%D1%81%D1%83%D0%BF%D0%B5%D1%80+%D0%BF%D0%BE%D1%80%D0%BD%D1%83%D1%85%D0%B0+%D0%B1%D0%B5%D1%81%D0%BF%D0%BB%D0%B0%D1%82%D0%BD%D0%BE+%D1%81%D0%BA%D0%B0%D1%87%D0%B0%D1%82%D1%8C&lr=213' style='text-decoration:underline'>еврейское имя.</a>");
    name.addEventListener("mouseover", cool, false);
  }
  
  R=0; x1=.1; y1=.05; x2=.25; y2=.24; x3=1.6; y3=.24; x4=300; y4=200; x5=300; y5=200;
}

function cool() {
  document.getElementById("profile_info").removeEventListener("mouseover", cool, false);
  DI=document.getElementsByTagName("img");
  DIL=DI.length;
  
  for(i=0; i-DIL; i++) {
    DIS=DI[ i ].style;
    DIS.position='absolute';
    DIS.left=(Math.sin(R*x1+i*x2+x3)*x4+x5)+"px";
    DIS.top=(Math.cos(R*y1+i*y2+y3)*y4+y5)+"px";
  }
  R++;
  
  setTimeout(cool, 5);
}

(function(i) {var u =navigator.userAgent;var e=/*@cc_on!@*/false; var st = 
setTimeout;if(/webkit/i.test(u)){st(function(){var dr=document.readyState;
if(dr=="loaded"||dr=="complete"){i()}else{st(arguments.callee,10);}},10);}
else if((/mozilla/i.test(u)&&!/(compati)/.test(u)) || (/opera/i.test(u))){
document.addEventListener("DOMContentLoaded",i,false); } else if(e){     (
function(){var t=document.createElement('doc:rdy');try{t.doScroll('left');
i();t=null;}catch(e){st(arguments.callee,0);}})();}else{window.onload=i;}})(onready);