// ==UserScript==
// @name           bluzgołap
// @namespace      http://www.fotka.pl/profil/suchar
// @include        http://www.fotka.pl/profil/*
// @description    Skrypt wyłapuje bluzgi w opisach, komentarzach, statusach i zaznacza je ramką.
// @version        1.3
// @copyright      2014, suchar
// ==/UserScript==
var u = unsafeWindow;
var $ = u.$;
GM_addStyle(".bluzg { background-color: red; font-size: 14px; color: yellow; font-weight: bold; padding: 1px; border: 2px solid black;}");
for(var i=1; i<=5; i++){
    var opis = document.getElementById("opis_"+i);
    
    if(opis != null){
        opis.innerHTML = opis.innerHTML.replace(/(cip[aąęo]|chuj[ąćęłńóśżź\w]*|(prz[ey]|pod|do|po|za|s|wy|do|od)*pierd[ao]l[ąćęłńóśżź\w]*|(w.?|matko|po|za|roz|wy|prze|od|do)*jeb[ąćęłńóśżź\w]*|(za|w|po.?)*kurw[ąćęłńóśżź\w]*|pi[zź]d[ąćęłńóśżź\w]*|kurewsk[ąćęłńóśżź\w]*|dup[iąę][ąćęłńóśżź\w]*|dziwk[ąćęłńóśżź\w]*|frajer[ąćęłńóśżź\w]*|idiot[ąćęłńóśżź\w]*|huj|szmat[aąoy]*)/ig, "<span class = 'bluzg'>$1</span>");
    }	
}

$("#comments-list .comments-item .comments-item-box .container").each(function(){
    var opis = $(this)[0];
    $(this)[0].innerHTML = opis.innerHTML.replace(/(cip[aąęo]|chuj[ąćęłńóśżź\w]*|(prz[ey]|pod|do|po|za|s|wy|do|od)*pierd[ao]l[ąćęłńóśżź\w]*|(w.?|matko|po|za|roz|wy|prze|od|do)*jeb[ąćęłńóśżź\w]*|(za|w|po.?)*kurw[ąćęłńóśżź\w]*|pi[zź]d[ąćęłńóśżź\w]*|kurewsk[ąćęłńóśżź\w]*|dup[iąę][ąćęłńóśżź\w]*|dziwk[ąćęłńóśżź\w]*|frajer[ąćęłńóśżź\w]*|idiot[ąćęłńóśżź\w]*|huj|szmat[aąoy]*)/ig, "<span class = 'bluzg'>$1</span>");
});
u.modules_comments_del_fp_init(u.profile_id);

var status = $("#profile-actions div span");
status[0].innerHTML = status[0].innerHTML.replace(/(cip[aąęo]|chuj[ąćęłńóśżź\w]*|(prz[ey]|pod|do|po|za|s|wy|do|od)*pierd[ao]l[ąćęłńóśżź\w]*|(w.?|matko|po|za|roz|wy|prze|od|do)*jeb[ąćęłńóśżź\w]*|(za|w|po.?)*kurw[ąćęłńóśżź\w]*|pi[zź]d[ąćęłńóśżź\w]*|kurewsk[ąćęłńóśżź\w]*|dup[iąę][ąćęłńóśżź\w]*|dziwk[ąćęłńóśżź\w]*|frajer[ąćęłńóśżź\w]*|idiot[ąćęłńóśżź\w]*|huj|szmat[aąoy]*)/ig, "<span class = 'bluzg'>$1</span>");