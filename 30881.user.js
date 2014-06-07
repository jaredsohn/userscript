// ==UserScript==
// @name           zdnetfrSignature
// @namespace      http://dhardy44.free.fr
// @include        http://www.zdnet.fr/actualites/*
// ==/UserScript==

//license public domain

textarea=document.getElementById('comment_text');

if (GM_getValue('zdnetSign')) {
    text = GM_getValue('zdnetSign');
    eval('text="' + text + '"');
    textarea.value=text;
}