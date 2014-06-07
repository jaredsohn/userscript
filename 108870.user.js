// ==UserScript==
// @name           星佳城市
// @namespace      sny.cityville
// @include        http://app24341.qzoneapp.com/*
// @include        http://apps.pengyou.com/24341*
// @require        http://code.jquery.com/jquery-1.6.3.min.js
// ==/UserScript==

var loc = window.location.href;
var click = function(d) {
	d.each(function() {
		var clickEvent = document.createEvent ("HTMLEvents");
		clickEvent.initEvent("click", true, true);
		this.dispatchEvent(clickEvent);
	});
};
GM_log(loc);
$(function() {
	if (loc.indexOf('message_center.php?') > 0) {
		$('#tab_boundary').append($('<span class="filter_spacer"><img src="http://app24341.imgcache.qzoneapp.com/app24341/4564/zmc/images/message_center/tabui/dot.gif?zmcv=0.1.10&amp;sv=0"></span><span class="filter_tab" onclick="$(\'.action_accept\').click()"><span class="filter_tab_text">全部确认</span></span>'));
		var id = window.setInterval(function() {
			if ($('.action_accept').length) {
				window.clearInterval(id);
				id = window.setInterval(function() {
					var d = $('.action_accept:not(.message_center_giftback):lt(1)');
					if (d.length) {
						click(d);
					} else {
						window.clearInterval(id);
					}
				}, 100);
			}
		}, 1000);
	} else if (loc.indexOf('get_gift_back.php?') > 0) {
	} else if (loc.indexOf('factoryWorker.php?') > 0 || loc.indexOf('gifts.php?') > 0 || loc.indexOf('request.php?') > 0 || loc.indexOf('crew.php') > 0) {
		var id = window.setInterval(function() {
			var d = $('.sn-mfs-actions');
			if (d.length) {
				d.prepend($('<span class="sn-button blue" onclick="$(\'.sn-mfs-friend:visible\').click();">全选</span>'));
				d.prepend($('<span class="sn-button blue" onclick="$(\'.sn-mfs-friend:visible:lt(5)\').click();">选择前5</span>'));
				window.clearInterval(id);
			}
		}, 1000);
	} else if (loc.indexOf('http://app24341.qzoneapp.com/?') > 0) {
		GM_log('234');
		$('li .help').html('<a title="刷新" onclick="window.location.reload();">刷新</a>');
	}
});
