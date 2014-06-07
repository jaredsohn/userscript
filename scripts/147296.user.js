// ==UserScript==
// @name           Nature Helper
// @namespace      mimiko.nature
// @include        http://natural-things.tumblr.com/*
// @require        http://code.jquery.com/jquery-latest.js
// @grant          none
// @version        0.0.3
// ==/UserScript==
"use strict";
//vars
var system = {
	wait: 10000,
	timer: {}
};
var m = {};
//function
m.set = function(key, value){
	window.sessionStorage.setItem(key, value);
}
m.get = function(key){
	return window.sessionStorage.getItem(key);
}
//check
if(self.location.href == top.location.href){
	//insert dom
	var css = '<style>'+
	'#block-extra{position:fixed;margin:16px;padding:0 8px;box-shadow:0 0 1px rgba(0,0,0,0.5),0 2px 4px rgba(0,0,0,0.2);border-radius:4px;height:24px;line-height:24px;width:auto;text-align:auto;background-color:#fff;color:#333;right:0;bottom:0;}#block-extra .btn{display:inline-block;font-size:14px;font-weight:bold;margin:0 8px;cursor:pointer;}#block-extra .btn.active{color:#c00;}'+
	'</style>';
	var html = '<div id="block-extra" class="btn"><a id="btn-random" href="/random/">RANDOM</a><a id="btn-play" class="btn">PLAY</a></div>';
	$('body').append(css + html);
	//bind
	$('#btn-play').click(function(){
		var value = m.get('play');
		if(!!value && value == 1){
			m.set('play', 0);
			$(this)
			.removeClass('active')
			.text('PLAY');
			window.clearTimeout(system.timer.autoplay);
			$('title').text($('title').text().replace(/Autoplay\s\-\s/,''));
		}else{
			m.set('play', 1);
			$(this)
			.addClass('active')
			.text('STOP');
			top.location.href = '/random/';
		}
	});

	//autoplay
	var value = m.get('play');
	if(!!value && value == 1){
		$('title').text('Autoplay - ' + $('title').text());
		$('#btn-play')
		.addClass('active')
		.text('STOP');
		$('html, body')
		.stop()
		.animate({
			scrollTop: $('div.layout img').not('.avatar').first().offset().top
		}, 500);
		$('div.layout img').not('.avatar').last()
		.load(function(){
			system.timer.autoplay = window.setTimeout(function(){
				top.location.href = '/random/';
			}, system.wait);
		})
		.error(function(){
			top.location.href = '/random/';
		});
	}
}