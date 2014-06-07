// ==UserScript==
// @name           csfd vloz pridat prispevek na konec
// @namespace      deamonicky script
// @description    csfd vlozi "pridat prispevek" na konec, dolu (je vhodny k skriptu co obrati poradi prispevku)
// @include        http://www.csfd.cz/diskuze/*
// @include        http://www.csfd.cz/*diskuze*
// @include        http://www.csfd.cz/*posta*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$("[class=input ui-collapsible collapsed]").appendTo($("[class=ui-posts-action-list]"));

// TODO v r8dku pod timto komentarem presune "napis zpravu" i v poste, odmaz jestli se ti to nelibi
$("[class=ui-collapsible collapsed]").appendTo($("[class=ui-posts-action-list ui-image-list]")); // posta
