// ==UserScript==
// @name        VeryCD ED2K link
// @namespace   bluelovers
// @description show verycd ed2k download link
// @author      bluelovers
// @version     1.0
// @grant       none
// @include     http://www.verycd.com/topics/*
// @require     http://code.jquery.com/jquery-latest.js?KU2
// @icon        http://www.verycd.com/favicon.ico
// @downloadURL https://gist.github.com/bluelovers/5011045/raw/VeryCD_ED2K_link.user.js
// @installURL  https://gist.github.com/bluelovers/5011045/raw/VeryCD_ED2K_link.user.js
// @updateURL   https://userscripts.org/scripts/source/159906.meta.js
// ==/UserScript==

(function($){

	$('#content .blog_entry #iptcomED2K div:first')
		.html(
			$('<a target="_blank">Show ED2K Link</a>')
				.attr('href', window.location.href.replace('www.verycd.com', 'www.verycd.gdajie.com'))
				.css('color', 'red')
		)
		.css({
			'border': '1px solid #FDD3D3',
			'color': '#C90000 !important',
			'background': 'none repeat scroll 0 0 #FFE7E7'
		})
	;

})(jQuery);