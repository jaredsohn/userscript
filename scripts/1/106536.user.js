// ==UserScript==
// @name           Series.ly Dexter Skin
// @description    Modifica Series.y para darle un estilo característico de la serie Dexter
// @based on	   Series.ly Modo Noche (Mod Ivan M) [http://cor.to/LMg]
// @namespace      http://cor.to/LMq
// @include        *series.ly/*
// @copyright      2011 by Marc J (Mod por Ivan M) [Re-Mod por Montuno]
// @license        Public Domain
// @version        1.0
// ==/UserScript==

var style="#page_content {-moz-box-shadow: 0 0 20px red;opacity: 1} #main {background-image: url(https://lh4.googleusercontent.com/-s4V78te2dmk/Tko8KcBEKuI/AAAAAAAAAhs/TSbp-91i_9I/s1024/fondo_dexter.png);background-attachment: fixed;background-size: 100% 100%, auto;} h4 {color: red}";
var head=document.getElementsByTagName("HEAD")[0];
var el=window.document.createElement('link');
el.rel='stylesheet';
el.type='text/css';
el.href='data:text/css;charset=utf-8,'+escape(style);
head.appendChild(el);
