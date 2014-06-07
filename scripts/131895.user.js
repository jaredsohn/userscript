// ==UserScript==
// @name          Cleaner Disp.cc
// @namespace     http://loli.tw/userscripts
// @description	  Remove all controls and ads, disables auto text size, leave only article you want to read.
// @include       http://disp.cc/b/*
// ==/UserScript==

function execInPage(proc){
	var script = document.createElement("script");
	script.textContent = "(" + proc.toString() + ")();";
	document.body.appendChild(script);
}

execInPage(function(){
	adsHide();
	ads2Hide();
	$('body').css('font-size', '24px');
	$('.center').css('max-width', '40em');
	auto_size = 0;
	$('pre').css('font-family', '"細明體", mingliu,"AR PL UMING TW", Courier, monospace');
	$('#text').parent().html($('<div id="text">').html($('#text pre')));
	$('#footer').remove();
});