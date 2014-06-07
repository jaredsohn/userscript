// ==UserScript==
// @name           User Page Enhancer
// @namespace      rockitsauce
// @description    Enhancements to the User Profile page (forum search form)
// @include       http://goallineblitz.com/game/home.pl?user_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.2/jquery-ui.min.js 
// ==/UserScript==

$('head')
	.append("<link href='http://goallineblitz.com/css/game/search.css' type='text/css' rel='stylesheet'>");
	
$(document).ready( function() {
	var matchup_view = "<div id='search_form' style='padding: 5px; z-index: 9999; position: absolute; display: none;'></div>";
	$('body').append(matchup_view);
	
	$('a:contains("Add to Friends")').after(' | <a id="search">Forum Posts</a>');
	$('#search').css('cursor', 'pointer');
	
	$('#search').bind('click', function(e) {
		var visible = $('#search_form').css('display') == 'block';
		
		if (visible) {
			$('#search_form').hide();
		}
		else {
			$.get('http://goallineblitz.com/game/search_forum.pl', function(data) {
				$('#search_form').html($('form', data));
				var name = $('.account_value:eq(0)').text();
				$('.field').val(name);
			});
			
			$('#search_form')
				.show()
				.css('left', $(this).offset().left + $(this).width() + 5)
				.css('top', $(this).offset().top);
		}
	});
});