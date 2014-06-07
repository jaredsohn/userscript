// ==UserScript==
// @name           Remove Pfm ad
// @namespace      powerfm-ad-remover
// @description    Removes PowerFM ads
// @include        http://powerfm.se/*
// ==/UserScript==

function $(strID){ return document.getElementById(strID); }
while($('left_bigad')){
	$('left_bigad').innerHTML = "";
	$('left_bigad').id = "deleted_advert";
}