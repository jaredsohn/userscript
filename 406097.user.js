// ==UserScript==
// @name        HKGalden Quote Folder
// @namespace   https://userscripts.org/scripts/show/406097
// @description 縮短引用、縮小引用內圖片
// @author      HKGalden 小磁怪
// @license     MIT License
// @include     https://hkgalden.com/view/*
// @include     http://hkgalden.com/view/*
// @version     140310
// @icon        https://hkgalden.com/favicon.ico
// @updateURL   https://userscripts.org/scripts/source/406097.meta.js
// @downloadURL https://userscripts.org/scripts/source/406097.user.js
// @grant       none
// ==/UserScript==

/*jslint browser: true, devel: true, plusplus: true, es5: true,  white: true */
/*jshint browser: true, devel: true, jquery: true, multistr: true, globalstrict: true */
/*global Storage, $*/
'use strict';

var qf_version = '140310';

//載入設定
var show_level, img_height, have_storage, tmp;
have_storage = (Storage !== undefined);
if (have_storage) {
	tmp = localStorage.getItem('qf_settings_show_level');
	if (!tmp) {
		localStorage.setItem('qf_settings_show_level', 3);
		show_level = 3;
	} else {
		show_level = parseInt(tmp, 10);
		console.log('HKG Quote Folder : localStorage Quote Level = ' + show_level);
	}
	tmp = localStorage.getItem('qf_settings_img_height');
	if (!tmp) {
		localStorage.setItem('qf_settings_img_height', 150);
		img_height = 150;
	} else {
		img_height = parseInt(tmp, 10);
		console.log('HKG Quote Folder : localStorage Image Max Height = ' + img_height);
	}
} else {
	show_level = 3;
	img_height = 150;
	console.log('HKG Quote Folder : No localStorage support');
}

//判斷A<=x<=B的簡便方法
//http://indisnip.wordpress.com/2010/08/26/quicktip-check-if-a-number-is-between-two-numbers/
Number.prototype.between = function (first, last) {
	return (first < last ? this >= first && this <= last : this >= last && this <= first);
};

