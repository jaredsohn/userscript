// ==UserScript==
// @name           WikiRemoveJewFace
// @namespace      WikiRemoveJewFace
// @description    WikiRemoveJewFace
// @include        *.wikipedia.org/*
// @include        *.wikisource.org/*
// @include        *.wikiquote.org/*
// @include        *.wikimedia.org/*
// @include        *.wikibooks.org/*
// @include        *.wiktionary.org/*
// ==/UserScript==

window.addEventListener('load', function(){
    var e=document.getElementById('siteNotice');
    e.removeChild(e.childNodes[0]); }, false);