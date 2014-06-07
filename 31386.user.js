// ==UserScript==
// @name           festzeit.ch speed up infobox
// @namespace      festzeit.ch speed up infobox
// @include        http://www.festzeit.ch/*
// ==/UserScript==

unsafeWindow.fzusershow = function() {
	if(this){
		userelm=this;
	}	

	curn++;

	startload=userelm;
	curn++;
	setTimeout('loadinfo('+curn+')',50);
};
