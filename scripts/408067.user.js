// ==UserScript==
// @name			Hurriyet WebTV - Descriptions
// @description		Always show Description container on Hurriyet WebTV.
// @version			1.0
// @author			Volkan K.
// @copyright 		2014+, Volkan K.
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @namespace		Hurriyet_WebTV_Desc
// @require 		http://code.jquery.com/jquery-latest.min.js
// @include 		http://webtv.hurriyet.com.tr/*
// @include 		https://webtv.hurriyet.com.tr/*
// @run-at 			document-end
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

setInterval(function(){
	if( $('.DescriptionContainer').is(':hidden') ) {
		$('.DescriptionContainer').slideDown();
		$('.YorumContainer').slideDown();
		$('.acBtnDiv').remove();
	}
},1000);