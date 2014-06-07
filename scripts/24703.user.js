// ==UserScript==
// @name				GS image replace
// @description			replace image-src on gold stars
// @include				http://rockband.scorehero.com/manage_scores.php?*
// @include				http://rockband.scorehero.com/scores.php?*
// @include                             http://rockband.scorehero.com/top_scores.php*
// @creator             qirex
// ==/UserScript==

var image_elements = document.getElementsByTagName('img');		
for(var i=0;i<image_elements.length;i++){
	var image_element = image_elements[i];
	if(image_element.src.toLowerCase().match(/images\/rating_6.gif/)) {
		image_element.src = image_element.src.replace("http:\/\/rockband.scorehero.com\/images\/rating_6.gif","http:\/\/img441.imageshack.us\/img441\/2888\/gs5yf1.gif");
    	}
}