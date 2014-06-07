// ==UserScript==
// @name           Series.ly HIMYM Skin
// @description    Modifica Series.y para darle un estilo característico de la serie HIMYM
// @based on	   Series.ly Modo Noche (Mod Ivan M) [http://cor.to/LMg]
// @namespace      http://cor.to/LMq
// @include        *series.ly/*
// @copyright      2011 by Marc J (Mod por Ivan M) [Re-Mod por Montuno]
// @license        Public Domain
// @version        1.0
// ==/UserScript==

var style="#page_content {opacity: 1} #main {background-image: url(https://lh6.googleusercontent.com/-ptQte1jUBEQ/Tko3h5yMlMI/AAAAAAAAAgI/jXIlagv5qPI/s1024/fondo%252520himym.png);background-attachment: fixed;background-size: 100% 100%, auto}";
var head=document.getElementsByTagName("HEAD")[0];
var el=window.document.createElement('link');
el.rel='stylesheet';
el.type='text/css';
el.href='data:text/css;charset=utf-8,'+escape(style);
head.appendChild(el);
