// ==UserScript==
// @name           mycaliber fix
// @namespace      mycaliber.ru
// @description    mycaliber fix by Sergius
// @include        http://mycaliber.ru/forum/*
// ==/UserScript==
for(k=0;x=document.images[k];k++) {
x.src = x.src.replace('dodge-world','mycaliber');
}