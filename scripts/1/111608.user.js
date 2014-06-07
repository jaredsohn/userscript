// ekşi sözlük'te assert h'in yazdığı script'ten aparan thedewil'dan araklanmıştır.
//
// ==UserScript==
// @name	ovumyeja engelleyici
// @namespace	hatun değilim boşuna bakma
// @description	ovumyeja engelleyici
// @include	http://www.itusozluk.com/*
// ==/UserScript==

function temizle() {
var l = ["ovumyeja"]
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