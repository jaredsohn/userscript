// ==UserScript==
// @name          Facebook Customizer
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @include       *.facebook.*
// ==/UserScript==
this.$ = jQuery.noConflict(true); //prevent jquery conflict on $ usage

$(function() {
	
	$(".hasSmurfbar #blueBarHolder #blueBar").css('background-color', 'black');
	$(".hasSmurfbar #blueBarHolder #blueBar").css('background-image', 'none');
	$("._5vb_, ._5vb_ #contentCol").css('background-color', 'white');
	$('#pagelet_ego_pane').hide();
});
