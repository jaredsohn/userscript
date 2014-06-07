// ==UserScript==
// @name           AnimeFreak TV Distraction Free with Keyboard Shortcuts
// @namespace      none
// @author         Ranie Rodriguez Santos
// @description    Removes all elements from the page except for the video player and adds keyboard shortcuts for next and previous episode
// @include        http://www.animefreak.tv/content/*
// @include        http://www.animefreak.tv/anime-watch/*
// @include        http://www.animefreak.tv/watch/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// @version        1.13
// @grant          none
// @icon           http://s2.hubimg.com/u/7567697_f248.jpg
// ==/UserScript==

$(document).ready(function(){
	// check if player div exists
	if($('#player').length){
		// store the player div
		var ranie_player = $('#player');
	}else{
		// extract video iframes, create player div, append iframes into player div
		var ranie_iframes = $('.content').children('iframe, embed').not('*[src*="www.facebook.com/plugins/like.php"]');
		var ranie_player = $('<div id="player"></div>').append(ranie_iframes);
	}

	if($('#player').children().length){
		// store the URLs for the previous and next episodes
		var ranie_next_ep = $('.page-next').attr('href');
		var ranie_prev_ep = $('.page-previous').attr('href');

		// remove elements
		$('#utilities, #footer').remove();
		$('#page').children().remove();

		// append the player div
		$('#page').append(ranie_player);

		// resize the players (iframes) and the page div
		$('#player').children('iframe, embed').attr({ 'width':723, 'height':542 }).css({ 'width':723, 'height':542 });
		$('#page').width(723);

		// restyle the body
		$('body').css({
			'background-image':'none',
			'background-color':'#111',
			'margin-bottom':'0'
		});

		$('#page').prepend('<div id="ranie_info" style="padding:10px 150px;color:#FFF;">This will disappear in <span id="ranie_info_time">11</span> seconds.<table border="1"><tr><th colspan="2">Keyboard Shortcuts:</th></tr><tr><td>ctrl + ]</td><td>next episode in same tab</td></tr><tr><td>ctrl + [</td><td>previous episode in same tab</td></tr><tr><td>ctrl + shift + ]</td><td>next episode in new tab</td></tr><tr><td>ctrl + shift + [</td><td>previous episode in new tab</td></tr></table>NOTE: If the shortcuts don\'t work, click anywhere outside the video and try again.</div>');
		var counter = 11;
		var interval = setInterval(function() {
			counter--;
			$('#ranie_info_time').text(counter);
			if (counter == 0) {
				clearInterval(interval);
				$('#ranie_info').slideUp();
			}
		}, 1000);

		// keyboard shortcuts
		function ranie_open_episode(ranie_href, ranie_target){
			if(ranie_href == null){
				alert('EPISODE NOT FOUND');
			}else{
				window.open(ranie_href, ranie_target);
			}
		}

		$(document).keydown(function(e){
			if(e.ctrlKey && e.shiftKey && e.keyCode == 221){ // ctrl + shift + ]
				ranie_open_episode(ranie_next_ep, '_blank');
			}else if(e.ctrlKey && e.keyCode == 221){ // ctrl + ]
				ranie_open_episode(ranie_next_ep, '_self');
			}

			if(e.ctrlKey && e.shiftKey && e.keyCode == 219){ // ctrl + shift + [
				ranie_open_episode(ranie_prev_ep, '_blank');
			}else if(e.ctrlKey && e.keyCode == 219){ // ctrl + [
				ranie_open_episode(ranie_prev_ep, '_self');
			}
		});
	}
});