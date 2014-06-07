// ==UserScript==
// @name   OperaFix image drag fix
// @version 0.2.6
// @description Version 0.2.6 (OperaFixイメージドラッグ)
// @namespace OperaFix image drag fix (cc) http://creativecommons.org/licenses/by-nc/2.1/jp/deed.ja
// @author  Kurojitosan (SpecialThanks usopion)
// @include http://*
// @exclude http://himado.in/*  
// @exclude http://*.himado.in/*
// @exclude http://*.ameba.jp/ucs/* 
// @exclude http://zoome.jp/*/diary/* 
// @exclude http://*.dailymotion.com/*
// @exclude http://acid3.acidtests.org/* 
// ==/UserScript==
                            
  if(0<=navigator.userAgent.indexOf('Opera')){
    var backscreen = document.createElement('div');
      backscreen.style.zIndex     = '-2147483648';
      backscreen.style.position   = 'fixed';
      backscreen.style.top        = '0';
      backscreen.style.bottom     = '0';
      backscreen.style.left       = '0';
      backscreen.style.right      = '0';
      backscreen.style.margin     = '0';
      backscreen.style.padding    = '0';
      backscreen.style.border     = '0';
    document.body.appendChild(backscreen);
  }
