// ==UserScript==
// @name           Kill The Machines
// @namespace      http://janschejbal.wordpress.com/
// @description    Detects automatically translated articles in the Microsoft Knowledge Base (MS KB) and switches to the english version. / Erkennt maschinell übersetzte Artikel in der MS Knowledge Base und wechselt bei diesen automatisch zur englischen Version
// @include        http://support.microsoft.com/kb/*
// ==/UserScript==

var html = document.getElementsByTagName("body")[0].innerHTML;

if (html.match(/<div class="mtDisclaimerLink"><img src="\/library\/images\/support\/cn\/mt_16\.png"/)) {
  document.location.pathname += "/en";
}