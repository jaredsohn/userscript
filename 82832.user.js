// ==UserScript==
// @name           TESTTEST
// @namespace      Aftonbladet
// @description    testseteststsetset
// @version        0.1
// @include        http://aftonbladet.se/*
// ==/UserScript==

function removeAds(){ 
	// Tar bort små reklamen allra högst upp
	var topAd = document.getElementById('abHeaderAdStreamer');
	topAd.parentNode.removeChild(topAd);
	
	// Tar bort den jobbiga Jobb24 Flashen
	var jobb24Ad = document.getElementById('abJobb24AdPosition');
	jobb24Ad.parentNode.removeChild(jobb24Ad);
}

function filterByText(){

}

filterByText();
removeAds();