// ==UserScript==
// @name           httpsfacebook
// @namespace      httpsface
// @description    try to ensure all facebook links point to https://www.facebook.com 
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @include        *.facebook.com/*
// ==/UserScript==
var e = new RegExp(/http:\/\/([a-z0-9]+\.)facebook.com/g);
ar = e.exec(document.body.innerHTML); 
repl = ar[0].replace(/http/, "https"); 
document.body.innerHTML = document.body.innerHTML.replace(e, repl ); 
