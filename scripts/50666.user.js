// ==UserScript==
// @name           ncore usability
// @namespace      http://ncore.cc/usable
// @description    Eltünteti a bannereket és az IT hírek dobozt, valamint kinyitja a 
//				   keresési mezőt, és eltünteti a hozzá tartozó gombot.
// @include        http://ncore.nu/*
// @include        http://ncore.us/*
// @include        http://ncore.cc/*
// ==/UserScript==

// Az alábbi két scriptből és némi saját kódból keletkezett ez a script:
// http://userscripts.org/scripts/show/25322
// http://userscripts.org/scripts/review/35252

// --- Keresődoboz ---

var searchBox = document.getElementById('kereso_resz');
if(searchBox) { searchBox.style.display = 'block';}

// valaki mondja meg, hogy ez miért nem működik:
var searchToggle = document.getElementById('kereso_nyitas');
if(searchToggle) { searchToggle.style.display = 'none';}

// helyette kell ez
var imgs = document.getElementsByTagName( 'img' );

for ( i = 0; i < imgs.length; ++i )
{
	var src = imgs[i].getAttribute( 'src' );
	if ( src == 'themes/default/search_bg2.jpg' )
	{
		imgs[i].style.display = 'none';
		break;
	}
}

// --- Bannerek ---
var divs = document.getElementsByTagName('div');
var i;
var str;

for (i=0; i<divs.length;i++)
{		
	if (divs[i].className=='fejlecbox') {
		str=divs[i].innerHTML;
		if (str.match('IT hírek')!=null)
		{
			divs[i].style.display='none';		
		}

	}
	if (divs[i].className=='UserBox') {
		str=divs[i].innerHTML;
		if (str.match('3 legfrissebb hir')!=null)
		{
			divs[i].style.display='none';			
		}

	}
	if (divs[i].className=='fejlecbox') {
		str=divs[i].innerHTML;
		if (str.match('Hirdetés')!=null)
		{
			divs[i].style.display='none';			
		}

	}
	if (divs[i].className=='UserBox') {
		str=divs[i].innerHTML;
		if (str.match('ca-pub-3382130055205081')!=null)
		{
			divs[i].style.display='none';			
		}
	}
}