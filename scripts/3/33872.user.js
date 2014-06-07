// ==UserScript==
// @name           anonib popup blocker
// @namespace      anonib.com/_bucketcrackers
// @include        *anonib.com/*
// ==/UserScript==
// I wrote this a while ago and have never had a
// single popup or virus from anonib.com
// Enjoy.


var scripts=document.getElementsByTagName("script");
var thescript;
for(x=0;x<scripts.length;x++){

	thescript=scripts[x];
	if(thescript.src.indexOf("adultadworld")>-1){

		thescript.src="";
	}

}