$(function () {

	//修正Firefox按鈕虛線外框問題，此項CSS無法透過jQuery.fn.css方法添加
	//http://www.karlrixon.co.uk/writing/remove-button-focus-outline-using-css/
	$('head').append('<style type="text/css"> \
						button[class^="qf_btn_"]::-moz-focus-inner { \
							border: 0; \
						} \
						</style> \
					');

	//圖示
	//Tango Icon Library | https://www.iconfinder.com/search/?q=iconset:tango-icon-library
	var icon_plus = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABzklEQVRIie2UvWuTURTGf+fNR41iRWxV/FgU3QQXVxEcFJyEDo6dHATFzdEU/AMsrh10EAQt/QvaDg6uOpRu6pDUxqavxIbqmzf3PA5JNNFoXkFBpA/c5d5zz/Oc+5xzYQf/PSxr4PlbTx9Gke0CMClZnp2aBtOoe/msBFcvnL5y8tjEBMDrSn1zef+MUebPEWAQNxMEo7P2IfqNWAAkCO5/h0ACZODZixj6RBdvzz8qjOVKg7tWEIYANytcSs7OcWfhK1H6OYSl2anr3+ca2kX3F15tnDjaMVQIZLhE3EyRYN/uPC5DEi4hweqbWu3e9LnDGSqQJa2XXom3QR1DJSN4J1EaYHMrpR1E20UIIjh82EqGGvMjQXnG4uZlL5RKyCGIrkrjXZzgwMHxIi4RXLg6MR8/tUJGgrt6cfPZY8tVi/3bZ04dumbFvZMSVNc36qtv3z8xfRs0dyXDCDJP8o0Hz6s2Nn5EgtZ2Y22usXSccnlkv2ZpUwNy7o4ELnAXrKxkEvezSY6AXPc8B0TtICuoZ7gbi4t7gBRoAwHIaPIgQW/lK2uxTR5I111Srd6ISNMCg7/G0F/kV2VGXQFR3+rFq6u4p7w9LPkO/g18ATeq4QJygwMsAAAAAElFTkSuQmCC)';
	//FS Icons Ubuntu | https://www.iconfinder.com/search/?q=iconset:fs-icons-ubuntu-by-franksouza-
	var icon_minus = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADhSURBVDiN7dRBSgNBFITh/3WcEXSrLlWI5/FArryA9/EOHkDwAAaUKEJIGKe7yoUG02QUN9nI1O5R3R80NC9ss4uknagjPMKD2dscZjeXR23y/vaxZTWtBqoSjc6ubmeDcDu9uMvz53MwCWPrs/ABWGDAorEJjGSiNUUC0ioiTmwvtuB+/lL6h3uaScLx8zPXVQJssEznVHkVnLNQV/BEv8KbsUHFmFTdqOE+s+wyXQqCv8nGFEGmVB+hgh+fXq/fDo9PkbAxCL62lEohHBbiuwdJgHBEBt7XVozbbYT/AfwBNxB4sYl2bPoAAAAASUVORK5CYII=)';

	//摺疊按鈕
	$('head').append('<style type="text/css"> \
						div.qf_fold_btn { \
							width: 30px; \
							height: 30px; \
							background-repeat: no-repeat; \
							cursor: pointer; \
							position: absolute; \
							display: inherit; \
							margin-left: -27px; \
							opacity: 0; \
						} \
						div.qf_btn_plus { \
							background-image: ' + icon_plus + ' \
						} \
						div.qf_btn_minus { \
							background-image: ' + icon_minus + ' \
						} \
					</style>');

	//根據顯示層數產生Selector
	function quote_selector(n) {
		var i, r = 'div.ctn';
		for (i = 1; i <= show_level; i++) {
			r += ' > blockquote' + (n===true?' > div':'');
		}
		return r;
	}
		
	//縮短引用 (舊版本方法)
	function mod_quote() {
		$(quote_selector()).each(function (i) {
			if (!$(this).hasClass('qf_quote_mod')) {
				$(this)
					.hide()
					.addClass('qf_quote_mod qf_quote_' + i)
					.css({
						'border-style'	: 'dotted',
						'border-width'	: '1px',
						'padding'		: '5px 5px 5px 5px'
					})
					.before('<button class="qf_btn_' + i + '" style="color: transparent; text-shadow: 0 0 1px rgba(0,0,0,0.7);" name=".qf_quote_' + i + '">展開引用</button><br />');
				$('.qf_btn_' + i)
					.css({
						'cursor'		: 'pointer',
						'outline'		: 'none'
					})
					.click(function () {
						$($(this).prop('name')).toggle();
						$(this).html($($(this).prop('name')).is(':visible') ? '縮短引用' : '展開引用');
					})
					.hover(function () {
						$(this).css('text-shadow', '0 0 0 transparent, 0 0 0 rgba(0,0,0,0.7)');
					}, function () {
						$(this).css('text-shadow', '0 0 0 transparent, 0 0 1px rgba(0,0,0,0.7)');
					});
			}
		});
	}

	//縮短引用
	function create_fold_btn() {
		$('div.ctn').find('blockquote')
			.each(function (index) {
				if ((!$(this).hasClass('qf_quote_mod'))) {
					$(this)
						.addClass('qf_quote_mod qf_quote_' + index)
						.wrapInner('<div class="qf_content"></div>')
						.prepend('<div class="qf_fold_btn qf_btn_minus"></div>');
				}
			});
		$('div.ctn > blockquote')
			.off('mouseover mouseout')
			.on('mouseover mouseout', function (e) {
				e.stopPropagation();
				var target = $(e.target),
					target_bq = (target.prop('tagName') === 'BLOCKQUOTE') ? target : target.parent('blockquote'),
					target_btn = target_bq.children('.qf_fold_btn').first();
				if (e.type === 'mouseover') {
					target_btn.fadeTo(100, 1).clearQueue();
				} else {
					if (target_btn.hasClass('qf_btn_minus')) {
						target_btn.fadeTo(100, 0).clearQueue();
					}
				}
				if (target.hasClass('qf_fold_btn')) {
					if (e.type === 'mouseover') {
						if (target_bq.children('div.qf_content').first().is(':visible')) {
							target_bq.css('outline', '1px dotted black');
						}
					} else {
						target_bq.css('outline', 'none');
						if (target.hasClass('qf_btn_minus')) {
							target.fadeTo(100, 0).clearQueue();
						}
					}
				}
			});
		$('.qf_fold_btn')
			.unbind('click') 
			.click(function (e, d) {
				if (d === undefined) {d = false;}
				var blockquote = $(this).closest('blockquote');
				if ($(this).hasClass('qf_btn_minus')) {
					if (!(d && blockquote.hasClass('qf_d'))) {
						blockquote
							.css({
								'outline'	: 'none',
								'height'	: '20px'
							})
							.children('div.qf_content').first().hide();
						$(this)
							.removeClass('qf_btn_minus').addClass('qf_btn_plus');
					}
					if (d) {
						$(this).fadeTo(0, 1).clearQueue();
						blockquote
							.addClass('qf_d');
					}
				} else if (!d && $(this).hasClass('qf_btn_plus')) {
					blockquote
						.css({
							'outline'		: '1px dotted black',
							'height'		: 'auto'
						})
						.children('div.qf_content').first().show();
					$(this)
						.removeClass('qf_btn_plus').addClass('qf_btn_minus');
				}
			});
		$(quote_selector(true) + '.qf_fold_btn')
			.trigger('click', [true]);
	}

	if (img_height >= 1) {
		$('blockquote').find('img').css('max-height', img_height + 'px');
	}
	if (show_level >= 1) {
		create_fold_btn();
		$(document).ajaxComplete(function (event, xhr, settings) {
			if (settings.url === '/ajax/loadReplies') {
				console.log('HKG Quote Folder : ajaxComplete');
				create_fold_btn();
			}
		});
	}

	//設定面版
	$('section.gpt.author > div > div > div.ract')
		.prepend('<span class="qf_panel_show">引用縮短設定</span>');
	$('div#main > article')
		.before('<div class="qf_panel nxt"></div>');
	$('span.qf_panel_show')
		.click(function () {
			if (!$('.qf_panel').is(':visible')) {
				if (have_storage) {
					$('.qf_panel').fadeIn(100);
				} else {
					alert('你的瀏覽器不支援 localStorage，無法更改設定');
				}
			}
		});
	$('.qf_panel')
		.css({
			'width'				: '325px',
			'height'			: '210px',
			'padding'			: '10px 10px 10px 10px',
			'z-index'			: '2046',
			'position'			: 'fixed',
			'top'				: '50%',
			'left'				: '50%',
			'margin-top'		: '-105px',
			'margin-left'		: '-162px',
			'box-shadow'		: '3px 3px 4px #888888',
			'box-sizing'		: 'border-box',			// Anti-Bootstrap
			'-moz-box-sizing'	: 'border-box'			// Anti-Bootstrap
		})
		.hide()
		.draggable({containment: 'window'})
		.html('<span class="qf_title">引用縮短設定</span><br /> \
				<div class="qf_options"> \
					顯示層數<br />預設3，最小1(隱藏引用)，0關閉<br /> \
					<input type="number" class="qf_panel_level" name="qf_panel_level" min="0" max="100"></input><br /> \
					引用圖片最大高度(px)，0關閉<br /> \
					<input type="number" class="qf_panel_imgh" name="qf_panel_imgh" min="1" max="10000"></input><br /> \
				</div> \
				<button class="qf_save qf_btn">儲存</button> \
				<button class="qf_cancel qf_btn">取消</button> \
				<span class="qf_about">版本 ' + qf_version + '</span>'
		);
	$('.qf_panel *')
		.css({
			'box-sizing'		: 'content-box',		// Anti-Bootstrap
			'-moz-box-sizing'	: 'content-box'			// Anti-Bootstrap
		});
	$('.qf_options')
		.css({
			'padding'			: '10px 15px 2px 15px'
		});
	$('.qf_options input')
		.css({
			'border-style'		: 'dotted',
			'border-width'		: '1px',
			'width'				: '240px'
		});
	$('.qf_panel_level')
		.val(show_level);
	$('.qf_panel_imgh')
		.val(img_height);
	$('.qf_title')
		.css({
			'padding'			: '10px 0 0 10px',
			'font-weight'		: 'bolder'				// Anti-Bootstrap
		});
	$('.qf_about')
		.css({
			'font-size'			: '12px',
			'position'			: 'absolute',
			'right'				: '15px',
			'bottom'			: '10px',
			'cursor'			: 'pointer'
		})
		.click(function () {
			window.open('https://userscripts.org/scripts/show/406097');
		});
	$('.qf_save')
		.css({
			'position'			: 'absolute',
			'left'				: '5px',
			'bottom'			: '5px',
			'cursor'			: 'pointer'
		})
		.click(function () {
			if (parseInt($('.qf_panel_level').val(), 10).between(0, 100)) {
				if (parseInt($('.qf_panel_imgh').val(), 10).between(0, 10000)) {
					localStorage.setItem('qf_settings_show_level', parseInt($('.qf_panel_level').val(), 10));
					localStorage.setItem('qf_settings_img_height', parseInt($('.qf_panel_imgh').val(), 10));
					$('.qf_about')
						.css({
							'color'		: 'red'
						})
						.html('設定已儲存, 自動F5中...');
					window.setTimeout(function () { location.reload(false); }, 200);
				} else {
					alert('圖片高度範圍必須為0-10000px');
				}
			} else {
				alert('引用層數必須為0-100');
			}
		});
	$('.qf_cancel')
		.css({
			'position'			: 'absolute',
			'left'				: '65px',
			'bottom'			: '5px',
			'cursor'			: 'pointer'
		})
		.click(function () {
			$('.qf_panel').fadeOut(100);
		});

});