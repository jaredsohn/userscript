// ==UserScript==
// @name          Smart Habrahabr
// @namespace     http://sokolov.cc/greasemonkey/
// @description   Hides all comments with low rating on Habrahabr
// @include       http://habrahabr.ru/blogs/*
// @include	      http://habrahabr.ru/blog/*
// @include       http://*.habrahabr.ru/blog/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

(function(){
	function doStuff($)
	{
		console.log('In doStuff');
		$(document).ready(function(){
			function showAll()
			{
				$('#comments .sokolovHidden').removeClass('sokolovHidden');
			}
		
			function filter(minRating)
			{
				$('#comments .comment_holder').each(function(){
					var me = $(this)
					rating = parseInt(me.children('.msg-meta').find('.vote .mark span').text().replace('–','-'))
					if (rating < minRating)
						me.addClass('sokolovHidden')
				});
				comHeaderInfo.children('.minRating').text(minRating);
			}
		
			// Init
			$('<style type="text/css"></style>').text(
				'#comments .sokolovHidden>.msg-meta:hover { background-color: #B4FA8D }'
				+'#comments .sokolovHidden>.entry-content, '
				+'#comments .sokolovHidden>.msg-meta .date, '
				+'#comments .sokolovHidden>.msg-meta .bookmark, '
				+'#comments .sokolovHidden>.msg-meta .up-to-parent, '
				+'#comments .sokolovHidden>.msg-meta .to-favs { display: none }').appendTo('head');
		
			$('#comments .sokolovHidden>.msg-meta').live('click', function(){
				$(this).parent().children('.entry-content').show('slow').attr('style','').parent().removeClass('sokolovHidden')
			});
		
			comHeader = $('#comments>.comments-header');
			comHeaderInfo = $('<span class="sokolovInfo" style="border-bottom: 1px dotted #AFA56A; margin-left: 1em">скрыты ниже <span class="minRating"></span></span>')
			comHeaderInfo.appendTo(comHeader).click(function(){
				minRating = prompt('Какой поставить минимальный рейтинг?')
				showAll()
				filter(minRating);
			});
			// Endinit
		
		
			comCount = parseInt(comHeader.children('.js-comments-count').text());
			if (comCount < 8)
				filter(-1);
			else if (comCount < 25)
				filter(3);
			else if (comCount < 40)
				filter(4);
			else
				filter(5);
		})
	}
	// Check for jQuery
	if (typeof jQuery == 'undefined')
	{
		var script = document.createElement('script');
		script.src = 'http://jquery.com/src/jquery-latest.js';
		script.type = 'text/javascript';
		document.getElementsByTagName('head')[0].appendChild(script);
		
		// Wait for jQuery
		var wait = function () {
			if (typeof jQuery == 'undefined')
				setTimeout(wait, 100);
			else
				doStuff(jQuery);
		}
		wait();
	}
	else
	{ doStuff(jQuery); }
})();