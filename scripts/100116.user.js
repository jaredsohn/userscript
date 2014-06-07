// ==UserScript==
// @name CityVille
// @author TuCityVille.Com.Ar
// @version 1.1 
// @include http://apps.facebook.com/*
// @include http://www.facebook.com/reqs.php*
// @include http://apps.facebook.com/cityville/request.php*

// ==/UserScript==

// Preferences ( 0 = NO, 1 = YES )

var prefNewLogo         = 1 // Show the new Gmail Logo ?



// Script

if (prefNewLogo==1)
{
	document.getElementById("exclude_ids").innerHTML += 'El Nombre es muy corto!';
}