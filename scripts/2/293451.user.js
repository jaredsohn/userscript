// ==UserScript==
// @include http://*leprosorium.ru/comments/*
// @include http://*leprosorium.ru/*
// @match http://*leprosorium.ru/comments/*
// @match http://*leprosorium.ru/*
// @name          LeproObfuscator
// @author	  random2
// @namespace     http://leprosorium.ru/*
// @description   Obfuscates text typed in comment form
// ==/UserScript==

(function() {
	var tag = '<z>';
	
	var obfuscate = function(text) {
	    if (text.search(/<|>|\:\/\//) != -1 || text.length < 3) return text;
	    var length = parseInt(text.length / 3);
	    text = text.substring(0, length) +  tag + text.substring(length, length * 2) + tag + text.substring(length * 2, text.length);
	    return text;
	};
	
	var loadScript = function(url, callback) {
		var script = document.createElement("script");
		script.setAttribute("src", url);
		script.onload = function() {
			window.jQuery = jQuery.noConflict(true);
			callback();
		};
		document.body.appendChild(script);
	};
	
	var onReady = function() {
		var $button = jQuery('#js-post-yarrr');
		var $textarea = jQuery('#comment_textarea');
		var oldClick = $button.attr('onclick');
		window.loClickHandler = function() {
			var text = $textarea.val();
			if (text.length == 0) return;
			var out = '';
			var textArray = text.split(/((?:<(?:[^>]+)>))|(\s)/gmi); 
			for (var i = 0; i < textArray.length; i++) {
				if (typeof textArray[i] == 'undefined' || textArray[i].length == 0) continue;
				out += obfuscate(textArray[i]);
			}
			$textarea.val(out);
		}
		$button.attr('onclick', 'loClickHandler(); ' + oldClick);
	};
	
	loadScript(window.location.protocol + '//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js', onReady);
})()
