// ==UserScript==
// @name     PlaceKitten
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function(){

$("img").each(function(index, element){

var width = $(this).width();
var height = $(this).height();
$(this).attr("src", "http://placekitten.com/" + width + "/" + height);
});
	
});