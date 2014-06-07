// thedewil'in itü sözlük için hazırladığı bir scriptten aparılmıştır.
// o da assert h'in ekşi sözlük için hazırladığı bir scriptten aparmış.
//
// eksi sozluk icin baslik gizleme script'i
// version 0.01
// 2009-05-05
// Copyright (c) 2009, can
//
// ==UserScript==
// @name	cinolaa28 engelleyici
// @namespace	x
// @description	cinolaa28 engelleyici
// @include	http://www.itusozluk.com/*
// ==/UserScript==

function temizle() {
var l = ["/"]
var $$ = document.getElementsByClassName('yazarlink');
for($ in $$)
{
  try
	{
		for(k in l)
		{
			if(l[k]=='')continue;
			if($$[$].innerHTML.match(""+l[k]+""))
				$$[$].parentNode.parentNode.style.display = 'none';
		}
	}
	catch (e)
	{
	}
}
}

document.addEventListener('DOMNodeInserted', temizle ,false);
window.addEventListener('load', temizle ,false);