// ==UserScript==
// @name           NationStates Thick Border Remover
// @namespace      http://www.nationstates.net/
// @description    Removes those thick, curved borders.
// @include        http://www.nationstates.net/*
// ==/UserScript==
var style="table,td,tr,th{border-radius: 0em !important; -moz-border-radius: 0em !important; -webkit-border-radius: 0px !important;-khtml-border-radius: 0px !important; border-spacing: 0px !important;}";
var head=document.getElementsByTagName("HEAD")[0];
var el=window.document.createElement('link');
el.rel='stylesheet';
el.type='text/css';
el.href='data:text/css;charset=utf-8,'+escape(style);
head.appendChild(el);