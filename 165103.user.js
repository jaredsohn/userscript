// ==UserScript==
// @name		Better list browsing and preview image on Envato, ThemeForest, GraphicRiver, etc
// @namespace	sob508
// @description	This script will change the list pages from being less useful Icons into the bigger Preview Image and links that directly through to the Preview url. Along with a few keyboard shortcuts to further speed up browsing.
// @include		http://themeforest.net/*
// @include		http://*.themeforest.net/*
// @include		http://graphicriver.net/*
// @include		http://*.graphicriver.net/*
// @include		http://activeden.net/*
// @include		http://*.activeden.net/*
// @include		http://videohive.net/*
// @include		http://*.videohive.net/*
// @include		http://3docean.net/*
// @include		http://*.3docean.net/*
// @include		http://marketplace.tutplus.com/*
// @include		http://codecanyon.net/*
// @include		http://*.codecanyon.net/*
// @include		http://photodune.net/*
// @include		http://*.photodune.net/*
// @grant		none
// @version		1
// ==/UserScript==

var $ = unsafeWindow.jQuery;

jQuery(document).ready(function($) {
	
	// --------------- Themeforest ---------------
	
	//Click to make sure layout grid is always selected
	$('.layout-grid').click();
	
	//Enable next and prev keynav
	$(window).keypress(function(e){
		
		var next = $('.next_page');
		var prev = $('.previous_page');
		
		console.log(e.keyCode);
		
		//Next
		if(e.keyCode == 39 || e.keyCode == 0){
			next.click();
			return false;
		}
		//Prev
		if(e.keyCode == 37){
			prev.click();
		}
    })
	
	function update_list(){
		
		//Change the image src to be the bif slab image
		$('.content-l ul .thumbnail img').each(function(){
			$(this).attr('src', $(this).attr('data-preview-url'));
		})
		
		//Change the url of the link to go straight to the preview
		$('.content-l ul .thumbnail a').each(function(){
			
			var preview_url = $(this).attr('href');
			
			//remove all the querysting stuff
			preview_url = preview_url.split("?");
			preview_url = preview_url[0];
			//insert full_screen_preview into the string
			preview_url = preview_url.substring(0,preview_url.lastIndexOf("/")) + '/full_screen_preview/' + preview_url.substring(preview_url.lastIndexOf("/")+1, preview_url.length )  ;
			//console.log( preview_url );
			
			$(this).attr('href', preview_url)
		})
		
		//Remove the reduntdant preview slab
		$('#landscape-image-magnifier').remove();
					
		//Apply the css to change the styling of the block
		$('.content-l ul li .thumbnail').css({
			'width':'auto',
			'height':'auto',
			'display':'block'
		})
		$('.content-l ul li').css({
			'width':'auto',
			'height':'auto',
			'float':'none'
		})			
		$('.content-l ul li h3 a').css({
			'width':'auto',
			'height':'auto',
			'float':'none'
		})			
		$('.content-l ul li .sale-info').css({
			'width':'auto',
			'height':'auto',
			'float':'none',
			'display':'block',
		})			
		$('.content-l ul li .thumbnail img').css({
			'width':'auto',
			'height':'auto',
			'float':'none',
			'box-shadow':'0 0 0 1px #DEDEDE, 0 2px 0 rgba(0, 0, 0, 0.02)',
			'border':'8px solid white'
		})			
		$('.content-l ul').css({
			'padding-top':62
		})
		
	}
	
	//execture funtion every time page is updated
	$(document).ajaxComplete(function() {
		update_list();
	});
	
	//once at startup
	update_list();
	
});

