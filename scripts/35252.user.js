// ==UserScript==
// @name           nCore banner off
// @namespace      http://falu.me
// @description    kikapcsolja az nCore bannereit
// @include        http*://ncore.cc/*
// @include        http*://ncore.nu/*
// @include        http*://ncore.us/*
// ==/UserScript==
// Version 2011.07.08

if( typeof(GM_addStyle)=='undefined' ){
  function GM_addStyle(styles){
    var S = document.createElement('style');
    S.type = 'text/css';
    var T = ''+styles+'';
    T = document.createTextNode(T);
    S.appendChild(T);
    document.body.appendChild(S);
    return;
  }
}

GM_addStyle("#hirdetes { display: none;}");
GM_addStyle("iframe { display: none;}");
GM_addStyle("object[id$=ncore_banner] { display: none;}");