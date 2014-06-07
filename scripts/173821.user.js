// ==UserScript==
// @name           hoopchina_video
// @description    解决虎扑论坛的视频需要打开新页面才能查看的问题
// @version        0.1
// @author         @xavierskip
// @include        http://bbs.hupu.com/*
// @updateURL      https://userscripts.org/scripts/source/173821.meta.js
// @downloadURL    https://userscripts.org/scripts/source/173821.user.js        
// @license	       MIT License
// ==/UserScript==


// how to use jQuery with with Greasemonkey scripts in Google Chrome?
// http://stackoverflow.com/questions/2246901/how-can-i-use-jquery-in-greasemonkey-scripts-in-google-chrome

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}


// the guts of this userscript
function main() {

var a = {
	'width':'480',
	'height':'400',
	'align':'middle',
	'allowScriptAccess':'always',
	'allowFullScreen':'true',
	'type':'application/x-shockwave-flash'
}
var player = function(url){
	var e = $('<embed>');
	e.attr('src',url);
	for(i in a){
		e.attr(i,a[i]);
	};
	return e;
}
var videos = $('.videoImg');

videos.each(function(){
	var url = $(this).children("a").attr('href').split('&')[0];
	var embed = player(url);
	$(this).html(embed);
});

}

// load jQuery and execute the main function
addJQuery(main);