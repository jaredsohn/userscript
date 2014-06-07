// ==UserScript==
// @name Nofollow Highlighter
// @namespace http://gambolao.net
// @description Script de exemplo para colorir o fundo dos links com rel=”nofollow”
// @include *
// ==/UserScript==
var links = document.getElementsByTagName(’a')
for (x=0; x < links.length; x++)
if (/nofollow/ig.test(links[x].getAttribute('rel'))) links[x].style.backgroundColor = '#FF0' 