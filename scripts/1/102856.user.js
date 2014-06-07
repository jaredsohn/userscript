// ==UserScript==
// @name           eksibkb
// @description    eksisozlugun bkb formatini default olarak acar, reklami gizler
// @namespace      http://userscripts.org/users/ntpl
// @version        1
// @author         sencer
// @license        yok
// @include        http://sozluk.sourtimes.org/*
// @include        http://www.eksisozluk.com/*
// @include        http://eksisozluk.com/*
// ==/UserScript==


//cssi al
    _css = document.createElement('link');
    _css.rel = 'stylesheet';
    _css.href = 'http://static.eksisozluk.com/css/bkb.css';
    _css.type = 'text/css';
    _css.media = 'all';
    document.documentElement.appendChild(_css);
//reklami gizle 
   var reklam =document.getElementsByClassName('ad');
   
   for(j=0;j<reklam.length;j++){
	   reklam[j].parentNode.removeChild(reklam[j]);
	   j=j-1;}
 