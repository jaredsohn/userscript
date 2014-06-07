// ==UserScript==
// @name notascript
// @description it does not work
// @namespace      Test
// @include        http://*passion.com/*
// @include        http://*tsaffair.com/*
// @include        http://*pop6.com/*
// @include        http://*adultfriendfinder.com/* 
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js

// ==/UserScript==
$('body').append('')
$('#main_photo img').each(function(el){
	$(this).click(function(){
		$('#myTestImg').show().click(function(){
			$(this).hide();
		}).attr('src', this.src.replace('square','superphoto'));
	});
});