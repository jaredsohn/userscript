// ==UserScript==
// @name           ThatsKannda.JunkCleanup_Script
// @namespace      thatskannada.cleanup.script
// @include        http://thatskannada.oneindia.in/*
// ==/UserScript==
function cleanUpHomePage(){
	try{
		// Clean Google-Ad's
		clearHTML('google_ads_div_kannada-island-home');
		clearHTML('google_ads_div_kannada-top');
		clearHTML('google_ads_div_234x45-kannada');
		clearHTML('google_ads_div_kannada-island');
		clearHTML('google_ads_div_kannada-160x600');
		clearHTML('google_ads_div_kannada-300x250');

		// Clean ImageGallery contents
		clearHTML('fillrelonaarea1');
		clearHTML('lefttable4-gallery');
		clearHTML('fillrelonaareaext');
		clearHTML('righttable5');
	}catch(e){}
}

function $(name){
	return document.getElementById(name);
}

function clearHTML(name){
	try{
		$(name).innerHTML = '';
	}catch(e){}
}
// Cleanup all JUNK data
cleanUpHomePage();