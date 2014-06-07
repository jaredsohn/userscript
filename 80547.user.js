// ==UserScript==
// @name           Teste
// @namespace      Teste
// @description    Teste
// @include        http://www.torcidaextra.com.br/*
// ==/UserScript==

if((radio=document.evaluate('//input[@name="ctl00$ctl00$cphConteudo$conteudoQuiz$rdblAlternativas" and @value="530"]',document, null, 9, null).singleNodeValue)) { radio.checked = true;}
if((radio=document.evaluate('//input[@name="ctl00$ctl00$cphConteudo$conteudoQuiz$rdblAlternativas" and @value="532"]',document, null, 9, null).singleNodeValue)) { radio.checked = true;}
if((radio=document.evaluate('//input[@name="ctl00$ctl00$cphConteudo$conteudoQuiz$rdblAlternativas" and @value="534"]',document, null, 9, null).singleNodeValue)) { radio.checked = true;}
if((radio=document.evaluate('//input[@name="ctl00$ctl00$cphConteudo$conteudoQuiz$rdblAlternativas" and @value="539"]',document, null, 9, null).singleNodeValue)) { radio.checked = true;}
if((radio=document.evaluate('//input[@name="ctl00$ctl00$cphConteudo$conteudoQuiz$rdblAlternativas" and @value="540"]',document, null, 9, null).singleNodeValue)) { radio.checked = true;}