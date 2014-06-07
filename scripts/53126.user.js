// Auto-Assinatura para Yahoo Respostas 
// version 0.1 BETA!
// 9-22-08
// Copyright (c) 2009, Weydson Lima <weyseal@gmail.com>
// Editado para Brasil por SERAFIM
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// Isso é um script para GreaseMonkey. para instalar, você precisa do GreaseMonkey 0.3 ou mais recente: http://greasemonkey.mozdev.org/
// Depois reinicie o FireFox.
// 
//
// Para desinstalar, vá no menu ferramentas/Greasemonkey/Gerenciar Scripts de Usuarios,
// selecione "Auto-Assinatura para Yahoo Respostas", e clique Desinstalar.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Auto-Assinatura para Yahoo Respostas 
// @namespace      http://blogs.cjb.net/rafaelserafim0/yahooassinatura.user.js
// @description   Adiciona uma Assinatura ao Yahoo Respostas
// @include       http://br.answers.yahoo.com/question/answer*
// ==/UserScript==

// ***** IMPORTANT - Precisa ser Modificado *****
// Mude sua Assinatura
// Use \n para criar uma nova linha
var signature = "---\nSeuNome\nOutra coisa qualquer";

var answerText = document.getElementById("yan-answer-answer");
answerText.value = signature;