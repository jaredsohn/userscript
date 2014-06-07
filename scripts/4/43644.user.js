// ==UserScript==
// @name           RightClick
// @namespace      http://pokazuha.ru
// @description    RightClick
// @include        http://pokazuha.ru/*
// @include        http://www.pokazuha.ru/*
// ==/UserScript==
function a() {return a.caller.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2')}
document.body.appendChild(document.createElement('script')).innerHTML=a();
return;
document.oncontextmenu = new Function(a=1);