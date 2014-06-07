// assert h'in ekşi sözlük için hazırladığı bir scriptten aparılmıştır.
//
// eksi sozluk icin baslik gizleme script'i
// version 0.01
// 2009-05-05
// Copyright (c) 2009, can
//
// ==UserScript==
// @name	sempatik ercan engelleyici
// @namespace	thedewil
// @description	sempatik ercan'ın girilerini ortalıktan kaldırır, çocukların ulaşamayacağı yerde saklar.
// @include	http://www.itusozluk.com/*
// ==/UserScript==

var l = ['sempatik ercan'];

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