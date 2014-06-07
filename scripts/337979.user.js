// ==UserScript==
// @name           SPDY Proxy img loader (hM)
// @author         drag.hm
// @version        0.2
// @description    Carrega imagens atraves de um proxy SPDY (roda em cima do Cloudflare)
// @include        http://www.hardmob.com.br/*
// @run-at         document-end

// ==/UserScript==

for(var a=document.getElementsByTagName("img"),b=0;b<a.length;b++)a[b].src=a[b].src.replace("http://www.hardmob.com.br/","https://images.weserv.nl/?il&q=84&fnr&url=www.hardmob.com.br/");