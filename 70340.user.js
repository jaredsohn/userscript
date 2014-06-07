// ==UserScript==
// @name           Thesaurus.com Ad Destroyer
// @namespace      http://www.thesaurus.com
// @description    Remove sneaky ads from thesaurus.com
// @include        http://www.thesaurus.com/*
// ==/UserScript==

var adDivs = getElementsByClass("spl_unshd");
for (var i=0; i<adDivs.length;i++) {
	adDivs[i].innerHTML = '';
}
document.getElementById('bnrTop').style.height = "0";
document.getElementById("midRail").style.width = "99%";
document.getElementById('rcB').innerHTML = '';


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