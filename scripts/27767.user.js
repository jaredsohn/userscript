/* Enable Forecast Details shown by default
   Copyright 2008 Jamie Maher  
	
   This software is licensed under the Creative Commons Attribution 2.5 Canada License
   <http://creativecommons.org/licenses/by/2.5/ca/>
*/
// ==UserScript==
// @name           Enable Forecast Details
// @namespace      http://www.weatheroffice.gc.ca/city/pages/
// @description    Enable showing Forecast Details by default instead of hiding it.
// @version	   1.1
// @include        http://www.weatheroffice.gc.ca/city/pages/*
// @include        http://www.meteo.gc.ca/city/pages/*
// ==/UserScript==
(function ()
{
	var fdetails = document.getElementById('fdetails');
	fdetails.className = fdetails.className.replace('hidden', '');
	
	var quickLinks = document.getElementById('quickLinkForm');
	quickLinks.className = 'hidden';
	
	var adDivArry = document.getElementsByClassName('banneradrighttop');
	if(adDivArry.length != 0){
		adDivArry[0].className = 'hidden';
	}
	
}
)(); 