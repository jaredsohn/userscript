// ==UserScript==
// @name          csportsnowait
// @namespace     http://quixote.at.preempted.net/
// @description   Continue automatically with Free Trial *with no wait*
// @include       http://csports.net/*
// @exclude       
// ==/UserScript==

var gbody = document.body.innerHTML;

if (gbody.match("THE PAGE YOU HAVE REQUESTED IS A PREMIUM FEATURE")){
	document.getElementById('_PageTemplate_Continue').disabled=false;
	document.getElementById('_PageTemplate_Continue').click();
}

