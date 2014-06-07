// ==UserScript==
// @name           bluzgołap grup
// @namespace      http://www.fotka.pl/profil/suchar
// @include        http://www.fotka.pl/grupa/*
// @description    Skrypt wyłapuje bluzgi w blogach i komentarzach w grupach.
// @version        1.0
// @copyright      2013+, suchar
// ==/UserScript==
var u = unsafeWindow;
var $ = u.$;
GM_addStyle(".bluzg { background-color: red; font-size: 14px; color: yellow; font-weight: bold; padding: 1px; border: 2px solid black; text-shadow: 0px 0px 0px #fff;}");

$(".blog_wrapper_content").each(function(){
    var opis = $(this)[0];
    $(this)[0].innerHTML = opis.innerHTML.replace(/(cip[aąęo]|chuj[ąćęłńóśżź\w]*|(prz[ey]|pod|do|po|za|s|wy|do|od)*pierd[ao]l[ąćęłńóśżź\w]*|(w.?|matko|po|za|roz|wy|prze|od|do)*jeb[ąćęłńóśżź\w]*|(za|w|po.?)*kurw[ąćęłńóśżź\w]*|pi[zź]d[ąćęłńóśżź\w]*|kurewsk[ąćęłńóśżź\w]*|dup[iąę][ąćęłńóśżź\w]*|dziwk[ąćęłńóśżź\w]*|frajer[ąćęłńóśżź\w]*|idiot[ąćęłńóśżź\w]*|huj|szmat[aąoy]*)/ig, "<span class = 'bluzg'>$1</span>");
});

$(".comments-item-box .Box .container").each(function(){
    var opis = $(this)[0];
    $(this)[0].innerHTML = opis.innerHTML.replace(/(cip[aąęo]|chuj[ąćęłńóśżź\w]*|(prz[ey]|pod|do|po|za|s|wy|do|od)*pierd[ao]l[ąćęłńóśżź\w]*|(w.?|matko|po|za|roz|wy|prze|od|do)*jeb[ąćęłńóśżź\w]*|(za|w|po.?)*kurw[ąćęłńóśżź\w]*|pi[zź]d[ąćęłńóśżź\w]*|kurewsk[ąćęłńóśżź\w]*|dup[iąę][ąćęłńóśżź\w]*|dziwk[ąćęłńóśżź\w]*|frajer[ąćęłńóśżź\w]*|idiot[ąćęłńóśżź\w]*|huj|szmat[aąoy]*)/ig, "<span class = 'bluzg'>$1</span>");
});

$(".quotable").each(function(){
    var opis = $(this)[0];
    $(this)[0].innerHTML = opis.innerHTML.replace(/(cip[aąęo]|chuj[ąćęłńóśżź\w]*|(prz[ey]|pod|do|po|za|s|wy|do|od)*pierd[ao]l[ąćęłńóśżź\w]*|(w.?|matko|po|za|roz|wy|prze|od|do)*jeb[ąćęłńóśżź\w]*|(za|w|po.?)*kurw[ąćęłńóśżź\w]*|pi[zź]d[ąćęłńóśżź\w]*|kurewsk[ąćęłńóśżź\w]*|dup[iąę][ąćęłńóśżź\w]*|dziwk[ąćęłńóśżź\w]*|frajer[ąćęłńóśżź\w]*|idiot[ąćęłńóśżź\w]*|huj|szmat[aąoy]*)/ig, "<span class = 'bluzg'>$1</span>");
});