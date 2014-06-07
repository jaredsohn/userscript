// write this line to file "host": 
// 195.184.204.129 forum.mak1.net 
// ==UserScript==
// @name          forum.mak1.net
// @namespace     http://userscripts.org/
// @description   make forum.mak1.net avalible from the internet
// @include       http://forum.mak1.net/*
// @include       http://195.184.204.129/*
// @exclude       http://forum.mak1.net/forum/*
// @exclude       http://195.184.204.129/forum/*
// ==/UserScript==
window.location.href = window.location.href.replace(/.net/, '.net/forum');
