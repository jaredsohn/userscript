// ==UserScript==
// @name           Ad DIV Destroyer
// @include        http://boingboing.net/*
// @include        http://www.reuters.com/*
// @include        http://reuters.com/*
// ==/UserScript==

var adDivs = getElementsByClass("ad");
for (var i=0; i<adDivs.length;i++) {
	adDivs[i].innerHTML = '';
	adDivs[i].style.height = "0";
}

// From old Reference.com Ad Remover code by Mar 1  (http://userscripts.org/scripts/show/5733)
function getElementsByClass(clsName) 
{ 
	var arr = new Array(); 
	var elems = document.getElementsByTagName("*");
	for ( var cls, i = 0; ( elem = elems[i] ); i++ )
	{
		if ( elem.className == clsName )
		{
			arr[arr.length] = elem;
		}
	}
	return arr;
}