// ==UserScript==
// @name        NDTV photos
// @namespace   V_V
// @include     http://www.ndtv.com/photos/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==


$(document).ready(function(){

	url = (window.location).toString();
	numberOfSlashes = url.split('/').length-1;

	if(numberOfSlashes>=5){

		setCssProperty(".container1","width","100%");

		setCssProperty(".container1_1","width","100%");

		setCssProperty(".container1_2","width","100%");

		setCssProperty(".gallery","width","100%");

		setCssProperty(".front","width","1000px");


		var widthofGallery = $(".galfrontimec_cont").css('width');
		var w =  parseFloat(widthofGallery) + 15 +'px';

		setCssProperty(".scrollable","width",w);
		setCssProperty(".scrollable","float","left");

	}

});

function setCssProperty(tag, property, value){
	$(tag).css(property,value);
}
