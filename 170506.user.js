// ==UserScript==
// @name        Kijiji Extender jQuery
// @namespace   http://10am.ca
// @include     http://www.kijiji.ca/*
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

jQuery.noConflict();

(function($) {
	function do_thumbs() {
		var w = 300;
		$('.container-results .image img').each(function(i,img){
			$(img).attr('src', $(img).attr('src').replace(/_2\./,'_20.') ).css({
				'height':w+'px',
				'max-width':w+'px',
				'max-height':w+'px'
			}).height('100%');
		})
		$('.container-results .image').width(w);

		setTimeout( do_thumbs, 1000 );
	}

	var req = {};
	if( $('body').html()!='' ) {

		if( ! $('.container-results').length ) return;

		do_thumbs();

		$(window).scroll(function(){
			var percent = ((document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100);
			if( percent > 90 ) {
				var href = $('.pagination:last a[title=Next]').attr('href');
				if( href && !req[href] ) {
					req[href] = $.get(href,function(html){
						$('body:first').append( html );
					});
				}
			}
		});
		$(window).trigger('scroll');


		/* View Other Ads */
		if( document.getElementById('viewad_right_title2') ) {

			// if poster's other ads is already there..
			if( document.getElementsByClassName('poa').length ) return;

			var as = document.getElementById('viewad_header').getElementsByTagName('a');
			var href = location.href.replace(/http:\/\/[^\/]+\//,as[1]);
			var loc = as[1].href.replace(/http:\/\/([^\.]+).*/,'$1');
			loc = loc.charAt(0).toUpperCase() + loc.slice(1);
			var newa = document.createElement('a');
			newa.href = href;
			newa.style.display="block";
			newa.style.fontSize="18px";
			newa.appendChild( document.createTextNode('View '+loc+' Ad') );
			document.getElementById('viewad_right_title2').appendChild( newa );
		}
	}

	function dbg(a) { console.log(a) }
})(jQuery);
