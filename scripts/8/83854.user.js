// ==UserScript==
// @name           Wowhead Tooltips para GPLP
// @namespace      http://about:blank
// @description    Muestra los Wowhead tooltips en los link del foro de http://guerrerosporlapaz.com/foro/ y el de la Guild Black Arrow
// @include        http://guerrerosporlapaz.com/foro/*
// @include	   http://www.blackarrow.uhost.com.ar/foro/*

// ==/UserScript==

var widget = document.createElement('script');
widget.src = 'http://www.wowhead.com/widgets/power.js?lol';
widget.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(widget); 