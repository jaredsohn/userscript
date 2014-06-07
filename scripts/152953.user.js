// ==UserScript==
// @name        Homeunstuck
// @namespace   abrad45
// @description adds homestuck navigation and pages remaining
// @include     http://www.mspaintadventures.com/*
// @include     http://mspaintadventures.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require		http://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.3.1/jquery.cookie.min.js
// @version     1.2
// @grant       none
// ==/UserScript==

$(function () {
	if(/s=6/.test(window.location.search)) {
		var URL = window.location.search;
		var root = URL.substr(0,URL.length-4);
		var comic = +URL.substr(-4);
		if(!comic) {
			root = "?s=6&p=00"
			comic = 1901;
		}
	
		var nextURL = '/' + root + (+comic+1);
		var prevURL = '/' + root + (+comic-1);
		
		var max = 1901;
		$('a[href^="?s=6"]').each(function () {
		    if(!isNaN(+$(this).attr('href').substr(-4))) {
		        max = Math.max(max,+$(this).attr('href').substr(-4));
		    }
		});
	
		// starting from the top so I can display nothing if there is no end to the current act
		var endings = [2147, 2658, 3053, 3257, 3888, 4525, 6010, 6012, 6184, 6290, 6566, 6716, 7162, 7337, 7339, 7411, 7826, 8135];
		var i = endings.length;
		while(comic < endings[--i]) {}
		i++;
	
		$('table[width=600]')
			.first()
			.parent()
				.css('position', 'relative')
				.prepend(
					$('<div />', {
						'id': 'homeunstuck',
						'css': {
							'position': 'absolute',
							'left': '35px',
							'width': '100px'
						}
					})
				);
		
		$('#homeunstuck')
			.append(
				$('<a />', {
					'id': 'homeunstuck-prev',
					'href': prevURL,
					'text': '<==',
					'css': { 'margin-right': '10px' }
				})
			).append(
				$('<a />', {
					'id': 'homeunstuck-next',
					'href': nextURL,
					'text': '==>'
				})
			);
		
		if(comic == 1901) {
			$('#homeunstuck-prev').remove();
		} else if(comic == max) {
			$('#homeunstuck-next').remove();
		}

		if(!isNaN(endings[i]-comic)) {
			$('#homeunstuck')
				.append($('<div />', { 
					'text': endings[i]-comic + ' left', 
					'id': 'homeunstuck_pages_left'
				})
			);
		}
		
		if($.cookie('s_cookie') == 6 && (comic - $.cookie('p_cookie').substr(-4) > 24)) {
			$('#homeunstuck').append(
				$('<div />', 
					{
						'text': "You've not saved since comic " + $.cookie('p_cookie').substr(-4),
						'css': { 
							'color': '#900',
							'font-weight': 'bold'
						}
					}
				)
			)
		}
		
		$(window).keyup(function (e) {
		    if(e.which == 37) {
		        window.location = prevURL;
		    } else if(e.which == 39) {
		        window.location = nextURL;
		    }
		});
	}
});