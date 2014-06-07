// ==UserScript==
// @name           YYeTS Ad remover
// @author         adaromu
// @namespace      http://adaromu.tumblr.com
// @description    Remove ads in the YYeTS.com website
// @include        http://www.yyets.com/*
// @grant		   none
// @version        0.1
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @run-at         document-start
// ==/UserScript==

window.addEventListener(
	'load', 
	function() { 
	var adtag=document.getElementById('cproIframe5holder');
	if (adtag) {adtag.parentNode.removeChild(adtag)};
	var adtag=document.getElementById('cproIframe4holder');
	if (adtag) {adtag.parentNode.removeChild(adtag)};
	var adtag=document.getElementById('fdiv');
	if (adtag) {adtag.parentNode.removeChild(adtag)};
	var adtag=document.getElementById('cproIframe6holder');
	if (adtag) {adtag.parentNode.removeChild(adtag)};
	var adtag=document.getElementById('cproIframe7holder');
	if (adtag) {adtag.parentNode.removeChild(adtag)};


	var allDivs, thisDiv;
	allDivs = document.getElementsByClassName('adBox');
	var len=allDivs.length;
	for (var i = 0; i < len; i++) {
		thisDiv = allDivs[0];
		thisDiv.parentNode.removeChild(thisDiv);
		};
	},
	true);