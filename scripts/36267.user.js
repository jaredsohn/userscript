// ==UserScript==
// @name           YankoDesign
// @namespace      muhqu
// @include        http://www.yankodesign.com/*
// ==/UserScript==

var code = (function(){
	jQuery(function($){
		function sanitize(dom) {
			dom.find('div#leaderboard, div.indexleaderboard, div#sponsors').remove();
		}
		sanitize($('body'));
		
		var $content = $('div#contentbody');
		var nextUrl = $content.find('div.pagebar span.this-page').next('a').attr('href');
		if (!nextUrl) return; // no next URL on this page....
		
		
		var inaction = 0;
		var reachedTheBottom = function () {
			if (inaction || !nextUrl) return; // avoid double requests...
			inaction = 1;
			
			$.get(nextUrl, function (html) {
				var dom = $(html);
				sanitize(dom);
				inaction = 0;
				$content.find('div.pagebar').remove();
				$content = dom.find('div#contentbody');
				nextUrl = $content
					.find('div.pagebar span.this-page')
					.next('a')
					.attr('href');
				$('div#contentbody').append($content);
			})
		}
	
		// monitor users scroll activity
		$(window).scroll(function(e){
			
			// bottom reached?!
			if ($('html')[0].scrollTop >= $('#page').height() - ($('#footer').height()+300) - $(window).height()){
				reachedTheBottom();
			}
		});
	});
	
});
	
// evaluate the Code after jQuery has been loaded...
window.addEventListener("load", function(){
	var scripts = document.getElementsByTagName('script');
	var lastScript = scripts[scripts.length-1];
	var newElement = document.createElement('script');
	newElement.innerHTML = '('+code+')()';
	lastScript.parentNode.insertBefore(newElement, lastScript.nextSibling);
}, false);