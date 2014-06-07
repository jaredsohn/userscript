// ==UserScript==
// @name        HKGalden Board Filter
// @namespace   https://userscripts.org/scripts/show/177479
// @description 於吹水臺隱藏指定討論區的主題
// @author      HKGalden 小磁怪
// @license     MIT License
// @include     https://hkgalden.com/topics/BW*
// @include     http://hkgalden.com/topics/BW*
// @version     140308
// @grant       GM_getValue
// @grant       GM_setValue
// @icon		https://hkgalden.com/favicon.ico
// @updateURL   https://userscripts.org/scripts/source/177479.meta.js
// @downloadURL	https://userscripts.org/scripts/source/177479.user.js
// ==/UserScript==

/*jslint browser: true, devel: true, plusplus: true, es5: true,  white: true */
/*jshint browser: true, devel: true, jquery: true, multistr: true, globalstrict: true */
/*global Storage, $*/
'use strict';

var bf_version = '140308';

var blocked_list = [];
var blocked_count = 0;
var bd = [];
	bd.p = function (p, c, n) { bd.push({'prefix': p.toLowerCase(), 'color': c, 'name': n}); };
	bd.p('BW', '#457cb0', '吹水臺');
	bd.p('ET', '#9952a1', '娛樂臺');
	bd.p('CA', '#198964', '時事臺');
	bd.p('FN', '#557f11', '財經臺');
	bd.p('GM', '#1d7acc', '遊戲臺');
	bd.p('AP', '#2090bb', 'App臺');
	bd.p('HW', '#5e6a7e', '硬件臺');
	bd.p('SW', '#5f709a', '軟件臺');
	bd.p('MP', '#5762b0', '電話臺');
	bd.p('SP', '#993f50', '體育臺');
	bd.p('LV', '#c6325d', '感情臺');
	bd.p('SY', '#7f706a', '講故臺');
	bd.p('ED', '#3e903e', '飲食臺');
	bd.p('TM', '#c04611', '蕃茄臺');
	bd.p('TR', '#607752', '旅遊臺');
	bd.p('AN', '#ac4da0', '動漫臺');
	bd.p('TO', '#955f2d', '玩具臺');
	bd.p('MU', '#575bcd', '音樂臺');
	bd.p('VI', '#7a4d7f', '影視臺');
	bd.p('DC', '#366677', '攝影臺');
	bd.p('ST', '#887090', '學術臺');
	bd.p('TS', '#c52e40', '汽車臺');
	bd.p('MB', '#7c55c7', '站務臺');
	bd.p('AC', '#974a70', '活動臺');
	bd.p('EP', '#9a705b', '創意臺');
	bd.p('BLK', '#666666', '已封鎖的用戶');

function g(p) {
	var i;
	for (i=0; i<bd.length; i++) {
		if (bd[i].prefix.toUpperCase()===p.toUpperCase()) {
			return bd[i].name;
		}
	}
	return '???';
}

Array.prototype.exist = function(e) {
	return !!~this.indexOf(e);
};
Array.prototype.pushIfNotExist = function(e) {
	if (!!!~this.indexOf(e)) {this.push(e);}
};
Array.prototype.remove = function(e) {
	for (var i = 0; i < this.length; i++) {
		if (this[i]==e) {this.splice(i, 1);}
	}
};

function JSONparse(s) {
	var obj = null;
	try {
		obj = JSON.parse(s);
		return obj;
	}
	catch(e){
		return null;
	}
}

//載入設定
var stored_settings = GM_getValue('bf_settings');
if (!stored_settings) {
	GM_setValue('bf_settings', '[]');
} else {
	blocked_list = JSONparse(stored_settings);
}

//等待jQuery
(function WaitjQuery() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		setTimeout(WaitjQuery, 1);
	} else {
		bf_exec(unsafeWindow.jQuery);
	}
})();

