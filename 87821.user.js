// Chitrang Shah
//
// ==UserScript==
// @name		Chitrang Shah
// @namespace		http://www.suratfoodie.com 
// @description		This is a trial script
// @version		0.0.2
// @notes		First attempt
// @include		http*://www.suratfoodie.com/*
// ==/UserScript==

scriptName='Chitrang Shah';


var lnk = document.getElementsByTagName('a')[0];
lnk.href ='http://www.suratfoodie.com';
lnk.innerHTML = 'Surat Foodie';

alert(Zeit);