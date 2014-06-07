// ==UserScript==
// @include http://travel.united.com/*
// @include https://travel.united.com/*
// @name United FareBasis Display
// @description Changes the CSS to display the farebasis
// ==/UserScript==
var style=".FareBasis {display:inline;}";
var head=document.getElementsByTagName("HEAD")[0];
var el=window.document.createElement('link');
el.rel='stylesheet';
el.type='text/css';
el.href='data:text/css;charset=utf-8,'+escape(style);
head.appendChild(el);