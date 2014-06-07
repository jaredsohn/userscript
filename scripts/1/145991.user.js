// ==UserScript==
// @name            Gaia - Free Floating Profile Images
// @author          Knight Yoshi (http://www.gaiaonline.com/p/7944809)
// @description     Toggle free floating images on Current profiles
// @include 		http://www.gaiaonline.com/p/*
// @include 		http://www.gaiaonline.com/profiles/*
// @require             http://code.jquery.com/jquery-1.8.1.min.js
// ==/UserScript==
$(function() {
		var picImgCount = $('#pictures_container div');
		var txtImgCount = $('#texts_container div img');
		
		if (Number(picImgCount.length + txtImgCount.length) > 0){
			$('<li>| <a id="pc_remove" href"Toggle Images">Hide ' + Number(picImgCount.length + txtImgCount.length) + ' Images</a></li>').appendTo('#viewer #header_right');
			$('#pc_remove').toggle(function(){$('#pc_remove').text('Show ' + Number(picImgCount.length + txtImgCount.length) + ' Images');
			picImgCount.hide(); txtImgCount.parent().hide();}, 
				function(){$('#pc_remove').text('Hide ' + Number(picImgCount.length + txtImgCount.length) + ' Images');
					picImgCount.show(); txtImgCount.parent().show();
			});
		$('#pc_remove').css({'cursor': 'pointer', '-webkit-user-select': 'none'});
		};
		$('#theme_css').removeAttr('title');
});