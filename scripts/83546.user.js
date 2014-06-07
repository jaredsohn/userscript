// ==UserScript==
// @name          SVZ Fremdlink-Autoklick 
// @author         Kevin K.
// @copyright     wom.seite.com
// @namespace  wom.seite.com 
// @description   Erweitert dein SchuelerVZ um diverse Funktionen oder veraendert vorhandene.
// @include       http://www.schuelervz.net/*
// @include       http://www.studivz.net/*
// @include       http://www.meinvz.net/*

// ==/UserScript==


function go(){
	window.location.replace(unsafeWindow.$("a.link-face-button").eq(0).attr('href'));
}

if(window.location.pathname=="/Link/Dereferer/"){
	if(GM_getValue("ack",false)){
		go();
	}else{
		var temp=confirm("Möchtest du dauerhaft nicht mehr gewarnt werden, wenn du das Vz verlaesst?");
		GM_setValue("ack",temp);
		if(temp){go();}
	}
}