function bf_exec($) {
$(function() {
	//Block台
	var blocked_title_list = [];
	blocked_title_list.p = function(r,t,l){blocked_title_list.push({'reason':'['+g(r)+']','title':t,'link':l});}
	var this_i = null;
	var is_lt = true;
	$('table#tpli.nxt tr').slice(1).each(function() {
		if ($(this).children('td.tic').length) {
			this_i = $(this).children('td.tic').children('i');
			for (var i = 0; i < blocked_list.length; i++) {
				if (this_i.hasClass(blocked_list[i].toLowerCase())) {
					$(this).hide();
					blocked_title_list.p(blocked_list[i], $(this).find('td.tnm > A').html(), $(this).find('td.tnm > A').prop('href'));
					blocked_count++;
				}
			}
		} else {
			if ($(this).hasClass('blked') && blocked_list.exist('blk')) {
				$(this).hide();
				var blk_name = $(this).find('td a').html();
				if (/^\/\/\s(\w+\s){3}(.+)\s\/\/$/.test(blk_name)) {
					blocked_title_list.p('blk', blk_name.match(/^\/\/\s(\w+\s){3}(.+)\s\/\/$/)[2], '#');
				} else {
					blocked_title_list.p('blk', '(無法辨識用戶名稱)', '#');
				}
				blocked_count++;
			}
		}
		if ($(this).is(':visible')) {
			$(this).removeClass('lt dt').addClass(is_lt?'lt':'dt');
			is_lt = !is_lt;
		}
	});
	
	//Board Filter設定面版
	$('span#xpndruls')
		.before('<div class="bf_panel nxt"></div>&nbsp;<span class="bf_panel_show">Board Filter設定<div class="bf_panel_tooltip nxt"></div></span>');
	$('div.bf_panel_tooltip')
		.css({
			'cursor'	: 'auto',
			'display'	: 'none',
			'z-index'	: '1',
			'font-size'	: '12px'
			})
		.html('已隱藏 ' + blocked_count + ' 個主題')
		.click(function(e) {
			e.stopPropagation();
		});
	$('span.bf_panel_show')
		.css({
			'cursor'		: 'pointer'
		})
		.hover(
			function () {
				var t = '';
				for (var i=0; i<blocked_title_list.length; i++) {
					t += blocked_title_list[i]['reason'] + '&nbsp;<a href="' + blocked_title_list[i]['link'] + '" target="_blank">' + blocked_title_list[i]['title'] + '</a><br />';
				}
				$('div.bf_panel_tooltip')
					.html('<div style="font-size:12pt;font-weight:bolder">已隱藏 ' + blocked_count + ' 個主題</div>' + t)
					.css({
						'display'	: 'block',
						'position'	: 'absolute',
						'padding'	: '5px',
						'left'		: $(this).position().left
					});
			}, 
			function () {
				$('div.bf_panel_tooltip')
					.css({
						'display'	: 'none'
					});
			}
		)
		.click(function() {
			if (!$('.bf_panel').is(':visible')) {
				$('.bf_panel').fadeIn(100);
			}
		});
	$('.bf_panel')
		.css({
			'width'				: '400px',
			'height'			: '240px',
			'padding'			: '10px 10px 10px 10px',
			'z-index'			: '2046',
			'position'			: 'fixed',
			'top'				: '50%',
			'left'				: '50%',
			'margin-top'		: '-120px',
			'margin-left'		: '-200px',
			'box-shadow'		: '3px 3px 4px #888888',
			'box-sizing'		: 'border-box',			// Anti-Bootstrap
			'-moz-box-sizing'	: 'border-box'			// Anti-Bootstrap
		})
		.hide()
		.draggable({containment:'window'})
		.html('<span class="bf_title">Board Filter設定面版</span><div class="bf_options"></div><button class="bf_save bf_btn">儲存</button><button class="bf_cancel bf_btn">取消</button><span class="bf_about">版本 '+bf_version+'</span>');
	$('.bf_panel *')
		.css({
			'box-sizing'		: 'content-box',		// Anti-Bootstrap
			'-moz-box-sizing'	: 'content-box'			// Anti-Bootstrap
		})
	$('.bf_options')
		.css({
			'padding'		: '10px 15px 2px 15px'
		});
	for (var j = 1; j < bd.length+1; j++) {
		$('.bf_options')
			.append('<label class="bf_l '+bd[j-1].prefix+'" style="color:'+bd[j-1].color+';"><input type="checkbox" class="bf_o '+bd[j-1].prefix+'" value="'+bd[j-1].prefix+'" />'+bd[j-1].name+'</label>');
		if (j%4==0){
			$('.bf_options').append('<br />');
		}
	}
	$('.bf_title')
		.css({
			'font-weight'		: 'bolder'				// Anti-Bootstrap
		});
	$('.bf_l')
		.css({
			'padding-right'		: '18px',
			'font-weight'		: 'normal',				// Anti-Bootstrap
			'margin-bottom'		: '0'					// Anti-Bootstrap
		});
	$('.bf_o')
		.click(function() {
			if ($(this).prop('checked')) {
				blocked_list.pushIfNotExist($(this).prop('value'));
			} else {
				blocked_list.remove($(this).prop('value'));
			}
		})
		.each(function() {
			if (!!~blocked_list.indexOf($(this).prop('value'))) {
				$(this).prop('checked', true);
			} else {
				$(this).prop('checked', false);
			}
		})
		.css({
			'margin'		: '0px 4px 0px'				// Anti-Bootstrap
		});
	$('.bf_about')
		.css({
			'font-size'		: '12px',
			'position'		: 'absolute',
			'right'			: '15px',
			'bottom'		: '10px',
			'cursor'		: 'pointer'
		})
		.click(function() {
			window.open('https://userscripts.org/scripts/show/177479');
		});
	$('.bf_save')
		.css({
			'position'		: 'absolute',
			'left'			: '5px',
			'bottom'		: '5px',
			'cursor'		: 'pointer'
		})
		.click(function() {
			window.setTimeout(function(){GM_setValue('bf_settings', JSON.stringify(blocked_list));}, 0);
			$('.bf_about')
				.css({
					'color'		: 'red'
				})
				.html('設定已儲存, 自動F5中...');
			window.setTimeout(function(){location.reload(false);}, 200);
		});
	$('.bf_cancel')
		.css({
			'position'		: 'absolute',
			'left'			: '65px',
			'bottom'		: '5px',
			'cursor'		: 'pointer'
		})
		.click(function() {
			$('.bf_panel').fadeOut(100);
		});
});
}