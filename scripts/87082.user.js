// ==UserScript==
// @name           portfolio user filter
// @namespace      portfoliodothu
// @include        http://forum.portfolio.hu/*
// ==/UserScript==


//ide ird azoknak a felhasznaloknak a nevet, akiknek a hozzaszolasait nem szeretned latni
var szurendo_felhasznalok = [/felhasznalo1/,/felhasznalo2/,/felhasznalo3/,/felhasznalo4/,/felhasznalo5/] ;
var hozzaszolasok = document.getElementsByClassName('forum0');


for (i=0; i<hozzaszolasok.length; i++){
	for (j=0; j<szurendo_felhasznalok.length; j++) {
	if (hozzaszolasok[i+1].innerHTML.match(szurendo_felhasznalok[j])) {
		hozzaszolasok[i].style.color = '#F4F4F2';
		hozzaszolasok[i+1].style.color = '#F4F4F2';
		}
	}
	//hide "Jelzés a moderátornak" text
	if (hozzaszolasok[i].innerHTML.match(/Jelzés a moderátornak/)) { 
	hozzaszolasok[i].style.visibility = 'hidden';
	}
}
