// ==UserScript==

// 看到好多人都在折腾这个旧版贴吧面板，我也来一发~
// 实现方法有所不同, 他们都是替换加载后的内容 (
// 我则是取消掉原来的接在新版贴吧面板事件, 然后绑定我自己的 (๑و•̀ω•́)و

// @name		Tieba Old Panel
// @namespace   http://jixun.org/
// @version	 1.0.0.3
// @description 使用贴吧旧版个人面板

// 贴吧贴子页:
// @include	 http://tieba.baidu.com/p/*

// @copyright   2013+, Jixun
// @run-at	  document-start
// ==/UserScript==

var win;

try { win = unsafeWindow }
catch (e) { win = window }

console.log ('Tieba Old Panel => Jixun.Moe');

function main ($) {
	console.log ('Main: ', $);
	
	var $flags = {
		// 上次显示的用户; 如果已经有了就不出来
		cacheUser: '',
		hRemoveTimer: 0
	};
	// 缓存万岁w
	var frmList = [], unList = [], lastIndex = false;
	
	var $oldCard = $('a.j_user_card').removeClass ('j_user_card').addClass('j_old_user_card');
	var $warpper = $('<div>').addClass('ui_card_wrap').attr({
		id: 'user_visit_card',
		style: 'background:#fff !important'
		}).appendTo(document.body).css ({
			border: '1px solid black',
			position: 'absolute',
			zIndex: 9999999
		}).hide();
	
	function displayOldUserPanel (imgObj) {
		// 匿名函数: 显示 frame 框架
		var sUsername = imgObj.attr ('username') || {z: imgObj.attr('data-field')},
			uIndex;
		
		if (sUsername.z)
			sUsername = JSON.parse (sUsername.z).un;
		
		if (typeof sUsername != 'string')
			return console.log ('Can\'t find username');
		
		uIndex = unList.indexOf(sUsername);
		
		if (lastIndex !== false && uIndex != lastIndex)
			frmList[lastIndex].hide();
		
		(function () {
			if (uIndex + 1) {
				// 调用缓存
				frmList[uIndex].show();
				lastIndex = uIndex;
				return;
			}
			lastIndex = unList.push (sUsername) - 1;
			
			var $panelFrm = $('<iframe>');
			
			// Height: 125 + 8*2 = 125+16 = 141
			// Width:  330
			$panelFrm.height(141).width(330).appendTo($warpper);
			frmList.push ($panelFrm);
			
			// 查了半天资料, 结果发现贴吧用的是 GBK 所以能直接把中文用户名套上去…
			$panelFrm.attr ('src', 'http://tieba.baidu.com/i/data/panel?un=' + sUsername);
		})();
		
		// 显示后可以进行位置处理
		var imgPos = imgObj.offset ();
		$warpper.show().css ({
			top: imgPos.top - 20 - 15,
			left: imgPos.left - 15,
			opacity: 0
		}).animate ({
			top: imgPos.top - 15,
			opacity: 1
		}, 200);
		
		console.log ('$warpper', $warpper, $warpper.offset());
	}
	
	$('.left_section').on ('mouseenter', 'img[username], img.forscrollasync, a.j_user_card, a.j_old_user_card', function() {
		var $that = $(this);
		if ($that.hasClass('j_user_card'))
			this.className = this.className
				.replace (/j_user_card/g, 'j_old_user_card');
		
		console.log ('Event: mouseenter');
		clearInterval ($flags.hRemoveTimer);
		displayOldUserPanel ($that);
	});
	
	$warpper.on ('mouseleave', function() {
		console.log ('Event: mouseleave');
		clearInterval ($flags.hRemoveTimer);
		$flags.hRemoveTimer = setTimeout (function () {
			$warpper.animate({opacity: 0}, 500, function () {
				$warpper.hide();
			});
		}, 500);
	})
}

document.addEventListener ('DOMContentLoaded', function () {
	console.log ('DOMContentLoaded');
	var intCheck = setInterval (function () {
		if (!win.$)
			return;
		
		main(win.$);
		clearInterval (intCheck);
	}, 200);
}, false);