// ==UserScript==
// @name BetFair: Calculadora MD
// @author hmiguel
// @namespace      BetFair
// @description   Calculadora MD
// @version 1.0
// @include        http://www.betfair.com/*
// ==/UserScript==


var logo = document.createElement('img');

logo.src = 'http://www.metododinheiro.com/Calculadora/imagens/calculadora.png';

document.body.insertBefore(logo, document.body.firstChild);
