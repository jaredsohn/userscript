// ==UserScript==
// @name			Stumble On Blank I'm Feeling Lucky Google Searches
// @author			Erik Vold
// @namespace		googleStumbleOnBlankLuckySearch
// @include			http://google.com/*
// @include			http://www.google.com/*
// @include			http://google.ca/*
// @include			http://www.google.ca/*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-11-13
// @lastupdated		2009-11-14
// @description		If you leave the search field blank and hit the  "I'm Feeling Lucky" then StumbleUpon will send you to a random page.
// ==/UserScript==

(function(){
	var luck=document.getElementsByName('btnI')[0];
	if(!luck) return;
	var inp = document.getElementsByName('q')[0];
	if(!inp) return;
	var f = document.getElementsByName('f')[0];
	if(!f) return;
	luck.addEventListener('click',function(e){
		var input=inp.value.replace(/^\s*/,'').replace(/\s*$/,'');
		if(input != "") return;
		var oldSubFunc=f.getAttribute('onsubmit');
		f.setAttribute('onsubmit','return false;');
		window.location="http://www.stumbleupon.com/s/";
		e.stopPropagation();
		var resetForm=function(){f.setAttribute('onsubmit',oldSubFunc);}
		setTimeout(resetForm,250);
		return false;
	},false);
	return;
})();