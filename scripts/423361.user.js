// ==UserScript==
// @name            pikabu.ru Comment Colorizer
// @description     Colorizes comments by rating
// @author          Sanya_Zol (Alexander Zolotarev)
// @icon            http://s.pikabu.ru/favicon.ico
// @homepageURL     http://userscripts.org/scripts/show/423361
// @downloadURL     http://userscripts.org/scripts/source/423361.user.js
// @updateURL       http://userscripts.org/scripts/source/423361.meta.js
// @namespace       Sanya_Zol
// @version         0.1
// @include         http://pikabu.ru/*
// @run-at          document-end
// ==/UserScript==

(function(){
	var f = function($){
		// var ZolCalcColor = function(r){var sub = (255-Math.min( Math.round( Math.abs(r)*10 ), 255 )+256).toString(16).substr(1); return '#'+( (r>0)?(sub+'ff'+sub):('ff'+sub+sub) );};
		var ZolCalcColor_max = 255/Math.log(1000);
		var ZolCalcColor = function(r){
			var sub = (255-Math.min( Math.round( Math.log(Math.abs(r)+1)*ZolCalcColor_max ), 255 )+256).toString(16).substr(1);
			return '#'+( (r>0)?(sub+'ff'+sub):('ff'+sub+sub) );
		};
		var ZolGradient = function(a,gr){
			// http://stackoverflow.com/a/16697618/870183
			// a.css("background-image", "-webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #333), color-stop(100%, #222))");
			a
			.css('background-image', '-webkit-linear-gradient('+gr+')')
			.css('background-image', '-moz-linear-gradient('+gr+')')
			.css('background-image', '-o-linear-gradient('+gr+')')
			.css('background-image', 'linear-gradient('+gr+')');
		};
		$('table.comm_wrap_counter td.info.info_c span[class^="comd"]').each(function(){
			var a = $(this).closest('table.comm_wrap_counter');
			var c = ZolCalcColor( parseInt($(this).html()) );
			a.find('td.info.info_c, td.comment_msg').css('background-color',c);
			ZolGradient( a.find('td.comment_b'), 'top, '+c+' 0%,#ffffff 100%' );
		});
	};
	var f2;
	f2 = function(){
		if( window.jQuery ){
			// jQuery(f);
			setTimeout(function(){
				jQuery(f);
			},200);
		} else {
			setTimeout(f2,500);
		}
	};
	f2();
})();