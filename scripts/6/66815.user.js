// ==UserScript==
// @name           Reddit Highlight Top Comments
// @namespace      
// @description    
// @include        http://www.reddit.com/*/comments/*
// @require	  http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

if(unsafeWindow.console){
   var GM_log = unsafeWindow.console.log;
}

var gadgets = document.getElementsByClassName("gadget")

for ( var i = 0; i < gadgets.length; i++ )
{
	gadgets[i].className = "undefined"
}

var $=window.jQuery;
window.jQuery.noConflict();

$(document).ready(function() {
	
	var maxScore = 0;
	var secBest = 0;
	var min = 0;
	
	$(".thing.comment .entry .score").each(function() {
		var score = parseInt($(this).text().split(' ')[0]);
		if(score > maxScore) {
			maxScore = score;
		}
		else if(score > secBest) {
			secBest = score;
		}
	});
	
	min = (maxScore - (secBest / 1.33));
	
	$(".thing.comment .entry .score").each(function() {
		var score = parseInt($(this).text().split(' ')[0]);
	
		if(min!=0 && score >= min) {
			$(this).parents("div.entry").css({'background-color':'#B2D7FB', 'padding':'4px 4px 4px 4px','-moz-border-radius':'3px', '-webkit-border-radius':'3x'});		
			$(this).parents("p.tagline").children("span.score").css({'font-weight':'800', 'color':'black'});
		}
	});
});