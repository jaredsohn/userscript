// ==UserScript==
// @name       Paywal killer for HBR
// @namespace  http://blogs.hbr.org/*
// @version    0.1
// @description  Blocks the paywal from HBR blog
// @include      http://blogs.hbr.org/*
// @copyright  2013+, Sergio H. Schuler
// ==/UserScript==

function kill(elementName)
{
    var elementInQuestion = document.getElementById(elementName);
    elementInQuestion.parentNode.removeChild(elementInQuestion);
}

kill("paywallPrompt");