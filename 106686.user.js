// ==UserScript==
// @name           Series.ly Matrix Modern Skin
// @namespace      Series.ly Matrix Modern Skin
// @description    Modifica Series.ly para darle un estilo característico de la pelicula Matrix
// @based on	   Series.ly
// @include        *series.ly/*
// @copyright      2011 by IvanBM93
// @license        Public Domain
// @version        1.0
// ==/UserScript==

var style="#page_content {-moz-box-shadow: 0 0 20px green;background-color: color; opacity: 0.8} #main {background-image: url(http://th05.deviantart.net/fs29/PRE/f/2008/102/8/1/HD_Matrix_Wallpaper_by_Darkdragon15.jpg);background-attachment: fixed} h4 {color: green;}";
var head=document.getElementsByTagName("HEAD")[0];
var el=window.document.createElement('link');
el.rel='stylesheet';
el.type='text/css';
el.href='data:text/css;charset=utf-8,'+escape(style);
head.appendChild(el);