// ==UserScript==
// @name           standaryzuj podpisy
// @namespace      http://www.fotka.pl/profil/Bozar/
// @include        http://www.fotka.pl/forum/*
// ==/UserScript==

const $ = unsafeWindow.$;
$("font").each(function(){ $(this).replaceWith(this.childNodes) });
