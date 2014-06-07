// ==UserScript==
// @name		UserBlock
// @namespace	UB
// @version		0.3
// @description	Hides a user on LinusTechTips.com
// @include		https://linustechtips.com/main/*
// @include		https://www.linustechtips.com/main/*
// @include		http://linustechtips.com/main/*
// @include		http://www.linustechtips.com/main/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js
// @require		https://raw.github.com/andris9/jStorage/master/jstorage.js
// @updateURL	https://userscripts.org/scripts/source/293461.meta.js
// @downloadURL	https://userscripts.org/scripts/source/293461.user.js
// @copyright	2014+, Ssoele
// ==/UserScript==

var username = jQuery.jStorage.get('ub-username');
var enabled = jQuery.jStorage.get('ub-enabled');

jQuery.noConflict();
jQuery(document).ready(function() {
	if(username == null) {
		updateUsername();
	}
	
	if(enabled) {
		jQuery('#copyright').append('<br />UserBlock is <span id="ub-status" class="enabled">enabled</span> <span id="ub-change">*</span>');
	} else {
		jQuery('#copyright').append('<br />UserBlock is <span id="ub-status" class="disabled">disabled</span> <span id="ub-change">*</span>');
	}
	
	checkBlock(enabled);
	
	jQuery('#ub-status').click(function () {
		if(jQuery(this).hasClass('enabled')) {
			jQuery(this).text('disabled').removeClass('enabled').addClass('disabled');
			jQuery('.ub-hidden').show(0).removeClass('ub-hidden');
			enabled = false;
			jQuery.jStorage.set('ub-enabled', enabled);
			jQuery.jStorage.setTTL('ub-enabled', 1000*60*60*24*365);
		} else {
			jQuery(this).text('enabled').removeClass('disabled').addClass('enabled');
			enabled = true;
			jQuery.jStorage.set('ub-enabled', enabled);
			jQuery.jStorage.setTTL('ub-enabled', 1000*60*60*24*365);
			checkBlock();
		}
	});
	jQuery('#ub-change').click(function () {
		updateUsername();
		checkBlock(enabled);
	});
})();
function checkBlock() {
	jQuery('.ub-hidden').show(0).removeClass('ub-hidden');
	if(enabled) {
		jQuery('.ipsList_withminiphoto li, .ipb_table tr.__topic, .mt-box .col_c_post').each(function () {
			var isHis = false;
			jQuery('a.name', this).each(function () {
				if(jQuery(this).text() === username) {
					isHis = true;
				}
			});
			if(isHis) {
				jQuery(this).hide(0).addClass('ub-hidden');
			}
		});
		
		jQuery('.post_block').each(function () {
			var isHis = false;
			jQuery('h3 a.name', this).each(function () {
				if(jQuery(this).text() === username) {
					isHis = true;
				}
			});
			if(isHis) {
				jQuery(this).hide(0).addClass('ub-hidden');
			}
		});
		
		jQuery('.ipsBox_withphoto').each(function () {
			console.log(0);
			var isHis = false;
			jQuery('a.name', this).each(function () {
				if(jQuery(this).text() === username) {
					isHis = true;
				}
			});
			if(isHis) {
				console.log(1);
				window.location = "http://linustechtips.com/main/";
				document.location = "http://linustechtips.com/main/";
			}
		});
	}
}

function updateUsername() {
	username = prompt("Please enter the username of the person you want to block", username);
	jQuery.jStorage.set('ub-username', username);
	jQuery.jStorage.setTTL('ub-username', 1000*60*60*24*365);
}
