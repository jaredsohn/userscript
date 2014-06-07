// ==UserScript==
// @name        Tieba Pic Resizer
// @description 自由选择开启模式 请用组合键ctrl+alt+shift+enter
// @include     http://tieba.baidu.com/p/*
// @include     http://tieba.baidu.com/f?*
// @original name  百度贴吧图片放大 
// @original author      o丨Reborn <sbwtws@gmail.com>
// @original updateURL   https://userscripts.org/scripts/source/156914.meta.js
// @original downloadURL https://userscripts.org/scripts/source/156914.user.js
// @original version     14-03-18.1
// @original namespace http://blog.sbw.so/
// @modifier FireAway
// @namespace   FireAway
// @updateURL   https://userscripts.org/scripts/source/418432.meta.js
// @downloadURL https://userscripts.org/scripts/source/418432.user.js
// @version 3.0
// ==/UserScript==

// 简介: 双击图片可以快速缩放 单击新图层可退出缩放状态 
// 原版: "百度贴吧图片放大"
// 原作者: o丨Reborn <sbwtws@gmail.com>
// 原版地址 http://userscripts.org/scripts/show/156914
// 原版本号: 14-03-18.1

// +增加了自主选择单/双击模式的攻能 组合键ctrl+alt+shift+enter设置 设置完毕立即生效
// +增加了签名档的缩放功能
// +增加了对Chrome的支持
// +增加了一个小小的提示 - 脚本生效的时候 鼠标悬停在图片上时 会变成一个十字架 而不是原本的放大镜
// -去掉了我认为不必要的部分判断条件
// -去掉了单张图片多次被打开

(function() {
	var $ = unsafeWindow.$;
	var clickType = localStorage.getItem('TPR_Type') || "dblclick";
	var EventUtil = {
		getEvent: function(event) {
			return event || window.event;
		},
		addHandler: function(element, type, handler) {
			if (element.addEventListener) {
				element.addEventListener(type, handler, false);
			} else if (element.attachEvent) {
				element.attachEvent("on" + type, handler);
			} else {
				element["on" + type] = handler;
			}
		},
		getWheelDelta: function(event) {
			var date;
			if (event.wheelDelta) {
				date = event.wheelDelta;
			} else {
				date = -event.detail * 40;
			}
			return date;
		}
	};

	function pictureScroll(e, obj) {
		event = EventUtil.getEvent(e);
		var delta = EventUtil.getWheelDelta(e);
		var width = obj.width + delta / 3;
		//    obj[0].width = width < 100 ? 100 : width;
		$(obj).attr({
			'width': width < 100 ? 100 : width,
			'height': ''
		});

		$(obj).css({
			'margin-top': parseInt(obj.height) / -2 + 'px',
			'margin-left': parseInt(obj.width) / -2 + 'px'
		});

		e.preventDefault();
		return false;
	}

	function picMouseDown(e) {
		var mouseX = e.pageX;
		var mouseY = e.pageY;
		var oldX = parseInt($(this).css('left'));
		var oldY = parseInt($(this).css('top'));
		var close = true;

		$(document).bind('mousemove', function(e) {
			$(this).css({
				'top': e.pageY - mouseY + oldY + 'px',
				'left': e.pageX - mouseX + oldX + 'px'
			});
			close = false;
		});

		$(document).mouseup(function(e) {
			if (close)
				$(this).remove();
			$(document).unbind('mousemove');
		});

		e.preventDefault();
		return false;
	}

	function pictureView(e) {
		//$(this).unbind('click');

		try {
			if (e.button != 0) {
				return false;
			}
		} catch (ee) {

		}

		var reg = /\/[a-z0-9]{20,}\.[a-zA-Z]{3,}/;
		var match = $(this).attr("src").match(reg);

		if (!match)
			return;

		var img = document.createElement('img');
		img.src = "http://imgsrc.baidu.com/forum/pic/item" + match[0];
		img.id = "img_View" + match[0];
		var id = img.id;

		if (!document.getElementById(id)) {
			document.body.appendChild(img);
		} else {
			img = document.getElementById(id);
		}

		$(img).css({
			'position': 'fixed',
			'z-index': '999',
			'box-shadow': '0 0 50px #333',
			'border': '1px dashed hsl(40, 50%, 30%)',
			'top': '50%',
			'left': '50%',
			'margin-top': parseInt(img.height) / -2 + 'px',
			'margin-left': parseInt(img.width) / -2 + 'px'
		});

		$(img).one('load', function() {
			$(img).css({
				'margin-top': parseInt(this.height) / -2 + 'px',
				'margin-left': parseInt(this.width) / -2 + 'px'
			});
		}).each(function() {
			if (this.complete)
				$(this).load();
		});

		img.addEventListener('mousewheel', function(e) {
			pictureScroll(e, img);
		});
		img.addEventListener('DOMMouseScroll', function(e) {
			pictureScroll(e, img);
		});

		$(img).mousedown(function(e) {
			try {
				if (e.button != 0) {
					return false;
				}
			} catch (ee) {

			}
			var mouseX = e.pageX;
			var mouseY = e.pageY;
			var oldX = parseInt($(this).css('left'));
			var oldY = parseInt($(this).css('top'));
			var remove = true;
			$(document).bind('mousemove', function(e) {
				$(img).css({
					'top': e.pageY - mouseY + oldY,
					'left': e.pageX - mouseX + oldX
				});
				remove = false;
			});
			$(document).mouseup(function(e) {
				if (remove)
					$(img).remove();
				$(document).unbind('mousemove');
			});
			//		e.preventDefault();
			return false;
		});

		e.preventDefault();
		return false;
	}
	document.onkeydown = function(e) {
		if (e.keyCode == 13 && e.ctrlKey && e.shiftKey && e.altKey) {
			var type = confirm("你喜欢的图片缩放方式: 单击请点确定/双击请点取消");
			if (type) {
				type = "click";
			} else {
				type = "dblclick";
			}
			localStorage.setItem("TPR_Type", type);

			$(".BDE_Image").off();
			$(".j_user_sign").off();

			$(".BDE_Image").on(type, pictureView);
			$(".j_user_sign").on(type, pictureView);
		}
	};
    function bindAll(){
    	$(".BDE_Image").unbind("click").css("position", "relative").css("z-index", "9").css("cursor", "cell");
		$(".j_user_sign").unbind("click").css("position", "relative").css("z-index", "9").css("cursor", "cell");
		$(".BDE_Image").on(clickType, pictureView);
		$(".j_user_sign").on(clickType, pictureView);
    }

	window.addEventListener('DOMContentLoaded', function() {
		bindAll();
	}, false);
    
})();
