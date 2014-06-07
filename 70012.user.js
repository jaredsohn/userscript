// ==UserScript==
// @name		  ShareSend Plus!
// @description  Removes timer and auto-downloads file for ShareSend
// @require   http://usocheckup.dune.net/70012.js?maxage=5
// @include	  http://sharesend.com/*
// @version       0.3
// ==/UserScript==

// 0.3
// -removed xpath method of getting file
// -switched to normal JS method for getting file
// 0.2
// -fixed xpath error
// 0.1 BETA
// -initial code, limited version.
var getLink = document.getElementById('download-link');
	getLink.setAttribute('style', 'display: block;');
var getText = document.getElementById('download-link-appear');
	getText.setAttribute('style', 'display: none;');
var getDl = document.getElementById('download-link').firstChild;
	location.replace(getDl);
var ad = document.getElementById('ad');
ad.parentNode.removeChild(ad);