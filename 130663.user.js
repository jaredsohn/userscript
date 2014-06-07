// ==UserScript==
// @name           Google Center Posts Stream
// @namespace      google_center
// @description    Center the posts stream in the new Google layout
// @include        https://plus.google.com/*
// @include        http://plus.google.com/*
// @exclude        /https://plus\.google\.com(/u/\d+)?/?stream/.+/i
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==
$(document).ready(function () {
	center();
	
	$(window).click(function(){center();});
});
function center(){
	console.log('test');
	var mytimer = setInterval(function(){
		var column = $('.Nj.mu.a-f-e.bR');
		var suggest = $('.hxa.a-f-e');
		
			var wrapContent = column.parent();
			var newWrap;
			if($('#newWrap').length>0){
				newWrap = $('#newWrap');
				
				if(newWrap.children().length>1){
					clearInterval(mytimer);
				}
				else{
					newWrap.append(column);
					newWrap.append(suggest);
				}
			}
			else{
				newWrap = $('<div>');
				newWrap.attr('id','newWrap');
				newWrap.css({'width':564+19+266,'margin':'auto'});
				wrapContent.append(newWrap);
			}
	},500);
}