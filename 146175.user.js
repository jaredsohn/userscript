// ==UserScript==
// @name           FlymerAds
// @description    Site work with cleared ads
// @version        1.0.0
// @date           2012-09-18
// @author         ReklatsMasters
// @include        http://flymer.ru/*
// @match          http://flymer.ru/*
// @icon           http://flymer.ru/favicon.ico
// ==/UserScript==

(function(window, undefined){
	function main(){
		$("ad").offsetHeight = 10;
	}	
window.addEventListener('DOMContentLoaded', main, false);
})(window);
