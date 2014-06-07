// ==UserScript==
// @name        Tudo Sobre Impressão
// @namespace   http://userscripts.org/users/69817
// @description Fix access from notification email comment
// @include     http://www.cubedesign.com.br/tudosobreimpressao/*
// @version     0.1
// @grant       none
// ==/UserScript==

s1 = 'www.cubedesign.com.br'
s2 = 'www.tudosobreimpressao.com.br'

document.location.href = document.location.href.replace(s1, s2);

//this.href = this.href.replace(s1, s2);