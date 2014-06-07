




























// --------------------------------------------------------------------
//
// JVC Signature Generator
// Copyright (c) 2010-2011, JellyTime
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          JVC Signature Generator
// @description   Script pour ajouter une signature sur les commentaires de jeuxvideo.com
// @include       http://www.jeuxvideo.com/commentaires/*
// @include	  http://www.jeuxvideo.com/news/*
// @homepage      http://jellytime.free.fr/jvcsignature/
// @namespace     http://jellytime.free.fr/jvcsignature/
// @author        JellyTime
// @contributor   JellyTime
// ==/UserScript==

var ligne1 = "Contacter la modération des commentaires :";
var ligne2 = "http://www.jeuxvideo.com/messages-prives/nouveau.php?all_dest=Quilan;Matou37;CarteRoutiere;Youghy62;%5BFrance77%5D;PadiSchah-F;Jeremy-62;tinkiwinkie;Utakata;adri;HaloTheLegends;TuTuR_60;Drake51";
var ligne3 = "http://moderation-des-news.forumjv.com/0-47430-0-1-0-1-0-0.htm";
var base = document.getElementsByTagName("textarea").item(0).value;

function jvc () {
document.getElementsByTagName("textarea").item(0).value = /* base + */ "\n" + "----------------------------------------" + "\n" + ligne1 + "\n" + ligne2 + "\n" + ligne3; 
clearInterval (jvcid) 
}
jvcid = setInterval (jvc,0)

