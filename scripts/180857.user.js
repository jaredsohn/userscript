// ==UserScript==
// @name		Modern Tiles
// @namespace	LTTFMTUS
// @version		0.7.5.1
// @description	Modern Tiles for LinusTechTips.com
// @include		https://linustechtips.com/main/*
// @include		https://www.linustechtips.com/main/*
// @include		http://linustechtips.com/main/*
// @include		http://www.linustechtips.com/main/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js
// @updateURL	https://userscripts.org/scripts/source/180857.meta.js
// @downloadURL	https://userscripts.org/scripts/source/180857.user.js
// @copyright	2013+, Ssoele
// ==/UserScript==

jQuery.noConflict();
jQuery(document).ready(function() {
	var darkTheme = false;
	var colorBorder = 'rgb(230, 230, 230)';
	var colorPost = '#FAFAFA';
	if(jQuery('body').css('background-color') == 'rgb(32, 32, 32)') {
		darkTheme = true;
		colorBorder = 'rgb(80, 80, 80)';
		colorPost = '#2F2F2F';
	}
	
    jQuery('.category_block .ipb_table').each(function () {
    	var forums = new Array();
    	var forumsRead = new Array();
    	jQuery('tr', this).each(function () {
    		if(!jQuery(this).hasClass('header')) {
    			if(jQuery(this).hasClass('unread')) {
    				forumsRead.push(false);
    			} else {
    				forumsRead.push(true);
    			}
    			var forum = new Array();
    			forum.push(jQuery('.col_c_forum', this).html());
    			forum.push(jQuery('.col_c_post', this).html());
    			forums.push(jQuery(forum));
    			jQuery(this).remove();
    		}
    	});
    	var rows = 1;
    	for (i = 0; i < forums.length; i++) {
    		if(i%3 == 0) {
    			jQuery('tbody', this).append('<tr class="row-' + rows + '"></tr>');
    		}
    		jQuery('tbody .row-' + rows, this).append('<td class="sub-forum forum-' + i + '"><div class="mt-box"><div class="col_c_forum"></div><div class="col_c_post"></div></div></td>');
    		if (forumsRead[i] != true) {
    			jQuery('.forum-' + i).addClass('unread');
    		}
    		jQuery('tbody .forum-' + i + ' .col_c_forum', this).append(forums[i][0]);
    		jQuery('tbody .forum-' + i + ' .col_c_post', this).append(forums[i][1]);
    		if (forums.length < 3 && forums.length-1 == i) {
	    		jQuery('tbody .row-' + rows, this).append('<td class="col_c_empty"></td>');
    		}
    		if(i%3 == 2) {
    			rows++;
    		}
    	}
    });
	jQuery('.category_block .col_c_icon').remove();
	jQuery('.category_block .col_c_stats').remove();
	jQuery('.category_block .sub-forum').css({
		'width': '33.3%',
		'border': '1px solid ' + colorBorder,
		'padding': '0',
		'vertical-align': 'top',
		'height': '100px'
	});
	jQuery('.category_block .sub-forum>.mt-box').css({
		'width': '100%',
		'position': 'relative',
		'height': '100px'
	});
	jQuery('.category_block .col_c_post, .category_block .col_c_empty').css({
		'background': colorPost
	});
	jQuery('.category_block .col_c_forum').css({
		'width': '62%',
		'padding': '2%',
		'position': 'absolute',
		'top': '0',
		'left': '0',
		'bottom': '0'
	});
	jQuery('.category_block .col_c_post').css({
		'width': '30%',
		'padding': '2%',
		'position': 'absolute',
		'top': '0',
		'right': '0',
		'bottom': '0'
	});
	jQuery('.unread h4').css({
		'font-weight':  'bolder'
	});
	jQuery('.ipsBox_container').css({
		'border': 'none'
	});
	jQuery('.last_post').css({
		'max-width': '140px',
		'overflow': 'hidden'
	});
	jQuery('#copyright').append('<br /><a href="http://linustechtips.com/main/topic/69835-modern-tiles-for-linustechtipscom/">Modern Tiles</a> by <a href="http://linustechtips.com/main/user/1130-ssoele/">Ssoele</a>');

	jQuery('.ipsLikeButton_enabled, .ipsLikeButton_disabled').click(function () {
		setTimeout(splendidPost, 3000);
	});
	splendidPost();
	
	
})();
function splendidPost () {
	jQuery('.ipsLikeButton_enabled').each(function () {
		jQuery(this).attr('title', 'This post is marvelous!');
		jQuery(this).text('Jolly good post!');
	});
	jQuery('.ipsLikeButton_disabled').each(function () {
		jQuery(this).attr('title', 'Bugger off');
		jQuery(this).text('Dastardly!');
	});
	jQuery('.ipsLikeBar_info').each(function () {
		jQuery(this).html(jQuery(this).html().replace("like this", "think this is a splendid post!"));
	});
}
