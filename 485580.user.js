// ==UserScript==
// @name            joyreactor.cc Comment Colorizer
// @description     Colorizes comments by rating
// @author          Sanya_Zol (Alexander Zolotarev)
// @icon            http://joyreactor.cc/favicon.ico
// @homepageURL     http://userscripts.org/scripts/show/485580
// @downloadURL     http://userscripts.org/scripts/source/485580.user.js
// @updateURL       http://userscripts.org/scripts/source/485580.meta.js
// @namespace       Sanya_Zol
// @version         0.1.1
// @include         http://joyreactor.cc/*
// @run-at          document-end
// @grant           none
// ==/UserScript==

(function(){
	var f = function($){
		// var ZolCalcColor = function(r){var sub = (255-Math.min( Math.round( Math.abs(r)*10 ), 255 )+256).toString(16).substr(1); return '#'+( (r>0)?(sub+'ff'+sub):('ff'+sub+sub) );};
		var ZolCalcColor_max = 255/Math.log(300);
		var ZolCalcColor = function(r){
			r=Math.round(r*10);
			// var sub = (255-Math.min( Math.round( Math.log(Math.abs(r)+1)*ZolCalcColor_max ), 255 )+256).toString(16).substr(1);
			var sub = (255-Math.min( Math.round( Math.log(Math.abs(r)+1)*ZolCalcColor_max ), 255 ) );
			// return '#'+( (r>0)?(sub+'ff'+sub):('ff'+sub+sub) );
			return ( (r>0)?(sub+',255,'+sub):('255,'+sub+','+sub) );
		};
		var ZolGradient = function(a,gr){
			a.css({background:'linear-gradient(to right, rgba('+gr+',0) 0%,rgba('+gr+',0) 1%,rgba('+gr+',1) 80%,rgba('+gr+',1) 100%)'});
		};
		var RX = /^\s*—\s*(-?\d+\.\d+)\s*$/;
		var processFunc = function(){
			// $(this).find('div.vote-plus').css({borderRadius:'20px',border:'2px rgb(0,255,0) solid',height:'12px',marginTop:'-5px'});
			// $(this).find('div.vote-minus').css({borderRadius:'20px',border:'2px rgb(255,0,0) solid',height:'12px',marginTop:'-5px'});
			$(this).find('span.comment_rating').css({"float":'right',fontWeight:'bold',color:'#000'});
			
			$(this).find('div.txt').each(function(){
				if( !$(this).data('zol_colorized') ){
					$(this).data('zol_colorized',true);
					var cr = $(this).find('span.comment_rating > span');
					var r = RX.exec( cr.text() );
					if( !r ){return;}
					r=parseFloat(r[1]);
					if(isNaN(r)){return;}
					ZolGradient($(this),ZolCalcColor(r));
					
					$(this).find('div.vote-plus').css({outline:'2px #000 solid',background:'#0F0',fontSize:'16px'}).html('+');
					$(this).find('div.vote-minus').css({outline:'2px #000 solid',background:'#F00',fontSize:'16px'}).html('-');
				}
			});
		};
		
		$(document).on('DOMUpdate','.post_comment_list',function(e){
			processFunc.call(e.target);
		});
		// $('div.comment_list_post').each(processFunc);
		$('.post_comment_list').each(processFunc);
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