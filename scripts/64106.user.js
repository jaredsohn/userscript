// ==UserScript==
// @name           consumerist expand all comments
// @namespace      blurg!
// @description    consumerist expand all comments
// @include        http://consumerist.com/*
// @include        http://*.consumerist.com/*
// @version      0.2
// @require        http://sizzlemctwizzle.com/updater.php?id=64106
// ==/UserScript==

var $ = unsafeWindow.jQuery;
var si = window.setInterval(function(){ 
	var lastComment = document.querySelector('#comments-content .comments-content .last');
	if(lastComment){
		window.clearInterval(si); 
		var ex = document.getElementById('expand-all-comments');
		if(ex){
			$('.comments-options #expand-all-comments').hide();
			$('.comments-options #collapse-all-comments').show();
			$('#comments .num-replies').addClass('on');
			$('#comments .reply-container').slideDown('fast');
			unsafeWindow.commentsExpanded = true;
		}
	}
}, 500);