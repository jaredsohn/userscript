// ==UserScript==
// @name           tf2items.com effect icons
// @namespace      Dharma
// @version        1.3.1
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @description    replaces the ? with actual effects on tf2items.com backpack viewer and unusual search
// @match          http://*.tf2items.com/*
// ==/UserScript==

/*
# Licensed under Creative Commons Attribution-NonCommercial-ShareAlike CC BY-NC-SA.

# What does it do? 
# Fixes the tf2items.com backpack viewer showing ? to new unusual effect icons. 
# Use at your own risk, I'm not responsible for anything that happens to your browser or computer. This script will stay up as long as the # developer has not updated his site to incorporate new icons.
#
# Who am I? 
# I'm an official trusted seller on the popular sourceop community for the online FPS game team fortress 2.
# My steamrep available here: http://www.steamrep.com/profiles/76561197962163274
*/

//Guts
var main = function() {
	function swap() {
	  $('img[alt="effect29"],img[alt^="effect3"],img[alt^="effect4"]').parent().each(function() {
	 	$(this).insertBefore($(this).prev());			 
	  });
	}
	
	function replace() {		 	
	  $('img[src$="/29_sized.png"]').attr('src', 'http://i.imgur.com/Jc11l.png').css({'width':'87px','height':'87px'});
	  $('img[src$="/30_sized.png"]').attr('src', 'http://i.imgur.com/AxG1W.png').css({'width':'87px','height':'87px'});
	  $('img[src$="/31_sized.png"]').attr('src', 'http://i.imgur.com/BPco9.png').css({'width':'87px','height':'87px'});
	  $('img[src$="/32_sized.png"]').attr('src', 'http://i.imgur.com/Dc8HJ.png').css({'width':'87px','height':'87px'});
	  $('img[src$="/33_sized.png"]').attr('src', 'http://i.imgur.com/KQkHn.png').css({'width':'87px','height':'87px'});
	  $('img[src$="/34_sized.png"]').attr('src', 'http://i.imgur.com/OpfXG.png').css({'width':'87px','height':'87px'});
	  $('img[src$="/35_sized.png"]').attr('src', 'http://i.imgur.com/OzE36.png').css({'width':'87px','height':'87px'});
	  $('img[src$="/36_sized.png"]').attr('src', 'http://i.imgur.com/I6jfI.png').css({'width':'87px','height':'87px'});
	  $('img[src$="/37_sized.png"]').attr('src', 'http://i.imgur.com/88os1.png').css({'width':'87px','height':'87px'});
	  $('img[src$="/38_sized.png"]').attr('src', 'http://i.imgur.com/tyYoI.png').css({'width':'87px','height':'87px'});
	  $('img[src$="/39_sized.png"]').attr('src', 'http://i.imgur.com/qVzrV.png').css({'width':'87px','height':'87px'});
	  $('img[src$="/40_sized.png"]').attr('src', 'http://i.imgur.com/t8w2X.png').css({'width':'87px','height':'87px'});				}
		
	$(function() {
	  swap();
	  replace();
	  
	  $('body').click(function() {
		if($('#allEffects').length > 0) 
		{
	  		//replace();
			$('body').unbind('click');
		}
		else
		{
			return;
		}
	  });  		

	});
};

//Injection
var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);