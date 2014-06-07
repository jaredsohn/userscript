// ==UserScript==
// @name          Todayhumor firefox patch
// @namespace     http://ghacker.homelinux.net
// @description   Fix ok and tail layers. remove ads.
// @require       http://code.jquery.com/jquery-1.10.1.min.js
// @include       http://*.todayhumor.*
// @exclude       
// @grant         none
// ==/UserScript==

$(document).ready(function(){
	$(function(){
		var apply_html = $('div.contentContainer > div > div > a > img[src="images/apply_html_btn.gif"]');
		if(apply_html.length){
			window.location = apply_html.parent().attr('href');
		}
	});

	$('div#tail_layer')
		.css('overflow', 'hidden')
		.data("orig_height", $('div#tail_layer').height())
		.data("orig_width", $('div#tail_layer').width());

	$('div.tailDiv > div > input[onclick="combo()"]')
		.attr('onclick', null)
		.click(function(event){
			if($('div#tail_layer').css('overflow')=='hidden'){
				$('div#tail_layer').css({
					'height'	: 'auto',
					'width'		: 'auto',
					'overflow'	: 'visible'
				});
			} else {
				$('div#tail_layer').css({
					'height'	: $('div#tail_layer').data('orig_height'),
					'width'		: $('div#tail_layer').data('orig_width'),
					'overflow'	: 'hidden'
				});
			}
		});

	var removeTarget = $();
	removeTarget
		.add('.okListDiv')
		.add('.okListDiv + div')
		.add('div.ad_adsense')					// Ad on writer info
		.add('div.under_ad_div')				// Ad on bottom of comments
		.add($('ins#aswift_0_anchor').parent().parent())
		.add($('ins#aswift_1_anchor').parent().parent())	// Ad on top of content
		.remove();

	// Shrink buttons
	$('div.okNokBookDiv').find('img[src^="images/"]')
		.width(function(idx, width){
			$(this).width((width>>1));
		})
		.height(function(idx, height){
			$(this).height(height>>1);
		});

	$('#moreReplyButton').css('height', 40);

	function make_foldable(target, button_target) {
        if(!target || !target.length) {return;}

		var button = button_target || $('<button>')
				.html('&#9660;&#9650;')
				.css({
					'borderRadius'		: '0 0 5px 5px',
					'borerWidth'		: '0 0 1px',
					'width'				: '100%',
					'height'			: '15px',
					'paddingBottom'		: '0',
   					'background'		: '-moz-linear-gradient(center top, #FFFFFF, #EFEFEF) repeat scroll 0 0'
				});
        button.mouseover(function(event){
			$(this).css('background', '-moz-linear-gradient(center top, #FFFFFF, #EAF2FD) repeat scroll 0 0');
		}).mouseout(function(event){
			$(this).css('background', '-moz-linear-gradient(center top, #FFFFFF, #EFEFEF) repeat scroll 0 0');
		}).click(function(event){
			target.slideToggle();
		});

        if(!button_target) {
            var div = $('<div>').append(button);
            target.replaceWith(div);
            div.append(target);
        }
		target.slideUp(0);
	}

	make_foldable($('.writerInfoContainer'), $('div.viewSubjectDiv'));
	make_foldable($('td#topmenu_container1').parent().parent());

	if($.browser.mozilla && navigator.platform.lastIndexOf("Linux",0)==0){
		$('#logo_line2').css('width', '100%');
		$('#login_span').css('left', '50px');
	}

	$('div#_atssh').remove();
	$('div#semanticrepScript').remove();
});