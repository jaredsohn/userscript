// ==UserScript==
// @name  GaiaHeader Cleaner
// @description   removes the 'welcome back' junk next to your username and the '!' at the end.
// @include   http://gaiaonline.com/*
// @include   http://www.gaiaonline.com/*
// ==/UserScript==
var ele=document.getElementsByClassName('avatarName')[0];
ele.childNodes[0].textContent='';
var name=ele.childNodes[1].textContent
ele.childNodes[1].textContent=name.slice(0,name.length-1);