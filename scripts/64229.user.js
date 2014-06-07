// Last Updated: 18th Dec 2009
// Lead Programmer: Laser Wave
//
// ==UserScript==
// @name          Worm finder general
// @namespace     http://www.neocodex.us/*
// @description   Finds worms
// @include       http://www.neopets.com/magma/index.phtml
// @include       http://www.neopets.com/magma/caves.phtml
// ==/UserScript==

var worm = false;

function refresh()
{
	if(document.body.innerHTML.indexOf("swf.addVariable('worm") > -1)
	{
		worm = true;
		alert("WORM");		
	}else{
		if(worm == false)
		{
			location.reload();
		}
	}
}	

function setup()
{
	setTimeout(refresh, 15000+Math.floor(Math.random()*7000));
}

window.addEventListener('load', setup, false);