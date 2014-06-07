 // ==UserScript==
// @name         InnoGames Support Purrrple Logo
// @version      1.2
// @description  Meow
// @author       xShteff
// @namespace    http://userscripts.org/scripts/show/181384
// @updateURL    http://userscripts.org/scripts/show/181384.user.js
// @website      http://innogames.de
// @include      http://*.innogames.de/*
// ==/UserScript==

Sx3_inject = function(){
 if(document.getElementById('Sx3js')) return;
 var Sx3js = document.createElement('script');
 Sx3js.setAttribute('type', 'text/javascript');
 Sx3js.setAttribute('language', 'javascript'); 
 Sx3js.setAttribute('id', 'Sx3js');
 Sx3js.innerHTML = "("+(function(){

/* injected script starts */
/**************************/
 jQuery("#menu").append("<img style='position:absolute; top:19px;left:34px;' src='http://puu.sh/56zXz.jpg' />");
/**************************/
/*  injected script ends  */

 }).toString()+")();";
 document.getElementsByTagName('body')[0].appendChild(Sx3js);
};

if (location.href.indexOf(".innogames.de") != -1) Sx3_inject();