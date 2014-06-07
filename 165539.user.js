// ==UserScript==
// @name        Clutter Disappearifier
// @namespace   abrad45
// @description removes ads and navigation from around the comics
// @include     http://www.mspaintadventures.com/*
// @include     http://mspaintadventures.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require		http://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.3.1/jquery.cookie.min.js
// @version     1
// @grant       none
// ==/UserScript==

$(function () {
	if(/s=6/.test(window.location.search)) {
		if($.cookie('homestuck_cd') != 0) {
			$('body').css('background-color', '#c6c6c6');
			$('body > center > table > tbody > tr:not(:eq(1))').hide();
			$.cookie('homestuck_cd', 1, {
				'path': '/',
				'expires': 180
			});
		}
		
		$('table[width=600]')
			.first()
			.parent()
				.css('position', 'relative')
				.append(
					$('<div />', 
						{
							'id': 'clutter_disappearifier',
							'css': {
								'position': 'absolute',
								'right': '5px',
								'top': '0'
							}
						}
					).append(
						$('<a />', 
							{
								'href': '#',
								'text': function () {
									if($.cookie('homestuck_cd') == 1) {
										return "Appearify Clutter"
									} else {
										return "Disappearify Clutter"
									}
								}
							}
						)
					)
				);
		
		$('#clutter_disappearifier a').click(function () {
			if($('body[style]').length) {
				$('body').removeAttr('style');
				$('body > center > table > tbody > tr').show();
				
				$.cookie('homestuck_cd', 0);
				$(this).text('Disappearify Clutter');
			} else {
				$('body').css('background-color', '#c6c6c6');
				$('body > center > table > tbody > tr:not(:eq(1))').hide();

				$.cookie('homestuck_cd', 1);
				$(this).text('Appearify Clutter');
			}
			return false;
		});
	}
});
