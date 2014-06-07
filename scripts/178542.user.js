// ==UserScript==
// @name           Siap
// @description    Siap
// ==/UserScript==

// skin function
var tipsgohide;
(function($) {
/*
 * tool tips
 *
 */
	$.fn.siapTooltip = function() {
		// closing modal if body clicked
		$('html').mouseup(function(e){
			if($(e.target).closest('#siapTooltipObj').length == 0) $('#siapTooltipObj:visible').not($(e.target).closest('#siapTooltipObj')).hide();
		});
		// building tooltips lightbox
		var bubble = $('#siapTooltipObj');
		if(typeof bubble.get(0) == 'undefined'){
			bubble = $('body').append('<div id="siapTooltipObj" class="tips-msg rnd5 sdw"><div class="point"></div><div class="msg">Pesan</div></span>');
		}
		// assigning behave
		return $(this).each(function() {
			// convert attr TITLE into data
			if(!$(this).data('siaptip')){
				if(!$(this).attr('title')){
					if(typeof $(this).find('.tips-msg').get(0) == 'object'){ 
						// tips-msg inside .tips / .tips-on classed TAG
						$(this).data('siaptip', $(this).find('.tips-msg').html()).find('.tips-msg').remove();
					}else if(typeof $(this).next('.tips-msg').get(0) == 'object'){
						// tips-msg next .tips / .tips-on classed TAG
						$(this).data('siaptip', $(this).next('.tips-msg').html()).next('.tips-msg').remove();
					}else{
						return false;
					}
				}else{
					// tips message inside attr TITLE
					$(this).data('siaptip', $(this).attr('title')).removeAttr('title');
				}
			}
			// check if sticky
			$(this).data('sticky', $(this).is('.tips-on') || $(this).is('.ic-help') );
			// assigning hover
			$(this).hover(
				function () {
					var bubble = $('#siapTooltipObj').css({ 'top': 0, 'left': 0 }).data('stickybubble', $(this).is('.tips-on') || $(this).is('.ic-help'));
					// making html msg & getting tips width
					var tw = bubble.find('.msg').html( $(this).data('siaptip') ).closest('.tips-msg').outerWidth();
					// get tipped object dimension & position
					var ow = $(this).outerWidth();
					var oh = $(this).innerHeight();
					var ox = $(this).offset().left;
					var oy = $(this).offset().top;
					// define position of tips
					var tright = (ox >= $('body').innerWidth() - tw)? true:false;
					var tx = ox-(tright? (tw-ow-11):11);
					var pw = (tw<ow? tw-20:ow);
					if(pw<15) pw=15;
					var ty = oy + $(this).innerHeight() + 8;
					//
					bubble.find('.point').css({ 'width':pw, 'height':9, 'top':-9 });
					if(tright){
						bubble.find('.point').css({ 'left':'', 'right':10 });
					}else{
						bubble.find('.point').css({ 'left':10, 'right':'' });
					}
					bubble.css({ 'top': ty, 'left': tx }).show();
					clearInterval(tipsgohide);
					if( !$(this).data('sticky') ){
						tipsgohide = window.setInterval(function() {
							bubble.hide();
							clearInterval(tipsgohide);
						}, 4000);
					}
				},
				function () {
					clearInterval(tipsgohide);
					if( !$(this).data('sticky') ){
						$('#siapTooltipObj').hide();
					}else{
						tipsgohide = window.setInterval(function() {
							$('#siapTooltipObj').hide();
							clearInterval(tipsgohide);
						}, 4000);
					}
				}
			);
			// assigning mouse event on bubble tips
			bubble.mouseenter(function(){
				if( $(this).data('stickybubble') ){
					clearInterval(tipsgohide);
					$(this).show();
				}
			}).mouseleave(function(){
				if( $(this).data('stickybubble') ){
					$(this).hide();
				}
			});
			// assigning blur
			$(this).blur(
				function () {
					if( !$(this).data('sticky') ){
						clearInterval(tipsgohide);
						$('#siapTooltipObj').hide();
					}
				}
			);
		});
	}
})(jQuery);
// skin behaviour
$(document).ready(function() {
	// GLOBAL TOOLTIPS
	$('.tips, .tips-on').siapTooltip();
	// GLOBAL DROP DOWN MENU
	// closing modal if body clicked
	$('html').mouseup(function(e){
		if($(e.target).closest('.head-global .box').length == 0 && $(e.target).closest('a.on').length == 0){
			$('.head-global .box:visible').not($(e.target).closest('.head-global .box')).hide();
			$('.head-global > div > a.on').toggleClass('on');
		}
		if($(e.target).closest('div.tips-modal:visible').length == 0){
			$('div.tips-modal:visible').hide();
		}
	});
	// head global submmenu show
	$('.head-global > div > a').filter(function(index) {
	  return $(this).attr('rel') != undefined;
	}).click(function(e){
		if( !$(this).is('a.on') ){
			e.preventDefault();
			$('.head-global > div > a.on').toggleClass('on');
			if($(this).closest('div').is('.fl')){
				$('#'+$(this).attr('rel')).css({'left':$(this).position().left-1});
			}else{
				$('#'+$(this).attr('rel')).css({'right':-1 });
			}
			$('#'+$(this).toggleClass('on').removeClass('ready').attr('rel')).slideToggle('fast');
		}
	});
});
