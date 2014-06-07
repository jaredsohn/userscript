// ==UserScript==
// @name       APSU D2L Layout Fix
// @version    1.1
// @description  Fixes the layout of the new APSU D2L. Please note that this script utilzes a feature available as of HTML5. If your browser does not support HTML5, this script will fail.
// @match      http*://elearn.apsu.edu/d2l/*
// @copyright  2014+, Stephen Schuetrumpf <sschuetrumpf@my.apsu.edu>
// ==/UserScript==

var divs = document.getElementsByTagName('div');
for(var i = 0; i < divs.length; i++) 
	if(divs[i].classList.contains("d2l-max-width")) 
		divs[i].classList.remove("d2l-max-width");