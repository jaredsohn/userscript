// ==UserScript==
// @name           Series.ly Modo Noche (Mod Ivan M)
// @description    Permite navegador por series.ly durante la noche de forma cómoda
// @namespace      http://yelidmod.com
// @include        *series.ly/*
// @copyright      2011 by Marc J (Mod por Ivan M)
// @license        Public Domain
// @version        1.3
// ==/UserScript==

var style=".modulo_ppal.azul {background-color: #111111;} #page_content {-moz-box-shadow: 0 0 20px #111111;background-color: #111111;} #userInfo {background-color: #111111;} #page_content .colder.main {background-color: #111111;} #main {background-color: #111111;} .modulo_ppal.gris {background-color: #111111;} table.tbl_cp tbody tr.par td {background-color: #111111;} table.tbl_cp tbody tr td {background-color: #111111;} #buscador_resultados div.par {background-color: #111111;} h4 {color: #7C9FBF;} .info_mis_series {background-color: #111111;} #mainBuscador {background-color: #111111;}";
var head=document.getElementsByTagName("HEAD")[0];
var el=window.document.createElement('link');
el.rel='stylesheet';
el.type='text/css';
el.href='data:text/css;charset=utf-8,'+escape(style);
head.appendChild(el);
