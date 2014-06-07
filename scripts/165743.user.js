// ==UserScript==
// @name       EPSN FantasyCast Expandable UI
// @namespace  http://www.ekiminteractive.com/
// @version    0.1
// @description  Rework layout of EPSN's FantasyCast so that you have multiple views on all media devices.
// @match      http://games.espn.go.com/flb/*
// @copyright  2012+, Michael Donovan
// ==/UserScript==

(function(){
   
	$=function(id){return document.getElementById(id);}
	$t=function(name){return document.getElementsByTagName(name);}
	hide=function(id){ $(id).style.display='none'; }		
	
	hide('smackboard');		
	
})();

(function(){

    viewport = document.querySelector("meta[name=viewport]");
	viewport.setAttribute('content', 'width=1024, height=768, maximum-scale=1.0, minimum-scale=1.0');

})();