//
// eksi sozluk icin baslik gizleme script'i
// version 0.01
// 2009-05-05
// Copyright (c) 2009, can
//
// ==UserScript==
// @name	test
// @namespace	thedewil
// @description	
// @include	http://www.itusozluk.com/*
// ==/UserScript==

function temizle() {
var l = ["raymond tango" , "fezleke" , "o değil " , "pırlanta" , "lordofthething" , "peluspenguen" , "kartakaçmıştavuk" , "mavi erkan" , "necip ernst ikilisi" , "onurene" , "babatorik" , "i feel you" , "death is the road to awe" , "hasancavus52" , "barbar savaşçı" , "markus antonius" , "tutkunun kristalleri" , "zerk" , "müge"]
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