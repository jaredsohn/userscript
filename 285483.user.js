// ==UserScript==
// @name       Folha de S. Paulo Paywall Killer
// @namespace  http://*.folha.uol.com.br/*
// @version    0.2
// @description  Kills the paywall at folha.uol.com.br
// @match      http://*.folha.uol.com.br/*
// @match      http://*.blogfolha.uol.com.br/*
// @copyright  2014+, Sergio Schuler
// ==/UserScript==

function kill(element)
{
    var elementInQuestion = document.getElementsByTagName(element)[0];
    elementInQuestion.parentNode.removeChild(elementInQuestion);
 }

kill('span');