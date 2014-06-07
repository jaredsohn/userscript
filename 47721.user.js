// ==UserScript==
// @name           Zamount
// @description    amount mods
// @include        http://*.playnileonline.*/*
// ==/UserScript==

function Zaddamount()
{
	var Zselect = document.getElementById('priceper');
	var Zfchild = Zselect.firstChild;
	var Zopt = document.createElement('option');
	Zopt = setAttribute('value','100');
	Zopt.innerHTML = 'Z 100';
	Zselect.insertBefore(Zopt,Zfchild);
 setTimeout(Zaddamount, 1000);
}

setTimeout(Zaddamount, 1000);