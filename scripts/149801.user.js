// ==UserScript==
// @name        trenitaliaMultiTab
// @namespace   samskeyti
// @description Consente la ricerca degli orari dei treni su tab multipli
// @include     https://www.lefrecce.it/B2CWeb/search.do?parameter=searchOutputViewer
// @version     1
// @grant	none
// ==/UserScript==

if(window.localStorage){
	var timestamp = window.localStorage.getItem("trenitaliaMultiTabTimestamp");
	var session = false;
	if(timestamp && new Date().getTime() <= parseInt(timestamp,10) + 60000*60*12)
		session = true;
	
	var windowName = undefined;
	if(session){
		windowName = window.localStorage.getItem("trenitaliaMultiTabWindowName");	
	}
	
	if(windowName){
		window.name = windowName;
	} else {
		window.localStorage.setItem("trenitaliaMultiTabWindowName", window.name);
	}
	window.localStorage.setItem("trenitaliaMultiTabTimestamp", new Date().getTime());
} else {
	window.name = '0.7379627553289182';
}