// ==UserScript==
// @name           Ikariam - Hidden Toolbar
// @namespace      Ikariam - Hidden Toolbar
// @description    Ikariam - Hidden Toolbar
// @include        http://s*.ikariam.*/*
// @include        http://s*.*.ikariam.*/*
// @exclude        http://support.ikariam.*/*
// ==/UserScript==

var MyHead = document.getElementsByTagName('head')[0];
var MyStyle = document.createElement('style');
MyStyle.type = 'text/css';
MyStyle.innerHTML  = '#mmonetbar { display:none; }';
MyStyle.innerHTML += '#container { top: 0px; }';
MyStyle.innerHTML += '#GF_toolbar { top: 2px; }';
MyStyle.innerHTML += '#extraDiv2 { top: 147px; }';
MyHead.appendChild(MyStyle);
document.getElementById('mmonetbar').style.display='none';