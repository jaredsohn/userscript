// ==UserScript==
// @name           bluzgołap
// @namespace      local
// @include        http://www.fotka.pl/profil/*
// ==/UserScript==

GM_addStyle(".bluzg { background-color: red; font-size: 14px; color: yellow; font-weight: bold; padding: 1px; border: 2px solid black;}");

var opisy = new Array();
for(var i=1; i<=5; i++){
	var opis = document.getElementById("opis_"+i);
	

	if(opis != null){
		opis.innerHTML = opis.innerHTML.replace(/dup[ayo]|cip[aąęo]|(chuj[ąćęłńóśżź\w]*\b|(prz[ey]|pod|do|po|za|s|wy|do|od)*pierd[ao]l[ąćęłńóśżź\w]*\b|(w.?|matko|po|za|roz|wy|prze|od|do)*jeb[ąćęłńóśżź\w]*\b|(za|w|po.?)*kurw[ąćęłńóśżź\w]*\b|pi[zź]d[ąćęłńóśżź\w]*\b|kurewsk[ąćęłńóśżź\w]*\b|dup[iąę][ąćęłńóśżź\w]*\b|dziwk[ąćęłńóśżź\w]*\b|frajer[ąćęłńóśżź\w|idiot[ąćęłńóśżź\w]*\b|huj|szmat[aąoy]*\b)/ig, "<span class = 'bluzg'>$1</span>");
	}	
}